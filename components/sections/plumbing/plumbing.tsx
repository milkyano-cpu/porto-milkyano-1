"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🚿", title: "General Plumbing",      desc: "Taps, toilets, pipes, hot water systems and all general plumbing repairs. Fast response, fixed right first time." },
  { icon: "🏗️", title: "New Builds",            desc: "Rough-in and fit-off for new residential and commercial builds. Working with builders across Melbourne and Bass Coast." },
  { icon: "🏠", title: "Re-Roofing",            desc: "Full re-roof and roof plumbing including flashings, gutters, downpipes and drainage. Bass Coast region specialists." },
  { icon: "🔥", title: "Hot Water Systems",     desc: "Supply and install of gas, electric and heat pump hot water systems. All major brands serviced and replaced." },
  { icon: "🌊", title: "Drainage & Trenching",  desc: "Stormwater, sewer and ag-drainage. Trenching for fire access points, water tanks and new supply lines." },
  { icon: "💧", title: "Water Tanks & Pumps",   desc: "Rainwater tank connections, pump installs and pressure systems for residential and rural properties." },
];

const AREAS = ["Melbourne", "Bass Coast", "Yanakie", "Venus Bay", "Inverloch", "Wonthaggi", "San Remo", "Phillip Island"];

// Pre-computed van wheel spokes — no SSR mismatch
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
const SPOKES = makeSpokes(5, 13);

export default function GotchaCoveredPlumbing() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLDivElement>(null);
  const heroSubRef    = useRef<HTMLDivElement>(null);
  const heroCtaRef    = useRef<HTMLDivElement>(null);
  const heroVisRef    = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);
  const galleryRef    = useRef<HTMLDivElement>(null);
  const areasRef      = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(heroBadgeRef.current,  { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(heroTitleRef.current,  { y: 80, opacity: 0, skewY: 2, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .from(heroSubRef.current,    { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(heroCtaRef.current,    { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .from(heroVisRef.current,    { x: 90, opacity: 0, duration: 1.0, ease: "power3.out" }, "-=0.8");

      gsap.from(statsRef.current?.querySelectorAll(".stat-item") ?? [], {
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: TA },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });

      servicesRef.current?.querySelectorAll(".svc-card")?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: TA },
          y: 50, opacity: 0, scale: 0.94, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.07,
        });
      });

      gsap.from(galleryRef.current?.querySelectorAll(".gal-item") ?? [], {
        scrollTrigger: { trigger: galleryRef.current, start: "top 85%", toggleActions: TA },
        y: 60, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.07, ease: "power3.out",
      });

      gsap.from(areasRef.current?.querySelectorAll(".area-tag") ?? [], {
        scrollTrigger: { trigger: areasRef.current, start: "top 85%", toggleActions: TA },
        y: 24, opacity: 0, scale: 0.88, duration: 0.45, stagger: 0.06, ease: "back.out(1.5)",
      });

      gsap.from(whyLeftRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", toggleActions: TA },
        x: -70, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(whyRightRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", toggleActions: TA },
        x: 70, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(whyRightRef.current?.querySelectorAll(".why-item") ?? [], {
        scrollTrigger: { trigger: whyRef.current, start: "top 75%", toggleActions: TA },
        x: 40, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
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
    <div style={{ background:"#f7f9fc", color:"#1a2332", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --teal:    #0097A7;
          --teal-d:  #00838f;
          --teal-l:  #4dd0e1;
          --navy:    #1B2B5E;
          --navy-l:  #2a3f7e;
          --cream:   #f7f9fc;
          --cream2:  #eef2f7;
          --cream3:  #e5eaf2;
          --border:  rgba(0,151,167,0.15);
          --border2: rgba(27,43,94,0.1);
          --muted:   rgba(26,35,50,0.5);
          --glow:    rgba(0,151,167,0.2);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer-bg  { 0%{left:-100%} 100%{left:200%} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        /* ── Van drive-in ── */
        @keyframes van-enter {
          0%   { transform: translateX(130%); opacity:0; }
          42%  { transform: translateX(0%);   opacity:1; }
          100% { transform: translateX(0%);   opacity:1; }
        }
        @keyframes van-idle {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes road-move {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -60; }
        }
        @keyframes dust-out {
          0%   { opacity:0; transform:translate(0,0) scale(0.5); }
          20%  { opacity:0.3; }
          65%  { opacity:0.08; transform:translate(-20px,-12px) scale(2); }
          100% { opacity:0; transform:translate(-32px,-20px) scale(2.8); }
        }

        /* ── Drip animation on tap ── */
        @keyframes drip-fall {
          0%   { transform: translateY(0) scaleY(0.3); opacity:0; }
          15%  { opacity:1; transform: translateY(0) scaleY(1); }
          85%  { opacity:1; transform: translateY(18px) scaleY(1); }
          100% { transform: translateY(22px) scaleY(1.2); opacity:0; }
        }
        @keyframes drip-2 {
          0%   { transform: translateY(0) scaleY(0.3); opacity:0; }
          15%  { opacity:1; transform: translateY(0) scaleY(1); }
          85%  { opacity:1; transform: translateY(14px) scaleY(1); }
          100% { transform: translateY(18px) scaleY(1.2); opacity:0; }
        }

        .van-scene  { animation: van-enter 2.2s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .van-body   { animation: van-idle 3.2s ease-in-out 2.4s infinite; }
        .wheel-anim { animation: wheel-spin 0.38s linear 0s 6, wheel-spin 3.5s linear 2.4s infinite; }
        .dust-puff  { animation: dust-out 0.85s ease-out infinite; }
        .road-anim  { stroke-dasharray:40 20; animation: road-move 0.5s linear 0s 5, road-move 4s linear 2.4s infinite; }

        .nav-link { color:rgba(26,35,50,.55); text-decoration:none; font-size:.85rem; letter-spacing:.5px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:var(--teal); }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:var(--navy); border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--teal); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          border-radius:4px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:var(--teal-d); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:var(--navy);
          border:1.5px solid var(--navy); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer; border-radius:4px;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(27,43,94,.06); transform:translateY(-2px); }

        .svc-card {
          background:#fff; border:1px solid var(--border);
          padding:30px 26px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .3s, box-shadow .3s; border-radius:6px;
        }
        .svc-card:hover { border-color:rgba(0,151,167,.4); transform:translateY(-4px); box-shadow:0 16px 48px rgba(0,151,167,.08); }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--teal),var(--teal-l));
          transform:scaleX(0); transform-origin:left; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleX(1); }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer-bg .5s ease; }

        .stat-item { text-align:center; padding:28px 16px; border-left:1px solid rgba(0,151,167,.18); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid var(--border); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:6px; border:1px solid var(--border); cursor:pointer; transition:transform .3s, box-shadow .3s; background:var(--cream3); position:relative; }
        .gal-item:hover { transform:scale(1.02); box-shadow:0 12px 40px rgba(0,151,167,.1); }
        .info-card { transition:border-color .25s, box-shadow .25s; }
        .info-card:hover { border-color:rgba(0,151,167,.4) !important; box-shadow:0 4px 20px rgba(0,151,167,.06); }

        /* Layouts */
        .nav-inner    { padding:16px 52px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; display:flex; align-items:center; padding:100px 52px 70px; position:relative; overflow:hidden; background:linear-gradient(150deg,#eef6f8 0%,#f7f9fc 40%,#f0f7ff 100%); }
        .hero-inner   { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; gap:60px; }
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
          display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:14px;
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
          .hero-title   { font-size:clamp(2.4rem,11vw,3.6rem); }
          .section-pad  { padding:60px 20px; }
          .section-sm   { padding:52px 20px; }
          .stat-grid    { grid-template-columns:repeat(2,1fr); }
          .stat-item    { border-left:none !important; border-bottom:1px solid var(--border); }
          .stat-item:nth-child(2n)        { border-left:1px solid rgba(0,151,167,.18) !important; }
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

        input::placeholder, textarea::placeholder { color:rgba(26,35,50,.3); }
        input, textarea { -webkit-appearance:none; }
        ::selection { background:rgba(0,151,167,.15); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(247,249,252,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.2rem",color:"var(--navy)",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:0403429810" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0403 429 810</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(247,249,252,.96)" : "linear-gradient(180deg,rgba(247,249,252,.92) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48"
                style={{ filter:"drop-shadow(0 2px 8px rgba(0,151,167,0.25))" }}>
                {/* Circle bg */}
                <circle cx="24" cy="24" r="22" fill="#fff" stroke="rgba(0,151,167,.4)" strokeWidth="1.5"/>
                {/* Tap body */}
                <rect x="19" y="14" width="10" height="14" rx="3" fill="var(--teal)"/>
                {/* Tap spout */}
                <path d="M22,28 Q22,34 28,34" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round"/>
                {/* Handles */}
                <rect x="13" y="18" width="6" height="3" rx="1.5" fill="var(--navy)" opacity=".7"/>
                <rect x="29" y="18" width="6" height="3" rx="1.5" fill="var(--navy)" opacity=".7"/>
                {/* Drip drop */}
                <ellipse cx="28" cy="37" rx="2.5" ry="3" fill="var(--teal-l)" opacity=".85"
                  style={{ animation:"drip-fall 2s ease-in-out 0.5s infinite" }}/>
                <ellipse cx="28" cy="37" rx="1.5" ry="2" fill="var(--teal)"
                  style={{ animation:"drip-2 2s ease-in-out 1.3s infinite" }}/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"var(--navy)",letterSpacing:"1.5px",lineHeight:1,textShadow:"0 1px 4px rgba(0,0,0,.06)" }}>GOTCHA COVERED</div>
              <div style={{ fontSize:".58rem",color:"var(--teal)",letterSpacing:"2.5px",lineHeight:1.5,fontFamily:"'Barlow',sans-serif",fontWeight:500,textTransform:"uppercase" }}>Plumbing</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:0403429810" className="btn-primary desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 0403 429 810</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section">
        {/* Subtle dot grid */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(0,151,167,.07) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none" }}/>
        {/* Teal bottom accent */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),transparent)",opacity:.5 }}/>
        {/* Large teal glow bg right */}
        <div style={{ position:"absolute",top:"20%",right:"-5%",width:500,height:500,background:"radial-gradient(ellipse,rgba(0,151,167,.08) 0%,transparent 65%)",pointerEvents:"none" }}/>

        <div className="hero-inner">
          {/* Text */}
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,151,167,.08)",border:"1px solid rgba(0,151,167,.3)",padding:"6px 16px",borderRadius:100,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--teal)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--teal)",fontWeight:700,textTransform:"uppercase" }}>Melbourne &amp; Bass Coast · VIC</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"var(--navy)",marginBottom:4 }}>
                FAST,<br/>
                <span style={{ color:"var(--teal)" }}>FRIENDLY</span><br/>
                &amp; RELIABLE
              </h1>
            </div>

            <p ref={heroSubRef} style={{ marginTop:20,fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:460,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              GotchaCovered Plumbing — residential plumbing, roofing, new builds and drainage across Melbourne and the Bass Coast.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:0403429810" className="btn-primary">📞 0403 429 810</a>
              <a href="#services" className="btn-outline">OUR SERVICES</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0403 429 810",          href:"tel:0403429810" },
                { icon:"📱", val:"@gotchacovered_plumbing_", href:"https://www.instagram.com/gotchacovered_plumbing_" },
              ].map(c => (
                <a key={c.val} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--teal)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Animated plumbing van */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 6px 32px rgba(0,151,167,0.14))" }}>

              {/* ── ROAD ── */}
              <rect x="0" y="268" width="520" height="52" fill="#e8edf4"/>
              <line x1="0" y1="270" x2="520" y2="270" stroke="rgba(0,151,167,.25)" strokeWidth="1.5"/>
              {/* Moving dashes */}
              <line x1="0" y1="293" x2="520" y2="293"
                stroke="rgba(26,35,50,.15)" strokeWidth="2"
                className="road-anim"
              />
              <line x1="0" y1="318" x2="520" y2="318" stroke="rgba(0,151,167,.1)" strokeWidth="1"/>

              {/* Dust puffs */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={62} cy={268}
                  rx={6+i*4} ry={3+i*2}
                  fill="rgba(0,151,167,.08)"
                  className="dust-puff"
                  style={{ animationDelay:`${i*0.27}s`, animationDuration:"0.85s", animationIterationCount:"6" }}
                />
              ))}

              {/* ── VAN drives in from right ── */}
              <g className="van-scene">
                <g className="van-body">

                  {/* ── VAN BODY — white transit-style ── */}
                  {/* Main body */}
                  <rect x="42" y="195" width="390" height="76" rx="4" fill="#f5f8fc" stroke="rgba(0,151,167,.3)" strokeWidth="1.5"/>
                  {/* Roof */}
                  <rect x="42" y="175" width="390" height="22" rx="4" fill="#edf2f8" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                  {/* Cab section (front right) */}
                  <path d="M 368,175 L 368,152 Q 368,143 376,143 L 418,143 Q 428,143 436,152 L 452,175 L 452,271 L 368,271 Z"
                    fill="#eef3f9" stroke="rgba(0,151,167,.3)" strokeWidth="1.5"/>
                  {/* Windshield */}
                  <path d="M 376,150 L 376,175 L 452,175 L 436,152 Q 428,143 418,143 L 376,143 Z"
                    fill="rgba(0,151,167,.12)" stroke="rgba(0,151,167,.3)" strokeWidth="1"/>
                  {/* Windshield reflection */}
                  <line x1="382" y1="148" x2="442" y2="170" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                  {/* Side window (cargo area) */}
                  <rect x="280" y="183" width="70" height="30" rx="3" fill="rgba(0,151,167,.1)" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                  <rect x="360" y="180" width="4" height="90" fill="rgba(0,151,167,.12)"/>
                  {/* Door handle */}
                  <rect x="354" y="230" width="12" height="4" rx="2" fill="rgba(0,151,167,.4)"/>
                  {/* Headlight */}
                  <rect x="444" y="168" width="14" height="10" rx="3" fill="rgba(255,240,150,.9)"/>
                  <rect x="446" y="170" width="10" height="4" rx="1" fill="rgba(255,220,80,.7)"/>
                  {/* Headlight beam */}
                  <path d="M458,172 Q500,165 510,174 Q500,182 458,178Z" fill="rgba(255,240,150,.1)"/>
                  {/* Tail light */}
                  <rect x="42" y="205" width="10" height="22" rx="2" fill="rgba(200,40,40,.6)" stroke="rgba(255,100,100,.3)" strokeWidth="1"/>
                  {/* Front bumper */}
                  <rect x="448" y="240" width="18" height="28" rx="3" fill="#dde4ee" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                  {/* Rear bumper */}
                  <rect x="34" y="240" width="12" height="28" rx="3" fill="#dde4ee" stroke="rgba(0,151,167,.15)" strokeWidth="1"/>

                  {/* ── BRANDING ON VAN SIDE ── */}
                  {/* Teal wave stripe */}
                  <path d="M42,228 Q120,218 200,228 Q280,238 360,228 L360,245 Q280,255 200,245 Q120,235 42,245 Z"
                    fill="var(--teal)" opacity=".85"/>
                  {/* Logo tap on van */}
                  <circle cx="82" cy="218" r="20" fill="rgba(255,255,255,.95)" stroke="rgba(0,151,167,.3)" strokeWidth="1"/>
                  <rect x="77" y="210" width="10" height="12" rx="2" fill="var(--teal)"/>
                  <path d="M80,222 Q80,228 86,228" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round"/>
                  <ellipse cx="86" cy="231" rx="2" ry="2.5" fill="var(--teal-l)"
                    style={{ animation:"drip-fall 2.5s ease-in-out 1s infinite" }}/>
                  {/* Business name */}
                  <text x="115" y="215" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="var(--navy)" letterSpacing="1">GOTCHA COVERED</text>
                  <text x="115" y="228" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--teal)" letterSpacing="2">PLUMBING</text>
                  {/* Phone on van */}
                  <text x="220" y="241" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#fff" letterSpacing="1.5">0403 429 810</text>

                  {/* Roof rack hint */}
                  <rect x="80" y="173" width="260" height="4" rx="1" fill="#c8d4e8" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                  {[120,160,200,240,280].map(x => <rect key={x} x={x} y="169" width="4" height="8" rx="1" fill="#bbc8da"/>)}

                  {/* ── WHEELS ── */}
                  {[110, 360].map(wx => (
                    <g key={wx} transform={`translate(${wx},270)`}>
                      <circle cx="0" cy="0" r="24" fill="#2a2a2a" stroke="rgba(200,210,220,.5)" strokeWidth="2.5"/>
                      <circle cx="0" cy="0" r="16" fill="#333" stroke="rgba(200,210,220,.3)" strokeWidth="1.5"/>
                      <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3.5"/>
                      <circle cx="0" cy="0" r="5" fill="#999"/>
                      <g className="wheel-anim">
                        {SPOKES.map((s,i) => (
                          <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                            stroke="rgba(200,210,220,.6)" strokeWidth="2.5" strokeLinecap="round"/>
                        ))}
                      </g>
                    </g>
                  ))}

                </g>{/* end van-body */}
              </g>{/* end van-scene */}

              {/* Ground shadow */}
              <ellipse cx="260" cy="320" rx="255" ry="7" fill="rgba(0,151,167,.07)"/>

              {/* ── FLOATING BADGE — 24/7 available ── */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.8s infinite" }}>
                <rect x="18" y="30" width="118" height="66" rx="8" fill="#fff" stroke="rgba(0,151,167,.3)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 14px rgba(0,151,167,0.12))" }}/>
                <rect x="18" y="30" width="118" height="28" rx="8" fill="var(--teal)"/>
                <rect x="18" y="48" width="118" height="10" rx="0" fill="var(--teal)"/>
                <text x="77" y="49" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#fff" letterSpacing="2">FAST RESPONSE</text>
                <text x="77" y="68" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="16" fill="var(--navy)">24 / 7</text>
                <text x="77" y="84" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="var(--muted)">Melbourne &amp; Bass Coast</text>
              </g>

              {/* ── FLOATING BADGE 2 — Re-roof ── */}
              <g style={{ animation:"float-badge 3.5s ease-in-out 1.6s infinite" }}>
                <rect x="370" y="30" width="130" height="56" rx="8" fill="var(--navy)"
                  style={{ filter:"drop-shadow(0 4px 14px rgba(27,43,94,0.15))" }}/>
                <text x="435" y="52" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="11" fill="rgba(255,255,255,.9)" letterSpacing="1">NEW BUILDS</text>
                <text x="435" y="67" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--teal-l)" letterSpacing="1">+ RE-ROOFING</text>
                <text x="435" y="79" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="rgba(255,255,255,.45)">Bass Coast specialists</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.35,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--navy)",borderTop:"none" }}>
        <div className="stat-grid">
          {[
            { n:"Fast",   l:"Response Times"       },
            { n:"Res.",   l:"& Commercial"         },
            { n:"Bass",   l:"Coast Specialists"    },
            { n:"Free",   l:"Quotes Available"     },
          ].map(s => (
            <div key={s.l} className="stat-item" style={{ borderLeftColor:"rgba(255,255,255,.1)" }}>
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--teal-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(255,255,255,.4)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>What We Do</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              PLUMBING SERVICES<br/><span style={{ color:"var(--teal)" }}>DONE RIGHT</span>
            </h2>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.15rem",fontWeight:700,color:"var(--navy)",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>{s.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:".88rem",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="work" className="section-pad" style={{ background:"var(--cream2)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Our Work</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              RECENT JOBS<br/><span style={{ color:"var(--teal)" }}>BASS COAST &amp; MELB</span>
            </h2>
          </div>

          <div ref={galleryRef} className="gallery-grid">

            {/* Card 1 — Re-roof (Yanakie) */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#c8d8e8"/>
                {/* Sky */}
                <rect width="520" height="140" fill="#87CEEB" opacity=".7"/>
                {/* Clouds */}
                <ellipse cx="120" cy="40" rx="60" ry="24" fill="rgba(255,255,255,.8)"/>
                <ellipse cx="90" cy="46" rx="36" ry="20" fill="rgba(255,255,255,.9)"/>
                <ellipse cx="155" cy="48" rx="30" ry="16" fill="rgba(255,255,255,.85)"/>
                <ellipse cx="380" cy="55" rx="50" ry="20" fill="rgba(255,255,255,.75)"/>
                {/* Trees bg */}
                {[380,420,460,490].map(x => (<g key={x}><rect x={x} y="80" width="10" height="60" fill="#3a5a2a"/><ellipse cx={x+5} cy="78" rx="24" ry="32" fill="#4a6e34" opacity=".9"/></g>))}
                {/* Corrugated iron roof — perspective */}
                <path d="M0,140 L520,100 L520,280 L0,280Z" fill="#b0bec5"/>
                {/* Corrugation lines */}
                {Array.from({length:22},(_,i)=><line key={i} x1={i*24} y1="140" x2={520+i*24-22*24} y2="100" stroke="rgba(0,0,0,.08)" strokeWidth="2"/>)}
                {/* Roof highlight (after re-roof) */}
                <path d="M0,140 L520,100 L520,180 L0,220Z" fill="rgba(255,255,255,.06)"/>
                {/* Ridge cap */}
                <line x1="0" y1="140" x2="520" y2="100" stroke="rgba(255,255,255,.4)" strokeWidth="3"/>
                {/* Chimney */}
                <rect x="360" y="90" width="36" height="52" fill="#b07a50" stroke="rgba(0,0,0,.1)" strokeWidth="1"/>
                <rect x="355" y="86" width="46" height="8" rx="2" fill="#9a6840"/>
                {/* Flashing around chimney */}
                <rect x="354" y="108" width="50" height="8" fill="rgba(0,151,167,.4)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>RE-ROOF COMPLETED</div>
                <div style={{ fontSize:".72rem",color:"rgba(77,208,225,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Yanakie · Bass Coast</div>
              </div>
            </div>

            {/* Card 2 — White branded van */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#d8e4f0"/>
                {/* Sky */}
                <rect width="240" height="130" fill="#87CEEB" opacity=".65"/>
                <ellipse cx="80" cy="45" rx="50" ry="20" fill="rgba(255,255,255,.7)"/>
                <ellipse cx="180" cy="60" rx="40" ry="18" fill="rgba(255,255,255,.6)"/>
                {/* Ground */}
                <rect x="0" y="210" width="240" height="70" fill="#e8edf4"/>
                {/* Van */}
                <rect x="10" y="148" width="220" height="65" rx="4" fill="#f5f8fc" stroke="rgba(0,151,167,.3)" strokeWidth="1.5"/>
                <rect x="10" y="132" width="220" height="18" rx="4" fill="#edf2f8" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                {/* Cab */}
                <path d="M185,132 L185,114 Q185,108 191,108 L218,108 Q226,108 232,116 L240,132Z" fill="#eef3f9" stroke="rgba(0,151,167,.25)" strokeWidth="1.5"/>
                <path d="M191,112 L191,132 L240,132 L232,116 Z" fill="rgba(0,151,167,.1)" stroke="rgba(0,151,167,.25)" strokeWidth="1"/>
                {/* Teal stripe */}
                <path d="M10,182 Q60,174 120,182 Q180,190 230,182 L230,196 Q180,204 120,196 Q60,188 10,196Z" fill="var(--teal)" opacity=".85"/>
                {/* Branding */}
                <circle cx="42" cy="172" r="14" fill="rgba(255,255,255,.95)" stroke="rgba(0,151,167,.3)" strokeWidth="1"/>
                <rect x="38" y="165" width="8" height="9" rx="2" fill="var(--teal)"/>
                <path d="M40,174 Q40,178 44,178" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round"/>
                <text x="65"  y="171" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="8" fill="var(--navy)" letterSpacing=".5">GOTCHA COVERED</text>
                <text x="65"  y="180" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="var(--teal)" letterSpacing="1">PLUMBING</text>
                <text x="110" y="193" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="#fff" letterSpacing="1">0403 429 810</text>
                {/* Headlight */}
                <rect x="234" y="118" width="8" height="7" rx="2" fill="rgba(255,240,150,.8)"/>
                {/* Wheels */}
                {[48,178].map(wx=>(
                  <g key={wx} transform={`translate(${wx},213)`}>
                    <circle cx="0" cy="0" r="20" fill="#2a2a2a" stroke="rgba(200,210,220,.4)" strokeWidth="2"/>
                    <circle cx="0" cy="0" r="13" fill="#333"/>
                    <circle cx="0" cy="0" r="4" fill="#999"/>
                    {SPOKES.map((s,i)=><line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(200,210,220,.5)" strokeWidth="2" strokeLinecap="round"/>)}
                  </g>
                ))}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>THE VAN ON SITE</div>
                <div style={{ fontSize:".72rem",color:"rgba(77,208,225,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Melbourne &amp; Bass Coast</div>
              </div>
            </div>

            {/* Card 3 — Trenching / fire access (Venus Bay) */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#c8b89a"/>
                {/* Sandy ground */}
                <rect width="200" height="210" fill="#d4c4a4"/>
                {/* Trench dug */}
                <path d="M30,40 Q40,60 50,90 Q60,120 55,160 Q52,180 55,210 L70,210 Q67,180 72,160 Q78,120 68,90 Q58,60 48,40Z"
                  fill="#8B6A3E" stroke="rgba(0,0,0,.15)" strokeWidth="1.5"/>
                {/* Trench depth shadow */}
                <path d="M32,45 Q42,65 52,95 Q62,125 57,165 Q54,185 57,210 L60,210 Q57,185 61,165 Q67,125 58,95 Q48,65 38,45Z"
                  fill="rgba(0,0,0,.2)"/>
                {/* Water tank in bg */}
                <ellipse cx="148" cy="78" rx="36" ry="38" fill="#b0b8c0" stroke="rgba(0,0,0,.1)" strokeWidth="1.5"/>
                <ellipse cx="148" cy="64" rx="36" ry="10" fill="#c8d0d8"/>
                <rect x="112" y="64" width="72" height="50" fill="#b0b8c0"/>
                {/* Corrugation on tank */}
                {[70,78,86,94,102].map(y=><line key={y} x1="112" y1={y} x2="184" y2={y} stroke="rgba(0,0,0,.06)" strokeWidth="1"/>)}
                {/* Downpipe from tank */}
                <rect x="146" y="116" width="6" height="55" fill="#909aa4"/>
                {/* House/fence bg */}
                {[0,16,32,48,64,80,96].map(x=><rect key={x} x={x} y="0" width="14" height="30" rx="1" fill="#c4a870" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>)}
                {/* Green grass patches */}
                {[[10,170],[90,185],[140,165],[170,195]].map(([gx,gy])=><ellipse key={`${gx}${gy}`} cx={gx} cy={gy} rx="8" ry="5" fill="#7a9c5a" opacity=".5"/>)}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>TRENCHING</div>
                <div style={{ fontSize:".72rem",color:"rgba(77,208,225,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Fire access point · Venus Bay</div>
              </div>
            </div>

            {/* Card 4 — New build steel frame */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#c8d8e8"/>
                {/* Sky */}
                <rect width="200" height="120" fill="#87CEEB" opacity=".6"/>
                <ellipse cx="50" cy="35" rx="44" ry="18" fill="rgba(255,255,255,.7)"/>
                <ellipse cx="155" cy="50" rx="36" ry="15" fill="rgba(255,255,255,.65)"/>
                {/* Ground */}
                <rect x="0" y="170" width="200" height="40" fill="#c4a870" opacity=".7"/>
                {/* Steel frame structure */}
                {/* Vertical columns */}
                {[20,70,130,180].map(x=><rect key={x} x={x} y="80" width="6" height="92" fill="#5a7a9a" stroke="rgba(0,0,0,.1)" strokeWidth="1"/>)}
                {/* Horizontal beams */}
                {[80,105,130,155].map(y=><rect key={y} x="20" y={y} width="166" height="5" fill="#6a8aaa" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>)}
                {/* Roof trusses */}
                <path d="M15,80 L100,50 L185,80" fill="none" stroke="#5a7a9a" strokeWidth="5" strokeLinejoin="round"/>
                <path d="M15,80 L100,50" fill="none" stroke="#6a8aaa" strokeWidth="4" strokeLinecap="round"/>
                <path d="M100,80 L100,50" fill="none" stroke="#6a8aaa" strokeWidth="4"/>
                <path d="M57,80 L100,50" fill="none" stroke="#6a8aaa" strokeWidth="3" opacity=".7"/>
                <path d="M143,80 L100,50" fill="none" stroke="#6a8aaa" strokeWidth="3" opacity=".7"/>
                {/* Safety cone */}
                <path d="M92,170 L100,140 L108,170Z" fill="rgba(249,115,22,.8)"/>
                <rect x="88" y="168" width="24" height="5" rx="2" fill="rgba(249,115,22,.6)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>NEW BUILD</div>
                <div style={{ fontSize:".72rem",color:"rgba(77,208,225,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Rough-in plumbing · Bass Coast</div>
              </div>
            </div>

            {/* Card 5 — Hot water / plumbing */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#e8edf4"/>
                {/* Wall */}
                <rect width="200" height="210" fill="#eef3f8"/>
                {/* Hot water cylinder */}
                <ellipse cx="100" cy="52" rx="44" ry="12" fill="#b0bec5" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                <rect x="56" y="52" width="88" height="120" fill="#cfd8dc" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                <ellipse cx="100" cy="172" rx="44" ry="12" fill="#b0bec5" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                {/* Insulation band */}
                <rect x="56" y="90" width="88" height="44" fill="rgba(0,151,167,.12)" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                <text x="100" y="116" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(0,151,167,.6)" letterSpacing="1">HOT WATER</text>
                {/* Pipes */}
                <path d="M100,172 Q100,185 80,190 Q65,193 55,195" fill="none" stroke="#9aabad" strokeWidth="8" strokeLinecap="round"/>
                <path d="M100,172 Q100,188 120,193 Q140,196 155,195" fill="none" stroke="#9aabad" strokeWidth="8" strokeLinecap="round"/>
                {/* Pipe — supply in */}
                <rect x="95" y="25" width="10" height="30" fill="#9aabad"/>
                {/* Temp/pressure valve */}
                <rect x="144" y="110" width="16" height="26" rx="3" fill="rgba(200,40,40,.4)" stroke="rgba(200,40,40,.3)" strokeWidth="1"/>
                <rect x="148" y="120" width="8" height="12" rx="1" fill="rgba(200,40,40,.6)"/>
                {/* Anode label */}
                <rect x="68" y="62" width="64" height="20" rx="3" fill="rgba(255,255,255,.7)" stroke="rgba(0,151,167,.2)" strokeWidth="1"/>
                <text x="100" y="75" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="var(--navy)" letterSpacing=".5">250L SYSTEM</text>
                {/* Floor */}
                <rect x="0" y="196" width="200" height="14" fill="#dde4ef"/>
                {/* Shadow */}
                <ellipse cx="100" cy="200" rx="50" ry="6" fill="rgba(0,0,0,.06)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>HOT WATER INSTALL</div>
                <div style={{ fontSize:".72rem",color:"rgba(77,208,225,.8)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Supply &amp; install · all brands</div>
              </div>
            </div>

          </div>
          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            Follow on <a href="https://www.instagram.com/gotchacovered_plumbing_" style={{ color:"var(--teal)",textDecoration:"none",fontWeight:500 }} target="_blank" rel="noopener noreferrer">@gotchacovered_plumbing_</a> for more recent work
          </p>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--navy)",textAlign:"center" }}>
        <div className="inner-1100">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(77,208,225,.7)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Where We Work</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            SERVICE AREAS
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 22px",background:"rgba(255,255,255,.07)",border:"1px solid rgba(77,208,225,.25)",color:"rgba(255,255,255,.85)",fontSize:".9rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:100 }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(255,255,255,.3)",fontSize:".85rem",fontFamily:"'Barlow',sans-serif" }}>
            Not sure if we cover your area? Give us a call and we&apos;ll let you know.
          </p>
        </div>
      </section>

      {/* ══ WHY GOTCHA COVERED ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--cream2)",borderTop:"1px solid var(--border2)" }}>
        <div className="why-grid">
          {/* Left panel */}
          <div ref={whyLeftRef} style={{ background:"var(--navy)",padding:"48px 40px",position:"relative",overflow:"hidden",borderRadius:6 }}>
            {[{top:16,left:16},{top:16,right:16},{bottom:16,left:16},{bottom:16,right:16}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:20,height:20,
                borderTop:i<2?"2px solid rgba(77,208,225,.4)":undefined,
                borderBottom:i>=2?"2px solid rgba(77,208,225,.4)":undefined,
                borderLeft:i%2===0?"2px solid rgba(77,208,225,.4)":undefined,
                borderRight:i%2===1?"2px solid rgba(77,208,225,.4)":undefined,
              }}/>
            ))}

            {/* Large tap logo SVG */}
            <div style={{ textAlign:"center",marginBottom:32 }}>
              <svg width="120" height="130" viewBox="0 0 120 130">
                <circle cx="60" cy="56" r="52" fill="rgba(255,255,255,.05)" stroke="rgba(77,208,225,.3)" strokeWidth="1.5"/>
                {/* Tap body */}
                <rect x="46" y="28" width="28" height="38" rx="6" fill="var(--teal)"/>
                {/* Spout */}
                <path d="M54,66 Q54,85 70,85" fill="none" stroke="var(--teal)" strokeWidth="7" strokeLinecap="round"/>
                {/* Handles */}
                <rect x="28" y="38" width="18" height="8" rx="4" fill="rgba(255,255,255,.5)"/>
                <rect x="74" y="38" width="18" height="8" rx="4" fill="rgba(255,255,255,.5)"/>
                {/* Drip */}
                <ellipse cx="70" cy="94" rx="5" ry="7" fill="var(--teal-l)"
                  style={{ animation:"drip-fall 2.2s ease-in-out 0.4s infinite" }}/>
                {/* GCP text */}
                <text x="60" y="118" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="12" fill="rgba(255,255,255,.8)" letterSpacing="2">GCP</text>
              </svg>
            </div>

            <div style={{ textAlign:"center",marginBottom:28 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.4rem",color:"#fff",lineHeight:1 }}>GOTCHA COVERED</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".62rem",color:"rgba(77,208,225,.6)",letterSpacing:"3px",textTransform:"uppercase",marginTop:4 }}>Plumbing</div>
            </div>

            {[
              ["Fast response",   "We know plumbing problems don't wait. Prompt call-backs and on-site fast."],
              ["All jobs covered","Dripping tap to full re-roof — if it's plumbing or roofing, we've got you."],
              ["Fair pricing",    "Straight quotes, no hidden extras. You know the cost before we start work."],
            ].map(([t,d]) => (
              <div key={t as string} style={{ display:"flex",gap:12,marginBottom:16 }}>
                <div style={{ width:22,height:22,background:"rgba(77,208,225,.15)",border:"1px solid rgba(77,208,225,.35)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2,6 L5,9 L10,3" stroke="var(--teal-l)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",fontSize:".9rem",marginBottom:2,textTransform:"uppercase" }}>{t as string}</div>
                  <div style={{ color:"rgba(255,255,255,.4)",fontSize:".8rem",lineHeight:1.65,fontFamily:"'Barlow',sans-serif" }}>{d as string}</div>
                </div>
              </div>
            ))}

            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--teal)",color:"#fff",padding:"12px 20px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px",borderRadius:"6px 0 6px 0" }}>
              FREE<br/>QUOTE
            </div>
          </div>

          {/* Right */}
          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Why Choose Us</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
              FAST, FRIENDLY<br/><span style={{ color:"var(--teal)" }}>&amp; RELIABLE</span><br/>PLUMBING
            </h2>
            {[
              { icon:"⚡", title:"Fast Response",       desc:"Plumbing emergencies can't wait. We respond quickly and get on site fast across Melbourne and Bass Coast." },
              { icon:"😊", title:"Friendly Service",    desc:"No jargon, no pressure. We explain the problem, give you a fair quote and get it sorted properly." },
              { icon:"🏗️", title:"New Build Experts",   desc:"Experienced with new residential builds across Bass Coast. Rough-in, fit-off and everything in between." },
              { icon:"🏠", title:"Roof Plumbing",       desc:"Re-roofing, flashings, gutters and downpipes. Keeping Bass Coast homes watertight for years." },
              { icon:"💧", title:"Licensed & Insured",  desc:"Fully licensed plumber. All work to code, insurance covered and compliant with VIC regulations." },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div style={{ fontSize:"1.4rem",lineHeight:1,marginTop:2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"var(--navy)",marginBottom:4,fontSize:"1rem",letterSpacing:".5px",textTransform:"uppercase" }}>{item.title}</div>
                  <div style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"linear-gradient(150deg,#eef6f8,#f0f7ff,#eef6f8)",borderTop:"1px solid var(--border)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(0,151,167,.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),transparent)" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--teal)",marginBottom:14,fontWeight:700,textTransform:"uppercase" }}>Ready to Book?</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5.5vw,4rem)",fontWeight:900,color:"var(--navy)",lineHeight:.9,marginBottom:16,letterSpacing:"-1px" }}>
          GOT YOU COVERED<br/><span style={{ color:"var(--teal)" }}>CALL US TODAY</span>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:420,margin:"0 auto 36px",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>
          Melbourne and Bass Coast. Fast, friendly, reliable plumbing — free quotes available.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:0403429810" className="btn-primary">📞 0403 429 810</a>
          <a href="#contact" className="btn-outline">SEND A MESSAGE</a>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get In Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              CONTACT<br/><span style={{ color:"var(--teal)" }}>GOTCHA COVERED</span>
            </h2>
          </div>
          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone / SMS",  val:"0403 429 810",                                 href:"tel:0403429810" },
                { icon:"📱", label:"Instagram",    val:"@gotchacovered_plumbing_",                     href:"https://www.instagram.com/gotchacovered_plumbing_" },
                { icon:"📍", label:"Based",        val:"Melbourne & Bass Coast, VIC",                  href:undefined },
                { icon:"🗺️", label:"Service Area", val:"Melbourne · Bass Coast · Phillip Island area", href:undefined },
                { icon:"⏱️", label:"Response",     val:"Fast response — call or text anytime",        href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"#fff",border:"1px solid var(--border)",borderRadius:4 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--teal)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"var(--navy)",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--teal)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="var(--navy)")}
                        >{c.val}</a>
                      : <span style={{ color:"var(--navy)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"#fff",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:6,boxShadow:"0 4px 32px rgba(0,151,167,.05)" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.2rem",color:"var(--navy)",letterSpacing:"1px",marginBottom:24,textTransform:"uppercase" }}>Get a Free Quote</div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith"                     },
                { label:"Phone / SMS", type:"tel",   ph:"04XX XXX XXX"                   },
                { label:"Email",       type:"email", ph:"you@example.com"                },
                { label:"Job Type",    type:"text",  ph:"e.g. Leaking tap, re-roof, hot water…" },
                { label:"Suburb",      type:"text",  ph:"e.g. Inverloch, Wonthaggi…"    },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(26,35,50,.4)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--navy)",fontSize:".88rem",outline:"none",borderRadius:3,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(0,151,167,.45)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(26,35,50,.4)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Job Details</label>
                <textarea rows={3} placeholder="Tell us about the job — what's happening, location, urgency…"
                  style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--navy)",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:3,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(0,151,167,.45)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%",fontSize:".9rem" }}>💧 REQUEST FREE QUOTE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--navy)",padding:"32px 52px" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,background:"rgba(255,255,255,.08)",border:"1px solid rgba(77,208,225,.3)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".8rem",color:"var(--teal-l)",fontWeight:900 }}>GCP</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".95rem",color:"rgba(255,255,255,.8)",letterSpacing:"1px" }}>GOTCHA COVERED PLUMBING</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(77,208,225,.5)",letterSpacing:"2px",textTransform:"uppercase" }}>Melbourne &amp; Bass Coast · VIC</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:0403429810" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>0403 429 810</a>
            <a href="https://www.instagram.com/gotchacovered_plumbing_" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>@gotchacovered_plumbing_</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 GotchaCovered Plumbing. VIC, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
