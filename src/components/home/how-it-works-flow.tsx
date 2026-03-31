'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
        <div className="bg-[#e76592] rounded-[32px] overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-stretch">

            {/* Left - Text Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-superscore-bold text-2xl md:text-3xl text-white mb-4">
                Superscore Nedir?
              </h2>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                Müşteri ile marka arasındaki güven köprüsü. Talepler yayınlanır, marka temsilcilerine ulaşır.
                Markalar belgelerle çözümü ispatlar, Superscore&apos;ları güncellenir. Herkes kazanır.
              </p>
              <div>
                <Link href="/nasil-calisir">
                  <button className="px-6 py-3 bg-white text-[#e76592] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
                    Keşfet
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Animated Flow */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-10">
              <div className="relative w-full max-w-[320px] h-[200px] md:h-[220px]">

                {/* SVG Animated Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 220" fill="none">
                  {/* Customer to Star */}
                  <path
                    d="M 50 70 Q 50 110 100 110 L 130 110"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                    className={isVisible ? 'animate-line-pulse' : ''}
                  />
                  <defs>
                    <linearGradient id="glow-left" gradientUnits="userSpaceOnUse" x1="50" y1="110" x2="130" y2="110">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 70 Q 50 110 100 110 L 130 110"
                    stroke="url(#glow-left)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="30 200"
                    className={isVisible ? 'animate-dash-flow' : ''}
                  />

                  {/* Star to Brand */}
                  <path
                    d="M 190 110 L 220 110 Q 270 110 270 150"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                    className={isVisible ? 'animate-line-pulse' : ''}
                    style={{ animationDelay: '0.5s' }}
                  />
                  <defs>
                    <linearGradient id="glow-right" gradientUnits="userSpaceOnUse" x1="190" y1="110" x2="270" y2="110">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 190 110 L 220 110 Q 270 110 270 150"
                    stroke="url(#glow-right)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="30 200"
                    className={isVisible ? 'animate-dash-flow-delay' : ''}
                  />

                  {/* Brand back to Star (return loop - top arc) */}
                  <path
                    d="M 270 150 Q 270 190 220 190 L 100 190 Q 50 190 50 150 L 50 70"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                    opacity="0.2"
                    className={isVisible ? 'animate-line-pulse' : ''}
                    style={{ animationDelay: '1s' }}
                  />
                  <defs>
                    <linearGradient id="glow-loop" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 270 150 Q 270 190 220 190 L 100 190 Q 50 190 50 150 L 50 70"
                    stroke="url(#glow-loop)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="25 400"
                    className={isVisible ? 'animate-dash-flow-slow' : ''}
                  />
                </svg>

                {/* Customer Node */}
                <div
                  className={`absolute left-0 top-0 flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">👤</span>
                  </div>
                  <span className="text-[11px] text-white/80 font-medium mt-2">Müşteri</span>
                </div>

                {/* Star Node - Center */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                  style={{ transitionDelay: '500ms' }}
                >
                  <div className={`w-16 h-16 flex items-center justify-center ${isVisible ? 'animate-spin-slow' : ''}`}>
                    <Image src="/logo/SS_Star.png" alt="Superscore" width={52} height={52} className="w-13 h-13 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                  </div>
                  <span className="text-[11px] text-white font-semibold mt-1">Superscore</span>
                </div>

                {/* Brand Node */}
                <div
                  className={`absolute right-0 bottom-4 flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  style={{ transitionDelay: '800ms' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <span className="text-[11px] text-white/80 font-medium mt-2">Marka</span>
                </div>

                {/* Floating particles */}
                <div className={`absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-white/30 ${isVisible ? 'animate-float-1' : ''}`} />
                <div className={`absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/20 ${isVisible ? 'animate-float-2' : ''}`} />
                <div className={`absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-white/25 ${isVisible ? 'animate-float-3' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
