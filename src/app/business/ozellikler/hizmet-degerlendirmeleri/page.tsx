import Link from 'next/link';
import Image from 'next/image';
import {
  Star, Search, MessageSquareText, Shield, QrCode,
  Mail, Bell, CheckCircle2, BarChart3, Brain,
} from 'lucide-react';

const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5FgzNLyZ1KiTXAByxpAb6R%2Fabeb8be8e259c3078554a7e4ff8a9564%2FService_reviews-_Jumbotron.png&w=3840&q=75';
const SEC_IMG_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3dlCNzC7Q2cbQK78TCXbAb%2F94e98ed5483cc377f5446457bb3fa578%2F1-Catch_the_eye_of_future_customers_-_Service_reviews_page.png&w=3840&q=75';
const SEC_IMG_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7hIqzXPmUsD6CB63dWxG4F%2Fa45d98a0efcb2ed35a2f4a23de924eed%2F3-All_you_have_to_do_is_ask_-_Service_reviews_page.png&w=3840&q=75';
const SEC_IMG_3 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2BCPE3LET3t4bpAX9rElod%2Ff0974a25b3398b37f515cfc2b2f35aeb%2F4-Build_trust_with_transparency_-_Service_reviews_page.png&w=3840&q=75';
const STORY_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5rguDzkFlcrfjVcVOgL8WF%2F65bac7b1b94bfb270ba28a25c7a45e68%2FSmartphone_usage.png&w=3840&q=75';

const STEPS = [
  {
    num: '1',
    title: 'Yorumları topla',
    desc: 'Müşteri yorumlarını toplamaya başlayın. Otomatik davet araçlarımızı kullanarak tüm müşterilerinizden doğrulanmış yorumlar toplayın.',
  },
  {
    num: '2',
    title: 'Görünürlüğü iyileştirin',
    desc: 'Reklamlarınızda Google Mağaza Puanları kazanarak, organik aramalarda yorum yıldızları alarak ve sosyal medyada paylaşarak yapay zeka aramalarında görünürlük elde edin.',
  },
  {
    num: '3',
    title: 'Hizmeti geliştirin',
    desc: 'Tüketicilerle aktif olarak etkileşim kurarak ve geri bildirimleri analiz ederek stratejinizi geliştirin. Yapay zeka sistemleri bunu güvenilirlik işareti olarak görür.',
  },
  {
    num: '4',
    title: 'Güveni sergileyin',
    desc: 'Müşteri güvenini artırmak, satışları yükseltmek ve görünür bir güven ortamı oluşturmak için web sitenize ve reklamlarınıza Superscore widget\'ları ekleyin.',
  },
];

export default function HizmetDegerlendirmeleriPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Müşteri geri bildirimlerini büyümeye dönüştürün
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Superscore yorumlarınız yalnızca sizin ve müşterilerinizin birbiriniz hakkında bilgi edinmenizi sağlamakla kalmaz, aynı zamanda arama sonuçlarında görünmenize yardımcı olan güvenilir üçüncü taraf verilerini de sunar.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo rezervasyonu yapın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">
                <Image src={HERO_IMG} alt="Hizmet değerlendirmeleri" width={840} height={840} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NASIL ÇALIŞIR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(s => (
              <div key={s.num} className="text-center">
                <div className="w-10 h-10 rounded-full border-2 border-[#1b1a1b] flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-[#1b1a1b]">{s.num}</span>
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          {/* Row 1: Aramada kazan */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-28">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2 block">Aramada kazan</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Müşteri güveniyle keşifleri yönlendirin.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Yorumlar doğrudan Superscore&apos;daki profil sayfanızda yayınlanır ve bu da markanız hakkında sürekli olarak yeni ve alakalı içerik akışı oluşturarak hem geleneksel hem de yapay zeka arama sonuçlarında görünürlüğünüzü artırabilir.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_1} alt="Arama sonuçlarında görünürlük" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>

          {/* Row 2: Geri bildirimi otomatikleştirin */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-28">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_2} alt="Otomatik yorum toplama" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2 block">Geri bildirimi otomatikleştirin</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Proaktif bir şekilde güvenilirliği artırın.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 mb-4">
                Tüketiciler sadece puanlarla ilgilenmiyor; kaç yorumunuz olduğu ve yorumların ne kadar güncel olduğu da önemli. Sürekli olarak geri bildirim toplamanızı sağlayacak çeşitli otomatik yorum daveti yöntemleri sunuyoruz.
              </p>
              <div className="flex flex-col gap-2 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-sm text-[#1b1a1b]">
                  <Mail className="w-4 h-4 text-[#3c57bc]" /> <span>E-posta davetleri</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1b1a1b]">
                  <QrCode className="w-4 h-4 text-[#3c57bc]" /> <span>QR Kod değerlendirme</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1b1a1b]">
                  <Bell className="w-4 h-4 text-[#3c57bc]" /> <span>Otomatik hatırlatmalar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Dürüstlük sunun */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2 block">Dürüstlük sunun</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Şeffaflıkla güven inşa edin.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Otomatik sahtekarlık tespit yazılımı, hem tüketicilerin hem de işletmelerin haksız uygulamalarını önlemek için her yorumun gerçekliğini kontrol eder. Ayrıca yorumların nasıl toplandığını ve yönetildiğini de gösteriyoruz; böylece hem siz hem de müşterileriniz yorumlarınızın doğruluğuna güvenebilirsiniz.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_3} alt="Şeffaflık ve güven" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MÜŞTERİ HİKAYESİ ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[400px]">
                <Image src={STORY_IMG} alt="Başarı hikayesi" width={800} height={700} className="w-full h-auto rounded-2xl" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="text-xs font-medium text-gray-400 mb-2 block">Müşteri hikayesi</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-4 leading-tight">
                Tıklama oranında %93, dönüşüm oranlarında ise %14,5 artış görüldü.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Sadece bir ay içinde Superscore&apos;da reklam kampanyalarına Google Mağaza Derecelendirmesi ekleme hakkı kazanacak kadar yorum topladı. Bu yıldız derecelendirmesi, işletmelerini farklılaştırmak ve birisi sayfalarını ziyaret etmeden önce bile güvenilirlik oluşturmak için PPC reklamlarına dahil edildi.
              </p>
              <Link href="#" className="text-sm font-semibold text-[#3c57bc] hover:underline">
                Vaka incelemesini okuyun →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ÖZELLİKLER ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Hizmet değerlendirmelerinizi güçlendirin.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: Star,
                title: 'Doğrulanmış Yorumlar',
                desc: 'Her yorum otomatik doğrulama sürecinden geçer. Gerçek müşteri deneyimlerine dayanan güvenilir değerlendirmeler.',
                color: '#fff9c4', iconColor: '#f9a825',
              },
              {
                icon: QrCode,
                title: 'QR Kod Değerlendirme',
                desc: 'Mağaza, restoran veya ofisinizde QR kod ile müşterilerden anında yorum toplayın. Fiziksel deneyimi dijitale taşıyın.',
                color: '#f3e5f5', iconColor: '#9c27b0',
              },
              {
                icon: Brain,
                title: 'Yapay Zeka Analizi',
                desc: 'Yorumlarınızdaki duygu tonunu, temaları ve trendleri yapay zeka ile otomatik analiz edin.',
                color: '#e3f2fd', iconColor: '#42a5f5',
              },
              {
                icon: Shield,
                title: 'Sahte Yorum Tespiti',
                desc: 'Otomatik sahtekarlık tespit sistemi ile sahte ve spam yorumları filtreleyin. Güvenilirliğinizi koruyun.',
                color: '#e0f2f1', iconColor: '#26a69a',
              },
              {
                icon: BarChart3,
                title: 'Performans Analitikleri',
                desc: 'Yorum trendlerini, puan dağılımını ve müşteri memnuniyet oranlarını detaylı analitik panelde takip edin.',
                color: '#fde8d0', iconColor: '#e8945a',
              },
              {
                icon: MessageSquareText,
                title: 'Akıllı Yanıt Önerileri',
                desc: 'Yapay zeka destekli yanıt şablonları ile yorumlara hızlı, profesyonel ve empatik yanıtlar verin.',
                color: '#e0f7e9', iconColor: '#04da8d',
              },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 sm:p-7 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: f.color }}>
                  <f.icon className="w-5 h-5" style={{ color: f.iconColor }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1b1a1b] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Sitenize daha fazla ziyaretçi çekmek için yorumlardan yararlanmak ister misiniz?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}
