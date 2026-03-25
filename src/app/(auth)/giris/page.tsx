'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/panel';
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('E-posta veya şifre hatalı');
      setLoading(false);
      return;
    }

    // Get user role to redirect to correct panel
    if (data.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const role = profile?.role;
      if (role === 'super_admin') {
        window.location.href = '/admin';
      } else if (role === 'brand_admin') {
        window.location.href = '/marka-panel';
      } else {
        window.location.href = redirect;
      }
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Giriş Yap</CardTitle>
        <CardDescription>Hesabınıza giriş yapın</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
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
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Hesabınız yok mu? <Link href="/kayit" className="text-[#1B1F3B] font-medium hover:underline">Kayıt Ol</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />}>
      <LoginForm />
    </Suspense>
  );
}
