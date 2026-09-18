'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import type { Product } from '@/types';
import styles from './Product.module.css';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const isAvailable = product.availability !== 'out-of-stock';
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const isFish = product.type === 'fish';

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => Math.min(10, prev + 1));

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product.id, quantity);
    }
  };

  return (
    <div className={styles.actionsBox}>
      {isAvailable ? (
        <div className={styles.quantityRow}>
          <span className={styles.quantityLabel}>Quantity</span>
          <div className={styles.quantitySelector}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={handleIncrease}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.outOfStockNotice}>
          <p>This item is currently out of stock.</p>
        </div>
      )}

      <div className={styles.buttonsRow}>
        <Button
          size="lg"
          fullWidth
          disabled={!isAvailable}
          onClick={handleAddToCart}
          id="btn-add-to-cart"
        >
          {inCart ? 'Add More to Cart' : 'Add to Cart'}
        </Button>
        <button
          className={`${styles.wishlistBtnLg} ${wishlisted ? styles.active : ''}`}
          onClick={() => toggleItem(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {isFish && isAvailable && (
        <div className={styles.pickupNotice}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
          </svg>
          <p>
            <strong>Pickup Only.</strong> Live fish cannot be delivered via courier. You must collect this item from our Galnewa store.
          </p>
        </div>
      )}
    </div>
  );
}
