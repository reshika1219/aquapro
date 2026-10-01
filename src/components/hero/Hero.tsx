import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="Aqua Pro — Hero">

      {/* Background photo */}
      <div className={styles.heroBg}>
        <Image
          src="/assets/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          className={styles.heroBgImg}
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Main content */}
      <div className={styles.inner}>

        {/* Left: Text */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Sri Lanka&rsquo;s Premier Aquatics Destination
          </span>

          <h1 className={styles.headline}>
            Where the Ocean<br />
            Comes <span className={styles.headlineAccent}>Alive</span><br />
            in Your Home
          </h1>

          <p className={styles.subheadline}>
            Healthy livestock, professional-grade equipment, expert aquascaping,
            and a team that genuinely lives this hobby — all from Galnewa, Sri Lanka.
          </p>

          <div className={styles.ctas}>
            <Link href="/shop" className={styles.ctaPrimary} id="hero-cta-shop">
              Explore the Shop
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/services" className={styles.ctaSecondary} id="hero-cta-services">
              Our Services
            </Link>
          </div>

          <div className={styles.metaLine}>
            <span>Galnewa, Sri Lanka</span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>Live stock · Equipment · Aquascaping</span>
          </div>
        </div>

        {/* Right: Photo card */}
        <div className={styles.visual}>
          <div className={styles.fishCard}>
            <Image
              src="/assets/images/hero/hero-fish.jpg"
              alt="Betta fish and neon tetras in a planted aquarium"
              width={440}
              height={440}
              className={styles.fishCardImg}
              quality={90}
              priority
            />
            <div className={styles.fishCardOverlay} />

            <div className={styles.fishCardBadges}>
              <span className={styles.fishBadge}>Live Fish</span>
              <span className={styles.fishBadge}>In Stock</span>
            </div>

            <div className={styles.fishCardContent}>
              <span className={styles.fishCardLabel}>Featured Collection</span>
              <h2 className={styles.fishCardTitle}>Bettas &amp; Tetras</h2>
              <p className={styles.fishCardSub}>Quarantined. Health-guaranteed. Ready to thrive.</p>
              <Link href="/shop/live-aquatics" className={styles.fishCardCta}>
                Shop Live Fish
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#shop-by-category" className={styles.scrollDown} aria-label="Scroll down to explore">
        <span className={styles.scrollDownText}>Explore</span>
        <div className={styles.scrollDownLine} />
      </a>
    </section>
  );
}
