import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Şikayet Yaz',
  description:
    'Marka hakkında şikayetinizi yazın. Deneyiminizi paylaşarak diğer tüketicilere yardımcı olun ve markaların müşteri hizmetlerini iyileştirmesini sağlayın.',
  alternates: {
    canonical: 'https://superscore.com.tr/sikayet-yaz',
  },
};

export default function SikayetYazLayout({ children }: { children: React.ReactNode }) {
  return children;
}
