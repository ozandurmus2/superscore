import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { StarRating } from '@/components/ui/star-rating';
import { HeroBanner } from '@/components/home/hero-banner';
import { CategorySlider } from '@/components/home/category-slider';

export const metadata: Metadata = {
  title: 'Superscore - Tüketici Şikayet ve Değerlendirme Platformu',
  description:
    'Markaları değerlendirin, şikayetlerinizi yazın, tüketici deneyimlerini okuyun. 15.000+ marka hakkında gerçek kullanıcı yorumları.',
  alternates: {
    canonical: 'https://superscore.com.tr',
  },
};
import { BestInCategory } from '@/components/home/best-in-category';
import { HowItWorksFlow } from '@/components/home/how-it-works-flow';
import { BusinessCTA } from '@/components/home/business-cta';
import { formatRelativeTime } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { Complaint } from '@/types';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: complaints } = await supabase
    .from('complaints')
    .select('*, brand:brands(name, slug), user:users(full_name), reviews:reviews(rating)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Write a complaint CTA strip */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <Link
            href="/sikayet-yaz"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-[#fbfbfb] hover:border-gray-300 transition-all text-sm whitespace-nowrap"
          >
            <span className="text-[#1b1a1b]">Yaşadığın sorunu markaya ilet</span>
            <span className="text-[#3c57bc] font-medium">Şikayet Yaz</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[#1b1a1b] flex-shrink-0">
              <path d="M12.192 7.533 8.277 3.66 8.944 3 14 8l-5.056 5-.667-.66 3.915-3.873H2v-.934h10.192Z" />
            </svg>
          </Link>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Category Slider */}
      <CategorySlider />

      {/* Business CTA Banner */}
      <BusinessCTA />

      {/* Best in Category */}
      <BestInCategory />

      {/* We're Superscore - Green CTA */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[32px] overflow-hidden">
            {/* Video Background - Desktop */}
            <video autoPlay muted loop playsInline className="w-full h-auto hidden md:block">
              <source src="/bg-desktop.webm" type="video/webm" />
            </video>
            {/* Video Background - Mobile */}
            <video autoPlay muted loop playsInline className="w-full h-auto md:hidden">
              <source src="/bg-mobile.webm" type="video/webm" />
            </video>
            {/* Content overlaid */}
            <div className="absolute inset-0 z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8 h-full">
                <div className="flex-1">
                  <h2 className="font-superscore-bold text-2xl md:text-3xl text-white mb-4">Biz Superscore&apos;uz</h2>
                  <p className="text-white/80 text-base md:text-lg mb-6 max-w-lg">
                    Herkese açık bir değerlendirme platformuyuz. Vizyonumuz, evrensel güven sembolü olmak — insanların güvenle alışveriş yapmasını sağlamak ve şirketlerin gelişmesine yardımcı olmak.
                  </p>
                  <Link href="/nasil-calisir">
                    <button className="px-6 py-3 bg-white text-[#1b1a1b] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
                      Ne Yapıyoruz
                    </button>
                  </Link>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 md:max-w-sm relative overflow-hidden border border-white/20">
                  <h3 className="font-superscore-bold text-lg text-white mb-2">Yeni Güven Raporumuz Yayında!</h3>
                  <p className="text-white/80 text-sm mb-5">Platformumuzda güveni korumak ve teşvik etmek için hangi aksiyonları aldığımızı keşfedin.</p>
                  <Link href="/nasil-calisir">
                    <button className="px-5 py-2.5 text-sm font-medium text-white border border-white/50 rounded-full bg-transparent hover:bg-white/20 transition-all">
                      Göz Atın
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="border border-gray-200 rounded-[32px] px-6 md:px-10 py-6 flex items-center gap-6 md:gap-10 group overflow-hidden">
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
                <img src="https://cdn.trustpilot.net/app-store/ios/badges/en-US.svg" alt="App Store'dan İndirin" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Superscore Nedir? */}
      <HowItWorksFlow />

      {/* Recent Complaints - Trustpilot review card style */}
      {(complaints as (Complaint & { brand: { name: string; slug: string }; user: { full_name: string } | null; reviews: { rating: number }[] })[])?.length > 0 && (
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b]">Son Şikayetler</h2>
              <Link href="/sikayetler" className="text-sm font-medium text-[#1b1a1b] hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(complaints as (Complaint & { brand: { name: string; slug: string }; user: { full_name: string } | null; reviews: { rating: number }[] })[]).map((c) => (
                <Link key={c.id} href={`/sikayetler/${c.id}`} className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
                  <div className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all h-full flex flex-col">
                    {/* User info + rating */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-[#1b1a1b] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {(c.user?.full_name || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-[#1b1a1b] truncate">{c.user?.full_name || 'Anonim'}</p>
                        <StarRating rating={c.rating || c.reviews?.[0]?.rating || 0} size="xs" />
                      </div>
                    </div>
                    {/* Complaint text */}
                    <p className="text-sm text-[#1b1a1b] leading-relaxed mb-4 flex-1 line-clamp-4">
                      {c.description}
                    </p>
                    {/* Brand info */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      {c.brand?.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.brand.logo_url} alt={c.brand.name} className="w-7 h-7 rounded object-contain bg-white border border-gray-100 flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
                      ) : null}
                      <div className={`w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-[#1b1a1b] font-bold text-[10px] flex-shrink-0 ${c.brand?.logo_url ? 'hidden' : ''}`}>
                        {c.brand?.name?.charAt(0) || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#1b1a1b] truncate">{c.brand?.name}</p>
                        <p className="text-[10px] text-gray-400">{formatRelativeTime(c.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
