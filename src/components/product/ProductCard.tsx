import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { Leaf, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-64 object-cover"
            data-ai-hint={`${product.category.toLowerCase()} product`}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
          <Leaf className="h-3 w-3" /> {product.greenScore}/10
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
            <Link href={`/product/${product.id}`}>
              <CardTitle className="text-lg font-bold leading-tight hover:text-primary transition-colors">{product.name}</CardTitle>
            </Link>
            <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
        <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
            <span className="text-sm font-medium">{product.reviews.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews.count} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
