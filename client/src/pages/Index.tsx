import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import SpecialOffer from "@/components/SpecialOffer";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <SpecialOffer />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
