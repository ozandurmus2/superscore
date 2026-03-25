'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Star } from 'lucide-react';
import type { Review } from '@/types';

export default function BrandReviewsPage() {
  const [reviews, setReviews] = useState<(Review & { user: { full_name: string } })[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) return;
      const bid = (member as { brand_id: string }).brand_id;

      const { data } = await supabase.from('reviews').select('*, user:users(full_name)').eq('brand_id', bid).order('created_at', { ascending: false });
      const revs = (data as (Review & { user: { full_name: string } })[]) || [];
      setReviews(revs);
      if (revs.length > 0) setAvgRating(revs.reduce((a, r) => a + r.rating, 0) / revs.length);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Yorumlar</h1>

      {reviews.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-[#1B1F3B]">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-5 w-5 ${s <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <p className="text-sm text-gray-500">{reviews.length} yorum</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{r.user?.full_name}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{formatRelativeTime(r.created_at)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
