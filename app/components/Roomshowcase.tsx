"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Re-use the same types from Rooms.tsx
import type { Room } from "./Rooms";

gsap.registerPlugin(ScrollTrigger);

// ── Shared space types ────────────────────────────────────────────────────────
export interface SharedSpace {
  /** e.g. "Shared Bathroom" | "Common Kitchen" */
  name: string;
  /** Short description */
  description: string;
  /** How many guests share it, e.g. "Up to 6 guests" */
  capacity?: string;
  /** Amenities / features inside that space */
  features: string[];
  /** Photos of that shared space */
  photos: string[];
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface RoomShowcaseProps {
  room: Room;
  /** Flip the layout so image is on the right (default: image left) */
  imageRight?: boolean;
  /** Optional badge label e.g. "Most Popular" | "Best Value" */
  badge?: string;
  onBook?: (roomId: string) => void;
  /** Shared washrooms, kitchens, lounges etc. */
  sharedSpaces?: SharedSpace[];
}

// ── Photo strip ───────────────────────────────────────────────────────────────
const PhotoStrip = ({
  photos,
  roomType,
}: {
  photos: string[];
  roomType: string;
}) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Main */}
      <div className="relative flex-1 min-h-[320px] overflow-hidden rounded-sm bg-stone-900">
        <Image
          key={active}
          src={photos[active]}
          alt={`${roomType} — view ${active + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
        />
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-400/50 z-10 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-400/50 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent z-[5] pointer-events-none" />

        {/* Counter */}
        <div className="absolute top-4 right-4 z-10 bg-stone-950/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
          <span className="text-[10px] text-white/60 tracking-wider font-medium">
            {active + 1} / {photos.length}
          </span>
        </div>

        {/* Prev / Next arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() =>
                setActive((p) => (p - 1 + photos.length) % photos.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-stone-950/60 hover:bg-stone-950/90 border border-white/10 rounded-full transition-all duration-200"
              aria-label="Previous photo"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 4l-4 4 4 4" />
              </svg>
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % photos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-stone-950/60 hover:bg-stone-950/90 border border-white/10 rounded-full transition-all duration-200"
              aria-label="Next photo"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 aspect-[4/3] overflow-hidden rounded-sm transition-all duration-300 ${
                i === active
                  ? "ring-1 ring-amber-400 opacity-100"
                  : "opacity-35 hover:opacity-60"
              }`}
            >
              <Image
                src={src}
                alt={`thumb ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Spec pill ─────────────────────────────────────────────────────────────────
const Spec = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center gap-2 py-4 px-3 bg-white/[0.03] border border-white/[0.07] rounded-sm">
    <span className="text-amber-400/60">{icon}</span>
    <p className="text-[10px] uppercase tracking-widest text-gray-600 text-center">
      {label}
    </p>
    <p className="text-xs font-semibold text-white/80 text-center leading-tight">
      {value}
    </p>
  </div>
);

// ── Shared space card ─────────────────────────────────────────────────────────
const SharedSpaceCard = ({ space }: { space: SharedSpace }) => {
  const [active, setActive] = useState(0);

  const spaceIcons: Record<string, React.ReactNode> = {
    bathroom: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 12h16M4 12V6a2 2 0 012-2h1a2 2 0 012 2v6M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
        <circle cx="7" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </svg>
    ),
    kitchen: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M8 3v18M2 9h6M2 15h6" />
        <circle cx="15" cy="10" r="2" />
        <path d="M15 12v6" />
      </svg>
    ),
    lounge: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2M2 11a2 2 0 012 2v4h16v-4a2 2 0 012-2M4 17v2M20 17v2" />
      </svg>
    ),
  };

  // Guess icon from name
  const iconKey = space.name.toLowerCase().includes("bath")
    ? "bathroom"
    : space.name.toLowerCase().includes("kitchen")
      ? "kitchen"
      : "lounge";

  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-sm overflow-hidden hover:border-amber-400/20 transition-all duration-300">
      {/* Photo gallery */}
      {space.photos.length > 0 && (
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
          <Image
            key={active}
            src={space.photos[active]}
            alt={`${space.name} — photo ${active + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent z-[5] pointer-events-none" />

          {/* Counter */}
          {space.photos.length > 1 && (
            <div className="absolute top-3 right-3 z-10 bg-stone-950/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
              <span className="text-[10px] text-white/60 tracking-wider">
                {active + 1} / {space.photos.length}
              </span>
            </div>
          )}

          {/* Arrows */}
          {space.photos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActive(
                    (p) => (p - 1 + space.photos.length) % space.photos.length,
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-stone-950/60 hover:bg-stone-950/90 border border-white/10 rounded-full transition-all duration-200"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 4l-4 4 4 4" />
                </svg>
              </button>
              <button
                onClick={() => setActive((p) => (p + 1) % space.photos.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-stone-950/60 hover:bg-stone-950/90 border border-white/10 rounded-full transition-all duration-200"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </>
          )}

          {/* Thumbnails overlay at bottom */}
          {space.photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {space.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-amber-400 w-4"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* "Shared" badge */}
          <div className="absolute bottom-3 left-3 z-10 bg-stone-950/80 backdrop-blur-sm border border-amber-400/20 rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] text-amber-400/80 tracking-wider uppercase font-medium">
              Shared Space
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="shrink-0 w-9 h-9 flex items-center justify-center bg-amber-400/10 border border-amber-400/20 rounded-sm text-amber-400">
            {spaceIcons[iconKey]}
          </div>
          <div>
            <h4 className="text-white/90 font-semibold text-sm leading-tight">
              {space.name}
            </h4>
            {space.capacity && (
              <p className="text-[11px] text-amber-400/60 mt-0.5">
                {space.capacity}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-[12px] leading-relaxed mb-4">
          {space.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {space.features.map((f, i) => (
            <span
              key={i}
              className="text-[11px] text-gray-500 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const RoomShowcase = ({
  room,
  imageRight = false,
  badge,
  onBook,
  sharedSpaces = [],
}: RoomShowcaseProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const photoColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);

  const currency = room.currency ?? "$";

  useGSAP(() => {
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

    if (photoColRef.current) {
      gsap.fromTo(
        photoColRef.current,
        { x: imageRight ? 50 : -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: photoColRef.current, start: "top 80%" },
        },
      );
    }

    if (infoColRef.current) {
      gsap.fromTo(
        infoColRef.current.querySelectorAll(".info-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: infoColRef.current, start: "top 78%" },
        },
      );
    }
  }, [imageRight]);

  // Photo column + info column — order flips with imageRight
  const photoCol = (
    <div ref={photoColRef} className="lg:sticky lg:top-24 self-start">
      <PhotoStrip photos={room.photos} roomType={room.type} />
    </div>
  );

  const infoCol = (
    <div ref={infoColRef} className="flex flex-col gap-6">
      {/* Eyebrow */}
      <div className="info-reveal flex items-center gap-3 flex-wrap">
        <p className="uppercase tracking-[5px] text-amber-400 text-[10px] font-medium">
          Room Showcase
        </p>
        {badge && (
          <span className="bg-amber-400 text-stone-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Title + rate */}
      <div className="info-reveal flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extralight leading-[1.1] text-white">
            {room.type.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-bold italic text-amber-300">
              {room.type.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="mt-2 text-gray-500 italic text-base">{room.tagline}</p>
        </div>

        <div className="shrink-0 bg-amber-400/10 border border-amber-400/20 rounded-sm px-5 py-3 text-right">
          <p className="text-[10px] text-amber-400/60 uppercase tracking-widest mb-1">
            Per Night
          </p>
          <p className="text-3xl font-bold text-amber-400 leading-none">
            {currency}
            {room.rate}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="info-reveal text-gray-400 text-base leading-relaxed border-l-2 border-amber-400/30 pl-4">
        {room.description}
      </p>

      {/* Specs grid */}
      <div className="info-reveal grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Spec
          label="Room Size"
          value={room.roomSize}
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 21l18-18M3 3h6v6M15 15h6v6" />
            </svg>
          }
        />
        <Spec
          label="Bed"
          value={room.bedSize}
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 4v16M22 4v16M2 8h20M2 12h20" />
              <rect x="5" y="12" width="14" height="8" rx="1" />
            </svg>
          }
        />
        <Spec
          label="Max Guests"
          value={`${room.maxGuests} ${room.maxGuests === 1 ? "Guest" : "Guests"}`}
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          }
        />
        <Spec
          label="Bathroom"
          value="Ensuite"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 6a3 3 0 016 0v6H3v2a9 9 0 0018 0v-2h-6V6" />
            </svg>
          }
        />
      </div>

      {/* Check-in / Check-out */}
      <div className="info-reveal grid grid-cols-2 gap-3">
        {[
          {
            label: "Check-In",
            time: room.checkIn,
            note: "From",
            icon: (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            ),
          },
          {
            label: "Check-Out",
            time: room.checkOut,
            note: "By",
            icon: (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            ),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-sm px-5 py-4"
          >
            <span className="text-amber-400/60 shrink-0">{item.icon}</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-600">
                {item.label}
              </p>
              <p className="text-white/90 font-semibold text-lg leading-tight">
                {item.time}
              </p>
              <p className="text-[11px] text-gray-600">{item.note} arrival</p>
            </div>
          </div>
        ))}
      </div>

      {/* Facilities */}
      <div className="info-reveal">
        <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-3">
          Room Facilities
        </p>
        <div className="flex flex-wrap gap-2">
          {room.facilities.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] hover:border-amber-400/20 hover:text-amber-400 rounded-full px-4 py-2 text-[12px] text-gray-400 transition-all duration-200 cursor-default"
            >
              <span className="text-amber-400/50">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="info-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <button
          onClick={() => onBook?.(room.id)}
          className="group flex-1 flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300"
        >
          Book This Room
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
        <button className="flex items-center justify-center gap-2 border border-white/[0.12] hover:border-amber-400/30 text-gray-400 hover:text-amber-400 text-sm px-6 py-4 rounded-sm transition-all duration-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Enquire
        </button>
      </div>

      {/* Reassurance note */}
      <p className="info-reveal text-[11px] text-gray-600 flex items-center gap-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-amber-400/40 shrink-0"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Free cancellation up to 48 hours before check-in · All taxes included
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-950 text-white overflow-hidden"
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-500/4 blur-[140px] z-0" />

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24 pb-28">
        {/* Rule */}
        <div
          ref={lineRef}
          className="origin-left h-px bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent w-full mb-20"
        />

        {/* Two-column layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
            imageRight
              ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
              : ""
          }`}
        >
          {imageRight ? (
            <>
              {infoCol}
              {photoCol}
            </>
          ) : (
            <>
              {photoCol}
              {infoCol}
            </>
          )}
        </div>
        {/* ── Shared Spaces ── */}
        {sharedSpaces.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/[0.06]">
            {/* Header */}
            <div className="mb-10">
              <p className="uppercase tracking-[5px] text-amber-400 text-[10px] font-medium mb-3">
                Shared Facilities
              </p>
              <h3 className="text-3xl font-extralight text-white">
                Spaces you{" "}
                <span className="font-bold italic text-amber-300">
                  share & enjoy
                </span>
              </h3>
              <p className="mt-3 text-gray-500 text-sm max-w-xl leading-relaxed">
                Our shared spaces are maintained to the same high standard as
                your private room — cleaned daily, well-stocked, and always
                welcoming.
              </p>
            </div>

            {/* Cards grid — 1 col on mobile, auto-fit on larger screens */}
            <div
              className={`grid gap-6 ${
                sharedSpaces.length === 1
                  ? "grid-cols-1 max-w-md"
                  : sharedSpaces.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {sharedSpaces.map((space, i) => (
                <SharedSpaceCard key={i} space={space} />
              ))}
            </div>

            {/* Cleanliness note */}
            <div className="mt-8 flex items-center gap-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-amber-400/50 shrink-0"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p className="text-[11px] text-gray-600 uppercase tracking-widest">
                All shared spaces are cleaned daily · Supplies provided · 24 hr
                access
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomShowcase;
