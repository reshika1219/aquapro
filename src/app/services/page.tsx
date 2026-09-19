import Link from 'next/link';
import Button from '@/components/ui/Button';
import siteConfig from '@/data/site.json';
import styles from './Services.module.css';

export const metadata = {
  title: 'Bespoke Aquarium & Aquascaping Services',
  description:
    'Custom glass & acrylic tanks, professional maintenance, biotope design, and water quality testing by Aqua Pro Sri Lanka.',
};

const servicesList = [
  {
    id: 'custom-builds',
    title: 'Custom Aquarium Design & Engineering',
    desc: 'From architectural living wall aquariums to rimless ultra-clear glass scapes, we design and build bespoke systems engineered for long-term ecological balance.',
    features: [
      'Ultra-clear Starphire low-iron glass fabrication',
      'Architectural built-in cabinetry & steel frames',
      'Sump & plumbing system architecture',
      'Integrated LED spectrum setup',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75Zm0 0L12 12m0 0 8.25 8.25M12 12 3.75 20.25M12 12l8.25-8.25" />
      </svg>
    ),
  },
  {
    id: 'aquascaping-mastery',
    title: 'Aquascaping Design & Installation',
    desc: 'Transform your space into a pristine underwater garden inspired by Nature Aquarium aesthetics, Iwagumi rockwork, or dense Ryoboku hardscapes.',
    features: [
      'Premium imported Seyriu rock & Malaysian driftwood',
      'Substrate stratification & root nourishment',
      'Curated tissue-culture plant selections',
      'CO2 injection calibration & tuning',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
      </svg>
    ),
  },
  {
    id: 'maintenance',
    title: 'Routine Maintenance & Care Contracts',
    desc: 'Keep your aquatic ecosystem thriving without lifting a finger. Our certified aquarists perform periodic water changes, filter maintenance, and plant trimming.',
    features: [
      'Weekly or bi-weekly scheduled visits',
      '20–40% water replacement & gravel siphoning',
      'Filter media rejuvenation & impeller cleaning',
      'Livestock health check & nutrition audit',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-4.486c.013-.315-.011-.632-.075-.942a6.37 6.37 0 0 0-1.89-3.238 6.37 6.37 0 0 0-3.238-1.89 4.498 4.498 0 0 0-5.428 5.428c.048.58.024 1.193-.14 1.743" />
      </svg>
    ),
  },
  {
    id: 'water-analysis',
    title: 'Water Chemistry & Lab Diagnostics',
    desc: `Unexplained algae blooms or fish distress? Bring a water sample to our ${siteConfig.locationShort} store or request on-site parameter profiling for pH, KH, GH, Nitrate, Ammonia, and Phosphate.`,
    features: [
      'High-precision digital photometer testing',
      'Algae root cause diagnostics',
      'Dosing regime & mineral remineralization plan',
      'Detailed water quality audit report',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M9.75 3.104c.251.023.501.05.75.082m0 0a24.3 24.3 0 0 1 4.5 0" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className={styles.servicesHeader}>
        <div className="container">
          <h1 className={styles.title}>Master Aquatics & Consultancy</h1>
          <p className={styles.subtitle}>
            From custom glass architectural installations to complete maintenance packages, our expert team elevates aquatic living in Sri Lanka.
          </p>
        </div>
      </section>

      <section className="container">
        <div className={styles.servicesGrid}>
          {servicesList.map(service => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.iconBox}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <ul className={styles.featureList}>
                {service.features.map((feat, i) => (
                  <li key={i} className={styles.featureItem}>{feat}</li>
                ))}
              </ul>
              <Button href={`/contact?subject=${service.id}`} variant="outline" size="sm">
                Request Service Consultation
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Need a Custom Project Proposal?</h2>
          <p className={styles.ctaDesc}>
            Whether for your luxury residence, hotel lobby, or corporate lounge, we deliver turn-key aquarium ecosystems tailored to your exact specifications.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/contact" variant="primary" size="lg">
              Book On-Site Consultation
            </Button>
            <Button href={`https://wa.me/${siteConfig.whatsapp}`} variant="secondary" size="lg" external>
              Chat with Master Aquarist
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
