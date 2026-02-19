"use client";

import { useState } from "react";

type Props = {
  images: string[];
};

export default function LuxuryGallery({ images }: Props) {
  const [active, setActive] = useState<string | null>(null);

  if (!images?.length) return null;

  return (
    <section className="w-full py-28 bg-gradient-to-b from-[#f8f9fc] to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Elegant Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-gray-800">
            Our Gallery
          </h2>
          <div className="w-24 h-[2px] bg-gray-300 mx-auto mt-6"></div>
        </div>

        {/* Featured Image */}
        <div
          className="mb-12 overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
          onClick={() => setActive(images[0])}
        >
          <img
            src={images[0]}
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            alt=""
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.slice(1).map((src, i) => (
            <div
              key={i}
              onClick={() => setActive(src)}
              className="break-inside-avoid overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
            >
              <img
                src={src}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
        >
          <img
            src={active}
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            alt=""
          />
        </div>
      )}
    </section>
  );
}
