export const metadata = {
  title: 'Privacy Policy | Aqua Pro',
  description: 'Aqua Pro Privacy Policy regarding customer personal data and privacy protections.',
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '5rem' }} className="container">
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--pure-white)' }}>
        Privacy Policy
      </h1>
      <div style={{ color: 'var(--gray-300)', lineHeight: '1.8', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>
          At <strong>Aqua Pro</strong>, we are committed to upholding the trust of our customers. This Privacy Policy outlines how your personal information is collected, used, and safeguarded when you visit or make a purchase from aquapro.lk.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>1. Information We Collect</h3>
        <p>
          When you place an order or contact us, we collect order information including your name, delivery address, phone number, and email address for order fulfillment and customer communication.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>2. How We Use Your Data</h3>
        <p>
          We strictly use your information to process cash-on-delivery orders, arrange store pickup for live fish, send order status updates via SMS or WhatsApp, and respond to technical support inquiries.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>3. Data Protection</h3>
        <p>
          Your data is stored securely and is never sold, leased, or shared with third-party marketers.
        </p>
      </div>
    </div>
  );
}
