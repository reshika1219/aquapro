'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { searchProducts } from '@/lib/products';
import type { Category, Product } from '@/types';
import styles from './Shop.module.css';

type SortOption = 'featured' | 'name-asc' | 'price-asc' | 'price-desc';

interface ShopCatalogProps {
  products: Product[];
  categories: Category[];
  category?: Category;
}

function getDisplayPrice(product: Product): number {
  if ('salePrice' in product && product.salePrice !== undefined) {
    return product.salePrice;
  }
  return product.price;
}

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-asc':
      return copy.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
    case 'price-desc':
      return copy.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
    default:
      return copy;
  }
}

export default function ShopCatalog({ products, categories, category }: ShopCatalogProps) {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';

  const filtered = useMemo(() => {
    let list = products;
    if (query) {
      list = searchProducts(query);
      if (category) {
        list = list.filter(p => p.categoryId === category.id);
      }
    }
    return sortProducts(list, sort);
  }, [products, query, sort, category]);

  const breadcrumbItems = category
    ? [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: category.name },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Shop' },
      ];

  const buildSortHref = (nextSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }
    const qs = params.toString();
    const base = category ? `/shop/${category.slug}` : '/shop';
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div className="container section">
      <Breadcrumbs items={breadcrumbItems} />

      <div className={styles.header}>
        <h1 className="section-header__title">
          {category ? category.name : query ? `Search: “${query}”` : 'All Products'}
        </h1>
        <p className="section-header__subtitle">
          {category
            ? category.description
            : query
              ? `${filtered.length} result${filtered.length === 1 ? '' : 's'} for your search.`
              : `Browse our complete catalog of ${products.length} products.`}
        </p>
      </div>

      <div className={styles.mobileCategories}>
        <Link href="/shop" className={!category ? styles.chipActive : styles.chip}>
          All
        </Link>
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/shop/${cat.slug}`}
            className={category?.id === cat.id ? styles.chipActive : styles.chip}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3>Categories</h3>
            <ul className={styles.categoryList}>
              <li>
                <Link href="/shop" className={!category ? styles.categoryActive : undefined}>
                  All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className={category?.id === cat.id ? styles.categoryActive : undefined}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              {filtered.length} product{filtered.length === 1 ? '' : 's'}
            </p>
            <label className={styles.sortLabel}>
              Sort
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => {
                  window.location.href = buildSortHref(e.target.value as SortOption);
                }}
              >
                <option value="featured">Featured</option>
                <option value="name-asc">Name (A–Z)</option>
                <option value="price-asc">Price (low to high)</option>
                <option value="price-desc">Price (high to low)</option>
              </select>
            </label>
          </div>

          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No products found.</p>
              {query && (
                <Link href={category ? `/shop/${category.slug}` : '/shop'} className={styles.clearSearch}>
                  Clear search
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
