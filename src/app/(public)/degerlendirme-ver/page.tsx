'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Search, ArrowLeft, ArrowRight, Loader2, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import type { Brand } from '@/types';

// ── star color ────────────────────────────────────────────────────────────────
function getStarColor(r: number) {
  if (r <= 0)   return '#dcdce5';
  if (r <= 1.5) return '#eb4b34';
  if (r <= 2.5) return '#ef8d3f';
  if (r <= 3.5) return '#f7d047';
  if (r <= 4)   return '#8acd41';
  return '#52b37f';
}

function StarPicker({ rating, hovered, onHover, onSelect }: {
  rating: number; hovered: number;
  onHover: (s: number) => void; onSelect: (s: number) => void;
}) {
  const display = hovered || rating;
  const color   = getStarColor(display);
  const labels  = ['', 'Çok kötü', 'Kötü', 'Orta', 'İyi', 'Mükemmel'];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(s => (
          <button
            key={s}
            onMouseEnter={() => onHover(s)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onSelect(s)}
            className="w-12 h-12 flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: s <= display ? color : '#dde0e3' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/star_icon.png" alt="" style={{ width: 28, height: 28, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
          </button>
        ))}
      </div>
      {display > 0 && <p className="text-sm font-semibold" style={{ color }}>{labels[display]}</p>}
    </div>
  );
}

type Step = 'brand' | 'rate' | 'details' | 'submitting' | 'success';

function DegerlendirmeWizard() {
  const router      = useRouter();
  const params      = useSearchParams();
  const supabase    = createClient();

  const [step,          setStep]          = useState<Step>('brand');
  const [brandSearch,   setBrandSearch]   = useState('');
  const [brands,        setBrands]        = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searching,     setSearching]     = useState(false);
  const [showResults,   setShowResults]   = useState(false);
  const [suggestedBrands, setSuggested]   = useState<Brand[]>([]);

  const [rating,        setRating]        = useState(0);
  const [hovered,       setHovered]       = useState(0);

  const [title,         setTitle]         = useState('');
  const [comment,       setComment]       = useState('');

  const [submitting,    setSubmitting]    = useState(false);
  const [error,         setError]         = useState('');

  // existing review / complaint check
  const [existingReview,    setExistingReview]    = useState<{ rating: number; comment: string; created_at: string } | null>(null);
  const [existingComplaint, setExistingComplaint] = useState<{ id: string; title: string } | null>(null);
  const [checkingExisting,  setCheckingExisting]  = useState(false);

  // Load suggested brands
  useEffect(() => {
    supabase.from('brands').select('*').order('superscore', { ascending: false }).limit(6).then(({ data }) => {
      if (data) setSuggested(data as Brand[]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-fill from URL
  useEffect(() => {
    const slug = params.get('marka');
    if (slug) {
      supabase.from('brands').select('*').eq('slug', slug).single().then(({ data }) => {
        if (data) { setSelectedBrand(data as Brand); setBrandSearch((data as Brand).name); setStep('rate'); }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Brand search
  useEffect(() => {
    const t = setTimeout(async () => {
      if (brandSearch.length >= 2) {
        setSearching(true);
        const { data } = await supabase.from('brands').select('*').ilike('name', `%${brandSearch}%`).limit(8);
        setBrands((data as Brand[]) || []);
        setShowResults(true);
        setSearching(false);
      } else { setBrands([]); setShowResults(false); }
    }, 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSearch]);

  // Check for existing review/complaint when brand selected
  useEffect(() => {
    if (!selectedBrand) return;
    async function check() {
      setCheckingExisting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setCheckingExisting(false); return; }

      const { data: rev } = await supabase
        .from('reviews')
        .select('rating, comment, created_at')
        .eq('brand_id', selectedBrand!.id)
        .eq('user_id', user.id)
        .is('complaint_id', null) // standalone review only
        .maybeSingle();

      const { data: cmp } = await supabase
        .from('complaints')
        .select('id, title')
        .eq('brand_id', selectedBrand!.id)
        .eq('user_id', user.id)
        .maybeSingle();

      setExistingReview(rev as typeof existingReview);
      setExistingComplaint(cmp as typeof existingComplaint);
      setCheckingExisting(false);
    }
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  function selectBrand(b: Brand) {
    setSelectedBrand(b);
    setBrandSearch(b.name);
    setShowResults(false);
    setStep('rate');
  }

  async function submit() {
    if (!selectedBrand || rating === 0 || !comment.trim()) return;
    setSubmitting(true); setError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push(`/giris?redirect=/degerlendirme-ver?marka=${selectedBrand.slug}`);
      return;
    }

    // If user has an existing complaint, link the review to it
    const complaintId = existingComplaint?.id ?? null;

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_id:    selectedBrand.id,
        complaint_id: complaintId,
        rating,
        title:       title.trim() || null,
        comment:     comment.trim(),
      }),
    });

    if (res.ok) {
      setStep('success');
    } else {
      const e = await res.json();
      setError(e.error || 'Bir hata oluştu');
      setSubmitting(false);
    }
  }

  // ── SUBMITTING ──────────────────────────────────────────────────────────────
  if (step === 'submitting' || submitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="mb-6"><Image src="/logo/star_icon.png" alt="" width={64} height={64} className="animate-spin" /></div>
        <p className="text-lg font-bold text-[#1b1a1b]">Gönderiliyor...</p>
      </div>
    );
  }

  // ── SUCCESS ─────────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#f3f0ed]">
        <div className="max-w-lg mx-auto px-4 pt-16 pb-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#52b37f] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1b1a1b] mb-2">Değerlendirmeniz için teşekkürler!</h1>
          <p className="text-sm text-gray-500 mb-8">Değerlendirmeniz incelendikten sonra yayınlanacak.</p>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left mb-6">
            <div className="flex gap-0.5 mb-3">
              {[1,2,3,4,5].map(s => (
                <div key={s} style={{ width:22, height:22, background: s<=rating ? getStarColor(rating) : '#dde0e3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/star_icon.png" alt="" style={{ width:14, height:14, filter:'brightness(0) invert(1)', objectFit:'contain' }} />
                </div>
              ))}
            </div>
            {title && <p className="text-sm font-bold text-[#1b1a1b] mb-1">{title}</p>}
            <p className="text-sm text-gray-600">{comment}</p>
          </div>
          <button
            onClick={() => router.push(`/markalar/${selectedBrand?.slug}`)}
            className="px-8 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors"
          >
            Marka sayfasına dön
          </button>
        </div>
      </div>
    );
  }

  // ── LAYOUT WRAPPER ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f3f0ed]">
      <div className="max-w-xl mx-auto px-4 pt-10 pb-20">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {['brand', 'rate', 'details'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step === s ? 'bg-[#3c57bc] text-white' : ['brand','rate','details'].indexOf(step) > i ? 'bg-[#52b37f] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {['brand','rate','details'].indexOf(step) > i ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 ${['brand','rate','details'].indexOf(step) > i ? 'bg-[#52b37f]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* ── STEP: brand ── */}
        {step === 'brand' && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold text-[#1b1a1b] mb-1">Hangi markayı değerlendirmek istiyorsunuz?</h1>
              <p className="text-sm text-gray-500">Marka adını arayın veya listeden seçin.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={brandSearch}
                onChange={e => setBrandSearch(e.target.value)}
                placeholder="Marka ara..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3c57bc]"
              />
              {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />}
            </div>

            {/* Search results */}
            {showResults && brands.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {brands.map(b => (
                  <button key={b.id} onClick={() => selectBrand(b)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-[#3c57bc]/10 flex items-center justify-center text-xs font-bold text-[#3c57bc] shrink-0">{b.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1b1a1b] truncate">{b.name}</p>
                      <p className="text-xs text-gray-400">{b.category}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Suggested */}
            {!showResults && suggestedBrands.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Öne çıkan markalar</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedBrands.map(b => (
                    <button key={b.id} onClick={() => selectBrand(b)} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 hover:border-[#3c57bc]/30 transition-colors text-left">
                      <div className="w-8 h-8 rounded-lg bg-[#3c57bc]/10 flex items-center justify-center text-xs font-bold text-[#3c57bc] shrink-0">{b.name.charAt(0)}</div>
                      <span className="text-sm font-medium text-[#1b1a1b] truncate">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP: rate ── */}
        {step === 'rate' && selectedBrand && (
          <div className="space-y-6">
            <button onClick={() => setStep('brand')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" /> Geri
            </button>

            {/* Brand card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center text-sm font-bold text-[#3c57bc] shrink-0">{selectedBrand.name.charAt(0)}</div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b]">{selectedBrand.name}</p>
                <p className="text-xs text-gray-400">{selectedBrand.category}</p>
              </div>
            </div>

            {/* Already has review (standalone) → block */}
            {existingReview && !checkingExisting && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1b1a1b]">
                  <Info className="w-4 h-4 text-[#3c57bc]" />
                  Bu marka için zaten bir değerlendirmeniz var
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <div key={s} style={{ width:18, height:18, background: s<=existingReview.rating ? getStarColor(existingReview.rating) : '#dde0e3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo/star_icon.png" alt="" style={{ width:11, height:11, filter:'brightness(0) invert(1)', objectFit:'contain' }} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">&ldquo;{existingReview.comment}&rdquo;</p>
                <p className="text-xs text-gray-400">{new Date(existingReview.created_at).toLocaleDateString('tr-TR')}</p>
              </div>
            )}

            {/* Has complaint → can't write standalone review, show merge info */}
            {existingComplaint && !existingReview && !checkingExisting && (
              <div className="bg-[#eef1f9] border border-[#3c57bc]/20 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#3c57bc] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#1b1a1b]">Bu marka için aktif bir şikayetiniz var</p>
                  <p className="text-sm text-gray-600 mt-0.5">Değerlendirmeniz &ldquo;{existingComplaint.title}&rdquo; şikayetinizle otomatik olarak birleştirilecek.</p>
                </div>
              </div>
            )}

            {checkingExisting && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" /> Kontrol ediliyor...
              </div>
            )}

            {!existingReview && (
              <>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-[#1b1a1b] mb-6">{selectedBrand.name} için deneyiminizi nasıl değerlendiriyorsunuz?</h2>
                  <StarPicker rating={rating} hovered={hovered} onHover={setHovered} onSelect={r => { setRating(r); setTimeout(() => setStep('details'), 400); }} />
                </div>
              </>
            )}

            {existingReview && (
              <button onClick={() => router.push(`/markalar/${selectedBrand.slug}`)} className="w-full py-3 text-sm font-semibold text-white rounded-xl" style={{ background: '#3c57bc' }}>
                Marka sayfasına dön
              </button>
            )}
          </div>
        )}

        {/* ── STEP: details ── */}
        {step === 'details' && selectedBrand && (
          <div className="space-y-5">
            <button onClick={() => setStep('rate')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" /> Geri
            </button>

            {/* Selected rating display */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <div key={s} style={{ width:20, height:20, background: s<=rating ? getStarColor(rating) : '#dde0e3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo/star_icon.png" alt="" style={{ width:13, height:13, filter:'brightness(0) invert(1)', objectFit:'contain' }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep('rate')} className="text-xs text-[#3c57bc] hover:underline">Değiştir</button>
              </div>
            </div>

            {existingComplaint && (
              <div className="bg-[#eef1f9] border border-[#3c57bc]/20 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#3c57bc] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Bu değerlendirme &ldquo;{existingComplaint.title}&rdquo; şikayetinizle birleştirilecek.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Başlık (isteğe bağlı)</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Deneyiminizi kısaca özetleyin"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3c57bc] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Değerlendirmeniz</label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Deneyiminizi detaylı anlatın..."
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#3c57bc] bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">{comment.length} / 1000</p>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>}

            <button
              onClick={submit}
              disabled={rating === 0 || !comment.trim() || submitting}
              className="w-full py-3.5 text-sm font-bold text-white rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: '#3c57bc' }}
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</> : 'Değerlendirmeyi Gönder'}
            </button>

            <p className="text-xs text-center text-gray-400 leading-relaxed">
              Değerlendirmenizi göndererek kullanım koşullarını kabul etmiş olursunuz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DegerlendirmeVerPage() {
  return (
    <Suspense>
      <DegerlendirmeWizard />
    </Suspense>
  );
}
