import Hero from '@/components/hero/Hero';
import CategoryGrid from '@/components/sections/CategoryGrid';
import ProductSection from '@/components/sections/ProductSection';
import ServicesPreview from '@/components/sections/ServicesPreview';
import WhyAquaPro from '@/components/sections/WhyAquaPro';
import ContactCTA from '@/components/sections/ContactCTA';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Shop by Category */}
      <CategoryGrid />

      {/* 03 — New Arrivals */}
      <ProductSection
        label="Just Arrived"
        title="New Arrivals"
        subtitle="The latest additions to our live fish and equipment collection."
        products={newArrivals}
        viewAllHref="/shop"
        viewAllLabel="View All Products"
        id="new-arrivals"
        accent="new"
      />

      {/* 04 — Featured Products */}
      <ProductSection
        label="Curated Selection"
        title="Featured Products"
        subtitle="Handpicked equipment and livestock recommended by our team."
        products={featured}
        viewAllHref="/shop"
        viewAllLabel="Browse All"
        id="featured-products"
        accent="featured"
      />

      {/* 05 — Services */}
      <ServicesPreview />

      {/* 06 — Why Aqua Pro */}
      <WhyAquaPro />

      {/* 07 — Contact CTA */}
      <ContactCTA />
    </>
  );
}
