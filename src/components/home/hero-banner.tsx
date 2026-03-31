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
    <section className="relative overflow-hidden bg-[#04da8d] min-h-[480px] md:min-h-[540px] flex items-center justify-center">
      {/* Green background base + video animations on top */}

      {/* Video Background - Desktop */}
      <video
        key="desktop"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* Video Background - Mobile */}
      <video
        key="mobile"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
      >
        <source src="/hero-bg-mobile.webm" type="video/webm" />
      </video>

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
