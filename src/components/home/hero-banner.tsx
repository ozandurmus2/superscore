'use client';

import { HeroSearch } from './hero-search';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f5f1eb] min-h-[420px] md:min-h-[480px] flex items-center justify-center">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Yellow blob - bottom left */}
        <div
          className="absolute w-[120px] h-[120px] md:w-[280px] md:h-[280px] lg:w-[360px] lg:h-[360px] animate-shape-yellow"
          style={{
            bottom: '-15px',
            left: '-15px',
            background: '#ffe400',
            borderRadius: '30% 70% 60% 40% / 50% 30% 70% 50%',
          }}
        />

        {/* Green triangle - bottom right */}
        <div
          className="absolute w-[100px] h-[120px] md:w-[220px] md:h-[260px] lg:w-[300px] lg:h-[340px] animate-shape-green"
          style={{
            bottom: '-10px',
            right: '-10px',
            background: '#04da8d',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Orange circle - top center */}
        <div
          className="absolute w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[280px] lg:h-[280px] left-1/2 -translate-x-1/2 animate-shape-orange"
          style={{
            top: '-30px',
            background: '#fd791a',
            borderRadius: '50%',
          }}
        />

        {/* Small purple accent - top left */}
        <div
          className="absolute w-[28px] h-[28px] md:w-[60px] md:h-[60px] animate-float-1"
          style={{
            top: '18%',
            left: '10%',
            background: '#819cf3',
            borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
            opacity: 0.6,
          }}
        />

        {/* Small pink accent - right */}
        <div
          className="absolute w-[22px] h-[22px] md:w-[50px] md:h-[50px] animate-float-2"
          style={{
            top: '28%',
            right: '12%',
            background: '#f95a98',
            borderRadius: '50%',
            opacity: 0.5,
          }}
        />

        {/* Dotted ring - center left (desktop only) */}
        <div
          className="absolute hidden md:block animate-spin-slow"
          style={{
            top: '30%',
            left: '12%',
            width: '100px',
            height: '100px',
            border: '2px dashed rgba(27, 26, 27, 0.08)',
            borderRadius: '50%',
          }}
        />

        {/* Dotted ring - bottom right */}
        <div
          className="absolute w-[50px] h-[50px] md:w-[100px] md:h-[100px] animate-spin-slow"
          style={{
            bottom: '22%',
            right: '16%',
            border: '2px dashed rgba(27, 26, 27, 0.06)',
            borderRadius: '50%',
            animationDirection: 'reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 text-center">
        <h2 className="font-superscore-bold text-4xl md:text-5xl lg:text-[56px] text-[#1b1a1b] mb-4 leading-tight">
          Güvenilir bir şirket bulun
        </h2>
        <p className="text-base md:text-lg text-[#1b1a1b]/70 mb-8">
          Şikayetleri okuyun, yazın ve çözüme kavuşturun
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}
