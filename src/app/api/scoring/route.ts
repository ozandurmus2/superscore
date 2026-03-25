import { createServiceClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { calculateSuperscore } from '@/lib/scoring/superscore';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { brandId } = body;

  if (!brandId) return NextResponse.json({ error: 'brandId required' }, { status: 400 });

  const serviceClient = await createServiceClient();

  const { data: brand } = await serviceClient
    .from('brands')
    .select('*')
    .eq('id', brandId)
    .single();

  if (!brand) return NextResponse.json({ error: 'Brand not found' }, { status: 404 });

  // Calculate document verification rate
  const { count: totalDocs } = await serviceClient
    .from('complaint_documents')
    .select('*', { count: 'exact', head: true })
    .eq('complaint_id', brandId);

  const { count: verifiedDocs } = await serviceClient
    .from('complaint_documents')
    .select('*', { count: 'exact', head: true })
    .not('ai_analysis', 'is', null);

  const docVerificationRate = totalDocs && totalDocs > 0 ? (verifiedDocs || 0) / totalDocs : 0;

  const score = calculateSuperscore({
    totalComplaints: brand.total_complaints || 0,
    resolvedComplaints: brand.resolved_complaints || 0,
    avgResponseTimeHours: brand.avg_response_time_hours,
    avgRating: brand.avg_rating,
    documentVerificationRate: docVerificationRate,
    industryAvgComplaints: 500,
  });

  await serviceClient
    .from('brands')
    .update({ superscore: score.total })
    .eq('id', brandId);

  return NextResponse.json({ score, total: score.total });
}
