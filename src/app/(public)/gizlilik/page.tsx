import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikasi | Superscore',
  description:
    'Superscore gizlilik politikasi. Kisisel verilerinizin nasil toplandigi, islendigi ve korundugu hakkinda bilgi.',
};

export default function GizlilikPage() {
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
            <span className="text-[#1b1a1b]">Gizlilik Politikasi</span>
          </nav>

          <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">
            Gizlilik Politikasi
          </h1>
          <p className="text-sm text-gray-500 mb-8">Son guncelleme: 6 Nisan 2026</p>

          <div className="space-y-6">
            <Section title="1. Genel Bakis">
              <p>
                Superscore (&quot;biz&quot;, &quot;bizim&quot; veya &quot;Platform&quot;), superscore.com.tr adresi
                uzerinden hizmet veren bir tuketici degerlendirme platformudur. Bu gizlilik
                politikasi, kisisel verilerinizin nasil toplandigi, islendigi ve korundugu hakkinda
                sizi bilgilendirmek amaciyla hazirlanmistir.
              </p>
              <p>
                6698 sayili Kisisel Verilerin Korunmasi Kanunu (KVKK) kapsaminda veri sorumlusu
                olarak hareket etmekteyiz.
              </p>
            </Section>

            <Section title="2. Toplanan Veriler">
              <p>Platformumuzu kullandiginizda asagidaki veriler toplanabilir:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ad, soyad ve e-posta adresi (hesap olusturma sirasinda)</li>
                <li>Profil bilgileri ve kullanici tercihleri</li>
                <li>Degerlendirme ve sikayet icerikleri</li>
                <li>IP adresi, tarayici turu ve cihaz bilgileri</li>
                <li>Cerez verileri ve kullanim istatistikleri</li>
              </ul>
            </Section>

            <Section title="3. Verilerin Kullanim Amaclari">
              <p>Toplanan veriler asagidaki amaclarla kullanilir:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Hesap olusturma ve kimlik dogrulama</li>
                <li>Degerlendirme ve sikayet surecleri yonetimi</li>
                <li>Platform guvenliginin saglanmasi</li>
                <li>Hizmet kalitesinin iyilestirilmesi ve analitik</li>
                <li>Yasal yukumluluklerin yerine getirilmesi</li>
              </ul>
            </Section>

            <Section title="4. Cerezler">
              <p>
                Platformumuz, kullanici deneyimini iyilestirmek icin cerezler kullanmaktadir.
                Cerezler hakkinda detayli bilgi icin{' '}
                <Link href="/cerez-politikasi" className="text-[#3c57bc] hover:underline">
                  Cerez Politikamizi
                </Link>{' '}
                inceleyebilirsiniz.
              </p>
            </Section>

            <Section title="5. Ucuncu Taraflarla Paylasim">
              <p>
                Kisisel verileriniz, yasal zorunluluklar disinda ucuncu taraflarla paylasilmaz.
                Asagidaki durumlar istisnadir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Yasal duzenleme veya mahkeme karari gerektirdigi haller</li>
                <li>Platform guvenligini saglamak icin gerekli teknik hizmet saglayicilari</li>
                <li>Analitik ve performans olcumu icin anonim veri paylasimi</li>
              </ul>
            </Section>

            <Section title="6. Veri Guvenligi">
              <p>
                Verileriniz SSL sifreleme, guvenli sunucularda depolama ve erisim kontrolu gibi
                teknik ve idari onlemlerle korunmaktadir. Veri ihlali durumunda KVKK geregince
                gerekli bildirimler yapilir.
              </p>
            </Section>

            <Section title="7. Kullanici Haklari (KVKK Madde 11)">
              <p>KVKK kapsaminda asagidaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
                <li>Islenmisse buna iliskin bilgi talep etme</li>
                <li>Islenme amacini ve amacina uygun kullanilip kullanilmadigini ogrenme</li>
                <li>Eksik veya yanlis islenen verilerin duzeltilmesini isteme</li>
                <li>KVKK&apos;nin 7. maddesindeki kosullar cercevesinde silinmesini isteme</li>
                <li>Islenen verilerin ucuncu kisilere bildirilmesini isteme</li>
                <li>Aleyhinize bir sonucun ortaya cikmasina itiraz etme</li>
              </ul>
            </Section>

            <Section title="8. Iletisim">
              <p>
                Gizlilik politikamizla ilgili sorulariniz icin{' '}
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
