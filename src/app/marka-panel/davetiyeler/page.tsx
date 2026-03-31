'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

type InviteRow = {
  id: string;
  email: string;
  status: string;
  created_at: string;
  sent_at: string | null;
  type: string;
  reference: string | null;
};

export default function DavetiyelerPage() {
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [stats, setStats] = useState({ sent: 0, verified: 0, trust: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id')
        .eq('user_id', user.id)
        .single();
      if (!member) return;
      const bid = (member as unknown as { brand_id: string }).brand_id;

      const { data: rows, error: rowsErr } = await supabase
        .from('review_invitations')
        .select('*')
        .eq('brand_id', bid)
        .order('created_at', { ascending: false })
        .limit(20);

      const { count: sentCount } = await supabase
        .from('review_invitations')
        .select('*', { count: 'exact', head: true })
        .eq('brand_id', bid);

      const { count: verifiedCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('brand_id', bid)
        .eq('verified', true);

      if (!rowsErr) setInvites((rows || []) as InviteRow[]);
      setStats({ sent: sentCount || 0, verified: verifiedCount || 0, trust: 0 });
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusLabel = (s: string) => {
    if (s === 'sent') return { text: 'Gönderildi', color: 'text-blue-600 bg-blue-50' };
    if (s === 'opened') return { text: 'Açıldı', color: 'text-amber-600 bg-amber-50' };
    if (s === 'reviewed') return { text: 'Yorum yapıldı', color: 'text-green-600 bg-green-50' };
    if (s === 'pending') return { text: 'Bekliyor', color: 'text-gray-500 bg-gray-100' };
    return { text: s, color: 'text-gray-500 bg-gray-100' };
  };

  return (
    <div className="w-full max-w-5xl space-y-5">

      {/* ── Hero ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden p-5 md:p-8 flex flex-col items-center text-center">
        <Image
          src="/icons/invitations/kutu.svg"
          alt="Davetiyeler"
          width={64}
          height={64}
          className="mb-4 opacity-80"
        />
        <h2 className="text-lg md:text-xl font-bold text-[#1b1a1b] mb-2">
          Zaman kazanın, otomatik pilota geçin.
        </h2>

        {/* 3 benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 mb-6 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-2">
            <Image src="/icons/invitations/guven.svg" alt="Güven" width={28} height={28} className="opacity-60" />
            <p className="text-sm font-semibold text-[#1b1a1b]">Güven oluşturun</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Potansiyel müşterilerin işletmenize güvenebileceklerini, doğrulanmış yorumlarla gösterin.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/icons/invitations/analy.svg" alt="Büyüme" width={28} height={28} className="opacity-60" />
            <p className="text-sm font-semibold text-[#1b1a1b]">Büyümek</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dönüşümü artırdığı kanıtlanmış yorumlarla, alıcı yolculuğunuz boyunca performansı artırın.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/icons/invitations/star.svg" alt="Geliştirme" width={28} height={28} className="opacity-60" />
            <p className="text-sm font-semibold text-[#1b1a1b]">Geliştirmek</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Doğrulanmış yorumlar, müşteri verilerinizle ilişkilendirilebilir ve bu da karar vermenize yardımcı olur.
            </p>
          </div>
        </div>

        <Link
          href="/marka-panel/davetiyeler/olustur"
          className="inline-block px-6 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors"
        >
          Otomatik davetiyeler ayarlayın
        </Link>
      </div>

      {/* ── Stats ── */}
      <p className="text-sm font-bold text-[#1b1a1b]">Son 28 gündeki performansınız</p>

      {/* Top 3 stat numbers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-[#1b1a1b]">{loading ? '—' : stats.sent}</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 leading-snug">Teslim edilen davetiyeler</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-[#1b1a1b]">{loading ? '—' : stats.verified}</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 leading-snug">Doğrulanmış yorumlar</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-[#1b1a1b]">{loading ? '—' : stats.trust}</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 leading-snug">Güven Puanı</p>
        </div>
      </div>

      {/* Bottom 2 info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <p className="text-xs font-semibold text-gray-500 mb-2">En çok kullandığınız hizmet değerlendirme şablonu</p>
          <p className="text-sm text-gray-400 mt-2">—</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 flex flex-col justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#1b1a1b] mb-1">
              Davetiyelerinizin dönüşüm oranları hakkında daha fazla bilgi edinmek ister misiniz?
            </p>
            <p className="text-sm text-gray-500 mt-2">Daha fazlasına erişin.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <button className="text-[#3c57bc] hover:underline">Kilidi aç özelliği</button>
          </div>
        </div>
      </div>

      {/* ── Recent invitations ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-sm font-bold text-[#1b1a1b]">Son zamanlarda davet edilen müşteriler</p>
          <button className="text-sm text-[#3c57bc] hover:underline whitespace-nowrap">
            Davet geçmişinin tamamını inceleyin.
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
          </div>
        ) : invites.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Henüz davetiye gönderilmedi.
            <br />
            <Link href="/marka-panel/davetiyeler/olustur" className="text-[#3c57bc] hover:underline mt-1 inline-block">
              İlk davetiyenizi gönderin →
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Müşteri E-postası</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Durum</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Oluşturuldu</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Gönderilmiş</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Tip</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Referans no.</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map(inv => {
                    const badge = statusLabel(inv.status);
                    return (
                      <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-3 text-sm text-[#1b1a1b]">{inv.email}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.color}`}>{badge.text}</span>
                        </td>
                        <td className="px-6 py-3 text-xs text-gray-500">{new Date(inv.created_at).toLocaleDateString('tr-TR')}</td>
                        <td className="px-6 py-3 text-xs text-gray-500">{inv.sent_at ? new Date(inv.sent_at).toLocaleDateString('tr-TR') : '—'}</td>
                        <td className="px-6 py-3 text-xs text-gray-500">{inv.type || 'E-posta'}</td>
                        <td className="px-6 py-3 text-xs text-gray-500">{inv.reference || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-gray-100">
              {invites.map(inv => {
                const badge = statusLabel(inv.status);
                return (
                  <div key={inv.id} className="px-4 py-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-[#1b1a1b] break-all">{inv.email}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span>📅 {new Date(inv.created_at).toLocaleDateString('tr-TR')}</span>
                      {inv.sent_at && <span>✉️ {new Date(inv.sent_at).toLocaleDateString('tr-TR')}</span>}
                      <span>{inv.type || 'E-posta'}</span>
                      {inv.reference && <span>#{inv.reference}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && invites.length > 0 && (
          <div className="px-4 md:px-6 py-3 border-t border-gray-100">
            <button className="text-sm text-[#3c57bc] hover:underline">
              Davet geçmişinin tamamını inceleyin.
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
