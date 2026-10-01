import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const heroBadges = [
  { icon: '✦', text: '14-Day Quarantine Certified' },
  { icon: '✦', text: 'Low-Iron Rimless Glass' },
  { icon: '✦', text: 'Islandwide Safe Delivery' },
];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="Aqua Pro — Living Aquariums">

      {/* Cinematic Full-Bleed Background */}
      <div className={styles.mediaContainer}>
        <Image
          src="/assets/images/hero/hero-luxury.jpg"
          alt="Bespoke Nature Aquarium with live fish and lush aquascaping"
          fill
          priority
          quality={95}
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.scrimTop} />
        <div className={styles.scrimBottom} />
        <div className={styles.scrimCenter} />
      </div>

      {/* Hero Content Overlay */}
      <div className={styles.contentWrap}>
        <div className="container">
          <div className={styles.inner}>

            {/* Minimalist Pill Eyebrow */}
            <div className={styles.eyebrowPill}>
              <span className={styles.dot} />
              <span className={styles.eyebrowText}>Sri Lanka&rsquo;s Premier Aquatics Destination</span>
            </div>

            {/* Grand Minimalist Headline */}
            <h1 className={styles.headline}>
              The Art of<br />
              <span className={styles.headlineGradient}>Living Waters.</span>
            </h1>

            {/* Refined Luxury Subtext */}
            <p className={styles.subheadline}>
              Curated healthy livestock, bespoke low-iron nature aquariums, and precision
              filtration — crafted for passionate fishkeepers and modern living spaces.
            </p>

            {/* Clean Action Buttons */}
            <div className={styles.actions}>
              <Link href="/shop" className={styles.btnPrimary} id="hero-btn-shop">
                <span>Explore Collection</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>

              <Link href="/services" className={styles.btnSecondary} id="hero-btn-services">
                <span>Bespoke Installations</span>
              </Link>
            </div>

            {/* Minimalist Feature Badges */}
            <div className={styles.badgesRow}>
              {heroBadges.map(item => (
                <div key={item.text} className={styles.badgeItem}>
                  <span className={styles.badgeIcon}>{item.icon}</span>
                  <span className={styles.badgeText}>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Understated Scroll Indicator */}
      <a href="#shop-by-category" className={styles.scrollIndicator} aria-label="Scroll to browse categories">
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollBar} />
        </div>
      </a>

    </section>
  );
}
