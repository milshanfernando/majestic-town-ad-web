"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const imagesList = [
  { src: "/images/hero3.jpg", alt: "Comfortable Guest House Interior" },
  { src: "/images/hero1.jpg", alt: "Guest House Room" },
  { src: "/images/hero2.jpg", alt: "Shared Living Space" },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLDivElement>(".hero-image");

      gsap.set(images, { opacity: 0, scale: 1.05 });
      gsap.set(images[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // clean fixed scroll distance
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      images.forEach((img, i) => {
        if (i === 0) return;

        tl.to(images[i - 1], { opacity: 0, scale: 1.05, duration: 1 }).to(
          img,
          { opacity: 1, scale: 1, duration: 1 },
          "<",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Images */}
      {imagesList.map((image, index) => (
        <div key={index} className="hero-image absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 text-white text-center">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[4px] text-amber-400 mb-4 text-xs sm:text-sm">
            Comfortable • Affordable • Clean
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
            Modern Living
            <span className="block font-semibold">Made Simple</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-200 mb-8 leading-relaxed">
            Private rooms with shared bathrooms and washrooms. Designed for
            comfort, convenience, and a relaxed stay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 transition duration-300 text-black font-medium rounded-full">
              View Rooms
            </button>

            <button className="px-8 py-3 border border-white/40 hover:bg-white hover:text-black transition duration-300 rounded-full">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
