import Image from 'next/image';
import Button from '@/components/ui/Button';
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

      {/* Content */}
      <div className={styles.content}>
        <Image
          src="/assets/brand/aqua-pro-logo-square.png"
          alt="Aqua Pro"
          width={160}
          height={160}
          className={styles.logo}
          priority
        />
        <h1 className={styles.headline}>
          Premium Aquatics.<br />
          Exceptional Environments.
        </h1>
        <p className={styles.subheadline}>
          Sri Lanka&rsquo;s destination for healthy livestock, quality equipment, and expert aquarium services.
        </p>
        <div className={styles.ctas}>
          <Button href="/shop/live-aquatics" size="lg" id="hero-cta-shop">
            Shop Aquatics
          </Button>
          <Button href="/shop" variant="secondary" size="lg" id="hero-cta-explore">
            Explore Products
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
