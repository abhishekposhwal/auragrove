import Image from 'next/image';
import { Check } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="space-y-16">
        <AnimatedSection className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Mission for a Greener Tomorrow</h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            At EcoChic, we're passionate about making sustainable living accessible and beautiful. We believe that conscious consumerism is a powerful force for positive change.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/1200x500.png"
              alt="Lush green forest canopy from below"
              data-ai-hint="green forest"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">From a Small Idea to a Big Impact</h2>
              <p className="text-muted-foreground leading-relaxed">
                EcoChic started with a simple idea: what if every product we buy could contribute positively to the planet? We began by curating a small collection of items from brands that share our values of sustainability, ethical production, and quality craftsmanship.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've grown into a community of conscious shoppers and purpose-driven brands, all working together to create a more sustainable future. Our commitment extends beyond our products to our packaging, shipping, and every aspect of our operations.
              </p>
            </div>
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Team members collaborating over sustainable materials"
                data-ai-hint="team work"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-muted/50 p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-center">Our Core Values</h2>
            <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Check className="h-10 w-10 bg-primary text-primary-foreground rounded-full p-2 mb-4" />
                <h3 className="text-xl font-semibold">Sustainability First</h3>
                <p className="text-muted-foreground mt-2">Prioritizing products and practices that protect our planet.</p>
              </div>
              <div className="flex flex-col items-center">
                <Check className="h-10 w-10 bg-primary text-primary-foreground rounded-full p-2 mb-4" />
                <h3 className="text-xl font-semibold">Ethical Production</h3>
                <p className="text-muted-foreground mt-2">Ensuring fair wages and safe conditions for all workers.</p>
              </div>
              <div className="flex flex-col items-center">
                <Check className="h-10 w-10 bg-primary text-primary-foreground rounded-full p-2 mb-4" />
                <h3 className="text-xl font-semibold">Lasting Quality</h3>
                <p className="text-muted-foreground mt-2">Curating durable items designed to be cherished, not replaced.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
