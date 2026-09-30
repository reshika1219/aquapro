import type { Metadata } from 'next';
import EditorialPage from '@/components/layout/EditorialPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers about Aqua Pro orders, live fish, pickup, delivery, and aquarium support.',
};

export default function FaqPage() {
  return (
    <EditorialPage
      eyebrow="Helpful before you buy"
      title="Frequently asked questions"
      intro="A few practical answers for choosing livestock, equipment, delivery, and support."
      sections={[
        {
          title: 'Can I order live fish online?',
          body: <p>Yes. Live fish are available to add to your order, but they require collection from the Aqua Pro store rather than courier delivery.</p>,
        },
        {
          title: 'Can equipment be delivered?',
          body: <p>Equipment orders can use the available delivery option at checkout. Delivery details are confirmed when the order is reviewed.</p>,
        },
        {
          title: 'Can you help me choose a setup?',
          body: <p>Yes. Contact us with your tank size, experience, and the kind of aquarium you want to keep. We can recommend a practical starting point.</p>,
        },
        {
          title: 'Do you build or maintain aquariums?',
          body: <p>Our services include custom aquarium work, aquascaping, maintenance, and water-care guidance. Use the services page or contact form to start an inquiry.</p>,
        },
        {
          title: 'What happens if I need help after ordering?',
          body: <p>Keep your order details nearby and contact Aqua Pro by phone, email, or WhatsApp. We can help with order questions and care guidance.</p>,
        },
        {
          title: 'Still have a question?',
          body: <p>Send us the details and we will point you in the right direction.</p>,
        },
      ]}
      action={{ href: '/contact', label: 'Ask Aqua Pro' }}
    />
  );
}
