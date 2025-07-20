import type { Review } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Progress } from '../ui/progress';

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const StarRating = ({ rating, size = 'md' }: { rating: number, size?: 'sm' | 'md' }) => {
  const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.round(rating) ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
};

export function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return {
      star,
      count,
      percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
    };
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <div className="mt-4 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
              <p className="text-5xl font-bold">{averageRating.toFixed(1)}</p>
              <StarRating rating={averageRating} />
              <p className="text-muted-foreground mt-2">based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
            </div>
            <div className="md:col-span-2 space-y-2">
                {ratingDistribution.map(item => (
                  <div key={item.star} className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{item.star} star</span>
                    <Progress value={item.percentage} className="w-full h-2" />
                    <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
                  </div>
                ))}
            </div>
        </div>
      ) : null}

      <div className="space-y-8 mt-12">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <Avatar>
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8 bg-muted/50 rounded-lg">
              <p>There are no reviews for this product yet.</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
    </div>
  );
}
