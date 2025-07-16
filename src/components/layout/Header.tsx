"use client";

import Link from 'next/link';
import { Leaf, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/inspiration', label: 'Inspiration' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="EcoChic Home">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground font-headline">EcoChic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account" aria-label="My Account">
              <User className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={cn(
            'md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xl font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
             <Link href="/account" className="text-xl font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                Community
              </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
