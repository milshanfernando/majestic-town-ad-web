"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  images: string[];
};

export default function BentoInfiniteGallery({ images }: Props) {
  const track = useRef<HTMLDivElement>(null);

  const state = useRef({
    x: 0,
    isDown: false,
    startX: 0,
    lastX: 0,
  });

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      const items = el.querySelectorAll<HTMLElement>(".bento-item");
      if (!items.length) return;

      let oneSetWidth = 0;
      for (let i = 0; i < items.length / 2; i++) {
        oneSetWidth += items[i].offsetWidth + 16;
      }

      const render = () => {
        const wrapped = gsap.utils.wrap(-oneSetWidth, 0, state.current.x);
        gsap.set(el, { x: wrapped });
      };

      const auto = gsap.ticker.add(() => {
        if (!state.current.isDown) {
          state.current.x -= 0.4; // speed
          render();
        }
      });

      const onDown = (e: PointerEvent) => {
        state.current.isDown = true;
        state.current.startX = e.clientX;
        state.current.lastX = state.current.x;
        el.setPointerCapture(e.pointerId);
      };

      const onMove = (e: PointerEvent) => {
        if (!state.current.isDown) return;
        const delta = e.clientX - state.current.startX;
        state.current.x = state.current.lastX + delta;
        render();
      };

      const onUp = () => {
        state.current.isDown = false;
      };

      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);

      render();

      return () => {
        gsap.ticker.remove(auto);

        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    },
    { dependencies: [images] },
  );

  const list = [...images, ...images];

  return (
    <div className="overflow-hidden w-full py-10">
      <div
        ref={track}
        className="flex gap-4 cursor-grab active:cursor-grabbing select-none will-change-transform"
      >
        {list.map((src, i) => (
          <div key={i} className={bentoClass(i) + " bento-item"}>
            <img
              src={src}
              draggable={false}
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function bentoClass(i: number) {
  const mod = i % 7;

  if (mod === 0) return "w-[320px] h-[320px] shrink-0 rounded-2xl";
  if (mod === 1) return "w-[220px] h-[150px] shrink-0 rounded-2xl";
  if (mod === 2) return "w-[220px] h-[220px] shrink-0 rounded-2xl";
  if (mod === 3) return "w-[300px] h-[180px] shrink-0 rounded-2xl";
  if (mod === 4) return "w-[180px] h-[180px] shrink-0 rounded-2xl";
  if (mod === 5) return "w-[260px] h-[320px] shrink-0 rounded-2xl";

  return "w-[200px] h-[260px] shrink-0 rounded-2xl";
}
