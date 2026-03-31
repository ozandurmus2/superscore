'use client';

import { useState } from 'react';
import Link from 'next/link';

const LAYOUTS = [
  {
    id: 'a',
    preview: (
      <div className="w-full p-2 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-0.5 flex-1">
            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full" />
        <div className="h-1 w-4/5 bg-gray-100 rounded-full" />
        <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
        <div className="pt-1 space-y-0.5">
          <div className="text-[5px] text-gray-400">İncelemelerimize bakın</div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 flex-shrink-0" style={{ background: '#52b37f' }} />
            ))}
          </div>
          <img src="/logo/Black_SS.png" alt="" style={{ height: 7, width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'b',
    preview: (
      <div className="w-full p-2 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-0.5 flex-1">
            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full" />
        <div className="h-1 w-2/3 bg-gray-100 rounded-full" />
        <div className="pt-1 flex items-center gap-1 flex-wrap">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2" style={{ background: '#52b37f' }} />
            ))}
          </div>
          <span className="text-[5px] font-bold text-gray-600">4.8/5</span>
          <img src="/logo/Black_SS.png" alt="" style={{ height: 7, width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'c',
    preview: (
      <div className="w-full p-2 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-0.5 flex-1">
            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full" />
        <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
        <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
        <div className="pt-1 flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 w-fit">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5" style={{ background: '#52b37f' }} />
            ))}
          </div>
          <img src="/logo/Black_SS.png" alt="" style={{ height: 6, width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'd',
    preview: (
      <div className="w-full p-2 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="space-y-0.5 flex-1">
            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-1 w-1/2 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full" />
        <div className="flex items-center gap-1 pt-0.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5" style={{ background: '#52b37f' }} />
            ))}
          </div>
          <span className="text-[5px] text-gray-500">Mükemmel</span>
          <img src="/logo/Black_SS.png" alt="" style={{ height: 6, width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    ),
  },
];

export default function EpostaImzaPage() {
  const [selectedLayout, setSelectedLayout] = useState('c');
  const [konum, setKonum] = useState('Tüm konumlar');
  const [dil, setDil] = useState('Türkçe');
  const [istemci, setIstemci] = useState('Gmail');
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
        İmzanıza güvenin ve gönderdiğiniz her e-postayla olumlu itibarınızı destekleyin. İmza dinamiktir ve{' '}
        <em>her zaman mevcut Güven Puanınıza (TrustScore) göre belirlenir.</em>
      </p>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Left: Preview */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 md:p-10" style={{ background: '#f8f7f2', minHeight: 280 }}>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-sm p-5 space-y-3">
              {/* Email header */}
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="h-2.5 w-28 bg-gray-200 rounded-full" />
                  <div className="h-2 w-40 bg-gray-100 rounded-full" />
                </div>
              </div>
              {/* Body bars */}
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-gray-100 rounded-full" />
                <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
                <div className="h-2 w-4/5 bg-gray-100 rounded-full" />
                <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
              </div>
              {/* Signature name lines */}
              <div className="pt-1 space-y-1">
                <div className="h-2 w-24 bg-gray-200 rounded-full" />
                <div className="h-2 w-32 bg-gray-100 rounded-full" />
              </div>
              {/* TrustBox signature strip */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-1.5">
                  İncelemelerimize bakın <strong>1.376</strong> yorum
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: '#52b37f' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo/star_icon.png" alt="" style={{ width: 12, height: 12, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
                      </div>
                    ))}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo/Black_SS.png" alt="Superscore" style={{ height: 16, width: 'auto', objectFit: 'contain' }} />
                </div>
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

          {/* How to */}
          <div className="mx-5 mb-5 rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-[#1b1a1b] italic mb-1">
              Gmail&apos;e TrustBox nasıl eklenir?
            </p>
            <p className="text-sm text-gray-600">
              <em>&quot;TrustBox&apos;ı Kopyala&quot;</em>ya tıklayın ve imza düzenleyicinize yapıştırın.
            </p>
            <button className="text-sm text-[#3c57bc] hover:underline mt-1">
              Adım adım talimatları alın.
            </button>
          </div>
        </div>

        {/* Right: Design + Settings */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-4">

          {/* Layout picker */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-[#1b1a1b] mb-3">Tasarım ve düzeni seçin.</h3>
            <div className="grid grid-cols-2 gap-2">
              {LAYOUTS.map(layout => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className="rounded-xl overflow-hidden bg-white transition-all hover:shadow-sm"
                  style={{
                    border: `2px solid ${selectedLayout === layout.id ? '#3c57bc' : '#e5e7eb'}`,
                    minHeight: 88,
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

            {[
              { label: 'Konum', value: konum, set: setKonum, opts: ['Tüm konumlar', 'Türkiye', 'İstanbul', 'Ankara'] },
              { label: 'Dil', value: dil, set: setDil, opts: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca'] },
              { label: 'E-posta istemcisi', value: istemci, set: setIstemci, opts: ['Gmail', 'Outlook', 'Apple Mail', 'Thunderbird'] },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">{field.label}</label>
                <div className="relative">
                  <select
                    value={field.value}
                    onChange={e => field.set(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#1b1a1b] bg-white pr-8 focus:outline-none focus:border-[#3c57bc]"
                  >
                    {field.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}

            <button
              className="w-full py-2.5 rounded-full text-sm font-bold cursor-default"
              style={{ background: '#e5e7eb', color: '#9ca3af' }}
            >
              TrustBox&apos;ı Kopyala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
