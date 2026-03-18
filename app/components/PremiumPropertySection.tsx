"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─────────────────────────────────────────────── */
interface Room {
  title: string;
  description: string;
  image?: string;
}

interface Property {
  name: string;
  subtitle: string;
  description: string;
  location: string;
  checkIn: string;
  checkOut: string;
  mainImage: string;
  gallery: string[];
  rooms: Room[];
}

interface Props {
  property: Property;
  index: number;
}

const FACILITIES = [
  { icon: "◉", label: "High-Speed WiFi" },
  { icon: "◈", label: "Daily Housekeeping" },
  { icon: "◎", label: "Shared Kitchen" },
  { icon: "◆", label: "Clean Washrooms" },
  { icon: "◍", label: "Prime Location" },
  { icon: "◐", label: "Affordable Daily Rates" },
];

/* ─── Lightbox ───────────────────────────────────────────── */
const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl z-10 leading-none"
        onClick={onClose}
      >
        ×
      </button>

      {/* Counter */}
      <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase">
        {String(idx + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </span>

      {/* Image */}
      <div
        className="relative w-[90vw] max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Photo ${idx + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Prev / Next */}
      <button
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-500 transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        ‹
      </button>
      <button
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-500 transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        ›
      </button>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative w-12 h-8 rounded-md overflow-hidden border transition-all duration-200 ${
              i === idx
                ? "border-amber-500 scale-110"
                : "border-white/20 opacity-50 hover:opacity-80"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const PremiumPropertySection = ({ property, index }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const allImages = [property.mainImage, ...property.gallery].filter(Boolean);
  const isEven = index % 2 === 0;

  /* ── GSAP entrance — no scrub, no pin, safe for Strict Mode ── */
  useGSAP(
    () => {
      const head = headRef.current;
      const gallery = galleryRef.current;
      const info = infoRef.current;
      if (!head || !gallery || !info) return;

      const headItems = gsap.utils.toArray<Element>(
        head.querySelectorAll(".h-reveal"),
      );
      const galleryItems = gsap.utils.toArray<Element>(
        gallery.querySelectorAll(".g-item"),
      );
      const infoItems = gsap.utils.toArray<Element>(
        info.querySelectorAll(".i-reveal"),
      );

      const commonST = {
        trigger: sectionRef.current,
        start: "top 78%",
        toggleActions: "play none none none",
      };

      if (headItems.length) {
        gsap.fromTo(
          headItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: commonST,
          },
        );
      }

      if (galleryItems.length) {
        gsap.fromTo(
          galleryItems,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { ...commonST, start: "top 80%" },
          },
        );
      }

      if (infoItems.length) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: isEven ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { ...commonST, start: "top 76%" },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);

  return (
    <>
      {lightboxIdx !== null && (
        <Lightbox
          images={allImages}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      <section
        ref={sectionRef}
        className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#0e0d0b] overflow-hidden"
      >
        {/* Subtle section separator */}
        <div className="absolute top-0 left-20 right-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Ambient glow per section */}
        <div
          className={`absolute top-1/4 ${isEven ? "left-0" : "right-0"} w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40`}
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* ── Section header ── */}
          <div ref={headRef} className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-amber-500/50 text-xs tracking-[5px] uppercase font-medium h-reveal">
                Property {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-8 bg-amber-500/40 h-reveal" />
            </div>
            <h2 className="h-reveal text-4xl sm:text-5xl font-extralight text-white leading-tight mb-2">
              {property.name}
            </h2>
            <p className="h-reveal text-xl font-light italic text-amber-400 mb-4">
              {property.subtitle}
            </p>
            <p className="h-reveal text-white/50 text-base leading-relaxed max-w-lg">
              {property.description}
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-14 items-start`}
          >
            {/* ════ GALLERY ════ */}
            <div ref={galleryRef} className="w-full lg:w-[55%] space-y-3">
              {/* Hero image */}
              <div
                className="g-item relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={property.mainImage}
                  alt={property.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center text-white text-xl backdrop-blur-sm bg-black/20">
                    ⊕
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Main View
                </span>
              </div>

              {/* Sub-gallery grid */}
              <div className="grid grid-cols-4 gap-3">
                {property.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="g-item relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(i + 1)}
                  >
                    <Image
                      src={img}
                      alt={`${property.name} ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    {/* "View all" overlay on last thumb */}
                    {i === property.gallery.length - 1 && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                        <span className="text-white text-lg font-light">
                          +{allImages.length}
                        </span>
                        <span className="text-white/60 text-[9px] tracking-widest uppercase mt-0.5">
                          Photos
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Gallery label */}
              <p className="text-white/25 text-xs tracking-widest uppercase text-right pt-1">
                Click any photo to open gallery
              </p>
            </div>

            {/* ════ INFO CARD ════ */}
            <div ref={infoRef} className="w-full lg:w-[45%] space-y-7">
              {/* Location + check-in/out */}
              <div className="i-reveal grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Location", value: property.location },
                  { label: "Check-in", value: property.checkIn },
                  { label: "Check-out", value: property.checkOut },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-white/[0.08] rounded-xl px-4 py-4 bg-white/[0.03]"
                  >
                    <p className="text-[9px] uppercase tracking-widest text-amber-500/60 mb-1">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-medium leading-snug">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Room types */}
              <div className="i-reveal space-y-3">
                <h3 className="text-[10px] uppercase tracking-[5px] text-amber-500/70 mb-4">
                  Room Types
                </h3>
                {property.rooms.map((room, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 group"
                  >
                    <span className="text-amber-500/40 group-hover:text-amber-500 transition-colors text-lg leading-none mt-0.5 select-none font-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-amber-300 transition-colors duration-300">
                        {room.title}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                        {room.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="i-reveal h-px bg-gradient-to-r from-amber-500/20 via-white/10 to-transparent" />

              {/* Facilities */}
              <div className="i-reveal space-y-3">
                <h3 className="text-[10px] uppercase tracking-[5px] text-amber-500/70">
                  Facilities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {FACILITIES.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 group"
                    >
                      <span className="text-amber-400/60 group-hover:text-amber-400 transition-colors text-xs">
                        {f.icon}
                      </span>
                      <span className="text-white/60 group-hover:text-white/80 transition-colors text-xs">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="i-reveal flex gap-3 pt-2">
                <button className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-full transition-all duration-300 tracking-wide shadow-lg shadow-amber-900/20">
                  Book Now
                </button>
                <button className="px-6 py-3.5 border border-white/20 hover:border-amber-500/50 text-white/60 hover:text-amber-300 text-sm rounded-full transition-all duration-300 tracking-wide">
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumPropertySection;
