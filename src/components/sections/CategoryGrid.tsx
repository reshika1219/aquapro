import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getProductCountByCategory } from '@/lib/products';
import styles from './CategoryGrid.module.css';

// Maps each category ID to its actual image file
const categoryImages: Record<string, string> = {
  'live-aquatics': '/assets/images/categories/live-aquatics.jpg',
  'aquariums':     '/assets/images/categories/aquariums.png',
  'filtration':    '/assets/images/categories/filtration.png',
  'equipment':     '/assets/images/categories/equipment.png',
  'fish-food':     '/assets/images/categories/fish-food.png',
  'aquascaping':   '/assets/images/categories/aquascaping.png',
  'water-care':    '/assets/images/categories/water-care.png',
  'accessories':   '/assets/images/categories/accessories.png',
};

export default function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className={`section ${styles.section}`} id="shop-by-category">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-eyebrow">Collections</span>
            <h2 className="section-title">Curated for Aquatic Living</h2>
            <p className="section-subtitle">
              Explore live fish, rimless aquariums, Japanese aquascaping tools, and precision filtration systems.
            </p>
          </div>
          <div className={styles.headerRight}>
            <Link href="/shop" className="btn btn--ghost btn--sm">
              All Categories
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={14} height={14}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className={styles.tile}
              id={`category-tile-${category.id}`}
            >
              {categoryImages[category.id] && (
                <Image
                  src={categoryImages[category.id]}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className={styles.tileImage}
                />
              )}

              {/* Refined gradient overlay for flawless legibility */}
              <div className={styles.tileOverlay} aria-hidden="true" />

              {/* Text content */}
              <div className={styles.tileBody}>
                <span className={styles.tileCount}>
                  {getProductCountByCategory(category.id)} items
                </span>
                <h3 className={styles.tileName}>{category.name}</h3>
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
      </div>
    </section>
  );
}
