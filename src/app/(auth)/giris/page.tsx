'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Loader2 } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const hasDraft = searchParams.get('draft') === 'true';
  const redirect = searchParams.get('redirect') || '/';
  const supabase = createClient();

  const inputClass = "w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#3c57bc] transition-all placeholder:text-gray-400";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError('E-posta veya şifre hatalı');
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: profile } = await supabase.from('users').select('role').eq('id', data.user.id).single();
      const role = profile?.role;

      if (hasDraft) {
        window.location.href = '/sikayet-yaz?draft=true';
      } else if (role === 'super_admin') {
        window.location.href = '/admin';
      } else if (role === 'brand_admin') {
        window.location.href = '/marka-panel';
      } else {
        window.location.href = redirect;
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 bg-[#f3f0ed] pointer-events-none">
        <div className="absolute -top-20 right-[30%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#819cf3] opacity-70 animate-float-shape" />
        <div className="absolute bottom-[10%] -left-10 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#04da8b] rounded-[40px] opacity-60 rotate-12 animate-float-shape" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 right-0 w-0 h-0 opacity-50 animate-float-shape" style={{ borderLeft: '150px solid transparent', borderRight: '150px solid transparent', borderBottom: '260px solid #f95a98', animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">

          {/* Left Side */}
          <div className="flex-1 max-w-md pt-8">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-[#1b1a1b]/60 hover:text-[#1b1a1b] mb-8">
              <ArrowLeft className="h-4 w-4" /> Ana Sayfa
            </Link>
            <div className="flex items-center gap-2 mb-10">
              <Image src="/logo/White_SS.png" alt="Superscore" width={140} height={40} className="h-8 w-auto invert" />
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Deneyimlerinizi paylaşın</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Yaşadığınız deneyimleri diğer tüketicilerle paylaşarak bilinçli alışveriş kararlarına katkı sağlayın.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Şikayetlerinizi çözüme kavuşturun</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Markalara doğrudan şikayet iletin. Yapay zeka destekli çözüm sistemi ile sorunlarınız hızla çözülsün.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Güvenilir markalarla tanışın</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Superscore puanları ve gerçek kullanıcı yorumlarıyla en güvenilir markaları keşfedin.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-superscore-bold text-2xl text-[#1b1a1b] mb-2">Giriş Yap</h2>
            <p className="text-sm text-[#1b1a1b]/60 mb-6">Hesabınıza giriş yapın</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {hasDraft && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 flex items-center gap-2">
                  <Image src="/logo/icon_invitation.svg" alt="" width={20} height={20} className="w-5 h-5 flex-shrink-0 opacity-70" />
                  Şikayetiniz kaydedildi. Göndermek için giriş yapın.
                </div>
              )}
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

              <div>
                <label className="text-sm font-medium text-[#1b1a1b] mb-1.5 block">E-posta</label>
                <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1b1a1b] mb-1.5 block">Şifre</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
              </div>

              <div className="flex items-center justify-end">
                <Link href="/sifremi-unuttum" className="text-xs text-[#3c57bc] hover:underline">Şifremi unuttum</Link>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-lg hover:bg-[#2e449a] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Giriş yapılıyor...</> : 'Giriş Yap'}
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">veya</span></div>
              </div>

              <Link href="/kayit" className="block w-full py-3.5 border-2 border-gray-200 text-[#1b1a1b] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center">
                Ücretsiz hesap oluşturun
              </Link>

              <p className="text-xs text-gray-400 text-center pt-2">
                Marka hesabınız mı var?{' '}
                <Link href="/business/giris" className="text-[#3c57bc] hover:underline">Markalar için giriş</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f0ed]" />}>
      <LoginForm />
    </Suspense>
  );
}
