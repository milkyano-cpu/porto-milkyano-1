"use client";

import { useEffect, useRef, useState } from "react";

export default function EmeraldLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setIsMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (menuOpen) setMenuOpen(false);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };
    const interval = setInterval(() => setTick((t) => t + 1), 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, [menuOpen]);

  const gemOpacity = Math.max(0, 1 - scrollY * 0.003);
  const gemY = isMobile ? 0 : scrollY * 0.25;

  const lt1 = Math.sin(tick * 0.18) > 0.6;
  const lt2 = Math.sin(tick * 0.13 + 1.2) > 0.55;
  const lt3 = Math.sin(tick * 0.22 + 2.4) > 0.7;
  const lt4 = Math.sin(tick * 0.16 + 0.8) > 0.65;

  return (
    <div style={{ background: "#000", minHeight: "100vh", overflowX: "hidden", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes burst-rotate {
          from { transform: translate(-50%, -55%) rotate(0deg); }
          to { transform: translate(-50%, -55%) rotate(360deg); }
        }
        @keyframes float-gem {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.5; }
          100% { transform: scale(2.0); opacity: 0; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          color: rgba(255,255,255,0.65); text-decoration: none;
          font-size: 0.85rem; letter-spacing: 1.5px;
          transition: color 0.3s; font-weight: 500;
        }
        .nav-link:hover { color: #00ff88; }

        .cta-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px 32px;
          background: linear-gradient(135deg, #00ff88, #00cc55);
          color: #000; font-family: 'Orbitron', monospace; font-weight: 700;
          font-size: 0.82rem; letter-spacing: 2px; border: none; cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: all 0.3s ease; text-decoration: none; white-space: nowrap;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,255,136,0.35); }
        .cta-btn:active { transform: translateY(0); }

        .cta-outline {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 30px;
          background: transparent; color: #00ff88;
          border: 1.5px solid #00ff88;
          font-family: 'Orbitron', monospace; font-weight: 600;
          font-size: 0.82rem; letter-spacing: 2px; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none; white-space: nowrap;
        }
        .cta-outline:hover { background: rgba(0,255,136,0.08); transform: translateY(-2px); }
        .cta-outline:active { transform: translateY(0); }

        .service-card {
          background: linear-gradient(135deg, rgba(0,255,136,0.04), transparent);
          border: 1px solid rgba(0,255,136,0.15);
          padding: 28px 22px; position: relative; overflow: hidden;
          transition: all 0.35s ease;
        }
        .service-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00ff88, transparent);
          transform: scaleX(0); transition: transform 0.35s ease;
        }
        .service-card:hover::after { transform: scaleX(1); }
        .service-card:hover {
          border-color: rgba(0,255,136,0.4); transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,255,136,0.07);
          background: linear-gradient(135deg, rgba(0,255,136,0.07), transparent);
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: #fff; border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.97); z-index: 99;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 36px;
          animation: slideDown 0.25s ease;
        }
        .mobile-menu a {
          font-family: 'Orbitron', monospace; font-weight: 700;
          font-size: 1.4rem; color: #fff; text-decoration: none;
          letter-spacing: 3px; transition: color 0.2s;
        }
        .mobile-menu a:hover { color: #00ff88; }

        /* ── STAT GRID ── */
        .stat-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat-col {
          text-align: center; padding: 26px 12px;
          border-left: 1px solid rgba(0,255,136,0.12);
        }
        .stat-col:first-child { border-left: none; }

        /* ── ABOUT GRID ── */
        .about-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
        }

        /* ── SERVICES GRID ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        /* ── CONTACT INFO GRID ── */
        .contact-info-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-top: 16px;
        }

        /* ── FOOTER INNER ── */
        .footer-inner {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 14px;
        }

        /* ══ MOBILE BREAKPOINTS ══ */
        @media (max-width: 767px) {
          .hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
          .desktop-cta-nav { display: none !important; }

          .stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-col {
            border-left: none !important;
            border-bottom: 1px solid rgba(0,255,136,0.1);
          }
          .stat-col:nth-child(2n) {
            border-left: 1px solid rgba(0,255,136,0.12) !important;
          }
          .stat-col:nth-last-child(-n+2) { border-bottom: none; }

          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }

          .contact-info-grid {
            grid-template-columns: 1fr !important;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-row a {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── INPUT PLACEHOLDER ── */
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input, textarea { -webkit-appearance: none; }
      `}</style>

      {/* ══ MOBILE MENU OVERLAY ══ */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#services" onClick={() => setMenuOpen(false)}>SERVICES</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          <a href="#contact" className="cta-btn" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", marginTop: 8 }}>
            GET QUOTE
          </a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "14px 20px" : "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(0,255,136,0.1)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="30" height="30" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="navgem" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="100%" stopColor="#004422" />
              </linearGradient>
            </defs>
            <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="url(#navgem)" />
            <polygon points="40,4 72,22 40,40" fill="rgba(255,255,255,0.25)" />
          </svg>
          <span style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900,
            fontSize: isMobile ? "0.85rem" : "1rem", color: "#fff", letterSpacing: "1px",
          }}>EMERALD</span>
        </div>

        {/* Desktop nav links */}
        <div className="desktop-nav" style={{ display: "flex", gap: 36 }}>
          {["Services", "About", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#contact" className="cta-btn desktop-cta-nav" style={{ fontSize: "0.72rem", padding: "9px 20px" }}>GET QUOTE</a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ══════════════════════════════════
           HERO
      ══════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: isMobile ? "88px 20px 52px" : "100px 24px 60px",
        background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,40,20,0.7) 0%, #000 70%)",
      }}>
        {/* Scanline */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,255,136,0.013) 0px, rgba(0,255,136,0.013) 1px, transparent 1px, transparent 3px)",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -55%)",
          width: isMobile ? 360 : 680, height: isMobile ? 360 : 680,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,100,0.16) 0%, rgba(0,200,80,0.05) 40%, transparent 70%)",
          animation: "glow-pulse 3.5s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Burst rays — client only */}
        {isMounted && !isMobile && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 560, height: 560,
            transform: "translate(-50%, -55%)",
            animation: "burst-rotate 22s linear infinite",
            pointerEvents: "none", opacity: 0.18,
          }}>
            <svg width="560" height="560" viewBox="0 0 560 560">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const x1 = 280 + Math.cos(angle) * 75;
                const y1 = 280 + Math.sin(angle) * 75;
                const x2 = 280 + Math.cos(angle) * 260;
                const y2 = 280 + Math.sin(angle) * 260;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#00ff88" strokeWidth={i % 2 === 0 ? "2" : "0.8"} strokeLinecap="round" />;
              })}
            </svg>
          </div>
        )}

        {/* ── MAIN LOGO SVG ── */}
        <div style={{
          position: "relative", zIndex: 2,
          transform: isMobile
            ? "none"
            : `translateY(${-gemY}px) rotateX(${mousePos.y * 0.18}deg) rotateY(${mousePos.x * 0.18}deg)`,
          opacity: gemOpacity,
          transition: "transform 0.08s ease",
          animation: "float-gem 5s ease-in-out infinite",
          willChange: "transform",
          marginBottom: isMobile ? 20 : 28,
          width: "100%",
          maxWidth: isMobile ? 340 : 580,
        }}>
          {/* Pulse rings */}
          {[0, 1].map(i => (
            <div key={i} style={{
              position: "absolute",
              inset: `${-16 - i * 10}px`,
              border: "1px solid rgba(0,255,136,0.18)",
              borderRadius: "50%",
              animation: `pulse-ring 3s ease-out ${i * 0.9}s infinite`,
            }} />
          ))}

          <svg
            width="100%" viewBox="0 0 580 500"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 24px #00ff8866) drop-shadow(0 0 60px #00ff8822)" }}
          >
            <defs>
              <linearGradient id="gTop" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#afffcb" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00cc55" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="gUL" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#003318" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="gUR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ee77" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#001a0c" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient id="gCtr" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#006633" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="gLL" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#009944" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#000a05" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="gLR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00bb55" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#000a05" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="gBot" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#005522" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ff66" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="swL" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#666" stopOpacity="0" />
                <stop offset="35%" stopColor="#ccc" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#999" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="swR" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#666" stopOpacity="0" />
                <stop offset="35%" stopColor="#ccc" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#999" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="txtG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#88ffbb" />
                <stop offset="25%" stopColor="#00ff88" />
                <stop offset="55%" stopColor="#ccffdd" />
                <stop offset="100%" stopColor="#00cc55" />
              </linearGradient>
              <linearGradient id="shieldG" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#003318" />
                <stop offset="50%" stopColor="#00ff88" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#001a0c" />
              </linearGradient>
              <filter id="gGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="tGlow" x="-15%" y="-30%" width="130%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Silver swoosh left */}
            <path d="M 28,218 Q 80,148 165,188 Q 205,206 238,218" fill="none" stroke="url(#swL)" strokeWidth="11" strokeLinecap="round" opacity="0.92" />
            <path d="M 28,215 Q 80,145 165,185 Q 205,203 236,215" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
            {/* Silver swoosh right */}
            <path d="M 552,218 Q 500,148 415,188 Q 375,206 342,218" fill="none" stroke="url(#swR)" strokeWidth="11" strokeLinecap="round" opacity="0.92" />
            <path d="M 552,215 Q 500,145 415,185 Q 375,203 344,215" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />

            {/* Gem facets */}
            <polygon points="290,50 238,112 290,100 342,112" fill="url(#gTop)" stroke="#00ff88" strokeWidth="0.8" filter="url(#gGlow)" />
            <polygon points="238,112 178,170 234,160 290,100" fill="url(#gUL)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="342,112 402,170 346,160 290,100" fill="url(#gUR)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="178,170 150,208 210,226 234,160" fill="url(#gUL)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="402,170 430,208 370,226 346,160" fill="url(#gUR)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="234,160 290,100 346,160 290,228" fill="url(#gCtr)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="210,226 150,208 215,276 290,228" fill="url(#gLL)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="370,226 430,208 365,276 290,228" fill="url(#gLR)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="215,276 290,228 290,308" fill="url(#gBot)" stroke="#00ff88" strokeWidth="0.8" />
            <polygon points="290,228 365,276 290,308" fill="url(#gBot)" stroke="#00ff88" strokeWidth="0.8" />
            {/* Highlights */}
            <polygon points="290,56 258,104 290,96" fill="rgba(255,255,255,0.42)" />
            <polygon points="252,118 234,150 264,144" fill="rgba(255,255,255,0.18)" />
            <ellipse cx="290" cy="168" rx="24" ry="30" fill="rgba(255,255,255,0.09)" />

            {/* Lightning left */}
            <g opacity={lt1 ? 1 : 0} style={{ transition: "opacity 0.06s" }}>
              <polyline points="152,118 118,158 137,158 98,202 120,202 80,248" stroke="#ccffdd" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="152,118 118,158 137,158 98,202 120,202 80,248" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <polyline points="118,158 92,182 108,182 76,210" stroke="#00ff88" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65" />
            </g>
            <g opacity={lt3 ? 0.75 : 0} style={{ transition: "opacity 0.06s" }}>
              <polyline points="160,96 124,140 144,140 104,188 126,188 88,232" stroke="#00ff88" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Lightning right */}
            <g opacity={lt2 ? 1 : 0} style={{ transition: "opacity 0.06s" }}>
              <polyline points="428,118 462,158 443,158 482,202 460,202 500,248" stroke="#ccffdd" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="428,118 462,158 443,158 482,202 460,202 500,248" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <polyline points="462,158 488,182 472,182 504,210" stroke="#00ff88" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.65" />
            </g>
            <g opacity={lt4 ? 0.75 : 0} style={{ transition: "opacity 0.06s" }}>
              <polyline points="420,96 456,140 436,140 476,188 454,188 492,232" stroke="#00ff88" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Shield base */}
            <path d="M 192,316 L 210,322 L 290,374 L 370,322 L 388,316 L 388,342 Q 388,342 290,402 Q 192,342 192,342 Z"
              fill="url(#shieldG)" stroke="rgba(0,255,136,0.35)" strokeWidth="1" />
            <line x1="290" y1="322" x2="290" y2="400" stroke="rgba(0,255,136,0.25)" strokeWidth="1" />

            {/* Text EMERALD */}
            <text x="290" y="374" textAnchor="middle"
              fontFamily="'Orbitron', 'Arial Black', sans-serif"
              fontWeight="900" fontSize="68"
              fill="url(#txtG)"
              stroke="rgba(0,60,30,0.6)" strokeWidth="1.5"
              filter="url(#tGlow)" letterSpacing="5"
              style={{ paintOrder: "stroke fill" }}
            >EMERALD</text>

            {/* Text BATTERY SOLUTIONS */}
            <text x="290" y="412" textAnchor="middle"
              fontFamily="'Inter', Arial, sans-serif"
              fontWeight="700" fontSize="21"
              fill="#ffffff" letterSpacing="6"
            >BATTERY SOLUTIONS</text>

            <rect x="166" y="418" width="248" height="2" fill="rgba(0,255,136,0.35)" rx="1" />

            {/* Spark dots */}
            {[{ cx: 152, cy: 135 }, { cx: 428, cy: 135 }, { cx: 112, cy: 228 }, { cx: 468, cy: 228 }].map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r={2.5} fill="#fff"
                opacity={Math.sin(tick * 0.15 + i * 1.1) > 0 ? 0.85 : 0.08}
                style={{ transition: "opacity 0.12s" }}
              />
            ))}
          </svg>
        </div>

        {/* Hero subtitle + CTAs */}
        <div style={{
          textAlign: "center", maxWidth: 600, position: "relative", zIndex: 2,
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s ease 0.3s",
          padding: "0 4px",
        }}>
          <p style={{
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            color: "rgba(255,255,255,0.52)", lineHeight: 1.75, fontWeight: 300, marginBottom: 32,
          }}>
            Premium battery storage solutions for residential, commercial &amp; industrial
            applications across Australia. Certified. Reliable. Guaranteed.
          </p>
          <div className="hero-cta-row" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#services" className="cta-btn" style={{ flex: isMobile ? "1 1 100%" : "unset" }}>⚡ OUR SERVICES</a>
            <a href="#contact" className="cta-outline" style={{ flex: isMobile ? "1 1 100%" : "unset" }}>FREE CONSULTATION</a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          opacity: scrollY > 40 ? 0 : 0.5, transition: "opacity 0.4s", zIndex: 2,
        }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "4px", color: "rgba(255,255,255,0.35)" }}>SCROLL</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(180deg, rgba(0,255,136,0.7), transparent)" }} />
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div style={{ borderTop: "1px solid rgba(0,255,136,0.1)", borderBottom: "1px solid rgba(0,255,136,0.1)", background: "rgba(0,255,136,0.02)" }}>
        <div className="stat-grid">
          {[{ n: "500+", l: "Installations" }, { n: "10yr", l: "Warranty" }, { n: "24/7", l: "Support" }, { n: "100%", l: "Satisfaction" }].map(s => (
            <div key={s.l} className="stat-col">
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: isMobile ? "1.8rem" : "2.1rem", fontWeight: 900, color: "#00ff88" }}>{s.n}</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", marginTop: 5, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: isMobile ? "64px 20px" : "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.68rem", letterSpacing: "5px", color: "#00ff88", marginBottom: 12 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.7rem,5vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
              BATTERY SOLUTIONS<br /><span style={{ color: "#00ff88" }}>FOR EVERY NEED</span>
            </h2>
          </div>
          <div className="services-grid">
            {[
              { icon: "🏠", title: "Residential", desc: "Home energy storage that keeps your family powered through outages and reduces electricity bills with smart solar integration.", tag: "From $4,999" },
              { icon: "🏢", title: "Commercial", desc: "Scalable battery banks for businesses. Reduce peak demand charges and ensure uninterrupted operations.", tag: "Custom Pricing" },
              { icon: "⚡", title: "EV Charging", desc: "Fast-charge infrastructure for electric vehicles. Future-proof your property with smart EV charging and battery buffers.", tag: "From $2,499" },
              { icon: "☀️", title: "Solar + Battery", desc: "Complete solar and storage bundles. Maximise your renewable energy investment with matched panels and batteries.", tag: "From $8,999" },
              { icon: "🔧", title: "Maintenance", desc: "Ongoing monitoring, health checks and performance optimisation. 24/7 remote diagnostics included.", tag: "$199/year" },
              { icon: "🔋", title: "Industrial", desc: "Heavy-duty systems for mining, agriculture and large-scale operations. Built for harsh Australian conditions.", tag: "Enterprise" },
            ].map(s => (
              <div key={s.title} className="service-card">
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "1px" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.86rem", lineHeight: 1.68, marginBottom: 18 }}>{s.desc}</p>
                <span style={{ display: "inline-block", padding: "5px 13px", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88", fontSize: "0.7rem", fontFamily: "'Orbitron',monospace", letterSpacing: "1px" }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section id="about" style={{
        padding: isMobile ? "64px 20px" : "100px 48px",
        borderTop: "1px solid rgba(0,255,136,0.07)",
        background: "linear-gradient(180deg,transparent,rgba(0,255,136,0.02),transparent)",
      }}>
        <div className="about-grid">
          {/* Battery visual */}
          <div style={{
            background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)",
            padding: isMobile ? "32px 24px" : "44px 36px", position: "relative", overflow: "hidden",
          }}>
            {/* Corner marks */}
            {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, i) => (
              <div key={i} style={{
                position: "absolute", ...pos, width: 16, height: 16,
                borderTop: i < 2 ? "2px solid #00ff88" : undefined,
                borderBottom: i >= 2 ? "2px solid #00ff88" : undefined,
                borderLeft: i % 2 === 0 ? "2px solid #00ff88" : undefined,
                borderRight: i % 2 === 1 ? "2px solid #00ff88" : undefined,
              }} />
            ))}
            <svg width="100%" viewBox="0 0 320 260" fill="none">
              <defs>
                <linearGradient id="batBar" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#002211" />
                  <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>
              </defs>
              <rect x="20" y="40" width="260" height="170" rx="10" stroke="#00ff88" strokeWidth="2" fill="rgba(0,255,136,0.04)" />
              <rect x="280" y="90" width="24" height="60" rx="5" stroke="#00ff88" strokeWidth="2" fill="rgba(0,255,136,0.08)" />
              {[0, 1, 2, 3].map(i => (
                <rect key={i} x={40 + i * 57} y="68" width="44" height="112" rx="4"
                  fill={i < 3 ? "url(#batBar)" : "rgba(0,255,136,0.08)"} stroke="rgba(0,255,136,0.25)" strokeWidth="1" />
              ))}
              <polygon points="165,55 148,120 162,120 155,205 180,130 164,130" fill="#00ff88" opacity="0.95" style={{ filter: "drop-shadow(0 0 6px #00ff88)" }} />
              <text x="160" y="235" textAnchor="middle" fill="rgba(0,255,136,0.45)" fontFamily="'Orbitron',monospace" fontSize="11" fontWeight="700" letterSpacing="3">75% CHARGED</text>
            </svg>
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              background: "linear-gradient(135deg,#00ff88,#00cc55)", color: "#000",
              padding: "12px 16px", fontFamily: "'Orbitron',monospace",
              fontWeight: 900, fontSize: "0.68rem", lineHeight: 1.4, letterSpacing: "1px",
            }}>NOW<br />OPEN</div>
          </div>

          {/* Text */}
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.68rem", letterSpacing: "5px", color: "#00ff88", marginBottom: 12 }}>WHY EMERALD</div>
            <h2 style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(1.5rem,4vw,2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 32,
            }}>
              AUSTRALIA&apos;S<br /><span style={{ color: "#00ff88" }}>TRUSTED</span><br />BATTERY EXPERTS
            </h2>
            {[
              { title: "CEC Certified Installers", desc: "All technicians are CEC-accredited with deep expertise in battery storage." },
              { title: "10-Year Warranty", desc: "Industry-leading coverage on all battery systems and installation workmanship." },
              { title: "Same-Day Response", desc: "24/7 emergency support with same-day response for any system issues." },
              { title: "Australian Owned", desc: "Proudly local. We support the communities we live and work in." },
            ].map((item, i) => (
              <div key={item.title} style={{ display: "flex", gap: 16, marginBottom: 22, paddingBottom: 22, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{
                  width: 36, height: 36, minWidth: 36,
                  background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#00ff88", fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "0.75rem",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#fff", marginBottom: 4, fontSize: "0.88rem" }}>{item.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.83rem", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section style={{
        padding: isMobile ? "64px 20px" : "90px 48px",
        textAlign: "center", position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#00ff88,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#00ff88,transparent)" }} />
        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.68rem", letterSpacing: "5px", color: "#00ff88", marginBottom: 16 }}>LIMITED OPENING OFFER</div>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.7rem,6vw,3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
          FREE CONSULTATION<br /><span style={{ color: "#00ff88" }}>+ SITE ASSESSMENT</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: isMobile ? "0.95rem" : "1rem", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Book now and receive a free energy audit valued at $299. Limited spots for our opening month.
        </p>
        <a href="#contact" className="cta-btn" style={{
          fontSize: "0.88rem", padding: "18px 40px",
          display: isMobile ? "flex" : "inline-flex",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? 360 : "none",
          margin: isMobile ? "0 auto" : undefined,
        }}>
          ⚡ CLAIM FREE CONSULTATION
        </a>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: isMobile ? "64px 20px" : "100px 48px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.68rem", letterSpacing: "5px", color: "#00ff88", marginBottom: 12 }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,5vw,2.6rem)", fontWeight: 900, color: "#fff" }}>
            START YOUR<br /><span style={{ color: "#00ff88" }}>ENERGY JOURNEY</span>
          </h2>
        </div>

        <div style={{
          background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.12)",
          padding: isMobile ? "28px 20px" : "40px",
        }}>
          {[
            { label: "Full Name", type: "text", ph: "Your name" },
            { label: "Email", type: "email", ph: "jye@emeraldbatterysolutions.com.au" },
            { label: "Phone", type: "tel", ph: "0491 835 423" },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", marginBottom: 7, fontFamily: "'Orbitron',monospace" }}>
                {f.label.toUpperCase()}
              </label>
              <input
                type={f.type} placeholder={f.ph}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,255,136,0.18)", padding: "13px 14px",
                  color: "#fff", fontSize: "0.9rem", outline: "none", borderRadius: 2,
                  WebkitTextFillColor: "#fff",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(0,255,136,0.18)"}
              />
            </div>
          ))}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", marginBottom: 7, fontFamily: "'Orbitron',monospace" }}>MESSAGE</label>
            <textarea
              rows={4} placeholder="Tell us about your energy needs…"
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,255,136,0.18)", padding: "13px 14px",
                color: "#fff", fontSize: "0.9rem", outline: "none",
                resize: "vertical", fontFamily: "inherit", borderRadius: 2,
              }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(0,255,136,0.18)"}
            />
          </div>
          <button className="cta-btn" style={{ width: "100%", fontSize: "0.85rem" }}>⚡ SEND MESSAGE</button>
        </div>

        {/* Contact info */}
        <div className="contact-info-grid">
          {[
            { icon: "📞", label: "PHONE", val: "0491 835 423", href: "tel:0491835423" },
            { icon: "✉️", label: "EMAIL", val: "jye@emeraldbatterysolutions.com.au", href: "mailto:jye@emeraldbatterysolutions.com.au" },
          ].map(c => (
            <a key={c.label} href={c.href} style={{
              display: "block", padding: "18px 16px",
              background: "rgba(0,255,136,0.02)", border: "1px solid rgba(0,255,136,0.1)",
              textDecoration: "none", transition: "border-color 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.1)")}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "3px", color: "#00ff88", marginBottom: 4, fontFamily: "'Orbitron',monospace" }}>{c.label}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", wordBreak: "break-all" }}>{c.val}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1px solid rgba(0,255,136,0.1)", padding: isMobile ? "28px 20px" : "32px 48px" }}>
        <div className="footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <svg width="24" height="24" viewBox="0 0 80 80">
              <defs>
                <linearGradient id="fgem" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff88" />
                  <stop offset="100%" stopColor="#004422" />
                </linearGradient>
              </defs>
              <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="url(#fgem)" />
            </svg>
            <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: isMobile ? "0.75rem" : "0.82rem", color: "#fff" }}>
              EMERALD BATTERY SOLUTIONS
            </span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.74rem" }}>
            © 2025 Emerald Battery Solutions. Australia.
          </div>
        </div>
      </footer>
    </div>
  );
}
