"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🔧", title: "Maintenance Plumbing",   desc: "35+ years of maintenance experience. Leaks, blockages, repairs and general maintenance done right the first time." },
  { icon: "🏗️", title: "New Installations",      desc: "Complete plumbing installations for new residential and commercial builds across North Brisbane and surrounds." },
  { icon: "🚿", title: "Hot Water Systems",       desc: "Supply, install and service all brands of gas, electric and solar hot water systems. Full replacement service." },
  { icon: "🚽", title: "Bathroom Renovations",   desc: "Full bathroom strip and fit-out. Toilets, vanities, showers and full tiling connections done properly." },
  { icon: "🌊", title: "Drainage & Stormwater",  desc: "Blocked drains, CCTV inspections, high-pressure jetting and complete stormwater drainage solutions." },
  { icon: "🏢", title: "Commercial Plumbing",    desc: "Commercial maintenance contracts, body corporate work and large-scale residential projects across North Brisbane." },
];

const AREAS = ["Scarborough", "Redcliffe", "Brighton", "North Brisbane", "Bracken Ridge", "Deception Bay", "Margate", "Woody Point"];

// Pre-computed wheel spokes — no SSR mismatch
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

export default function AllcomePlumbing() {
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
        .from(heroVisRef.current,    { x: 80, opacity: 0, duration: 1.0, ease: "power3.out" }, "-=0.8");

      gsap.from(statsRef.current?.querySelectorAll(".stat-item") ?? [], {
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: TA },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });

      servicesRef.current?.querySelectorAll(".svc-card")?.forEach((card, i) => {
        const left = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: TA },
          x: left ? -50 : 50, y: 40, opacity: 0, scale: 0.93, duration: 0.7,
          ease: "power3.out", rotateY: left ? -12 : 12,
          transformOrigin: left ? "left center" : "right center",
        });
      });

      gsap.from(galleryRef.current?.querySelectorAll(".gal-item") ?? [], {
        scrollTrigger: { trigger: galleryRef.current, start: "top 85%", toggleActions: TA },
        y: 55, opacity: 0, scale: 0.92, duration: 0.7, stagger: 0.07, ease: "power3.out",
      });

      gsap.from(areasRef.current?.querySelectorAll(".area-tag") ?? [], {
        scrollTrigger: { trigger: areasRef.current, start: "top 85%", toggleActions: TA },
        y: 22, opacity: 0, scale: 0.88, duration: 0.45, stagger: 0.06, ease: "back.out(1.5)",
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
    <div style={{ background:"#f8fafb", color:"#0f1c2e", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --navy:    #1B3A6B;
          --navy-d:  #122a52;
          --navy-l:  #2955a0;
          --gold:    #C8952A;
          --gold-l:  #E8B84B;
          --white:   #ffffff;
          --cream:   #f8fafb;
          --cream2:  #eef2f7;
          --cream3:  #e5ecf5;
          --border:  rgba(27,58,107,0.12);
          --border2: rgba(27,58,107,0.08);
          --muted:   rgba(15,28,46,0.48);
          --glow:    rgba(27,58,107,0.18);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer     { 0%{left:-100%} 100%{left:200%} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes gold-shine  { 0%,100%{opacity:.7} 50%{opacity:1} }

        /* ── Fleet van drive-in ── */
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
          0%   { opacity:0; transform:translate(0,0) scale(.5); }
          20%  { opacity:.28; }
          65%  { opacity:.08; transform:translate(-22px,-13px) scale(2.1); }
          100% { opacity:0; transform:translate(-36px,-22px) scale(2.9); }
        }
        /* Second van enters later */
        @keyframes van2-enter {
          0%,30% { transform: translateX(180%); opacity:0; }
          70%    { transform: translateX(72px);  opacity:1; }
          100%   { transform: translateX(72px);  opacity:1; }
        }
        @keyframes van2-idle {
          0%,100% { transform: translateX(72px) translateY(0px); }
          50%     { transform: translateX(72px) translateY(-2px); }
        }

        .van-scene  { animation: van-enter  2.2s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .van-body   { animation: van-idle   3.2s ease-in-out 2.4s infinite; }
        .van2-scene { animation: van2-enter 2.8s cubic-bezier(0.22,0.61,0.36,1) 0.4s forwards; }
        .van2-body  { animation: van2-idle  3.5s ease-in-out 3.4s infinite; }
        .wheel-anim { animation: wheel-spin 0.38s linear 0s 6, wheel-spin 3.5s linear 2.4s infinite; }
        .wheel-anim2{ animation: wheel-spin 0.38s linear 0.4s 6, wheel-spin 3.5s linear 3.4s infinite; }
        .dust-puff  { animation: dust-out 0.85s ease-out infinite; }
        .road-anim  { stroke-dasharray:40 20; animation: road-move .5s linear 0s 5, road-move 4s linear 2.4s infinite; }

        .nav-link { color:rgba(15,28,46,.55); text-decoration:none; font-size:.85rem; letter-spacing:.5px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:var(--navy); }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:var(--navy); border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--navy); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:var(--navy-l); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }

        .btn-gold {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--gold); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-gold:hover { background:#b8851a; transform:translateY(-2px); box-shadow:0 12px 36px rgba(200,149,42,.25); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:var(--navy);
          border:1.5px solid var(--navy); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(27,58,107,.06); transform:translateY(-2px); }

        .svc-card {
          background:#fff; border:1px solid var(--border);
          padding:30px 26px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .3s, box-shadow .3s;
          transform-style:preserve-3d;
        }
        .svc-card:hover { border-color:rgba(27,58,107,.35); transform:translateY(-4px); box-shadow:0 16px 48px rgba(27,58,107,.08); }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:4px;
          background:linear-gradient(90deg,var(--navy),var(--navy-l));
          transform:scaleX(0); transform-origin:left; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleX(1); }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer .5s ease; }

        .stat-item { text-align:center; padding:30px 16px; border-left:1px solid rgba(255,255,255,.15); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid var(--border2); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:4px; border:1px solid var(--border); cursor:pointer; transition:transform .3s, box-shadow .3s; background:var(--cream3); position:relative; }
        .gal-item:hover { transform:scale(1.02); box-shadow:0 12px 40px rgba(27,58,107,.1); }
        .info-card { transition:border-color .25s, box-shadow .25s; }
        .info-card:hover { border-color:rgba(27,58,107,.35) !important; box-shadow:0 4px 20px rgba(27,58,107,.06); }

        /* Layouts */
        .nav-inner    { padding:16px 52px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; display:flex; align-items:center; padding:100px 52px 70px; position:relative; overflow:hidden; }
        .hero-inner   { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; gap:56px; }
        .hero-text    { flex:1 1 auto; max-width:580px; }
        .hero-vis     { flex:0 0 auto; width:48%; max-width:540px; }
        .section-pad  { padding:100px 52px; }
        .section-sm   { padding:80px 52px; }
        .inner-max    { max-width:1200px; margin:0 auto; }
        .inner-1100   { max-width:1100px; margin:0 auto; }
        .stat-grid    { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:18px; }
        .why-grid     { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:40px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .hero-title   { font-size:clamp(3rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.8rem; }
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
          .stat-item    { border-left:none !important; border-bottom:1px solid rgba(255,255,255,.12); }
          .stat-item:nth-child(2n)        { border-left:1px solid rgba(255,255,255,.15) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num     { font-size:2.2rem; }
          .svc-grid     { grid-template-columns:1fr; }
          .why-grid     { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-grid { grid-template-columns:1fr; }
          .footer-row   { flex-direction:column; align-items:flex-start; }
          .cta-btns     { flex-direction:column; }
          .btn-primary,.btn-gold,.btn-outline { width:100%; }
          .gallery-grid { grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1) { grid-column:1/3; height:180px; }
          .gal-item:nth-child(n) { grid-column:auto; height:150px; }
        }

        input::placeholder, textarea::placeholder { color:rgba(15,28,46,.28); }
        input, textarea { -webkit-appearance:none; }
        ::selection { background:rgba(27,58,107,.15); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(248,250,251,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.2rem",color:"var(--navy)",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:+61413449202" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0413 449 202</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(248,250,251,.96)" : "linear-gradient(180deg,rgba(248,250,251,.92) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo — navy circle A badge */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48"
                style={{ filter:"drop-shadow(0 2px 8px rgba(27,58,107,0.2))" }}>
                {/* Shield shape */}
                <path d="M24,3 L42,12 L42,28 Q42,40 24,46 Q6,40 6,28 L6,12 Z"
                  fill="var(--navy)" stroke="rgba(200,149,42,.5)" strokeWidth="1.5"/>
                {/* Gold top trim */}
                <path d="M24,3 L42,12 L6,12 Z" fill="rgba(200,149,42,.3)"/>
                {/* A letter */}
                <text x="24" y="31" textAnchor="middle"
                  fontFamily="Barlow Condensed,sans-serif" fontWeight="900"
                  fontSize="20" fill="#fff" letterSpacing="-1">A</text>
                {/* Gold underline */}
                <line x1="14" y1="34" x2="34" y2="34" stroke="rgba(200,149,42,.8)" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"var(--navy)",letterSpacing:"1.5px",lineHeight:1,textShadow:"0 1px 4px rgba(0,0,0,.06)" }}>ALLCOME PLUMBING</div>
              <div style={{ fontSize:".58rem",color:"var(--gold)",letterSpacing:"2.5px",lineHeight:1.5,fontFamily:"'Barlow',sans-serif",fontWeight:600,textTransform:"uppercase" }}>PTY LTD · 35+ Years</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:+61413449202" className="btn-primary desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 0413 449 202</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(145deg,#eef3fa 0%,#f8fafb 45%,#ecf1f9 100%)" }}>
        {/* Dot grid */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(27,58,107,.06) 1px,transparent 1px)",backgroundSize:"30px 30px",pointerEvents:"none" }}/>
        {/* Gold bottom accent */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:4,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-l),var(--gold),transparent)",opacity:.6 }}/>
        {/* Navy glow */}
        <div style={{ position:"absolute",top:"15%",right:"-5%",width:480,height:480,background:"radial-gradient(ellipse,rgba(27,58,107,.07) 0%,transparent 65%)",pointerEvents:"none" }}/>
        {/* Corner accent */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 300px 300px 0",borderColor:"transparent rgba(27,58,107,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="hero-inner">
          {/* Text */}
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(27,58,107,.08)",border:"1px solid rgba(27,58,107,.25)",padding:"6px 16px",borderRadius:2,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--navy)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--navy)",fontWeight:700,textTransform:"uppercase" }}>North Side Plumbing Specialists · Brisbane QLD</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"var(--navy)",marginBottom:4 }}>
                NORTH BRISBANE&apos;S<br/>
                <span style={{ color:"var(--gold)" }}>TRUSTED</span><br/>
                PLUMBERS
              </h1>
            </div>

            {/* Gold rule */}
            <div style={{ width:80,height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",marginTop:16,marginBottom:20,borderRadius:2 }}/>

            <p ref={heroSubRef} style={{ fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:480,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              35+ years of plumbing maintenance experience. North Side specialists serving Scarborough, Redcliffe and all of North Brisbane — from leaking taps to full commercial contracts.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:+61413449202" className="btn-gold">📞 0413 449 202</a>
              <a href="#services" className="btn-outline">OUR SERVICES</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:28,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0413 449 202",                 href:"tel:+61413449202" },
                { icon:"✉️", val:"allcomemanager@outlook.com",   href:"mailto:allcomemanager@outlook.com" },
              ].map(c => (
                <a key={c.val} href={c.href}
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--navy)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Two fleet vans + team */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 6px 32px rgba(27,58,107,0.12))" }}>

              {/* ── ROAD ── */}
              <rect x="0" y="278" width="540" height="62" fill="#dde5f0"/>
              <line x1="0" y1="280" x2="540" y2="280" stroke="rgba(27,58,107,.2)" strokeWidth="1.5"/>
              <line x1="0" y1="308" x2="540" y2="308"
                stroke="rgba(15,28,46,.12)" strokeWidth="2"
                className="road-anim"
              />
              <line x1="0" y1="338" x2="540" y2="338" stroke="rgba(27,58,107,.08)" strokeWidth="1"/>

              {/* Dust */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={60} cy={278}
                  rx={6+i*4} ry={3+i*2}
                  fill="rgba(27,58,107,.07)"
                  className="dust-puff"
                  style={{ animationDelay:`${i*0.27}s`, animationDuration:"0.85s", animationIterationCount:"6" }}
                />
              ))}

              {/* ── VAN 2 (behind, slightly smaller, enters slightly later) ── */}
              <g className="van2-scene" style={{ opacity:0.88 }}>
                <g className="van2-body">
                  {/* Smaller van body */}
                  <rect x="30" y="214" width="310" height="66" rx="3" fill="#e8eef8" stroke="rgba(27,58,107,.25)" strokeWidth="1.2"/>
                  <rect x="30" y="200" width="310" height="16" rx="3" fill="#dde5f0" stroke="rgba(27,58,107,.15)" strokeWidth="1"/>
                  {/* Cab */}
                  <path d="M290,200 L290,182 Q290,174 296,174 L334,174 Q342,174 348,182 L360,200Z"
                    fill="#dde5f0" stroke="rgba(27,58,107,.2)" strokeWidth="1.2"/>
                  <path d="M296,178 L296,200 L360,200 L348,182 Z" fill="rgba(27,58,107,.08)" stroke="rgba(27,58,107,.18)" strokeWidth="1"/>
                  {/* Pipe rack */}
                  <rect x="55" y="196" width="230" height="5" rx="1" fill="#b8c4d8"/>
                  {[80,110,140,170,200,230].map(x => <rect key={x} x={x} y="192" width="3" height="8" rx="1" fill="#a8b4c8"/>)}
                  {/* Navy stripe */}
                  <rect x="30" y="256" width="330" height="14" fill="rgba(27,58,107,.55)"/>
                  {/* Branding */}
                  <text x="130" y="267" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8" fill="rgba(255,255,255,.8)" letterSpacing="1.5">ALLCOME PLUMBING</text>
                  {/* Headlight */}
                  <rect x="352" y="188" width="10" height="8" rx="2" fill="rgba(255,240,150,.8)"/>
                  {/* Wheels sm */}
                  {[88, 285].map(wx => (
                    <g key={wx} transform={`translate(${wx},280)`}>
                      <circle cx="0" cy="0" r="20" fill="#2a2a2a" stroke="rgba(180,190,210,.45)" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="13" fill="#333"/>
                      <circle cx="0" cy="0" r="4" fill="#888"/>
                      <g className="wheel-anim2">
                        {SPOKES_SM.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(190,200,220,.55)" strokeWidth="2" strokeLinecap="round"/>)}
                      </g>
                    </g>
                  ))}
                </g>
              </g>

              {/* ── VAN 1 (main, foreground) ── */}
              <g className="van-scene">
                <g className="van-body">

                  {/* Main body */}
                  <rect x="20" y="198" width="380" height="80" rx="4" fill="#f0f5fc" stroke="rgba(27,58,107,.3)" strokeWidth="1.5"/>
                  {/* Roof */}
                  <rect x="20" y="180" width="380" height="20" rx="4" fill="#e5edf8" stroke="rgba(27,58,107,.2)" strokeWidth="1"/>
                  {/* Cab */}
                  <path d="M348,180 L348,156 Q348,146 356,146 L402,146 Q412,146 420,156 L440,180 L440,278 L348,278 Z"
                    fill="#e8f0fa" stroke="rgba(27,58,107,.3)" strokeWidth="1.5"/>
                  {/* Windshield */}
                  <path d="M358,152 L358,180 L440,180 L420,156 Q412,146 402,146 L358,146 Z"
                    fill="rgba(27,58,107,.1)" stroke="rgba(27,58,107,.25)" strokeWidth="1"/>
                  <line x1="364" y1="150" x2="432" y2="173" stroke="rgba(255,255,255,.55)" strokeWidth="1.5"/>
                  {/* Side windows */}
                  <rect x="250" y="188" width="80" height="32" rx="3" fill="rgba(27,58,107,.09)" stroke="rgba(27,58,107,.18)" strokeWidth="1"/>
                  <line x1="348" y1="180" x2="348" y2="278" stroke="rgba(27,58,107,.15)" strokeWidth="2"/>
                  {/* Door handle */}
                  <rect x="336" y="234" width="14" height="4" rx="2" fill="rgba(27,58,107,.35)"/>

                  {/* Pipe rack on roof */}
                  <rect x="60" y="178" width="280" height="5" rx="1" fill="#b8c8e0" stroke="rgba(27,58,107,.15)" strokeWidth="1"/>
                  {[90,130,170,210,250,290,320].map(x => <rect key={x} x={x} y="172" width="4" height="10" rx="1" fill="#a8b8d0"/>)}
                  {/* Pipes on rack */}
                  <rect x="65" y="168" width="270" height="6" rx="3" fill="#9ab0cc" opacity=".7"/>
                  <rect x="65" y="162" width="180" height="5" rx="2.5" fill="#8aa0bc" opacity=".5"/>

                  {/* Headlight */}
                  <rect x="432" y="170" width="14" height="10" rx="3" fill="rgba(255,240,150,.9)"/>
                  <rect x="434" y="172" width="10" height="4" rx="1" fill="rgba(255,220,80,.7)"/>
                  {/* Headlight beam */}
                  <path d="M446,174 Q490,168 508,176 Q490,184 446,180Z" fill="rgba(255,240,150,.1)"/>
                  {/* Tail light */}
                  <rect x="20" y="208" width="10" height="24" rx="2" fill="rgba(200,40,40,.5)" stroke="rgba(255,80,80,.3)" strokeWidth="1"/>
                  {/* Front bumper */}
                  <rect x="436" y="250" width="18" height="26" rx="3" fill="#d0daea" stroke="rgba(27,58,107,.2)" strokeWidth="1"/>
                  {/* Rear bumper */}
                  <rect x="12" y="250" width="12" height="26" rx="3" fill="#d0daea" stroke="rgba(27,58,107,.15)" strokeWidth="1"/>

                  {/* ── NAVY STRIPE & BRANDING ── */}
                  <rect x="20" y="262" width="418" height="14" fill="var(--navy)" opacity=".85"/>
                  {/* Gold accent stripe */}
                  <rect x="20" y="258" width="418" height="5" fill="var(--gold)" opacity=".7"/>

                  {/* Shield logo on van */}
                  <g transform="translate(62, 218)">
                    <path d="M13,1 L24,6 L24,15 Q24,22 13,25 Q2,22 2,15 L2,6 Z" fill="var(--navy)" opacity=".9"/>
                    <text x="13" y="17" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="11" fill="#fff">A</text>
                    <line x1="7" y1="19" x2="19" y2="19" stroke="rgba(200,149,42,.8)" strokeWidth="1.5"/>
                  </g>

                  {/* Business name + phone */}
                  <text x="104" y="222" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="var(--navy)" letterSpacing="1">ALLCOME PLUMBING</text>
                  <text x="104" y="234" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="9" fill="var(--gold)" letterSpacing="1.5">PTY LTD</text>
                  <text x="200" y="268" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(255,255,255,.85)" letterSpacing="1.5">0413 449 202</text>

                  {/* ── WHEELS ── */}
                  {[96, 348].map(wx => (
                    <g key={wx} transform={`translate(${wx},280)`}>
                      <circle cx="0" cy="0" r="26" fill="#1a1a1a" stroke="rgba(185,195,215,.5)" strokeWidth="2.5"/>
                      <circle cx="0" cy="0" r="17" fill="#222" stroke="rgba(185,195,215,.3)" strokeWidth="1.5"/>
                      <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3.5"/>
                      <circle cx="0" cy="0" r="5" fill="#999"/>
                      <g className="wheel-anim">
                        {SPOKES_LG.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(185,195,215,.6)" strokeWidth="2.5" strokeLinecap="round"/>)}
                      </g>
                    </g>
                  ))}

                </g>
              </g>

              {/* Ground shadow */}
              <ellipse cx="270" cy="340" rx="265" ry="7" fill="rgba(27,58,107,.07)"/>

              {/* Floating badge — 35+ years */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.6s infinite" }}>
                <rect x="14" y="28" width="128" height="70" rx="4" fill="var(--navy)"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(27,58,107,0.2))" }}/>
                {/* Gold top bar */}
                <rect x="14" y="28" width="128" height="6" rx="4" fill="var(--gold)"/>
                <rect x="14" y="30" width="128" height="4" rx="0" fill="var(--gold)"/>
                <text x="78" y="53" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="22" fill="#fff">35+</text>
                <text x="78" y="67" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9.5" fill="rgba(255,255,255,.75)" letterSpacing="1.5">YEARS EXPERIENCE</text>
                <text x="78" y="91" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="rgba(255,255,255,.45)">North Side Specialists</text>
              </g>

              {/* Floating badge — always open */}
              <g style={{ animation:"float-badge 3.5s ease-in-out 1.8s infinite" }}>
                <rect x="390" y="28" width="134" height="66" rx="4" fill="#fff" stroke="rgba(27,58,107,.2)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 14px rgba(27,58,107,0.1))" }}/>
                <rect x="390" y="28" width="134" height="5" rx="4" fill="var(--gold)" opacity=".8"/>
                <text x="457" y="54" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="var(--navy)" letterSpacing="1">ALWAYS OPEN</text>
                <text x="457" y="68" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--gold)" letterSpacing="1">24 / 7</text>
                <text x="457" y="83" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="var(--muted)">Scarborough, Brisbane</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.35,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".4"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS — navy background ══ */}
      <div ref={statsRef} style={{ background:"var(--navy)",borderTop:"none" }}>
        {/* Gold top strip */}
        <div style={{ height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l),var(--gold))" }}/>
        <div className="stat-grid">
          {[
            { n:"35+",    l:"Years Experience"      },
            { n:"North",  l:"Side Specialists"      },
            { n:"Res+",   l:"Commercial Work"       },
            { n:"24/7",   l:"Always Available"      },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--gold-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(255,255,255,.4)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Gold bottom strip */}
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--gold),transparent)",opacity:.6 }}/>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--gold)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>What We Do</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              PLUMBING SERVICES<br/><span style={{ color:"var(--gold)" }}>NORTH BRISBANE</span>
            </h2>
            <div style={{ width:60,height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",marginTop:16,borderRadius:2 }}/>
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
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--gold)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Our Work</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              THE TEAM &amp;<br/><span style={{ color:"var(--gold)" }}>RECENT JOBS</span>
            </h2>
            <div style={{ width:60,height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",marginTop:16,borderRadius:2 }}/>
          </div>

          <div ref={galleryRef} className="gallery-grid">

            {/* Card 1 — Team + fleet (main hero shot) */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#c8dce8"/>
                {/* Sky with QLD blue */}
                <rect width="520" height="160" fill="#87CEEB" opacity=".75"/>
                {/* Clouds */}
                <ellipse cx="100" cy="35" rx="55" ry="22" fill="rgba(255,255,255,.8)"/>
                <ellipse cx="72" cy="42" rx="32" ry="17" fill="rgba(255,255,255,.9)"/>
                <ellipse cx="280" cy="28" rx="45" ry="18" fill="rgba(255,255,255,.7)"/>
                <ellipse cx="420" cy="38" rx="40" ry="16" fill="rgba(255,255,255,.7)"/>
                {/* Palm trees */}
                {[380,420,460].map(x => (
                  <g key={x}>
                    <rect x={x} y="90" width="8" height="70" fill="#5a4020" style={{ transform:`rotate(${(x-420)*0.05}deg)`,transformOrigin:`${x+4}px 160px` }}/>
                    {[[-28,-22],[0,-28],[28,-22],[-22,-8],[22,-8]].map(([dx,dy],j) => (
                      <ellipse key={j} cx={x+4+dx} cy={90+dy} rx="22" ry="7" fill="#2d7a1a" opacity=".85"
                        style={{ transform:`rotate(${dx*4}deg)`,transformOrigin:`${x+4}px 90px` }}/>
                    ))}
                  </g>
                ))}
                {/* Green lawn */}
                <rect x="0" y="200" width="520" height="80" fill="#4a7a2a" opacity=".6"/>
                <rect x="0" y="205" width="520" height="75" fill="#3a6a1a" opacity=".35"/>

                {/* Fleet vans — 2 white vans with pipe racks */}
                {[30,195].map((vx,vi) => (
                  <g key={vx}>
                    <rect x={vx} y="125" width="155" height="80" rx="3" fill="#f0f5fc" stroke="rgba(27,58,107,.3)" strokeWidth="1.5"/>
                    <rect x={vx} y="112" width="155" height="15" rx="3" fill="#e5edf8" stroke="rgba(27,58,107,.2)" strokeWidth="1"/>
                    <rect x={vx+10} y="108" width="130" height="6" rx="1" fill="#b8c8e0"/>
                    {[vx+25,vx+55,vx+85,vx+110].map(rx => <rect key={rx} x={rx} y="104" width="3" height="8" rx="1" fill="#a8b8d0"/>)}
                    <rect x={vx} y="190" width="155" height="12" fill="var(--navy)" opacity=".8"/>
                    <rect x={vx} y="186" width="155" height="5" fill="var(--gold)" opacity=".7"/>
                    <text x={vx+78} y="199" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="rgba(255,255,255,.85)" letterSpacing="1">ALLCOME PLUMBING</text>
                    {/* Headlight (right side of van) */}
                    <rect x={vx+148} y="118" width="9" height="7" rx="2" fill="rgba(255,240,150,.7)"/>
                    {/* Wheels */}
                    {[vx+30,vx+120].map(wx => (
                      <g key={wx} transform={`translate(${wx},206)`}>
                        <circle cx="0" cy="0" r="18" fill="#1a1a1a" stroke="rgba(180,190,210,.4)" strokeWidth="2"/>
                        <circle cx="0" cy="0" r="11" fill="#222"/>
                        <circle cx="0" cy="0" r="3.5" fill="#888"/>
                        {SPOKES_SM.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(180,190,210,.5)" strokeWidth="1.5" strokeLinecap="round"/>)}
                      </g>
                    ))}
                  </g>
                ))}

                {/* Team of 6 in navy — silhouettes */}
                {[360,390,415,440,465,490].map((px,i) => (
                  <g key={px}>
                    {/* Body */}
                    <rect x={px-8} y="170" width="16" height="28" rx="2" fill="#1B3A6B" opacity=".9"/>
                    {/* Head */}
                    <circle cx={px} cy="165" r="9" fill="#c8a078"/>
                    {/* Sunglasses hint */}
                    {i % 2 === 0 && <rect x={px-6} y="163" width="12" height="3" rx="1.5" fill="rgba(0,0,0,.4)"/>}
                    {/* Arms */}
                    <rect x={px-14} y="172" width="6" height="18" rx="2" fill="#1B3A6B" opacity=".8"/>
                    <rect x={px+8} y="172" width="6" height="18" rx="2" fill="#1B3A6B" opacity=".8"/>
                    {/* Legs */}
                    <rect x={px-7} y="198" width="6" height="14" rx="1" fill="#3a3020"/>
                    <rect x={px+1} y="198" width="6" height="14" rx="1" fill="#3a3020"/>
                    {/* Boots */}
                    <rect x={px-8} y="210" width="8" height="5" rx="1" fill="#4a3828"/>
                    <rect x={px} y="210" width="8" height="5" rx="1" fill="#4a3828"/>
                  </g>
                ))}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(27,43,94,.88),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>THE ALLCOME TEAM</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,184,75,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Scarborough, North Brisbane · Full fleet on the road</div>
              </div>
            </div>

            {/* Card 2 — Workshop/pipes */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#e8eef8"/>
                {/* Workshop wall */}
                <rect width="240" height="280" fill="#eef3f8"/>
                {/* Pipe rack on wall */}
                <rect x="10" y="40" width="220" height="8" rx="2" fill="#b8c8e0" stroke="rgba(27,58,107,.15)" strokeWidth="1"/>
                {/* Pipes on rack */}
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x={18} y={30-i*2} width={200} height={6} rx={3}
                    fill={`hsl(210,${30+i*5}%,${55+i*5}%)`} opacity={.7-i*.1}/>
                ))}
                {/* Support brackets */}
                {[30,80,130,180,210].map(x => <rect key={x} x={x} y="35" width="4" height="20" rx="1" fill="#8898b8"/>)}
                {/* Fittings shelf */}
                <rect x="10" y="110" width="220" height="6" rx="2" fill="#b8c8e0"/>
                {/* Various fittings */}
                {[[20,95,'#8898b8'],[40,92,'#7888a8'],[60,93,'#c8952a'],[80,90,'#8898b8'],[100,95,'#7888a8']].map(([fx,fy,fc])=>(
                  <g key={`${fx}`}>
                    <circle cx={Number(fx)+8} cy={Number(fy)} r="9" fill={String(fc)} opacity=".8" stroke="rgba(0,0,0,.1)" strokeWidth="1"/>
                    <circle cx={Number(fx)+8} cy={Number(fy)} r="5" fill="rgba(0,0,0,.1)"/>
                  </g>
                ))}
                {/* Van outside window */}
                <rect x="140" y="80" width="80" height="40" rx="3" fill="rgba(27,58,107,.1)" stroke="rgba(27,58,107,.2)" strokeWidth="1"/>
                <rect x="152" y="89" width="56" height="22" rx="2" fill="rgba(240,245,252,.4)"/>
                <rect x="145" y="75" width="75" height="8" fill="var(--navy)" opacity=".5"/>
                <text x="182" y="81" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="6" fill="rgba(255,255,255,.7)" letterSpacing="1">ALLCOME</text>
                {/* Tool belt */}
                <rect x="20" y="155" width="100" height="12" rx="3" fill="#5a4020" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                {[[30,148],[55,146],[75,148],[95,145]].map(([tx,ty])=>(
                  <rect key={`${tx}`} x={tx} y={ty} width="14" height="10" rx="2" fill="#8a6030" stroke="rgba(0,0,0,.1)" strokeWidth="1"/>
                ))}
                {/* Spanner */}
                <rect x="20" y="185" width="80" height="8" rx="4" fill="#999" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <circle cx="24" cy="189" r="8" fill="none" stroke="#999" strokeWidth="3"/>
                <circle cx="96" cy="189" r="6" fill="none" stroke="#999" strokeWidth="3"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.88),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>FULLY EQUIPPED</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,184,75,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>All fittings & parts on hand</div>
              </div>
            </div>

            {/* Card 3 — Maintenance / leaking tap repair */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#eef3f8"/>
                {/* Bathroom tiles */}
                {Array.from({length:8},(_,r)=>Array.from({length:5},(_,c)=>(
                  <rect key={`${r}-${c}`} x={c*40} y={r*27} width="39" height="26" rx="0"
                    fill={`hsl(210,${20+r}%,${90+c}%)`} stroke="rgba(27,58,107,.06)" strokeWidth="1"/>
                )))}
                {/* Tap/mixer on wall */}
                <rect x="82" y="60" width="36" height="50" rx="4" fill="#c8c8c8" stroke="rgba(0,0,0,.1)" strokeWidth="1.5"/>
                <rect x="78" y="72" width="44" height="8" rx="4" fill="#b8b8b8"/>
                <rect x="70" y="72" width="12" height="4" rx="2" fill="#a8b8c8"/>
                <rect x="118" y="72" width="12" height="4" rx="2" fill="#a8b8c8"/>
                {/* Spout */}
                <rect x="96" y="110" width="8" height="18" rx="4" fill="#b8b8b8" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                {/* Dripping water */}
                <ellipse cx="100" cy="132" rx="3" ry="4" fill="rgba(0,150,210,.55)" opacity=".8"/>
                <ellipse cx="100" cy="140" rx="2" ry="2.5" fill="rgba(0,150,210,.4)"/>
                {/* Water on basin */}
                <ellipse cx="100" cy="175" rx="18" ry="6" fill="rgba(0,150,210,.15)"/>
                {/* Basin */}
                <path d="M50,155 Q50,175 100,178 Q150,175 150,155 L145,145 L55,145Z" fill="#e0e8f0" stroke="rgba(27,58,107,.12)" strokeWidth="1.5"/>
                {/* Plumber hand with wrench */}
                <rect x="138" y="65" width="8" height="24" rx="3" fill="#c8a078"/>
                <rect x="134" y="55" width="18" height="8" rx="3" fill="#888" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <circle cx="134" cy="59" r="6" fill="none" stroke="#888" strokeWidth="2.5"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.88),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>MAINTENANCE</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,184,75,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Leaks, repairs & servicing</div>
              </div>
            </div>

            {/* Card 4 — Hot water / commercial */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#e8eef8"/>
                <rect width="200" height="210" fill="#eef3f8"/>
                {/* Large commercial HWS */}
                <ellipse cx="100" cy="45" rx="48" ry="13" fill="#b8c8d8" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                <rect x="52" y="45" width="96" height="130" fill="#d0dce8" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <ellipse cx="100" cy="175" rx="48" ry="13" fill="#b0c0d0" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                {/* Insulation wrap */}
                <rect x="52" y="80" width="96" height="55" fill="rgba(27,58,107,.1)" stroke="rgba(27,58,107,.15)" strokeWidth="1"/>
                <text x="100" y="108" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(27,58,107,.6)" letterSpacing="1">315L SYSTEM</text>
                {/* Allcome label plate */}
                <rect x="68" y="56" width="64" height="18" rx="2" fill="var(--navy)" stroke="rgba(200,149,42,.5)" strokeWidth="1"/>
                <text x="100" y="68" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8.5" fill="#fff" letterSpacing=".5">ALLCOME PTY LTD</text>
                {/* Pipes */}
                <path d="M100,175 Q100,188 80,192 Q62,196 48,194" fill="none" stroke="#9aabad" strokeWidth="9" strokeLinecap="round"/>
                <path d="M100,175 Q100,190 118,194 Q140,198 158,196" fill="none" stroke="#9aabad" strokeWidth="9" strokeLinecap="round"/>
                <rect x="94" y="22" width="12" height="28" fill="#9aabad"/>
                {/* PRV valve */}
                <rect x="148" y="118" width="18" height="28" rx="3" fill="rgba(200,40,40,.4)" stroke="rgba(200,40,40,.25)" strokeWidth="1"/>
                <rect x="152" y="128" width="10" height="14" rx="1" fill="rgba(200,40,40,.55)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.88),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>HOT WATER SYSTEMS</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,184,75,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>All sizes · supply &amp; install</div>
              </div>
            </div>

            {/* Card 5 — Drainage CCTV */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#1a2030"/>
                {/* Dark drainage pipe view — CCTV style */}
                <circle cx="100" cy="105" r="85" fill="#0d1520"/>
                <circle cx="100" cy="105" r="80" fill="#1a2030"/>
                <circle cx="100" cy="105" r="72" fill="none" stroke="rgba(27,58,107,.3)" strokeWidth="2"/>
                {/* Pipe walls */}
                {[0,1,2,3].map(i=>(
                  <circle key={i} cx="100" cy="105" r={65-i*5} fill="none" stroke={`rgba(40,60,90,${.3+i*.1})`} strokeWidth="1.5"/>
                ))}
                {/* Light beam from camera */}
                <circle cx="100" cy="105" r="30" fill="rgba(200,200,200,.04)"/>
                <circle cx="100" cy="105" r="18" fill="rgba(200,200,200,.06)"/>
                {/* Pipe joint */}
                <ellipse cx="100" cy="40" rx="30" ry="6" fill="rgba(40,60,90,.5)" stroke="rgba(27,58,107,.4)" strokeWidth="2"/>
                {/* Blockage debris */}
                <path d="M55,130 Q70,120 85,135 Q95,145 80,155 Q65,160 55,148Z" fill="rgba(80,60,40,.5)"/>
                <path d="M120,140 Q135,130 148,138 Q155,148 140,158 Q125,162 118,152Z" fill="rgba(80,60,40,.4)"/>
                {/* Root intrusion lines */}
                <path d="M20,80 Q50,90 70,110 Q85,128 80,155" fill="none" stroke="rgba(80,100,40,.4)" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M175,70 Q148,88 132,108 Q118,128 122,154" fill="none" stroke="rgba(80,100,40,.35)" strokeWidth="2" strokeLinecap="round"/>
                {/* CCTV overlay text */}
                <text x="100" y="175" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(77,208,225,.6)" letterSpacing="2">● REC</text>
                <text x="30" y="30" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="7" fill="rgba(255,255,255,.3)" letterSpacing="1">ALLCOME CCTV</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(10,14,24,.95),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>DRAINAGE &amp; CCTV</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,184,75,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Camera inspection · jetting</div>
              </div>
            </div>

          </div>

          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            35+ years of quality plumbing across North Brisbane — <a href="mailto:allcomemanager@outlook.com" style={{ color:"var(--navy)",textDecoration:"none",fontWeight:500 }}>get in touch</a> for a free quote
          </p>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--navy)",textAlign:"center",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-l),var(--gold),transparent)" }}/>
        <div className="inner-1100">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(232,184,75,.7)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Where We Work</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            NORTH BRISBANE<br/><span style={{ color:"var(--gold-l)" }}>SERVICE AREAS</span>
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 22px",background:"rgba(255,255,255,.07)",border:"1px solid rgba(200,149,42,.3)",color:"rgba(255,255,255,.85)",fontSize:".9rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:2 }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(255,255,255,.3)",fontSize:".85rem",fontFamily:"'Barlow',sans-serif" }}>
            Based in Scarborough. Servicing all of North Brisbane and surrounding areas.
          </p>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--gold),transparent)",opacity:.5 }}/>
      </section>

      {/* ══ WHY ALLCOME ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--cream2)",borderTop:"1px solid var(--border2)" }}>
        <div className="why-grid">
          {/* Left */}
          <div ref={whyLeftRef} style={{ background:"var(--navy)",padding:"48px 40px",position:"relative",overflow:"hidden",borderRadius:4 }}>
            {/* Gold corner marks */}
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:22,height:22,
                borderTop:i<2?"2.5px solid var(--gold)":undefined,
                borderBottom:i>=2?"2.5px solid var(--gold)":undefined,
                borderLeft:i%2===0?"2.5px solid var(--gold)":undefined,
                borderRight:i%2===1?"2.5px solid var(--gold)":undefined,
              }}/>
            ))}

            {/* Shield emblem large */}
            <div style={{ textAlign:"center",marginBottom:28 }}>
              <svg width="110" height="128" viewBox="0 0 110 128">
                <path d="M55,4 L100,22 L100,70 Q100,105 55,124 Q10,105 10,70 L10,22 Z"
                  fill="rgba(255,255,255,.06)" stroke="rgba(200,149,42,.45)" strokeWidth="2"/>
                {/* Gold inner */}
                <path d="M55,4 L100,22 L10,22 Z" fill="rgba(200,149,42,.25)"/>
                {/* Large A */}
                <text x="55" y="78" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="54" fill="rgba(255,255,255,.9)" letterSpacing="-2">A</text>
                {/* Gold rule */}
                <line x1="28" y1="88" x2="82" y2="88" stroke="var(--gold)" strokeWidth="2.5"/>
                {/* Est. */}
                <text x="55" y="108" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="rgba(200,149,42,.8)" letterSpacing="2">35+ YEARS</text>
              </svg>
            </div>

            <div style={{ textAlign:"center",marginBottom:28 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.4rem",color:"#fff",lineHeight:1 }}>ALLCOME PLUMBING</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".62rem",color:"rgba(200,149,42,.6)",letterSpacing:"3px",textTransform:"uppercase",marginTop:4 }}>PTY LTD</div>
            </div>

            {[
              ["North Side Specialists","The only plumbers you need on the North Side of Brisbane."],
              ["35+ Year Track Record",  "Decades of maintenance experience means we've seen it all and fixed it all."],
              ["Always Open",            "Plumbing emergencies don't keep office hours. We're available 24/7."],
            ].map(([t,d]) => (
              <div key={t as string} style={{ display:"flex",gap:12,marginBottom:16 }}>
                <div style={{ width:22,height:22,background:"rgba(200,149,42,.15)",border:"1px solid rgba(200,149,42,.4)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2,6 L5,9 L10,3" stroke="var(--gold-l)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",fontSize:".9rem",marginBottom:2,textTransform:"uppercase" }}>{t as string}</div>
                  <div style={{ color:"rgba(255,255,255,.4)",fontSize:".8rem",lineHeight:1.65,fontFamily:"'Barlow',sans-serif" }}>{d as string}</div>
                </div>
              </div>
            ))}

            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--gold)",color:"#fff",padding:"12px 20px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px",borderRadius:"4px 0 4px 0" }}>
              FREE<br/>QUOTE
            </div>
          </div>

          {/* Right */}
          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--gold)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Why Choose Allcome</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,marginBottom:12,letterSpacing:"-1px" }}>
              NORTH BRISBANE&apos;S<br/><span style={{ color:"var(--gold)" }}>MOST EXPERIENCED</span><br/>PLUMBERS
            </h2>
            <div style={{ width:60,height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",marginBottom:32,borderRadius:2 }}/>
            {[
              { icon:"🏆", title:"35+ Years Experience",     desc:"Three and a half decades in the trade. We&apos;ve built our reputation on quality work and repeat business across North Brisbane." },
              { icon:"📍", title:"North Side Specialists",   desc:"Scarborough-based, North Brisbane focused. We know the area, the infrastructure and what it takes to get the job done right." },
              { icon:"🚐", title:"Full Fleet on the Road",   desc:"Multiple vans stocked and ready. We can handle multiple jobs simultaneously — commercial contracts and residential alike." },
              { icon:"🕐", title:"Always Available",         desc:"Plumbing emergencies don't wait for business hours. Allcome Plumbing is always open and ready to respond." },
              { icon:"📋", title:"Maintenance Contracts",    desc:"We offer ongoing maintenance contracts for body corporates, commercial properties and large residential complexes." },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div style={{ fontSize:"1.4rem",lineHeight:1,marginTop:2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"var(--navy)",marginBottom:4,fontSize:"1rem",letterSpacing:".5px",textTransform:"uppercase" }}>{item.title}</div>
                  <div style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }} dangerouslySetInnerHTML={{ __html: item.desc }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"linear-gradient(145deg,#eef3fa,#f8fafb,#ecf1f9)",borderTop:"1px solid var(--border2)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-l),var(--gold),transparent)" }}/>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(27,58,107,.06) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--gold)",marginBottom:14,fontWeight:700,textTransform:"uppercase" }}>Contact Us Today</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5.5vw,4rem)",fontWeight:900,color:"var(--navy)",lineHeight:.9,marginBottom:16,letterSpacing:"-1px" }}>
          YOUR NORTH SIDE<br/><span style={{ color:"var(--gold)" }}>PLUMBING SPECIALISTS</span>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:440,margin:"0 auto 36px",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>
          35+ years experience. Always open. Free quotes available across North Brisbane.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:+61413449202" className="btn-gold">📞 0413 449 202</a>
          <a href="mailto:allcomemanager@outlook.com" className="btn-outline">✉️ SEND AN EMAIL</a>
        </div>
        <p style={{ marginTop:16,color:"rgba(15,28,46,.25)",fontSize:".78rem",fontFamily:"'Barlow',sans-serif" }}>
          15 Bunton St, Scarborough Brisbane QLD 4020 · Always open
        </p>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--gold)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get In Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              CONTACT<br/><span style={{ color:"var(--gold)" }}>ALLCOME PLUMBING</span>
            </h2>
            <div style={{ width:60,height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",marginTop:14,borderRadius:2 }}/>
          </div>
          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone",        val:"0413 449 202",                       href:"tel:+61413449202" },
                { icon:"✉️", label:"Email",        val:"allcomemanager@outlook.com",         href:"mailto:allcomemanager@outlook.com" },
                { icon:"📍", label:"Address",      val:"15 Bunton St, Scarborough QLD 4020", href:"https://maps.google.com/?q=15+Bunton+St+Scarborough+QLD+4020" },
                { icon:"🕐", label:"Hours",        val:"Always open — 24/7",                 href:undefined },
                { icon:"🗺️", label:"Service Area", val:"North Brisbane · Redcliffe · Scarborough & surrounds", href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"#fff",border:"1px solid var(--border)",borderRadius:3 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--gold)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"var(--navy)",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--gold)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="var(--navy)")}
                        >{c.val}</a>
                      : <span style={{ color:"var(--navy)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"#fff",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:4,boxShadow:"0 4px 32px rgba(27,58,107,.05)" }}>
              {/* Gold top bar */}
              <div style={{ height:4,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",borderRadius:"4px 4px 0 0",margin:"-36px -32px 24px" }}/>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"var(--navy)",letterSpacing:"1px",marginBottom:24,textTransform:"uppercase" }}>Get a Free Quote</div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith"              },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX"            },
                { label:"Email",       type:"email", ph:"you@example.com"         },
                { label:"Job Type",    type:"text",  ph:"e.g. Blocked drain, hot water, maintenance…" },
                { label:"Suburb",      type:"text",  ph:"e.g. Redcliffe, Brighton…" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(15,28,46,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--navy)",fontSize:".88rem",outline:"none",borderRadius:3,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(27,58,107,.45)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(15,28,46,.38)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Job Details</label>
                <textarea rows={3} placeholder="Tell us about the job — what's happening, location, urgency…"
                  style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--navy)",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:3,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(27,58,107,.45)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-gold" style={{ width:"100%",fontSize:".9rem" }}>📞 REQUEST FREE QUOTE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--navy)",padding:"0 52px 28px" }}>
        {/* Gold top accent */}
        <div style={{ height:4,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-l),var(--gold),transparent)",marginBottom:28 }}/>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:38,height:38,flexShrink:0 }}>
              <svg width="38" height="44" viewBox="0 0 110 128">
                <path d="M55,4 L100,22 L100,70 Q100,105 55,124 Q10,105 10,70 L10,22 Z" fill="rgba(255,255,255,.12)" stroke="rgba(200,149,42,.45)" strokeWidth="2"/>
                <path d="M55,4 L100,22 L10,22 Z" fill="rgba(200,149,42,.2)"/>
                <text x="55" y="78" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="54" fill="rgba(255,255,255,.85)" letterSpacing="-2">A</text>
                <line x1="28" y1="88" x2="82" y2="88" stroke="var(--gold)" strokeWidth="2.5"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".95rem",color:"rgba(255,255,255,.8)",letterSpacing:"1.5px" }}>ALLCOME PLUMBING PTY LTD</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(200,149,42,.55)",letterSpacing:"2px",textTransform:"uppercase" }}>Scarborough · North Brisbane · QLD 4020</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61413449202" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>0413 449 202</a>
            <a href="mailto:allcomemanager@outlook.com" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>allcomemanager@outlook.com</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Allcome Plumbing PTY LTD. QLD, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
