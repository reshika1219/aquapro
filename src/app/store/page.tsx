import Image from 'next/image';
import Button from '@/components/ui/Button';
import siteConfig from '@/data/site.json';
import styles from './Store.module.css';

export const metadata = {
  title: 'Aqua Pro Showroom & Store Location',
  description:
    'Visit the Aqua Pro showroom in Galnewa, Sri Lanka. View display aquascapes, live stock, and premium equipment.',
};

const galleryImages = [
  {
    src: '/assets/images/store/store-exterior.png',
    alt: 'Aqua Pro Storefront in Galnewa',
    caption: 'Main Storefront & Entrance',
  },
  {
    src: '/assets/images/store/store-interior.png',
    alt: 'Aqua Pro Aquascaping and Tank Showroom Interior',
    caption: 'Aquascaping & Equipment Gallery',
  },
  {
    src: '/assets/images/store/store-fish-wall.png',
    alt: 'Aqua Pro Live Fish Quarantine Wall',
    caption: 'Quarantine & Live Stock Wall',
  },
];

export default function StorePage() {
  return (
    <>
      <section className={styles.storeHeader}>
        <div className="container">
          <span className={styles.eyebrow}>Retail & Gallery Destination</span>
          <h1 className={styles.title}>The Aqua Pro Showroom</h1>
          <p className={styles.subtitle}>
            Step inside our premier aquatics showroom in {siteConfig.locationShort} — {siteConfig.address}
          </p>
        </div>
      </section>

      <div className={`container ${styles.storeContent}`}>
        {/* Gallery Grid */}
        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {galleryImages.map((img, index) => (
              <div key={index} className={styles.galleryCard}>
                <div className={styles.galleryImageWrap}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className={styles.galleryCaption}>{img.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Living Gallery</h3>
            <p className={styles.featureDesc}>
              Explore fully matured high-tech Nature Aquariums, biotope tanks, and rimless freshwater setups in person.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Quarantine & Live Stock Hub</h3>
            <p className={styles.featureDesc}>
              All live fish undergo a strict 14-day quarantine regimen before being released to customers, ensuring zero pathogen transfer.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Hardscape Selection Bay</h3>
            <p className={styles.featureDesc}>
              Test your aquascaping layout on our dry-dojo sandbox before purchasing stones, driftwood, or aquatic soils.
            </p>
          </div>
        </section>

        {/* Visit Details */}
        <section className={styles.visitSection}>
          <div className={styles.visitDetails}>
            <h2 className={styles.visitTitle}>Visit Us Today</h2>
            <div className={styles.visitInfoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Address:</span>
                <span className={styles.infoValue}>{siteConfig.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Phone:</span>
                <span className={styles.infoValue}>{siteConfig.phone}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{siteConfig.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Hours:</span>
                <span className={styles.infoValue}>Mon–Sat: 9 AM – 7 PM | Sun & Poya: 10 AM – 5 PM</span>
              </div>
            </div>
            <div className={styles.buttonRow}>
              <Button href={siteConfig.mapsUrl} variant="primary" external>
                Get Directions
              </Button>
              <Button href="/contact" variant="outline">
                Contact & Map
              </Button>
              <Button href={`https://wa.me/${siteConfig.whatsapp}`} variant="secondary" external>
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <div className={styles.pickupCard}>
            <h3 className={styles.pickupTitle}>In-Store Pickup Information</h3>
            <p className={styles.pickupText}>
              Live fish, rare plants, and delicate low-iron glass aquariums ordered online can be collected directly from our store counter.
            </p>
            <p className={styles.pickupSubtext}>
              Please have your order confirmation number ready upon arrival. Our team will pack live stock with pure oxygen insulation just before departure.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
