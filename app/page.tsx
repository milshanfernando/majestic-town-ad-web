import Hero from "./components/Hero";
import Promotions from "./components/Promotions";
import Welcome from "./components/Welcome";

export default function Home() {
  // const galleryImages = Array.from(
  //   { length: 24 },
  //   (_, i) => `/images/${i + 1}.jpeg`,
  // );
  return (
    <main className="w-dvw overflow-hidden">
      {/* <Navbar /> */}
      <Hero />
      <Welcome />
      <Promotions />
    </main>
  );
}
