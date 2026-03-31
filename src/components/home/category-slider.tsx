'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Building2, Plane, Car, Sofa, Gem, Shirt, Laptop, Dumbbell,
  ShoppingCart, Truck, Phone, Banknote, UtensilsCrossed, Pizza,
  GraduationCap, Heart, Sparkles, Home, Wrench, Scale,
  Newspaper, PiggyBank, TreePine, Store, Zap, Droplets, Bike, Dog
} from 'lucide-react';

const CATEGORIES = [
  { icon: ShoppingCart, label: 'E-Ticaret', slug: 'e-ticaret' },
  { icon: Truck, label: 'Kargo & Lojistik', slug: 'kargo-lojistik' },
  { icon: Phone, label: 'Telekomünikasyon', slug: 'telekomunikasyon' },
  { icon: Building2, label: 'Bankacılık', slug: 'bankacilik-finans' },
  { icon: Pizza, label: 'Yemek & Teslimat', slug: 'yemek-teslimat' },
  { icon: Banknote, label: 'Sigorta', slug: 'sigorta' },
  { icon: Laptop, label: 'Elektronik & Teknoloji', slug: 'elektronik-teknoloji' },
  { icon: Plane, label: 'Seyahat & Tatil', slug: 'seyahat-tatil' },
  { icon: Car, label: 'Araç & Ulaşım', slug: 'arac-ulasim' },
  { icon: Sofa, label: 'Ev & Mobilya', slug: 'ev-mobilya' },
  { icon: Heart, label: 'Sağlık & Tıp', slug: 'saglik-tip' },
  { icon: GraduationCap, label: 'Eğitim', slug: 'egitim' },
  { icon: Sparkles, label: 'Güzellik & Bakım', slug: 'guzellik-bakim' },
  { icon: Shirt, label: 'Giyim & Moda', slug: 'giyim-moda' },
  { icon: Dumbbell, label: 'Spor & Fitness', slug: 'spor-fitness' },
  { icon: Home, label: 'Ev Hizmetleri', slug: 'ev-hizmetleri' },
  { icon: Wrench, label: 'İnşaat & İmalat', slug: 'insaat-imalat' },
  { icon: Scale, label: 'Hukuk Hizmetleri', slug: 'hukuk-hizmetleri' },
  { icon: Newspaper, label: 'Medya & Yayıncılık', slug: 'medya-yayincilik' },
  { icon: PiggyBank, label: 'Yatırım & Servet', slug: 'yatirim-servet' },
  { icon: UtensilsCrossed, label: 'Restoranlar', slug: 'restoranlar' },
  { icon: TreePine, label: 'Kamu Hizmetleri', slug: 'kamu-hizmetleri' },
  { icon: Store, label: 'İş Hizmetleri', slug: 'is-hizmetleri' },
  { icon: Gem, label: 'Mücevher & Saat', slug: 'mucevher-saat' },
  { icon: Zap, label: 'Enerji', slug: 'enerji' },
  { icon: Droplets, label: 'Su Hizmetleri', slug: 'su-hizmetleri' },
  { icon: Bike, label: 'Hobi & El Sanatları', slug: 'hobi' },
  { icon: Dog, label: 'Evcil Hayvanlar', slug: 'evcil-hayvanlar' },
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
              <cat.icon className="h-6 w-6 md:h-7 md:w-7 text-[#1b1a1b] group-hover:text-[#3c57bc] transition-colors" strokeWidth={1.5} />
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
