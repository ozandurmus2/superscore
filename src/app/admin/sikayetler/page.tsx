'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Search } from 'lucide-react';
import type { Complaint } from '@/types';

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<(Complaint & { brand: { name: string }; user: { full_name: string } })[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => { fetch(); }, [filter, search]);

  async function fetch() {
    let query = supabase.from('complaints').select('*, brand:brands(name), user:users(full_name)').order('created_at', { ascending: false }).limit(100);
    if (filter !== 'all') query = query.eq('status', filter);
    if (search) query = query.ilike('title', `%${search}%`);
    const { data } = await query;
    setComplaints((data as typeof complaints) || []);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Tüm Şikayetler</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="pending">Beklemede</TabsTrigger>
          <TabsTrigger value="escalated">Yükseltildi</TabsTrigger>
          <TabsTrigger value="resolved">Çözüldü</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-2">
        {complaints.map((c) => (
          <Card key={c.id} className={c.status === 'escalated' ? 'border-red-200 bg-red-50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
              </div>
              <p className="font-medium text-sm">{c.title}</p>
              <p className="text-xs text-gray-500">{c.brand?.name} &middot; {c.user?.full_name} &middot; {formatRelativeTime(c.created_at)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
