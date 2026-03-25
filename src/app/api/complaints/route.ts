import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from('complaints').select('*, brand:brands(name, slug), user:users(full_name)');

  const userId = searchParams.get('user_id');
  const brandId = searchParams.get('brand_id');
  const status = searchParams.get('status');
  const isPublic = searchParams.get('is_public');

  if (userId) query = query.eq('user_id', userId);
  if (brandId) query = query.eq('brand_id', brandId);
  if (status) query = query.eq('status', status);
  if (isPublic === 'true') query = query.eq('is_public', true);

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Giriş yapmanız gerekiyor' }, { status: 401 });

  const body = await request.json();
  const { brand_id, title, description, category, order_number, purchase_date, desired_resolution, is_public } = body;

  if (!brand_id || !title || !description || !desired_resolution) {
    return NextResponse.json({ error: 'Zorunlu alanları doldurun' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('complaints')
    .insert({
      user_id: user.id,
      brand_id,
      title,
      description,
      category: category || 'other',
      order_number,
      purchase_date,
      desired_resolution,
      is_public: is_public !== false,
      complaint_number: '',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Create notification for brand members
  const { data: brandMembers } = await supabase
    .from('brand_members')
    .select('user_id')
    .eq('brand_id', brand_id);

  if (brandMembers) {
    const notifications = brandMembers.map((bm: { user_id: string }) => ({
      user_id: bm.user_id,
      type: 'new_complaint' as const,
      title: 'Yeni Şikayet',
      message: `"${title}" başlıklı yeni bir şikayet alındı.`,
      metadata: { complaint_id: data.id },
    }));
    if (notifications.length > 0) {
      await supabase.from('notifications').insert(notifications);
    }
  }

  return NextResponse.json(data, { status: 201 });
}
