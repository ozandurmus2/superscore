'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const COUNTRIES = [
  'Türkiye', 'Almanya', 'Amerika Birleşik Devletleri', 'İngiltere', 'Fransa',
  'İtalya', 'İspanya', 'Hollanda', 'Belçika', 'İsviçre', 'Avusturya', 'Polonya',
  'Çek Cumhuriyeti', 'Danimarka', 'Norveç', 'İsveç', 'Finlandiya', 'Portekiz',
  'Yunanistan', 'Rusya', 'Japonya', 'Çin', 'Hindistan', 'Brezilya', 'Kanada', 'Avustralya',
];

const LANGUAGES = [
  'Türkçe', 'İngilizce (Amerika Birleşik Devletleri)', 'İngilizce (İngiltere)',
  'Almanca', 'Fransızca', 'İspanyolca', 'İtalyanca', 'Portekizce',
  'Rusça', 'Japonca', 'Çince (Basitleştirilmiş)', 'Arapça', 'Hollandaca',
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-[#1b1a1b] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]';
const selectCls = `${inputCls} bg-white appearance-none`;
const arrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

/* ─── Password modal ─── */
function PasswordModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (pw: string) => Promise<void> }) {
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit() {
    setErr('');
    if (pw.length < 8) { setErr('Şifre en az 8 karakter olmalı.'); return; }
    if (pw !== confirm) { setErr('Şifreler eşleşmiyor.'); return; }
    setSaving(true);
    await onSave(pw);
    setSaving(false);
    setPw(''); setConfirm('');
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-base font-bold text-[#1b1a1b] mb-4">Şifre değiştir</h2>
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-[#1b1a1b] mb-1">Yeni şifre</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="En az 8 karakter" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm text-[#1b1a1b] mb-1">Yeni şifre (tekrar)</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className={inputCls} />
          </div>
        </div>
        {err && <p className="text-xs text-red-500 mb-3">{err}</p>}
        <div className="flex gap-3">
          <button onClick={submit} disabled={saving} className="flex-1 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-50">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete confirmation modal ─── */
function DeleteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-base font-bold text-[#1b1a1b] mb-2">Hesabınızı silmek istediğinizden emin misiniz?</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">Superscore Business'a erişiminizi kaybedeceksiniz; yani artık profilinizi yönetemeyecek veya yorumcularla etkileşim kuramayacaksınız. Ayrıca bizden bildirim de almayacaksınız.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-[#b91c1c] text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors">
            Evet, sil
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KisiselHesapPage() {
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({ full_name: '', email: '', country: 'Türkiye', language: 'İngilizce (Amerika Birleşik Devletleri)' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data: profile } = await supabase.from('users').select('full_name, country, language').eq('id', user.id).single();
      const p = profile as { full_name: string; country: string; language: string } | null;
      setForm({
        full_name: p?.full_name || '',
        email: user.email || '',
        country: p?.country || 'Türkiye',
        language: p?.language || 'İngilizce (Amerika Birleşik Devletleri)',
      });
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProfile() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('users').update({
        full_name: form.full_name,
        country: form.country,
        language: form.language,
      } as never).eq('id', user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function changePassword(pw: string) {
    await supabase.auth.updateUser({ password: pw });
  }

  if (loading) return (
    <div className="max-w-2xl mx-auto space-y-4">
      {[1, 2].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />)}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* ─── Temel bilgiler ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">Temel bilgiler</h2>
        </div>
        <div className="px-6 py-5 space-y-4">

          <Field label="Kullanıcı kimliği">
            <input
              type="text"
              value={userId}
              disabled
              className={`${inputCls} text-gray-400 bg-gray-50 cursor-not-allowed border-gray-200`}
            />
          </Field>

          <Field label="İsim*">
            <input
              type="text"
              value={form.full_name}
              onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
              className={inputCls}
            />
          </Field>

          <Field label="Ülke*">
            <select
              value={form.country}
              onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
              className={selectCls}
              style={{ backgroundImage: arrowSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
            >
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Dil*">
            <select
              value={form.language}
              onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
              className={selectCls}
              style={{ backgroundImage: arrowSvg, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
            >
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
          </Field>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-6 py-2.5 bg-[#c7d2f5] text-[#3c57bc] text-sm font-semibold rounded-full hover:bg-[#3c57bc] hover:text-white transition-colors disabled:opacity-50"
          >
            {saved ? '✓ Değişiklikler kaydedildi' : 'Değişiklikleri kaydet'}
          </button>
        </div>
      </div>

      {/* ─── Güvenlik ayarları ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">Güvenlik ayarları</h2>
        </div>
        <div className="px-6 py-5 space-y-5">

          {/* E-posta */}
          <div>
            <p className="text-sm font-semibold text-[#1b1a1b] mb-2">E-posta</p>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="border border-gray-300 rounded-xl px-4 py-3 bg-white">
                  <p className="text-sm text-[#1b1a1b]">{form.email}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Onayınızı alana kadar bu e-postayı değiştirmeyeceğiz.</p>
              </div>
              <button className="flex-shrink-0 px-4 py-3 bg-gray-100 text-[#3c57bc] text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap">
                E-postayı değiştir
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Şifre */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1b1a1b]">Şifre</p>
            <button
              onClick={() => setShowPw(true)}
              className="px-5 py-2.5 bg-gray-100 text-[#3c57bc] text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Şifre değiştir
            </button>
          </div>

          <div className="border-t border-gray-100" />

          {/* Hesabımı sil */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-[#1b1a1b] mb-1">Hesabımı sil</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Superscore Business&apos;a erişiminizi kaybedeceksiniz; yani artık profilinizi yönetemeyecek veya yorumcularla etkileşim kuramayacaksınız. Ayrıca bizden bildirim de almayacaksınız.
              </p>
            </div>
            <button
              onClick={() => setShowDelete(true)}
              className="flex-shrink-0 px-5 py-2.5 bg-[#7f2929] text-white text-sm font-semibold rounded-full hover:bg-[#991b1b] transition-colors"
            >
              Hesabımı sil
            </button>
          </div>

        </div>
      </div>

      <PasswordModal open={showPw} onClose={() => setShowPw(false)} onSave={changePassword} />
      <DeleteModal open={showDelete} onClose={() => setShowDelete(false)} />
    </div>
  );
}
