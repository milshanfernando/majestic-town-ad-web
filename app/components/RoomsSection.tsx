"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    type: "Single Room",
    description: "Cozy single room with shared washroom and kitchen access.",
    img: "/images/singlebed.jpeg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
  {
    type: "Queen Room",
    description:
      "Spacious queen room with shared washroom and kitchen facilities.",
    img: "/images/queen.jpeg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
  {
    type: "King Room",
    description: "Luxury king room with shared washroom and kitchen access.",
    img: "/images/kingbed.jpeg",
    features: ["WiFi", "AC", "Shared Kitchen"],
  },
];

const RoomsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const subtitle = section.querySelector("p");
    const title = section.querySelector("h2");
    const cards = gsap.utils.toArray<HTMLElement>(".room-card");

    // Animate subtitle
    if (subtitle) {
      gsap.from(subtitle, {
        y: 50,
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
        y: 50,
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

    // Animate cards with smooth stagger and slight scale
    gsap.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      stagger: 0.25,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
      },
    });

    // Cleanup ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="sec w-full bg-gray-50 py-20 px-6">
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
            className="room-card bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transform-gpu"
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
