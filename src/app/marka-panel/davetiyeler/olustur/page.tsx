'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const integrations = [
  { id: 'superscore', name: 'Superscore', logo: '/logo/White_SS.png', isDark: true },
  { id: 'shopify', name: 'Shopify', logo: '/icons/integrations/shopify.svg' },
  { id: 'magento', name: 'Adobe Commerce\n(Magento V2)', logo: '/icons/integrations/magento.svg' },
  { id: 'bigcommerce', name: 'BigCommerce', logo: '/icons/integrations/bigcommerce.svg' },
  { id: 'wordpress', name: 'Wordpress', logo: '/icons/integrations/wordpress.svg' },
  { id: 'woocommerce', name: 'WooCommerce', logo: '/icons/integrations/woocommerce.svg' },
  { id: 'shopware', name: 'Shopware', logo: '/icons/integrations/shopware.svg' },
];

function IntegrationIcon({ name, isDark }: { name: string; isDark?: boolean }) {
  const initials = name.replace('\n', ' ').split(' ')[0].slice(0, 2).toUpperCase();
  const colors: Record<string, string> = {
    Superscore: '#0e291d',
    Shopify: '#96bf48',
    Adobe: '#ff0000',
    BigCommerce: '#121118',
    Wordpress: '#21759b',
    WooCommerce: '#7f54b3',
    Shopware: '#189eff',
  };
  const key = name.replace('\n', ' ').split(' ')[0];
  return (
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ background: colors[key] || '#888' }}>
      {initials}
    </div>
  );
}

export default function OlusturPage() {
  const [showWidget, setShowWidget] = useState(false);

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-bold text-[#1b1a1b] mb-1">Yorumları nasıl toplamak istersiniz?</h1>
      <p className="text-sm text-gray-500 mb-6">Her iki şekilde de değerlendirme alabilirsiniz. Bir değerlendirmeyi tamamladıktan sonra bu sayfaya geri dönmeniz yeterli.</p>

      {/* Verified info box */}
      <div className="flex items-start gap-3 bg-[#f0faf5] border border-[#a5e4c2] rounded-xl px-4 py-3 mb-8">
        <div className="w-5 h-5 rounded bg-[#0e291d] flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm text-[#1b1a1b] leading-relaxed">
          Doğrulanmış yorumlar, işletmenizle yapılan bir satın alma veya deneyimle bağlantılıdır. Bu yorumlar potansiyel müşteriler üzerinde daha etkili olup arama sonuçlarındaki görünürlüğü artırabilir.
        </p>
      </div>

      {/* Two options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* E-posta */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Phone mockup */}
          <div className="bg-[#f0faf5] p-6 flex items-center justify-center min-h-[220px] relative">
            <div className="relative w-48">
              {/* Phone frame */}
              <div className="bg-white rounded-3xl border-4 border-[#1b1a1b] p-4 shadow-lg">
                <div className="w-12 h-1.5 bg-[#1b1a1b] rounded-full mx-auto mb-4" />
                {/* Verified badge */}
                <div className="absolute -top-2 right-2 bg-white border border-gray-200 rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                  <div className="w-3 h-3 rounded bg-[#0e291d] flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[8px] font-semibold text-[#0e291d]">Doğrulandı</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-1.5 bg-gray-100 rounded w-full mt-2" />
                  <div className="h-1.5 bg-gray-100 rounded w-5/6" />
                  <div className="h-1.5 bg-gray-100 rounded w-4/6" />
                </div>
                <div className="mt-3 text-[8px] text-gray-400 text-center">How did we do?</div>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-[#1b1a1b] mb-2">E-postalar</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
              Müşterilerden işletmeniz hakkında yorum bırakmalarını isteyerek e-posta yoluyla yorum toplayın. Otomatik olarak yapılan bu yorumlar doğrulanır.
            </p>
            <Link
              href="/marka-panel/davetiyeler/eposta"
              className="w-full py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#2c47ac] transition-colors"
            >
              E-posta oluştur
            </Link>
          </div>
        </div>

        {/* Web sitesi */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Phone mockup */}
          <div className="bg-gray-50 p-6 flex items-center justify-center min-h-[220px]">
            <div className="w-48">
              <div className="bg-white rounded-3xl border-4 border-[#1b1a1b] p-4 shadow-lg">
                <div className="w-12 h-1.5 bg-[#1b1a1b] rounded-full mx-auto mb-4" />
                {/* Menu bar */}
                <div className="flex justify-end mb-3">
                  <div className="space-y-0.5">
                    <div className="w-4 h-0.5 bg-gray-400 rounded" />
                    <div className="w-4 h-0.5 bg-gray-400 rounded" />
                    <div className="w-4 h-0.5 bg-gray-400 rounded" />
                  </div>
                </div>
                {/* Widget button */}
                <div className="border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-1.5 mb-3">
                  <span className="text-[8px] font-semibold text-gray-600">Review us on</span>
                  <div className="w-2 h-2 bg-green-500 rounded-sm" />
                  <span className="text-[8px] font-bold text-gray-700">Superscore</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                  <div className="h-1.5 bg-gray-100 rounded w-5/6" />
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <div className="h-6 bg-gray-200 rounded" />
                    <div className="h-6 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-[#1b1a1b] mb-2">Web sitesi</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
              Ziyaretçilerin web sitenizde gezinirken bulabileceği bir widget ile yorumları toplayın. Unutmayın, bu yorumlar doğrulanmamıştır.
            </p>
            <button
              onClick={() => setShowWidget(true)}
              className="w-full py-3 bg-blue-50 text-[#3c57bc] text-sm font-semibold rounded-xl hover:bg-blue-100 transition-colors"
            >
              Bir widget kurun
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-5">
        Bunlardan hiçbirini kullanmak istemiyor musunuz?{' '}
        <Link href="/marka-panel/davetiyeler" className="text-[#3c57bc] hover:underline">
          Daha fazla seçeneği burada inceleyebilirsiniz.
        </Link>
      </p>

      {/* Widget Modal */}
      {showWidget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1b1a1b]">Bir widget kurun</h2>
              <button onClick={() => setShowWidget(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Yöntemimiz</p>
              <div className="grid grid-cols-1 gap-3 mb-6">
                <Link
                  href="/marka-panel/davetiyeler/widget"
                  onClick={() => setShowWidget(false)}
                  className="flex flex-col items-center gap-2 p-5 border-2 border-gray-200 rounded-xl hover:border-[#0e291d] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0e291d] flex items-center justify-center text-white font-bold">
                    SS
                  </div>
                  <span className="text-sm font-semibold text-[#1b1a1b]">Superscore</span>
                </Link>
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Entegrasyonlar</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integrations.slice(1).map(intg => (
                  <button
                    key={intg.id}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
                  >
                    <IntegrationIcon name={intg.name} isDark={intg.isDark} />
                    <span className="text-xs font-semibold text-[#1b1a1b] text-center leading-tight whitespace-pre-line">{intg.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
