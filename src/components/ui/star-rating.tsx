'use client';

/**
 * Superscore Star Rating Component
 *
 * Rating color rules:
 * 0 - 1.5: #eb4b34 (red)
 * 2 - 2.5: #ef8d3f (orange)
 * 3 - 3.5: #f7d047 (yellow)
 * 4:       #8acd41 (light green)
 * 4.5 - 5: #52b37f (green)
 * Empty:   #dcdce5 (gray)
 */

function getStarColor(rating: number): string {
  if (rating <= 0) return '#dcdce5';
  if (rating <= 1.5) return '#eb4b34';
  if (rating <= 2.5) return '#ef8d3f';
  if (rating <= 3.5) return '#f7d047';
  if (rating <= 4) return '#8acd41';
  return '#52b37f';
}

interface StarRatingProps {
  rating: number; // 0 - 5
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({ rating, size = 'md', showScore = false, reviewCount, className = '' }: StarRatingProps) {
  const sizeMap = {
    xs: { box: 16, star: 10, gap: 1, fontSize: 'text-xs' },
    sm: { box: 20, star: 13, gap: 1.5, fontSize: 'text-sm' },
    md: { box: 26, star: 17, gap: 2, fontSize: 'text-base' },
    lg: { box: 34, star: 22, gap: 2.5, fontSize: 'text-lg' },
  };

  const s = sizeMap[size];
  const color = getStarColor(rating);
  const emptyColor = '#dcdce5';

  // Generate 5 stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let fillPercent = 0;
    if (rating >= i) {
      fillPercent = 100; // full star
    } else if (rating >= i - 0.5) {
      fillPercent = 50; // half star
    }

    stars.push(
      <div
        key={i}
        className="relative overflow-hidden flex-shrink-0 !rounded-none !border-0"
        style={{
          width: s.box,
          height: s.box,
          borderRadius: '0px !important',
          border: 'none !important',
        }}
      >
        {/* Empty background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: emptyColor }}
        />
        {/* Filled portion */}
        {fillPercent > 0 && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: color,
              width: `${fillPercent}%`,
            }}
          />
        )}
        {/* Star icon - always white */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/star_icon.png"
            alt=""
            style={{ width: s.star, height: s.star, filter: 'brightness(0) invert(1)' }}
            className="relative z-10"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`} style={{ gap: s.gap }}>
      <div className="flex items-center" style={{ gap: s.gap }}>
        {stars}
      </div>
      {showScore && (
        <span className={`${s.fontSize} font-medium text-[#1b1a1b] ml-1.5`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={`${s.fontSize} text-gray-500 ml-0.5`}>
          ({reviewCount.toLocaleString('tr-TR')})
        </span>
      )}
    </div>
  );
}
