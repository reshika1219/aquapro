import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByCategory, getCategoryBySlug, getAllCategories } from '@/lib/products';
import styles from '../Shop.module.css';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const categories = getAllCategories();

  return (
    <div className="container section">
      <div className={styles.header}>
        <h1 className="section-header__title">{category.name}</h1>
        <p className="section-header__subtitle">
          {category.description}
        </p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              <li>
                <Link href="/shop" style={{ color: 'var(--gray-500)', fontStyle: 'italic' }}>
                  ← All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    style={cat.id === category.id ? { color: 'var(--aqua)', fontWeight: 600 } : undefined}
                  >
                    {cat.name}
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
              <p>No products found in this category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
