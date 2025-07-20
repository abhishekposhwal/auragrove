import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { products, blogPosts } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Truck, Users } from "lucide-react";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  const benefits = [
    { icon: <Leaf className="h-8 w-8 text-primary" />, title: "Sustainable Materials", description: "Ethically sourced and eco-friendly." },
    { icon: <Truck className="h-8 w-8 text-primary" />, title: "Carbon-Neutral Shipping", description: "Delivered to your door, guilt-free." },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Community Focused", description: "Join a movement of conscious consumers." },
  ];

  return (
    <div className="space-y-24 md:space-y-32 mb-24 md:mb-32">
      <section className="container mx-auto px-4 md:px-6 mt-16">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Style Meets Sustainability.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Discover a curated collection of eco-friendly and ethically-made products for a conscious lifestyle.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Our Mission</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-96 w-full lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
             <Image
              src="https://placehold.co/800x600.png"
              alt="Stylish sustainable products on a minimalist background"
              layout="fill"
              objectFit="cover"
              data-ai-hint="sustainable products lifestyle"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg">
              {benefit.icon}
              <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Handpicked items that our community loves.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
                <Link href="/shop">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                 <Image src="https://placehold.co/600x400.png" alt="A person tending to a plant" data-ai-hint="person plant" layout="fill" objectFit="cover" />
            </div>
            <div className="space-y-4">
                 <h2 className="text-3xl md:text-4xl font-bold">Our Commitment to the Planet</h2>
                 <p className="text-lg text-muted-foreground">We believe that every purchase can be a vote for a better world. That's why we partner with brands that prioritize sustainability, ethical production, and high-quality craftsmanship. From carbon-neutral shipping to plastic-free packaging, we're dedicated to minimizing our impact.</p>
                 <Button variant="link" asChild className="p-0 h-auto text-lg">
                     <Link href="/about">Learn More <ArrowRight className="ml-2 h-5 w-5" /></Link>
                 </Button>
            </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">From the Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Insights, tips, and stories for a more sustainable life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
             <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <div className="overflow-hidden rounded-lg border">
                <div className="h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={post.dataAiHint}
                  />
                </div>
                <div className="p-6 bg-card">
                  <p className="text-sm text-primary mb-2 font-semibold">{post.category}</p>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground line-clamp-2">{post.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
