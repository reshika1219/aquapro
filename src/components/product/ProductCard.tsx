'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import type { Product } from '@/types';
import Image from 'next/image';
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
  const productUrl = `/shop/${product.categoryId}/${product.slug}`;

  const shortSpec = isFish
    ? `${product.commonName} · ${product.adultSize}`
    : product.brand ?? '';

  const catLabel = isFish
    ? (product.waterType === 'marine' ? 'Marine Fish' : 'Freshwater Fish')
    : product.categoryId.replace(/-/g, ' ');

  return (
    <article className={styles.card} id={`product-card-${product.id}`}>

      {/* Image */}
      <Link href={productUrl} className={styles.imageWrap} aria-label={product.name} tabIndex={-1}>
        {product.images?.[0] ? (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            {isFish ? (
              <svg className={styles.fishIcon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8">
                <path d="M8 24c0-6 4-12 12-14 2 4 6 6 10 6s6-2 8-4c2 4 3 8 2 12-2 8-10 14-20 14S6 32 8 24Z" />
                <circle cx="14" cy="22" r="2" fill="currentColor" opacity="0.5"/>
                <path d="M4 28c-2-2-2-6 0-8" strokeLinecap="round" opacity="0.4"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            )}
            <span className={styles.imagePlaceholderLabel}>{isFish ? 'Live Fish' : 'Product'}</span>
          </div>
        )}

        {/* Badges */}
        <div className={styles.badges}>
          {hasSale && (
            <span className="badge badge--sale">
              -{getDiscountPercent(product.price, product.salePrice!)}%
            </span>
          )}
          {product.newArrival && (
            <span className="badge badge--new">New</span>
          )}
          {product.availability === 'limited' && (
            <span className="badge badge--limited">Limited</span>
          )}
          {product.availability === 'out-of-stock' && (
            <span className="badge badge--soldout">Sold Out</span>
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
        <span className={styles.categoryLabel}>{catLabel}</span>
        <Link href={productUrl} style={{ textDecoration: 'none' }}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        {shortSpec && <span className={styles.spec}>{shortSpec}</span>}

        <div className={styles.priceRow}>
          <span className={`${styles.price} ${hasSale ? styles.sale : ''}`}>
            {formatPrice(displayPrice)}
          </span>
          {hasSale && (
            <span className={styles.originalPrice}>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      {/* Footer action */}
      <div className={styles.cardFooter}>
        {inCart && isAvailable ? (
          <div className={styles.cartActions}>
            <button
              type="button"
              className={`${styles.addBtn} ${styles.addBtnCompact}`}
              onClick={() => addItem(product.id)}
              aria-label="Add another to cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Add more
            </button>
            <Link href="/cart" className={styles.viewCartBtn}>View cart</Link>
          </div>
        ) : (
          <button
            type="button"
            className={`${styles.addBtn} ${!isAvailable ? styles.disabled : ''}`}
            onClick={() => isAvailable && addItem(product.id)}
            disabled={!isAvailable}
            aria-label={isAvailable ? 'Add to cart' : 'Out of stock'}
          >
            {isAvailable ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                {isFish ? 'Add to Cart (Pickup)' : 'Add to Cart'}
              </>
            ) : 'Out of Stock'}
          </button>
        )}
      </div>
    </article>
  );
}
