import styles from './StorePromises.module.css';

const promises = [
  {
    title: 'Healthy live stock',
    description: 'Selected and cared for by aquarists who keep the hobby close.',
  },
  {
    title: 'Aquatic plants',
    description: 'Fresh greenery for planted tanks, from beginner to high-tech.',
  },
  {
    title: 'Islandwide delivery',
    description: 'Equipment and aquarium essentials packed for the journey.',
  },
  {
    title: 'Practical advice',
    description: 'Clear guidance before and after you bring something home.',
  },
];

export default function StorePromises() {
  return (
    <section className={styles.section} aria-label="Aqua Pro shopping benefits">
      <div className="container">
        <div className={styles.grid}>
          {promises.map(promise => (
            <div key={promise.title} className={styles.item}>
              <span className={styles.marker} aria-hidden="true" />
              <div>
                <h2>{promise.title}</h2>
                <p>{promise.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
