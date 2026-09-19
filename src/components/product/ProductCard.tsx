'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import type { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const isFish = product.type === 'fish';
  const hasSale = 'salePrice' in product && product.salePrice !== undefined;
  const displayPrice = hasSale ? product.salePrice! : product.price;
  const isAvailable = product.availability !== 'out-of-stock';
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const categorySlug = product.categoryId;
  const productUrl = `/shop/${categorySlug}/${product.slug}`;

  const shortSpec = isFish
    ? `${product.commonName} · ${product.adultSize}`
    : product.brand
    ? product.brand
    : '';

  return (
    <article className={styles.card} id={`product-card-${product.id}`}>
      {/* Image area */}
      <Link href={productUrl} className={styles.imageWrap} aria-label={product.name}>
        <div className={styles.imagePlaceholder}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>

        {/* Badges */}
        <div className={styles.badges}>
          {hasSale && (
            <Badge variant="sale" showDot={false}>
              -{getDiscountPercent(product.price, product.salePrice!)}%
            </Badge>
          )}
          {product.newArrival && (
            <Badge variant="new">New</Badge>
          )}
          {product.availability === 'limited' && (
            <Badge variant="limited">Limited</Badge>
          )}
          {product.availability === 'out-of-stock' && (
            <Badge variant="out-of-stock">Sold Out</Badge>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        className={`${styles.wishlistBtn} ${wishlisted ? styles.active : ''}`}
        onClick={() => toggleItem(product.id)}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.category}>
          {isFish ? (product.waterType === 'marine' ? 'Marine' : 'Freshwater') : product.categoryId.replace('-', ' ')}
        </span>
        <Link href={productUrl} style={{ textDecoration: 'none' }}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        {shortSpec && <span className={styles.spec}>{shortSpec}</span>}

        <div className={styles.priceRow}>
          <span className={`${styles.price} ${hasSale ? styles.salePrice : ''}`}>
            {formatPrice(displayPrice)}
          </span>
          {hasSale && (
            <span className={styles.originalPrice}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      {inCart && isAvailable ? (
        <div className={styles.cartActions}>
          <button
            type="button"
            className={`${styles.addBtn} ${styles.addBtnCompact}`}
            onClick={() => addItem(product.id)}
            aria-label="Add another to cart"
          >
            Add another
          </button>
          <Link href="/cart" className={styles.viewCartBtn}>
            View cart
          </Link>
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.addBtn} ${!isAvailable ? styles.disabled : ''}`}
          onClick={() => isAvailable && addItem(product.id)}
          disabled={!isAvailable}
          aria-label="Add to cart"
        >
          {isAvailable ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {isFish ? 'Add to Cart (Pickup Only)' : 'Add to Cart'}
            </>
          ) : (
            'Out of Stock'
          )}
        </button>
      )}
    </article>
  );
}
