'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ─── Star color logic (matches star-rating.tsx) ─── */
function getStarColor(rating: number): string {
  if (rating <= 0) return '#dcdce5';
  if (rating <= 1.5) return '#eb4b34';
  if (rating <= 2.5) return '#ef8d3f';
  if (rating <= 3.5) return '#f7d047';
  if (rating <= 4) return '#8acd41';
  return '#52b37f';
}

/* ─── Lock icon ─── */
export function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.055 1.805A2.75 2.75 0 0 1 10.75 3.75v.45h1v-.45a3.75 3.75 0 0 0-7.5 0V7H2v9h12V7H5.25V3.75c0-.73.29-1.429.805-1.945ZM3 15V8h10v7H3Z" />
    </svg>
  );
}

/* ─── Stars (matches markalar page design) ─── */
export function Stars({ rating = 4.8, size = 14 }: { rating?: number; size?: number }) {
  const color = getStarColor(rating);
  const emptyColor = '#dcdce5';
  return (
    <div className="flex" style={{ gap: 1.5 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        let fillPct = 0;
        if (rating >= i + 1) fillPct = 100;
        else if (rating >= i + 0.5) fillPct = 50;
        return (
          <div key={i} className="relative overflow-hidden flex-shrink-0" style={{ width: size, height: size, borderRadius: 0 }}>
            <div className="absolute inset-0" style={{ backgroundColor: emptyColor }} />
            {fillPct > 0 && <div className="absolute inset-0" style={{ backgroundColor: color, width: `${fillPct}%` }} />}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/star_icon.png" alt="" style={{ width: size * 0.7, height: size * 0.7, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Placeholder bar ─── */
export function Bar({ w = 'full', h = 2 }: { w?: string; h?: number }) {
  const widths: Record<string, string> = { full: '100%', '3/4': '75%', '2/3': '66%', '1/2': '50%', '1/3': '33%', '1/4': '25%' };
  return <div style={{ height: h, width: widths[w] || w, background: '#d1d5db', borderRadius: 99 }} />;
}

/* ─── Brand logo ─── */
export function Brand({ height = 14, dark = false }: { height?: number; dark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={dark ? '/logo/White_SS.png' : '/logo/Black_SS.png'} alt="Superscore" style={{ height, width: 'auto', objectFit: 'contain', display: 'block' }} />
  );
}

/* ─── Badge ─── */
export function Badge({ label, color }: { label: string; color: 'green' | 'navy' | 'teal' }) {
  const bg = color === 'green' ? '#04da8d' : color === 'navy' ? '#1b3a5c' : '#0e291d';
  return (
    <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm z-10" style={{ background: bg }}>
      {label}
    </span>
  );
}

/* ─── PreviewBox ─── */
export function PreviewBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`} style={{ background: '#eeede8', minHeight: 160, borderRadius: '16px 16px 0 0' }}>
      {children}
    </div>
  );
}

/* ─── WhiteCard ─── */
export function WhiteCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm px-3 py-2.5 w-full ${className}`}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════
   WIDGET EDITOR MODAL
══════════════════════════════════ */

/* Checkerboard SVG pattern as data URL */
const CHECKER_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect width='8' height='8' fill='%23e0e0e0'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23e0e0e0'/%3E%3C/svg%3E"), white`;

interface WidgetMeta {
  name: string;
  description: string;
  about: string;
  sizeDesc: string;
  defaultW: string;
  defaultH: string;
  preview: React.ReactNode;
}

function WidgetEditorModal({ meta, onClose }: { meta: WidgetMeta; onClose: () => void }) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [lang, setLang] = useState('Türkçe');
  const [width, setWidth] = useState(meta.defaultW);
  const [height, setHeight] = useState(meta.defaultH);
  const [bgColor, setBgColor] = useState('');
  const [bgHex, setBgHex] = useState('');
  const [showCode, setShowCode] = useState(false);

  const handleHexChange = (val: string) => {
    setBgHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setBgColor(val);
    else if (/^[0-9A-Fa-f]{6}$/.test(val)) setBgColor('#' + val);
  };

  const handleColorPicker = (val: string) => {
    setBgColor(val);
    setBgHex(val);
  };

  const codeSnippet = `<div class="superscore-widget" data-widget="${meta.name.toLowerCase().replace(/\s+/g, '-')}" data-lang="${lang === 'Türkçe' ? 'tr' : 'en'}" style="width:${width};height:${height}"></div>
<script async src="https://widget.superscore.com/loader.js"></script>`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:rounded-2xl sm:max-w-5xl flex flex-col overflow-hidden"
        style={{ height: '100dvh', maxHeight: '100dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1b1a1b]">{meta.name}</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Lock banner ── */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ background: '#f5f5f3', borderBottom: '1px solid #e5e5e0' }}>
          <div className="flex items-center gap-2 text-sm text-[#1b1a1b]">
            <LockIcon />
            <span>Bu aracı kullanmak için Plus planını edinin.</span>
          </div>
          <Link href="/marka-panel/abonelik" onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ background: '#3c57bc' }}>
            Güncelleme
          </Link>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

          {/* Left sidebar */}
          <div className="w-full md:w-72 flex-shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 p-5 space-y-6">

            {/* Hakkında */}
            <div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Hakkında</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{meta.about}</p>
            </div>

            {/* Desteklenen boyutlar */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Desteklenen boyutlar</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{meta.sizeDesc}</p>
            </div>

            {/* Özelleştirmek */}
            <div className="border-t border-gray-100 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1b1a1b]">Özelleştirmek</h3>
                <button className="text-sm font-medium text-[#3c57bc] hover:underline">Yardıma mı ihtiyacınız var?</button>
              </div>

              {/* Dil */}
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-1.5">Widget dili</label>
                <div className="relative">
                  <select
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#1b1a1b] bg-white pr-8 focus:outline-none focus:border-[#3c57bc]"
                  >
                    {['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca'].map(l => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Boyut */}
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-1.5">Boyut</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-1.5">
                    <span className="text-xs font-bold text-gray-400">W</span>
                    <input
                      className="flex-1 text-sm text-[#1b1a1b] outline-none min-w-0 bg-transparent"
                      value={width}
                      onChange={e => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-1.5">
                    <span className="text-xs font-bold text-gray-400">H</span>
                    <input
                      className="flex-1 text-sm text-[#1b1a1b] outline-none min-w-0 bg-transparent"
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Önizleme arka plan */}
              <div>
                <label className="block text-sm font-semibold text-[#1b1a1b] mb-1">Önizleme</label>
                <p className="text-xs text-gray-500 mb-2 leading-snug">
                  Widget&apos;ınızın okunabilir olduğundan emin olmak için sitenizin arka plan rengini girin.{' '}
                  <button className="text-[#3c57bc] hover:underline">Daha fazla bilgi edinin.</button>
                </p>
                <div className="flex items-center gap-2">
                  {/* Color swatch / transparent indicator */}
                  <label className="w-10 h-10 rounded-lg border border-gray-300 overflow-hidden cursor-pointer relative flex-shrink-0">
                    {bgColor ? (
                      <div className="absolute inset-0" style={{ background: bgColor }} />
                    ) : (
                      /* Diagonal red line = transparent */
                      <div className="absolute inset-0 bg-white">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'linear-gradient(135deg, transparent calc(50% - 1px), #ef4444 calc(50% - 1px), #ef4444 calc(50% + 1px), transparent calc(50% + 1px))',
                        }} />
                      </div>
                    )}
                    <input
                      type="color"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      value={bgColor || '#ffffff'}
                      onChange={e => handleColorPicker(e.target.value)}
                    />
                  </label>
                  <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-1">
                    <span className="text-sm text-gray-400">#</span>
                    <input
                      className="flex-1 text-sm text-[#1b1a1b] outline-none min-w-0 bg-transparent font-mono"
                      placeholder="rrggbb"
                      value={bgHex.replace('#', '')}
                      onChange={e => handleHexChange(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  {bgColor && (
                    <button onClick={() => { setBgColor(''); setBgHex(''); }} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right preview area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Preview header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <span className="text-sm font-semibold text-[#1b1a1b]">Önizleme</span>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
                <button
                  onClick={() => setViewMode('desktop')}
                  className="px-4 py-1.5 font-medium transition-colors"
                  style={{ background: viewMode === 'desktop' ? '#f0f0f0' : 'white', color: viewMode === 'desktop' ? '#1b1a1b' : '#6b7280' }}
                >
                  Masaüstü
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className="px-4 py-1.5 font-medium transition-colors border-l border-gray-200"
                  style={{ background: viewMode === 'mobile' ? '#f0f0f0' : 'white', color: viewMode === 'mobile' ? '#1b1a1b' : '#6b7280' }}
                >
                  Mobil
                </button>
              </div>
            </div>

            {/* Checkerboard preview */}
            <div
              className="flex-1 relative flex items-center justify-center overflow-auto p-8"
              style={{ backgroundImage: CHECKER_BG, backgroundSize: '16px 16px' }}
            >
              {/* Background color overlay */}
              {bgColor && (
                <div className="absolute inset-0" style={{ background: bgColor }} />
              )}

              {/* Widget preview scaled */}
              <div
                className="relative z-10 flex items-center justify-center"
                style={{
                  width: viewMode === 'mobile' ? 320 : 580,
                  minHeight: 120,
                  transition: 'width 0.3s ease',
                }}
              >
                <div style={{ transform: 'scale(1.6)', transformOrigin: 'center', width: 200 }}>
                  {meta.preview}
                </div>
              </div>
            </div>

            {/* Code snippet panel */}
            {showCode && (
              <div className="border-t border-gray-100 p-5 flex-shrink-0" style={{ background: '#f8f7f2' }}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Kurulum Kodu</p>
                <pre className="text-xs text-gray-700 bg-white border border-gray-200 rounded-xl p-4 overflow-x-auto select-all font-mono leading-relaxed whitespace-pre-wrap break-all">
                  {codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
          <button
            onClick={() => setShowCode(v => !v)}
            className="text-sm font-medium text-[#3c57bc] hover:underline"
          >
            {showCode ? 'Kodu gizle' : 'Kodu önizle'}
          </button>
          <button
            onClick={() => setShowCode(true)}
            className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors"
            style={{ background: '#e5e7eb', color: '#6b7280', cursor: 'default' }}
          >
            Kodu al
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   WIDGET CARD
══════════════════════════════════ */
export function WidgetCard({
  name,
  preview,
  badge,
  description = 'Superscore widget\'ı web sitenize ekleyin.',
  about,
  sizeDesc = 'Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel',
  defaultW = '100%',
  defaultH = '28px',
}: {
  name: string;
  preview: React.ReactNode;
  badge?: { label: string; color: 'green' | 'navy' | 'teal' };
  description?: string;
  about?: string;
  sizeDesc?: string;
  defaultW?: string;
  defaultH?: string;
}) {
  const [open, setOpen] = useState(false);

  const meta: WidgetMeta = {
    name,
    description,
    about: about || description,
    sizeDesc,
    defaultW,
    defaultH,
    preview,
  };

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <div className="relative">
          {preview}
          {badge && <Badge label={badge.label} color={badge.color} />}
        </div>
        <div className="px-4 py-3 flex items-center gap-2 border-t border-gray-100">
          <LockIcon />
          <span className="text-sm font-medium text-[#1b1a1b] flex-1">{name}</span>
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {open && (
        <WidgetEditorModal meta={meta} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

/* ══════════════════════════════════
   SECTION LAYOUT
══════════════════════════════════ */
export function Section({ title, description, children, cols = 3 }: {
  title: string;
  description: string;
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 flex-shrink-0">
          <h2 className="text-base font-bold text-[#1b1a1b] mb-2">{title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
        <div className={`flex-1 grid gap-4 ${cols === 1 ? 'grid-cols-1 max-w-xs' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   WIDGET PREVIEWS
══════════════════════════════════ */

export function PreviewEsnek() {
  return (
    <PreviewBox>
      <div className="w-full space-y-1.5">
        <Bar w="3/4" h={6} />
        <Bar w="1/2" h={6} />
        <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 mt-2">
          <img src="/logo/star_icon.png" alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
          <div>
            <div className="text-[9px] font-bold text-gray-700">Harika Değerlendirildi</div>
            <Stars rating={4.8} size={10} />
          </div>
          <Brand height={11} />
        </div>
        <Bar w="full" h={6} />
        <Bar w="2/3" h={6} />
      </div>
      <span className="absolute top-3 right-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm" style={{ background: '#04da8d' }}>Yeni</span>
    </PreviewBox>
  );
}

export function PreviewMikroInceleme() {
  return (
    <PreviewBox>
      <WhiteCard className="flex items-center justify-center py-3">
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-[9px] text-gray-600">İncelemelerimize bakın</span>
          <Brand height={11} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewYatay() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <span className="text-[9px] font-bold text-gray-800">Mükemmel</span>
          <Stars rating={4.8} size={10} />
          <span className="text-[9px] text-gray-500">4.8</span>
          <Brand height={11} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewMikroDugme() {
  return (
    <PreviewBox>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ background: '#04da8d' }}>
          <Brand height={11} dark={false} />
        </div>
        <span className="text-[9px] text-gray-500">2.1K yorum</span>
      </div>
    </PreviewBox>
  );
}

export function PreviewMikroKombinasyon() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-bold">Mükemmel</span>
          <Stars rating={4.8} size={9} />
          <span className="text-[8px] text-gray-500">İncelemelerimize bakın</span>
          <Brand height={10} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewMikroYildiz() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-[9px] font-bold">Mükemmel</span>
          <Stars rating={4.8} size={10} />
          <Brand height={11} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewMikroGuven() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-1.5 justify-center flex-wrap">
          <span className="text-[9px] font-bold">Mükemmel</span>
          <span className="text-[9px] font-bold text-gray-700">4.8/5</span>
          <Brand height={11} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewMini() {
  return (
    <PreviewBox>
      <WhiteCard className="text-center space-y-1.5">
        <div className="flex justify-center"><Brand height={13} /></div>
        <div className="flex justify-center"><Stars rating={4.8} size={12} /></div>
        <div className="flex gap-1.5 justify-center">
          <Bar w="1/3" h={7} />
          <Bar w="1/4" h={7} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewBaslangic() {
  return (
    <PreviewBox>
      <WhiteCard className="text-center space-y-2">
        <div className="flex justify-center"><Stars rating={4.8} size={14} /></div>
        <div className="flex justify-center"><Brand height={13} /></div>
        <div className="rounded px-3 py-1.5 text-[8px] font-bold text-white" style={{ background: '#1b1a1b' }}>
          Değerlendirme Bırakın
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewIncelemeTopla() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-2">
        <Bar w="2/3" h={6} />
        <Bar w="1/2" h={5} />
        <div className="border-2 border-[#04da8d] rounded px-3 py-1.5 flex items-center gap-1.5 w-fit mx-auto">
          <span className="text-[9px] font-bold text-[#1b1a1b]">Bizi değerlendirin</span>
          <Brand height={10} />
        </div>
        <div className="flex gap-2 justify-center">
          <Bar w="1/3" h={5} />
          <Bar w="1/4" h={5} />
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewAtlikarinca() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Bar w="1/3" h={5} />
          <Stars rating={4.8} size={10} />
        </div>
        <Bar w="1/2" h={5} />
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">‹</span>
          <div className="flex-1 border border-gray-100 rounded px-2 py-1.5 space-y-1">
            <Bar w="3/4" h={4} />
            <Bar w="1/2" h={4} />
          </div>
          <span className="text-gray-400 text-xs">›</span>
        </div>
        <div className="flex justify-center"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewYikilmak() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Stars rating={4.8} size={12} />
          <svg viewBox="0 0 12 8" fill="none" className="w-3 h-3"><path d="M1 1l5 5 5-5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </div>
        <div className="flex gap-1"><Stars rating={4.8} size={8} /><Bar w="2/3" h={4} /></div>
        <div className="flex gap-1"><Stars rating={4.0} size={8} /><Bar w="1/2" h={4} /></div>
        <div className="flex gap-1"><Stars rating={4.8} size={8} /><Bar w="3/4" h={4} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewIzgara() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1">
        <div className="flex justify-between items-center mb-1">
          <Brand height={10} />
          <Stars rating={4.8} size={8} />
        </div>
        {[0, 1].map(r => (
          <div key={r} className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map(c => (
              <div key={c} className="space-y-0.5">
                <Stars rating={4.8} size={6} />
                <Bar w="full" h={3} />
                <Bar w="2/3" h={3} />
              </div>
            ))}
          </div>
        ))}
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewListe() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-2">
        <Stars rating={4.8} size={12} />
        {[4.8, 4.0, 4.8].map((s, i) => (
          <div key={i} className="space-y-0.5 border-t border-gray-100 pt-1.5">
            <Stars rating={s} size={8} />
            <Bar w="3/4" h={3} />
            <Bar w="1/2" h={3} />
          </div>
        ))}
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewListeFiltre() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <Stars rating={4.8} size={12} />
        <div className="flex gap-1">
          <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Pozitif</span>
          <span className="text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full font-medium">Negatif</span>
        </div>
        {[4.8, 4.0].map((s, i) => (
          <div key={i} className="space-y-0.5 border-t border-gray-100 pt-1">
            <Stars rating={s} size={8} />
            <Bar w="3/4" h={3} />
            <Bar w="1/2" h={3} />
          </div>
        ))}
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewMiniAtliKarusel() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-xs flex-shrink-0">‹</span>
          <div className="flex-1 space-y-1">
            <Stars rating={4.8} size={10} />
            <Brand height={11} />
            <Bar w="3/4" h={4} />
            <Bar w="1/2" h={4} />
          </div>
          <span className="text-gray-400 text-xs flex-shrink-0">›</span>
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewAnidenBelir() {
  return (
    <PreviewBox>
      <div className="w-full rounded-lg p-3 space-y-1.5" style={{ background: '#1b1a1b' }}>
        <Stars rating={4.8} size={12} />
        <Stars rating={4.8} size={8} />
        <Bar w="3/4" h={4} />
        <Bar w="1/2" h={4} />
        <div className="flex justify-start pt-1"><Brand height={11} dark={true} /></div>
      </div>
    </PreviewBox>
  );
}

export function PreviewAlinti() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-2">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex items-start gap-1.5">
            <span className="text-gray-400 text-sm font-serif leading-none mt-0.5">"</span>
            <div className="flex-1 space-y-0.5">
              <Bar w="full" h={4} />
              <Bar w="2/3" h={4} />
            </div>
          </div>
        ))}
        <div className="pt-1 flex justify-end"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewKaydirici() {
  return (
    <PreviewBox>
      <WhiteCard>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-xs">‹</span>
          <div className="flex-1 grid grid-cols-2 gap-1">
            {[0, 1].map(i => (
              <div key={i} className="space-y-0.5">
                <Stars rating={4.8} size={7} />
                <Bar w="full" h={3} />
                <Bar w="3/4" h={3} />
              </div>
            ))}
          </div>
          <span className="text-gray-400 text-xs">›</span>
        </div>
        <div className="flex justify-center mt-2"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunMini() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex items-center gap-1">
          <Stars rating={4.8} size={10} />
          <svg viewBox="0 0 12 8" fill="none" className="w-3 h-2.5"><path d="M1 1l5 5 5-5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </div>
        <div className="space-y-1">
          {[{ w: 'full', color: '#04da8d' }, { w: '3/4', color: '#8acd41' }, { w: '1/2', color: '#ef8d3f' }].map((row, i) => (
            <div key={i} className="flex items-center gap-1">
              <Bar w={row.w} h={4} />
              <div className="w-2 h-1 rounded-full flex-shrink-0" style={{ background: row.color }} />
            </div>
          ))}
        </div>
        <div className="flex justify-start pt-0.5"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunMiniCoklu() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex items-center gap-1">
          <Stars rating={4.8} size={10} />
          <svg viewBox="0 0 12 8" fill="none" className="w-3 h-2.5"><path d="M1 1l5 5 5-5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1"><Bar w="full" h={4} /><div className="w-2 h-1 rounded-full flex-shrink-0" style={{ background: '#04da8d' }} /></div>
          <div className="flex items-center gap-1"><Bar w="2/3" h={4} /><div className="w-2 h-1 rounded-full flex-shrink-0" style={{ background: '#f87171' }} /></div>
        </div>
        <div className="flex items-center gap-1.5 mt-1"><Brand height={10} /><span className="text-[8px] text-gray-400">+2 kaynak</span></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunSoruCevap() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="px-2 py-1 rounded text-[8px] font-bold text-white w-fit" style={{ background: '#3c57bc' }}>Soru Sor</div>
        <div className="w-1 h-8 rounded-full ml-2" style={{ background: '#e5e7eb' }} />
        <Bar w="full" h={4} />
        <Bar w="2/3" h={4} />
        <div className="flex justify-start"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunIncelemeleri() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex items-center gap-1">
          <Stars rating={4.8} size={9} />
          <Bar w="1/4" h={4} />
        </div>
        {[0, 1, 2].map(i => (
          <div key={i} className="space-y-0.5 border-t border-gray-100 pt-1">
            <Stars rating={4.8} size={7} />
            <Bar w={i === 0 ? 'full' : i === 1 ? '3/4' : '1/2'} h={4} />
          </div>
        ))}
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunDongu() {
  return (
    <PreviewBox>
      <div className="w-full space-y-1">
        <Bar w="2/3" h={5} />
        <Bar w="1/2" h={5} />
        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 space-y-1">
          <Stars rating={4.8} size={9} />
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-xs">‹</span>
            <div className="flex-1 space-y-0.5">
              <Bar w="full" h={3} />
              <Brand height={10} />
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>
        </div>
      </div>
    </PreviewBox>
  );
}

export function PreviewUrunGaleri() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Brand height={10} />
          <Stars rating={4.8} size={8} />
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          {['#8b9e8b', '#7a8f7a', '#6d826d', '#94a694', '#849484', '#758575'].map((bg, i) => (
            <div key={i} className="h-8 rounded-sm" style={{ background: bg }} />
          ))}
        </div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunMulti() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1">
        <div className="flex items-center gap-1"><Stars rating={4.8} size={9} /><Bar w="1/4" h={3} /></div>
        <Bar w="full" h={4} />
        <Bar w="3/4" h={4} />
        <Bar w="1/2" h={4} />
        <div className="flex justify-start mt-1"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunSEOCoklu() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1">
        <div className="flex items-center gap-1"><Stars rating={4.8} size={9} /><Bar w="1/4" h={3} /></div>
        <Bar w="full" h={4} />
        <Bar w="2/3" h={4} />
        <Bar w="3/4" h={4} />
        <div className="flex items-center gap-1.5 mt-0.5"><Brand height={10} /><Bar w="1/4" h={3} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}

export function PreviewUrunSEO() {
  return (
    <PreviewBox>
      <WhiteCard className="space-y-1">
        <div className="flex items-center gap-1"><Stars rating={4.8} size={9} /><Bar w="1/4" h={3} /></div>
        <Bar w="full" h={4} />
        <Bar w="2/3" h={4} />
        <Bar w="1/2" h={4} />
        <Bar w="3/4" h={4} />
        <div className="flex justify-start mt-0.5"><Brand height={10} /></div>
      </WhiteCard>
    </PreviewBox>
  );
}
