"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🚗", title: "Driveways",                        desc: "Bore under your driveway without cutting or lifting a single slab. Pipes and conduits installed cleanly underneath." },
  { icon: "🌿", title: "Gardens & Landscaping",            desc: "No trench through your garden beds. Our Grundomat machine works in tight, narrow spaces to preserve your landscaping." },
  { icon: "🚶", title: "Footpaths",                        desc: "Under council footpaths and pedestrian areas without permits to cut. Clean, fast and minimal surface disruption." },
  { icon: "💧", title: "Conduits for Water",               desc: "Water supply pipe installation under hard surfaces. Up to 45mm pipe diameter, 1–12 metres bore length." },
  { icon: "⚡", title: "Electrical & Communications",      desc: "Conduit for power, NBN, fibre and data lines. We operate BYDA-first and coordinate utility locates if needed." },
  { icon: "🏘️", title: "Residential & Commercial",        desc: "House connections, landscapers, builders — our Grundomat is designed for tight residential access where bigger machines can't go." },
];

const AREAS = [
  "Adelaide", "Fleurieu Peninsula", "Middleton", "Port Elliot",
  "Victor Harbor", "Goolwa", "Mount Barker", "SA Wide",
];

const FAQS = [
  { q: "Do you have to cut or lift concrete?",         a: "No – we drill under driveways, paths and gardens, so there's no need to rip anything up." },
  { q: "What size pipes or conduits can you install?", a: "Up to 45mm diameter." },
  { q: "How far can you drill?",                       a: "Typical residential jobs are 5–10m, but the machine can handle longer crossings depending on site conditions." },
  { q: "Can you work in tight spaces?",                a: "Yes! Our Grundomat boring machine is designed for tight residential access – we specialise in narrow or landscaped areas." },
  { q: "Do you organise service locates?",             a: "Yes – we always operate BYDA-first and can coordinate certified utility locators if needed." },
  { q: "Will my garden or lawn be disturbed?",         a: "Minimal disruption – we only dig small entry/exit pits, and we reinstate and tidy before we leave." },
  { q: "What affects the price of a bore?",            a: "Factors include length, diameter, ground type (sand, clay, shale), access, reinstatement, and whether utility locates are required." },
  { q: "How quickly can you start?",                   a: "We can often fit urgent jobs in the same week – send us some photos and details for a same-day quote." },
  { q: "Do you provide reinstatement?",                a: "Yes – we backfill pits and tidy surfaces. If concrete reinstatement is needed, we work with partners who can handle it." },
  { q: "Are you insured?",                             a: "Absolutely – we\'re fully insured with public liability and plant cover, so you\'re protected." },
  { q: "What services can you install under driveways/paths?", a: "Water, power, comms, and irrigation are the most common." },
  { q: "How do I get a quote?",                        a: "Fill out the Same Day Quote form below or call Gus directly on 0402 855 619." },
];

const TESTIMONIALS = [
  { name: "Joshua Hooper", role: "CEO – Landscape Techniques",                quote: "Gus The Boring Guy is friendly and professional and we love working with him." },
  { name: "Dale Spencer",  role: "CEO – Southern Ocean Building & Consulting", quote: "Easy, efficient and reliable, we highly recommend." },
  { name: "Rhyce Irvine",  role: "CEO – Irvine Earthworks",                   quote: "Gus is a legend, super handy to have him on call!" },
  { name: "Jai Fowley",    role: "CEO – Visionary Landscapes",                quote: "Gus\'s experience in the landscape industry helped get the job done with minimal disruption." },
];

// SSR-safe pre-computed track link positions
const TRACK_LINKS = Array.from({ length: 10 }, (_, i) => ({
  x: i * 22,
  y: 0,
}));

// Drill bit teeth — pre-computed
const DRILL_TEETH = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return {
    x1: +(Math.cos(a) * 10).toFixed(3),
    y1: +(Math.sin(a) * 10).toFixed(3),
    x2: +(Math.cos(a) * 16).toFixed(3),
    y2: +(Math.sin(a) * 16).toFixed(3),
  };
});

export default function SouthernBoring() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubRef   = useRef<HTMLDivElement>(null);
  const heroCtaRef   = useRef<HTMLDivElement>(null);
  const heroVisRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const servicesRef  = useRef<HTMLDivElement>(null);
  const galleryRef   = useRef<HTMLDivElement>(null);
  const areasRef     = useRef<HTMLDivElement>(null);
  const whyRef       = useRef<HTMLDivElement>(null);
  const whyLeftRef   = useRef<HTMLDivElement>(null);
  const whyRightRef  = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const contactRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    const TA = "play none none reverse";
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(heroBadgeRef.current,  { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(heroTitleRef.current,  { y: 80, opacity: 0, skewY: 2, duration: 0.9, ease: "power3.out" }, "-=0.2")
        .from(heroSubRef.current,    { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(heroCtaRef.current,    { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
        .from(heroVisRef.current,    { x: 60, opacity: 0, duration: 1.0, ease: "power3.out" }, "-=0.8");

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

    return () => { ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background:"#141414", color:"#F0EDE8", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --black:   #0E0E0E;
          --dark:    #141414;
          --dark2:   #1C1C1C;
          --dark3:   #242424;
          --dark4:   #2E2E2E;
          --orange:  #E8610A;
          --orange-l:#FF7A22;
          --orange-d:#C04E06;
          --dirt:    #3D2B1A;
          --soil:    #5C3D1E;
          --stone:   #8A7A68;
          --white:   #FFFFFF;
          --cream:   #F0EDE8;
          --border:  rgba(232,97,10,0.15);
          --border2: rgba(255,255,255,0.06);
          --muted:   rgba(240,237,232,0.45);
          --glow:    rgba(232,97,10,0.22);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes shimmer     { 0%{left:-100%} 100%{left:200%} }
        @keyframes drill-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes drill-spin-r{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes dirt-spray {
          0%   { transform:translate(0,0) scale(0.5); opacity:0; }
          25%  { opacity:.6; }
          70%  { transform:translate(var(--dx),var(--dy)) scale(1.8); opacity:.25; }
          100% { transform:translate(var(--dx),var(--dy)) scale(2.5); opacity:0; }
        }

        /* ── Drill rig: enters from right, drives left, boring into ground ── */
        @keyframes rig-full {
          0%        { transform:translateX(160%); opacity:0; }
          38%       { transform:translateX(0px);  opacity:1; }
          /* idle bob */
          58%,100%  { transform:translateX(0px) translateY(0px); opacity:1; }
          79%       { transform:translateX(0px) translateY(-3px); }
        }
        /* Support truck enters behind, slightly later */
        @keyframes truck-full {
          0%,22%   { transform:translateX(200%); opacity:0; }
          65%      { transform:translateX(72px); opacity:1; }
          80%,100% { transform:translateX(72px) translateY(0px); opacity:1; }
          90%      { transform:translateX(72px) translateY(-2px); }
        }
        @keyframes track-move {
          0%   { stroke-dashoffset:0; }
          100% { stroke-dashoffset:-40; }
        }
        @keyframes road-dash {
          0%   { stroke-dashoffset:0; }
          100% { stroke-dashoffset:-60; }
        }
        /* Drill rod extending forward into ground */
        @keyframes rod-extend {
          0%,40%   { clip-path:inset(0 100% 0 0); }
          75%,100% { clip-path:inset(0 0% 0 0); }
        }
        /* Underground bore path — dashed tunnel line */
        @keyframes bore-path {
          0%,42%   { stroke-dashoffset:320; opacity:0; }
          45%      { opacity:.6; }
          80%,100% { stroke-dashoffset:0; opacity:.5; }
        }
        /* Dirt particles spraying from drill point */
        @keyframes particle {
          0%   { transform:translate(0,0); opacity:.7; }
          100% { transform:translate(var(--px),var(--py)); opacity:0; }
        }

        .rig-scene    { animation: rig-full  5.5s cubic-bezier(0.22,0.61,0.36,1) forwards,
                                   rig-full  3.8s ease-in-out 5.5s infinite; }
        .truck-scene  { animation: truck-full 6s cubic-bezier(0.22,0.61,0.36,1) 0.3s forwards,
                                   truck-full 4.2s ease-in-out 6.3s infinite; }
        .drill-bit    { transform-origin: 46px 282px; animation: drill-spin  0.3s linear 0s 8, drill-spin  1.8s linear 2.2s infinite; }
        .drill-bit-r  { transform-origin: 46px 282px; animation: drill-spin-r 0.3s linear 0s 8, drill-spin-r 1.8s linear 2.2s infinite; }
        .track-anim   { stroke-dasharray:28 10; animation: track-move .4s linear 0s 6, track-move 3s linear 2.4s infinite; }
        .road-anim    { stroke-dasharray:40 20; animation: road-dash  .5s linear 0s 5, road-dash  3.8s linear 2.4s infinite; }
        .rod-reveal   { animation: rod-extend 1.5s ease-out 2.5s both; }
        .bore-trail   { stroke-dasharray:320; animation: bore-path 2s ease-out 2.8s both; }

        .nav-link { color:rgba(240,237,232,.4); text-decoration:none; font-size:.85rem; letter-spacing:.5px; font-weight:500; font-family:'Barlow',sans-serif; transition:color .2s; }
        .nav-link:hover { color:#fff; }
        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:var(--orange); border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-orange {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:15px 34px; background:var(--orange); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:1rem;
          letter-spacing:2px; border:none; cursor:pointer; text-decoration:none;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-orange:hover { background:var(--orange-l); transform:translateY(-2px); box-shadow:0 12px 40px var(--glow); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 30px; background:transparent; color:#fff;
          border:1.5px solid rgba(232,97,10,.45); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer; text-decoration:none;
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { border-color:var(--orange); color:var(--orange-l); background:rgba(232,97,10,.07); transform:translateY(-2px); }

        .svc-card {
          background:var(--dark2); border:1px solid var(--border2);
          padding:30px 26px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .25s, box-shadow .3s; transform-style:preserve-3d;
        }
        .svc-card:hover { border-color:rgba(232,97,10,.45); transform:translateY(-4px); box-shadow:0 16px 48px rgba(232,97,10,.08); }
        .svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--orange),var(--orange-l)); transform:scaleX(0); transform-origin:left; transition:transform .35s; }
        .svc-card:hover::before { transform:scaleX(1); }
        .svc-card::after { content:''; position:absolute; top:0; height:100%; width:40%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent); left:-100%; pointer-events:none; }
        .svc-card:hover::after { animation:shimmer .5s ease; }

        .stat-item { text-align:center; padding:30px 16px; border-left:1px solid rgba(255,255,255,.07); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,.05); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:3px; border:1px solid var(--border2); cursor:pointer; transition:transform .3s, box-shadow .3s; background:var(--dark2); position:relative; }
        .gal-item:hover { transform:scale(1.02); box-shadow:0 12px 40px rgba(232,97,10,.1); }
        .info-card { transition:border-color .25s; }
        .info-card:hover { border-color:rgba(232,97,10,.45) !important; }

        .nav-inner    { padding:16px 52px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; display:flex; align-items:center; padding:100px 52px 70px; position:relative; overflow:hidden; }
        .hero-inner   { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; gap:56px; }
        .hero-text    { flex:1 1 auto; max-width:560px; }
        .hero-vis     { flex:0 0 auto; width:50%; max-width:540px; }
        .section-pad  { padding:100px 52px; }
        .section-sm   { padding:80px 52px; }
        .inner-max    { max-width:1200px; margin:0 auto; }
        .inner-1100   { max-width:1100px; margin:0 auto; }
        .stat-grid    { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:18px; }
        .why-grid     { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:40px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
        .hero-title   { font-size:clamp(3rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.8rem; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }

        .gallery-grid { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:14px; }
        .gal-item:nth-child(1) { grid-column:1/3; grid-row:1/2; height:280px; }
        .gal-item:nth-child(2) { grid-column:3/4; grid-row:1/2; height:280px; }
        .gal-item:nth-child(3) { grid-column:1/2; grid-row:2/3; height:210px; }
        .gal-item:nth-child(4) { grid-column:2/3; grid-row:2/3; height:210px; }
        .gal-item:nth-child(5) { grid-column:3/4; grid-row:2/3; height:210px; }

        @media (max-width:767px) {
          .hamburger   { display:flex !important; }
          .desk-nav    { display:none !important; }
          .desk-cta    { display:none !important; }
          .nav-inner   { padding:14px 20px; }
          .hero-section{ padding:84px 20px 52px; }
          .hero-inner  { flex-direction:column; gap:32px; align-items:flex-start; }
          .hero-text   { max-width:100%; }
          .hero-vis    { width:100%; max-width:100%; flex:none; }
          .hero-title  { font-size:clamp(2.4rem,11vw,3.6rem); }
          .section-pad { padding:60px 20px; }
          .section-sm  { padding:52px 20px; }
          .stat-grid   { grid-template-columns:repeat(2,1fr); }
          .stat-item   { border-left:none !important; border-bottom:1px solid rgba(255,255,255,.06); }
          .stat-item:nth-child(2n) { border-left:1px solid rgba(255,255,255,.07) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num    { font-size:2.2rem; }
          .svc-grid    { grid-template-columns:1fr; }
          .why-grid    { grid-template-columns:1fr !important; gap:28px !important; }
          .contact-grid{ grid-template-columns:1fr; }
          .footer-row  { flex-direction:column; align-items:flex-start; }
          .cta-btns    { flex-direction:column; }
          .btn-orange,.btn-outline { width:100%; }
          .gallery-grid{ grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1){ grid-column:1/3; height:180px; }
          .gal-item:nth-child(n){ grid-column:auto; height:150px; }
        }

        input::placeholder,textarea::placeholder { color:rgba(240,237,232,.18); }
        input,textarea,select { -webkit-appearance:none; }
        ::selection { background:rgba(232,97,10,.22); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(14,14,14,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:44,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.4rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:+61402855619" className="btn-orange" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>📞 0402 855 619</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(14,14,14,.96)" : "linear-gradient(180deg,rgba(14,14,14,.88) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(232,97,10,.18)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo — drill/cog mark */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:46,height:46,flexShrink:0 }}>
              <svg width="46" height="46" viewBox="0 0 46 46" style={{ filter:"drop-shadow(0 2px 10px rgba(232,97,10,.35))" }}>
                {/* Outer ring */}
                <circle cx="23" cy="23" r="21" fill="#1A1A1A" stroke="rgba(232,97,10,.6)" strokeWidth="1.5"/>
                {/* Cog teeth */}
                {Array.from({length:10},(_,i) => {
                  const a = (i/10)*Math.PI*2;
                  return <line key={i}
                    x1={(23+Math.cos(a)*17).toFixed(2)} y1={(23+Math.sin(a)*17).toFixed(2)}
                    x2={(23+Math.cos(a)*21).toFixed(2)} y2={(23+Math.sin(a)*21).toFixed(2)}
                    stroke="rgba(232,97,10,.65)" strokeWidth="4" strokeLinecap="square"/>;
                })}
                {/* Inner */}
                <circle cx="23" cy="23" r="12" fill="#0E0E0E" stroke="rgba(232,97,10,.25)" strokeWidth="1"/>
                {/* Drill bit center */}
                <polygon points="23,11 28,23 23,18 18,23" fill="var(--orange)" opacity=".9"/>
                <circle cx="23" cy="23" r="3" fill="rgba(232,97,10,.8)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".95rem",color:"#fff",letterSpacing:"2px",lineHeight:1,textTransform:"uppercase" }}>The Boring Guy</div>
              <div style={{ fontSize:".58rem",color:"var(--orange)",letterSpacing:"2.5px",lineHeight:1.6,fontFamily:"'Barlow',sans-serif",fontWeight:600,textTransform:"uppercase" }}>Southern Boring Solutions · SA</div>
            </div>
          </div>

          <div className="desk-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="tel:+61402855619" className="btn-orange desk-cta" style={{ fontSize:".78rem",padding:"9px 22px" }}>📞 0402 855 619</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v=>!v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(160deg,#0E0E0E 0%,#141414 55%,#111 100%)" }}>
        {/* Diagonal stripes — construction hazard pattern subtle */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,rgba(232,97,10,.018) 0px,rgba(232,97,10,.018) 1px,transparent 1px,transparent 28px)",pointerEvents:"none" }}/>
        {/* Orange glow */}
        <div style={{ position:"absolute",top:"15%",right:"-5%",width:480,height:480,background:"radial-gradient(ellipse,rgba(232,97,10,.07) 0%,transparent 65%)",pointerEvents:"none" }}/>
        {/* Orange accent bottom */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--orange),var(--orange-l),var(--orange),transparent)",opacity:.7 }}/>
        {/* Corner cut */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 300px 300px 0",borderColor:"transparent rgba(232,97,10,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="hero-inner">
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(232,97,10,.1)",border:"1px solid rgba(232,97,10,.35)",padding:"6px 16px",borderRadius:2,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--orange-l)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--orange-l)",fontWeight:700,textTransform:"uppercase" }}>The Boring Guy · Adelaide &amp; Fleurieu Peninsula</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                NO DIG.<br/>
                <span style={{ color:"var(--orange)" }}>NO MESS.</span><br/>
                DONE RIGHT.
              </h1>
            </div>

            <div style={{ width:80,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginTop:16,marginBottom:20,borderRadius:2 }}/>

            <p ref={heroSubRef} style={{ fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:480,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              Saving you time and mess! Trenchless boring under driveways, paths and gardens — fast, clean, professional. With over 25 years in the construction industry, Gus specialises in the Grundomat pneumatic piercing tool for precise underground conduit installations.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="tel:+61402855619" className="btn-orange">📞 0402 855 619</a>
              <a href="#services" className="btn-outline">OUR SERVICES</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0402 855 619",         href:"tel:+61402855619" },
                { icon:"✉️", val:"gusjallen@gmail.com",  href:"mailto:gusjallen@gmail.com" },
              ].map(c => (
                <a key={c.val} href={c.href}
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                ><span>{c.icon}</span><span>{c.val}</span></a>
              ))}
            </div>
          </div>

          {/* ══ HERO VIS: Drill rig boring underground ══ */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 540 360" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 8px 40px rgba(0,0,0,0.6))" }}>

              {/* ── SCENE: House with driveway + Grundomat boring underneath ── */}

              {/* SKY / ABOVE GROUND */}
              <rect x="0" y="0" width="540" height="168" fill="#141414"/>

              {/* HOUSE — right side */}
              {/* House body */}
              <rect x="310" y="28" width="220" height="142" rx="3" fill="#1C1C1C" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
              {/* Roof */}
              <path d="M302,30 L420,4 L538,30Z" fill="#181818" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
              {/* Garage */}
              <rect x="330" y="90" width="90" height="80" fill="#1A1A1A" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              {[0,1,2,3].map(i => <line key={i} x1="330" y1={90+i*20} x2="420" y2={90+i*20} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>)}
              {/* Door */}
              <rect x="460" y="120" width="40" height="50" rx="1" fill="#161616" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              {/* Windows — lit */}
              <rect x="340" y="40" width="36" height="30" rx="2" fill="rgba(255,220,100,.08)" stroke="rgba(255,220,100,.12)" strokeWidth="1"/>
              <rect x="465" y="40" width="36" height="30" rx="2" fill="rgba(255,220,100,.08)" stroke="rgba(255,220,100,.12)" strokeWidth="1"/>
              {/* NBN box on house wall */}
              <rect x="496" y="78" width="18" height="24" rx="2" fill="#1E1E1E" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
              <circle cx="505" cy="90" r="3" fill="rgba(232,97,10,.6)"/>

              {/* DRIVEWAY — concrete slab */}
              <rect x="310" y="168" width="220" height="18" fill="#2A2A2A" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
              {/* Expansion joints */}
              {[365,420,475].map(x => <line key={x} x1={x} y1="168" x2={x} y2="186" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
              {/* Driveway top edge line */}
              <line x1="310" y1="169" x2="530" y2="169" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>

              {/* GRASS VERGE — left side of driveway */}
              <rect x="0" y="162" width="310" height="24" fill="#2D4018" opacity=".8"/>
              <rect x="0" y="166" width="310" height="20" fill="#253510" opacity=".5"/>
              {/* Garden hedge / plants along fence */}
              {[30,65,100,140,178,215,255,290].map(x => (
                <g key={x}>
                  <ellipse cx={x} cy={164} rx={13} ry={9} fill="#1E4A12" opacity=".9"/>
                  <ellipse cx={x+7} cy={160} rx={9} ry={7} fill="#255810" opacity=".7"/>
                </g>
              ))}

              {/* GROUND CROSS-SECTION */}
              {/* Topsoil */}
              <rect x="0" y="186" width="540" height="48" fill="#3D2B1A"/>
              {/* Subsoil */}
              <rect x="0" y="234" width="540" height="66" fill="#2A1D0E"/>
              {/* Rock/clay */}
              <rect x="0" y="300" width="540" height="60" fill="#1C1206"/>
              {/* Surface line */}
              <line x1="0" y1="186" x2="540" y2="186" stroke="rgba(232,97,10,.2)" strokeWidth="1.5"/>
              {/* Layer labels */}
              <text x="8" y="212" fontFamily="Barlow Condensed,sans-serif" fontSize="8" fill="rgba(232,97,10,.28)" letterSpacing="1.5">TOPSOIL</text>
              <text x="8" y="258" fontFamily="Barlow Condensed,sans-serif" fontSize="8" fill="rgba(232,97,10,.22)" letterSpacing="1.5">SUBSOIL</text>
              <text x="8" y="320" fontFamily="Barlow Condensed,sans-serif" fontSize="8" fill="rgba(232,97,10,.16)" letterSpacing="1.5">CLAY / ROCK</text>

              {/* BORE TUNNEL — under the driveway */}
              {/* Tunnel shadow */}
              <ellipse cx="420" cy="234" rx="180" ry="12" fill="rgba(14,8,2,.5)"/>
              {/* Installed conduit pipe */}
              <path d="M50,234 Q150,232 250,234 Q350,236 450,234 Q490,233 520,234"
                stroke="#E8610A" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".55"/>
              <path d="M50,234 Q150,232 250,234 Q350,236 450,234 Q490,233 520,234"
                stroke="rgba(255,140,40,.3)" strokeWidth="5" strokeLinecap="round" fill="none"/>
              {/* Bore path direction dashes */}
              <path d="M50,234 Q200,232 350,234 Q450,235 520,234"
                stroke="rgba(232,97,10,.4)" strokeWidth="2" strokeDasharray="10 6" strokeLinecap="round" fill="none"/>
              {/* Entry pit — left/grass side */}
              <rect x="36" y="186" width="20" height="35" rx="2" fill="#1A0E06" stroke="rgba(232,97,10,.45)" strokeWidth="1.5"/>
              <text x="46" y="230" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="7" fill="rgba(232,97,10,.4)" transform="rotate(-90,46,222)">ENTRY</text>
              {/* Exit pit — right side (under house) */}
              <rect x="504" y="186" width="18" height="32" rx="2" fill="#1A0E06" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
              {/* Conduit going up to NBN box */}
              <rect x="509" y="160" width="4" height="28" rx="1" fill="#E8610A" opacity=".45"/>

              {/* ══ GRUNDOMAT MACHINE on surface ══ */}
              {/* This is the key — it's compact, residential, NOT a big tracked excavator */}
              <g className="rig-scene">
                {/* Machine body — compact boxy unit */}
                <rect x="68" y="108" width="185" height="62" rx="5" fill="#1C1C1C" stroke="rgba(232,97,10,.45)" strokeWidth="2"/>
                {/* Orange stripe / branding */}
                <rect x="68" y="148" width="185" height="16" fill="rgba(232,97,10,.65)"/>
                {/* Engine section */}
                <rect x="76" y="116" width="90" height="26" rx="2" fill="#252525" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
                {[84,100,116,132,148].map(x => <rect key={x} x={x} y="118" width="4" height="22" rx="1" fill="rgba(255,255,255,.04)"/>)}
                {/* Control panel */}
                <rect x="178" y="114" width="68" height="30" rx="3" fill="#222" stroke="rgba(232,97,10,.2)" strokeWidth="1"/>
                {/* Dials & LEDs */}
                <circle cx="192" cy="124" r="6" fill="#1A1A1A" stroke="rgba(232,97,10,.3)" strokeWidth="1"/>
                <circle cx="192" cy="124" r="3" fill="rgba(232,97,10,.5)"/>
                <circle cx="210" cy="122" r="3" fill="rgba(100,255,100,.4)"/>
                <circle cx="224" cy="122" r="3" fill="rgba(232,97,10,.7)"/>
                <circle cx="210" cy="134" r="3" fill="rgba(255,255,255,.15)"/>
                <circle cx="224" cy="134" r="3" fill="rgba(255,255,255,.15)"/>
                {/* Brand on machine */}
                <text x="158" y="160" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="10" fill="rgba(14,14,14,.9)" letterSpacing="2">GRUNDOMAT</text>
                {/* Pneumatic hose — connects machine to probe in ground */}
                <path d="M68,158 Q58,162 50,168 Q44,174 44,186"
                  fill="none" stroke="#333" strokeWidth="8" strokeLinecap="round"/>
                <path d="M68,158 Q58,162 50,168 Q44,174 44,186"
                  fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
                {/* Pneumatic piercing probe in entry pit */}
                <rect x="40" y="186" width="12" height="28" rx="3" fill="#E8610A" stroke="rgba(255,120,30,.4)" strokeWidth="1.5"/>
                <path d="M46,214 L46,228" stroke="#FF7A22" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="46" cy="232" r="5" fill="#FF7A22"/>
                {/* Wheels — small rubber wheels */}
                {[86,136,186,236].map(wx => (
                  <g key={wx}>
                    <circle cx={wx} cy="172" r="10" fill="#111" stroke="rgba(232,97,10,.3)" strokeWidth="1.5"/>
                    <circle cx={wx} cy="172" r="5" fill="#1a1a1a"/>
                    <circle cx={wx} cy="172" r="2" fill="#444"/>
                  </g>
                ))}
              </g>

              {/* Operator silhouette — tradesperson standing beside machine */}
              <g style={{ opacity:0.75 }}>
                <circle cx="282" cy="132" r="12" fill="#C8A07A"/>
                {/* Hi-vis vest */}
                <rect x="270" y="144" width="24" height="30" rx="2" fill="#E8610A" opacity=".85"/>
                {/* Arms */}
                <rect x="254" y="148" width="16" height="7" rx="3" fill="#E8610A" opacity=".75"/>
                <rect x="294" y="148" width="16" height="7" rx="3" fill="#E8610A" opacity=".75"/>
                {/* Legs */}
                <rect x="272" y="174" width="8" height="20" rx="2" fill="#2a2d32"/>
                <rect x="282" y="174" width="8" height="20" rx="2" fill="#2a2d32"/>
                {/* Cap */}
                <path d="M270,130 Q282,122 294,130 L294,136 Q282,132 270,136Z" fill="#1C1C1C"/>
                {/* Clipboard/phone in hand */}
                <rect x="250" y="148" width="12" height="16" rx="1" fill="#555"/>
              </g>

              {/* Ground shadow */}
              <ellipse cx="270" cy="356" rx="260" ry="5" fill="rgba(0,0,0,.3)"/>

              {/* ── FLOATING BADGES ── */}
              {/* No mess badge */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.5s infinite" }}>
                <rect x="8" y="14" width="150" height="74" rx="3" fill="#1A1A1A"
                  style={{ filter:"drop-shadow(0 4px 18px rgba(0,0,0,.55))" }}/>
                <rect x="8" y="14" width="150" height="4" rx="3" fill="var(--orange)"/>
                <text x="83" y="40" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="#fff" letterSpacing="1">NO MESS.</text>
                <text x="83" y="56" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="11" fill="var(--orange-l)" letterSpacing="1">NO DIGGING.</text>
                <text x="83" y="80" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.3)">Driveways · Gardens · Paths</text>
              </g>
              {/* Same day quote badge */}
              <g style={{ animation:"float-badge 3.6s ease-in-out 1.8s infinite" }}>
                <rect x="382" y="12" width="150" height="74" rx="3" fill="#1A1A1A" stroke="rgba(232,97,10,.25)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,.4))" }}/>
                <rect x="382" y="12" width="150" height="4" rx="3" fill="rgba(232,97,10,.7)"/>
                <text x="457" y="38" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="14" fill="var(--orange-l)" letterSpacing="1">SAME DAY</text>
                <text x="457" y="54" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="14" fill="#fff" letterSpacing="1">QUOTE</text>
                <text x="457" y="78" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.3)">25+ years experience</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.3,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(232,97,10,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--orange),var(--orange-l),var(--orange),transparent)" }}/>
        <div className="stat-grid">
          {[
            { n:"25+",        l:"Years in Construction" },
            { n:"Grundomat",  l:"Pneumatic Boring"     },
            { n:"45mm",       l:"Max Pipe Diameter"    },
            { n:"1–12m",      l:"Bore Length Range"    },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--orange-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(240,237,232,.3)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height:2,background:"linear-gradient(90deg,transparent,var(--orange),transparent)",opacity:.4 }}/>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>What We Do</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              TRENCHLESS<br/><span style={{ color:"var(--orange)" }}>BORING SERVICES</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginTop:16,borderRadius:2 }}/>
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
      <section id="work" className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Our Work</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              THE RIG &amp;<br/><span style={{ color:"var(--orange)" }}>RECENT JOBS</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginTop:16,borderRadius:2 }}/>
          </div>

          <div ref={galleryRef} className="gallery-grid">

            {/* Card 1 — Driveway boring: before/after cross-section, main hero card */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#141414"/>
                {/* Surface — house + garage on left */}
                <rect width="520" height="130" fill="#141414"/>
                {/* House wall */}
                <rect x="0" y="20" width="180" height="110" fill="#1C1C1C" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                {/* Garage door */}
                <rect x="15" y="55" width="80" height="65" fill="#222" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
                {[0,1,2,3].map(i => <line key={i} x1="15" y1={55+i*16} x2="95" y2={55+i*16} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
                {/* Roof */}
                <path d="M0,22 L90,0 L180,22Z" fill="#191919" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                {/* Driveway surface — concrete slab */}
                <rect x="0" y="120" width="340" height="16" fill="#2A2A2A" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
                {/* Concrete join lines */}
                {[85,170,255].map(x => <line key={x} x1={x} y1="120" x2={x} y2="136" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>)}
                {/* Grass on right side of driveway */}
                <rect x="340" y="118" width="180" height="18" fill="#2D4A1A" opacity=".8"/>
                {/* Footpath beyond */}
                <rect x="440" y="115" width="80" height="21" fill="#252525" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                {/* Ground layers cross-section */}
                <rect x="0" y="136" width="520" height="50" fill="#3D2B1A"/>
                <rect x="0" y="186" width="520" height="50" fill="#2A1D0E"/>
                <rect x="0" y="236" width="520" height="44" fill="#1C1206"/>
                {/* Layer labels */}
                <text x="480" y="158" fontFamily="Barlow Condensed,sans-serif" fontSize="7.5" fill="rgba(232,97,10,.3)" letterSpacing="1">TOPSOIL</text>
                <text x="480" y="208" fontFamily="Barlow Condensed,sans-serif" fontSize="7.5" fill="rgba(232,97,10,.25)" letterSpacing="1">SUBSOIL</text>
                {/* BEFORE side — left: no pipe yet, ground undisturbed */}
                <text x="80" y="150" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="9" fill="rgba(255,255,255,.25)" letterSpacing="2">BEFORE</text>
                {/* AFTER side — right: pipe installed, no surface damage */}
                <text x="380" y="150" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="9" fill="rgba(232,97,10,.55)" letterSpacing="2">AFTER</text>
                {/* Divider dashed line */}
                <line x1="250" y1="136" x2="250" y2="280" stroke="rgba(232,97,10,.2)" strokeWidth="1.5" strokeDasharray="6 4"/>
                {/* Installed pipe — right side only */}
                <rect x="250" y="185" width="270" height="8" rx="4" fill="#E8610A" opacity=".65"/>
                <rect x="250" y="187" width="270" height="4" rx="2" fill="rgba(255,140,40,.3)"/>
                {/* Grundomat machine — compact, sitting on surface left side */}
                <g transform="translate(185,78)">
                  {/* Machine body — small, compact */}
                  <rect x="0" y="0" width="55" height="35" rx="3" fill="#1C1C1C" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
                  <rect x="0" y="26" width="55" height="9" fill="rgba(232,97,10,.6)"/>
                  {/* Control panel */}
                  <rect x="30" y="5" width="20" height="16" rx="1" fill="#222" stroke="rgba(232,97,10,.2)" strokeWidth="1"/>
                  <circle cx="36" cy="13" r="2" fill="rgba(232,97,10,.6)"/>
                  <circle cx="44" cy="13" r="2" fill="rgba(255,255,255,.2)"/>
                  {/* Nose/front */}
                  <rect x="-12" y="12" width="14" height="8" rx="2" fill="#E8610A" opacity=".7"/>
                  {/* Brand */}
                  <text x="14" y="18" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="7" fill="var(--orange)" letterSpacing="1">GRUNDOMAT</text>
                  {/* Wheels */}
                  {[8,42].map(wx => <circle key={wx} cx={wx} cy="36" r="6" fill="#111" stroke="rgba(232,97,10,.3)" strokeWidth="1.5"/>)}
                </g>
                {/* Entry pit */}
                <rect x="183" y="136" width="16" height="22" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                {/* Bore path arrow */}
                <path d="M191,158 Q220,160 250,162 Q350,168 460,170"
                  stroke="rgba(232,97,10,.45)" strokeWidth="2" strokeDasharray="8 5" fill="none"/>
                {/* Exit point right */}
                <circle cx="462" cy="189" r="7" fill="rgba(232,97,10,.3)" stroke="rgba(232,97,10,.55)" strokeWidth="1.5"/>
                <circle cx="462" cy="189" r="3" fill="rgba(232,97,10,.6)"/>
                {/* Checkmark on right — surface intact */}
                <circle cx="390" cy="126" r="14" fill="rgba(232,97,10,.15)" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
                <path d="M382,126 L388,133 L400,118" stroke="var(--orange-l)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>DRIVEWAY BORING</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,97,10,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Grundomat bores under slab — concrete stays untouched</div>
              </div>
            </div>

            {/* Card 2 — Grundomat machine detail + garden context */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#111"/>
                {/* Garden scene background */}
                {/* Lawn */}
                <rect x="0" y="150" width="240" height="130" fill="#2D4018"/>
                <rect x="0" y="152" width="240" height="128" fill="#253510" opacity=".4"/>
                {/* Garden beds */}
                <rect x="0" y="140" width="240" height="18" fill="#3D2B1A"/>
                {[20,45,70,95,120,145,170,195,220].map(x => (
                  <ellipse key={x} cx={x} cy={140} rx="10" ry="7" fill="#1A3A10" opacity=".85"/>
                ))}
                {/* Sky/wall */}
                <rect x="0" y="0" width="240" height="90" fill="#161616"/>
                {/* House fence */}
                <rect x="0" y="82" width="240" height="12" fill="#1E1E1E" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                {[0,30,60,90,120,150,180,210].map(x => <rect key={x} x={x+2} y="72" width="10" height="14" rx="1" fill="#222"/>)}
                {/* Grundomat machine — detailed, compact residential boring tool */}
                <g transform="translate(60,95)">
                  {/* Main body — orange + dark */}
                  <rect x="0" y="0" width="120" height="48" rx="4" fill="#1C1C1C" stroke="rgba(232,97,10,.45)" strokeWidth="2"/>
                  {/* Orange stripe */}
                  <rect x="0" y="36" width="120" height="12" fill="rgba(232,97,10,.7)"/>
                  {/* Control panel right side */}
                  <rect x="80" y="6" width="34" height="24" rx="2" fill="#222" stroke="rgba(232,97,10,.2)" strokeWidth="1"/>
                  {/* LED indicators */}
                  <circle cx="90" cy="14" r="3" fill="rgba(232,97,10,.8)"/>
                  <circle cx="102" cy="14" r="3" fill="rgba(100,255,100,.4)"/>
                  <circle cx="90" cy="24" r="2" fill="rgba(255,255,255,.15)"/>
                  <circle cx="102" cy="24" r="2" fill="rgba(255,255,255,.15)"/>
                  {/* Engine/compressor left */}
                  <rect x="6" y="6" width="68" height="26" rx="2" fill="#252525" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
                  {[14,26,38,50].map(x => <rect key={x} x={x} y="8" width="5" height="22" rx="1" fill="rgba(255,255,255,.04)"/>)}
                  {/* Nose with pneumatic piercing probe */}
                  <rect x="-22" y="16" width="24" height="12" rx="3" fill="#E8610A" stroke="rgba(255,120,30,.4)" strokeWidth="1"/>
                  <path d="M-22,22 L-30,22" stroke="#FF7A22" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="-30" cy="22" r="4" fill="#FF7A22"/>
                  {/* Brand text */}
                  <text x="40" y="50" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="9" fill="rgba(14,14,14,.9)" letterSpacing="1.5">GRUNDOMAT</text>
                  {/* Wheels */}
                  {[15,95].map(wx => (
                    <g key={wx}>
                      <circle cx={wx} cy="50" r="10" fill="#111" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                      <circle cx={wx} cy="50" r="5" fill="#1a1a1a"/>
                    </g>
                  ))}
                </g>
                {/* Pneumatic hose */}
                <path d="M58,119 Q40,125 30,140 Q20,152 22,165"
                  fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
                <path d="M58,119 Q40,125 30,140 Q20,152 22,165"
                  fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round"/>
                {/* Entry pit in garden */}
                <rect x="14" y="156" width="18" height="22" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.3)" strokeWidth="1.5"/>
                {/* Bore direction arrow underground */}
                <path d="M23,178 Q80,182 150,180 Q200,179 230,180"
                  stroke="rgba(232,97,10,.4)" strokeWidth="2" strokeDasharray="7 4" fill="none"/>
                {/* Minimal disruption badge */}
                <rect x="130" y="96" width="98" height="32" rx="2" fill="rgba(232,97,10,.1)" stroke="rgba(232,97,10,.3)" strokeWidth="1"/>
                <text x="179" y="109" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8.5" fill="var(--orange-l)" letterSpacing=".5">TIGHT SPACES</text>
                <text x="179" y="121" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="7.5" fill="rgba(232,97,10,.6)">SPECIALIST</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>THE GRUNDOMAT</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,97,10,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Compact pneumatic piercing — fits where others can&apos;t</div>
              </div>
            </div>

            {/* Card 3 — Garden/landscaping boring */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#111"/>
                {/* Garden scene — lush SA garden */}
                <rect width="200" height="80" fill="#1A2810"/>
                {/* Sky with subtle gradient */}
                <rect width="200" height="80" fill="#141A0E" opacity=".6"/>
                {/* Trees / plants */}
                {[20,55,90,135,170].map((x,i) => (
                  <g key={x}>
                    <rect x={x-2} y={40+i%2*8} width="4" height={40-i%2*8} fill="#2A1E0C"/>
                    <ellipse cx={x} cy={38+i%2*8} rx={14+i%2*4} ry={11+i%2*3} fill="#1E4A12" opacity=".9"/>
                    <ellipse cx={x+5} cy={32+i%2*8} rx={10} ry={8} fill="#255810" opacity=".7"/>
                  </g>
                ))}
                {/* Grass strip */}
                <rect x="0" y="78" width="200" height="14" fill="#3A5C1A" opacity=".8"/>
                {/* Garden bed */}
                <rect x="0" y="92" width="200" height="18" fill="#3D2B1A"/>
                {/* Mulch texture */}
                {[10,30,55,80,105,130,155,175].map(x => (
                  <ellipse key={x} cx={x} cy="101" rx="8" ry="3" fill="#4A3520" opacity=".6"/>
                ))}
                {/* Ground */}
                <rect x="0" y="110" width="200" height="60" fill="#3A2510"/>
                <rect x="0" y="170" width="200" height="40" fill="#281806"/>
                {/* Irrigation pipe — blue */}
                <rect x="0" y="145" width="200" height="6" rx="3" fill="#1A5A8A" opacity=".75"/>
                <rect x="0" y="146" width="200" height="3" rx="1.5" fill="rgba(60,160,240,.35)"/>
                {/* Entry/exit pits — small, clean */}
                <rect x="6" y="110" width="14" height="22" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                <rect x="180" y="110" width="14" height="22" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                {/* Checkmarks on surface — garden undisturbed */}
                <circle cx="100" cy="86" r="12" fill="rgba(232,97,10,.15)" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
                <path d="M94,86 L99,92 L108,79" stroke="var(--orange-l)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                {/* Label */}
                <rect x="30" y="118" width="140" height="16" rx="2" fill="rgba(26,90,138,.15)" stroke="rgba(40,140,220,.2)" strokeWidth="1"/>
                <text x="100" y="129" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8" fill="rgba(100,180,255,.7)" letterSpacing="1">IRRIGATION PIPE</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>GARDEN BORING</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,97,10,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Landscaping untouched · Irrigation &amp; water</div>
              </div>
            </div>

            {/* Card 4 — Footpath / council path */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#111"/>
                {/* Street scene — top down cross-section */}
                {/* Grass verge left */}
                <rect x="0" y="0" width="50" height="80" fill="#2D4018" opacity=".7"/>
                {/* Footpath */}
                <rect x="50" y="0" width="60" height="80" fill="#2A2A2A" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                {/* Joint lines on path */}
                {[20,40,60].map(y => <line key={y} x1="50" y1={y} x2="110" y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
                {/* Road */}
                <rect x="110" y="0" width="90" height="80" fill="#1E1E1E"/>
                <line x1="155" y1="0" x2="155" y2="80" stroke="rgba(255,255,255,.08)" strokeWidth="2" strokeDasharray="12 8"/>
                {/* Cross-section ground below */}
                <rect x="0" y="80" width="200" height="55" fill="#3D2B1A"/>
                <rect x="0" y="135" width="200" height="40" fill="#2A1D0E"/>
                <rect x="0" y="175" width="200" height="35" fill="#1C1206"/>
                {/* Bore path — orange conduit */}
                <rect x="0" y="118" width="200" height="7" rx="3.5" fill="#E8610A" opacity=".6"/>
                <rect x="0" y="120" width="200" height="3" rx="1.5" fill="rgba(255,140,40,.3)"/>
                {/* Entry pit (left, grass verge side) */}
                <rect x="6" y="80" width="14" height="26" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
                {/* Exit (right, road side) */}
                <rect x="180" y="80" width="14" height="26" rx="1" fill="#1A0E06" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
                {/* No-cut badge */}
                <rect x="40" y="88" width="120" height="20" rx="2" fill="rgba(232,97,10,.1)" stroke="rgba(232,97,10,.25)" strokeWidth="1"/>
                <text x="100" y="98" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8" fill="var(--orange-l)" letterSpacing="1">NO COUNCIL PERMIT</text>
                <text x="100" y="106" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="7" fill="rgba(232,97,10,.5)" letterSpacing=".5">path stays intact</text>
                {/* Direction arrow */}
                <path d="M20,121 Q80,119 140,121 Q170,122 192,122"
                  stroke="rgba(232,97,10,.4)" strokeWidth="1.5" strokeDasharray="6 4" fill="none"/>
                {/* Measurement */}
                <line x1="10" y1="155" x2="190" y2="155" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="4 3"/>
                <text x="100" y="163" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontSize="8" fill="rgba(255,255,255,.25)" letterSpacing=".5">5 – 10 metres typical</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>FOOTPATH CROSSING</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,97,10,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Under council paths · No permit to cut</div>
              </div>
            </div>

            {/* Card 5 — Electrical + comms conduit */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#0E0E0E"/>
                {/* House facade */}
                <rect x="20" y="10" width="160" height="100" fill="#181818" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                <path d="M12,12 L100,0 L188,12Z" fill="#141414" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
                {/* Windows — lit up */}
                <rect x="35" y="30" width="30" height="26" rx="2" fill="rgba(255,220,100,.1)" stroke="rgba(255,220,100,.15)" strokeWidth="1"/>
                <rect x="35" y="30" width="30" height="26" rx="2" fill="rgba(255,220,100,.04)"/>
                <rect x="135" y="30" width="30" height="26" rx="2" fill="rgba(255,220,100,.1)" stroke="rgba(255,220,100,.15)" strokeWidth="1"/>
                {/* NBN connection box on wall */}
                <rect x="152" y="72" width="22" height="28" rx="2" fill="#1E1E1E" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                <rect x="156" y="76" width="14" height="8" rx="1" fill="#222"/>
                <circle cx="163" cy="90" r="3" fill="rgba(232,97,10,.6)"/>
                {/* Conduit on wall going down */}
                <rect x="161" y="100" width="4" height="12" rx="1" fill="#E8610A" opacity=".5"/>
                {/* Ground */}
                <rect x="0" y="112" width="200" height="40" fill="#2A1808"/>
                <rect x="0" y="152" width="200" height="30" fill="#1E1006"/>
                <rect x="0" y="182" width="200" height="28" fill="#140E04"/>
                {/* Orange conduit horizontal — power */}
                <rect x="0" y="128" width="200" height="6" rx="3" fill="#E8610A" opacity=".65"/>
                <rect x="0" y="130" width="200" height="3" rx="1.5" fill="rgba(255,140,40,.3)"/>
                {/* Grey conduit — NBN/data */}
                <rect x="0" y="140" width="200" height="5" rx="2.5" fill="#666" opacity=".55"/>
                {/* Labels */}
                <text x="15" y="127" fontFamily="Barlow Condensed,sans-serif" fontSize="7" fill="rgba(232,97,10,.5)" letterSpacing="1">POWER</text>
                <text x="15" y="139" fontFamily="Barlow Condensed,sans-serif" fontSize="7" fill="rgba(150,150,150,.5)" letterSpacing="1">NBN / DATA</text>
                {/* Entry pit */}
                <rect x="155" y="112" width="12" height="18" rx="1" fill="#0E0806" stroke="rgba(232,97,10,.35)" strokeWidth="1.5"/>
                {/* Exit left side — to meter/pit */}
                <circle cx="10" cy="131" r="7" fill="rgba(232,97,10,.2)" stroke="rgba(232,97,10,.45)" strokeWidth="1.5"/>
                <circle cx="10" cy="131" r="3" fill="rgba(232,97,10,.55)"/>
                {/* Electricity symbol */}
                <path d="M108,162 L115,152 L108,152 L115,142" stroke="rgba(232,97,10,.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* BYDA badge */}
                <rect x="50" y="170" width="100" height="18" rx="2" fill="rgba(232,97,10,.08)" stroke="rgba(232,97,10,.2)" strokeWidth="1"/>
                <text x="100" y="182" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="8" fill="rgba(232,97,10,.55)" letterSpacing="1">BYDA-FIRST</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.92),transparent)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1rem",color:"#fff",letterSpacing:"1px" }}>POWER &amp; COMMUNICATIONS</div>
                <div style={{ fontSize:".72rem",color:"rgba(232,97,10,.85)",marginTop:2,fontFamily:"'Barlow',sans-serif" }}>Electrical, NBN, data conduit · BYDA-first</div>
              </div>
            </div>

          </div>
          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'Barlow',sans-serif" }}>
            Trenchless boring across South Australia — <a href="mailto:gusjallen@gmail.com" style={{ color:"var(--orange-l)",textDecoration:"none",fontWeight:500 }}>get in touch</a> for a quote
          </p>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section-sm" style={{ background:"var(--dark3)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-1100" style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>What They Say</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:48,letterSpacing:"-1px" }}>
            TRUSTED BY SA<br/><span style={{ color:"var(--orange)" }}>TRADESPEOPLE</span>
          </h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24,maxWidth:800,margin:"0 auto" }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background:"var(--dark2)",border:"1px solid var(--border2)",borderRadius:3,padding:"32px 28px",position:"relative",textAlign:"left" }}>
                {/* Quote mark */}
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"5rem",color:"rgba(232,97,10,.2)",lineHeight:.6,marginBottom:16,fontWeight:900 }}>&ldquo;</div>
                <p style={{ fontFamily:"'Barlow',sans-serif",fontSize:"1rem",color:"rgba(240,237,232,.85)",lineHeight:1.7,fontStyle:"italic",marginBottom:20 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop:"1px solid var(--border2)",paddingTop:16 }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".95rem",color:"#fff",letterSpacing:".5px",textTransform:"uppercase" }}>{t.name}</div>
                  <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".8rem",color:"var(--orange-l)",marginTop:2 }}>{t.role}</div>
                </div>
                {/* Orange left bar */}
                <div style={{ position:"absolute",top:0,left:0,bottom:0,width:3,background:"linear-gradient(180deg,var(--orange),var(--orange-d))",borderRadius:"3px 0 0 3px" }}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="section-pad" style={{ background:"var(--dark2)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Common Questions</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              FAQs
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginTop:14,borderRadius:2 }}/>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(460px,1fr))",gap:0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ padding:"22px 0",borderBottom:"1px solid var(--border2)",display:"flex",gap:20,alignItems:"flex-start" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"var(--orange)",lineHeight:1,minWidth:28,marginTop:2 }}>{i+1}</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1rem",color:"#fff",marginBottom:6,textTransform:"uppercase",letterSpacing:".5px" }}>{faq.q}</div>
                  <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".88rem",color:"var(--muted)",lineHeight:1.7 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--black)",textAlign:"center",position:"relative" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--orange),var(--orange-l),var(--orange),transparent)" }}/>
        <div className="inner-1100">
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(232,97,10,.55)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Where We Work</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            ADELAIDE &amp; FLEURIEU<br/><span style={{ color:"var(--orange-l)" }}>SERVICE AREAS</span>
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 22px",background:"rgba(232,97,10,.06)",border:"1px solid rgba(232,97,10,.2)",color:"rgba(240,237,232,.8)",fontSize:".9rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:2 }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(240,237,232,.25)",fontSize:".85rem",fontFamily:"'Barlow',sans-serif" }}>
            Based in Middleton on the Fleurieu Peninsula. Proudly serving Adelaide and surrounding regions.
          </p>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--orange),transparent)",opacity:.35 }}/>
      </section>

      {/* ══ WHY SOUTHERN BORING ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--dark)",borderTop:"1px solid var(--border2)" }}>
        <div className="why-grid">
          {/* Left — dark panel */}
          <div ref={whyLeftRef} style={{ background:"var(--dark2)",padding:"48px 40px",position:"relative",overflow:"hidden",borderRadius:3,border:"1px solid var(--border2)" }}>
            {/* Orange corner marks */}
            {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:22,height:22,
                borderTop:i<2?"2.5px solid var(--orange)":undefined,
                borderBottom:i>=2?"2.5px solid var(--orange)":undefined,
                borderLeft:i%2===0?"2.5px solid var(--orange)":undefined,
                borderRight:i%2===1?"2.5px solid var(--orange)":undefined,
              }}/>
            ))}

            {/* Large drill emblem */}
            <div style={{ textAlign:"center",marginBottom:28 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="55" fill="rgba(232,97,10,.04)" stroke="rgba(232,97,10,.25)" strokeWidth="1.5"/>
                {/* Cog teeth */}
                {Array.from({length:12},(_,i) => {
                  const a=(i/12)*Math.PI*2;
                  return <line key={i}
                    x1={(60+Math.cos(a)*46).toFixed(2)} y1={(60+Math.sin(a)*46).toFixed(2)}
                    x2={(60+Math.cos(a)*54).toFixed(2)} y2={(60+Math.sin(a)*54).toFixed(2)}
                    stroke="rgba(232,97,10,.45)" strokeWidth="5.5" strokeLinecap="square"/>;
                })}
                <circle cx="60" cy="60" r="36" fill="var(--dark)" stroke="rgba(232,97,10,.15)" strokeWidth="1"/>
                {/* Drill arrow */}
                <polygon points="60,30 68,60 60,50 52,60" fill="var(--orange)" opacity=".9"/>
                <text x="60" y="82" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="16" fill="rgba(232,97,10,.7)" letterSpacing="1">BORE</text>
              </svg>
            </div>

            <div style={{ textAlign:"center",marginBottom:28 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"#fff",lineHeight:1 }}>SOUTHERN BORING</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".62rem",color:"rgba(232,97,10,.5)",letterSpacing:"3px",textTransform:"uppercase",marginTop:4 }}>Solutions · Middleton SA</div>
            </div>

            {[
              ["Grundomat Technology",  "Pneumatic piercing tool designed for tight residential spaces — accurate, quiet and non-invasive."],
              ["25+ Years Experience",  "Over two decades in construction. Gus knows SA soil conditions, council requirements and tradespeople."],
              ["Adelaide + Fleurieu",   "Proudly serving Adelaide, the Fleurieu Peninsula and surrounding regions."],
            ].map(([t,d]) => (
              <div key={t as string} style={{ display:"flex",gap:12,marginBottom:16 }}>
                <div style={{ width:22,height:22,background:"rgba(232,97,10,.1)",border:"1px solid rgba(232,97,10,.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2,6 L5,9 L10,3" stroke="var(--orange-l)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:"#fff",fontSize:".9rem",marginBottom:2,textTransform:"uppercase" }}>{t as string}</div>
                  <div style={{ color:"var(--muted)",fontSize:".8rem",lineHeight:1.65,fontFamily:"'Barlow',sans-serif" }}>{d as string}</div>
                </div>
              </div>
            ))}

            <div style={{ position:"absolute",bottom:-1,right:-1,background:"var(--orange)",color:"#fff",padding:"12px 20px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".75rem",lineHeight:1.4,letterSpacing:"1px",borderRadius:"3px 0 3px 0" }}>
              FREE<br/>QUOTE
            </div>
          </div>

          {/* Right */}
          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>Why Choose Southern Boring</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:12,letterSpacing:"-1px" }}>
              SOUTH AUSTRALIA&apos;S<br/><span style={{ color:"var(--orange)" }}>TRENCHLESS</span><br/>SPECIALISTS
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginBottom:32,borderRadius:2 }}/>
            {[
              { icon:"⛏️", title:"No Cutting or Lifting",     desc:"We drill under driveways, paths and gardens — no need to rip anything up. Your property stays intact." },
              { icon:"🎯", title:"Grundomat Precision",        desc:"Our Grundomat pneumatic piercing tool achieves high target accuracy even in challenging soil — sand, clay or shale." },
              { icon:"🏘️", title:"Tight Spaces Specialist",   desc:"The Grundomat is built for narrow residential access. We go where bigger, more expensive machines can't." },
              { icon:"📍", title:"SA Local — The Boring Guy",  desc:"Based in Middleton. Gus has 25+ years in construction and is known by landscapers and builders across SA." },
              { icon:"✅", title:"BYDA-First Operation",      desc:"We always operate Before You Dig Australia-first and can coordinate certified utility locates if required." },
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
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"var(--dark2)",borderTop:"1px solid var(--border2)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--orange),var(--orange-l),var(--orange),transparent)" }}/>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(232,97,10,.05) 0%,transparent 70%)",pointerEvents:"none" }}/>
        {/* Hazard diagonal subtle */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,rgba(232,97,10,.015) 0,rgba(232,97,10,.015) 1px,transparent 1px,transparent 28px)",pointerEvents:"none" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"5px",color:"var(--orange)",marginBottom:14,fontWeight:700,textTransform:"uppercase" }}>Get a Quote</div>
        <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5.5vw,4rem)",fontWeight:900,color:"#fff",lineHeight:.9,marginBottom:16,letterSpacing:"-1px" }}>
          SAME DAY<br/><span style={{ color:"var(--orange)" }}>QUOTE.</span>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:440,margin:"0 auto 36px",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>
          24/7 availability. Free quotes. South Australia&apos;s trenchless boring specialists.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="tel:+61402855619" className="btn-orange">📞 0402 855 619</a>
          <a href="mailto:gusjallen@gmail.com" className="btn-outline">✉️ EMAIL US</a>
        </div>
        <p style={{ marginTop:16,color:"rgba(240,237,232,.18)",fontSize:".78rem",fontFamily:"'Barlow',sans-serif" }}>
          Middleton SA 5213 · Fleurieu Peninsula &amp; Adelaide · gusjallen@gmail.com
        </p>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--orange-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get In Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              CONTACT<br/><span style={{ color:"var(--orange)" }}>SOUTHERN BORING</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",marginTop:14,borderRadius:2 }}/>
          </div>

          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone",        val:"0402 855 619",                href:"tel:+61402855619" },
                { icon:"✉️", label:"Email",        val:"gusjallen@gmail.com",         href:"mailto:gusjallen@gmail.com" },
                { icon:"🌐", label:"Website",      val:"southernboringsolutions.com", href:"https://southernboringsolutions.com" },
                { icon:"📍", label:"Address",      val:"182 Newell Ave, Middleton SA 5213", href:"https://maps.google.com/?q=182+Newell+Ave+Middleton+SA+5213" },
                { icon:"🕐", label:"Hours",        val:"Always open — 24/7",          href:undefined },
                { icon:"🗺️", label:"Service Area", val:"Port Elliot · Victor Harbor · Mount Barker · SA Wide", href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"14px 18px",background:"var(--dark2)",border:"1px solid var(--border2)",borderRadius:3 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--orange-l)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"#fff",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--orange-l)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{c.val}</a>
                      : <span style={{ color:"rgba(240,237,232,.7)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"var(--dark2)",border:"1px solid var(--border2)",padding:"36px 32px",borderRadius:3,boxShadow:"0 4px 40px rgba(0,0,0,.3)" }}>
              <div style={{ height:3,background:"linear-gradient(90deg,var(--orange),var(--orange-l))",margin:"-36px -32px 26px",borderRadius:"3px 3px 0 0" }}/>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.25rem",color:"#fff",letterSpacing:"1px",marginBottom:6,textTransform:"uppercase" }}>Get a Free Quote</div>
              <p style={{ color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",marginBottom:24,lineHeight:1.6 }}>Tell us about your boring job and we&apos;ll get back to you fast.</p>

              {[
                { label:"Your Name",   type:"text",  ph:"John Smith" },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX" },
                { label:"Email",       type:"email", ph:"you@example.com" },
                { label:"Job Type",    type:"text",  ph:"e.g. Road crossing, driveway, water pipe…" },
                { label:"Location",    type:"text",  ph:"e.g. Port Elliot, Victor Harbor, Mount Barker…" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(240,237,232,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border2)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(232,97,10,.5)"}
                    onBlur={e=>e.target.style.borderColor="var(--border2)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(240,237,232,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Job Details</label>
                <textarea rows={3} placeholder="Pipe size, bore length, depth required, any specific conditions…"
                  style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border2)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:2,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(232,97,10,.5)"}
                  onBlur={e=>e.target.style.borderColor="var(--border2)"}
                />
              </div>
              <button className="btn-orange" style={{ width:"100%",fontSize:".9rem" }}>⛏️ GET SAME DAY QUOTE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--dark2)",padding:"0 52px 28px",borderTop:"1px solid var(--border2)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--orange),var(--orange-l),var(--orange),transparent)",marginBottom:28 }}/>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <svg width="36" height="36" viewBox="0 0 46 46">
              <circle cx="23" cy="23" r="21" fill="#1A1A1A" stroke="rgba(232,97,10,.4)" strokeWidth="1.5"/>
              {Array.from({length:10},(_,i) => {
                const a=(i/10)*Math.PI*2;
                return <line key={i}
                  x1={(23+Math.cos(a)*17).toFixed(2)} y1={(23+Math.sin(a)*17).toFixed(2)}
                  x2={(23+Math.cos(a)*21).toFixed(2)} y2={(23+Math.sin(a)*21).toFixed(2)}
                  stroke="rgba(232,97,10,.5)" strokeWidth="4" strokeLinecap="square"/>;
              })}
              <circle cx="23" cy="23" r="12" fill="#0E0E0E"/>
              <polygon points="23,13 27,23 23,19 19,23" fill="var(--orange)" opacity=".85"/>
            </svg>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".9rem",color:"rgba(255,255,255,.75)",letterSpacing:"2px",textTransform:"uppercase" }}>The Boring Guy — Southern Boring Solutions</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(232,97,10,.45)",letterSpacing:"2px",textTransform:"uppercase" }}>Gus Allen · Middleton SA 5213 · Trenchless Boring</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61402855619" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>0402 855 619</a>
            <a href="mailto:gusjallen@gmail.com" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>gusjallen@gmail.com</a>
            <a href="https://southernboringsolutions.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>southernboringsolutions.com</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.15)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Southern Boring Solutions. SA, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
