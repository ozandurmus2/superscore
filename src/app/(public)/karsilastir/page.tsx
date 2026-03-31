'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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

/* ── Animated counter ── */
function Counter({ end, suffix = '', prefix = '', duration = 2200 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setVal(Math.floor(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString('tr-TR')}{suffix}</span>;
}

/* ── Thin bar chart (canvas) ── */
function ThinBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        animate();
      }
    }, { threshold: 0.2 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const barCount = 80;
    const barW = 1.5;
    const gap = (w - barCount * barW) / (barCount - 1);
    const heights: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const norm = i / barCount;
      const wave = Math.sin(norm * Math.PI * 3) * 0.25 + 0.45;
      const growth = norm * 0.45;
      heights.push((wave + growth) * h * 0.8);
    }

    const duration = 6000; // slower
    const startTime = performance.now();

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 5);

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const barProgress = Math.max(0, Math.min(1, (eased * barCount - i) / 4));
        const bh = heights[i] * barProgress;
        const x = i * (barW + gap);
        const alpha = 0.3 + barProgress * 0.7;
        ctx.fillStyle = `rgba(132, 162, 95, ${alpha})`; // #84a25f
        ctx.beginPath();
        ctx.roundRect(x, h - bh, barW, bh, 1);
        ctx.fill();
      }

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

/* ── Cycling grid boxes ── */
function CyclingGrid() {
  const [activeSet, setActiveSet] = useState(0);
  const totalSets = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSet(prev => (prev + 1) % totalSets);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const gridItems = [
    { icon: '★', label: 'Widget' },
    { icon: '◈', label: 'API' },
    { icon: '⟁', label: 'Analitik' },
    { icon: '⬡', label: 'Raporlama' },
    { icon: '◉', label: 'Entegrasyon' },
    { icon: '△', label: 'Dashboard' },
    { icon: '□', label: 'Puanlama' },
    { icon: '◇', label: 'İnceleme' },
    { icon: '○', label: 'Moderasyon' },
  ];

  const sets = [
    [0, 3, 7],
    [1, 4, 6],
    [2, 5, 8],
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {gridItems.map((item, i) => {
        const isActive = sets[activeSet].includes(i);
        return (
          <div
            key={i}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-[1200ms] ease-in-out border"
            style={{
              background: isActive
                ? 'linear-gradient(145deg, #526240 0%, #3d4a30 100%)'
                : '#f5f6ee',
              borderColor: isActive ? 'rgba(82, 98, 64, 0.3)' : 'rgba(0,0,0,0.04)',
            }}
          >
            <span
              className="text-lg transition-colors duration-[1200ms]"
              style={{ color: isActive ? '#c8d8a8' : '#8a8a7a' }}
            >
              {item.icon}
            </span>
            <span
              className="text-[10px] font-medium tracking-wide transition-colors duration-[1200ms]"
              style={{ color: isActive ? '#e8f0d8' : '#6a6a5a' }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════ PAGE ══════════════════════ */
export default function KarsilastirPage() {
  const hero = useInView(0.1);
  const steps = useInView(0.1);
  const chart = useInView(0.1);
  const grid = useInView(0.1);
  const partners = useInView(0.1);

  return (
    <div>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section ref={hero.ref} className="relative overflow-hidden" style={{ background: '#0f1e26' }}>
        {/* Video background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="/compare-bg.mp4" type="video/mp4" />
        </video>

        {/* Soft green glow from right */}
        <div className="absolute top-0 right-0 w-[60%] h-full" style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(28, 67, 44, 0.6) 0%, transparent 70%)',
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center min-h-[580px] md:min-h-[640px] py-16 md:py-0 gap-10 md:gap-16">
            {/* Left text */}
            <div className="flex-1 max-w-xl">
              <p className={`text-[#04da8d]/70 text-xs tracking-[0.2em] uppercase mb-5 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}>
                Neden Superscore?
              </p>
              <h1 className={`text-3xl md:text-[42px] lg:text-[48px] text-white leading-[1.15] mb-5 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms', fontWeight: 450 }}>
                Türkiye&apos;nin en <span className="text-[#04da8d]">adil</span> değerlendirme platformu
              </h1>
              <p className={`text-white/45 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                Diğer platformlar sadece şikayeti yayınlar. Biz tüketici ile marka arasında köprü kurar, şikayetlerin gerçekten çözülmesini sağlarız.
              </p>
              <div className={`flex flex-wrap items-center gap-3 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                <Link href="/register">
                  <button className="px-6 py-3 bg-[#04da8d] text-[#0f1e26] text-sm font-semibold rounded-full hover:bg-[#04da8d]/90 transition-colors inline-flex items-center gap-2">
                    Hemen Başla <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 text-white/70 text-sm rounded-full border border-white/15 hover:bg-white/5 transition-colors">
                    Nasıl Çalışır?
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Graph image */}
            <div className={`flex-1 flex justify-center md:justify-end transition-all duration-1000${hero.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="relative w-full max-w-[440px]">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(4,218,141,0.08),transparent_70%)]" />
                <Image
                  src="/graph.png"
                  alt="Superscore Analitik"
                  width={440}
                  height={360}
                  className="relative z-10 w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: STEPS (split bg) ═══ */}
      <section ref={steps.ref} className="relative overflow-hidden">
        {/* Split background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2" style={{ background: '#10191f' }} />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
          {/* Section header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700${steps.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#04da8d]/60 text-xs tracking-[0.2em] uppercase mb-3">Nasıl Çalışır?</p>
            <h2 className="text-2xl md:text-[34px] text-white leading-tight" style={{ fontWeight: 450 }}>
              Dört adımda <span className="text-[#04da8d]">çözüm</span> süreci
            </h2>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: '1',
                title: 'Şikayet Yaz',
                desc: 'Yaşadığın sorunu markaya ilet. Sipariş bilgilerini ekle, detaylandır.',
              },
              {
                num: '2',
                title: 'Marka Yanıtlar',
                desc: 'Marka şikayetini görür ve çözüm sürecini başlatır. Hediye veya kupon sunabilir.',
              },
              {
                num: '3',
                title: 'AI Doğrulama',
                desc: 'Yapay zeka çözüm belgelerini inceler, admin ekibi onaylar. Şeffaf süreç.',
              },
              {
                num: '4',
                title: 'Puan Güncellenir',
                desc: 'Çözülen her şikayet Superscore puanını yükseltir. Dinamik ve gerçek zamanlı.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-7 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-700${steps.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div className="mb-5">
                  <span
                    className="font-superscore-bold text-[56px] md:text-[64px] leading-none"
                    style={{
                      background: 'linear-gradient(180deg, #04da8d 0%, #04da8d33 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="text-[#1b1a1b] text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-[#1b1a1b]/45 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: BAR CHART + STATS ═══ */}
      <section ref={chart.ref} className="relative overflow-hidden py-20 md:py-28" style={{ background: '#181e17' }}>
        {/* Bar chart background */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] opacity-50">
          <ThinBarChart />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`mb-14 transition-all duration-700${chart.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#84a25f]/60 text-xs tracking-[0.2em] uppercase mb-3">Rakamlarla Superscore</p>
            <h2 className="text-2xl md:text-[34px] leading-tight" style={{ color: '#f2fbd1', fontWeight: 450 }}>
              Farkı rakamlarla görün
            </h2>
          </div>

          <div className="max-w-3xl space-y-10 md:space-y-14">
            {[
              { value: 12, suffix: '', label: 'Benzersiz özellik', desc: 'Diğer platformlarda bulunmayan, sadece Superscore\'da olan özellik sayısı' },
              { value: 100, suffix: '%', label: 'Çözüm odaklı sistem', desc: 'Her şikayet AI destekli doğrulama sürecinden geçer ve gerçek çözüm sağlanır' },
              { value: 50, suffix: '%', label: 'Daha düşük maliyet', desc: 'Diğer platformlara kıyasla markalar için ortalama maliyet avantajı' },
            ].map((s, i) => (
              <div
                key={i}
                className={`border-l-2 pl-6 md:pl-8 transition-all duration-700${chart.v ? ' opacity-100 translate-x-0' : ' opacity-0 -translate-x-8'}`}
                style={{
                  borderColor: 'rgba(132, 162, 95, 0.4)',
                  transitionDelay: `${300 + i * 200}ms`,
                }}
              >
                <p className="font-superscore-bold text-4xl md:text-6xl lg:text-7xl leading-none mb-1" style={{ color: '#f2fbd1' }}>
                  <Counter end={s.value} suffix={s.suffix} duration={2200 + i * 400} />
                </p>
                <p className="text-sm md:text-base mb-1" style={{ color: 'rgba(242, 251, 209, 0.55)', fontWeight: 450 }}>{s.label}</p>
                <p className="text-xs md:text-sm" style={{ color: 'rgba(242, 251, 209, 0.25)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: GRID BOXES ═══ */}
      <section ref={grid.ref} className="py-20 md:py-28" style={{ background: '#fdfef2' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left - Cycling grid */}
            <div className={`flex-1 max-w-[320px] w-full transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <CyclingGrid />
            </div>

            {/* Right - Text */}
            <div className="flex-1">
              <div className={`transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
                <p className="text-[#526240]/50 text-xs tracking-[0.2em] uppercase mb-4">Modüler Araçlar</p>
                <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight mb-5" style={{ fontWeight: 450 }}>
                  Markanız için güçlü araçlar
                </h2>
                <p className="text-[#1b1a1b]/45 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
                  Widget entegrasyonu, çoklu platform yorum toplama, gerçek zamanlı analitik ve daha fazlası. Superscore, markaların müşteri deneyimini iyileştirmesi için modern araçlar sunar.
                </p>
              </div>

              <div className={`space-y-4 transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                {[
                  { title: 'Widget Entegrasyonu', desc: 'Superscore puanınızı web sitenizde ve tüm dijital kanallarınızda gösterin.' },
                  { title: 'Çoklu Platform Toplama', desc: 'Tüm platformlardan yorumları tek panelde toplayın ve yönetin.' },
                  { title: 'Gerçek Zamanlı Analitik', desc: 'Müşteri memnuniyetini ve marka performansını anlık takip edin.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#526240' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#1b1a1b] text-sm font-medium">{item.title}</p>
                      <p className="text-[#1b1a1b]/40 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-8 transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '450ms' }}>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 text-sm font-medium rounded-full transition-colors" style={{ background: '#526240', color: '#f2fbd1' }}>
                    Detayları İncele
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: PARTNERS ═══ */}
      <section ref={partners.ref} className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left - Content */}
            <div className="flex-1">
              <div className={`transition-all duration-700${partners.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
                <p className="text-[#52b37f]/50 text-xs tracking-[0.2em] uppercase mb-4">Ekosistem</p>
                <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight mb-5" style={{ fontWeight: 450 }}>
                  İş ortaklarımızla <span className="text-[#52b37f]">büyüyoruz</span>
                </h2>
                <p className="text-[#1b1a1b]/45 text-sm md:text-[15px] leading-relaxed mb-10 max-w-md">
                  Superscore, markalar, ajanslar ve e-ticaret altyapıları ile entegre çalışır. Güven ekosistemini birlikte inşa ediyoruz.
                </p>
              </div>

              {/* Partner type cards */}
              <div className="space-y-4">
                {[
                  {
                    title: 'Markalar',
                    desc: 'Müşteri güvenini artırın, Superscore puanınızla öne çıkın.',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M7 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Ajanslar',
                    desc: 'Müşterilerinizin online itibarını tek platformdan yönetin.',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    ),
                  },
                  {
                    title: 'E-Ticaret Altyapıları',
                    desc: 'Shopify, WooCommerce ve diğer platformlarla kolay entegrasyon.',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M3 8h14M8 8v9" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    ),
                  },
                ].map((partner, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-700${partners.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: `${200 + i * 120}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#52b37f]/8 flex items-center justify-center text-[#52b37f] flex-shrink-0">
                      {partner.icon}
                    </div>
                    <div>
                      <p className="text-[#1b1a1b] text-sm font-medium mb-0.5">{partner.title}</p>
                      <p className="text-[#1b1a1b]/40 text-xs leading-relaxed">{partner.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - İş Ortaklarımız text block */}
            <div className={`flex-1 transition-all duration-1000${partners.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="bg-[#fafdf7] rounded-3xl p-8 md:p-12 border border-gray-100">
                <h3 className="text-[#1b1a1b] text-lg mb-6" style={{ fontWeight: 450 }}>İş Ortaklarımız</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#52b37f]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">Markalar</span>
                    </div>
                    <p className="text-[#1b1a1b]/35 text-xs leading-relaxed pl-4">
                      B2C ve B2B markalar Superscore üzerinden müşteri güvenini inşa eder. Dinamik puan sistemi ile gerçek performanslarını sergiler.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#3c57bc]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">Ajanslar</span>
                    </div>
                    <p className="text-[#1b1a1b]/35 text-xs leading-relaxed pl-4">
                      Dijital ajanslar müşterilerinin online itibarını Superscore paneli üzerinden yönetir. Çoklu marka desteği ile verimli çalışır.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#ef8d3f]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">E-Ticaret Altyapıları</span>
                    </div>
                    <p className="text-[#1b1a1b]/35 text-xs leading-relaxed pl-4">
                      Shopify, WooCommerce, Ticimax ve diğer altyapılarla entegre çalışır. Sipariş bilgisi doğrulama ile şikayet sürecini hızlandırır.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-[#1b1a1b]/25 text-xs mb-4">Entegrasyon süreci dakikalar içinde tamamlanır.</p>
                  <Link href="/is-ortakligi">
                    <button className="px-5 py-2.5 text-sm rounded-full border border-gray-200 text-[#1b1a1b] hover:bg-gray-50 transition-colors">
                      İş Ortağı Olun
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#0f1e26' }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(4,218,141,0.06),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#04da8d] flex items-center justify-center mx-auto mb-8">
              <Image src="/logo/star_icon.png" alt="" width={32} height={32} className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <h2 className="text-2xl md:text-4xl text-white mb-4 leading-tight" style={{ fontWeight: 450 }}>
              Farkı deneyimleyin
            </h2>
            <p className="text-white/35 text-sm mb-10 max-w-md mx-auto">
              Şikayetlerin gerçekten çözüldüğü, markaların güvendiği, tüketicilerin tercih ettiği platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/register">
                <button className="px-7 py-3.5 bg-[#04da8d] text-[#0f1e26] text-sm font-semibold rounded-full hover:bg-[#04da8d]/90 transition-colors inline-flex items-center gap-2">
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/nasil-calisir">
                <button className="px-7 py-3.5 text-white/50 text-sm rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                  Daha Fazla
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
