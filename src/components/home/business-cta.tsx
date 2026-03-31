'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Bar heights for the wave chart (percentage of max height)
const BAR_DATA = [
  38, 32, 28, 24, 20, 18, 16, 15, 14, 14, 15, 18, 22, 28, 35, 42, 50, 56, 60, 62,
  63, 62, 60, 56, 50, 44, 38, 34, 30, 28, 27, 27, 28, 30, 33, 37, 42, 47, 52, 56,
  59, 60, 58, 54, 48, 42, 36, 30, 26, 23, 22, 22, 24, 27, 31, 36, 42, 48, 55, 62,
  68, 73, 76, 78, 80, 81, 80, 78, 74, 70, 64, 58, 52, 47, 42, 39, 37, 36, 36, 38,
  40, 44, 48, 53, 58, 63, 68, 72, 76, 80, 84, 87, 90, 92, 94, 96, 97, 98, 99, 100,
];

export function BusinessCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate bars growing from left to right
          let frame = 0;
          const totalFrames = 60;
          const animate = () => {
            frame++;
            setProgress(Math.min(frame / totalFrames, 1));
            if (frame < totalFrames) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const totalBars = BAR_DATA.length;

  return (
    <section className="bg-white py-6 md:py-8" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="relative bg-[#171E16] rounded-[32px] overflow-hidden">

          {/* SVG Bar Chart Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-[200%] md:w-full h-full absolute -left-1/2 md:left-0">
              <svg
                viewBox="0 0 1000 400"
                fill="none"
                preserveAspectRatio="none"
                className="w-full absolute bottom-0 h-[70%] md:h-full"
              >
                {BAR_DATA.map((height, i) => {
                  const barWidth = 1000 / totalBars;
                  const x = i * barWidth;
                  const barProgress = Math.max(0, Math.min(1, (progress * totalBars - i) / 8));
                  const barHeight = (height / 100) * 350 * barProgress;
                  const y = 400 - barHeight;

                  return (
                    <rect
                      key={i}
                      x={x + 1}
                      y={y}
                      width={barWidth - 2}
                      height={barHeight}
                      fill="#04da8d"
                      opacity={0.35 + barProgress * 0.25}
                    />
                  );
                })}
              </svg>
            </div>
            {/* Left fade gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171E16] via-transparent to-transparent z-10 w-1/3" />
          </div>

          {/* Content */}
          <div className="relative z-20 px-6 md:px-12 py-10 md:py-14">
            {/* Header + CTA */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 md:mb-14">
              <div className="mb-6 md:mb-0">
                <h3 className="font-superscore-bold text-2xl md:text-3xl text-white mb-2">
                  İşletmenizi büyütmek mi istiyorsunuz?
                </h3>
                <p className="text-sm md:text-base text-white/60">
                  Superscore&apos;daki yorumlarla itibarınızı güçlendirin.
                </p>
              </div>
              <Link href="/business/kayit">
                <button className="px-7 py-3.5 bg-[#04da8d] text-[#171E16] text-sm font-semibold rounded-full hover:bg-[#03c47e] transition-colors">
                  Ücretsiz Başlayın
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="pl-4 md:pl-6 border-l-2 border-white/15">
                <h4 className="font-superscore-bold text-3xl md:text-4xl text-[#c1f6cf] mb-1">
                  10.000+
                </h4>
                <p className="text-white/70 text-sm">
                  Kayıtlı marka Superscore&apos;da yer alıyor
                </p>
              </div>
              <div className="pl-4 md:pl-6 border-l-2 border-white/15">
                <h4 className="font-superscore-bold text-3xl md:text-4xl text-[#c1f6cf] mb-1">
                  %73 çözüm oranı
                </h4>
                <p className="text-white/70 text-sm">
                  Şikayetlerin büyük çoğunluğu markalar tarafından çözüme kavuşturuluyor
                </p>
              </div>
              <div className="pl-4 md:pl-6 border-l-2 border-white/15">
                <h4 className="font-superscore-bold text-3xl md:text-4xl text-[#c1f6cf] mb-1">
                  2x daha fazla güven
                </h4>
                <p className="text-white/70 text-sm">
                  Superscore profili olan markalar 2 kat daha fazla müşteri güveni kazanıyor
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
