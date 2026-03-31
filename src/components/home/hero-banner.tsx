'use client';

import { useEffect, useRef } from 'react';
import { HeroSearch } from './hero-search';

export function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * 2;
      canvas!.height = height * 2;
      ctx!.scale(2, 2);
    }
    resize();
    window.addEventListener('resize', resize);

    // Floating blobs
    const blobs = [
      { x: 0.15, y: 0.7, r: 280, color: '#ffe400', vx: 0.08, vy: -0.05, phase: 0 },
      { x: 0.85, y: 0.8, r: 240, color: '#04da8d', vx: -0.06, vy: -0.04, phase: 2 },
      { x: 0.5, y: -0.1, r: 220, color: '#fd791a', vx: 0.04, vy: 0.06, phase: 4 },
      { x: 0.3, y: 0.3, r: 160, color: '#819cf3', vx: -0.03, vy: 0.03, phase: 1 },
      { x: 0.75, y: 0.2, r: 180, color: '#f95a98', vx: 0.05, vy: 0.04, phase: 3 },
    ];

    // Particles
    const particles: { x: number; y: number; r: number; vx: number; vy: number; opacity: number; color: string }[] = [];
    const particleColors = ['#ffe400', '#04da8d', '#fd791a', '#819cf3', '#f95a98', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 1,
        y: Math.random() * 1,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        opacity: Math.random() * 0.4 + 0.1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    let t = 0;

    function draw() {
      t += 0.003;

      // Dark background
      ctx!.fillStyle = '#0a0a0a';
      ctx!.fillRect(0, 0, width, height);

      // Draw blobs with blur
      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(t + blob.phase) * 0.06) * width;
        const by = (blob.y + Math.cos(t * 0.7 + blob.phase) * 0.05) * height;
        const gradient = ctx!.createRadialGradient(bx, by, 0, bx, by, blob.r);
        gradient.addColorStop(0, blob.color + '30');
        gradient.addColorStop(0.4, blob.color + '15');
        gradient.addColorStop(1, blob.color + '00');
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(bx, by, blob.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const px = p.x * width;
        const py = p.y * height;
        const flicker = p.opacity + Math.sin(t * 2 + p.x * 10) * 0.1;
        ctx!.globalAlpha = Math.max(0, Math.min(1, flicker));
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(px, py, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // Subtle grid lines
      ctx!.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx!.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] min-h-[460px] md:min-h-[520px] flex items-center justify-center">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.6) 100%)',
        }}
      />

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
