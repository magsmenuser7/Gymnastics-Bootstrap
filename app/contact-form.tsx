"use client";

import { useState } from "react";

const TO = "secretarygaap@gmail.com";

// ponytail: no mail backend (the original mail.php was never configured and the site is static);
// opens the visitor's mail app instead. Swap for a route handler + SMTP if inbox delivery is needed.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = ["fname", "lname", "phone", "email", "message"]
      .map((k) => `${k.toUpperCase()}: ${f.get(k)}`)
      .join("\n");
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent("Contact Form Query")}&body=${encodeURIComponent(body)}`;
    e.currentTarget.reset();
    setSent(true);
  }

  return (
    <form className="form-res" onSubmit={onSubmit}>
      <div className="row rowsafari">
        <div className="col-lg-6 col-sm-6 col-md-6 col-6 form-div-1">
          <i className="fa fa-user"></i>
          <input type="text" name="fname" className="form-input" placeholder="First Name" aria-label="First name" required autoComplete="given-name" />
        </div>
        <div className="col-lg-6 col-sm-6 col-md-6 col-6 form-div-1">
          <i className="fa fa-user"></i>
          <input type="text" name="lname" className="form-input" placeholder="Last name" aria-label="Last name" required autoComplete="family-name" />
        </div>
      </div>
      <div className="row rowsafari">
        <div className="col-lg-6 col-sm-6 col-md-6 col-6 form-div-1">
          <i className="fa fa-phone"></i>
          <input type="tel" name="phone" className="form-input" placeholder="Your Number" aria-label="Phone number" required inputMode="numeric" pattern="[0-9+ ]{7,15}" autoComplete="tel" />
        </div>
        <div className="col-lg-6 col-sm-6 col-md-6 col-6 form-div-1">
          <i className="fa fa-envelope"></i>
          <input type="email" name="email" className="form-input" placeholder="Your Email" aria-label="Email" required autoComplete="email" />
        </div>
      </div>
      <div className="row rowsafari">
        <div className="col-lg-12 form-div-1">
          <i className="fa fa-pencil"></i>
          <textarea className="form-message" name="message" cols={40} rows={3} placeholder="Please Enter Message" aria-label="Message" required></textarea>
        </div>
      </div>
      <div className="text-center">
        <button className="boxed-btn btn-rounded" type="submit">Contact Us</button>
      </div>
      <div className="messageDiv" aria-live="polite">
        {sent && <span className="sucessMessage">Opening your email app to send the message.</span>}
      </div>
    </form>
  );
}
