import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully.',
};

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.orderId;

  return (
    <div className="container section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', background: 'var(--navy)', padding: 'var(--space-12) var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
          Thank you for your order. We have received it and will process it shortly.
        </p>

        {orderId && (
          <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Order Reference</span>
            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--aqua)', marginTop: 'var(--space-1)' }}>{orderId}</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Button href="/shop" size="lg" fullWidth>
            Continue Shopping
          </Button>
          <Link href="/" style={{ color: 'var(--gray-400)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
