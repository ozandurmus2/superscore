'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (data) {
        setFullName((data as { full_name: string }).full_name || '');
        setPhone((data as { phone: string | null }).phone || '');
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('users').update({ full_name: fullName, phone: phone || null }).eq('id', user.id);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Ayarlar</h1>

      <Card>
        <CardHeader><CardTitle>Profil Bilgileri</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Ad Soyad</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Telefon</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5XX XXX XXXX" />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Kaydet'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
