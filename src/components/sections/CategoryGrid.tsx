import Link from 'next/link';
import { getAllCategories } from '@/lib/products';
import styles from './CategoryGrid.module.css';

// Simple category icon SVGs
const categoryIcons: Record<string, React.ReactNode> = {
  'live-aquatics': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 24c0-6 4-12 12-14 2 4 6 6 10 6s6-2 8-4c2 4 3 8 2 12-2 8-10 14-20 14S6 32 8 24Z" />
      <circle cx="14" cy="22" r="1.5" fill="currentColor" />
      <path d="M4 28c-2-2-2-6 0-8" strokeLinecap="round" />
    </svg>
  ),
  'aquariums': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="10" width="36" height="24" rx="2" />
      <path d="M6 34h36" />
      <path d="M10 38h28" strokeLinecap="round" />
      <path d="M12 20c2-2 4 0 6-2s4 0 6-2" opacity="0.5" />
    </svg>
  ),
  'filtration': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="14" y="8" width="20" height="32" rx="3" />
      <path d="M14 16h20M14 24h20M14 32h20" opacity="0.5" />
      <path d="M20 4v4M28 4v4" strokeLinecap="round" />
      <path d="M24 40v4" strokeLinecap="round" />
    </svg>
  ),
  'equipment': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="14" />
      <path d="M24 14v4M24 30v4M14 24h4M30 24h4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  ),
  'fish-food': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8h16v4c0 2-3 4-8 4s-8-2-8-4V8Z" />
      <rect x="12" y="16" width="24" height="24" rx="4" />
      <circle cx="24" cy="28" r="6" opacity="0.5" />
    </svg>
  ),
  'aquascaping': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 36c4-8 8-20 16-24 4 8 8 16 16 24H8Z" opacity="0.5" />
      <path d="M16 36c2-6 4-14 8-18 2 6 4 12 8 18" />
      <path d="M6 36h36" strokeLinecap="round" />
    </svg>
  ),
  'water-care': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 6c-8 12-14 18-14 26a14 14 0 0 0 28 0c0-8-6-14-14-26Z" />
      <path d="M18 30c2-2 4-2 6 0s4 2 6 0" opacity="0.5" strokeLinecap="round" />
    </svg>
  ),
  'accessories': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 8h8l4 12H16L20 8Z" />
      <rect x="14" y="20" width="20" height="16" rx="2" />
      <path d="M18 36v4M30 36v4" strokeLinecap="round" />
      <path d="M20 26h8" opacity="0.5" strokeLinecap="round" />
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
                <h3 className={styles.tileName}>{category.name}</h3>
                <span className={styles.tileCount}>
                  {category.subcategories?.length || 0} subcategories
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
