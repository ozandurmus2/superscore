'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, X } from 'lucide-react';

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
function Counter({ end, suffix = '', duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
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

  return <span ref={ref}>{val.toLocaleString('tr-TR')}{suffix}</span>;
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

    const duration = 6000;
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
        ctx.fillStyle = `rgba(132, 162, 95, ${alpha})`;
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
    { icon: '★', label: 'Şikayet' },
    { icon: '◈', label: 'Çözüm' },
    { icon: '⟁', label: 'Puan' },
    { icon: '⬡', label: 'Güven' },
    { icon: '◉', label: 'Doğrulama' },
    { icon: '△', label: 'Takip' },
    { icon: '□', label: 'Kupon' },
    { icon: '◇', label: 'Hediye' },
    { icon: '○', label: 'İnceleme' },
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
  const compare = useInView(0.1);
  const chart = useInView(0.1);
  const grid = useInView(0.1);
  const partners = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <div>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section ref={hero.ref} className="relative overflow-hidden" style={{ background: '#0f1e26' }}>
        {/* Soft green glow from right */}
        <div className="absolute top-0 right-0 w-[60%] h-full" style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(28, 67, 44, 0.6) 0%, transparent 70%)',
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center min-h-[540px] md:min-h-[620px] py-16 md:py-0 gap-10 md:gap-16">
            {/* Left text */}
            <div className="flex-1 max-w-xl">
              <p className={`text-[#7ce9a5]/60 text-xs tracking-[0.2em] uppercase mb-5 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}>
                Superscore Karşılaştırma
              </p>
              <h1 className={`text-3xl md:text-[42px] lg:text-[50px] text-white leading-[1.12] mb-5 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms', fontWeight: 450 }}>
                Ticaret eklentilerde değil, <span className="text-[#7ce9a5]">platformlarda</span> gerçekleşir
              </h1>
              <p className={`text-white/40 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                Şikayetinizi yazın, markanız çözsün. Superscore ile tüketici ve marka arasındaki güven köprüsünü keşfedin.
              </p>
              <div className={`flex flex-wrap items-center gap-3 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                <Link href="/sikayet-yaz">
                  <button className="px-6 py-3 bg-[#7ce9a5] text-[#0f1e26] text-sm font-semibold rounded-full hover:bg-[#7ce9a5]/90 transition-colors inline-flex items-center gap-2">
                    Şikayet Yaz <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 text-[#7ce9a5]/70 text-sm rounded-full border border-[#7ce9a5]/20 hover:bg-[#7ce9a5]/5 transition-colors">
                    Nasıl Çalışır?
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Graph image */}
            <div className={`flex-1 flex justify-center md:justify-end transition-all duration-1000${hero.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="relative w-full max-w-[440px]">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(124,233,165,0.06),transparent_70%)]" />
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
                title: 'Yorum Yazın',
                desc: 'Şikayetinizi veya değerlendirmenizi yazın. Çözüm için talebinizi net bir şekilde iletin.',
              },
              {
                num: '2',
                title: 'Marka Yanıtlar',
                desc: 'Marka şikayetinizi görür, aksiyon alır. Çözüm süreci hem profilinde yayınlanır hem Superscore puanına yansır.',
              },
              {
                num: '3',
                title: 'Superscore Doğrular',
                desc: 'AI teknolojimiz markanın cevabını ve belgelerini analiz eder. Çözüm onayınızla şikayet kapatılır, siz de değerlendirirsiniz.',
              },
              {
                num: '4',
                title: 'Şikayet Memnuniyete Dönüşür',
                desc: 'Çözüm sonrası markanın Superscore puanı yükselir. Marka size hediye, kupon veya özel teklifler sunabilir.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-7 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-700${steps.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {/* Circle number like the reference image */}
                <div className="mb-5 flex items-center justify-start">
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #b8f5d2 0%, #d4fae5 50%, #e8fdf0 100%)' }}>
                      {/* Inner circle */}
                      <div className="w-[56px] h-[56px] md:w-[62px] md:h-[62px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #7ce9a5 0%, #5dd98d 100%)' }}>
                        <span className="font-superscore-bold text-[24px] md:text-[28px] text-[#0f1e26]">{step.num}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-[#1b1a1b] text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-[#1b1a1b]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION: PLATFORM COMPARISON (B2C) ═══ */}
      <section ref={compare.ref} className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-14 transition-all duration-700${compare.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#52b37f]/60 text-xs tracking-[0.2em] uppercase mb-3">Neden Superscore?</p>
            <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight" style={{ fontWeight: 450 }}>
              Şikayetinizi nereye yazmalısınız?
            </h2>
            <p className="text-[#1b1a1b]/40 text-sm mt-3 max-w-lg mx-auto">
              Diğer platformlarda şikayetiniz sadece yayınlanır. Superscore&apos;da gerçekten çözülür.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diğerleri */}
            <div className={`bg-white rounded-3xl p-8 md:p-10 border border-gray-100 transition-all duration-700${compare.v ? ' opacity-100 translate-x-0' : ' opacity-0 -translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-[#1b1a1b] text-lg mb-5" style={{ fontWeight: 500 }}>Diğer platformlar</h3>
              <ul className="space-y-4">
                {[
                  'Şikayetiniz çözülse bile profilde kalır',
                  'Markanın çözüm motivasyonu düşük',
                  'Çözüm takibi ve doğrulama yok',
                  'Sadece şikayet yayınlanır, aksiyon alınmaz',
                  'Hediye veya kupon sistemi yok',
                  'Şikayetinizin sonucu belirsiz kalır',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#1b1a1b]/50 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-300" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Superscore */}
            <div className={`bg-[#0f1e26] rounded-3xl p-8 md:p-10 transition-all duration-700${compare.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-10 h-10 rounded-xl bg-[#52b37f] flex items-center justify-center mb-6">
                <Image src="/logo/star_icon.png" alt="" width={20} height={20} className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <h3 className="text-white text-lg mb-5" style={{ fontWeight: 500 }}>Superscore</h3>
              <ul className="space-y-4">
                {[
                  'Çözülen şikayet onayınızla kapatılır',
                  'Marka Superscore puanı için çözüm sağlar',
                  'AI teknolojisi ile çözüm doğrulanır',
                  'Şikayet süreciniz baştan sona takip edilir',
                  'Markadan hediye ve kupon alabilirsiniz',
                  'Çözüm markanın profiline yansır',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/55 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#52b37f]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#52b37f]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA under comparison */}
          <div className={`text-center mt-10 transition-all duration-700${compare.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '500ms' }}>
            <Link href="/sikayet-yaz">
              <button className="px-7 py-3.5 bg-[#52b37f] text-white text-sm font-semibold rounded-full hover:bg-[#47a06f] transition-colors inline-flex items-center gap-2">
                Şikayetini Yaz <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
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
              { value: 50, suffix: '%', label: 'Daha hızlı çözüm', desc: 'Otomatik süreç yönetimi ile şikayetler diğer platformlara kıyasla çok daha hızlı çözülür' },
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

      {/* ═══ SECTION 4: GRID BOXES - B2C focused ═══ */}
      <section ref={grid.ref} className="py-20 md:py-28" style={{ background: '#fdfef2' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left - Cycling grid */}
            <div className={`flex-1 max-w-[320px] w-full transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <CyclingGrid />
            </div>

            {/* Right - Text (B2C focused) */}
            <div className="flex-1">
              <div className={`transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
                <p className="text-[#526240]/50 text-xs tracking-[0.2em] uppercase mb-4">Sizin İçin</p>
                <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight mb-5" style={{ fontWeight: 450 }}>
                  Şikayetiniz gerçekten çözülsün
                </h2>
                <p className="text-[#1b1a1b]/45 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
                  Superscore, şikayetinizi sadece yayınlamaz. Markayla aranızda köprü kurarak çözüm sürecini başlatır, AI ile doğrular ve sonucu size bildirir.
                </p>
              </div>

              <div className={`space-y-4 transition-all duration-700${grid.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                {[
                  { title: 'Gerçek Çözüm Garantisi', desc: 'Şikayetiniz çözülmeden kapanmaz. AI doğrulaması ve sizin onayınız gerekir.' },
                  { title: 'Hediye ve Kupon Fırsatları', desc: 'Markalar çözüm sürecinde size özel indirimler ve hediyeler sunabilir.' },
                  { title: 'Şeffaf Süreç Takibi', desc: 'Şikayetinizin hangi aşamada olduğunu her an görebilirsiniz.' },
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
                <Link href="/sikayet-yaz">
                  <button className="px-6 py-3 text-sm font-medium rounded-full transition-colors" style={{ background: '#526240', color: '#f2fbd1' }}>
                    Şikayet Yaz
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: PARTNERS & WHY FAST ═══ */}
      <section ref={partners.ref} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left - Why we solve fast */}
            <div className="flex-1">
              <div className={`transition-all duration-700${partners.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
                <p className="text-[#1b1a1b]/30 text-xs tracking-[0.2em] uppercase mb-4">Şikayetinizi Neden Hızlı Çözüyoruz?</p>
                <h2 className="text-2xl md:text-[34px] text-[#1b1a1b] leading-tight mb-5" style={{ fontWeight: 450 }}>
                  Çözüm odaklı <span className="text-[#52b37f]">ekosistem</span>
                </h2>
                <p className="text-[#1b1a1b]/45 text-sm md:text-[15px] leading-relaxed mb-10 max-w-md">
                  Markalar, ajanslar ve e-ticaret altyapıları ile entegre çalışıyoruz. Bu sayede şikayetiniz doğru kişiye ulaşır ve hızlıca çözülür.
                </p>
              </div>

              {/* Explanation cards */}
              <div className="space-y-4">
                {[
                  {
                    title: 'Markalar aktif olarak platforma katılıyor',
                    desc: 'Superscore puanını yükseltmek için şikayetleri hızla çözerler.',
                  },
                  {
                    title: 'AI teknolojisi süreci hızlandırıyor',
                    desc: 'Yapay zeka belge analizi ve çözüm doğrulaması ile bekleme süresini minimuma indirir.',
                  },
                  {
                    title: 'Entegre sipariş doğrulama',
                    desc: 'E-ticaret altyapılarıyla entegrasyon sayesinde sipariş bilginiz otomatik doğrulanır.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-700${partners.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: `${200 + i * 120}ms` }}
                  >
                    <p className="text-[#1b1a1b] text-sm font-medium mb-1">{item.title}</p>
                    <p className="text-[#1b1a1b]/40 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - İş Ortaklarımız */}
            <div className={`flex-1 transition-all duration-1000${partners.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="bg-[#fafdf7] rounded-3xl p-8 md:p-12 border border-gray-100">
                <h3 className="text-[#1b1a1b] text-lg mb-6" style={{ fontWeight: 500 }}>İş Ortaklarımız</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#1b1a1b]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">Markalar</span>
                    </div>
                    <p className="text-[#1b1a1b]/45 text-xs leading-relaxed pl-4">
                      Şikayetinizi doğrudan ilgili markaya iletiyoruz. Marka, Superscore puanını yükseltmek için çözüm üretmeye motive olur.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#1b1a1b]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">Ajanslar</span>
                    </div>
                    <p className="text-[#1b1a1b]/45 text-xs leading-relaxed pl-4">
                      Dijital ajanslar markaların itibar yönetimini Superscore üzerinden yürütür. Bu sayede şikayetleriniz daha hızlı ele alınır.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#1b1a1b]" />
                      <span className="text-[#1b1a1b] text-sm font-medium">E-Ticaret Altyapıları</span>
                    </div>
                    <p className="text-[#1b1a1b]/45 text-xs leading-relaxed pl-4">
                      Shopify, WooCommerce, Ticimax gibi altyapılarla entegre çalışarak sipariş doğrulaması yapar, çözüm sürecini hızlandırırız.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link href="/nasil-calisir">
                    <button className="px-5 py-2.5 text-sm rounded-full border border-[#1b1a1b]/15 text-[#1b1a1b] hover:bg-gray-50 transition-colors">
                      Detaylı Bilgi
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA - Enterprise style ═══ */}
      <section ref={cta.ref} className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#0f1e26' }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(124,233,165,0.05),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <p className={`text-[#7ce9a5]/40 text-xs tracking-[0.2em] uppercase mb-5 transition-all duration-700${cta.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}>
              Superscore
            </p>
            <h2 className={`text-2xl md:text-4xl lg:text-[46px] text-white leading-tight mb-5 transition-all duration-700${cta.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ fontWeight: 450, transitionDelay: '100ms' }}>
              Kurumsal işletmelere güç sağlıyor
            </h2>
            <p className={`text-white/35 text-sm md:text-[15px] mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-700${cta.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
              Superscore&apos;u teknoloji setinize nasıl entegre edebileceğinizi öğrenmek için ekibimizle görüşün. Müşteri güvenini birlikte inşa edelim.
            </p>
            <div className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-700${cta.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
              <Link href="/sikayet-yaz">
                <button className="px-7 py-3.5 text-[#0f1e26] text-sm font-semibold rounded-full hover:opacity-90 transition-colors inline-flex items-center gap-2" style={{ background: '#7ce9a5' }}>
                  Ücretsiz Başla <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/nasil-calisir">
                <button className="px-7 py-3.5 text-sm rounded-full border transition-colors" style={{ color: '#7ce9a5', borderColor: 'rgba(124, 233, 165, 0.25)' }}>
                  İletişime Geçin
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
