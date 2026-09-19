import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import styles from './ProductSection.module.css';

interface ProductSectionProps {
  label: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  id?: string;
  accent?: 'new' | 'featured';
}

export default function ProductSection({
  label,
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  id,
  accent,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className={styles.wrapper} data-accent={accent}>
          {/* Section header with inline view-all */}
          <div className={styles.sectionTop}>
            <div className={styles.sectionTopText}>
              <span className={styles.sectionLabel}>{label}</span>
              <h2 className={styles.sectionTitle}>{title}</h2>
              {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
            </div>

            {viewAllHref && (
              <Link
                href={viewAllHref}
                className={styles.viewAllLink}
                id={id ? `${id}-view-all-top` : undefined}
              >
                {viewAllLabel}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Products */}
          <div className={styles.grid}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom view-all for mobile */}
          {viewAllHref && (
            <div className={styles.viewAllBottom}>
              <Button href={viewAllHref} variant="outline" id={id ? `${id}-view-all` : undefined}>
                {viewAllLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
