'use client';

import { HeroSearch } from './hero-search';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] min-h-[480px] md:min-h-[540px] flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Base gradient mesh */}
        <div
          className="absolute inset-0 animate-hero-gradient"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 10% 90%, rgba(255,228,0,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 90% 80%, rgba(4,218,141,0.15) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 50% -10%, rgba(253,121,26,0.14) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 30% 40%, rgba(129,156,243,0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 75% 20%, rgba(249,90,152,0.10) 0%, transparent 50%)
            `,
          }}
        />
        {/* Moving blobs layer 1 */}
        <div
          className="absolute inset-0 animate-hero-blob1"
          style={{
            background: `
              radial-gradient(circle 300px at 20% 80%, rgba(255,228,0,0.12) 0%, transparent 70%),
              radial-gradient(circle 250px at 80% 70%, rgba(4,218,141,0.10) 0%, transparent 70%)
            `,
          }}
        />
        {/* Moving blobs layer 2 */}
        <div
          className="absolute inset-0 animate-hero-blob2"
          style={{
            background: `
              radial-gradient(circle 280px at 60% 10%, rgba(253,121,26,0.10) 0%, transparent 70%),
              radial-gradient(circle 220px at 40% 60%, rgba(249,90,152,0.08) 0%, transparent 70%)
            `,
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Floating particles via CSS */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-hero-particle"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#ffe400', '#04da8d', '#fd791a', '#819cf3', '#f95a98', '#ffffff'][i % 6],
                opacity: 0.2 + Math.random() * 0.3,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.5) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 text-center">
        <h2 className="font-superscore-bold text-4xl md:text-5xl lg:text-[56px] text-white mb-4 leading-tight">
          Güvenilir bir şirket bulun
        </h2>
        <p className="text-base md:text-lg text-white/60 mb-8">
          Şikayetleri okuyun, yazın ve çözüme kavuşturun
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}
