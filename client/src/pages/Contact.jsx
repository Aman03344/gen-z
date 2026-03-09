import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", subject: "", message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    }, 3500);
  };

  const contactCards = [
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      lines: ["123 Fashion Street, Style District", "New York, NY 10001"],
      sub: null,
    },
    {
      icon: <Phone size={20} />,
      title: "Call Us",
      lines: ["+1 (555) 123-4567"],
      sub: "Mon – Fri, 9 AM – 6 PM EST",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      lines: ["support@aarunya.com", "sales@aarunya.com"],
      sub: "We reply within 24 hours",
    },
  ];

  const hours = [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "11:00 AM – 5:00 PM" },
  ];

  const socials = [
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter / X", href: "#" },
  ];

  const subjects = ["General Enquiry", "Order Support", "Returns & Exchanges", "Wholesale", "Press & Media"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .contact-root {
          background: #FAFAF8;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* Reveal */
        .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .rd1 { transition-delay: 0.08s; }
        .rd2 { transition-delay: 0.16s; }
        .rd3 { transition-delay: 0.24s; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes checkPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }

        /* Hero */
        .hero {
          position: relative;
          height: 460px;
          overflow: hidden;
          background: #1C1C1A;
        }
        .hero-img {
          width: 100%; height: 115%;
          object-fit: cover; object-position: center 40%;
        }
        .hero-ov1 { position: absolute; inset: 0; background: rgba(28,28,26,0.72); }
        .hero-ov2 { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,28,26,0.55) 0%, transparent 45%); }
        .hero-inner {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; text-align: center;
          padding: 0 24px;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 100px;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-bottom: 22px;
        }

        /* Section util */
        .sec-wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .sec-label {
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #AAA8A3; margin-bottom: 10px;
        }
        .sec-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; color: #1C1C1A; line-height: 1.12;
        }
        .divider { height: 1px; background: #EDEAE5; }

        /* Form inputs */
        .field-wrap { display: flex; flex-direction: column; gap: 6px; }
        .field-label {
          font-size: 12px; font-weight: 500;
          color: #6B6860; letter-spacing: 0.04em;
        }
        .field-input {
          padding: 13px 16px;
          background: #fff;
          border: 1.5px solid #EDEAE5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #1C1C1A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .field-input::placeholder { color: #C5C3BE; }
        .field-input:focus {
          border-color: #1C1C1A;
          box-shadow: 0 0 0 3px rgba(28,28,26,0.07);
        }
        .field-input.active {
          border-color: #1C1C1A;
          box-shadow: 0 0 0 3px rgba(28,28,26,0.07);
        }
        textarea.field-input { resize: none; line-height: 1.65; }

        /* Subject pills */
        .subject-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .subject-pill {
          padding: 8px 16px;
          background: #fff;
          border: 1.5px solid #EDEAE5;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 400; color: #6B6860;
          cursor: pointer;
          transition: all 0.18s;
        }
        .subject-pill:hover { border-color: #1C1C1A; color: #1C1C1A; }
        .subject-pill.selected { border-color: #1C1C1A; background: #1C1C1A; color: #fff; }

        /* Submit button */
        .submit-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 15px 28px;
          background: #1C1C1A; color: #fff;
          border: none; border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          cursor: pointer; letter-spacing: 0.03em;
          transition: background 0.2s, transform 0.15s;
        }
        .submit-btn:hover { background: #2D2D2A; }
        .submit-btn:active { transform: scale(0.99); }
        .submit-btn.success { background: #166534; }

        /* Success tick */
        .success-tick { animation: checkPop 0.35s ease; }

        /* Contact card */
        .contact-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 22px 20px;
          background: #fff;
          border: 1px solid #EDEAE5;
          border-radius: 18px;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .contact-card:hover {
          box-shadow: 0 10px 32px rgba(28,28,26,0.08);
          transform: translateY(-3px);
        }
        .contact-card-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: #1C1C1A; color: #fff;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s;
        }
        .contact-card:hover .contact-card-icon { transform: scale(1.1) rotate(-4deg); }

        /* Hours block */
        .hours-block {
          background: #1C1C1A;
          border-radius: 20px;
          padding: 28px 28px;
          overflow: hidden;
          position: relative;
        }
        .hours-block::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
        }
        .hours-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: relative;
        }
        .hours-row:last-child { border-bottom: none; padding-bottom: 0; }
        .hours-row:first-child { padding-top: 0; }

        /* Social links */
        .social-link {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #EDEAE5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400; color: #1C1C1A;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
          flex: 1; min-width: 0;
        }
        .social-link:hover { border-color: #1C1C1A; background: #FAFAF8; }
        .social-link-arrow { margin-left: auto; color: #AAA8A3; flex-shrink: 0; }

        /* Main grid */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .main-grid { grid-template-columns: 1.1fr 0.9fr; gap: 64px; }
        }

        /* 2-col grid */
        .two-col { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 480px) {
          .two-col { grid-template-columns: 1fr 1fr; }
        }

        /* Map */
        .map-frame {
          height: 380px;
          border-radius: 22px;
          overflow: hidden;
          background: #F0EDE8;
          border: 1px solid #EDEAE5;
          box-shadow: 0 4px 24px rgba(28,28,26,0.06);
        }
        .map-frame iframe { width: 100%; height: 100%; border: none; display: block; }
      `}</style>

      <div className="contact-root">

        {/* ── Hero ── */}
        <div className="hero">
          <img
            className="hero-img"
            src="https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contact"
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
          />
          <div className="hero-ov1" />
          <div className="hero-ov2" />
          <div className="hero-inner">
            <div className="hero-tag" style={{ animation: "fadeIn 0.8s ease 0.2s both" }}>
              <Sparkles size={10} /> Get in Touch
            </div>
            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 300, color: "#fff",
              lineHeight: 1.08, letterSpacing: "-0.01em",
              marginBottom: 16, maxWidth: 640,
              animation: "fadeUp 0.8s ease 0.3s both"
            }}>
              We'd Love to<br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>Hear From You</em>
            </h1>
            <p style={{
              fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 300,
              color: "rgba(255,255,255,0.55)", maxWidth: 420, lineHeight: 1.7,
              animation: "fadeUp 0.8s ease 0.45s both"
            }}>
              Send us a message and we'll respond within 24 hours.
            </p>
          </div>
        </div>

        {/* ── Main content ── */}
        <section style={{ padding: "80px 0 88px" }}>
          <div className="sec-wrap">
            <div className="main-grid">

              {/* ── LEFT: Form ── */}
              <div className="reveal">
                <p className="sec-label"><span style={{ marginRight: 8 }}>——</span>Send a Message</p>
                <h2 className="sec-heading" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 8 }}>
                  Let's start a<br />
                  <em style={{ fontStyle: "italic" }}>conversation</em>
                </h2>
                <p style={{ fontSize: 13, color: "#AAA8A3", fontWeight: 300, marginBottom: 36, lineHeight: 1.7 }}>
                  Fill out the form below and our team will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Name row */}
                  <div className="two-col">
                    <div className="field-wrap">
                      <label className="field-label">First Name <span style={{ color: "#DC2626" }}>*</span></label>
                      <input
                        type="text" name="firstName" value={formData.firstName}
                        onChange={handleChange} placeholder="Rahul"
                        className={`field-input${focused === "firstName" ? " active" : ""}`}
                        onFocus={() => setFocused("firstName")}
                        onBlur={() => setFocused("")}
                        required
                      />
                    </div>
                    <div className="field-wrap">
                      <label className="field-label">Last Name <span style={{ color: "#DC2626" }}>*</span></label>
                      <input
                        type="text" name="lastName" value={formData.lastName}
                        onChange={handleChange} placeholder="Sharma"
                        className={`field-input${focused === "lastName" ? " active" : ""}`}
                        onFocus={() => setFocused("lastName")}
                        onBlur={() => setFocused("")}
                        required
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="two-col">
                    <div className="field-wrap">
                      <label className="field-label">Email Address <span style={{ color: "#DC2626" }}>*</span></label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="rahul@example.com"
                        className={`field-input${focused === "email" ? " active" : ""}`}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        required
                      />
                    </div>
                    <div className="field-wrap">
                      <label className="field-label">Phone Number</label>
                      <input
                        type="tel" name="phone" value={formData.phone}
                        onChange={handleChange} placeholder="+91 98765 43210"
                        className={`field-input${focused === "phone" ? " active" : ""}`}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused("")}
                      />
                    </div>
                  </div>

                  {/* Subject pills */}
                  <div className="field-wrap">
                    <label className="field-label">Subject</label>
                    <div className="subject-pills">
                      {subjects.map((s) => (
                        <button
                          key={s} type="button"
                          className={`subject-pill${formData.subject === s ? " selected" : ""}`}
                          onClick={() => setFormData(f => ({ ...f, subject: f.subject === s ? "" : s }))}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="field-wrap">
                    <label className="field-label">Message <span style={{ color: "#DC2626" }}>*</span></label>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange} rows={5}
                      placeholder="How can we help you?"
                      className={`field-input${focused === "message" ? " active" : ""}`}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      required
                    />
                    <span style={{ fontSize: 11, color: "#C5C3BE", alignSelf: "flex-end" }}>
                      {formData.message.length} / 500
                    </span>
                  </div>

                  <button type="submit" className={`submit-btn${isSubmitted ? " success" : ""}`}>
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={18} className="success-tick" />
                        Message Sent — We'll be in touch!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: 11, color: "#AAA8A3", textAlign: "center", fontWeight: 300 }}>
                    We typically respond within 24 business hours.
                  </p>
                </form>
              </div>

              {/* ── RIGHT: Info ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                <div className="reveal rd1">
                  <p className="sec-label"><span style={{ marginRight: 8 }}>——</span>Contact Details</p>
                  <h2 className="sec-heading" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 24 }}>
                    Reach us<br />
                    <em style={{ fontStyle: "italic" }}>anytime</em>
                  </h2>

                  {/* Contact cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    {contactCards.map((c, i) => (
                      <div key={i} className="contact-card">
                        <div className="contact-card-icon">{c.icon}</div>
                        <div>
                          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1A", marginBottom: 5 }}>
                            {c.title}
                          </p>
                          {c.lines.map((l, j) => (
                            <p key={j} style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#6B6860", fontWeight: 300, lineHeight: 1.6 }}>
                              {l}
                            </p>
                          ))}
                          {c.sub && (
                            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#AAA8A3", marginTop: 4 }}>
                              {c.sub}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="hours-block reveal rd2">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <Clock size={18} color="rgba(255,255,255,0.4)" />
                    <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, color: "#fff", letterSpacing: "0.04em" }}>
                      Store Hours
                    </p>
                  </div>
                  {hours.map((h, i) => (
                    <div key={i} className="hours-row">
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                        {h.day}
                      </span>
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#fff", fontWeight: 500 }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div className="reveal rd3">
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 500, color: "#AAA8A3", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                    Follow Us
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {socials.map((s, i) => (
                      <a key={i} href={s.href} className="social-link">
                        <span style={{ color: "#AAA8A3", display: "flex" }}>{s.icon}</span>
                        {s.label}
                        <ArrowUpRight size={13} className="social-link-arrow" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Map ── */}
            <div style={{ marginTop: 72 }} className="reveal">
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <p className="sec-label">Find Us</p>
                <h2 className="sec-heading" style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>
                  Our Location
                </h2>
              </div>
              <div className="map-frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;