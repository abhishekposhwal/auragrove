"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="w-full h-full flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-64 object-cover"
            data-ai-hint={`${product.category.toLowerCase()} product`}
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="rounded-full h-9 w-9" onClick={handleWishlistToggle}>
                <Heart className={cn("h-5 w-5", isInWishlist && "text-destructive fill-destructive")} />
            </Button>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Leaf className="h-3 w-3" /> {product.greenScore}/10
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
            <Link href={`/product/${product.id}`}>
              <CardTitle className="text-lg font-bold leading-tight hover:text-primary transition-colors">{product.name}</CardTitle>
            </Link>
            <p className="text-lg font-semibold text-primary">₹{product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
        <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
            <span className="text-sm font-medium">{product.reviews.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews.count} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
        <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
