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
import { ArrowLeft, Send, Upload, CheckCircle, XCircle, Brain, FileText, User, X, AlertTriangle, Loader2, Clock } from 'lucide-react';
import type { Complaint, ComplaintResponse, ComplaintDocument } from '@/types';

export default function BrandComplaintDetailPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState<Complaint & { user: { full_name: string; email: string } } | null>(null);
  const [responses, setResponses] = useState<(ComplaintResponse & { user: { full_name: string } })[]>([]);
  const [documents, setDocuments] = useState<ComplaintDocument[]>([]);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [resolving, setResolving] = useState(false);
  const supabase = createClient();

  useEffect(() => { load(); }, [id]);

  async function load() {
    const { data: c } = await supabase.from('complaints').select('*, user:users(full_name, email)').eq('id', id).single();
    if (c) setComplaint(c as typeof complaint);

    const { data: r } = await supabase.from('complaint_responses').select('*, user:users(full_name)').eq('complaint_id', id).order('created_at', { ascending: true });
    setResponses((r as typeof responses) || []);

    const { data: d } = await supabase.from('complaint_documents').select('*').eq('complaint_id', id);
    setDocuments((d as ComplaintDocument[]) || []);
  }

  // Step 1: Brand sends a message (optional - like "talebinizi aldık")
  async function sendMessage() {
    if (!reply.trim()) return;
    setSending(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('complaint_responses').insert({
      complaint_id: id,
      user_id: user.id,
      response_type: 'brand_response',
      message: reply,
    });

    // Update status to in_review if still pending
    if (complaint?.status === 'pending') {
      await supabase.from('complaints').update({ status: 'in_review' }).eq('id', id);
    }

    setReply('');
    setSending(false);
    load();
  }

  // Step 2: Brand uploads documents + marks as resolved → triggers AI analysis automatically
  async function resolveWithDocuments() {
    if (files.length === 0) return;
    setResolving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Upload all files
    const uploadedDocs = [];
    for (const file of files) {
      const filePath = `complaints/${id}/${Date.now()}-${file.name}`;
      const { data: uploadData } = await supabase.storage.from('documents').upload(filePath, file);
      if (uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);
        const { data: docRecord } = await supabase.from('complaint_documents').insert({
          complaint_id: id as string,
          uploaded_by: user.id,
          file_url: publicUrl,
          file_name: file.name,
          file_type: file.type,
          document_type: 'refund_proof',
        }).select().single();
        if (docRecord) uploadedDocs.push(docRecord);
      }
    }

    // 2. Add brand response if there's a message
    if (reply.trim()) {
      await supabase.from('complaint_responses').insert({
        complaint_id: id,
        user_id: user.id,
        response_type: 'brand_response',
        message: reply,
      });
    }

    // 3. Trigger AI analysis automatically
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintId: id, action: 'analyze-documents' }),
      });

      if (!res.ok) {
        console.error('AI analysis failed:', await res.text());
        // Even if AI fails, still update status
        await supabase.from('complaints').update({ status: 'brand_responded' }).eq('id', id);
      }
    } catch (e) {
      console.error('AI analysis error:', e);
      await supabase.from('complaints').update({ status: 'brand_responded' }).eq('id', id);
    }

    setReply('');
    setFiles([]);
    setResolving(false);
    load();
  }

  if (!complaint) return <div className="animate-pulse"><div className="h-64 bg-gray-100 rounded-xl" /></div>;

  const isResolved = ['resolved', 'closed'].includes(complaint.status);
  const hasDocuments = documents.length > 0;
  const aiAnalysis = documents.find(d => d.ai_analysis)?.ai_analysis as Record<string, unknown> | undefined;

  return (
    <div className="max-w-3xl">
      <Link href="/marka-panel/sikayetler" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
        <ArrowLeft className="h-4 w-4" /> Şikayetlere Dön
      </Link>

      {/* Complaint Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm text-gray-400 font-mono">{complaint.complaint_number}</span>
            <Badge className={COMPLAINT_STATUS_COLORS[complaint.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[complaint.status]}</Badge>
            <Badge variant="outline">{COMPLAINT_CATEGORY_LABELS[complaint.category]}</Badge>
          </div>
          <h1 className="text-xl font-bold text-[#1B1F3B] mb-2">{complaint.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{formatDate(complaint.created_at)}</p>

          <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-center gap-3">
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">{complaint.user?.full_name}</p>
              <p className="text-xs text-gray-500">{complaint.user?.email}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{complaint.description}</p>
          </div>

          {complaint.order_number && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Sipariş No: <span className="font-mono font-medium text-gray-800">{complaint.order_number}</span></p>
            </div>
          )}

          {complaint.desired_resolution && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-xs font-medium text-yellow-800">Müşterinin Beklentisi:</p>
              <p className="text-sm text-yellow-700">{complaint.desired_resolution}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Info Banner */}
      {complaint.status === 'awaiting_customer' && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Müşteri Onayı Bekleniyor</p>
              <p className="text-sm text-green-600">Belgeler AI tarafından doğrulandı. Müşterinin onayı bekleniyor. 48 saat içinde yanıt gelmezse şikayet otomatik çözüldü olarak kapatılacak.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {complaint.status === 'escalated' && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Müşteri İtiraz Etti</p>
              <p className="text-sm text-red-600">Müşteri çözümü kabul etmedi. Lütfen yeni bir yanıt verin veya ek belge yükleyin.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {complaint.status === 'resolved' && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Şikayet Çözüldü ✅</p>
              <p className="text-sm text-green-600">Müşteri çözümü onayladı.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversation Thread */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Görüşme Geçmişi</CardTitle></CardHeader>
        <CardContent>
          {responses.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Henüz yanıt yok. Müşteriye yanıt verin veya çözüm belgesi yükleyin.</p>
          ) : (
            <div className="space-y-4">
              {responses.map((r) => (
                <div key={r.id} className={`p-4 rounded-lg ${
                  r.response_type === 'brand_response' ? 'bg-purple-50 border border-purple-100 ml-8' :
                  r.response_type === 'customer_reply' ? 'bg-blue-50 border border-blue-100 mr-8' :
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
                      {r.response_type === 'brand_response' ? '🏢 Siz' :
                       r.response_type === 'customer_reply' ? '👤 Müşteri' :
                       r.response_type === 'system_note' ? '🤖 Sistem' : 'Not'}
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

      {/* Documents & AI Analysis */}
      {hasDocuments && (
        <Card className="mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Yüklenen Belgeler</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-gray-50 rounded-lg border">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:underline text-[#1B1F3B]">
                    <FileText className="h-4 w-4" /> {doc.file_name}
                  </a>

                  {doc.ai_analysis && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                        <Brain className="h-4 w-4" /> AI Analiz Sonucu
                      </p>
                      <p className="text-sm text-blue-700 mb-2">
                        {(doc.ai_analysis as Record<string, unknown>).ozet_yorum as string || ''}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`font-medium ${
                          (doc.ai_analysis as Record<string, unknown>).sonuc === 'onaylandi' ? 'text-green-600' :
                          (doc.ai_analysis as Record<string, unknown>).sonuc === 'reddedildi' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {(doc.ai_analysis as Record<string, unknown>).sonuc === 'onaylandi' ? '✅ Onaylandı' :
                           (doc.ai_analysis as Record<string, unknown>).sonuc === 'reddedildi' ? '❌ Reddedildi' : '⚠️ Belirsiz'}
                        </span>
                        <span className="text-gray-500">
                          Güvenilirlik: {(doc.ai_analysis as Record<string, unknown>).guvenilirlik_puani as number}/10
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Area - Only show if not resolved */}
      {!isResolved && (
        <>
          {/* Quick Message */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-sm">💬 Mesaj Gönder</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Müşteriye mesaj yazın... (ör: Talebinizi aldık, 2 gün içinde çözüme kavuşturacağız.)"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={3}
              />
              <Button variant="outline" onClick={sendMessage} disabled={sending || !reply.trim()}>
                <Send className="h-4 w-4" /> {sending ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </Button>
            </CardContent>
          </Card>

          {/* Resolve with Documents */}
          <Card className="mb-6 border-green-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" /> Şikayeti Çöz & Belge Yükle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Şikayeti çözdükten sonra kanıt belgelerini (iade dekontu, kargo takip belgesi vb.) yükleyip &quot;Çözüldüye Gönder&quot; butonuna basın.
                AI otomatik olarak belgeleri inceleyecek ve müşteriye bildirim gidecektir.
              </p>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-green-200 rounded-lg p-6 text-center hover:border-green-400 transition-colors bg-green-50/50">
                <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">İade dekontu, fatura veya kanıt belgesi</p>
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    <Upload className="h-4 w-4" /> Dosya Seç
                  </span>
                  <input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={(e) => setFiles([...files, ...Array.from(e.target.files || [])])} />
                </label>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2 border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="truncate">{f.name}</span>
                        <span className="text-xs text-gray-400">({(f.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional message with resolve */}
              <Textarea
                placeholder="Ek açıklama (opsiyonel) - ör: İade işlemi gerçekleştirilmiştir, 3-5 iş günü içinde hesabınıza yansıyacaktır."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={2}
                className="bg-white"
              />

              {/* Resolve Button */}
              <Button
                onClick={resolveWithDocuments}
                disabled={files.length === 0 || resolving}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                {resolving ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Belgeler yükleniyor ve AI analiz ediyor...</>
                ) : (
                  <><CheckCircle className="h-5 w-5" /> Çözüldüye Gönder ({files.length} belge)</>
                )}
              </Button>

              {files.length === 0 && (
                <p className="text-xs text-center text-gray-400">Çözüldüye göndermek için en az 1 belge yüklemeniz gerekiyor.</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
