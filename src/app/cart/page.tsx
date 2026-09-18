import { Metadata } from 'next';
import CartView from './CartView';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review the items in your shopping cart before checkout.',
};

export default function CartPage() {
  return (
    <div className="container section">
      <div className="section-header" style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="section-header__title">Shopping Cart</h1>
      </div>
      <CartView />
    </div>
  );
}
