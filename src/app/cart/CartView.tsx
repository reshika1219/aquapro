'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { getAllProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import styles from './Cart.module.css';

export default function CartView() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [pricesMap, setPricesMap] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
    const products = getAllProducts();
    const pMap: Record<string, Product> = {};
    const priceMap: Record<string, number> = {};

    products.forEach(p => {
      pMap[p.id] = p;
      priceMap[p.id] = ('salePrice' in p && p.salePrice !== undefined) ? p.salePrice : p.price;
    });

    setProductsMap(pMap);
    setPricesMap(priceMap);
  }, []);

  if (!mounted) return <div className={styles.loading}>Loading cart...</div>;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <div className={styles.emptyAction}>
          <Button href="/shop">Start Shopping</Button>
        </div>
      </div>
    );
  }

  const subtotal = getTotal(pricesMap);
  const containsFish = items.some(item => productsMap[item.productId]?.type === 'fish');

  return (
    <div className={styles.layout}>
      {/* Main Cart Items */}
      <div className={styles.main}>
        <div className={styles.header}>
          <span>Product</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>

        <ul className={styles.itemList}>
          {items.map(item => {
            const product = productsMap[item.productId];
            if (!product) return null;

            const price = pricesMap[product.id];
            const itemTotal = price * item.quantity;
            const productUrl = `/shop/${product.categoryId}/${product.slug}`;

            return (
              <li key={item.productId} className={styles.item}>
                {/* Product Info */}
                <div className={styles.itemInfo}>
                  <Link href={productUrl} className={styles.itemImage}>
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                        </svg>
                      </div>
                    )}
                  </Link>
                  <div className={styles.itemDetails}>
                    <Link href={productUrl} className={styles.itemName}>
                      {product.name}
                    </Link>
                    <span className={styles.itemPrice}>{formatPrice(price)}</span>
                    {product.type === 'fish' && (
                      <span className={styles.pickupBadge}>Pickup Only</span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className={styles.quantity}>
                  <div className={styles.quantitySelector}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>

                {/* Total */}
                <div className={styles.itemTotal}>
                  {formatPrice(itemTotal)}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
          <Button href="/shop" variant="outline">
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Summary */}
      <aside className={styles.summary}>
        <h2>Order Summary</h2>

        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span className={styles.calculatedText}>Calculated at checkout</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryTotal}>
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {containsFish && (
          <div className={styles.pickupNotice}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
            </svg>
            <p>Your cart contains live fish which require in-store pickup.</p>
          </div>
        )}

        <Button href="/checkout" size="lg" fullWidth className={styles.checkoutBtn}>
          Proceed to Checkout
        </Button>
      </aside>
    </div>
  );
}
