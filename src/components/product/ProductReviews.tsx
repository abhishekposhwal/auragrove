import type { Review } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
        />
      ))}
    </div>
  );
};

export function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">Customer Reviews</CardTitle>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-2 pt-2">
              <StarRating rating={averageRating} />
              <p className="text-muted-foreground">{averageRating.toFixed(1)} out of 5 stars</p>
            </div>
          ) : (
             <CardDescription>No reviews yet. Be the first to share your thoughts!</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {reviews.map((review) => (
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
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
