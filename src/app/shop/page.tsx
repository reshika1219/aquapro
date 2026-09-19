import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/products';
import ShopCatalog from './ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete catalog of live fish, aquariums, filtration, and equipment.',
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <Suspense fallback={<div className="container section">Loading shop…</div>}>
      <ShopCatalog products={products} categories={categories} />
    </Suspense>
  );
}
