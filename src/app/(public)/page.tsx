import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { HeroSearch } from '@/components/home/hero-search';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Shield, ArrowRight, PenSquare, MessageSquare, CheckCircle, Star, TrendingUp, Users } from 'lucide-react';
import type { Brand, Complaint } from '@/types';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('superscore', { ascending: false })
    .limit(6);

  const { data: complaints } = await supabase
    .from('complaints')
    .select('*, brand:brands(name, slug)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1B1F3B] text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Markanıza Güvenin,<br />Şikayetinizi Çözün
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Türkiye&apos;nin en modern şikayet ve güven platformu. Şikayetinizi yazın, markalar çözsün, herkes kazansın.
          </p>
          <HeroSearch />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/panel/sikayet-yaz">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <PenSquare className="h-5 w-5" />
                Şikayet Yaz
              </Button>
            </Link>
            <Link href="/nasil-calisir">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Nasıl Çalışır?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-3xl font-bold text-[#1B1F3B]">10,000+</span>
              </div>
              <p className="text-gray-500">Çözülen Şikayet</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                <span className="text-3xl font-bold text-[#1B1F3B]">500+</span>
              </div>
              <p className="text-gray-500">Kayıtlı Marka</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-purple-500" />
                <span className="text-3xl font-bold text-[#1B1F3B]">50,000+</span>
              </div>
              <p className="text-gray-500">Kullanıcı</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#1B1F3B]">Nasıl Çalışır?</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Üç basit adımda şikayetinizi çözüme kavuşturun</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: PenSquare, title: 'Şikayetinizi Yazın', desc: 'Markayı seçin, sorununuzu detaylı anlatın ve belgelerinizi yükleyin.' },
              { icon: MessageSquare, title: 'Marka Yanıtlar', desc: 'Marka bildirim alır, şikayetinize yanıt verir ve çözüm belgelerini paylaşır.' },
              { icon: Star, title: 'Çözüm & Puanlama', desc: 'Şikayet çözülünce markayı puanlayın. Superscore otomatik güncellenir.' },
            ].map((step, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 rounded-full bg-[#1B1F3B]/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-[#1B1F3B]" />
                  </div>
                  <div className="text-sm font-medium text-green-600 mb-2">Adım {i + 1}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      {(brands as Brand[])?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#1B1F3B]">Öne Çıkan Markalar</h2>
              <Link href="/markalar" className="text-sm text-[#1B1F3B] hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(brands as Brand[]).map((brand) => (
                <Link key={brand.id} href={`/markalar/${brand.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold text-lg">
                            {brand.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{brand.name}</h3>
                            <Badge variant="secondary" className="text-xs">{brand.category}</Badge>
                          </div>
                        </div>
                        <SuperscoreBadge score={brand.superscore} size="sm" showLabel={false} />
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <span>{brand.total_complaints} şikayet</span>
                        <span>{brand.resolved_complaints} çözülen</span>
                        {brand.avg_rating && <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{brand.avg_rating}</span>}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Complaints */}
      {(complaints as (Complaint & { brand: { name: string; slug: string } })[])?.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#1B1F3B]">Son Şikayetler</h2>
              <Link href="/sikayetler" className="text-sm text-[#1B1F3B] hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {(complaints as (Complaint & { brand: { name: string; slug: string } })[]).map((c) => (
                <Link key={c.id} href={`/sikayetler/${c.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                          <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
                            {COMPLAINT_STATUS_LABELS[c.status]}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{c.title}</h3>
                        <p className="text-sm text-gray-500">{c.brand?.name} &middot; {formatRelativeTime(c.created_at)}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#1B1F3B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Şikayetinizi Hemen Yazın</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Şikayetinizi yazın, markalar çözsün. Ücretsiz ve kolay.
          </p>
          <Link href="/panel/sikayet-yaz">
            <Button size="lg" className="bg-green-500 hover:bg-green-600">
              <PenSquare className="h-5 w-5" /> Şikayet Yaz
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
