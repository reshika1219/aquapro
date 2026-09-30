import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/types';
import styles from './ProductSection.module.css';

interface ProductSectionProps {
  label: string;
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref: string;
  viewAllLabel: string;
  id: string;
  accent?: 'new' | 'featured';
}

export default function ProductSection({
  label,
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel,
  id,
  accent,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={`section ${styles.section} ${accent === 'featured' ? styles.sectionAlt : ''}`} id={id}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-eyebrow">{label}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
          <div className={styles.headerRight}>
            <Link href={viewAllHref} className="btn btn--teal-outline btn--sm">
              {viewAllLabel}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={14} height={14}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
