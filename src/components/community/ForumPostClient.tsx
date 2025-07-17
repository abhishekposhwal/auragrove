
"use client";

import { useRouter } from 'next/navigation';
import { forumPosts } from '@/lib/mock-data';
import type { ForumPost, ForumReply } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';

const replySchema = z.object({
  content: z.string().min(5, "Reply must be at least 5 characters.").max(1000, "Reply cannot exceed 1000 characters."),
});
type ReplyFormValues = z.infer<typeof replySchema>;

export function ForumPostClient({ post: initialPost }: { post: ForumPost }) {
  const [post, setPost] = useState<ForumPost>(initialPost);
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { content: '' },
  });

  const handleAddReply = (data: ReplyFormValues) => {
    if (!user) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to reply." });
        return;
    }
    const newReply: ForumReply = {
      id: `r${Date.now()}`,
      author: user.displayName || "Anonymous User",
      date: new Date().toISOString(),
      content: data.content,
    };
    
    const updatedPost = { ...post, replies: [...post.replies, newReply] };
    const postIndex = forumPosts.findIndex(p => p.id === post.id);
    if (postIndex !== -1) {
      forumPosts[postIndex] = updatedPost;
    }
    setPost(updatedPost);

    toast({
        title: "Reply Posted!",
        description: "Thank you for contributing to the discussion.",
    });
    form.reset();
  };


  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/community">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forums
        </Link>
      </Button>

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{post.title}</CardTitle>
            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-card-foreground">{post.author}</span>
                </div>
                {isClient && <span>{new Date(post.date).toLocaleString()}</span>}
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>
      
      <Separator className="my-8" />
      
      <div className="space-y-8">
        <h2 className="text-2xl font-bold font-headline">Replies ({post.replies.length})</h2>
        
        {post.replies.length > 0 ? (
            <div className="space-y-6">
            {post.replies.map((reply) => (
                <Card key={reply.id} className="bg-muted/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold">{reply.author}</p>
                        </div>
                        {isClient && <p className="text-sm text-muted-foreground">{new Date(reply.date).toLocaleString()}</p>}
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{reply.content}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
        ) : (
            <div className="text-center text-muted-foreground py-8">
                <p>No replies yet. Be the first to join the conversation!</p>
            </div>
        )}

        <Separator />
        
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle>Leave a Reply</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-0">
                {user ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddReply)} className="space-y-4">
                            <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Reply</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Share your thoughts..." rows={5} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" variant="outline">Submit Reply</Button>
                        </form>
                    </Form>
                ) : (
                    <div className="text-center p-8 border-dashed border-2 rounded-lg">
                        <p className="text-muted-foreground">You must be logged in to reply.</p>
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
