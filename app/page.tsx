import Image from "next/image";
import Navbar from "./navbar";
import Slider from "./slider";
import Gallery from "./gallery";
import Effects from "./effects";
import ContactForm from "./contact-form";
import { Arrow, Mail, Phone, Pin } from "./icons";

import logo from "@/public/images/logo-one.png";
import s13 from "@/public/images/slider-thirteen.webp";
import s3 from "@/public/images/slider-three.webp";
import s4 from "@/public/images/slider-four.webp";
import s5 from "@/public/images/slider-five.webp";
import s6 from "@/public/images/slider-six.webp";
import s7 from "@/public/images/slider-seven.webp";
import s8 from "@/public/images/slider-eight.webp";
import s9 from "@/public/images/slider-nine.webp";
import s10 from "@/public/images/slider-ten.webp";
import s11 from "@/public/images/slider-eleven.webp";
import s12 from "@/public/images/slider-twelve.webp";
import s14 from "@/public/images/slider-fourteen.webp";
import s15 from "@/public/images/slider-fifteen.webp";
import s16 from "@/public/images/slider-sixteen.webp";
import s17 from "@/public/images/slider-seventeen.webp";
import s18 from "@/public/images/slider-eighteen.webp";
import s19 from "@/public/images/slider-nineteen.webp";
import aboutFour from "@/public/images/about-four.webp";
import aboutTwo from "@/public/images/about-two.webp";
import gold from "@/public/images/gold-icon.png";
import silver from "@/public/images/silver-medal-icon.png";
import bronze from "@/public/images/bronze-medal-icon.png";
import g1 from "@/public/images/gallery-one.webp";
import g2 from "@/public/images/gallery-two.webp";
import g3 from "@/public/images/gallery-three.webp";
import g4 from "@/public/images/gallery-four.webp";
import g5 from "@/public/images/gallery-five-two.webp";
import g6 from "@/public/images/gallery-six.webp";
import g7 from "@/public/images/gallery-seven.webp";
import g8 from "@/public/images/gallery-eight.webp";
import g9 from "@/public/images/gallery-nine.webp";
import g10 from "@/public/images/gallery-ten.webp";
import g11 from "@/public/images/gallery-eleven.webp";
import g12 from "@/public/images/gallery-twelve.webp";

const links = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#achieve", "Achievements"],
  ["#gallery", "Gallery"],
  ["#contact", "Contact"],
];
const slides = [s13, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s14, s15, s16, s17, s18, s19];
const gallery = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12];
const medals = [
  { icon: gold, count: 5, label: "Gold", tone: "var(--gold)" },
  { icon: silver, count: 10, label: "Silver", tone: "var(--silver)" },
  { icon: bronze, count: 15, label: "Bronze", tone: "var(--bronze)" },
];
const total = medals.reduce((n, m) => n + m.count, 0);
const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <Effects />
      <Navbar links={links} />

      <header className="hero" id="home">
        <div className="wrap">
          <div className="hero-top">
            <h1 className="display" data-reveal>
              Building Andhra&apos;s <br />
              next <em>Olympians.</em>
            </h1>
            <div className="hero-side" data-reveal style={delay(0.12)}>
              <p className="lead">
                The Gymnastics Association of Andhra Pradesh trains, competes and champions gymnasts from Guntur to the national podium.
              </p>
              <div className="hero-ctas">
                <a href="#gallery" className="btn">
                  See them fly <span className="dot"><Arrow /></span>
                </a>
                <a href="#about" className="btn btn-ghost">Our story</a>
              </div>
            </div>
          </div>

          <div className="hero-stage" data-reveal style={delay(0.2)}>
            <div className="frame">
              <Slider slides={slides} />
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="about">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow" data-reveal>About GAAP</span>
            <h2 className="title" data-reveal style={delay(0.08)}>
              GAAP. Grooms gymnasts <br />
              and <em>builds champions.</em>
            </h2>
            <p className="lead" data-reveal style={delay(0.16)}>
              The Gymnastics Association of Andhra Pradesh (GAAP) in Guntur plays a vital role in promoting gymnastics in the region.
            </p>
          </div>

          <div className="bento">
            <div className="tile tile-navy t-7" data-reveal>
              <span className="eyebrow" style={{ color: "#8ea8ff" }}>Our mission</span>
              <h3 style={{ marginTop: 16 }}>
                Groom Olympic-level athletes <em>from Andhra Pradesh.</em>
              </h3>
              <div className="inner-card">
                <p>
                  We provide the resources, guidance and platforms to get there. Our vision: make Andhra Pradesh a powerhouse in Indian
                  gymnastics, producing champions who make our state and country proud on the global stage.
                </p>
                <a href="#achieve" className="btn">
                  See our medals <span className="dot"><Arrow /></span>
                </a>
              </div>
            </div>

            <div className="tile tile-photo t-5" data-reveal style={delay(0.1)}>
              <Image src={aboutFour} alt="GAAP gymnast training on the beam" fill sizes="(max-width: 900px) 100vw, 500px" placeholder="blur" />
              <span className="tile-tag">Top-class infrastructure</span>
              <div className="tile-cap">
                <h3>
                  Train at the <em>highest level.</em>
                </h3>
                <p>Facilities in Guntur, Kadapa, Visakhapatnam and more.</p>
              </div>
            </div>

            <div className="tile tile-blue t-4" data-reveal>
              <div className="stack">
                <span className="eyebrow" style={{ color: "#fff" }}>National medalists</span>
                <div>
                  <div className="big">25+</div>
                  <p>athletes from Andhra Pradesh have won national medals across categories.</p>
                </div>
              </div>
            </div>

            <div className="tile tile-soft t-4" data-reveal style={delay(0.1)}>
              <div className="stack">
                <span className="eyebrow">Beyond the mat</span>
                <div style={{ display: "grid", gap: 16 }}>
                  <h3>
                    Sport opens <em>doors.</em>
                  </h3>
                  <p style={{ color: "var(--muted)" }}>Through the sports quota our gymnasts earn college seats and secure careers.</p>
                  <div className="chips">
                    {["Engineering", "Medical", "Railways", "Postal", "Police"].map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tile tile-photo t-4" data-reveal style={delay(0.2)}>
              <Image src={aboutTwo} alt="GAAP gymnast performing" fill sizes="(max-width: 900px) 100vw, 400px" placeholder="blur" />
              <div className="tile-cap">
                <p>Backed for six years by Shri Sri Krishna Devarayalu Garu, Hon&apos;ble Member of Parliament.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="achieve" style={{ background: "var(--bg-2)" }}>
        <div className="wrap">
          <div className="head">
            <span className="eyebrow" data-reveal>Achievements</span>
            <h2 className="title" data-reveal style={delay(0.08)}>
              Medals that <em>speak loudly.</em>
            </h2>
          </div>
          <div className="medals">
            {medals.map((m, i) => (
              <div key={m.label} className="medal" data-reveal style={{ ...delay(i * 0.1), "--tone": m.tone } as React.CSSProperties}>
                <div className="medal-top">
                  <span className="label">{m.label}</span>
                  <Image src={m.icon} alt="" sizes="64px" />
                </div>
                <div className="num" data-count={m.count}>{m.count}</div>
                <div className="meter" aria-hidden>
                  <span style={{ width: `${(m.count / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="medal-total" data-reveal>
            <div>
              <strong data-count={total}>{total}</strong> <span style={{ opacity: 0.6 }}>medals and counting</span>
            </div>
            <p>Every one of them earned on the mat by gymnasts from Andhra Pradesh.</p>
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow" data-reveal>Gallery</span>
            <h2 className="title" data-reveal style={delay(0.08)}>
              Strength, balance <br />
              and <em>pure flight.</em>
            </h2>
          </div>
          <Gallery photos={gallery} />
        </div>
      </section>

      <section className="section" id="contact" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <span className="eyebrow" data-reveal>Contact</span>
            <h2 className="title" data-reveal style={delay(0.08)}>
              Ready to <em>take the leap?</em>
            </h2>
          </div>
          <div className="contact">
            <div className="tile tile-navy contact-card" data-reveal>
              <h3>
                Come train <em>with us.</em>
              </h3>
              <div className="contact-list">
                <div className="contact-item">
                  <span className="ic"><Pin /></span>
                  <div><small>Location</small><b>BR Stadium Gymnastics Hall, Guntur</b></div>
                </div>
                <a className="contact-item" href="tel:+918143143222">
                  <span className="ic"><Phone /></span>
                  <div><small>Call us</small><b>+91 81431 43222</b></div>
                </a>
                <a className="contact-item" href="mailto:secretarygaap@gmail.com">
                  <span className="ic"><Mail /></span>
                  <div><small>Email</small><b>secretarygaap@gmail.com</b></div>
                </a>
              </div>
            </div>
            <div data-reveal style={delay(0.1)}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a href="#home" className="footer-logo"><Image src={logo} alt="GAAP logo" /></a>
              <p>
                GAAP is an official body affiliated with SAAP (Sports Authority of Andhra Pradesh), GFI (Gymnastics Federation of
                India) and the A.P. Olympic Association. It is led by Secretary Shri Namburu Subbarao, an All India Gold Medalist in
                gymnastics, with President Shri R.P.R. Vittal and Treasurer S.V. Siva Prasad Garu.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {links.map(([href, label]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Reach us</h4>
              <ul>
                <li><a href="tel:+918143143222">+91 81431 43222</a></li>
                <li><a href="mailto:secretarygaap@gmail.com">secretarygaap@gmail.com</a></li>
                <li><p>BR Stadium, Guntur</p></li>
              </ul>
            </div>
          </div>
          <div className="wordmark" aria-hidden>GAAP</div>
          <div className="copyright">
            <span>&copy; All rights reserved. Gymnastics Association of Andhra Pradesh</span>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
