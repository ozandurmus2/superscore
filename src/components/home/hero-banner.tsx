'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroSearch } from './hero-search';

export function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] min-h-[480px] md:min-h-[540px] flex items-center justify-center">
      {/* Video Background - absolute fill */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        >
          <source
            src="https://cdn.shopify.com/b/shopify-brochure2-assets/c6592ae0c066026c8de941bc859e4b9d.webm"
            type="video/webm"
          />
          <source
            src="https://cdn.shopify.com/b/shopify-brochure2-assets/c6592ae0c066026c8de941bc859e4b9d.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

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
