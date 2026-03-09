import {
  Award,
  Users,
  TrendingUp,
  Heart,
  Leaf,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for reveal animations
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const values = [
    {
      icon: <Award size={22} />,
      title: "Premium Quality",
      desc: "Finest materials and expert craftsmanship in every single piece we create.",
    },
    {
      icon: <Leaf size={22} />,
      title: "Sustainable",
      desc: "Eco-friendly materials and ethical production at every step.",
    },
    {
      icon: <Users size={22} />,
      title: "Customer First",
      desc: "Your satisfaction and trust are at the heart of everything we do.",
    },
    {
      icon: <Heart size={22} />,
      title: "Passion",
      desc: "Unwavering love for fashion and dedication to genuine excellence.",
    },
  ];

  const differenceItems = [
    "Ethically sourced materials from sustainable suppliers",
    "Handcrafted with attention to every last detail",
    "Timeless designs that transcend seasonal trends",
    "Fair labor practices throughout our supply chain",
    "Exceptional customer service, every time",
    "Carbon-neutral shipping on all orders",
  ];

  const stats = [
    { num: "10K+", label: "Happy Customers" },
    { num: "500+", label: "Products" },
    { num: "4.9★", label: "Average Rating" },
    { num: "15+", label: "Countries Served" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .about-root {
          background: #FAFAF8;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Reveal animation ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* ── Section label ── */
        .sec-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #AAA8A3;
          margin-bottom: 10px;
        }
        .sec-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          color: #1C1C1A;
          line-height: 1.12;
          letter-spacing: -0.01em;
        }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #EDEAE5 20%, #EDEAE5 80%, transparent);
        }

        /* ── Hero ── */
        .hero-wrap {
          position: relative;
          height: 520px;
          overflow: hidden;
          background: #1C1C1A;
        }
        .hero-img {
          width: 100%; height: 115%;
          object-fit: cover;
          object-position: center 30%;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(110deg, rgba(28,28,26,0.82) 0%, rgba(28,28,26,0.4) 55%, transparent 100%);
        }
        .hero-overlay-bottom {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,28,26,0.45) 0%, transparent 40%);
        }
        .hero-content {
          position: absolute; inset: 0;
          display: flex; align-items: center;
          max-width: 1280px; margin: 0 auto; padding: 0 28px;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 100px;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin-bottom: 20px;
        }

        /* ── Sections ── */
        .section-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Story grid ── */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .story-grid { grid-template-columns: 1fr 1fr; gap: 72px; }
        }

        .story-img-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .story-img-col { display: flex; flex-direction: column; gap: 12px; }
        .story-img-col.offset { padding-top: 32px; }

        .img-frame {
          border-radius: 16px;
          overflow: hidden;
          background: #F0EDE8;
        }
        .img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
          display: block;
        }
        .img-frame:hover img { transform: scale(1.04); }

        /* ── Customer avatar cluster ── */
        .avatar-cluster {
          display: flex;
          align-items: center;
          margin-top: 28px;
        }
        .avatar-ring {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2.5px solid #FAFAF8;
          background: #E5E2DC;
          margin-left: -10px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .avatar-ring:first-child { margin-left: 0; }

        /* ── Mission/Vision cards ── */
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .mv-grid { grid-template-columns: 1fr 1fr; }
        }
        .mv-card {
          background: #fff;
          border: 1px solid #EDEAE5;
          border-radius: 24px;
          padding: 36px;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .mv-card:hover {
          box-shadow: 0 16px 48px rgba(28,28,26,0.08);
          transform: translateY(-4px);
        }
        .mv-icon {
          width: 52px; height: 52px;
          background: #1C1C1A; color: #fff;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }

        /* ── Values ── */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .value-card {
          background: #fff;
          border: 1px solid #EDEAE5;
          border-radius: 20px;
          padding: 28px 24px;
          transition: box-shadow 0.3s, transform 0.3s;
          cursor: default;
        }
        .value-card:hover {
          box-shadow: 0 12px 36px rgba(28,28,26,0.08);
          transform: translateY(-4px);
        }
        .value-icon {
          width: 48px; height: 48px;
          background: #1C1C1A; color: #fff;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: transform 0.3s;
        }
        .value-card:hover .value-icon { transform: scale(1.1) rotate(-4deg); }

        /* ── Difference (dark) block ── */
        .diff-wrap {
          background: #1C1C1A;
          border-radius: 28px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .diff-wrap { grid-template-columns: 1fr 1fr; }
        }
        .diff-text { padding: 52px 48px; }
        .diff-img {
          position: relative;
          min-height: 300px;
          background: #111;
          overflow: hidden;
        }
        .diff-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.75; }
        .diff-img::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, #1C1C1A 0%, transparent 35%);
        }

        .check-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .check-item:last-child { border-bottom: none; }
        .check-dot {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        /* ── Stats ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: #EDEAE5;
          border-radius: 24px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .stat-cell {
          background: #fff;
          padding: 36px 24px;
          text-align: center;
          transition: background 0.2s;
        }
        .stat-cell:hover { background: #FAFAF8; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 300;
          color: #1C1C1A; line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 12px; font-weight: 400;
          color: #AAA8A3; letter-spacing: 0.06em;
        }

        /* ── CTA strip ── */
        .cta-strip {
          background: #1C1C1A;
          border-radius: 24px;
          padding: 52px 48px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          background: #fff; color: #1C1C1A;
          border: none; border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s;
          cursor: pointer;
        }
        .cta-btn:hover { background: #F5F3EF; }
        .cta-btn svg { transition: transform 0.2s; }
        .cta-btn:hover svg { transform: translateX(4px); }
      `}</style>

      <div className="about-root">
        {/* ── Hero ── */}
        <div className="hero-wrap">
          <img
            className="hero-img"
            src="https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About AARUNYA"
            style={{ transform: `translateY(${scrollY * 0.28}px)` }}
          />
          <div className="hero-overlay" />
          <div className="hero-overlay-bottom" />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "0 28px",
                width: "100%",
              }}
            >
              <div style={{ maxWidth: 560 }}>
                <div
                  className="hero-tag"
                  style={{ animation: "fadeIn 0.8s ease 0.2s both" }}
                >
                  <Sparkles size={10} /> Our Story
                </div>
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(48px, 7vw, 80px)",
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.06,
                    letterSpacing: "-0.01em",
                    marginBottom: 16,
                    animation: "fadeUp 0.8s ease 0.35s both",
                  }}
                >
                  About
                  <br />
                  <em style={{ fontStyle: "italic", fontWeight: 400 }}>
                    AARUNYA
                  </em>
                </h1>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.75,
                    maxWidth: 420,
                    animation: "fadeUp 0.8s ease 0.5s both",
                  }}
                >
                  Redefining premium fashion through quality, sustainability,
                  and timeless design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Our Story ── */}
        <section style={{ padding: "88px 0 0" }}>
          <div className="section-wrap">
            <div className="story-grid reveal">
              {/* Text side */}
              <div>
                <p className="sec-label">
                  <span style={{ marginRight: 8 }}>——</span>Since 2020
                </p>
                <h2
                  className="sec-heading"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    marginBottom: 24,
                  }}
                >
                  Crafted with
                  <br />
                  <em style={{ fontStyle: "italic" }}>Purpose</em>
                </h2>

                <p
                  style={{
                    fontSize: 15,
                    color: "#6B6860",
                    lineHeight: 1.8,
                    marginBottom: 16,
                    fontWeight: 300,
                  }}
                >
                  Founded in 2020, AARUNYA emerged from a simple belief: fashion
                  should be both premium and accessible. We set out to create a
                  brand that celebrates individuality while maintaining the
                  highest standards of quality and craftsmanship.
                </p>
                <p
                  style={{
                    fontSize: 15,
                    color: "#6B6860",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  Today, we're proud to offer a carefully curated collection
                  that blends timeless elegance with contemporary style —
                  serving fashion-forward individuals who refuse to compromise
                  on quality.
                </p>

                {/* Customer avatars */}
                <div className="avatar-cluster">
                  {["#C5C3BE", "#B0ADA8", "#9C9992", "#888580", "#757370"].map(
                    (bg, i) => (
                      <div
                        key={i}
                        className="avatar-ring"
                        style={{ background: bg }}
                      />
                    ),
                  )}
                  <p style={{ marginLeft: 14, fontSize: 13, color: "#AAA8A3" }}>
                    <strong style={{ color: "#1C1C1A", fontWeight: 600 }}>
                      10,000+
                    </strong>{" "}
                    happy customers
                  </p>
                </div>
              </div>

              {/* Image mosaic */}
              <div className="story-img-grid">
                <div className="story-img-col">
                  <div className="img-frame" style={{ aspectRatio: "1" }}>
                    <img
                      src="https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Fashion design"
                    />
                  </div>
                  <div className="img-frame" style={{ aspectRatio: "16/10" }}>
                    <img
                      src="https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Materials"
                    />
                  </div>
                </div>
                <div className="story-img-col offset">
                  <div className="img-frame" style={{ aspectRatio: "16/10" }}>
                    <img
                      src="https://images.pexels.com/photos/9558797/pexels-photo-9558797.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Craftsmanship"
                    />
                  </div>
                  <div className="img-frame" style={{ aspectRatio: "1" }}>
                    <img
                      src="https://images.pexels.com/photos/5650017/pexels-photo-5650017.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Quality check"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ padding: "72px 0" }}>
          <div className="section-wrap">
            <div className="stats-grid reveal">
              {stats.map((s, i) => (
                <div key={i} className="stat-cell">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-wrap">
          <div className="divider" />
        </div>

        {/* ── Mission & Vision ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="section-wrap">
            <div
              style={{ textAlign: "center", marginBottom: 48 }}
              className="reveal"
            >
              <p className="sec-label">What Drives Us</p>
              <h2
                className="sec-heading"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Mission &amp; Vision
              </h2>
            </div>

            <div className="mv-grid">
              <div className="mv-card reveal reveal-delay-1">
                <div className="mv-icon">
                  <Star size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "#1C1C1A",
                    marginBottom: 14,
                  }}
                >
                  Our Mission
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B6860",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  To empower individuals through exceptional clothing that
                  combines premium quality, sustainable practices, and timeless
                  design. We believe great fashion should be an investment in
                  yourself — and the planet.
                </p>
              </div>

              <div className="mv-card reveal reveal-delay-2">
                <div className="mv-icon">
                  <TrendingUp size={24} />
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "#1C1C1A",
                    marginBottom: 14,
                  }}
                >
                  Our Vision
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B6860",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  To become the global leader in premium sustainable fashion,
                  setting new standards for quality, ethics, and style. A world
                  where fashion elevates both people and the environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-wrap">
          <div className="divider" />
        </div>

        {/* ── Values ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="section-wrap">
            <div
              style={{ textAlign: "center", marginBottom: 48 }}
              className="reveal"
            >
              <p className="sec-label">What We Stand For</p>
              <h2
                className="sec-heading"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Our Core Values
              </h2>
            </div>

            <div className="values-grid">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`value-card reveal reveal-delay-${i + 1}`}
                >
                  <div className="value-icon">{v.icon}</div>
                  <h4
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1C1C1A",
                      marginBottom: 8,
                    }}
                  >
                    {v.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#AAA8A3",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Difference ── */}
        <section style={{ padding: "0 0 80px" }}>
          <div className="section-wrap">
            <div className="diff-wrap reveal">
              <div className="diff-text">
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 12,
                  }}
                >
                  Why Choose Us
                </p>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(30px, 4vw, 44px)",
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.15,
                    marginBottom: 36,
                  }}
                >
                  The AARUNYA
                  <br />
                  <em style={{ fontStyle: "italic" }}>Difference</em>
                </h3>

                <div>
                  {differenceItems.map((item, i) => (
                    <div key={i} className="check-item">
                      <div className="check-dot">
                        <CheckCircle size={12} color="rgba(255,255,255,0.5)" />
                      </div>
                      <p
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,0.65)",
                          lineHeight: 1.6,
                          fontWeight: 300,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="diff-img">
                <img
                  src="https://images.pexels.com/photos/4467889/pexels-photo-4467889.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Sustainable fashion"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "0 0 88px" }}>
          <div className="section-wrap">
            <div className="cta-strip reveal">
              <div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  Ready to explore
                  <br />
                  <em style={{ fontStyle: "italic" }}>the collection?</em>
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 300,
                  }}
                >
                  Discover premium pieces crafted just for you.
                </p>
              </div>
              <Link to="/shop" className="cta-btn">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
