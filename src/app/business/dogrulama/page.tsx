'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ChevronDown, Loader2, HelpCircle, Star } from 'lucide-react';

type Method = 'email' | 'upload' | 'google' | 'meta' | 'dns';

const METHODS: { id: Method; title: string; icon: string; recommended?: boolean }[] = [
  { id: 'email', title: 'Domain e-postası ile doğrulayın', icon: '/logo/verifymail.svg', recommended: true },
  { id: 'upload', title: 'Dosya yükleme ile doğrulayın', icon: '/logo/verifyupload.svg' },
  { id: 'google', title: 'Google Search Console ile doğrulayın', icon: '/logo/verifygoogle.svg' },
  { id: 'meta', title: 'Meta etiketi ile doğrulayın', icon: '/logo/verifytag.svg' },
  { id: 'dns', title: 'DNS ile doğrulayın', icon: '/logo/verifydns.svg' },
];

export default function VerificationPage() {
  const [openMethod, setOpenMethod] = useState<Method>('email');
  const [domainEmail, setDomainEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [brandDomain, setBrandDomain] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
        // Get brand info
        const { data: membership } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
        if (membership) {
          const { data: brand } = await supabase.from('brands').select('website').eq('id', membership.brand_id).single();
          if (brand?.website) {
            let domain = brand.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
            setBrandDomain(domain);
          }
        }
      }
    }
    load();
  }, []);

  async function handleSendVerification() {
    if (!domainEmail) return;
    setSending(true);
    // TODO: Send actual verification email
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
  }

  function toggle(method: Method) {
    setOpenMethod(openMethod === method ? '' as Method : method);
  }

  return (
    <div className="min-h-screen bg-[#f3f0ed]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Verification Methods */}
        <div className="space-y-3">
          {METHODS.map((method) => {
            const isOpen = openMethod === method.id;
            const isEmail = method.id === 'email';

            return (
              <div key={method.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => toggle(method.id)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <Image src={method.icon} alt="" width={28} height={28} className="w-7 h-7 flex-shrink-0" />
                  <span className="font-semibold text-[#1b1a1b] flex-1">{method.title}</span>
                  {method.recommended && (
                    <span className="text-xs font-medium text-white bg-[#1b1a1b] px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" /> Önerilen
                    </span>
                  )}
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    {isEmail ? (
                      /* EMAIL VERIFICATION - Active */
                      <div>
                        <p className="text-sm text-[#1b1a1b]/70 mb-1">
                          <strong>{brandDomain || 'domain.com'}</strong> ile ilişkili e-posta adresini girin.
                          Yalnızca domain sahipliğinizi doğrulamak için kullanacağız.
                        </p>
                        <p className="text-sm text-[#1b1a1b]/70 mb-5">
                          Superscore hesabınıza giriş yapmak için yine <strong>{userEmail}</strong> adresini kullanmanız gerekecektir.{' '}
                          <Link href="/yardim" className="text-[#3c57bc] hover:underline inline-flex items-center gap-0.5">
                            Daha fazla bilgi edinin <Image src="/logo/yenisekme.svg" alt="" width={12} height={12} className="w-3 h-3 inline" />
                          </Link>
                        </p>

                        <label className="block text-sm font-medium text-[#1b1a1b] mb-2">Domain e-postası</label>
                        <div className="flex gap-3">
                          <div className="flex-1 flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3c57bc] transition-all">
                            <input
                              type="text"
                              placeholder="Domain e-postası"
                              value={domainEmail}
                              onChange={(e) => setDomainEmail(e.target.value.replace(/@/g, ''))}
                              className="flex-1 px-4 py-3 text-sm outline-none"
                            />
                            <div className="flex items-center px-3 bg-gray-50 border-l border-gray-200 text-gray-500 text-sm whitespace-nowrap">
                              @{brandDomain || 'domain.com'}
                            </div>
                          </div>
                          <button
                            onClick={handleSendVerification}
                            disabled={!domainEmail || sending}
                            className="px-5 py-3 bg-gray-200 text-[#1b1a1b] text-sm font-medium rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200 transition-colors flex items-center gap-2"
                          >
                            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                            Gönder
                          </button>
                        </div>

                        {sent && (
                          <div className="mt-4 p-3 bg-[#d4f4e2] rounded-xl text-sm text-green-800">
                            Doğrulama e-postası <strong>{domainEmail}@{brandDomain}</strong> adresine gönderildi. Lütfen gelen kutunuzu kontrol edin.
                          </div>
                        )}
                      </div>
                    ) : (
                      /* OTHER METHODS - Coming Soon */
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                          <Image src={method.icon} alt="" width={32} height={32} className="w-8 h-8 opacity-40" />
                        </div>
                        <h3 className="font-superscore-bold text-lg text-[#1b1a1b] mb-2">Çok Yakında</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                          Bu doğrulama yöntemi şu anda geliştirme aşamasındadır. Şimdilik domain e-postası ile doğrulamayı kullanabilirsiniz.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help */}
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <HelpCircle className="h-4 w-4" />
          <span>Yardıma mı ihtiyacınız var? <Link href="/yardim" className="text-[#3c57bc] hover:underline">Bu formu doldurun</Link> ve sizinle iletişime geçelim.</span>
        </div>

        {/* Skip Button - Dev mode */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { window.location.href = '/business/dogrulandi'; }}
            className="px-6 py-3 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors"
          >
            Bu adımı geç (Geliştirme modu)
          </button>
          <p className="text-xs text-gray-400 mt-2">Domain doğrulama aktif olduğunda bu buton kaldırılacaktır.</p>
        </div>
      </div>
    </div>
  );
}
