'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS, COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, Send, Star, CheckCircle, XCircle, FileText, Building2, Brain, Clock, AlertTriangle, Shield } from 'lucide-react';
import type { Complaint, ComplaintResponse, ComplaintDocument } from '@/types';

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState<Complaint & { brand: { name: string; slug: string }; user: { full_name: string } } | null>(null);
  const [responses, setResponses] = useState<(ComplaintResponse & { user: { full_name: string } })[]>([]);
  const [documents, setDocuments] = useState<ComplaintDocument[]>([]);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const supabase = createClient();

  useEffect(() => { load(); }, [id]);

  async function load() {
    const { data: c } = await supabase
      .from('complaints')
      .select('*, brand:brands(name, slug), user:users(full_name)')
      .eq('id', id)
      .single();
    if (c) setComplaint(c as typeof complaint);

    const { data: r } = await supabase
      .from('complaint_responses')
      .select('*, user:users(full_name)')
      .eq('complaint_id', id)
      .order('created_at', { ascending: true });
    setResponses((r as typeof responses) || []);

    const { data: d } = await supabase
      .from('complaint_documents')
      .select('*')
      .eq('complaint_id', id);
    setDocuments((d as ComplaintDocument[]) || []);
  }

  // Customer sends a reply
  async function sendReply() {
    if (!reply.trim()) return;
    setSending(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('complaint_responses').insert({
      complaint_id: id,
      user_id: user.id,
      response_type: 'customer_reply',
      message: reply,
    });
    setReply('');
    setSending(false);
    load();
  }

  // Customer confirms resolution
  async function confirmResolution() {
    await supabase.from('complaints').update({
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    }).eq('id', id);
    setShowReview(true);
    load();
  }

  // Customer disputes resolution
  async function disputeResolution() {
    if (!disputeReason.trim()) {
      setShowDisputeForm(true);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !complaint) return;

    // Add customer's dispute message
    await supabase.from('complaint_responses').insert({
      complaint_id: id,
      user_id: user.id,
      response_type: 'customer_reply',
      message: `❌ İtiraz: ${disputeReason}`,
    });

    await supabase.from('complaints').update({ status: 'escalated', updated_at: new Date().toISOString() }).eq('id', id);

    // Notify brand
    const { data: brandMembers } = await supabase
      .from('brand_members')
      .select('user_id')
      .eq('brand_id', complaint.brand_id);

    if (brandMembers) {
      for (const member of brandMembers) {
        await supabase.from('notifications').insert({
          user_id: member.user_id,
          type: 'new_complaint',
          title: 'Müşteri İtiraz Etti',
          message: `"${complaint.title}" şikayetinde müşteri çözümü kabul etmedi: "${disputeReason}"`,
          metadata: { complaint_id: id },
        });
      }
    }

    setShowDisputeForm(false);
    setDisputeReason('');
    load();
  }

  // Customer submits review
  async function submitReview() {
    if (rating === 0) return;
    setSubmittingReview(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !complaint) return;

    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_id: complaint.brand_id,
        complaint_id: complaint.id,
        rating,
        comment: reviewComment,
      }),
    });
    setShowReview(false);
    setSubmittingReview(false);
    load();
  }

  if (!complaint) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  const aiAnalysis = documents.find(d => d.ai_analysis)?.ai_analysis as Record<string, unknown> | undefined;

  return (
    <div className="max-w-3xl">
      <Link href="/panel/sikayetlerim" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
        <ArrowLeft className="h-4 w-4" /> Şikayetlerime Dön
      </Link>

      {/* Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm text-gray-400 font-mono">{complaint.complaint_number}</span>
            <Badge className={COMPLAINT_STATUS_COLORS[complaint.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[complaint.status]}</Badge>
            <Badge variant="outline">{COMPLAINT_CATEGORY_LABELS[complaint.category]}</Badge>
          </div>
          <h1 className="text-xl font-bold text-[#1B1F3B] mb-2">{complaint.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{formatDate(complaint.created_at)}</p>
          <Link href={`/markalar/${complaint.brand?.slug}`} className="inline-flex items-center gap-2 text-sm text-[#1B1F3B] hover:underline">
            <Building2 className="h-4 w-4" /> {complaint.brand?.name}
          </Link>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{complaint.description}</p>
          </div>
          {complaint.desired_resolution && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-800">Beklenen Çözüm:</p>
              <p className="text-sm text-blue-700">{complaint.desired_resolution}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Verified + Customer Confirmation */}
      {complaint.status === 'awaiting_customer' && aiAnalysis && (
        <Card className="mb-6 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-green-800 text-lg">Marka Şikayetiniz Hakkında Aksiyon Aldı</p>
                <p className="text-sm text-green-600 mt-1">Alınan aksiyon: <strong>{complaint.category === 'refund' ? 'İade' : 'Çözüm'}</strong></p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI Sistem Kontrolü</span>
              </div>
              <p className="text-sm text-gray-700">{aiAnalysis.ozet_yorum as string || 'Belgeler incelendi.'}</p>
              {aiAnalysis.sonuc === 'onaylandi' && (
                <p className="text-sm text-green-700 font-medium mt-2">✅ Sistemlerimizin kontrolü sonucu işlemin yapıldığı doğrulanmıştır.</p>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              İtirazınız varsa aşağıdan güncelleme verebilirsiniz. <strong>48 saat içinde</strong> yanıt vermezseniz şikayet otomatik olarak çözüldü olarak kapatılacaktır.
            </p>

            {!showDisputeForm ? (
              <div className="flex gap-3">
                <Button onClick={confirmResolution} className="bg-green-600 hover:bg-green-700 text-white flex-1">
                  <CheckCircle className="h-5 w-5" /> Evet, Şikayetim Çözüldü
                </Button>
                <Button variant="destructive" onClick={() => setShowDisputeForm(true)} className="flex-1">
                  <XCircle className="h-5 w-5" /> Hayır, Çözülmedi
                </Button>
              </div>
            ) : (
              <div className="space-y-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Neden çözülmedi? Lütfen açıklayın:</p>
                <Textarea
                  placeholder="Örn: İade tutarı hesabıma yansımadı, yanlış tutar iade edildi, hala bekliyorum..."
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  rows={3}
                  className="bg-white"
                />
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={disputeResolution} disabled={!disputeReason.trim()}>
                    <XCircle className="h-4 w-4" /> İtirazımı Gönder
                  </Button>
                  <Button variant="ghost" onClick={() => setShowDisputeForm(false)}>İptal</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Brand responded but AI not verified yet */}
      {complaint.status === 'brand_responded' && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Marka Yanıt Verdi</p>
              <p className="text-sm text-blue-600">Marka şikayetinize yanıt verdi. Yanıtları inceleyip geri dönüş yapabilirsiniz.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escalated */}
      {complaint.status === 'escalated' && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-800">İtirazınız İletildi</p>
              <p className="text-sm text-orange-600">Şikayetiniz yeniden incelenmek üzere markaya ve platform yöneticilerine iletildi.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resolved */}
      {complaint.status === 'resolved' && !showReview && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Şikayetiniz Çözüldü ✅</p>
              <p className="text-sm text-green-600">Şikayetiniz başarıyla çözüme kavuşturuldu.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Form - Shows after confirming resolution */}
      {showReview && (
        <Card className="mb-6 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardContent className="p-5">
            <p className="font-bold text-lg mb-1">🎉 Şikayetiniz Çözüldü!</p>
            <p className="text-sm text-gray-600 mb-4">Markayı değerlendirmeniz diğer müşterilere yardımcı olacaktır.</p>

            <div className="flex gap-2 mb-4 justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                  <Star className={`h-10 w-10 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} cursor-pointer`} />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-500 mb-3">
                {rating === 1 ? 'Çok Kötü' : rating === 2 ? 'Kötü' : rating === 3 ? 'Orta' : rating === 4 ? 'İyi' : 'Mükemmel'}
              </p>
            )}

            <Textarea placeholder="Deneyiminizi paylaşın... (opsiyonel)" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="mb-3 bg-white" rows={3} />
            <Button onClick={submitReview} disabled={rating === 0 || submittingReview} className="w-full">
              {submittingReview ? 'Gönderiliyor...' : `⭐ ${rating > 0 ? rating + ' Yıldız' : ''} Puanı Gönder`}
            </Button>
            <button onClick={() => setShowReview(false)} className="w-full text-center text-sm text-gray-400 mt-2 hover:text-gray-600">
              Puanlamayı Geç
            </button>
          </CardContent>
        </Card>
      )}

      {/* Conversation Thread */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Görüşme Geçmişi</CardTitle></CardHeader>
        <CardContent>
          {responses.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Henüz yanıt yok. Marka yanıt verdiğinde burada görünecek.</p>
          ) : (
            <div className="space-y-4">
              {responses.map((r) => (
                <div key={r.id} className={`p-4 rounded-lg ${
                  r.response_type === 'brand_response' ? 'bg-purple-50 border border-purple-100 mr-8' :
                  r.response_type === 'customer_reply' ? 'bg-blue-50 border border-blue-100 ml-8' :
                  r.response_type === 'system_note' ? 'bg-amber-50 border border-amber-100 mx-4' :
                  'bg-gray-50 border border-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      r.response_type === 'brand_response' ? 'bg-purple-100 text-purple-700' :
                      r.response_type === 'customer_reply' ? 'bg-blue-100 text-blue-700' :
                      r.response_type === 'system_note' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {r.response_type === 'brand_response' ? '🏢 Marka' :
                       r.response_type === 'customer_reply' ? '👤 Sen' :
                       r.response_type === 'system_note' ? '🤖 Superscore AI' : 'Not'}
                    </span>
                    <span className="text-xs text-gray-400">{formatRelativeTime(r.created_at)}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{r.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      {documents.length > 0 && (
        <Card className="mb-6">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Çözüm Belgeleri</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map((doc) => (
                <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 text-sm border">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="truncate font-medium">{doc.file_name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reply form */}
      {!['resolved', 'closed'].includes(complaint.status) && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Textarea placeholder="Yanıtınızı yazın..." value={reply} onChange={(e) => setReply(e.target.value)} className="flex-1" rows={3} />
              <Button onClick={sendReply} disabled={sending || !reply.trim()} className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
