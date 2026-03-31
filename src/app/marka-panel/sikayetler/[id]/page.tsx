'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import {
  ArrowLeft, Send, Upload, CheckCircle,
  Brain, FileText, X, Loader2, Clock,
  AlertTriangle, User, ShieldCheck,
} from 'lucide-react';
import type { Complaint, ComplaintResponse, ComplaintDocument } from '@/types';

// ── types ─────────────────────────────────────────────────────────────────────
type FullComplaint = Complaint & { user: { full_name: string; email: string } };
type ResponseRow   = ComplaintResponse & { user: { full_name: string } };

// ── status config ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; cls: string }> = {
  pending:           { label: 'Beklemede',          cls: 'bg-gray-100 text-gray-600' },
  in_review:         { label: 'İnceleniyor',         cls: 'bg-blue-50 text-blue-600' },
  brand_responded:   { label: 'Yanıtlandı',          cls: 'bg-indigo-50 text-indigo-600' },
  awaiting_customer: { label: 'Müşteri Bekleniyor',  cls: 'bg-amber-50 text-amber-600' },
  resolved:          { label: 'Çözüldü',             cls: 'bg-green-50 text-green-600' },
  closed:            { label: 'Kapatıldı',           cls: 'bg-gray-100 text-gray-500' },
  escalated:         { label: 'Yükseltildi',         cls: 'bg-gray-100 text-gray-600' },
};

// ── AI result badge ───────────────────────────────────────────────────────────
function AiResultBadge({ sonuc }: { sonuc: string }) {
  if (sonuc === 'onaylandi')  return <span className="text-xs font-semibold text-[#52b37f] bg-[#f0faf5] border border-[#52b37f]/20 px-2.5 py-1 rounded-full">Onaylandı</span>;
  if (sonuc === 'reddedildi') return <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">Reddedildi</span>;
  return <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">Belirsiz</span>;
}

// ── main page ─────────────────────────────────────────────────────────────────
export default function ComplaintDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [complaint,  setComplaint]  = useState<FullComplaint | null>(null);
  const [responses,  setResponses]  = useState<ResponseRow[]>([]);
  const [documents,  setDocuments]  = useState<ComplaintDocument[]>([]);
  const [reply,      setReply]      = useState('');
  const [sending,    setSending]    = useState(false);
  const [files,      setFiles]      = useState<File[]>([]);
  const [resolving,  setResolving]  = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => { loadAll(); }, [id]);

  async function loadAll() {
    const { data: c } = await supabase
      .from('complaints')
      .select('*, user:users(full_name, email)')
      .eq('id', id)
      .single();
    if (c) setComplaint(c as FullComplaint);

    const { data: r } = await supabase
      .from('complaint_responses')
      .select('*, user:users(full_name)')
      .eq('complaint_id', id)
      .order('created_at', { ascending: true });
    setResponses((r as ResponseRow[]) || []);

    const { data: d } = await supabase
      .from('complaint_documents')
      .select('*')
      .eq('complaint_id', id);
    setDocuments((d as ComplaintDocument[]) || []);

    setTimeout(() => threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' }), 100);
  }

  async function sendMessage() {
    if (!reply.trim()) return;
    setSending(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSending(false); return; }
    await supabase.from('complaint_responses').insert({ complaint_id: id, user_id: user.id, response_type: 'brand_response', message: reply });
    if (complaint?.status === 'pending') {
      await supabase.from('complaints').update({ status: 'in_review' }).eq('id', id);
    }
    setReply('');
    setSending(false);
    loadAll();
  }

  async function resolveWithDocuments() {
    if (files.length === 0) return;
    setResolving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setResolving(false); return; }

    for (const file of files) {
      const path = `complaints/${id}/${Date.now()}-${file.name}`;
      const { data: up } = await supabase.storage.from('documents').upload(path, file);
      if (up) {
        const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(path);
        await supabase.from('complaint_documents').insert({
          complaint_id: id, uploaded_by: user.id,
          file_url: publicUrl, file_name: file.name,
          file_type: file.type, document_type: 'refund_proof',
        });
      }
    }
    if (reply.trim()) {
      await supabase.from('complaint_responses').insert({ complaint_id: id, user_id: user.id, response_type: 'brand_response', message: reply });
    }
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ complaintId: id, action: 'analyze-documents' }) });
      if (!res.ok) await supabase.from('complaints').update({ status: 'brand_responded' }).eq('id', id);
    } catch {
      await supabase.from('complaints').update({ status: 'brand_responded' }).eq('id', id);
    }
    setReply(''); setFiles([]); setResolving(false); loadAll();
  }

  // ── loading skeleton ────────────────────────────────────────────────────────
  if (!complaint) {
    return (
      <div className="w-full max-w-4xl animate-pulse space-y-4">
        <div className="h-4 w-32 bg-gray-100 rounded-full" />
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <div className="h-6 w-2/3 bg-gray-100 rounded-full" />
          <div className="h-4 w-full bg-gray-100 rounded-full" />
          <div className="h-4 w-4/5 bg-gray-100 rounded-full" />
        </div>
      </div>
    );
  }

  const isResolved  = ['resolved', 'closed'].includes(complaint.status);
  const badge       = STATUS_CFG[complaint.status] ?? { label: complaint.status, cls: 'bg-gray-100 text-gray-500' };
  const dateStr     = new Date(complaint.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="w-full max-w-4xl space-y-5">

      {/* ── Back link ── */}
      <Link href="/marka-panel/sikayetler" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1b1a1b] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Şikayetlere dön
      </Link>

      {/* ── Two-column on large screens, stacked on mobile ── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* ── Left: main content ── */}
        <div className="flex-1 min-w-0 space-y-4 w-full">

          {/* Header card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            {/* Badges + date */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                <span className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-full">{COMPLAINT_CATEGORY_LABELS[complaint.category]}</span>
                <span className="text-xs font-mono text-gray-400 break-all">{complaint.complaint_number}</span>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{dateStr}</span>
            </div>

            {/* Title */}
            <h1 className="text-base sm:text-lg font-bold text-[#1b1a1b] mb-3">{complaint.title}</h1>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-[#1b1a1b] leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl mb-3">
              <div className="w-9 h-9 rounded-full bg-[#3c57bc]/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#3c57bc]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1b1a1b] truncate">{complaint.user?.full_name}</p>
                <p className="text-xs text-gray-400 truncate">{complaint.user?.email}</p>
              </div>
            </div>

            {/* Extra fields */}
            {complaint.order_number && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl mb-2 text-sm">
                <span className="text-gray-400 text-xs">Sipariş No</span>
                <span className="font-mono font-semibold text-[#1b1a1b] ml-auto break-all">{complaint.order_number}</span>
              </div>
            )}
            {complaint.desired_resolution && (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">Müşterinin Beklentisi</p>
                <p className="text-[#1b1a1b]">{complaint.desired_resolution}</p>
              </div>
            )}
          </div>

          {/* Status banners */}
          {complaint.status === 'awaiting_customer' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0faf5] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#52b37f]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Müşteri onayı bekleniyor</p>
                <p className="text-sm text-gray-500 leading-relaxed">Belgeler AI tarafından doğrulandı. 48 saat içinde yanıt gelmezse şikayet otomatik olarak çözüldü sayılır.</p>
              </div>
            </div>
          )}

          {complaint.status === 'escalated' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Müşteri itiraz etti</p>
                <p className="text-sm text-gray-500 leading-relaxed">Müşteri çözümü kabul etmedi. Yeni bir yanıt gönderin veya ek belge yükleyin.</p>
              </div>
            </div>
          )}

          {complaint.status === 'resolved' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0faf5] flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-[#52b37f]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Çözüldü</p>
                <p className="text-sm text-gray-500">Müşteri çözümü onayladı. Şikayet kapatıldı.</p>
              </div>
            </div>
          )}

          {/* Conversation thread */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
              <p className="text-sm font-bold text-[#1b1a1b]">Görüşme</p>
            </div>

            {/* Messages */}
            <div ref={threadRef} className="px-4 sm:px-6 py-4 space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
              {responses.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Henüz mesaj yok. Müşteriye yanıt verin veya belge yükleyin.
                </p>
              ) : (
                responses.map(r => {
                  const isBrand  = r.response_type === 'brand_response';
                  const isSystem = r.response_type === 'system_note';
                  return (
                    <div
                      key={r.id}
                      className={`flex ${isBrand ? 'justify-end' : isSystem ? 'justify-center' : 'justify-start'}`}
                    >
                      {isSystem ? (
                        <div className="max-w-xs sm:max-w-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-500 text-center">
                          <span className="font-semibold text-gray-600">Sistem</span> · {r.message}
                        </div>
                      ) : (
                        <div className={`max-w-[85%] sm:max-w-md space-y-1 ${isBrand ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div className="flex items-center gap-2 px-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {isBrand ? 'Siz' : r.user?.full_name ?? 'Müşteri'}
                            </span>
                            <span className="text-xs text-gray-300">{formatRelativeTime(r.created_at)}</span>
                          </div>
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                              isBrand
                                ? 'bg-[#3c57bc] text-white rounded-tr-sm'
                                : 'bg-gray-100 text-[#1b1a1b] rounded-tl-sm'
                            }`}
                          >
                            {r.message}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Reply input */}
            {!isResolved && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) sendMessage(); }}
                    placeholder="Müşteriye mesaj yazın..."
                    rows={2}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#3c57bc] transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={sending || !reply.trim()}
                    className="sm:shrink-0 px-5 py-3 sm:py-0 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                    style={{ background: reply.trim() ? '#3c57bc' : '#e5e7eb', color: reply.trim() ? '#fff' : '#9ca3af' }}
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>Gönder</span>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Cmd+Enter ile gönder</p>
              </div>
            )}
          </div>

          {/* Documents + AI */}
          {documents.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-bold text-[#1b1a1b]">Yüklenen Belgeler</p>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                {documents.map(doc => {
                  const ai = doc.ai_analysis as Record<string, unknown> | null;
                  return (
                    <div key={doc.id} className="border border-gray-200 rounded-xl p-4">
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-[#1b1a1b] hover:text-[#3c57bc] transition-colors">
                        <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="truncate">{doc.file_name}</span>
                      </a>
                      {ai && (
                        <div className="mt-3 bg-gray-50 rounded-xl p-3 sm:p-4 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Brain className="w-4 h-4 text-[#3c57bc] shrink-0" />
                            <span className="text-xs font-bold text-[#1b1a1b]">AI Analizi</span>
                            <AiResultBadge sonuc={String(ai.sonuc ?? '')} />
                            <span className="text-xs text-gray-400 ml-auto">
                              Güvenilirlik: <span className="font-semibold text-[#1b1a1b]">{String(ai.guvenilirlik_puani ?? '—')}/10</span>
                            </span>
                          </div>
                          {ai.ozet_yorum ? (
                            <p className="text-sm text-gray-600 leading-relaxed">{String(ai.ozet_yorum)}</p>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: resolve panel ── */}
        {!isResolved && (
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden lg:sticky lg:top-8">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-bold text-[#1b1a1b]">Çözüme Gönder</p>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Kanıt belgesini (iade dekontu, kargo belgesi vb.) yükleyin. AI otomatik analiz edecek ve müşteriye bildirim gidecek.
                </p>

                {/* Drop zone */}
                <label className="block border-2 border-dashed border-gray-200 rounded-xl p-4 sm:p-5 text-center cursor-pointer hover:border-[#3c57bc]/40 transition-colors">
                  <Upload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Dosya seç veya sürükle</p>
                  <p className="text-xs text-gray-300 mt-0.5">PDF, görsel</p>
                  <input type="file" multiple accept="image/*,.pdf" className="hidden"
                    onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
                </label>

                {/* File list */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs">
                        <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate flex-1 text-[#1b1a1b]">{f.name}</span>
                        <span className="text-gray-400 shrink-0">{(f.size / 1024).toFixed(0)}KB</span>
                        <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-gray-400 hover:text-gray-600">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional note */}
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Ek açıklama (isteğe bağlı)"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#3c57bc] transition-colors"
                />

                {/* Submit */}
                <button
                  onClick={resolveWithDocuments}
                  disabled={files.length === 0 || resolving}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                  style={{ background: files.length > 0 ? '#3c57bc' : '#e5e7eb', color: files.length > 0 ? '#fff' : '#9ca3af' }}
                >
                  {resolving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> AI analiz ediyor...</>
                  ) : (
                    <><CheckCircle className="w-4 h-4" /> Çözüme Gönder</>
                  )}
                </button>
                {files.length === 0 && (
                  <p className="text-xs text-center text-gray-400">En az 1 belge yüklenmelidir.</p>
                )}

                {complaint.status === 'pending' && (
                  <div className="flex items-start gap-2 text-xs text-gray-400 pt-1">
                    <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Mesaj göndermek şikayeti "İnceleniyor" durumuna alır.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
