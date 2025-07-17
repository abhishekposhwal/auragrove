import { notFound } from 'next/navigation';
import { forumPosts } from '@/lib/mock-data';
import type { ForumPost } from '@/lib/types';
import { ForumPostClient } from '@/components/community/ForumPostClient';

export default function ForumPostPage({ params }: { params: { id: string } }) {
  const post: ForumPost | undefined = forumPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return <ForumPostClient post={post} />;
}
