"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "12+", label: "Years of Hospitality" },
  { value: "500+", label: "Happy Guests" },
  { value: "4.9", label: "Average Rating" },
];

const pillars = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Home-Like Comfort",
    desc: "Thoughtfully furnished rooms with everything you need — nothing you don't.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Flexible Stays",
    desc: "Short or long-term, we accommodate your schedule with ease.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Warm Community",
    desc: "Connect with fellow travelers in our welcoming shared spaces.",
  },
];

// ── Prop types ──────────────────────────────────────────────
interface WelcomeProps {
  /** Hotel / brand name shown in the eyebrow label and quote footer */
  hotelName?: string;
  /**
   * Two-paragraph description of the property.
   * Pass a tuple [primaryParagraph, secondaryParagraph] or a single string
   * that will be used as the primary paragraph (secondary will fall back to default).
   */
  description?: string | [string, string];
  /** Path or URL for the hero image (passed to Next.js <Image> src) */
  image?: string;
  /** Alt text for the hero image */
  imageAlt?: string;
}

// ── Helpers ─────────────────────────────────────────────────
const DEFAULT_PRIMARY =
  "HavenStay was born from a simple belief: everyone deserves a clean, comfortable place to rest without paying hotel prices. We offer private rooms with shared bathrooms in a well-maintained, friendly environment.";

const DEFAULT_SECONDARY =
  "Whether you're a solo traveler, a professional on assignment, or someone in between homes — our doors are always open. We pride ourselves on personal touches, spotless spaces, and a host who actually cares.";

const Welcome = ({
  hotelName = "HavenStay",
  description,
  image = "/images/kingbed.jpeg",
  imageAlt,
}: WelcomeProps) => {
  // Resolve description paragraphs
  const primaryDesc = Array.isArray(description)
    ? description[0]
    : (description ?? DEFAULT_PRIMARY);

  const secondaryDesc = Array.isArray(description)
    ? description[1]
    : DEFAULT_SECONDARY;

  // Resolve alt text
  const resolvedAlt = imageAlt ?? `${hotelName} interior`;

  // ── Refs ──────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Decorative line ──
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
        },
      );
    }

    // ── Left column ──
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current.querySelectorAll(".reveal-left"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 78%" },
        },
      );
    }

    // ── Right column ──
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current.querySelectorAll(".reveal-right"),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 78%" },
        },
      );
    }

    // ── Stats ──
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll(".stat-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        },
      );
    }

    // ── Parallax ──
    if (imgInnerRef.current && imageWrapRef.current) {
      gsap.fromTo(
        imgInnerRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-950 text-white overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Subtle amber glow top-left */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] z-0" />

      {/* ── Top thin rule ── */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24">
        <div
          ref={lineRef}
          className="origin-left h-px bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent w-full mb-20"
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ── LEFT: Text ── */}
          <div ref={leftRef}>
            <p className="reveal-left uppercase tracking-[5px] text-amber-400 text-[10px] sm:text-xs font-medium mb-6">
              Welcome to {hotelName}
            </p>

            <h2 className="reveal-left text-4xl sm:text-5xl lg:text-[1.5rem] font-extralight leading-[1.1] mb-8 max-w-lg">
              More than a room —{" "}
              <span className="font-bold italic text-amber-300">
                a place to belong.
              </span>
            </h2>

            <p className="reveal-left text-gray-400 text-base leading-relaxed mb-5 max-w-md">
              {primaryDesc}
            </p>

            {secondaryDesc && (
              <p className="reveal-left text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
                {secondaryDesc}
              </p>
            )}

            <div className="reveal-left">
              <button className="group flex items-center gap-3 text-sm font-medium text-white hover:text-amber-300 transition-colors duration-300">
                <span className="w-10 h-px bg-amber-400 group-hover:w-16 transition-all duration-500" />
                Learn Our Story
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex gap-10 mt-16 pt-10 border-t border-white/8"
            >
              {stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <p className="text-3xl sm:text-4xl font-bold text-amber-400 leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image + pillars ── */}
          <div ref={rightRef} className="flex flex-col gap-8">
            <div
              ref={imageWrapRef}
              className="reveal-right relative overflow-hidden rounded-sm aspect-[4/3] lg:aspect-[3/2]"
            >
              {/* Inner div GSAP animates — oversized so edges never peek */}
              <div
                ref={imgInnerRef}
                className="absolute left-0 right-0"
                style={{ top: "-10%", bottom: "-10%" }}
              >
                <Image
                  src={image}
                  alt={resolvedAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-400/60 z-10" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-400/60 z-10" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent z-[5]" />

              {/* Floating badge */}
              {/* <div className="absolute bottom-5 left-5 z-10 bg-stone-950/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs text-white/70 tracking-wider uppercase">
                  Currently Available
                </span>
              </div> */}
            </div>

            {/* Pillars */}
            <div className="reveal-right grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-amber-400/20 rounded-sm p-5 transition-all duration-300 cursor-default"
                >
                  <div className="text-amber-400/70 group-hover:text-amber-400 transition-colors duration-300 mb-3">
                    {p.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
                    {p.title}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom quote band ── */}
      <div className="relative z-10 mt-24 border-t border-white/[0.06] px-6 sm:px-12 lg:px-20 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-3xl">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="shrink-0 text-amber-400/30"
          >
            <path
              d="M4 18c0-7.2 5.8-13 13-13v5c-4.4 0-8 3.6-8 8h5v10H4V18zm18 0c0-7.2 5.8-13 13-13v5c-4.4 0-8 3.6-8 8h5v10H22V18z"
              fill="currentColor"
            />
          </svg>
          <div>
            <p className="text-lg sm:text-xl font-light text-white/60 italic leading-relaxed">
              We don&apos;t just offer a place to sleep. We offer a space where
              every guest feels{" "}
              <span className="text-amber-300 font-medium not-italic">
                genuinely welcome
              </span>
              .
            </p>
            <p className="mt-3 text-xs uppercase tracking-[4px] text-gray-600">
              — The {hotelName} Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
