import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { StarRating } from '@/components/ui/star-rating';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Globe, ShieldCheck, PenSquare, Star, MessageCircle, MapPin, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { BrandAccordion } from '@/components/brand/brand-accordion';
import { BrandNoticeBar } from '@/components/brand/brand-notice-bar';
import { BrandReviewsList } from '@/components/brand/brand-reviews-list';
import type { Brand, Review } from '@/types';

export default async function BrandProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase.from('brands').select('*').eq('slug', slug).single();
  if (!brand) notFound();

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, user:users(full_name)')
    .eq('brand_id', brand.id)
    .order('created_at', { ascending: false })
    .limit(20);

  // Get similar brands in same category
  const { data: similarBrands } = await supabase
    .from('brands')
    .select('*')
    .eq('category', brand.category)
    .neq('id', brand.id)
    .order('superscore', { ascending: false })
    .limit(4);

  // Calculate rating distribution
  const { data: allReviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('brand_id', brand.id);

  const ratingDist = [0, 0, 0, 0, 0]; // 1-5 star counts
  const totalReviews = allReviews?.length || 0;
  allReviews?.forEach((r: { rating: number }) => {
    if (r.rating >= 1 && r.rating <= 5) ratingDist[r.rating - 1]++;
  });

  const b = brand as Brand & { phone?: string; email?: string; address?: string; negative_response_rate?: number; avg_response_days?: number };
  const avgRating = b.avg_rating || 0;

  function getRatingLabel(r: number): string {
    if (r >= 4.5) return 'Mükemmel';
    if (r >= 4) return 'Harika';
    if (r >= 3) return 'İyi';
    if (r >= 2) return 'Yetersiz';
    return 'Kötü';
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/kategoriler" className="hover:text-[#1b1a1b] transition-colors">Kategoriler</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/kategoriler/${b.category}`} className="hover:text-[#1b1a1b] transition-colors">{b.category}</Link>
            {b.sub_category && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gray-400">{b.sub_category as string}</span>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1b1a1b]">{b.name}</span>
          </div>
        </div>
      </div>

      {/* Brand Header - Logo left, info center, score right */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Logo + Brand Info */}
            <div className="flex gap-5 flex-1">
              {/* Logo */}
              {b.logo_url ? (
                <Image src={b.logo_url} alt={b.name} width={100} height={100} className="w-[100px] h-[100px] rounded-2xl object-contain bg-gray-50 border border-gray-100 flex-shrink-0" />
              ) : (
                <div className="w-[100px] h-[100px] rounded-2xl bg-[#f97316] flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
                  {b.name.charAt(0)}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {b.is_verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">
                      <ShieldCheck className="h-3 w-3 text-green-500" /> İddia edilen profil
                    </span>
                  )}
                  {b.is_subscribed && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">
                      Ücretli Superscore aboneliği
                    </span>
                  )}
                </div>

                <h1 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-2">{b.name}</h1>

                {/* Rating line */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-sm text-gray-500 underline cursor-pointer">{totalReviews.toLocaleString('tr-TR')} değerlendirme</span>
                  <span className="text-gray-300">·</span>
                  <StarRating rating={avgRating} size="sm" showScore />
                </div>

                <p className="text-sm text-gray-500 mb-4">{b.category}</p>

                {/* Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Link href={`/degerlendirme-ver?marka=${slug}`}>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors">
                      <Star className="h-4 w-4" /> Değerlendirme ver
                    </button>
                  </Link>
                  <Link href={`/sikayet-yaz?marka=${slug}`}>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                      <PenSquare className="h-4 w-4" /> Sikayet yaz
                    </button>
                  </Link>
                  {b.website && (
                    <a href={b.website.startsWith('http') ? b.website : `https://${b.website}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
                      Web sitesini ziyaret edin <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Score Card - Desktop only, positioned here */}
            <div className="hidden lg:block lg:w-[320px] flex-shrink-0">
              <div className="border border-gray-200 rounded-2xl p-5">
                <div className="flex gap-4">
                  <div className="text-center min-w-[80px]">
                    <div className="text-4xl font-superscore-bold text-[#1b1a1b]">{avgRating.toFixed(1)}</div>
                    <p className="text-sm font-medium text-[#1b1a1b] mt-1">{getRatingLabel(avgRating)}</p>
                    <StarRating rating={avgRating} size="sm" className="mt-2 justify-center" />
                    <p className="text-xs text-gray-400 mt-1">{totalReviews.toLocaleString('tr-TR')} değerlendirme</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = ratingDist[star - 1];
                      const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                      const colors = ['#eb4b34', '#ef8d3f', '#f7d047', '#8acd41', '#52b37f'];
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">{star} yıldız</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: colors[star - 1] }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <button className="text-sm text-[#3c57bc] hover:underline">Superscore nasıl hesaplanır?</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Notice Bar - Collapsible */}
      <BrandNoticeBar />

      {/* Main Content - 2 column layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Main content */}
          <div className="flex-1 min-w-0">

            {/* AI Summary */}
            {totalReviews > 0 && (
              <section className="mb-8">
                <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-1 flex items-center gap-2">
                  Özet incelemesi <span className="text-base">✨</span>
                </h2>
                <p className="text-xs text-gray-400 mb-3">Yorumlara dayanarak, yapay zeka ile oluşturuldu.</p>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p>
                    {avgRating >= 4
                      ? `Müşteri yorumcuları bu şirketle harika bir deneyim yaşadılar. ${b.name} hizmet kalitesi ve müşteri memnuniyeti konusunda olumlu geri bildirimler alıyor.`
                      : avgRating >= 3
                      ? `${b.name} hakkında karma yorumlar bulunuyor. Bazı müşteriler memnun kalırken, bazıları iyileştirme gereken noktalar olduğunu belirtiyor.`
                      : `${b.name} hakkında olumsuz geri bildirimler alınıyor. Müşteriler çeşitli sorunlar yaşadıklarını belirtiyor.`
                    }
                  </p>
                </div>
              </section>
            )}

            {/* Topics - what people talk about */}
            {totalReviews > 2 && (
              <section className="mb-8">
                <h3 className="font-semibold text-base text-[#1b1a1b] mb-3">İnsanların en çok konuştuğu şey</h3>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {['Ürün', 'Kalite', 'Teslimat', 'Fiyat'].map((topic) => (
                    <div key={topic} className="flex-shrink-0 border border-gray-200 rounded-xl p-4 min-w-[200px]">
                      <p className="font-semibold text-sm text-[#3c57bc] mb-2">{topic}</p>
                      <p className="text-xs text-gray-500">Müşteriler {topic.toLowerCase()} hakkında görüş bildiriyor.</p>
                      <button className="text-xs text-[#3c57bc] mt-2 hover:underline">Daha fazla bilgi için bakınız.</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section className="mb-8">
              <h3 className="font-semibold text-base text-[#1b1a1b] mb-4">
                Bu değerlendirmelere dayanarak
              </h3>
              <BrandReviewsList
                reviews={(reviews as (Review & { user: { full_name: string } })[]) || []}
                brandSlug={slug}
              />
            </section>

            {/* View all reviews button */}
            {totalReviews > 3 && (
              <div className="mb-8">
                <button className="w-full py-3 text-center text-white bg-[#3c57bc] rounded-full font-semibold text-sm hover:bg-[#2e449a] transition-colors">
                  {totalReviews.toLocaleString('tr-TR')} yorumun tamamını görün
                </button>
              </div>
            )}

            {/* Company Info */}
            <section className="mb-8 border-t border-gray-200 pt-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">Şirket bilgileri</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600">{b.category}</span>
              </div>
              {b.description && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#1b1a1b] mb-1">Şirket tarafından yazılmıştır.</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
                </div>
              )}
            </section>

            {/* Contact Info */}
            <section className="mb-8 border-t border-gray-200 pt-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">İletişim bilgileri</h2>
              <div className="space-y-3">
                {b.address && (
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <span>{b.address}</span>
                  </div>
                )}
                {b.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <a href={`mailto:${b.email}`} className="text-[#3c57bc] hover:underline">{b.email}</a>
                  </div>
                )}
                {b.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <a href={b.website.startsWith('http') ? b.website : `https://${b.website}`} target="_blank" rel="noopener noreferrer" className="text-[#3c57bc] hover:underline">{b.website}</a>
                  </div>
                )}
              </div>
            </section>

            {/* Similar brands */}
            {(similarBrands as Brand[])?.length > 0 && (
              <section className="mb-8 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-base text-[#1b1a1b]">İnsanlar ayrıca şunlara da baktılar:</h3>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">&lt;</button>
                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">&gt;</button>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {(similarBrands as Brand[]).map((sb) => (
                    <Link key={sb.id} href={`/markalar/${sb.slug}`} className="flex-shrink-0 w-[200px]">
                      <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                        {sb.logo_url ? (
                          <Image src={sb.logo_url} alt={sb.name} width={56} height={56} className="w-14 h-14 rounded-xl object-contain bg-gray-50 border border-gray-200 mb-3" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400 mb-3">
                            {sb.name.charAt(0)}
                          </div>
                        )}
                        <p className="font-semibold text-sm text-[#1b1a1b]">{sb.name}</p>
                        <p className="text-xs text-gray-400 mb-2">{sb.website}</p>
                        <StarRating rating={sb.avg_rating || 0} size="xs" showScore reviewCount={sb.total_complaints} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[340px] flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Score Card - Mobile only (desktop version is in header) */}
              <div className="lg:hidden border border-gray-200 rounded-2xl p-5">
                <div className="flex gap-4">
                  <div className="text-center min-w-[80px]">
                    <div className="text-4xl font-superscore-bold text-[#1b1a1b]">{avgRating.toFixed(1)}</div>
                    <p className="text-sm font-medium text-[#1b1a1b] mt-1">{getRatingLabel(avgRating)}</p>
                    <StarRating rating={avgRating} size="sm" className="mt-2 justify-center" />
                    <p className="text-xs text-gray-400 mt-1">{totalReviews.toLocaleString('tr-TR')} değerlendirme</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = ratingDist[star - 1];
                      const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                      const colors = ['#eb4b34', '#ef8d3f', '#f7d047', '#8acd41', '#52b37f'];
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-12">{star} yıldız</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: colors[star - 1] }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Response rate card */}
              <div className="border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1b1a1b]">Olumsuz yorumların %{b.negative_response_rate || 0}&apos;ine yanıt verildi.</p>
                  <p className="text-xs text-gray-500">Genellikle {b.avg_response_days || 1} gün içinde yanıt verilir.</p>
                </div>
              </div>

              {/* Superscore Experience Accordion */}
              <BrandAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
