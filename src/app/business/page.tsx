import Link from 'next/link';
import Image from 'next/image';
import { Shield, Brain, FileCheck, Clock, BarChart3, Code, ArrowRight, Check, Zap, Users, TrendingUp } from 'lucide-react';
import { BusinessBrandSearch } from '@/components/business/brand-search';

export default function BusinessPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#04da8d] relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl">
              <h1 className="font-superscore-bold text-3xl md:text-5xl text-[#1b1a1b] leading-tight mb-6">
                Müşteri şikayetlerini çözün, güven puanınızı yükseltin
              </h1>
              <p className="text-lg text-[#1b1a1b]/80 mb-8">
                Superscore, müşteri taleplerini yapay zeka destekli belge doğrulama ile çözen ve markanızın güvenilirlik puanını otomatik hesaplayan platformdur. Şikayetleri fırsata dönüştürün.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link href="/kayit?tab=brand">
                  <button className="px-6 py-3.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                    30 Gün Ücretsiz Deneyin
                  </button>
                </Link>
                <Link href="/kayit?tab=brand">
                  <button className="px-6 py-3.5 bg-transparent text-[#1b1a1b] text-sm font-semibold rounded-full border-2 border-[#1b1a1b] hover:bg-[#1b1a1b]/10 transition-colors">
                    Demo İsteyin
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.ctfassets.net/wonkqgvit51x/5XIw4ffhsD0q9cZmacBhb7/df929398906a81b345e6971983bdf418/ENG_-_Homepage_hero.png" alt="Superscore Business" className="w-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Search */}
      <BusinessBrandSearch />

      {/* Why Superscore - Stats */}
      <section className="bg-[#f3f0ed] pb-16">
        <div className="container mx-auto px-4">
          <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] text-center mb-12">
            Markalar neden Superscore&apos;u tercih ediyor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            <div>
              <p className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">%87</p>
              <p className="text-sm text-gray-500">Şikayetler ilk 48 saatte çözüme kavuşuyor</p>
            </div>
            <div>
              <p className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">3.2x</p>
              <p className="text-sm text-gray-500">Çözülen şikayetlerden gelen tekrar satın alma oranı</p>
            </div>
            <div>
              <p className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">%94</p>
              <p className="text-sm text-gray-500">AI belge doğrulama başarı oranı</p>
            </div>
          </div>
        </div>
      </section>

      {/* === AI VERIFICATION FLOW - Animated Section === */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-4">
              Yapay Zeka Destekli Şikayet Çözüm Süreci
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Müşteri şikayetleri artık keyfi kararlarla değil, belge bazlı doğrulama ile çözülüyor. Süreç tamamen şeffaf ve adil.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="max-w-4xl mx-auto">
            {/* Desktop Flow - Horizontal */}
            <div className="hidden md:block relative">
              {/* Connection Lines with Pulse */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 400" fill="none" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="pulse-line-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#04da8d" stopOpacity="0" />
                    <stop offset="50%" stopColor="#04da8d" stopOpacity="1" />
                    <stop offset="100%" stopColor="#04da8d" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Line 1: Customer to Star */}
                <path d="M 150 100 L 150 180 Q 150 200 170 200 L 430 200" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <path d="M 150 100 L 150 180 Q 150 200 170 200 L 430 200" stroke="#04da8d" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-dash" />
                {/* Line 2: Star to Brand */}
                <path d="M 470 200 L 730 200 Q 750 200 750 180 L 750 100" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <path d="M 470 200 L 730 200 Q 750 200 750 180 L 750 100" stroke="#04da8d" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-dash" style={{ animationDelay: '1s' }} />
                {/* Line 3: Star down to Result */}
                <path d="M 450 240 L 450 340" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                <path d="M 450 240 L 450 340" stroke="#04da8d" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-dash" style={{ animationDelay: '2s' }} />
              </svg>

              <div className="relative z-10 grid grid-cols-3 gap-8">
                {/* Customer Node */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Users className="h-9 w-9 text-[#3c57bc]" />
                  </div>
                  <h3 className="font-superscore-bold text-sm text-[#1b1a1b] mb-1">Müşteri</h3>
                  <p className="text-xs text-gray-500">Şikayetini yazar ve talebini belirtir</p>
                </div>

                {/* Superscore AI Node - Center */}
                <div className="text-center pt-20">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-[#1b1a1b] flex items-center justify-center shadow-lg mb-4 animate-pulse-slow">
                    <Image src="/logo/star_icon.png" alt="Superscore" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <h3 className="font-superscore-bold text-sm text-[#1b1a1b] mb-1">Superscore AI</h3>
                  <p className="text-xs text-gray-500">Belgeleri analiz eder, doğrular ve sonuç verir</p>
                </div>

                {/* Brand Node */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Shield className="h-9 w-9 text-[#04da8d]" />
                  </div>
                  <h3 className="font-superscore-bold text-sm text-[#1b1a1b] mb-1">Marka</h3>
                  <p className="text-xs text-gray-500">Şikayete yanıt verir ve çözüm belgesi yükler</p>
                </div>
              </div>

              {/* Result Node - Bottom Center */}
              <div className="text-center mt-16 relative z-10">
                <div className="w-20 h-20 mx-auto bg-[#04da8d]/10 border-2 border-[#04da8d] rounded-2xl flex items-center justify-center mb-4">
                  <FileCheck className="h-9 w-9 text-[#04da8d]" />
                </div>
                <h3 className="font-superscore-bold text-sm text-[#1b1a1b] mb-1">Otomatik Çözüm</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">AI belgeyi doğrularsa müşteriye bildirim gider. 48 saat içinde itiraz olmazsa şikayet otomatik kapanır.</p>
              </div>
            </div>

            {/* Mobile Flow - Vertical */}
            <div className="md:hidden space-y-6">
              {[
                { icon: Users, color: '#3c57bc', bg: '#e0e7ff', title: 'Müşteri talebini oluşturur', desc: 'Şikayetini detaylıca anlatır ve beklentisini belirtir.' },
                { icon: Shield, color: '#04da8d', bg: '#d1fae5', title: 'Marka aksiyon alır', desc: 'Sorunu çözer, iade/değişim yapar ve belgelerini sisteme yükler.' },
                { icon: Brain, color: '#8b5cf6', bg: '#ede9fe', title: 'AI belgeleri doğrular', desc: 'Yapay zeka yüklenen belgelerdeki isim, sipariş no ve tutarları kontrol eder.' },
                { icon: FileCheck, color: '#04da8d', bg: '#d1fae5', title: 'Otomatik çözüm', desc: 'Doğrulama başarılıysa müşteriye bildirim gider. 48 saat itiraz olmazsa kapanır.' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: step.bg }}>
                      <step.icon className="h-7 w-7" style={{ color: step.color }} />
                    </div>
                    {i < 3 && <div className="w-0.5 h-8 bg-gray-200 mt-2" />}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-superscore-bold text-sm text-[#1b1a1b] mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Difference Section */}
      <section className="bg-[#f3f0ed] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-4">
                Diğer platformlardan farkımız
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Geleneksel şikayet sitelerinde müşteri şikayeti kaldırmadığı sürece kalır. Superscore&apos;da adil bir sistem var.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old way */}
              <div className="bg-white rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <h3 className="font-superscore-bold text-base text-red-600">Eski Yöntem</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Marka sorunu çözse bile şikayet kalır</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Müşteri keyfi olarak şikayeti kaldırmayı reddeder</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Belge doğrulaması yapılmaz</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Yıllık fahiş ücretler</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Eski ve karmaşık arayüz</li>
                </ul>
              </div>

              {/* Superscore way */}
              <div className="bg-white rounded-2xl p-6 border border-[#04da8d]">
                <div className="flex items-center gap-2 mb-4">
                  <Image src="/logo/star_icon.png" alt="" width={16} height={16} className="w-4 h-4" />
                  <h3 className="font-superscore-bold text-base text-[#04da8d]">Superscore Yöntemi</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#04da8d] mt-0.5 flex-shrink-0" /> Marka belgeyle ispatlarsa AI doğrular, şikayet otomatik kapanır</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#04da8d] mt-0.5 flex-shrink-0" /> Müşteri 48 saat içinde itiraz etmezse sistem çözer</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#04da8d] mt-0.5 flex-shrink-0" /> GPT-4o Vision ile belge analizi ve doğrulama</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#04da8d] mt-0.5 flex-shrink-0" /> Aylık uygun fiyat, 30 gün ücretsiz deneme</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#04da8d] mt-0.5 flex-shrink-0" /> Modern, hızlı ve mobil uyumlu arayüz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="ozellikler" className="bg-[#f3f0ed] py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] text-center mb-12">
            İşletmeniz İçin Güçlü Araçlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Brain, iconBg: '#ede9fe', iconColor: '#7c3aed', title: 'AI Belge Doğrulama', desc: 'Yüklediğiniz iade dekontları, faturalar ve kargo belgeleri yapay zeka tarafından analiz edilir. İsim, tutar ve sipariş numarası otomatik eşleştirilir.' },
              { icon: Clock, iconBg: '#fef3c7', iconColor: '#d97706', title: '48 Saat Otomatik Çözüm', desc: 'AI belgeyi doğruladıktan sonra müşteriye bildirim gider. 48 saat içinde itiraz gelmezse şikayet otomatik olarak çözüldü statüsüne geçer.' },
              { icon: TrendingUp, iconBg: '#d1fae5', iconColor: '#059669', title: 'Superscore Puanı', desc: 'Çözüm hızı, yanıt oranı, belge doğrulama ve müşteri puanlarından oluşan 0-100 arası güven puanı. Sitenize widget olarak ekleyin.' },
              { icon: Code, iconBg: '#e0f2fe', iconColor: '#0284c7', title: 'Gömülebilir Widget', desc: 'Superscore puanınızı web sitenize tek satır kodla ekleyin. Ziyaretçilerinize güven verin, dönüşüm oranlarınızı artırın.' },
              { icon: BarChart3, iconBg: '#fde8e8', iconColor: '#dc2626', title: 'Detaylı Analitik', desc: 'Şikayet trendleri, yanıt süresi analizi, kategori bazlı raporlar ve rakip karşılaştırması ile müşteri deneyiminizi ölçün.' },
              { icon: Zap, iconBg: '#fef9c3', iconColor: '#ca8a04', title: 'Anlık Bildirimler', desc: 'Yeni şikayet, müşteri itirazı ve çözüm onayı gibi kritik olaylardan anında haberdar olun. E-posta ve uygulama içi bildirimler.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: f.iconBg }}>
                  <f.icon className="h-6 w-6" style={{ color: f.iconColor }} />
                </div>
                <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions - How it benefits brands */}
      <section id="cozumler" className="bg-[#f3f0ed] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.ctfassets.net/wonkqgvit51x/12DtILKgt17GNdVUArTLTR/e3ab92897a6bcc49294c8a5b623b748f/Gold_release_Green.png" alt="Superscore" className="w-full max-w-md mx-auto" />
            </div>
            <div className="flex-1">
              <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-6">
                Şikayetleri remarketing fırsatına dönüştürün
              </h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#1b1a1b]">
                  <Check className="h-5 w-5 text-[#04da8d] mt-0.5 flex-shrink-0" />
                  <span>Çözülen her şikayet, markanızın <strong>Superscore puanını yükseltir</strong> ve güvenilirliğinizi artırır.</span>
                </li>
                <li className="flex items-start gap-2 text-[#1b1a1b]">
                  <Check className="h-5 w-5 text-[#04da8d] mt-0.5 flex-shrink-0" />
                  <span>Müşterileriniz çözümden memnun kaldığında <strong>olumlu değerlendirme</strong> bırakır.</span>
                </li>
                <li className="flex items-start gap-2 text-[#1b1a1b]">
                  <Check className="h-5 w-5 text-[#04da8d] mt-0.5 flex-shrink-0" />
                  <span>Sitenize eklediğiniz <strong>Superscore widget</strong> ile ziyaretçilere güven verin.</span>
                </li>
                <li className="flex items-start gap-2 text-[#1b1a1b]">
                  <Check className="h-5 w-5 text-[#04da8d] mt-0.5 flex-shrink-0" />
                  <span>Belge bazlı doğrulama sayesinde <strong>asılsız şikayetler sizi etkilemez.</strong></span>
                </li>
              </ul>
              <Link href="/kayit?tab=brand">
                <button className="px-6 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] transition-colors">
                  Hemen Başlayın
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data/Analytics */}
      <section className="bg-[#f3f0ed] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-4">
                Veriye dayalı kararlar alın
              </h2>
              <p className="text-[#1b1a1b]/80 mb-8 leading-relaxed">
                Hangi kategorilerde daha çok şikayet alıyorsunuz? Ortalama çözüm süreniz ne kadar? Rakiplerinizle nasıl karşılaştırılıyorsunuz? Superscore analitik paneli tüm bu soruların cevabını veriyor.
              </p>
              <Link href="/kayit?tab=brand">
                <button className="px-6 py-3 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                  Analitik Paneli Keşfedin
                </button>
              </Link>
            </div>
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.ctfassets.net/wonkqgvit51x/3OucQm7BNShFok00l7j5jF/277a621ab64960d256d15d53beb0ed83/TrustLayer_Hero_image__2_.png" alt="Superscore Analytics" className="w-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Card Grid Section */}
      <section className="bg-[#f3f0ed] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Row 1: Small left + Wide right */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* E-Ticaret Entegrasyonu - 2/5 width */}
              <div className="md:col-span-2 bg-[#e8e6e3] rounded-[24px] p-8">
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-4">
                  E-Ticaret Altyapı Entegrasyonu
                </h3>
                <p className="text-sm text-[#1b1a1b]/70 mb-6 leading-relaxed">
                  Trendyol, Hepsiburada, Shopify, ikas ve diğer e-ticaret altyapılarıyla entegre olun. Sipariş numarası ile otomatik doğrulama yapın, her teslimat sonrası müşterilerinize otomatik SMS ve e-posta ile değerlendirme daveti gönderin.
                </p>
                <Link href="/business">
                  <button className="px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                    Daha fazla bilgi edinin
                  </button>
                </Link>
              </div>

              {/* Doğrulanmış Sipariş - 3/5 width */}
              <div className="md:col-span-3 bg-[#e8e6e3] rounded-[24px] p-8">
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-4">
                  Doğrulanmış Sipariş Sistemi
                </h3>
                <p className="text-sm text-[#1b1a1b]/70 mb-6 leading-relaxed">
                  E-ticaret entegrasyonu sayesinde şikayetlerdeki sipariş numaraları otomatik olarak doğrulanır. Doğrulanan siparişlerin yanında &quot;Sipariş Doğrulandı&quot; rozeti gösterilir ve bu şikayetler daha yüksek güvenilirlik puanı alır.
                </p>
                <Link href="/business">
                  <button className="px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                    Entegrasyonları görüntüle
                  </button>
                </Link>
              </div>
            </div>

            {/* Row 2: Wide left + Small right (green) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Fiyatlandırma - 3/5 width */}
              <div className="md:col-span-3 bg-[#e8e6e3] rounded-[24px] p-8">
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-4">
                  İşletmeniz için doğru fiyatlandırma planını bulun.
                </h3>
                <p className="text-sm text-[#1b1a1b]/70 mb-6 leading-relaxed">
                  İster yeni bir işletme olun ister köklü bir marka, daha önce hiç olmadığı kadar çok müşteriye ulaşmanıza yardımcı olacak çeşitli planlarımız var. 30 gün ücretsiz başlayın.
                </p>
                <Link href="/business">
                  <button className="px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                    Fiyat planlarını inceleyin
                  </button>
                </Link>
              </div>

              {/* Widget - 2/5 width, green bg */}
              <div className="md:col-span-2 bg-[#04da8d] rounded-[24px] p-8">
                <h3 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-4">
                  Superscore Widget&apos;ları
                </h3>
                <p className="text-sm text-[#1b1a1b]/70 mb-6 leading-relaxed">
                  Sitenize Superscore puanınızı gösteren widget ekleyin. Ziyaretçilerin %73&apos;ü güven rozetli sitelerde alışveriş yapma olasılığının daha yüksek olduğunu söylüyor.
                </p>
                <Link href="/business">
                  <button className="px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                    Daha fazla bilgi edin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#04da8d] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-4">
            Müşteri güvenini kazanmaya başlayın
          </h2>
          <p className="text-[#1b1a1b]/80 mb-8 max-w-lg mx-auto">
            30 gün ücretsiz. Kredi kartı gerekmez. İlk şikayetinizi çözün ve farkı görün.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/kayit?tab=brand">
              <button className="px-8 py-4 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors">
                Ücretsiz Başlayın <ArrowRight className="h-4 w-4 inline ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
