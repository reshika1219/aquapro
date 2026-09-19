import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategoryBySlug, getAllCategories } from '@/lib/products';
import ShopCatalog from '../ShopCatalog';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const categories = getAllCategories();

  return (
    <Suspense fallback={<div className="container section">Loading shop…</div>}>
      <ShopCatalog products={products} categories={categories} category={category} />
    </Suspense>
  );
}
