"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateImage } from '@/ai/flows/generate-image-flow';
import Image from 'next/image';

export default function InspirationPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError('Please enter a description for your product concept.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateImage({ prompt });
      setImageUrl(result.imageUrl);
    } catch (e) {
      console.error(e);
      setError('Sorry, we couldn\'t generate an image at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 md:px-6 py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">3D Eco-Concept Studio</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Have an idea for a sustainable product? Describe it below and let our AI create a 3D rendering of it!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Describe Your 3D Concept</CardTitle>
          <CardDescription>
            For example: "a stylish backpack made from recycled ocean plastic" or "a set of biodegradable bamboo cutlery".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your sustainable product idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          <Button onClick={handleGenerateImage} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate 3D Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4 font-headline">Your 3D Eco-Inspiration!</h3>
          <div className="rounded-lg overflow-hidden shadow-xl">
             <Image
                src={imageUrl}
                alt={prompt}
                width={800}
                height={800}
                className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
