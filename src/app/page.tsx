import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { BrandBenefits } from "@/components/BrandBenefits"; // <-- Add this import

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      <section>
        <div className="grid md:grid-cols-2 items-center gap-8 py-12 md:py-24">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
              Live Sustainably, Shop Beautifully.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover a curated collection of eco-friendly and ethically-made products for a conscious lifestyle.
            </p>
            <Button size="lg" asChild className="transition-transform duration-300 hover:scale-105">
              <Link href="/shop">Explore Products</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/hero-image1.png"
              alt="Sustainable products collage"
              width={700}
              height={500}
              // className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      <BrandBenefits /> {/* <-- Add this line here */}

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="bg-accent/20 rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
                 <h2 className="text-3xl font-bold font-headline">Our Commitment to the Planet</h2>
                 <p className="text-muted-foreground">We believe that every purchase can be a vote for a better world. That's why we partner with brands that prioritize sustainability, ethical production, and high-quality craftsmanship. From carbon-neutral shipping to plastic-free packaging, we're dedicated to minimizing our impact.</p>
                 <Button variant="outline" asChild className="transition-transform duration-300 hover:scale-105">
                     <Link href="/about">Learn More</Link>
                 </Button>
            </div>
            <div className="flex justify-center">
                <Image src="/prioritize-sustainability.png" alt="Planet Earth" data-ai-hint="planet earth" width={300} height={300} className="rounded-full" />
            </div>
        </div>
      </section>
    </div>
  );
}
