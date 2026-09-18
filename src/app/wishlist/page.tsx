'use client';

import Link from 'next/link';
import { useWishlist } from '@/lib/wishlist';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import productsData from '@/data/products.json';
import styles from './Wishlist.module.css';

export default function WishlistPage() {
  const { items } = useWishlist();

  const wishlistedProducts = productsData.filter(p => items.includes(p.id));

  return (
    <>
      <section className={styles.wishlistHeader}>
        <div className="container">
          <h1 className={styles.title}>Your Saved Wishlist</h1>
          <p className={styles.subtitle}>
            Keep track of your favorite aquariums, equipment, live stock, and supplies.
          </p>
        </div>
      </section>

      <div className="container">
        {wishlistedProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Your Wishlist is Empty</h2>
            <p className={styles.emptyDesc}>
              You haven't added any products to your wishlist yet. Explore our luxury collection.
            </p>
            <Button href="/shop" variant="primary">
              Explore Shop
            </Button>
          </div>
        ) : (
          <div className={styles.wishlistGrid}>
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
