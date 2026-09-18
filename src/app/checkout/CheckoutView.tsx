'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { getAllProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { Product, OrderFormData } from '@/types';
import styles from './Checkout.module.css';

export default function CheckoutView() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [pricesMap, setPricesMap] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup',
    address: '',
    city: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Auto-select pickup if cart has fish
    const hasFish = items.some(item => pMap[item.productId]?.type === 'fish');
    if (hasFish) {
      setFormData(prev => ({ ...prev, deliveryMethod: 'pickup' }));
    }
  }, [items]);

  if (!mounted) return <div className={styles.loading}>Loading checkout...</div>;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
        <Button href="/shop">Return to Shop</Button>
      </div>
    );
  }

  const subtotal = getTotal(pricesMap);
  const containsFish = items.some(item => productsMap[item.productId]?.type === 'fish');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            ...item,
            product: productsMap[item.productId]
          })),
          customer: formData,
          total: subtotal,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const { orderId } = await response.json();
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was a problem submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.layout}>
      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.formSection}>
        <div className={styles.card}>
          <h2>Contact Information</h2>
          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Delivery Method</h2>

          {containsFish && (
            <div className={styles.pickupNotice}>
              <p>Your order contains live fish and must be picked up in-store.</p>
            </div>
          )}

          <div className={styles.radioGroup}>
            <label className={`${styles.radioCard} ${formData.deliveryMethod === 'pickup' ? styles.active : ''}`}>
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={formData.deliveryMethod === 'pickup'}
                onChange={handleInputChange}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioTitle}>Store Pickup</span>
                <span className={styles.radioDesc}>Collect from our Galnewa store. Free.</span>
              </div>
            </label>

            <label className={`${styles.radioCard} ${formData.deliveryMethod === 'delivery' ? styles.active : ''} ${containsFish ? styles.disabled : ''}`}>
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={formData.deliveryMethod === 'delivery'}
                onChange={handleInputChange}
                disabled={containsFish}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioTitle}>Home Delivery</span>
                <span className={styles.radioDesc}>Nationwide delivery for equipment only.</span>
              </div>
            </label>
          </div>
        </div>

        {formData.deliveryMethod === 'delivery' && (
          <div className={styles.card}>
            <h2>Delivery Address</h2>
            <div className={styles.grid1}>
              <div className={styles.inputGroup}>
                <label htmlFor="address">Address *</label>
                <input type="text" id="address" name="address" required={formData.deliveryMethod === 'delivery'} value={formData.address} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="city">City *</label>
                <input type="text" id="city" name="city" required={formData.deliveryMethod === 'delivery'} value={formData.city} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        )}

        <div className={styles.card}>
          <h2>Order Notes</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="notes">Special Instructions (Optional)</label>
            <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange}></textarea>
          </div>
        </div>
      </form>

      {/* Summary Sidebar */}
      <aside className={styles.summarySidebar}>
        <div className={styles.summaryCard}>
          <h2>Order Summary</h2>
          <ul className={styles.summaryItems}>
            {items.map(item => {
              const product = productsMap[item.productId];
              if (!product) return null;
              return (
                <li key={item.productId} className={styles.summaryItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{product.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemTotal}>
                    {formatPrice(pricesMap[product.id] * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.divider} />

          <div className={styles.totals}>
            <div className={styles.totalsRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.totalsRow}>
              <span>Shipping</span>
              <span>{formData.deliveryMethod === 'pickup' ? 'Free' : 'TBD'}</span>
            </div>
            <div className={styles.totalsTotal}>
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <div className={styles.paymentNotice}>
            <p><strong>Payment Method:</strong> Cash on Delivery / Pay at Store. No payment is required online.</p>
          </div>

          <Button
            size="lg"
            fullWidth
            onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </Button>
        </div>
      </aside>
    </div>
  );
}
