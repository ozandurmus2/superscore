'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { MessageSquare, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import type { Brand, Complaint } from '@/types';

export default function BrandDashboard() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [pendingComplaints, setPendingComplaints] = useState<Complaint[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: member } = await supabase.from('brand_members').select('brand_id, brand:brands(*)').eq('user_id', user.id).single();
      if (!member) return;

      const b = (member as unknown as { brand: Brand }).brand;
      setBrand(b);

      const { data: complaints } = await supabase
        .from('complaints')
        .select('*')
        .eq('brand_id', b.id)
        .in('status', ['pending', 'in_review'])
        .order('created_at', { ascending: false })
        .limit(5);
      setPendingComplaints((complaints as Complaint[]) || []);
    }
    load();
  }, []);

  if (!brand) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  const resolutionRate = brand.total_complaints > 0 ? Math.round((brand.resolved_complaints / brand.total_complaints) * 100) : 0;

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1F3B]">{brand.name}</h1>
          <p className="text-gray-500">Marka Yönetim Paneli</p>
        </div>
        <SuperscoreBadge score={brand.superscore} size="lg" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Toplam Şikayet', value: brand.total_complaints, icon: MessageSquare, color: 'text-blue-600' },
          { label: 'Çözülen', value: brand.resolved_complaints, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Çözüm Oranı', value: `${resolutionRate}%`, icon: TrendingUp, color: 'text-purple-600' },
          { label: 'Ort. Yanıt', value: brand.avg_response_time_hours ? `${Math.round(brand.avg_response_time_hours)}s` : '-', icon: Clock, color: 'text-orange-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bekleyen Şikayetler</CardTitle>
          <Link href="/marka-panel/sikayetler" className="text-sm text-[#1B1F3B] hover:underline flex items-center gap-1">Tümü <ArrowRight className="h-3 w-3" /></Link>
        </CardHeader>
        <CardContent>
          {pendingComplaints.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Bekleyen şikayet yok</p>
          ) : (
            <div className="space-y-3">
              {pendingComplaints.map((c) => (
                <Link key={c.id} href={`/marka-panel/sikayetler/${c.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                    </div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500">{formatRelativeTime(c.created_at)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
