"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/kingbed.jpeg",
  "/images/singlebed.jpeg",
  "/images/queen.jpeg",
  "/images/loby.jpeg",
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // 🔥 Scroll Pin + Image Change Logic
  useEffect(() => {
    let currentIndex = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top", // when section hits top of screen
        end: `+=${images.length * 700}`, // scroll distance
        scrub: true,
        pin: true, // 👈 locks section
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.floor(self.progress * images.length);

          if (newIndex !== currentIndex && newIndex < images.length) {
            currentIndex = newIndex;
            setActiveIndex(newIndex);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 🔥 Image Transition Animation
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="w-full bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 ">
        {/* ================= LEFT SIDE – PREMIUM IMAGE SLIDER ================= */}
        <div className="w-full">
          {/* Main Image */}
          <div
            ref={imageRef}
            className="relative w-full h-[300px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-6 will-change-transform"
          >
            <Image
              src={images[activeIndex]}
              alt="Room Image"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative h-[90px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-amber-500 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE – CONTENT ================= */}
        <div>
          <p className="uppercase tracking-[4px] text-amber-500 text-xs sm:text-sm mb-4">
            About Our Properties
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight">
            Modern & Affordable
            <span className="block font-semibold">
              Guest Living in Abu Dhabi
            </span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            We proudly operate three well-maintained guest house properties in
            Abu Dhabi, offering clean, comfortable, and affordable accommodation
            for daily stays.
          </p>

          {/* Property List */}
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold text-lg">Majestic Town</h3>
              <p className="text-gray-600 text-sm">
                Located in Khalidiya, near Etisalat Building.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Vouge Inn</h3>
              <p className="text-gray-600 text-sm">
                Located in Khalidiya, near Etisalat Building.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">DSV Property</h3>
              <p className="text-gray-600 text-sm">
                Near Shining Tower, Al Khalidiya.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">Prime Location</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">Daily Housekeeping</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">High-Speed WiFi</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-lg">✔</span>
              <span className="text-gray-700 text-sm">
                Affordable Daily Rates
              </span>
            </div>
          </div>

          {/* Room Types */}
          <div>
            <h4 className="font-semibold mb-3">Room Types Available:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Single Rooms, Queen Rooms, and King Rooms with clean shared
              washrooms and kitchen facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
