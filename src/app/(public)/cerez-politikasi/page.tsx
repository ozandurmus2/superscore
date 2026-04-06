import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cerez Politikasi | Superscore',
  description:
    'Superscore cerez politikasi. Web sitemizde kullanilan cerezler ve tercihleriniz hakkinda bilgi.',
};

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f5]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#3c57bc] transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1b1a1b]">Cerez Politikasi</span>
          </nav>

          <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">
            Cerez Politikasi
          </h1>
          <p className="text-sm text-gray-500 mb-8">Son guncelleme: 6 Nisan 2026</p>

          <div className="space-y-6">
            <Section title="1. Cerez Nedir?">
              <p>
                Cerezler, web sitemizi ziyaret ettiginizde tarayiciniza kaydedilen kucuk metin
                dosyalaridir. Bu dosyalar, sizi tanimimiza ve tercihlerinizi hatirlamamiza yardimci
                olur.
              </p>
            </Section>

            <Section title="2. Kullanilan Cerez Turleri">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-1">
                    Zorunlu Cerezler
                  </h3>
                  <p>
                    Platformun duzgun calismasi icin gerekli olan cerezlerdir. Oturum yonetimi,
                    guvenlik ve temel islevselligi saglar. Bu cerezler kapatilirsa platform duzgun
                    calismayabilir.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-1">
                    Performans Cerezleri
                  </h3>
                  <p>
                    Ziyaretcilerin platformu nasil kullandigini anlamamiza yardimci olur. Sayfa
                    goruntulenme sayilari, ziyaret sureleri ve hata raporlari gibi anonim veriler
                    toplanir.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-1">
                    Islevsellik Cerezleri
                  </h3>
                  <p>
                    Dil tercihi, tema secimi ve daha once girdigniz bilgiler gibi tercihlerinizi
                    hatirlamamizi saglar. Bu cerezler kisisellestirilmis bir deneyim sunar.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-1">
                    Analitik Cerezler
                  </h3>
                  <p>
                    Platformumuzu gelistirmek icin kullanici davranislarini anonim olarak analiz
                    etmemize olanak tanir. Google Analytics gibi ucuncu taraf araclar bu
                    kategoridendir.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="3. Cerez Yonetimi">
              <p>
                Tarayici ayarlarinizdan cerezleri yonetebilir, silebilir veya engleyebilirsiniz.
                Ancak zorunlu cerezlerin engellenmesi platformun duzgun calismasini engelleyebilir.
              </p>
              <p>Cerez ayarlarinizi degistirmek icin tarayicinizin ayarlar bolumunu ziyaret edin:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Chrome: Ayarlar &gt; Gizlilik ve Guvenlik &gt; Cerezler</li>
                <li>Firefox: Ayarlar &gt; Gizlilik ve Guvenlik</li>
                <li>Safari: Tercihler &gt; Gizlilik</li>
                <li>Edge: Ayarlar &gt; Cerezler ve Site Izinleri</li>
              </ul>
            </Section>

            <Section title="4. Ucuncu Taraf Cerezleri">
              <p>
                Platformumuz, analitik ve performans olcumu icin ucuncu taraf hizmetleri
                kullanabilir. Bu hizmetler kendi cerez politikalarina tabidir. Ucuncu taraflarla
                yalnizca anonim ve toplu veriler paylasilir.
              </p>
            </Section>

            <Section title="5. Politika Guncellemeleri">
              <p>
                Bu cerez politikasi gerektiginde guncellenebilir. Onemli degisikliklerde
                kullanicilarimizi bilgilendiririz. Politikanin en guncel halini her zaman bu sayfada
                bulabilirsiniz.
              </p>
            </Section>

            <Section title="6. Iletisim">
              <p>
                Cerez politikamizla ilgili sorulariniz icin{' '}
                <a
                  href="mailto:destek@superscore.com.tr"
                  className="text-[#3c57bc] hover:underline"
                >
                  destek@superscore.com.tr
                </a>{' '}
                adresinden bize ulasabilirsiniz.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
