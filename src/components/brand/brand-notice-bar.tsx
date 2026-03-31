'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export function BrandNoticeBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start gap-3 py-3 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-[#f3f0ed] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Image src="/logo/star_icon.png" alt="" width={16} height={16} className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-600 flex-1">
            Platformun bütünlüğünü korumak için teknoloji kullanıyoruz, ancak yorumların doğruluğunu kontrol etmiyoruz.
          </p>
          <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[400px] pb-4' : 'max-h-0'}`}>
          <div className="pl-11 space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Yorum yapanların görüşleri kendilerine ait olduğundan belirli iddiaları doğrulamıyoruz, ancak bir işletme etkileşiminin gerçekleştiğini teyit edebildiğimizde yorumları &quot;Doğrulandı&quot; olarak etiketleyebiliriz.{' '}
              <a href="/nasil-calisir" className="text-[#3c57bc] underline hover:no-underline">Daha fazla bilgi edinin.</a>
            </p>
            <p>
              Platformumuzun bütünlüğünü korumak için, platformumuzdaki her yorum (doğrulanmış olsun veya olmasın) 7/24 çalışan otomatik yazılımımız tarafından incelenir. Bu teknoloji, gerçek bir deneyime dayanmayan yorumlar da dahil olmak üzere, yönergelerimizi ihlal eden içerikleri belirlemek ve kaldırmak için tasarlanmıştır. Her şeyi yakalayamayabileceğimizi kabul ediyoruz ve gözden kaçırdığımızı düşündüğünüz herhangi bir şeyi işaretleyebilirsiniz.{' '}
              <a href="/nasil-calisir" className="text-[#3c57bc] underline hover:no-underline">Daha fazla bilgi edinin.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
