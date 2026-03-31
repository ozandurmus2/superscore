'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ShieldCheck, Upload, X, ChevronDown, LogOut, Trash2, Gift, Star } from 'lucide-react';

export default function UserSettingsPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [emailPrefs, setEmailPrefs] = useState({
    marketing: true, recommendations: true, insights: true, newsletter: true,
    features: true, about: true, general: true, milestones: true, invitations: true,
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/giris'); return; }
      setEmail(user.email || '');
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (data) {
        setFullName((data as Record<string, string>).full_name || '');
        setPhone((data as Record<string, string>).phone || '');
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
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  function togglePref(key: string) {
    setEmailPrefs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  }

  return (
    <div className="min-h-screen bg-[#f9f8f5]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Verified Reviewer Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#d4f4e2] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-[#52b37f]" />
              </div>
              <div className="flex-1">
                <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Doğrulanmış değerlendirici olun</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Tek ihtiyacınız olan bir kimlik belgesi. Doğrulama, okuduğunuz yorumların gerçek kişiler tarafından yazıldığından emin olmanızı sağlar.
                </p>
                <button onClick={() => setShowVerifyModal(true)} className="px-5 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] transition-colors">
                  Başlayın
                </button>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fff3e0] flex items-center justify-center flex-shrink-0">
                <Gift className="h-6 w-6 text-[#ef8d3f]" />
              </div>
              <div className="flex-1">
                <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Hediye Programı</h2>
                <p className="text-sm text-gray-600 mb-2">Doğrulanmış ve aktif değerlendiricilere özel hediyeler!</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Star className="h-3.5 w-3.5 text-[#f7d047]" />
                  <span>5+ değerlendirme yaparak hediye programına katılabilirsiniz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Kişisel Ayarlar</h2>
            <p className="text-sm text-gray-500 mb-5">Profil fotoğrafınız</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#52b37f] flex items-center justify-center text-white text-2xl font-bold">
                {fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="space-y-2">
                <button className="px-4 py-2 bg-[#3c57bc] text-white text-sm font-medium rounded-full hover:bg-[#2e449a] transition-colors flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Yeni profil fotoğrafı yükle
                </button>
                <button className="block text-sm text-[#3c57bc] hover:underline">Fotoğrafımı şimdilik kaldır</button>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">E-posta</label>
                <Input value={email} disabled className="bg-gray-50 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Ad Soyad <span className="text-gray-400 font-normal">(herkese açık)</span><span className="text-red-500">*</span></label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Telefon <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5XX XXX XXXX" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">Ülke<span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm appearance-none bg-white pr-10"><option>Türkiye</option></select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <p className="text-xs text-gray-400"><span className="text-red-500">*</span>Zorunlu</p>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] disabled:opacity-50 transition-colors">
                {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Bilgileri Kaydet'}
              </button>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">E-posta Ayarları</h2>
            <p className="text-sm text-gray-500 mb-4">Hangi tür e-postalar almak istediğinizi seçin.</p>
            <hr className="border-gray-100 mb-4" />
            <div className="space-y-4">
              <Toggle title="Pazarlama" desc="Bunlar için açılma oranlarını takip ediyoruz." on={emailPrefs.marketing} toggle={() => togglePref('marketing')} />
              <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <Toggle title="Kişiselleştirilmiş öneriler" desc="Tercihlerinize ve aktivitenize göre" on={emailPrefs.recommendations} toggle={() => togglePref('recommendations')} sm />
                <Toggle title="Son haberler" desc="Trend şirketler, ilham, ipuçları" on={emailPrefs.insights} toggle={() => togglePref('insights')} sm />
                <Toggle title="Bülten" desc="En son haber özeti" on={emailPrefs.newsletter} toggle={() => togglePref('newsletter')} sm />
                <Toggle title="Özellik güncellemeleri" desc="Yeni özellik duyuruları" on={emailPrefs.features} toggle={() => togglePref('features')} sm />
                <Toggle title="Superscore hakkında" desc="Hesabınızdan en iyi şekilde yararlanın" on={emailPrefs.about} toggle={() => togglePref('about')} sm />
              </div>
              <Toggle title="Genel" desc="Hesabınızla ilgili diğer mesajlar." on={emailPrefs.general} toggle={() => togglePref('general')} />
              <div className="pl-4 border-l-2 border-gray-200 space-y-3">
                <Toggle title="Değerlendirme kilometre taşları" desc="Aktivitenizi kutlayan istatistikler" on={emailPrefs.milestones} toggle={() => togglePref('milestones')} sm />
                <Toggle title="Değerlendirme davetleri" desc="Şirketlerden gelen değerlendirme talepleri" on={emailPrefs.invitations} toggle={() => togglePref('invitations')} sm />
              </div>
            </div>
          </div>

          {/* Download Data */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Verilerinizi İndirin</h2>
            <p className="text-sm text-gray-600"><a href="#" className="text-[#3c57bc] hover:underline">Buraya tıklayarak</a> kişisel verilerinizi görüntüleyebilir ve indirebilirsiniz.</p>
          </div>

          {/* Log out everywhere */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
            <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Her Yerden Çıkış Yap</h2>
            <p className="text-sm text-gray-600 mb-4">Hesabınızın açık olduğu her yerde oturumu kapatın.</p>
            <button onClick={handleSignOut} className="px-5 py-2.5 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:bg-[#f2f5fd] hover:text-[#1a1a1a] hover:border-transparent transition-all flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Çıkış Yap
            </button>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Hesabı Sil</h2>
            <p className="text-sm text-gray-600 mb-4">Profilinizi sildiğinizde değerlendirmeleriniz de silinir ve geri yüklenemez.</p>
            <button className="px-5 py-2.5 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:bg-[#f2f5fd] hover:text-[#1a1a1a] hover:border-transparent transition-all flex items-center gap-2">
              <Trash2 className="h-4 w-4" /> Profilimi Sil
            </button>
          </div>
        </div>
      </div>

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowVerifyModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVerifyModal(false)} className="absolute top-4 left-4"><X className="h-5 w-5 text-gray-400 hover:text-gray-600" /></button>
            <div className="flex justify-center mb-6"><Image src="/logo/star_icon.png" alt="" width={48} height={48} className="w-12 h-12" /></div>
            <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-3">Kimlik Doğrulama</h2>
            <p className="text-sm text-gray-600 mb-6">Bu özellik çok yakında aktif olacak! Doğrulanmış değerlendirici olarak yorumlarınız daha güvenilir hale gelecek.</p>
            <div className="bg-[#f9f8f5] rounded-xl p-4 mb-6 space-y-3 text-left">
              <div className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-[#52b37f] flex-shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Doğrulanmış rozet</p><p className="text-xs text-gray-500">Profilinizde doğrulanmış rozeti görünür</p></div></div>
              <div className="flex items-start gap-3"><Gift className="h-5 w-5 text-[#ef8d3f] flex-shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Hediye programı</p><p className="text-xs text-gray-500">Markalardan özel indirimler ve hediyeler</p></div></div>
              <div className="flex items-start gap-3"><Star className="h-5 w-5 text-[#f7d047] flex-shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Öncelikli destek</p><p className="text-xs text-gray-500">Şikayetleriniz öncelikli olarak işlenir</p></div></div>
            </div>
            <button onClick={() => setShowVerifyModal(false)} className="w-full py-3 bg-[#1b1a1b] text-white rounded-full font-semibold text-sm hover:bg-[#333] transition-colors">Anladım, beni bilgilendir</button>
            <p className="text-xs text-gray-400 mt-3">Özellik aktif olduğunda size bildirim göndereceğiz.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ title, desc, on, toggle, sm }: { title: string; desc: string; on: boolean; toggle: () => void; sm?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div><p className={`font-medium text-[#1b1a1b] ${sm ? 'text-sm' : ''}`}>{title}</p><p className={`text-gray-500 ${sm ? 'text-xs' : 'text-sm'}`}>{desc}</p></div>
      <button onClick={toggle} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-[#3c57bc]' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}
