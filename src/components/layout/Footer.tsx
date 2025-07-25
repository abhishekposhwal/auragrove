import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="AuraGrove Home">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">AuraGrove</span>
            </Link>
            <p className="text-sm">Your one-stop shop for sustainable and ethical products.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop?category=apparel" className="hover:text-primary">Apparel</Link></li>
              <li><Link href="/shop?category=home-goods" className="hover:text-primary">Home Goods</Link></li>
              <li><Link href="/shop?category=personal-care" className="hover:text-primary">Personal Care</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-primary">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/policies" className="hover:text-primary">Policies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <p>Subscribe to our newsletter for eco-tips and new product alerts.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md border border-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm flex-1"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AuraGrove. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
