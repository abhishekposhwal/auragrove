"use client";

import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { BlogPost, BlogComment } from '@/lib/types';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/blog/CommentSection';
import { CommentForm } from '@/components/blog/CommentForm';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post: BlogPost | undefined = blogPosts.find(p => p.id.toString() === params.id);
  const [comments, setComments] = useState<BlogComment[]>(post?.comments || []);

  if (!post) {
    notFound();
  }

  const handleAddComment = (newCommentData: Omit<BlogComment, 'id' | 'date'>) => {
    const newComment: BlogComment = {
        id: `c${Date.now()}`,
        date: new Date().toISOString(),
        ...newCommentData
    };
    setComments(prevComments => [newComment, ...prevComments]);
  };

  const content = post.description;

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
            <p className="text-muted-foreground text-lg">{post.date}</p>
        </div>
        <Image 
          src={post.image} 
          alt={post.title} 
          data-ai-hint={post.dataAiHint}
          width={1200}
          height={600}
          className="rounded-lg my-8 shadow-lg"
        />
        <p>{content}</p>
      </article>

      <Separator className="my-12" />
      
      <div className="space-y-8">
        <CommentSection comments={comments} />
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle>Leave a Comment</CardTitle>
                <CardDescription>Share your thoughts on this post.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-0">
                <CommentForm onSubmit={handleAddComment} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
