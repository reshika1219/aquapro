'use client';

import { useState, FormEvent } from 'react';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import siteConfig from '@/data/site.json';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <>
      <section className={styles.contactHeader}>
        <div className="container">
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have questions about custom aquariums, live fish care, or store visits? Our master aquarists are ready to assist.
          </p>
        </div>
      </section>

      <section className="container">
        <div className={styles.contactGrid}>
          {/* Information */}
          <div className={styles.infoSection}>
            {/* Store Location */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>Showroom & Store</h3>
              </div>
              <div className={styles.cardText}>
                <p><strong>Aqua Pro Headquarters</strong></p>
                <p>{siteConfig.address}</p>
                <p style={{ marginTop: '8px', color: 'var(--gray-400)' }}>
                  Visit our physical showroom to experience live aquascapes, view exotic livestock, and consult with our specialists.
                </p>
              </div>
            </div>

            {/* Direct Lines */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>Direct Channels</h3>
              </div>
              <div className={styles.cardText}>
                <p>Phone: <a href={`tel:+${siteConfig.whatsapp}`}>{siteConfig.phone}</a></p>
                <p>WhatsApp: <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">Instant Chat on WhatsApp</a></p>
                <p>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
              </div>
            </div>

            {/* Business Hours */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>Operating Hours</h3>
              </div>
              <div className={styles.hoursList}>
                <div className={styles.hoursRow}>
                  <span>Monday – Saturday:</span>
                  <span style={{ color: 'var(--aqua)' }}>9:00 AM – 7:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday & Poya Days:</span>
                  <span style={{ color: 'var(--aqua)' }}>10:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send an Inquiry</h2>
            <p className={styles.formDesc}>
              Fill in your details below and our team will respond within 24 business hours.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                ✓ Thank you! Your message has been sent. Our team will contact you shortly.
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">Full Name *</label>
                  <input className={styles.input} id="name" type="text" required placeholder="e.g. Ruwan Silva" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">Email Address *</label>
                  <input className={styles.input} id="email" type="email" required placeholder="name@example.com" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="phone">Phone Number *</label>
                  <input className={styles.input} id="phone" type="tel" required placeholder="07X XXX XXXX" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="subject">Subject</label>
                  <select className={styles.select} id="subject" defaultValue="custom-aquarium">
                    <option value="custom-aquarium">Custom Aquarium Inquiry</option>
                    <option value="maintenance">Maintenance & Service Request</option>
                    <option value="livestock">Live Fish & Plant Stock Check</option>
                    <option value="order">Order Status Query</option>
                    <option value="other">General Question</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="message">Message *</label>
                  <textarea className={styles.textarea} id="message" required placeholder="Describe your requirement or question in detail..." />
                </div>

                <Button type="submit" variant="primary" fullWidth loading={submitting}>
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`container ${styles.mapSection}`}>
        <div className={styles.mapCard}>
          <iframe
            className={styles.mapIframe}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.984186548773!2d79.995!3d6.885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMDYuMCJOIDc5wrA1OSczMC4wIkU!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk"
            allowFullScreen
            loading="lazy"
            title="Aqua Pro Showroom Location Map"
          />
        </div>
      </section>
    </>
  );
}
