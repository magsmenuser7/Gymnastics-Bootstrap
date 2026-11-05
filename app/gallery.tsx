"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { Close, Left, Right } from "./icons";

export default function Gallery({ photos }: { photos: StaticImageData[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + photos.length) % photos.length);

  return (
    <>
      <div className="gallery">
        {photos.map((src, n) => (
          <button
            key={src.src}
            className="shot"
            data-reveal
            style={{ "--d": `${(n % 4) * 0.07}s` } as React.CSSProperties}
            aria-label={`Open photo ${n + 1}`}
            onClick={() => {
              setI(n);
              dialog.current?.showModal();
            }}
          >
            <Image src={src} alt={`GAAP gallery photo ${n + 1}`} fill sizes="(max-width: 900px) 50vw, 600px" placeholder="blur" />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => (e.key === "ArrowLeft" ? go(-1) : e.key === "ArrowRight" ? go(1) : null)}
      >
        <Image src={photos[i]} alt={`GAAP gallery photo ${i + 1}`} sizes="1100px" placeholder="blur" />
        <span className="lb-count">{i + 1} / {photos.length}</span>
        <button className="lb-btn lb-close" aria-label="Close" onClick={() => dialog.current?.close()}><Close /></button>
        <button className="lb-btn lb-prev" aria-label="Previous photo" onClick={() => go(-1)}><Left /></button>
        <button className="lb-btn lb-next" aria-label="Next photo" onClick={() => go(1)}><Right /></button>
      </dialog>
    </>
  );
}
