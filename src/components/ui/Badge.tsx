interface BadgeProps {
  variant: 'in-stock' | 'limited' | 'out-of-stock' | 'sale' | 'new';
  children: React.ReactNode;
  showDot?: boolean;
}

const variantClassMap: Record<string, string> = {
  'in-stock':    'badge badge--instock',
  'limited':     'badge badge--limited',
  'out-of-stock':'badge badge--soldout',
  'sale':        'badge badge--sale',
  'new':         'badge badge--new',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={variantClassMap[variant] || 'badge'}>
      {children}
    </span>
  );
}
