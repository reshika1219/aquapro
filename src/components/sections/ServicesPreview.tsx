import Link from 'next/link';
import styles from './ServicesPreview.module.css';

const services = [
  {
    id: 'custom-builds',
    number: '01',
    title: 'Custom Aquarium Builds',
    description: 'Bespoke aquarium design and construction tailored to your space. From intimate nano setups to dramatic statement pieces — built from scratch to your exact vision.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    ctaLabel: 'Get a free quote',
  },
  {
    id: 'aquascaping-mastery',
    number: '02',
    title: 'Setup & Installation',
    description: 'Professional aquarium setup covering filtration, cycling, and aquascaping. We do the heavy lifting so you can enjoy a thriving tank from day one.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    ctaLabel: 'Schedule a setup',
  },
  {
    id: 'maintenance',
    number: '03',
    title: 'Maintenance & Advice',
    description: 'Regular maintenance services and expert consultation to keep your aquarium pristine. Available for home and commercial setups alike.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    ctaLabel: 'Book a service',
  },
];

export default function ServicesPreview() {
  return (
    <section className={`section ${styles.section}`} id="services-preview">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-eyebrow">Services</span>
            <h2 className="section-title">More Than a Shop</h2>
            <p className="section-subtitle">
              End-to-end aquarium services — from first consultation to long-term care.
            </p>
          </div>
          <Link href="/services" className="btn btn--ghost">
            All Services
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={14} height={14}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {services.map(service => (
            <Link
              key={service.id}
              href={`/contact?subject=${service.id}`}
              className={styles.card}
            >
              <span className={styles.cardNumber} aria-hidden="true">{service.number}</span>
              <div className={styles.iconWrap}>{service.icon}</div>
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
            <h3>Have something specific in mind?</h3>
            <p>Contact us — we love a good challenge, no project is too big or too small.</p>
          </div>
          <div className={styles.ctaBannerActions}>
            <Link href="/services" className="btn btn--ghost btn--sm">
              View All Services
            </Link>
            <Link href="/contact" className="btn btn--primary btn--sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
