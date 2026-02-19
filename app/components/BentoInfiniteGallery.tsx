"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  images: string[];
};

export default function BentoGridSlider({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    gsap.to(el, {
      x: -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const value = parseFloat(x);
          return `${value % totalWidth}px`;
        },
      },
    });
  }, []);

  const blockImages = images.slice(0, 6);
  const blocks = [blockImages, blockImages];

  return (
    <section className="h-screen w-full overflow-hidden bg-[#f4f6fb] flex items-center">
      <div ref={trackRef} className="flex gap-10 w-max">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="grid grid-cols-4 grid-rows-[1fr_1fr] gap-4 w-[900px] h-[75vh]"
          >
            {/* Large left */}
            <div className="col-span-2 row-span-2">
              <img
                src={block[0]}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            </div>

            {/* Top right */}
            <div>
              <img
                src={block[1]}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            </div>

            <div>
              <img
                src={block[2]}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            </div>

            {/* Bottom */}
            <div>
              <img
                src={block[3]}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            </div>

            <div>
              <img
                src={block[4]}
                className="w-full h-full object-cover rounded-xl"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
