import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/data/site.json';
import { shopCategories } from '@/lib/nav';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>

          {/* Brand column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrap} aria-label="Aqua Pro — Home">
              <Image
                src="/assets/brand/aqua-pro-logo-horizontal.png"
                alt="Aqua Pro"
                width={140}
                height={38}
                style={{ width: 'auto', height: '36px' }}
              />
            </Link>
            <p className={styles.brandText}>
              Sri Lanka&rsquo;s premier aquarium destination. Live fish, professional equipment,
              custom aquarium builds, and expert aquarists at your service.
            </p>

            <div className={styles.socials}>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Aqua Pro on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Aqua Pro on TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Aqua Pro on WhatsApp"
                style={{ color: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.96 7.96 0 0 1-4.108-1.14l-.292-.176-3.044.8.8-3.044-.176-.292A7.963 7.963 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Shop</h4>
            <div className={styles.columnLinks}>
              <Link href="/shop">All Products</Link>
              {shopCategories.slice(0, 5).map(cat => (
                <Link key={cat.id} href={`/shop/${cat.slug}`}>{cat.name}</Link>
              ))}
              <Link href="/offers">Offers & Deals</Link>
            </div>
          </div>

          {/* Company column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <div className={styles.columnLinks}>
              <Link href="/about-us">About Aqua Pro</Link>
              <Link href="/services">Services</Link>
              <Link href="/store">Our Store</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/shipping-delivery">Shipping &amp; Pickup</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>

          {/* Contact column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.columnLinks}>
              <a href={`tel:+${siteConfig.whatsapp}`}>{siteConfig.phone}</a>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
                {siteConfig.address}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Aqua Pro. All rights reserved. Built with passion in Sri Lanka.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
