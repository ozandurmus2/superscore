import { createClient, createServiceClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateSlug } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from('brands').select('*');

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  if (search) query = query.ilike('name', `%${search}%`);
  if (category) query = query.eq('category', category);

  query = query.order('superscore', { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const serviceClient = await createServiceClient();
  const body = await request.json();
  const { name, userId, category } = body;

  if (!name) return NextResponse.json({ error: 'Marka adı gerekli' }, { status: 400 });

  const slug = generateSlug(name);

  // Check if brand already exists
  const { data: existing } = await serviceClient.from('brands').select('id').eq('slug', slug).single();
  if (existing) return NextResponse.json({ id: existing.id, exists: true });

  const { data, error } = await serviceClient
    .from('brands')
    .insert({
      name,
      slug,
      category: category || 'diğer',
      trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subscription_plan: 'free_trial',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // If userId provided, create brand member
  if (userId && data) {
    await serviceClient.from('brand_members').insert({
      brand_id: data.id,
      user_id: userId,
      role: 'owner',
    });
    // Update user role to brand_admin
    await serviceClient.from('users').update({ role: 'brand_admin' }).eq('id', userId);
  }

  return NextResponse.json(data, { status: 201 });
}
