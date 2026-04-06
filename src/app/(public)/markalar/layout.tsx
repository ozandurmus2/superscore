import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm Markalar - Şikayet ve Değerlendirmeler',
  description:
    'Türkiye\'deki tüm markaların tüketici şikayetleri ve değerlendirmeleri. 15.000+ marka arasından arayın, karşılaştırın ve deneyiminizi paylaşın.',
  keywords: [
    'markalar', 'marka listesi', 'şikayet', 'değerlendirme', 'tüketici',
    'marka puanlama', 'superscore', 'güvenilir marka',
  ],
  alternates: {
    canonical: 'https://superscore.com.tr/markalar',
  },
};

export default function MarkaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
