import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { Star, Clock, CheckCircle, MessageSquare, PenSquare, Globe, ShieldCheck } from 'lucide-react';
import type { Brand, Complaint, Review } from '@/types';

export default async function BrandProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase.from('brands').select('*').eq('slug', slug).single();
  if (!brand) notFound();

  const { data: complaints } = await supabase
    .from('complaints')
    .select('*')
    .eq('brand_id', brand.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20);

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, user:users(full_name)')
    .eq('brand_id', brand.id)
    .order('created_at', { ascending: false })
    .limit(20);

  const b = brand as Brand;
  const resolutionRate = b.total_complaints > 0 ? Math.round((b.resolved_complaints / b.total_complaints) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Brand Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex items-center gap-6 flex-1">
            <div className="w-20 h-20 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold text-3xl shrink-0">
              {b.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#1B1F3B]">{b.name}</h1>
                {b.is_verified && <ShieldCheck className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{b.category}</Badge>
                {b.website && (
                  <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Web sitesi
                  </a>
                )}
              </div>
              {b.description && <p className="text-sm text-gray-500">{b.description}</p>}
            </div>
          </div>
          <SuperscoreBadge score={b.superscore} size="lg" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <MessageSquare className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-[#1B1F3B]">{b.total_complaints}</div>
            <div className="text-xs text-gray-500">Toplam Şikayet</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-600">{resolutionRate}%</div>
            <div className="text-xs text-gray-500">Çözüm Oranı</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Clock className="h-5 w-5 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-[#1B1F3B]">{b.avg_response_time_hours ? `${Math.round(b.avg_response_time_hours)}s` : '-'}</div>
            <div className="text-xs text-gray-500">Ort. Yanıt Süresi</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-[#1B1F3B]">{b.avg_rating || '-'}</div>
            <div className="text-xs text-gray-500">Ortalama Puan</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Link href={`/panel/sikayet-yaz?brand=${slug}`}>
          <Button><PenSquare className="h-4 w-4" /> Bu Marka Hakkında Şikayet Yaz</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Complaints */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Şikayetler</h2>
          {(complaints as Complaint[])?.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-gray-500">Henüz şikayet yok</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {(complaints as Complaint[])?.map((c) => (
                <Link key={c.id} href={`/sikayetler/${c.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                        <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">
                          {COMPLAINT_STATUS_LABELS[c.status]}
                        </Badge>
                      </div>
                      <h3 className="font-medium">{c.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatRelativeTime(c.created_at)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>
          {(reviews as (Review & { user: { full_name: string } })[])?.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-gray-500">Henüz yorum yok</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {(reviews as (Review & { user: { full_name: string } })[])?.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    {r.title && <h4 className="font-medium text-sm">{r.title}</h4>}
                    <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{r.user?.full_name} &middot; {formatRelativeTime(r.created_at)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
