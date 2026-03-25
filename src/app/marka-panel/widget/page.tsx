'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Copy, Check } from 'lucide-react';
import type { Brand } from '@/types';

export default function WidgetPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [size, setSize] = useState('medium');
  const [copied, setCopied] = useState(false);
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

  const sizes = { small: { w: 200, h: 120 }, medium: { w: 300, h: 180 }, large: { w: 400, h: 220 } };
  const s = sizes[size as keyof typeof sizes];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://superscore.com.tr';
  const embedCode = brand ? `<iframe src="${appUrl}/widget/${brand.slug}" width="${s.w}" height="${s.h}" frameborder="0" style="border-radius:12px;"></iframe>` : '';

  function copyCode() {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!brand) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Widget</h1>
      <p className="text-gray-500 mb-8">Superscore widget&apos;ını web sitenize ekleyin ve müşterilerinize güven verin.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Önizleme</CardTitle></CardHeader>
          <CardContent>
            <div className="flex justify-center p-8 bg-gray-100 rounded-lg">
              <iframe src={`/widget/${brand.slug}`} width={s.w} height={s.h} className="rounded-xl border border-gray-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Embed Kodu</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Boyut</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Küçük (200x120)</SelectItem>
                  <SelectItem value="medium">Orta (300x180)</SelectItem>
                  <SelectItem value="large">Büyük (400x220)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Kodu Kopyalayın</label>
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">{embedCode}</pre>
                <Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={copyCode}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Bu kodu web sitenizin HTML&apos;ine ekleyin. Widget otomatik olarak güncel Superscore puanınızı gösterecektir.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
