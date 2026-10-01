import styles from './StorePromises.module.css';

const promises = [
  {
    title: 'Quarantine Certified',
    description: 'Every live fish is quarantined & conditioned for peak vitality.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Pristine Flora & Fauna',
    description: 'Fresh aquatic plants & hand-selected exotic livestock.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.444 5.333-6 9.333-4 13 1 2 3 3 4 3s3-1 4-3c2-3.667.444-7.667-4-13Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0 4 0 6 0 7M8 15c-2-1-3-3-2-5" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Safe Islandwide Transit',
    description: 'Specialized oxygenated packing & secure courier delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Master Aquarist Support',
    description: 'Direct WhatsApp guidance from setup to water chemistry care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export default function StorePromises() {
  return (
    <section className={styles.section} aria-label="Aqua Pro quality standards">
      <div className="container">
        <div className={styles.grid}>
          {promises.map(promise => (
            <div key={promise.title} className={styles.item}>
              <div className={styles.iconWrap} aria-hidden="true">
                {promise.icon}
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{promise.title}</h3>
                <p className={styles.description}>{promise.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
