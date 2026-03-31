import Link from 'next/link';
import Image from 'next/image';
import {
  QrCode, MapPin, Star, Smartphone, Store, BarChart3,
  Users, MessageSquare, Share2, Shield, Eye,
} from 'lucide-react';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2jW8Y69BhXUs4i61uUAnk0%2F0830258e7519f416dc453f9cd26fb88f%2FLocation_reviews_-_Jumbotron-ENG.png&w=1920&q=75';
const IMG_SEO = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F4tARMaPQTUh0BxcyQLgZt2%2F205fe515390dd92ce903ac74c96c4d56%2F1-Rank_higher_in_searches_for_local_businesses_-_Location_reviews_page.png&w=1080&q=75';
const IMG_LOCATION = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7ww1m9rSfxAUQK05QwX65H%2Fa7c625f78e897e7f9955106e023e2fca%2F2-Show_off_reviews_from_each_location_-_Location_reviews_page.png&w=1080&q=75';
const IMG_TEAMS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2eRxX51eD7M8wygVCPdHex%2F42e6487d6501a451c668c9326f1731de%2F3-Manage_your_local_teams_with_ease_-_Location_reviews_page.png&w=1080&q=75';
const IMG_PERF = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1ihMYiz96X9oxcgYe8Yjh8%2F6bc288b5527533aea0e4271322894eaa%2F4-See_how_each_location_performs_-_Location_reviews_page.png&w=1080&q=75';
const IMG_CASE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F35O3XZvls1oSOHTe5q89SB%2F296cc4b47eeb9c407d3dd072ee95eed5%2FCase-image-min.png&w=3840&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Yerel SEO',
    title: 'Yerel işletmeler için yapılan aramalarda daha üst sıralarda yer alın.',
    desc: 'QR kod ile toplanan konum bazlı yorumlar, Google Haritalar ve yerel aramalarda sıralamanızı yükseltir. Müşteriler fiziksel lokasyonunuzda anında yorum bırakır, bu da sitenize daha fazla trafik ve mağazalarınıza daha fazla müşteri çekebilir.',
    extra: 'Biliyor muydunuz? Yerel aramalarda üst sıralarda yer alan işletmeler %42 daha fazla mağaza ziyareti alıyor.',
    img: IMG_SEO,
    reverse: false,
  },
  {
    tag: 'Konum Güven Kutuları',
    title: 'Her lokasyondan gelen yorumları sergileyin.',
    desc: 'Farklı coğrafyalardaki alışveriş yapanlara hitap etmek için en alakalı yerlerden gelen yorumları göstererek dönüşüm oranlarınızı artırın. QR kod ile her şubenize özel yorum toplama bağlantısı oluşturun.',
    extra: 'Biliyor muydunuz? Ziyaretçilerin %73,6\'sı, sitelerinde lokasyon bazlı yorumları gösteren bir web sitesinden alışveriş yapma olasılıklarının daha yüksek olduğunu söylüyor.',
    img: IMG_LOCATION,
    reverse: true,
  },
  {
    tag: 'Kullanıcı yönetimi rolleri',
    title: 'Yerel ekiplerinizi kolaylıkla yönetin.',
    desc: 'Platformda mağaza veya şube yöneticilerinin hangi özelliklere erişebileceğini kontrol edin. Ekip arkadaşlarınıza farklı erişim seviyeleri verin veya yalnızca belirli bir konum için yorumlara yanıt verebilmelerini sınırlayın.',
    extra: null,
    img: IMG_TEAMS,
    reverse: false,
  },
  {
    tag: 'Kontrol panelini inceleyin',
    title: 'Her bir lokasyonun performansını inceleyin.',
    desc: 'Tüm şubelerinizdeki müşteri memnuniyetini gözden geçirin ve karşılaştırın. Hangi mağazanın öne çıktığını ve hangilerinin harika müşteri deneyimlerini harika yorumlara dönüştürmek için dikkatinizi gerektirdiğini keşfedin.',
    extra: null,
    img: IMG_PERF,
    reverse: true,
  },
];

/* ── how it works ── */
const STEPS = [
  {
    icon: '/logo/icon_globe.svg',
    title: 'Konumlarınızı ekleyin.',
    desc: 'Şirketinizin fiziksel konumlarını içeren bir CSV dosyası yükleyin veya kullanımı kolay kurulum sihirbazımızı kullanın.',
  },
  {
    icon: '/logo/icon_invitation.svg',
    title: 'QR kodları oluşturun.',
    desc: 'Her lokasyon için benzersiz QR kodlar oluşturun. Masalara, kasalara veya vitrinlere yerleştirin. Müşteriler telefonlarıyla tarayıp anında yorum bıraksın.',
  },
  {
    icon: '/logo/ICON_-_Collect_reviews_automatically.svg',
    title: 'Yorumları otomatik olarak toplayın.',
    desc: 'Arkanıza yaslanın ve her bir lokasyonunuz için sürekli gelen yorumların keyfini çıkarın. QR kod, SMS ve e-posta ile toplama seçenekleri.',
  },
  {
    icon: '/logo/recommended-2850_rKsECAnIv-L.svg',
    title: 'Konum yorumlarınızı görüntüleyin.',
    desc: 'Web sitenize marka itibarınızı sergileyen araçlar ekleyerek müşteri güvenini artırın ve satışlarınızı yükseltin.',
  },
];

/* ── extra features ── */
const EXTRAS = [
  {
    title: 'Otomatik davetiyeler',
    desc: 'Her satın alımdan sonra müşterilerinize yorum daveti gönderin ve süreci otomatikleştirerek sizin için ekstra bir iş yükü oluşmasını engelleyin.',
    link: '/business/ozellikler/yorum-davetleri',
  },
  {
    title: 'Yorumlara yanıt ver',
    desc: 'Müşterilerinizle etkileşim kurun ve onlara değer verdiğinizi gösterin. Sorunları çözün, soruları yanıtlayın, takdirinizi gösterin ve uzun süreli bir ilişki kurun.',
    link: '/business/geri-bildirim',
  },
  {
    title: 'Sosyal paylaşım',
    desc: 'En iyi yorumlarınızı her sosyal medya kanalına uygun, dikkat çekici görsellere dönüştürün. Görsel oluşturucumuz sizin için tasarımı yapacak, size değerli zaman ve emekten tasarruf sağlayacaktır.',
    link: '/business/donusum',
  },
];

export default function QRDegerlendirmePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">QR Değerlendirme</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Yerel müşterilerle bağlantı kurun
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Lokasyonlarınız hakkında daha fazla bilgi edinin ve QR kod ile lokasyona özel yorumlar toplayarak tüm mağazalarınıza yeni müşteri kazandırın. Masaya koy, tarat, yorum al — bu kadar basit.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo alın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px] lg:w-[440px]">
                <Image src={HERO_IMG} alt="QR Değerlendirme" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Perakende satışlarının %90&apos;ı hala fiziksel mağazalarda gerçekleşiyor.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50 underline">Deloitte&apos;un 2020 Perakende Sektörü Görünümü raporu.</p>
        </div>
      </section>

      {/* ═══ QR KOD NASIL ÇALIŞIR - ÖNE ÇIKAN BÖLÜM ═══ */}
      <section className="bg-[#52b37f]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-12">
            <QrCode className="w-16 h-16 text-[#1b1a1b] mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-3">
              QR Kod ile Anında Yorum Toplama
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Türkiye&apos;de bir ilk! Fiziksel mağazanıza, restoranınıza veya ofisinize QR kod yerleştirin. Müşterileriniz telefonlarıyla tarayıp 30 saniyede yorum bıraksın. Hiçbir uygulama indirmeye gerek yok.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <Smartphone className="w-10 h-10 text-[#52b37f] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Tara</h3>
              <p className="text-[13px] text-gray-500">Müşteri telefonuyla QR kodu tarar. Uygulama indirmeye gerek yok.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <Star className="w-10 h-10 text-[#f5d553] mx-auto mb-3" fill="#f5d553" />
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Değerlendir</h3>
              <p className="text-[13px] text-gray-500">Yıldız puanı verir, deneyimini yazar. 30 saniyede tamamlanır.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <BarChart3 className="w-10 h-10 text-[#3c57bc] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Analiz Et</h3>
              <p className="text-[13px] text-gray-500">Yorum anında Superscore profilinize yansır. Lokasyon bazlı analiz yapın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl space-y-20 lg:space-y-32">
          {SECTIONS.map((s, i) => (
            <div key={i} className={`flex flex-col ${s.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">{s.tag}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                  {s.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 max-w-md mx-auto lg:mx-0">
                  {s.desc}
                </p>
                {s.extra && (
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {s.extra}
                  </p>
                )}
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                  <Image src={s.img} alt={s.title} width={880} height={700} className="w-full h-auto" unoptimized />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Image src={s.icon} alt="" width={48} height={48} className="w-12 h-12" />
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY / TESTIMONIAL ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={IMG_CASE} alt="Müşteri hikayesi" fill className="object-cover" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic mb-4">
                &quot;Web sayfalarımızda konuma özel yıldız derecelendirmelerini gösterebilme özelliği, müşterilerin hizmet aldıkları yerin mükemmel bir geçmişe sahip olduğundan emin olmalarına yardımcı olur.&quot;
              </p>
              <p className="text-sm font-bold text-[#1b1a1b]">Örnek İşletme</p>
              <p className="text-xs text-gray-500">Superscore Kullanıcısı</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXTRA FEATURES ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Ek Özellikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRAS.map(e => (
              <div key={e.title} className="text-center">
                <h3 className="text-base font-bold text-[#1b1a1b] mb-3">{e.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{e.desc}</p>
                <Link href={e.link} className="text-[13px] font-semibold text-[#3c57bc] hover:underline">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ İLGİNİZİ ÇEKEBİLİR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10">
            Bu da ilginizi çekebilir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#52b37f]/10 rounded-2xl p-8 text-center">
              <Shield className="w-12 h-12 text-[#1b1a1b] mx-auto mb-4" />
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Platform Güvenlik Önlemleri</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                Özel olarak geliştirdiğimiz sahtecilik tespit yazılımımız ve tam zamanlı İçerik Bütünlüğü Ekibimiz, markanızı ve platformumuzu sahte yorumlardan korumaya ve işlerin sorunsuz yürümesini sağlamaya yardımcı olur.
              </p>
              <Link href="/business/ozellikler/guvenlik" className="text-[13px] font-semibold text-[#3c57bc] hover:underline">
                Devamını oku
              </Link>
            </div>
            <div className="bg-[#f0d9e0] rounded-2xl p-8 text-center">
              <Eye className="w-12 h-12 text-[#1b1a1b] mx-auto mb-4" />
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Gelişmiş Veri Gizliliği</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                Müşterilerinizin verilerini paylaşmadan yorum alın. Superscore sunucusundan bağımsız ve 256 bit AES şifrelemeyle korunan bir yorum daveti bağlantısı oluşturun.
              </p>
              <Link href="/business/ozellikler/gizlilik" className="text-[13px] font-semibold text-[#3c57bc] hover:underline">
                Devamını oku
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
            Müşterilerinizle etkileşime geçmeye bugün başlayın.
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}
