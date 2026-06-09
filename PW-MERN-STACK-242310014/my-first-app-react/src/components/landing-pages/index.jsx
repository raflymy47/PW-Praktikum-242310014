import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/herosection";
import { FeaturedBooksSection } from "./components/featuredbookssection";
import { CategoriesSection } from "./components/categoriessection";
import { TestimonSection } from "./components/testimonsection";
import { Footers } from "./components/footers";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedBooksSection />
      <CategoriesSection />
      <TestimonSection />
      <Footers />
    </>
  );
}