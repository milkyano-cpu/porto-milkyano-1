"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EmeraldLanding() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tick, setTick]           = useState(0);

  // Section refs for GSAP
  const heroRef        = useRef<HTMLDivElement>(null);
  const heroLogoRef    = useRef<HTMLDivElement>(null);
  const heroTextRef    = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const servicesRef    = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement>(null);
  const aboutRef       = useRef<HTMLDivElement>(null);
  const aboutVisRef    = useRef<HTMLDivElement>(null);
  const aboutTextRef   = useRef<HTMLDivElement>(null);
  const ctaBannerRef   = useRef<HTMLDivElement>(null);
  const contactRef     = useRef<HTMLDivElement>(null);
  const pinSpacerRef   = useRef<HTMLDivElement>(null);

  // Lightning tick
  const lt1 = Math.sin(tick * 0.18) > 0.6;
  const lt2 = Math.sin(tick * 0.13 + 1.2) > 0.55;
  const lt3 = Math.sin(tick * 0.22 + 2.4) > 0.7;
  const lt4 = Math.sin(tick * 0.16 + 0.8) > 0.65;

  // ─── GSAP ScrollTrigger animations ──────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const interval = setInterval(() => setTick(t => t + 1), 100);

    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Wait for DOM
    const ctx = gsap.context(() => {

      // "play none none reverse" = play saat masuk, reverse saat keluar viewport
      // Ini yang bikin animasi REPEAT setiap scroll — bukan hanya sekali saja
      const TA = "play none none reverse";

      // ── 1. HERO: Logo parallax zoom — scrub terikat langsung ke scrollbar ──
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        }
      })
      .to(heroLogoRef.current, {
        scale: 1.35, y: -80, rotateX: 18, rotateY: 8,
        filter: "blur(2px)", opacity: 0, ease: "none",
      })
      .to(heroTextRef.current, { y: 60, opacity: 0, ease: "none" }, 0);

      // ── 2. STATS: Stagger naik dari bawah, balik saat scroll naik ──
      const statItems = statsRef.current?.querySelectorAll(".stat-col");
      if (statItems) {
        gsap.from(Array.from(statItems), {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 40%",
            toggleActions: TA,
          },
          y: 50, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
        });
      }

      // ── 3. SERVICE CARDS: 3D flip bolak-balik, repeat tiap scroll ──
      const cards = serviceCardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              toggleActions: TA,
            },
            x: fromLeft ? -70 : 70,
            y: 50,
            rotateY: fromLeft ? -28 : 28,
            rotateX: 10,
            opacity: 0,
            scale: 0.86,
            duration: 0.85,
            ease: "power3.out",
            transformOrigin: fromLeft ? "left center" : "right center",
          });
        });
      }

      // ── 4. ABOUT: Split kiri-kanan, repeat ──
      gsap.from(aboutVisRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 82%",
          end: "top 35%",
          toggleActions: TA,
        },
        x: -90, rotateY: 22, rotateX: -6, opacity: 0, scale: 0.9,
        duration: 1.0, ease: "power3.out", transformOrigin: "left center",
      });

      gsap.from(aboutTextRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 82%",
          end: "top 35%",
          toggleActions: TA,
        },
        x: 90, rotateY: -22, opacity: 0,
        duration: 1.0, ease: "power3.out", transformOrigin: "right center",
      });

      const aboutItems = aboutTextRef.current?.querySelectorAll(".about-item");
      if (aboutItems) {
        gsap.from(Array.from(aboutItems), {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
            end: "top 30%",
            toggleActions: TA,
          },
          x: 55, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        });
      }

      // ── 5. CTA BANNER: Zoom naik dari bawah, repeat ──
      gsap.from(ctaBannerRef.current, {
        scrollTrigger: {
          trigger: ctaBannerRef.current,
          start: "top 88%",
          end: "top 40%",
          toggleActions: TA,
        },
        scale: 0.72, rotateX: 22, opacity: 0, y: 70,
        duration: 0.95, ease: "power3.out", transformOrigin: "center bottom",
      });

      // ── 6. CONTACT: Slide + tilt, repeat ──
      gsap.from(contactRef.current, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 88%",
          end: "top 40%",
          toggleActions: TA,
        },
        y: 90, rotateX: 18, opacity: 0,
        duration: 0.95, ease: "power3.out", transformOrigin: "center top",
      });

      // ── 7. SECTION HEADING: Skew reveal, repeat ──
      const serviceHeading = servicesRef.current?.querySelector(".section-heading");
      if (serviceHeading) {
        gsap.from(serviceHeading, {
          scrollTrigger: {
            trigger: serviceHeading,
            start: "top 90%",
            end: "top 50%",
            toggleActions: TA,
          },
          y: 55, skewY: 5, opacity: 0, duration: 0.8, ease: "power3.out",
        });
      }

    });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: "system-ui, sans-serif", overflowX: "hidden", perspective: "1200px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        /* ── Keyframes ── */
        @keyframes glow-pulse   { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes burst-rotate { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes float-gem    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring   { 0%{transform:scale(.85);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes shimmer      { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes slideDown    { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce       { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }

        /* ── Typography ── */
        .hero-title {
          font-family: 'Orbitron', monospace; font-weight: 900;
          font-size: clamp(2.8rem, 9vw, 7rem); line-height: .92; letter-spacing: -2px;
          background: linear-gradient(135deg, #00ff88 0%, #fff 40%, #00ff88 65%, #00cc55 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        /* ── Buttons ── */
        .cta-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:15px 32px; background:linear-gradient(135deg,#00ff88,#00cc55);
          color:#000; font-family:'Orbitron',monospace; font-weight:700;
          font-size:.82rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition:all .3s ease; text-decoration:none; white-space:nowrap;
        }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(0,255,136,.35); }
        .cta-btn:active { transform:translateY(0); }

        .cta-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:#00ff88;
          border:1.5px solid #00ff88; font-family:'Orbitron',monospace; font-weight:600;
          font-size:.82rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s ease; text-decoration:none; white-space:nowrap;
        }
        .cta-outline:hover { background:rgba(0,255,136,.08); transform:translateY(-2px); }

        /* ── Nav ── */
        .nav-link { color:rgba(255,255,255,.65); text-decoration:none; font-size:.85rem; letter-spacing:1.5px; transition:color .3s; font-weight:500; }
        .nav-link:hover { color:#00ff88; }

        /* ── Hamburger ── */
        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s ease; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* ── Service cards ── */
        .service-card {
          background:linear-gradient(135deg,rgba(0,255,136,.04),transparent);
          border:1px solid rgba(0,255,136,.15);
          padding:28px 22px; position:relative; overflow:hidden;
          transition:border-color .35s ease, box-shadow .35s ease, transform .35s ease, background .35s ease;
          transform-style: preserve-3d;
          cursor: default;
        }
        .service-card::after {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,#00ff88,transparent);
          transform:scaleX(0); transition:transform .35s ease;
        }
        .service-card:hover::after { transform:scaleX(1); }
        .service-card:hover {
          border-color:rgba(0,255,136,.4);
          transform:translateY(-6px) rotateX(4deg) !important;
          box-shadow:0 24px 60px rgba(0,255,136,.1);
          background:linear-gradient(135deg,rgba(0,255,136,.08),transparent);
        }

        /* ── Stat ── */
        .stat-col { text-align:center; padding:26px 12px; border-left:1px solid rgba(0,255,136,.12); }
        .stat-col:first-child { border-left:none; }

        /* ── About grid ── */
        .about-grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }

        /* ── Lightning ── */
        .lt { transition: opacity .06s; }

        /* ── Mobile ── */
        @media (max-width:767px) {
          .hamburger { display:flex !important; }
          .desktop-nav, .desktop-cta-nav { display:none !important; }
          .stat-grid { grid-template-columns:repeat(2,1fr) !important; }
          .stat-col { border-left:none !important; border-bottom:1px solid rgba(0,255,136,.1); }
          .stat-col:nth-child(2n) { border-left:1px solid rgba(0,255,136,.12) !important; }
          .stat-col:nth-last-child(-n+2) { border-bottom:none; }
          .about-grid { grid-template-columns:1fr !important; gap:32px !important; }
          .contact-info-grid { grid-template-columns:1fr !important; }
          .footer-inner { flex-direction:column; align-items:flex-start; }
          .services-grid { grid-template-columns:1fr !important; }
        }

        input::placeholder, textarea::placeholder { color:rgba(255,255,255,.22); }
        input, textarea { -webkit-appearance:none; }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.97)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:36,animation:"slideDown .25s ease" }} onClick={() => setMenuOpen(false)}>
          {["Services","About","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:"1.4rem",color:"#fff",textDecoration:"none",letterSpacing:"3px" }}
              onClick={() => setMenuOpen(false)}
            >{l}</a>
          ))}
          <a href="#contact" className="cta-btn" style={{ fontSize:".9rem",marginTop:8 }} onClick={() => setMenuOpen(false)}>GET QUOTE</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        padding: isMobile ? "14px 20px" : "18px 48px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background: navScrolled ? "rgba(0,0,0,.95)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(0,255,136,.1)" : "none",
        transition:"all .4s ease",
      }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <svg width="30" height="30" viewBox="0 0 80 80">
            <defs><linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00ff88"/><stop offset="100%" stopColor="#004422"/></linearGradient></defs>
            <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="url(#ng)"/>
            <polygon points="40,4 72,22 40,40" fill="rgba(255,255,255,.25)"/>
          </svg>
          <span style={{ fontFamily:"'Orbitron',monospace",fontWeight:900,fontSize: isMobile ? ".85rem" : "1rem",color:"#fff",letterSpacing:"1px" }}>EMERALD</span>
        </div>
        <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
          {["Services","About","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
        </div>
        <a href="#contact" className="cta-btn desktop-cta-nav" style={{ fontSize:".72rem",padding:"9px 20px" }}>GET QUOTE</a>
        <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* ══════════════════════════════════════════
           HERO — sticky pin with parallax zoom
      ══════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden",
        padding: isMobile ? "88px 20px 60px" : "100px 24px 60px",
        background:"radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,40,20,.7) 0%, #000 70%)",
        transformStyle:"preserve-3d",
      }}>
        {/* Scanline */}
        <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(0deg,rgba(0,255,136,.012) 0px,rgba(0,255,136,.012) 1px,transparent 1px,transparent 3px)" }}/>

        {/* Radial glow */}
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-55%)",width: isMobile?340:680,height: isMobile?340:680,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,100,.16) 0%,transparent 70%)",animation:"glow-pulse 3s ease-in-out infinite",pointerEvents:"none" }}/>

        {/* Burst rays — desktop + client only */}
        {isMounted && !isMobile && (
          <div style={{ position:"absolute",top:"50%",left:"50%",width:580,height:580,transform:"translate(-50%,-50%)",animation:"burst-rotate 22s linear infinite",pointerEvents:"none",opacity:.17 }}>
            <svg width="580" height="580" viewBox="0 0 580 580">
              {Array.from({length:16}).map((_,i) => {
                const a=(i/16)*Math.PI*2;
                return <line key={i} x1={290+Math.cos(a)*78} y1={290+Math.sin(a)*78} x2={290+Math.cos(a)*272} y2={290+Math.sin(a)*272} stroke="#00ff88" strokeWidth={i%2===0?"2":"0.8"} strokeLinecap="round"/>;
              })}
            </svg>
          </div>
        )}

        {/* ── GEM LOGO (GSAP will animate this ref) ── */}
        <div ref={heroLogoRef} style={{
          position:"relative", zIndex:2, marginBottom:28,
          width:"100%", maxWidth: isMobile?340:580,
          animation:"float-gem 5s ease-in-out infinite",
          transformStyle:"preserve-3d",
        }}>
          {/* Pulse rings */}
          {[0,1].map(i => (
            <div key={i} style={{ position:"absolute",inset:`${-16-i*10}px`,border:"1px solid rgba(0,255,136,.18)",borderRadius:"50%",animation:`pulse-ring 3s ease-out ${i*.9}s infinite` }}/>
          ))}

          <svg width="100%" viewBox="0 0 580 500" xmlns="http://www.w3.org/2000/svg"
            style={{ filter:"drop-shadow(0 0 26px #00ff8866) drop-shadow(0 0 60px #00ff8822)" }}>
            <defs>
              <linearGradient id="gTop" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#afffcb" stopOpacity=".95"/><stop offset="100%" stopColor="#00cc55" stopOpacity=".9"/></linearGradient>
              <linearGradient id="gUL" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00ff88" stopOpacity=".85"/><stop offset="100%" stopColor="#003318" stopOpacity=".95"/></linearGradient>
              <linearGradient id="gUR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00ee77" stopOpacity=".7"/><stop offset="100%" stopColor="#001a0c" stopOpacity=".98"/></linearGradient>
              <linearGradient id="gCtr" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#00ff88" stopOpacity=".5"/><stop offset="100%" stopColor="#006633" stopOpacity=".95"/></linearGradient>
              <linearGradient id="gLL" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#009944" stopOpacity=".9"/><stop offset="100%" stopColor="#000a05" stopOpacity="1"/></linearGradient>
              <linearGradient id="gLR" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00bb55" stopOpacity=".85"/><stop offset="100%" stopColor="#000a05" stopOpacity="1"/></linearGradient>
              <linearGradient id="gBot" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#005522" stopOpacity="1"/><stop offset="100%" stopColor="#00ff66" stopOpacity=".4"/></linearGradient>
              <linearGradient id="swL" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stopColor="#666" stopOpacity="0"/><stop offset="35%" stopColor="#ccc" stopOpacity=".85"/><stop offset="65%" stopColor="#fff" stopOpacity="1"/><stop offset="100%" stopColor="#999" stopOpacity=".5"/></linearGradient>
              <linearGradient id="swR" x1="100%" y1="50%" x2="0%" y2="50%"><stop offset="0%" stopColor="#666" stopOpacity="0"/><stop offset="35%" stopColor="#ccc" stopOpacity=".85"/><stop offset="65%" stopColor="#fff" stopOpacity="1"/><stop offset="100%" stopColor="#999" stopOpacity=".5"/></linearGradient>
              <linearGradient id="txtG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#88ffbb"/><stop offset="25%" stopColor="#00ff88"/><stop offset="55%" stopColor="#ccffdd"/><stop offset="100%" stopColor="#00cc55"/></linearGradient>
              <linearGradient id="shG" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#003318"/><stop offset="50%" stopColor="#00ff88" stopOpacity=".12"/><stop offset="100%" stopColor="#001a0c"/></linearGradient>
              <filter id="gG"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="tG" x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {/* Swooshes */}
            <path d="M 28,218 Q 80,148 165,188 Q 205,206 238,218" fill="none" stroke="url(#swL)" strokeWidth="11" strokeLinecap="round" opacity=".92"/>
            <path d="M 28,215 Q 80,145 165,185 Q 205,203 236,215" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 552,218 Q 500,148 415,188 Q 375,206 342,218" fill="none" stroke="url(#swR)" strokeWidth="11" strokeLinecap="round" opacity=".92"/>
            <path d="M 552,215 Q 500,145 415,185 Q 375,203 344,215" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round"/>
            {/* Facets */}
            <polygon points="290,50 238,112 290,100 342,112" fill="url(#gTop)" stroke="#00ff88" strokeWidth=".8" filter="url(#gG)"/>
            <polygon points="238,112 178,170 234,160 290,100" fill="url(#gUL)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="342,112 402,170 346,160 290,100" fill="url(#gUR)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="178,170 150,208 210,226 234,160" fill="url(#gUL)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="402,170 430,208 370,226 346,160" fill="url(#gUR)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="234,160 290,100 346,160 290,228" fill="url(#gCtr)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="210,226 150,208 215,276 290,228" fill="url(#gLL)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="370,226 430,208 365,276 290,228" fill="url(#gLR)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="215,276 290,228 290,308" fill="url(#gBot)" stroke="#00ff88" strokeWidth=".8"/>
            <polygon points="290,228 365,276 290,308" fill="url(#gBot)" stroke="#00ff88" strokeWidth=".8"/>
            {/* Highlights */}
            <polygon points="290,56 258,104 290,96" fill="rgba(255,255,255,.42)"/>
            <ellipse cx="290" cy="168" rx="24" ry="30" fill="rgba(255,255,255,.09)"/>
            {/* Lightning */}
            <g className="lt" opacity={lt1?1:0}>
              <polyline points="152,118 118,158 137,158 98,202 120,202 80,248" stroke="#ccffdd" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="152,118 118,158 137,158 98,202 120,202 80,248" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            </g>
            <g className="lt" opacity={lt3?.75:0}>
              <polyline points="160,96 124,140 144,140 104,188 126,188 88,232" stroke="#00ff88" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </g>
            <g className="lt" opacity={lt2?1:0}>
              <polyline points="428,118 462,158 443,158 482,202 460,202 500,248" stroke="#ccffdd" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="428,118 462,158 443,158 482,202 460,202 500,248" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            </g>
            <g className="lt" opacity={lt4?.75:0}>
              <polyline points="420,96 456,140 436,140 476,188 454,188 492,232" stroke="#00ff88" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </g>
            {/* Shield + text */}
            <path d="M 192,316 L 210,322 L 290,374 L 370,322 L 388,316 L 388,342 Q 388,342 290,402 Q 192,342 192,342 Z" fill="url(#shG)" stroke="rgba(0,255,136,.35)" strokeWidth="1"/>
            <text x="290" y="374" textAnchor="middle" fontFamily="'Orbitron','Arial Black',sans-serif" fontWeight="900" fontSize="68" fill="url(#txtG)" stroke="rgba(0,60,30,.6)" strokeWidth="1.5" filter="url(#tG)" letterSpacing="5" style={{ paintOrder:"stroke fill" }}>EMERALD</text>
            <text x="290" y="412" textAnchor="middle" fontFamily="'Inter',Arial,sans-serif" fontWeight="700" fontSize="21" fill="#fff" letterSpacing="6">BATTERY SOLUTIONS</text>
            <rect x="166" y="418" width="248" height="2" fill="rgba(0,255,136,.35)" rx="1"/>
            {/* Sparks */}
            {[{cx:152,cy:135},{cx:428,cy:135},{cx:112,cy:228},{cx:468,cy:228}].map((s,i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r={2.5} fill="#fff" opacity={Math.sin(tick*.15+i*1.1)>0?.85:.08} style={{ transition:"opacity .12s" }}/>
            ))}
          </svg>
        </div>

        {/* Hero text (GSAP animates this) */}
        <div ref={heroTextRef} style={{ textAlign:"center",maxWidth:620,position:"relative",zIndex:2,padding:"0 4px" }}>
          <div style={{ fontFamily:"'Orbitron',monospace",fontSize:".72rem",letterSpacing:"6px",color:"#00ff88",marginBottom:14,fontWeight:600 }}>⚡ PREMIUM BATTERY SOLUTIONS</div>
          <h1 className="hero-title">POWER YOUR<br/><span style={{ color:"#fff", WebkitTextFillColor:"#fff" }}>WORLD</span></h1>
          <p style={{ marginTop:24,fontSize: isMobile?"0.95rem":"1.1rem",color:"rgba(255,255,255,.5)",lineHeight:1.75,fontWeight:300,marginBottom:36 }}>
            Premium battery storage for residential, commercial &amp; industrial applications across Australia. Certified. Reliable. Guaranteed.
          </p>
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <a href="#services" className="cta-btn" style={{ flex: isMobile?"1 1 100%":"unset",maxWidth: isMobile?320:"none" }}>⚡ OUR SERVICES</a>
            <a href="#contact" className="cta-outline" style={{ flex: isMobile?"1 1 100%":"unset",maxWidth: isMobile?320:"none" }}>FREE CONSULTATION</a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:24,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.5,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
            <span style={{ fontSize:".6rem",letterSpacing:"4px",color:"rgba(255,255,255,.35)" }}>SCROLL</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(0,255,136,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ borderTop:"1px solid rgba(0,255,136,.1)",borderBottom:"1px solid rgba(0,255,136,.1)",background:"rgba(0,255,136,.02)" }}>
        <div className="stat-grid" style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
          {[{n:"500+",l:"Installations"},{n:"10yr",l:"Warranty"},{n:"24/7",l:"Support"},{n:"100%",l:"Satisfaction"}].map(s => (
            <div key={s.l} className="stat-col">
              <div style={{ fontFamily:"'Orbitron',monospace",fontSize: isMobile?"1.7rem":"2.1rem",fontWeight:900,color:"#00ff88" }}>{s.n}</div>
              <div style={{ fontSize:".67rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginTop:5,textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" ref={servicesRef} style={{ padding: isMobile?"64px 20px":"100px 48px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div className="section-heading" style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ fontFamily:"'Orbitron',monospace",fontSize:".68rem",letterSpacing:"5px",color:"#00ff88",marginBottom:12 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.7rem,5vw,3rem)",fontWeight:900,color:"#fff",lineHeight:1.1 }}>
              BATTERY SOLUTIONS<br/><span style={{ color:"#00ff88" }}>FOR EVERY NEED</span>
            </h2>
          </div>
          <div ref={serviceCardsRef} className="services-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,transformStyle:"preserve-3d" }}>
            {[
              { icon:"🏠",title:"Residential",  desc:"Home energy storage that keeps your family powered through outages and reduces electricity bills with smart solar integration.",tag:"From $4,999"},
              { icon:"🏢",title:"Commercial",   desc:"Scalable battery banks for businesses. Reduce peak demand charges and ensure uninterrupted operations.",tag:"Custom Pricing"},
              { icon:"⚡",title:"EV Charging",  desc:"Fast-charge infrastructure for electric vehicles. Future-proof your property with smart EV charging and battery buffers.",tag:"From $2,499"},
              { icon:"☀️",title:"Solar + Battery",desc:"Complete solar and storage bundles. Maximise your renewable energy investment with matched panels and batteries.",tag:"From $8,999"},
              { icon:"🔧",title:"Maintenance",  desc:"Ongoing monitoring, health checks and performance optimisation. 24/7 remote diagnostics included.",tag:"$199/year"},
              { icon:"🔋",title:"Industrial",   desc:"Heavy-duty systems for mining, agriculture and large-scale operations. Built for harsh Australian conditions.",tag:"Enterprise"},
            ].map(s => (
              <div key={s.title} className="service-card">
                <div style={{ fontSize:"2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Orbitron',monospace",fontSize:".9rem",fontWeight:700,color:"#fff",marginBottom:10,letterSpacing:"1px" }}>{s.title}</h3>
                <p style={{ color:"rgba(255,255,255,.45)",fontSize:".86rem",lineHeight:1.68,marginBottom:18 }}>{s.desc}</p>
                <span style={{ display:"inline-block",padding:"5px 13px",border:"1px solid rgba(0,255,136,.3)",color:"#00ff88",fontSize:".7rem",fontFamily:"'Orbitron',monospace",letterSpacing:"1px" }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section id="about" ref={aboutRef} style={{ padding: isMobile?"64px 20px":"100px 48px",borderTop:"1px solid rgba(0,255,136,.07)",background:"linear-gradient(180deg,transparent,rgba(0,255,136,.02),transparent)" }}>
        <div className="about-grid">
          <div ref={aboutVisRef} style={{ background:"rgba(0,255,136,.03)",border:"1px solid rgba(0,255,136,.15)",padding: isMobile?"28px 20px":"44px 36px",position:"relative",overflow:"hidden",transformStyle:"preserve-3d" }}>
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:16,height:16,
                borderTop:i<2?"2px solid #00ff88":undefined,borderBottom:i>=2?"2px solid #00ff88":undefined,
                borderLeft:i%2===0?"2px solid #00ff88":undefined,borderRight:i%2===1?"2px solid #00ff88":undefined
              }}/>
            ))}
            <svg width="100%" viewBox="0 0 320 260" fill="none">
              <defs><linearGradient id="bB" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#002211"/><stop offset="100%" stopColor="#00ff88"/></linearGradient></defs>
              <rect x="20" y="40" width="260" height="170" rx="10" stroke="#00ff88" strokeWidth="2" fill="rgba(0,255,136,.04)"/>
              <rect x="280" y="90" width="24" height="60" rx="5" stroke="#00ff88" strokeWidth="2" fill="rgba(0,255,136,.08)"/>
              {[0,1,2,3].map(i => <rect key={i} x={40+i*57} y="68" width="44" height="112" rx="4" fill={i<3?"url(#bB)":"rgba(0,255,136,.08)"} stroke="rgba(0,255,136,.25)" strokeWidth="1"/>)}
              <polygon points="165,55 148,120 162,120 155,205 180,130 164,130" fill="#00ff88" opacity=".95" style={{ filter:"drop-shadow(0 0 6px #00ff88)" }}/>
              <text x="160" y="235" textAnchor="middle" fill="rgba(0,255,136,.45)" fontFamily="'Orbitron',monospace" fontSize="11" fontWeight="700" letterSpacing="3">75% CHARGED</text>
            </svg>
            <div style={{ position:"absolute",bottom:-1,right:-1,background:"linear-gradient(135deg,#00ff88,#00cc55)",color:"#000",padding:"12px 16px",fontFamily:"'Orbitron',monospace",fontWeight:900,fontSize:".68rem",lineHeight:1.4,letterSpacing:"1px" }}>NOW<br/>OPEN</div>
          </div>

          <div ref={aboutTextRef}>
            <div style={{ fontFamily:"'Orbitron',monospace",fontSize:".68rem",letterSpacing:"5px",color:"#00ff88",marginBottom:12 }}>WHY EMERALD</div>
            <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.5rem,4vw,2.6rem)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:32 }}>
              AUSTRALIA&apos;S<br/><span style={{ color:"#00ff88" }}>TRUSTED</span><br/>BATTERY EXPERTS
            </h2>
            {[
              {title:"CEC Certified Installers",desc:"All technicians are CEC-accredited with deep expertise in battery storage."},
              {title:"10-Year Warranty",desc:"Industry-leading coverage on all battery systems and installation workmanship."},
              {title:"Same-Day Response",desc:"24/7 emergency support with same-day response for any system issues."},
              {title:"Australian Owned",desc:"Proudly local. We support the communities we live and work in."},
            ].map((item,i) => (
              <div key={item.title} className="about-item" style={{ display:"flex",gap:16,marginBottom:22,paddingBottom:22,borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none" }}>
                <div style={{ width:36,height:36,minWidth:36,background:"rgba(0,255,136,.08)",border:"1px solid rgba(0,255,136,.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"#00ff88",fontFamily:"'Orbitron',monospace",fontWeight:900,fontSize:".75rem" }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <div>
                  <div style={{ fontWeight:600,color:"#fff",marginBottom:4,fontSize:".88rem" }}>{item.title}</div>
                  <div style={{ color:"rgba(255,255,255,.4)",fontSize:".83rem",lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section ref={ctaBannerRef} style={{ padding: isMobile?"64px 20px":"90px 48px",textAlign:"center",position:"relative",overflow:"hidden",background:"radial-gradient(ellipse 60% 80% at 50% 50%,rgba(0,255,136,.06) 0%,transparent 70%)",transformStyle:"preserve-3d" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00ff88,transparent)" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#00ff88,transparent)" }}/>
        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:".68rem",letterSpacing:"5px",color:"#00ff88",marginBottom:16 }}>LIMITED OPENING OFFER</div>
        <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.7rem,6vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16 }}>
          FREE CONSULTATION<br/><span style={{ color:"#00ff88" }}>+ SITE ASSESSMENT</span>
        </h2>
        <p style={{ color:"rgba(255,255,255,.45)",fontSize: isMobile?"0.95rem":"1rem",maxWidth:440,margin:"0 auto 36px",lineHeight:1.7 }}>
          Book now and receive a free energy audit valued at $299. Limited spots for our opening month.
        </p>
        <a href="#contact" className="cta-btn" style={{ fontSize:".88rem",padding:"18px 40px",display: isMobile?"flex":"inline-flex",width: isMobile?"100%":"auto",maxWidth: isMobile?360:"none",margin: isMobile?"0 auto":undefined }}>
          ⚡ CLAIM FREE CONSULTATION
        </a>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} style={{ padding: isMobile?"64px 20px":"100px 48px",maxWidth:680,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:44 }}>
          <div style={{ fontFamily:"'Orbitron',monospace",fontSize:".68rem",letterSpacing:"5px",color:"#00ff88",marginBottom:12 }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.6rem,5vw,2.6rem)",fontWeight:900,color:"#fff" }}>
            START YOUR<br/><span style={{ color:"#00ff88" }}>ENERGY JOURNEY</span>
          </h2>
        </div>
        <div style={{ background:"rgba(0,255,136,.03)",border:"1px solid rgba(0,255,136,.12)",padding: isMobile?"28px 20px":"40px" }}>
          {[
            {label:"Full Name",type:"text",ph:"Your name"},
            {label:"Email",type:"email",ph:"jye@emeraldbatterysolutions.com.au"},
            {label:"Phone",type:"tel",ph:"0491 835 423"},
          ].map(f => (
            <div key={f.label} style={{ marginBottom:20 }}>
              <label style={{ display:"block",fontSize:".65rem",letterSpacing:"2px",color:"rgba(255,255,255,.4)",marginBottom:7,fontFamily:"'Orbitron',monospace" }}>{f.label.toUpperCase()}</label>
              <input type={f.type} placeholder={f.ph} style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,255,136,.18)",padding:"13px 14px",color:"#fff",fontSize:".9rem",outline:"none",borderRadius:2 }}
                onFocus={e=>e.target.style.borderColor="rgba(0,255,136,.5)"}
                onBlur={e=>e.target.style.borderColor="rgba(0,255,136,.18)"}
              />
            </div>
          ))}
          <div style={{ marginBottom:24 }}>
            <label style={{ display:"block",fontSize:".65rem",letterSpacing:"2px",color:"rgba(255,255,255,.4)",marginBottom:7,fontFamily:"'Orbitron',monospace" }}>MESSAGE</label>
            <textarea rows={4} placeholder="Tell us about your energy needs…" style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,255,136,.18)",padding:"13px 14px",color:"#fff",fontSize:".9rem",outline:"none",resize:"vertical",fontFamily:"inherit",borderRadius:2 }}
              onFocus={e=>e.target.style.borderColor="rgba(0,255,136,.5)"}
              onBlur={e=>e.target.style.borderColor="rgba(0,255,136,.18)"}
            />
          </div>
          <button className="cta-btn" style={{ width:"100%",fontSize:".85rem" }}>⚡ SEND MESSAGE</button>
        </div>
        <div className="contact-info-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:16 }}>
          {[
            {icon:"📞",label:"PHONE",val:"0491 835 423",href:"tel:0491835423"},
            {icon:"✉️",label:"EMAIL",val:"jye@emeraldbatterysolutions.com.au",href:"mailto:jye@emeraldbatterysolutions.com.au"},
          ].map(c => (
            <a key={c.label} href={c.href} style={{ display:"block",padding:"18px 16px",background:"rgba(0,255,136,.02)",border:"1px solid rgba(0,255,136,.1)",textDecoration:"none",transition:"border-color .25s" }}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(0,255,136,.3)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(0,255,136,.1)")}
            >
              <div style={{ fontSize:"1.3rem",marginBottom:6 }}>{c.icon}</div>
              <div style={{ fontSize:".6rem",letterSpacing:"3px",color:"#00ff88",marginBottom:4,fontFamily:"'Orbitron',monospace" }}>{c.label}</div>
              <div style={{ color:"rgba(255,255,255,.6)",fontSize:".8rem",wordBreak:"break-all" }}>{c.val}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop:"1px solid rgba(0,255,136,.1)",padding: isMobile?"28px 20px":"32px 48px" }}>
        <div className="footer-inner" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:9 }}>
            <svg width="24" height="24" viewBox="0 0 80 80">
              <defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00ff88"/><stop offset="100%" stopColor="#004422"/></linearGradient></defs>
              <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="url(#fg)"/>
            </svg>
            <span style={{ fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize: isMobile?".75rem":".82rem",color:"#fff" }}>EMERALD BATTERY SOLUTIONS</span>
          </div>
          <div style={{ color:"rgba(255,255,255,.22)",fontSize:".74rem" }}>© 2025 Emerald Battery Solutions. Australia.</div>
        </div>
      </footer>
    </div>
  );
}
