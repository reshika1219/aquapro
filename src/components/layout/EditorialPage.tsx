import Link from 'next/link';
import styles from './EditorialPage.module.css';

interface EditorialSection {
  title: string;
  body: React.ReactNode;
}

interface EditorialPageProps {
  eyebrow?: string;
  title: string;
  intro: string;
  sections: EditorialSection[];
  action?: { href: string; label: string };
}

export default function EditorialPage({ eyebrow, title, intro, sections, action }: EditorialPageProps) {
  return (
    <div className="container section">
      <header className={styles.header}>
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <div className={styles.body}>
        {sections.map(section => (
          <section key={section.title} className={styles.section}>
            <h2>{section.title}</h2>
            <div className={styles.copy}>{section.body}</div>
          </section>
        ))}
      </div>

      {action && (
        <Link href={action.href} className="btn btn--primary">
          {action.label}
        </Link>
      )}
    </div>
  );
}
