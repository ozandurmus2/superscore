'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { formatRelativeTime } from '@/lib/utils';
import { COMPLAINT_CATEGORY_LABELS } from '@/types';
import type { Review, Complaint } from '@/types';
import {
  Search, ChevronDown, Send, Loader2,
  Flag, Share2, Info, Calendar,
  SlidersHorizontal, X, ArrowRight, Brain, Clock,
} from 'lucide-react';

// ── star color by rating ─────────────────────────────────────────────────────
const starColor = (r: number) => r >= 4 ? '#52b37f' : r === 3 ? '#dbbf24' : r > 0 ? '#ef4444' : '#dde0e3';

function StarRow({ rating, size = 20 }: { rating: number; size?: number }) {
  const c = starColor(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <div
          key={s}
          style={{
            width: size, height: size,
            background: s <= rating ? c : '#dde0e3',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/star_icon.png" alt="" style={{ width: size * 0.6, height: size * 0.6, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  );
}

type ReviewRow = Review & { user: { full_name: string } };
type ComplaintRow = Complaint & { user: { full_name: string }; reviewRating?: number };
type FeedItem = { kind: 'review'; data: ReviewRow } | { kind: 'complaint'; data: ComplaintRow };
type CardTab = 'reply' | 'share' | 'info' | null;

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

// ── review card ──────────────────────────────────────────────────────────────
function ReviewCard({ rev }: { rev: ReviewRow }) {
  const [activeTab, setActiveTab] = useState<CardTab>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function openTab(t: CardTab) {
    setActiveTab(prev => prev === t ? null : t);
    if (t === 'reply') setTimeout(() => textareaRef.current?.focus(), 50);
  }

  async function sendReply() {
    if (!replyText.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 700));
    setSending(false);
    setReplyText('');
    setActiveTab(null);
  }

  const dateStr = new Date(rev.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <StarRow rating={rev.rating} size={20} />
        <span className="text-xs sm:text-sm text-gray-400 shrink-0 ml-3 mt-0.5">{dateStr}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {rev.is_verified_purchase && (
          <span className="text-xs font-medium bg-green-50 text-green-600 border border-green-100 px-2.5 py-1 rounded-full">Dogrulanmis</span>
        )}
        <span className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-full">Degerlendirme</span>
      </div>

      {rev.title && <p className="text-sm font-bold text-[#1b1a1b] mb-1">{rev.title}</p>}
      {rev.comment && <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{rev.comment}</p>}

      <div className="text-xs text-gray-400 space-y-0.5 mb-5">
        <p>tarafindan <span className="text-gray-600 font-medium">{rev.user?.full_name || 'Anonim'}</span> · {formatRelativeTime(rev.created_at)}</p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-0 overflow-x-auto">
          {[
            { id: 'reply' as CardTab, label: 'Cevap ver', icon: null },
            { id: 'share' as CardTab, label: 'Paylas', icon: Share2 },
            { id: 'info' as CardTab, label: 'Bilgi iste', icon: Info },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => openTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-[#3c57bc]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab.icon && <tab.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#3c57bc] rounded-full" />}
            </button>
          ))}
        </div>
        <button className="text-gray-300 hover:text-gray-500 ml-1 shrink-0"><Flag className="w-4 h-4" /></button>
      </div>

      {activeTab === 'reply' && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="flex-1 border border-gray-300 rounded-xl overflow-hidden focus-within:border-[#3c57bc] focus-within:ring-1 focus-within:ring-[#3c57bc]">
              <textarea ref={textareaRef} value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Bir yanit yazin..." rows={2} className="w-full px-4 py-3 text-sm resize-none focus:outline-none" />
            </div>
            <button
              onClick={sendReply}
              disabled={sending || !replyText.trim()}
              className="sm:shrink-0 px-5 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: replyText.trim() ? '#3c57bc' : '#e5e7eb', color: replyText.trim() ? '#fff' : '#9ca3af' }}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Yanit gonder
            </button>
          </div>
          <div className="flex items-start gap-2 mt-3 text-xs text-gray-500">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span>Bu yorum Guven Puaniniza dahil edilmez. Sadece bu musterinin en son yorumu dikkate alinir.</span>
          </div>
        </>
      )}
      {activeTab === 'share' && <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-400 text-center">Paylasim ozelligi yakinda aktif olacak.</div>}
      {activeTab === 'info' && <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-400 text-center">Musteriden ek bilgi isteyin ozelligi yakinda.</div>}
    </div>
  );
}

// ── complaint card ───────────────────────────────────────────────────────────
function ComplaintCard({ c, onClick }: { c: ComplaintRow; onClick: () => void }) {
  const dateStr = new Date(c.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  const statusBadge: Record<string, { label: string; cls: string }> = {
    pending:           { label: 'Beklemede',          cls: 'bg-gray-100 text-gray-600' },
    in_review:         { label: 'Inceleniyor',        cls: 'bg-blue-50 text-blue-600' },
    brand_responded:   { label: 'Yanitlandi',         cls: 'bg-indigo-50 text-indigo-600' },
    awaiting_customer: { label: 'Musteri Bekleniyor', cls: 'bg-amber-50 text-amber-600' },
    resolved:          { label: 'Cozuldu',            cls: 'bg-green-50 text-green-600' },
    closed:            { label: 'Kapatildi',          cls: 'bg-gray-100 text-gray-500' },
    escalated:         { label: 'Yukseltildi',        cls: 'bg-red-50 text-red-600' },
  };
  const badge = statusBadge[c.status] ?? { label: c.status, cls: 'bg-gray-100 text-gray-500' };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <StarRow rating={c.reviewRating || 0} size={20} />
        <span className="text-xs sm:text-sm text-gray-400 shrink-0 ml-3 mt-0.5">{dateStr}</span>
      </div>

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

      <p className="text-sm font-bold text-[#1b1a1b] mb-1">{c.title}</p>
      {c.description && <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{c.description}</p>}

      <div className="text-xs text-gray-400 space-y-0.5 mb-5">
        <p>tarafindan <span className="text-gray-600 font-medium">{c.user?.full_name}</span> · {formatRelativeTime(c.created_at)}</p>
        <p className="font-mono">{c.complaint_number}</p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {c.status === 'pending' && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Yanit bekliyor</span>}
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
export default function YorumlarPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [starFilter, setStarFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) return;
      const bid = (member as { brand_id: string }).brand_id;

      // Fetch reviews
      const { data: revData } = await supabase.from('reviews').select('*, user:users(full_name)').eq('brand_id', bid).order('created_at', { ascending: false });
      setReviews((revData as ReviewRow[]) || []);

      // Fetch complaints
      const { data: cmpData } = await supabase.from('complaints').select('*, user:users(full_name)').eq('brand_id', bid).order('created_at', { ascending: false });

      // Build review rating map by complaint_id
      const { data: reviewsWithComplaint } = await supabase
        .from('reviews')
        .select('complaint_id, rating')
        .eq('brand_id', bid)
        .not('complaint_id', 'is', null);

      const ratingMap = new Map<string, number>();
      (reviewsWithComplaint || []).forEach((r: { complaint_id: string; rating: number }) => {
        ratingMap.set(r.complaint_id, r.rating);
      });

      const merged = (cmpData || []).map((c: ComplaintRow) => ({
        ...c,
        reviewRating: ratingMap.get(c.id) || 0,
      }));

      setComplaints(merged as ComplaintRow[]);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build combined feed
  const feed: FeedItem[] = [];
  if (typeFilter !== 'complaints') {
    reviews.forEach(r => {
      if (starFilter !== 'all' && r.rating !== Number(starFilter)) return;
      if (search) {
        const q = search.toLowerCase();
        if (!r.comment?.toLowerCase().includes(q) && !r.title?.toLowerCase().includes(q) && !r.user?.full_name?.toLowerCase().includes(q)) return;
      }
      feed.push({ kind: 'review', data: r });
    });
  }
  if (typeFilter !== 'reviews') {
    complaints.forEach(c => {
      if (starFilter !== 'all' && (c.reviewRating || 0) !== Number(starFilter)) return;
      if (search) {
        const q = search.toLowerCase();
        if (!c.title?.toLowerCase().includes(q) && !c.description?.toLowerCase().includes(q) && !c.user?.full_name?.toLowerCase().includes(q)) return;
      }
      feed.push({ kind: 'complaint', data: c });
    });
  }
  feed.sort((a, b) => new Date(b.data.created_at).getTime() - new Date(a.data.created_at).getTime());

  // Sidebar stats
  const ms28 = 28 * 24 * 60 * 60 * 1000;
  const recentReviews = reviews.filter(r => Date.now() - new Date(r.created_at).getTime() < ms28);
  const allRatings = [
    ...recentReviews.map(r => r.rating),
    ...complaints.filter(c => Date.now() - new Date(c.created_at).getTime() < ms28 && (c.reviewRating || 0) > 0).map(c => c.reviewRating!),
  ];
  const starCounts = [1, 2, 3, 4, 5].map(s => ({
    star: s, count: allRatings.filter(r => r === s).length,
  }));

  const hasFilter = starFilter !== 'all' || typeFilter !== 'all' || search !== '';

  const SidebarContent = () => (
    <div className="p-5">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Son 28 gunden</p>
      <div className="space-y-0.5">
        {[
          { value: 'all', label: 'Tumunu gor', count: reviews.length + complaints.length },
          { value: 'reviews', label: 'Degerlendirmeler', count: reviews.length },
          { value: 'complaints', label: 'Sikayetler', count: complaints.length },
        ].map(item => (
          <button
            key={item.value}
            onClick={() => { setTypeFilter(item.value); setMobileOpen(false); }}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${typeFilter === item.value ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span>{item.label}</span>
            <span className="text-sm font-semibold text-gray-400">{item.count}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-5 mb-4">Yildiz puani</p>
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
          onClick={() => { setStarFilter('all'); setTypeFilter('all'); setSearch(''); setMobileOpen(false); }}
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
          <PillFilter label="Tur" value={typeFilter} onChange={setTypeFilter} options={[{value:'reviews',label:'Degerlendirmeler'},{value:'complaints',label:'Sikayetler'}]} />
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

        {/* feed */}
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
          ) : feed.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 py-24 text-center">
              <p className="text-sm text-gray-400">{reviews.length === 0 && complaints.length === 0 ? 'Henuz yorum veya sikayet yok.' : 'Eslesen sonuc bulunamadi.'}</p>
              {hasFilter && <button onClick={() => { setStarFilter('all'); setTypeFilter('all'); setSearch(''); }} className="mt-3 text-sm text-[#3c57bc] hover:underline">Filtreleri temizle</button>}
            </div>
          ) : (
            feed.map(item =>
              item.kind === 'review'
                ? <ReviewCard key={`r-${item.data.id}`} rev={item.data} />
                : <ComplaintCard key={`c-${item.data.id}`} c={item.data} onClick={() => router.push(`/marka-panel/sikayetler/${item.data.id}`)} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
