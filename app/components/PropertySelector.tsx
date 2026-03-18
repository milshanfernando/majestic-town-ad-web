"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        />
        <path
          d="M9 21V14h6v7"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <path
          d="M1 10l11-8 11 8"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          strokeLinecap="round"
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
        />
        <path
          d="M12 6v6l4 2"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const PropertySelector = () => {
  const pathname = usePathname();

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 hidden sm:flex">
      {/* Header label */}
      <div className="flex flex-col mb-1 px-1">
        <span className="text-white/40 text-[9px] tracking-[4px] uppercase">
          Our Properties
        </span>
        <span className="text-amber-400 text-[9px] tracking-[3px] uppercase mt-0.5">
          Abu Dhabi
        </span>
      </div>

      {/* Property cards */}
      {properties.map((p) => {
        const isActive = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            className={`
              group relative overflow-hidden rounded-[10px] px-4 py-3.5
              border transition-all duration-300 ease-out
              flex items-center gap-2.5 w-[190px]
              ${
                isActive
                  ? "border-amber-400/60 bg-amber-500/10"
                  : "border-amber-400/20 bg-white/[0.04] hover:bg-amber-500/[0.06] hover:border-amber-400/50 hover:-translate-x-1"
              }
            `}
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon box */}
            <div
              className={`
                relative z-10 w-8 h-8 rounded-md flex items-center justify-center shrink-0
                border transition-all duration-300
                ${
                  isActive
                    ? "bg-amber-400/20 border-amber-400/50"
                    : "bg-amber-400/10 border-amber-400/25 group-hover:bg-amber-400/20"
                }
              `}
            >
              {p.icon}
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1 min-w-0">
              <p
                className={`text-[12px] font-medium tracking-[0.4px] truncate transition-colors duration-300
                  ${isActive ? "text-amber-400" : "text-white/90 group-hover:text-amber-400"}
                `}
              >
                {p.name}
              </p>
              <p className="text-white/30 text-[10px] tracking-[2px] uppercase mt-0.5">
                {p.location}
              </p>
            </div>

            {/* Arrow */}
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

            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute right-3 top-3 w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-amber-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        );
      })}

      {/* Chain footer */}
      <div className="flex items-center gap-2 px-1 mt-1 opacity-30">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-white/50 text-[9px] tracking-[3px] uppercase whitespace-nowrap">
          Majestic Chain
        </span>
        <div className="flex-1 h-px bg-white/20" />
      </div>
    </div>
  );
};

export default PropertySelector;
