import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "10 Simple Swaps for a More Sustainable Kitchen",
    description: "Discover easy changes you can make in your kitchen to reduce waste and live more eco-friendly.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "sustainable kitchen",
    category: "Tips & Tricks",
    date: "October 26, 2023",
  },
  {
    id: 2,
    title: "The Truth About 'Fast Fashion' and How to Avoid It",
    description: "Learn about the environmental and social impact of fast fashion, and how to build a conscious wardrobe.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "clothing rack",
    category: "Ethical Fashion",
    date: "October 22, 2023",
  },
  {
    id: 3,
    title: "Meet the Maker: EcoThreads' Journey to Organic Cotton",
    description: "An interview with the founder of EcoThreads about their commitment to organic materials and fair labor.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "cotton field",
    category: "Brand Spotlight",
    date: "October 18, 2023",
  },
];


export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">EcoChic Blog</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, tips, and stories for a more sustainable life.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href="#" key={post.id} className="group">
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
