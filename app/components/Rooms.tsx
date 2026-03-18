"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────
export interface RoomFacility {
  label: string;
  icon: React.ReactNode;
}

export interface Room {
  id: string;
  /** e.g. "Deluxe King", "Standard Twin" */
  type: string;
  /** Short tagline shown on the card */
  tagline: string;
  /** Full description paragraph */
  description: string;
  /** Nightly rate in whatever currency you prefer */
  rate: number;
  /** Currency symbol, default "$" */
  currency?: string;
  /** e.g. "280 sq ft" */
  roomSize: string;
  /** e.g. "1 King Bed" */
  bedSize: string;
  /** Max occupancy */
  maxGuests: number;
  /** Check-in time, e.g. "2:00 PM" */
  checkIn: string;
  /** Check-out time, e.g. "11:00 AM" */
  checkOut: string;
  facilities: RoomFacility[];
  /** Array of image paths / URLs */
  photos: string[];
}

interface RoomsProps {
  rooms?: Room[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

// ── Default facility icons ────────────────────────────────────────────────────
const FacilityIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    wifi: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
      </svg>
    ),
    ac: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M12 12v5M8 12v3M16 12v3" />
      </svg>
    ),
    tv: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 4l5 3 5-3" />
      </svg>
    ),
    bathroom: (
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
    ),
    desk: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="12" width="20" height="3" rx="1" />
        <path d="M5 15v5M19 15v5" />
        <path d="M7 12V7a2 2 0 012-2h6a2 2 0 012 2v5" />
      </svg>
    ),
    wardrobe: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="18" rx="1" />
        <path d="M12 3v18M8 10h1M15 10h1" />
      </svg>
    ),
    kettle: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 8h2a2 2 0 010 4h-2" />
        <path d="M5 8h12v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
        <path d="M9 2v2M12 2v2" />
      </svg>
    ),
    safe: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    parking: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 010 6H9" />
      </svg>
    ),
    breakfast: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <path d="M6 2v4M10 2v4M14 2v4" />
      </svg>
    ),
  };
  return <>{icons[name] ?? icons["wifi"]}</>;
};

// ── Default sample data ───────────────────────────────────────────────────────
const defaultFacilities = (keys: string[]): RoomFacility[] =>
  keys.map((k) => ({
    label: k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, " "),
    icon: <FacilityIcon name={k} />,
  }));

const DEFAULT_ROOMS: Room[] = [
  {
    id: "deluxe-king",
    type: "Deluxe King",
    tagline: "Space, silence & a bed worth staying in.",
    description:
      "Our most popular room offers a plush king-sized bed, blackout curtains, and a private ensuite bathroom. Perfect for couples or solo travelers who value their space. The room faces our quiet inner courtyard, ensuring a restful night every time.",
    rate: 89,
    currency: "$",
    roomSize: "320 sq ft",
    bedSize: "1 King Bed",
    maxGuests: 2,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    facilities: defaultFacilities([
      "wifi",
      "ac",
      "tv",
      "bathroom",
      "desk",
      "wardrobe",
      "kettle",
      "safe",
    ]),
    photos: [
      "/images/kingbed.jpeg",
      "/images/kingbed.jpeg",
      "/images/kingbed.jpeg",
    ],
  },
  {
    id: "standard-twin",
    type: "Standard Twin",
    tagline: "Two beds, zero compromise.",
    description:
      "Ideal for friends or colleagues traveling together. The Standard Twin features two single beds with premium linen, ample shared wardrobe space, and a bright en-suite bathroom. Bright, clean, and thoughtfully arranged.",
    rate: 69,
    currency: "$",
    roomSize: "260 sq ft",
    bedSize: "2 Single Beds",
    maxGuests: 2,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    facilities: defaultFacilities([
      "wifi",
      "ac",
      "tv",
      "bathroom",
      "wardrobe",
      "kettle",
    ]),
    photos: ["/images/kingbed.jpeg", "/images/kingbed.jpeg"],
  },
  {
    id: "solo-comfort",
    type: "Solo Comfort",
    tagline: "Everything you need, nothing you don't.",
    description:
      "Designed for the independent traveler on the move. A cozy single room with a memory-foam bed, dedicated work desk, and access to a spotless shared bathroom just steps away. Smart, efficient, and surprisingly spacious.",
    rate: 45,
    currency: "$",
    roomSize: "160 sq ft",
    bedSize: "1 Single Bed",
    maxGuests: 1,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    facilities: defaultFacilities(["wifi", "ac", "desk", "wardrobe", "kettle"]),
    photos: ["/images/kingbed.jpeg", "/images/kingbed.jpeg"],
  },
];

// ── Photo gallery sub-component ───────────────────────────────────────────────
const PhotoGallery = ({
  photos,
  roomType,
}: {
  photos: string[];
  roomType: string;
}) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-stone-900">
        <Image
          src={photos[active]}
          alt={`${roomType} — photo ${active + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
        />
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-400/50 z-10" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-400/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent z-[5]" />
        {/* Photo counter */}
        <div className="absolute top-3 right-3 z-10 bg-stone-950/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
          <span className="text-[10px] text-white/60 tracking-wider">
            {active + 1} / {photos.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 aspect-[3/2] overflow-hidden rounded-sm transition-all duration-300 ${
                i === active
                  ? "ring-1 ring-amber-400 opacity-100"
                  : "opacity-40 hover:opacity-70"
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

// ── Room card ─────────────────────────────────────────────────────────────────
const RoomCard = ({ room, index }: { room: Room; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const currency = room.currency ?? "$";

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        },
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="group bg-white/[0.02] border border-white/[0.07] hover:border-amber-400/20 rounded-sm overflow-hidden transition-all duration-500"
    >
      {/* ── Photo gallery ── */}
      <div className="p-4 pb-0">
        <PhotoGallery photos={room.photos} roomType={room.type} />
      </div>

      {/* ── Header: type + rate ── */}
      <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-amber-400/70 mb-1 font-medium">
            Room Type
          </p>
          <h3 className="text-xl font-semibold text-white leading-tight">
            {room.type}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5 italic">{room.tagline}</p>
        </div>

        {/* Rate badge */}
        <div className="shrink-0 text-right">
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-sm px-4 py-2.5">
            <p className="text-[10px] text-amber-400/60 uppercase tracking-widest mb-0.5">
              Per Night
            </p>
            <p className="text-2xl font-bold text-amber-400 leading-none">
              {currency}
              {room.rate}
            </p>
          </div>
        </div>
      </div>

      {/* ── Specs row ── */}
      <div className="mx-6 mb-4 grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] rounded-sm">
        {[
          {
            label: "Room Size",
            value: room.roomSize,
            icon: (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 21l18-18M3 3h6v6M15 15h6v6" />
              </svg>
            ),
          },
          {
            label: "Bed",
            value: room.bedSize,
            icon: (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 4v16M22 4v16M2 8h20M2 12h20" />
                <rect x="5" y="12" width="14" height="8" rx="1" />
              </svg>
            ),
          },
          {
            label: "Guests",
            value: `Up to ${room.maxGuests}`,
            icon: (
              <svg
                width="14"
                height="14"
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
          },
        ].map((spec, i) => (
          <div key={i} className="flex flex-col items-center py-3 gap-1.5">
            <span className="text-amber-400/50">{spec.icon}</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              {spec.label}
            </p>
            <p className="text-xs font-medium text-white/80 text-center">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Check-in / Check-out ── */}
      <div className="mx-6 mb-4 flex gap-3">
        {[
          {
            label: "Check-In",
            time: room.checkIn,
            icon: (
              <svg
                width="13"
                height="13"
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
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            ),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-sm px-4 py-3"
          >
            <span className="text-amber-400/60">{item.icon}</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-600">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-white/80">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Description (expandable) ── */}
      <div className="px-6 mb-4">
        <p
          className={`text-sm text-gray-400 leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-2"}`}
        >
          {room.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1.5 text-[11px] text-amber-400/60 hover:text-amber-400 transition-colors uppercase tracking-widest"
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      </div>

      {/* ── Facilities ── */}
      <div className="px-6 pb-6">
        <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-3">
          Facilities
        </p>
        <div className="flex flex-wrap gap-2">
          {room.facilities.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 text-[11px] text-gray-400 hover:text-amber-400 hover:border-amber-400/20 transition-all duration-200 cursor-default"
            >
              <span className="text-amber-400/50">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-white/[0.05] px-6 py-4 flex items-center justify-between">
        <p className="text-[11px] text-gray-600 uppercase tracking-widest">
          Starting from{" "}
          <span className="text-amber-400 font-semibold">
            {currency}
            {room.rate}/night
          </span>
        </p>
        <button className="group flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all duration-300">
          Book This Room
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const Rooms = ({
  rooms = DEFAULT_ROOMS,
  sectionTitle = "Our Rooms",
  sectionSubtitle = "Every room is cleaned to hotel standards, priced for real people. Pick the space that suits your stay.",
}: RoomsProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

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
    if (headRef.current) {
      gsap.fromTo(
        headRef.current.querySelectorAll(".head-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        },
      );
    }
  }, []);

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden">
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      {/* Amber glow */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] z-0" />

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24 pb-28">
        {/* Thin rule */}
        <div
          ref={lineRef}
          className="origin-left h-px bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent w-full mb-20"
        />

        {/* Section header */}
        <div ref={headRef} className="mb-16 max-w-2xl">
          <p className="head-reveal uppercase tracking-[5px] text-amber-400 text-[10px] sm:text-xs font-medium mb-4">
            Accommodation
          </p>
          <h2 className="head-reveal text-4xl sm:text-5xl font-extralight leading-[1.1] mb-5">
            {sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-bold italic text-amber-300">
              {sectionTitle.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="head-reveal text-gray-500 text-base leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Room cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-white/[0.06] pt-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              All rates include linen, towels & complimentary Wi-Fi
            </p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-amber-400/60"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-xs text-gray-600">
              Need help choosing?{" "}
              <button className="text-amber-400/80 hover:text-amber-400 underline underline-offset-4 transition-colors">
                Contact us
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
