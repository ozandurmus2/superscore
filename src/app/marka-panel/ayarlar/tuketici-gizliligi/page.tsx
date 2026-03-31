'use client';

import { useState } from 'react';
import Link from 'next/link';

function Radio({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors mt-0.5
        ${checked ? 'border-[#3c57bc]' : 'border-gray-300'}`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#3c57bc]" />}
    </button>
  );
}

export default function TuketiciGizliligePage() {
  const [selected, setSelected] = useState<'specific' | 'before_date' | ''>('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [done, setDone] = useState(false);

  function handleDelete() {
    setDone(true);
    setSelected('');
    setEmail('');
    setDate('');
    setTimeout(() => setDone(false), 3000);
  }

  return (
    <div className="max-w-5xl mx-auto">
    <div className="flex gap-6 items-start">

      {/* ─── Left card ─── */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-base font-bold text-[#1b1a1b] mb-5">Davetiye verilerini sil</p>

        <div className="space-y-4 mb-6">

          {/* Option 1: Belirli müşteriler */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setSelected('specific')}>
              <Radio checked={selected === 'specific'} onChange={() => setSelected('specific')} />
              <span className="text-sm text-[#1b1a1b] leading-relaxed">
                <strong>Belirli müşterilerin</strong> davetiye verilerini silin.
              </span>
            </label>

            {selected === 'specific' && (
              <div className="mt-3 ml-8">
                <label className="block text-xs text-gray-500 mb-1">Müşteri e-posta adresi</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="musteri@ornek.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
                />
              </div>
            )}
          </div>

          {/* Option 2: Belirtilen tarihten önce */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setSelected('before_date')}>
              <Radio checked={selected === 'before_date'} onChange={() => setSelected('before_date')} />
              <span className="text-sm text-[#1b1a1b] leading-relaxed">
                <strong>Belirtilen tarihten önce</strong> oluşturulan tüm davetiyeleri silin.
              </span>
            </label>

            {selected === 'before_date' && (
              <div className="mt-3 ml-8">
                <label className="block text-xs text-gray-500 mb-1">Tarih seçin</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
                />
              </div>
            )}
          </div>
        </div>

        {done && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
            ✓ Veriler başarıyla silindi.
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={!selected || (selected === 'specific' && !email) || (selected === 'before_date' && !date)}
          className="px-6 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Şimdi sil
        </button>
      </div>

      {/* ─── Right card ─── */}
      <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="text-[#3c57bc] font-bold text-lg">§</span>
          </div>
          <p className="text-base font-bold text-[#1b1a1b] leading-snug">
            Davetiyelerin kaldırılmasına ilişkin yönergeler
          </p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Bu özellik, aşağıdaki nedenlerle inceleme daveti verilerini silmenize olanak tanır:
        </p>

        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
            Kişisel verilerin silinmesini talep eden bir kişi
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
            Şirketinizin değerlendirme daveti verileri için 3 yıldan daha kısa bir saklama süresi varsa
          </li>
        </ul>

        <Link href="#" className="text-sm text-[#3c57bc] hover:underline leading-relaxed">
          Tüketici gizliliği hakkında daha fazla bilgiyi burada bulabilirsiniz.
        </Link>
      </div>

    </div>
    </div>
  );
}
