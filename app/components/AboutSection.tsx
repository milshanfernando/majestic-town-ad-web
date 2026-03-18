"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Prevent double-registration in React Strict Mode
if (typeof window !== "undefined") {
  gsap.config({ nullTargetWarn: false });
}

const rooms = [
  { src: "/images/kingbed.jpeg", label: "King Room", tag: "Most Popular" },
  { src: "/images/singlebed.jpeg", label: "Single Room", tag: "Best Value" },
  { src: "/images/queen.jpeg", label: "Queen Room", tag: "Comfortable" },
  { src: "/images/loby.jpeg", label: "Lobby", tag: "Welcome" },
];

const properties = [
  {
    name: "Majestic Town",
    location: "Khalidiya",
    detail: "Near Etisalat Building",
    num: "01",
  },
  {
    name: "Vouge Inn",
    location: "Khalidiya",
    detail: "Near Etisalat Building",
    num: "02",
  },
  {
    name: "DSV Property",
    location: "Al Khalidiya",
    detail: "Near Shining Tower",
    num: "03",
  },
];

const features = [
  { icon: "◎", label: "Prime Location" },
  { icon: "◈", label: "Daily Housekeeping" },
  { icon: "◉", label: "High-Speed WiFi" },
  { icon: "◆", label: "Affordable Daily Rates" },
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  /* ── image crossfade ── */
  const switchImage = (i: number) => {
    if (i === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(i);

    // Kill any existing tweens on this element before starting new one
    if (mainImgRef.current) {
      gsap.killTweensOf(mainImgRef.current);
      gsap.fromTo(
        mainImgRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
      );
    }
  };

  /* ── scroll-triggered entrance ── */
  useGSAP(
    () => {
      const left = leftColRef.current;
      const right = rightColRef.current;
      if (!left || !right) return;

      const leftItems = gsap.utils.toArray<Element>(
        left.querySelectorAll(".reveal-left"),
      );
      const rightItems = gsap.utils.toArray<Element>(
        right.querySelectorAll(".reveal-right"),
      );
      const dividers = gsap.utils.toArray<Element>(".about-divider");

      if (leftItems.length) {
        gsap.fromTo(
          leftItems,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: left,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (rightItems.length) {
        gsap.fromTo(
          rightItems,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: right,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (dividers.length) {
        gsap.fromTo(
          dividers,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0e0d0b] text-white overflow-hidden py-24 sm:py-32 px-6 sm:px-12 lg:px-20"
    >
      {/* ── Background texture dots ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4af37 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="about-divider h-px w-12 bg-amber-500 origin-left" />
          <p className="uppercase tracking-[5px] text-amber-500 text-[10px] font-medium">
            About Our Properties
          </p>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight leading-tight max-w-2xl">
          Thoughtfully crafted
          <span className="block font-bold italic text-amber-400">
            stays in Abu Dhabi.
          </span>
        </h2>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* ════ LEFT — Image panel ════ */}
        <div ref={leftColRef} className="space-y-5">
          {/* Main image */}
          <div className="reveal-left relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div ref={mainImgRef} className="absolute inset-0">
              <Image
                src={rooms[activeIndex].src}
                alt={rooms[activeIndex].label}
                fill
                priority
                className="object-cover"
              />
              {/* gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Active room tag */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500 text-black text-[11px] font-semibold tracking-widest uppercase rounded-full">
                {rooms[activeIndex].tag}
              </span>
              <span className="text-white text-sm font-light tracking-wide">
                {rooms[activeIndex].label}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="reveal-left grid grid-cols-4 gap-3">
            {rooms.map((room, i) => (
              <button
                key={i}
                onClick={() => switchImage(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ring-offset-2 ring-offset-[#0e0d0b] ${
                  activeIndex === i
                    ? "ring-2 ring-amber-500 scale-105 shadow-lg shadow-amber-900/30"
                    : "opacity-50 hover:opacity-80 hover:scale-102"
                }`}
              >
                <Image
                  src={room.src}
                  alt={room.label}
                  fill
                  className="object-cover"
                />
                {activeIndex === i && (
                  <div className="absolute inset-0 bg-amber-500/10" />
                )}
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div className="reveal-left grid grid-cols-3 gap-4 pt-2">
            {[
              { value: "3", label: "Properties" },
              { value: "50+", label: "Rooms" },
              { value: "24/7", label: "Support" },
            ].map((s, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl px-4 py-4 text-center bg-white/[0.03] backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-amber-400">{s.value}</p>
                <p className="text-[11px] text-white/40 tracking-widest uppercase mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════ RIGHT — Content ════ */}
        <div ref={rightColRef} className="space-y-10">
          {/* Intro text */}
          <p className="reveal-right text-white/60 leading-relaxed text-base border-l-2 border-amber-500/40 pl-5">
            We proudly operate three well-maintained guest house properties in
            Abu Dhabi — offering clean, comfortable, and affordable
            accommodation for daily stays.
          </p>

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="reveal-right text-[10px] uppercase tracking-[5px] text-amber-500/70 mb-5">
              Our Locations
            </h3>
            {properties.map((p, i) => (
              <div
                key={i}
                className="reveal-right group flex items-start gap-5 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-300 cursor-default"
              >
                <span className="text-2xl font-extralight text-amber-500/40 group-hover:text-amber-500/70 transition-colors duration-300 leading-none mt-0.5 select-none">
                  {p.num}
                </span>
                <div>
                  <h4 className="font-semibold text-white text-base tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                    {p.name}
                  </h4>
                  <p className="text-white/40 text-sm mt-0.5">
                    {p.location} &mdash; {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="reveal-right h-px bg-gradient-to-r from-amber-500/30 via-white/10 to-transparent" />

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="reveal-right flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300"
              >
                <span className="text-amber-400 text-sm">{f.icon}</span>
                <span className="text-white/70 text-sm">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Room types */}
          <div className="reveal-right space-y-3">
            <h3 className="text-[10px] uppercase tracking-[5px] text-amber-500/70">
              Room Types Available
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Single Room", "Queen Room", "King Room"].map((r) => (
                <span
                  key={r}
                  className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-xs tracking-wide hover:border-amber-500/50 hover:text-amber-300 transition-all duration-300 cursor-default"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="text-white/40 text-sm leading-relaxed pt-1">
              All rooms include access to clean shared washrooms and kitchen
              facilities.
            </p>
          </div>

          {/* CTA */}
          <div className="reveal-right flex gap-4 pt-2">
            <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-full transition-all duration-300 tracking-wide">
              Explore Rooms
            </button>
            <button className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-sm rounded-full transition-all duration-300 tracking-wide">
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="about-divider h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent origin-left" />
      </div>
    </section>
  );
};

export default AboutSection;
