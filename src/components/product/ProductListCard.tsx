"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { Leaf, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductListCardProps {
  product: Product;
}

export function ProductListCard({ product }: ProductListCardProps) {
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
    <Card className="w-full overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl flex flex-col sm:flex-row">
        <div className="sm:w-1/3 relative">
            <Link href={`/product/${product.id}`} className="block h-full aspect-square">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    data-ai-hint={`${product.category.toLowerCase()} product`}
                />
            </Link>
        </div>
        <div className="p-6 flex flex-col flex-1 sm:w-2/3">
            <div className='flex-grow'>
                <div className="flex justify-between items-start gap-4">
                    <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/product/${product.id}`}>{product.name}</Link>
                    </h2>
                    <p className="text-xl font-bold text-primary shrink-0">₹{product.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent" fill="currentColor" />
                        <span className="font-semibold">{product.reviews.rating}</span>
                        <span className="text-muted-foreground">({product.reviews.count} reviews)</span>
                    </div>
                     <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Leaf className="h-3 w-3 text-primary" /> Green Score: {product.greenScore}/10
                    </Badge>
                </div>
                <p className='mt-4 text-sm text-muted-foreground line-clamp-2'>{product.description}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
                <Button onClick={handleAddToCart} className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
                <Button size="icon" variant="ghost" className="hidden sm:inline-flex" onClick={handleWishlistToggle}>
                  <Heart className={cn("h-5 w-5", isInWishlist ? "text-red-500 fill-red-500" : "text-foreground/60")} />
                </Button>
            </div>
        </div>
    </Card>
  );
}
