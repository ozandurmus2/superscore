'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Users, Building2, MessageSquare, TrendingUp, Star, UserPlus } from 'lucide-react';
import type { Complaint, Review } from '@/types';

interface DashboardStats {
  users: number;
  brands: number;
  complaints: number;
  resolved: number;
}

type ComplaintRow = Omit<Complaint, 'brand' | 'user'> & {
  brand: { name: string };
  user: { full_name: string };
};

type ReviewRow = Omit<Review, 'brand' | 'user'> & {
  brand: { name: string };
  user: { full_name: string };
};

interface UserStats {
  thisWeek: number;
  thisMonth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ users: 0, brands: 0, complaints: 0, resolved: 0 });
  const [recentComplaints, setRecentComplaints] = useState<ComplaintRow[]>([]);
  const [recentReviews, setRecentReviews] = useState<ReviewRow[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({ thisWeek: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      try {
        // Stats
        const [
          { count: userCount },
          { count: brandCount },
          { count: complaintCount },
          { count: resolvedCount },
        ] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact', head: true }),
          supabase.from('brands').select('*', { count: 'exact', head: true }),
          supabase.from('complaints').select('*', { count: 'exact', head: true }),
          supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'resolved'),
        ]);
        setStats({
          users: userCount || 0,
          brands: brandCount || 0,
          complaints: complaintCount || 0,
          resolved: resolvedCount || 0,
        });

        // Recent complaints
        const { data: complaints } = await supabase
          .from('complaints')
          .select('*, brand:brands(name), user:users(full_name)')
          .order('created_at', { ascending: false })
          .limit(10);
        setRecentComplaints((complaints as ComplaintRow[]) || []);

        // Recent reviews
        const { data: reviews } = await supabase
          .from('reviews')
          .select('*, brand:brands(name), user:users(full_name)')
          .order('created_at', { ascending: false })
          .limit(10);
        setRecentReviews((reviews as ReviewRow[]) || []);

        // User stats - this week and this month
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const [{ count: weekUsers }, { count: monthUsers }] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
          supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', monthStart),
        ]);
        setUserStats({ thisWeek: weekUsers || 0, thisMonth: monthUsers || 0 });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const resolutionRate = stats.complaints > 0 ? Math.round((stats.resolved / stats.complaints) * 100) : 0;

  const statCards = [
    { label: 'Toplam Kullanici', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Toplam Marka', value: stats.brands, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Toplam Sikayet', value: stats.complaints, icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Cozum Orani', value: `%${resolutionRate}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  function renderStars(rating: number) {
    return (
      <span className="text-sm">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
            {'\u2605'}
          </span>
        ))}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B1F3B]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B1F3B]">Yonetim Paneli</h1>
        <p className="text-sm text-gray-500 mt-1">Genel bakis ve istatistikler</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{s.label}</p>
                  <p className="text-2xl font-bold mt-1 text-[#1B1F3B]">{s.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Complaints + Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Complaints */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              Son Sikayetler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentComplaints.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Henuz sikayet yok</p>
            ) : (
              <div className="space-y-2.5">
                {recentComplaints.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{c.title}</p>
                      <p className="text-xs text-gray-500">
                        {c.brand?.name} &middot; {c.user?.full_name} &middot; {formatRelativeTime(c.created_at)}
                      </p>
                    </div>
                    <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
                      {COMPLAINT_STATUS_LABELS[c.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4 text-yellow-500" />
              Son Degerlendirmeler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentReviews.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Henuz degerlendirme yok</p>
            ) : (
              <div className="space-y-2.5">
                {recentReviews.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="min-w-0 flex-1 mr-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        {renderStars(r.rating)}
                      </div>
                      <p className="text-xs text-gray-500">
                        {r.brand?.name} &middot; {r.user?.full_name} &middot; {formatRelativeTime(r.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Users */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="h-4 w-4 text-blue-500" />
            Aktif Kullanicilar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-700">{userStats.thisWeek}</p>
              <p className="text-xs text-blue-600 mt-1">Bu Hafta Kayit</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-700">{userStats.thisMonth}</p>
              <p className="text-xs text-green-600 mt-1">Bu Ay Kayit</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Gercek zamanli trafik icin Vercel Analytics veya Google Analytics entegrasyonu gereklidir
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
