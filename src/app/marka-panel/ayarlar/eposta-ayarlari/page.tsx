'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Info, X, Zap, Lock } from 'lucide-react';
import Link from 'next/link';
import type { Brand } from '@/types';

/* ─── Radio Button ─── */
function Radio({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange()}
      disabled={disabled}
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
        ${checked ? 'border-[#3c57bc]' : 'border-gray-300'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#3c57bc]" />}
    </button>
  );
}

/* ─── Upgrade Tooltip ─── */
function UpgradeTooltip({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="absolute left-0 top-full mt-2 z-30 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-top-2 duration-150">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-[#3c57bc] flex items-center justify-center">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-bold text-[#1b1a1b]">Gelişmiş Plan</p>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Kendi e-posta alan adınızı kullanarak göndermek için <strong>Gelişmiş plana</strong> geçin. Müşterileriniz e-postaların sizden geldiğini görür.
      </p>
      <Link
        href="/marka-panel/abonelik"
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-500 to-[#3c57bc] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        <Zap className="h-3.5 w-3.5" /> Yükseltin
      </Link>
    </div>
  );
}

/* ─── Preview Modal ─── */
function PreviewModal({ open, onClose, brand, senderName }: { open: boolean; onClose: () => void; brand: Brand | null; senderName: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Email header */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">E-posta önizlemesi</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
        </div>
        {/* Email meta */}
        <div className="border-b border-gray-100 px-5 py-3 space-y-1">
          <p className="text-xs text-gray-500">Gönderen: <span className="text-[#1b1a1b] font-medium">{senderName || brand?.name || 'Şirket'} &lt;noreply@superscore.com&gt;</span></p>
          <p className="text-xs text-gray-500">Konu: <span className="text-[#1b1a1b] font-medium">Deneyiminizi değerlendirin</span></p>
        </div>
        {/* Email body */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0e291d] flex items-center justify-center text-white font-bold text-xs">
              {(brand?.name || 'S').charAt(0)}
            </div>
            <span className="text-sm font-semibold">{senderName || brand?.name}</span>
          </div>
          <p className="text-base font-bold text-[#1b1a1b] mb-2">Deneyiminizi bizimle paylaşın</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">Merhaba, yakın zamanda <strong>{brand?.name || 'şirketimiz'}</strong> ile yaşadığınız deneyimi değerlendirmek ister misiniz?</p>
          <div className="bg-gray-50 rounded-xl p-4 text-center mb-4">
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(s => (
                <div key={s} className="w-8 h-8 bg-[#00b67a] rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              ))}
            </div>
            <button className="text-sm text-[#3c57bc] font-medium">Yorum yaz →</button>
          </div>
          <p className="text-xs text-gray-400 text-center">Bu e-postayı almak istemiyorsanız abonelikten çıkın.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function EpostaAyarlariPage() {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'service' | 'product' | null>(null);
  const [showUpgradeTip, setShowUpgradeTip] = useState(false);
  const upgradeRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    service_template: 'Satın alma dışı deneyimler için',
    product_template: 'Ürün incelemeleri için optimize edilmiştir.',
    identifier: 'domain',   // 'domain' | 'name'
    sender_name: '',
    reply_to_email: '',
    sender_email_type: 'noreply', // 'noreply' | 'custom'
    landing_url: 'https://superscore.com',
    privacy_policy: 'no',   // 'no' | 'yes'
    privacy_url: '',
  });

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id, brand:brands(*)')
        .eq('user_id', user.id)
        .single();
      if (member) {
        const m = member as unknown as { brand_id: string; brand: Brand };
        setBrandId(m.brand_id);
        setBrand(m.brand);
        setForm(f => ({
          ...f,
          sender_name: m.brand.name || '',
          reply_to_email: (m.brand as unknown as Record<string, string>).contact_email || '',
          landing_url: `https://superscore.com/marka/${m.brand.slug || ''}`,
        }));
      }
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close upgrade tooltip on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (upgradeRef.current && !upgradeRef.current.contains(e.target as Node)) {
        setShowUpgradeTip(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function save() {
    if (!brandId) return;
    setSaving(true);
    await supabase.from('brands').update({
      sender_name: form.sender_name,
      contact_email: form.reply_to_email,
    } as never).eq('id', brandId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const domain = brand?.website?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'sirket.com';
  const brandName = brand?.name || 'Şirket';

  if (loading) return (
    <div className="max-w-2xl mx-auto space-y-4">
      {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />)}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#1b1a1b] mb-1">E-posta Ayarları</h1>
      <p className="text-sm text-gray-500 mb-6">Davetiye e-postalarının şablonunu ve gönderim bilgilerini özelleştirin.</p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">

        {/* ─── Hizmet şablonu ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-2">
            Hizmet değerlendirme davetiyeleri için varsayılan şablon
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <input
              type="text"
              value={form.service_template}
              onChange={e => setForm(f => ({ ...f, service_template: e.target.value }))}
              className="flex-1 px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none"
            />
            <Link
              href="/marka-panel/davetiyeler/eposta"
              className="px-4 py-3 text-sm text-[#3c57bc] hover:bg-blue-50 border-l border-gray-200 transition-colors flex-shrink-0"
            >
              Değiştirmek
            </Link>
          </div>
          <button
            onClick={() => { setPreviewType('service'); setPreviewOpen(true); }}
            className="text-sm text-[#3c57bc] hover:underline mt-2 inline-block"
          >
            Önizleme
          </button>
        </div>

        {/* ─── Ürün şablonu ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-2">
            Ürün inceleme davetiyeleri için varsayılan şablon
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <input
              type="text"
              value={form.product_template}
              onChange={e => setForm(f => ({ ...f, product_template: e.target.value }))}
              className="flex-1 px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none"
            />
            <Link
              href="/marka-panel/davetiyeler/eposta"
              className="px-4 py-3 text-sm text-[#3c57bc] hover:bg-blue-50 border-l border-gray-200 transition-colors flex-shrink-0"
            >
              Değiştirmek
            </Link>
          </div>
          <button
            onClick={() => { setPreviewType('product'); setPreviewOpen(true); }}
            className="text-sm text-[#3c57bc] hover:underline mt-2 inline-block"
          >
            Önizleme
          </button>
        </div>

        {/* ─── Şirket tanımlayıcısı ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-1">
            Davetiye şablonları için şirket tanımlayıcısını seçin:
          </label>
          <p className="text-sm text-gray-500 mb-3">
            <span className="text-[#1b1a1b] font-medium">[CompanyIdentifier]</span> yer tutucusu, müşterilerinizin şirketinizi tanımasına yardımcı olmak için davetiye şablonlarında kullanılır.
          </p>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <Radio checked={form.identifier === 'domain'} onChange={() => setForm(f => ({ ...f, identifier: 'domain' }))} />
              <span className="text-sm text-[#1b1a1b]">{domain}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Radio checked={form.identifier === 'name'} onChange={() => setForm(f => ({ ...f, identifier: 'name' }))} />
              <span className="text-sm text-[#1b1a1b]">{brandName}</span>
            </label>
          </div>
        </div>

        {/* ─── Gönderenin Adı ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-2">Gönderenin Adı:</label>
          <input
            type="text"
            value={form.sender_name}
            onChange={e => setForm(f => ({ ...f, sender_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30"
          />
        </div>

        {/* ─── Reply-to ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-2">
            Müşteri davete yanıt verirse, yanıtı şu adrese gönderin:
          </label>
          <select
            value={form.reply_to_email}
            onChange={e => setForm(f => ({ ...f, reply_to_email: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 bg-white appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
          >
            <option value="">Yanıt adresi seçin</option>
            {brand?.website && <option value={`hi@${domain}`}>hi@{domain}</option>}
            <option value={`destek@${domain}`}>destek@{domain}</option>
            <option value={`info@${domain}`}>info@{domain}</option>
          </select>
          <button className="text-sm text-[#3c57bc] hover:underline mt-2 inline-block">
            Yanıt e-postalarınızı yönetin
          </button>
        </div>

        {/* ─── Gönderenin E-postası ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-3">Gönderenin E-postası:</label>
          <div className="space-y-3">

            {/* Option 1: noreply */}
            <label className="flex items-start gap-3 cursor-pointer">
              <Radio
                checked={form.sender_email_type === 'noreply'}
                onChange={() => setForm(f => ({ ...f, sender_email_type: 'noreply' }))}
              />
              <span className="text-sm text-[#1b1a1b] leading-relaxed">
                <strong>noreply.invitations@superscore.com</strong> adresinden gönderin (başka bir kurulum gerekmez)
              </span>
            </label>

            {/* Option 2: custom (locked) */}
            <div ref={upgradeRef} className="relative">
              <label className="flex items-start gap-3 cursor-pointer" onClick={() => { setShowUpgradeTip(true); }}>
                <Radio
                  checked={form.sender_email_type === 'custom'}
                  onChange={() => {}}
                  disabled
                />
                <span className="text-sm text-gray-400 leading-relaxed flex items-center gap-2">
                  Gönderen adresi için kendi e-posta alan adınızı kullanarak e-posta gönderin (kurulumu için teknik bilgi gereklidir).
                  <span className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 border border-violet-200 px-2 py-0.5 rounded-full font-semibold cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                    <Lock className="h-3 w-3" /> Gelişmiş
                  </span>
                </span>
              </label>
              <UpgradeTooltip
                visible={showUpgradeTip}
                onClose={() => setShowUpgradeTip(false)}
              />
            </div>
          </div>
        </div>

        {/* ─── Landing URL ─── */}
        <div className="px-6 py-5">
          <label className="block text-sm text-gray-600 mb-2">
            Müşterileri yönlendireceğiniz davetiye giriş sayfası:
          </label>
          <select
            value={form.landing_url}
            onChange={e => setForm(f => ({ ...f, landing_url: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 bg-white appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
          >
            <option value="https://superscore.com">https://superscore.com</option>
            {brand?.website && <option value={brand.website}>{brand.website}</option>}
          </select>
        </div>

        {/* ─── Gizlilik politikası ─── */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm text-gray-600">Gizlilik politikası bağlantısı</label>
            <div className="relative group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute left-5 top-0 z-10 hidden group-hover:block w-64 bg-[#1b1a1b] text-white text-xs rounded-xl px-3 py-2 leading-relaxed shadow-xl">
                Müşterilere gönderilen davet e-postasında gizlilik politikanıza ait bir bağlantı gösterilir.
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <Radio
                checked={form.privacy_policy === 'no'}
                onChange={() => setForm(f => ({ ...f, privacy_policy: 'no' }))}
              />
              <span className="text-sm text-[#1b1a1b]">Hayır, Gizlilik Politikama bağlantı vermek istemiyorum.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Radio
                checked={form.privacy_policy === 'yes'}
                onChange={() => setForm(f => ({ ...f, privacy_policy: 'yes' }))}
              />
              <span className="text-sm text-[#1b1a1b]">Evet, Gizlilik Politikama bağlantı vermek istiyorum.</span>
            </label>
          </div>

          {form.privacy_policy === 'yes' && (
            <div className="mt-3">
              <label className="block text-xs text-gray-500 mb-1">Gizlilik politikası URL'si</label>
              <input
                type="url"
                value={form.privacy_url}
                onChange={e => setForm(f => ({ ...f, privacy_url: e.target.value }))}
                placeholder={`https://${domain}/gizlilik`}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30"
              />
            </div>
          )}
        </div>

        {/* ─── Save button ─── */}
        <div className="px-6 py-5">
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2.5 bg-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 enabled:hover:bg-[#1b1a1b] enabled:hover:text-white"
          >
            {saved ? '✓ Değişiklikler kaydedildi' : saving ? 'Kaydediliyor...' : 'Değişiklikleri kaydet'}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        brand={brand}
        senderName={form.sender_name}
      />
    </div>
  );
}
