"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    type: "Single Room",
    description: "Cozy single room with shared washroom and kitchen access.",
    img: "/images/singlebed.jpg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
  {
    type: "Queen Room",
    description:
      "Spacious queen room with shared washroom and kitchen facilities.",
    img: "/images/queenbed.jpg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
  {
    type: "King Room",
    description: "Luxury king room with shared washroom and kitchen access.",
    img: "/images/kingbed.jpg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
];

const RoomsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".room-card", {
          scrollTrigger: {
            trigger: ".rooms-wrapper",
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
          Our Rooms
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
          Comfortable Options
          <span className="block font-semibold">For Every Guest</span>
        </h2>
      </div>

      <div className="rooms-wrapper grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="room-card bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="relative h-64 w-full">
              <Image
                src={room.img}
                alt={room.type}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {room.features.map((feature, i) => (
                  <span
                    key={i}
                    className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href="https://wa.me/971XXXXXXXXX"
                target="_blank"
                className="mt-auto inline-block text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-full transition"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
