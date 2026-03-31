'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ChevronRight, Calendar, Info, ChevronDown } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';
import type { Brand } from '@/types';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ─── Info dot ────────────────────────────────────────────────────────────── */
function InfoDot() {
  return <Info className="w-3.5 h-3.5 text-gray-400 inline-block ml-1 cursor-help" />;
}

/* ─── Onboarding card ─────────────────────────────────────────────────────── */
function OnboardingCard({ brand }: { brand: Brand }) {
  const steps = [
    { label: 'Profil bilgilerini tamamla', done: !!(brand.name && brand.website) },
    { label: 'Şirket açıklaması ekle', done: !!brand.description },
    { label: 'Logo yükle', done: !!brand.logo_url },
  ];
  const doneCount = steps.filter(s => s.done).length;
  const [open, setOpen] = useState(false);

  if (doneCount >= 3) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
      <div className="relative px-6 py-6 sm:py-8">
        {/* Decorative shapes */}
        <div className="absolute top-3 right-16 w-8 h-8 bg-[#d4f4e2] rounded rotate-12 opacity-60" />
        <div className="absolute top-6 right-6 w-5 h-5 bg-[#f5d0a9] rounded-sm rotate-45 opacity-50" />
        <div className="absolute bottom-4 left-8 w-6 h-6 bg-[#c7d2f5] rounded opacity-40" />

        <p className="text-base sm:text-lg font-bold text-[#1b1a1b] text-center mb-5">
          3 temel adımla işletmenizde güven oluşturun
        </p>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              {s.done ? (
                <div className="w-7 h-7 rounded-full bg-[#52b37f] flex items-center justify-center">
                  <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
                    <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
                  </svg>
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">
                  {i + 1}
                </div>
              )}
              {i < 2 && <div className="w-6 h-[2px] bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-[#52b37f] border border-[#52b37f] hover:bg-[#52b37f]/5 transition-colors"
          >
            Kuruluma devam edin
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-200 px-6 py-4 space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {s.done ? (
                  <div className="w-5 h-5 rounded-full bg-[#52b37f] flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="white" className="w-3 h-3">
                      <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-300" />
                )}
                <span className={`text-sm ${s.done ? 'text-gray-400 line-through' : 'text-[#1b1a1b] font-medium'}`}>
                  {s.label}
                </span>
              </div>
              {!s.done && (
                <Link href="/marka-panel/ayarlar/profil-sayfasi" className="text-xs font-semibold text-[#3c57bc] hover:underline">
                  Tamamla
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Types ───────────────────────────────────────────────────────────────── */
type ReviewRow = { id: string; rating: number; comment: string | null; created_at: string; status?: string };
type ComplaintRow = { id: string; status: string; created_at: string; reviews?: { rating: number }[] };

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function BrandDashboard() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sinceDate, setSinceDate] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id, brand:brands(*)')
        .eq('user_id', user.id)
        .single();
      if (!member) return;
      const b = (member as unknown as { brand: Brand }).brand;
      setBrand(b);

      // Since date — use brand created_at or 30 days ago whichever is more recent
      const brandDate = new Date(b.created_at);
      const thirtyAgo = new Date();
      thirtyAgo.setDate(thirtyAgo.getDate() - 30);
      const since = brandDate > thirtyAgo ? brandDate : thirtyAgo;
      setSinceDate(since.toISOString());

      // Reviews
      const { data: revs } = await supabase
        .from('reviews')
        .select('id, rating, comment, created_at')
        .eq('brand_id', b.id)
        .order('created_at', { ascending: false });
      setReviews((revs || []) as ReviewRow[]);

      // Complaints with review ratings
      const { data: comps } = await supabase
        .from('complaints')
        .select('id, status, created_at, reviews(rating)')
        .eq('brand_id', b.id)
        .order('created_at', { ascending: false });
      setComplaints((comps as unknown as ComplaintRow[]) || []);

      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-72 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!brand) return null;

  /* ── Computed stats ──────────────────────────────────────────────────────── */
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews
    : 0;

  // New reviews since date
  const newReviews = sinceDate
    ? reviews.filter(r => new Date(r.created_at) >= new Date(sinceDate)).length
    : totalReviews;

  // Rating distribution
  const ratingDist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) ratingDist[r.rating]++; });

  // Renkler star-rating.tsx ile birebir aynı
  const ratingLabels: Record<number, { label: string; color: string }> = {
    5: { label: 'Mükemmel', color: '#52b37f' },
    4: { label: 'Harika', color: '#8acd41' },
    3: { label: 'Ortalama', color: '#f7d047' },
    2: { label: 'Kötü', color: '#ef8d3f' },
    1: { label: 'Çok Kötü', color: '#eb4b34' },
  };

  // Awaiting reply — complaints that have reviews but are still pending/in_review
  const awaitingByStars: { stars: number; count: number }[] = [
    { stars: 5, count: 0 },
    { stars: 3, count: 0 },
    { stars: 1, count: 0 },
  ];
  complaints
    .filter(c => ['pending', 'in_review', 'awaiting_customer'].includes(c.status))
    .forEach(c => {
      const rating = c.reviews?.[0]?.rating ?? 0;
      if (rating >= 4) awaitingByStars[0].count++;
      else if (rating >= 2) awaitingByStars[1].count++;
      else awaitingByStars[2].count++;
    });

  // Invitations stats (placeholder from total)
  const totalComplaints = brand.total_complaints;
  const resolvedComplaints = brand.resolved_complaints;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

  const sinceDateLabel = sinceDate ? fmtDate(sinceDate) : '';

  return (
    <div className="space-y-6 pb-12">

      {/* ── Page title ─────────────────────────────────────────────────────── */}
      <h1 className="text-lg sm:text-xl font-bold text-[#1b1a1b]">
        {brand.name} için son duruma genel bakış
      </h1>

      {/* ── Onboarding card ────────────────────────────────────────────────── */}
      <OnboardingCard brand={brand} />

      {/* ── Service reviews heading ────────────────────────────────────────── */}
      <h2 className="text-base font-bold text-[#1b1a1b]">Hizmet değerlendirmeleri</h2>

      {/* ── 2×2 Grid ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ── Card 1: Current SuperScore ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Mevcut Superscore <InfoDot />
            </p>
            <Link href="/marka-panel/analitik" className="text-gray-400 hover:text-[#1b1a1b]">
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-[#1b1a1b]">{avgRating.toFixed(1)}</span>
            <StarRating rating={avgRating} size="md" />
          </div>
          <p className="text-xs text-gray-500">
            {totalReviews} değerlendirmeye göre
          </p>
        </div>

        {/* ── Card 2: New service reviews ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Yeni hizmet değerlendirmeleri <InfoDot />
            </p>
          </div>
          <p className="text-3xl font-bold text-[#1b1a1b] mb-2">{newReviews}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{sinceDateLabel}&apos;den beri</span>
          </div>
        </div>

        {/* ── Card 3: Awaiting reply ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Yanıt bekleyen <InfoDot />
            </p>
            <Link href="/marka-panel/sikayetler" className="text-gray-400 hover:text-[#1b1a1b]">
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="space-y-3">
            {awaitingByStars.map(a => (
              <div key={a.stars} className="flex items-center justify-between">
                <StarRating rating={a.stars} size="xs" />
                <span className="text-xl font-bold text-[#1b1a1b]">{a.count}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>{sinceDateLabel}&apos;den beri</span>
          </div>
        </div>

        {/* ── Card 4: Distribution of stars ────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Yıldız dağılımı <InfoDot />
            </p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratingDist[star];
              const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              const { label, color } = ratingLabels[star];
              return (
                <div key={star} className="flex items-center gap-2.5">
                  <span className="text-xs font-medium text-[#1b1a1b] w-16 shrink-0">{label}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full rounded-sm transition-all"
                      style={{ width: `${pct}%`, background: color, minWidth: pct > 0 ? 4 : 0 }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right shrink-0">{pct}%</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>{sinceDateLabel}&apos;den beri</span>
          </div>
        </div>
      </div>

      {/* ── Invitations / Activity section ─────────────────────────────────── */}
      <h2 className="text-base font-bold text-[#1b1a1b]">Davetiyeler</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Davet istatistikleri */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Davetiye dönüşümü <InfoDot />
            </p>
            <Link href="/marka-panel/davetiyeler" className="text-gray-400 hover:text-[#1b1a1b]">
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-[#1b1a1b]">{resolutionRate}%</span>
            <span className="text-sm text-gray-500">çözüm oranı</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{totalComplaints} toplam talep</span>
            <span>{resolvedComplaints} çözülen</span>
          </div>
        </div>

        {/* Ort. yanıt süresi */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500">
              Ortalama yanıt süresi <InfoDot />
            </p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-[#1b1a1b]">
              {brand.avg_response_time_hours
                ? brand.avg_response_time_hours < 24
                  ? `${Math.round(brand.avg_response_time_hours)} saat`
                  : `${Math.round(brand.avg_response_time_hours / 24)} gün`
                : '—'}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Müşteri taleplerine ortalama yanıt süreniz
          </p>
        </div>
      </div>

      {/* ── Genel bakış / Performance ──────────────────────────────────────── */}
      <h2 className="text-base font-bold text-[#1b1a1b]">Genel performans</h2>

      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Superscore', value: brand.superscore.toFixed(1), color: '#52b37f' },
            { label: 'Toplam Değerlendirme', value: totalReviews.toString(), color: '#3c57bc' },
            { label: 'Toplam Talep', value: totalComplaints.toString(), color: '#f59e0b' },
            { label: 'Çözüm Oranı', value: `%${resolutionRate}`, color: '#52b37f' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#1b1a1b]">{item.value}</p>
              <div className="w-8 h-1 rounded-full mx-auto mt-2 mb-1.5" style={{ background: item.color }} />
              <p className="text-[11px] text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick links ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Yorumları yönet', desc: 'Değerlendirmeleri ve şikayetleri görüntüle', href: '/marka-panel/yorumlar' },
          { label: 'Davetiye gönder', desc: 'Müşterilerinizden değerlendirme alın', href: '/marka-panel/davetiyeler' },
          { label: 'Profili düzenle', desc: 'Marka bilgilerinizi güncelleyin', href: '/marka-panel/ayarlar/profil-sayfasi' },
        ].map(q => (
          <Link
            key={q.label}
            href={q.href}
            className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between gap-3 hover:border-gray-300 transition-colors group"
          >
            <div>
              <p className="text-sm font-semibold text-[#1b1a1b]">{q.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{q.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1b1a1b] transition-colors shrink-0" />
          </Link>
        ))}
      </div>

    </div>
  );
}
