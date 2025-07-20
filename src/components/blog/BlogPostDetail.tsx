
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { blogPosts } from '@/lib/mock-data';

export function BlogPostDetail({ post: initialPost }: { post: BlogPost }) {
  const [post, setPost] = useState<BlogPost>(initialPost);
  const { toast } = useToast();

  const handleAddComment = (newCommentData: Omit<BlogComment, 'id' | 'date'>) => {
    const newComment: BlogComment = {
        id: `c${Date.now()}`,
        date: new Date().toISOString(),
        ...newCommentData
    };

    const updatedPost = {
      ...post,
      comments: [newComment, ...(post.comments || [])],
    };
    setPost(updatedPost);

    // Update the main mock data array
    const postIndex = blogPosts.findIndex(p => p.id === initialPost.id);
    if (postIndex !== -1) {
        if (!blogPosts[postIndex].comments) {
            blogPosts[postIndex].comments = [];
        }
        blogPosts[postIndex].comments!.unshift(newComment);
    }

    toast({
        title: "Comment Submitted!",
        description: "Thank you for sharing your thoughts.",
    });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 md:px-6 py-16 md:py-24">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      <article className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 not-prose mb-8">
            <Badge variant="secondary" className="text-primary">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground text-lg">{new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden my-8 shadow-lg">
          <Image 
            src={post.image} 
            alt={post.title} 
            data-ai-hint={post.dataAiHint}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Separator className="my-16" />
      
      <div className="space-y-12">
        <CommentSection comments={post.comments || []} />
        <Card>
            <CardHeader>
                <CardTitle>Leave a Comment</CardTitle>
            </CardHeader>
            <CardContent>
               <CommentForm onSubmit={handleAddComment} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
