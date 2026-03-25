'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS, COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Search, ArrowRight, MessageSquare } from 'lucide-react';
import type { Complaint, ComplaintStatus, ComplaintCategory } from '@/types';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<(Complaint & { brand: { name: string; slug: string } })[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchComplaints();
  }, [search, status, category]);

  async function fetchComplaints() {
    setLoading(true);
    let query = supabase
      .from('complaints')
      .select('*, brand:brands(name, slug)')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (search) query = query.ilike('title', `%${search}%`);
    if (status && status !== 'all') query = query.eq('status', status);
    if (category && category !== 'all') query = query.eq('category', category);

    const { data } = await query;
    setComplaints((data as (Complaint & { brand: { name: string; slug: string } })[]) || []);
    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B1F3B] mb-2">Şikayetler</h1>
        <p className="text-gray-500">Tüm müşteri şikayetlerini görüntüleyin</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Şikayet ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            {(Object.entries(COMPLAINT_STATUS_LABELS) as [ComplaintStatus, string][]).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {(Object.entries(COMPLAINT_CATEGORY_LABELS) as [ComplaintCategory, string][]).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse"><CardContent className="p-4"><div className="h-16 bg-gray-100 rounded" /></CardContent></Card>
          ))}
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Şikayet bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <Link key={c.id} href={`/sikayetler/${c.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
                        {COMPLAINT_STATUS_LABELS[c.status]}
                      </Badge>
                      <Badge variant="outline">{COMPLAINT_CATEGORY_LABELS[c.category]}</Badge>
                    </div>
                    <h3 className="font-medium">{c.title}</h3>
                    <p className="text-sm text-gray-500">{c.brand?.name} &middot; {formatRelativeTime(c.created_at)}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
