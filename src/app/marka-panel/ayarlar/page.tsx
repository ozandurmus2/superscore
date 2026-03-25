'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { BRAND_CATEGORIES } from '@/types';
import { Save } from 'lucide-react';
import type { Brand } from '@/types';

export default function BrandSettingsPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand:brands(*)').eq('user_id', user.id).single();
      if (member) {
        const b = (member as unknown as { brand: Brand }).brand;
        setBrand(b);
        setName(b.name);
        setDescription(b.description || '');
        setWebsite(b.website || '');
        setCategory(b.category);
      }
    }
    load();
  }, []);

  async function handleSave() {
    if (!brand) return;
    setSaving(true);
    await supabase.from('brands').update({ name, description, website, category }).eq('id', brand.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  }

  if (!brand) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Marka Ayarları</h1>

      <Card>
        <CardHeader><CardTitle>Marka Bilgileri</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Marka Adı</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Açıklama</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Web Sitesi</label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Kategori</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BRAND_CATEGORIES.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" /> {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Kaydet'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
