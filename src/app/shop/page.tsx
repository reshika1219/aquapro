import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import ShopCatalog from './ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete catalog of live fish, aquariums, filtration, and equipment.',
};

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <Suspense fallback={<div className="container section">Loading shop…</div>}>
      <ShopCatalog products={products} />
    </Suspense>
  );
}
