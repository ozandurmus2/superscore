import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { StarRating } from '@/components/ui/star-rating';
import { ChevronRight, SlidersHorizontal, Star, Info } from 'lucide-react';

const CATEGORY_NAMES: Record<string, string> = {
  'e-ticaret': 'E-Ticaret & Pazaryerleri',
  'kargo-lojistik': 'Kargo & Lojistik',
  'telekomunikasyon': 'Telekomünikasyon',
  'bankacilik-finans': 'Bankacılık & Finans',
  'yemek-teslimat': 'Yemek & Teslimat',
  'sigorta': 'Sigorta',
  'elektronik-teknoloji': 'Elektronik & Teknoloji',
  'seyahat-tatil': 'Seyahat & Tatil',
  'arac-ulasim': 'Araç & Ulaşım',
  'ev-bahce': 'Ev & Bahçe',
  'saglik-tip': 'Sağlık & Tıp',
  'egitim-ogretim': 'Eğitim & Öğretim',
  'guzellik-bakim': 'Güzellik & Kişisel Bakım',
  'giyim-moda': 'Giyim & Moda',
  'spor-fitness': 'Spor & Fitness',
  'evcil-hayvanlar': 'Evcil Hayvanlar',
  'ev-hizmetleri': 'Ev Hizmetleri',
  'hukuk-devlet': 'Hukuk & Devlet',
  'medya-yayincilik': 'Medya & Yayıncılık',
  'is-hizmetleri': 'İş Hizmetleri',
  'insaat-imalat': 'İnşaat & İmalat',
  'kamu-hizmetleri': 'Kamu Hizmetleri',
  'restoranlar-kafeler': 'Restoranlar & Kafeler',
  'etkinlik-eglence': 'Etkinlik & Eğlence',
  'hobi-el-sanatlari': 'Hobi & El Sanatları',
  'yakit-enerji': 'Yakıt & Enerji',
};

export default async function SubCategoryPage({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const { slug, sub } = await params;
  const categoryName = CATEGORY_NAMES[slug] || slug;
  const subName = decodeURIComponent(sub).replace(/-/g, ' ').replace(/\bve\b/g, '&');
  // Capitalize each word
  const subTitle = subName.replace(/\b\w/g, c => c.toUpperCase());

  const supabase = await createClient();

  // Get brands matching this sub_category (fuzzy match on slug)
  const { data: brands, count } = await supabase
    .from('brands')
    .select('*', { count: 'exact' })
    .eq('category', slug)
    .order('superscore', { ascending: false });

  // Filter by sub_category name match
  const filtered = (brands || []).filter(b => {
    const bSub = (b.sub_category || '').toLowerCase().replace(/\s+/g, '-').replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[&]/g,'ve');
    return bSub === sub;
  });

  // Get sibling sub_categories for sidebar
  const allSubs = [...new Set((brands || []).map(b => b.sub_category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/kategoriler" className="hover:text-[#1b1a1b]">Kategoriler</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/kategoriler/${slug}`} className="hover:text-[#1b1a1b]">{categoryName}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1b1a1b]">{subTitle}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-1">
          {subTitle} Kategorisinin En İyileri
        </h1>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
          Kategoriler nasıl çalışır <Info className="h-3.5 w-3.5" />
        </p>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> Tüm filtreler
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <Star className="h-4 w-4" /> Puan
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">Şirketler ({filtered.length})</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Sıralama:</span>
                <select className="border-none bg-transparent font-medium text-[#1b1a1b] outline-none cursor-pointer">
                  <option>En alakalı</option>
                  <option>En yüksek puan</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filtered.map((brand) => (
                <Link key={brand.id} href={`/markalar/${brand.slug}`} className="block py-5 hover:bg-gray-50 -mx-4 px-4 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400 flex-shrink-0">
                      {brand.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">EN ALAKALI</span>
                          <h3 className="font-semibold text-[#1b1a1b]">{brand.name}</h3>
                          <p className="text-xs text-gray-400">{brand.website}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <StarRating rating={brand.avg_rating || 0} size="xs" />
                            <span className="text-sm font-medium text-[#1b1a1b]">{(brand.avg_rating || 0).toFixed(1)}</span>
                            <span className="text-sm text-gray-400">·</span>
                            <span className="text-sm text-gray-500 underline">{brand.total_complaints.toLocaleString('tr-TR')} değerlendirme</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400 hidden md:block">Türkiye</span>
                      </div>
                      {brand.category_tag && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5">{brand.category_tag}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">Bu alt kategoride henüz marka bulunmuyor.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="border border-gray-200 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1b1a1b]">İlgili kategoriler</h3>
                <Link href={`/kategoriler/${slug}`} className="text-sm text-[#3c57bc] hover:underline">Tümünü gör</Link>
              </div>
              <div className="space-y-1">
                {allSubs.map((s) => {
                  const sSlug = (s as string).toLowerCase().replace(/\s+/g, '-').replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[&]/g,'ve');
                  const isActive = sSlug === sub;
                  return (
                    <Link key={s as string} href={`/kategoriler/${slug}/${sSlug}`}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📁</span>
                      </div>
                      <div>
                        <p className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'} text-[#1b1a1b]`}>{s as string}</p>
                        <p className="text-xs text-gray-400">{categoryName}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
