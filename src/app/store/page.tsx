import Button from '@/components/ui/Button';
import siteConfig from '@/data/site.json';
import styles from './Store.module.css';

export const metadata = {
  title: 'Aqua Pro Showroom & Store Location',
  description:
    'Experience our physical showroom in Athurugiriya, Sri Lanka. View display aquascapes, rare livestock, and premium equipment.',
};

export default function StorePage() {
  return (
    <>
      <section className={styles.storeHeader}>
        <div className="container">
          <h1 className={styles.title}>The Aqua Pro Showroom</h1>
          <p className={styles.subtitle}>
            Step inside Sri Lanka's premier aquatics experience studio in Athurugiriya.
          </p>
        </div>
      </section>

      <div className={`container ${styles.storeContent}`}>
        {/* Features */}
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Living Gallery</h3>
            <p className={styles.featureDesc}>
              Explore fully matured high-tech Nature Aquariums, biotope tanks, and rimless saltwater setups in person.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Quarantine & Live Stock Hub</h3>
            <p className={styles.featureDesc}>
              All live fish undergo a strict 14-day quarantine regimen before being released to customers, ensuring zero pathogen transfer.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Hardscape Selection Bay</h3>
            <p className={styles.featureDesc}>
              Test your aquascaping layout on our dry-dojo sandbox before purchasing stones, driftwood, or aquatic soils.
            </p>
          </div>
        </div>

        {/* Visit Details */}
        <div className={styles.visitSection}>
          <div>
            <h2 className={styles.visitTitle}>Visit Us Today</h2>
            <p className={styles.visitText}>
              <strong>Address:</strong> {siteConfig.address}<br />
              <strong>Phone:</strong> {siteConfig.phone}<br />
              <strong>Email:</strong> {siteConfig.email}<br />
              <strong>Hours:</strong> Mon–Sat: 9 AM – 7 PM | Sun & Poya: 10 AM – 5 PM
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button href="/contact" variant="primary">
                Get Directions & Map
              </Button>
              <Button href={`https://wa.me/${siteConfig.whatsapp}`} variant="secondary" external>
                Contact Store Manager
              </Button>
            </div>
          </div>

          <div style={{ background: 'var(--deep-navy)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: 'var(--pure-white)', marginBottom: '1rem', fontSize: 'var(--text-lg)' }}>Pickup Information</h4>
            <p style={{ color: 'var(--gray-300)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
              Live fish, rare shrimp, and fragile glass aquariums purchased online can be collected directly from our store counter. Please bring your order confirmation code when picking up.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
