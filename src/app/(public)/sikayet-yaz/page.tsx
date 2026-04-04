'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';
import { MARKETPLACES, RESOLUTION_OPTIONS } from '@/types';
import { Search, ArrowRight, ArrowLeft, ShoppingBag, Loader2, X, Info, CheckCircle2, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
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

  // Existing review check
  const [existingReview, setExistingReview] = useState<{ rating: number; comment: string } | null>(null);

  // User info for success page
  const [currentUser, setCurrentUser] = useState<{ id: string; full_name: string; email: string; created_at: string } | null>(null);
  const [userReviewCount, setUserReviewCount] = useState(0);

  useEffect(() => {
    if (!selectedBrand) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('reviews').select('rating, comment').eq('brand_id', selectedBrand.id).eq('user_id', user.id).maybeSingle().then(({ data }) => {
        setExistingReview(data as typeof existingReview);
        if (data) setRating((data as { rating: number }).rating);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

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
  const [suggestedBrands, setSuggestedBrands] = useState<Brand[]>([]);

  // Superscore rating on success page
  const [superscoreRating, setSuperscoreRating] = useState(0);
  const [superscoreHover, setSuperscoreHover] = useState(0);
  const [statusExpanded, setStatusExpanded] = useState(false);

  // Load suggested brands
  useEffect(() => {
    supabase.from('brands').select('*').order('superscore', { ascending: false }).limit(4).then(({ data }) => {
      if (data) setSuggestedBrands(data as Brand[]);
    });
  }, []);

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
    const puanParam = searchParams.get('puan');
    if (slug) supabase.from('brands').select('*').eq('slug', slug).single().then(({ data }) => {
      if (data) {
        setSelectedBrand(data as Brand);
        if (puanParam) {
          const p = parseInt(puanParam);
          if (p >= 1 && p <= 5) {
            setRating(p);
            setRatingLocked(true);
            setStep('details');
          } else {
            setStep('rate');
          }
        } else {
          setStep('rate');
        }
      }
    });
    if (draft === 'true') {
      const d = localStorage.getItem('superscore_draft_complaint');
      if (d) {
        const dd = JSON.parse(d);
        (async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && dd.brand_id) {
            // Set title/description from draft for success page
            if (dd.title) setTitle(dd.title);
            if (dd.description) setDescription(dd.description);
            // Get brand info
            const { data: brandData } = await supabase.from('brands').select('*').eq('id', dd.brand_id).single();
            if (brandData) setSelectedBrand(brandData as Brand);
            // Get user info
            const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();
            if (userData) setCurrentUser(userData as typeof currentUser);
            const { count } = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
            setUserReviewCount((count ?? 0) + 1);

            const r = await fetch('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dd) });
            if (r.ok) {
              const data = await r.json();
              localStorage.removeItem('superscore_draft_complaint');
              // If there was a rating stored in draft
              if (dd.rating && dd.rating > 0 && brandData) {
                setRating(dd.rating);
                await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand_id: dd.brand_id, complaint_id: data.id, rating: dd.rating, comment: dd.description }) });
              }
              setStep('success');
            }
          }
        })();
      }
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
      if (res.has_issues && res.severity !== 'none') {
        // Update the form fields with cleaned content
        if (res.cleaned_title) setTitle(res.cleaned_title);
        if (res.cleaned_description) setDescription(res.cleaned_description);
        if (res.cleaned_resolution) setDesiredResolution(res.cleaned_resolution);
        setShowModerationReview(true);
        setModerating(false);
      }
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
    const cd = { brand_id: selectedBrand?.id, title: ft, description: desc, category: selectedResolutionValue || 'other', desired_resolution: fr, order_number: orderNumber || null, rating: rating > 0 ? rating : undefined };
    if (!user) { localStorage.setItem('superscore_draft_complaint', JSON.stringify(cd)); router.push('/giris?redirect=/sikayet-yaz&draft=true'); return; }
    if (!selectedBrand) { setError('Marka seçmeniz gerekiyor'); setStep('brand'); return; }

    // Get user info for success page
    const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (userData) setCurrentUser(userData as typeof currentUser);
    const { count } = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
    setUserReviewCount((count ?? 0) + 1);

    const res = await fetch('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cd) });
    if (res.ok) {
      const data = await res.json();
      localStorage.removeItem('superscore_draft_complaint');
      if (rating > 0) await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand_id: selectedBrand.id, complaint_id: data.id, rating, comment: fd }) });
      setStep('success');
    } else { const e = await res.json(); setError(e.error || 'Hata oluştu'); setStep('details'); }
  }

  // ========== SUCCESS ==========
  if (step === 'success') {
    const todayStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
      <div className="min-h-screen bg-[#f3f0ed]">
        {/* Stars - scattered top-left */}
        <div className="relative h-[130px] md:h-[170px]" style={{ overflow: 'hidden' }}>
          {[
            { left: '-10px', top: '-15px', rot: -12, size: 70 },
            { left: '50px', top: '-8px', rot: 18, size: 55 },
            { left: '105px', top: '-12px', rot: -22, size: 62 },
            { left: '162px', top: '-5px', rot: 8, size: 48 },
            { left: '210px', top: '-14px', rot: -15, size: 58 },
            { left: '268px', top: '-6px', rot: 25, size: 50 },
            { left: '322px', top: '-10px', rot: -5, size: 55, md: true },
            { left: '378px', top: '-3px', rot: 20, size: 42, md: true },
            { left: '425px', top: '-12px', rot: -18, size: 50, md: true },
            { left: '480px', top: '-5px', rot: 12, size: 46, lg: true },
            { left: '15px', top: '38px', rot: 22, size: 60 },
            { left: '72px', top: '42px', rot: -10, size: 52 },
            { left: '128px', top: '35px', rot: 15, size: 58 },
            { left: '185px', top: '40px', rot: -20, size: 48 },
            { left: '238px', top: '45px', rot: 5, size: 54 },
            { left: '295px', top: '38px', rot: -14, size: 50, md: true },
            { left: '350px', top: '42px', rot: 18, size: 44, md: true },
            { left: '400px', top: '36px', rot: -8, size: 48, md: true },
            { left: '-5px', top: '85px', rot: -8, size: 55 },
            { left: '55px', top: '90px', rot: 16, size: 45 },
            { left: '110px', top: '82px', rot: -25, size: 52 },
            { left: '165px', top: '88px', rot: 10, size: 42 },
            { left: '218px', top: '90px', rot: -12, size: 48, md: true },
            { left: '272px', top: '84px', rot: 20, size: 38, md: true },
          ].map((s, i) => (
            <div key={i} className={`absolute ${s.md ? 'hidden md:block' : ''} ${s.lg ? 'hidden lg:block' : ''}`} style={{ left: s.left, top: s.top, transform: `rotate(${s.rot}deg)` }}>
              <Image src="/logo/star_icon.png" alt="" width={s.size} height={s.size} />
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto px-4 pb-16">
          <h1 className="font-superscore-bold text-2xl text-[#1b1a1b] text-center mb-6">Yorumunuz için teşekkürler!</h1>

          {/* Brand Card - clickable */}
          <Link href={`/markalar/${selectedBrand?.slug}`} className="block bg-white rounded-xl p-4 mb-0 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              {selectedBrand?.logo_url ? (
                <Image src={selectedBrand.logo_url} alt={selectedBrand.name} width={40} height={40} className="w-10 h-10 rounded-lg object-contain" />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">{selectedBrand?.name.charAt(0)}</div>
              )}
              <p className="font-semibold text-sm text-[#1b1a1b] underline decoration-gray-300">{selectedBrand?.name}</p>
            </div>
          </Link>

          {/* Connection Line */}
          <div className="flex justify-start ml-8">
            <div className="w-px h-3 bg-gray-300" />
          </div>

          {/* Review Status - expandable */}
          <button
            onClick={() => setStatusExpanded(!statusExpanded)}
            className="w-full rounded-lg px-3 py-2 flex items-center gap-2 text-left transition-colors"
            style={{ backgroundColor: '#c8f1f5', border: '1px solid #a8e4ec' }}
          >
            <Info className="h-4 w-4 text-[#1b1a1b]/60 flex-shrink-0" />
            <p className="text-sm text-[#1b1a1b]/80 flex-1">
              Değerlendirmeniz beklemede.
              <span className="ml-2 text-[#1b1a1b]/50 text-xs">{statusExpanded ? 'Daha az oku' : 'Daha fazla bilgi edinin'}</span>
            </p>
          </button>
          {statusExpanded && (
            <div className="px-3 py-2 text-xs text-[#1b1a1b]/70 leading-relaxed rounded-b-lg -mt-0.5" style={{ backgroundColor: '#c8f1f5', borderLeft: '1px solid #a8e4ec', borderRight: '1px solid #a8e4ec', borderBottom: '1px solid #a8e4ec' }}>
              Superscore&apos;da görünmesi 2 saate kadar sürebilir. <span className="underline">Daha fazla bilgi edinin.</span>
            </div>
          )}

          {/* Connection Line */}
          <div className="flex justify-start ml-8">
            <div className="w-px h-3 bg-gray-300" />
          </div>

          {/* Review Card with User Info */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            {/* User Info */}
            {currentUser && (
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#00b67a] flex items-center justify-center text-white font-bold text-sm">
                  {currentUser.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1b1a1b]">{currentUser.full_name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{userReviewCount} yorum</span>
                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> TR</span>
                  </div>
                </div>
              </div>
            )}

            <StarRating rating={rating} size="sm" className="mb-2" />
            <h3 className="font-semibold text-sm mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description.substring(0, 200)}{description.length > 200 && '...'}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-50 rounded-full">{todayStr}</span>
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-50 rounded-full">Kendiliğinden yapılan değerlendirme</span>
            </div>
          </div>

          {/* Sırada Ne Var? - Process Flow */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-4">Sırada ne var?</h3>
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#04da8b] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="w-px h-full bg-[#04da8b] min-h-[24px]" />
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-sm text-[#1b1a1b]">Şikayetiniz markaya iletildi</p>
                  <p className="text-xs text-gray-500 mt-0.5">Marka en kısa sürede şikayetinizi inceleyecek.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="w-px h-full bg-gray-200 min-h-[24px]" />
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-sm text-[#1b1a1b]">Marka işleme alacak</p>
                  <p className="text-xs text-gray-500 mt-0.5">Marka şikayetinizi işleme aldığında tarafınıza bildirim gelecek.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Image src="/logo/star_icon.png" alt="" width={16} height={16} className="w-4 h-4 opacity-40" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1b1a1b]">Superscore puanı güncellenecek</p>
                  <p className="text-xs text-gray-500 mt-0.5">Marka şikayetinizi ne kadar hızlı ve sorunsuz çözerse, Superscore puanı o kadar olumlu etkilenecek.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Superscore Rating Banner - Trustpilot style */}
          <div className="mt-6 relative overflow-hidden rounded-2xl" style={{ backgroundColor: '#b2f8cc' }}>
            {/* Background decorative SVG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="https://businessunitprofile-cdn.trustpilot.net/businessunitprofile-consumersite/public/review-submitted-page/trustpilot-banner/desktop.svg"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="relative z-10 px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8">
              <h3 className="font-superscore-bold text-xl md:text-[22px] text-[#1b1a1b] mb-2 max-w-[340px] leading-snug">
                Siz de Superscore&apos;u değerlendirebilirsiniz!
              </h3>
              <p className="text-sm text-[#1b1a1b]/70 mb-5 max-w-[380px] leading-relaxed">
                Sadece birkaç dakikanızı alacak ve geri bildirimleriniz platformumuzu geliştirmemize ve dürüst kalmamıza yardımcı olacak.
              </p>
              {/* Star selector inside card */}
              <div className="inline-flex bg-white rounded-xl px-3 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <div className="flex gap-[3px]">
                  {[1,2,3,4,5].map((s) => {
                    const active = s <= (superscoreHover || superscoreRating);
                    const color = active ? getStarColor(superscoreHover || superscoreRating) : '#dcdce5';
                    return (
                      <button
                        key={s}
                        onMouseEnter={() => setSuperscoreHover(s)}
                        onMouseLeave={() => setSuperscoreHover(0)}
                        onClick={() => {
                          setSuperscoreRating(s);
                          window.location.href = `/sikayet-yaz?marka=superscore&puan=${s}`;
                        }}
                        className="relative w-[40px] h-[40px] md:w-[44px] md:h-[44px] transition-all duration-200 hover:scale-110 cursor-pointer"
                        style={{ borderRadius: 2 }}
                      >
                        <div className="absolute inset-0 transition-colors duration-200" style={{ backgroundColor: color, borderRadius: 2 }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image src="/logo/star_icon.png" alt="" width={26} height={26} style={{ filter: 'brightness(0) invert(1)' }} className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 text-center">
            <button onClick={() => router.push(currentUser ? `/users/${currentUser.id}` : '/')} className="px-6 py-3 bg-[#1b1a1b] text-white rounded-full font-semibold text-sm hover:bg-[#333] transition-colors">
              Yorumlarıma Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== SUBMITTING ==========
  if (step === 'submitting') return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="animate-spin-slow mb-6"><Image src="/logo/star_icon.png" alt="" width={64} height={64} className="w-16 h-16" /></div>
      <p className="font-superscore-bold text-lg text-[#1b1a1b]">Gönderiliyor...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Green hero zone - only for brand step */}
      {step === 'brand' && (
        <div className="bg-[#b2f8cc] pb-16 pt-10 md:pt-16">
          <div className="max-w-2xl mx-auto px-4">
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <div className="text-center mb-10">
              <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-3">Deneyiminizi paylaşın</h1>
              <p className="text-[#1b1a1b]/60">Başkalarının doğru seçim yapmasına yardımcı olun.</p>
            </div>
            <div className="relative max-w-xl mx-auto">
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
                      <button onClick={() => { setShowAddModal(true); setNewBrandName(brandSearch); setShowResults(false); }} className="ml-4 px-5 py-2 text-sm font-medium text-[#4256b6] border border-[#4256b6] rounded-full hover:border-transparent hover:bg-[#f2f5fd] hover:text-[#2b2c26] transition-all">Şirket ekle</button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* White content zone below green */}
      {step === 'brand' && (
        <div className="max-w-3xl mx-auto px-4 py-10">
              {/* Suggested Brands */}
              {suggestedBrands.length > 0 && (
                <div className="mb-12">
                  <h3 className="font-superscore-bold text-lg text-[#292a24] mb-5">Yorumunuzu yazmaya hazır mısınız?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {suggestedBrands.map((b) => (
                      <button key={b.id} onClick={() => handleSelectBrand(b)} className="border border-gray-200 rounded-2xl p-4 text-left hover:shadow-md hover:border-gray-300 transition-all bg-white">
                        <BrandLogo name={b.name} logoUrl={b.logo_url} size={64} className="mb-3" />
                        <p className="font-semibold text-sm text-[#292a24]">{b.name}</p>
                        <p className="text-xs text-gray-400 mb-2">{b.website}</p>
                        <StarRating rating={b.avg_rating || 0} size="xs" showScore />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* App Store Banner */}
              <div className="border border-gray-200 rounded-[32px] px-6 md:px-10 py-6 flex items-center gap-6 md:gap-10 group overflow-hidden mb-12 bg-white">
                <div className="relative flex-shrink-0 w-[80px] md:w-[110px]">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[90px] md:w-[120px] h-[90px] md:h-[120px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                    <div className="absolute inset-0 bg-[#52b37f]/30 rounded-[40%_60%_55%_45%/60%_40%_55%_45%] scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" style={{ transitionDelay: '0ms' }} />
                    <div className="absolute inset-0 bg-[#52b37f]/20 rounded-[55%_45%_50%_50%/45%_55%_50%_50%] scale-0 group-hover:scale-100 transition-transform duration-500 ease-out translate-x-2 translate-y-1" style={{ transitionDelay: '150ms' }} />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://consumersite-assets.trustpilot.net/consumersite-home/public/appBanner/ios_app_illustration.svg" alt="Superscore Mobil Uygulama" className="relative z-10 w-full h-auto" />
                </div>
                <div>
                  <h3 className="font-superscore-bold text-base md:text-lg text-[#1b1a1b] mb-1">Superscore ile daha akıllıca alışveriş yapın</h3>
                  <p className="text-sm text-gray-500 mb-4">Hareket halindeyken şirketleri bulun, yorumları okuyun veya yorum yazın.</p>
                  <a href="#" className="inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://cdn.trustpilot.net/app-store/ios/badges/en-US.svg" alt="App Store&#39;dan İndirin" className="h-10" />
                  </a>
                </div>
              </div>

              {/* Can't find company? */}
              <div className="text-center py-10 border-t border-gray-100">
                <h3 className="font-superscore-bold text-lg text-[#292a24] mb-2">Şirket bulamadınız mı?</h3>
                <p className="text-sm text-[#292a24]/70 mb-5">Henüz Superscore&apos;da listelenmemiş olabilir. Ekleyin ve ilk yorumu yazan siz olun.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-2.5 text-sm font-medium text-[#4256b6] border border-[#4256b6] rounded-full hover:border-transparent hover:bg-[#f2f5fd] hover:text-[#2b2c26] transition-all"
                >
                  Şirket ekle
                </button>
              </div>
        </div>
      )}

      {/* Other steps - wrapped in centered container */}
      <div className="max-w-2xl mx-auto px-4">
        {step !== 'brand' && error && <div className="mb-4 mt-8 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

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
                <BrandLogo name={selectedBrand.name} logoUrl={selectedBrand.logo_url} size={40} />
                <div className="text-left"><p className="font-semibold text-sm">{selectedBrand.name}</p><p className="text-xs text-gray-400">{selectedBrand.website}</p></div>
              </div>
            )}
            {existingReview && (
              <div className="mb-6 text-left bg-[#eef1f9] border border-[#3c57bc]/20 rounded-xl p-4 flex items-start gap-3">
                <Info className="h-4 w-4 text-[#3c57bc] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#1b1a1b]">Bu marka için zaten bir değerlendirmeniz var</p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Şikayetiniz mevcut değerlendirmenizle (
                    <span className="font-medium">{existingReview.rating} yıldız</span>
                    ) otomatik olarak birleştirilecek. Yıldız puanınızı buradan güncelleyebilirsiniz.
                  </p>
                </div>
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
                  <BrandLogo name={selectedBrand.name} logoUrl={selectedBrand.logo_url} size={40} />
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

              {/* AI Moderation Review - Superscore branded design */}
              {showModerationReview && moderationResult && (
                <div className="rounded-xl border-2 border-[#f7d047] bg-[#fffdf5] overflow-hidden">
                  <div className="px-4 py-3 bg-[#f7d047]/20 flex items-center gap-2">
                    <Image src="/logo/star_icon.png" alt="" width={18} height={18} className="w-[18px] h-[18px]" />
                    <p className="font-superscore-bold text-sm text-[#8a6d00]">İçerik düzenlendi</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-1.5 mb-4">
                      {(moderationResult.changes_made as string[] || []).map((c: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#8a6d00] mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-[#5a4800]">{c}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#8a6d00]/70 mb-4">Düzenlenmiş içerik üst taraftaki alanlarda güncellenmiştir. İnceleyip onaylayabilirsiniz.</p>
                    <div className="flex gap-2">
                      <button onClick={acceptModerated} className="px-5 py-2.5 bg-[#1b1a1b] text-white rounded-full text-sm font-semibold hover:bg-[#333] transition-colors">Onayla</button>
                      <button onClick={() => setShowModerationReview(false)} className="px-5 py-2.5 border-2 border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">Düzenle</button>
                    </div>
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
    <Suspense fallback={<div className="min-h-screen bg-[#b2f8cc] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#1b1a1b]" /></div>}>
      <NewComplaintWizard />
    </Suspense>
  );
}
