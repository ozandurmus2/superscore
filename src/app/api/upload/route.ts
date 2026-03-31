import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  // Auth check — get user from cookie-based client
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check user is a brand admin
  const { data: member } = await supabase
    .from('brand_members')
    .select('brand_id')
    .eq('user_id', user.id)
    .single();
  if (!member) {
    return NextResponse.json({ error: 'No brand found' }, { status: 403 });
  }

  // Parse form data
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const bucket = (formData.get('bucket') as string) || 'public-assets';
  const folder = (formData.get('folder') as string) || 'brand-logos';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
  }

  // Upload using service role (bypasses RLS)
  const serviceClient = await createServiceClient();
  const ext = file.name.split('.').pop() || 'png';
  const path = `${folder}/${member.brand_id}-${Date.now()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await serviceClient.storage
    .from(bucket)
    .upload(path, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = serviceClient.storage
    .from(bucket)
    .getPublicUrl(path);

  // Update brand logo_url
  if (folder === 'brand-logos') {
    await serviceClient.from('brands').update({ logo_url: publicUrl }).eq('id', member.brand_id);
  }

  return NextResponse.json({ url: publicUrl });
}
