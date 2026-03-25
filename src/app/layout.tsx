import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Superscore - Güvenilir Marka Puanlama Platformu',
  description: 'Markaların güvenilirliğini ölçen, müşteri şikayetlerini çözen platform.',
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
