'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown } from 'lucide-react';
import type { Brand } from '@/types';

export default function SubscriptionPage() {
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

  if (!brand) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  const trialDaysLeft = brand.trial_ends_at ? Math.max(0, Math.ceil((new Date(brand.trial_ends_at).getTime() - Date.now()) / 86400000)) : 0;
  const planLabels = { free_trial: 'Ücretsiz Deneme', starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };

  const plans = [
    { name: 'Starter', price: '499', features: ['50 şikayete yanıt/ay', 'Temel istatistikler', 'E-posta bildirimleri', '1 ekip üyesi', 'Widget'] },
    { name: 'Pro', price: '999', popular: true, features: ['Sınırsız yanıt', 'Gelişmiş istatistikler', 'AI belge analizi', '5 ekip üyesi', 'Özel widget', 'Öncelikli destek'] },
    { name: 'Enterprise', price: 'Özel', features: ['Sınırsız her şey', 'Özel entegrasyonlar', 'Dedicated yönetici', 'Sınırsız ekip', 'API erişimi', 'SLA garantisi'] },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Abonelik</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mevcut Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-bold">{brand.subscription_plan ? planLabels[brand.subscription_plan] : 'Plan Yok'}</span>
              </div>
            </div>
            {brand.subscription_plan === 'free_trial' && (
              <Badge variant="warning" className="text-sm px-3 py-1">{trialDaysLeft} gün kaldı</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-2 border-[#1B1F3B] shadow-lg relative' : ''}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1B1F3B] text-white text-xs font-bold px-3 py-1 rounded-full">Popüler</div>}
            <CardHeader className="text-center">
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4">
                {plan.price === 'Özel' ? (
                  <span className="text-2xl font-bold">İletişime Geçin</span>
                ) : (
                  <><span className="text-3xl font-bold">{plan.price}₺</span><span className="text-gray-500">/ay</span></>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                {plan.price === 'Özel' ? 'İletişime Geçin' : 'Plan Seç'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
