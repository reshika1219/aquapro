import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  disabled = false,
  loading = false,
  external = false,
  type = 'button',
  onClick,
  className = '',
  id,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          id={id}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} id={id} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      id={id}
      aria-label={ariaLabel}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg style={{ animation: 'spin 1s linear infinite', width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="none">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
