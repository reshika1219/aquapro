import Link from 'next/link';
import styles from './WhyAquaPro.module.css';

const reasons = [
  {
    title: 'Biological Quarantine Protocol',
    description: 'Every live fish undergoes a strict conditioning and quarantine process before sale. Zero shortcuts on livestock health.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Precision Ultra-Clear Glass',
    description: 'Custom rimless tanks built with ultra-low iron opti-white glass and high-tensile structural German silicone.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'Curated World-Class Brands',
    description: 'We test and stock only equipment we trust in our personal gallery tanks — from Chihiros and ADA to SunSun.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
  {
    title: 'Lifelong Aquarist Guidance',
    description: 'Direct WhatsApp support with seasoned aquarists whenever you need water tests, plant advice, or compatibility checks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '500+', label: 'Exotic Species' },
  { value: '10+', label: 'Years Experience' },
  { value: '5.0 ★', label: 'Customer Rating' },
  { value: '100%', label: 'Health Certified' },
];

export default function WhyAquaPro() {
  return (
    <section className={`section ${styles.section}`} id="why-aqua-pro">
      <div className="container">
        <div className={styles.layout}>

          {/* Left column */}
          <div className={styles.left}>
            <span className="section-eyebrow">The Aqua Pro Standard</span>
            <h2 className="section-title">Dedicated to the Art of Aquatics</h2>

            <p className={styles.leadText}>
              We are dedicated aquarists sharing a discipline that balances biological science,
              Japanese nature aquarium principles, and precision glass craftsmanship.
            </p>

            {/* Stats */}
            <div className={styles.stats}>
              {stats.map(stat => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statVal}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.ctaRow}>
              <Link href="/about" className="btn btn--ghost btn--sm">
                About Our Heritage
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width={14} height={14}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right column: reasons */}
          <div className={styles.right}>
            {reasons.map(reason => (
              <div key={reason.title} className={styles.reasonCard}>
                <div className={styles.reasonIcon}>{reason.icon}</div>
                <div className={styles.reasonBody}>
                  <h3 className={styles.reasonTitle}>{reason.title}</h3>
                  <p className={styles.reasonDesc}>{reason.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
