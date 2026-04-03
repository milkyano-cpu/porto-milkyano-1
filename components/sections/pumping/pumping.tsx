"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🏗️", title: "Concrete Slabs",   desc: "Residential and commercial slab work done right. Accurate placement, smooth finish, every time." },
  { icon: "🚗", title: "Driveways",         desc: "Durable, clean driveways that add value and kerb appeal to any property across the region." },
  { icon: "🏠", title: "Footings",          desc: "Solid footings for new builds and extensions. Precision pumping to get the foundation right." },
  { icon: "🧱", title: "Blockfills",        desc: "Efficient blockfill pumping for retaining walls and block construction projects of any scale." },
  { icon: "✨", title: "Exposed Aggregate", desc: "Decorative exposed concrete for outdoor areas, paths and entertaining spaces. Great finish guaranteed." },
  { icon: "📐", title: "& Lots More",       desc: "Every pour is different. If you need concrete pumped, chances are we can help. Just give us a call." },
];

const AREAS = ["Gympie", "Wide Bay", "Sunshine Coast", "South Burnett", "Noosa Hinterland", "Cooloola"];

// Pre-computed wheel spokes — avoids SSR/client floating point mismatch
const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];
const makeSpokes = (r1: number, r2: number) =>
  SPOKE_ANGLES.map(a => {
    const rad = (a * Math.PI) / 180;
    return {
      x1: +(Math.cos(rad) * r1).toFixed(4),
      y1: +(Math.sin(rad) * r1).toFixed(4),
      x2: +(Math.cos(rad) * r2).toFixed(4),
      y2: +(Math.sin(rad) * r2).toFixed(4),
    };
  });
const SPOKES_SM = makeSpokes(4, 11);
const SPOKES_LG = makeSpokes(5, 14);

export default function AdeptConcreting() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLDivElement>(null);
  const heroSubRef    = useRef<HTMLDivElement>(null);
  const heroCtaRef    = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);
  const areasRef      = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(heroBadgeRef.current,  { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(heroTitleRef.current,  { y: 80, opacity: 0, skewY: 3, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .from(heroSubRef.current,    { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(heroCtaRef.current,    { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35");

      // Hero parallax
      // gsap.to(heroTitleRef.current, {
      //   scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 },
      //   y: -80, opacity: 0.1, ease: "none",
      // });

      // Stats
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.from(Array.from(statItems), {
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", end: "top 45%", toggleActions: TA },
          y: 50, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
        });
      }

      // Service cards
      const cards = servicesRef.current?.querySelectorAll(".svc-card");
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const left = i % 2 === 0;
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 45%", toggleActions: TA },
            x: left ? -60 : 60, y: 40, rotateY: left ? -18 : 18, rotateX: 8,
            opacity: 0, scale: 0.88, duration: 0.8, ease: "power3.out",
            transformOrigin: left ? "left center" : "right center",
          });
        });
      }

      // Gallery
      const galleryItems = galleryRef.current?.querySelectorAll(".gal-item");
      if (galleryItems) {
        gsap.from(Array.from(galleryItems), {
          scrollTrigger: { trigger: galleryRef.current, start: "top 85%", end: "top 40%", toggleActions: TA },
          y: 60, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.08, ease: "power3.out",
        });
      }

      // Why split
      gsap.from(whyLeftRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", end: "top 38%", toggleActions: TA },
        x: -90, rotateY: 18, opacity: 0, scale: 0.93, duration: 1.0, ease: "power3.out", transformOrigin: "left center",
      });
      gsap.from(whyRightRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", end: "top 38%", toggleActions: TA },
        x: 90, rotateY: -18, opacity: 0, duration: 1.0, ease: "power3.out", transformOrigin: "right center",
      });
      const whyItems = whyRightRef.current?.querySelectorAll(".why-item");
      if (whyItems) {
        gsap.from(Array.from(whyItems), {
          scrollTrigger: { trigger: whyRef.current, start: "top 75%", end: "top 30%", toggleActions: TA },
          x: 50, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        });
      }

      // Areas
      const areaItems = areasRef.current?.querySelectorAll(".area-tag");
      if (areaItems) {
        gsap.from(Array.from(areaItems), {
          scrollTrigger: { trigger: areasRef.current, start: "top 85%", end: "top 45%", toggleActions: TA },
          y: 30, opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.07, ease: "back.out(1.5)",
        });
      }

      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%", end: "top 42%", toggleActions: TA },
        scale: 0.75, rotateX: 20, opacity: 0, y: 70, duration: 0.95, ease: "power3.out", transformOrigin: "center bottom",
      });
      gsap.from(contactRef.current, {
        scrollTrigger: { trigger: contactRef.current, start: "top 88%", end: "top 42%", toggleActions: TA },
        y: 80, rotateX: 16, opacity: 0, duration: 0.95, ease: "power3.out", transformOrigin: "center top",
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ background: "#111008", color: "#fff", fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --yellow:   #FBBF24;
          --yellow-d: #D97706;
          --yellow-l: #FEF3C7;
          --glow:     rgba(251,191,36,0.25);
          --dark:     #111008;
          --dark2:    #181408;
          --dark3:    #201a08;
          --border:   rgba(251,191,36,0.2);
        }

        @keyframes slideDown  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce     { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes dot-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer    { 0%{left:-100%} 100%{left:200%} }

        /* ── Truck drive-in then idle ── */
        @keyframes truck-enter {
          0%   { transform: translateX(120%); }
          35%  { transform: translateX(0%); }
          100% { transform: translateX(0%); }
        }
        /* Subtle idle bob once stopped */
        @keyframes truck-idle {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }
        /* Wheel roll during drive-in, then slow spin at idle */
        @keyframes wheel-roll {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* Road dashes moving leftward */
        @keyframes road-move {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -60; }
        }
        /* Pump arm raise after truck parks */}
        @keyframes arm-raise {
          0%,30%  { transform: rotate(0deg); transform-origin: 80px 152px; }
          70%,100%{ transform: rotate(-15deg); transform-origin: 80px 152px; }
        }
        /* Hose drip */
        @keyframes hose-drip {
          0%,40%   { opacity:0; transform:scaleY(0); transform-origin:top; }
          60%,100% { opacity:1; transform:scaleY(1); transform-origin:top; }
        }
        /* Concrete splash pulse */
        @keyframes splash-pulse {
          0%,45%   { opacity:0; r:0; }
          70%,100% { opacity:0.6; r:10; }
        }
        /* Dust clouds while truck moves */
        @keyframes dust {
          0%   { opacity:0; transform:translate(0,0) scale(0.5); }
          20%  { opacity:0.4; }
          60%  { opacity:0.15; transform:translate(-18px,-12px) scale(1.8); }
          100% { opacity:0; transform:translate(-30px,-20px) scale(2.5); }
        }

        /* ── 3D logo spin ── */
        @keyframes logo-spin {
          0%   { transform: rotateY(0deg)   rotateX(8deg); }
          25%  { transform: rotateY(15deg)  rotateX(5deg); }
          50%  { transform: rotateY(0deg)   rotateX(12deg); }
          75%  { transform: rotateY(-15deg) rotateX(5deg); }
          100% { transform: rotateY(0deg)   rotateX(8deg); }
        }

        .nav-link { color:rgba(255,255,255,.65); text-decoration:none; font-size:.85rem; letter-spacing:1px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:var(--yellow); }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--yellow); color:#111;
          font-family:'Barlow Condensed',sans-serif; font-weight:900;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:var(--yellow-d); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); color:#fff; }
        .btn-primary:active { transform:translateY(0); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:12px 30px; background:transparent; color:var(--yellow);
          border:1.5px solid var(--yellow); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(251,191,36,.1); transform:translateY(-2px); }

        .svc-card {
          background:var(--dark3); border:1px solid var(--border);
          padding:32px 26px; position:relative; overflow:hidden;
          transition:border-color .35s, transform .35s, box-shadow .35s;
          transform-style:preserve-3d;
        }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; width:4px; height:100%;
          background:var(--yellow); transform:scaleY(0); transform-origin:bottom; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleY(1); }
        .svc-card:hover {
          border-color:rgba(251,191,36,.55);
          transform:translateY(-5px) rotateX(3deg) !important;
          box-shadow:0 20px 60px rgba(251,191,36,.1);
        }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer .6s ease; }

        .stat-item { text-align:center; padding:28px 16px; border-left:1px solid rgba(251,191,36,.12); }
        .stat-item:first-child { border-left:none; }

        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,.05); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }

        .gal-item {
          overflow:hidden; border-radius:4px; border:1px solid rgba(251,191,36,.15);
          cursor:pointer; transition:border-color .3s, transform .3s; background:#1a1408;
        }
        .gal-item:hover { border-color:rgba(251,191,36,.5); transform:scale(1.02); }

        /* truck animation wrappers */
        .truck-scene  { animation: truck-enter 2.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .truck-body   { animation: truck-idle 3s ease-in-out 2.4s infinite; }
        .wheel-fast   { animation: wheel-roll 0.4s linear 0s 6, wheel-roll 3s linear 2.4s infinite; }
        .pump-arm     { animation: arm-raise 1.2s ease-out 2.2s forwards; }
        .hose-line    { animation: hose-drip 1s ease-out 3s forwards; }
        .dust-puff    { animation: dust 0.9s ease-out infinite; }
        .road-dash-anim { stroke-dasharray:30 15; animation: road-move 0.5s linear 0s 5, road-move 3s linear 2.4s infinite; }

        /* ── Layouts ── */
        .nav-inner    { padding:16px 48px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; position:relative; overflow:hidden; display:flex; align-items:flex-end; padding:80px 48px 60px; }
        .section-pad  { padding:100px 48px; }
        .section-sm   { padding:80px 48px; }
        .inner-max    { max-width:1200px; margin:0 auto; }
        .inner-1100   { max-width:1100px; margin:0 auto; }
        .stat-grid    { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }
        .why-grid     { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:40px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .hero-title   { font-size:clamp(3.5rem,8vw,7rem); }
        .stat-num     { font-size:2.6rem; }
        .hero-deco    { display:block; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }
        .info-card    { transition:border-color .25s; }
        .info-card:hover { border-color:rgba(251,191,36,.45) !important; }

        .gallery-grid {
          display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:12px;
        }
        .gal-item:nth-child(1) { grid-column:1/3; grid-row:1/2; height:280px; }
        .gal-item:nth-child(2) { grid-column:3/4; grid-row:1/2; height:280px; }
        .gal-item:nth-child(3) { grid-column:1/2; grid-row:2/3; height:200px; }
        .gal-item:nth-child(4) { grid-column:2/3; grid-row:2/3; height:200px; }
        .gal-item:nth-child(5) { grid-column:3/4; grid-row:2/3; height:200px; }

        @media (max-width:767px) {
          .hamburger   { display:flex !important; }
          .desktop-nav { display:none !important; }
          .desktop-cta { display:none !important; }
          .nav-inner   { padding:14px 20px; }
          .hero-section{ padding:88px 20px 52px; align-items:flex-end; }
          .hero-title  { font-size:clamp(2.8rem,13vw,4.2rem); }
          .section-pad { padding:64px 20px; }
          .section-sm  { padding:56px 20px; }
          .stat-grid   { grid-template-columns:repeat(2,1fr); }
          .stat-item   { border-left:none !important; border-bottom:1px solid rgba(251,191,36,.1); }
          .stat-item:nth-child(2n)         { border-left:1px solid rgba(251,191,36,.12) !important; }
          .stat-item:nth-last-child(-n+2)  { border-bottom:none; }
          .stat-num    { font-size:2rem; }
          .svc-grid    { grid-template-columns:1fr; }
          .why-grid    { grid-template-columns:1fr !important; gap:32px !important; }
          .contact-grid{ grid-template-columns:1fr; }
          .footer-row  { flex-direction:column; align-items:flex-start; }
          .hero-deco   { display:none; }
          .cta-btns    { flex-direction:column; }
          .btn-primary,.btn-outline { width:100%; max-width:360px; }
          .gallery-grid{ grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1) { grid-column:1/3; grid-row:auto; height:200px; }
          .gal-item:nth-child(n) { grid-column:auto; grid-row:auto; height:160px; }
        }

        input::placeholder, textarea::placeholder { color:rgba(255,255,255,.22); }
        input, textarea { -webkit-appearance:none; }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(17,16,8,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .25s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:0429688581" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0429 688 581</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(17,16,8,.96)" : "linear-gradient(180deg,rgba(17,16,8,.8) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(251,191,36,.12)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* 3D Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:46,height:46,perspective:"200px",flexShrink:0 }}>
              <div style={{ width:"100%",height:"100%",transformStyle:"preserve-3d",animation:"logo-spin 8s ease-in-out infinite",position:"relative" }}>
                <svg width="46" height="46" viewBox="0 0 46 46"
                  style={{ position:"absolute",inset:0,filter:"drop-shadow(0 2px 10px rgba(251,191,36,0.55))" }}>
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FEF3C7"/>
                      <stop offset="40%" stopColor="#FBBF24"/>
                      <stop offset="100%" stopColor="#92400E"/>
                    </linearGradient>
                  </defs>
                  <polygon points="23,3 41,13 41,33 23,43 5,33 5,13" fill="url(#logoGrad)" stroke="rgba(251,191,36,0.8)" strokeWidth="1.5"/>
                  <polygon points="23,3 41,13 23,23" fill="rgba(255,255,255,0.22)"/>
                  <polygon points="5,33 23,43 41,33 41,36 23,46 5,36" fill="rgba(0,0,0,0.28)"/>
                  <text x="23" y="30" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="18" fill="#111">A</text>
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1.5px",lineHeight:1,textShadow:"0 1px 8px rgba(0,0,0,.8)" }}>ADEPT CONCRETE</div>
              <div style={{ fontSize:".6rem",color:"var(--yellow)",letterSpacing:"2px",lineHeight:1.5,textShadow:"0 1px 4px rgba(0,0,0,.6)" }}>PUMPING · GYMPIE QLD</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:0429688581" className="btn-primary desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 0429 688 581</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
           HERO — split layout: text left, animated truck right
      ══════════════════════════════════════════ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(135deg,#111008 0%,#0f1308 50%,#111008 100%)" }}>

        {/* Deco horizontal lines */}
        <div className="hero-deco" style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
          {[20,40,60,80].map(p => (
            <div key={p} style={{ position:"absolute",left:0,right:0,top:`${p}%`,height:1,background:`rgba(251,191,36,${p===40?.06:.025})` }}/>
          ))}
        </div>
        {/* Bottom glow line */}
        <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"80%",height:2,background:"linear-gradient(90deg,transparent,var(--yellow),transparent)",opacity:.35 }}/>
        {/* Top-right corner accent */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 260px 260px 0",borderColor:"transparent rgba(251,191,36,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="inner-max" style={{ position:"relative",zIndex:2,width:"100%",display:"flex",alignItems:"flex-end",gap:48 }}>

          {/* ── LEFT: Text ── */}
          <div style={{ flex:"1 1 auto",maxWidth:560,paddingBottom:8 }}>
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.4)",padding:"6px 16px",marginBottom:20 }}>
              <div style={{ width:7,height:7,background:"var(--yellow)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"3px",color:"var(--yellow)",fontWeight:700 }}>CONCRETE LINE PUMP · GYMPIE QLD</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.9,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                CONCRETE<br/>
                <span style={{ color:"var(--yellow)" }}>PUMPING</span><br/>
                DONE RIGHT
              </h1>
            </div>

            <p ref={heroSubRef} style={{ marginTop:20,fontSize:"1.05rem",color:"rgba(255,255,255,.5)",lineHeight:1.75,maxWidth:460,marginBottom:32 }}>
              Servicing Wide Bay, Sunshine Coast and South Burnett. Slabs, driveways, footings, blockfills, exposed and more.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:0429688581" className="btn-primary">📞 0429 688 581</a>
              <a href="#services" className="btn-outline">Our Services</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0429 688 581",                        href:"tel:0429688581" },
                { icon:"✉️", val:"adeptconcretepumping@outlook.com.au", href:"mailto:adeptconcretepumping@outlook.com.au" },
              ].map(c => (
                <a key={c.val} href={c.href} style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"rgba(255,255,255,.45)",fontSize:".82rem",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--yellow)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.45)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Animated Pump Truck ── */}
          <div style={{ flex:"0 0 auto",width:"46%",maxWidth:540,paddingBottom:0 }}>
            <svg viewBox="0 0 540 300" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ filter:"drop-shadow(0 4px 32px rgba(251,191,36,0.18))", overflow:"visible" }}>

              {/* ── ROAD ── */}
              <rect x="0" y="252" width="540" height="48" fill="#141208"/>
              <line x1="0" y1="254" x2="540" y2="254" stroke="rgba(251,191,36,.2)" strokeWidth="1.5"/>
              {/* Moving road dashes */}
              <line x1="0" y1="276" x2="540" y2="276"
                stroke="rgba(255,255,255,.1)" strokeWidth="2.5"
                strokeDasharray="40 20"
                className="road-dash-anim"
              />
              <line x1="0" y1="298" x2="540" y2="298" stroke="rgba(251,191,36,.08)" strokeWidth="1"/>

              {/* ── DUST PUFFS (behind rear wheel, visible during drive-in) ── */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={68} cy={252}
                  rx={8+i*4} ry={5+i*2}
                  fill="rgba(180,160,80,.12)"
                  className="dust-puff"
                  style={{ animationDelay:`${i*0.3}s`, animationDuration:"0.9s", animationIterationCount:"6" }}
                />
              ))}

              {/* ── TRUCK (entire group drives in from right) ── */}
              <g className="truck-scene">

                {/* Truck idle bob wrapper */}
                <g className="truck-body">

                  {/* ─ TRAILER BODY ─ */}
                  <rect x="12" y="180" width="310" height="74" rx="3" fill="#1a2a3a" stroke="rgba(100,160,220,.45)" strokeWidth="1.5"/>
                  {/* Blue pump unit on deck */}
                  <rect x="32" y="160" width="220" height="22" rx="2" fill="#1e4878" stroke="rgba(100,160,220,.6)" strokeWidth="1.5"/>
                  {/* Pump unit detail stripes */}
                  {[70,110,150,190].map(x => <line key={x} x1={x} y1="160" x2={x} y2="182" stroke="rgba(100,160,220,.2)" strokeWidth="1"/>)}
                  {/* Control box */}
                  <rect x="240" y="162" width="28" height="18" rx="2" fill="#2a5a8a" stroke="rgba(100,160,220,.5)" strokeWidth="1"/>
                  {/* Hydraulic lines */}
                  <line x1="32" y1="171" x2="268" y2="171" stroke="rgba(100,160,220,.25)" strokeWidth="1"/>

                  {/* ─ CAB ─ */}
                  <path d="M322,190 L322,172 Q322,162 330,162 L390,162 Q400,162 410,171 L435,200 L435,254 L322,254Z"
                    fill="#1e2830" stroke="rgba(251,191,36,.35)" strokeWidth="1.5"/>
                  {/* Windshield */}
                  <path d="M330,170 L384,170 Q394,170 402,178 L428,202 L338,202Z"
                    fill="rgba(100,160,220,.18)" stroke="rgba(100,160,220,.4)" strokeWidth="1"/>
                  {/* Windshield shine */}
                  <line x1="342" y1="174" x2="410" y2="198" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
                  {/* Door */}
                  <rect x="326" y="205" width="60" height="42" rx="2" fill="none" stroke="rgba(251,191,36,.18)" strokeWidth="1"/>
                  <rect x="380" y="223" width="5" height="8" rx="1" fill="rgba(251,191,36,.4)"/>
                  {/* Headlight */}
                  <rect x="430" y="198" width="14" height="10" rx="2" fill="rgba(251,191,36,.85)"/>
                  <rect x="431" y="200" width="12" height="4" rx="1" fill="rgba(255,220,80,.6)"/>
                  {/* Front bumper */}
                  <rect x="432" y="232" width="18" height="22" rx="2" fill="#2a2a2a" stroke="rgba(251,191,36,.2)" strokeWidth="1"/>
                  {/* Yellow side stripe */}
                  <rect x="12" y="246" width="422" height="4" fill="var(--yellow)" opacity=".55"/>

                  {/* Exhaust stack */}
                  <rect x="415" y="142" width="9" height="38" rx="2" fill="#333" stroke="rgba(251,191,36,.25)" strokeWidth="1"/>
                  {/* Smoke */}
                  <ellipse cx="419" cy="138" rx="6" ry="4" fill="rgba(255,255,255,.06)"/>
                  <ellipse cx="416" cy="130" rx="8" ry="6" fill="rgba(255,255,255,.04)"/>
                  <ellipse cx="420" cy="122" rx="10" ry="7" fill="rgba(255,255,255,.025)"/>

                  {/* ADEPT on trailer */}
                  <text x="90" y="222" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="15" fill="rgba(251,191,36,.75)" letterSpacing="3">ADEPT</text>
                  <text x="90" y="236" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="9" fill="rgba(251,191,36,.4)" letterSpacing="2">CONCRETE PUMPING</text>

                  {/* ─ PUMP ARM (raises after parking) ─ */}
                  <g className="pump-arm">
                    <line x1="80" y1="160" x2="80" y2="88" stroke="rgba(100,160,220,.7)" strokeWidth="8" strokeLinecap="round"/>
                    <line x1="80" y1="88" x2="220" y2="56" stroke="rgba(100,160,220,.7)" strokeWidth="7" strokeLinecap="round"/>
                    <line x1="220" y1="56" x2="290" y2="72" stroke="rgba(100,160,220,.6)" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="290" y1="72" x2="340" y2="88" stroke="rgba(100,160,220,.5)" strokeWidth="5" strokeLinecap="round"/>
                    {/* Knuckle joints */}
                    <circle cx="80"  cy="88" r="5" fill="#2a5a8a" stroke="rgba(100,160,220,.6)" strokeWidth="1.5"/>
                    <circle cx="220" cy="56" r="5" fill="#2a5a8a" stroke="rgba(100,160,220,.6)" strokeWidth="1.5"/>
                    <circle cx="290" cy="72" r="4" fill="#2a5a8a" stroke="rgba(100,160,220,.5)" strokeWidth="1.5"/>
                  </g>

                  {/* ─ HOSE (appears after arm raises) ─ */}
                  <g className="hose-line">
                    <path d="M340,88 Q360,104 355,135 Q350,162 340,178"
                      stroke="rgba(251,191,36,.7)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    {/* Concrete splash */}
                    <ellipse cx="338" cy="182" rx="10" ry="6" fill="rgba(180,160,100,.6)"/>
                    <ellipse cx="334" cy="190" rx="18" ry="5" fill="rgba(160,140,80,.35)"/>
                    {/* Splash ripple */}
                    <ellipse cx="336" cy="185" rx="0" ry="0" fill="none" stroke="rgba(251,191,36,.3)" strokeWidth="1.5"
                      style={{ animation:"splash-pulse 1.5s ease-out 3.5s infinite" }}/>
                  </g>

                  {/* ─ TRAILER WHEELS ─ */}
                  {[68, 128, 240].map(tx => (
                    <g key={tx} transform={`translate(${tx},254)`}>
                      <circle cx="0" cy="0" r="22" fill="#161410" stroke="rgba(251,191,36,.45)" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="13" fill="#111" stroke="rgba(251,191,36,.25)" strokeWidth="1.5"/>
                      <circle cx="0" cy="0" r="4" fill="var(--yellow)" opacity=".65"/>
                      <g className="wheel-fast">
                        {SPOKES_SM.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(251,191,36,.4)" strokeWidth="1.5"/>)}
                      </g>
                    </g>
                  ))}

                  {/* ─ CAB WHEEL (front) ─ */}
                  <g transform="translate(385,254)">
                    <circle cx="0" cy="0" r="26" fill="#161410" stroke="rgba(251,191,36,.55)" strokeWidth="2.5"/>
                    <circle cx="0" cy="0" r="15" fill="#111" stroke="rgba(251,191,36,.3)" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="5" fill="var(--yellow)" opacity=".75"/>
                    <g className="wheel-fast">
                      {SPOKES_LG.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(251,191,36,.5)" strokeWidth="2"/>)}
                    </g>
                  </g>

                </g>{/* end truck-body */}
              </g>{/* end truck-scene */}

              {/* Ground shadow */}
              <ellipse cx="270" cy="300" rx="265" ry="7" fill="rgba(251,191,36,.06)"/>
            </svg>
          </div>

        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.4,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
            <span style={{ fontSize:".55rem",letterSpacing:"4px",color:"rgba(255,255,255,.3)",fontFamily:"'Barlow Condensed',sans-serif" }}>SCROLL</span>
            <svg width="14" height="22" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(251,191,36,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)",borderTop:"1px solid rgba(251,191,36,.15)",borderBottom:"1px solid rgba(251,191,36,.15)" }}>
        <div className="stat-grid">
          {[
            { n:"Local", l:"Gympie Based"         },
            { n:"3",     l:"Service Regions"      },
            { n:"100%",  l:"Owner Operated"       },
            { n:"24/7",  l:"Quote Availability"   },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--yellow)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".7rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:10,fontWeight:700 }}>WHAT WE PUMP</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              CONCRETE PUMPING<br/><span style={{ color:"var(--yellow)" }}>FOR EVERY JOB</span>
            </h2>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2.2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.15rem",fontWeight:700,color:"#fff",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>{s.title}</h3>
                <p style={{ color:"rgba(255,255,255,.42)",fontSize:".88rem",lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="work" className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid rgba(251,191,36,.07)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:10,fontWeight:700 }}>OUR WORK</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              RECENT POURS<br/><span style={{ color:"var(--yellow)" }}>ACROSS QLD</span>
            </h2>
          </div>

          <div ref={galleryRef} className="gallery-grid">
            {/* Card 1 — Line pump truck */}
            <div className="gal-item" style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:0,position:"relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
                <rect width="520" height="280" fill="#0f1a2a"/>
                <defs><linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a1628"/><stop offset="100%" stopColor="#1a2a1a"/></linearGradient></defs>
                <rect width="520" height="160" fill="url(#skyGrad)"/>
                <rect x="0" y="210" width="520" height="70" fill="#1a1408"/>
                <rect x="0" y="208" width="520" height="4" fill="rgba(251,191,36,.15)"/>
                {[30,80,430,480].map(x => (<g key={x}><rect x={x} y="150" width="8" height="60" fill="#1a2a0a"/><ellipse cx={x+4} cy="148" rx="18" ry="28" fill="#1e3010"/></g>))}
                <rect x="60" y="170" width="220" height="42" rx="3" fill="#1a3050" stroke="rgba(100,160,220,.5)" strokeWidth="1.5"/>
                <rect x="80" y="152" width="160" height="20" rx="2" fill="#1e4878" stroke="rgba(100,160,220,.6)" strokeWidth="1.5"/>
                <path d="M280,170 L280,155 Q280,148 286,148 L330,148 Q338,148 344,155 L356,170Z" fill="#222" stroke="rgba(251,191,36,.4)" strokeWidth="1.5"/>
                <path d="M286,155 L326,155 Q334,155 340,162 L356,170 L290,170Z" fill="rgba(100,160,220,.15)" stroke="rgba(100,160,220,.3)" strokeWidth="1"/>
                <line x1="140" y1="152" x2="140" y2="88" stroke="rgba(100,160,220,.7)" strokeWidth="7" strokeLinecap="round"/>
                <line x1="140" y1="88" x2="280" y2="58" stroke="rgba(100,160,220,.7)" strokeWidth="6" strokeLinecap="round"/>
                <line x1="280" y1="58" x2="340" y2="75" stroke="rgba(100,160,220,.55)" strokeWidth="5" strokeLinecap="round"/>
                <path d="M340,75 Q360,88 355,115 Q350,140 340,155" stroke="rgba(251,191,36,.7)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <ellipse cx="338" cy="160" rx="9" ry="6" fill="rgba(180,160,100,.6)"/>
                {[95,190,300,340].map(x => (<g key={x} transform={`translate(${x},214)`}><circle cx="0" cy="0" r="16" fill="#111" stroke="rgba(251,191,36,.4)" strokeWidth="1.5"/><circle cx="0" cy="0" r="8" fill="#1a1408"/><circle cx="0" cy="0" r="3" fill="rgba(251,191,36,.5)"/></g>))}
                <rect x="60" y="205" width="296" height="3" fill="var(--yellow)" opacity=".6"/>
                <text x="130" y="196" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="rgba(251,191,36,.8)" letterSpacing="3">ADEPT</text>
              </svg>
              <div style={{ position:"relative",zIndex:2,padding:"16px 20px",background:"linear-gradient(to top,rgba(17,16,8,.95),transparent)",marginTop:"auto" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>LINE PUMP ON SITE</div>
                <div style={{ fontSize:".75rem",color:"rgba(251,191,36,.7)",marginTop:2 }}>Residential · Commercial · Rural</div>
              </div>
            </div>

            {/* Card 2 — Shed slab */}
            <div className="gal-item" style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:0,position:"relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
                <rect width="240" height="280" fill="#0d1408"/>
                <path d="M20,60 L120,30 L220,60 L220,200 L20,200Z" fill="#1a2a1a" stroke="rgba(251,191,36,.2)" strokeWidth="1"/>
                <path d="M20,60 L120,30 L220,60Z" fill="#222e18" stroke="rgba(251,191,36,.25)" strokeWidth="1"/>
                <rect x="90" y="110" width="60" height="90" fill="#0a0e05"/>
                <rect x="20" y="200" width="200" height="50" fill="#2a2a22"/>
                {[210,220,230,240].map(y => <line key={y} x1="20" y1={y} x2="220" y2={y} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
                <circle cx="160" cy="195" r="8" fill="#4a3520"/>
                <rect x="156" y="203" width="8" height="20" fill="#3a4a2a"/>
                <rect x="130" y="208" width="50" height="3" rx="1" fill="#888" stroke="rgba(251,191,36,.4)" strokeWidth="1"/>
                {[202,208,214].map(y => <line key={y} x1="25" y1={y} x2="215" y2={y} stroke="rgba(100,80,50,.4)" strokeWidth="1.5" strokeDasharray="8 4"/>)}
                <path d="M220,140 Q200,160 185,200" stroke="rgba(251,191,36,.5)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
              <div style={{ position:"relative",zIndex:2,padding:"14px 18px",background:"linear-gradient(to top,rgba(17,16,8,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>SHED SLAB</div>
                <div style={{ fontSize:".72rem",color:"rgba(251,191,36,.65)",marginTop:2 }}>Wide Bay Region</div>
              </div>
            </div>

            {/* Card 3 — Footings */}
            <div className="gal-item" style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:0,position:"relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
                <rect width="200" height="200" fill="#100e08"/>
                <rect x="0" y="80" width="200" height="120" fill="#1a1408"/>
                <rect x="0" y="0" width="200" height="82" fill="#0a1420"/>
                <path d="M10,80 L10,140 L190,140 L190,80" fill="#0d0b06" stroke="rgba(251,191,36,.15)" strokeWidth="1"/>
                {[95,110,125].map(y => <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="rgba(160,100,60,.7)" strokeWidth="2.5"/>)}
                {[30,60,90,120,150,170].map(x => <line key={x} x1={x} y1="85" x2={x} y2="138" stroke="rgba(160,100,60,.5)" strokeWidth="2" strokeDasharray="6 4"/>)}
                <rect x="12" y="115" width="176" height="24" fill="rgba(180,160,100,.35)"/>
                <path d="M100,40 Q105,60 100,82 Q98,95 95,110" stroke="rgba(251,191,36,.6)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                {[20,170].map(x => <g key={x}><rect x={x} y="30" width="6" height="50" fill="#1a2a0a"/><ellipse cx={x+3} cy="28" rx="16" ry="22" fill="#1e3010"/></g>)}
              </svg>
              <div style={{ position:"relative",zIndex:2,padding:"14px 18px",background:"linear-gradient(to top,rgba(17,16,8,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>FOOTINGS</div>
                <div style={{ fontSize:".72rem",color:"rgba(251,191,36,.65)",marginTop:2 }}>New builds & extensions</div>
              </div>
            </div>

            {/* Card 4 — Driveway */}
            <div className="gal-item" style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:0,position:"relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
                <rect width="200" height="200" fill="#0d1008"/>
                <rect x="80" y="40" width="100" height="80" fill="#1a2010" stroke="rgba(251,191,36,.1)" strokeWidth="1"/>
                <path d="M78,42 L130,18 L182,42Z" fill="#222c14" stroke="rgba(251,191,36,.15)" strokeWidth="1"/>
                <rect x="0" y="120" width="200" height="80" fill="#141a08"/>
                <path d="M30,200 L50,120 L150,120 L170,200Z" fill="#2a2818" stroke="rgba(251,191,36,.2)" strokeWidth="1"/>
                <path d="M35,200 L53,124 L147,124 L165,200Z" fill="rgba(200,180,120,.2)"/>
                <line x1="30" y1="200" x2="50" y2="120" stroke="rgba(251,191,36,.4)" strokeWidth="2"/>
                <line x1="170" y1="200" x2="150" y2="120" stroke="rgba(251,191,36,.4)" strokeWidth="2"/>
                <circle cx="100" cy="132" r="7" fill="#4a3520"/>
                <rect x="96" y="139" width="8" height="18" fill="#3a4a2a"/>
                <rect x="72" y="145" width="55" height="3" rx="1" fill="#888"/>
                <path d="M10,80 Q30,100 55,122" stroke="rgba(251,191,36,.55)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
              <div style={{ position:"relative",zIndex:2,padding:"14px 18px",background:"linear-gradient(to top,rgba(17,16,8,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>DRIVEWAY</div>
                <div style={{ fontSize:".72rem",color:"rgba(251,191,36,.65)",marginTop:2 }}>Residential homes</div>
              </div>
            </div>

            {/* Card 5 — Exposed aggregate */}
            <div className="gal-item" style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:0,position:"relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
                <rect width="200" height="200" fill="#0f0f0a"/>
                <rect x="0" y="60" width="200" height="140" fill="#1e1c14"/>
                {[
                  [20,80],[45,95],[70,75],[95,88],[120,78],[150,92],[175,80],
                  [30,110],[55,125],[80,108],[105,120],[130,112],[160,125],[185,110],
                  [15,145],[40,158],[65,142],[90,155],[115,148],[140,160],[170,145],[190,155],
                  [25,178],[50,185],[75,175],[100,188],[125,178],[155,185],[180,175],
                ].map(([x,y],i) => (
                  <ellipse key={i} cx={x} cy={y} rx={3} ry={2.5}
                    fill={`hsl(${35+i*7},${30+i*3}%,${30+i*2}%)`} stroke="rgba(0,0,0,.3)" strokeWidth="0.5"/>
                ))}
                <rect x="0" y="0" width="200" height="62" fill="#0a1a28"/>
                <rect x="0" y="58" width="200" height="4" fill="rgba(251,191,36,.3)"/>
                <path d="M100,10 Q100,35 100,60" stroke="rgba(251,191,36,.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <ellipse cx="100" cy="62" rx="8" ry="5" fill="rgba(180,160,100,.5)"/>
                <rect x="0" y="60" width="200" height="140" fill="rgba(255,255,255,.03)"/>
              </svg>
              <div style={{ position:"relative",zIndex:2,padding:"14px 18px",background:"linear-gradient(to top,rgba(17,16,8,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>EXPOSED AGGREGATE</div>
                <div style={{ fontSize:".72rem",color:"rgba(251,191,36,.65)",marginTop:2 }}>Outdoor areas & paths</div>
              </div>
            </div>
          </div>

          <p style={{ textAlign:"center",marginTop:20,color:"rgba(255,255,255,.28)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            Work across Wide Bay, Sunshine Coast and South Burnett
          </p>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--dark)",borderTop:"1px solid rgba(251,191,36,.07)",textAlign:"center" }}>
        <div className="inner-1100">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:12,fontWeight:700 }}>WHERE WE WORK</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            SERVICE AREAS
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 24px",background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.25)",color:"rgba(255,255,255,.8)",fontSize:".9rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px" }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(255,255,255,.35)",fontSize:".88rem" }}>
            Based in Gympie. Not sure if we cover your area? Give us a call.
          </p>
        </div>
      </section>

      {/* ══ WHY ADEPT ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid rgba(251,191,36,.07)" }}>
        <div className="why-grid">
          <div ref={whyLeftRef} style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"44px 36px",position:"relative",overflow:"hidden" }}>
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:18,height:18,
                borderTop:i<2?"2px solid var(--yellow)":undefined,
                borderBottom:i>=2?"2px solid var(--yellow)":undefined,
                borderLeft:i%2===0?"2px solid var(--yellow)":undefined,
                borderRight:i%2===1?"2px solid var(--yellow)":undefined,
              }}/>
            ))}
            <svg width="100%" viewBox="0 0 300 240" fill="none">
              <rect x="0" y="200" width="300" height="40" fill="#1a1608"/>
              <line x1="0" y1="202" x2="300" y2="202" stroke="rgba(251,191,36,.2)" strokeWidth="1"/>
              <rect x="10" y="155" width="180" height="50" rx="3" fill="#1a2a3a" stroke="rgba(100,160,220,.4)" strokeWidth="1.5"/>
              <rect x="30" y="135" width="140" height="22" rx="2" fill="#1a4a7a" stroke="rgba(100,160,220,.5)" strokeWidth="1.5"/>
              <path d="M190,155 L190,140 Q190,132 196,132 L240,132 Q248,132 255,140 L265,155Z" fill="#222" stroke="rgba(251,191,36,.3)" strokeWidth="1.5"/>
              <path d="M196,140 L236,140 Q244,140 250,147 L265,155 L200,155Z" fill="rgba(100,160,220,.15)" stroke="rgba(100,160,220,.3)" strokeWidth="1"/>
              <rect x="10" y="195" width="255" height="4" fill="var(--yellow)" opacity=".5"/>
              <line x1="80" y1="135" x2="80" y2="70" stroke="rgba(100,160,220,.6)" strokeWidth="6" strokeLinecap="round"/>
              <line x1="80" y1="70" x2="180" y2="40" stroke="rgba(100,160,220,.6)" strokeWidth="5" strokeLinecap="round"/>
              <line x1="180" y1="40" x2="220" y2="55" stroke="rgba(100,160,220,.5)" strokeWidth="4" strokeLinecap="round"/>
              <path d="M220,55 Q240,65 235,90 Q230,115 220,130" stroke="rgba(251,191,36,.6)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <ellipse cx="218" cy="135" rx="6" ry="8" fill="rgba(180,160,100,.5)"/>
              {[40,100,210,255].map(x => (
                <g key={x} transform={`translate(${x},202)`}>
                  <circle cx="0" cy="0" r="18" fill="#111" stroke="rgba(251,191,36,.35)" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="10" fill="#1a1608"/>
                  <circle cx="0" cy="0" r="3" fill="var(--yellow)" opacity=".5"/>
                </g>
              ))}
              <text x="85" y="187" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="14" fill="rgba(251,191,36,.7)" letterSpacing="3">ADEPT</text>
              <text x="85" y="200" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="9" fill="rgba(251,191,36,.4)" letterSpacing="2">CONCRETE PUMPING</text>
              <ellipse cx="148" cy="240" rx="148" ry="6" fill="rgba(251,191,36,.06)"/>
            </svg>
            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--yellow)",color:"#111",padding:"12px 18px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px" }}>
              📞 0429 688 581
            </div>
          </div>

          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:12,fontWeight:700 }}>WHY ADEPT</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
              YOUR LOCAL<br/><span style={{ color:"var(--yellow)" }}>CONCRETE</span><br/>PUMP SPECIALISTS
            </h2>
            {[
              { icon:"🏆", title:"Years in the Trade",           desc:"Extensive experience in the concrete industry means every pour is handled with precision and professionalism." },
              { icon:"📍", title:"Locally Based in Gympie",      desc:"No city callout fees. No runaround. Local knowledge of the Wide Bay region, delivering on time." },
              { icon:"💬", title:"Direct Contact",               desc:"Speak directly to the owner — straight answers on price and availability, no call centres." },
              { icon:"🚛", title:"Modern Line Pump Equipment",   desc:"Late model, well-maintained concrete line pump — reliable for residential and commercial projects." },
              { icon:"✅", title:"All Concrete Types",           desc:"Standard, exposed, coloured, blockfill — whatever the spec, we place it precisely where it needs to go." },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div style={{ fontSize:"1.5rem",lineHeight:1,marginTop:2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",marginBottom:4,fontSize:"1rem",letterSpacing:".5px",textTransform:"uppercase" }}>{item.title}</div>
                  <div style={{ color:"rgba(255,255,255,.4)",fontSize:".85rem",lineHeight:1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#111008,#181408,#111008)" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:"radial-gradient(ellipse,rgba(251,191,36,.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--yellow),transparent)" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--yellow),transparent)" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"6px",color:"var(--yellow)",marginBottom:14,fontWeight:700 }}>READY TO POUR?</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,6vw,4.5rem)",fontWeight:900,color:"#fff",lineHeight:.9,marginBottom:14,letterSpacing:"-1px" }}>
          GET A FREE<br/><span style={{ color:"var(--yellow)" }}>QUOTE TODAY</span>
        </h2>
        <p style={{ color:"rgba(255,255,255,.4)",fontSize:"1rem",maxWidth:420,margin:"0 auto 36px",lineHeight:1.7 }}>
          Wide Bay, Sunshine Coast and South Burnett. Call or send a message and we&apos;ll get back to you quick.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:0429688581" className="btn-primary">📞 0429 688 581</a>
          <a href="#contact" className="btn-outline">SEND A MESSAGE</a>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:10,fontWeight:700 }}>GET IN TOUCH</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              CONTACT<br/><span style={{ color:"var(--yellow)" }}>ADEPT CONCRETE</span>
            </h2>
          </div>

          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { icon:"📞", label:"Phone / SMS",  val:"0429 688 581",                                href:"tel:0429688581" },
                { icon:"✉️", label:"Email",        val:"adeptconcretepumping@outlook.com.au",         href:"mailto:adeptconcretepumping@outlook.com.au" },
                { icon:"📘", label:"Facebook",     val:"Adept Concrete Pumping",                      href:"https://www.facebook.com/people/Adept-Concrete-Pumping/61577642666314/" },
                { icon:"📍", label:"Based",        val:"Gympie, QLD",                                 href:undefined },
                { icon:"🗺️", label:"Service Area", val:"Wide Bay · Sunshine Coast · South Burnett",  href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"var(--dark3)",border:"1px solid var(--border)" }}>
                  <span style={{ fontSize:"1.2rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"3px",color:"var(--yellow)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>{c.label.toUpperCase()}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"rgba(255,255,255,.75)",fontSize:".87rem",textDecoration:"none",wordBreak:"break-all",transition:"color .25s" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--yellow)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.75)")}
                        >{c.val}</a>
                      : <span style={{ color:"rgba(255,255,255,.7)",fontSize:".87rem" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"36px 32px" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#fff",letterSpacing:"1px",marginBottom:22,textTransform:"uppercase" }}>
                Request a Free Quote
              </div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith"                    },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX"                  },
                { label:"Email",       type:"email", ph:"you@example.com"               },
                { label:"Job Type",    type:"text",  ph:"e.g. Slab, Driveway, Footing…" },
                { label:"Location",    type:"text",  ph:"e.g. Gympie, Noosa…"           },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>
                    {f.label.toUpperCase()}
                  </label>
                  <input type={f.type} placeholder={f.ph} style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(251,191,36,.18)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2 }}
                    onFocus={e=>e.target.style.borderColor="rgba(251,191,36,.55)"}
                    onBlur={e=>e.target.style.borderColor="rgba(251,191,36,.18)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>JOB DETAILS</label>
                <textarea rows={3} placeholder="Concrete volume, access, timing, special requirements…" style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(251,191,36,.18)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"inherit",borderRadius:2 }}
                  onFocus={e=>e.target.style.borderColor="rgba(251,191,36,.55)"}
                  onBlur={e=>e.target.style.borderColor="rgba(251,191,36,.18)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%",fontSize:".9rem" }}>🚛 REQUEST FREE QUOTE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"#080806",borderTop:"1px solid rgba(251,191,36,.1)",padding:"28px 48px" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--yellow),var(--yellow-d))",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".65rem",color:"#111" }}>ACP</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".88rem",color:"rgba(255,255,255,.7)",letterSpacing:"1px" }}>ADEPT CONCRETE PUMPING</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".62rem",color:"rgba(251,191,36,.5)",letterSpacing:"2px" }}>GYMPIE · WIDE BAY · SUNSHINE COAST</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:0429688581" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none" }}>0429 688 581</a>
            <a href="mailto:adeptconcretepumping@outlook.com.au" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none" }}>adeptconcretepumping@outlook.com.au</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem" }}>© 2025 Adept Concrete Pumping. QLD, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
