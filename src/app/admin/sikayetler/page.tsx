'use client';

import { useState, useEffect, useCallback, Fragment } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import {
  COMPLAINT_STATUS_LABELS,
  COMPLAINT_STATUS_COLORS,
} from '@/types';
import type { Complaint, ComplaintStatus, ComplaintPriority } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Search, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

type ComplaintRow = Omit<Complaint, 'brand' | 'user' | 'responses'> & {
  brand: { name: string };
  user: { full_name: string };
  responses?: { id: string; message: string; response_type: string; created_at: string; user: { full_name: string } }[];
};

const PRIORITY_COLORS: Record<ComplaintPriority, string> = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const PRIORITY_LABELS: Record<ComplaintPriority, string> = {
  low: 'Dusuk',
  medium: 'Orta',
  high: 'Yuksek',
  urgent: 'Acil',
};

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'Tumu' },
  { value: 'pending', label: 'Beklemede' },
  { value: 'in_review', label: 'Incelemede' },
  { value: 'brand_responded', label: 'Marka Yanitladi' },
  { value: 'resolved', label: 'Cozuldu' },
  { value: 'closed', label: 'Kapatildi' },
];

const PAGE_SIZE = 30;

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const supabase = createClient();

  const fetchComplaints = useCallback(async (reset = false) => {
    setLoading(true);
    const currentPage = reset ? 0 : page;
    if (reset) setPage(0);

    let query = supabase
      .from('complaints')
      .select('*, brand:brands(name), user:users(full_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

    if (filter !== 'all') query = query.eq('status', filter);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data, count } = await query;
    const rows = (data as ComplaintRow[]) || [];

    if (reset) {
      setComplaints(rows);
    } else {
      setComplaints((prev) => (currentPage === 0 ? rows : [...prev, ...rows]));
    }
    setTotalCount(count || 0);
    setHasMore(rows.length === PAGE_SIZE);
    setLoading(false);
  }, [filter, search, page]);

  useEffect(() => {
    fetchComplaints(true);
  }, [filter, search]);

  async function handleStatusChange(complaintId: string, newStatus: ComplaintStatus) {
    const updateData: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'resolved') updateData.resolved_at = new Date().toISOString();

    await supabase.from('complaints').update(updateData).eq('id', complaintId);
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, status: newStatus } : c))
    );
  }

  async function toggleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    // Fetch responses for this complaint
    const complaint = complaints.find((c) => c.id === id);
    if (complaint && !complaint.responses) {
      const { data } = await supabase
        .from('complaint_responses')
        .select('*, user:users(full_name)')
        .eq('complaint_id', id)
        .order('created_at', { ascending: true });
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, responses: (data as ComplaintRow['responses']) || [] } : c
        )
      );
    }
    setExpandedId(id);
  }

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    // fetch manually for next page
    (async () => {
      let query = supabase
        .from('complaints')
        .select('*, brand:brands(name), user:users(full_name)')
        .order('created_at', { ascending: false })
        .range(nextPage * PAGE_SIZE, (nextPage + 1) * PAGE_SIZE - 1);
      if (filter !== 'all') query = query.eq('status', filter);
      if (search) query = query.ilike('title', `%${search}%`);
      const { data } = await query;
      const rows = (data as ComplaintRow[]) || [];
      setComplaints((prev) => [...prev, ...rows]);
      setHasMore(rows.length === PAGE_SIZE);
    })();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1F3B]">Sikayetler</h1>
          <p className="text-sm text-gray-500 mt-1">Toplam {totalCount} sikayet</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Sikayet ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList className="flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">#</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Baslik</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Marka</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Kullanici</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Durum</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden lg:table-cell">Oncelik</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden lg:table-cell">Tarih</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs w-10" />
              </tr>
            </thead>
            <tbody>
              {loading && complaints.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    Sikayet bulunamadi
                  </td>
                </tr>
              ) : (
                complaints.map((c) => (
                  <Fragment key={c.id}>
                    <tr
                      className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                      onClick={() => toggleExpand(c.id)}
                    >
                      <td className="px-4 py-3 text-xs text-gray-400 font-mono">{c.complaint_number}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 truncate max-w-[200px] lg:max-w-[300px]">{c.title}</p>
                        <p className="text-xs text-gray-400 md:hidden">
                          {c.brand?.name} &middot; {c.user?.full_name}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{c.brand?.name}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{c.user?.full_name}</td>
                      <td className="px-4 py-3">
                        <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
                          {COMPLAINT_STATUS_LABELS[c.status]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <Badge className={PRIORITY_COLORS[c.priority]} variant="secondary">
                          {PRIORITY_LABELS[c.priority]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell whitespace-nowrap">
                        {formatRelativeTime(c.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {expandedId === c.id ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </td>
                    </tr>
                    {expandedId === c.id && (
                      <tr>
                        <td colSpan={8} className="bg-gray-50 px-6 py-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">Aciklama</p>
                              <p className="text-sm text-gray-700">{c.description}</p>
                            </div>

                            {/* Status change */}
                            <div className="flex items-center gap-3">
                              <p className="text-xs font-medium text-gray-500">Durum Degistir:</p>
                              <Select
                                value={c.status}
                                onValueChange={(val) => handleStatusChange(c.id, val as ComplaintStatus)}
                              >
                                <SelectTrigger className="h-8 w-48 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(COMPLAINT_STATUS_LABELS).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Responses */}
                            {c.responses && c.responses.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">Yanitlar ({c.responses.length})</p>
                                <div className="space-y-2">
                                  {c.responses.map((r) => (
                                    <div key={r.id} className="bg-white p-3 rounded-lg border border-gray-100">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-gray-700">{r.user?.full_name}</span>
                                        <Badge variant="secondary" className="text-[10px]">{r.response_type}</Badge>
                                        <span className="text-xs text-gray-400">{formatRelativeTime(r.created_at)}</span>
                                      </div>
                                      <p className="text-sm text-gray-600">{r.message}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-6 py-2 text-sm font-medium text-[#1B1F3B] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Daha Fazla Yukle
          </button>
        </div>
      )}
    </div>
  );
}
