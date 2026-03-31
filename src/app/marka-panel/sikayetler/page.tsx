'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import {
  Search, ChevronDown, SlidersHorizontal, X,
  Calendar, ArrowRight, Brain, Clock,
  CheckCircle, XCircle,
} from 'lucide-react';
import type { Complaint } from '@/types';

// ── star color by rating ─────────────────────────────────────────────────────
const starColor = (r: number) => r >= 4 ? '#52b37f' : r === 3 ? '#dbbf24' : '#ef4444';

function StarRow({ rating, size = 20 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  const c = filled > 0 ? starColor(filled) : '#dde0e3';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <div
          key={s}
          style={{
            width: size, height: size,
            background: s <= filled ? c : '#dde0e3',
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/star_icon.png" alt=""
            style={{ width: size * 0.6, height: size * 0.6, filter: 'brightness(0) invert(1)', objectFit: 'contain' }}
          />
        </div>
      ))}
    </div>
  );
}

type ComplaintRow = Complaint & { user: { full_name: string }; reviewRating?: number };

// ── pill filter ──────────────────────────────────────────────────────────────
function PillFilter({ label, value, options, onChange }: {
  label: string; value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const active = value !== 'all';
  return (
    <div className="relative shrink-0">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className={`appearance-none text-xs sm:text-sm rounded-md border px-3 py-1.5 pr-7 cursor-pointer focus:outline-none transition-colors ${
          active ? 'border-[#3c57bc] bg-white text-[#3c57bc] font-medium' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
        }`}
      >
        <option value="all">{label}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </span>
    </div>
  );
}

// ── complaint card ───────────────────────────────────────────────────────────
function ComplaintCard({ c, onClick }: { c: ComplaintRow; onClick: () => void }) {
  const reviewRating = c.rating || c.reviewRating || 0;
  const dateStr = new Date(c.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  const isResolved = c.status === 'resolved' || c.status === 'closed';

  const statusBadge: Record<string, { label: string; cls: string }> = {
    pending:           { label: 'Beklemede',         cls: 'bg-gray-100 text-gray-600' },
    in_review:         { label: 'Inceleniyor',       cls: 'bg-blue-50 text-blue-600' },
    brand_responded:   { label: 'Yanitlandi',        cls: 'bg-indigo-50 text-indigo-600' },
    awaiting_customer: { label: 'Musteri Bekleniyor', cls: 'bg-amber-50 text-amber-600' },
    resolved:          { label: 'Cozuldu',           cls: 'bg-green-50 text-green-600' },
    closed:            { label: 'Kapatildi',         cls: 'bg-gray-100 text-gray-500' },
    escalated:         { label: 'Yukseltildi',       cls: 'bg-red-50 text-red-600' },
  };
  const badge = statusBadge[c.status] ?? { label: c.status, cls: 'bg-gray-100 text-gray-500' };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      {/* Stars + date */}
      <div className="flex items-start justify-between mb-4">
        <StarRow rating={reviewRating} size={20} />
        <span className="text-xs sm:text-sm text-gray-400 shrink-0 ml-3 mt-0.5">{dateStr}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
        <span className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-full">
          {COMPLAINT_CATEGORY_LABELS[c.category]}
        </span>
        {c.status === 'awaiting_customer' && (
          <span className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
            <Brain className="w-3 h-3" /> AI onayladi
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-bold text-[#1b1a1b] mb-1">{c.title}</p>
      {c.description && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{c.description}</p>
      )}

      {/* Meta */}
      <div className="text-xs text-gray-400 space-y-0.5 mb-5">
        <p>tarafindan <span className="text-gray-600 font-medium">{c.user?.full_name}</span> · {formatRelativeTime(c.created_at)}</p>
        <p className="font-mono">{c.complaint_number}</p>
      </div>

      {/* CTA button */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {c.status === 'pending' && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Yanit bekliyor</span>}
          {c.status === 'resolved' && <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-3.5 h-3.5" /> Cozuldu</span>}
        </span>
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-full transition-colors"
          style={{ background: '#3c57bc' }}
        >
          Sikayeti incele
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── main page ────────────────────────────────────────────────────────────────
export default function BrandComplaintsPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [starFilter, setStarFilter] = useState('all');
  const [replyFilter, setReplyFilter] = useState('all');
  const [resolutionFilter, setResolutionFilter] = useState('all');
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (member) setBrandId((member as { brand_id: string }).brand_id);
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (brandId) loadComplaints();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId, search]);

  async function loadComplaints() {
    setLoading(true);
    let q = supabase
      .from('complaints')
      .select('*, user:users(full_name)')
      .eq('brand_id', brandId!)
      .order('created_at', { ascending: false });
    if (search) q = q.ilike('title', `%${search}%`);
    const { data: complaintsData } = await q;

    // Fetch reviews separately and match by complaint_id
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('complaint_id, rating')
      .eq('brand_id', brandId!)
      .not('complaint_id', 'is', null);

    const reviewMap = new Map<string, number>();
    (reviewsData || []).forEach((r: { complaint_id: string; rating: number }) => {
      reviewMap.set(r.complaint_id, r.rating);
    });

    const merged = (complaintsData || []).map((c: ComplaintRow) => ({
      ...c,
      reviewRating: c.rating || reviewMap.get(c.id) || 0,
    }));

    setComplaints(merged as ComplaintRow[]);
    setLoading(false);
  }

  // sidebar stats
  const ms28 = 28 * 24 * 60 * 60 * 1000;
  const recent = complaints.filter(c => Date.now() - new Date(c.created_at).getTime() < ms28);
  const awaitingReply = recent.filter(c => c.status === 'pending' || c.status === 'in_review').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
  const unresolvedCount = complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length;
  const starCounts = [1, 2, 3, 4, 5].map(s => ({
    star: s, count: recent.filter(c => (c.rating || c.reviewRating || 0) === s).length,
  }));

  // client-side filter
  const filtered = complaints.filter(c => {
    if (replyFilter === 'awaiting' && c.status !== 'pending' && c.status !== 'in_review') return false;
    if (replyFilter === 'replied' && c.status !== 'brand_responded' && c.status !== 'awaiting_customer') return false;
    if (starFilter !== 'all' && (c.rating || c.reviewRating || 0) !== Number(starFilter)) return false;
    if (resolutionFilter === 'resolved' && c.status !== 'resolved' && c.status !== 'closed') return false;
    if (resolutionFilter === 'unresolved' && (c.status === 'resolved' || c.status === 'closed')) return false;
    return true;
  });

  const hasFilter = starFilter !== 'all' || replyFilter !== 'all' || resolutionFilter !== 'all' || search !== '';

  const SidebarContent = () => (
    <div className="p-5">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Durum</p>
      <div className="space-y-0.5 mb-5">
        {[
          { value: 'all', label: 'Tum sikayetler', count: complaints.length, icon: null },
          { value: 'resolved', label: 'Cozuldu', count: resolvedCount, icon: CheckCircle },
          { value: 'unresolved', label: 'Cozulmedi', count: unresolvedCount, icon: XCircle },
        ].map(item => (
          <button
            key={item.value}
            onClick={() => { setResolutionFilter(item.value === resolutionFilter ? 'all' : item.value); setMobileOpen(false); }}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${resolutionFilter === item.value ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="flex items-center gap-1.5">
              {item.icon && <item.icon className="w-3.5 h-3.5" />}
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-400">{item.count}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Yanit durumu</p>
      <div className="space-y-0.5 mb-5">
        <button
          onClick={() => { setReplyFilter(replyFilter === 'awaiting' ? 'all' : 'awaiting'); setMobileOpen(false); }}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${replyFilter === 'awaiting' ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          <span>Yanit bekliyor</span>
          <span className="text-sm font-semibold text-gray-400">{awaitingReply}</span>
        </button>
      </div>

      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Yildiz puani</p>
      <div className="space-y-0.5">
        {[5, 4, 3, 2, 1].map(s => {
          const cnt = starCounts.find(x => x.star === s)?.count ?? 0;
          const active = starFilter === String(s);
          return (
            <button
              key={s}
              onClick={() => { setStarFilter(active ? 'all' : String(s)); setMobileOpen(false); }}
              className={`w-full flex items-center justify-between rounded-lg pl-3 pr-3 py-2 text-sm transition-colors ${active ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span>{s} yildiz</span>
              <span className="text-sm font-semibold text-gray-400">{cnt}</span>
            </button>
          );
        })}
      </div>

      {hasFilter && (
        <button
          onClick={() => { setStarFilter('all'); setReplyFilter('all'); setResolutionFilter('all'); setSearch(''); setMobileOpen(false); }}
          className="mt-4 w-full flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 hover:text-gray-600"
        >
          <X className="w-3 h-3" /> Filtreleri temizle
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl">
      {/* top bar */}
      <div className="border-b border-gray-200 bg-white -mx-4 md:-mx-8 px-4 md:px-8 mb-5">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
          <div className="relative shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Ara"
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-[#3c57bc] w-32 sm:w-40"
            />
          </div>
          <PillFilter label="Yildiz puani" value={starFilter} onChange={setStarFilter} options={[{value:'5',label:'5 yildiz'},{value:'4',label:'4 yildiz'},{value:'3',label:'3 yildiz'},{value:'2',label:'2 yildiz'},{value:'1',label:'1 yildiz'}]} />
          <PillFilter label="Yanit" value={replyFilter} onChange={setReplyFilter} options={[{value:'awaiting',label:'Yanit bekliyor'},{value:'replied',label:'Yanitlandi'}]} />
          <PillFilter label="Durum" value={resolutionFilter} onChange={setResolutionFilter} options={[{value:'resolved',label:'Cozuldu'},{value:'unresolved',label:'Cozulmedi'}]} />
          <button className="shrink-0 flex items-center gap-1.5 text-xs sm:text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 hover:border-gray-400 bg-white whitespace-nowrap">
            Tarih <Calendar className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden shrink-0 flex items-center gap-1.5 text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 bg-white ml-auto"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="hidden lg:block shrink-0 ml-auto px-5 py-1.5 text-sm font-semibold text-white rounded-md" style={{ background: '#3c57bc' }}>Disa Aktar</button>
        </div>
      </div>

      <div className="flex gap-0 items-start">
        {/* sidebar desktop */}
        <div className="hidden lg:block w-60 shrink-0 border-r border-gray-200 min-h-[60vh]"><SidebarContent /></div>

        {/* mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64 sm:w-72 bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
                <p className="text-sm font-bold text-[#1b1a1b]">Filtreler</p>
                <button onClick={() => setMobileOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* list */}
        <div className="flex-1 min-w-0 lg:pl-6 space-y-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 animate-pulse">
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <div key={j} className="w-5 h-5 bg-gray-200" />)}</div>
                <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-2" />
                <div className="h-3 w-full bg-gray-100 rounded-full mb-1" />
                <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 py-24 text-center">
              <p className="text-sm text-gray-400">{complaints.length === 0 ? 'Henuz sikayet yok.' : 'Eslesen sikayet bulunamadi.'}</p>
              {hasFilter && <button onClick={() => { setStarFilter('all'); setReplyFilter('all'); setResolutionFilter('all'); setSearch(''); }} className="mt-3 text-sm text-[#3c57bc] hover:underline">Filtreleri temizle</button>}
            </div>
          ) : (
            filtered.map(c => (
              <ComplaintCard key={c.id} c={c} onClick={() => router.push(`/marka-panel/sikayetler/${c.id}`)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
