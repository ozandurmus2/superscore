'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Brand } from '@/types';

type SettingItem = {
  href: string;
  icon: string;
  title: string;
  description: string;
};

type SettingSection = {
  title: string;
  subtitle?: string;
  externalLink?: { label: string; href: string };
  items: SettingItem[];
};

function getSections(brand: Brand | null, userName: string): SettingSection[] {
  return [
    {
      title: 'İş ortamı',
      subtitle: brand?.name,
      items: [
        {
          href: '/marka-panel/abonelik',
          icon: '/icons/settings/plan.svg',
          title: 'Planlar ve faturalama',
          description: 'İşletme bilgilerinizi, aboneliklerinizi ve alan adlarınızı yönetin.',
        },
        {
          href: '/marka-panel/ayarlar/kullanicilar',
          icon: '/icons/settings/kullanicilar.svg',
          title: 'Kullanıcılar',
          description: 'Kullanıcı rollerini ve izinlerini kontrol edin.',
        },
        {
          href: '/marka-panel/ayarlar/veri-onayi',
          icon: '/icons/settings/veri.svg',
          title: 'Veri onayı',
          description: 'İşletmenizin yetkilendirmelerini kontrol edin.',
        },
      ],
    },
    {
      title: 'Profil ayarları',
      subtitle: brand?.website?.replace(/^https?:\/\//, '') || brand?.name,
      externalLink: {
        label: 'Herkese açık profile git',
        href: brand ? `/markalar/${brand.slug}` : '#',
      },
      items: [
        {
          href: '/marka-panel/ayarlar/profil-sayfasi',
          icon: '/icons/settings/profil.svg',
          title: 'Profil sayfası',
          description: 'Herkese açık bilgilerinizi düzenleyin.',
        },
        {
          href: '/marka-panel/ayarlar/kategoriler',
          icon: '/icons/settings/kategori.svg',
          title: 'Kategoriler',
          description: 'İşletme kategorilerinizi ekleyin veya değiştirin.',
        },
        {
          href: '/marka-panel/ayarlar/konumlar',
          icon: '/icons/settings/konum.svg',
          title: 'Konumlar',
          description: 'İşletmenizin fiziksel konumlarını ekleyerek konum değerlendirmeleri alın.',
        },
        {
          href: '/marka-panel/ayarlar/referans-numarasi',
          icon: '/icons/settings/referans.svg',
          title: 'Referans numarası',
          description: 'Yorum yazarken yorumculardan referans numarası istemeyi unutmayın.',
        },
      ],
    },
    {
      title: 'Kişisel ayarlar',
      subtitle: userName || undefined,
      items: [
        {
          href: '/marka-panel/ayarlar/kisisel-hesap',
          icon: '/icons/settings/kisisel.svg',
          title: 'Kişisel hesap',
          description: 'Kişisel bilgilerinizi ve güvenlik ayarlarınızı güncelleyin.',
        },
        {
          href: '/marka-panel/ayarlar/eposta-bildirimleri',
          icon: '/icons/settings/eposta.svg',
          title: 'E-posta bildirimleri',
          description: 'Bizden hangi tür e-postaları almak istediğinizi seçin.',
        },
        {
          href: '/marka-panel/ayarlar/cerezler',
          icon: '/icons/settings/cerez.svg',
          title: 'Çerezler',
          description: 'Çerez tercihlerinizi yönetin.',
        },
      ],
    },
  ];
}

export default function AyarlarPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [userName, setUserName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profile }, { data: member }] = await Promise.all([
        supabase.from('users').select('full_name').eq('id', user.id).single(),
        supabase.from('brand_members').select('brand:brands(*)').eq('user_id', user.id).single(),
      ]);

      if (profile?.full_name) setUserName(profile.full_name as string);
      if (member) setBrand((member as unknown as { brand: Brand }).brand);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = getSections(brand, userName);

  return (
    <div className="max-w-4xl space-y-5">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Section header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <p className="text-base font-bold text-[#1b1a1b]">
              {section.title}
              {section.subtitle && (
                <span className="font-normal text-gray-500">{'  '}{section.subtitle}</span>
              )}
            </p>
            {section.externalLink && (
              <Link
                href={section.externalLink.href}
                target="_blank"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: '#3c57bc' }}
              >
                {section.externalLink.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Items grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 p-1 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eeeef3' }}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-60"
                  />
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1b1a1b] group-hover:underline">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
