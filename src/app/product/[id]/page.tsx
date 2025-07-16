import { products } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
