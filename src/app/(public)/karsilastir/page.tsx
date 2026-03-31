'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, X, Shield, Zap, Gift, BarChart3, Eye, Bot } from 'lucide-react';

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
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
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

/* ── Animated bar chart (Shopify style) ── */
function BarChart() {
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

    const barCount = 60;
    const barW = 2;
    const gap = (w - barCount * barW) / (barCount - 1);
    const heights: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const norm = i / barCount;
      const wave = Math.sin(norm * Math.PI * 2.5) * 0.3 + 0.5;
      const growth = norm * 0.5;
      heights.push((wave + growth) * h * 0.85);
    }

    const duration = 4000;
    const startTime = performance.now();

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 5);

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const barProgress = Math.max(0, Math.min(1, (eased * barCount - i) / 3));
        const bh = heights[i] * barProgress;
        const x = i * (barW + gap);
        ctx.fillStyle = `rgba(82, 179, 127, ${0.4 + barProgress * 0.6})`;
        ctx.fillRect(x, h - bh, barW, bh);
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

/* ══════════════════════ PAGE ══════════════════════ */
export default function KarsilastirPage() {
  const hero = useInView(0.1);
  const advantages = useInView(0.1);
  const stats = useInView(0.1);
  const problem = useInView(0.1);
  const features = useInView(0.1);
  const bigStats = useInView(0.1);

  return (
    <div className="bg-white">

      {/* ═══ HERO - Video background ═══ */}
      <section ref={hero.ref} className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/compare-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className={`text-[#52b37f] text-xs md:text-sm font-semibold uppercase tracking-widest mb-5 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
              Neden Superscore?
            </p>
            <h1 className={`font-superscore-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
              Türkiye&apos;nin en <span className="text-[#52b37f]">adil</span> değerlendirme platformu
            </h1>
            <p className={`text-white/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
              Diğer platformlar sadece şikayeti yayınlar. Biz tüketici ile marka arasında köprü kurar, şikayetlerin gerçekten çözülmesini sağlarız.
            </p>
            <div className={`flex flex-wrap items-center gap-4 transition-all duration-700${hero.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
              <Link href="/register">
                <button className="px-7 py-3.5 bg-[#52b37f] text-white text-sm font-semibold rounded-full hover:bg-[#47a06f] transition-colors inline-flex items-center gap-2">
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/nasil-calisir">
                <button className="px-7 py-3.5 text-white text-sm font-semibold rounded-full border border-white/25 hover:bg-white/10 transition-colors">
                  Nasıl Çalışır?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ADVANTAGES GRID - Shopify style ═══ */}
      <section ref={advantages.ref} className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <p className={`text-[#52b37f] text-xs font-semibold uppercase tracking-widest mb-4 transition-all duration-700${advantages.v ? ' opacity-100' : ' opacity-0'}`}>
            Superscore&apos;un Avantajları
          </p>
          <h2 className={`font-superscore-bold text-2xl md:text-4xl lg:text-5xl text-white mb-5 max-w-2xl leading-tight transition-all duration-700${advantages.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            Şikayetlerin gerçekten çözüldüğü platform
          </h2>
          <p className={`text-white/40 text-sm md:text-base max-w-xl mb-16 leading-relaxed transition-all duration-700${advantages.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            Hem tüketici hem marka için adil bir ekosistem. Markalar şikayetleri çözmek ister çünkü çözüm karşılığında puanları yükselir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'Adil arabuluculuk', desc: 'Sadece tüketici yanlısı değil. Her iki taraf için şeffaf ve hakkaniyetli çözüm süreci.' },
              { icon: <Bot className="w-5 h-5" />, title: 'AI çözüm doğrulama', desc: 'Yapay zeka teknolojimiz markanın çözüm belgelerini otomatik inceler ve admin ekibimiz onaylar.' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Dinamik Superscore', desc: 'Her çözülen şikayet puanı yükseltir, çözülmeyen düşürür. Gerçek performans göstergesi.' },
              { icon: <Gift className="w-5 h-5" />, title: 'Hediye ve kupon sistemi', desc: 'Markalar müşterilerine doğrudan hediye, indirim kuponu ve çözüm teklifleri sunabilir.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Uygun marka planları', desc: 'Trafiğe göre fahiş fiyatlar yerine, adil ve şeffaf fiyatlandırma modeli.' },
              { icon: <Eye className="w-5 h-5" />, title: 'Çoklu platform toplama', desc: 'Tüm platformlardan toplanan yorumları ve değerlendirmeleri tek panelde inceleyin.' },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-[#0a0a0a] p-8 md:p-10 transition-all duration-700${advantages.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#52b37f]/10 border border-[#52b37f]/20 flex items-center justify-center text-[#52b37f] mb-5">
                  {item.icon}
                </div>
                <h3 className="font-superscore-bold text-white text-base md:text-lg mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STAT CARDS - Green gradient (Shopify style) ═══ */}
      <section ref={stats.ref} className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { big: '%100', sub: 'Adil çözüm süreci', desc: 'Her şikayet AI ve admin ekibi tarafından doğrulanır.' },
              { big: '7/24', sub: 'Aktif platform', desc: 'Tüketiciler ve markalar istedikleri zaman erişebilir.' },
              { big: '2x', sub: 'Daha hızlı çözüm', desc: 'Otomatik süreç yönetimi ile çözüm süresi yarıya iner.' },
            ].map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 md:p-10 transition-all duration-700${stats.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}
                style={{
                  background: 'linear-gradient(135deg, #e8faf0 0%, #d4f5e0 50%, #c1f0d0 100%)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <p className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-1">{s.big}</p>
                <p className="font-superscore-bold text-base text-[#1b1a1b] mb-2">{s.sub}</p>
                <p className="text-[#1b1a1b]/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM vs SOLUTION - Side by side ═══ */}
      <section ref={problem.ref} className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-14 transition-all duration-700${problem.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
            <p className="text-[#52b37f] text-xs font-semibold uppercase tracking-widest mb-3">Karşılaştırma</p>
            <h2 className="font-superscore-bold text-2xl md:text-4xl text-[#1b1a1b]">Farkı görün</h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diğerleri */}
            <div className={`bg-white rounded-3xl p-8 md:p-10 border border-gray-100 transition-all duration-700${problem.v ? ' opacity-100 translate-x-0' : ' opacity-0 -translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-6">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-superscore-bold text-lg text-[#1b1a1b] mb-5">Diğer platformlar</h3>
              <ul className="space-y-4">
                {[
                  'Şikayet çözülse bile kaldırılmıyor',
                  'Trafiğe göre fahiş yıllık ücretler',
                  'Sadece tüketici yanlısı yaklaşım',
                  'Çözüm takibi ve belgeleme yok',
                  'Markalar platforma güvenmiyor',
                  'Şikayet kaldırma süreci belirsiz',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#1b1a1b]/55 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-300" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Superscore */}
            <div className={`bg-[#0a0a0a] rounded-3xl p-8 md:p-10 transition-all duration-700${problem.v ? ' opacity-100 translate-x-0' : ' opacity-0 translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-10 h-10 rounded-xl bg-[#52b37f] flex items-center justify-center mb-6">
                <Image src="/logo/star_icon.png" alt="" width={20} height={20} className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <h3 className="font-superscore-bold text-lg text-white mb-5">Superscore</h3>
              <ul className="space-y-4">
                {[
                  'Çözülen şikayetler müşteri onayıyla kapanır',
                  'Adil ve şeffaf fiyatlandırma modeli',
                  'Hem tüketici hem marka için adil',
                  'AI + admin ile çözüm doğrulaması',
                  'Markalar aktif olarak sürece katılır',
                  'Hediye ve kupon ile hızlı çözüm',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#52b37f]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#52b37f]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE SHOWCASE - Grid with Superscore icon center (like Shopify) ═══ */}
      <section ref={features.ref} className="py-20 md:py-28 bg-[#fafdf7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            {/* Left - Icon grid */}
            <div className={`flex-1 transition-all duration-1000${features.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="grid grid-cols-5 gap-3 max-w-[320px] mx-auto lg:mx-0">
                {Array.from({ length: 25 }).map((_, i) => {
                  const isCenter = i === 12;
                  const isNear = [6,7,8,11,13,16,17,18].includes(i);
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-700${features.v ? ' opacity-100 scale-100' : ' opacity-0 scale-75'}`}
                      style={{
                        transitionDelay: `${300 + i * 30}ms`,
                        background: isCenter
                          ? 'linear-gradient(135deg, #52b37f 0%, #3d9a6a 100%)'
                          : isNear
                          ? 'linear-gradient(135deg, #e8faf0 0%, #d4f5e0 100%)'
                          : '#f0f5ed',
                      }}
                    >
                      {isCenter && (
                        <Image src="/logo/star_icon.png" alt="Superscore" width={28} height={28} className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Text */}
            <div className="flex-1">
              <div className={`transition-all duration-700${features.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-3">Widget entegrasyonu</h3>
                <p className="text-[#1b1a1b]/50 text-sm leading-relaxed mb-6">
                  Modern widgetlarımız ile güncel Superscore puanınızı web sitenizde, fiziksel mağazanızda ve tüm dijital kanallarınızda yayınlayın.
                </p>
              </div>
              <div className={`transition-all duration-700${features.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-3">Çoklu platform toplama</h3>
                <p className="text-[#1b1a1b]/50 text-sm leading-relaxed mb-8">
                  Tüm platformlardan toplanan yorumları ve değerlendirmeleri tek bir panelde görün. Müşterileriniz markayı bütüncül değerlendirsin.
                </p>
              </div>
              <div className={`transition-all duration-700${features.v ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#2a2a2a] transition-colors">
                    Detayları incele
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIG STATS + BAR CHART (Shopify style dark) ═══ */}
      <section ref={bigStats.ref} className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
        {/* Bar chart background */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] opacity-60">
          <BarChart />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-10 md:space-y-14">
            {[
              { value: 12, suffix: '', label: 'Benzersiz özellik', desc: 'Diğer platformlarda bulunmayan, sadece Superscore\'da olan özellik sayısı' },
              { value: 100, suffix: '%', label: 'Çözüm odaklı sistem', desc: 'Her şikayet AI destekli doğrulama sürecinden geçer ve gerçek çözüm sağlanır' },
              { value: 50, suffix: '%', label: 'Daha düşük maliyet', desc: 'Diğer platformlara kıyasla markalar için ortalama maliyet avantajı' },
            ].map((s, i) => (
              <div
                key={i}
                className={`border-l-2 border-[#52b37f]/40 pl-6 md:pl-8 transition-all duration-700${bigStats.v ? ' opacity-100 translate-x-0' : ' opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${200 + i * 200}ms` }}
              >
                <p className="font-superscore-bold text-4xl md:text-6xl lg:text-7xl text-white/90 leading-none mb-1">
                  <Counter end={s.value} suffix={s.suffix} duration={2000 + i * 500} />
                </p>
                <p className="font-superscore-bold text-white/60 text-sm md:text-base mb-1">{s.label}</p>
                <p className="text-white/30 text-xs md:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#52b37f] text-xs font-semibold uppercase tracking-widest mb-3">Detaylı Karşılaştırma</p>
            <h2 className="font-superscore-bold text-2xl md:text-4xl text-[#1b1a1b]">Özellik tablosu</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-[1fr_90px_90px] md:grid-cols-[1fr_140px_140px] items-center py-5 px-5 md:px-8 bg-[#0a0a0a] rounded-t-2xl">
              <span className="text-white/50 text-xs md:text-sm">Özellik</span>
              <div className="flex flex-col items-center gap-1">
                <Image src="/logo/star_icon.png" alt="" width={18} height={18} className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-white text-[10px] md:text-xs font-semibold">Superscore</span>
              </div>
              <span className="text-white/30 text-[10px] md:text-xs text-center">Diğerleri</span>
            </div>

            {/* Rows */}
            {[
              { f: 'Şikayet çözüm takibi', us: true, them: false },
              { f: 'Çözülen şikayet otomatik kapanır', us: true, them: false },
              { f: 'Sipariş bilgisi entegrasyonu', us: true, them: false },
              { f: 'AI destekli çözüm doğrulama', us: true, them: false },
              { f: 'Dinamik puan sistemi', us: true, them: false },
              { f: 'Widget entegrasyonu', us: true, them: false },
              { f: 'Hediye ve kupon gönderimi', us: true, them: false },
              { f: 'Çoklu platform yorum toplama', us: true, them: false },
              { f: 'Uygun fiyatlı planlar', us: true, them: false },
              { f: 'Şikayet yayınlama', us: true, them: true },
              { f: 'Marka profil sayfası', us: true, them: true },
              { f: 'Yorum ve değerlendirme', us: true, them: true },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_90px_90px] md:grid-cols-[1fr_140px_140px] items-center py-3.5 px-5 md:px-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <span className="text-[#1b1a1b] text-xs md:text-sm">{row.f}</span>
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#52b37f]/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#52b37f]" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex justify-center">
                  {row.them ? (
                    <div className="w-6 h-6 rounded-full bg-[#52b37f]/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#52b37f]" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-red-300" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="grid grid-cols-[1fr_90px_90px] md:grid-cols-[1fr_140px_140px] items-center py-4 px-5 md:px-8 bg-[#f8f9fa] rounded-b-2xl">
              <span className="text-[#1b1a1b] text-xs md:text-sm font-semibold">Toplam</span>
              <span className="text-[#52b37f] text-center text-sm font-bold">12/12</span>
              <span className="text-[#1b1a1b]/30 text-center text-sm font-bold">3/12</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(82,179,127,0.08),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#52b37f] flex items-center justify-center mx-auto mb-8">
              <Image src="/logo/star_icon.png" alt="" width={36} height={36} className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <h2 className="font-superscore-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Farkı deneyimleyin
            </h2>
            <p className="text-white/40 text-sm md:text-base mb-10 max-w-md mx-auto">
              Şikayetlerin gerçekten çözüldüğü, markaların güvendiği, tüketicilerin tercih ettiği platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register">
                <button className="px-8 py-4 bg-[#52b37f] text-white text-sm font-semibold rounded-full hover:bg-[#47a06f] transition-colors inline-flex items-center gap-2">
                  Hemen Başla <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/nasil-calisir">
                <button className="px-8 py-4 text-white text-sm font-semibold rounded-full border border-white/15 hover:bg-white/5 transition-colors">
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
