import type { BlogComment } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentSectionProps {
  comments: BlogComment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      <div className="space-y-8 mt-8">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div>
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-sm text-muted-foreground">{new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8 bg-muted/50 rounded-lg">
              <p>There are no comments for this post yet.</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
    </div>
  );
}
