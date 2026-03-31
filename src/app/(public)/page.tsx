import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { StarRating } from '@/components/ui/star-rating';
import { HeroBanner } from '@/components/home/hero-banner';
import { CategorySlider } from '@/components/home/category-slider';
import { BestInCategory } from '@/components/home/best-in-category';
import { HowItWorksFlow } from '@/components/home/how-it-works-flow';
import { BusinessCTA } from '@/components/home/business-cta';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { ArrowRight, PenSquare } from 'lucide-react';
import type { Brand, Complaint } from '@/types';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('superscore', { ascending: false })
    .limit(6);

  const { data: complaints } = await supabase
    .from('complaints')
    .select('*, brand:brands(name, slug)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(5);

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
          <div className="bg-[#c1f6cf] rounded-[32px] p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-4">Biz Superscore&apos;uz</h2>
                <p className="text-[#1b1a1b]/80 text-base md:text-lg mb-6 max-w-lg">
                  Herkese açık bir değerlendirme platformuyuz. Vizyonumuz, evrensel güven sembolü olmak — insanların güvenle alışveriş yapmasını sağlamak ve şirketlerin gelişmesine yardımcı olmak.
                </p>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 bg-[#121511] text-white text-sm font-semibold rounded-full hover:bg-[#397c4f] transition-colors">
                    Ne Yapıyoruz
                  </button>
                </Link>
              </div>
              <div className="bg-[#225430] rounded-2xl p-6 md:p-8 md:max-w-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-4 border-[#52b37f]/40" />
                <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full border-4 border-white/20" />
                <h3 className="font-superscore-bold text-lg text-white mb-2">Yeni Güven Raporumuz Yayında!</h3>
                <p className="text-white/80 text-sm mb-5">Platformumuzda güveni korumak ve teşvik etmek için hangi aksiyonları aldığımızı keşfedin.</p>
                <Link href="/nasil-calisir">
                  <button className="px-5 py-2.5 text-sm font-medium text-[#4256b6] border border-[#4256b6] rounded-full bg-transparent hover:bg-[#397c4f] hover:text-white hover:border-[#397c4f] transition-all">
                    Göz Atın
                  </button>
                </Link>
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

      {/* Featured Brands - Trustpilot card style */}
      {(brands as Brand[])?.length > 0 && (
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b]">Öne Çıkan Markalar</h2>
              <Link href="/markalar" className="text-sm font-medium text-[#1b1a1b] hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(brands as Brand[]).map((brand) => (
                <Link key={brand.id} href={`/markalar/${brand.slug}`} className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto">
                  <div className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#1b1a1b] flex items-center justify-center text-white font-bold text-lg">
                          {brand.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-[#1b1a1b]">{brand.name}</h3>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{brand.category}</span>
                        </div>
                      </div>
                      {/* Superscore circle */}
                      <div className="relative w-11 h-11 flex-shrink-0">
                        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                          <circle
                            cx="22" cy="22" r="18" fill="none"
                            stroke={brand.superscore >= 70 ? '#52b37f' : brand.superscore >= 40 ? '#f7d047' : '#eb4b34'}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${(brand.superscore / 100) * 113} 113`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1b1a1b]">{brand.superscore}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{brand.total_complaints} şikayet</span>
                      <span>{brand.resolved_complaints} çözülen</span>
                      {brand.avg_rating && (
                        <StarRating rating={brand.avg_rating} size="xs" showScore />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Complaints - Same card style */}
      {(complaints as (Complaint & { brand: { name: string; slug: string } })[])?.length > 0 && (
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b]">Son Şikayetler</h2>
              <Link href="/sikayetler" className="text-sm font-medium text-[#1b1a1b] hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(complaints as (Complaint & { brand: { name: string; slug: string } })[]).map((c) => (
                <Link key={c.id} href={`/sikayetler/${c.id}`} className="flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-auto">
                  <div className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COMPLAINT_STATUS_COLORS[c.status]}`}>
                        {COMPLAINT_STATUS_LABELS[c.status]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-[#1b1a1b] mb-1">{c.title}</h3>
                    <p className="text-xs text-gray-500">{c.brand?.name} · {formatRelativeTime(c.created_at)}</p>
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
