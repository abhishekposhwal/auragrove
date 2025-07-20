"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { Leaf, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
        title: "Added to cart!",
        description: `"${product.name}" has been added to your cart.`,
        action: <ToastAction asChild altText="View cart"><Link href="/cart">View cart</Link></ToastAction>,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
          title: "Removed from wishlist",
          description: `"${product.name}" has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
          title: "Added to wishlist!",
          description: `"${product.name}" has been added to your wishlist.`,
          action: <ToastAction asChild altText="View wishlist"><Link href="/wishlist">View wishlist</Link></ToastAction>,
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden group border-none shadow-none rounded-lg">
       <CardHeader className="p-0 relative overflow-hidden rounded-lg">
         <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={`${product.category.toLowerCase()} product`}
          />
        </Link>
        <Button size="icon" variant="secondary" className="absolute top-3 right-3 rounded-full h-9 w-9 shadow-md" onClick={handleWishlistToggle}>
            <Heart className={cn("h-5 w-5", isInWishlist ? "text-red-500 fill-red-500" : "text-foreground/80")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pb-2 flex-grow">
        <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                <Link href={`/product/${product.id}`}>{product.name}</Link>
              </h3>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 shrink-0">
              <Leaf className="h-3 w-3 text-primary" /> {product.greenScore}
            </Badge>
        </div>
        <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
            <span className="text-sm font-medium">{product.reviews.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews.count})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-stretch gap-2">
         <p className="text-lg font-bold text-primary mb-2 self-start">₹{product.price.toFixed(2)}</p>
         <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
