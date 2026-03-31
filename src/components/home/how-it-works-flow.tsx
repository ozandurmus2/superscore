'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function HowItWorksFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#1b1a1b] rounded-[32px] overflow-hidden relative">

          {/* Subtle animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(82,179,127,0.15),transparent_70%)] transition-all duration-[2000ms]${isVisible ? ' scale-150 opacity-100' : ' scale-50 opacity-0'}`} />
            <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(66,86,182,0.12),transparent_70%)] transition-all duration-[2500ms]${isVisible ? ' scale-150 opacity-100' : ' scale-50 opacity-0'}`} style={{ transitionDelay: '300ms' }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch">

            {/* Left - Text Content */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className={`transition-all duration-700${isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`}>
                <h2 className="font-superscore-bold text-2xl md:text-3xl lg:text-4xl text-white mb-5">
                  Superscore Nedir?
                </h2>
              </div>
              <div className={`transition-all duration-700${isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                  Tüketici ile marka arasındaki güven köprüsü. Şikayetler yayınlanır, markalar yanıtlar. Her çözümle Superscore puanı güncellenir.
                </p>
              </div>
              <div className={`flex items-center gap-3 transition-all duration-700${isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 bg-white text-[#1b1a1b] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
                    Keşfet
                  </button>
                </Link>
                <Link href="/karsilastir">
                  <button className="px-6 py-3 text-white text-sm font-semibold rounded-full border border-white/30 hover:bg-white/10 transition-colors">
                    Karşılaştır
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Animated Flow Diagram with SVG */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12">
              <div className="relative w-full max-w-[360px]">
                <svg viewBox="0 0 360 200" fill="none" className="w-full">
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* === FULL FLOW PATH (single continuous path for the light to travel) === */}
                  {/* Tüketici → SS box left edge → around SS box border (top) → SS box right edge → Marka */}

                  {/* LINE: Tüketici → SS box (behind box) */}
                  <line x1="75" y1="86" x2="140" y2="86" stroke="white" strokeWidth="1" opacity="0.1" />
                  {/* Flowing light on Tüketici → SS */}
                  <line x1="75" y1="86" x2="140" y2="86" stroke="white" strokeWidth="2" strokeDasharray="12 80" className={isVisible ? 'animate-flow-line-1' : ''} opacity="0" filter="url(#glow-sm)" />

                  {/* LINE: SS box → Marka */}
                  <line x1="220" y1="86" x2="285" y2="86" stroke="white" strokeWidth="1" opacity="0.1" />
                  {/* Flowing light on SS → Marka */}
                  <line x1="220" y1="86" x2="285" y2="86" stroke="white" strokeWidth="2" strokeDasharray="12 80" className={isVisible ? 'animate-flow-line-2' : ''} opacity="0" filter="url(#glow-sm)" />

                  {/* Arrow head → Marka */}
                  <path d="M 282 82.5 L 288 86 L 282 89.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

                  {/* === SUPERSCORE BOX BORDER GLOW === */}
                  {/* Continuous subtle border */}
                  <rect x="140" y="60" width="80" height="52" rx="12" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
                  {/* Animated light traveling around the border - clockwise */}
                  <rect x="140" y="60" width="80" height="52" rx="12" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="40 224" className={isVisible ? 'animate-border-flow' : ''} opacity="0" filter="url(#glow)" />

                  {/* === RETURN ARC (bottom) === */}
                  <path d="M 310 100 Q 310 162 180 162 Q 50 162 50 100" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="3 5" opacity="0.1" />
                  <path d="M 310 100 Q 310 162 180 162 Q 50 162 50 100" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="15 350" className={isVisible ? 'animate-flow-return' : ''} opacity="0" filter="url(#glow-sm)" />
                  <path d="M 47 103 L 50 96 L 53 103" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />

                  {/* === NODES === */}

                  {/* Tüketici */}
                  <g className={`transition-all duration-700${isVisible ? ' opacity-100' : ' opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                    <rect x="15" y="60" width="56" height="52" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
                    <circle cx="43" cy="78" r="6" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
                    <path d="M 33 98 Q 33 90 43 90 Q 53 90 53 98" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
                  </g>

                  {/* Superscore */}
                  <g className={`transition-all duration-700${isVisible ? ' opacity-100' : ' opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                    <rect x="140" y="60" width="80" height="52" rx="12" fill="#52b37f" />
                    <path d="M 180 70 L 183.5 79 L 193 79.5 L 186 85.5 L 188 95 L 180 90 L 172 95 L 174 85.5 L 167 79.5 L 176.5 79 Z" fill="white" />
                  </g>

                  {/* Marka */}
                  <g className={`transition-all duration-700${isVisible ? ' opacity-100' : ' opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                    <rect x="289" y="60" width="56" height="52" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.15" strokeWidth="0.8" />
                    <rect x="303" y="82" width="28" height="18" rx="3" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
                    <path d="M 311 82 L 311 78 Q 311 75 314 75 L 320 75 Q 323 75 323 78 L 323 82" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
                  </g>

                  {/* Labels */}
                  <text x="43" y="128" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">Tüketici</text>
                  <text x="43" y="141" textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="9">Şikayet yazar</text>
                  <text x="180" y="128" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">Superscore</text>
                  <text x="180" y="141" textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="9">Puan güncellenir</text>
                  <text x="317" y="128" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">Marka</text>
                  <text x="317" y="141" textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="9">Talepleri karşılar</text>
                  <text x="180" y="182" textAnchor="middle" fill="white" fillOpacity="0.2" fontSize="9">Geri bildirim döngüsü</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
