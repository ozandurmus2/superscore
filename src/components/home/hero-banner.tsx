'use client';

import { useEffect, useState } from 'react';
import { HeroSearch } from './hero-search';

export function HeroBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] min-h-[480px] md:min-h-[540px] flex items-center justify-center">
      {/* Video Background - Desktop */}
      <video
        key="desktop"
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${isMobile ? 'hidden' : 'block'}`}
      >
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* Video Background - Mobile: object-top to show upper portion */}
      <video
        key="mobile"
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover object-top ${isMobile ? 'block' : 'hidden'}`}
      >
        <source src="/hero-bg-mobile.webm" type="video/webm" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

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
