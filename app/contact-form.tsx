"use client";

import { useState } from "react";
import { Arrow } from "./icons";

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
    setSent(true);
  }

  if (sent)
    return (
      <div className="form" aria-live="polite">
        <div className="done">
          <span className="check">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12.5 10 17.5 19 7" />
            </svg>
          </span>
          <h3>You&apos;re <em>almost there.</em></h3>
          <p className="lead">Your email app is opening with the message ready. Just hit send.</p>
          <button className="btn btn-ghost" onClick={() => setSent(false)}>Write another</button>
        </div>
      </div>
    );

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>Send us a <em>message.</em></h3>
      <label className="field">
        <span>First name</span>
        <input type="text" name="fname" required autoComplete="given-name" />
      </label>
      <label className="field">
        <span>Last name</span>
        <input type="text" name="lname" required autoComplete="family-name" />
      </label>
      <label className="field">
        <span>Phone</span>
        <input type="tel" name="phone" required inputMode="numeric" pattern="[0-9+ ]{7,15}" autoComplete="tel" />
      </label>
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <label className="field full">
        <span>Message</span>
        <textarea name="message" rows={4} required></textarea>
      </label>
      <div className="form-foot">
        <p>Opens your email app with the message ready to send.</p>
        <button className="btn" type="submit">
          Send message <span className="dot"><Arrow /></span>
        </button>
      </div>
    </form>
  );
}
