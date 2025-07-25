import type { BlogComment } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CommentSectionProps {
  comments: BlogComment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold font-headline">Comments ({comments.length})</CardTitle>
        {comments.length === 0 && (
           <CardDescription>No comments yet. Be the first to share your thoughts!</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <div className="space-y-8">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{comment.author}</p>
                        <p className="text-sm text-muted-foreground">{new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>There are no comments for this post yet.</p>
              </div>
            )}
          </div>
      </CardContent>
    </Card>
  );
}
