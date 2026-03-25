import { createServiceClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// This endpoint should be called periodically (e.g., via Vercel Cron or external cron)
// It checks for complaints in 'awaiting_customer' status older than 48 hours
// and auto-resolves them with AI rating

export async function GET() {
  const serviceClient = await createServiceClient();

  // Find complaints awaiting customer response for more than 48 hours
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const { data: staleComplaints } = await serviceClient
    .from('complaints')
    .select('*, brand:brands(name)')
    .eq('status', 'awaiting_customer')
    .lt('updated_at', fortyEightHoursAgo);

  if (!staleComplaints || staleComplaints.length === 0) {
    return NextResponse.json({ message: 'No stale complaints found', count: 0 });
  }

  const results = [];

  for (const complaint of staleComplaints) {
    try {
      // Call AI auto-rate
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintId: complaint.id, action: 'auto-rate' }),
      });

      if (res.ok) {
        results.push({ id: complaint.id, status: 'auto-resolved' });
      } else {
        // Fallback: just resolve without AI rating
        await serviceClient
          .from('complaints')
          .update({ status: 'resolved', resolved_at: new Date().toISOString() })
          .eq('id', complaint.id);

        await serviceClient.from('complaint_responses').insert({
          complaint_id: complaint.id,
          user_id: complaint.user_id,
          response_type: 'system_note',
          message: '🤖 Müşteri 48 saat içinde yanıt vermediği için şikayet otomatik olarak çözüldü olarak kapatıldı.',
        });

        results.push({ id: complaint.id, status: 'auto-resolved-no-rating' });
      }
    } catch (error) {
      console.error(`Error auto-resolving complaint ${complaint.id}:`, error);
      results.push({ id: complaint.id, status: 'error' });
    }
  }

  return NextResponse.json({
    message: `Processed ${results.length} stale complaints`,
    results,
  });
}
