import type { Metadata } from 'next';
import EditorialPage from '@/components/layout/EditorialPage';
import siteConfig from '@/data/site.json';

export const metadata: Metadata = {
  title: 'Shipping & Pickup',
  description: 'Aqua Pro delivery and store pickup information.',
};

export default function ShippingPage() {
  return (
    <EditorialPage
      eyebrow="Before checkout"
      title="Shipping and pickup"
      intro="Choose the option that suits what you are buying. Live fish and other delicate items may need to be collected from our store."
      sections={[
        {
          title: 'Store pickup',
          body: <p>Collect eligible orders from our store in Galnewa. Live fish must be collected in person so they can travel home safely.</p>,
        },
        {
          title: 'Equipment delivery',
          body: <p>Equipment orders can be arranged for delivery. The available method and any delivery cost are shown or confirmed during checkout.</p>,
        },
        {
          title: 'Packing',
          body: <p>We pack aquarium products with their fragility and travel distance in mind. Contact us before ordering if you have a special handling concern.</p>,
        },
        {
          title: 'Need an update?',
          body: <p>For an order question, contact us with your order details at {siteConfig.phone} or through the contact page.</p>,
        },
      ]}
      action={{ href: '/contact', label: 'Contact about delivery' }}
    />
  );
}
