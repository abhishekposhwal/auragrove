"use client";

import { useState } from 'react';
import { suggestSustainableAlternatives } from '@/ai/flows/suggest-sustainable-alternatives';
import type { AlternativeProduct, Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlternativeProductCard } from './AlternativeProductCard';

interface SustainableAlternativesProps {
  product: Product;
}

export default function SustainableAlternatives({ product }: SustainableAlternativesProps) {
  const [alternatives, setAlternatives] = useState<AlternativeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindAlternatives = async () => {
    setIsLoading(true);
    setError(null);
    setAlternatives([]);

    try {
      const result = await suggestSustainableAlternatives({
        productDescription: product.description,
        productCategory: product.category,
      });
      setAlternatives(result.alternatives);
    } catch (e) {
      console.error(e);
      setError('Sorry, we couldn\'t find alternatives at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="text-center bg-muted/50 py-16 rounded-2xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <Sparkles className="h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold">Looking for Greener Options?</h2>
          <p className="max-w-2xl text-muted-foreground">
            Let our AI assistant suggest some even more sustainable alternatives to the {`"${product.name}"`}.
          </p>
          <Button onClick={handleFindAlternatives} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Find Sustainable Alternatives'
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto text-left mt-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {alternatives.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-12">
            {alternatives.map((alt, index) => (
              <AlternativeProductCard key={index} alternative={alt} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
