import { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getAllProducts, getAllCategories } from '@/lib/products';
import styles from './Shop.module.css';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete catalog of live fish, aquariums, filtration, and equipment.',
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="container section">
      <div className={styles.header}>
        <h1 className="section-header__title">All Products</h1>
        <p className="section-header__subtitle">
          Browse our complete catalog of {products.length} products.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              {categories.map(category => (
                <li key={category.id}>
                  <Link href={`/shop/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className={styles.main}>
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <div className={styles.empty}>
              <p>No products found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
