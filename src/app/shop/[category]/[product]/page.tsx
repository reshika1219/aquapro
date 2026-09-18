import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductBySlug, getCategoryBySlug } from '@/lib/products';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProductActions from './ProductActions';
import styles from './Product.module.css';

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.product);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.product);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categoryId);
  const hasSale = 'salePrice' in product && product.salePrice !== undefined;
  const displayPrice = hasSale ? product.salePrice! : product.price;

  return (
    <div className="container section">
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/shop">Shop</Link>
        <span className={styles.separator}>/</span>
        {category && (
          <>
            <Link href={`/shop/${category.slug}`}>{category.name}</Link>
            <span className={styles.separator}>/</span>
          </>
        )}
        <span className={styles.current}>{product.name}</span>
      </nav>

      <div className={styles.layout}>
        {/* Images */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            {product.images.length > 0 ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                width={product.images[0].width}
                height={product.images[0].height}
                priority
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
              </div>
            )}
            <div className={styles.badges}>
              {hasSale && (
                <Badge variant="sale" showDot={false}>
                  -{getDiscountPercent(product.price, product.salePrice!)}%
                </Badge>
              )}
              {product.newArrival && <Badge variant="new">New</Badge>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.shortDesc}>{product.shortDescription}</p>

            <div className={styles.priceRow}>
              <span className={`${styles.price} ${hasSale ? styles.salePrice : ''}`}>
                {formatPrice(displayPrice)}
              </span>
              {hasSale && (
                <span className={styles.originalPrice}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Client component for add to cart / wishlist logic */}
          <ProductActions product={product} />

          <div className={styles.divider} />

          {/* Specs / Details */}
          <div className={styles.details}>
            <h2>Product Details</h2>
            <p className={styles.description}>{product.description}</p>

            {product.type === 'fish' ? (
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Care Level</span>
                  <span className={styles.specValue}>{product.careLevel}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Temperament</span>
                  <span className={styles.specValue}>{product.temperament}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Adult Size</span>
                  <span className={styles.specValue}>{product.adultSize}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Min Tank Size</span>
                  <span className={styles.specValue}>{product.minimumTankSize}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Temperature</span>
                  <span className={styles.specValue}>{product.waterTemperature}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Diet</span>
                  <span className={styles.specValue}>{product.diet}</span>
                </div>
              </div>
            ) : (
              <div className={styles.specsGrid}>
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specLabel}>{key}</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
