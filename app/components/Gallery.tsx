"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
export type GalleryPhoto = {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal"; // controls masonry sizing
};

type GalleryProps = {
  photos: GalleryPhoto[];
  title?: string;
  subtitle?: string;
};

// ── Gallery Component ─────────────────────────────────────────────────────────
const Gallery = ({
  photos,
  title = "Gallery",
  subtitle = "A glimpse into your stay",
}: GalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxVisible(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex(null);
      document.body.style.overflow = "";
    }, 300);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  // Assign masonry span classes
  const getSpanClass = (photo: GalleryPhoto, index: number) => {
    const span = photo.span;
    if (span === "tall") return "row-span-2";
    if (span === "wide") return "col-span-2";
    // Auto-assign variety if no span set
    if (!span) {
      if (index % 7 === 0) return "row-span-2";
      if (index % 5 === 0) return "col-span-2";
    }
    return "";
  };

  return (
    <section className="relative w-full bg-stone-950 py-20 sm:py-28 overflow-hidden">
      {/* ── Subtle background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── Section header ── */}
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          <p className="text-amber-400 text-[10px] tracking-[5px] uppercase font-medium mb-3">
            Our Space
          </p>
          <h2 className="text-white font-extralight text-3xl sm:text-5xl tracking-tight text-center">
            {title}
            <span className="block text-amber-300 font-semibold italic text-2xl sm:text-3xl mt-1">
              {subtitle}
            </span>
          </h2>
        </div>

        {/* ── Masonry Grid ── */}
        <div
          className="grid gap-3 sm:gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gridAutoRows: "220px",
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={[
                "group relative overflow-hidden rounded-xl cursor-pointer",
                "border border-white/5 hover:border-amber-400/30",
                "transition-all duration-500",
                getSpanClass(photo, index),
              ].join(" ")}
            >
              {/* Image */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

              {/* Amber gradient bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.5 16.5L21 21"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 11h6M11 8v6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Corner amber accent */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-[24px] border-l-amber-400/0 border-b-[24px] border-b-transparent group-hover:border-l-amber-400/60 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* ── Photo count ── */}
        <div className="flex items-center justify-center gap-3 mt-10 opacity-40">
          <div className="h-px w-16 bg-white/30" />
          <span className="text-white text-[10px] tracking-[4px] uppercase">
            {photos.length} Photos
          </span>
          <div className="h-px w-16 bg-white/30" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className={[
            "fixed inset-0 z-[100] flex items-center justify-center",
            "transition-all duration-300",
            lightboxVisible ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

          {/* Content */}
          <div
            className={[
              "relative z-10 w-full max-w-5xl mx-4 transition-all duration-300",
              lightboxVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold text-sm">
                  {String(lightboxIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30 text-sm">/</span>
                <span className="text-white/40 text-sm">
                  {String(photos.length).padStart(2, "0")}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-all duration-200 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Main image */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10">
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {/* Prev / Next buttons */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 hover:bg-black/70 hover:border-amber-400/40 transition-all duration-200 flex items-center justify-center group"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                >
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 hover:bg-black/70 hover:border-amber-400/40 transition-all duration-200 flex items-center justify-center group"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path
                    d="M5 2l5 5-5 5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Alt text caption */}
            <p className="text-center text-white/30 text-xs tracking-widest uppercase mt-4">
              {photos[lightboxIndex].alt}
            </p>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none justify-center">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={[
                    "relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border transition-all duration-200",
                    i === lightboxIndex
                      ? "border-amber-400 scale-105"
                      : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30",
                  ].join(" ")}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Gallery;
