import Link from 'next/link';
import Image from 'next/image';
import {
  Mail, Send, Bell, Clock, Zap, QrCode,
  Smartphone, BarChart3, Search, MessageSquare, Star,
} from 'lucide-react';

const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F64eGzNoSar78bbr6Do69oC%2Fa70da6a4844bb6de3b3f38e37da4efa3%2FReview_Invitations_-_Jumbotron.png&w=1920&q=75';
const IMG_OPTIMIZE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2FJzUbTxMa2BC0Yw6N8yd1O%2F04d97a42530b2ed55981a93cc5c47641%2F2-Optimize_invitations_to_get_more_reviews_-_Reviews_Invitation_page.png&w=1080&q=75';

/* ── invitation methods ── */
const METHODS = [
  {
    icon: Mail,
    title: 'E-posta Davetiyesi',
    desc: 'Satın alma sonrası otomatik e-posta ile yorum daveti gönderin. Markanıza özel şablonlar kullanın.',
    color: '#fde8d0',
    iconColor: '#e8945a',
  },
  {
    icon: Smartphone,
    title: 'SMS Davetiyesi',
    desc: 'Kısa mesaj ile müşterilerinize ulaşın. SMS açılma oranı %98 — en etkili davet yöntemi.',
    color: '#d4edda',
    iconColor: '#52b37f',
  },
  {
    icon: QrCode,
    title: 'QR Kod',
    desc: 'Fiziksel mağazanızda QR kod ile anında yorum toplayın. Masaya, kasaya veya fişe ekleyin.',
    color: '#d4e5f7',
    iconColor: '#3c57bc',
  },
  {
    icon: Zap,
    title: 'API Entegrasyonu',
    desc: 'Kendi sisteminizden otomatik davet gönderin. REST API ile CRM veya e-ticaret altyapınıza entegre edin.',
    color: '#e0d8f0',
    iconColor: '#8b6fbf',
  },
];

/* ── extra features ── */
const EXTRAS = [
  {
    title: 'Şirket API Bağlantısı',
    desc: 'Müşterilerinizi şirket profil sayfanızda yorum bırakmaya davet etmek için e-posta hizmetinize ekleyebileceğiniz bir API bağlantısı oluşturun.',
  },
  {
    title: 'Davetiye Şablonları',
    desc: 'Superscore\'un yorum daveti e-posta şablonları, size çok sayıda müşteri yorumu kazandırmak için sürekli olarak test edilmekte ve optimize edilmektedir. Şablonlar markanıza ve tarzınıza uyacak şekilde tamamen özelleştirilebilir.',
  },
  {
    title: 'Hatırlatma E-postaları',
    desc: 'Daha da fazla yorum mu arıyorsunuz? Hatırlatma e-postaları, müşterilerinize gönderilen dostane ve otomatik bir uyarıdır ve ortalama %35 daha fazla yorum toplamanızı sağlar.',
  },
];

/* ── integrations ── */
const INTEGRATIONS = ['Trendyol', 'Hepsiburada', 'N11', 'Shopify', 'WooCommerce', 'İkasta'];

/* ── related features ── */
const RELATED = [
  {
    title: 'SEO & Yapay Zeka Keşfi',
    desc: 'Güvenilir üçüncü taraf verileriyle yapay zeka aramalarında görünürlüğü artırın ve öne çıkan inceleme içerikleriyle arama sıralamasını ve web trafiğini iyileştirin.',
    href: '/business/ozellikler/seo-ai-kesfi',
    color: '#f5d553',
  },
  {
    title: 'Yorumlara Yanıt Verin',
    desc: 'Müşterilerinize teşekkür etmek, sorunları çözmek ve onlara gerçekten değer verdiğinizi dünyaya göstermek için onlara geri yazın.',
    href: '/business/geri-bildirim',
    color: '#fe7a1a',
  },
  {
    title: 'Superscore Widget\'ları',
    desc: 'Superscore widget\'ları ile sitenizde yorumlarınızı görüntüleyin. Kod kopyala yapıştır yöntemiyle, yorumlarınızı sitenizde, e-posta imzalarınızda ve bültenlerinizde paylaşın.',
    href: '/business/ozellikler/widgetlar',
    color: '#f95a98',
  },
];

export default function YorumDavetleriPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Davetiyeleri inceleyin</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-3">
                Sadece sormanız yeterli.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşteri geri bildirimlerini asla kaçırmayın. E-posta, SMS ve QR kod ile otomatik yorum davetleri gönderin.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo rezervasyonu yapın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={HERO_IMG} alt="Yorum davetleri" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            İnsanlar, benzer bir ürüne kıyasla daha yüksek puan almış ancak daha az yorumu olan bir ürünü, daha fazla yorumu olan bir ürüne tercih ederler.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50 underline">Psikolojik Bilimler Derneği&apos;nden bir çalışma</p>
        </div>
      </section>

      {/* ═══ DAVET YÖNTEMLERİ ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-4">
            4 farklı yöntemle yorum toplayın
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            Müşterilerinize en uygun kanaldan ulaşın. Her yöntem otomatik olarak çalışır — siz arkanıza yaslanın.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {METHODS.map(m => (
              <div key={m.title} className="bg-[#f7f5f0] rounded-2xl p-6 hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: m.color }}>
                  <m.icon className="w-6 h-6" style={{ color: m.iconColor }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1b1a1b] mb-2">{m.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPTIMIZE SECTION ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={IMG_OPTIMIZE} alt="Davetiye optimizasyonu" width={880} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Otomatik Davetiyeler</p>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Daha fazla yorum almak için davetiyelerinizi optimize edin.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Kendi otomatik geri bildirim çözümümüzü kullanarak veya öne gelen e-ticaret platformları ve pazarlama araçlarıyla kullanıma hazır entegrasyonlar aracılığıyla müşterilerinizi otomatik olarak yorum yazmaya davet edin. Ardından arkanıza yaslanın ve yorumların birikmesini izleyin.
              </p>
            </div>
          </div>

          {/* Timing & Smart Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-2xl p-6 text-center">
              <Clock className="w-10 h-10 text-[#fe7a1a] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#1b1a1b] mb-2">Akıllı Zamanlama</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Satın alma sonrası en ideal zamanda davet gönderin. Yapay zeka en yüksek yanıt oranını hesaplar.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <Bell className="w-10 h-10 text-[#3c57bc] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#1b1a1b] mb-2">Otomatik Hatırlatma</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Yanıt vermeyen müşterilere nazik bir hatırlatma gönderin. Ortalama %35 daha fazla yorum toplayın.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <BarChart3 className="w-10 h-10 text-[#52b37f] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#1b1a1b] mb-2">Performans Takibi</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Hangi davet yönteminin en iyi sonuç verdiğini, açılma ve yanıt oranlarını anlık takip edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EK ÖZELLİKLER ═══ */}
      <section className="bg-[#3d3d1e] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10 sm:mb-14">
            Ek Özellikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRAS.map(e => (
              <div key={e.title} className="text-center">
                <h3 className="text-base font-bold mb-3">{e.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTEGRASYONLAR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-10">
            Mevcut araçlarınızla kolayca entegre oluyoruz.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {INTEGRATIONS.map(name => (
              <div key={name} className="flex items-center justify-center h-16 sm:h-20">
                <span className="text-lg sm:text-xl font-bold text-[#1b1a1b]/70">{name}</span>
              </div>
            ))}
          </div>
          <Link
            href="/business/ozellikler/entegrasyonlar"
            className="inline-block px-6 py-3 border-2 border-[#1b1a1b] text-sm font-bold text-[#1b1a1b] rounded-full hover:bg-[#1b1a1b] hover:text-white transition-colors"
          >
            Tüm entegrasyonları görüntüle
          </Link>
        </div>
      </section>

      {/* ═══ BU DA İLGİNİZİ ÇEKEBİLİR ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10">
            Bu da ilginizi çekebilir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map(r => (
              <div key={r.title} className="text-center">
                <div className="rounded-2xl overflow-hidden mb-4 aspect-[16/10] flex items-center justify-center" style={{ backgroundColor: r.color }}>
                  <Star className="w-12 h-12 text-white/80" fill="currentColor" />
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <Link href={r.href} className="text-[13px] font-semibold text-[#3c57bc] hover:underline">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-3xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Hangi yorum daveti yönteminin sizin için doğru olduğunu görmek ister misiniz?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}
