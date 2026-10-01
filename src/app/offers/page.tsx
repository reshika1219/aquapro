import Button from '@/components/ui/Button';
import offersData from '@/data/offers.json';
import { getWhatsAppLink } from '@/lib/utils';
import styles from './Offers.module.css';

export const metadata = {
  title: 'Exclusive Offers & Bundles',
  description:
    'Explore curated aquarium starter kits, filtration bundles, and promotional prices at Aqua Pro Sri Lanka.',
};

export default function OffersPage() {
  const offers = offersData;

  return (
    <>
      <section className={styles.offersHeader}>
        <div className="container">
          <span className={styles.eyebrow}>Limited Time Specials</span>
          <h1 className={styles.title}>Exclusive Offers & Packages</h1>
          <p className={styles.subtitle}>
            Hand-curated bundles and promotional pricing on top-tier aquatic equipment and supplies.
          </p>
        </div>
      </section>

      <section className="container">
        <div className={styles.offersGrid}>
          {offers.map(item => (
            <article key={item.id} className={styles.offerCard}>
              <div className={styles.cardHeader}>
                <span className={styles.badge}>{item.badge}</span>
                <span className={styles.categoryBadge}>{item.categorySlug.replace('-', ' ')}</span>
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.offerTitle}>{item.title}</h2>
                <p className={styles.offerDesc}>{item.desc}</p>
                <div className={styles.priceRow}>
                  <span className={styles.specialPrice}>{item.specialPrice}</span>
                  <span className={styles.originalPrice}>{item.originalPrice}</span>
                </div>
                <div className={styles.offerActions}>
                  <Button href={`/contact?subject=${item.contactSubject}`} variant="primary" fullWidth>
                    Request This Offer
                  </Button>
                  <Button
                    href={getWhatsAppLink(item.whatsappMessage)}
                    variant="secondary"
                    fullWidth
                    external
                  >
                    WhatsApp Us
                  </Button>
                  <Button href={`/shop/${item.categorySlug}`} variant="outline" fullWidth>
                    Browse {item.categorySlug.replace('-', ' ')}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
