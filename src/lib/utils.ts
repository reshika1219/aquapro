// ============================================
// Aqua Pro — Utility Functions
// ============================================

import siteConfig from '@/data/site.json';

/**
 * Format a number as LKR currency
 */
export function formatPrice(amount: number): string {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

/**
 * Format a WhatsApp link with optional pre-filled message
 */
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

/**
 * Get availability label and color token
 */
export function getAvailabilityInfo(status: string): { label: string; colorVar: string; bgVar: string } {
  switch (status) {
    case 'in-stock':
      return { label: 'In Stock', colorVar: 'var(--success)', bgVar: 'var(--success-bg)' };
    case 'limited':
      return { label: 'Limited Stock', colorVar: 'var(--warning)', bgVar: 'var(--warning-bg)' };
    case 'out-of-stock':
      return { label: 'Out of Stock', colorVar: 'var(--danger)', bgVar: 'var(--danger-bg)' };
    default:
      return { label: 'Check Availability', colorVar: 'var(--gray-400)', bgVar: 'var(--ice-muted)' };
  }
}

/**
 * Get care level display info
 */
export function getCareLevelInfo(level: string): { label: string; color: string } {
  switch (level) {
    case 'easy':
      return { label: 'Easy', color: 'var(--success)' };
    case 'intermediate':
      return { label: 'Intermediate', color: 'var(--warning)' };
    case 'advanced':
      return { label: 'Advanced', color: 'var(--danger)' };
    default:
      return { label: level, color: 'var(--gray-400)' };
  }
}

/**
 * Get temperament display info
 */
export function getTemperamentInfo(temperament: string): { label: string; color: string } {
  switch (temperament) {
    case 'peaceful':
      return { label: 'Peaceful', color: 'var(--success)' };
    case 'semi-aggressive':
      return { label: 'Semi-Aggressive', color: 'var(--warning)' };
    case 'aggressive':
      return { label: 'Aggressive', color: 'var(--danger)' };
    default:
      return { label: temperament, color: 'var(--gray-400)' };
  }
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercent(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
