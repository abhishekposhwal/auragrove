import type { AlternativeProduct } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

interface AlternativeProductCardProps {
  alternative: AlternativeProduct;
}

export function AlternativeProductCard({ alternative }: AlternativeProductCardProps) {
  return (
    <Card className="h-full flex flex-col bg-background">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">{alternative.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium pt-2">
            <div className="flex items-center gap-1.5 text-primary">
                <Leaf className="h-4 w-4" />
                <span>Score: {alternative.greenScore}/10</span>
            </div>
            <span>~{alternative.carbonFootprint}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{alternative.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
