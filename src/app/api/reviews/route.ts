import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Giriş yapmanız gerekiyor' }, { status: 401 });

  const body = await request.json();
  const { brand_id, complaint_id, rating, title, comment } = body;

  if (!brand_id || !rating || !comment) {
    return NextResponse.json({ error: 'Zorunlu alanları doldurun' }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Puan 1-5 arasında olmalı' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      user_id: user.id,
      brand_id,
      complaint_id: complaint_id || null,
      rating,
      title: title || null,
      comment,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
