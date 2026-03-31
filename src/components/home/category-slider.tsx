'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { icon: '/icons/imgi_16_electronics_technology.svg', label: 'E-Ticaret', slug: 'e-ticaret' },
  { icon: '/icons/imgi_12_car_dealer.svg', label: 'Kargo & Lojistik', slug: 'kargo-lojistik' },
  { icon: '/icons/imgi_31_electronic_store.svg', label: 'Telekomünikasyon', slug: 'telekomunikasyon' },
  { icon: '/icons/imgi_10_banks.svg', label: 'Bankacılık', slug: 'bankacilik-finans' },
  { icon: '/icons/imgi_29_appliance_store.svg', label: 'Yemek & Teslimat', slug: 'yemek-teslimat' },
  { icon: '/icons/imgi_21_insurance_agency.svg', label: 'Sigorta', slug: 'sigorta' },
  { icon: '/icons/imgi_31_electronic_store.svg', label: 'Elektronik & Teknoloji', slug: 'elektronik-teknoloji' },
  { icon: '/icons/imgi_33_travel_agency.svg', label: 'Seyahat & Tatil', slug: 'seyahat-tatil' },
  { icon: '/icons/imgi_12_car_dealer.svg', label: 'Araç & Ulaşım', slug: 'arac-ulasim' },
  { icon: '/icons/imgi_13_furniture_store.svg', label: 'Ev & Mobilya', slug: 'ev-mobilya' },
  { icon: '/icons/imgi_30_cosmetics_store.svg', label: 'Sağlık & Tıp', slug: 'saglik-tip' },
  { icon: '/icons/imgi_28_mortgage_broker.svg', label: 'Eğitim', slug: 'egitim' },
  { icon: '/icons/imgi_30_cosmetics_store.svg', label: 'Güzellik & Bakım', slug: 'guzellik-bakim' },
  { icon: '/icons/imgi_15_clothing_store.svg', label: 'Giyim & Moda', slug: 'giyim-moda' },
  { icon: '/icons/imgi_17_fitness_nutrition_center.svg', label: 'Spor & Fitness', slug: 'spor-fitness' },
  { icon: '/icons/imgi_22_bedroom_furniture.svg', label: 'Ev Hizmetleri', slug: 'ev-hizmetleri' },
  { icon: '/icons/imgi_20_real_estate_agents.svg', label: 'İnşaat & İmalat', slug: 'insaat-imalat' },
  { icon: '/icons/imgi_11_travel_insurance.svg', label: 'Hukuk Hizmetleri', slug: 'hukuk-hizmetleri' },
  { icon: '/icons/imgi_16_electronics_technology.svg', label: 'Medya & Yayıncılık', slug: 'medya-yayincilik' },
  { icon: '/icons/imgi_10_banks.svg', label: 'Yatırım & Servet', slug: 'yatirim-servet' },
  { icon: '/icons/imgi_29_appliance_store.svg', label: 'Restoranlar', slug: 'restoranlar' },
  { icon: '/icons/imgi_32_garden_center.svg', label: 'Kamu Hizmetleri', slug: 'kamu-hizmetleri' },
  { icon: '/icons/imgi_20_real_estate_agents.svg', label: 'İş Hizmetleri', slug: 'is-hizmetleri' },
  { icon: '/icons/imgi_14_jewelry_store.svg', label: 'Mücevher & Saat', slug: 'mucevher-saat' },
  { icon: '/icons/imgi_19_energy_supplier.svg', label: 'Enerji', slug: 'enerji' },
  { icon: '/icons/imgi_32_garden_center.svg', label: 'Su Hizmetleri', slug: 'su-hizmetleri' },
  { icon: '/icons/imgi_26_bicycle_shop.svg', label: 'Hobi & El Sanatları', slug: 'hobi' },
  { icon: '/icons/imgi_18_pet_store.svg', label: 'Evcil Hayvanlar', slug: 'evcil-hayvanlar' },
];

export function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(updateScrollState, 350);
  }

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b]">
            Ne arıyorsunuz?
          </h2>
          <div className="flex items-center gap-2">
            {/* Scroll arrows - desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'border-gray-300 text-[#1b1a1b] hover:border-gray-500'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10.06 2.22 4.28 8l5.78 5.78.66-.66L5.6 8l5.12-5.12-.66-.66Z"/></svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'border-gray-300 text-[#1b1a1b] hover:border-gray-500'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M5.94 13.78 11.72 8 5.94 2.22l-.66.66L10.4 8l-5.12 5.12.66.66Z"/></svg>
              </button>
            </div>

            {/* See more button */}
            <Link
              href="/markalar"
              className="px-5 py-2 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:border-transparent hover:bg-[#f2f5fe] hover:text-[#2e2f2a] transition-all"
            >
              Tümünü Gör
            </Link>
          </div>
        </div>

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/markalar?kategori=${cat.slug}`}
              className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-[100px] group"
            >
              <Image
                src={cat.icon}
                alt={cat.label}
                width={28}
                height={28}
                className="w-6 h-6 md:w-7 md:h-7 group-hover:opacity-70 transition-opacity"
              />
              <span className="text-xs md:text-sm text-[#1b1a1b] text-center whitespace-nowrap group-hover:text-[#3c57bc] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
