import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterSection from "@/components/FilterSection";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FilterSection />
      <FeaturedPlaces />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Index;
