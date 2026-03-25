'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Star } from 'lucide-react';
import type { Review } from '@/types';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<(Review & { brand: { name: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('reviews')
        .select('*, brand:brands(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setReviews((data as (Review & { brand: { name: string } })[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Yorumlarım</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Card key={i} className="animate-pulse"><CardContent className="p-4"><div className="h-16 bg-gray-100 rounded" /></CardContent></Card>)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Henüz yorum yapmadınız</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{r.brand?.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-4 w-4 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                {r.title && <p className="font-medium text-sm">{r.title}</p>}
                <p className="text-sm text-gray-600">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{formatRelativeTime(r.created_at)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
