import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/mock-data';
import type { BlogPost } from '@/lib/types';
import { BlogPostDetail } from '@/components/blog/BlogPostDetail';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post: BlogPost | undefined = blogPosts.find(p => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
