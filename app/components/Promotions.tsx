"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const promos = [
  {
    image: "/images/single-v-2.jpeg",
    tag: "Seasonal Deal",
    badge: "20% OFF",
    title: "Summer Escape Rate",
    desc: "Limited summer pricing available June through August for all room types.",
  },
  {
    image: "/images/single-s.jpeg",
    tag: "Room Offer",
    badge: "Best Value",
    title: "Deluxe Single Suite",
    desc: "Premium mattress, blackout curtains, and a dedicated work desk included.",
  },
  {
    image: "/images/kingbed.jpeg",
    tag: "Long Stay",
    badge: "30% OFF",
    title: "Monthly Resident Plan",
    desc: "Stay 30+ nights and unlock resident perks — linen, locker & priority booking.",
  },
  {
    image: "/images/queen-s.jpeg",
    tag: "Weekend Pack",
    badge: "Free Upgrade",
    title: "Weekend Getaway",
    desc: "Friday–Sunday stay with complimentary late checkout at 2 PM.",
  },
];

const Promotions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-up"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        },
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".promo-card"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-950 text-white overflow-hidden py-28"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[400px] rounded-full bg-amber-500/4 blur-[140px] z-0" />

      {/* ── Heading ── */}
      <div ref={headingRef} className="relative z-10 text-center px-6 mb-16">
        <p className="reveal-up uppercase tracking-[5px] text-amber-400 text-[10px] sm:text-xs font-medium mb-4">
          Exclusive Offers
        </p>
        <h2 className="reveal-up text-2xl sm:text-2xl font-extralight leading-[1.1]">
          Deals crafted{" "}
          <span className="font-bold italic text-amber-300">
            for every stay.
          </span>
        </h2>
        <p className="reveal-up text-gray-500 text-sm leading-relaxed mt-4 max-w-md mx-auto">
          From last-minute savings to long-term resident perks — find the offer
          that fits your journey.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div
        ref={cardsRef}
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 px-6 sm:px-12 lg:px-20 gap-3 sm:gap-4"
      >
        {promos.map((promo, i) => (
          <div
            key={i}
            className="promo-card group relative overflow-hidden rounded-sm cursor-pointer"
            style={{ aspectRatio: "3/4" }}
          >
            {/* ── Image: grayscale → color on hover ── */}
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              className="object-cover scale-100 group-hover:scale-105
                         grayscale group-hover:grayscale-0
                         transition-all duration-700 ease-in-out"
            />

            {/* Dark scrim — lifts slightly on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10
                            group-hover:from-black/60 group-hover:via-black/15 group-hover:to-transparent
                            transition-all duration-700 z-10"
            />

            {/* Badge — slides in from top on hover */}
            <div
              className="absolute top-4 left-4 z-20
                            opacity-0 -translate-y-2
                            group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-500 ease-out"
            >
              <span
                className="text-[10px] font-bold uppercase tracking-widest
                               bg-amber-400 text-stone-950 px-2.5 py-1 rounded-full"
              >
                {promo.badge}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
              {/* Tag — fades in on hover */}
              <p
                className="text-[10px] uppercase tracking-[4px] text-amber-400
                            opacity-0 -translate-y-1
                            group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-500 delay-75 mb-2"
              >
                {promo.tag}
              </p>

              {/* Title — always visible */}
              <h3 className="text-sm sm:text-base font-semibold text-white leading-snug mb-2">
                {promo.title}
              </h3>

              {/* Underline accent — grows on hover */}
              <div className="h-px bg-amber-400/60 w-8 group-hover:w-14 transition-all duration-500 mb-3" />

              {/* Description — max-h reveal */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-in-out">
                <p className="text-[11px] text-white/55 leading-relaxed mb-4">
                  {promo.desc}
                </p>

                {/* Book Now */}
                <button
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest
                                   text-amber-400 hover:text-amber-300 transition-colors duration-300"
                >
                  Book Now
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom thin rule */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>
    </section>
  );
};

export default Promotions;
