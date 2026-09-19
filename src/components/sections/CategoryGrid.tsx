import Link from 'next/link';
import { getAllCategories, getProductCountByCategory } from '@/lib/products';
import styles from './CategoryGrid.module.css';

const categoryIcons: Record<string, React.ReactNode> = {
  'live-aquatics': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 24c0-6 4-12 12-14 2 4 6 6 10 6s6-2 8-4c2 4 3 8 2 12-2 8-10 14-20 14S6 32 8 24Z" />
      <circle cx="14" cy="22" r="2" fill="currentColor" />
      <path d="M4 28c-2-2-2-6 0-8M4 24c-1-1-1-3 0-4" strokeLinecap="round" />
      <path d="M36 16c4-2 8-2 10 0" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  'aquariums': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="4" y="8" width="40" height="28" rx="3" />
      <path d="M4 36h40" />
      <path d="M8 42h32" strokeLinecap="round" />
      <path d="M10 20c3-3 5 1 8-2s5 1 8-2" opacity="0.5" strokeLinecap="round" />
      <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="28" cy="22" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  'filtration': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="13" y="6" width="22" height="36" rx="4" />
      <path d="M13 14h22M13 22h22M13 30h22" opacity="0.45" />
      <path d="M19 3v3M29 3v3" strokeLinecap="round" />
      <path d="M24 42v4" strokeLinecap="round" />
      <circle cx="24" cy="22" r="3" opacity="0.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  'equipment': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="24" cy="24" r="16" />
      <path d="M24 12v5M24 31v5M12 24h5M31 24h5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
  'fish-food': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M15 7h18v5c0 3-4 5-9 5s-9-2-9-5V7Z" />
      <rect x="11" y="17" width="26" height="26" rx="5" />
      <circle cx="24" cy="30" r="7" opacity="0.4" />
      <path d="M20 30h8M24 26v8" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  'aquascaping': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 38c5-10 10-24 18-28 5 10 10 20 18 28H6Z" opacity="0.4" />
      <path d="M14 38c3-7 5-17 10-22 3 7 5 15 10 22" />
      <path d="M4 38h40" strokeLinecap="round" />
      <path d="M22 38c0-4 0-8 2-10 1 3 2 7 2 10" opacity="0.6" />
    </svg>
  ),
  'water-care': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M24 5c-9 13-16 20-16 29a16 16 0 0 0 32 0c0-9-7-16-16-29Z" />
      <path d="M16 32c3-3 5-3 8 0s5 3 8 0" opacity="0.5" strokeLinecap="round" />
      <path d="M20 38c1-1 2-1 4 0" strokeLinecap="round" opacity="0.35" />
    </svg>
  ),
  'accessories': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M19 7h10l5 14H14L19 7Z" />
      <rect x="12" y="21" width="24" height="18" rx="3" />
      <path d="M17 39v4M31 39v4" strokeLinecap="round" />
      <path d="M18 29h12" opacity="0.5" strokeLinecap="round" />
      <circle cx="24" cy="29" r="0" />
    </svg>
  ),
};

export default function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className="section" id="shop-by-category">
      <div className="container">
        <div className="section-header">
          <span className="section-header__label">Shop by Category</span>
          <h2 className="section-header__title">Explore Our Range</h2>
          <p className="section-header__subtitle">
            From healthy live fish to professional-grade equipment — everything for your aquarium.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className={styles.tile}
              id={`category-tile-${category.id}`}
            >
              <div className={styles.tileIcon}>
                {categoryIcons[category.id]}
              </div>
              <div className={styles.tileOverlay} />
              <div className={styles.tileContent}>
                <div className={styles.tileText}>
                  <h3 className={styles.tileName}>{category.name}</h3>
                  <span className={styles.tileCount}>
                    {getProductCountByCategory(category.id)} products
                  </span>
                </div>
                <div className={styles.tileArrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
