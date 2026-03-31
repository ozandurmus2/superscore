'use client';

import { useState } from 'react';
import Link from 'next/link';

const LAYOUTS = [
  {
    id: 'a',
    preview: (
      <div className="w-full p-2 space-y-1">
        {/* Wide newsletter - horizontal */}
        <div className="w-full h-3 bg-gray-100 rounded" />
        <div className="flex gap-1">
          <div className="flex-1 space-y-0.5">
            <div className="h-1 w-full bg-gray-100 rounded-full" />
            <div className="h-1 w-4/5 bg-gray-100 rounded-full" />
            <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-0.5 pt-0.5">
          <span className="text-[5px] font-bold text-gray-600">Mükemmel</span>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5" style={{ background: '#52b37f' }} />
          ))}
          <span className="text-[5px] text-gray-400">8.155 yorum</span>
          <img src="/logo/Black_SS.png" alt="" style={{ height: 5, width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'b',
    preview: (
      <div className="w-full p-2 space-y-1">
        {/* Two columns */}
        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-0.5">
            <div className="h-1.5 w-full bg-gray-100 rounded" />
            <div className="h-1 w-4/5 bg-gray-100 rounded-full" />
            <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1.5 w-full bg-gray-100 rounded" />
            <div className="h-1 w-4/5 bg-gray-100 rounded-full" />
            <img src="/logo/Black_SS.png" alt="" style={{ height: 5, width: 'auto', objectFit: 'contain' }} />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5" style={{ background: '#52b37f' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'c',
    preview: (
      <div className="w-full p-2 space-y-1">
        {/* Stacked with reviews */}
        <div className="h-1.5 w-full bg-gray-100 rounded" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2" style={{ background: '#52b37f' }} />
          ))}
          <span className="text-[5px] font-bold text-gray-500 ml-0.5">4.8</span>
        </div>
        <div className="space-y-0.5 border-t border-gray-100 pt-0.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="space-y-0.5">
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <div key={j} className="w-1 h-1" style={{ background: '#52b37f' }} />)}</div>
              <div className="h-0.5 w-3/4 bg-gray-100 rounded-full" />
            </div>
          ))}
        </div>
        <img src="/logo/Black_SS.png" alt="" style={{ height: 5, width: 'auto', objectFit: 'contain' }} />
      </div>
    ),
  },
];

export default function EpostaBultenPage() {
  const [selectedLayout, setSelectedLayout] = useState('a');
  const [konum, setKonum] = useState('Tüm konumlar');
  const [renk, setRenk] = useState('light');
  const [dil, setDil] = useState('Türkçe');
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="w-full max-w-5xl space-y-4">

      {/* Lock banner */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4">
          <p className="text-sm text-[#1b1a1b] leading-snug">
            <strong>Bu özellik Gelişmiş</strong> planın bir parçasıdır , bu nedenle erişmek için hesabınızı yükseltmeniz gerekecektir.
          </p>
          <Link
            href="/marka-panel/abonelik"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: '#0e291d' }}
          >
            Erişim için yüksteltin.
          </Link>
        </div>
        <div className="border-t border-gray-100 px-5 py-2.5">
          <button
            onClick={() => setShowFeatures(v => !v)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            Tüm Gelişmiş özellikleri göster
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`w-3.5 h-3.5 transition-transform ${showFeatures ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" />
            </svg>
          </button>
          {showFeatures && (
            <ul className="mt-3 mb-1 space-y-1.5">
              {[
                "18 web sitesi widget'ı",
                'E-posta imzası ve bülten widget\'ları',
                'Sosyal medya görsel ve video oluşturucu',
                'Gelişmiş analitik ve bulgular',
                'Özelleştirilebilir davetiyeler',
                'Duygu analizi',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#04da8d' }}>
                    <svg viewBox="0 0 12 12" fill="none" className="w-2 h-2">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        Gönderdiğiniz her bültenle Güven Puanınıza dikkat çekin. TrustBox, özellikle e-posta pazarlaması ve bültenler için optimize edilmiştir ve dinamiktir, bu nedenle her zaman mevcut Güven Puanınıza göre belirlenir.
      </p>

      {/* Main 2-column */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Left: Newsletter preview */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-4 md:p-8" style={{ background: '#f8f7f2', minHeight: 360 }}>
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Newsletter top image placeholder */}
              <div className="w-full h-16 bg-gray-200" />
              {/* Content area */}
              <div className="p-5 space-y-3">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-3/4 bg-gray-200 rounded-full" />
                  <div className="h-2 w-full bg-gray-100 rounded-full" />
                  <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
                </div>

                {/* TrustBox strip - newsletter style */}
                <div className="py-4 flex flex-col items-center gap-2 border-y border-gray-100">
                  <p className="text-sm font-bold text-[#1b1a1b]">
                    <span className="font-bold">Mükemmel</span>
                    {' '}
                    <span style={{ display: 'inline-flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ display: 'inline-block', width: 18, height: 18, background: '#52b37f' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/logo/star_icon.png" alt="" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
                        </span>
                      ))}
                    </span>
                    {' '}based on <strong>8.155</strong> reviews
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/Black_SS.png" alt="Superscore" style={{ height: 18, width: 'auto', objectFit: 'contain' }} />
                </div>

                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-gray-100 rounded-full" />
                  <div className="h-2 w-4/5 bg-gray-100 rounded-full" />
                </div>
              </div>
              {/* Bottom footer */}
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                <div className="h-2 w-1/2 bg-gray-200 rounded-full mx-auto" />
              </div>
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="px-6 py-4 border-t border-gray-100">
            <Link
              href="/marka-panel/abonelik"
              className="inline-block px-5 py-2 rounded-full text-sm font-semibold"
              style={{ background: '#e8e8e8', color: '#6b7280' }}
            >
              Erişim için yüksteltin.
            </Link>
          </div>

          {/* How it works */}
          <div className="mx-5 mb-5 rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-bold text-[#1b1a1b] mb-1">Nasıl çalışır?</p>
            <p className="text-sm text-gray-600">
              <em>&quot;Kodu Al&quot;</em>ya tıklayın , kodu e-posta şablonunun HTML düzenleyicisine yapıştırın ve değişikliklerinizi kaydedin. Müşterilerinize göndermeden önce kendinize bir test bülteni göndermenizi öneririz.{' '}
              <button className="text-[#3c57bc] hover:underline">Daha fazla bilgi edinin.</button>
            </p>
          </div>
        </div>

        {/* Right: Design + Settings */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-4">

          {/* Layout picker */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-[#1b1a1b] mb-3">Tasarım ve düzenleme</h3>
            <div className="grid grid-cols-2 gap-2">
              {LAYOUTS.map((layout, idx) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`rounded-xl overflow-hidden bg-white transition-all hover:shadow-sm ${idx === 2 ? 'col-span-1' : ''}`}
                  style={{
                    border: `2px solid ${selectedLayout === layout.id ? '#3c57bc' : '#e5e7eb'}`,
                    minHeight: 80,
                  }}
                >
                  {layout.preview}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#1b1a1b]">Ayarlar</h3>

            {/* Konum */}
            <div>
              <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Konum</label>
              <div className="relative">
                <select value={konum} onChange={e => setKonum(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#1b1a1b] bg-white pr-8 focus:outline-none focus:border-[#3c57bc]">
                  {['Tüm konumlar', 'Türkiye', 'İstanbul', 'Ankara'].map(o => <option key={o}>{o}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Renk teması */}
            <div>
              <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Renk teması</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setRenk('light')}
                  className="flex-1 py-2.5 rounded-lg border-2 flex items-center justify-center transition-colors"
                  style={{ borderColor: renk === 'light' ? '#3c57bc' : '#e5e7eb', background: '#fff' }}
                >
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-3 h-3 rounded-sm border border-gray-300" style={{ background: '#f5f5f5' }} />)}
                  </div>
                </button>
                <button
                  onClick={() => setRenk('dark')}
                  className="flex-1 py-2.5 rounded-lg border-2 flex items-center justify-center transition-colors"
                  style={{ borderColor: renk === 'dark' ? '#3c57bc' : '#e5e7eb', background: '#1b1a1b' }}
                >
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-3 h-3 rounded-sm" style={{ background: '#333' }} />)}
                  </div>
                </button>
              </div>
            </div>

            {/* Dil */}
            <div>
              <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Dil</label>
              <div className="relative">
                <select value={dil} onChange={e => setDil(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#1b1a1b] bg-white pr-8 focus:outline-none focus:border-[#3c57bc]">
                  {['Türkçe', 'İngilizce', 'Almanca', 'Fransızca'].map(o => <option key={o}>{o}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <button
              className="w-full py-2.5 rounded-full text-sm font-bold cursor-default"
              style={{ background: '#e5e7eb', color: '#9ca3af' }}
            >
              Kodu Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
