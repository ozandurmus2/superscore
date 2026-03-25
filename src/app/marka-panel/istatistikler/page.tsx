'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { TrendingUp, Clock, CheckCircle, Star } from 'lucide-react';
import type { Brand } from '@/types';

export default function BrandAnalyticsPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand:brands(*)').eq('user_id', user.id).single();
      if (member) setBrand((member as unknown as { brand: Brand }).brand);
    }
    load();
  }, []);

  if (!brand) return <div className="animate-pulse"><div className="h-96 bg-gray-100 rounded-xl" /></div>;

  const resolutionRate = brand.total_complaints > 0 ? Math.round((brand.resolved_complaints / brand.total_complaints) * 100) : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">İstatistikler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6 pb-6">
            <SuperscoreBadge score={brand.superscore} size="md" />
            <p className="text-sm text-gray-500 mt-2">Superscore</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold">{resolutionRate}%</p>
            <p className="text-sm text-gray-500">Çözüm Oranı</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2" style={{ width: `${resolutionRate}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Clock className="h-8 w-8 text-orange-600 mb-2" />
            <p className="text-3xl font-bold">{brand.avg_response_time_hours ? `${Math.round(brand.avg_response_time_hours)}s` : '-'}</p>
            <p className="text-sm text-gray-500">Ort. Yanıt Süresi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Star className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-3xl font-bold">{brand.avg_rating?.toFixed(1) || '-'}</p>
            <p className="text-sm text-gray-500">Ortalama Puan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Şikayet Dağılımı</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Toplam Şikayet', value: brand.total_complaints, color: 'bg-blue-500' },
                { label: 'Çözülen', value: brand.resolved_complaints, color: 'bg-green-500' },
                { label: 'Bekleyen', value: brand.total_complaints - brand.resolved_complaints, color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} rounded-full h-2`}
                      style={{ width: brand.total_complaints > 0 ? `${(item.value / brand.total_complaints) * 100}%` : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Superscore Bileşenleri</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Çözüm Oranı', weight: '30%', value: resolutionRate },
                { label: 'Yanıt Süresi', weight: '25%', value: brand.avg_response_time_hours ? Math.min(100, Math.max(0, 100 - (brand.avg_response_time_hours / 72) * 100)) : 50 },
                { label: 'Müşteri Puanı', weight: '25%', value: brand.avg_rating ? (brand.avg_rating / 5) * 100 : 50 },
                { label: 'Şikayet Hacmi', weight: '10%', value: 60 },
                { label: 'Belge Doğrulama', weight: '10%', value: 50 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label} <span className="text-gray-400">({item.weight})</span></span>
                    <span className="font-medium">{Math.round(item.value)}/100</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1B1F3B] rounded-full h-2" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
