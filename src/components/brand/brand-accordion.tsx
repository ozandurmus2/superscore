'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const ITEMS = [
  {
    title: 'Herkese açığız.',
    content: 'Herkes Superscore\'da yorum yazabilir. Yorum yazan kişiler, yorumlarını istedikleri zaman düzenleyebilir veya silebilirler ve yorumlar hesap aktif olduğu sürece görüntülenir.',
  },
  {
    title: 'Doğrulanmış yorumları destekliyoruz.',
    content: 'Şirketler otomatik davetler aracılığıyla yorum isteyebilirler. Doğrulanmış olarak etiketlenen bu yorumlar, gerçek deneyimlerle ilgilidir.',
  },
  {
    title: 'Sahte yorumlarla mücadele ediyoruz.',
    content: 'Platformumuzu korumak için özel çalışanlar ve akıllı teknolojiler kullanıyoruz. Sahte yorumlarla nasıl mücadele ettiğimizi öğrenin.',
  },
  {
    title: 'En yeni yorumları gösteriyoruz.',
    content: 'Superscore\'ın değerlendirme süreci, en güncel ve ilgili yorumları öne çıkaracak şekilde tasarlanmıştır.',
  },
  {
    title: 'Yapıcı geri bildirimlerinizi bekliyoruz.',
    content: 'İşte harika yorumlar yazmak için ipuçları: dürüst olun, detay verin ve yapıcı eleştiriler sunun.',
  },
  {
    title: 'Değerlendiricileri doğruluyoruz.',
    content: 'Doğrulama, Superscore\'da okuduğunuz yorumları gerçek kişilerin yazdığından emin olmanıza yardımcı olabilir.',
  },
  {
    title: 'Biz önyargıya karşıyız.',
    content: 'Değerlendirmeler için teşvik sunmak veya seçici bir şekilde değerlendirme istemek, Superscore\'u etkileyebilir ve bu da yönergelerimize aykırıdır.',
  },
];

export function BrandAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <h3 className="font-semibold text-base text-[#1b1a1b] text-center mb-4 flex items-center justify-center gap-2">
        Superscore Deneyimi
        <Image src="/logo/star_icon.png" alt="" width={18} height={18} className="w-4.5 h-4.5" />
      </h3>
      <div className="space-y-2">
        {ITEMS.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#e8f4f8] rounded-xl text-sm text-left hover:bg-[#dceef4] transition-colors"
            >
              <span className="font-medium text-[#1b1a1b]">{item.title}</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-40 mt-1' : 'max-h-0'}`}>
              <p className="text-xs text-gray-600 leading-relaxed px-4 py-3">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="w-full py-3 text-center text-white bg-[#3c57bc] rounded-full font-semibold text-sm hover:bg-[#2e449a] transition-colors">
          Daha yakından bakın
        </button>
      </div>
    </div>
  );
}
