import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://superscore.com.tr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  title: {
    default: 'Superscore - Tüketici Şikayet ve Değerlendirme Platformu',
    template: '%s | Superscore',
  },
  description:
    'Markaları değerlendirin, şikayetlerinizi yazın, tüketici deneyimlerini okuyun. Türkiye\'nin güvenilir marka puanlama platformu.',
  keywords: [
    'şikayet', 'marka şikayet', 'tüketici şikayetleri', 'marka değerlendirme',
    'marka puanlama', 'superscore', 'güvenilir marka', 'şikayet yaz',
    'müşteri yorumları', 'tüketici hakları',
  ],
  authors: [{ name: 'Superscore' }],
  creator: 'Superscore',
  publisher: 'Superscore',
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Superscore',
    title: 'Superscore - Tüketici Şikayet ve Değerlendirme Platformu',
    description:
      'Markaları değerlendirin, şikayetlerinizi yazın, tüketici deneyimlerini okuyun.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superscore - Tüketici Şikayet ve Değerlendirme Platformu',
    description:
      'Markaları değerlendirin, şikayetlerinizi yazın, tüketici deneyimlerini okuyun.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
