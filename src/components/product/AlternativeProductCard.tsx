import type { AlternativeProduct } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

interface AlternativeProductCardProps {
  alternative: AlternativeProduct;
}

export function AlternativeProductCard({ alternative }: AlternativeProductCardProps) {
  return (
    <Card className="h-full flex flex-col bg-secondary/50 border-primary/50">
      <CardHeader>
        <CardTitle className="text-secondary-foreground">{alternative.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm font-medium pt-2">
            <div className="flex items-center gap-1 text-primary">
                <Leaf className="h-4 w-4" />
                <span>Green Score: {alternative.greenScore}/10</span>
            </div>
            <p>~{alternative.carbonFootprint}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{alternative.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
