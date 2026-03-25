import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#1B1F3B] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-bold">Superscore</span>
            </div>
            <p className="text-sm text-gray-300">
              Markaların güvenilirliğini ölçen, müşteri şikayetlerini çözen platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/markalar" className="hover:text-white transition-colors">Markalar</Link></li>
              <li><Link href="/sikayetler" className="hover:text-white transition-colors">Şikayetler</Link></li>
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">Nasıl Çalışır</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Markalar İçin</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/kayit?type=brand" className="hover:text-white transition-colors">Markanızı Ekleyin</Link></li>
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">Abonelik Planları</Link></li>
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">Widget</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">SSS</Link></li>
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="/nasil-calisir" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Superscore. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
