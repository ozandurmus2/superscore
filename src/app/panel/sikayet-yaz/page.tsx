'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';
import { MARKETPLACES, RESOLUTION_OPTIONS } from '@/types';
import { Search, ArrowRight, ArrowLeft, ShoppingBag, Loader2, X, Info } from 'lucide-react';
import Image from 'next/image';
import type { Brand } from '@/types';

type Step = 'brand' | 'marketplace' | 'rate' | 'details' | 'submitting' | 'success';

function getStarColor(rating: number): string {
  if (rating <= 0) return '#dcdce5';
  if (rating <= 1.5) return '#eb4b34';
  if (rating <= 2.5) return '#ef8d3f';
  if (rating <= 3.5) return '#f7d047';
  if (rating <= 4) return '#8acd41';
  return '#52b37f';
}

function NewComplaintWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [step, setStep] = useState<Step>('brand');

  // Brand
  const [brandSearch, setBrandSearch] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandWebsite, setNewBrandWebsite] = useState('');
  const [isMarketplace, setIsMarketplace] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState('');

  // Rating
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [ratingLocked, setRatingLocked] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [desiredResolution, setDesiredResolution] = useState('');
  const [selectedResolutionValue, setSelectedResolutionValue] = useState('');
  const [experienceDate, setExperienceDate] = useState('');

  // AI
  const [resolutionSuggestions, setResolutionSuggestions] = useState<{ value: string; label: string }[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [moderating, setModerating] = useState(false);
  const [moderationResult, setModerationResult] = useState<Record<string, unknown> | null>(null);
  const [showModerationReview, setShowModerationReview] = useState(false);
  const [error, setError] = useState('');

  // Search
  useEffect(() => {
    const t = setTimeout(async () => {
      if (brandSearch.length >= 2) {
        setSearching(true);
        const { data } = await supabase.from('brands').select('*').ilike('name', `%${brandSearch}%`).limit(8);
        setBrands(data as Brand[] || []);
        setShowResults(true);
        setSearching(false);
      } else { setBrands([]); setShowResults(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [brandSearch]);

  // URL params
  useEffect(() => {
    const slug = searchParams.get('marka');
    const draft = searchParams.get('draft');
    const yeni = searchParams.get('yeni');
    if (slug) supabase.from('brands').select('*').eq('slug', slug).single().then(({ data }) => { if (data) { setSelectedBrand(data as Brand); setStep('rate'); } });
    if (draft === 'true') {
      const d = localStorage.getItem('superscore_draft_complaint');
      if (d) { const dd = JSON.parse(d); (async () => { const { data: { user } } = await supabase.auth.getUser(); if (user && dd.brand_id) { const r = await fetch('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dd) }); if (r.ok) { const data = await r.json(); localStorage.removeItem('superscore_draft_complaint'); router.push(`/sikayet-yaz/${data.id}`); } } })(); }
    }
    if (yeni) { setBrandSearch(decodeURIComponent(yeni)); setNewBrandName(decodeURIComponent(yeni)); setShowAddModal(true); }
  }, [searchParams]);

  // AI suggestions
  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 5) { setResolutionSuggestions([]); return; }
    setLoadingSuggestions(true);
    try { const r = await fetch('/api/ai/suggest-resolution', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, brandCategory: selectedBrand?.category || '' }) }); const d = await r.json(); setResolutionSuggestions(d.suggestions || []); } catch { setResolutionSuggestions([]); }
    setLoadingSuggestions(false);
  }, [selectedBrand]);

  useEffect(() => { const t = setTimeout(() => { if (desiredResolution.length >= 3) fetchSuggestions(desiredResolution); }, 500); return () => clearTimeout(t); }, [desiredResolution, fetchSuggestions]);

  function handleSelectBrand(b: Brand) { setSelectedBrand(b); setShowResults(false); setBrandSearch(b.name); setStep('rate'); }

  async function handleCreateBrand() {
    if (!newBrandName.trim()) return;
    const slug = newBrandName.toLowerCase().replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-');
    const { data, error: e } = await supabase.from('brands').insert({ name: newBrandName.trim(), slug: slug || `brand-${Date.now()}`, website: newBrandWebsite.trim() || null, category: 'diger', superscore: 0, total_complaints: 0, resolved_complaints: 0 }).select().single();
    if (e) { const { data: ex } = await supabase.from('brands').select('*').ilike('name', newBrandName.trim()).single(); if (ex) setSelectedBrand(ex as Brand); else { setError('Marka oluşturulamadı'); return; } } else if (data) setSelectedBrand(data as Brand);
    setShowAddModal(false);
    setStep(isMarketplace ? 'marketplace' : 'rate');
  }

  function handleRatingSelect(s: number) { setRating(s); setRatingLocked(true); setTimeout(() => setStep('details'), 600); }

  async function handleSubmit() {
    setModerating(true);
    try {
      const r = await fetch('/api/ai/moderate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, desiredResolution }) });
      const res = await r.json();
      setModerationResult(res);
      if (res.has_issues && res.severity !== 'none') { setShowModerationReview(true); setModerating(false); }
      else { setModerating(false); await doSubmit(title, description, desiredResolution); }
    } catch { setModerating(false); await doSubmit(title, description, desiredResolution); }
  }

  async function acceptModerated() {
    if (!moderationResult) return;
    const t = (moderationResult.cleaned_title as string) || title;
    const d = (moderationResult.cleaned_description as string) || description;
    const r = (moderationResult.cleaned_resolution as string) || desiredResolution;
    setTitle(t); setDescription(d); setDesiredResolution(r); setShowModerationReview(false);
    await doSubmit(t, d, r);
  }

  async function doSubmit(ft: string, fd: string, fr: string) {
    setStep('submitting'); setError('');
    const { data: { user } } = await supabase.auth.getUser();
    let desc = fd;
    if (isMarketplace && sellerName) desc = `[Pazaryeri: ${selectedMarketplace} | Satıcı: ${sellerName}]\n\n${fd}`;
    const cd = { brand_id: selectedBrand?.id, title: ft, description: desc, category: selectedResolutionValue || 'other', desired_resolution: fr, order_number: orderNumber || null };
    if (!user) { localStorage.setItem('superscore_draft_complaint', JSON.stringify(cd)); router.push('/giris?redirect=/sikayet-yaz&draft=true'); return; }
    if (!selectedBrand) { setError('Marka seçmeniz gerekiyor'); setStep('brand'); return; }
    const res = await fetch('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cd) });
    if (res.ok) {
      const data = await res.json();
      localStorage.removeItem('superscore_draft_complaint');
      if (rating > 0) await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand_id: selectedBrand.id, complaint_id: data.id, rating, comment: fd }) });
      setStep('success');
    } else { const e = await res.json(); setError(e.error || 'Hata oluştu'); setStep('details'); }
  }

  // ========== SUCCESS ==========
  if (step === 'success') return (
    <div className="min-h-screen bg-[#f3f0ed]">
      {/* Stars - dense cluster top-left, fading right, exactly like Trustpilot */}
      <div className="relative h-[120px] md:h-[160px] overflow-hidden">
        {/* Row 1 - top, starts from left edge */}
        <div className="absolute" style={{ left: '-10px', top: '-15px', transform: 'rotate(-12deg)' }}><Image src="/logo/SS_Star.png" alt="" width={70} height={70} /></div>
        <div className="absolute" style={{ left: '45px', top: '-8px', transform: 'rotate(18deg)' }}><Image src="/logo/SS_Star.png" alt="" width={55} height={55} /></div>
        <div className="absolute" style={{ left: '95px', top: '-12px', transform: 'rotate(-22deg)' }}><Image src="/logo/SS_Star.png" alt="" width={62} height={62} /></div>
        <div className="absolute" style={{ left: '150px', top: '-5px', transform: 'rotate(8deg)' }}><Image src="/logo/SS_Star.png" alt="" width={48} height={48} /></div>
        <div className="absolute" style={{ left: '195px', top: '-14px', transform: 'rotate(-15deg)' }}><Image src="/logo/SS_Star.png" alt="" width={58} height={58} /></div>
        <div className="absolute" style={{ left: '248px', top: '-6px', transform: 'rotate(25deg)' }}><Image src="/logo/SS_Star.png" alt="" width={50} height={50} /></div>
        <div className="absolute hidden md:block" style={{ left: '300px', top: '-10px', transform: 'rotate(-5deg)' }}><Image src="/logo/SS_Star.png" alt="" width={55} height={55} /></div>
        <div className="absolute hidden md:block" style={{ left: '352px', top: '-3px', transform: 'rotate(20deg)' }}><Image src="/logo/SS_Star.png" alt="" width={42} height={42} /></div>
        <div className="absolute hidden md:block" style={{ left: '395px', top: '-12px', transform: 'rotate(-18deg)' }}><Image src="/logo/SS_Star.png" alt="" width={50} height={50} /></div>
        <div className="absolute hidden lg:block" style={{ left: '445px', top: '-5px', transform: 'rotate(12deg)' }}><Image src="/logo/SS_Star.png" alt="" width={46} height={46} /></div>

        {/* Row 2 - middle */}
        <div className="absolute" style={{ left: '10px', top: '35px', transform: 'rotate(22deg)' }}><Image src="/logo/SS_Star.png" alt="" width={60} height={60} /></div>
        <div className="absolute" style={{ left: '65px', top: '40px', transform: 'rotate(-10deg)' }}><Image src="/logo/SS_Star.png" alt="" width={52} height={52} /></div>
        <div className="absolute" style={{ left: '118px', top: '32px', transform: 'rotate(15deg)' }}><Image src="/logo/SS_Star.png" alt="" width={58} height={58} /></div>
        <div className="absolute" style={{ left: '172px', top: '38px', transform: 'rotate(-20deg)' }}><Image src="/logo/SS_Star.png" alt="" width={48} height={48} /></div>
        <div className="absolute" style={{ left: '222px', top: '42px', transform: 'rotate(5deg)' }}><Image src="/logo/SS_Star.png" alt="" width={54} height={54} /></div>
        <div className="absolute hidden md:block" style={{ left: '275px', top: '35px', transform: 'rotate(-14deg)' }}><Image src="/logo/SS_Star.png" alt="" width={50} height={50} /></div>
        <div className="absolute hidden md:block" style={{ left: '328px', top: '40px', transform: 'rotate(18deg)' }}><Image src="/logo/SS_Star.png" alt="" width={44} height={44} /></div>
        <div className="absolute hidden md:block" style={{ left: '375px', top: '32px', transform: 'rotate(-8deg)' }}><Image src="/logo/SS_Star.png" alt="" width={48} height={48} /></div>
        <div className="absolute hidden lg:block" style={{ left: '425px', top: '38px', transform: 'rotate(22deg)' }}><Image src="/logo/SS_Star.png" alt="" width={40} height={40} /></div>

        {/* Row 3 - bottom, fewer stars */}
        <div className="absolute" style={{ left: '-5px', top: '80px', transform: 'rotate(-8deg)' }}><Image src="/logo/SS_Star.png" alt="" width={55} height={55} /></div>
        <div className="absolute" style={{ left: '50px', top: '85px', transform: 'rotate(16deg)' }}><Image src="/logo/SS_Star.png" alt="" width={45} height={45} /></div>
        <div className="absolute" style={{ left: '100px', top: '78px', transform: 'rotate(-25deg)' }}><Image src="/logo/SS_Star.png" alt="" width={52} height={52} /></div>
        <div className="absolute" style={{ left: '152px', top: '82px', transform: 'rotate(10deg)' }}><Image src="/logo/SS_Star.png" alt="" width={42} height={42} /></div>
        <div className="absolute hidden md:block" style={{ left: '200px', top: '86px', transform: 'rotate(-12deg)' }}><Image src="/logo/SS_Star.png" alt="" width={48} height={48} /></div>
        <div className="absolute hidden md:block" style={{ left: '252px', top: '80px', transform: 'rotate(20deg)' }}><Image src="/logo/SS_Star.png" alt="" width={38} height={38} /></div>
      </div>
      <div className="max-w-lg mx-auto px-4 pb-16">
        <h1 className="font-superscore-bold text-2xl text-[#1b1a1b] text-center mb-6">Değerlendirmeniz için teşekkürler!</h1>
        <div className="bg-white rounded-xl p-4 mb-3 border border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">{selectedBrand?.name.charAt(0)}</div>
          <p className="font-semibold text-sm">{selectedBrand?.name}</p>
        </div>
        <div className="bg-[#d4f4e2] rounded-xl p-3 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-green-700" /><p className="text-sm text-green-800">Değerlendirmeniz inceleniyor.</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <StarRating rating={rating} size="sm" className="mb-2" />
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description.substring(0, 200)}</p>
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => router.push('/sikayet-yaz')} className="px-6 py-3 bg-[#1b1a1b] text-white rounded-full font-semibold text-sm hover:bg-[#333] transition-colors">Şikayetlerime Git</button>
        </div>
      </div>
    </div>
  );

  // ========== SUBMITTING ==========
  if (step === 'submitting') return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="animate-spin-slow mb-6"><Image src="/logo/SS_Star.png" alt="" width={64} height={64} className="w-16 h-16" /></div>
      <p className="font-superscore-bold text-lg text-[#1b1a1b]">Gönderiliyor...</p>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${step === 'brand' ? 'bg-[#c1f6cf]' : 'bg-white'}`}>
      <div className="max-w-2xl mx-auto px-4 py-10 md:py-16">
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

        {/* ===== BRAND SEARCH ===== */}
        {step === 'brand' && (
          <div>
            <div className="text-center mb-10">
              <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-3">Deneyiminizi paylaşın</h1>
              <p className="text-[#1b1a1b]/60">Başkalarının doğru seçim yapmasına yardımcı olun.</p>
            </div>
            <div className="relative">
              <div className="flex items-center bg-white rounded-full px-5 py-1 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input type="text" placeholder="Değerlendirebileceğiniz bir şirket bulun." className="w-full py-3.5 text-[#1b1a1b] outline-none text-base bg-transparent placeholder:text-gray-400" value={brandSearch} onChange={(e) => { setBrandSearch(e.target.value); setShowAddModal(false); }} autoFocus />
                {searching && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
              </div>
              {showResults && brandSearch.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden">
                  {brands.length > 0 ? brands.map((b) => (
                    <button key={b.id} onClick={() => handleSelectBrand(b)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                      <div className="text-left">
                        <p className="font-semibold text-[#1b1a1b] text-sm">{b.name}</p>
                        <p className="text-xs text-gray-400">{b.website} {b.total_complaints > 0 ? `· ${b.total_complaints} değerlendirme` : ''}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ backgroundColor: getStarColor(b.avg_rating || 0) + '20' }}>
                        <Image src="/logo/star_icon.png" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} className="w-3.5 h-3.5" />
                        <span className="text-sm font-bold" style={{ color: getStarColor(b.avg_rating || 0) }}>{(b.avg_rating || 0).toFixed(1)}</span>
                      </div>
                    </button>
                  )) : !searching ? (
                    <div className="p-5 flex items-center justify-between">
                      <div><p className="font-semibold text-sm text-[#1b1a1b]">Şirket bulamadınız mı?</p><p className="text-xs text-gray-500 mt-1">Ekleyin ve ilk yorumu yazan siz olun.</p></div>
                      <button onClick={() => { setShowAddModal(true); setNewBrandName(brandSearch); setShowResults(false); }} className="ml-4 px-5 py-2 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:border-transparent hover:bg-[#f2f5fd] hover:text-[#1a1a1a] transition-all">Şirket ekle</button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ADD BRAND MODAL ===== */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-superscore-bold text-xl">Şirket ekle</h3>
                <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"><X className="h-4 w-4" /></button>
              </div>
              <div className="border-t pt-4 space-y-3">
                <p className="text-xs text-gray-500 mb-3">Henüz listelenmemiş olabilir. Ekleyin ve ilk yorumu yazan siz olun.</p>
                <Input placeholder="Marka Adı" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} className="rounded-full border-2 px-5 py-3" />
                <Input placeholder="Web sitesi URL'sini girin" value={newBrandWebsite} onChange={(e) => setNewBrandWebsite(e.target.value)} className="rounded-full border-2 px-5 py-3" />
                <div className={`p-3 rounded-xl border-2 cursor-pointer ${isMarketplace ? 'border-[#3c57bc] bg-blue-50' : 'border-gray-200'}`} onClick={() => setIsMarketplace(!isMarketplace)}>
                  <div className="flex items-center gap-2"><ShoppingBag className="h-4 w-4" /><span className="text-sm">Bu bir pazaryeri mi?</span></div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleCreateBrand} disabled={!newBrandName.trim()} className="px-6 py-2.5 bg-[#3c57bc] text-white rounded-full font-medium text-sm disabled:opacity-50">Şirket ekle</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== MARKETPLACE ===== */}
        {step === 'marketplace' && (
          <div>
            <button onClick={() => setStep('brand')} className="inline-flex items-center gap-1 text-sm text-gray-500 mb-6"><ArrowLeft className="h-4 w-4" /> Geri</button>
            <h1 className="font-superscore-bold text-2xl text-center mb-6">Pazaryeri Bilgileri</h1>
            <div className="bg-white rounded-2xl p-6 space-y-5 border">
              <div><label className="block text-sm font-medium mb-1">Satıcı Mağaza Adı</label><Input value={sellerName} onChange={(e) => setSellerName(e.target.value)} /></div>
              <div>
                <label className="block text-sm font-medium mb-2">Hangi Pazaryeri?</label>
                <div className="grid grid-cols-3 gap-3">{MARKETPLACES.map((m) => (<button key={m.value} onClick={() => setSelectedMarketplace(m.value)} className={`p-3 rounded-xl border-2 text-center ${selectedMarketplace === m.value ? 'border-[#3c57bc] bg-blue-50' : 'border-gray-200'}`}><span className="text-xl block mb-1">{m.logo}</span><span className="text-xs">{m.label}</span></button>))}</div>
              </div>
              <button onClick={() => setStep('rate')} disabled={!sellerName.trim() || !selectedMarketplace} className="w-full py-3 bg-[#1b1a1b] text-white rounded-full font-semibold disabled:opacity-50">Devam Et</button>
            </div>
          </div>
        )}

        {/* ===== RATING ===== */}
        {step === 'rate' && (
          <div className="text-center">
            {selectedBrand && (
              <div className="inline-flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-8 border">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">{selectedBrand.name.charAt(0)}</div>
                <div className="text-left"><p className="font-semibold text-sm">{selectedBrand.name}</p><p className="text-xs text-gray-400">{selectedBrand.website}</p></div>
              </div>
            )}
            <h1 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-8">Deneyiminizi nasıl değerlendirirsiniz?</h1>
            <div className={`flex justify-center gap-2 transition-all duration-500 ${ratingLocked ? 'scale-75 opacity-60 -translate-y-4' : ''}`}>
              {[1,2,3,4,5].map((s) => {
                const active = s <= (hoveredStar || rating);
                const color = active ? getStarColor(hoveredStar || rating) : '#dcdce5';
                return (
                  <button key={s} onMouseEnter={() => !ratingLocked && setHoveredStar(s)} onMouseLeave={() => !ratingLocked && setHoveredStar(0)} onClick={() => !ratingLocked && handleRatingSelect(s)} disabled={ratingLocked}
                    className="relative w-14 h-14 md:w-16 md:h-16 transition-all duration-200 hover:scale-110" style={{ borderRadius: 2 }}>
                    <div className="absolute inset-0 transition-colors duration-200" style={{ backgroundColor: color, borderRadius: 2 }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image src="/logo/star_icon.png" alt="" width={36} height={36} style={{ filter: 'brightness(0) invert(1)' }} className="w-8 h-8 md:w-9 md:h-9" />
                    </div>
                  </button>
                );
              })}
            </div>
            {(hoveredStar > 0 || rating > 0) && !ratingLocked && (
              <p className="mt-4 text-sm text-gray-500">{[,'Kötü','Yetersiz','Ortalama','İyi','Mükemmel'][hoveredStar || rating]}</p>
            )}
          </div>
        )}

        {/* ===== DETAILS FORM ===== */}
        {step === 'details' && (
          <div className="animate-slideUp">
            <button onClick={() => { setStep('rate'); setRatingLocked(false); }} className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft className="h-4 w-4" /> Geri</button>
            {selectedBrand && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">{selectedBrand.name.charAt(0)}</div>
                  <p className="font-semibold text-sm">{selectedBrand.name}</p>
                </div>
                <StarRating rating={rating} size="sm" />
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-2">Deneyiminiz hakkında bilgi verin</label>
                <Textarea placeholder="Deneyiminizi detaylıca anlatın. Dürüst, yardımcı ve yapıcı olmayı unutmayın!" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-2">Yorumunuza bir başlık verin</label>
                <Input placeholder="İnsanların bilmesi gereken en önemli şey?" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-2">Talebiniz</label>
                <Input placeholder="Örn: İade, değişim..." value={desiredResolution} onChange={(e) => { setDesiredResolution(e.target.value); setSelectedResolutionValue(''); }} className="rounded-xl" />
                {(resolutionSuggestions.length > 0 || loadingSuggestions) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {loadingSuggestions && <Loader2 className="h-4 w-4 animate-spin text-purple-400" />}
                    {resolutionSuggestions.map((s) => (<button key={s.value} onClick={() => { setSelectedResolutionValue(s.value); setDesiredResolution(s.label); }} className={`px-3 py-1 rounded-full text-xs border ${selectedResolutionValue === s.value ? 'bg-[#1b1a1b] text-white border-[#1b1a1b]' : 'border-gray-300 hover:border-[#1b1a1b]'}`}>{s.label}</button>))}
                  </div>
                )}
                {!desiredResolution && resolutionSuggestions.length === 0 && !loadingSuggestions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {RESOLUTION_OPTIONS.filter(o => o.categories.includes('*')).slice(0,5).map((o) => (<button key={o.value} onClick={() => { setDesiredResolution(o.label); setSelectedResolutionValue(o.value); }} className="px-3 py-1 rounded-full text-xs border border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-400">{o.label}</button>))}
                  </div>
                )}
              </div>
              <div><label className="block text-sm font-semibold mb-2">Sipariş No <span className="font-normal text-gray-400">(opsiyonel)</span></label><Input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className="rounded-xl" /></div>
              <div><label className="block text-sm font-semibold mb-2">Deneyim Tarihi</label><Input type="date" value={experienceDate} onChange={(e) => setExperienceDate(e.target.value)} className="rounded-xl" /></div>
              <p className="text-xs text-gray-400">Bu değerlendirmeyi göndererek, gerçek bir deneyime dayandığını onaylarsınız.</p>

              {showModerationReview && moderationResult && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="font-semibold text-sm text-amber-800 mb-2">İçerik düzenlendi</p>
                  {(moderationResult.changes_made as string[] || []).map((c: string, i: number) => (<p key={i} className="text-xs text-amber-700">• {c}</p>))}
                  <div className="flex gap-2 mt-3">
                    <button onClick={acceptModerated} className="px-4 py-2 bg-[#1b1a1b] text-white rounded-full text-sm">Onayla</button>
                    <button onClick={() => setShowModerationReview(false)} className="px-4 py-2 border rounded-full text-sm">Düzenle</button>
                  </div>
                </div>
              )}

              {!showModerationReview && (
                <button onClick={handleSubmit} disabled={!title.trim() || !description.trim() || !desiredResolution.trim() || moderating}
                  className="w-full py-4 bg-[#1b1a1b] text-white rounded-full font-semibold text-base disabled:opacity-50 hover:bg-[#333] transition-colors">
                  {moderating ? <><Loader2 className="h-5 w-5 animate-spin inline mr-2" />Kontrol ediliyor...</> : 'Değerlendirmeyi Gönder'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewComplaintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#c1f6cf] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#1b1a1b]" /></div>}>
      <NewComplaintWizard />
    </Suspense>
  );
}
