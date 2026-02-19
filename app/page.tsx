import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import LuxuryGallery from "./components/DiamondGallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PropertySection from "./components/PropertySection";
import ReviewsSection from "./components/ReviewsSection";
import RoomsSection from "./components/RoomsSection";

export default function Home() {
  const galleryImages = Array.from(
    { length: 24 },
    (_, i) => `/images/${i + 1}.jpeg`,
  );
  return (
    <main className="w-dvw overflow-hidden pt-20">
      <Navbar />
      <Hero />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />

      <PropertySection />
      <LuxuryGallery images={galleryImages} />
      <ReviewsSection />
    </main>
  );
}
