"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock-data";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AuraGrove Blog</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, tips, and stories for a more sustainable life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
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
