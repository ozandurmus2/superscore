'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

/* ── Intersection hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

/* ── Feature Slider ── */
function FeatureSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const features = [
    {
      tag: 'AI DOĞRULAMA',
      title: 'Yapay zeka ile çözüm doğrulaması',
      desc: 'Markanın yüklediği çözüm belgelerini AI teknolojimiz analiz eder. Gerçek çözüm sağlanıp sağlanmadığını otomatik değerlendirir ve admin ekibimiz onaylar.',
      link: '/karsilastir',
      linkText: 'Detaylı karşılaştırma',
    },
    {
      tag: 'DİNAMİK PUAN',
      title: 'Superscore: gerçek zamanlı güven puanı',
      desc: 'Her çözülen şikayet puanı yükseltir, her çözülmeyen düşürür. Markalar şeffaf bir şekilde değerlendirilir. 0-100 arası dinamik skor sistemi.',
      link: '/karsilastir',
      linkText: 'Nasıl hesaplanır?',
    },
    {
      tag: 'HEDİYE VE KUPON',
      title: 'Markalardan özel teklifler alın',
      desc: 'Markalar çözüm sürecinde size hediye, indirim kuponu veya özel teklifler sunabilir. Şikayetiniz memnuniyete dönüşür.',
      link: '/sikayet-yaz',
      linkText: 'Şikayet yazın',
    },
    {
      tag: 'ŞİKAYET TAKİBİ',
      title: 'Baştan sona şeffaf süreç',
      desc: 'Şikayetinizin hangi aşamada olduğunu anlık takip edin. Marka yanıtı, AI incelemesi, çözüm onayı - her adım size bildirilir.',
      link: '/register',
      linkText: 'Hesap oluşturun',
    },
    {
      tag: 'WİDGET SİSTEMİ',
      title: 'Güvenilir markaları web sitelerinde tanıyın',
      desc: 'Superscore widget kullanan markaların web sitelerinde güven puanını doğrudan görebilirsiniz. Alışveriş öncesi karar vermenizi kolaylaştırır.',
      link: '/karsilastir',
      linkText: 'Daha fazla bilgi',
    },
    {
      tag: 'ÇOKLU PLATFORM',
      title: 'Tüm platformlardan tek puan',
      desc: 'Google, Trustpilot ve diğer platformlardaki yorumlar tek bir Superscore puanında birleşir. Markanın gerçek imajını görün.',
      link: '/karsilastir',
      linkText: 'Platformları keşfedin',
    },
  ];

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      return;
    }
    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
      }
    }, 4500);
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [isPaused]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[340px] md:w-[400px] snap-start rounded-2xl p-7 md:p-8 border border-white/[0.06] backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <p className="text-[#d6f894]/60 text-[10px] tracking-[0.2em] uppercase mb-4">{f.tag}</p>
            <h3 className="text-white text-lg md:text-xl mb-3" style={{ fontWeight: 450 }}>{f.title}</h3>
            <p className="text-white/35 text-sm leading-relaxed mb-6">{f.desc}</p>
            <Link href={f.link} className="text-[#d6f894]/70 text-sm hover:text-[#d6f894] transition-colors inline-flex items-center gap-1 group">
              {f.linkText}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => scroll('left')}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'border-white/20 text-white/60 hover:bg-white/5' : 'border-white/5 text-white/15 cursor-default'}`}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/5 transition-all"
        >
          {isPaused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="3,1 13,7 3,13" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
          )}
        </button>
        <button
          onClick={() => scroll('right')}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'border-white/20 text-white/60 hover:bg-white/5' : 'border-white/5 text-white/15 cursor-default'}`}
          disabled={!canScrollRight}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════ PAGE ══════════════════════ */
export default function NasilCalisirPage() {
  const hero = useInView(0.05);
  const steps = useInView(0.1);
  const brands = useInView(0.1);
  const pricing = useInView(0.1);
  const faq = useInView(0.1);

  return (
    <div>

      {/* ═══ HERO - Full video background ═══ */}
      <section ref={hero.ref} className="relative overflow-hidden">
        {/* Video backgrounds */}
        <video autoPlay muted loop playsInline className="w-full h-auto hidden md:block">
          <source src="/nasil-calisir-desktop.webm" type="video/webm" />
        </video>
        <video autoPlay muted loop playsInline className="w-full h-auto md:hidden">
          <source src="/nasil-calisir-mobile.webm" type="video/webm" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content overlay - text at top + slider below */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between">
          {/* Top: Hero text */}
          <div className="container mx-auto px-4 pt-12 md:pt-16">
            <div className="max-w-2xl">
              <p className={`text-[#d6f894]/60 text-xs tracking-[0.2em] uppercase mb-4 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}>
                Superscore Nasıl Çalışır?
              </p>
              <h1 className={`text-2xl md:text-[38px] lg:text-[46px] text-white leading-[1.1] mb-4 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms', fontWeight: 450 }}>
                Tüketici ile marka arasındaki güven köprüsü
              </h1>
              <p className={`text-white/40 text-sm md:text-[15px] leading-relaxed mb-6 max-w-lg transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                Şikayetinizi yazın, marka çözsün. Her çözüm Superscore puanına yansır. Yapay zeka doğrular, siz onaylarsınız.
              </p>
              <div className={`flex flex-wrap items-center gap-3 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                <Link href="/sikayet-yaz">
                  <button className="px-6 py-3 text-sm font-semibold rounded-full hover:opacity-90 transition-colors inline-flex items-center gap-2" style={{ background: '#d6f894', color: '#1b1a1b' }}>
                    Şikayet Yaz <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/karsilastir">
                  <button className="px-6 py-3 text-sm rounded-full border transition-colors" style={{ color: '#d6f894', borderColor: 'rgba(214, 248, 148, 0.25)' }}>
                    Karşılaştır
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom: Feature slider inside same block */}
          <div className="container mx-auto px-4 pb-10 md:pb-14">
            <FeatureSlider />
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS - 3 columns with images ═══ */}
      <section className="relative bg-[#f5f3eb]">
        {/* Top curved border overlay */}
        <div className="absolute top-0 left-0 right-0 h-[60px] md:h-[80px] overflow-hidden" style={{ marginTop: '-1px' }}>
          <div className="w-full h-full bg-[#0a0f08]" style={{ borderRadius: '0 0 40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <p className="text-[#1b1a1b]/40 text-xs tracking-[0.2em] uppercase mb-3 font-semibold">Çözümler</p>
            <h2 className="text-2xl md:text-[36px] lg:text-[42px] text-[#1b1a1b] leading-[1.1] mb-4" style={{ fontWeight: 450 }}>
              Tüm çözüm ve değerlendirme yöntemleri için tek platform
            </h2>
            <p className="text-[#1b1a1b]/45 text-sm md:text-[15px] leading-relaxed">
              Tüketici hakları, online alışveriş güveni ve fiziki mağaza deneyimi için tasarlanmış kapsamlı çözümlerle şikayetlerinizi çözüme kavuşturun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                img: '/solution-tuketici.jpg',
                title: 'Tüketiciler',
                desc: 'Satın aldığınız ürün veya hizmetten memnun kalmadığınızda şikayetinizi yazın. Superscore, markayla aranızda köprü kurarak sorununuzun gerçekten çözülmesini sağlar. AI doğrulaması ile çözüm güvence altındadır.',
                link: '/sikayet-yaz',
                linkText: 'Şikayet yazın',
              },
              {
                img: '/solution-online.jpg',
                title: 'Online Alışveriş Siteleri',
                desc: 'E-ticaret sitelerinden yapılan alışverişlerde yaşanan kargo, iade ve ürün sorunlarını Superscore üzerinden çözüme kavuşturun. Sipariş doğrulama entegrasyonu ile süreç hızlanır, marka hızlıca aksiyon alır.',
                link: '/sikayet-yaz',
                linkText: 'Hemen başlayın',
              },
              {
                img: '/solution-fiziki.jpg',
                title: 'Fiziki Mağazalar',
                desc: 'Mağazadan aldığınız ürün veya aldığınız hizmette yaşadığınız sorunları iletin. Markalar Superscore puanını yükseltmek için fiziki mağaza şikayetlerini de hızla çözer, hediye ve kupon sunabilir.',
                link: '/sikayet-yaz',
                linkText: 'Değerlendirme yazın',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#f5f3eb] rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#e5e2d8]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="pt-6 pb-2">
                  <h3 className="text-[#1b1a1b] text-xl md:text-2xl mb-3" style={{ fontWeight: 500 }}>
                    {item.title}
                  </h3>
                  <p className="text-[#1b1a1b]/50 text-sm leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <Link href={item.link} className="text-[#1b1a1b] text-sm underline underline-offset-4 decoration-1 hover:text-[#52b37f] transition-colors">
                    {item.linkText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS STEPS ═══ */}
      <section ref={steps.ref} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-14 transition-all duration-700${steps.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#52b37f]/50 text-xs tracking-[0.2em] uppercase mb-3">Adım Adım</p>
            <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight" style={{ fontWeight: 450 }}>
              Şikayetiniz nasıl çözülür?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-0">
            {[
              {
                num: '01',
                title: 'Şikayetinizi yazın',
                desc: 'Ücretsiz hesap oluşturun, markayı seçin ve yaşadığınız sorunu detaylı olarak anlatin. Varsa sipariş bilginizi ve belgelerinizi ekleyin.',
              },
              {
                num: '02',
                title: 'Marka şikayetinizi alır ve çözüm üretir',
                desc: 'Marka şikayetinizi panelinden görür ve aksiyon alır. Superscore puanını yükseltmek için hızlı çözüm sağlamaya motive olur. Size hediye veya kupon da sunabilir.',
              },
              {
                num: '03',
                title: 'Superscore doğrular',
                desc: 'AI teknolojimiz markanın cevabını ve yüklediği belgeleri analiz eder. Çözüm yeterli görülürse sizden onay alınır ve şikayet kapatılır.',
              },
              {
                num: '04',
                title: 'Memnuniyetinizi paylaşın',
                desc: 'Çözüm sonrası markayı puanlayın. Markanın Superscore puanı güncellenir ve profil sayfasında yayınlanır. Diğer tüketiciler için rehber olur.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`flex gap-6 md:gap-10 py-8 md:py-10 transition-all duration-700${steps.v ? ' opacity-100 translate-x-0' : ' opacity-0 -translate-x-6'}`}
                style={{
                  transitionDelay: `${200 + i * 150}ms`,
                  borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <div className="flex-shrink-0">
                  <span className="font-superscore-bold text-[32px] md:text-[42px] leading-none" style={{ color: 'rgba(82, 179, 127, 0.2)' }}>
                    {step.num}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-[#1b1a1b] text-base md:text-lg mb-2" style={{ fontWeight: 500 }}>{step.title}</h3>
                  <p className="text-[#1b1a1b]/45 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANDS TRUST BANNER ═══ */}
      <section ref={brands.ref} className="py-16 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-10 transition-all duration-700${brands.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#1b1a1b]/30 text-xs tracking-[0.2em] uppercase mb-3">Güven Ekosistemi</p>
            <h2 className="text-xl md:text-2xl text-[#1b1a1b] leading-tight" style={{ fontWeight: 450 }}>
              Markalar neden Superscore&apos;u tercih ediyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                title: 'Müşteri güveni artar',
                desc: 'Superscore puanı yüksek markalar, müşterilerinin güvenini kazanır ve satışlarını artırır.',
              },
              {
                title: 'Şeffaf ve adil sistem',
                desc: 'Her iki taraf için hakkaniyetli süreç. Çözülen şikayetler puanı yükseltir, markalar motive olur.',
              },
              {
                title: 'Uygun fiyatlı planlar',
                desc: 'Trafiğe göre fahiş fiyatlar yerine, sabit ve şeffaf fiyatlandırma. 30 gün ücretsiz deneme.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-7 border border-gray-100 transition-all duration-700${brands.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <h3 className="text-[#1b1a1b] text-sm font-medium mb-2">{item.title}</h3>
                <p className="text-[#1b1a1b]/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section ref={pricing.ref} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-14 transition-all duration-700${pricing.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#52b37f]/50 text-xs tracking-[0.2em] uppercase mb-3">Marka Planları</p>
            <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight" style={{ fontWeight: 450 }}>
              Abonelik planları
            </h2>
            <p className="text-[#1b1a1b]/35 text-sm mt-3">İlk 30 gün ücretsiz. Kredi kartı gerekmez.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '499',
                popular: false,
                features: [
                  'Aylık 50 şikayete yanıt',
                  'Temel istatistikler',
                  'E-posta bildirimleri',
                  '1 ekip üyesi',
                  'Superscore widget',
                ],
              },
              {
                name: 'Pro',
                price: '999',
                popular: true,
                features: [
                  'Sınırsız şikayete yanıt',
                  'Gelişmiş istatistikler',
                  'AI belge analizi',
                  '5 ekip üyesi',
                  'Özelleştirilebilir widget',
                  'Öncelikli destek',
                ],
              },
              {
                name: 'Enterprise',
                price: 'Özel',
                popular: false,
                features: [
                  'Sınırsız her şey',
                  'Özel entegrasyonlar',
                  'Dedicated hesap yöneticisi',
                  'Sınırsız ekip üyesi',
                  'API erişimi',
                  'SLA garantisi',
                ],
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-7 md:p-8 transition-all duration-700${pricing.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${200 + i * 120}ms`,
                  border: plan.popular ? '2px solid #52b37f' : '1px solid rgba(0,0,0,0.06)',
                  background: plan.popular ? 'linear-gradient(180deg, #fafdf7 0%, #fff 100%)' : '#fff',
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#52b37f] text-white text-[10px] font-semibold px-4 py-1 rounded-full tracking-wide">
                    Popüler
                  </div>
                )}
                <h3 className="text-[#1b1a1b] text-lg mb-4" style={{ fontWeight: 500 }}>{plan.name}</h3>
                <div className="mb-6">
                  {plan.price === 'Özel' ? (
                    <span className="text-[#1b1a1b] text-2xl" style={{ fontWeight: 500 }}>İletişime Geçin</span>
                  ) : (
                    <>
                      <span className="font-superscore-bold text-3xl text-[#1b1a1b]">{plan.price}₺</span>
                      <span className="text-[#1b1a1b]/30 text-sm ml-1">/ay</span>
                    </>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#1b1a1b]/60">
                      <CheckCircle className="w-4 h-4 text-[#52b37f] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.price === 'Özel' ? '/iletisim' : '/kayit?type=brand'}>
                  <button
                    className="w-full py-3 text-sm font-medium rounded-full transition-colors"
                    style={{
                      background: plan.popular ? '#52b37f' : 'transparent',
                      color: plan.popular ? '#fff' : '#1b1a1b',
                      border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    {plan.price === 'Özel' ? 'İletişime Geçin' : 'Ücretsiz Başla'}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section ref={faq.ref} className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className={`text-center mb-14 transition-all duration-700${faq.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#1b1a1b]/30 text-xs tracking-[0.2em] uppercase mb-3">SSS</p>
            <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight" style={{ fontWeight: 450 }}>
              Sık sorulan sorular
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: 'Superscore nedir?', a: 'Superscore, markaların güvenilirliğini ölçen ve müşteri şikayetlerini çözüme kavuşturan bir platformdur. Şikayet çözüm oranı, yanıt süresi ve müşteri puanlarına göre 0-100 arası dinamik bir güven skoru hesaplar.' },
              { q: 'Şikayet yazmak ücretsiz mi?', a: 'Evet, tüketiciler için platform tamamen ücretsizdir. Hesap oluşturup istediğiniz kadar şikayet yazabilir ve markaları değerlendirebilirsiniz.' },
              { q: 'Şikayet nasıl çözüldü sayılır?', a: 'Marka yanıt verip çözüm belgelerini yükler, yapay zeka belgeleri analiz eder ve müşteri onayı ile şikayet çözüldü olarak işaretlenir.' },
              { q: 'Markalar nasıl katılır?', a: 'Markalar 30 gün ücretsiz deneme ile başlar. Bu sürede şikayetlere yanıt verebilir, çözüm belgesi yükleyebilir ve istatistiklerini görebilir.' },
              { q: 'Widget nedir?', a: 'Superscore widget, markaların kendi web sitelerine ekleyebileceği bir güven rozeti. Sitenize giren kullanıcılar markanızın güven puanını doğrudan görür.' },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} delay={i * 80} visible={faq.v} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#0a0f08' }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(214,248,148,0.04),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: '#d6f894' }}>
              <Image src="/logo/star_icon.png" alt="" width={32} height={32} className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-4xl text-white mb-4 leading-tight" style={{ fontWeight: 450 }}>
              Şikayetlerinizi çözüme kavuşturun
            </h2>
            <p className="text-white/30 text-sm mb-10 max-w-md mx-auto">
              Superscore ile şikayetiniz sadece yayınlanmaz, gerçekten çözülür. Hemen başlayın.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/sikayet-yaz">
                <button className="px-7 py-3.5 text-sm font-semibold rounded-full hover:opacity-90 transition-colors inline-flex items-center gap-2" style={{ background: '#d6f894', color: '#1b1a1b' }}>
                  Şikayet Yaz <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/karsilastir">
                <button className="px-7 py-3.5 text-sm rounded-full border transition-colors" style={{ color: '#d6f894', borderColor: 'rgba(214, 248, 148, 0.2)' }}>
                  Karşılaştır
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer, delay, visible }: { question: string; answer: string; delay: number; visible: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-700${visible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${200 + delay}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <span className="text-[#1b1a1b] text-sm md:text-[15px]" style={{ fontWeight: 450 }}>{question}</span>
        <div className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-300${open ? ' rotate-45' : ''}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="#1b1a1b" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300${open ? ' max-h-48' : ' max-h-0'}`}>
        <p className="px-5 md:px-6 pb-5 md:pb-6 text-[#1b1a1b]/45 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
