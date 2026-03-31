import Link from 'next/link';

export default function SosyalVarliklarPage() {
  const assets = [
    { name: 'Logo Paketi', desc: 'PNG, SVG, dark/light', icon: '🖼', locked: false },
    { name: 'Sosyal Medya Kiti', desc: 'Cover, post şablonları', icon: '📱', locked: true },
    { name: 'Baskı Malzemeleri', desc: 'Broşür, kartvizit', icon: '🖨', locked: true },
    { name: 'Dijital Rozetler', desc: 'Web site rozeti SVG', icon: '🏅', locked: false },
    { name: 'Kampanya Görselleri', desc: 'Banner ve slider', icon: '🎨', locked: true },
    { name: 'Yorum Kartları', desc: 'Müşteri alıntı kartları', icon: '💬', locked: true },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Asset grid preview */}
        <div className="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-white">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-[#1b1a1b]">Pazarlama Varlıkları</h2>
            <p className="text-xs text-gray-500 mt-0.5">Markanızı güçlendiren hazır materyaller</p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assets.map(asset => (
              <div key={asset.name} className={`flex items-center gap-3 p-3 rounded-xl border ${asset.locked ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white'}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: asset.locked ? '#f3f4f6' : '#f0fdf4' }}>
                  {asset.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1b1a1b] truncate">{asset.name}</p>
                    {asset.locked && (
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-gray-400 flex-shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.055 1.805A2.75 2.75 0 0 1 10.75 3.75v.45h1v-.45a3.75 3.75 0 0 0-7.5 0V7H2v9h12V7H5.25V3.75c0-.73.29-1.429.805-1.945ZM3 15V8h10v7H3Z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{asset.desc}</p>
                </div>
                {!asset.locked ? (
                  <button className="text-xs font-bold px-2.5 py-1.5 rounded-lg text-white flex-shrink-0" style={{ background: '#0e291d' }}>
                    İndir
                  </button>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0" style={{ background: '#f3f4f6', color: '#9ca3af' }}>
                    Kilitli
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade card */}
        <div className="w-full lg:w-80 flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
          <div>
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: '#f0fdf4', color: '#15803d' }}>
              Plus planı gerektirir
            </span>
            <h2 className="text-xl font-bold text-[#1b1a1b] leading-snug mb-2">
              Pazarlama Varlıkları
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Superscore markanızı güçlendiren hazır pazarlama materyallerinin tamamına erişin.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'Tüm sosyal medya şablonlarına erişim',
              'Baskı kalitesinde logo ve marka kiti',
              'Hazır kampanya görselleri',
              'Müşteri alıntı kartları ve rozetler',
              'Sürekli güncellenen materyal kütüphanesi',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#04da8d' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-[#1b1a1b]">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/marka-panel/abonelik"
            className="block w-full text-center py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#0e291d' }}
          >
            Plus planına geç
          </Link>
        </div>
      </div>
    </div>
  );
}
