import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare, MessageSquare, CheckCircle, Star, Shield, BarChart3, Code, Users, Zap, Clock, Award } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B1F3B] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nasıl Çalışır?</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Superscore, müşteriler ve markalar arasında güven köprüsü kurar.
          </p>
        </div>
      </section>

      {/* For Customers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1B1F3B] mb-4">Müşteriler İçin</h2>
          <p className="text-gray-500 text-center mb-12">Dört basit adımda şikayetinizi çözün</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: PenSquare, title: 'Şikayet Yazın', desc: 'Ücretsiz hesap oluşturun, markayı seçin ve şikayetinizi detaylı yazın. Belge ve faturalarınızı yükleyin.' },
              { icon: MessageSquare, title: 'Marka Yanıtlar', desc: 'Marka şikayetinizi alır, inceleyip size yanıt verir. Çözüm belgelerini paylaşır.' },
              { icon: CheckCircle, title: 'Çözüm Onayı', desc: 'Yapay zeka ve uzmanlarımız belgeleri inceler. Çözüm onaylanırsa şikayet kapanır.' },
              { icon: Star, title: 'Puanlayın', desc: 'Markayı puanlayın ve yorumunuzu yazın. Superscore otomatik güncellenir.' },
            ].map((step, i) => (
              <Card key={i} className="text-center relative">
                <CardContent className="pt-8 pb-6">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1B1F3B] text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <step.icon className="h-10 w-10 text-[#1B1F3B] mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Brands */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1B1F3B] mb-4">Markalar İçin</h2>
          <p className="text-gray-500 text-center mb-12">Şikayetleri çözün, güven puanınızı yükseltin</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Marka Sayfanız', desc: '30 gün ücretsiz deneyin. Markanıza ait tüm şikayetleri görün ve yönetin.' },
              { icon: Zap, title: 'Hızlı Yanıt', desc: 'Şikayetlere hızlı yanıt verin, çözüm belgelerinizi yükleyin.' },
              { icon: Award, title: 'Superscore', desc: 'Çözüm oranınız, yanıt süreniz ve müşteri puanlarına göre skor kazanın.' },
              { icon: Code, title: 'Widget', desc: 'Superscore widget\'ını sitenize ekleyin, müşteri güvenini artırın.' },
            ].map((step, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-8 pb-6">
                  <step.icon className="h-10 w-10 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1B1F3B] mb-4">Abonelik Planları</h2>
          <p className="text-gray-500 text-center mb-12">İlk 30 gün ücretsiz. Kredi kartı gerekmez.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter', price: '499', features: [
                  'Aylık 50 şikayete yanıt', 'Temel istatistikler', 'E-posta bildirimleri', '1 ekip üyesi', 'Superscore widget',
                ],
              },
              {
                name: 'Pro', price: '999', popular: true, features: [
                  'Sınırsız şikayete yanıt', 'Gelişmiş istatistikler', 'AI belge analizi', '5 ekip üyesi', 'Özelleştirilebilir widget', 'Öncelikli destek',
                ],
              },
              {
                name: 'Enterprise', price: 'Özel', features: [
                  'Sınırsız her şey', 'Özel entegrasyonlar', 'Dedicated hesap yöneticisi', 'Sınırsız ekip üyesi', 'API erişimi', 'SLA garantisi',
                ],
              },
            ].map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-2 border-[#1B1F3B] shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1B1F3B] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popüler
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price === 'Özel' ? (
                      <span className="text-3xl font-bold text-[#1B1F3B]">İletişime Geçin</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-[#1B1F3B]">{plan.price}₺</span>
                        <span className="text-gray-500">/ay</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/kayit?type=brand">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      {plan.price === 'Özel' ? 'İletişime Geçin' : 'Ücretsiz Başla'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-[#1B1F3B] mb-12">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {[
              { q: 'Superscore nedir?', a: 'Superscore, markaların güvenilirliğini ölçen ve müşteri şikayetlerini çözen bir platformdur. Şikayet çözüm oranı, yanıt süresi ve müşteri puanlarına göre 0-100 arası bir güven skoru hesaplar.' },
              { q: 'Şikayet yazmak ücretsiz mi?', a: 'Evet, müşteriler için platform tamamen ücretsizdir. Hesap oluşturup istediğiniz kadar şikayet yazabilirsiniz.' },
              { q: 'Markalar nasıl katılır?', a: 'Markalar 30 gün ücretsiz deneme ile başlar. Bu sürede şikayetlere yanıt verebilir, belge yükleyebilir ve istatistiklerini görebilir.' },
              { q: 'Şikayet nasıl çözüldü sayılır?', a: 'Marka yanıt verip çözüm belgelerini yükler, yapay zeka ve uzmanlarımız belgeleri inceler, müşteri onayı ile şikayet çözüldü olarak işaretlenir.' },
              { q: 'Widget nedir?', a: 'Superscore widget\'ı, markaların kendi web sitelerine ekleyebileceği bir güven rozeti. Sitenize giren kullanıcılar markanızın güven puanını görür.' },
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
