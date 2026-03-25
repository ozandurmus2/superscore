'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { ArrowRight, FileText } from 'lucide-react';
import type { Complaint, ComplaintStatus } from '@/types';

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<(Complaint & { brand: { name: string } })[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => { fetchComplaints(); }, [filter]);

  async function fetchComplaints() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let query = supabase
      .from('complaints')
      .select('*, brand:brands(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setComplaints((data as (Complaint & { brand: { name: string } })[]) || []);
    setLoading(false);
  }

  const filters: { value: string; label: string }[] = [
    { value: 'all', label: 'Tümü' },
    { value: 'pending', label: 'Beklemede' },
    { value: 'brand_responded', label: 'Yanıtlandı' },
    { value: 'resolved', label: 'Çözüldü' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Şikayetlerim</h1>

      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          {filters.map((f) => <TabsTrigger key={f.value} value={f.value}>{f.label}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Card key={i} className="animate-pulse"><CardContent className="p-4"><div className="h-14 bg-gray-100 rounded" /></CardContent></Card>)}
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Şikayet bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <Link key={c.id} href={`/panel/sikayetlerim/${c.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                    </div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.brand?.name} &middot; {formatRelativeTime(c.created_at)}</p>
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
