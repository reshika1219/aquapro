'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import styles from './Header.module.css';

const navItems = [
  { label: 'Live Aquatics', href: '/shop/live-aquatics' },
  { label: 'Aquariums', href: '/shop/aquariums' },
  { label: 'Filtration', href: '/shop/filtration' },
  { label: 'Equipment', href: '/shop/equipment' },
  { label: 'Fish Food', href: '/shop/fish-food' },
  { label: 'Aquascaping', href: '/shop/aquascaping' },
  { label: 'Water Care', href: '/shop/water-care' },
  { label: 'Offers', href: '/offers' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount } = useCart();
  const { getCount: getWishlistCount } = useWishlist();

  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) closeMobile();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : styles.transparent}`}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Aqua Pro — Home">
            <Image
              src="/assets/brand/aqua-pro-logo-horizontal.png"
              alt="Aqua Pro"
              width={160}
              height={42}
              style={{ width: 'auto', height: 'auto' }}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Search */}
            <button className={styles.actionBtn} aria-label="Search products" id="header-search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className={styles.actionBtn} aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`} id="header-wishlist-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link href="/cart" className={styles.actionBtn} aria-label={`Cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`} id="header-cart-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>

            {/* Mobile menu button */}
            <button className={styles.menuBtn} onClick={openMobile} aria-label="Open menu" id="header-menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

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
            style={{ height: 32, width: 'auto', objectFit: 'contain' }}
          />
          <button className={styles.mobileMenuClose} onClick={closeMobile} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMobile}>Home</Link>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={styles.mobileNavLink} onClick={closeMobile}>
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          <Link href="/services" className={styles.mobileNavLink} onClick={closeMobile}>Services</Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={closeMobile}>Contact</Link>
        </div>

        <div className={styles.mobileContact}>
          <p>Get in touch</p>
          <a href="tel:+94715959260">071 595 9260</a>
        </div>
      </nav>
    </>
  );
}
