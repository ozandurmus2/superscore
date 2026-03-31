'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Copy, Check } from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  color: string;
  abbr: string;
  desc: string;
};

const integrations: Integration[] = [
  { id: 'superscore', name: 'Superscore Widget', color: '#0e291d', abbr: 'SS', desc: 'Kendi sitene doğrudan embed et.' },
  { id: 'shopify', name: 'Shopify', color: '#96bf48', abbr: 'SH', desc: 'Shopify mağazanıza kolayca entegre edin.' },
  { id: 'magento', name: 'Adobe Commerce\n(Magento V2)', color: '#f26322', abbr: 'AC', desc: 'Magento V2 store entegrasyonu.' },
  { id: 'bigcommerce', name: 'BigCommerce', color: '#121118', abbr: 'BC', desc: 'BigCommerce platformu için.' },
  { id: 'wordpress', name: 'WordPress', color: '#21759b', abbr: 'WP', desc: 'WordPress siteler için eklenti ile.' },
  { id: 'woocommerce', name: 'WooCommerce', color: '#7f54b3', abbr: 'WC', desc: 'WooCommerce mağazanıza entegre edin.' },
  { id: 'shopware', name: 'Shopware', color: '#189eff', abbr: 'SW', desc: 'Shopware 6 için plugin desteği.' },
];

const widgetCode = `<!-- Superscore Widget -->
<script>
  (function(w, d, s, o, f, js, fjs) {
    w['SuperscoreWidget'] = o;
    w[o] = w[o] || function() { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1;
    fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'ss', 'https://widget.superscore.io/v1/loader.js'));
  ss('init', { brandId: 'YOUR_BRAND_ID' });
</script>`;

export default function WidgetPage() {
  const [selected, setSelected] = useState('superscore');
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectedIntg = integrations.find(i => i.id === selected)!;

  return (
    <div className="max-w-3xl w-full">
      {/* Back */}
      <Link href="/marka-panel/davetiyeler/olustur" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b1a1b] mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Geri
      </Link>

      <h1 className="text-2xl font-bold text-[#1b1a1b] mb-1">Widget Kurulumu</h1>
      <p className="text-sm text-gray-500 mb-8">Web sitenize Superscore widgetini ekleyerek ziyaretçilerinizin yorum yapmasını kolaylaştırın.</p>

      <div className="grid grid-cols-12 gap-4">

        {/* Integration list */}
        <div className="col-span-12 md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Platform seçin</p>
          <div className="space-y-2">
            {integrations.map(intg => (
              <button
                key={intg.id}
                onClick={() => setSelected(intg.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${selected === intg.id ? 'border-[#0e291d] bg-[#f0faf5]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: intg.color }}
                >
                  {intg.abbr}
                </div>
                <span className="text-sm font-semibold text-[#1b1a1b] leading-tight whitespace-pre-line">{intg.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="col-span-12 md:col-span-8 space-y-4">
          {/* Selected info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: selectedIntg.color }}
              >
                {selectedIntg.abbr}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b] whitespace-pre-line">{selectedIntg.name}</p>
                <p className="text-xs text-gray-500">{selectedIntg.desc}</p>
              </div>
            </div>
          </div>

          {/* Code embed (only for superscore) */}
          {selected === 'superscore' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-400" />
                  <p className="text-sm font-bold text-[#1b1a1b]">Widget kodu</p>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1b1a1b] transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <div className="p-4">
                <pre className="bg-gray-950 text-green-400 text-xs rounded-xl p-4 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                  {widgetCode}
                </pre>
              </div>
              <div className="px-5 pb-5">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Bu kodu sitenizin <code className="bg-gray-100 px-1 py-0.5 rounded text-[#1b1a1b]">&lt;head&gt;</code> veya <code className="bg-gray-100 px-1 py-0.5 rounded text-[#1b1a1b]">&lt;/body&gt;</code> etiketinin hemen öncesine yapıştırın.
                </p>
              </div>
            </div>
          )}

          {/* External platforms */}
          {selected !== 'superscore' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-bold text-[#1b1a1b] mb-2">Kurulum adımları</p>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5ec] text-[#0e291d] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span>{selectedIntg.name.replace('\n', ' ')} mağazanıza giriş yapın.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5ec] text-[#0e291d] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span>Uygulamalar / Eklentiler bölümüne gidin ve "Superscore" uygulamasını arayın.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5ec] text-[#0e291d] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span>Uygulamayı yükleyin ve API anahtarınızı girerek bağlantıyı tamamlayın.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5ec] text-[#0e291d] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span>Widget ayarlarınızı yapılandırın ve sitenizde yayınlayın.</span>
                </li>
              </ol>

              <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">API Anahtarınız</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono">
                    ••••••••••••••••••••••••••
                  </code>
                  <button className="text-xs text-[#3c57bc] border border-[#3c57bc]/30 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors">
                    Göster
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Widget preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm font-bold text-[#1b1a1b] mb-4">Widget önizlemesi</p>
            <div className="flex items-center gap-3">
              {/* Floating widget mockup */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e291d] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  SS
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1b1a1b]">Bizi değerlendirin</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-3 h-3 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Sitenizde böyle görünür</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
