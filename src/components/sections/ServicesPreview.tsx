import Link from 'next/link';
import styles from './ServicesPreview.module.css';

const services = [
  {
    id: 'custom-builds',
    number: '01',
    title: 'Custom Aquarium Builds',
    description: 'Bespoke rimless aquariums engineered to architectural specifications. From minimalist nano biotopes to monumental living wall centerpieces.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    ctaLabel: 'Inquire About Custom Builds',
  },
  {
    id: 'setup-installation',
    number: '02',
    title: 'Precision Aquascaping & Setup',
    description: 'Complete hardscaping with Ryuoh stone, driftwood, sub-surface nutrient layering, biological cycling, and high-tech CO2 injection.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    ctaLabel: 'Schedule Installation',
  },
  {
    id: 'maintenance',
    number: '03',
    title: 'Routine Care & Water Balancing',
    description: 'Scheduled on-site maintenance, precision water parameter testing, algae management, and botanical trimming for residential and corporate tanks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    ctaLabel: 'Book Care Service',
  },
];

export default function ServicesPreview() {
  return (
    <section className={`section ${styles.section}`} id="services-preview">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-eyebrow">Expertise & Craft</span>
            <h2 className="section-title">Bespoke Aquatics & Installation</h2>
            <p className="section-subtitle">
              End-to-end aquarium engineering — from custom glass fabrication to lifelong biological ecosystem care.
            </p>
          </div>
          <div className={styles.headerRight}>
            <Link href="/services" className="btn btn--ghost btn--sm">
              All Services
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={14} height={14}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map(service => (
            <Link
              key={service.id}
              href={`/contact?subject=${service.id}`}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{service.number}</span>
                <div className={styles.iconWrap}>{service.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <span className={styles.cardCta}>
                {service.ctaLabel}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerText}>
            <h3>Planning a Custom Aquatic Project?</h3>
            <p>Consult with our lead aquarists. We offer tailored site evaluations and 3D architectural plans.</p>
          </div>
          <div className={styles.ctaBannerActions}>
            <Link href="/contact" className="btn btn--primary btn--sm">
              Request Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
