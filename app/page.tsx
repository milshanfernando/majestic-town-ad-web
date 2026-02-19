import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import BentoInfiniteGallery from "./components/BentoInfiniteGallery";
import Hero from "./components/Hero";
import PropertySection from "./components/PropertySection";
import ReviewsSection from "./components/ReviewsSection";
import RoomsSection from "./components/RoomsSection";

export default function Home() {
  const galleryImages = Array.from(
    { length: 24 },
    (_, i) => `/images/${i + 1}.jpeg`,
  );
  return (
    <main className=" w-dvw overflow-hidden">
      <Hero />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <BentoInfiniteGallery images={galleryImages} />
      <PropertySection />
      <ReviewsSection />
    </main>
  );
}
