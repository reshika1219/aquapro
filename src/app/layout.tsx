import type { Metadata } from 'next';
import { Inter, DM_Serif_Display, Space_Grotesk } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { WishlistProvider } from '@/lib/wishlist';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--next-font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--next-font-display',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--next-font-ui',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Aqua Pro — Sri Lanka\'s Premier Aquarium Destination',
    template: '%s | Aqua Pro',
  },
  description:
    "Sri Lanka's number one aquarium destination. Premium live fish, professional-grade aquarium equipment, custom aquarium builds, and expert aquascaping services — based in Galnewa.",
  keywords: [
    'aquarium Sri Lanka',
    'live fish Sri Lanka',
    'aquarium shop Sri Lanka',
    'aquascaping',
    'betta fish',
    'tropical fish',
    'aquarium equipment',
    'Aqua Pro',
    'Galnewa aquarium',
    'custom aquarium',
  ],
  authors: [{ name: 'Aqua Pro', url: 'https://aquapro.lk' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Aqua Pro',
    title: 'Aqua Pro — Sri Lanka\'s Premier Aquarium Destination',
    description:
      "Sri Lanka's number one aquarium destination. Premium live fish, professional equipment, custom builds, and expert aquascaping.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqua Pro — Sri Lanka\'s Premier Aquarium Destination',
    description:
      "Sri Lanka's number one aquarium destination.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${spaceGrotesk.variable}`}
    >
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
