'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const showcasePillars = [
  {
    id: 'livestock',
    title: 'Live Aquatics & Quarantine',
    tagline: '500+ Species · 14-Day Health Quarantine',
    desc: 'From show-grade Bettas and Discus to vibrant schooling Tetras, every specimen is conditioned and guaranteed pathogen-free.',
    image: '/assets/images/hero/hero-fish.jpg',
    badge: 'Live Stock Certified',
    link: '/shop/live-aquatics',
    linkLabel: 'Explore Live Fish',
    stat: '100% Live Arrival Guarantee',
  },
  {
    id: 'aquascapes',
    title: 'Custom Nature Aquariums',
    tagline: 'Ultra-Clear Low-Iron Glass & Natural Scapes',
    desc: 'Architectural rimless glass tanks, premium Seyriu rock, hardscape dojo layouts, and tailor-made ecological living art.',
    image: '/assets/images/store/store-interior.png',
    badge: 'Master Aquascaping',
    link: '/services',
    linkLabel: 'Custom Tank Builds',
    stat: 'Turn-Key Installation',
  },
  {
    id: 'equipment',
    title: 'Professional Equipment',
    tagline: 'Oase, Chihiros, Seachem & ADA Systems',
    desc: 'German canister filtration, full-spectrum programmable LED lighting, and lab-grade water conditioning essentials.',
    image: '/assets/images/categories/filtration.png',
    badge: 'Authorized Dealer',
    link: '/shop/filtration',
    linkLabel: 'Browse Hardware',
    stat: 'Islandwide Express Delivery',
  },
];

const categoryPills = [
  { label: 'Live Fish', href: '/shop/live-aquatics', icon: '🐠' },
  { label: 'Aquascaping', href: '/shop/aquascaping', icon: '🌿' },
  { label: 'Aquariums', href: '/shop/aquariums', icon: '🫧' },
  { label: 'Filtration', href: '/shop/filtration', icon: '⚙️' },
  { label: 'Equipment', href: '/shop/equipment', icon: '💡' },
  { label: 'Exclusive Offers', href: '/offers', icon: '🏷️' },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const currentPillar = showcasePillars[activeTab];

  return (
    <section className={styles.hero} id="hero" aria-label="Aqua Pro — Luxury Aquarium Destination">

      {/* Cinematic Ambient Background */}
      <div className={styles.heroBgWrap}>
        <Image
          src="/assets/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          className={styles.heroBgImage}
          sizes="100vw"
          aria-hidden="true"
        />
        <div className={styles.heroGlowOrb1} aria-hidden="true" />
        <div className={styles.heroGlowOrb2} aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />
      </div>

      <div className={styles.container}>

        {/* Top Floating Live Status Bar */}
        <div className={styles.topStatus}>
          <div className={styles.statusPill}>
            <span className={styles.pulseDot} />
            <span className={styles.statusText}>Live Stock Stocked Today · Galnewa Showroom Open</span>
          </div>
          <div className={styles.ratingBadge}>
            <span className={styles.stars}>★★★★★</span>
            <span>4.9/5 Premier Aquarium Destination</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>

          {/* Left: Brand Statement & Primary CTA */}
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              Sri Lanka&rsquo;s High-End Aquatic Sanctuary
            </span>

            <h1 className={styles.headline}>
              Where Nature Meets
              <span className={styles.headlineHighlight}>
                Aquatic Artistry
              </span>
            </h1>

            <p className={styles.description}>
              Elevate your space with pristine living ecosystems. We supply health-guaranteed
              livestock, precision European filtration, and bespoke low-iron glass installations.
            </p>

            <div className={styles.actionRow}>
              <Link href="/shop" className={styles.primaryBtn} id="hero-cta-shop">
                <span>Explore Store & Catalog</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>

              <Link href="/store" className={styles.secondaryBtn} id="hero-cta-store">
                <span>Visit Showroom</span>
              </Link>
            </div>

            {/* Micro Trust Matrix */}
            <div className={styles.trustMatrix}>
              <div className={styles.trustItem}>
                <span className={styles.trustValue}>14-Day</span>
                <span className={styles.trustLabel}>Quarantine Standard</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustValue}>500+</span>
                <span className={styles.trustLabel}>Live Stock Species</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustValue}>100%</span>
                <span className={styles.trustLabel}>Safe Arrival Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Showcase Deck */}
          <div className={styles.showcaseDeck}>

            {/* Pillar Selector Tabs */}
            <div className={styles.tabBar} role="tablist">
              {showcasePillars.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`${styles.tabBtn} ${activeTab === idx ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className={styles.tabNumber}>0{idx + 1}</span>
                  <span className={styles.tabTitle}>{pillar.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Feature Showcase Card */}
            <div className={styles.cardContainer}>
              <div className={styles.showcaseCard}>

                <div className={styles.cardMediaWrap}>
                  <Image
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className={styles.cardMedia}
                    priority
                  />
                  <div className={styles.cardMediaOverlay} />

                  <div className={styles.cardTopPills}>
                    <span className={styles.cardBadge}>{currentPillar.badge}</span>
                    <span className={styles.cardStatBadge}>{currentPillar.stat}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.cardTagline}>{currentPillar.tagline}</p>
                  <h2 className={styles.cardTitle}>{currentPillar.title}</h2>
                  <p className={styles.cardDesc}>{currentPillar.desc}</p>

                  <div className={styles.cardFooter}>
                    <Link href={currentPillar.link} className={styles.cardLink}>
                      <span>{currentPillar.linkLabel}</span>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Quick-Access Category Dock */}
        <div className={styles.categoryDock}>
          <span className={styles.dockLabel}>Quick Departments:</span>
          <div className={styles.dockScroller}>
            {categoryPills.map(cat => (
              <Link key={cat.href} href={cat.href} className={styles.dockPill}>
                <span className={styles.dockIcon}>{cat.icon}</span>
                <span className={styles.dockText}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
