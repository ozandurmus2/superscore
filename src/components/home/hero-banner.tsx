'use client';

import { HeroSearch } from './hero-search';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f5f1eb] min-h-[420px] md:min-h-[480px] flex items-center justify-center">
      {/* Animated Background Shapes - div based for mobile compatibility */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Yellow blob - bottom left */}
        <div
          className="absolute animate-shape-yellow"
          style={{
            bottom: '-8%',
            left: '-6%',
            width: 'clamp(180px, 30vw, 360px)',
            height: 'clamp(180px, 30vw, 360px)',
            background: '#ffe400',
            borderRadius: '30% 70% 60% 40% / 50% 30% 70% 50%',
            transformOrigin: 'center center',
          }}
        />

        {/* Green shape - right side */}
        <div
          className="absolute animate-shape-green"
          style={{
            bottom: '-4%',
            right: '-4%',
            width: 'clamp(140px, 25vw, 300px)',
            height: 'clamp(160px, 28vw, 340px)',
            background: '#04da8d',
            borderRadius: '50% 50% 20% 20%',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            transformOrigin: 'center center',
          }}
        />

        {/* Orange circle - top */}
        <div
          className="absolute animate-shape-orange"
          style={{
            top: '-12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(140px, 22vw, 280px)',
            height: 'clamp(140px, 22vw, 280px)',
            background: '#fd791a',
            borderRadius: '50%',
            transformOrigin: 'center center',
          }}
        />

        {/* Small purple accent - top left */}
        <div
          className="absolute animate-float-1"
          style={{
            top: '15%',
            left: '8%',
            width: 'clamp(40px, 6vw, 80px)',
            height: 'clamp(40px, 6vw, 80px)',
            background: '#819cf3',
            borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
            opacity: 0.6,
          }}
        />

        {/* Small pink accent - right */}
        <div
          className="absolute animate-float-2"
          style={{
            top: '25%',
            right: '10%',
            width: 'clamp(30px, 5vw, 60px)',
            height: 'clamp(30px, 5vw, 60px)',
            background: '#f95a98',
            borderRadius: '50%',
            opacity: 0.5,
          }}
        />

        {/* Dotted ring decoration - center left */}
        <div
          className="absolute animate-spin-slow hidden md:block"
          style={{
            top: '30%',
            left: '12%',
            width: '100px',
            height: '100px',
            border: '2px dashed rgba(27, 26, 27, 0.08)',
            borderRadius: '50%',
          }}
        />

        {/* Dotted ring - bottom right area */}
        <div
          className="absolute animate-spin-slow"
          style={{
            bottom: '20%',
            right: '15%',
            width: 'clamp(60px, 8vw, 120px)',
            height: 'clamp(60px, 8vw, 120px)',
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
