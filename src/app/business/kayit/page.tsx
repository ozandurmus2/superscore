'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Loader2, X, Info } from 'lucide-react';
import { CustomSelect } from '@/components/ui/custom-select';

const EMPLOYEE_OPTIONS = ['1-9', '10-49', '50-99', '100-249', '250-999', '1000+'];
const REVENUE_OPTIONS = ['$0 - 4.99 milyon', '$5 - 24.99 milyon', '$25 - 49.99 milyon', '$50 - 99.99 milyon', '$100 milyon+'];

function extractDomain(url: string): string {
  try {
    let clean = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    clean = clean.split('/')[0];
    return clean;
  } catch { return ''; }
}

export default function BusinessRegisterPage() {
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState('');
  const [revenue, setRevenue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDomainWarning, setShowDomainWarning] = useState(false);
  const [domainMismatchAcknowledged, setDomainMismatchAcknowledged] = useState(false);
  const [registered, setRegistered] = useState(false);
  const supabase = createClient();

  // Extract domain from website for email validation
  const expectedDomain = useMemo(() => {
    if (!website) return '';
    return extractDomain(website);
  }, [website]);

  // Check if email matches website domain
  const emailDomain = email.includes('@') ? email.split('@')[1] : '';
  const domainMatches = !expectedDomain || !emailDomain || emailDomain.includes(expectedDomain.split('.')[0]);

  function handleEmailBlur() {
    if (email && expectedDomain && !domainMatches && !domainMismatchAcknowledged) {
      setShowDomainWarning(true);
    }
  }

  function clearDomainTag() {
    // Show warning popup first
    setShowDomainWarning(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!domainMatches && !domainMismatchAcknowledged) {
      setShowDomainWarning(true);
      return;
    }
    setError('');
    setLoading(true);

    // Build full email: if domain mode, combine username + @domain
    const fullEmail = (expectedDomain && !domainMismatchAcknowledged)
      ? `${email.replace(/@/g, '')}@${expectedDomain}`
      : email;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: fullEmail, password,
      options: { data: { full_name: `${firstName} ${lastName}`, role: 'brand_admin' } },
    });

    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    if (data.user) {
      await supabase.from('users').update({ role: 'brand_admin', phone: `+90${phone}` }).eq('id', data.user.id);

      const slug = companyName.toLowerCase()
        .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
        .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

      const { data: brand } = await supabase.from('brands').insert({
        name: companyName, slug: slug || `brand-${Date.now()}`,
        website: website || null, category: 'diger',
        superscore: 0, total_complaints: 0, resolved_complaints: 0,
      }).select().single();

      if (brand) {
        await supabase.from('brand_members').insert({ brand_id: brand.id, user_id: data.user.id, role: 'owner' });
      }

      await supabase.auth.signInWithPassword({ email: fullEmail, password });
      setRegistered(true);
    }
    setLoading(false);
  }

  const inputClass = "w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#3c57bc] transition-all placeholder:text-gray-400";
  const selectClass = "w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#3c57bc] transition-all bg-white appearance-none cursor-pointer text-gray-500";

  // ===== EMAIL VERIFICATION SCREEN =====
  if (registered) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f3f0ed]">
          <div className="absolute -top-32 right-[20%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-[#225430] opacity-90" />
          <div className="absolute -bottom-20 right-0 w-0 h-0 opacity-70" style={{ borderLeft: '200px solid transparent', borderRight: '200px solid transparent', borderBottom: '350px solid #04da8d' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">
            {/* Left Side */}
            <div className="flex-1 max-w-md pt-8">
              <Link href="/business/kayit" className="inline-flex items-center gap-1 text-sm text-[#1b1a1b]/60 hover:text-[#1b1a1b] mb-8">
                <ArrowLeft className="h-4 w-4" /> Geri
              </Link>
              <div className="flex items-center gap-2 mb-10">
                <Image src="/logo/White_SS.png" alt="Superscore" width={140} height={40} className="h-8 w-auto invert" />
                <span className="text-xs text-[#1b1a1b]/50 mt-1">For Business</span>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Şikayetleri yapay zeka ile çözün</h3>
                    <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Müşteri şikayetlerine belge yükleyerek yanıt verin. AI sistemi belgeleri analiz eder ve çözümü otomatik doğrular.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Güven puanınızı yükseltin</h3>
                    <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Her çözülen şikayet Superscore puanınızı artırır. Widget ekleyerek ziyaretçilerinize güven verin.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Email Verification Card */}
            <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-superscore-bold text-2xl text-[#1b1a1b] mb-6">Size bir e-posta gönderdik</h2>
              <p className="text-sm text-[#1b1a1b]/70 mb-3">
                Kaydolduğunuz için teşekkürler.<br />
                Hesabınızı etkinleştirmek için lütfen e-postanızı kontrol edin.
              </p>
              <p className="text-sm text-[#1b1a1b]/70 mb-6">
                Birkaç dakika bekleyin ve spam klasörünüzü de kontrol etmeyi unutmayın.
              </p>
              <p className="text-sm text-[#1b1a1b]/60 mb-6">
                E-postayı almadınız mı?{' '}
                <Link href="/yardim" className="text-[#3c57bc] hover:underline">Superscore Destek&apos;e gidin</Link>
              </p>

              <hr className="mb-6" />

              {/* Continue to verification */}
              <button
                onClick={() => { window.location.href = '/business/dogrulama'; }}
                className="w-full py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-lg hover:bg-[#2e449a] transition-colors mb-3"
              >
                Domain Doğrulamaya Geç
              </button>
              <button
                onClick={() => { window.location.href = '/marka-panel'; }}
                className="w-full py-3 bg-[#1b1a1b] text-white text-sm font-semibold rounded-lg hover:bg-[#333] transition-colors"
              >
                Bu adımı geç (Geliştirme modu)
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
      <div className="absolute inset-0 bg-[#f3f0ed]">
        <div className="absolute -top-20 right-[30%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#fd791a] opacity-80 animate-float-shape" />
        <div className="absolute bottom-[10%] -left-10 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#ffe400] rounded-[40px] opacity-70 rotate-12 animate-float-shape" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 right-0 w-0 h-0 opacity-60 animate-float-shape" style={{ borderLeft: '150px solid transparent', borderRight: '150px solid transparent', borderBottom: '260px solid #04da8d', animationDelay: '4s' }} />
      </div>

      {/* Domain Mismatch Warning Popup */}
      {showDomainWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-superscore-bold text-lg text-[#1b1a1b]">Devam etmek istiyor musunuz?</h3>
              <button onClick={() => setShowDomainWarning(false)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-[#1b1a1b]/70 mb-6">
              @{expectedDomain} ile bitmeyen bir e-posta kullanmak, hesap kayıt sürecini önemli ölçüde uzatacaktır.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDomainWarning(false)} className="flex-1 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                İptal
              </button>
              <button onClick={() => { setShowDomainWarning(false); setDomainMismatchAcknowledged(true); }} className="flex-1 py-2.5 bg-[#3c57bc] text-white rounded-full text-sm font-medium hover:bg-[#2e449a] transition-colors">
                Evet
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-6xl mx-auto">

          {/* Left Side */}
          <div className="flex-1 max-w-md pt-8">
            <Link href="/business" className="inline-flex items-center gap-1 text-sm text-[#1b1a1b]/60 hover:text-[#1b1a1b] mb-8">
              <ArrowLeft className="h-4 w-4" /> Geri
            </Link>
            <div className="flex items-center gap-2 mb-10">
              <Image src="/logo/White_SS.png" alt="Superscore" width={140} height={40} className="h-8 w-auto invert" />
              <span className="text-xs text-[#1b1a1b]/50 mt-1">For Business</span>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Şikayetleri yapay zeka ile çözün</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Müşteri şikayetlerine belge yükleyerek yanıt verin. AI sistemi belgeleri analiz eder ve çözümü otomatik doğrular.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Güven puanınızı yükseltin</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Her çözülen şikayet Superscore puanınızı artırır. Widget ekleyerek ziyaretçilerinize güven verin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image src="/logo/account_vrf.svg" alt="" width={24} height={24} className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-superscore-bold text-base text-[#1b1a1b] mb-1">Adil ve şeffaf sistem</h3>
                  <p className="text-sm text-[#1b1a1b]/60 leading-relaxed">Çözülen şikayetler 48 saat içinde otomatik kapanır. Asılsız şikayetler belge doğrulama ile filtrelenir.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-superscore-bold text-2xl text-[#1b1a1b] mb-6">Ücretsiz hesap oluşturun</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

              <input type="text" placeholder="Web sitesi (örn: lobbe.com.tr)" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
              <input type="text" placeholder="Şirket adı" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className={inputClass} />
              <input type="text" placeholder="Ad" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className={inputClass} />
              <input type="text" placeholder="Soyad" value={lastName} onChange={(e) => setLastName(e.target.value)} required className={inputClass} />
              <input type="text" placeholder="Pozisyon" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputClass} />

              {/* Email with domain tag */}
              <div>
                {expectedDomain && !domainMismatchAcknowledged ? (
                  /* Domain mode: user types only username part */
                  <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3c57bc] transition-all">
                    <input
                      type="text"
                      placeholder="İş e-postası"
                      value={email.includes('@') ? email.split('@')[0] : email}
                      onChange={(e) => setEmail(e.target.value.replace(/@/g, ''))}
                      required
                      className="flex-1 px-4 py-3.5 text-sm outline-none"
                    />
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-l border-gray-200 text-gray-500 text-sm whitespace-nowrap">
                      @{expectedDomain}
                      <button type="button" onClick={clearDomainTag} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Free mode: user types full email */
                  <input
                    type="email"
                    placeholder="İş e-postası"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                )}
                {/* Domain mismatch info bar */}
                {domainMismatchAcknowledged && expectedDomain && (
                  <div className="mt-2 flex items-start gap-2 bg-[#c8f1f5] rounded-xl p-3">
                    <Info className="h-4 w-4 text-[#1b1a1b] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#1b1a1b] leading-relaxed">
                      @{expectedDomain} ile bitmeyen bir e-posta kullanmak hesap kayıt sürecini uzatabilir.
                      Kaydolmaya devam edebilirsiniz, ancak daha sonra bu web sitesinin size ait olduğunu doğrulamanız gerekecektir.
                    </p>
                  </div>
                )}
              </div>

              {/* Country + Phone */}
              <div className="flex gap-3">
                <div className="w-[120px] relative">
                  <select className={selectClass} defaultValue="TR">
                    <option value="TR">Turkey</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#3c57bc] focus-within:ring-1 focus-within:ring-[#3c57bc]">
                  <span className="flex items-center px-3 bg-gray-50 text-sm text-gray-500 border-r border-gray-300">+90</span>
                  <input type="tel" placeholder="Telefon numarası" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="flex-1 px-3 py-3 text-sm outline-none" maxLength={10} />
                </div>
              </div>

              {/* Employee count */}
              <CustomSelect value={employees} onChange={setEmployees} options={EMPLOYEE_OPTIONS} placeholder="Çalışan sayısı" />

              {/* Revenue */}
              <CustomSelect value={revenue} onChange={setRevenue} options={REVENUE_OPTIONS} placeholder="Yıllık gelir" />

              {/* Password */}
              <input type="password" placeholder="Şifre (min. 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !companyName || !firstName || !email || !password}
                className="w-full py-3.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-lg hover:bg-[#2e449a] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Oluşturuluyor...</> : 'Ücretsiz hesap oluşturun'}
              </button>

              <p className="text-xs text-gray-400 leading-relaxed">
                Bu formu göndererek Superscore, ürünlerimizi ve hizmetlerimizi tartışmak için iletişim bilgilerinizi kullanacaktır.
                Kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklayan{' '}
                <Link href="/gizlilik" className="text-[#3c57bc] hover:underline">Gizlilik Politikamızı</Link> okuyun.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
