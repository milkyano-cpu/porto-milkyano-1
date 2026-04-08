"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🔧", title: "Truck & Trailer Servicing",     desc: "Full servicing and repairs for all makes and models of trucks and trailers. On-site or at your location across Queensland." },
  { icon: "⚙️", title: "Engine & Gearbox Rebuilds",    desc: "Major component rebuilds including engines, gearboxes and drivetrain components. Done right the first time." },
  { icon: "🖥️", title: "Truck & Car Diagnostics",      desc: "All makes and models diagnostic software. We identify the problem fast and get you back on the road." },
  { icon: "⚡", title: "Electrical Repairs",            desc: "Full electrical fault finding and repair across 4x4s, trucks, trailers and heavy machinery." },
  { icon: "❄️", title: "A/C Services & Repairs",       desc: "Air conditioning servicing and repairs for all heavy vehicles and machinery. Re-gas, leak detection, component replacement." },
  { icon: "🔩", title: "Welding & Fabrication",        desc: "On-site welding and custom fabrication. Structural repairs, custom brackets and emergency breakdown welding." },
  { icon: "📋", title: "Fleet Servicing",               desc: "Ongoing fleet maintenance contracts available. We come to your depot or worksite — keeping your fleet moving." },
  { icon: "🚨", title: "24/7 Breakdown & After Hours", desc: "Fully mobile with a fitted-out service 4x4 operating 24/7. We come to you — fast, efficient, always ready." },
];

const AREAS = [
  "Gympie", "Kingaroy", "Nanango", "Woolooga",
  "Sunshine Coast", "Kilkivan", "Curra", "Maryborough",
];

// Pre-computed spoke angles — no SSR mismatch
const SPOKE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
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
const SPOKES_SM = makeSpokes(5, 13);
const SPOKES_LG = makeSpokes(6, 16);
const GEAR_TEETH = Array.from({ length: 12 }, (_, i) => i);
const fix = (n: number) => Number(n.toFixed(4));

export default function HeavyHaulDiesel() {
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
    <div style={{ background:"#0D0D0D", color:"#f0f0f0", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --black:   #0D0D0D;
          --dark:    #141414;
          --dark2:   #1C1C1C;
          --dark3:   #252525;
          --dark4:   #2E2E2E;
          --yellow:  #F5C300;
          --yellow-l:#FFD740;
          --yellow-d:#D4A800;
          --white:   #ffffff;
          --offwhite:#F2F2F2;
          --border:  rgba(255,255,255,0.08);
          --border2: rgba(255,255,255,0.05);
          --muted:   rgba(240,240,240,0.45);
          --glow:    rgba(245,195,0,0.18);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer     { 0%{left:-100%} 100%{left:200%} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes gear-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes gear-spin-r { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        /* ── Excavator arm swing ── */
        @keyframes arm-swing {
          0%,100% { transform: rotate(0deg); }
          40%     { transform: rotate(-12deg); }
          70%     { transform: rotate(8deg); }
        }
        @keyframes bucket-tilt {
          0%,100% { transform: rotate(0deg); }
          40%     { transform: rotate(18deg); }
          70%     { transform: rotate(-10deg); }
        }
        /* ── Excavator drive-in ── */
        @keyframes exc-enter {
          0%   { transform: translateX(150%); opacity:0; }
          45%  { transform: translateX(0%);   opacity:1; }
          100% { transform: translateX(0%);   opacity:1; }
        }
        @keyframes exc-idle {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }
        /* ── 4x4 service truck enter (slightly behind) ── */
        @keyframes truck-enter {
          0%,25% { transform: translateX(200%); opacity:0; }
          72%    { transform: translateX(68px);  opacity:1; }
          100%   { transform: translateX(68px);  opacity:1; }
        }
      @keyframes truck-idle {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-2px); }
}
        @keyframes track-move {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        @keyframes road-move {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -60; }
        }
        @keyframes dust-out {
          0%   { opacity:0; transform:translate(0,0) scale(.5); }
          20%  { opacity:.22; }
          65%  { opacity:.07; transform:translate(-20px,-12px) scale(2); }
          100% { opacity:0; transform:translate(-34px,-22px) scale(2.8); }
        }

        .exc-scene   { animation: exc-enter   2.4s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .exc-body    { animation: exc-idle     3.5s ease-in-out 2.6s infinite; }
        .exc-arm     { transform-origin: 60px 60px; animation: arm-swing   4s ease-in-out 3s infinite; }
        .exc-bucket  { transform-origin: 20px 0px;  animation: bucket-tilt 4s ease-in-out 3s infinite; }
       .truck-scene {
  animation: truck-enter 3s cubic-bezier(0.22,0.61,0.36,1) 0.3s forwards;
}

        .truck-body {
  animation: truck-idle 3.8s ease-in-out 3.5s infinite;
}
        .wheel-spin  { animation: gear-spin    0.45s linear 0s 5, gear-spin 3.8s linear 2.8s infinite; }
        .wheel-spin2 { animation: gear-spin    0.45s linear 0.3s 5, gear-spin 3.8s linear 3.6s infinite; }
        .track-anim  { stroke-dasharray:30 15; animation: track-move .5s linear 0s 5, track-move 3.5s linear 2.6s infinite; }
        .road-anim   { stroke-dasharray:40 20; animation: road-move .5s linear 0s 5, road-move 4s linear 2.8s infinite; }
        .dust-puff   { animation: dust-out 0.9s ease-out infinite; }
        .gear-spin-a { animation: gear-spin   6s linear infinite; }
        .gear-spin-b { animation: gear-spin-r 4s linear infinite; }

        .nav-link { color:rgba(240,240,240,.45); text-decoration:none; font-size:.85rem; letter-spacing:.5px; transition:color .25s; font-weight:500; font-family:'Barlow',sans-serif; }
        .nav-link:hover { color:#fff; }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:#fff; color:#0D0D0D;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-primary:hover { background:#F2F2F2; transform:translateY(-2px); box-shadow:0 12px 36px rgba(255,255,255,.12); }

        .btn-yellow {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--yellow); color:#0D0D0D;
          font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; border:none; cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-yellow:hover { background:var(--yellow-l); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:#fff;
          border:1.5px solid rgba(255,255,255,.35); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer;
          transition:all .3s; text-decoration:none; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.6); transform:translateY(-2px); }

        .svc-card {
          background:var(--dark2); border:1px solid var(--border);
          padding:30px 26px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .3s, box-shadow .3s;
          transform-style:preserve-3d;
        }
        .svc-card:hover { border-color:rgba(245,195,0,.4); transform:translateY(-4px); box-shadow:0 16px 48px rgba(245,195,0,.07); }
        .svc-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--yellow),var(--yellow-l));
          transform:scaleX(0); transform-origin:left; transition:transform .35s;
        }
        .svc-card:hover::before { transform:scaleX(1); }
        .svc-card::after {
          content:''; position:absolute; top:0; height:100%; width:40%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent);
          left:-100%; pointer-events:none;
        }
        .svc-card:hover::after { animation:shimmer .5s ease; }

        .stat-item { text-align:center; padding:30px 16px; border-left:1px solid rgba(255,255,255,.08); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid var(--border2); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:3px; border:1px solid var(--border); cursor:pointer; transition:transform .3s, box-shadow .3s; background:var(--dark2); position:relative; }
        .gal-item:hover { transform:scale(1.02); box-shadow:0 12px 40px rgba(245,195,0,.1); }
        .info-card { transition:border-color .25s, box-shadow .25s; }
        .info-card:hover { border-color:rgba(245,195,0,.4) !important; box-shadow:0 4px 20px rgba(245,195,0,.06); }

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
          .stat-item    { border-left:none !important; border-bottom:1px solid rgba(255,255,255,.08); }
          .stat-item:nth-child(2n)        { border-left:1px solid rgba(255,255,255,.08) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num     { font-size:2.2rem; }
          .svc-grid     { grid-template-columns:1fr; }
          .why-grid     { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-grid { grid-template-columns:1fr; }
          .footer-row   { flex-direction:column; align-items:flex-start; }
          .cta-btns     { flex-direction:column; }
          .btn-primary,.btn-yellow,.btn-outline { width:100%; }
          .gallery-grid { grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1) { grid-column:1/3; height:180px; }
          .gal-item:nth-child(n) { grid-column:auto; height:150px; }
        }

        input::placeholder, textarea::placeholder { color:rgba(240,240,240,.2); }
        input, textarea { -webkit-appearance:none; }
        ::selection { background:rgba(245,195,0,.2); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(13,13,13,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.2rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:+61438694774" className="btn-yellow" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0438 694 774</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(13,13,13,.96)" : "linear-gradient(180deg,rgba(13,13,13,.88) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo — gear badge */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48"
                style={{ filter:"drop-shadow(0 2px 8px rgba(245,195,0,0.25))" }}>
                {/* Outer gear ring */}
                <circle cx="24" cy="24" r="22" fill="#1A1A1A" stroke="rgba(245,195,0,.55)" strokeWidth="1.5"/>
                {/* Gear teeth */}
                {GEAR_TEETH.map(i => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 24 + Math.cos(angle) * 19;
                  const y1 = 24 + Math.sin(angle) * 19;
                  const x2 = 24 + Math.cos(angle) * 23;
                  const y2 = 24 + Math.sin(angle) * 23;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(245,195,0,.6)" strokeWidth="3.5" strokeLinecap="square"/>;
                })}
                {/* Inner circle */}
                <circle cx="24" cy="24" r="14" fill="#0D0D0D" stroke="rgba(245,195,0,.3)" strokeWidth="1"/>
                {/* H letter */}
                <text x="24" y="29" textAnchor="middle"
                  fontFamily="Barlow Condensed,sans-serif" fontWeight="900"
                  fontSize="16" fill="#F5C300" letterSpacing="-1">H</text>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".95rem",color:"#fff",letterSpacing:"1.5px",lineHeight:1 }}>HEAVY HAUL DIESEL</div>
              <div style={{ fontSize:".58rem",color:"var(--yellow)",letterSpacing:"2.5px",lineHeight:1.5,fontFamily:"'Barlow',sans-serif",fontWeight:600,textTransform:"uppercase" }}>Contracting · Mobile Mechanic</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:+61438694774" className="btn-yellow desktop-cta" style={{ fontSize:".78rem",padding:"9px 20px" }}>📞 0438 694 774</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(145deg,#0D0D0D 0%,#141414 50%,#111 100%)" }}>
        {/* Grid texture */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none" }}/>
        {/* Yellow bottom accent */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--yellow),var(--yellow-l),var(--yellow),transparent)",opacity:.7 }}/>
        {/* Yellow glow top right */}
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,background:"radial-gradient(ellipse,rgba(245,195,0,.05) 0%,transparent 65%)",pointerEvents:"none" }}/>
        {/* Corner cut */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 320px 320px 0",borderColor:`transparent rgba(245,195,0,.03) transparent transparent`,pointerEvents:"none" }}/>

        <div className="hero-inner">
          {/* Text */}
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,195,0,.08)",border:"1px solid rgba(245,195,0,.3)",padding:"6px 16px",borderRadius:2,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--yellow)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--yellow)",fontWeight:700,textTransform:"uppercase" }}>Mobile Heavy Diesel Mechanic · Queensland</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                HEAVY HAUL<br/>
                <span style={{ color:"var(--yellow)" }}>DIESEL</span><br/>
                CONTRACTING
              </h1>
            </div>

            {/* Yellow rule */}
            <div style={{ width:80,height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",marginTop:16,marginBottom:20,borderRadius:2 }}/>

            <p ref={heroSubRef} style={{ fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:480,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              Fully mobile with a fitted-out service 4x4 operating 24/7. We come to you — fast, efficient and ready to get you back on the road. All makes and models of trucks, trailers and heavy machinery.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:+61438694774" className="btn-yellow">📞 0438 694 774</a>
              <a href="#services" className="btn-outline">OUR SERVICES</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:28,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0438 694 774",            href:"tel:+61438694774" },
                { icon:"✉️", val:"heavyhauldiesel@gmail.com", href:"mailto:heavyhauldiesel@gmail.com" },
              ].map(c => (
                <a key={c.val} href={c.href}
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                >
                  <span>{c.icon}</span><span>{c.val}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Excavator + service 4x4 scene */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 6px 32px rgba(0,0,0,0.5))" }}>

              {/* ── GROUND / DIRT SITE ── */}
              <rect x="0" y="270" width="540" height="70" fill="#2a2010"/>
              {/* Ground texture lines */}
              <line x1="0" y1="272" x2="540" y2="272" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
              {/* Dirt road marks */}
              <line x1="0" y1="300" x2="540" y2="300"
                stroke="rgba(180,140,60,.15)" strokeWidth="2"
                className="road-anim"
              />
              {/* Tyre tracks */}
              <rect x="0" y="285" width="540" height="8" fill="rgba(0,0,0,.2)"/>

              {/* Dust puffs */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={55} cy={272}
                  rx={6+i*4} ry={3+i*2}
                  fill="rgba(180,140,60,.12)"
                  className="dust-puff"
                  style={{ animationDelay:`${i*0.3}s`, animationDuration:"0.9s", animationIterationCount:"6" }}
                />
              ))}

              {/* ── BACKGROUND: Service 4x4 (behind, enters slightly later) ── */}
              <g className="truck-scene" style={{ opacity:0.85 }}>
                <g className="truck-body">
                  {/* 4x4 truck body */}
                  <rect x="18" y="210" width="295" height="62" rx="4" fill="#1E1E1E" stroke="rgba(255,255,255,.15)" strokeWidth="1.2"/>
                  {/* Roof */}
                  <rect x="28" y="197" width="280" height="15" rx="3" fill="#181818" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                  {/* Cab */}
                  <path d="M268,197 L268,178 Q268,170 275,170 L318,170 Q328,170 336,178 L355,197Z"
                    fill="#181818" stroke="rgba(255,255,255,.12)" strokeWidth="1.2"/>
                  <path d="M278,174 L278,197 L355,197 L336,178 Z" fill="rgba(245,195,0,.06)" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                  {/* Roo bar / bull bar */}
                  <rect x="345" y="215" width="16" height="45" rx="2" fill="#2a2a2a" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                  <rect x="343" y="218" width="4" height="38" rx="1" fill="#333"/>
                  {/* Equipment on tray */}
                  <rect x="30" y="200" width="90" height="12" rx="2" fill="#252525" stroke="rgba(245,195,0,.2)" strokeWidth="1"/>
                  <rect x="40" y="195" width="6" height="10" rx="1" fill="#333"/>
                  <rect x="60" y="195" width="6" height="10" rx="1" fill="#333"/>
                  <rect x="80" y="195" width="6" height="10" rx="1" fill="#333"/>
                  {/* Yellow stripe */}
                  <rect x="18" y="248" width="340" height="11" fill="rgba(245,195,0,.6)"/>
                  {/* Branding */}
                  <text x="120" y="257" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="rgba(13,13,13,.9)" letterSpacing="1.5">HEAVY HAUL DIESEL</text>
                  {/* Headlight */}
                  <rect x="348" y="185" width="9" height="7" rx="2" fill="rgba(255,240,150,.75)"/>
                  {/* Wheels */}
                  {[72, 268].map(wx => (
                    <g key={wx} transform={`translate(${wx},272)`}>
                      <circle cx="0" cy="0" r="19" fill="#111" stroke="rgba(245,195,0,.3)" strokeWidth="1.5"/>
                      <circle cx="0" cy="0" r="12" fill="#1a1a1a"/>
                      <circle cx="0" cy="0" r="3.5" fill="#555"/>
                      <g className="wheel-spin2">
                        {SPOKES_SM.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(200,180,80,.45)" strokeWidth="1.8" strokeLinecap="round"/>)}
                      </g>
                    </g>
                  ))}
                </g>
              </g>

              {/* ── MAIN: Excavator (foreground) ── */}
              <g className="exc-scene">
                <g className="exc-body">

                  {/* ── UNDERCARRIAGE / TRACKS ── */}
                  {/* Left track */}
                  <rect x="30" y="238" width="230" height="36" rx="8" fill="#1a1a1a" stroke="rgba(245,195,0,.25)" strokeWidth="2"/>
                  {/* Track links */}
                  <rect x="32" y="240" width="226" height="32" rx="6" fill="none" stroke="rgba(245,195,0,.12)" strokeWidth="1"
                    strokeDasharray="28 4" className="track-anim"/>
                  {/* Track rollers */}
                  {[65,110,155,200,235].map(rx => (
                    <circle key={rx} cx={rx} cy={256} r="10" fill="#111" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
                  ))}
                  {/* Drive sprocket front */}
                  <circle cx="248" cy="256" r="16" fill="#1E1E1E" stroke="rgba(245,195,0,.35)" strokeWidth="2"/>
                  {SPOKES_SM.slice(0,6).map((s,i) => (
                    <line key={i}
                      x1={248 + s.x1 * 0.8} y1={256 + s.y1 * 0.8}
                      x2={248 + s.x2} y2={256 + s.y2}
                      stroke="rgba(245,195,0,.4)" strokeWidth="2.5" strokeLinecap="round"/>
                  ))}
                  {/* Idler rear */}
                  <circle cx="40" cy="256" r="14" fill="#1E1E1E" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>

                  {/* ── UPPER BODY / HOUSE ── */}
                  <rect x="50" y="170" width="260" height="72" rx="6" fill="#1C1C1C" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                  {/* Cab */}
                  <rect x="175" y="140" width="130" height="68" rx="4" fill="#181818" stroke="rgba(245,195,0,.25)" strokeWidth="1.5"/>
                  {/* Cab windows */}
                  <rect x="184" y="148" width="55" height="36" rx="3" fill="rgba(245,195,0,.07)" stroke="rgba(245,195,0,.2)" strokeWidth="1"/>
                  <line x1="200" y1="148" x2="200" y2="184" stroke="rgba(245,195,0,.1)" strokeWidth="1"/>
                  {/* Cab glass reflection */}
                  <line x1="188" y1="152" x2="200" y2="164" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Engine covers */}
                  <rect x="58" y="178" width="108" height="56" rx="3" fill="#222" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                  {[70,90,110,130].map(x => <rect key={x} x={x} y="182" width="3" height="48" rx="1" fill="rgba(255,255,255,.04)"/>)}
                  {/* Exhaust pipe */}
                  <rect x="62" y="158" width="8" height="24" rx="4" fill="#2a2a2a" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                  {/* Exhaust smoke hint */}
                  <ellipse cx="66" cy="154" rx="4" ry="3" fill="rgba(255,255,255,.04)"/>
                  <ellipse cx="68" cy="149" rx="3" ry="2" fill="rgba(255,255,255,.03)"/>
                  {/* Counterweight at rear */}
                  <rect x="52" y="200" width="40" height="38" rx="3" fill="#252525" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                  {/* Yellow stripe on body */}
                  <rect x="50" y="228" width="260" height="10" fill="rgba(245,195,0,.55)"/>
                  {/* Branding on body */}
                  <text x="145" y="236" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="8" fill="rgba(13,13,13,.9)" letterSpacing="1.5">HEAVY HAUL DIESEL</text>

                  {/* ── BOOM ARM ── */}
                  <g className="exc-arm">
                    {/* Boom (main arm) */}
                    <path d="M280 185 Q340 150 390 130 Q420 120 440 118"
                      fill="none" stroke="#F5C300" strokeWidth="18" strokeLinecap="round"/>
                    <path d="M280 185 Q340 150 390 130 Q420 120 440 118"
                      fill="none" stroke="#D4A800" strokeWidth="14" strokeLinecap="round"/>
                    <path d="M280 185 Q340 150 390 130 Q420 120 440 118"
                      fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="4" strokeLinecap="round"/>
                    {/* Boom cylinder */}
                    <path d="M295 200 Q340 165 370 145"
                      fill="none" stroke="#333" strokeWidth="7" strokeLinecap="round"/>
                    <path d="M295 200 Q340 165 370 145"
                      fill="none" stroke="#555" strokeWidth="4" strokeLinecap="round"/>

                    {/* Stick (second arm) */}
                    <g className="exc-bucket">
                      <path d="M440 118 Q460 140 468 168 Q472 185 470 200"
                        fill="none" stroke="#F5C300" strokeWidth="14" strokeLinecap="round"/>
                      <path d="M440 118 Q460 140 468 168 Q472 185 470 200"
                        fill="none" stroke="#D4A800" strokeWidth="10" strokeLinecap="round"/>
                      {/* Stick cylinder */}
                      <path d="M450 118 Q468 145 468 172"
                        fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round"/>
                      <path d="M450 118 Q468 145 468 172"
                        fill="none" stroke="#555" strokeWidth="3.5" strokeLinecap="round"/>
                      {/* Bucket */}
                      <path d="M462 198 Q468 210 478 220 Q490 235 498 225 Q510 215 504 200 Q498 185 486 185 Q472 185 462 198Z"
                        fill="#F5C300" stroke="#D4A800" strokeWidth="2"/>
                      {/* Bucket teeth */}
                      {[474,483,492].map(tx => (
                        <path key={tx} d={`M${tx} 228 L${tx-2} 238 L${tx+3} 236Z`} fill="#D4A800"/>
                      ))}
                      {/* Bucket curl highlight */}
                      <path d="M464 200 Q468 212 476 220" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" strokeLinecap="round"/>
                    </g>
                  </g>

                </g>
              </g>

              {/* Ground shadow */}
              <ellipse cx="270" cy="336" rx="260" ry="6" fill="rgba(0,0,0,.3)"/>

              {/* Floating badge — Mobile 24/7 */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.6s infinite" }}>
                <rect x="10" y="22" width="138" height="72" rx="3" fill="#1A1A1A"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}/>
                <rect x="10" y="22" width="138" height="5" rx="3" fill="var(--yellow)"/>
                <rect x="10" y="24" width="138" height="3" rx="0" fill="var(--yellow)"/>
                <text x="79" y="50" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="20" fill="#F5C300">24 / 7</text>
                <text x="79" y="64" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(255,255,255,.65)" letterSpacing="1.5">MOBILE MECHANIC</text>
                <text x="79" y="87" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="rgba(255,255,255,.3)">We come to you · QLD</text>
              </g>

              {/* Floating badge — Fully Mobile */}
              <g style={{ animation:"float-badge 3.5s ease-in-out 1.8s infinite" }}>
                <rect x="386" y="22" width="140" height="68" rx="3" fill="#1A1A1A" stroke="rgba(245,195,0,.25)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.4))" }}/>
                <rect x="386" y="22" width="140" height="5" rx="3" fill="rgba(245,195,0,.7)"/>
                <text x="456" y="48" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="12" fill="#fff" letterSpacing="1">FULLY MOBILE</text>
                <text x="456" y="63" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--yellow)" letterSpacing="1">SERVICE 4X4</text>
                <text x="456" y="80" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8" fill="var(--muted)">Emergency breakdown ready</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.3,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(245,195,0,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS — dark background ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)" }}>
        {/* Yellow top strip */}
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--yellow),var(--yellow-l),var(--yellow),transparent)" }}/>
        <div className="stat-grid">
          {[
            { n:"24/7",  l:"Emergency Breakdown"  },
            { n:"QLD",   l:"Wide Service Areas"   },
            { n:"All",   l:"Makes & Models"       },
            { n:"100%",  l:"Mobile Operation"     },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--yellow-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(240,240,240,.3)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height:2,background:"linear-gradient(90deg,transparent,var(--yellow),transparent)",opacity:.5 }}/>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--black)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--yellow)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>What We Do</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              DIESEL MECHANIC<br/><span style={{ color:"var(--yellow)" }}>SERVICES</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",marginTop:16,borderRadius:2 }}/>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2rem",marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.15rem",fontWeight:700,color:"#fff",marginBottom:10,letterSpacing:"1px",textTransform:"uppercase" }}>{s.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:".88rem",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="work" className="section-pad" style={{ background:"var(--dark)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--yellow)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Our Work</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              THE RIG &amp;<br/><span style={{ color:"var(--yellow)" }}>RECENT JOBS</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",marginTop:16,borderRadius:2 }}/>
          </div>

          <div ref={galleryRef} className="gallery-grid">

            {/* Card 1 — Site excavator job */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#1a1208"/>
                {/* Sky */}
                <rect width="520" height="140" fill="#3a3020" opacity=".6"/>
                {/* Clouds — dusty QLD */}
                <ellipse cx="120" cy="40" rx="70" ry="25" fill="rgba(200,180,120,.15)"/>
                <ellipse cx="300" cy="30" rx="55" ry="20" fill="rgba(200,180,120,.12)"/>
                <ellipse cx="430" cy="45" rx="50" ry="18" fill="rgba(200,180,120,.1)"/>
                {/* Trees */}
                {[380,420,460,490].map(x => (
                  <g key={x}>
                    <rect x={x} y="100" width="6" height="55" fill="#3a2a10"/>
                    {[[-20,-18],[0,-24],[20,-18],[-16,-6],[16,-6]].map(([dx,dy],j) => (
                      <ellipse key={j} cx={x+3+dx} cy={100+dy} rx="18" ry="6" fill="#2a4a1a" opacity=".75"/>
                    ))}
                  </g>
                ))}
                {/* Dirt site */}
                <rect x="0" y="185" width="520" height="95" fill="#3a2810"/>
                <rect x="0" y="188" width="520" height="92" fill="#2a1e0a" opacity=".4"/>
                {/* Tyre track marks */}
                {[0,1].map(i => (
                  <rect key={i} x={90+i*260} y="220" width="40" height="55" rx="4" fill="rgba(0,0,0,.2)"/>
                ))}

                {/* Large excavator SVG illustration */}
                {/* Tracks */}
                <rect x="60" y="210" width="210" height="30" rx="7" fill="#111" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                {[85,115,145,175,205,240].map(rx => <circle key={rx} cx={rx} cy={225} r="8" fill="#1a1a1a"/>)}
                {/* Body */}
                <rect x="75" y="170" width="185" height="44" rx="4" fill="#1C1C1C" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                {/* Cab */}
                <rect x="190" y="146" width="68" height="42" rx="3" fill="#181818" stroke="rgba(245,195,0,.2)" strokeWidth="1"/>
                <rect x="198" y="152" width="38" height="24" rx="2" fill="rgba(245,195,0,.07)" stroke="rgba(245,195,0,.18)" strokeWidth="1"/>
                {/* Stripe */}
                <rect x="75" y="202" width="185" height="9" fill="rgba(245,195,0,.55)"/>
                {/* Boom arm */}
                <path d="M255 185 Q310 158 358 138 Q380 128 400 125"
                  fill="none" stroke="#F5C300" strokeWidth="14" strokeLinecap="round"/>
                <path d="M255 185 Q310 158 358 138 Q380 128 400 125"
                  fill="none" stroke="#D4A800" strokeWidth="10" strokeLinecap="round"/>
                {/* Stick + Bucket */}
                <path d="M400 125 Q416 142 420 165 Q422 178 420 190"
                  fill="none" stroke="#F5C300" strokeWidth="11" strokeLinecap="round"/>
                <path d="M400 125 Q416 142 420 165 Q422 178 420 190"
                  fill="none" stroke="#D4A800" strokeWidth="8" strokeLinecap="round"/>
                <path d="M412 188 Q418 198 426 208 Q435 220 442 212 Q450 204 446 192 Q440 180 430 180 Q418 180 412 188Z"
                  fill="#F5C300" stroke="#D4A800" strokeWidth="1.5"/>
                {[422,430,438].map(tx => <path key={tx} d={`M${tx} 220 L${tx-2} 228 L${tx+3} 226Z`} fill="#D4A800"/>)}
                {/* Service 4x4 beside */}
                <rect x="10" y="195" width="48" height="28" rx="2" fill="#1E1E1E" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
                <rect x="10" y="218" width="48" height="6" fill="rgba(245,195,0,.5)"/>
                {[18,42].map(wx => (
                  <g key={wx} transform={`translate(${wx},224)`}>
                    <circle cx="0" cy="0" r="7" fill="#111" stroke="rgba(245,195,0,.2)" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="4" fill="#1a1a1a"/>
                  </g>
                ))}
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(0,0,0,.88),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>ON-SITE HEAVY MACHINERY</div>
                <div style={{ fontSize:".72rem",color:"rgba(245,195,0,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Queensland · Excavators, dozers & more</div>
              </div>
            </div>

            {/* Card 2 — Service 4x4 + toolbox */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#111"/>
                {/* Workshop bg */}
                <rect width="240" height="280" fill="#141414"/>
                {/* Grid lines on floor */}
                {Array.from({length:6},(_,i) => (
                  <line key={i} x1="0" y1={160+i*24} x2="240" y2={160+i*24} stroke="rgba(255,255,255,.03)" strokeWidth="1"/>
                ))}
                {/* Toolbox cabinet */}
                <rect x="10" y="80" width="70" height="100" rx="2" fill="#1C1C1C" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                <rect x="10" y="80" width="70" height="8" rx="2" fill="rgba(245,195,0,.3)"/>
                {[0,1,2,3,4].map(i => (
                  <g key={i}>
                    <rect x="12" y={92+i*18} width="66" height="14" rx="1" fill="#222" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                    <rect x="34" y={97+i*18} width="22" height="4" rx="2" fill="#333"/>
                    <circle cx="72" cy={99+i*18} r="3" fill="rgba(245,195,0,.4)"/>
                  </g>
                ))}
                {/* Service 4x4 illustration */}
                <rect x="105" y="120" width="120" height="65" rx="4" fill="#1E1E1E" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                <rect x="115" y="108" width="106" height="14" rx="3" fill="#181818" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                {/* Cab */}
                <path d="M200,108 L200,92 Q200,84 206,84 L230,84 Q238,84 244,92 L255,108Z"
                  fill="#181818" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                {/* Yellow stripe */}
                <rect x="105" y="168" width="150" height="10" fill="rgba(245,195,0,.55)"/>
                <text x="170" y="176" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="6.5" fill="rgba(13,13,13,.9)" letterSpacing="1">HEAVY HAUL DIESEL</text>
                {/* Wheels */}
                {[130,218].map(wx => (
                  <g key={wx} transform={`translate(${wx},186)`}>
                    <circle cx="0" cy="0" r="16" fill="#111" stroke="rgba(245,195,0,.3)" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="9" fill="#1a1a1a"/>
                    <circle cx="0" cy="0" r="3" fill="#444"/>
                  </g>
                ))}
                {/* Spanner on bench */}
                <rect x="10" y="200" width="90" height="7" rx="3.5" fill="#555" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <circle cx="14" cy="203" r="7" fill="none" stroke="#555" strokeWidth="3"/>
                <circle cx="96" cy="203" r="5" fill="none" stroke="#555" strokeWidth="3"/>
                {/* Gear decoration */}
                <g transform="translate(188,48)">
                  <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(245,195,0,.15)" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(245,195,0,.1)" strokeWidth="1"/>
                  {GEAR_TEETH.map(i => {
                  const a = (i * 30 * Math.PI) / 180;

                  const x1 = +(Math.cos(a) * 20).toFixed(4);
                  const y1 = +(Math.sin(a) * 20).toFixed(4);
                  const x2 = +(Math.cos(a) * 26).toFixed(4);
                  const y2 = +(Math.sin(a) * 26).toFixed(4);

                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(245,195,0,.2)"
                      strokeWidth="4"
                      strokeLinecap="square"
                    />
                  );
                })}
                  <text x="0" y="5" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="14" fill="rgba(245,195,0,.3)">H</text>
                </g>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>FULLY EQUIPPED RIG</div>
                <div style={{ fontSize:".72rem",color:"rgba(245,195,0,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Tools, parts & diagnostics on board</div>
              </div>
            </div>

            {/* Card 3 — Engine rebuild */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#111"/>
                {/* Engine block */}
                <rect x="30" y="55" width="140" height="90" rx="4" fill="#1C1C1C" stroke="rgba(245,195,0,.2)" strokeWidth="1.5"/>
                {/* Cylinder head */}
                <rect x="35" y="45" width="130" height="16" rx="3" fill="#252525" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                {/* Cylinders top */}
                {[55,90,125,158].map(cx => (
                  <g key={cx}>
                    <circle cx={cx} cy="52" r="10" fill="#1E1E1E" stroke="rgba(245,195,0,.2)" strokeWidth="1"/>
                    <circle cx={cx} cy="52" r="5" fill="#333"/>
                    <rect x={cx-2} y="37" width="4" height="14" rx="2" fill="#2a2a2a" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                  </g>
                ))}
                {/* Oil lines on block */}
                {[68,92,116,140].map(x => (
                  <rect key={x} x={x} y="60" width="3" height="80" rx="1" fill="rgba(245,195,0,.06)"/>
                ))}
                {/* Valve cover bolts */}
                {[40,65,95,125,155,175].map(bx => (
                  <circle key={bx} cx={bx} cy="49" r="3" fill="#333" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
                ))}
                {/* Front of block fittings */}
                <rect x="30" y="90" width="20" height="30" rx="2" fill="#222" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                <circle cx="40" cy="105" r="8" fill="none" stroke="rgba(245,195,0,.25)" strokeWidth="2"/>
                {/* Crankshaft end */}
                <circle cx="170" cy="105" r="14" fill="#1a1a1a" stroke="rgba(245,195,0,.3)" strokeWidth="1.5"/>
                <circle cx="170" cy="105" r="8" fill="#222"/>
                <circle cx="170" cy="105" r="3" fill="#555"/>
                {SPOKES_SM.slice(0,6).map((s,i) => (
                  <line key={i} x1={170+s.x1*0.7} y1={105+s.y1*0.7} x2={170+s.x2*0.7} y2={105+s.y2*0.7} stroke="rgba(245,195,0,.3)" strokeWidth="2" strokeLinecap="round"/>
                ))}
                {/* Yellow stripe label */}
                <rect x="30" y="138" width="140" height="8" fill="rgba(245,195,0,.4)"/>
                <text x="100" y="145" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="6" fill="rgba(13,13,13,.8)" letterSpacing="1">ENGINE REBUILD</text>
                {/* Hand with tool */}
                <rect x="88" y="158" width="8" height="28" rx="3" fill="#c8a078"/>
                <rect x="80" y="148" width="18" height="8" rx="3" fill="#666" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <circle cx="80" cy="152" r="6" fill="none" stroke="#666" strokeWidth="2.5"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>ENGINE REBUILDS</div>
                <div style={{ fontSize:".72rem",color:"rgba(245,195,0,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Major components · all makes</div>
              </div>
            </div>

            {/* Card 4 — Electrical & Diagnostics */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0D0D0D"/>
                {/* Laptop/diagnostic screen */}
                <rect x="25" y="45" width="150" height="100" rx="4" fill="#141414" stroke="rgba(245,195,0,.3)" strokeWidth="1.5"/>
                <rect x="30" y="50" width="140" height="88" rx="2" fill="#0a0a0a"/>
                {/* Screen content — code/data lines */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <rect x="36" y={58+i*10} width={40+Math.sin(i)*30} height="3" rx="1" fill={`rgba(245,195,0,${.2+i*.04})`}/>
                    <rect x={84+Math.cos(i)*10} y={58+i*10} width={30+i*4} height="3" rx="1" fill={`rgba(0,200,100,${.15+i*.03})`}/>
                  </g>
                ))}
                {/* DTC code highlighted */}
                <rect x="36" y="118" width="128" height="14" rx="2" fill="rgba(245,195,0,.12)" stroke="rgba(245,195,0,.3)" strokeWidth="1"/>
                <text x="100" y="128" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="var(--yellow)" letterSpacing="1">DTC: P0487 — CLEARED ✓</text>
                {/* Screen glow */}
                <rect x="30" y="50" width="140" height="88" rx="2" fill="rgba(245,195,0,.02)"/>
                {/* Laptop base */}
                <rect x="15" y="145" width="170" height="12" rx="2" fill="#1C1C1C" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                <rect x="70" y="143" width="60" height="5" rx="2" fill="#222"/>
                {/* OBD cable */}
                <path d="M100 157 Q100 170 80 175 Q60 180 50 190" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
                <rect x="35" y="188" width="28" height="16" rx="2" fill="#252525" stroke="rgba(245,195,0,.25)" strokeWidth="1"/>
                <text x="49" y="199" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="rgba(245,195,0,.6)">OBD</text>
                {/* Electrical symbols */}
                <path d="M155,165 L162,155 L155,155 L162,145" stroke="rgba(245,195,0,.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M175,175 L182,165 L175,165 L182,155" stroke="rgba(245,195,0,.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.92),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>DIAGNOSTICS</div>
                <div style={{ fontSize:".72rem",color:"rgba(245,195,0,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>All makes & models · fault codes cleared</div>
              </div>
            </div>

            {/* Card 5 — Welding & Fabrication */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0a0a08"/>
                {/* Dark workshop */}
                <rect width="200" height="210" fill="#0f0d08"/>
                {/* Weld glow on surface */}
                <rect x="40" y="120" width="120" height="50" rx="2" fill="rgba(255,140,0,.03)"/>
                {/* Metal workpiece */}
                <rect x="30" y="140" width="140" height="18" rx="2" fill="#1C1C1C" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
                <rect x="30" y="150" width="140" height="3" fill="rgba(255,140,0,.12)"/>
                {/* Weld bead */}
                {Array.from({length:28},(_,i) => (
                  <ellipse key={i} cx={32+i*5} cy={150} rx="2.5" ry="1.8"
                    fill={`rgba(255,${120+i*3},0,${.4+Math.sin(i)*0.1})`}/>
                ))}
                {/* Weld sparks */}
                {[0,1,2,3,4,5].map(i => {
                    const a = (i * 60 * Math.PI) / 180;

                    const sx = +(80 + Math.cos(a) * 18).toFixed(4);
                    const sy = +(148 + Math.sin(a) * 12).toFixed(4);

                    return (
                      <circle
                        key={i}
                        cx={sx}
                        cy={sy}
                        r={1.5}
                        fill={`rgba(255,${180+i*10},50,.7)`}
                      />
                    );
                  })}
                {/* Welding torch / hand */}
                <path d="M130 95 Q115 118 108 142" fill="none" stroke="#555" strokeWidth="8" strokeLinecap="round"/>
                <path d="M130 95 Q115 118 108 142" fill="none" stroke="#777" strokeWidth="5" strokeLinecap="round"/>
                {/* Torch tip glow */}
                <circle cx="108" cy="142" r="5" fill="rgba(255,160,0,.6)"/>
                <circle cx="108" cy="142" r="10" fill="rgba(255,140,0,.12)"/>
                <circle cx="108" cy="142" r="18" fill="rgba(255,120,0,.05)"/>
                {/* Welder's helmet hint */}
                <rect x="115" y="55" width="40" height="35" rx="5" fill="#1C1C1C" stroke="rgba(255,255,255,.08)" strokeWidth="1.5"/>
                <rect x="120" y="64" width="30" height="18" rx="2" fill="rgba(255,140,0,.08)" stroke="rgba(255,140,0,.15)" strokeWidth="1"/>
                {/* Fabricated bracket on wall */}
                <rect x="10" y="60" width="8" height="80" rx="1" fill="#2a2a2a"/>
                <rect x="10" y="100" width="22" height="5" rx="1" fill="#2a2a2a"/>
                {/* Safety label */}
                <rect x="10" y="185" width="180" height="14" rx="2" fill="rgba(245,195,0,.08)" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                <text x="100" y="195" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8" fill="rgba(245,195,0,.5)" letterSpacing="1.5">WELDING &amp; FABRICATION</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.92),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>WELDING & FABRICATION</div>
                <div style={{ fontSize:".72rem",color:"rgba(245,195,0,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>On-site structural · custom work</div>
              </div>
            </div>

          </div>

          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            Mobile heavy diesel mechanic across Queensland — <a href="mailto:heavyhauldiesel@gmail.com" style={{ color:"var(--yellow)",textDecoration:"none",fontWeight:500 }}>get in touch</a> for emergency breakdown or scheduled servicing
          </p>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--dark2)",textAlign:"center",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--yellow),var(--yellow-l),var(--yellow),transparent)" }}/>
        <div className="inner-1100">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(245,195,0,.6)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Where We Work</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            QUEENSLAND<br/><span style={{ color:"var(--yellow-l)" }}>SERVICE AREAS</span>
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 22px",background:"rgba(245,195,0,.05)",border:"1px solid rgba(245,195,0,.2)",color:"rgba(240,240,240,.8)",fontSize:".9rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:2 }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(240,240,240,.25)",fontSize:".85rem",fontFamily:"'Barlow',sans-serif" }}>
            Gympie-based. Servicing all of Queensland — we come to your worksite.
          </p>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--yellow),transparent)",opacity:.4 }}/>
      </section>

      {/* ══ WHY HEAVY HAUL ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--black)",borderTop:"1px solid var(--border2)" }}>
        <div className="why-grid">
          {/* Left */}
          <div ref={whyLeftRef} style={{ background:"var(--dark2)",padding:"48px 40px",position:"relative",overflow:"hidden",borderRadius:3,border:"1px solid var(--border)" }}>
            {/* Yellow corner marks */}
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:22,height:22,
                borderTop:i<2?"2.5px solid var(--yellow)":undefined,
                borderBottom:i>=2?"2.5px solid var(--yellow)":undefined,
                borderLeft:i%2===0?"2.5px solid var(--yellow)":undefined,
                borderRight:i%2===1?"2.5px solid var(--yellow)":undefined,
              }}/>
            ))}

            {/* Large gear emblem */}
            <div style={{ textAlign:"center",marginBottom:28 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Outer gear */}
                <circle cx="60" cy="60" r="54" fill="rgba(245,195,0,.04)" stroke="rgba(245,195,0,.25)" strokeWidth="2"/>
                {GEAR_TEETH.map(i => {
                  const a = (i * 30 * Math.PI) / 180;

                  const x1 = +(60 + Math.cos(a) * 50).toFixed(4);
                  const y1 = +(60 + Math.sin(a) * 50).toFixed(4);
                  const x2 = +(60 + Math.cos(a) * 58).toFixed(4);
                  const y2 = +(60 + Math.sin(a) * 58).toFixed(4);

                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(245,195,0,.45)"
                      strokeWidth="6"
                      strokeLinecap="square"
                    />
                  );
                })}
                {/* Inner circle */}
                <circle cx="60" cy="60" r="38" fill="var(--dark)" stroke="rgba(245,195,0,.15)" strokeWidth="1"/>
                {/* H letter large */}
                <text x="60" y="74" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="44" fill="var(--yellow)" letterSpacing="-2">H</text>
                {/* Yellow underline */}
                <line x1="36" y1="80" x2="84" y2="80" stroke="rgba(245,195,0,.5)" strokeWidth="2"/>
              </svg>
            </div>

            <div style={{ textAlign:"center",marginBottom:28 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"#fff",lineHeight:1 }}>HEAVY HAUL DIESEL</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".62rem",color:"rgba(245,195,0,.5)",letterSpacing:"3px",textTransform:"uppercase",marginTop:4 }}>Contracting · Mobile Mechanic</div>
            </div>

            {[
              ["Fully Mobile Operation","We come to you. Our fitted-out service 4x4 is stocked and ready."],
              ["24/7 Emergency Breakdown","Breakdown on a job site? We respond around the clock, any day."],
              ["All Queensland",          "Gympie to the Sunshine Coast, Kingaroy to Maryborough and beyond."],
            ].map(([t,d]) => (
              <div key={t as string} style={{ display:"flex",gap:12,marginBottom:16 }}>
                <div style={{ width:22,height:22,background:"rgba(245,195,0,.1)",border:"1px solid rgba(245,195,0,.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2,6 L5,9 L10,3" stroke="var(--yellow)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",fontSize:".9rem",marginBottom:2,textTransform:"uppercase" }}>{t as string}</div>
                  <div style={{ color:"var(--muted)",fontSize:".8rem",lineHeight:1.65,fontFamily:"'Barlow',sans-serif" }}>{d as string}</div>
                </div>
              </div>
            ))}

            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--yellow)",color:"#0D0D0D",padding:"12px 20px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px",borderRadius:"3px 0 3px 0" }}>
              FREE<br/>QUOTE
            </div>
          </div>

          {/* Right */}
          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--yellow)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Why Choose Heavy Haul</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:12,letterSpacing:"-1px" }}>
              QUEENSLAND&apos;S<br/><span style={{ color:"var(--yellow)" }}>MOBILE DIESEL</span><br/>SPECIALISTS
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",marginBottom:32,borderRadius:2 }}/>
            {[
              { icon:"🚗", title:"Fully Mobile 4x4",          desc:"Fitted-out service vehicle stocked with tools, parts and diagnostics. We come to your farm, depot or breakdown site." },
              { icon:"🔧", title:"All Makes & Models",         desc:"Trucks, trailers, 4x4s, excavators, tractors — if it runs on diesel, we service and repair it." },
              { icon:"⚡", title:"Electrical & Diagnostics",  desc:"Full diagnostic software for all makes and models. Electrical fault-finding, A/C, and wiring repairs." },
              { icon:"🔩", title:"Welding & Fabrication",     desc:"On-site welding and custom fabrication work. Emergency structural repairs at your location." },
              { icon:"📋", title:"Fleet Contracts Available", desc:"Ongoing fleet servicing contracts for businesses. Regular scheduled maintenance to keep your fleet on the road." },
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
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"var(--dark2)",borderTop:"1px solid var(--border)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--yellow),var(--yellow-l),var(--yellow),transparent)" }}/>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(245,195,0,.04) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--yellow)",marginBottom:14,fontWeight:700,textTransform:"uppercase" }}>Contact Us Today</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5.5vw,4rem)",fontWeight:900,color:"#fff",lineHeight:.9,marginBottom:16,letterSpacing:"-1px" }}>
          MOBILE HEAVY DIESEL<br/><span style={{ color:"var(--yellow)" }}>MECHANIC · QLD</span>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:440,margin:"0 auto 36px",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>
          24/7 emergency breakdown. Fleet servicing. Always mobile — we come to you.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:+61438694774" className="btn-yellow">📞 0438 694 774</a>
          <a href="mailto:heavyhauldiesel@gmail.com" className="btn-outline">✉️ SEND AN EMAIL</a>
        </div>
        <p style={{ marginTop:16,color:"rgba(240,240,240,.18)",fontSize:".78rem",fontFamily:"'Barlow',sans-serif" }}>
          Gympie, Queensland · 24/7 mobile service
        </p>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--black)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--yellow)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get In Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              CONTACT<br/><span style={{ color:"var(--yellow)" }}>HEAVY HAUL DIESEL</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",marginTop:14,borderRadius:2 }}/>
          </div>
          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone",        val:"0438 694 774",                       href:"tel:+61438694774" },
                { icon:"✉️", label:"Email",        val:"heavyhauldiesel@gmail.com",          href:"mailto:heavyhauldiesel@gmail.com" },
                { icon:"📍", label:"Base",         val:"Gympie, Queensland",                 href:"https://maps.google.com/?q=Gympie+QLD" },
                { icon:"🕐", label:"Hours",        val:"24/7 — emergency breakdown always",  href:undefined },
                { icon:"🗺️", label:"Service Area", val:"Gympie · Kingaroy · Sunshine Coast · Maryborough & surrounds", href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"var(--dark2)",border:"1px solid var(--border)",borderRadius:3 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--yellow)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"#fff",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--yellow)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="#fff")}
                        >{c.val}</a>
                      : <span style={{ color:"rgba(240,240,240,.75)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"var(--dark2)",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:3,boxShadow:"0 4px 32px rgba(0,0,0,.3)" }}>
              {/* Yellow top bar */}
              <div style={{ height:3,background:"linear-gradient(90deg,var(--yellow),var(--yellow-l))",margin:"-36px -32px 24px" }}/>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"#fff",letterSpacing:"1px",marginBottom:24,textTransform:"uppercase" }}>Get a Free Quote</div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith"              },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX"            },
                { label:"Email",       type:"email", ph:"you@example.com"         },
                { label:"Job Type",    type:"text",  ph:"e.g. Breakdown, engine service, fleet…" },
                { label:"Location",    type:"text",  ph:"e.g. Kingaroy, Gympie…" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(240,240,240,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(245,195,0,.45)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".62rem",letterSpacing:"2px",color:"rgba(240,240,240,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Job Details</label>
                <textarea rows={3} placeholder="Tell us what's happening — machine type, symptoms, urgency…"
                  style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:2,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(245,195,0,.45)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-yellow" style={{ width:"100%",fontSize:".9rem" }}>📞 REQUEST FREE QUOTE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--dark2)",padding:"0 52px 28px",borderTop:"1px solid var(--border)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--yellow),var(--yellow-l),var(--yellow),transparent)",marginBottom:28 }}/>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,flexShrink:0 }}>
              <svg width="36" height="36" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#1A1A1A" stroke="rgba(245,195,0,.4)" strokeWidth="1.5"/>
                {GEAR_TEETH.map(i => {
                  const a=(i*30*Math.PI)/180;
                  return <line key={i} x1={24+Math.cos(a)*19} y1={24+Math.sin(a)*19} x2={24+Math.cos(a)*23} y2={24+Math.sin(a)*23} stroke="rgba(245,195,0,.5)" strokeWidth="3.5" strokeLinecap="square"/>;
                })}
                <circle cx="24" cy="24" r="14" fill="#0D0D0D"/>
                <text x="24" y="29" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="15" fill="#F5C300">H</text>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".9rem",color:"rgba(255,255,255,.75)",letterSpacing:"1.5px" }}>HEAVY HAUL DIESEL CONTRACTING</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(245,195,0,.45)",letterSpacing:"2px",textTransform:"uppercase" }}>Gympie · Queensland · Mobile Mechanic</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61438694774" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>0438 694 774</a>
            <a href="mailto:heavyhauldiesel@gmail.com" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>heavyhauldiesel@gmail.com</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.15)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Heavy Haul Diesel Contracting. Queensland, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
