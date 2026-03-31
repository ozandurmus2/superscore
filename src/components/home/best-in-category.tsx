import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { StarRating } from '@/components/ui/star-rating';
import type { Brand } from '@/types';

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  'e-ticaret': 'E-Ticaret',
  'kargo-lojistik': 'Kargo & Lojistik',
  'telekomunikasyon': 'Telekomünikasyon',
  'bankacilik-finans': 'Bankacılık',
  'yemek-teslimat': 'Yemek & Teslimat',
  'sigorta': 'Sigorta',
  'elektronik-teknoloji': 'Elektronik',
  'seyahat-tatil': 'Seyahat & Tatil',
};

export async function BestInCategory() {
  const supabase = await createClient();

  // Get top brands per category
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .gt('avg_rating', 0)
    .order('avg_rating', { ascending: false })
    .limit(50);

  if (!brands || brands.length === 0) return null;

  // Group by category and pick top 4 per category
  const grouped: Record<string, Brand[]> = {};
  for (const brand of brands as Brand[]) {
    const cat = brand.category || 'diger';
    if (!grouped[cat]) grouped[cat] = [];
    if (grouped[cat].length < 4) {
      grouped[cat].push(brand);
    }
  }

  // Only show categories with at least 2 brands
  const categoriesToShow = Object.entries(grouped)
    .filter(([, b]) => b.length >= 1)
    .slice(0, 3);

  if (categoriesToShow.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 space-y-10">
        {categoriesToShow.map(([category, categoryBrands]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b]">
                {CATEGORY_LABELS[category] || category} Kategorisinde En İyiler
              </h2>
              <Link
                href={`/markalar?kategori=${category}`}
                className="px-5 py-2 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:border-transparent hover:bg-[#f2f5fe] hover:text-[#2e2f2a] transition-all"
              >
                Tümünü Gör
              </Link>
            </div>

            {/* Brand Cards - Horizontal scroll on mobile, grid on desktop */}
            <div
              className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categoryBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/markalar/${brand.slug}`}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all group flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto"
                >
                  {/* Brand Logo Placeholder */}
                  <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4 group-hover:border-gray-300 transition-colors">
                    {brand.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={brand.logo_url} alt={brand.name} className="w-12 h-12 object-contain rounded-lg" />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">{brand.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>

                  {/* Brand Info */}
                  <h3 className="font-semibold text-[#1b1a1b] text-sm mb-0.5">{brand.name}</h3>
                  {brand.website && (
                    <p className="text-xs text-gray-400 mb-3">{brand.website}</p>
                  )}

                  {/* Star Rating */}
                  <StarRating
                    rating={brand.avg_rating || 0}
                    size="sm"
                    showScore
                    reviewCount={brand.total_complaints}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
