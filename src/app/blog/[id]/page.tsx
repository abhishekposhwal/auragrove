"use client"

import { useState, useEffect } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { blogPosts as initialBlogPosts } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// A simple client-side cache for generated posts
const generatedPostCache = new Map<string, any>();

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<any | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (params.id === 'new') {
      const cachedPost = generatedPostCache.get('new');
      if (cachedPost) {
        setPost(cachedPost);
        setIsGenerated(true);
      } else {
        // Handle case where user directly navigates to /blog/new
        // Redirect or show an error
        const title = searchParams.get('title');
        const content = searchParams.get('content');
        const category = searchParams.get('category');
        
        if (title && content && category) {
             const newPost = {
                id: 'new',
                title: decodeURIComponent(title),
                content: decodeURIComponent(content),
                category: decodeURIComponent(category),
                description: content.substring(0, 150) + '...',
                image: "https://placehold.co/1200x600.png",
                dataAiHint: "sustainable blog",
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
            };
            setPost(newPost);
            generatedPostCache.set('new', newPost);
            setIsGenerated(true);
        } else {
            router.push('/blog');
        }
      }
    } else {
      const foundPost = initialBlogPosts.find(p => p.id.toString() === params.id);
      setPost(foundPost);
    }
  }, [params.id, router, searchParams]);
  
  if (!post) {
      // Don't call notFound() immediately, let useEffect handle it
      return null; 
  }

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
        {isGenerated ? (
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        ) : (
          <p>{post.description}</p>
        )}
      </article>
    </div>
  );
}
