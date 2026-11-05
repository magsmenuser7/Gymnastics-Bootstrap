import Image from "next/image";
import Navbar from "./navbar";
import Slider from "./slider";
import ContactForm from "./contact-form";

import logo from "@/public/images/logo-one.png";
import s13 from "@/public/images/slider-thirteen.png";
import s3 from "@/public/images/slider-three.png";
import s4 from "@/public/images/slider-four.png";
import s5 from "@/public/images/slider-five.png";
import s6 from "@/public/images/slider-six.png";
import s7 from "@/public/images/slider-seven.png";
import s8 from "@/public/images/slider-eight.png";
import s9 from "@/public/images/slider-nine.png";
import s10 from "@/public/images/slider-ten.png";
import s11 from "@/public/images/slider-eleven.png";
import s12 from "@/public/images/slider-twelve.png";
import s14 from "@/public/images/slider-fourteen.png";
import s15 from "@/public/images/slider-fifteen.png";
import s16 from "@/public/images/slider-sixteen.png";
import s17 from "@/public/images/slider-seventeen.png";
import s18 from "@/public/images/slider-eighteen.png";
import s19 from "@/public/images/slider-nineteen.png";
import aboutFour from "@/public/images/about-four.jpg";
import aboutTwo from "@/public/images/about-two.jpeg";
import gold from "@/public/images/gold-icon.png";
import silver from "@/public/images/silver-medal-icon.png";
import bronze from "@/public/images/bronze-medal-icon.png";
import g1 from "@/public/images/gallery-one.jpg";
import g2 from "@/public/images/gallery-two.jpeg";
import g3 from "@/public/images/gallery-three.jpeg";
import g4 from "@/public/images/gallery-four.jpeg";
import g5 from "@/public/images/gallery-five-two.jpg";
import g6 from "@/public/images/gallery-six.jpg";
import g7 from "@/public/images/gallery-seven.jpg";
import g8 from "@/public/images/gallery-eight.jpg";
import g9 from "@/public/images/gallery-nine.jpg";
import g10 from "@/public/images/gallery-ten.jpg";
import g11 from "@/public/images/gallery-eleven.jpg";
import g12 from "@/public/images/gallery-twelve.jpg";

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
  [gold, 5, "Gold"],
  [silver, 10, "Silver"],
  [bronze, 15, "Bronze"],
] as const;

const quarter = "(max-width: 480px) 100vw, (max-width: 991px) 50vw, 350px";

export default function Home() {
  return (
    <>
      <Navbar links={links} />

      <header className="header-bg-img bg-img-property section-gray-bg" id="home">
        <div className="container-fluid">
          <div className="row rowsafari">
            <Slider slides={slides} />
          </div>
        </div>
      </header>

      <section className="section-space about position-relative section-gray-bg" id="about">
        <div className="container">
          <div className="row rowsafari">
            <div className="col-lg-6 res-desk-mar-bot">
              <h3 className="section-margin-bottom">About</h3>
              <p className="about-content">The Gymnastics Association of Andhra Pradesh (GAAP) in Guntur plays a vital role in promoting gymnastics in the region. Here’s a brief overview of GAAP in Guntur:</p><br />
              <p className="about-content">Our association’s primary purpose is to bring more gymnasts into the national and international spotlight. Over the years, we have proudly seen more than 25 athletes from Andhra Pradesh win national medals across various categories, a testament to our dedication and the talent within our state. Many of our gymnasts have not only excelled in their sport but have also benefited through the sports quota, earning seats in prestigious engineering and medical colleges, and securing jobs in the Railways, Postal services, and Police departments.</p><br />
              <p className="about-content">We are equipped with top-class gymnastics infrastructure in key districts such as Guntur, Kadapa, Visakhapatnam, and others, which provide athletes with the facilities they need to train at the highest level. This remarkable growth is also supported by Shri Sri Krishna Devarayalu Garu, Hon’ble Member of Parliament, who has been a steadfast supporter of gymnastics in Andhra Pradesh for the past six years.</p><br />
              <p className="about-content">Our mission is clear: to groom and develop Olympic-level athletes from Andhra Pradesh, and we are committed to providing the resources, guidance, and platforms to achieve this goal. As we continue to expand, our vision is to establish Andhra Pradesh as a powerhouse in Indian gymnastics, producing champions who will make our state and country proud on the global stage.</p><br />
            </div>
            <div className="col-lg-3">
              <Image src={aboutFour} alt="GAAP gymnasts training" className="img-fluid about-first-img" sizes={quarter} placeholder="blur" />
            </div>
            <div className="col-lg-3 about-img">
              <Image src={aboutTwo} alt="GAAP gymnast performing" className="img-fluid about-second-img" sizes={quarter} placeholder="blur" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space section-white-bg" id="achieve">
        <div className="container">
          <div className="section-width">
            <h2>Our Achievements</h2>
          </div>
          <div className="row rowsafari">
            {medals.map(([icon, count, label], i) => (
              <div key={label} className={`col-lg-4 col-md-6 col-sm-6 col-6 ${i < 2 ? "res-desk-mar-bot" : "mar-auto"}`}>
                <div className="locate-box content-width">
                  <div className="img-margin-bottom">
                    <Image src={icon} alt={`${label} medal`} className="img-fluid" sizes="100px" />
                  </div>
                  <h4 className="section-margin-bottom"><b>{count}</b> {label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-gray-bg" id="gallery">
        <div className="container">
          <div className="section-width">
            <h2>Gallery</h2>
          </div>
          <div className="row rowsafari">
            {gallery.map((src, i) => (
              <div key={src.src} className="col-lg-3 col-md-6 col-sm-6 col-6 mar-auto mb-4">
                <div className="game-col-1 content-width">
                  <div className="game-img-1">
                    <Image src={src} alt={`GAAP gallery photo ${i + 1}`} className="fluid-img" sizes={quarter} placeholder="blur" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space section-gray-bg" id="contact">
        <div className="container">
          <div className="section-width">
            <h2>Contact</h2>
          </div>
          <div className="row rowsafari">
            <div className="col-lg-5 res-desk-mar-bot">
              <div className="header-box">
                <div className="section-margin-bottom section-bottom-margin">
                  <h5 className="theme-color section-margin-bottom">Location :</h5>
                  <p className="section-grp-margin-bottom lt-space text-color">BR Stadium Gymnastics Hall, Guntur</p>
                </div>
                <div className="section-margin-bottom section-bottom-margin">
                  <h5 className="theme-color section-margin-bottom">To Call Us :</h5>
                  <p className="section-grp-margin-bottom lt-space"><a href="tel:+918143143222" className="text-color">+91 8143143222</a></p>
                </div>
                <div className="section-margin-bottom section-bottom-margin">
                  <h5 className="theme-color section-margin-bottom">Email Address :</h5>
                  <p className="section-grp-margin-bottom lt-space"><a href="mailto:secretarygaap@gmail.com" className="text-color">secretarygaap@gmail.com</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 no-padding-1">
              <div className="form-box">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space footer-area section-dark-bg">
        <div className="container">
          <div className="row rowsafari footer-links">
            <div className="col-lg-6 col-sm-6 col-md-6 col-6 res-desk-pad-bot">
              <div className="section-margin-bottom">
                <a href="#home"><Image src={logo} alt="GAAP logo" /></a>
              </div>
              <p className="text-white about-content">The Gymnastics Association of Andhra Pradesh (GAAP) is an official body affiliated with the SAAP (Sports Authority of Andhra Pradesh) and also affiliated with GFI (Gymnastics Federation of India), and A.P. Olympic Association, dedicated to promoting and nurturing gymnastics talent across the state. Under the leadership of Shri Namburu Subbarao, an All India Gold Medalist in gymnastics and serving as the Secretary, the association works tirelessly to uplift and support gymnasts at all levels. Shri R.P.R. Vittal, as the President, and S.V. Siva Prasad Garu, as Treasurer, further strengthen the leadership with their unwavering commitment and passion for the sport.</p>
            </div>
            <div className="col-lg-6 col-sm-6 col-md-6 col-6 res-mob-mar-bot">
              <h5 className="section-margin-bottom theme-color text-white">Important links</h5>
              <ul>
                {links.map(([href, label]) => (
                  <li key={href} className="footer-li-space">
                    <a href={href} className="footer-list-name lt-space text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="copyright clearfix">
            <div className="container">
              <div className="copy-right text-center">
                <p className="lt-space mar-top text-white">&copy; All Rights Reserved By <span>Gymnastics Association Of Andhrapradesh</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
