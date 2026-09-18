export const metadata = {
  title: 'Terms & Conditions | Aqua Pro',
  description: 'Aqua Pro Terms of Service, Store Pickup Policies, and Live Guarantee terms.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '5rem' }} className="container">
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--pure-white)' }}>
        Terms & Conditions
      </h1>
      <div style={{ color: 'var(--gray-300)', lineHeight: '1.8', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>
          Welcome to <strong>Aqua Pro</strong>. By accessing our website or placing an order, you agree to be bound by the following terms and conditions.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>1. Live Fish & Live Plants Policy</h3>
        <p>
          For the health and welfare of live aquatic organisms, live fish and shrimp are strictly available via <strong>In-Store Pickup</strong> at our Athurugiriya showroom only. Courier delivery is disabled for live stock.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>2. Payment Options</h3>
        <p>
          We accept <strong>Cash on Delivery (COD)</strong> for equipment & supply deliveries within Sri Lanka, as well as <strong>Pay at Store</strong> upon pickup.
        </p>
        <h3 style={{ color: 'var(--pure-white)', marginTop: '1rem' }}>3. Warranty & Returns</h3>
        <p>
          Electrical equipment (heaters, pumps, filter heads) comes with manufacturer defect warranty as specified on the product documentation. Returns are accepted within 7 days of purchase for unopened items.
        </p>
      </div>
    </div>
  );
}
