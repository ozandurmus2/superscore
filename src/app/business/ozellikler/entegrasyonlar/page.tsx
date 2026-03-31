import Link from 'next/link';

/* ── entegrasyon kategorileri ── */
const E_TICARET = [
  { name: 'Trendyol', status: 'Aktif', desc: 'Trendyol mağazanızdaki siparişlerden otomatik yorum daveti gönderin ve yorumları senkronize edin.' },
  { name: 'Hepsiburada', status: 'Aktif', desc: 'Hepsiburada satışlarınız sonrası müşterilerinize otomatik değerlendirme daveti gönderin.' },
  { name: 'N11', status: 'Aktif', desc: 'N11 siparişlerinizi Superscore ile bağlayın, yorum toplama sürecini otomatikleştirin.' },
  { name: 'İkasta', status: 'Aktif', desc: 'İkasta altyapılı e-ticaret sitenize Superscore widget\'larını kolayca ekleyin ve yorumları yönetin.' },
  { name: 'Shopify', status: 'Yakında', desc: 'Shopify mağazanızı Superscore\'a bağlayarak sipariş sonrası otomatik yorum toplama.' },
  { name: 'WooCommerce', status: 'Yakında', desc: 'WordPress ve WooCommerce sitenize Superscore entegrasyonunu birkaç tıklamayla kurun.' },
];

const SIPARIS_DOGRULAMA = [
  { name: 'Sipariş Doğrulama API', desc: 'Gerçek müşterilerden gelen yorumları doğrulayın. Sipariş numarası eşleştirmesi ile sahte yorumları engelleyin.' },
  { name: 'Webhook Bildirimleri', desc: 'Yeni yorum, yanıt veya puan değişikliklerinde anında bildirim alın. Kendi sistemlerinizle entegre edin.' },
  { name: 'Toplu Davet API', desc: 'Mevcut müşteri listenizi yükleyin ve toplu yorum davetleri gönderin. CSV veya API ile entegrasyon.' },
];

const PAZARLAMA = [
  { name: 'Google Seller Ratings', desc: 'Superscore yorumlarınızı Google Ads\'te yıldız olarak gösterin. Tıklama oranlarınızı artırın.' },
  { name: 'Google Shopping', desc: 'Ürün yorumlarınızı Google Alışveriş listelerinizde sergileyin.' },
  { name: 'Meta (Facebook & Instagram)', desc: 'Sosyal medya reklamlarınızda müşteri yorumlarını kullanın ve güvenilirliğinizi artırın.' },
];

const DESTEK = [
  { name: 'Zendesk', status: 'Yakında', desc: 'Olumsuz yorumları otomatik olarak Zendesk destek talebine dönüştürün.' },
  { name: 'Freshdesk', status: 'Yakında', desc: 'Müşteri şikayetlerini Freshdesk\'e aktararak hızlı çözüm sağlayın.' },
  { name: 'Çözüm Merkezi', status: 'Aktif', desc: 'Superscore\'un yerleşik şikayet çözüm sistemi ile olumsuz yorumları fırsata çevirin.' },
];

const NASIL_CALISIR = [
  {
    num: '1',
    title: 'Entegrasyonunuzu seçin',
    desc: 'E-ticaret platformunuzu, pazarlama aracınızı veya destek sisteminizi seçin.',
  },
  {
    num: '2',
    title: 'Bağlantıyı kurun',
    desc: 'API anahtarınızı girin veya OAuth ile tek tıklamayla bağlanın. Çoğu entegrasyon birkaç dakikada kurulur.',
  },
  {
    num: '3',
    title: 'Ayarlarınızı yapılandırın',
    desc: 'Sipariş doğrulama kurallarını, davet zamanlamasını ve bildirim tercihlerini belirleyin.',
  },
  {
    num: '4',
    title: 'Otomasyonu başlatın',
    desc: 'Entegrasyonunuz aktif! Siparişler otomatik doğrulanır, davetler gönderilir ve yorumlar toplanır.',
  },
];

/* ── status badge ── */
function StatusBadge({ status }: { status: string }) {
  const isActive = status === 'Aktif';
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-[#04da8b]/20 text-[#0a8a5a]' : 'bg-orange-100 text-orange-600'}`}>
      {status}
    </span>
  );
}

export default function EntegrasyonlarPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Entegrasyonlar</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Superscore entegrasyonu bulun
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Superscore&apos;u, yorumları toplamayı, sergilemeyi, yanıtlamayı ve bunlardan ders çıkarmayı kolaylaştıran basit entegrasyonlarla teknoloji altyapınıza bağlayın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="#entegrasyonlar"
                  className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors text-center"
                >
                  Entegrasyonlara göz atın
                </Link>
                <Link
                  href="/business/demo"
                  className="inline-block px-7 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors text-center"
                >
                  Bir entegrasyon oluşturun
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              {/* Görsel sonra eklenecek */}
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px] h-[260px] sm:h-[320px] bg-[#04da8b]/30 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-6">
                  {['Trendyol', 'Hepsiburada', 'N11', 'İkasta', 'Shopify', 'WooCommerce', 'Google', 'Meta', 'Zendesk'].map(name => (
                    <div key={name} className="bg-white rounded-lg px-3 py-2 text-xs font-bold text-[#1b1a1b] text-center shadow-sm">
                      {name}
                    </div>
                  ))}
                </div>
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
            Sipariş doğrulamalı yorum toplayan işletmeler, doğrulanmamış yorumlara göre %89 daha yüksek müşteri güveni kazanıyor.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50">* Superscore kullanıcı verileri ve sektör araştırmalarına dayanmaktadır.</p>
        </div>
      </section>

      {/* ═══ E-TİCARET ENTEGRASYONLARI ═══ */}
      <section id="entegrasyonlar" className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">E-Ticaret Platformları</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
              Pazar yerlerinizi ve e-ticaret sitenizi bağlayın
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Türkiye&apos;nin en büyük pazar yerleri ve e-ticaret altyapıları ile entegre çalışın. Siparişlerinizi doğrulayın, otomatik davet gönderin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {E_TICARET.map(item => (
              <div key={item.name} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#1b1a1b]">{item.name}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SİPARİŞ DOĞRULAMA & API ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Sipariş Doğrulama & API</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
              Gerçek müşterilerden gerçek yorumlar toplayın
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Sipariş doğrulama sistemi ile yalnızca gerçek alışveriş yapan müşterilerinizin yorum bırakmasını sağlayın. Sahte yorumları engelleyin, güvenilirliğinizi artırın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SIPARIS_DOGRULAMA.map(item => (
              <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#04da8b]/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#04da8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAZARLAMA ENTEGRASYONLARI ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Pazarlama & Reklam</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
              Yorumlarınızı reklam gücüne dönüştürün
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Google ve sosyal medya reklamlarınızda yıldız derecelendirmelerinizi ve müşteri yorumlarınızı sergileyerek tıklama ve dönüşüm oranlarınızı artırın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAZARLAMA.map(item => (
              <div key={item.name} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-[#1b1a1b] mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DESTEK ENTEGRASYONLARI ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Müşteri Desteği</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
              Olumsuz yorumları çözüm fırsatına çevirin
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Destek araçlarınızla entegrasyon sayesinde olumsuz yorumlar anında destek taleplerine dönüşür. Çözüm Merkezi ile müşteri şikayetlerini hızla çözün.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DESTEK.map(item => (
              <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#1b1a1b]">{item.name}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NASIL ÇALIŞIR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {NASIL_CALISIR.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#04da8b]/10">
                  <span className="text-2xl font-extrabold text-[#04da8b]">{s.num}</span>
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">
                  {s.num}. {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AVANTAJLAR ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10 sm:mb-14">
            Neden Superscore Entegrasyonları?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-3">Sipariş Doğrulamalı Güven</h3>
              <p className="text-[13px] text-white/60 leading-relaxed">Her yorum gerçek bir alışverişe bağlı. Sahte yorumları engelleyin, müşterilerinize %100 güvenilir yorumlar sunun.</p>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-3">Türkiye Odaklı Entegrasyonlar</h3>
              <p className="text-[13px] text-white/60 leading-relaxed">Trendyol, Hepsiburada, N11 ve İkasta gibi Türkiye&apos;nin en büyük platformlarıyla hazır entegrasyonlar.</p>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-3">Dakikalar İçinde Kurulum</h3>
              <p className="text-[13px] text-white/60 leading-relaxed">Teknik bilgi gerektirmeden birkaç dakikada entegrasyonunuzu kurun. Adım adım rehberler ve destek ekibi her zaman yanınızda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            İşletmenizi Superscore ile entegre edin.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors">
              Demo rezervasyonu yapın
            </Link>
            <Link href="/business/kayit" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
              Ücretsiz başlayın
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
