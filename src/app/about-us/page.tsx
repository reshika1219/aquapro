import type { Metadata } from 'next';
import EditorialPage from '@/components/layout/EditorialPage';
import siteConfig from '@/data/site.json';

export const metadata: Metadata = {
  title: 'About Aqua Pro',
  description: 'Learn about Aqua Pro, our aquarium work, and the people behind the store.',
};

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="About Aqua Pro"
      title="A practical aquarium shop, built around the hobby."
      intro="Aqua Pro brings live aquatics, equipment, custom aquarium work, and straightforward advice together for fishkeepers in Sri Lanka."
      sections={[
        {
          title: 'What we do',
          body: (
            <>
              <p>We help people choose, build, stock, and care for aquariums at every stage, from a first tank to a carefully tuned planted setup.</p>
              <p>Our work includes live fish, aquarium plants, equipment, custom builds, and aquascaping support.</p>
            </>
          ),
        },
        {
          title: 'How we work',
          body: (
            <>
              <p>We start with the conditions that matter: tank size, water, livestock compatibility, maintenance, and the space the aquarium will live in.</p>
              <p>The recommendation should fit the keeper, not just the product shelf.</p>
            </>
          ),
        },
        {
          title: 'Visit or message us',
          body: (
            <>
              <p>Find us at <strong>{siteConfig.address}</strong>.</p>
              <p>Call {siteConfig.phone} or send a message before visiting if you are checking for a specific fish, plant, or piece of equipment.</p>
            </>
          ),
        },
      ]}
      action={{ href: '/contact', label: 'Talk to Aqua Pro' }}
    />
  );
}
