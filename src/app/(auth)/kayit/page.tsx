'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const supabase = createClient();

  const inputClass = "w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#3c57bc] transition-all placeholder:text-gray-400";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role: 'customer' } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.auth.signInWithPassword({ email, password });

      // Check draft complaint
      const hasDraft = typeof window !== 'undefined' && localStorage.getItem('superscore_draft_complaint');
      if (hasDraft) {
        window.location.href = '/sikayet-yaz?draft=true';
      } else {
        window.location.href = '/';
      }
      return;
    }

    setRegistered(true);
    setLoading(false);
  }

  // ===== EMAIL VERIFICATION SCREEN =====
  if (registered) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f3f0ed] pointer-events-none">
          <div className="absolute -top-32 right-[20%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-[#04da8b] opacity-80" />
          <div className="absolute -bottom-20 right-0 w-0 h-0 opacity-60" style={{ borderLeft: '200px solid transparent', borderRight: '200px solid transparent', borderBottom: '350px solid #819cf3' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">
            <div className="flex-1 max-w-md pt-8">
              <Link href="/kayit" className="inline-flex items-center gap-1 text-sm text-[#1b1a1b]/60 hover:text-[#1b1a1b] mb-8">
                <ArrowLeft className="h-4 w-4" /> Geri
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
              </div>
            </div>

            <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-superscore-bold text-2xl text-[#1b1a1b] mb-6">Size bir e-posta gönderdik</h2>
              <p className="text-sm text-[#1b1a1b]/70 mb-3">
                Kaydolduğunuz için teşekkürler.<br />
                Hesabınızı etkinleştirmek için lütfen e-postanızı kontrol edin.
              </p>
              <p className="text-sm text-[#1b1a1b]/70 mb-6">
                Birkaç dakika bekleyin ve spam klasörünüzü de kontrol etmeyi unutmayın.
              </p>
              <hr className="mb-6" />
              <button
                onClick={() => { window.location.href = '/'; }}
                className="w-full py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-lg hover:bg-[#2e449a] transition-colors"
              >
                Ana Sayfaya Git
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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

          {/* Right Side - Register Form */}
          <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-superscore-bold text-2xl text-[#1b1a1b] mb-2">Ücretsiz hesap oluşturun</h2>
            <p className="text-sm text-[#1b1a1b]/60 mb-6">Şikayet yazmak ve markaları değerlendirmek için kaydolun</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

              <div>
                <label className="text-sm font-medium text-[#1b1a1b] mb-1.5 block">Ad Soyad</label>
                <input type="text" placeholder="Adınız Soyadınız" value={fullName} onChange={(e) => setFullName(e.target.value)} required className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1b1a1b] mb-1.5 block">E-posta</label>
                <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1b1a1b] mb-1.5 block">Şifre</label>
                <input type="password" placeholder="En az 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} />
              </div>

              <button
                type="submit"
                disabled={loading || !fullName || !email || !password}
                className="w-full py-3.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-lg hover:bg-[#2e449a] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Kayıt yapılıyor...</> : 'Ücretsiz hesap oluşturun'}
              </button>

              <p className="text-xs text-gray-400 leading-relaxed">
                Kayıt olarak{' '}
                <Link href="/kullanim-sartlari" className="text-[#3c57bc] hover:underline">Kullanım Şartlarını</Link> ve{' '}
                <Link href="/gizlilik" className="text-[#3c57bc] hover:underline">Gizlilik Politikasını</Link> kabul etmiş olursunuz.
              </p>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">veya</span></div>
              </div>

              <Link href="/giris" className="block w-full py-3.5 border-2 border-gray-200 text-[#1b1a1b] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center">
                Zaten hesabınız var mı? Giriş yapın
              </Link>

              <p className="text-xs text-gray-400 text-center pt-2">
                Marka hesabı mı açmak istiyorsunuz?{' '}
                <Link href="/business/kayit" className="text-[#3c57bc] hover:underline">Markalar için kayıt</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
