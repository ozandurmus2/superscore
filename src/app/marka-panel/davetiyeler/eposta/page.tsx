'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Lightbulb, ArrowLeft, Check, Crown } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  desc: string;
  group: 'service' | 'product';
  isPremium?: boolean;
  isBest?: boolean;
};

const templates: Template[] = [
  {
    id: 'service_1',
    name: 'Şablon 1',
    desc: 'Satın alma dışı deneyimler için',
    group: 'service',
  },
  {
    id: 'service_2',
    name: 'Şablon 2',
    desc: 'Satın alma deneyimleri için (Testte en iyisi)',
    group: 'service',
    isBest: true,
  },
  {
    id: 'product_1',
    name: 'Şablon 3',
    desc: 'Ürün incelemeleri için optimize edilmiştir.',
    group: 'product',
  },
];

const languages = ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca', 'İtalyanca'];

function TemplateMockup({ id, selected }: { id: string; selected: boolean }) {
  return (
    <div className={`relative bg-gray-50 rounded-xl overflow-hidden border-2 transition-colors ${selected ? 'border-[#3c57bc]' : 'border-transparent'} w-36 h-24 flex-shrink-0`}>
      {/* Fake email preview */}
      <div className="p-2 space-y-1">
        <div className="h-1.5 bg-gray-300 rounded w-3/4" />
        <div className="h-1 bg-gray-200 rounded w-full" />
        <div className="h-1 bg-gray-200 rounded w-5/6" />
        {/* Stars */}
        <div className="flex gap-0.5 mt-1">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`w-3 h-3 rounded-sm ${s <= 4 ? 'bg-[#00b67a]' : 'bg-[#dddde8]'}`} />
          ))}
        </div>
        <div className="h-1 bg-gray-200 rounded w-4/6" />
        <div className="h-1 bg-gray-200 rounded w-3/6" />
      </div>
      {/* Eye hover */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#3c57bc] rounded-full p-2">
          <Eye className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function EpostaPage() {
  const [selected, setSelected] = useState('service_2');
  const [language, setLanguage] = useState('İngilizce');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function selectTemplate() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setDone(true);
  }

  const serviceTemplates = templates.filter(t => t.group === 'service');
  const productTemplates = templates.filter(t => t.group === 'product');

  return (
    <div className="max-w-3xl w-full">
      {/* Back */}
      <Link href="/marka-panel/davetiyeler/olustur" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b1a1b] mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Geri
      </Link>

      <h1 className="text-2xl font-bold text-[#1b1a1b] mb-1">Bir e-posta şablonu seçin</h1>
      <p className="text-sm text-gray-500 mb-6">
        Şablonlarımız, müşterilerinizin yaşayabileceği her deneyim için optimize edilmiştir. Bir şablon ekleyebilir veya kopyalayıp kendinize göre uyarlayabilirsiniz.
      </p>

      {/* Info box */}
      <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
        <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600 leading-relaxed">
          Hizmet değerlendirmeleri, işletmenizle ilgili deneyimler hakkındadır. Ürün değerlendirmeleri ise belirli ürünler hakkındadır.
        </p>
      </div>

      {/* Language */}
      <div className="flex items-center justify-end gap-3 mb-5">
        <label className="text-sm text-gray-600">Şablon dili</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 bg-white"
        >
          {languages.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Service templates */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-[#1b1a1b] mb-3">Hizmet değerlendirmeleri</h2>
        <div className="space-y-3">
          {serviceTemplates.map(t => (
            <div
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all ${selected === t.id ? 'border-[#3c57bc] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <TemplateMockup id={t.id} selected={selected === t.id} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-[#1b1a1b]">{t.name}</p>
                  {t.isBest && (
                    <span className="text-xs bg-[#e8f5ec] text-[#0e291d] px-2 py-0.5 rounded-full font-semibold">En iyi</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected === t.id ? 'border-[#3c57bc] bg-[#3c57bc]' : 'border-gray-300'}`}>
                {selected === t.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <button
                className="text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-400 transition-colors flex-shrink-0"
                onClick={e => { e.stopPropagation(); setSelected(t.id); }}
              >
                Seçme
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product templates */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-[#1b1a1b] mb-3">Ürün incelemeleri</h2>
        <div className="space-y-3">
          {productTemplates.map(t => (
            <div
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all ${selected === t.id ? 'border-[#3c57bc] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <TemplateMockup id={t.id} selected={selected === t.id} />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1b1a1b] mb-1">{t.name}</p>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected === t.id ? 'border-[#3c57bc] bg-[#3c57bc]' : 'border-gray-300'}`}>
                {selected === t.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <button
                className="text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-400 transition-colors flex-shrink-0"
                onClick={e => { e.stopPropagation(); setSelected(t.id); }}
              >
                Seçme
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium upsell */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 mb-6">
        <div className="flex-1">
          <p className="text-sm font-bold text-[#1b1a1b] mb-1">Özel şablonlar için yükseltme</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kişiselleştirilmiş yorum davetleri oluşturarak markanıza özel bir dokunuş katabilir ve onu diğerlerinden ayırabilirsiniz.
          </p>
          <button className="mt-3 px-5 py-2 bg-[#1b1a1b] text-white text-sm font-medium rounded-full hover:bg-[#333] transition-colors">
            Planlar hakkında bilgi edinin.
          </button>
        </div>
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-[#e8f5ec] rounded-2xl flex items-center justify-center">
            <Crown className="h-10 w-10 text-[#0e291d]" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          onClick={selectTemplate}
          disabled={saving || done}
          className="px-6 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-60"
        >
          {done ? '✓ Şablon seçildi' : saving ? 'Kaydediliyor...' : 'Bu şablonla devam et'}
        </button>
        {done && (
          <Link
            href="/marka-panel/davetiyeler"
            className="px-6 py-3 border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
          >
            Davetiyeler'e dön
          </Link>
        )}
      </div>
    </div>
  );
}
