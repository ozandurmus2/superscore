import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5m7mfT0LNNLff6yolg5dSL%2Fc064123b2ec9b179d1b39d529ddc3fca%2FENG_-_AI_Review_Response_-_Orange.png&w=1920&q=75';
const IMG_ENGAGE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6exr4ea6DV8kvx6PxJHy5%2F52a1a69513a7b180be5559f7cfa98505%2F1-Engage_with_your_customers_-_Respond_to_reviews_page.png&w=1080&q=75';
const IMG_MANAGE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5xTr3TtlWrfTehHnsqN3HD%2Fabd4757233cbe12aed45d25a760e15b9%2F2-Easily_manage_all_your_reviews_-_Respond_to_reviews_page.png&w=1080&q=75';
const IMG_INTEGRATIONS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5Oprw0cHmq9RM2GixhcvUU%2F2a2286093d2cd1e147759e33405de52c%2Fcustomer_engagement.png&w=1080&q=75';

/* ── icons ── */
const ICON_ENVELOPE = 'https://images.ctfassets.net/wonkqgvit51x/6by4m86pZCdJr8aWDH7P1D/1c77b14434234130ed25c5c5a0e19ee9/Icon_envelope_star.svg';
const ICON_NOTIFICATION = 'https://images.ctfassets.net/wonkqgvit51x/dn7vwaUZJAK8DjFSIQI8q/fa15fe770a1c36ad2c04ddcc37f44ebf/Icon_notification.svg';
const ICON_PERSON = 'https://images.ctfassets.net/wonkqgvit51x/65eqtRkws2vTQTSNyk23wr/bd3ce0463ba75100decd585122aedc75/icon_person_responding.svg';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Kamuoyu tepkisi',
    title: 'Müşterilerinizle etkileşim kurun.',
    desc: 'Müşterilerinizi dinlediğinizi ve deneyimlerine önem verdiğinizi gösterin. Soruları yanıtlamak, sorunları çözmek, teşekkür etmek ve müşterilerinizle daha iyi bir ilişki kurmak için yorumlarınıza yanıt verin.',
    img: IMG_ENGAGE,
    reverse: false,
  },
  {
    tag: 'Yapay zeka destekli inceleme yanıtları',
    title: 'Akıllı yanıtlarla zamandan tasarruf edin',
    desc: 'Yapay zeka destekli yorum yanıtlarıyla, marka kimliğinize uygun, özenli yanıtlar oluşturarak geniş ölçekte güven inşa edin. Yüksek kaliteli etkileşimleri korurken kaynaklardan tasarruf edin:',
    bullets: [
      { bold: 'Kişiye özel öneriler:', text: 'Yorum uzunluğu ve duygu durumu gibi ayrıntıları dikkate alarak hızlıca kişiselleştirilmiş yanıtlar oluşturun.' },
      { bold: 'Kontrol ve özelleştirme:', text: 'Yapay zeka tarafından oluşturulan her yanıt düzenlenebilir, böylece yalnızca standartlarınıza uygun olduklarında onaylayıp gönderebilirsiniz.' },
      { bold: 'Akıllı öğrenme:', text: 'Ne kadar çok özelleştirme yaparsanız, yapay zeka markanızın benzersiz sesini o kadar iyi anlayacak ve ona uyum sağlayacaktır.' },
    ],
    img: HERO_IMG,
    reverse: true,
  },
  {
    tag: 'Gerçek zamanlı olarak yanıtla',
    title: 'Tüm yorumlarınızı kolayca yönetin.',
    desc: 'E-posta bildirimleri, müşteriler yeni bir yorum yazdığında size uyarı gönderir. Filtreleme seçenekleri, bildirim sıklığını kontrol etmenize ve sorunları gerçek zamanlı olarak çözmenize olanak tanır.',
    img: IMG_MANAGE,
    reverse: false,
  },
  {
    tag: 'Akıllı entegrasyonlar',
    title: 'Müşteri etkileşimini kolaylaştırın',
    desc: 'Superscore işletme hesabınızdan veya kendi yardım masası yazılımınızdan gelen müşteri geri bildirimlerini kolayca yönetin ve yanıtlayın. Zendesk, Freshdesk ve Slack entegrasyonları, Superscore yorumlarınızı izlemenize ve yanıtlamanıza olanak tanır.',
    img: IMG_INTEGRATIONS,
    reverse: true,
    hasButton: true,
  },
];

/* ── how it works steps ── */
const STEPS = [
  {
    icon: ICON_ENVELOPE,
    title: 'Yeni bir yorum alın',
    desc: 'Müşteri yorumlarınız, yorum daveti yoluyla veya müşterilerinizin profilinizde kendiliğinden yazdığı yorumlar aracılığıyla gelebilir.',
  },
  {
    icon: ICON_NOTIFICATION,
    title: 'Bir bildirim alın',
    desc: 'Bildirimleri tüm yorumlar için veya belirli yıldız derecelendirmeleri için gelmesini ayarlayabilirsiniz. Bildirimleri e-posta yoluyla veya Zendesk veya Slack gibi bir entegrasyon aracılığıyla alabilirsiniz.',
  },
  {
    icon: ICON_PERSON,
    title: 'Yorumu yanıtlayın',
    desc: 'Müşterilerinizin deneyimine önem verdiğinizi, değerlendirmeye bir yorum bırakarak dünyaya gösterin.',
  },
];

export default function YorumYanitlamaPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Yorumlara yanıt ver</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Dünyaya önemsediğinizi gösterin
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşterilerinize teşekkür etmek, sorunları çözmek ve dünyaya onları önemsediğinizi göstermek için onlara geri yazın.
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
                <Image src={HERO_IMG} alt="Superscore Yorum Yanıtlama" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#ffede3] border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Yorumlara yanıt vermek daha iyi puanlar almanızı sağlar.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50">Harvard Business Review&apos;da yayınlanan bir araştırmaya göre</p>
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
                {s.bullets && (
                  <ul className="mt-4 space-y-3 text-left max-w-md mx-auto lg:mx-0">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg className="w-5 h-5 text-[#04da8b] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          <strong className="text-[#1b1a1b]">{b.bold}</strong> {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.hasButton && (
                  <Link
                    href="/business/ozellikler/entegrasyonlar"
                    className="inline-block mt-6 px-6 py-3 border-2 border-[#1b1a1b] text-[#1b1a1b] text-sm font-bold rounded-full hover:bg-[#1b1a1b] hover:text-white transition-colors"
                  >
                    Tüm entegrasyonları görüntüle
                  </Link>
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

      {/* ═══ NASIL ÇALIŞIR ═══ */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Image src={s.icon} alt="" width={48} height={48} className="w-12 h-12" unoptimized />
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

      {/* ═══ CTA ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Yorumların tüm potansiyelini ortaya çıkarmaya hazır mısınız?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors mb-3">
            Demo rezervasyonu yapın
          </Link>
          <br />
          <Link href="/business/fiyatlandirma" className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-4 hover:text-white transition-colors">
            Fiyat planlarımızı inceleyin.
          </Link>
        </div>
      </section>
    </div>
  );
}
