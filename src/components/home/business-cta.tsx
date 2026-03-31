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
          const startTime = performance.now();
          const duration = 5000; // 5 seconds - very slow motion
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            // Ease out quint - starts normal, slows dramatically at end
            const eased = 1 - Math.pow(1 - t, 5);
            setProgress(eased);
            if (t < 1) requestAnimationFrame(animate);
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

          {/* SVG Bar Chart Background - thin lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-[200%] md:w-full h-full absolute -left-1/2 md:left-0">
              <svg
                viewBox="0 0 1415 400"
                fill="none"
                preserveAspectRatio="none"
                className="w-full absolute bottom-0 h-full"
              >
                {BAR_DATA.map((height, i) => {
                  const spacing = 1415 / totalBars;
                  const x = i * spacing;
                  const barProgress = Math.max(0, Math.min(1, (progress * totalBars - i) / 12));
                  const barHeight = (height / 100) * 380 * barProgress;
                  const y = 400 - barHeight;

                  return (
                    <rect
                      key={i}
                      x={x + 1}
                      y={y}
                      width={spacing - 2}
                      height={barHeight}
                      fill="#7CA355"
                      opacity={0.3 + barProgress * 0.3}
                    />
                  );
                })}
              </svg>
            </div>
            {/* Left fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171E16] via-transparent to-transparent z-10 w-1/4" />
          </div>

          {/* Content - compact like original */}
          <div className="relative z-20">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-between px-8 py-6">
              <div>
                <h3 className="font-superscore-bold text-lg text-white mb-1">
                  İşletmenizi büyütmek mi istiyorsunuz?
                </h3>
                <p className="text-sm text-white/60">
                  Superscore&apos;daki yorumlarla itibarınızı güçlendirin.
                </p>
              </div>
              <Link href="/business">
                <button className="px-6 py-3 bg-[#04da8d] text-[#171E16] text-sm font-semibold rounded-full hover:bg-[#03c47e] transition-colors">
                  Başlayın
                </button>
              </Link>
            </div>
            {/* Mobile */}
            <div className="flex md:hidden flex-col items-center text-center px-6 py-8">
              <h3 className="font-superscore-bold text-xl text-white mb-2">
                İşletmenizi büyütmek mi istiyorsunuz?
              </h3>
              <p className="text-sm text-white/60 mb-5">
                Superscore&apos;daki yorumlarla itibarınızı güçlendirin.
              </p>
              <Link href="/business">
                <button className="px-6 py-3 bg-[#04da8d] text-[#171E16] text-sm font-semibold rounded-full hover:bg-[#03c47e] transition-colors">
                  Başlayın
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
