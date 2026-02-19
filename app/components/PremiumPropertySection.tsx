"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Room {
  title: string;
  description: string;
}

interface Property {
  name: string;
  subtitle: string;
  description: string;
  location: string;
  checkIn: string;
  checkOut: string;
  gallery: string[];
  rooms: Room[];
}

interface Props {
  property: Property;
  reverse?: boolean;
}

const PremiumPropertySection = ({ property, reverse = false }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const imageGrid = section.querySelector(".image-grid") as HTMLElement;
    const infoCard = section.querySelector(".info-card") as HTMLElement;
    const images = gsap.utils.toArray<HTMLElement>(".grid-image", section);

    // Timeline for this specific section (avoids conflicts if multiple sections)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1, // smooth follow of scroll
      },
    });

    // Animate image grid
    tl.fromTo(
      imageGrid,
      { x: window.innerWidth >= 1024 ? -200 : 0, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    );

    // Stagger individual images
    tl.fromTo(
      images,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
      "<0.2",
    );

    // Animate info card
    tl.fromTo(
      infoCard,
      { y: window.innerWidth >= 1024 ? 200 : 0, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "<0.3",
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-amber-500 text-sm mb-3">
            Premium Property
          </p>
          <h2 className="text-5xl md:text-6xl font-light">
            {property.name}
            <span className="block font-semibold mt-2 text-gray-800">
              {property.subtitle}
            </span>
          </h2>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg">
            {property.description}
          </p>
        </div>

        {/* Main Layout */}
        <div
          className={`lg:flex lg:gap-16 items-start flex-col lg:flex-row ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Left: Image Grid */}
          <div className="image-grid grid grid-cols-2 gap-4 lg:gap-6 lg:w-1/2 w-full mb-8 lg:mb-0">
            {property.gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative grid-image h-[250px] sm:h-[300px] md:h-[350px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Right: Info Card */}
          <div className="info-card bg-white p-12 rounded-3xl shadow-2xl flex flex-col justify-between lg:w-1/2 w-full">
            <div>
              <h3 className="text-3xl font-semibold mb-6">Property Info</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Check-in:</strong> {property.checkIn}
                </p>
                <p>
                  <strong>Check-out:</strong> {property.checkOut}
                </p>
              </div>

              <h4 className="text-2xl font-semibold mt-8 mb-4">Room Types</h4>
              <div className="space-y-4">
                {property.rooms.map((room, idx) => (
                  <div key={idx} className="border-l-4 border-amber-500 pl-4">
                    <p className="font-semibold text-gray-800">{room.title}</p>
                    <p className="text-gray-600 text-sm">{room.description}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-2xl font-semibold mt-8 mb-4">Facilities</h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                <li>✔ High-Speed WiFi</li>
                <li>✔ Daily Housekeeping</li>
                <li>✔ Clean Shared Kitchen</li>
                <li>✔ Shared Washrooms</li>
                <li>✔ Prime Location</li>
                <li>✔ Affordable Daily Rates</li>
              </ul>
            </div>

            <button className="mt-10 px-8 py-4 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition text-lg font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPropertySection;
