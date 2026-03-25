'use client';

import { getScoreColor } from '@/lib/utils';
import { getSuperscore } from '@/types';

interface SuperscoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function SuperscoreBadge({ score, size = 'md', showLabel = true }: SuperscoreBadgeProps) {
  const grade = getSuperscore(score);
  const color = getScoreColor(score);

  const sizes = {
    sm: { container: 'w-12 h-12', text: 'text-sm', label: 'text-[10px]' },
    md: { container: 'w-20 h-20', text: 'text-xl', label: 'text-xs' },
    lg: { container: 'w-28 h-28', text: 'text-3xl', label: 'text-sm' },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * 40;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${s.container} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${s.text} font-bold`} style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`${s.label} font-semibold ${grade.color}`}>{grade.label}</span>
      )}
    </div>
  );
}
