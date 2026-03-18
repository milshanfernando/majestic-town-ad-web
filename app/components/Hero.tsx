"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imagesList = [
  { src: "/images/hero3.jpg", alt: "Comfortable Guest House Interior" },
  { src: "/images/hero1.jpg", alt: "Guest House Room" },
  { src: "/images/hero2.jpg", alt: "Shared Living Space" },
];

const SLIDE_DURATION = 5000;
const TRANSITION_DURATION = 1.2;

// ── Logo config per route ─────────────────────────────────────────────────────
type LogoConfig = {
  brandFirst: string;
  brandSecond: string;
  location: string;
  chain: string;
};

const logoMap: Record<string, LogoConfig> = {
  "/vougeinn": {
    brandFirst: "Vogue",
    brandSecond: "Inn",
    location: "Abu Dhabi",
    chain: "by Majestic Chain",
  },
  "/majestictown": {
    brandFirst: "Majestic",
    brandSecond: "Town",
    location: "Abu Dhabi",
    chain: "by Majestic Chain",
  },
  "/dsvproperty": {
    brandFirst: "DSV",
    brandSecond: "Property",
    location: "Abu Dhabi",
    chain: "by Majestic Chain",
  },
  "/": {
    brandFirst: "Majestic",
    brandSecond: "Chain",
    location: "Abu Dhabi",
    chain: "",
  },
};

const defaultLogo: LogoConfig = {
  brandFirst: "Majestic",
  brandSecond: "Chain",
  location: "Abu Dhabi",
  chain: "",
};

// ── Property Selector data ────────────────────────────────────────────────────
const properties = [
  {
    href: "/vougeinn",
    name: "Vogue Inn",
    location: "Abu Dhabi",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L15 8L21 5L18 11H6L3 5L9 8L12 2Z"
          fill="#F59E0B"
          fillOpacity="0.8"
        />
        <rect
          x="5"
          y="13"
          width="14"
          height="2"
          rx="1"
          fill="#F59E0B"
          fillOpacity="0.45"
        />
        <rect
          x="6"
          y="17"
          width="12"
          height="2"
          rx="1"
          fill="#F59E0B"
          fillOpacity="0.3"
        />
      </svg>
    ),
  },
  {
    href: "/majestictown",
    name: "Majestic Town",
    location: "Abu Dhabi",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="10"
          width="18"
          height="11"
          rx="1"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          fill="none"
        />
        <path
          d="M9 21V14h6v7"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          fill="none"
        />
        <path
          d="M1 10l11-8 11 8"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    href: "/dsvproperty",
    name: "DSV Property",
    location: "Abu Dhabi",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          fill="none"
        />
        <path
          d="M12 6v6l4 2"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
];

// ── Hero Component ────────────────────────────────────────────────────────────
const Hero = () => {
  const pathname = usePathname();
  const logo = logoMap[pathname] ?? defaultLogo;

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef(false);

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  /* ── Slide transition ── */
  const goToSlide = useCallback(
    (next: number) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const prev = current;
      const prevEl = imageRefs.current[prev];
      const nextEl = imageRefs.current[next];
      const content = contentRef.current;

      if (!prevEl || !nextEl) {
        isAnimatingRef.current = false;
        return;
      }

      gsap.set(nextEl, {
        zIndex: 2,
        clipPath: "inset(0 100% 0 0)",
        scale: 1.08,
      });
      gsap.set(prevEl, { zIndex: 1 });

      if (content) {
        gsap.to(content.querySelectorAll(".anim-item"), {
          y: -16,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      gsap.to(nextEl, {
        clipPath: "inset(0 0% 0 0)",
        scale: 1,
        duration: TRANSITION_DURATION,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(prevEl, {
            zIndex: 0,
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
          });
          gsap.set(nextEl, { zIndex: 1 });
          setCurrent(next);
          isAnimatingRef.current = false;

          if (content) {
            gsap.fromTo(
              content.querySelectorAll(".anim-item"),
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.09,
                ease: "power3.out",
                delay: 0.1,
              },
            );
          }
        },
      });
    },
    [current],
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % imagesList.length);
    setProgressKey((k) => k + 1);
  }, [current, goToSlide]);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const handleDotClick = (i: number) => {
    if (i === current || isAnimatingRef.current) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToSlide(i);
    setProgressKey((k) => k + 1);
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION);
  };

  /* ── GSAP: entry + scroll animations ── */
  useGSAP(() => {
    const content = contentRef.current;
    const logoEl = logoRef.current;
    const imageWrap = imageWrapRef.current;
    const section = sectionRef.current;

    if (logoEl) {
      gsap.fromTo(
        logoEl,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    }
    if (content) {
      gsap.fromTo(
        content.querySelectorAll(".anim-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }

    if (imageWrap && section) {
      gsap.to(imageWrap, {
        y: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (logoEl && section) {
      gsap.fromTo(
        logoEl,
        { y: "0%", opacity: 1 },
        {
          y: "-120%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "30% top",
            scrub: true,
          },
        },
      );
    }

    if (content && section) {
      gsap.to(content, {
        opacity: 0,
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "40% top",
          scrub: true,
        },
      });
    }
  }, []);

  // ── Shared property card renderer ──────────────────────────────────────────
  const renderPropertyCards = (mobile = false) =>
    properties.map((p) => {
      const isActive = pathname === p.href;
      return (
        <Link
          key={p.href}
          href={p.href}
          className={[
            "group relative overflow-hidden transition-all duration-300 ease-out flex items-center gap-2.5",
            mobile
              ? "rounded-xl px-3.5 py-3 flex-1 border"
              : "rounded-[10px] px-4 py-3.5 w-[190px] border",
            isActive
              ? "border-amber-400/60 bg-amber-500/10"
              : "border-amber-400/20 bg-white/[0.04] hover:bg-amber-500/[0.06] hover:border-amber-400/50",
            !mobile && !isActive ? "hover:-translate-x-1" : "",
          ].join(" ")}
        >
          {/* Glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon box */}
          <div
            className={[
              "relative z-10 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300",
              mobile ? "w-7 h-7" : "w-8 h-8",
              isActive
                ? "bg-amber-400/20 border-amber-400/50"
                : "bg-amber-400/10 border-amber-400/25 group-hover:bg-amber-400/20",
            ].join(" ")}
          >
            {p.icon}
          </div>

          {/* Text */}
          <div className="relative z-10 flex-1 min-w-0">
            <p
              className={[
                "font-medium tracking-[0.4px] truncate transition-colors duration-300",
                mobile ? "text-[11px]" : "text-[12px]",
                isActive
                  ? "text-amber-400"
                  : "text-white/90 group-hover:text-amber-400",
              ].join(" ")}
            >
              {p.name}
            </p>
            {!mobile && (
              <p className="text-white/30 text-[10px] tracking-[2px] uppercase mt-0.5">
                {p.location}
              </p>
            )}
          </div>

          {/* Arrow (desktop only) */}
          {!mobile && (
            <svg
              className="relative z-10 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Active dot */}
          {isActive && (
            <span
              className={`absolute rounded-full bg-amber-400 ${mobile ? "right-2.5 top-2.5 w-1 h-1" : "right-3 top-3 w-1.5 h-1.5"}`}
            />
          )}

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-amber-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      );
    });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-stone-950"
    >
      {/* ── Background Image Slideshow ── */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: "-15%", bottom: "-15%" }}
      >
        {imagesList.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: index === 0 ? 1 : 0, clipPath: "inset(0 0% 0 0)" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* ── Logo — top center ── */}
      <div
        ref={logoRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 will-change-transform"
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-3 mb-0.5">
            <div className="h-px w-8 bg-amber-400/50" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15 8L21 5L18 11H6L3 5L9 8L12 2Z"
                fill="#F59E0B"
                fillOpacity="0.85"
              />
              <rect
                x="5"
                y="13"
                width="14"
                height="2"
                rx="1"
                fill="#F59E0B"
                fillOpacity="0.5"
              />
              <rect
                x="6"
                y="17"
                width="12"
                height="2"
                rx="1"
                fill="#F59E0B"
                fillOpacity="0.35"
              />
            </svg>
            <div className="h-px w-8 bg-amber-400/50" />
          </div>
          <div className="flex flex-col items-center leading-none">
            <span className="text-white font-light text-xl tracking-[8px] uppercase">
              {logo.brandFirst}
              <span className="text-amber-400 font-semibold">
                {" "}
                {logo.brandSecond}
              </span>
            </span>
            <span className="text-white/70 font-light text-[10px] tracking-[5px] uppercase mt-1">
              {logo.location}
            </span>
          </div>
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-1" />
          {logo.chain && (
            <span className="text-white/40 font-light text-[9px] tracking-[4px] uppercase">
              {logo.chain}
            </span>
          )}
        </div>
      </div>

      {/* ── Slide Counter (top-right, desktop only) ── */}
      <div className="absolute top-8 right-8 z-40 text-white/40 text-xs tracking-widest font-light hidden sm:block">
        <span className="text-white/80 font-semibold text-sm">
          {String(current + 1).padStart(2, "0")}
        </span>
        &nbsp;/&nbsp;{String(imagesList.length).padStart(2, "0")}
      </div>

      {/* ── Property Selector — DESKTOP (right side, vertically centered) ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2.5">
        <div className="flex flex-col mb-1 px-1">
          <span className="text-white/40 text-[9px] tracking-[4px] uppercase">
            Our Properties
          </span>
          <span className="text-amber-400 text-[9px] tracking-[3px] uppercase mt-0.5">
            Abu Dhabi
          </span>
        </div>
        {renderPropertyCards(false)}
        <div className="flex items-center gap-2 px-1 mt-1 opacity-30">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/50 text-[9px] tracking-[3px] uppercase whitespace-nowrap">
            Majestic Chain
          </span>
          <div className="flex-1 h-px bg-white/20" />
        </div>
      </div>

      {/* ── Main Content (bottom, desktop only) ── */}
      <div
        ref={contentRef}
        className="relative z-30 hidden sm:flex flex-col justify-end h-full px-6 sm:px-12 lg:px-20 pb-24 sm:pb-28 text-white will-change-transform"
      >
        <div className="hidden lg:block w-px h-10 bg-amber-400/40 mb-6" />
        <p className="anim-item uppercase tracking-[5px] text-amber-400 mb-4 text-[10px] sm:text-xs font-medium">
          Comfortable &nbsp;·&nbsp; Affordable &nbsp;·&nbsp; Clean
        </p>
        <h1 className="anim-item text-4xl sm:text-6xl lg:text-7xl font-extralight leading-[1.1] mb-3 max-w-2xl">
          Modern Living
          <span className="block font-bold italic text-amber-300">
            Made Simple.
          </span>
        </h1>
        <p className="anim-item text-sm sm:text-base text-gray-300 mb-10 leading-relaxed max-w-md">
          Private rooms with shared bathrooms — designed for comfort,
          convenience, and a relaxed stay.
        </p>
        <div className="anim-item flex flex-col sm:flex-row gap-4">
          <button className="px-9 py-3.5 bg-amber-500 hover:bg-amber-400 transition-all duration-300 text-black font-semibold rounded-full text-sm">
            View Rooms
          </button>
          <button className="px-9 py-3.5 border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 rounded-full text-sm font-medium backdrop-blur-sm">
            Contact Us
          </button>
        </div>
      </div>

      {/* ── Property Selector — MOBILE (bottom overlay) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 sm:hidden px-4 pb-6">
        {/* Frosted backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/40 text-[9px] tracking-[4px] uppercase">
              Our Properties
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Cards row */}
          <div className="flex gap-2.5">{renderPropertyCards(true)}</div>

          {/* Chain label */}
          <p className="text-center text-white/20 text-[8px] tracking-[3px] uppercase mt-3">
            Majestic Chain · Abu Dhabi
          </p>
        </div>
      </div>

      {/* ── Dot Indicators (bottom-right, desktop only) ── */}
      <div className="absolute bottom-10 right-8 z-40 hidden sm:flex flex-col items-end gap-3">
        {imagesList.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative flex items-center gap-2 group"
          >
            <span
              className={`text-[10px] tracking-widest transition-all duration-300 ${
                i === current
                  ? "text-amber-400 opacity-100"
                  : "text-white/30 opacity-0 group-hover:opacity-100"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div
              className="relative h-0.5 overflow-hidden rounded-full"
              style={{
                width: i === current ? "40px" : "14px",
                transition: "width 0.4s ease",
              }}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full" />
              {i === current && (
                <div
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                  style={{
                    animation: `progress ${SLIDE_DURATION}ms linear forwards`,
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Scroll hint (desktop only) ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 hidden sm:flex flex-col items-center gap-1.5 text-white/30 text-[10px] tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
