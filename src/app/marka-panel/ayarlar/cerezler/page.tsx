'use client';

import { useState } from 'react';

type CookieCategory = {
  key: string;
  title: string;
  description: string;
  required: boolean;
};

const categories: CookieCategory[] = [
  {
    key: 'essential',
    title: 'Zorunlu çerezler',
    description: 'Platformun çalışması için gereklidir. Bu çerezler devre dışı bırakılamaz.',
    required: true,
  },
  {
    key: 'functional',
    title: 'İşlevsel çerezler',
    description: 'Tercihlerinizi ve oturum bilgilerinizi hatırlamak için kullanılır.',
    required: false,
  },
  {
    key: 'analytics',
    title: 'Analitik çerezler',
    description: 'Platformu nasıl kullandığınızı anlamamıza ve geliştirmemize yardımcı olur.',
    required: false,
  },
  {
    key: 'marketing',
    title: 'Pazarlama çerezleri',
    description: 'İlgi alanlarınıza göre kişiselleştirilmiş içerik ve reklamlar için kullanılır.',
    required: false,
  },
];

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#0e291d]' : 'bg-gray-300'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function CerezlerPage() {
  const [prefs, setPrefs] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  function save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_prefs', JSON.stringify(prefs));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function acceptAll() {
    setPrefs({ essential: true, functional: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    setPrefs({ essential: true, functional: false, analytics: false, marketing: false });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#1b1a1b] mb-1">Çerezler</h1>
      <p className="text-sm text-gray-500 mb-8">Çerez tercihlerinizi yönetin. Zorunlu çerezler her zaman etkindir.</p>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={acceptAll}
          className="px-4 py-2 bg-[#0e291d] text-white text-sm font-medium rounded-full hover:bg-[#1a3d2b] transition-colors"
        >
          Tümünü kabul et
        </button>
        <button
          onClick={rejectAll}
          className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
        >
          Yalnızca zorunluları kabul et
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
        <ul>
          {categories.map((cat, idx) => (
            <li key={cat.key} className={`flex items-start justify-between gap-6 px-6 py-5 ${idx < categories.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-[#1b1a1b]">{cat.title}</p>
                  {cat.required && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Zorunlu</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
              </div>
              <Toggle
                checked={prefs[cat.key as keyof typeof prefs]}
                onChange={v => setPrefs(p => ({ ...p, [cat.key]: v }))}
                disabled={cat.required}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={save}
          className="px-5 py-2 bg-[#1b1a1b] text-white text-sm font-medium rounded-full hover:bg-[#333] transition-colors"
        >
          {saved ? 'Kaydedildi ✓' : 'Tercihlerimi kaydet'}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Çerez tercihleriniz tarayıcınızda saklanır. Tarayıcı verilerini temizlerseniz tercihleriniz sıfırlanabilir.
      </p>
    </div>
  );
}
