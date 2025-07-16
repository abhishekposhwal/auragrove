"use client"

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { blogPosts } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id.toString() === params.id);
    if (foundPost) {
      setPost(foundPost);
    } else {
        // We will call notFound() outside useEffect after checking post state
    }
  }, [params.id]);

  if (!post) {
      // Let useEffect run once, and if post is still null, show 404.
      // To avoid flashing 404 on valid pages, we can return null and let useEffect set the post.
      // But if we're certain the effect has run, we can call notFound.
      // For simplicity here, if post isn't found after initial check it's likely a 404.
      // To be safe, we check after the effect. A loading state would be better here.
      if (typeof window !== 'undefined') { // ensures this doesn't run on server
        notFound();
      }
      return null;
  }

  // The content of a blog post is its description in the mock data
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
    </div>
  );
}
