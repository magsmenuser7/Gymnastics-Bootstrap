"use client";

import { useEffect } from "react";

// Scroll reveal for [data-reveal] and count-up for [data-count]. Renders nothing.
export default function Effects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (reduce) return void (el.textContent = String(to));
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) count(el);
          io.unobserve(el);
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal], [data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
