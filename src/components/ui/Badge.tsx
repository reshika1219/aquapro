import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'in-stock' | 'limited' | 'out-of-stock' | 'sale' | 'new';
  children: React.ReactNode;
  showDot?: boolean;
}

const variantMap: Record<string, string> = {
  'in-stock': styles.inStock,
  'limited': styles.limited,
  'out-of-stock': styles.outOfStock,
  'sale': styles.sale,
  'new': styles.new,
};

export default function Badge({ variant, children, showDot = true }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${variantMap[variant] || ''}`}>
      {showDot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
