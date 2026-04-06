import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkimizda | Superscore',
  description:
    'Superscore hakkinda bilgi edinin. Tuketicilerin bilinçli kararlar vermesine yardimci olan guven platformu.',
};

export default function HakkimizdaPage() {
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
            <span className="text-[#1b1a1b]">Hakkimizda</span>
          </nav>

          <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-6">
            Hakkimizda
          </h1>

          <div className="space-y-8">
            {/* Mission */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">
                Misyonumuz
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Superscore, tuketicilerin bilinçli kararlar vermesini saglayan bir guven platformudur.
                Amacimiz, gercek kullanici deneyimlerini bir araya getirerek markalarin seffaf bir
                sekilde degerlendirilmesini saglamak ve tuketicilerin alisveris oncesi dogru bilgiye
                ulasmasina yardimci olmaktir.
              </p>
            </section>

            {/* Values */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">
                Degerlerimiz
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center mb-3">
                    <span className="text-[#3c57bc] text-lg">&#9670;</span>
                  </div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-2">Seffaflik</h3>
                  <p className="text-sm text-gray-600">
                    Tum degerlendirme surecleri acik ve izlenebilirdir. Puanlama sistemi herkes
                    tarafindan anlasilabilir sekilde tasarlanmistir.
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center mb-3">
                    <span className="text-[#3c57bc] text-lg">&#9829;</span>
                  </div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-2">Guven</h3>
                  <p className="text-sm text-gray-600">
                    Yapay zeka destekli dogrulama sistemiyle sahte yorumlari onluyor, gercek
                    deneyimlerin one çikmasini sagliyoruz.
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center mb-3">
                    <span className="text-[#3c57bc] text-lg">&#9878;</span>
                  </div>
                  <h3 className="font-semibold text-[#1b1a1b] mb-2">Adalet</h3>
                  <p className="text-sm text-gray-600">
                    Her marka esit kosullarda degerlendirilir. Puanlar tamamen kullanici deneyimleri
                    ve cozum oranina dayalidir.
                  </p>
                </div>
              </div>
            </section>

            {/* How it works */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">
                Nasil Calisir?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Superscore, tuketicilerin marka deneyimlerini paylasmasini ve sikayetlerini
                  cozume kavusturmasini saglayan bir platformdur. Her marka, kullanici
                  degerlendirmeleri ve sikayet cozum oranlarina dayali olarak 0-100 arasi dinamik
                  bir puan alir.
                </p>
                <p>
                  Markalar sikayetlere yanit verir ve cozum belgelerini yukler. Yapay zeka
                  teknolojimiz bu belgeleri analiz ederek gercek bir cozum saglanip saglanmadigini
                  degerlendirir. Boylece tuketiciler, bir markaya guvenip guvenemeyeceklerini
                  kolayca gorebilir.
                </p>
              </div>
              <Link
                href="/nasil-calisir"
                className="inline-block mt-4 text-sm text-[#3c57bc] hover:underline font-medium"
              >
                Detayli bilgi icin &rarr;
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
