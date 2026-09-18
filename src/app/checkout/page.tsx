import { Metadata } from 'next';
import CheckoutView from './CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order securely.',
};

export default function CheckoutPage() {
  return (
    <div className="container section">
      <div className="section-header" style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="section-header__title">Checkout</h1>
      </div>
      <CheckoutView />
    </div>
  );
}
