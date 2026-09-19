import categoriesData from '@/data/categories.json';
import type { Category } from '@/types';

export const shopCategories = (categoriesData as Category[]).sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0),
);

export const mainNavItems = [
  { label: 'Offers', href: '/offers' },
  { label: 'Services', href: '/services' },
  { label: 'Our Store', href: '/store' },
  { label: 'Contact', href: '/contact' },
] as const;

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/shop') {
    return pathname === '/shop' || pathname.startsWith('/shop/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
