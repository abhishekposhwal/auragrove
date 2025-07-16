"use client";

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories, brands } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    minGreenScore: 0,
    sortBy: 'popularity',
  });

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSliderChange = (value: number[]) => {
    handleFilterChange('minGreenScore', value[0]);
  }

  const filteredProducts = useMemo(() => {
    let sortedProducts = [...products];

    // Sorting
    if (filters.sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'score-desc') {
      sortedProducts.sort((a, b) => b.greenScore - a.greenScore);
    } else { // popularity
      sortedProducts.sort((a, b) => b.reviews.count - a.reviews.count);
    }

    // Filtering
    return sortedProducts.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category.toLowerCase().replace(' ', '-') === filters.category;
      const brandMatch = filters.brand === 'all' || product.brand.toLowerCase().replace(/ /g, '') === filters.brand;
      const scoreMatch = product.greenScore >= filters.minGreenScore;
      return categoryMatch && brandMatch && scoreMatch;
    });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 font-headline text-center text-secondary-foreground">Shop Our Collection</h1>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary-foreground">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                 <Select
                  value={filters.brand}
                  onValueChange={(value) => handleFilterChange('brand', value)}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(b => <SelectItem key={b.value} value={b.value.toLowerCase().replace(/ /g, '')}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Min. Green Score: {filters.minGreenScore}</Label>
                <Slider
                  defaultValue={[0]}
                  max={10}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <RadioGroup 
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="popularity" id="popularity" />
                    <Label htmlFor="popularity">Popularity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="score-desc" id="score-desc" />
                    <Label htmlFor="score-desc">Green Score (High to Low)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-asc" id="price-asc" />
                    <Label htmlFor="price-asc">Price (Low to High)</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-desc" id="price-desc" />
                    <Label htmlFor="price-desc">Price (High to Low)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </aside>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-secondary-foreground">No Products Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
