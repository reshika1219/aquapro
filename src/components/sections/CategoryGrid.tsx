import Link from 'next/link';
import { getAllCategories, getProductCountByCategory } from '@/lib/products';
import styles from './CategoryGrid.module.css';

const categoryIcons: Record<string, React.ReactNode> = {
  'live-aquatics': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 24c0-6 4-12 12-14 2 4 6 6 10 6s6-2 8-4c2 4 3 8 2 12-2 8-10 14-20 14S6 32 8 24Z" />
      <circle cx="14" cy="22" r="2" fill="currentColor" />
      <path d="M4 28c-2-2-2-6 0-8M36 16c4-2 8-2 10 0" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  'aquariums': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="4" y="8" width="40" height="28" rx="3" />
      <path d="M4 36h40M8 42h32" strokeLinecap="round" />
      <path d="M10 20c3-3 5 1 8-2s5 1 8-2" opacity="0.5" strokeLinecap="round" />
      <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="28" cy="22" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  'filtration': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="13" y="6" width="22" height="36" rx="4" />
      <path d="M13 14h22M13 22h22M13 30h22" opacity="0.45" />
      <path d="M19 3v3M29 3v3M24 42v4" strokeLinecap="round" />
    </svg>
  ),
  'equipment': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="24" cy="24" r="16" />
      <path d="M24 12v5M24 31v5M12 24h5M31 24h5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="7" />
    </svg>
  ),
  'fish-food': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M15 7h18v5c0 3-4 5-9 5s-9-2-9-5V7Z" />
      <rect x="11" y="17" width="26" height="26" rx="5" />
      <circle cx="24" cy="30" r="7" opacity="0.4" />
    </svg>
  ),
  'aquascaping': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 38c5-10 10-24 18-28 5 10 10 20 18 28H6Z" opacity="0.4" />
      <path d="M14 38c3-7 5-17 10-22 3 7 5 15 10 22" />
      <path d="M4 38h40" strokeLinecap="round" />
    </svg>
  ),
  'water-care': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M24 5c-9 13-16 20-16 29a16 16 0 0 0 32 0c0-9-7-16-16-29Z" />
      <path d="M16 32c3-3 5-3 8 0s5 3 8 0" opacity="0.5" strokeLinecap="round" />
    </svg>
  ),
  'accessories': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M19 7h10l5 14H14L19 7Z" />
      <rect x="12" y="21" width="24" height="18" rx="3" />
      <path d="M17 39v4M31 39v4M18 29h12" strokeLinecap="round" />
    </svg>
  ),
};

const categoryColors: Record<string, string> = {
  'live-aquatics': 'rgba(0,196,238,0.08)',
  'aquariums':     'rgba(124,110,248,0.08)',
  'filtration':    'rgba(34,200,126,0.08)',
  'equipment':     'rgba(245,166,35,0.08)',
  'fish-food':     'rgba(255,107,74,0.08)',
  'aquascaping':   'rgba(0,196,238,0.08)',
  'water-care':    'rgba(124,110,248,0.08)',
  'accessories':   'rgba(34,200,126,0.08)',
};

export default function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className={`section ${styles.section}`} id="shop-by-category">
      <div className="container">
        <div className={styles.header}>
          <span className="section-eyebrow">Shop by Category</span>
          <h2 className="section-title">Everything Your<br />Aquarium Needs</h2>
        </div>

        <div className={styles.grid}>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className={styles.tile}
              id={`category-tile-${category.id}`}
              style={{ '--tile-accent': categoryColors[category.id] || 'rgba(0,196,238,0.06)' } as React.CSSProperties}
            >
              {/* Large watermark icon */}
              <div className={styles.iconWatermark} aria-hidden="true">
                {categoryIcons[category.id]}
              </div>

              {/* Small icon chip */}
              <div className={styles.iconChip} aria-hidden="true">
                {categoryIcons[category.id]}
              </div>

              {/* Text */}
              <div className={styles.tileBody}>
                <h3 className={styles.tileName}>{category.name}</h3>
                <span className={styles.tileCount}>
                  {getProductCountByCategory(category.id)} products
                </span>
              </div>

              {/* Arrow indicator */}
              <div className={styles.tileArrow} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/shop" className="btn btn--ghost">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={16} height={16}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
