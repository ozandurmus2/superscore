'use client';

import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { label: 'Toplanan yorumlar', value: 0 },
  { label: 'Teslim edilen davetiyeler', value: 0 },
  { label: 'Mevcut TrustScore', value: 0 },
];

const starRows = [
  '5 yıldızlı yorumlar',
  '4 yıldızlı yorumlar',
  '3 yıldızlı yorumlar',
  '2 yıldızlı yorumlar',
  '1 yıldızlı yorumlar',
];

function MagnifyingGlassIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const wrapClass = size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const iconClass = size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  return (
    <div className={`${wrapClass} rounded-full bg-gray-100 flex items-center justify-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClass} text-gray-400`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 inline ml-1 opacity-50"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v5M8 5.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AnalitikPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Section 1: Son 28 gündeki performansınız */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 md:px-6 pt-5 pb-0">
          <h2 className="text-base font-bold text-[#1b1a1b] mb-4">
            Son 28 gündeki performansınız
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row border-b border-gray-200">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-1 px-4 md:px-6 py-4 text-left transition-colors border-b sm:border-b-0 sm:border-r border-gray-200 last:border-r-0 last:border-b-0 hover:bg-gray-50 focus:outline-none bg-white"
              style={
                activeTab === i
                  ? { borderTop: '3px solid #3c57bc' }
                  : { borderTop: '3px solid transparent' }
              }
            >
              <p className="text-xs text-gray-500 mb-1">{tab.label}</p>
              <p className="text-2xl font-bold text-[#1b1a1b]">{tab.value}</p>
            </button>
          ))}
        </div>

        {/* Chart area */}
        <div
          className="flex flex-col items-center justify-center gap-3 px-4 md:px-6 py-10"
          style={{ minHeight: '280px' }}
        >
          <MagnifyingGlassIcon size="lg" />
          <p className="text-sm text-gray-400">Bu dönem için sonuç bulunamadı.</p>
        </div>
      </div>

      {/* Section 2: Yıldız dağılımı + Yorum kaynağı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yıldız dağılımı */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <h3 className="text-sm font-bold text-[#1b1a1b] mb-4">Yıldız dağılımı</h3>
          <div className="space-y-3">
            {starRows.map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-32 flex-shrink-0">{label}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-500 w-4 text-right">—</span>
              </div>
            ))}
          </div>
        </div>

        {/* Yorum kaynağı */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
          <h3 className="text-sm font-bold text-[#1b1a1b] mb-4">Yorum kaynağı</h3>
          <div
            className="flex flex-col items-center justify-center gap-2"
            style={{ minHeight: '140px' }}
          >
            <MagnifyingGlassIcon size="sm" />
            <p className="text-sm text-gray-400 mt-2">Bu dönem için sonuç bulunamadı.</p>
          </div>
        </div>
      </div>

      {/* Section 3: Olumsuz yorumlara yanıt */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <h3 className="text-base font-bold text-[#1b1a1b]">
            Son 12 ayda olumsuz yorumlara nasıl yanıt verdiniz
          </h3>
          <Link
            href="#"
            className="text-sm text-[#3c57bc] hover:underline self-start sm:self-auto flex-shrink-0"
          >
            Yanıt ayrıntılarına bakın
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Yanıt oranı */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
            <h4 className="text-sm font-semibold text-[#1b1a1b]">
              Yanıt oranı (genel)
              <InfoIcon />
            </h4>
            <p className="text-2xl font-bold text-[#1b1a1b] mt-2 mb-4">—</p>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-4">
              {['2 yıldızlı yorumlar', '1 yıldızlı yorumlar'].map((label, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{label}</span>
                    <span>—</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Yanıt süresi */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
            <h4 className="text-sm font-semibold text-[#1b1a1b]">
              Yanıt süresi (genel)
              <InfoIcon />
            </h4>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Son 12 ayda olumsuz yoruma yanıt verilmedi.
            </p>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-4">
              {['2 yıldızlı yorumlar', '1 yıldızlı yorumlar'].map((label, i) => (
                <div key={i} className="flex justify-between items-center text-xs text-gray-500">
                  <span>{label}</span>
                  <span>—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Yanıt davranışını iyileştir */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-bold text-[#1b1a1b] mb-3">
          Genel yanıt davranışınızı nasıl iyileştirirsiniz
        </h3>
        <div className="text-sm text-gray-600 leading-relaxed space-y-2">
          <p>
            Ne kadar çok 1 ve 2 yıldızlı yoruma yanıt verirseniz, yanıt oranınız o kadar artar.
          </p>
          <p>
            1 ve 2 yıldızlı yorumlara ne kadar hızlı yanıt verirseniz, yanıt süreniz o kadar azalır.
          </p>
        </div>
      </div>
    </div>
  );
}
