'use client';

// ============================================
// Aqua Pro — Wishlist State (localStorage-based)
// ============================================

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

interface WishlistContextType {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_KEY = 'aquapro-wishlist';

function loadWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(loadWishlist());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveWishlist(items);
    }
  }, [items, mounted]);

  const addItem = useCallback((productId: string) => {
    setItems(prev => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return items.includes(productId);
  }, [items]);

  const getCount = useCallback(() => {
    return items.length;
  }, [items]);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted, getCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
