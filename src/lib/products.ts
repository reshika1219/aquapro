// ============================================
// Aqua Pro — Product Data Loading
// ============================================

import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import type { Product, Category } from '@/types';

const products = productsData as Product[];
const categories = categoriesData as Category[];

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategoryId: string): Product[] {
  return products.filter(p => p.subcategoryId === subcategoryId);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

/**
 * Get new arrivals
 */
export function getNewArrivals(): Product[] {
  return products.filter(p => p.newArrival);
}

/**
 * Get products on sale
 */
export function getSaleProducts(): Product[] {
  return products.filter(p => 'salePrice' in p && p.salePrice !== undefined);
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

/**
 * Search products by query
 */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return products.filter(p => {
    const searchable = [
      p.name,
      p.shortDescription,
      p.categoryId,
      p.subcategoryId,
      ...(p.tags || []),
      ...(p.type === 'fish' ? [p.commonName, p.scientificName] : []),
      ...(p.brand ? [p.brand] : []),
    ]
      .join(' ')
      .toLowerCase();

    return terms.every(term => searchable.includes(term));
  });
}

/**
 * Count products per category id
 */
export function getProductCountByCategory(categoryId: string): number {
  return products.filter(p => p.categoryId === categoryId).length;
}

/**
 * Get product by slug with category slug for URLs
 */
export function getProductPath(product: Product): string {
  return `/shop/${product.categoryId}/${product.slug}`;
}
