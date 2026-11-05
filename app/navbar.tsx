"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "@/public/images/logo-one.png";

export default function Navbar({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg nav-color clearfix no-padding navbar-light navbar-menu sticky-top"
      id="menu_top"
    >
      <div className="container">
        <div className="logo-style float-left">
          <a href="#home">
            <Image src={logo} alt="Gymnastics Association of Andhra Pradesh logo" preload />
          </a>
        </div>
        <button
          className={`navbar-toggler border${open ? "" : " collapsed"}`}
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${open ? " show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav">
            {links.map(([href, label]) => (
              <li key={href} className="safari-menu safari-menu-bg">
                <a href={href} className="nav-link nav-style" onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
