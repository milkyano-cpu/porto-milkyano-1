"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🔧", title: "Full Vehicle Service",   desc: "Quality oils, premium filters. From $300. No shortcuts, no cheap stuff — done properly every time.", tag: "From $300" },
  { icon: "🛞", title: "Tyres & Wheels",         desc: "Supply and fit, balancing, rotations and alignments. All vehicle makes and models.", tag: "All Makes" },
  { icon: "🔩", title: "Mechanical Repairs",     desc: "Small to big — we handle everything. Brakes, suspension, steering, clutch, exhaust and more.", tag: "Small to Big" },
  { icon: "⚡", title: "Diagnostics",            desc: "Full computer diagnostics and fault code scanning. We find the problem and fix it properly.", tag: "All Systems" },
  { icon: "❄️", title: "Air Conditioning",       desc: "AC regas, repairs and fault diagnostics. Stay cool no matter the season.", tag: "Regas & Repair" },
  { icon: "🏎️", title: "Performance Work",       desc: "Modifications, tuning and performance upgrades for enthusiasts. Holden, Ford, imports — we love them all.", tag: "Enthusiast Builds" },
];

// Pre-computed speedometer needle positions — no SSR mismatch
const GAUGE_TICKS = Array.from({ length: 21 }, (_, i) => {
  const angle = -130 + i * 13;
  const rad = (angle * Math.PI) / 180;
  const long = i % 5 === 0;
  const r1 = long ? 72 : 76;
  const r2 = 84;
  return {
    x1: +(Math.cos(rad) * r1).toFixed(3),
    y1: +(Math.sin(rad) * r1).toFixed(3),
    x2: +(Math.cos(rad) * r2).toFixed(3),
    y2: +(Math.sin(rad) * r2).toFixed(3),
    long,
  };
});

export default function OverflowMotors() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLDivElement>(null);
  const heroSubRef    = useRef<HTMLDivElement>(null);
  const heroCtaRef    = useRef<HTMLDivElement>(null);
  const heroVisRef    = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);
  const specialRef    = useRef<HTMLDivElement>(null);
  const galleryRef    = useRef<HTMLDivElement>(null);
  const whyRef        = useRef<HTMLDivElement>(null);
  const whyLeftRef    = useRef<HTMLDivElement>(null);
  const whyRightRef   = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const contactRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const TA = "play none none reverse";

    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(heroBadgeRef.current,  { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(heroTitleRef.current,  { y: 80, opacity: 0, skewY: 3, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .from(heroSubRef.current,    { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(heroCtaRef.current,    { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .from(heroVisRef.current,    { x: 100, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.8");

      // Stats
      gsap.from(statsRef.current?.querySelectorAll(".stat-item") ?? [], {
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: TA },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });

      // Service special
      gsap.from(specialRef.current, {
        scrollTrigger: { trigger: specialRef.current, start: "top 85%", toggleActions: TA },
        scale: 0.94, opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });

      // Service cards
      servicesRef.current?.querySelectorAll(".svc-card")?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: TA },
          y: 50, opacity: 0, scale: 0.93, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.07,
        });
      });

      // Gallery
      gsap.from(galleryRef.current?.querySelectorAll(".gal-item") ?? [], {
        scrollTrigger: { trigger: galleryRef.current, start: "top 85%", toggleActions: TA },
        y: 60, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.07, ease: "power3.out",
      });

      // Why split
      gsap.from(whyLeftRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", toggleActions: TA },
        x: -80, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(whyRightRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", toggleActions: TA },
        x: 80, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(whyRightRef.current?.querySelectorAll(".why-item") ?? [], {
        scrollTrigger: { trigger: whyRef.current, start: "top 75%", toggleActions: TA },
        x: 45, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%", toggleActions: TA },
        y: 60, scale: 0.95, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(contactRef.current, {
        scrollTrigger: { trigger: contactRef.current, start: "top 88%", toggleActions: TA },
        y: 70, opacity: 0, duration: 0.85, ease: "power3.out",
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ background:"#0c0e12", color:"#fff", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --blue:    #2196F3;
          --blue-d:  #1565C0;
          --blue-l:  #42A5F5;
          --cyan:    #00BCD4;
          --glow:    rgba(33,150,243,0.22);
          --dark:    #0c0e12;
          --dark2:   #13161c;
          --dark3:   #1a1e26;
          --dark4:   #1f2430;
          --border:  rgba(33,150,243,0.18);
          --muted:   rgba(255,255,255,0.45);
        }

        @keyframes slideDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce     { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer    { 0%{left:-100%} 100%{left:200%} }
        @keyframes glow-pulse { 0%,100%{opacity:.4;filter:blur(20px)} 50%{opacity:.75;filter:blur(28px)} }
        @keyframes needle-sweep {
          0%   { transform: rotate(-120deg); }
          60%  { transform: rotate(60deg); }
          80%  { transform: rotate(40deg); }
          100% { transform: rotate(50deg); }
        }
        @keyframes float-badge {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes scan-line {
          0%   { transform: translateY(-100%); opacity:0; }
          10%  { opacity:.4; }
          90%  { opacity:.4; }
          100% { transform: translateY(100%); opacity:0; }
        }
        /* Car drive-in from right, park, then idle bob */
        @keyframes car-enter {
          0%   { transform: translateX(130%); opacity:0; }
          42%  { transform: translateX(0%);   opacity:1; }
          100% { transform: translateX(0%);   opacity:1; }
        }
        @keyframes car-idle {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }
        @keyframes road-scroll {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -80; }
        }
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dust-puff {
          0%   { opacity:0; transform:translate(0,0) scale(0.5); }
          20%  { opacity:0.35; }
          65%  { opacity:0.1; transform:translate(-22px,-14px) scale(2); }
          100% { opacity:0; transform:translate(-36px,-22px) scale(2.8); }
        }
        @keyframes headlight-beam {
          0%,100% { opacity:.6; }
          50%     { opacity:.9; }
        }

        .car-scene   { animation: car-enter 2.2s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .car-body    { animation: car-idle 3.2s ease-in-out 2.4s infinite; }
        .wheel-anim  { animation: wheel-spin 0.35s linear 0s 7, wheel-spin 3.5s linear 2.4s infinite; }
        .dust-cloud  { animation: dust-puff 0.85s ease-out infinite; }
        .road-anim   { stroke-dasharray:50 25; animation: road-scroll 0.55s linear 0s 5, road-scroll 4s linear 2.4s infinite; }

        .nav-link { color:rgba(255,255,255,.6); text-decoration:none; font-size:.85rem; letter-spacing:1px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:var(--blue); }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--blue); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:var(--blue-d); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }
        .btn-primary:active { transform:translateY(0); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:var(--blue);
          border:1.5px solid var(--blue); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(33,150,243,.12); transform:translateY(-2px); }

        .svc-card {
          background:var(--dark3); border:1px solid var(--border);
          padding:30px 26px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .3s, box-shadow .3s;
        }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; width:3px; height:100%;
          background:linear-gradient(180deg,var(--blue),var(--cyan));
          transform:scaleY(0); transform-origin:bottom; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleY(1); }
        .svc-card:hover { border-color:rgba(33,150,243,.5); transform:translateY(-4px); box-shadow:0 16px 48px rgba(33,150,243,.1); }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer .6s ease; }

        .stat-item { text-align:center; padding:28px 16px; border-left:1px solid rgba(33,150,243,.15); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,.05); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:4px; border:1px solid var(--border); cursor:pointer; transition:border-color .3s, transform .3s; background:var(--dark3); position:relative; }
        .gal-item:hover { border-color:rgba(33,150,243,.5); transform:scale(1.02); }
        .info-card { transition:border-color .25s, box-shadow .25s; }
        .info-card:hover { border-color:rgba(33,150,243,.4) !important; box-shadow:0 4px 20px rgba(33,150,243,.08); }

        /* Layout */
        .nav-inner    { padding:16px 52px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; display:flex; align-items:center; padding:100px 52px 70px; position:relative; overflow:hidden; }
        .hero-inner   { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; gap:56px; }
        .hero-text    { flex:1 1 auto; max-width:580px; }
        .hero-vis     { flex:0 0 auto; width:46%; max-width:520px; }
        .section-pad  { padding:100px 52px; }
        .section-sm   { padding:80px 52px; }
        .inner-max    { max-width:1200px; margin:0 auto; }
        .inner-1100   { max-width:1100px; margin:0 auto; }
        .stat-grid    { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:18px; }
        .why-grid     { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:40px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .hero-title   { font-size:clamp(3rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.6rem; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }

        .gallery-grid {
          display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:12px;
        }
        .gal-item:nth-child(1) { grid-column:1/3; grid-row:1/2; height:280px; }
        .gal-item:nth-child(2) { grid-column:3/4; grid-row:1/2; height:280px; }
        .gal-item:nth-child(3) { grid-column:1/2; grid-row:2/3; height:210px; }
        .gal-item:nth-child(4) { grid-column:2/3; grid-row:2/3; height:210px; }
        .gal-item:nth-child(5) { grid-column:3/4; grid-row:2/3; height:210px; }

        @media (max-width:767px) {
          .hamburger    { display:flex !important; }
          .desktop-nav  { display:none !important; }
          .desktop-cta  { display:none !important; }
          .nav-inner    { padding:14px 20px; }
          .hero-section { padding:84px 20px 52px; }
          .hero-inner   { flex-direction:column; gap:32px; align-items:flex-start; }
          .hero-text    { max-width:100%; }
          .hero-vis     { width:100%; max-width:100%; flex:none; }
          .hero-title   { font-size:clamp(2.6rem,12vw,4rem); }
          .section-pad  { padding:60px 20px; }
          .section-sm   { padding:52px 20px; }
          .stat-grid    { grid-template-columns:repeat(2,1fr); }
          .stat-item    { border-left:none !important; border-bottom:1px solid rgba(33,150,243,.12); }
          .stat-item:nth-child(2n)        { border-left:1px solid rgba(33,150,243,.15) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num     { font-size:2rem; }
          .svc-grid     { grid-template-columns:1fr; }
          .why-grid     { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-grid { grid-template-columns:1fr; }
          .footer-row   { flex-direction:column; align-items:flex-start; }
          .cta-btns     { flex-direction:column; }
          .btn-primary,.btn-outline { width:100%; }
          .gallery-grid { grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1) { grid-column:1/3; height:180px; }
          .gal-item:nth-child(n) { grid-column:auto; height:150px; }
        }

        input::placeholder, textarea::placeholder { color:rgba(255,255,255,.2); }
        input, textarea { -webkit-appearance:none; }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(12,14,18,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .22s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.2rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:0359959900" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 03 5995 9900</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(12,14,18,.96)" : "linear-gradient(180deg,rgba(12,14,18,.85) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo — speedometer badge */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48"
                style={{ filter:"drop-shadow(0 2px 10px rgba(33,150,243,0.5))" }}>
                <circle cx="24" cy="24" r="22" fill="#13161c" stroke="rgba(33,150,243,.5)" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(33,150,243,.2)" strokeWidth="6"/>
                {/* Speedometer arc */}
                <path d="M 8,34 A 18 18 0 1 1 40,34" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M 8,34 A 18 18 0 0 1 24,6" fill="none" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" opacity=".5"/>
                {/* Needle */}
                <line x1="24" y1="24" x2="36" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="3" fill="var(--blue)"/>
                {/* OM text */}
                <text x="24" y="42" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="7" fill="rgba(255,255,255,.8)" letterSpacing="1">OVERFLOW</text>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.05rem",color:"#fff",letterSpacing:"2px",lineHeight:1,textShadow:"0 1px 8px rgba(0,0,0,.8)" }}>OVERFLOW MOTORS</div>
              <div style={{ fontSize:".58rem",color:"var(--blue)",letterSpacing:"2.5px",lineHeight:1.5,fontFamily:"'Barlow',sans-serif",fontWeight:500 }}>CRANBOURNE · VIC</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:0359959900" className="btn-primary desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 03 5995 9900</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(135deg,#0c0e12 0%,#0e1218 50%,#0c0e12 100%)" }}>
        {/* Blue glow orb */}
        <div style={{ position:"absolute",top:"30%",right:"10%",width:500,height:500,background:"radial-gradient(ellipse,rgba(33,150,243,.12) 0%,transparent 65%)",pointerEvents:"none",animation:"glow-pulse 4s ease-in-out infinite" }}/>
        {/* Grid lines */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(33,150,243,.05) 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none" }}/>
        {/* Bottom accent */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--blue),var(--cyan),transparent)",opacity:.4 }}/>
        {/* Top-right corner triangle */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 280px 280px 0",borderColor:"transparent rgba(33,150,243,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="hero-inner">
          {/* Left: Text */}
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(33,150,243,.1)",border:"1px solid rgba(33,150,243,.35)",padding:"6px 16px",marginBottom:20,borderRadius:2 }}>
              <div style={{ width:6,height:6,background:"var(--blue)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"3px",color:"var(--blue)",fontWeight:700 }}>MECHANICAL WORKSHOP · CRANBOURNE VIC</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                YOUR LOCAL<br/>
                <span style={{ color:"var(--blue)" }}>MECHANIC</span><br/>
                IN CRANBOURNE
              </h1>
            </div>

            <p ref={heroSubRef} style={{ marginTop:22,fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:460,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              Small local mechanical workshop doing all sorts of repairs — small to big. Quality work, quality parts, no shortcuts.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:0359959900" className="btn-primary">📞 BOOK NOW — 03 5995 9900</a>
              <a href="#services" className="btn-outline">OUR SERVICES</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"03 5995 9900",                      href:"tel:0359959900" },
                { icon:"📍", val:"15 Arundel Street, Cranbourne",     href:"https://maps.google.com/?q=15+Arundel+Street+Cranbourne" },
              ].map(c => (
                <a key={c.val} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--blue)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Speedometer + Car animation */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible",filter:"drop-shadow(0 4px 32px rgba(33,150,243,0.15))" }}>

              {/* ── ROAD ── */}
              <rect x="0" y="295" width="520" height="65" fill="#141414"/>
              <line x1="0" y1="297" x2="520" y2="297" stroke="rgba(33,150,243,.2)" strokeWidth="1.5"/>
              <line x1="0" y1="327" x2="520" y2="327"
                stroke="rgba(255,255,255,.09)" strokeWidth="2"
                className="road-anim"
              />
              <line x1="0" y1="358" x2="520" y2="358" stroke="rgba(33,150,243,.08)" strokeWidth="1"/>

              {/* ── SPEEDOMETER (top right) ── */}
              <g transform="translate(370,130)">
                {/* Outer ring */}
                <circle cx="0" cy="0" r="96" fill="#13161c" stroke="rgba(33,150,243,.3)" strokeWidth="2"/>
                <circle cx="0" cy="0" r="96" fill="none" stroke="rgba(33,150,243,.08)" strokeWidth="12"/>
                {/* Speed arc background */}
                <path d="M -82,-40 A 90 90 0 1 1 82,-40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8" strokeLinecap="round"/>
                {/* Active speed arc — blue to cyan */}
                <path d="M -82,-40 A 90 90 0 0 1 60,70" fill="none"
                  stroke="url(#speedGrad)" strokeWidth="8" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="speedGrad" x1="-1" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2196F3"/>
                    <stop offset="100%" stopColor="#00BCD4"/>
                  </linearGradient>
                </defs>
                {/* Gauge ticks */}
                {GAUGE_TICKS.map((t,i) => (
                  <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                    stroke={t.long ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.2)"}
                    strokeWidth={t.long ? 2 : 1.2}
                  />
                ))}
                {/* Needle — animated sweep */}
                <g style={{ transformOrigin:"0 0", animation:"needle-sweep 2.5s ease-out 0.5s forwards", transform:"rotate(-120deg)" }}>
                  <line x1="0" y1="0" x2="70" y2="0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="0" y1="0" x2="-15" y2="0" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round"/>
                </g>
                {/* Center hub */}
                <circle cx="0" cy="0" r="8" fill="#1f2430" stroke="var(--blue)" strokeWidth="2"/>
                <circle cx="0" cy="0" r="4" fill="var(--blue)"/>
                {/* Speed readout */}
                <text x="0" y="32" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="22" fill="#fff">120</text>
                <text x="0" y="46" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="9" fill="rgba(255,255,255,.4)" letterSpacing="2">KM/H</text>
                {/* OVERFLOW MOTORS */}
                <text x="0" y="-50" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="rgba(33,150,243,.7)" letterSpacing="3">OVERFLOW MOTORS</text>
              </g>

              {/* ── CAR — Holden Commodore, drives in from right ── */}
              {/* Dust puffs behind rear wheel during drive-in */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={68} cy={295}
                  rx={7+i*4} ry={4+i*2}
                  fill="rgba(150,130,80,.1)"
                  className="dust-cloud"
                  style={{ animationDelay:`${i*0.28}s`, animationDuration:"0.85s", animationIterationCount:"6" }}
                />
              ))}

              <g className="car-scene">
                {/* car-body handles idle bob — wheels are children so they bob too */}
                <g className="car-body">

                  {/* ── BODY ── */}
                  <path d="M 60,250 L 60,225 Q 60,215 68,215 L 110,215 Q 120,210 148,200 L 248,198 Q 275,198 290,208 L 340,215 Q 352,215 352,225 L 352,250 Z"
                    fill="#cc2020" stroke="rgba(200,20,20,.6)" strokeWidth="1.5"/>
                  {/* Roof */}
                  <path d="M 120,215 Q 128,195 148,190 L 250,188 Q 275,188 288,200 L 340,215 Z"
                    fill="#b81c1c" stroke="rgba(160,20,20,.4)" strokeWidth="1"/>
                  {/* Windshield */}
                  <path d="M 145,190 L 155,215 L 250,215 L 270,200 L 248,188 Z"
                    fill="rgba(100,160,220,.2)" stroke="rgba(100,160,220,.35)" strokeWidth="1"/>
                  {/* Rear window */}
                  <path d="M 120,215 L 130,200 L 148,190 L 148,215 Z"
                    fill="rgba(100,160,220,.15)" stroke="rgba(100,160,220,.25)" strokeWidth="1"/>
                  {/* Side windows */}
                  <rect x="158" y="202" width="42" height="12" rx="2" fill="rgba(100,160,220,.18)" stroke="rgba(100,160,220,.3)" strokeWidth="1"/>
                  <rect x="204" y="200" width="54" height="14" rx="2" fill="rgba(100,160,220,.18)" stroke="rgba(100,160,220,.3)" strokeWidth="1"/>
                  {/* Door lines */}
                  <line x1="202" y1="215" x2="202" y2="250" stroke="rgba(180,0,0,.4)" strokeWidth="1"/>
                  <line x1="156" y1="215" x2="156" y2="250" stroke="rgba(180,0,0,.35)" strokeWidth="1"/>
                  {/* Door handles */}
                  <rect x="175" y="230" width="14" height="4" rx="2" fill="rgba(255,255,255,.2)"/>
                  <rect x="220" y="228" width="16" height="4" rx="2" fill="rgba(255,255,255,.2)"/>
                  {/* Headlight — pulse glow */}
                  <rect x="342" y="218" width="16" height="12" rx="3" fill="rgba(255,240,150,.9)"
                    style={{ animation:"headlight-beam 1.8s ease-in-out 2.6s infinite" }}/>
                  <rect x="344" y="220" width="12" height="5" rx="1" fill="rgba(255,220,80,.7)"/>
                  {/* Headlight beam cone */}
                  <path d="M358,222 Q420,215 440,224 Q420,232 358,228Z"
                    fill="rgba(255,240,150,.08)"
                    style={{ animation:"headlight-beam 1.8s ease-in-out 2.6s infinite" }}/>
                  {/* Tail light */}
                  <rect x="56"  y="218" width="12" height="14" rx="2" fill="rgba(200,30,30,.8)" stroke="rgba(255,100,100,.3)" strokeWidth="1"/>
                  {/* Front bumper */}
                  <rect x="345" y="230" width="20" height="20" rx="3" fill="#1a1a1a" stroke="rgba(200,20,20,.3)" strokeWidth="1"/>
                  {/* Grille slats */}
                  {[232,237,242].map(y => <line key={y} x1="345" y1={y} x2="365" y2={y} stroke="rgba(33,150,243,.35)" strokeWidth="1.5"/>)}
                  {/* Rear bumper */}
                  <rect x="42" y="230" width="20" height="20" rx="3" fill="#1a1a1a" stroke="rgba(200,20,20,.3)" strokeWidth="1"/>
                  {/* Exhaust pipe */}
                  <rect x="44" y="246" width="12" height="5" rx="2" fill="#333"/>
                  <ellipse cx="44" cy="248" rx="4" ry="4" fill="#222" stroke="#444" strokeWidth="1"/>
                  {/* Exhaust smoke puffs after parking */}
                  <ellipse cx="36" cy="246" rx="6"  ry="4"  fill="rgba(200,200,200,.07)" style={{ animation:"dust-puff 2s ease-out 2.8s infinite" }}/>
                  <ellipse cx="26" cy="242" rx="8"  ry="5"  fill="rgba(200,200,200,.05)" style={{ animation:"dust-puff 2s ease-out 3.1s infinite" }}/>
                  {/* Blue side stripe */}
                  <rect x="62" y="232" width="286" height="4" fill="rgba(33,150,243,.55)"/>
                  {/* OVERFLOW MOTORS on car */}
                  <text x="185" y="246" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(33,150,243,.8)" letterSpacing="2">OVERFLOW MOTORS</text>

                  {/* ── WHEELS — spinning ── */}
                  {[100, 308].map(wx => (
                    <g key={wx} transform={`translate(${wx},295)`}>
                      {/* Tyre */}
                      <circle cx="0" cy="0" r="26" fill="#111" stroke="rgba(180,180,180,.5)" strokeWidth="2.5"/>
                      {/* Rim */}
                      <circle cx="0" cy="0" r="18" fill="#1a1a1a" stroke="rgba(180,180,180,.3)" strokeWidth="1.5"/>
                      {/* Rim edge */}
                      <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(0,0,0,.6)" strokeWidth="4"/>
                      {/* Hub */}
                      <circle cx="0" cy="0" r="5" fill="#999"/>
                      {/* 5-spoke alloys — rotate with wheel-anim */}
                      <g className="wheel-anim">
                        {[0,72,144,216,288].map(a => {
                          const rad = (a*Math.PI)/180;
                          return <line key={a}
                            x1={+(Math.cos(rad)*5).toFixed(3)} y1={+(Math.sin(rad)*5).toFixed(3)}
                            x2={+(Math.cos(rad)*17).toFixed(3)} y2={+(Math.sin(rad)*17).toFixed(3)}
                            stroke="rgba(200,200,200,.65)" strokeWidth="3" strokeLinecap="round"/>;
                        })}
                      </g>
                    </g>
                  ))}

                </g>{/* end car-body */}
              </g>{/* end car-scene */}

              {/* Ground shadow */}
              <ellipse cx="210" cy="360" rx="200" ry="7" fill="rgba(33,150,243,.06)"/>

              {/* Floating badge: Service Special */}
              <g style={{ animation:"float-badge 3s ease-in-out 1s infinite" }}>
                <rect x="20" y="40" width="130" height="68" rx="6" fill="var(--dark3)" stroke="rgba(33,150,243,.4)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(33,150,243,0.15))" }}/>
                <rect x="20" y="40" width="130" height="20" rx="6" fill="var(--blue)" style={{ borderRadius:"6px 6px 0 0" }}/>
                <rect x="20" y="52" width="130" height="8" rx="0" fill="var(--blue)"/>
                <text x="85" y="55" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="#fff" letterSpacing="2">SERVICE SPECIAL</text>
                <text x="85" y="76" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="18" fill="#fff">From $300</text>
                <text x="85" y="92" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="rgba(255,255,255,.55)">incl. free car wash</text>
                <text x="85" y="103" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="rgba(255,255,255,.55)">+ air freshener</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.4,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"4px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif" }}>SCROLL</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(33,150,243,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
        <div className="stat-grid">
          {[
            { n:"2011",  l:"Est. Cranbourne VIC"  },
            { n:"Small",  l:"To Big Repairs"     },
            { n:"All",    l:"Makes & Models"     },
            { n:"Free",   l:"Car Wash w/ Service"},
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--blue)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"var(--muted)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICE SPECIAL BANNER ══ */}
      <section ref={specialRef} className="section-sm" style={{ background:"var(--dark)",padding:"56px 52px" }}>
        <div className="inner-1100">
          <div style={{ background:"linear-gradient(135deg,var(--dark3),var(--dark4))",border:"1px solid rgba(33,150,243,.35)",padding:"40px 48px",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",gap:48,flexWrap:"wrap",borderRadius:4 }}>
            {/* Blue glow */}
            <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,var(--blue),var(--cyan))" }}/>
            <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:200,background:"radial-gradient(ellipse,rgba(33,150,243,.07) 0%,transparent 70%)",pointerEvents:"none" }}/>

            {/* Left */}
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--blue)",marginBottom:8,fontWeight:700 }}>🔥 SERVICE SPECIAL</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.5rem)",color:"#fff",lineHeight:.9,letterSpacing:"-1px" }}>
                FULL VEHICLE SERVICE<br/><span style={{ color:"var(--blue)" }}>FROM $300</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width:1,height:80,background:"rgba(33,150,243,.25)",flexShrink:0 }}/>

            {/* Includes */}
            <div style={{ flex:1,minWidth:200 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",letterSpacing:"3px",color:"var(--muted)",marginBottom:12,fontWeight:600 }}>EVERY SERVICE INCLUDES</div>
              {["✅ Quality oils & premium filters","🚗 FREE car wash","🌿 FREE air freshener","🔍 Full vehicle inspection"].map(item => (
                <div key={item} style={{ fontFamily:"'Barlow',sans-serif",fontSize:".88rem",color:"rgba(255,255,255,.75)",marginBottom:6,display:"flex",alignItems:"center",gap:6 }}>{item}</div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginBottom:8,textAlign:"center" }}>LIMITED SPOTS</div>
              <a href="tel:0359959900" className="btn-primary" style={{ fontSize:".9rem" }}>📞 BOOK NOW</a>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".72rem",color:"var(--muted)",marginTop:8,textAlign:"center" }}>Call or text: 5995 9900</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid rgba(33,150,243,.07)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--blue)",marginBottom:10,fontWeight:700 }}>WHAT WE DO</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              MECHANICAL SERVICES<br/><span style={{ color:"var(--blue)" }}>SMALL TO BIG</span>
            </h2>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#fff",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>{s.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:".87rem",lineHeight:1.75,marginBottom:16,fontFamily:"'Barlow',sans-serif" }}>{s.desc}</p>
                <span style={{ display:"inline-block",padding:"4px 12px",background:"rgba(33,150,243,.1)",border:"1px solid rgba(33,150,243,.3)",color:"var(--blue)",fontSize:".7rem",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",fontWeight:700 }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="work" className="section-pad" style={{ background:"var(--dark)",borderTop:"1px solid rgba(33,150,243,.07)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--blue)",marginBottom:10,fontWeight:700 }}>OUR WORK</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              CARS IN THE SHOP<br/><span style={{ color:"var(--blue)" }}>CRANBOURNE</span>
            </h2>
          </div>

          <div ref={galleryRef} className="gallery-grid">
            {/* Card 1 — Red Commodore front */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#0e1014"/>
                {/* Workshop floor */}
                <rect x="0" y="200" width="520" height="80" fill="#1a1a1a"/>
                <rect x="0" y="199" width="520" height="3" fill="rgba(33,150,243,.2)"/>
                {/* Roller doors bg */}
                <rect x="0"   y="0" width="200" height="200" fill="#161a20" stroke="rgba(33,150,243,.05)" strokeWidth="1"/>
                <rect x="210" y="0" width="310" height="200" fill="#14181e"/>
                {[30,60,90,120,150,180].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
                {/* Red Commodore */}
                <path d="M80,140 L80,120 Q80,112 88,112 L145,108 Q165,104 200,102 L330,100 Q360,100 375,110 L420,120 L420,155 L420,195 L80,195Z" fill="#cc2020" stroke="rgba(200,20,20,.5)" strokeWidth="1.5"/>
                <path d="M155,108 Q165,92 190,86 L315,84 Q348,84 368,98 L420,120 L350,120 Z" fill="#b81c1c" stroke="rgba(160,20,20,.3)" strokeWidth="1"/>
                <path d="M165,90 L178,120 L330,120 L362,98 L315,84 Z" fill="rgba(100,150,200,.18)" stroke="rgba(100,150,200,.3)" strokeWidth="1"/>
                <rect x="358" y="118" width="16" height="10" rx="2" fill="rgba(255,240,150,.9)"/>
                <rect x="80"  y="120" width="12" height="14" rx="2" fill="rgba(200,30,30,.8)"/>
                <rect x="80"  y="185" width="342" height="4" fill="rgba(33,150,243,.5)"/>
                {/* Wheels */}
                {[140,330].map(wx => (
                  <g key={wx} transform={`translate(${wx},198)`}>
                    <circle cx="0" cy="0" r="28" fill="#111" stroke="rgba(180,180,180,.4)" strokeWidth="2.5"/>
                    <circle cx="0" cy="0" r="18" fill="#1a1a1a"/>
                    <circle cx="0" cy="0" r="6" fill="#888"/>
                    {[0,72,144,216,288].map(a => {const r=(a*Math.PI)/180;return<line key={a} x1={+(Math.cos(r)*6).toFixed(2)} y1={+(Math.sin(r)*6).toFixed(2)} x2={+(Math.cos(r)*17).toFixed(2)} y2={+(Math.sin(r)*17).toFixed(2)} stroke="rgba(200,200,200,.55)" strokeWidth="3" strokeLinecap="round"/>;})}
                  </g>
                ))}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(12,14,18,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>HOLDEN COMMODORE</div>
                <div style={{ fontSize:".72rem",color:"rgba(33,150,243,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Service & mechanical work</div>
              </div>
            </div>

            {/* Card 2 — Workshop exterior */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#0a0c10"/>
                {/* Sky */}
                <rect x="0" y="0" width="240" height="120" fill="#0e1420"/>
                {/* Workshop building */}
                <rect x="10" y="40" width="220" height="180" fill="#1a1e26" stroke="rgba(33,150,243,.15)" strokeWidth="1"/>
                {/* Sign */}
                <rect x="30" y="50" width="180" height="30" rx="2" fill="var(--blue)" opacity=".85"/>
                <text x="120" y="70" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="11" fill="#fff" letterSpacing="2">OVERFLOW MOTORS</text>
                {/* Bay doors */}
                <rect x="20"  y="90" width="90" height="120" rx="2" fill="#111" stroke="rgba(33,150,243,.25)" strokeWidth="1.5"/>
                <rect x="125" y="90" width="90" height="120" rx="2" fill="#111" stroke="rgba(33,150,243,.25)" strokeWidth="1.5"/>
                {[20,35,50,65,80,95,108].map(y => <line key={y} x1="20"  y1={y+90} x2="110"  y2={y+90} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
                {[20,35,50,65,80,95,108].map(y => <line key={y} x1="125" y1={y+90} x2="215" y2={y+90} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
                {/* Bay number */}
                <text x="65"  y="138" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="28" fill="rgba(33,150,243,.15)">1</text>
                <text x="170" y="138" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="28" fill="rgba(33,150,243,.15)">2</text>
                {/* Ground */}
                <rect x="0" y="220" width="240" height="60" fill="#111"/>
                {/* 15B signage */}
                <rect x="100" y="175" width="40" height="28" rx="2" fill="#2a2e38" stroke="rgba(33,150,243,.3)" strokeWidth="1"/>
                <text x="120" y="193" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="12" fill="#fff">15b</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(12,14,18,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>THE WORKSHOP</div>
                <div style={{ fontSize:".72rem",color:"rgba(33,150,243,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>15 Arundel St, Cranbourne</div>
              </div>
            </div>

            {/* Card 3 — Burnout/performance */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0a0c10"/>
                <rect x="0" y="140" width="200" height="70" fill="#141414"/>
                {/* Smoke */}
                {[[40,130],[70,120],[100,115],[130,122],[160,128]].map(([x,y],i) => (
                  <ellipse key={i} cx={x} cy={y} rx={20+i*5} ry={12+i*3} fill="rgba(200,200,200,.08)" opacity={.6-i*.1}/>
                ))}
                {/* Car silhouette — sedan */}
                <path d="M20,110 L20,95 Q20,88 26,88 L55,84 Q65,80 90,78 L130,78 Q150,78 158,86 L175,95 L175,125 L20,125Z" fill="#1a1a1a" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
                <path d="M58,84 Q64,72 80,68 L118,68 Q138,68 150,80 L175,95 L135,95Z" fill="#222" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                {/* Headlights */}
                <rect x="167" y="91" width="10" height="7" rx="2" fill="rgba(255,240,150,.8)"/>
                {/* Smoke from rear tyre */}
                <path d="M20,118 Q8,115 4,125 Q8,130 20,128Z" fill="rgba(220,220,220,.2)"/>
                {/* Skid marks */}
                <path d="M30,130 Q60,128 90,130 Q120,132 150,130" stroke="rgba(0,0,0,.6)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(12,14,18,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>PERFORMANCE</div>
                <div style={{ fontSize:".72rem",color:"rgba(33,150,243,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Mods & tuning welcome</div>
              </div>
            </div>

            {/* Card 4 — Hyundai/modern */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0c0e12"/>
                <rect x="0" y="150" width="200" height="60" fill="#101010"/>
                {/* Showroom-style gradient bg */}
                <circle cx="100" cy="80" r="120" fill="url(#carGlow)"/>
                <defs><radialGradient id="carGlow" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(33,150,243,.08)"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
                {/* Modern sedan — Hyundai style */}
                <path d="M25,120 L25,102 Q25,94 32,93 L60,88 Q75,84 100,82 L138,82 Q158,83 165,92 L178,102 L178,128 L25,128Z" fill="#b0b8c8" stroke="rgba(200,210,220,.3)" strokeWidth="1"/>
                <path d="M62,88 Q70,76 88,72 L118,72 Q140,73 158,86 L178,102 L145,102Z" fill="#a8b0c0" stroke="rgba(180,190,200,.2)" strokeWidth="1"/>
                {/* Cyan accent — Hyundai performance line */}
                <rect x="25" y="112" width="153" height="3" fill="rgba(0,188,212,.7)"/>
                <path d="M62,88 L74,102 L138,102 L158,88 Z" fill="rgba(100,150,200,.18)" stroke="rgba(100,150,200,.3)" strokeWidth="1"/>
                {/* Headlight (LED) */}
                <path d="M167,96 L175,100 L175,106 L167,104Z" fill="rgba(0,188,212,.9)"/>
                {[0,72,144,216,288].map(a=>{const r=(a*Math.PI)/180;return<g key={a}><g transform={`translate(60,152)`}><line x1={+(Math.cos(r)*6).toFixed(2)} y1={+(Math.sin(r)*6).toFixed(2)} x2={+(Math.cos(r)*18).toFixed(2)} y2={+(Math.sin(r)*18).toFixed(2)} stroke="rgba(200,200,200,.55)" strokeWidth="2.5" strokeLinecap="round"/></g><g transform={`translate(148,152)`}><line x1={+(Math.cos(r)*6).toFixed(2)} y1={+(Math.sin(r)*6).toFixed(2)} x2={+(Math.cos(r)*18).toFixed(2)} y2={+(Math.sin(r)*18).toFixed(2)} stroke="rgba(200,200,200,.55)" strokeWidth="2.5" strokeLinecap="round"/></g></g>;})}
                {[60,148].map(wx=><g key={wx} transform={`translate(${wx},152)`}><circle cx="0" cy="0" r="22" fill="#111" stroke="rgba(200,200,200,.35)" strokeWidth="2"/><circle cx="0" cy="0" r="6" fill="#888"/></g>)}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(12,14,18,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>ALL MAKES & MODELS</div>
                <div style={{ fontSize:".72rem",color:"rgba(33,150,243,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Import, domestic, performance</div>
              </div>
            </div>

            {/* Card 5 — Engine/Workshop */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0c0e12"/>
                {/* Workshop bench */}
                <rect x="0" y="140" width="200" height="70" fill="#131620"/>
                <rect x="10" y="140" width="180" height="8" rx="2" fill="#1e2230" stroke="rgba(33,150,243,.15)" strokeWidth="1"/>
                {/* Engine block illustration */}
                <rect x="40" y="60"  width="120" height="80" rx="4" fill="#1a1e28" stroke="rgba(33,150,243,.2)" strokeWidth="1.5"/>
                {/* Engine head */}
                <rect x="50" y="50"  width="100" height="16" rx="2" fill="#22283a" stroke="rgba(33,150,243,.25)" strokeWidth="1"/>
                {/* Cam covers */}
                <rect x="56" y="38"  width="38"  height="14" rx="3" fill="#2a3050" stroke="rgba(33,150,243,.35)" strokeWidth="1"/>
                <rect x="106" y="38" width="38"  height="14" rx="3" fill="#2a3050" stroke="rgba(33,150,243,.35)" strokeWidth="1"/>
                {/* Intake */}
                <rect x="70" y="28"  width="60"  height="12" rx="4" fill="#1e2438" stroke="rgba(33,150,243,.3)" strokeWidth="1"/>
                {/* Coolant lines */}
                <path d="M30,90 Q20,90 18,80 Q16,70 30,68" stroke="rgba(0,188,212,.4)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M170,88 Q182,88 184,78 Q186,68 170,66" stroke="rgba(0,188,212,.4)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                {/* Bolts */}
                {[[55,70],[80,70],[105,70],[130,70],[155,70],[55,120],[155,120]].map(([bx,by],i) => (
                  <circle key={i} cx={bx} cy={by} r="4" fill="#111" stroke="rgba(33,150,243,.3)" strokeWidth="1.5"/>
                ))}
                {/* Blue glow */}
                <ellipse cx="100" cy="100" rx="60" ry="40" fill="rgba(33,150,243,.04)"/>
                {/* Tools */}
                <rect x="25" y="152" width="40" height="6" rx="3" fill="#555" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                <rect x="72" y="150" width="30" height="10" rx="2" fill="#444" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(12,14,18,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>ENGINE WORK</div>
                <div style={{ fontSize:".72rem",color:"rgba(33,150,243,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Full mechanical repairs</div>
              </div>
            </div>
          </div>

          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            Follow us on <a href="https://www.instagram.com/overflowmotors" style={{ color:"var(--blue)",textDecoration:"none",fontWeight:500 }} target="_blank" rel="noopener noreferrer">@overflowmotors</a> for more builds and workshop shots
          </p>
        </div>
      </section>

      {/* ══ WHY OVERFLOW ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid rgba(33,150,243,.07)" }}>
        <div className="why-grid">
          <div ref={whyLeftRef} style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"44px 36px",position:"relative",overflow:"hidden" }}>
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:18,height:18,
                borderTop:i<2?"2px solid var(--blue)":undefined,
                borderBottom:i>=2?"2px solid var(--blue)":undefined,
                borderLeft:i%2===0?"2px solid var(--blue)":undefined,
                borderRight:i%2===1?"2px solid var(--blue)":undefined,
              }}/>
            ))}
            {/* Large speedometer */}
            <svg width="100%" viewBox="0 0 280 280" fill="none">
              <circle cx="140" cy="140" r="120" fill="rgba(33,150,243,.04)" stroke="rgba(33,150,243,.2)" strokeWidth="1.5"/>
              <path d="M 50,190 A 110 110 0 1 1 230,190" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" strokeLinecap="round"/>
              <path d="M 50,190 A 110 110 0 0 1 140,30"  fill="none" stroke="url(#bigGaugeGrad)" strokeWidth="14" strokeLinecap="round"/>
              <defs><linearGradient id="bigGaugeGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="var(--blue)"/><stop offset="100%" stopColor="var(--cyan)"/></linearGradient></defs>
              {Array.from({length:25},(_,i)=>{const a=-130+i*11;const r=(a*Math.PI)/180;const l=i%5===0;const r1=l?98:102;const r2=110;return<line key={i} x1={140+Math.cos(r)*r1} y1={140+Math.sin(r)*r1} x2={140+Math.cos(r)*r2} y2={140+Math.sin(r)*r2} stroke={l?"rgba(255,255,255,.5)":"rgba(255,255,255,.18)"} strokeWidth={l?2:1.2}/>;})}
              <line x1="140" y1="140" x2="210" y2="80" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              <line x1="140" y1="140" x2="116" y2="152" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="140" cy="140" r="12" fill="var(--dark3)" stroke="var(--blue)" strokeWidth="2.5"/>
              <circle cx="140" cy="140" r="6" fill="var(--blue)"/>
              <text x="140" y="175" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="26" fill="#fff">100%</text>
              <text x="140" y="193" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="10" fill="rgba(255,255,255,.4)" letterSpacing="2">COMMITTED</text>
              <text x="140" y="60" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="11" fill="rgba(33,150,243,.7)" letterSpacing="3">OVERFLOW MOTORS</text>
              <text x="140" y="76" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="9" fill="rgba(255,255,255,.3)" letterSpacing="1">CRANBOURNE VIC</text>
            </svg>
            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--blue)",color:"#fff",padding:"12px 18px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px" }}>
              BOOK<br/>TODAY
            </div>
          </div>

          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--blue)",marginBottom:12,fontWeight:700 }}>WHY OVERFLOW MOTORS</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
              YOUR CRANBOURNE<br/><span style={{ color:"var(--blue)" }}>LOCAL MECHANIC</span><br/>YOU CAN TRUST
            </h2>
            {[
              { icon:"🏠", title:"Local & Independent",    desc:"Small local mechanical workshop in Cranbourne. We're part of the community — your car isn't just a number." },
              { icon:"🔧", title:"All Repairs Covered",    desc:"From a basic service to major engine work. Small jobs or big jobs, we've got the skills and equipment to handle it." },
              { icon:"💰", title:"Honest Pricing",         desc:"Transparent quotes, no hidden fees. Full vehicle service from $300 — quality oils and filters, no cheap substitutes." },
              { icon:"🚗", title:"All Makes & Models",     desc:"Holden, Ford, Toyota, imports, performance cars — if it's got an engine, we'll look after it properly." },
              { icon:"⭐", title:"The Little Extras",      desc:"Every service comes with a free car wash and air freshener. Because the details matter." },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div style={{ fontSize:"1.4rem",lineHeight:1,marginTop:2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",marginBottom:4,fontSize:"1rem",letterSpacing:".5px",textTransform:"uppercase" }}>{item.title}</div>
                  <div style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"linear-gradient(135deg,#0c0e12,#0e1220,#0c0e12)",borderTop:"1px solid rgba(33,150,243,.07)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(33,150,243,.09) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--blue),var(--cyan),transparent)" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--blue),var(--cyan),transparent)" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"6px",color:"var(--blue)",marginBottom:14,fontWeight:700 }}>BOOK A SERVICE</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,6vw,4.5rem)",fontWeight:900,color:"#fff",lineHeight:.9,marginBottom:14,letterSpacing:"-1px" }}>
          NEED A SERVICE<br/><span style={{ color:"var(--blue)" }}>YOU CAN TRUST?</span>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:420,margin:"0 auto 36px",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>
          Limited spots available. Call or text to book your vehicle in at Overflow Motors, Cranbourne.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:0359959900" className="btn-primary">📞 03 5995 9900</a>
          <a href="#contact" className="btn-outline">SEND A MESSAGE</a>
        </div>
        <p style={{ marginTop:16,color:"rgba(255,255,255,.25)",fontSize:".78rem",fontFamily:"'Barlow',sans-serif" }}>Call or text: 5995 9900 · 15 Arundel Street, Cranbourne</p>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--blue)",marginBottom:10,fontWeight:700 }}>GET IN TOUCH</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              BOOK YOUR<br/><span style={{ color:"var(--blue)" }}>CAR IN TODAY</span>
            </h2>
          </div>
          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone / SMS",  val:"03 5995 9900",                           href:"tel:0359959900" },
                { icon:"✉️", label:"Email",        val:"overflowmotor@gmail.com",                href:"mailto:overflowmotor@gmail.com" },
                { icon:"📍", label:"Address",      val:"15B Arundel Street, Cranbourne VIC",     href:"https://maps.google.com/?q=15B+Arundel+Street+Cranbourne+VIC" },
                { icon:"📱", label:"Instagram",    val:"@overflowmotors",                        href:"https://www.instagram.com/overflowmotors" },
                { icon:"🕐", label:"Hours",        val:"Call for current trading hours",         href:undefined },
                { icon:"🔧", label:"Speciality",   val:"All makes & models · Small to big",     href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"var(--dark3)",border:"1px solid var(--border)",borderRadius:2 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--blue)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"rgba(255,255,255,.75)",fontSize:".88rem",textDecoration:"none",wordBreak:"break-all",fontFamily:"'Barlow',sans-serif",transition:"color .2s" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--blue)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.75)")}
                        >{c.val}</a>
                      : <span style={{ color:"rgba(255,255,255,.7)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:2 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#fff",letterSpacing:"1px",marginBottom:24,textTransform:"uppercase" }}>Book a Service</div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith"             },
                { label:"Phone / SMS", type:"tel",   ph:"04XX XXX XXX"           },
                { label:"Email",       type:"email", ph:"you@example.com"        },
                { label:"Vehicle",     type:"text",  ph:"e.g. 2018 Holden Commodore" },
                { label:"Service",     type:"text",  ph:"e.g. Full service, brakes, tyres…" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(33,150,243,.55)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Additional Info</label>
                <textarea rows={3} placeholder="Any other details — mileage, known issues, preferred timing…"
                  style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:2,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(33,150,243,.55)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%",fontSize:".9rem" }}>🔧 SEND BOOKING REQUEST</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"#090b0f",borderTop:"1px solid var(--border)",padding:"28px 52px" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),var(--blue-d))",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".72rem",color:"#fff" }}>OM</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".88rem",color:"rgba(255,255,255,.7)",letterSpacing:"1.5px" }}>OVERFLOW MOTORS</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(33,150,243,.6)",letterSpacing:"2px" }}>15B ARUNDEL ST · CRANBOURNE VIC · EST. 2011</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:0359959900" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>03 5995 9900</a>
            <a href="mailto:overflowmotor@gmail.com" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>overflowmotor@gmail.com</a>
            <a href="https://www.instagram.com/overflowmotors" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>@overflowmotors</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Overflow Motors. Cranbourne, VIC.</div>
        </div>
      </footer>
    </div>
  );
}
