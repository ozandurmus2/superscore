import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kullanim Sartlari | Superscore',
  description:
    'Superscore kullanim sartlari. Platformumuzu kullanirken uymaniz gereken kurallar ve kosullar.',
};

export default function KullanimSartlariPage() {
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
            <span className="text-[#1b1a1b]">Kullanim Sartlari</span>
          </nav>

          <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-2">
            Kullanim Sartlari
          </h1>
          <p className="text-sm text-gray-500 mb-8">Son guncelleme: 6 Nisan 2026</p>

          <div className="space-y-6">
            <Section title="1. Genel Hukumler">
              <p>
                Bu kullanim sartlari, superscore.com.tr adresinde yer alan Superscore platformunu
                kullanan tum kullanicilari baglar. Platformu kullanarak bu sartlari kabul etmis
                sayilirsiniz.
              </p>
            </Section>

            <Section title="2. Hesap Olusturma">
              <p>
                Platformumuza kayit olurken dogru ve guncel bilgiler vermeniz gerekmektedir.
                Hesabinizin guvenliginden siz sorumlusunuz. Hesap bilgilerinizi ucuncu kisilerle
                paylasmamalisiniz.
              </p>
            </Section>

            <Section title="3. Kullanici Sorumluluklari">
              <p>Platformumuzu kullanirken asagidaki kurallara uymaniz beklenir:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Degerlendirmeleriniz gercek deneyimlerinize dayali olmalidir</li>
                <li>Yaniltici, sahte veya karalama amacli icerik paylasilamaz</li>
                <li>Diger kullanicilara karsi saygi cercevesinde hareket edilmelidir</li>
                <li>Platform altyapisina zarar verecek faaliyetlerde bulunulamaz</li>
                <li>Ayni kisi icin birden fazla hesap olusturulamaz</li>
              </ul>
            </Section>

            <Section title="4. Icerik Kurallari">
              <p>
                Platformda paylasilan tum degerlendirme ve sikayetler belirli kurallara tabidir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Icerikler Turkiye Cumhuriyeti kanunlarina uygun olmalidir</li>
                <li>Hakaret, kufur ve ayrimcilik iceren ifadeler yasaktir</li>
                <li>Kisisel bilgi (telefon, adres vb.) iceren icerikler paylasilamaz</li>
                <li>Reklam veya tanitim amacli icerikler kabul edilmez</li>
                <li>Telif hakki ihlali iceren materyaller yuklenemez</li>
              </ul>
              <p>
                Kurallara aykiri icerikler bildirim uzerine veya proaktif olarak kaldirilabilir.
              </p>
            </Section>

            <Section title="5. Superscore Puanlama Sistemi">
              <p>
                Markalara verilen Superscore puanlari, kullanici degerlendirmeleri ve sikayet cozum
                oranlarina dayali algoritma ile hesaplanir. Superscore, puanlama sisteminde herhangi
                bir degisiklik yapma hakkini sakli tutar.
              </p>
            </Section>

            <Section title="6. Sorumluluk Sinirlamasi">
              <p>
                Superscore, kullanicilar tarafindan paylasilan iceriklerin dogrulugundan sorumlu
                degildir. Platform, kullanici deneyimlerinin paylasilmasina aracilik etmekte olup
                marka ile tuketici arasindaki uyusmazliklarda taraf degildir.
              </p>
              <p>
                Platformun kullanimindan kaynaklanan dolayli zararlarda sorumlulugumuz sinirlidir.
              </p>
            </Section>

            <Section title="7. Fikri Mulkiyet">
              <p>
                Superscore markasi, logosu, tasarimi ve yazilimlari Superscore&apos;a aittir.
                Kullanicilar, platformda paylastiklari iceriklerin kullanim hakkini Superscore&apos;a
                devreder. Bu icerikler platform icinde ve tanitim amacli kullanilabilir.
              </p>
            </Section>

            <Section title="8. Degisiklikler">
              <p>
                Superscore, bu kullanim sartlarini onceden bildirimde bulunarak degistirme hakkini
                sakli tutar. Guncellenen sartlar platformda yayinlandigi tarihte yururluge girer.
              </p>
            </Section>

            <Section title="9. Iletisim">
              <p>
                Kullanim sartlariyla ilgili sorulariniz icin{' '}
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
