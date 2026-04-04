'use client';

import { useState } from 'react';

interface BrandLogoProps {
  name: string;
  logoUrl: string | null;
  size?: number;
  className?: string;
}

/**
 * Marka logosu - yüklenemezse baş harfini gösterir.
 * Google Favicon gibi dış kaynaklarda hata olursa fallback yapar.
 */
export function BrandLogo({ name, logoUrl, size = 56, className = '' }: BrandLogoProps) {
  const [error, setError] = useState(false);

  const initial = name?.charAt(0)?.toUpperCase() || '?';

  // Renk: marka adının hash'inden tutarlı renk üret
  const colors = [
    '#f97316', '#3b82f6', '#8b5cf6', '#ef4444', '#10b981',
    '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#84cc16',
  ];
  const hash = name ? name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 0;
  const bgColor = colors[hash % colors.length];

  if (!logoUrl || error) {
    return (
      <div
        className={`flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
          fontSize: size * 0.4,
          borderRadius: size > 50 ? 16 : size > 30 ? 10 : 6,
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl}
      alt={name}
      width={size}
      height={size}
      className={`object-contain bg-white border border-gray-100 flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size > 50 ? 16 : size > 30 ? 10 : 6,
      }}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
