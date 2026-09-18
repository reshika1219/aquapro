import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { WishlistProvider } from '@/lib/wishlist';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Aqua Pro — Premium Aquatics & Exceptional Environments',
    template: '%s | Aqua Pro',
  },
  description:
    "Sri Lanka's premium aquarium destination — live fish, aquariums, filtration, aquascaping supplies, and expert services.",
  keywords: [
    'aquarium',
    'fish',
    'aquatics',
    'Sri Lanka',
    'aquascaping',
    'live fish',
    'aquarium supplies',
    'Aqua Pro',
  ],
  authors: [{ name: 'Aqua Pro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Aqua Pro',
    title: 'Aqua Pro — Premium Aquatics & Exceptional Environments',
    description:
      "Sri Lanka's premium aquarium destination — live fish, aquariums, filtration, aquascaping supplies, and expert services.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqua Pro — Premium Aquatics & Exceptional Environments',
    description:
      "Sri Lanka's premium aquarium destination — live fish, aquariums, filtration, aquascaping supplies, and expert services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
