import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iletisim | Superscore',
  description:
    'Superscore ile iletisime gecin. Sorulariniz, onerileriniz veya sikayet surecleriyle ilgili bize ulasin.',
};

export default function IletisimPage() {
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
            <span className="text-[#1b1a1b]">Iletisim</span>
          </nav>

          <h1 className="font-superscore-bold text-3xl md:text-4xl text-[#1b1a1b] mb-6">
            Iletisim
          </h1>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">
                Bize Ulasin
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sorulariniz, onerileriniz veya sikayet surecleriyle ilgili bize her zaman
                ulasabilirsiniz. Ekibimiz en kisa surede size donecektir.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[#3c57bc]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1b1a1b] mb-1">E-posta</h3>
                    <a
                      href="mailto:destek@superscore.com.tr"
                      className="text-[#3c57bc] hover:underline"
                    >
                      destek@superscore.com.tr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#3c57bc]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[#3c57bc]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1b1a1b] mb-1">Web Sitesi</h3>
                    <p className="text-gray-600">superscore.com.tr</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">
                Yanit Sureleri
              </h2>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                <p>
                  Genel sorular ve oneriler icin genellikle <strong>1-2 is gunu</strong> icinde
                  donuyoruz.
                </p>
                <p>
                  Sikayet surecleri ve hesap sorunlari icin <strong>24 saat</strong> icinde ilk
                  donusumuzu yapiyoruz.
                </p>
                <p>
                  Acil guvenlik konulari icin lutfen e-posta konu satirina{' '}
                  <strong>&quot;ACIL&quot;</strong> yaziniz.
                </p>
              </div>
            </section>

            <section className="bg-[#3c57bc]/5 rounded-2xl border border-[#3c57bc]/20 p-8 text-center">
              <p className="text-gray-700 mb-4">
                Sikayet veya degerlendirme yazmak mi istiyorsunuz?
              </p>
              <Link
                href="/sikayet-yaz"
                className="inline-flex items-center gap-2 bg-[#3c57bc] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#3c57bc]/90 transition-colors"
              >
                Sikayet Yaz
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
