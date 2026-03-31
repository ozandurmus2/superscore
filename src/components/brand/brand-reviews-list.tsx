'use client';

import { StarRating } from '@/components/ui/star-rating';
import { formatRelativeTime } from '@/lib/utils';
import { ThumbsUp, Share2, Flag, MessageCircle } from 'lucide-react';
import type { Review } from '@/types';

interface BrandReviewsListProps {
  reviews: (Review & { user: { full_name: string } })[];
  brandSlug: string;
}

export function BrandReviewsList({ reviews, brandSlug }: BrandReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        Henüz değerlendirme yok. İlk yorumu siz yazın!
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {reviews.slice(0, 6).map((review) => (
        <div key={review.id} className="border border-gray-200 rounded-2xl p-5 mb-4">
          {/* User info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#52b37f] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {review.user?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#1b1a1b]">{review.user?.full_name || 'Anonim'}</p>
              <p className="text-xs text-gray-400">{formatRelativeTime(review.created_at)}</p>
            </div>
          </div>

          {/* Stars */}
          <StarRating rating={review.rating} size="sm" className="mb-2" />

          {/* Content */}
          {review.title && (
            <h4 className="font-semibold text-sm text-[#1b1a1b] mb-1">{review.title}</h4>
          )}
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {review.comment.length > 300
              ? `${review.comment.substring(0, 300)}...`
              : review.comment
            }
            {review.comment.length > 300 && (
              <button className="text-[#3c57bc] hover:underline ml-1 text-xs font-medium">Daha fazla bilgi için bakınız.</button>
            )}
          </p>

          {/* Date tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              {new Date(review.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {review.is_verified_purchase && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Doğrulanmış</span>
            )}
          </div>

          {/* Brand responded indicator */}
          {review.complaint_id && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Şirket yanıt verdi</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1b1a1b] transition-colors">
              <ThumbsUp className="h-3.5 w-3.5" /> Kullanışlı
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1b1a1b] transition-colors">
              <Share2 className="h-3.5 w-3.5" /> Paylaşmak
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1b1a1b] transition-colors">
              <Flag className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
