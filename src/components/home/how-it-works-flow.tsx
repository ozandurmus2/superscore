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

  const steps = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: 'Tüketici',
      sublabel: 'Şikayet yazar',
    },
    {
      icon: (
        <Image src="/logo/SS_Star.png" alt="Superscore" width={28} height={28} className="w-7 h-7" />
      ),
      label: 'Superscore',
      sublabel: 'Puanlar güncellenir',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        </svg>
      ),
      label: 'Marka',
      sublabel: 'Talepleri karşılar',
    },
  ];

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
                  Tüketiciler ve markalar arasında kurulan güven köprüsü.
                  Tüketiciler şikayetlerini yayınlar ve taleplerini iletir,
                  markalar ise bu talepleri karşılar. Her çözüm ve her
                  geri bildirimle birlikte Superscore puanı güncellenir
                  &mdash; yukarıya da aşağıya.
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

            {/* Right - Animated Flow Diagram */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12">
              <div className="relative w-full max-w-[360px]">

                {/* Flow Steps */}
                <div className="flex items-center justify-between gap-2 md:gap-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-4 flex-1">
                      {/* Node */}
                      <div
                        className={`flex flex-col items-center transition-all duration-700${isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${400 + i * 200}ms` }}
                      >
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                          i === 1
                            ? 'bg-[#52b37f] text-white'
                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                        }${isVisible && i === 1 ? ' animate-float-star' : ''}`}>
                          {step.icon}
                        </div>
                        <span className="text-[11px] md:text-xs text-white font-medium mt-2.5 whitespace-nowrap">{step.label}</span>
                        <span className="text-[10px] md:text-[11px] text-white/50 mt-0.5 whitespace-nowrap">{step.sublabel}</span>
                      </div>

                      {/* Arrow connector (not after last) */}
                      {i < steps.length - 1 && (
                        <div className={`flex-1 flex items-center justify-center -mt-6 transition-all duration-500${isVisible ? ' opacity-100' : ' opacity-0'}`} style={{ transitionDelay: `${600 + i * 200}ms` }}>
                          <div className="relative w-full h-[2px]">
                            {/* Base line */}
                            <div className="absolute inset-0 bg-white/15 rounded-full" />
                            {/* Animated glow */}
                            <div className={`absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full${isVisible ? ' animate-connector-glow' : ''}`} style={{ animationDelay: `${i * 0.4}s` }} />
                          </div>
                          {/* Arrow head */}
                          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="flex-shrink-0 -ml-1">
                            <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Return arc - dashed line below */}
                <div className={`mt-6 mx-6 transition-all duration-1000${isVisible ? ' opacity-100' : ' opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
                  <svg viewBox="0 0 280 40" fill="none" className="w-full">
                    <path
                      d="M 260 0 Q 260 30 140 30 Q 20 30 20 0"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="4 6"
                      opacity="0.2"
                    />
                    <path
                      d="M 260 0 Q 260 30 140 30 Q 20 30 20 0"
                      stroke="url(#return-glow)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="20 280"
                      className={isVisible ? 'animate-dash-flow-slow' : ''}
                    />
                    <defs>
                      <linearGradient id="return-glow">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="#52b37f" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Arrow at start */}
                    <path d="M 17 0 L 20 6 L 23 0" stroke="white" strokeWidth="1" fill="none" opacity="0.3" strokeLinecap="round" />
                  </svg>
                  <p className="text-center text-[10px] text-white/30 -mt-1">Geri bildirim döngüsü</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
