'use client';

import { useState, FormEvent, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import styles from './Contact.module.css';

const SUBJECT_OPTIONS = [
  { value: 'custom-aquarium', label: 'Custom Aquarium Inquiry' },
  { value: 'custom-builds', label: 'Custom Aquarium Design & Engineering' },
  { value: 'aquascaping-mastery', label: 'Aquascaping Design & Installation' },
  { value: 'maintenance', label: 'Maintenance & Service Request' },
  { value: 'water-analysis', label: 'Water Chemistry & Lab Diagnostics' },
  { value: 'livestock', label: 'Live Fish & Plant Stock Check' },
  { value: 'order', label: 'Order Status Query' },
  { value: 'offer-aquascape-starter', label: 'Offer: Aquascaping Starter Bundle' },
  { value: 'offer-filtration-pack', label: 'Offer: Filtration Pack' },
  { value: 'offer-water-care-kit', label: 'Offer: Water Care Bundle' },
  { value: 'offer-discus-nutrition', label: 'Offer: Discus Nutrition Combo' },
  { value: 'other', label: 'General Question' },
] as const;

function resolveSubject(param: string | null): string {
  if (!param) return 'custom-aquarium';
  const known = SUBJECT_OPTIONS.find(o => o.value === param);
  if (known) return known.value;
  if (param.startsWith('offer-')) return param;
  return 'other';
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = useMemo(
    () => resolveSubject(searchParams.get('subject')),
    [searchParams],
  );

  const [subject, setSubject] = useState(initialSubject);

  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject,
          message: formData.get('message'),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        ✓ Thank you! Your message has been sent. Our team will contact you shortly.
      </div>
    );
  }

  return (
    <>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Full Name *</label>
          <input className={styles.input} id="name" name="name" type="text" required placeholder="e.g. Ruwan Silva" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email Address *</label>
          <input className={styles.input} id="email" name="email" type="email" required placeholder="name@example.com" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phone">Phone Number *</label>
          <input className={styles.input} id="phone" name="phone" type="tel" required placeholder="07X XXX XXXX" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subject">Subject</label>
          <select
            className={styles.select}
            id="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          >
            {SUBJECT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Message *</label>
          <textarea className={styles.textarea} id="message" name="message" required placeholder="Describe your requirement or question in detail..." />
        </div>

        <Button type="submit" variant="primary" fullWidth loading={submitting}>
          Submit Inquiry
        </Button>
      </form>
    </>
  );
}
