import Link from 'next/link';
import Image from 'next/image';
import HeroCanvas from './HeroCanvas';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="Aqua Pro — Hero">
      {/* Animated canvas (fish + bubbles) */}
      <HeroCanvas />

      {/* Light ray overlay */}
      <div className={styles.lightRays} aria-hidden="true" />

      {/* Top gradient (for header blending) */}
      <div className={styles.gradientTop} aria-hidden="true" />

      {/* Bottom gradient (for content blending) */}
      <div className={styles.gradientBottom} aria-hidden="true" />

      {/* Left: Text Content */}
      <div className={styles.content}>
        <span className={styles.label}>
          Sri Lanka&rsquo;s #1 Aquatics Destination
        </span>

        <h1 className={styles.headline}>
          Premium Aquatics.<br />
          <span className={styles.headlineAccent}>Exceptional</span>{' '}
          Environments.
        </h1>

        <p className={styles.subheadline}>
          Healthy livestock, professional-grade equipment, and expert aquarium
          services — all in one place.
        </p>

        <div className={styles.ctas}>
          <Link href="/shop" className={styles.ctaPrimary} id="hero-cta-shop">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={16} height={16}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
            Browse Shop
          </Link>
          <Link href="/services" className={styles.ctaSecondary} id="hero-cta-services">
            Our Services
          </Link>
        </div>

        {/* Stats row */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>Species</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>8</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>10yr</span>
            <span className={styles.statLabel}>Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>5★</span>
            <span className={styles.statLabel}>Rated</span>
          </div>
        </div>
      </div>

      {/* Right: Visual card */}
      <div className={styles.visual} aria-hidden="true">
        {/* Orbit rings */}
        <div className={`${styles.orbit} ${styles.orbit1}`} />
        <div className={`${styles.orbit} ${styles.orbit2}`} />

        <div className={styles.visualCard}>
          {/* Large fish SVG illustration */}
          <svg className={styles.visualFish} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M40 100c0-30 20-60 60-70 10 20 30 30 50 30s30-10 40-20c10 20 15 40 10 60-10 40-50 70-100 70S30 140 40 100Z" />
            <circle cx="70" cy="90" r="6" fill="currentColor" opacity="0.5" />
            <path d="M20 110c-10-10-10-30 0-40" strokeLinecap="round" />
            <path d="M30 120c-15-5-20-15-20-25" strokeLinecap="round" opacity="0.5" />
            <path d="M150 80c10-5 20-5 30 0" strokeLinecap="round" opacity="0.4" />
            <path d="M155 95c10 0 20 5 25 12" strokeLinecap="round" opacity="0.4" />
          </svg>

          {/* Bubble tags */}
          <div className={styles.visualCardBubbles}>
            <span className={styles.bubble}>🐟 Live Fish</span>
            <span className={styles.bubble}>In Stock</span>
          </div>

          {/* Card bottom content */}
          <div className={styles.visualCardInner}>
            <span className={styles.visualCardLabel}>Featured Collection</span>
            <h3 className={styles.visualCardTitle}>Discus &amp; Rare Cichlids</h3>
            <p className={styles.visualCardSub}>Expertly quarantined. Health-guaranteed.</p>
            <Link href="/shop/live-aquatics" className={styles.visualCardCta}>
              Shop now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={14} height={14}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#shop-by-category" className={styles.scrollIndicator} aria-label="Scroll to shop">
        <span>Explore</span>
        <div className={styles.scrollLine} />
      </a>
    </section>
  );
}
