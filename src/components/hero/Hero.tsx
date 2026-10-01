import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '@/data/site.json';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="Aqua Pro">

      {/* Full-bleed background image */}
      <div className={styles.imageLayer}>
        <Image
          src="/assets/images/hero/hero-luxury.jpg"
          alt="Planted nature aquarium in modern interior"
          fill
          priority
          quality={95}
          className={styles.image}
          sizes="100vw"
        />
        <div className={styles.scrim} />
      </div>

      {/* Main content grid */}
      <div className={styles.contentWrap}>
        <div className="container">

          {/* Top metadata tag */}
          <div className={styles.metaTop}>
            <span className={styles.metaTag}>AQUA PRO · GALNEWA</span>
            <span className={styles.metaSub}>EST. SRI LANKA · LIVE STOCK & AQUASCAPING</span>
          </div>

          {/* Editorial Headline & Statement */}
          <div className={styles.headlineBlock}>
            <h1 className={styles.headline}>
              Healthy fish.<br />
              Pure water.<br />
              Living art.
            </h1>

            <div className={styles.detailsBlock}>
              <p className={styles.summary}>
                We hand-select freshwater species, quarantine every fish for 14 days,
                and build custom low-iron rimless nature aquariums for homes and spaces
                across Sri Lanka.
              </p>

              <div className={styles.btnRow}>
                <Link href="/shop" className={styles.primaryLink} id="hero-btn-shop">
                  Browse Catalog →
                </Link>
                <Link href="/services" className={styles.secondaryLink} id="hero-btn-services">
                  Custom Tank Inquiries
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom editorial footer bar */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomCol}>
              <span className={styles.bottomLabel}>Store Location</span>
              <span className={styles.bottomVal}>{siteConfig.address}</span>
            </div>

            <div className={styles.bottomCol}>
              <span className={styles.bottomLabel}>Specialties</span>
              <span className={styles.bottomVal}>Live Aquatics · Filtration · Low-Iron Scapes</span>
            </div>

            <div className={styles.bottomCol}>
              <span className={styles.bottomLabel}>Direct Contact</span>
              <a href={`tel:+94715959260`} className={styles.bottomLink}>
                {siteConfig.phone}
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
