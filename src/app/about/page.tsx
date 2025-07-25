import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Mission for a Greener Tomorrow</h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            At AuraGrove, we're passionate about making sustainable living accessible and beautiful. We believe that conscious consumerism is a powerful force for change.
          </p>
        </div>
        <div className="flex justify-center">
          <Image 
            src="/our-mission-image.png"
            alt="Lush green forest"
            data-ai-hint="green forest"
            width={1200}
            height={500}
            className="rounded-lg shadow-xl"
            style={{ height: "auto" }}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 text-left items-center">
          <div className="space-y-4 md:ml-16">
            <h2 className="text-3xl font-bold font-headline">From a Small Idea to a Big Impact</h2>
            <p className="text-muted-foreground">
              AuraGrove started with a simple idea: what if every product we buy could contribute positively to the planet? We began by curating a small collection of items from brands that share our values of sustainability, ethical production, and quality craftsmanship.
            </p>
            <p className="text-muted-foreground">
              Today, we've grown into a community of conscious shoppers and purpose-driven brands, all working together to create a more sustainable future. Our commitment extends beyond our products to our packaging, shipping, and every aspect of our operations.
            </p>
          </div>
          <Image 
            src="/big-impact-image.png"
            alt="Team working with sustainable materials"
            data-ai-hint="team work"
            width={400}
            height={400}
            className="rounded-full shadow-md ml-16 object-cover"
            style={{ height: "400px", width: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}
