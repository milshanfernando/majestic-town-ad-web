"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiWifi, HiHome, HiShieldCheck } from "react-icons/hi";
import { MdKitchen, MdCleaningServices, MdOutlineAir } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    icon: <HiWifi className="text-3xl text-amber-500" />,
    title: "High-Speed WiFi",
  },
  {
    icon: <MdOutlineAir className="text-3xl text-amber-500" />,
    title: "Air Conditioning",
  },
  {
    icon: <MdKitchen className="text-3xl text-amber-500" />,
    title: "Shared Kitchen",
  },
  {
    icon: <MdCleaningServices className="text-3xl text-amber-500" />,
    title: "Daily Housekeeping",
  },
  {
    icon: <HiHome className="text-3xl text-amber-500" />,
    title: "Comfortable Beds",
  },
  {
    icon: <HiShieldCheck className="text-3xl text-amber-500" />,
    title: "CCTV & Security",
  },
];

const AmenitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const subtitle = section.querySelector("p");
    const title = section.querySelector("h2");
    const cards = gsap.utils.toArray<HTMLElement>(".amenity-card");

    // Animate subtitle
    if (subtitle) {
      gsap.from(subtitle, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 70%",
          scrub: 0.8,
        },
      });
    }

    // Animate title
    if (title) {
      gsap.from(title, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 65%",
          scrub: 0.9,
        },
      });
    }

    // Animate cards
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      scale: 0.95,
      stagger: 0.2,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="uppercase tracking-[4px] text-amber-500 text-xs sm:text-sm mb-2">
          Amenities
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
          Designed For Your Comfort
          <span className="block font-semibold">Everything You Need</span>
        </h2>
      </div>

      <div className="amenities-wrapper grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="amenity-card bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform-gpu"
          >
            <div className="mb-4">{amenity.icon}</div>
            <h3 className="font-semibold text-lg">{amenity.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AmenitiesSection;
