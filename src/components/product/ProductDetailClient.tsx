"use client";

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ToastAction } from "@/components/ui/toast";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Star, Leaf, Award, Truck, Recycle } from 'lucide-react';
import SustainableAlternatives from '@/components/product/SustainableAlternatives';
import { ProductReviews } from './ProductReviews';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
        title: "Added to cart!",
        description: `"${product.name}" has been added to your cart.`,
        action: <ToastAction asChild altText="View cart"><Link href="/cart">View cart</Link></ToastAction>,
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="w-full rounded-lg shadow-lg"
            data-ai-hint="sustainable product lifestyle"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.brand}</p>
          </div>
          <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-accent" fill="currentColor" />
              <span className="font-medium">{product.reviews.rating}</span>
              <span className="text-muted-foreground">({product.reviews.count} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-medium">Green Score: {product.greenScore}/10</span>
            </div>
          </div>
          
          <p className="text-base leading-relaxed">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              <span>Certifications: {product.certifications.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span>Carbon Footprint: {product.carbonFootprint}</span>
            </div>
             <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Carbon-neutral shipping</span>
            </div>
             <div className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-muted-foreground" />
              <span>Eco-friendly packaging</span>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
          
        </div>
      </div>
      
      <Separator className="my-12" />

      <SustainableAlternatives product={product} />

      <Separator className="my-12" />

      <ProductReviews reviews={product.reviews.items} averageRating={product.reviews.rating} />

    </div>
  );
}
