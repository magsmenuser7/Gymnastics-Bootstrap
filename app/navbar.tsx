"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/images/logo-one.png";
import { Arrow, Close, Menu } from "./icons";

export default function Navbar({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(([href]) => {
      const el = document.querySelector(href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  const items = links.map(([href, label]) => (
    <a key={href} href={href} className={active === href ? "active" : undefined} onClick={() => setOpen(false)}>
      {label}
    </a>
  ));

  return (
    <nav className="nav wrap" aria-label="Main">
      <div className="nav-bar">
        <a href="#home" className="nav-logo" aria-label="GAAP home">
          <Image src={logo} alt="Gymnastics Association of Andhra Pradesh" preload />
        </a>
        <div className="nav-links">{items}</div>
        <a href="#contact" className="btn">
          Join GAAP <span className="dot"><Arrow /></span>
        </a>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-sheet" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      <div id="nav-sheet" className={`nav-sheet${open ? " open" : ""}`}>{items}</div>
    </nav>
  );
}
