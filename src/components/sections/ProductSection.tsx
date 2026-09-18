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
}

export default function ProductSection({
  label,
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  id,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section-header">
          <span className="section-header__label">{label}</span>
          <h2 className="section-header__title">{title}</h2>
          {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
        </div>

        <div className={styles.grid}>
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllHref && (
          <div className={styles.viewAll}>
            <Button href={viewAllHref} variant="outline" id={id ? `${id}-view-all` : undefined}>
              {viewAllLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
