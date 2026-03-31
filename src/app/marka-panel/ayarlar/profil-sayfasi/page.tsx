'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  Building2, FileText, ShieldCheck, LayoutGrid, MessageSquare,
  ChevronDown, ChevronUp, Upload, Search, Info, ExternalLink,
  CheckCircle, Star, ChevronRight,
} from 'lucide-react';
import type { Brand } from '@/types';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Extended brand type with extra profile fields                               */
/* ─────────────────────────────────────────────────────────────────────────── */
type ExtBrand = Brand & {
  contact_email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  founded_year?: string;
  employees?: string;
  categories?: string[];
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* "TAVSİYE EDİLEN" badge                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
function RecommendedBadge() {
  return (
    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
      style={{ background: '#4a4a4a' }}>
      TAVSİYE EDİLEN
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Accordion row (shared border style, not separate cards)                     */
/* ─────────────────────────────────────────────────────────────────────────── */
function AccordionRow({
  icon: Icon,
  title,
  recommended,
  children,
  defaultOpen = false,
  last = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  recommended?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
  last?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={!last ? 'border-b border-gray-200' : ''}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <Icon className="w-5 h-5 text-gray-400 shrink-0" />
        <span className="flex-1 text-sm font-semibold text-[#1b1a1b] flex items-center flex-wrap gap-1">
          {title}
          {recommended && <RecommendedBadge />}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-6 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Save / Cancel buttons (gray pill style matching screenshot)                  */
/* ─────────────────────────────────────────────────────────────────────────── */
function SaveButtons({
  onSave,
  onCancel,
  saving,
  saved,
}: {
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mt-5">
      <button
        onClick={onSave}
        disabled={saving}
        className="px-5 py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
        style={{ background: saved ? '#52b37f' : '#e5e7eb', color: saved ? 'white' : '#374151' }}
      >
        {saving ? 'Kaydediliyor…' : saved ? 'Kaydedildi ✓' : 'Kaydet ve yayınla'}
      </button>
      <button
        onClick={onCancel}
        className="px-5 py-2 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        style={{ background: '#e5e7eb' }}
      >
        İptal etmek
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Inline input                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1b1a1b] mb-1.5 flex items-center gap-1">
        {label}
        {hint && (
          <span title={hint}>
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const INPUT_CLS =
  'w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc] bg-white placeholder-gray-400';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Phone mockup preview                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function ProfilePreview({ brand, tab, logoUrl, liveName, liveWebsite }: { brand: ExtBrand | null; tab: 'mobil' | 'masaustu'; logoUrl: string; liveName: string; liveWebsite: string }) {
  const displayName = liveName || brand?.name || 'Marka Adı';
  const displayWebsite = liveWebsite || brand?.website || '';
  const avgRating = brand?.avg_rating ?? 0;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(avgRating));

  if (tab === 'masaustu') {
    return (
      <div className="border border-gray-200 rounded-xl bg-white p-5 min-h-[180px]">
        <div className="flex items-center gap-4">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-lg border border-gray-200" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-base font-bold text-[#1b1a1b]">{displayName}</p>
            <div className="flex items-center gap-1 mt-1">
              {stars.map((filled, i) => (
                <Star key={i} className={`w-4 h-4 ${filled ? 'fill-[#52b37f] text-[#52b37f]' : 'fill-gray-200 text-gray-200'}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">{brand?.avg_rating?.toFixed(1) ?? '0'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{brand?.total_complaints ?? 0} Yorum</p>
          </div>
        </div>
        {displayWebsite && (
          <a href={displayWebsite} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs text-[#3c57bc] border border-[#3c57bc]/30 px-3 py-1.5 rounded-full hover:bg-[#3c57bc]/5">
            Web sitesini ziyaret edin <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  }

  // Mobile phone mockup
  return (
    <div className="flex justify-center py-2">
      <div className="relative w-[260px]">
        {/* Phone shell */}
        <div className="rounded-[32px] border-[8px] border-[#3a3a3a] bg-white shadow-xl overflow-hidden">
          {/* Notch */}
          <div className="h-5 bg-[#3a3a3a] flex items-center justify-center">
            <div className="w-14 h-2 bg-[#2a2a2a] rounded-full" />
          </div>
          {/* Content */}
          <div className="p-3 min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded border border-gray-200" />
              ) : (
                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                  {displayName.slice(0, 2).toUpperCase()}
                </div>
              )}
              {displayWebsite && (
                <div className="flex items-center gap-1 border border-[#3c57bc] rounded-full px-2 py-1 text-[10px] text-[#3c57bc]">
                  Web sitesini ziyaret et <ExternalLink className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-[#52b37f]" />
              <span className="text-[10px] text-[#52b37f] font-medium">İddia edilen profil</span>
            </div>
            <p className="text-sm font-bold text-[#1b1a1b]">{displayName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-gray-500 underline">{brand?.total_complaints ?? 0} Yorum</span>
              <span className="text-gray-300 text-[10px]">·</span>
              {stars.map((filled, i) => (
                <Star key={i} className={`w-3 h-3 ${filled ? 'fill-[#52b37f] text-[#52b37f]' : 'fill-gray-200 text-gray-200'}`} />
              ))}
              <span className="text-[10px] text-gray-400">{brand?.avg_rating?.toFixed(1) ?? '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main page                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
const EMPLOYEE_OPTIONS = ['', '1–10', '11–50', '51–200', '201–500', '500+'];
const COUNTRIES = ['Türkiye', 'Almanya', 'Amerika Birleşik Devletleri', 'Birleşik Krallık', 'Fransa', 'Hollanda', 'İspanya', 'İtalya'];

export default function ProfilSayfasiPage() {
  const [brand, setBrand] = useState<ExtBrand | null>(null);
  const [loading, setLoading] = useState(true);

  // Section-level saving state
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [previewTab, setPreviewTab] = useState<'mobil' | 'masaustu'>('mobil');

  const [description, setDescription] = useState('');

  const [foundedYear, setFoundedYear] = useState('');
  const [employees, setEmployees] = useState('');

  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Türkiye');

  const [showPlusFeatures, setShowPlusFeatures] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand:brands(*)')
        .eq('user_id', user.id)
        .single();
      if (member) {
        const b = (member as unknown as { brand: ExtBrand }).brand;
        setBrand(b);
        setName(b.name || '');
        setWebsite(b.website || '');
        setLogoUrl(b.logo_url || '');
        setDescription(b.description || '');
        setFoundedYear(b.founded_year || '');
        setEmployees(b.employees || '');
        setSelectedCategories(b.categories || []);
        setContactEmail(b.contact_email || '');
        setPhone(b.phone || '');
        setAddress(b.address || '');
        setPostcode(b.postcode || '');
        setCity(b.city || '');
        setCountry(b.country || 'Türkiye');
      }
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveSection(key: string, fields: Record<string, unknown>) {
    if (!brand) return;
    setSaving(key);
    await supabase.from('brands').update(fields).eq('id', brand.id);
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2500);
  }

  const [logoError, setLogoError] = useState('');

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !brand) return;
    setLogoError('');

    // Client-side validation
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setLogoError('Sadece JPG, PNG veya WebP formatları desteklenir.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Dosya boyutu 2MB\'dan küçük olmalıdır.');
      return;
    }

    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'public-assets');
      formData.append('folder', 'brand-logos');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setLogoError('Yükleme başarısız oldu: ' + (data.error || 'Bilinmeyen hata'));
        setLogoUploading(false);
        return;
      }

      setLogoUrl(data.url);
    } catch (err) {
      setLogoError('Yükleme sırasında bir hata oluştu.');
      console.error(err);
    }
    setLogoUploading(false);
  }

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  if (loading) {
    return (
      <div className="max-w-3xl space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 pb-12">

      {/* ── Top action buttons ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#3c57bc' }}
        >
          Google My Business ile senkronize edin
        </button>
        <Link
          href={brand?.slug ? `/markalar/${brand.slug}` : '#'}
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-300 text-[#3c57bc] bg-white hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Herkese açık profile git
        </Link>
      </div>

      {/* ── İşletme bilgileri section ──────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-bold text-[#1b1a1b] mb-0.5">İşletme bilgileri</h2>
        <p className="text-sm text-gray-500 mb-4">
          Verdiğiniz bilgiler Superscore profilinizde herkese açık olarak görüntülenir.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

          {/* ── 1. İşletmeniz hakkında ──────────────────────────────────── */}
          <AccordionRow icon={Building2} title="İşletmeniz hakkında" defaultOpen>
            <p className="text-sm text-gray-500 mb-5">
              Logonuzu, şirket adınızı ve alan adınızı Superscore profilinize ekleyin.
            </p>

            {/* Profile preview */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#1b1a1b] mb-3">Superscore profil önizlemesi</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                {/* Preview tabs */}
                <div className="flex items-center justify-end gap-1 p-2 border-b border-gray-200 bg-white">
                  {(['mobil', 'masaustu'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setPreviewTab(t)}
                      className="px-3 py-1 rounded text-xs font-semibold transition-colors"
                      style={{
                        background: previewTab === t ? '#3c57bc' : 'transparent',
                        color: previewTab === t ? 'white' : '#6b7280',
                        border: previewTab === t ? 'none' : '1px solid #e5e7eb',
                      }}
                    >
                      {t === 'mobil' ? 'Mobil' : 'Masaüstü'}
                    </button>
                  ))}
                </div>
                <div className="p-5 bg-[#f5f4f0]">
                  <ProfilePreview brand={brand} tab={previewTab} logoUrl={logoUrl} liveName={name} liveWebsite={website} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="Firma Adı">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>

              <Field label="Şirket alanı" hint="Müşterilerin sizi bulmasına yardımcı olmak için şirket web sitenizin alan adını girin.">
                <input
                  type="url"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className={INPUT_CLS}
                />
              </Field>

              <div>
                <p className="text-sm font-semibold text-[#1b1a1b] mb-2">Logo</p>
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="hidden" onChange={handleLogoUpload} />
                <button
                  onClick={() => { setLogoError(''); fileRef.current?.click(); }}
                  disabled={logoUploading}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-[#3c57bc]/40 text-[#3c57bc] hover:bg-[#3c57bc]/5 transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {logoUploading ? 'Yükleniyor…' : 'Logo yükle'}
                </button>
                {logoError && (
                  <p className="text-xs text-red-500 mt-2">{logoError}</p>
                )}
                {logoUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-gray-50" />
                    <button
                      onClick={() => { setLogoUrl(''); setLogoError(''); supabase.from('brands').update({ logo_url: null }).eq('id', brand!.id); }}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Kaldır
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  JPG veya PNG formatında, 400px × 300px boyutlarında ve maksimum 1MB dosya boyutunda bir görsel kullanmanızı öneririz.{' '}
                  <button className="text-[#3c57bc] hover:underline">
                    Ana sayfanızın ekran görüntüsünü güncelleyin
                  </button>
                  .
                </p>
              </div>

              <SaveButtons
                onSave={() => saveSection('about', { name, website, logo_url: logoUrl || null })}
                onCancel={() => { setName(brand?.name || ''); setWebsite(brand?.website || ''); setLogoUrl(brand?.logo_url || ''); }}
                saving={saving === 'about'}
                saved={saved === 'about'}
              />
            </div>
          </AccordionRow>

          {/* ── 2. Şirket açıklaması ────────────────────────────────────── */}
          <AccordionRow icon={FileText} title="Şirket açıklaması" recommended>
            <p className="text-sm text-gray-500 mb-4">
              Şirketiniz hakkında en az 200 kelime yazmanızı öneririz. Açıklamanız metin içerebilir ve ücretli bir plana sahipseniz HTML ile özelleştirebilirsiniz. Görsel ekliyorsanız, en iyi kalite için genişliği 312 pikselin altında ve dosya boyutunu 5 MB&apos;ın altında tutun.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#1b1a1b] mb-2">Şirketinizi açıklayın</p>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={10}
                  placeholder="Müşterilerinize sizi benzersiz kılan özellikleri anlatın."
                  className={`${INPUT_CLS} resize-y`}
                />
                <p className="text-xs text-gray-400 mt-1">Kelime sayısı: {wordCount}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-sm font-semibold text-[#1b1a1b]">İçerik önizlemesi</p>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3 min-h-[200px] bg-gray-50">
                  {description ? (
                    <div>
                      <p className="text-sm font-bold text-[#1b1a1b]">{brand?.name || 'Marka'} Hakkında</p>
                      <p className="text-xs text-gray-500 mb-2">Şirket tarafından yazılmıştır.</p>
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-[#1b1a1b]">{brand?.name || 'Marka'} Hakkında</p>
                      <p className="text-xs text-gray-400">Şirket tarafından yazılmıştır.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEO tip */}
            <div className="mt-4 rounded-xl px-4 py-3" style={{ background: '#e8f4f8' }}>
              <p className="text-sm font-semibold text-[#1b1a1b]">Açıklama ne kadar uzun olursa, arama sonuçları o kadar iyi olur.</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Şirket açıklamanıza daha fazla bilgi eklemek, müşterilerin Google üzerinden Superscore profilinizi bulmasını kolaylaştırır.
              </p>
            </div>

            <SaveButtons
              onSave={() => saveSection('desc', { description })}
              onCancel={() => setDescription(brand?.description || '')}
              saving={saving === 'desc'}
              saved={saved === 'desc'}
            />
          </AccordionRow>

          {/* ── 3. Şirket bilgilerini onaylayın ─────────────────────────── */}
          <AccordionRow icon={ShieldCheck} title="Şirket bilgilerini onaylayın." recommended>
            <p className="text-sm text-gray-500 mb-4">
              Yıl ve çalışan sayısı bilgilerinizi doğrulayın. Bu bilgiler profil güvenilirliğinizi artırır.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Kuruluş yılı">
                <input
                  type="number"
                  value={foundedYear}
                  onChange={e => setFoundedYear(e.target.value)}
                  placeholder="2010"
                  min="1800"
                  max={new Date().getFullYear()}
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Çalışan sayısı">
                <select
                  value={employees}
                  onChange={e => setEmployees(e.target.value)}
                  className={INPUT_CLS}
                >
                  {EMPLOYEE_OPTIONS.map(o => (
                    <option key={o} value={o}>{o || 'Seçin'}</option>
                  ))}
                </select>
              </Field>
            </div>
            <SaveButtons
              onSave={() => saveSection('verify', { founded_year: foundedYear, employees })}
              onCancel={() => { setFoundedYear(brand?.founded_year || ''); setEmployees(brand?.employees || ''); }}
              saving={saving === 'verify'}
              saved={saved === 'verify'}
            />
          </AccordionRow>

          {/* ── 4. Kategoriler ──────────────────────────────────────────── */}
          <AccordionRow icon={LayoutGrid} title="Kategoriler" recommended>
            <p className="text-sm text-gray-500 mb-4">
              Endüstrinizi, ürünlerinizi veya hizmetlerinizi tanımlayan kategoriler seçin; müşterilerin sizi Superscore&apos;da bulmasına yardımcı olun.
            </p>

            <Field label="Birincil kategori ekle">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                  placeholder="Kategori arayın…"
                  className={`${INPUT_CLS} pl-9`}
                />
              </div>
            </Field>

            {/* Quick category chips */}
            {categorySearch && (
              <div className="mt-2 flex flex-wrap gap-2">
                {['E-Ticaret', 'Teknoloji', 'Giyim', 'Gıda', 'Hizmet', 'Finans', 'Sağlık', 'Eğitim']
                  .filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()))
                  .map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        if (!selectedCategories.includes(c)) setSelectedCategories(prev => [...prev, c]);
                        setCategorySearch('');
                      }}
                      className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 hover:border-[#3c57bc] hover:text-[#3c57bc] transition-colors"
                    >
                      {c}
                    </button>
                  ))}
              </div>
            )}

            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map(c => (
                  <div key={c} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#3c57bc]/10 text-[#3c57bc]">
                    {c}
                    <button onClick={() => setSelectedCategories(prev => prev.filter(x => x !== c))} className="ml-1 opacity-60 hover:opacity-100">×</button>
                  </div>
                ))}
              </div>
            )}

            {/* SEO tip */}
            <div className="mt-4 rounded-xl px-4 py-3" style={{ background: '#e8f4f8' }}>
              <p className="text-sm font-semibold text-[#1b1a1b]">SEO&apos;nuzu güçlendirin</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Kategoriler, Google ve Superscore arama sonuçlarında daha üst sıralarda yer almanızı sağlar. Ayrıca rakiplerinize kıyasla nasıl performans gösterdiğiniz konusunda değerli bilgiler sunar.
              </p>
            </div>

            <SaveButtons
              onSave={() => saveSection('cats', { categories: selectedCategories, category: selectedCategories[0] || brand?.category || 'diğer' })}
              onCancel={() => setSelectedCategories(brand?.categories || [])}
              saving={saving === 'cats'}
              saved={saved === 'cats'}
            />
          </AccordionRow>

          {/* ── 5. İletişim bilgileri ────────────────────────────────────── */}
          <AccordionRow icon={MessageSquare} title="İletişim bilgileri" last>
            <p className="text-sm text-gray-500 mb-4">Müşterilerinize size nasıl ulaşacaklarını söyleyin.</p>
            <div className="space-y-4">
              <Field label="E-posta">
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Telefon numarası">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Adres">
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Posta kodu / ZIP">
                  <input
                    type="text"
                    value={postcode}
                    onChange={e => setPostcode(e.target.value)}
                    className={INPUT_CLS}
                  />
                </Field>
                <Field label="Şehir">
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={INPUT_CLS}
                  />
                </Field>
              </div>
              <Field label="Ülke">
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className={INPUT_CLS}
                >
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <SaveButtons
                onSave={() => saveSection('contact', {
                  contact_email: contactEmail, phone, address, postcode, city, country,
                })}
                onCancel={() => {
                  setContactEmail(brand?.contact_email || '');
                  setPhone(brand?.phone || '');
                  setAddress(brand?.address || '');
                  setPostcode(brand?.postcode || '');
                  setCity(brand?.city || '');
                  setCountry(brand?.country || 'Türkiye');
                }}
                saving={saving === 'contact'}
                saved={saved === 'contact'}
              />
            </div>
          </AccordionRow>
        </div>
      </div>

      {/* ── Keşif barı (Plus-locked) ───────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-bold text-[#1b1a1b] mb-0.5">Keşif barı</h2>
        <p className="text-sm text-gray-500 mb-4">
          Profilinizde ziyaretçilerin promosyonları, garantileri ve benzer şirketleri keşfedebilecekleri alan.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-200">
            <p className="text-sm text-[#1b1a1b] leading-snug">
              <strong>Bu özellik Plus</strong> planının bir parçasıdır, bu nedenle erişmek için hesabınızı yükseltmeniz gerekecektir.
            </p>
            <Link
              href="/marka-panel/abonelik"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white shrink-0 transition-opacity hover:opacity-90"
              style={{ background: '#0e291d' }}
            >
              Erişim için yükseltin.
            </Link>
          </div>
          <button
            onClick={() => setShowPlusFeatures(v => !v)}
            className="w-full flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Tüm Plus özelliklerini göster
            <ChevronRight className={`w-4 h-4 transition-transform ${showPlusFeatures ? 'rotate-90' : ''}`} />
          </button>
          {showPlusFeatures && (
            <div className="px-5 pb-4 space-y-2">
              {[
                'Promosyon ve kampanya alanı',
                'Garanti rozetleri',
                'Benzer şirketler önerisi',
                'Öne çıkan yorumlar',
                'Özel CTA butonu',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#52b37f] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
