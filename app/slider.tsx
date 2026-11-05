"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export default function Slider({ slides }: { slides: StaticImageData[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length, index]); // index resets the timer after a manual pick

  return (
    <div className="slides">
      {slides.map((src, i) => {
        const near = Math.abs(i - index) <= 1 || (index === slides.length - 1 && i === 0);
        return (
          <div className={`slide${i === index ? " on" : ""}`} key={src.src} aria-hidden={i !== index}>
            <Image
              src={src}
              alt={`GAAP gymnasts in action, photo ${i + 1}`}
              fill
              sizes="(max-width: 1100px) 100vw, 1040px"
              placeholder="blur"
              preload={i === 0}
              loading={i === 0 ? undefined : near ? "eager" : "lazy"}
            />
          </div>
        );
      })}
      <div className="slide-dots">
        {slides.map((s, i) => (
          <button key={s.src} className={i === index ? "on" : undefined} aria-label={`Show photo ${i + 1}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  );
}
