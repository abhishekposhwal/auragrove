import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/CartContext';
import { PT_Sans } from 'next/font/google';
import { ProfileProvider } from '@/context/ProfileContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'EcoChic',
  description: 'Sustainable and Ethical E-Commerce Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light", ptSans.variable)}>
      <body className="font-sans antialiased">
        <ProfileProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
