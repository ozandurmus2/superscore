'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatRelativeTime } from '@/lib/utils';
import {
  Search, ChevronDown, SlidersHorizontal, X,
  Calendar, Send, Loader2, Flag, Share2, Info,
} from 'lucide-react';
import type { Review } from '@/types';

// ── star row ──────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 20 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <div
          key={s}
          style={{ width: size, height: size, background: s <= filled ? '#52b37f' : '#dde0e3', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/star_icon.png" alt="" style={{ width: size * 0.6, height: size * 0.6, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  );
}

type ReviewRow = Review & { user: { full_name: string } };
type CardAction = 'reply' | 'share' | 'info' | null;

// ── pill filter ───────────────────────────────────────────────────────────────
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
        className={`appearance-none text-xs sm:text-sm rounded-md border px-3 py-1.5 pr-7 cursor-pointer focus:outline-none transition-colors ${active ? 'border-[#3c57bc] bg-white text-[#3c57bc] font-medium' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
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

// ── review card ───────────────────────────────────────────────────────────────
function ReviewCard({ rev }: { rev: ReviewRow }) {
  const [action, setAction] = useState<CardAction>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  function toggle(a: CardAction) {
    setAction(prev => prev === a ? null : a);
    if (a === 'reply') setTimeout(() => textRef.current?.focus(), 60);
  }

  async function postReply() {
    if (!replyText.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 700));
    setSending(false);
    setReplyText('');
    setAction(null);
  }

  const dateStr = new Date(rev.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      {/* Stars + date */}
      <div className="flex items-start justify-between mb-4">
        <StarRow rating={rev.rating} />
        <span className="text-xs sm:text-sm text-gray-400 shrink-0 ml-3 mt-0.5">{dateStr}</span>
      </div>

      {/* Title + comment */}
      {rev.title && <p className="text-sm font-bold text-[#1b1a1b] mb-1">{rev.title}</p>}
      <p className="text-sm text-[#1b1a1b] leading-relaxed">{rev.comment}</p>

      {/* Meta */}
      <div className="mt-4 space-y-0.5 text-sm text-gray-500">
        <p>tarafından <span className="text-[#1b1a1b] font-medium underline underline-offset-2 cursor-pointer">{rev.user?.full_name || 'Anonim'}</span></p>
        <p className="text-xs">Kaynak: Otomatik Davet</p>
        {rev.is_verified_purchase && <p className="text-xs text-[#52b37f] font-medium">Doğrulanmış satın alma</p>}
      </div>

      {/* Action tab row */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {[
            { id: 'reply' as CardAction, label: 'Cevap vermek', Icon: null },
            { id: 'share' as CardAction, label: 'Paylaşmak',    Icon: Share2 },
            { id: 'info'  as CardAction, label: 'Bilgi isteyin', Icon: Info  },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => toggle(tab.id)}
              className={`relative shrink-0 whitespace-nowrap px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors ${action === tab.id ? 'text-[#3c57bc]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="flex items-center gap-1">
                {tab.Icon && <tab.Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {tab.label}
              </span>
              {action === tab.id && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#3c57bc] rounded-full" />}
            </button>
          ))}
        </div>
        <button className="text-gray-300 hover:text-gray-500 transition-colors ml-2 shrink-0"><Flag className="w-4 h-4" /></button>
      </div>

      {/* Reply area */}
      {action === 'reply' && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#3c57bc] focus-within:ring-1 focus-within:ring-[#3c57bc] transition-all">
              <textarea
                ref={textRef}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Bir yanıt yazın..."
                rows={2}
                className="w-full px-4 py-3 text-sm resize-none focus:outline-none"
              />
            </div>
            <button
              onClick={postReply}
              disabled={sending || !replyText.trim()}
              className="sm:shrink-0 px-5 py-3 rounded-lg text-sm font-semibold transition-colors disabled:cursor-default flex items-center justify-center gap-2"
              style={{ background: replyText.trim() ? '#3c57bc' : '#e5e7eb', color: replyText.trim() ? '#fff' : '#9ca3af' }}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Yanıt gönder</span>
            </button>
          </div>
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-gray-400">i</span>
            </div>
            <span>Bu değerlendirme, Güven Puanınıza dahil edilir. Sadece bu müşterinin en son değerlendirmesi sayılır.{' '}
              <span className="text-[#3c57bc] cursor-pointer hover:underline">Daha fazla bilgi edinin.</span>
            </span>
          </div>
        </>
      )}
      {action === 'share' && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-400 text-center">Paylaşım özelliği yakında aktif olacak.</div>
      )}
      {action === 'info' && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-400 text-center">Müşteriden ek bilgi isteyin özelliği yakında aktif olacak.</div>
      )}
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────
export default function DegerlendirmelerPage() {
  const [reviews,     setReviews]     = useState<ReviewRow[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState('');
  const [starFilter,  setStarFilter]  = useState('all');
  const [replyFilter, setReplyFilter] = useState('all');
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) return;
      const bid = (member as { brand_id: string }).brand_id;

      let q = supabase
        .from('reviews')
        .select('*, user:users(full_name)')
        .eq('brand_id', bid)
        .order('created_at', { ascending: false });
      if (search) q = q.ilike('comment', `%${search}%`);

      const { data } = await q;
      setReviews((data as ReviewRow[]) || []);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // sidebar stats
  const ms28 = 28 * 24 * 60 * 60 * 1000;
  const recent = reviews.filter(r => Date.now() - new Date(r.created_at).getTime() < ms28);
  const awaitingReply = recent.length;
  const starCounts = [1, 2, 3, 4, 5].map(s => ({ star: s, count: recent.filter(r => Math.round(r.rating) === s).length }));

  // client-side filter
  const filtered = reviews.filter(r => {
    if (starFilter !== 'all' && Math.round(r.rating) !== Number(starFilter)) return false;
    return true;
  });

  const hasFilter = starFilter !== 'all' || replyFilter !== 'all' || search !== '';

  const SidebarContent = () => (
    <div className="p-5">
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Son 28 günden</p>
      <div className="space-y-0.5">
        <button
          onClick={() => { setReplyFilter(replyFilter === 'awaiting' ? 'all' : 'awaiting'); setMobileOpen(false); }}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${replyFilter === 'awaiting' ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          <span>Yanıt bekliyor</span>
          <span className="text-sm font-semibold text-gray-400">{awaitingReply}</span>
        </button>
        {[1, 2, 3, 4, 5].map(s => {
          const cnt = starCounts.find(x => x.star === s)?.count ?? 0;
          const active = starFilter === String(s);
          return (
            <button
              key={s}
              onClick={() => { setStarFilter(active ? 'all' : String(s)); setMobileOpen(false); }}
              className={`w-full flex items-center justify-between rounded-lg pl-6 pr-3 py-2 text-sm transition-colors ${active ? 'bg-[#eef1f9] text-[#3c57bc] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span>{s} yıldız değerlendirmeler</span>
              <span className="text-sm font-semibold text-gray-400">{cnt}</span>
            </button>
          );
        })}
      </div>
      {hasFilter && (
        <button
          onClick={() => { setStarFilter('all'); setReplyFilter('all'); setSearch(''); setMobileOpen(false); }}
          className="mt-4 w-full flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 hover:text-gray-600"
        >
          <X className="w-3 h-3" /> Filtreleri temizle
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl">
      {/* top bar — horizontal scroll on mobile */}
      <div className="border-b border-gray-200 bg-white -mx-4 md:-mx-8 px-4 md:px-8 mb-5">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
          {/* search */}
          <div className="relative shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Ara"
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-[#3c57bc] w-32 sm:w-40"
            />
          </div>
          <PillFilter label="Yıldız puanı" value={starFilter} onChange={setStarFilter} options={[{value:'5',label:'5 yıldız'},{value:'4',label:'4 yıldız'},{value:'3',label:'3 yıldız'},{value:'2',label:'2 yıldız'},{value:'1',label:'1 yıldız'}]} />
          <PillFilter label="Yanıt" value={replyFilter} onChange={setReplyFilter} options={[{value:'awaiting',label:'Yanıt bekliyor'},{value:'replied',label:'Yanıtlandı'}]} />
          <button className="shrink-0 flex items-center gap-1.5 text-xs sm:text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 hover:border-gray-400 bg-white whitespace-nowrap">
            Tarih <Calendar className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button className="shrink-0 text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-1 whitespace-nowrap">Daha fazla filtre</button>
          {/* mobile filter trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden shrink-0 flex items-center gap-1.5 text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 bg-white ml-auto"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          {/* export — desktop only */}
          <button className="hidden lg:block shrink-0 ml-auto px-5 py-1.5 text-sm font-semibold text-white rounded-md" style={{ background: '#3c57bc' }}>Dışa Aktar</button>
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
              <p className="text-sm text-gray-400">{reviews.length === 0 ? 'Henüz değerlendirme yok.' : 'Eşleşen değerlendirme bulunamadı.'}</p>
              {hasFilter && <button onClick={() => { setStarFilter('all'); setReplyFilter('all'); setSearch(''); }} className="mt-3 text-sm text-[#3c57bc] hover:underline">Filtreleri temizle</button>}
            </div>
          ) : (
            filtered.map(r => <ReviewCard key={r.id} rev={r} />)
          )}
        </div>
      </div>
    </div>
  );
}
