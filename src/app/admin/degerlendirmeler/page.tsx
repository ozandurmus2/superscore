'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatRelativeTime } from '@/lib/utils';
import { Search, Trash2, Loader2 } from 'lucide-react';
import type { Review } from '@/types';

type ReviewRow = Omit<Review, 'brand' | 'user'> & {
  brand: { name: string };
  user: { full_name: string };
};

function renderStars(rating: number) {
  return (
    <span className="text-sm whitespace-nowrap">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          {'\u2605'}
        </span>
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchReviews();
  }, [search, ratingFilter]);

  async function fetchReviews() {
    setLoading(true);
    let query = supabase
      .from('reviews')
      .select('*, brand:brands(name), user:users(full_name)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (search) {
      query = query.ilike('comment', `%${search}%`);
    }
    if (ratingFilter !== 'all') {
      query = query.eq('rating', parseInt(ratingFilter));
    }

    const { data } = await query;
    setReviews((data as ReviewRow[]) || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Bu degerlendirmeyi silmek istediginizden emin misiniz?');
    if (!confirmed) return;

    setDeleting(id);
    await supabase.from('reviews').delete().eq('id', id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1F3B]">Degerlendirmeler</h1>
        <p className="text-sm text-gray-500 mt-1">Toplam {reviews.length} degerlendirme</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Yorum iceriginde ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Rating filter */}
      <Tabs value={ratingFilter} onValueChange={setRatingFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tumu</TabsTrigger>
          <TabsTrigger value="5">5{'\u2605'}</TabsTrigger>
          <TabsTrigger value="4">4{'\u2605'}</TabsTrigger>
          <TabsTrigger value="3">3{'\u2605'}</TabsTrigger>
          <TabsTrigger value="2">2{'\u2605'}</TabsTrigger>
          <TabsTrigger value="1">1{'\u2605'}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Kullanici</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Marka</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Puan</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Yorum</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden lg:table-cell">Tarih</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs text-right">Islem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Degerlendirme bulunamadi
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{r.user?.full_name}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.brand?.name}</td>
                    <td className="px-4 py-3">{renderStars(r.rating)}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                      <p className="truncate max-w-[300px]">{r.comment}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell whitespace-nowrap">
                      {formatRelativeTime(r.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(r.id)}
                        disabled={deleting === r.id}
                      >
                        {deleting === r.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
