import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüketici Şikayetleri',
  description:
    'Tüketici şikayetlerini okuyun, markaların müşteri sorunlarına nasıl yaklaştığını görün. Binlerce gerçek kullanıcı deneyimi.',
  alternates: {
    canonical: 'https://superscore.com.tr/sikayetler',
  },
};

export default function SikayetlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
