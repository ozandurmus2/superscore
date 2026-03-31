import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2KDHodsW8v5FF8OIKsAWAD%2F666c0abebe05f0f1e4652cc8949d1698%2FMarket_insights_video_thumbnail.jpg&w=640&q=75';
const IMG_PEERS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3ijVuXNzoVtbWdIEAcvwjR%2F873ef8b39bb207bbd4c98e8745a5b3d5%2FENG_-_Market_peers.png&w=1080&q=75';
const IMG_TRENDS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3riuMcef2OCmO0Pvq5ATdx%2Fa52a2811c547143e7045adfb1f34116c%2FMarket_trends.webp&w=640&q=75';
const IMG_TOPICS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F61zlgXmnNJebSj5Tn471Or%2F91069bba6a84b1505629bcb64647cfed%2FENG_-_Market_topics.png&w=1080&q=75';
const IMG_COMPETITORS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2M9TA0s5mrQInBM9Bp7I4Y%2F6fafbd9e2516b6023c199f6a3fb9faae%2FENG_-Competitors.png&w=1080&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Piyasa emsalleri',
    title: 'İşletmenizin diğer işletmelerle nasıl karşılaştırıldığını öğrenin.',
    desc: 'Rakiplerinizin performansına dair önemli bilgiler edinmek ve bunları Superscore\'un temel ölçütleriyle kendi performansınızla karşılaştırmak için rakiplerinizin adını veya web sitesi URL\'sini girmeniz yeterli.',
    img: IMG_PEERS,
    reverse: false,
  },
  {
    tag: 'Piyasa trendleri',
    title: 'Piyasa performansınızı kıyaslayın.',
    desc: 'Son altı ayda temel değerlendirme ölçütlerinin nasıl değiştiğini inceleyerek pazar dağılımınızı ölçün ve piyasadaki performansınızı değerlendirin.',
    img: IMG_TRENDS,
    reverse: true,
  },
  {
    tag: 'Piyasa konuları',
    title: 'Müşterilerinizin düşüncelerini tanıyın.',
    desc: 'Müşterileriniz için gerçekten neyin önemli olduğunu anlayarak rekabet avantajı elde edin. Gelişmiş konu verilerimiz, hedef kitleniz ve piyasadaki benzer şirketlerin müşterileri için en ilgi çekici konuları ortaya koymaktadır.',
    img: IMG_TOPICS,
    reverse: false,
  },
];

/* ── related features ── */
const RELATED = [
  {
    title: 'Yorum İçgörüleri',
    desc: 'Daha derin müşteri içgörüleri elde edin ve temel geri bildirim eğilimleri ve müşteri duygularına dair anlayışınızı geliştirin.',
    link: '/business/ozellikler/yorum-icgoruleri',
  },
  {
    title: 'Kontrol Paneli ve Analizler',
    desc: 'Müşteri geri bildirimlerinden önemli bilgiler edinin, müşteri etkileşimlerini izleyin ve optimize edin, böylece işletmenizin büyümesini artırın.',
    link: '/business/ozellikler/veri-analitik',
  },
  {
    title: 'Yorum Etiketleri',
    desc: 'Etiketleri kullanarak geri bildirimleri hızlıca kategorize edin ve değerlendirme yönetimini kolaylaştırarak yanıt stratejilerinizi geliştirin.',
    link: '/business/ozellikler/yorum-etiketleme',
  },
];

export default function RakipAnaliziPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Pazar analizleri</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Gerçek iş iyileştirmelerine giden yolu göstermek
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Piyasadaki değişimleri yakından takip edin ve sürekli değişen piyasa trendleri ve konu analizleriyle yönlendirilen özel bilgilerle öne çıkın.
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
                <Image src={HERO_IMG} alt="Superscore Rakip Analizi" width={640} height={480} className="w-full h-auto rounded-xl" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#fce4ee] border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Yapay zeka ve makine öğrenimi, Superscore&apos;daki kapsamlı işletme verilerini analiz ederek şirketinizin benzer işletmelerle birlikte karşılaştırmalı analiz için bir gruba yerleştirilmesini sağlar.
          </h2>
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
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {s.desc}
                </p>
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

      {/* ═══ RAKİPLER (koyu tema) ═══ */}
      <section className="bg-[#412612]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-white/50 mb-2">Rakipler</p>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-white leading-tight mb-4">
                Rekabet ortamını yakından takip edin.
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
                Beş şirkete kadar olan verileri takip ederek rakiplerinize karşı nasıl bir konumda olduğunuzu görün. Ayrıntılı karşılaştırma verileri ve önemli gelişmelerle ilgili iş zekası sayesinde, en yakın rakiplerinizin nasıl performans gösterdiğine dair zengin bilgiler edineceksiniz.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={IMG_COMPETITORS} alt="Rakip Karşılaştırma" width={880} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BU DA İLGİNİZİ ÇEKEBİLİR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Bu da ilginizi çekebilir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map(r => (
              <div key={r.title} className="text-center">
                <div className="w-full h-48 bg-[#f7f5f0] rounded-xl mb-5 flex items-center justify-center">
                  <span className="text-sm text-gray-400">Görsel</span>
                </div>
                <h3 className="text-lg font-bold text-[#1b1a1b] mb-2">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <Link href={r.link} className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-4 hover:text-[#f95a98] transition-colors">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Yorumların tüm potansiyelini ortaya çıkarmaya hazır mısınız?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}
