import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="EcoChic Home">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">EcoChic</span>
            </Link>
            <p className="text-sm text-muted-foreground">Curated eco-friendly products for a conscious lifestyle.</p>
          </div>
          <div className='lg:col-span-3'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                <div>
                  <h3 className="font-bold mb-4">Shop</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li><Link href="/shop?category=apparel" className="hover:text-primary transition-colors">Apparel</Link></li>
                    <li><Link href="/shop?category=home-goods" className="hover:text-primary transition-colors">Home Goods</Link></li>
                    <li><Link href="/shop?category=personal-care" className="hover:text-primary transition-colors">Personal Care</Link></li>
                    <li><Link href="/shop?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">About</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
                    <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                    <li><Link href="/policies" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                    <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
                  </ul>
                </div>
                 <div className="col-span-2 space-y-4">
                  <h3 className="font-bold">Newsletter</h3>
                  <p className="text-sm text-muted-foreground">Subscribe for eco-tips and new product alerts.</p>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Email" />
                    <Button type="submit">Subscribe</Button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EcoChic. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
