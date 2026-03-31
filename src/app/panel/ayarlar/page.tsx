'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ShieldCheck, Upload, X, ChevronDown, LogOut, Trash2, Gift, Star } from 'lucide-react';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userId, setUserId] = useState('');
  const router = useRouter();
  const supabase = createClient();

  // Email preferences
  const [emailPrefs, setEmailPrefs] = useState({
    marketing: true,
    recommendations: true,
    insights: true,
    newsletter: true,
    features: true,
    about: true,
    general: true,
    milestones: true,
    invitations: true,
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
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
              Tek ihtiyacınız olan bir kimlik belgesi. Doğrulama, okuduğunuz yorumların gerçek kişiler tarafından yazıldığından emin olmanızı sağlar, çevrimiçi güven oluşturur ve herkesin güvenle alışveriş yapmasını sağlar.
            </p>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="px-5 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] transition-colors"
            >
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
            <p className="text-sm text-gray-600 mb-2">
              Doğrulanmış ve aktif değerlendiricilere özel hediyeler! Belirli sayıda kaliteli değerlendirme yapan kullanıcılarımız markalardan özel indirimler ve hediyeler kazanır.
            </p>
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

        {/* Avatar upload */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#52b37f] flex items-center justify-center text-white text-2xl font-bold">
            {fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="space-y-2">
            <button className="px-4 py-2 bg-[#3c57bc] text-white text-sm font-medium rounded-full hover:bg-[#2e449a] transition-colors flex items-center gap-2">
              <Upload className="h-4 w-4" /> Yeni profil fotoğrafı yükle
            </button>
            <button className="block text-sm text-[#3c57bc] hover:underline">
              Fotoğrafımı şimdilik kaldır
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">E-posta</label>
            <Input value={email} disabled className="bg-gray-50 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">
              Ad Soyad <span className="text-gray-400 font-normal">(herkese açık)</span><span className="text-red-500">*</span>
            </label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">
              Telefon <span className="text-gray-400 font-normal">(opsiyonel)</span>
            </label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5XX XXX XXXX" className="rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1b1a1b] mb-1.5">
              Ülke<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm appearance-none bg-white pr-10">
                <option>Türkiye</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-gray-400"><span className="text-red-500">*</span>Zorunlu</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] disabled:opacity-50 transition-colors"
          >
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Bilgileri Kaydet'}
          </button>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">E-posta Ayarları</h2>
        <p className="text-sm text-gray-500 mb-4">Hangi tür e-postalar almak istediğinizi seçin. Hesabınızla ilgili önemli e-postalar her zaman etkindir.</p>
        <hr className="border-gray-100 mb-4" />

        {/* Marketing */}
        <div className="space-y-4">
          <EmailToggle
            title="Pazarlama"
            description="Bunlar için açılma oranlarını takip ediyoruz."
            checked={emailPrefs.marketing}
            onChange={() => togglePref('marketing')}
          />
          <div className="pl-4 border-l-2 border-gray-200 space-y-3">
            <EmailToggle title="Kişiselleştirilmiş öneriler" description="Tercihlerinize ve aktivitenize göre" checked={emailPrefs.recommendations} onChange={() => togglePref('recommendations')} small />
            <EmailToggle title="Son haberler" description="Trend şirketler, ilham, ipuçları ve daha fazlası" checked={emailPrefs.insights} onChange={() => togglePref('insights')} small />
            <EmailToggle title="Bülten" description="En son haber özeti" checked={emailPrefs.newsletter} onChange={() => togglePref('newsletter')} small />
            <EmailToggle title="Özellik güncellemeleri" description="Yeni özellik duyuruları" checked={emailPrefs.features} onChange={() => togglePref('features')} small />
            <EmailToggle title="Superscore hakkında" description="Hesabınızdan en iyi şekilde nasıl yararlanabilirsiniz" checked={emailPrefs.about} onChange={() => togglePref('about')} small />
          </div>

          <EmailToggle
            title="Genel"
            description="Hesabınızla ilgili diğer mesajlar."
            checked={emailPrefs.general}
            onChange={() => togglePref('general')}
          />
          <div className="pl-4 border-l-2 border-gray-200 space-y-3">
            <EmailToggle title="Değerlendirme kilometre taşları" description="Aktivitenizi kutlayan istatistikler" checked={emailPrefs.milestones} onChange={() => togglePref('milestones')} small />
            <EmailToggle title="Değerlendirme davetleri" description="Şirketlerden gelen değerlendirme talepleri" checked={emailPrefs.invitations} onChange={() => togglePref('invitations')} small />
          </div>
        </div>
      </div>

      {/* Download Data */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Verilerinizi İndirin</h2>
        <p className="text-sm text-gray-600">
          <a href="#" className="text-[#3c57bc] hover:underline">Buraya tıklayarak</a> Superscore&apos;daki kişisel verilerinizi görüntüleyebilir ve indirebilirsiniz.
        </p>
      </div>

      {/* Log out everywhere */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Her Yerden Çıkış Yap</h2>
        <p className="text-sm text-gray-600 mb-4">Superscore hesabınızın açık olduğu her yerde oturumu kapatın (masaüstü, mobil ve diğer cihazlar dahil).</p>
        <button
          onClick={handleSignOut}
          className="px-5 py-2.5 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:bg-[#f2f5fd] hover:text-[#1a1a1a] hover:border-transparent transition-all flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Çıkış Yap
        </button>
      </div>

      {/* Delete Account */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h2 className="font-superscore-bold text-lg text-[#1b1a1b] mb-1">Hesabı Sil</h2>
        <p className="text-sm text-gray-600 mb-4">Kullanıcı profilinizi sildiğinizde, değerlendirmeleriniz de silinir ve geri yüklenemez.</p>
        <button className="px-5 py-2.5 text-sm font-medium text-[#3c57bc] border border-[#3c57bc] rounded-full hover:bg-[#f2f5fd] hover:text-[#1a1a1a] hover:border-transparent transition-all flex items-center gap-2">
          <Trash2 className="h-4 w-4" /> Profilimi Sil
        </button>
      </div>

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowVerifyModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVerifyModal(false)} className="absolute top-4 left-4">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src="/logo/SS_Star.png" alt="Superscore" width={48} height={48} className="w-12 h-12" />
            </div>

            <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-3">Kimlik Doğrulama</h2>
            <p className="text-sm text-gray-600 mb-6">
              Bu özellik çok yakında aktif olacak! Doğrulanmış değerlendirici olarak yorumlarınız daha güvenilir hale gelecek ve özel hediye programına katılabileceksiniz.
            </p>

            <div className="bg-[#f9f8f5] rounded-xl p-4 mb-6 space-y-3 text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[#52b37f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#1b1a1b]">Doğrulanmış rozet</p>
                  <p className="text-xs text-gray-500">Profilinizde doğrulanmış rozeti görünür</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-[#ef8d3f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#1b1a1b]">Hediye programı</p>
                  <p className="text-xs text-gray-500">Markalardan özel indirimler ve hediyeler</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[#f7d047] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#1b1a1b]">Öncelikli destek</p>
                  <p className="text-xs text-gray-500">Şikayetleriniz öncelikli olarak işlenir</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-3 bg-[#1b1a1b] text-white rounded-full font-semibold text-sm hover:bg-[#333] transition-colors"
            >
              Anladım, beni bilgilendir
            </button>
            <p className="text-xs text-gray-400 mt-3">Özellik aktif olduğunda size bildirim göndereceğiz.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Toggle component for email settings
function EmailToggle({ title, description, checked, onChange, small }: {
  title: string; description: string; checked: boolean; onChange: () => void; small?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className={`font-medium text-[#1b1a1b] ${small ? 'text-sm' : 'text-base'}`}>{title}</p>
        <p className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#3c57bc]' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
