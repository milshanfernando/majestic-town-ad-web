import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import Hero from "./components/Hero";
import ReviewsSection from "./components/ReviewsSection";
import RoomsSection from "./components/RoomsSection";

export default function Home() {
  return (
    <main className=" w-dvw overflow-hidden">
      <Hero />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <ReviewsSection />
    </main>
  );
}
