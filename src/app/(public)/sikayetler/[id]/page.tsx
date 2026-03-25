import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS, COMPLAINT_CATEGORY_LABELS } from '@/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, FileText, User, Building2, Calendar } from 'lucide-react';
import type { Complaint, ComplaintResponse, ComplaintDocument } from '@/types';

export default async function ComplaintDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: complaint } = await supabase
    .from('complaints')
    .select('*, brand:brands(name, slug, superscore), user:users(full_name)')
    .eq('id', id)
    .eq('is_public', true)
    .single();

  if (!complaint) notFound();

  const { data: responses } = await supabase
    .from('complaint_responses')
    .select('*, user:users(full_name)')
    .eq('complaint_id', id)
    .order('created_at', { ascending: true });

  const { data: documents } = await supabase
    .from('complaint_documents')
    .select('*')
    .eq('complaint_id', id);

  const c = complaint as Complaint & { brand: { name: string; slug: string; superscore: number }; user: { full_name: string } };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/sikayetler" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1B1F3B] mb-6">
        <ArrowLeft className="h-4 w-4" /> Şikayetlere Dön
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-sm text-gray-400 font-mono">{c.complaint_number}</span>
          <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
            {COMPLAINT_STATUS_LABELS[c.status]}
          </Badge>
          <Badge variant="outline">{COMPLAINT_CATEGORY_LABELS[c.category]}</Badge>
        </div>
        <h1 className="text-2xl font-bold text-[#1B1F3B] mb-4">{c.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><User className="h-4 w-4" /> {c.user?.full_name}</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(c.created_at)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader><CardTitle>Şikayet Detayı</CardTitle></CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{c.description}</p>
              {c.desired_resolution && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Beklenen Çözüm:</p>
                  <p className="text-sm text-blue-700">{c.desired_resolution}</p>
                </div>
              )}
              {c.order_number && (
                <p className="mt-3 text-sm text-gray-500">Sipariş No: <span className="font-mono">{c.order_number}</span></p>
              )}
            </CardContent>
          </Card>

          {/* Responses */}
          <Card>
            <CardHeader><CardTitle>Yanıtlar</CardTitle></CardHeader>
            <CardContent>
              {(responses as (ComplaintResponse & { user: { full_name: string } })[])?.length === 0 ? (
                <p className="text-gray-500 text-sm">Henüz yanıt yok</p>
              ) : (
                <div className="space-y-4">
                  {(responses as (ComplaintResponse & { user: { full_name: string } })[])?.map((r) => (
                    <div key={r.id} className={`p-4 rounded-lg ${
                      r.response_type === 'brand_response' ? 'bg-purple-50 border border-purple-100' :
                      r.response_type === 'customer_reply' ? 'bg-blue-50 border border-blue-100' :
                      'bg-gray-50 border border-gray-100'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          {r.response_type === 'brand_response' ? '🏢 Marka' : r.response_type === 'customer_reply' ? '👤 Müşteri' : '⚙️ Sistem'}
                        </span>
                        <span className="text-xs text-gray-400">{r.user?.full_name}</span>
                        <span className="text-xs text-gray-400">&middot; {formatRelativeTime(r.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{r.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Brand Card */}
          <Link href={`/markalar/${c.brand?.slug}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold">
                    {c.brand?.name.charAt(0)}
                  </div>
                  <div>
                    <Building2 className="h-3 w-3 text-gray-400 inline" />
                    <span className="font-medium ml-1">{c.brand?.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Documents */}
          {(documents as ComplaintDocument[])?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Belgeler</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(documents as ComplaintDocument[]).map((doc) => (
                    <a key={doc.id} href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-sm">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{doc.file_name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
