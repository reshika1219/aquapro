'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchProducts, getProductPath } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import styles from './SearchDialog.module.css';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchProducts(query).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const goToShopSearch = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  }, [query, onClose, router]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.inputRow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search fish, equipment, brands…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                goToShopSearch();
              }
            }}
            aria-label="Search query"
          />
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {query.trim().length >= 2 && (
          <div className={styles.results}>
            {results.length === 0 ? (
              <p className={styles.empty}>No products match &ldquo;{query}&rdquo;.</p>
            ) : (
              <ul>
                {results.map(product => {
                  const hasSale = 'salePrice' in product && product.salePrice !== undefined;
                  const price = hasSale ? product.salePrice! : product.price;
                  return (
                    <li key={product.id}>
                      <Link href={getProductPath(product)} onClick={onClose} className={styles.resultLink}>
                        <span className={styles.resultName}>{product.name}</span>
                        <span className={styles.resultPrice}>{formatPrice(price)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <button type="button" className={styles.viewAll} onClick={goToShopSearch}>
              View all results in shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
