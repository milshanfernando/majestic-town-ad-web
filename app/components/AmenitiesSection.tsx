"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".amenity-card", {
          scrollTrigger: {
            trigger: ".amenities-wrapper",
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-gray-50 py-20 px-6">
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
            className="amenity-card bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
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
