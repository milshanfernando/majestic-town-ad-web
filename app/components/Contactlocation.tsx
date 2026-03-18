"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ─────────────────────────────────────────────────────────────────────
export interface SocialLink {
  platform:
    | "instagram"
    | "facebook"
    | "whatsapp"
    | "twitter"
    | "tiktok"
    | "youtube";
  url: string;
  handle?: string;
}

export interface ContactLocationProps {
  hotelName?: string;
  /** Full street address line */
  address?: string;
  /** City, country */
  city?: string;
  /** Google Maps embed src URL */
  mapEmbedUrl?: string;
  /** Direct Google Maps link for "Get Directions" */
  directionsUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  /** e.g. "Open 24 hours" or "8:00 AM – 10:00 PM" */
  receptionHours?: string;
  /** Nearest landmark / transport note */
  landmark?: string;
  socials?: SocialLink[];
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
}

// ── Social icons ──────────────────────────────────────────────────────────────
const SocialIcon = ({ platform }: { platform: SocialLink["platform"] }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    facebook: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    whatsapp: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    twitter: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    tiktok: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
    youtube: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  };
  return <>{icons[platform]}</>;
};

// ── Input field ───────────────────────────────────────────────────────────────
const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase tracking-[4px] text-gray-600 font-medium">
      {label}
    </label>
    {multiline ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] focus:border-amber-400/50 focus:outline-none rounded-sm px-4 py-3 text-sm text-white placeholder-gray-600 resize-none transition-colors duration-200"
      />
    ) : (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] focus:border-amber-400/50 focus:outline-none rounded-sm px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors duration-200"
      />
    )}
  </div>
);

// ── Contact info row ──────────────────────────────────────────────────────────
const InfoRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => {
  const inner = (
    <div className="group flex items-start gap-4 py-4 border-b border-white/[0.06] last:border-0">
      <div className="shrink-0 w-9 h-9 flex items-center justify-center bg-amber-400/10 border border-amber-400/20 rounded-sm text-amber-400 group-hover:bg-amber-400/20 transition-all duration-200">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-200 leading-snug">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ContactLocation = ({
  hotelName = "HavenStay",
  address = "14 Corniche Road, Al Markaziyah",
  city = "Abu Dhabi, UAE",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.3!2d54.366!3d24.466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI3JzU3LjYiTiA1NMKwMjInMDAuNiJF!5e0!3m2!1sen!2sae!4v1234567890",
  directionsUrl = "https://maps.google.com",
  phone = "+971 2 123 4567",
  whatsapp,
  email = "hello@havenstay.com",
  receptionHours = "Open 24 Hours",
  landmark,
  socials = [],
  onSubmit,
}: ContactLocationProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate
    onSubmit?.(form);
    setSent(true);
    setSending(false);
  };

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
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current.querySelectorAll(".reveal-left"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 78%" },
        },
      );
    }
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current.querySelectorAll(".reveal-right"),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 78%" },
        },
      );
    }
  }, []);

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
      {/* Amber glow — bottom left */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[140px] z-0" />

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24 pb-0">
        {/* Rule */}
        <div
          ref={lineRef}
          className="origin-left h-px bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent w-full mb-20"
        />

        {/* Section header */}
        <div className="mb-14">
          <p className="uppercase tracking-[5px] text-amber-400 text-[10px] font-medium mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-extralight leading-[1.1]">
            Find us &{" "}
            <span className="font-bold italic text-amber-300">say hello</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl leading-relaxed">
            Whether you have a question about availability, want to make a
            booking, or just need directions — we&apos;re always happy to help.
          </p>
        </div>

        {/* ── Main two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── LEFT: Contact info + map ── */}
          <div ref={leftRef} className="flex flex-col gap-0">
            {/* Contact details */}
            <div className="reveal-left bg-white/[0.02] border border-white/[0.07] rounded-sm p-6 mb-6">
              <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-2">
                Contact Details
              </p>

              <InfoRow
                label="Address"
                value={`${address}, ${city}`}
                href={directionsUrl}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                }
              />

              <InfoRow
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                }
              />

              {whatsapp && (
                <InfoRow
                  label="WhatsApp"
                  value={whatsapp}
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  }
                />
              )}

              <InfoRow
                label="Email"
                value={email}
                href={`mailto:${email}`}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />

              <InfoRow
                label="Reception"
                value={receptionHours}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
              />

              {landmark && (
                <InfoRow
                  label="Nearby"
                  value={landmark}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    </svg>
                  }
                />
              )}
            </div>

            {/* Map embed */}
            <div
              className="reveal-left relative rounded-sm overflow-hidden border border-white/[0.07]"
              style={{ height: "340px" }}
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${hotelName} location map`}
              />
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-400/50 z-10 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-amber-400/50 z-10 pointer-events-none" />
            </div>

            {/* Directions CTA */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-left mt-3 group flex items-center justify-between bg-white/[0.02] hover:bg-amber-400/10 border border-white/[0.07] hover:border-amber-400/30 rounded-sm px-5 py-4 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-amber-400"
                >
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  Get Directions on Google Maps
                </span>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-400 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="reveal-left mt-6">
                <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-3">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-white/[0.03] hover:bg-amber-400/10 border border-white/[0.07] hover:border-amber-400/20 rounded-full px-4 py-2 text-gray-400 hover:text-amber-400 transition-all duration-200"
                    >
                      <SocialIcon platform={s.platform} />
                      {s.handle && (
                        <span className="text-[12px]">{s.handle}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div ref={rightRef}>
            <div className="reveal-right bg-white/[0.02] border border-white/[0.07] rounded-sm p-8">
              <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-1">
                Send a Message
              </p>
              <h3 className="text-xl font-light text-white mb-6">
                We reply within{" "}
                <span className="text-amber-300 font-semibold">2 hours</span>
              </h3>

              {sent ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                  <div className="w-14 h-14 rounded-full border border-amber-400/30 flex items-center justify-center">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-amber-400"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Message Sent!</p>
                    <p className="text-gray-500 text-sm">
                      Thanks for reaching out. We&apos;ll get back to you
                      shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="text-[11px] text-amber-400/60 hover:text-amber-400 uppercase tracking-widest transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <Field
                    label="Your Name"
                    name="name"
                    placeholder="e.g. Ahmed Al Rashidi"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                  <Field
                    label="Your Message"
                    name="message"
                    placeholder="Ask about availability, rates, directions, or anything else..."
                    value={form.message}
                    onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                    multiline
                  />

                  {/* Quick subject chips */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[4px] text-gray-600 mb-2">
                      Quick topic
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Room Availability",
                        "Pricing",
                        "Directions",
                        "Long-term Stay",
                        "Other",
                      ].map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              message: f.message
                                ? f.message
                                : `Hi, I'd like to enquire about: ${t}.`,
                            }))
                          }
                          className="text-[11px] text-gray-500 hover:text-amber-400 bg-white/[0.03] hover:bg-amber-400/10 border border-white/[0.06] hover:border-amber-400/20 rounded-full px-3 py-1.5 transition-all duration-200"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={
                      sending || !form.name || !form.email || !form.message
                    }
                    className="group mt-1 flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/30 disabled:cursor-not-allowed text-stone-950 text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300"
                  >
                    {sending ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeOpacity="0.3"
                          />
                          <path d="M21 12a9 9 0 00-9-9" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-600 flex items-center gap-2">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-amber-400/40 shrink-0"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Your information is kept private and never shared.
                  </p>
                </div>
              )}
            </div>

            {/* Quick-contact pills */}
            <div className="reveal-right mt-4 grid grid-cols-2 gap-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-amber-400/20 rounded-sm px-4 py-3.5 transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-amber-400 shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                </svg>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                    Call Us
                  </p>
                  <p className="text-xs text-white/70 group-hover:text-white transition-colors truncate">
                    {phone}
                  </p>
                </div>
              </a>

              <a
                href={
                  whatsapp
                    ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`
                    : `mailto:${email}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-amber-400/20 rounded-sm px-4 py-3.5 transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-amber-400 shrink-0"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                    WhatsApp
                  </p>
                  <p className="text-xs text-white/70 group-hover:text-white transition-colors truncate">
                    {whatsapp ?? "Message us"}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom footer band ── */}
        <div className="mt-20 border-t border-white/[0.06] py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {hotelName} · All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              {receptionHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLocation;
