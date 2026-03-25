'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS, COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Search, ArrowRight } from 'lucide-react';
import type { Complaint } from '@/types';

export default function BrandComplaintsPage() {
  const [complaints, setComplaints] = useState<(Complaint & { user: { full_name: string } })[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [brandId, setBrandId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getBrandId() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (member) setBrandId((member as { brand_id: string }).brand_id);
    }
    getBrandId();
  }, []);

  useEffect(() => { if (brandId) fetchComplaints(); }, [brandId, filter, search]);

  async function fetchComplaints() {
    setLoading(true);
    let query = supabase
      .from('complaints')
      .select('*, user:users(full_name)')
      .eq('brand_id', brandId!)
      .order('created_at', { ascending: false });

    if (filter !== 'all') query = query.eq('status', filter);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data } = await query;
    setComplaints((data as (Complaint & { user: { full_name: string } })[]) || []);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Şikayetler</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Şikayet ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="pending">Beklemede</TabsTrigger>
          <TabsTrigger value="brand_responded">Yanıtlandı</TabsTrigger>
          <TabsTrigger value="resolved">Çözüldü</TabsTrigger>
          <TabsTrigger value="escalated">Yükseltildi</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <Card key={i} className="animate-pulse"><CardContent className="p-4"><div className="h-14 bg-gray-100 rounded" /></CardContent></Card>)}</div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <Link key={c.id} href={`/marka-panel/sikayetler/${c.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                      <Badge variant="outline">{COMPLAINT_CATEGORY_LABELS[c.category]}</Badge>
                    </div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.user?.full_name} &middot; {formatRelativeTime(c.created_at)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
