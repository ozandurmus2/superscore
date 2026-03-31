import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StarRating } from '@/components/ui/star-rating';
import { Star, Eye, ThumbsUp, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default async function UserProfilePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam || '1', 10);
  const perPage = 10;

  const supabase = await createClient();

  // Get user profile
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (!user) return notFound();

  // Get user's reviews with brand info
  const { data: reviews, count: totalReviews } = await supabase
    .from('reviews')
    .select('*, brand:brands(name, slug)', { count: 'exact' })
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * perPage, currentPage * perPage - 1);

  // Get user's complaints count
  const { count: totalComplaints } = await supabase
    .from('complaints')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id);

  const reviewCount = totalReviews || 0;
  const totalPages = Math.ceil(reviewCount / perPage);

  // Get initials
  const initials = (user.full_name || 'U').charAt(0).toUpperCase();

  // Join date
  const joinDate = new Date(user.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen bg-[#f9f8f5]">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Avatar + Name */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#52b37f] flex items-center justify-center text-white text-2xl md:text-3xl font-bold flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b]">{String(user.full_name || '')}</h1>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Türkiye</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {joinDate}</span>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="flex items-center gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-superscore-bold text-[#1b1a1b]">{reviewCount}</p>
                <div className="flex items-center gap-1 text-sm text-[#3c57bc]">
                  <Star className="h-3.5 w-3.5" />
                  <span className="underline">Yorum</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-superscore-bold text-[#1b1a1b]">0</p>
                <div className="flex items-center gap-1 text-sm text-[#3c57bc]">
                  <Eye className="h-3.5 w-3.5" />
                  <span className="underline">Okunan</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-superscore-bold text-[#1b1a1b]">0</p>
                <div className="flex items-center gap-1 text-sm text-[#3c57bc]">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="underline">Faydalı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Complaints Section */}
          {(totalComplaints || 0) > 0 && (
            <div className="mb-8">
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-4">Şikayetler</h2>
              <p className="text-sm text-gray-500">{totalComplaints} şikayet yazılmış</p>
            </div>
          )}

          {/* Reviews List */}
          {reviewCount > 0 ? (
            <>
              <h2 className="font-superscore-bold text-xl text-[#1b1a1b] mb-6">Yorumlar ({reviewCount})</h2>
              <div className="space-y-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(reviews || []).map((review: any) => {
                  const brand = review.brand as { name: string; slug: string } | null;
                  const reviewDate = new Date(review.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

                  return (
                    <div key={review.id as string}>
                      {/* Brand name above card */}
                      {brand && (
                        <p className="text-sm text-gray-500 mb-2">
                          Yorum:{' '}
                          <Link href={`/markalar/${brand.slug}`} className="text-[#3c57bc] hover:underline font-medium">
                            {brand.name}
                          </Link>
                        </p>
                      )}

                      {/* Card */}
                      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        {/* User info section */}
                        <div className="px-5 py-4 flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-[#52b37f] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <Link href={`/users/${id}`} className="font-semibold text-sm text-[#1b1a1b] hover:underline">{String(user.full_name || '')}</Link>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{String(reviewCount)} yorum</span>
                              <span className="flex items-center gap-0.5">
                                <MapPin className="h-3 w-3" /> TR
                              </span>
                            </div>
                          </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Content section */}
                        <div className="px-5 py-4">
                          {/* Rating + Date */}
                          <div className="flex items-center justify-between mb-3">
                            <StarRating rating={review.rating as number} size="sm" />
                            <span className="text-sm text-gray-400">{reviewDate}</span>
                          </div>

                          {/* Title + Comment */}
                          {review.title && (
                            <h3 className="font-semibold text-[#1b1a1b] mb-1">{String(review.title)}</h3>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed">{String(review.comment || '')}</p>

                          {/* Tags */}
                          {review.is_verified_purchase && (
                            <div className="mt-3">
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Doğrulanmış Satın Alma</span>
                            </div>
                          )}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Actions */}
                        <div className="px-5 py-3 flex items-center justify-between text-sm text-gray-400">
                          <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" /> Faydalı
                          </button>
                          <button className="hover:text-gray-600 transition-colors">Paylaş</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                    {currentPage > 1 ? (
                      <Link href={`/users/${id}?page=${currentPage - 1}`} className="px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 border-r border-gray-200 flex items-center gap-1">
                        <ChevronLeft className="h-4 w-4" /> Önceki
                      </Link>
                    ) : (
                      <span className="px-4 py-3 text-sm text-gray-300 border-r border-gray-200 flex items-center gap-1">
                        <ChevronLeft className="h-4 w-4" /> Önceki
                      </span>
                    )}

                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <Link
                          key={pageNum}
                          href={`/users/${id}?page=${pageNum}`}
                          className={`px-4 py-3 text-sm font-medium border-r border-gray-200 ${isActive ? 'bg-[#e8eaf6] text-[#3c57bc]' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}

                    {currentPage < totalPages ? (
                      <Link href={`/users/${id}?page=${currentPage + 1}`} className="px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-1">
                        Sonraki <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="px-4 py-3 text-sm text-gray-300 flex items-center gap-1">
                        Sonraki <ChevronRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-lg text-[#1b1a1b] mb-1">Henüz yorum yok</h3>
              <p className="text-sm text-gray-500 mb-4">Bu kullanıcı henüz bir değerlendirme yapmamış.</p>
              <Link href="/sikayet-yaz">
                <button className="px-5 py-2.5 bg-[#1b1a1b] text-white text-sm font-medium rounded-full hover:bg-[#333] transition-colors">
                  İlk yorumu yaz
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
