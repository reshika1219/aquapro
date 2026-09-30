'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { mainNavItems, shopCategories, isNavActive } from '@/lib/nav';
import SearchDialog from './SearchDialog';
import styles from './Header.module.css';

const categoryIcons: Record<string, React.ReactNode> = {
  'live-aquatics': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 24c0-6 4-12 12-14 2 4 6 6 10 6s6-2 8-4c2 4 3 8 2 12-2 8-10 14-20 14S6 32 8 24Z" />
      <circle cx="14" cy="22" r="1.5" fill="currentColor" />
    </svg>
  ),
  'aquariums': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="10" width="36" height="24" rx="2" />
      <path d="M6 34h36M10 38h28" strokeLinecap="round" />
      <path d="M12 22c2-2 4 0 6-2s4 0 6-2" opacity="0.5" />
    </svg>
  ),
  'filtration': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="14" y="8" width="20" height="32" rx="3" />
      <path d="M14 16h20M14 24h20M14 32h20" opacity="0.5" />
      <path d="M20 4v4M28 4v4M24 40v4" strokeLinecap="round" />
    </svg>
  ),
  'equipment': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="14" />
      <path d="M24 14v4M24 30v4M14 24h4M30 24h4" strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  ),
  'fish-food': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8h16v4c0 2-3 4-8 4s-8-2-8-4V8Z" />
      <rect x="12" y="16" width="24" height="24" rx="4" />
      <circle cx="24" cy="28" r="6" opacity="0.5" />
    </svg>
  ),
  'aquascaping': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 36c4-8 8-20 16-24 4 8 8 16 16 24H8Z" opacity="0.5" />
      <path d="M16 36c2-6 4-14 8-18 2 6 4 12 8 18" />
      <path d="M6 36h36" strokeLinecap="round" />
    </svg>
  ),
  'water-care': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 6c-8 12-14 18-14 26a14 14 0 0 0 28 0c0-8-6-14-14-26Z" />
      <path d="M18 30c2-2 4-2 6 0s4 2 6 0" opacity="0.5" strokeLinecap="round" />
    </svg>
  ),
  'accessories': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 8h8l4 12H16L20 8Z" />
      <rect x="14" y="20" width="20" height="16" rx="2" />
      <path d="M18 36v4M30 36v4M20 26h8" strokeLinecap="round" />
    </svg>
  ),
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getItemCount } = useCart();
  const { getCount: getWishlistCount } = useWishlist();

  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const shopActive = isNavActive(pathname, '/shop');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileShopOpen(false);
    document.body.style.overflow = '';
  }, []);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => { closeMobile(); }, [pathname, closeMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        if (mobileOpen) closeMobile();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile, searchOpen]);

  const navLinkClass = (href: string) =>
    `${styles.navLink} ${isNavActive(pathname, href) ? styles.navLinkActive : ''}`;

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : styles.transparent}`}
        role="banner"
      >
        <div className={styles.utilityBar}>
          <div className={styles.utilityInner}>
            <span>Healthy livestock, carefully packed</span>
            <span className={styles.utilityDivider} aria-hidden="true" />
            <span>Islandwide delivery available</span>
            <Link href="/offers">See current offers</Link>
          </div>
        </div>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Aqua Pro — Home">
            <Image
              src="/assets/brand/aqua-pro-logo-horizontal.png"
              alt="Aqua Pro"
              width={150}
              height={40}
              style={{ width: 'auto', height: '36px' }}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/" className={navLinkClass('/')}>Home</Link>
            {/* Shop dropdown */}
            <div className={`${styles.shopDropdown} ${shopActive ? styles.shopActive : ''} ${shopOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={`${styles.navDropdownTrigger} ${shopActive ? styles.navLinkActive : ''}`}
                aria-haspopup="true"
                aria-label="Shop categories"
                aria-expanded={shopOpen}
                id="header-shop-menu"
                onClick={() => setShopOpen(open => !open)}
              >
                Shop
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className={styles.shopPanel} role="menu">
                <div className={styles.shopPanelHeader}>
                  <span className={styles.shopPanelTitle}>Browse Categories</span>
                  <Link href="/shop" className={styles.shopPanelAll} role="menuitem">
                    View all →
                  </Link>
                </div>
                <div className={styles.shopPanelGrid}>
                  {shopCategories.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className={styles.shopPanelItem}
                      role="menuitem"
                    >
                      <span className={styles.shopPanelItemIcon}>
                        {categoryIcons[cat.id]}
                      </span>
                      <span className={styles.shopPanelItemName}>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {mainNavItems.map(item => (
              <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionBtn}
              aria-label="Search products"
              id="header-search-btn"
              onClick={() => setSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            <Link href="/wishlist" className={styles.actionBtn} aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`} id="header-wishlist-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>

            <Link href="/cart" className={styles.actionBtn} aria-label={`Cart${cartCount > 0 ? ` (${cartCount})` : ''}`} id="header-cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>

            {/* Hamburger */}
            <button className={styles.menuBtn} onClick={openMobile} aria-label="Open menu" id="header-menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" width={22} height={22}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <nav
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={mobileOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Image
            src="/assets/brand/aqua-pro-logo-horizontal.png"
            alt="Aqua Pro"
            width={120}
            height={32}
            style={{ height: 30, width: 'auto', objectFit: 'contain' }}
          />
          <button className={styles.mobileMenuClose} onClick={closeMobile} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.mobileNav}>
          <Link href="/" className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileNavLinkActive : ''}`} onClick={closeMobile}>
            Home
          </Link>

          <button
            type="button"
            className={`${styles.mobileNavLink} ${styles.mobileExpand} ${mobileShopOpen ? styles.mobileExpandOpen : ''} ${shopActive ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setMobileShopOpen(prev => !prev)}
            aria-expanded={mobileShopOpen}
          >
            Shop
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {mobileShopOpen && (
            <div className={styles.mobileSubNav}>
              <Link href="/shop" className={styles.mobileSubLink} onClick={closeMobile}>All Products</Link>
              {shopCategories.map(item => (
                <Link key={item.id} href={`/shop/${item.slug}`} className={styles.mobileSubLink} onClick={closeMobile}>
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {mainNavItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${isNavActive(pathname, item.href) ? styles.mobileNavLinkActive : ''}`}
              onClick={closeMobile}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileContact}>
          <p>Get in touch</p>
          <a href="tel:+94715959260">+94 71 595 9260</a>
          <a href="https://wa.me/94715959260" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
            WhatsApp us →
          </a>
        </div>
      </nav>
    </>
  );
}
