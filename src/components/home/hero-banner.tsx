'use client';

import { HeroSearch } from './hero-search';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#f5f1eb] min-h-[420px] md:min-h-[480px] flex items-center justify-center">
      {/* Animated SVG Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 491"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Yellow Rounded Square - Bottom Left */}
          <g className="animate-shape-yellow" style={{ transformOrigin: '250px 400px' }}>
            <rect
              x="20"
              y="280"
              width="340"
              height="340"
              rx="50"
              ry="50"
              fill="#ffe400"
              transform="rotate(-15, 190, 450)"
            />
          </g>

          {/* Green Triangle - Bottom Right */}
          <g className="animate-shape-green" style={{ transformOrigin: '1100px 400px' }}>
            <polygon
              points="1050,490 1200,240 1350,490"
              fill="#04da8d"
              transform="rotate(10, 1200, 400)"
            />
          </g>

          {/* Orange Circle - Top Center */}
          <g className="animate-shape-orange" style={{ transformOrigin: '640px 0px' }}>
            <circle
              cx="640"
              cy="-60"
              r="180"
              fill="#fd791a"
            />
          </g>
        </svg>
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
