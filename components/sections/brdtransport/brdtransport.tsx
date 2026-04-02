"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pre-compute wheel spokes to avoid SSR/client floating point mismatch
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
const SPOKES_SM  = makeSpokes(5, 12);
const SPOKES_LG  = makeSpokes(6, 15);

const ROUTE = ["CAIRNS", "TOWNSVILLE", "BRISBANE", "SYDNEY", "MELBOURNE"];

export default function BDRTransport() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroBadgeRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLDivElement>(null);
  const heroSubRef    = useRef<HTMLDivElement>(null);
  const heroCtaRef    = useRef<HTMLDivElement>(null);
  const truckRef      = useRef<HTMLDivElement>(null);
  const routeRef      = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);
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
      tl.from(heroBadgeRef.current, { y: -24, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(heroTitleRef.current, { y: 70, opacity: 0, skewY: 4, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .from(heroSubRef.current,   { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(heroCtaRef.current,   { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .from(truckRef.current,     { x: 140, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.7");

      // Hero parallax
      gsap.to(heroTitleRef.current, {
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 },
        y: -100, opacity: 0.1, ease: "none",
      });
      gsap.to(truckRef.current, {
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 2 },
        x: 80, y: -50, opacity: 0, ease: "none",
      });

      // Route section
      gsap.from(routeRef.current, {
        scrollTrigger: { trigger: routeRef.current, start: "top 85%", end: "top 40%", toggleActions: TA },
        y: 60, opacity: 0, scale: 0.94, duration: 0.9, ease: "power3.out",
      });

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
            x: left ? -70 : 70, y: 40, rotateY: left ? -20 : 20, rotateX: 8,
            opacity: 0, scale: 0.88, duration: 0.8, ease: "power3.out",
            transformOrigin: left ? "left center" : "right center",
          });
        });
      }

      // Why split
      gsap.from(whyLeftRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", end: "top 38%", toggleActions: TA },
        x: -90, rotateY: 20, opacity: 0, scale: 0.92, duration: 1.0, ease: "power3.out", transformOrigin: "left center",
      });
      gsap.from(whyRightRef.current, {
        scrollTrigger: { trigger: whyRef.current, start: "top 82%", end: "top 38%", toggleActions: TA },
        x: 90, rotateY: -20, opacity: 0, duration: 1.0, ease: "power3.out", transformOrigin: "right center",
      });
      const whyItems = whyRightRef.current?.querySelectorAll(".why-item");
      if (whyItems) {
        gsap.from(Array.from(whyItems), {
          scrollTrigger: { trigger: whyRef.current, start: "top 75%", end: "top 30%", toggleActions: TA },
          x: 55, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        });
      }

      // CTA + contact
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
    <div style={{ background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --orange: #f97316;
          --orange-d: #ea580c;
          --yellow: #fbbf24;
          --glow: rgba(249,115,22,0.22);
          --dark:  #0a0a0a;
          --dark2: #111111;
          --dark3: #1a1a1a;
          --border: rgba(249,115,22,0.18);
        }

        @keyframes slideDown  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce     { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes road-anim  { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-60} }
        @keyframes dot-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer    { 0%{left:-100%} 100%{left:200%} }
        @keyframes ticker     {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes glow-bar   { 0%,100%{opacity:.4} 50%{opacity:.9} }

        /* ── Ticker tape ── */
        .ticker-wrap { overflow:hidden; background:var(--orange); padding:10px 0; white-space:nowrap; position:relative; }
        .ticker-inner { display:inline-flex; animation:ticker 18s linear infinite; }
        .ticker-item  { display:inline-block; padding:0 40px; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:.85rem; letter-spacing:3px; color:#fff; text-transform:uppercase; }
        .ticker-dot   { color:rgba(255,255,255,.5); padding:0 8px; }

        /* ── Nav ── */
        .nav-link { color:rgba(255,255,255,.65); text-decoration:none; font-size:.85rem; letter-spacing:1px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:var(--orange); }
        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* ── Buttons ── */
        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--orange); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:var(--orange-d); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }
        .btn-primary:active { transform:translateY(0); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:12px 30px; background:transparent; color:var(--orange);
          border:1.5px solid var(--orange); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(249,115,22,.1); transform:translateY(-2px); }

        /* ── Service cards ── */
        .svc-card {
          background:var(--dark3); border:1px solid var(--border);
          padding:32px 26px; position:relative; overflow:hidden;
          transition:border-color .35s, transform .35s, box-shadow .35s;
          transform-style:preserve-3d;
        }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; width:4px; height:100%;
          background:var(--orange); transform:scaleY(0); transform-origin:bottom; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleY(1); }
        .svc-card:hover {
          border-color:rgba(249,115,22,.55); transform:translateY(-5px) rotateX(3deg) !important;
          box-shadow:0 20px 60px rgba(249,115,22,.1);
        }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer .6s ease; }

        /* ── Stats ── */
        .stat-item { text-align:center; padding:28px 16px; border-left:1px solid rgba(249,115,22,.12); }
        .stat-item:first-child { border-left:none; }

        /* ── Why items ── */
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,.05); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }

        /* ── Route stop dot ── */
        .route-dot { animation:dot-pulse 2s ease-in-out infinite; }

        /* ── Road animation ── */
        .road-dash { stroke-dasharray:30 15; animation:road-anim 1.2s linear infinite; }

        /* ── Contact card hover ── */
        .info-card { transition:border-color .25s; }
        .info-card:hover { border-color:rgba(249,115,22,.45) !important; }

        /* ═══ LAYOUT CLASSES ═══ */
        .nav-inner   { padding:16px 48px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; padding:120px 48px 80px; display:flex; align-items:center; position:relative; overflow:hidden; }
        .hero-inner  { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; justify-content:space-between; gap:48px; }
        .hero-text   { flex:1 1 auto; max-width:600px; }
        .hero-truck  { flex:0 0 auto; width:48%; max-width:560px; }
        .section-pad { padding:100px 48px; }
        .section-sm  { padding:80px 48px; }
        .inner-max   { max-width:1200px; margin:0 auto; }
        .inner-1100  { max-width:1100px; margin:0 auto; }
        .stat-grid   { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid    { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
        .why-grid    { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.5fr; gap:40px; align-items:start; }
        .footer-row  { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .hero-title  { font-size:clamp(3.5rem,7.5vw,6.5rem); }
        .stat-num    { font-size:2.6rem; }
        .hero-deco   { display:block; }
        .cta-btns    { display:flex; gap:14px; flex-wrap:wrap; }

        /* ═══ MOBILE ═══ */
        @media (max-width:767px) {
          .hamburger      { display:flex !important; }
          .desktop-nav    { display:none !important; }
          .desktop-cta    { display:none !important; }
          .nav-inner      { padding:14px 20px; }
          .hero-section   { padding:90px 20px 60px; }
          .hero-inner     { flex-direction:column; gap:28px; }
          .hero-text      { max-width:100%; }
          .hero-truck     { width:100%; max-width:320px; margin:0 auto; }
          .hero-title     { font-size:clamp(2.8rem,13vw,4.2rem); }
          .section-pad    { padding:64px 20px; }
          .section-sm     { padding:56px 20px; }
          .stat-grid      { grid-template-columns:repeat(2,1fr); }
          .stat-item      { border-left:none !important; border-bottom:1px solid rgba(249,115,22,.1); }
          .stat-item:nth-child(2n) { border-left:1px solid rgba(249,115,22,.12) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num       { font-size:2rem; }
          .svc-grid       { grid-template-columns:1fr; }
          .why-grid       { grid-template-columns:1fr !important; gap:32px !important; }
          .contact-grid   { grid-template-columns:1fr; }
          .footer-row     { flex-direction:column; align-items:flex-start; }
          .hero-deco      { display:none; }
          .cta-btns       { flex-direction:column; }
          .btn-primary, .btn-outline { width:100%; max-width:360px; }
        }
        @media (max-width:480px) { .svc-grid { grid-template-columns:1fr !important; } }

        input::placeholder, textarea::placeholder { color:rgba(255,255,255,.22); }
        input, textarea { -webkit-appearance:none; }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(10,10,10,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .25s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Routes","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:0403316753" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0403 316 753</a>
        </div>
      )}

      {/* ══ TICKER TAPE ══ */}
      <div className="ticker-wrap" style={{ position:"fixed",top:0,left:0,right:0,zIndex:101 }}>
        <div className="ticker-inner">
          {[...Array(2)].map((_,ti) => (
            <span key={ti}>
              {["MELBOURNE & CAIRNS EVERY WEEK","HOT SHOT TRANSPORT","CARS & MACHINERY","SHOULD'VE CALLED YESTERDAY","RECOVERIES & TOWING","LIMITED SPOTS EACH WEEK"].map((t,i) => (
                <span key={i} className="ticker-item">{t}<span className="ticker-dot">◆</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:36,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(10,10,10,.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(249,115,22,.12)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ position:"relative",width:44,height:44 }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#f97316,#ea580c)",border:"2px solid rgba(249,115,22,.6)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"-1px" }}>BDR</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.05rem",color:"#fff",letterSpacing:"2px",lineHeight:1 }}>BDR TRANSPORT</div>
              <div style={{ fontSize:".6rem",color:"var(--orange)",letterSpacing:"2px",lineHeight:1.4 }}>&amp; RECOVERIES</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Routes","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>

          <a href="tel:0403316753" className="btn-primary desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 0403 316 753</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════
           HERO
      ══════════════════════════════════ */}
      <section id="hero" className="hero-section" style={{
        background:"linear-gradient(135deg,#0a0a0a 0%,#0f0a06 50%,#0a0a0a 100%)",
      }}>
        {/* Diagonal orange accent */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 300px 300px 0",borderColor:"transparent var(--orange) transparent transparent",opacity:.06,pointerEvents:"none" }}/>
        {/* Grid lines */}
        <div className="hero-deco" style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
          {[20,40,60,80].map(p => (
            <div key={p} style={{ position:"absolute",left:0,right:0,top:`${p}%`,height:1,background:`rgba(249,115,22,${p===40?.07:.025})` }}/>
          ))}
        </div>
        {/* Orange bottom glow */}
        <div style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"80%",height:2,background:"linear-gradient(90deg,transparent,var(--orange),transparent)",opacity:.3,pointerEvents:"none" }}/>

        <div className="hero-inner">
          {/* LEFT: Text */}
          <div className="hero-text">
            {/* Badge */}
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(249,115,22,.1)",border:"1px solid rgba(249,115,22,.35)",padding:"6px 16px",marginBottom:20 }}>
              <div style={{ width:7,height:7,background:"var(--orange)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"3px",color:"var(--orange)",fontWeight:700 }}>HOT SHOT TRANSPORT &amp; RECOVERIES · QLD</span>
            </div>

            {/* Title */}
            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
                lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4,
              }}>
                SHOULD&apos;VE<br/>
                <span style={{ color:"var(--orange)",fontStyle:"italic" }}>CALLED</span><br/>
                YESTERDAY
              </h1>
            </div>

            <p ref={heroSubRef} style={{ marginTop:22,fontSize:"1.1rem",color:"rgba(255,255,255,.48)",lineHeight:1.7,maxWidth:480,marginBottom:32 }}>
              Hot shot transport and recoveries across Australia. Cars, machinery and freight moved on time — Melbourne to Cairns every week.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="#contact" className="btn-primary">GET A QUOTE</a>
              <a href="#routes" className="btn-outline">VIEW ROUTES</a>
            </div>

            {/* Contact quick links */}
            <div style={{ marginTop:32,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0403 316 753",              href:"tel:0403316753" },
                { icon:"✉️", val:"Bdrtransportqld@gmail.com", href:"mailto:Bdrtransportqld@gmail.com" },
              ].map(c => (
                <a key={c.val} href={c.href} style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"rgba(255,255,255,.5)",fontSize:".84rem",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--orange)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.5)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Truck + trailer SVG */}
          <div ref={truckRef} className="hero-truck">
            <svg viewBox="0 0 560 340" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ filter:"drop-shadow(0 4px 40px rgba(249,115,22,0.25))" }}>

              {/* Road surface */}
              <rect x="0" y="288" width="560" height="52" fill="#141414"/>
              <line x1="0" y1="290" x2="560" y2="290" stroke="rgba(249,115,22,.25)" strokeWidth="1.5"/>
              {/* Moving road dashes */}
              <line x1="0" y1="314" x2="560" y2="314" stroke="rgba(255,255,255,.1)" strokeWidth="2" strokeDasharray="40 20" className="road-dash"/>
              {/* Road edge lines */}
              <line x1="0" y1="338" x2="560" y2="338" stroke="rgba(249,115,22,.15)" strokeWidth="1"/>

              {/* ── LOW-LOADER TRAILER ── */}
              {/* Main bed */}
              <rect x="8" y="235" width="330" height="18" rx="2" fill="#222" stroke="rgba(249,115,22,.35)" strokeWidth="1.5"/>
              {/* Rear ramp */}
              <path d="M 8,253 L 8,270 L 30,253 Z" fill="#1c1c1c" stroke="rgba(249,115,22,.25)" strokeWidth="1"/>
              {/* Side rails */}
              <rect x="8" y="228" width="330" height="7" rx="1" fill="#1e1e1e" stroke="rgba(249,115,22,.2)" strokeWidth="1"/>

              {/* Cargo on trailer: yellow agricultural machine (hopper/seeder) */}
              {/* Main hopper body */}
              <path d="M 40,195 L 40,235 L 180,235 L 180,195 Q 180,185 170,182 L 50,182 Q 40,182 40,195 Z"
                fill="#d97706" stroke="rgba(249,115,22,.6)" strokeWidth="1.5"/>
              {/* Hopper top cone */}
              <path d="M 50,182 L 50,160 L 80,145 L 140,145 L 170,160 L 170,182 Z"
                fill="#f59e0b" stroke="rgba(249,115,22,.5)" strokeWidth="1.5"/>
              {/* Hopper detail lines */}
              <line x1="50" y1="195" x2="180" y2="195" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
              <line x1="50" y1="210" x2="180" y2="210" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
              <line x1="50" y1="225" x2="180" y2="225" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
              {/* Machine wheel/axle */}
              <ellipse cx="75" cy="242" rx="12" ry="12" fill="#333" stroke="rgba(249,115,22,.4)" strokeWidth="1.5"/>
              <ellipse cx="75" cy="242" rx="6" ry="6" fill="#1a1a1a"/>
              <ellipse cx="155" cy="242" rx="12" ry="12" fill="#333" stroke="rgba(249,115,22,.4)" strokeWidth="1.5"/>
              <ellipse cx="155" cy="242" rx="6" ry="6" fill="#1a1a1a"/>

              {/* Secondary cargo: red attachment */}
              <rect x="185" y="205" width="70" height="30" rx="3" fill="#dc2626" stroke="rgba(249,115,22,.3)" strokeWidth="1"/>
              <rect x="195" y="195" width="50" height="12" rx="2" fill="#b91c1c"/>
              {/* Arm extending */}
              <rect x="248" y="200" width="40" height="6" rx="2" fill="#991b1b"/>
              <circle cx="292" cy="203" r="5" fill="#333" stroke="#991b1b" strokeWidth="1.5"/>

              {/* Strap detail */}
              <line x1="50" y1="228" x2="50" y2="240" stroke="rgba(249,115,22,.6)" strokeWidth="2"/>
              <line x1="100" y1="228" x2="100" y2="240" stroke="rgba(249,115,22,.6)" strokeWidth="2"/>
              <line x1="160" y1="228" x2="160" y2="240" stroke="rgba(249,115,22,.6)" strokeWidth="2"/>

              {/* ── WHITE GMC UTE (TOW VEHICLE) ── */}
              {/* Body */}
              <path d="M 330,220 L 330,190 Q 330,182 336,182 L 415,182 Q 422,182 428,190 L 448,215 L 448,253 L 330,253 Z"
                fill="#f0f0f0" stroke="rgba(200,200,200,.5)" strokeWidth="1"/>
              {/* Cab top */}
              <path d="M 336,182 L 336,162 Q 336,155 342,155 L 410,155 Q 416,155 416,162 L 416,182 Z"
                fill="#e8e8e8" stroke="rgba(200,200,200,.4)" strokeWidth="1"/>
              {/* Windshield */}
              <path d="M 342,162 L 342,182 L 416,182 L 416,162 Q 412,155 342,162 Z"
                fill="rgba(100,150,200,.2)" stroke="rgba(200,200,200,.3)" strokeWidth="1"/>
              {/* Side window */}
              <rect x="335" y="163" width="42" height="18" rx="2" fill="rgba(100,150,200,.15)" stroke="rgba(200,200,200,.3)" strokeWidth="1"/>
              {/* Door line */}
              <line x1="380" y1="162" x2="380" y2="253" stroke="rgba(180,180,180,.4)" strokeWidth="1"/>
              {/* Door handle */}
              <rect x="375" y="200" width="10" height="5" rx="1" fill="rgba(150,150,150,.8)"/>
              {/* Bed / tray */}
              <rect x="330" y="190" width="10" height="63" fill="#ddd" stroke="rgba(200,200,200,.3)" strokeWidth="1"/>
              {/* Tow hitch */}
              <rect x="320" y="244" width="14" height="8" rx="2" fill="#aaa"/>
              <rect x="318" y="248" width="6" height="12" rx="1" fill="#999"/>

              {/* Grille */}
              <rect x="444" y="210" width="18" height="30" rx="3" fill="#ddd" stroke="rgba(200,200,200,.5)" strokeWidth="1"/>
              {/* GMC grille details */}
              {[214,220,226,232].map(y => <line key={y} x1="444" y1={y} x2="462" y2={y} stroke="rgba(150,150,150,.4)" strokeWidth="1"/>)}
              {/* Headlight (orange accent) */}
              <rect x="445" y="195" width="14" height="8" rx="2" fill="rgba(249,115,22,.9)"/>
              <rect x="447" y="197" width="10" height="3" rx="1" fill="rgba(255,200,50,.7)"/>
              {/* Front bumper */}
              <rect x="443" y="240" width="20" height="13" rx="2" fill="#ccc"/>
              {/* Black accents */}
              <rect x="330" y="248" width="118" height="5" fill="rgba(0,0,0,.15)"/>

              {/* Exhaust */}
              <rect x="432" y="158" width="7" height="30" rx="2" fill="#555"/>
              {/* Smoke puffs */}
              <circle cx="435" cy="154" r="5" fill="rgba(255,255,255,.07)"/>
              <circle cx="432" cy="146" r="7" fill="rgba(255,255,255,.05)"/>
              <circle cx="436" cy="138" r="9" fill="rgba(255,255,255,.03)"/>

              {/* Orange side stripe on ute */}
              <rect x="330" y="215" width="118" height="5" fill="rgba(249,115,22,.7)"/>

              {/* ── TRAILER WHEELS ── */}
              {[55, 105, 230, 280].map(tx => (
                <g key={tx} transform={`translate(${tx},290)`}>
                  <circle cx="0" cy="0" r="20" fill="#1a1a1a" stroke="rgba(249,115,22,.45)" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="12" fill="#111" stroke="rgba(249,115,22,.25)" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="4" fill="var(--orange)" opacity=".7"/>
                  {SPOKES_SM.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(249,115,22,.4)" strokeWidth="1.5"/>)}
                </g>
              ))}

              {/* ── UTE WHEELS ── */}
              {[375, 435].map(tx => (
                <g key={tx} transform={`translate(${tx},290)`}>
                  <circle cx="0" cy="0" r="24" fill="#111" stroke="rgba(240,240,240,.5)" strokeWidth="2.5"/>
                  <circle cx="0" cy="0" r="15" fill="#1a1a1a" stroke="rgba(240,240,240,.3)" strokeWidth="1.5"/>
                  {/* Black rim detail */}
                  <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3"/>
                  <circle cx="0" cy="0" r="5" fill="#888" opacity=".9"/>
                  {SPOKES_LG.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(200,200,200,.5)" strokeWidth="2"/>)}
                </g>
              ))}

              {/* Ground shadow */}
              <ellipse cx="280" cy="340" rx="270" ry="7" fill="rgba(249,115,22,.07)"/>
            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:24,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.45,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
            <span style={{ fontSize:".55rem",letterSpacing:"4px",color:"rgba(255,255,255,.3)",fontFamily:"'Barlow Condensed',sans-serif" }}>SCROLL</span>
            <svg width="14" height="22" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(249,115,22,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ WEEKLY ROUTE BANNER ══ */}
      <section id="routes" ref={routeRef} style={{ background:"var(--dark2)",borderTop:"1px solid rgba(249,115,22,.15)",borderBottom:"1px solid rgba(249,115,22,.15)",padding:"56px 48px" }}>
        <div className="inner-1100">
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--orange)",marginBottom:10,fontWeight:700 }}>WEEKLY SCHEDULED RUN</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              MELBOURNE &amp; CAIRNS <span style={{ color:"var(--orange)" }}>EVERY WEEK</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,.4)",fontSize:".95rem",marginTop:12,maxWidth:500,margin:"12px auto 0" }}>
              Cars and machinery. Limited spots available each week — book early to secure your slot.
            </p>
          </div>

          {/* Route visual */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:0,overflowX:"auto",padding:"8px 0" }}>
            {ROUTE.map((city, i) => (
              <div key={city} style={{ display:"flex",alignItems:"center" }}>
                {/* Stop */}
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8,minWidth:90 }}>
                  <div style={{ width:i===0||i===ROUTE.length-1?18:13,height:i===0||i===ROUTE.length-1?18:13,borderRadius:"50%",background:i===0||i===ROUTE.length-1?"var(--orange)":"rgba(249,115,22,.5)",border:"2px solid var(--orange)",animation:"dot-pulse 2s ease-in-out infinite",animationDelay:`${i*.3}s` }}/>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:i===0||i===ROUTE.length-1?".85rem":".75rem",color:i===0||i===ROUTE.length-1?"var(--orange)":"rgba(255,255,255,.5)",letterSpacing:"1px",textAlign:"center" }}>{city}</span>
                </div>
                {/* Connector */}
                {i < ROUTE.length-1 && (
                  <div style={{ flex:1,height:2,minWidth:32,background:"linear-gradient(90deg,rgba(249,115,22,.6),rgba(249,115,22,.2))",margin:"0 4px",marginBottom:22 }}/>
                )}
              </div>
            ))}
          </div>

          {/* Limited spots badges */}
          <div style={{ display:"flex",gap:12,justifyContent:"center",marginTop:32,flexWrap:"wrap" }}>
            {["✅ Cars","✅ Machinery","⚡ Limited Spots Each Week","📅 Book in Advance"].map(b => (
              <span key={b} style={{ padding:"7px 18px",background:"rgba(249,115,22,.1)",border:"1px solid rgba(249,115,22,.3)",color:"rgba(255,255,255,.75)",fontSize:".82rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark)",borderBottom:"1px solid rgba(249,115,22,.1)" }}>
        <div className="stat-grid">
          {[
            {n:"Weekly",l:"Melbourne-Cairns Run"},
            {n:"Cars+",l:"Machinery Transported"},
            {n:"24/7", l:"Available"},
            {n:"QLD",  l:"& Nationwide"},
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--orange)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".7rem",letterSpacing:"2px",color:"rgba(255,255,255,.35)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--orange)",marginBottom:10,fontWeight:700 }}>WHAT WE DO</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              TRANSPORT &amp; RECOVERY<br/><span style={{ color:"var(--orange)" }}>SERVICES</span>
            </h2>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {[
              { icon:"🚗", title:"Car Transport",         desc:"Cars, sports cars, classics and luxury vehicles transported safely on our low-loader trailer. Interstate runs every week.", tag:"Melbourne–Cairns" },
              { icon:"🚜", title:"Machinery & Equipment", desc:"Agricultural equipment, construction machinery and industrial gear. We've moved hoppers, seeders, implements and more.", tag:"All Sizes"         },
              { icon:"⚡", title:"Hot Shot Transport",    desc:"When standard freight is too slow. Hot shot loads moved fast with dedicated runs — no shared loads, no delays.",          tag:"Express Runs"      },
              { icon:"🔧", title:"Vehicle Recovery",      desc:"Breakdowns happen. We recover vehicles across Queensland and beyond — fast, reliable and available when you need it.",    tag:"24/7 Available"    },
              { icon:"🛣️", title:"Interstate Freight",    desc:"Regular weekly routes: Melbourne → Sydney → Brisbane → Townsville → Cairns. And return. Cars and machinery welcome.",   tag:"Weekly Schedule"   },
              { icon:"🏗️", title:"Oversized Loads",      desc:"Large agricultural and construction equipment requiring specialised low-loader transport. Permits arranged as needed.",    tag:"Permit Ready"      },
            ].map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#fff",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>{s.title}</h3>
                <p style={{ color:"rgba(255,255,255,.42)",fontSize:".87rem",lineHeight:1.7,marginBottom:18 }}>{s.desc}</p>
                <span style={{ display:"inline-block",padding:"4px 12px",background:"rgba(249,115,22,.1)",border:"1px solid rgba(249,115,22,.3)",color:"var(--orange)",fontSize:".7rem",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",fontWeight:700 }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY BDR ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid rgba(249,115,22,.07)" }}>
        <div className="why-grid">
          {/* Left: visual panel */}
          <div ref={whyLeftRef} style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"44px 36px",position:"relative",overflow:"hidden" }}>
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:18,height:18,
                borderTop:i<2?"2px solid var(--orange)":undefined,
                borderBottom:i>=2?"2px solid var(--orange)":undefined,
                borderLeft:i%2===0?"2px solid var(--orange)":undefined,
                borderRight:i%2===1?"2px solid var(--orange)":undefined,
              }}/>
            ))}

            {/* Route map SVG */}
            <svg width="100%" viewBox="0 0 300 380" fill="none">
              {/* Australia outline simplified */}
              <path d="M 50,30 L 240,30 L 265,80 L 280,160 L 255,230 L 230,310 L 160,360 L 100,350 L 50,290 L 25,210 L 30,120 Z"
                fill="rgba(249,115,22,.04)" stroke="rgba(249,115,22,.2)" strokeWidth="1.5" strokeLinejoin="round"/>

              {/* Route line Cairns→Melbourne */}
              <polyline points="165,55 160,90 155,140 150,200 148,260 145,320"
                stroke="var(--orange)" strokeWidth="3" fill="none" strokeDasharray="10 6" strokeLinecap="round"/>

              {/* City dots with glow */}
              {[
                [165,55,"CAIRNS",true],
                [160,90,"TOWNSVILLE",false],
                [155,140,"MACKAY",false],
                [150,200,"BRISBANE",false],
                [148,260,"SYDNEY",false],
                [145,320,"MELBOURNE",true],
              ].map(([x,y,label,big]) => (
                <g key={String(label)}>
                  <circle cx={Number(x)} cy={Number(y)} r={big?11:7} fill="var(--orange)" opacity={big?.9:.55}/>
                  <circle cx={Number(x)} cy={Number(y)} r={big?18:11} fill="none" stroke="var(--orange)" strokeWidth="1" opacity=".25"/>
                  <text x={Number(x)+15} y={Number(y)+4}
                    fontFamily="Barlow Condensed, sans-serif" fontWeight="700"
                    fontSize={big?"13":"11"} fill={big?"var(--orange)":"rgba(249,115,22,.65)"} letterSpacing="1">
                    {String(label)}
                  </text>
                </g>
              ))}

              {/* EVERY WEEK label */}
              <rect x="60" y="340" width="180" height="30" rx="2" fill="rgba(249,115,22,.12)" stroke="rgba(249,115,22,.3)" strokeWidth="1"/>
              <text x="150" y="360" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="900" fontSize="13" fill="var(--orange)" letterSpacing="3">EVERY WEEK</text>
            </svg>

            {/* Badge */}
            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--orange)",color:"#fff",padding:"12px 18px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px" }}>
              HOT<br/>SHOT
            </div>
          </div>

          {/* Right */}
          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--orange)",marginBottom:12,fontWeight:700 }}>WHY CHOOSE BDR</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
              TRUSTED BY QLD&apos;S<br/><span style={{ color:"var(--orange)" }}>FARMERS &amp;</span><br/>CAR OWNERS
            </h2>
            {[
              { icon:"🚀", title:"Hot Shot Specialists",       desc:"Dedicated loads, no waiting for shared freight. Your cargo moves when you need it." },
              { icon:"📅", title:"Weekly Scheduled Runs",      desc:"Melbourne & Cairns every week. Same reliable schedule so you can plan ahead with confidence." },
              { icon:"💬", title:"Deal Direct with Tim",       desc:"No call centres. No runaround. Call or message Tim directly and get a real answer fast." },
              { icon:"🌏", title:"Cars & Machinery",           desc:"From Porsches to paddock equipment — if it fits on the trailer, we'll move it safely." },
              { icon:"🛡️", title:"Fully Insured",              desc:"All loads covered with comprehensive freight insurance for complete peace of mind." },
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
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#0a0a0a,#111,#0f0802)" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:"radial-gradient(ellipse,rgba(249,115,22,.08) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--orange),transparent)" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,var(--orange),transparent)" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"6px",color:"var(--orange)",marginBottom:14,fontWeight:700 }}>LIMITED SPOTS EACH WEEK</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontStyle:"italic",fontSize:"clamp(2rem,6vw,4.5rem)",fontWeight:900,color:"#fff",lineHeight:.9,marginBottom:14,letterSpacing:"-1px" }}>
          SHOULD&apos;VE CALLED<br/><span style={{ color:"var(--orange)",fontStyle:"normal" }}>YESTERDAY</span>
        </h2>
        <p style={{ color:"rgba(255,255,255,.4)",fontSize:"1rem",maxWidth:440,margin:"0 auto 36px",lineHeight:1.7 }}>
          Don&apos;t miss the weekly run. Contact Tim now for a fast quote on your car, machinery or freight.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:0403316753" className="btn-primary">📞 CALL TIM — 0403 316 753</a>
          <a href="#contact" className="btn-outline">SEND A MESSAGE</a>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",letterSpacing:"5px",color:"var(--orange)",marginBottom:10,fontWeight:700 }}>GET IN TOUCH</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              BOOK YOUR<br/><span style={{ color:"var(--orange)" }}>SPOT TODAY</span>
            </h2>
          </div>

          <div className="contact-grid">
            {/* Info */}
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { icon:"👤", label:"Contact",      val:"Tim",                                href:undefined },
                { icon:"📞", label:"Phone / SMS",  val:"0403 316 753",                       href:"tel:0403316753" },
                { icon:"✉️", label:"Email",        val:"Bdrtransportqld@gmail.com",          href:"mailto:Bdrtransportqld@gmail.com" },
                { icon:"📘", label:"Facebook",     val:"BDR Transport and Recoveries",       href:"https://www.facebook.com/share/1CjfdfRB7f/?mibextid=wwXIfr" },
                { icon:"🛣️", label:"Weekly Route", val:"Melbourne ↔ Cairns (via Brisbane & Sydney)", href:undefined },
                { icon:"📍", label:"Base",         val:"Queensland, Australia",              href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"var(--dark3)",border:"1px solid var(--border)" }}>
                  <span style={{ fontSize:"1.2rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"3px",color:"var(--orange)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>{c.label.toUpperCase()}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"rgba(255,255,255,.75)",fontSize:".87rem",textDecoration:"none",wordBreak:"break-all",transition:"color .25s" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--orange)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.75)")}
                        >{c.val}</a>
                      : <span style={{ color:"rgba(255,255,255,.7)",fontSize:".87rem" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background:"var(--dark3)",border:"1px solid var(--border)",padding:"36px 32px" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#fff",letterSpacing:"1px",marginBottom:22,textTransform:"uppercase" }}>
                Request a Quote
              </div>
              {[
                { label:"Your Name",         type:"text",  ph:"John Smith"           },
                { label:"Phone / SMS",       type:"tel",   ph:"04XX XXX XXX"         },
                { label:"Email",             type:"email", ph:"you@example.com"      },
                { label:"What are you moving?", type:"text", ph:"e.g. Car, tractor, machinery" },
                { label:"From",              type:"text",  ph:"e.g. Melbourne"       },
                { label:"To",                type:"text",  ph:"e.g. Cairns"          },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>
                    {f.label.toUpperCase()}
                  </label>
                  <input type={f.type} placeholder={f.ph} style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(249,115,22,.18)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2 }}
                    onFocus={e=>e.target.style.borderColor="rgba(249,115,22,.55)"}
                    onBlur={e=>e.target.style.borderColor="rgba(249,115,22,.18)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(255,255,255,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700 }}>ADDITIONAL DETAILS</label>
                <textarea rows={3} placeholder="Any other details — size, weight, urgency, preferred date…" style={{ width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(249,115,22,.18)",padding:"11px 13px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"inherit",borderRadius:2 }}
                  onFocus={e=>e.target.style.borderColor="rgba(249,115,22,.55)"}
                  onBlur={e=>e.target.style.borderColor="rgba(249,115,22,.18)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%",fontSize:".9rem" }}>🚛 SEND QUOTE REQUEST</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"#070707",borderTop:"1px solid rgba(249,115,22,.1)",padding:"28px 48px" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--orange),var(--orange-d))",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".72rem",color:"#fff" }}>BDR</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".88rem",color:"rgba(255,255,255,.7)",letterSpacing:"1px" }}>BDR TRANSPORT AND RECOVERIES</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".62rem",color:"rgba(249,115,22,.6)",letterSpacing:"2px" }}>SHOULD&apos;VE CALLED YESTERDAY</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:0403316753" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none" }}>0403 316 753</a>
            <a href="mailto:Bdrtransportqld@gmail.com" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none" }}>Bdrtransportqld@gmail.com</a>
            <a href="https://www.facebook.com/share/1CjfdfRB7f/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none" }}>Facebook</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem" }}>© 2025 BDR Transport and Recoveries. QLD, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
