'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserPlus, Mail, Lock, User, Building2 } from 'lucide-react';

export default function RegisterPage() {
  const [tab, setTab] = useState('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const role = tab === 'brand' ? 'brand_admin' : 'customer';

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If brand registration, create brand record
    if (tab === 'brand' && brandName && data.user) {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: brandName, userId: data.user.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Marka oluşturulamadı');
        setLoading(false);
        return;
      }
    }

    // Auto sign in after registration
    if (data.user) {
      await supabase.auth.signInWithPassword({ email, password });

      if (tab === 'brand') {
        window.location.href = '/marka-panel';
      } else {
        window.location.href = '/panel';
      }
      return;
    }

    setSuccess('Kayıt başarılı!');
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Hesap Oluştur</CardTitle>
        <CardDescription>Ücretsiz hesabınızı oluşturun</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
          {success && <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">{success}</div>}

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full">
              <TabsTrigger value="customer" className="flex-1">Müşteri</TabsTrigger>
              <TabsTrigger value="brand" className="flex-1">Marka</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <p className="text-sm text-gray-500 mt-2">Şikayet yazmak ve markaları değerlendirmek için</p>
            </TabsContent>
            <TabsContent value="brand">
              <p className="text-sm text-gray-500 mt-2">Markanızı yönetmek ve şikayetlere yanıt vermek için</p>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" required />
            </div>
          </div>

          {tab === 'brand' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Marka Adı</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Marka adı" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="pl-10" required />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="password" placeholder="En az 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required minLength={6} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            <UserPlus className="h-4 w-4" />
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Zaten hesabınız var mı? <Link href="/giris" className="text-[#1B1F3B] font-medium hover:underline">Giriş Yap</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
