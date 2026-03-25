import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getScoreColor } from '@/lib/utils';
import { getSuperscore } from '@/types';
import type { Brand } from '@/types';

export default async function WidgetPage({ params }: { params: Promise<{ brandSlug: string }> }) {
  const { brandSlug } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase.from('brands').select('*').eq('slug', brandSlug).single();
  if (!brand) notFound();

  const b = brand as Brand;
  const grade = getSuperscore(b.superscore);
  const color = getScoreColor(b.superscore);
  const circumference = 2 * Math.PI * 35;
  const progress = (b.superscore / 100) * circumference;

  return (
    <html>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', background: 'transparent' }}>
        <div style={{
          padding: '16px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '300px',
          margin: '0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '60px', height: '60px', position: 'relative' }}>
              <svg viewBox="0 0 100 100" width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="10"
                  strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color }}>{b.superscore}</span>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1B1F3B' }}>{b.name}</div>
              <div style={{ fontSize: '12px', color: color, fontWeight: 600 }}>{grade.label}</div>
              {b.avg_rating && (
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                  {'★'.repeat(Math.round(b.avg_rating))}{'☆'.repeat(5 - Math.round(b.avg_rating))} ({b.avg_rating})
                </div>
              )}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '6px', width: '100%', textAlign: 'center' }}>
            <a href={process.env.NEXT_PUBLIC_APP_URL || 'https://superscore.com.tr'} target="_blank" rel="noopener noreferrer"
              style={{ color: '#9ca3af', textDecoration: 'none' }}>
              Powered by <span style={{ color: '#1B1F3B', fontWeight: 600 }}>Superscore</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
