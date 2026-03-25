'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MARKETPLACES, RESOLUTION_OPTIONS } from '@/types';
import { Search, ArrowRight, ArrowLeft, Store, Globe, ShoppingBag, CheckCircle, Loader2, AlertTriangle, Sparkles, X } from 'lucide-react';
import type { Brand } from '@/types';

// Step definitions
type Step = 'brand' | 'marketplace' | 'details' | 'review';

function NewComplaintWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Wizard state
  const [step, setStep] = useState<Step>('brand');

  // Step 1: Brand selection
  const [brandSearch, setBrandSearch] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);

  // New brand creation
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandWebsite, setNewBrandWebsite] = useState('');
  const [isMarketplace, setIsMarketplace] = useState(false);

  // Marketplace sub-flow
  const [sellerName, setSellerName] = useState('');
  const [selectedMarketplace, setSelectedMarketplace] = useState('');

  // Step 2: Complaint details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [desiredResolution, setDesiredResolution] = useState('');
  const [selectedResolutionValue, setSelectedResolutionValue] = useState('');

  // AI suggestions
  const [resolutionSuggestions, setResolutionSuggestions] = useState<{ value: string; label: string }[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // AI moderation
  const [moderating, setModerating] = useState(false);
  const [moderationResult, setModerationResult] = useState<Record<string, unknown> | null>(null);
  const [showModerationReview, setShowModerationReview] = useState(false);

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load brands on search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (brandSearch.length >= 2) {
        setSearching(true);
        const { data } = await supabase
          .from('brands')
          .select('*')
          .ilike('name', `%${brandSearch}%`)
          .limit(10);
        setBrands(data as Brand[] || []);
        setShowResults(true);
        setSearching(false);
      } else {
        setBrands([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [brandSearch]);

  // Pre-select brand from URL param
  useEffect(() => {
    const brandSlug = searchParams.get('marka');
    if (brandSlug) {
      supabase.from('brands').select('*').eq('slug', brandSlug).single().then(({ data }) => {
        if (data) {
          setSelectedBrand(data as Brand);
          setStep('details');
        }
      });
    }
  }, [searchParams]);

  // AI resolution suggestions based on what user types
  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 5) {
      setResolutionSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const res = await fetch('/api/ai/suggest-resolution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, brandCategory: selectedBrand?.category || '' }),
      });
      const data = await res.json();
      setResolutionSuggestions(data.suggestions || []);
    } catch {
      setResolutionSuggestions([]);
    }
    setLoadingSuggestions(false);
  }, [selectedBrand]);

  // Debounced resolution suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (desiredResolution.length >= 3) {
        fetchSuggestions(desiredResolution);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [desiredResolution, fetchSuggestions]);

  // Create new brand and proceed
  async function handleCreateBrand() {
    if (!newBrandName.trim()) return;

    const slug = newBrandName.toLowerCase()
      .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

    const { data, error: err } = await supabase
      .from('brands')
      .insert({
        name: newBrandName.trim(),
        slug: slug || `brand-${Date.now()}`,
        website: newBrandWebsite.trim() || null,
        category: 'diger',
        superscore: 0,
        total_complaints: 0,
        resolved_complaints: 0,
      })
      .select()
      .single();

    if (err) {
      // Brand might already exist
      const { data: existing } = await supabase.from('brands').select('*').ilike('name', newBrandName.trim()).single();
      if (existing) {
        setSelectedBrand(existing as Brand);
      } else {
        setError('Marka oluşturulamadı: ' + err.message);
        return;
      }
    } else if (data) {
      setSelectedBrand(data as Brand);
    }

    if (isMarketplace) {
      setStep('marketplace');
    } else {
      setStep('details');
    }
  }

  // Select existing brand
  function handleSelectBrand(brand: Brand) {
    setSelectedBrand(brand);
    setShowResults(false);
    setBrandSearch(brand.name);
    setStep('details');
  }

  // AI moderation check before final submit
  async function handleModerate() {
    setModerating(true);
    try {
      const res = await fetch('/api/ai/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, desiredResolution }),
      });
      const result = await res.json();
      setModerationResult(result);

      if (result.has_issues && result.severity !== 'none') {
        setShowModerationReview(true);
      } else {
        // No issues, proceed to submit
        await submitComplaint(title, description, desiredResolution);
      }
    } catch {
      // If moderation fails, submit anyway
      await submitComplaint(title, description, desiredResolution);
    }
    setModerating(false);
  }

  // Accept moderated version
  async function acceptModerated() {
    if (!moderationResult) return;
    const cleanTitle = (moderationResult.cleaned_title as string) || title;
    const cleanDesc = (moderationResult.cleaned_description as string) || description;
    const cleanRes = (moderationResult.cleaned_resolution as string) || desiredResolution;
    setTitle(cleanTitle);
    setDescription(cleanDesc);
    setDesiredResolution(cleanRes);
    setShowModerationReview(false);
    await submitComplaint(cleanTitle, cleanDesc, cleanRes);
  }

  // Final submit
  async function submitComplaint(finalTitle: string, finalDesc: string, finalResolution: string) {
    setSubmitting(true);
    setError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !selectedBrand) {
      setError('Giriş yapmanız gerekiyor');
      setSubmitting(false);
      return;
    }

    // Build description with marketplace info if applicable
    let fullDescription = finalDesc;
    if (isMarketplace && sellerName) {
      fullDescription = `[Pazaryeri: ${selectedMarketplace || 'Belirtilmemiş'} | Satıcı: ${sellerName}]\n\n${finalDesc}`;
    }

    const res = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_id: selectedBrand.id,
        title: finalTitle,
        description: fullDescription,
        category: selectedResolutionValue || 'other',
        desired_resolution: finalResolution,
        order_number: orderNumber || null,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/panel/sikayetlerim/${data.id}`);
    } else {
      const err = await res.json();
      setError(err.error || 'Şikayet oluşturulamadı');
    }
    setSubmitting(false);
  }

  // Progress indicator
  const steps = [
    { key: 'brand', label: 'Marka Seçimi' },
    { key: 'details', label: 'Şikayet Detayları' },
    { key: 'review', label: 'Gönder' },
  ];
  const currentStepIndex = step === 'brand' ? 0 : step === 'marketplace' ? 0 : step === 'details' ? 1 : 2;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold transition-all ${
              i <= currentStepIndex ? 'bg-[#1B1F3B] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i < currentStepIndex ? <CheckCircle className="h-5 w-5" /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i <= currentStepIndex ? 'text-[#1B1F3B] font-medium' : 'text-gray-400'}`}>{s.label}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStepIndex ? 'bg-[#1B1F3B]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      {/* ============================================ */}
      {/* STEP 1: BRAND SEARCH */}
      {/* ============================================ */}
      {step === 'brand' && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1B1F3B] mb-2">Deneyiminizi paylaşın</h1>
            <p className="text-gray-500">Başkalarının doğru seçim yapmasına yardımcı olun.</p>
          </div>

          {/* Search Box */}
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Değerlendirebileceğiniz bir şirket bulun."
                  value={brandSearch}
                  onChange={(e) => {
                    setBrandSearch(e.target.value);
                    setShowAddBrand(false);
                  }}
                  className="pl-12 py-6 text-lg rounded-full border-gray-300 focus:border-[#1B1F3B]"
                  autoFocus
                />
                {searching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />}
              </div>

              {/* Search Results */}
              {showResults && (
                <div className="mt-4">
                  {brands.length > 0 ? (
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => handleSelectBrand(brand)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border text-left"
                        >
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                            {brand.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-[#1B1F3B]">{brand.name}</p>
                            {brand.website && <p className="text-xs text-gray-400">{brand.website}</p>}
                          </div>
                          {brand.superscore > 0 && (
                            <div className="ml-auto">
                              <span className={`text-sm font-bold ${brand.superscore >= 60 ? 'text-green-600' : brand.superscore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {brand.superscore}/100
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : brandSearch.length >= 2 && !searching ? (
                    /* Brand not found */
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#1B1F3B]">Şirket bulamadınız mı?</p>
                          <p className="text-sm text-gray-500">Henüz Superscore&apos;da listelenmemiş olabilir. Ekleyin ve ilk yorumu yazan siz olun.</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAddBrand(true);
                            setNewBrandName(brandSearch);
                          }}
                          className="border-[#1B1F3B] text-[#1B1F3B] hover:bg-[#1B1F3B] hover:text-white rounded-full px-6"
                        >
                          Şirket ekle
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add New Brand Form */}
          {showAddBrand && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-[#1B1F3B]">Şirket Ekle</h3>
                <p className="text-sm text-gray-500">Şirket bulamadınız mı? Henüz Superscore&apos;da listelenmemiş olabilir. Ekleyin ve ilk yorumu yazan siz olun.</p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marka Adı</label>
                  <Input
                    placeholder="Örn: JB Step, Lobbe Tech..."
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Web Sitesi URL&apos;si</label>
                  <Input
                    placeholder="Örn: www.jbstep.com"
                    value={newBrandWebsite}
                    onChange={(e) => setNewBrandWebsite(e.target.value)}
                  />
                </div>

                {/* Marketplace toggle */}
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isMarketplace ? 'border-[#1B1F3B] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setIsMarketplace(!isMarketplace)}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`h-5 w-5 ${isMarketplace ? 'text-[#1B1F3B]' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-sm">Şikayet yazacağınız marka bir pazaryeri mi?</p>
                      <p className="text-xs text-gray-500">Trendyol, Hepsiburada, Amazon gibi pazaryerindeki bir satıcı hakkında mı şikayet ediyorsunuz?</p>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isMarketplace ? 'bg-[#1B1F3B] border-[#1B1F3B]' : 'border-gray-300'
                    }`}>
                      {isMarketplace && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateBrand}
                  disabled={!newBrandName.trim()}
                  className="w-full bg-[#1B1F3B] hover:bg-[#2a2f5a] text-white rounded-full py-3"
                >
                  Şirket Ekle <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ============================================ */}
      {/* STEP 1.5: MARKETPLACE SUB-FLOW */}
      {/* ============================================ */}
      {step === 'marketplace' && (
        <div>
          <button onClick={() => setStep('brand')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
            <ArrowLeft className="h-4 w-4" /> Geri Dön
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1B1F3B] mb-2">Pazaryeri Bilgileri</h1>
            <p className="text-gray-500">Hangi pazaryerinden alışveriş yaptığınızı belirtin.</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Satıcı Mağaza Adı</label>
                <Input
                  placeholder="Örn: XYZ Elektronik, ABC Giyim..."
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">Pazaryerindeki satıcının mağaza adını yazın</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Hangi Pazaryeri?</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {MARKETPLACES.map((mp) => (
                    <button
                      key={mp.value}
                      onClick={() => setSelectedMarketplace(mp.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                        selectedMarketplace === mp.value
                          ? 'border-[#1B1F3B] bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{mp.logo}</span>
                      <span className="text-xs font-medium">{mp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep('details')}
                disabled={!sellerName.trim() || !selectedMarketplace}
                className="w-full bg-[#1B1F3B] hover:bg-[#2a2f5a] text-white rounded-full py-3"
              >
                Devam Et <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ============================================ */}
      {/* STEP 2: COMPLAINT DETAILS */}
      {/* ============================================ */}
      {step === 'details' && (
        <div>
          <button onClick={() => isMarketplace ? setStep('marketplace') : setStep('brand')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
            <ArrowLeft className="h-4 w-4" /> Geri Dön
          </button>

          {/* Selected brand badge */}
          {selectedBrand && (
            <div className="mb-6 flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="h-10 w-10 bg-[#1B1F3B] rounded-full flex items-center justify-center text-white font-bold">
                {selectedBrand.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-[#1B1F3B]">{selectedBrand.name}</p>
                {isMarketplace && sellerName && (
                  <p className="text-xs text-gray-500">
                    <Store className="h-3 w-3 inline" /> Satıcı: {sellerName} • {MARKETPLACES.find(m => m.value === selectedMarketplace)?.label || selectedMarketplace}
                  </p>
                )}
              </div>
              <button onClick={() => { setSelectedBrand(null); setStep('brand'); }} className="ml-auto text-gray-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <Card>
            <CardContent className="p-6 space-y-5">
              {/* Order Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sipariş Numarası <span className="text-gray-400 font-normal">(varsa)</span>
                </label>
                <Input
                  placeholder="Örn: 1234567890"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yorumunuza bir başlık verin <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Örn: İade talebim karşılanmadı"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deneyiminiz hakkında bize daha fazla bilgi verin <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Yaşadığınız sorunu detaylıca anlatın. Ne oldu? Ne zaman oldu? Markadan nasıl bir dönüş aldınız?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-gray-400 mt-1">{description.length}/2000 karakter</p>
              </div>

              {/* Desired Resolution - with AI suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Talebiniz <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">Marka hakkında talebiniz nedir? Yazın, size uygun seçenekler önerelim.</p>
                <Input
                  placeholder="Örn: İade istiyorum, ürün değişimi, fatura düzeltme..."
                  value={desiredResolution}
                  onChange={(e) => {
                    setDesiredResolution(e.target.value);
                    setSelectedResolutionValue('');
                  }}
                />

                {/* AI Suggestion chips */}
                {(resolutionSuggestions.length > 0 || loadingSuggestions) && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 text-purple-500" />
                      <span className="text-xs text-purple-600 font-medium">Önerilen Talepler</span>
                      {loadingSuggestions && <Loader2 className="h-3 w-3 animate-spin text-purple-400" />}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resolutionSuggestions.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => {
                            setSelectedResolutionValue(s.value);
                            setDesiredResolution(s.label);
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                            selectedResolutionValue === s.value
                              ? 'bg-[#1B1F3B] text-white border-[#1B1F3B]'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-[#1B1F3B]'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick suggestion buttons if no AI suggestions yet */}
                {resolutionSuggestions.length === 0 && !loadingSuggestions && !desiredResolution && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-2">Hızlı seçim:</p>
                    <div className="flex flex-wrap gap-2">
                      {RESOLUTION_OPTIONS.filter(o => o.categories.includes('*')).slice(0, 6).map((o) => (
                        <button
                          key={o.value}
                          onClick={() => {
                            setDesiredResolution(o.label);
                            setSelectedResolutionValue(o.value);
                          }}
                          className="px-3 py-1.5 rounded-full text-xs border border-gray-200 bg-gray-50 text-gray-600 hover:border-[#1B1F3B] hover:text-[#1B1F3B] transition-all"
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit / Next */}
              <Button
                onClick={() => setStep('review')}
                disabled={!title.trim() || !description.trim() || !desiredResolution.trim()}
                className="w-full bg-[#1B1F3B] hover:bg-[#2a2f5a] text-white rounded-full py-3"
              >
                Devam Et <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ============================================ */}
      {/* STEP 3: REVIEW & SUBMIT */}
      {/* ============================================ */}
      {step === 'review' && (
        <div>
          <button onClick={() => setStep('details')} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
            <ArrowLeft className="h-4 w-4" /> Geri Dön
          </button>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1B1F3B] mb-2">Şikayetinizi Gönderin</h1>
            <p className="text-gray-500">Son bir kez kontrol edin ve gönderin.</p>
          </div>

          <Card className="mb-4">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="h-12 w-12 bg-[#1B1F3B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedBrand?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-[#1B1F3B]">{selectedBrand?.name}</p>
                  {isMarketplace && sellerName && (
                    <p className="text-xs text-gray-500">Satıcı: {sellerName} • {MARKETPLACES.find(m => m.value === selectedMarketplace)?.label}</p>
                  )}
                  {selectedBrand?.website && (
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Globe className="h-3 w-3" />{selectedBrand.website}</p>
                  )}
                </div>
              </div>

              {orderNumber && (
                <div className="text-sm"><span className="text-gray-500">Sipariş No:</span> <span className="font-mono font-medium">{orderNumber}</span></div>
              )}

              <div>
                <p className="text-xs text-gray-400 mb-1">Başlık</p>
                <p className="font-medium text-[#1B1F3B]">{title}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Açıklama</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{description}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Talep</p>
                <p className="text-sm font-medium text-blue-700">{desiredResolution}</p>
              </div>
            </CardContent>
          </Card>

          {/* Moderation Review Modal */}
          {showModerationReview && moderationResult && (
            <Card className="mb-4 border-amber-300 bg-amber-50">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800">İçerik Düzenleme</p>
                    <p className="text-sm text-amber-600">Şikayetinizde bazı düzenlemeler yapıldı:</p>
                  </div>
                </div>

                <ul className="space-y-1 mb-4">
                  {(moderationResult.changes_made as string[] || []).map((change: string, i: number) => (
                    <li key={i} className="text-sm text-amber-700 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                      {change}
                    </li>
                  ))}
                </ul>

                <div className="bg-white p-3 rounded-lg border border-amber-200 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Düzenlenmiş Açıklama:</p>
                  <p className="text-sm">{moderationResult.cleaned_description as string}</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={acceptModerated} className="bg-[#1B1F3B] text-white flex-1">
                    <CheckCircle className="h-4 w-4" /> Düzenlemeyi Onayla ve Gönder
                  </Button>
                  <Button variant="outline" onClick={() => { setShowModerationReview(false); setStep('details'); }}>
                    Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!showModerationReview && (
            <Button
              onClick={handleModerate}
              disabled={submitting || moderating}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 text-base"
              size="lg"
            >
              {moderating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> İçerik kontrol ediliyor...</>
              ) : submitting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Gönderiliyor...</>
              ) : (
                <><CheckCircle className="h-5 w-5" /> Şikayeti Gönder</>
              )}
            </Button>
          )}

          <p className="text-xs text-center text-gray-400 mt-3">
            Göndererek Superscore kullanım şartlarını ve gizlilik politikasını kabul etmiş olursunuz.
          </p>
        </div>
      )}
    </div>
  );
}

export default function NewComplaintPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto animate-pulse"><div className="h-96 bg-gray-100 rounded-xl" /></div>}>
      <NewComplaintWizard />
    </Suspense>
  );
}
