import Button from '@/components/ui/Button';
import styles from './Offers.module.css';

export const metadata = {
  title: 'Exclusive Offers & Bundles',
  description:
    'Explore curated aquarium starter kits, filtration bundles, and promotional prices at Aqua Pro Sri Lanka.',
};

const offers = [
  {
    id: 'aquascape-starter',
    badge: 'SAVE 15%',
    title: 'Complete Aquascaping Starter Bundle',
    desc: 'Includes 30L Rimless Low-Iron Glass Tank, Hang-On Back Canister Filter, Full-Spectrum LED Light, and Premium Plant Substrate.',
    specialPrice: 'LKR 42,500',
    originalPrice: 'LKR 50,000',
    link: '/shop/aquascaping',
  },
  {
    id: 'filtration-pack',
    badge: 'HOT DEAL',
    title: 'Oase BioMaster Thermo 350 + Media Pack',
    desc: 'Premium German canister filter with integrated heater, complete with matrix bio-media and pre-filter replacement pads.',
    specialPrice: 'LKR 89,000',
    originalPrice: 'LKR 98,000',
    link: '/shop/filtration',
  },
  {
    id: 'water-care-kit',
    badge: 'SPECIAL',
    title: 'Seachem Master Water Care Bundle',
    desc: 'Seachem Prime 500ml, Stability 500ml, and Pristine 500ml — essential trio for rapid tank cycling and water clarity.',
    specialPrice: 'LKR 16,800',
    originalPrice: 'LKR 19,500',
    link: '/shop/water-care',
  },
  {
    id: 'discus-nutrition',
    badge: 'LIMITED STOCK',
    title: 'Hikari Tropical Discus Pro Nutrition Combo',
    desc: '3 Pack of Hikari Tropical Discus Bio-Gold (80g) high-protein color enhancing granules.',
    specialPrice: 'LKR 9,200',
    originalPrice: 'LKR 11,000',
    link: '/shop/fish-food',
  },
];

export default function OffersPage() {
  return (
    <>
      <section className={styles.offersHeader}>
        <div className="container">
          <h1 className={styles.title}>Exclusive Offers & Packages</h1>
          <p className={styles.subtitle}>
            Hand-curated bundles and promotional pricing on top-tier aquatic equipment and supplies.
          </p>
        </div>
      </section>

      <section className="container">
        <div className={styles.offersGrid}>
          {offers.map(item => (
            <div key={item.id} className={styles.offerCard}>
              <span className={styles.badge}>{item.badge}</span>
              <div className={styles.cardBody}>
                <h3 className={styles.offerTitle}>{item.title}</h3>
                <p className={styles.offerDesc}>{item.desc}</p>
                <div className={styles.priceRow}>
                  <span className={styles.specialPrice}>{item.specialPrice}</span>
                  <span className={styles.originalPrice}>{item.originalPrice}</span>
                </div>
                <Button href={item.link} variant="primary" fullWidth>
                  Shop Offer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
