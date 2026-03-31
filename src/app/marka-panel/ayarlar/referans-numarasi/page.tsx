'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';

const refTypes = [
  'Sipariş numarası',
  'Fatura numarası',
  'Müşteri numarası',
  'Rezervasyon numarası',
  'Referans numarası',
  'Diğer (özel)',
];

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

/* Star rating mockup */
function Stars({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <div key={s} className={`w-8 h-8 rounded flex items-center justify-center ${s <= count ? 'bg-[#c2e8d2]' : 'bg-gray-100'}`}>
          <svg className={`w-4 h-4 ${s <= count ? 'text-[#00b67a]' : 'text-gray-300'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function ReferansNumarasiPage() {
  const [wantsRef, setWantsRef] = useState(true);
  const [refType, setRefType] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'reviewer' | 'you'>('reviewer');

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-6 items-start">

        {/* ─── Left card ─── */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-[#1b1a1b] mb-2">
            Organik yorumları gerçek müşteri deneyimleriyle ilişkilendirin.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            Organik yorumların her birinin gerçek bir deneyime dayanmasını sağlamak için, yorum yazarken yorumculardan sizin seçtiğiniz bir referans numarası vermelerini isteyin. Yorumcular referans numarasını paylaşmak isteyip istemediklerine kendileri karar verebilirler.
          </p>

          {/* Radio: Hayır */}
          <div className="mb-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <Radio checked={!wantsRef} onChange={() => setWantsRef(false)} />
              <span className="text-sm text-[#1b1a1b] leading-relaxed">
                Hayır teşekkürler, değerlendiricilerden referans numarası istemiyorum.
              </span>
            </label>
          </div>

          {/* Radio: Evet */}
          <div className="mb-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <Radio checked={wantsRef} onChange={() => setWantsRef(true)} />
              <span className="text-sm text-[#1b1a1b] leading-relaxed">
                Evet lütfen, değerlendiricilerin referans numarası vermelerini rica ediyorum.
              </span>
            </label>
          </div>

          {/* Dropdown: type selector */}
          {wantsRef && (
            <div className="mb-6">
              <p className="text-sm text-[#1b1a1b] mb-2">Ne tür bir referans numarası talep etmek istersiniz?</p>
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  onBlur={() => setTimeout(() => setOpenDropdown(false), 150)}
                  className={`w-full flex items-center justify-between border-2 rounded-xl px-4 py-3 text-sm text-left transition-colors ${openDropdown ? 'border-[#3c57bc]' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <span className={refType ? 'text-[#1b1a1b]' : 'text-gray-400'}>
                    {refType || 'Bir seçenek seçin'}
                  </span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${openDropdown ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {openDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                    {refTypes.map(t => (
                      <button
                        key={t}
                        onMouseDown={() => { setRefType(t); setOpenDropdown(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${refType === t ? 'bg-blue-50 text-[#3c57bc] font-medium' : 'text-[#1b1a1b]'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Save button */}
          <button
            onClick={save}
            className="px-8 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors"
          >
            {saved ? '✓ Kaydedildi' : 'Kaydetmek'}
          </button>
        </div>

        {/* ─── Right card: preview ─── */}
        <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('reviewer')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'reviewer' ? 'text-[#3c57bc] border-b-2 border-[#3c57bc]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Değerlendiren
            </button>
            <button
              onClick={() => setActiveTab('you')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'you' ? 'text-[#3c57bc] border-b-2 border-[#3c57bc]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sen
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'reviewer' ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 text-center">
                  Referans numarası, yorum yazarken yorumcuların doldurması istenen ek bir alan olacaktır.
                </p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
                  {/* Stars */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Son deneyiminizi değerlendirin</p>
                    <Stars count={4} />
                  </div>
                  {/* Text area */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Bize deneyimlerinizi anlatın.</p>
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 min-h-[60px]">
                      <p className="text-xs text-gray-600 leading-relaxed">Çok yardımcı oldular ve ihtiyacım olanı sorunsuz bir şekilde hallettiler.</p>
                    </div>
                  </div>
                  {/* Title */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Yorumunuza bir başlık verin.</p>
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                      <p className="text-xs text-[#1b1a1b]">İyi hizmet</p>
                      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pencil className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  {/* Reference field (if enabled) */}
                  {wantsRef && refType && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">{refType} (isteğe bağlı)</p>
                      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                        <p className="text-xs text-gray-400">örn. 12345</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Yönetici olarak referans numaralarını kontrol panelinizden görüntüleyebilirsiniz.
                </p>
                <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[#1b1a1b]">Referans No</p>
                    <p className="text-xs text-[#3c57bc]">Filtrele</p>
                  </div>
                  {['12345', '67890', '11223'].map(ref => (
                    <div key={ref} className="flex items-center gap-2 py-1.5 border-t border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      <p className="text-xs text-gray-600">#{ref}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
