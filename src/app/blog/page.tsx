"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { blogPosts as initialBlogPosts } from "@/lib/mock-data";
import { generateBlogPost } from '@/ai/flows/generate-blog-post-flow';

export default function BlogPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePost = async () => {
    if (!topic) {
      setError('Please enter a topic for the blog post.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateBlogPost({ topic });
      const queryParams = new URLSearchParams({
        title: result.title,
        content: result.content,
        category: result.category,
      }).toString();
      router.push(`/blog/new?${queryParams}`);
    } catch (e) {
      console.error(e);
      setError('Sorry, we couldn\'t generate a blog post at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">EcoChic Blog</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, tips, and stories for a more sustainable life.
        </p>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary"/>
            Generate a New Blog Post
          </CardTitle>
          <CardDescription>
            Have an idea for a blog post? Let our AI write it for you! Just enter a topic below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Input 
            placeholder="e.g., 'The benefits of bamboo fabric'"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button onClick={handleGeneratePost} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              'Generate Post'
            )}
          </Button>
        </CardContent>
         {error && (
            <CardContent>
                <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialBlogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  data-ai-hint={post.dataAiHint}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-2">{post.category}</Badge>
                <CardTitle className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription className="mb-4">{post.description}</CardDescription>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
