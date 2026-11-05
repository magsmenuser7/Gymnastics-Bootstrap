"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export default function Slider({ slides }: { slides: StaticImageData[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="slider-sec overflow-hidden w-100">
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => (
          <div className="item" key={src.src} aria-hidden={i !== index}>
            <Image
              src={src}
              alt={`GAAP gymnasts, slide ${i + 1}`}
              sizes="(max-width: 1500px) 100vw, 1500px"
              placeholder="blur"
              preload={i === 0}
              loading={i === 0 ? undefined : Math.abs(i - index) <= 1 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
