
"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { BlogPost, BlogComment } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/blog/CommentSection';
import { CommentForm } from '@/components/blog/CommentForm';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function BlogPostDetail({ post: initialPost }: { post: BlogPost }) {
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const handleAddComment = (newCommentData: Omit<BlogComment, 'id' | 'date' | 'author'>) => {
    if (!user || !user.displayName) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to comment." });
        return;
    }

    const newComment: BlogComment = {
        id: `c${Date.now()}`,
        author: user.displayName,
        date: new Date().toISOString(),
        ...newCommentData
    };
    
    // Create a deep copy to avoid direct mutation of the state
    const updatedPost = JSON.parse(JSON.stringify(post));
    if (!updatedPost.comments) {
        updatedPost.comments = [];
    }
    updatedPost.comments.unshift(newComment); // Add new comment to the beginning
    setPost(updatedPost);

    toast({
        title: "Comment Submitted!",
        description: "Thank you for sharing your thoughts.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      <article className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 not-prose">
            <Badge variant="outline">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{post.title}</h1>
            <p className="text-muted-foreground text-lg">{new Date(post.date).toLocaleDateString()}</p>
        </div>
        <Image 
          src={post.image} 
          alt={post.title} 
          data-ai-hint={post.dataAiHint}
          width={1200}
          height={600}
          className="rounded-lg my-8 shadow-lg"
        />
        <div className="space-y-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </article>

      <Separator className="my-12" />
      
      <div className="space-y-8">
        <CommentSection comments={post.comments || []} />
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle>Leave a Comment</CardTitle>
                <CardDescription>Share your thoughts on this post.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-0">
               {user ? (
                 <CommentForm onSubmit={handleAddComment} />
               ) : (
                <div className="text-center p-8 border-dashed border-2 rounded-lg">
                    <p className="text-muted-foreground">You must be logged in to leave a comment.</p>
                    <Button asChild variant="link" className="mt-2">
                        <Link href="/account">Log In or Sign Up</Link>
                    </Button>
                </div>
               )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
