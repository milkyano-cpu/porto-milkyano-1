"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: "🎨", title: "Interior Painting",     desc: "Full room repaints, feature walls, ceilings and trims. Clean edges, no mess, professional finish every time." },
  { icon: "🏠", title: "Exterior Painting",      desc: "Weather-resistant exterior coatings. Doors, fascias, fences and full house exteriors done properly." },
  { icon: "🧱", title: "Crack Repair & Prep",   desc: "Surface preparation, crack filling and patching before any coat goes on. The difference between a good job and a great one." },
  { icon: "🛁", title: "Bathrooms & Kitchens",  desc: "Moisture-resistant paints and proper prep for wet areas. Bathrooms, laundries and kitchens handled with care." },
  { icon: "✨", title: "Feature Walls",          desc: "Bold colours, textured finishes and accent walls that make a room. Navy, charcoal, sage — whatever the vision." },
  { icon: "🔧", title: "Handover & Touch-Ups",  desc: "New builds, rentals and investment properties. Fresh paint for handover, bond cleans and property prep." },
];

const AREAS = ["Darwin", "Alice Springs", "Araluen", "Katherine", "Palmerston", "Litchfield", "Batchelor", "NT Wide"];

// SSR-safe pre-computed roller spoke positions
const ROLLER_SPOKES = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return {
    x1: +(Math.cos(a) * 7).toFixed(3),
    y1: +(Math.sin(a) * 7).toFixed(3),
    x2: +(Math.cos(a) * 14).toFixed(3),
    y2: +(Math.sin(a) * 14).toFixed(3),
  };
});

// Pre-computed drip positions — no Math.random()
const DRIP_DATA = [
  { x: 80,  h: 18, w: 5, delay: "2.8s" },
  { x: 145, h: 28, w: 6, delay: "3.1s" },
  { x: 210, h: 14, w: 4, delay: "3.4s" },
  { x: 275, h: 22, w: 5, delay: "2.9s" },
  { x: 340, h: 32, w: 7, delay: "3.2s" },
  { x: 400, h: 18, w: 5, delay: "3.6s" },
];

// Pre-computed brush stroke dash offsets for reveal
const STROKE_LENGTHS = [380, 320, 350];

export default function ShaunPainting() {
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
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: TA },
          y: 50, opacity: 0, scale: 0.94, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.08,
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
        y: 60, opacity: 0, scale: 0.96, duration: 0.8, ease: "power3.out",
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
    <div style={{ background:"#fafaf8", color:"#1a1a1a", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --navy:    #1B2B5E;
          --navy-d:  #141f47;
          --navy-l:  #2a3f7e;
          --cream:   #fafaf8;
          --cream2:  #f4f3ef;
          --cream3:  #eeede8;
          --sand:    #e8e5dc;
          --accent:  #c9a84c;
          --glow:    rgba(27,43,94,0.15);
          --border:  rgba(27,43,94,0.12);
          --text:    #1a1a1a;
          --muted:   rgba(26,26,26,0.45);
        }

        @keyframes slideDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot-pulse  { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes bounce     { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes float-badge{ 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }

        /* ══════════════════════════════════════════
           HERO PAINTING ANIMATIONS — Moving Brush
        ══════════════════════════════════════════ */

        /*
          HOW IT WORKS — 3 brush strokes, each is a full cycle:
          Brush starts right (hidden), sweeps LEFT across wall leaving paint trail,
          lifts up, snaps back to right, sweeps again for next row.
          Each stroke is on its own timeline so they chain nicely.

          The paint trail uses stroke-dashoffset on the path —
          brush position is synced so brush tip is always at the leading edge.
        */

        /* ── Stroke 1 — top row, sweeps right→left, starts at 0.2s ── */
        @keyframes brush1-move {
          /* Start: right side, lifted */
          0%        { transform: translate(410px, 82px) rotate(25deg); opacity:0; }
          3%        { transform: translate(410px, 82px) rotate(25deg); opacity:1; }
          /* Lower to wall, begin stroke */
          6%        { transform: translate(410px, 95px) rotate(18deg); opacity:1; }
          /* Sweep left across wall */
          28%       { transform: translate(42px,  92px) rotate(18deg); }
          /* Lift off at left edge */
          32%       { transform: translate(30px,  80px) rotate(25deg); }
          /* Return right fast (invisible lift) */
          40%       { transform: translate(410px, 80px) rotate(25deg); opacity:.0; }
          /* Stay parked */
          100%      { transform: translate(410px, 80px) rotate(25deg); opacity:0; }
        }
        @keyframes trail1-reveal {
          0%,5%     { stroke-dashoffset: 420px; }
          30%       { stroke-dashoffset: 0px; }
          100%      { stroke-dashoffset: 0px; }
        }

        /* ── Stroke 2 — middle row, sweeps left→right, starts after stroke 1 ── */
        @keyframes brush2-move {
          0%,32%    { transform: translate(30px, 145px) rotate(-18deg); opacity:0; }
          35%       { transform: translate(30px, 145px) rotate(-18deg); opacity:1; }
          38%       { transform: translate(30px, 155px) rotate(-12deg); opacity:1; }
          /* Sweep right */
          60%       { transform: translate(420px, 152px) rotate(-12deg); }
          /* Lift off at right */
          64%       { transform: translate(432px, 142px) rotate(-18deg); }
          72%       { transform: translate(30px,  142px) rotate(-18deg); opacity:0; }
          100%      { transform: translate(30px,  142px) rotate(-18deg); opacity:0; }
        }
        @keyframes trail2-reveal {
          0%,36%    { stroke-dashoffset: 420px; }
          62%       { stroke-dashoffset: 0px; }
          100%      { stroke-dashoffset: 0px; }
        }

        /* ── Stroke 3 — bottom row, sweeps right→left again, starts after stroke 2 ── */
        @keyframes brush3-move {
          0%,63%    { transform: translate(410px, 205px) rotate(20deg); opacity:0; }
          66%       { transform: translate(410px, 205px) rotate(20deg); opacity:1; }
          69%       { transform: translate(410px, 215px) rotate(14deg); opacity:1; }
          /* Sweep left */
          90%       { transform: translate(42px,  212px) rotate(14deg); }
          /* Lift */
          94%       { transform: translate(30px,  202px) rotate(20deg); }
          100%      { transform: translate(30px,  202px) rotate(20deg); opacity:0; }
        }
        @keyframes trail3-reveal {
          0%,67%    { stroke-dashoffset: 420px; }
          92%       { stroke-dashoffset: 0px; }
          100%      { stroke-dashoffset: 0px; }
        }

        /* ── Brush idle bob after all strokes done ── */
        @keyframes brush-done-idle {
          0%,100%   { transform: translate(240px, 60px) rotate(-30deg) translateY(0px); }
          50%       { transform: translate(240px, 60px) rotate(-30deg) translateY(-5px); }
        }

        /* ── Paint drip falls after each stroke ── */
        @keyframes drip1 {
          0%,28%    { transform: scaleY(0); transform-origin:top center; opacity:0; }
          32%       { transform: scaleY(1); transform-origin:top center; opacity:.7; }
          100%      { transform: scaleY(1); transform-origin:top center; opacity:.6; }
        }
        @keyframes drip2 {
          0%,60%    { transform: scaleY(0); transform-origin:top center; opacity:0; }
          65%       { transform: scaleY(1); transform-origin:top center; opacity:.65; }
          100%      { transform: scaleY(1); transform-origin:top center; opacity:.55; }
        }
        @keyframes drip3 {
          0%,90%    { transform: scaleY(0); transform-origin:top center; opacity:0; }
          95%       { transform: scaleY(1); transform-origin:top center; opacity:.6; }
          100%      { transform: scaleY(1); transform-origin:top center; opacity:.55; }
        }

        /* ── Colour swatches pop in ── */
        @keyframes swatch-pop {
          0%   { transform:scale(0) rotate(-15deg); opacity:0; }
          65%  { transform:scale(1.15) rotate(3deg); opacity:1; }
          85%  { transform:scale(0.95) rotate(-1deg); }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }

        /* ── Bucket sway ── */
        @keyframes bucket-sway {
          0%,100% { transform:rotate(0deg); }
          30%     { transform:rotate(-2.5deg); }
          70%     { transform:rotate(2deg); }
        }

        /* ── Tape badge slide in ── */
        @keyframes tape-in {
          0%   { transform:translateX(60px) rotate(3deg); opacity:0; }
          100% { transform:translateX(0px)  rotate(-2deg); opacity:1; }
        }

        /* ── Animation assignments ── */

        /* Brush 1 — full 4s cycle, starts 0.2s after page load */
        .brush1 { animation: brush1-move 4.5s ease-in-out 0.2s both; }
        .trail1 { stroke-dasharray:420px; animation: trail1-reveal 4.5s ease-in-out 0.2s both; }

        /* Brush 2 — starts on same 4.5s cycle, staggered by offset */
        .brush2 { animation: brush2-move 4.5s ease-in-out 0.2s both; }
        .trail2 { stroke-dasharray:420px; animation: trail2-reveal 4.5s ease-in-out 0.2s both; }

        /* Brush 3 — same timeline */
        .brush3 { animation: brush3-move 4.5s ease-in-out 0.2s both; }
        .trail3 { stroke-dasharray:420px; animation: trail3-reveal 4.5s ease-in-out 0.2s both; }

        /* After all strokes: idle floating brush */
        .brush-idle { animation: brush-done-idle 3.5s ease-in-out 5s infinite; }

        /* Drips */
        .drip-1 { animation: drip1 4.5s ease-out 0.2s both; }
        .drip-2 { animation: drip2 4.5s ease-out 0.2s both; }
        .drip-3 { animation: drip3 4.5s ease-out 0.2s both; }

        /* Swatches, bucket, badges */
        .swatch-1    { animation: swatch-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 4.8s both; }
        .swatch-2    { animation: swatch-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 5.0s both; }
        .swatch-3    { animation: swatch-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 5.2s both; }
        .swatch-4    { animation: swatch-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 5.4s both; }
        .bucket-anim { animation: bucket-sway 4s ease-in-out 5s infinite; }
        .tape-badge  { animation: tape-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 4.5s both; }
        .badge-float { animation: float-badge 3.2s ease-in-out 5s infinite; }
        .badge-float2{ animation: float-badge 3.5s ease-in-out 3s infinite; }

        /* nav */
        .nav-link { color:rgba(26,26,26,.6); text-decoration:none; font-size:.85rem; letter-spacing:.5px; transition:color .25s; font-weight:500; font-family:'DM Sans',sans-serif; }
        .nav-link:hover { color:var(--navy); }
        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:var(--navy); border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 32px; background:var(--navy); color:#fff;
          font-family:'DM Sans',sans-serif; font-weight:600; font-size:.95rem;
          letter-spacing:.5px; border:none; cursor:pointer; border-radius:4px;
          transition:all .3s; text-decoration:none; white-space:nowrap;
        }
        .btn-primary:hover { background:var(--navy-l); transform:translateY(-2px); box-shadow:0 12px 36px var(--glow); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 30px; background:transparent; color:var(--navy);
          border:1.5px solid var(--navy); font-family:'DM Sans',sans-serif; font-weight:600;
          font-size:.95rem; letter-spacing:.5px; cursor:pointer; border-radius:4px;
          transition:all .3s; text-decoration:none; white-space:nowrap;
        }
        .btn-outline:hover { background:rgba(27,43,94,.06); transform:translateY(-2px); }

        .svc-card {
          background:#fff; border:1px solid var(--border); padding:32px 28px;
          position:relative; overflow:hidden; transition:border-color .3s, transform .3s, box-shadow .3s; border-radius:6px;
        }
        .svc-card:hover { border-color:rgba(27,43,94,.35); transform:translateY(-4px); box-shadow:0 16px 48px rgba(27,43,94,.08); }
        .svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--navy),var(--navy-l)); transform:scaleX(0); transform-origin:left; transition:transform .35s; }
        .svc-card:hover::before { transform:scaleX(1); }

        .stat-item { text-align:center; padding:32px 20px; border-left:1px solid var(--border); }
        .stat-item:first-child { border-left:none; }
        .why-item { display:flex; gap:16px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid rgba(26,26,26,.06); }
        .why-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .gal-item { overflow:hidden; border-radius:6px; border:1px solid var(--border); cursor:pointer; transition:transform .3s, box-shadow .3s; background:var(--cream3); position:relative; }
        .gal-item:hover { transform:scale(1.02); box-shadow:0 12px 40px rgba(27,43,94,.12); }
        .info-card { transition:border-color .25s, box-shadow .25s; }
        .info-card:hover { border-color:rgba(27,43,94,.35) !important; box-shadow:0 4px 20px rgba(27,43,94,.06); }

        .nav-inner    { padding:16px 56px; display:flex; align-items:center; justify-content:space-between; }
        .hero-section { min-height:100vh; display:flex; align-items:center; padding:100px 56px 70px; position:relative; overflow:hidden; }
        .hero-inner   { max-width:1200px; margin:0 auto; width:100%; display:flex; align-items:center; gap:64px; }
        .hero-text    { flex:1 1 auto; max-width:580px; }
        .hero-vis     { flex:0 0 auto; width:44%; max-width:500px; }
        .section-pad  { padding:100px 56px; }
        .section-sm   { padding:80px 56px; }
        .inner-max    { max-width:1200px; margin:0 auto; }
        .inner-1100   { max-width:1100px; margin:0 auto; }
        .stat-grid    { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .svc-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }
        .why-grid     { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:40px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .hero-title   { font-size:clamp(3.2rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.8rem; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }

        .gallery-grid { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto auto; gap:14px; }
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
          .hero-section { padding:80px 20px 50px; }
          .hero-inner   { flex-direction:column; gap:32px; align-items:flex-start; }
          .hero-text    { max-width:100%; }
          .hero-vis     { width:100%; max-width:100%; flex:none; }
          .hero-title   { font-size:clamp(2.6rem,11vw,3.8rem); }
          .section-pad  { padding:60px 20px; }
          .section-sm   { padding:52px 20px; }
          .stat-grid    { grid-template-columns:repeat(2,1fr); }
          .stat-item    { border-left:none !important; border-bottom:1px solid var(--border); }
          .stat-item:nth-child(2n)        { border-left:1px solid var(--border) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num     { font-size:2.2rem; }
          .svc-grid     { grid-template-columns:1fr; }
          .why-grid     { grid-template-columns:1fr !important; gap:32px !important; }
          .contact-grid { grid-template-columns:1fr; }
          .footer-row   { flex-direction:column; align-items:flex-start; }
          .cta-btns     { flex-direction:column; }
          .btn-primary,.btn-outline { width:100%; }
          .gallery-grid { grid-template-columns:1fr 1fr; }
          .gal-item:nth-child(1) { grid-column:1/3; height:180px; }
          .gal-item:nth-child(n) { grid-column:auto; height:150px; }
        }

        input::placeholder,textarea::placeholder { color:rgba(26,26,26,.3); }
        input,textarea { -webkit-appearance:none; }
        ::selection { background:rgba(27,43,94,.15); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(250,250,248,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Services","Work","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'DM Serif Display',serif",fontSize:"2.2rem",color:"var(--navy)",textDecoration:"none",letterSpacing:"-1px" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:+61411225173" className="btn-primary" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>Get a Free Quote</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(250,250,248,.96)" : "linear-gradient(180deg,rgba(250,250,248,.92) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:48,height:48,flexShrink:0 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ filter:"drop-shadow(0 2px 8px rgba(27,43,94,0.2))" }}>
                <polygon points="24,2 43,13 43,35 24,46 5,35 5,13" fill="var(--navy)" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5"/>
                <polygon points="24,2 43,13 24,24" fill="rgba(255,255,255,0.1)"/>
                <line x1="18" y1="16" x2="18" y2="34" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M18,16 Q30,16 30,22 Q30,28 18,28" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="40" r="2" fill="rgba(201,168,76,0.7)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.05rem",color:"var(--navy)",lineHeight:1,letterSpacing:"-.5px" }}>Shaun&apos;s</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",color:"var(--muted)",letterSpacing:"2.5px",lineHeight:1.4,textTransform:"uppercase",fontWeight:500 }}>Painting Services</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display:"flex",gap:36 }}>
            {["Services","Work","Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="#contact" className="btn-primary desktop-cta" style={{ fontSize:".82rem",padding:"10px 22px" }}>Free Quote</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(150deg,#fafaf8 0%,#f0eee8 50%,#fafaf8 100%)" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(27,43,94,.055) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent 0%,var(--navy) 20%,var(--navy) 80%,transparent 100%)",opacity:.12 }}/>

        <div className="hero-inner">
          {/* Left: Text */}
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(27,43,94,.07)",border:"1px solid rgba(27,43,94,.2)",padding:"6px 16px",borderRadius:100,marginBottom:24 }}>
              <div style={{ width:6,height:6,background:"var(--navy)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".75rem",letterSpacing:"2px",color:"var(--navy)",fontWeight:600,textTransform:"uppercase" }}>Araluen · NT · 15+ Years Experience</span>
            </div>
            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'DM Serif Display',serif",lineHeight:.9,letterSpacing:"-2px",color:"var(--navy)",marginBottom:8 }}>
                Quality<br/>
                <em style={{ fontStyle:"italic",color:"var(--navy-l)" }}>Painting</em><br/>
                You Can Trust
              </h1>
            </div>
            <p ref={heroSubRef} style={{ marginTop:24,fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:460,marginBottom:36,fontFamily:"'DM Sans',sans-serif" }}>
              Bringing excellence to your home &amp; business across the Northern Territory. 15+ years of professional painting — interior, exterior, feature walls and more.
            </p>
            <div ref={heroCtaRef} className="cta-btns">
              <a href="#contact" className="btn-primary">Get a Free Quote</a>
              <a href="#services" className="btn-outline">Our Services</a>
            </div>
            <div style={{ marginTop:32,display:"flex",gap:28,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"+61 411 225 173",          href:"tel:+61411225173" },
                { icon:"📘", val:"Shaun's Painting Services", href:"https://www.facebook.com/shaunspaintingservices/" },
              ].map(c => (
                <a key={c.val} href={c.href}
                  style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none",color:"var(--muted)",fontSize:".84rem",fontFamily:"'DM Sans',sans-serif",transition:"color .25s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--navy)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}
                ><span>{c.icon}</span><span>{c.val}</span></a>
              ))}
            </div>
          </div>

          {/* ══ RIGHT: HERO PAINTING SCENE — moving brush ══ */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 8px 40px rgba(27,43,94,0.12))" }}>

              {/* Wall */}
              <rect x="30" y="52" width="420" height="260" rx="6" fill="#ede9e0" stroke="rgba(27,43,94,.1)" strokeWidth="1.5"/>
              {[100,160,220].map(y => (
                <line key={y} x1="30" y1={y} x2="450" y2={y} stroke="rgba(27,43,94,.03)" strokeWidth="1"/>
              ))}
              <rect x="30" y="295" width="420" height="17" rx="2" fill="rgba(255,255,255,.75)" stroke="rgba(27,43,94,.1)" strokeWidth="1"/>

              {/* Paint trails — revealed by stroke-dashoffset synced to brush movement */}
              <path d="M450,95 Q380,90 310,95 Q240,100 170,93 Q110,88 42,94"
                stroke="#1B2B5E" strokeWidth="54" strokeLinecap="square" fill="none" opacity=".92" className="trail1"/>
              <path d="M450,74 Q380,70 310,74 Q240,78 170,72 Q110,68 42,73"
                stroke="rgba(255,255,255,.09)" strokeWidth="8" strokeLinecap="square" fill="none" className="trail1"/>

              <path d="M42,155 Q110,150 180,155 Q250,160 320,153 Q385,148 450,154"
                stroke="#1B2B5E" strokeWidth="52" strokeLinecap="square" fill="none" opacity=".88" className="trail2"/>
              <path d="M42,135 Q110,131 180,135 Q250,139 320,133 Q385,129 450,134"
                stroke="rgba(255,255,255,.07)" strokeWidth="7" strokeLinecap="square" fill="none" className="trail2"/>

              <path d="M450,215 Q385,210 315,215 Q245,220 175,213 Q110,208 42,214"
                stroke="#1B2B5E" strokeWidth="52" strokeLinecap="square" fill="none" opacity=".85" className="trail3"/>
              <path d="M450,195 Q385,191 315,195 Q245,199 175,193 Q110,189 42,194"
                stroke="rgba(255,255,255,.06)" strokeWidth="7" strokeLinecap="square" fill="none" className="trail3"/>

              {/* Paint drips after each stroke */}
              {[80,160,260,370].map((x,i) => (
                <g key={`d1-${x}`} className="drip-1" style={{ transformOrigin:`${x}px 122px`, animationDelay:`${0.2+i*0.15}s` }}>
                  <rect x={x-2.5} y={122} width={5} height={12+i*4} rx={2.5} fill="#1B2B5E" opacity=".55"/>
                  <circle cx={x} cy={122+12+i*4} r={3.5} fill="#1B2B5E" opacity=".5"/>
                </g>
              ))}
              {[110,220,340].map((x,i) => (
                <g key={`d2-${x}`} className="drip-2" style={{ transformOrigin:`${x}px 181px`, animationDelay:`${0.2+i*0.2}s` }}>
                  <rect x={x-2} y={181} width={4} height={10+i*5} rx={2} fill="#1B2B5E" opacity=".5"/>
                  <circle cx={x} cy={181+10+i*5} r={3} fill="#1B2B5E" opacity=".45"/>
                </g>
              ))}
              {[90,200,310,400].map((x,i) => (
                <g key={`d3-${x}`} className="drip-3" style={{ transformOrigin:`${x}px 241px`, animationDelay:`${0.2+i*0.12}s` }}>
                  <rect x={x-2} y={241} width={4} height={8+i*4} rx={2} fill="#1B2B5E" opacity=".45"/>
                  <circle cx={x} cy={241+8+i*4} r={2.5} fill="#1B2B5E" opacity=".4"/>
                </g>
              ))}

              {/* ══ MOVING BRUSHES ══
                  Each brush: origin at bristle tip (0,0).
                  Handle goes UP (negative y), bristles DOWN (positive y).
                  transform on parent <g> moves the whole brush.           */}

              {/* Brush 1 — top row, right→left */}
              <g className="brush1">
                <rect x="-4" y="-110" width="8" height="96" rx="4" fill="#8B6B45" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <rect x="-4" y="-76" width="8" height="5" rx="1" fill="#6B5030" opacity=".6"/>
                <rect x="-4" y="-58" width="8" height="5" rx="1" fill="#6B5030" opacity=".4"/>
                <rect x="-5" y="-14" width="10" height="16" rx="1" fill="#A8A8A8" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <line x1="-5" y1="-7" x2="5" y2="-7" stroke="rgba(0,0,0,.12)" strokeWidth="1"/>
                <path d="M-5,2 Q-7,18 -4,29 Q0,34 4,29 Q7,18 5,2Z" fill="#1B2B5E" stroke="rgba(27,43,94,.5)" strokeWidth="1"/>
                <path d="M-2,4 Q-3,16 -1,24 Q0,28 1,24 Q3,16 2,4Z" fill="rgba(255,255,255,.14)"/>
                <path d="M-4,8 Q-5,20 -3,26" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>

              {/* Brush 2 — middle row, left→right */}
              <g className="brush2">
                <rect x="-4" y="-110" width="8" height="96" rx="4" fill="#8B6B45" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <rect x="-4" y="-76" width="8" height="5" rx="1" fill="#6B5030" opacity=".6"/>
                <rect x="-4" y="-58" width="8" height="5" rx="1" fill="#6B5030" opacity=".4"/>
                <rect x="-5" y="-14" width="10" height="16" rx="1" fill="#A8A8A8" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <line x1="-5" y1="-7" x2="5" y2="-7" stroke="rgba(0,0,0,.12)" strokeWidth="1"/>
                <path d="M-5,2 Q-7,18 -4,29 Q0,34 4,29 Q7,18 5,2Z" fill="#1B2B5E" stroke="rgba(27,43,94,.5)" strokeWidth="1"/>
                <path d="M-2,4 Q-3,16 -1,24 Q0,28 1,24 Q3,16 2,4Z" fill="rgba(255,255,255,.14)"/>
                <path d="M-4,8 Q-5,20 -3,26" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>

              {/* Brush 3 — bottom row, right→left */}
              <g className="brush3">
                <rect x="-4" y="-110" width="8" height="96" rx="4" fill="#8B6B45" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <rect x="-4" y="-76" width="8" height="5" rx="1" fill="#6B5030" opacity=".6"/>
                <rect x="-4" y="-58" width="8" height="5" rx="1" fill="#6B5030" opacity=".4"/>
                <rect x="-5" y="-14" width="10" height="16" rx="1" fill="#A8A8A8" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <line x1="-5" y1="-7" x2="5" y2="-7" stroke="rgba(0,0,0,.12)" strokeWidth="1"/>
                <path d="M-5,2 Q-7,18 -4,29 Q0,34 4,29 Q7,18 5,2Z" fill="#1B2B5E" stroke="rgba(27,43,94,.5)" strokeWidth="1"/>
                <path d="M-2,4 Q-3,16 -1,24 Q0,28 1,24 Q3,16 2,4Z" fill="rgba(255,255,255,.14)"/>
                <path d="M-4,8 Q-5,20 -3,26" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeLinecap="round"/>
              </g>

              {/* Brush idle — floats after all strokes done */}
              <g className="brush-idle">
                <rect x="-4" y="-110" width="8" height="96" rx="4" fill="#8B6B45" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <rect x="-5" y="-14" width="10" height="16" rx="1" fill="#A8A8A8" stroke="rgba(0,0,0,.2)" strokeWidth="1"/>
                <path d="M-5,2 Q-7,18 -4,29 Q0,34 4,29 Q7,18 5,2Z" fill="#1B2B5E" stroke="rgba(27,43,94,.5)" strokeWidth="1"/>
                <path d="M-2,4 Q-3,16 -1,24 Q0,28 1,24 Q3,16 2,4Z" fill="rgba(255,255,255,.12)"/>
              </g>

              {/* Paint bucket */}
              <g className="bucket-anim" style={{ transformOrigin:"84px 358px" }}>
                <path d="M56,318 L64,378 Q84,390 104,378 L112,318Z" fill="#e8e5dc" stroke="rgba(27,43,94,.2)" strokeWidth="1.5"/>
                <ellipse cx="84" cy="318" rx="28" ry="7" fill="#d8d5cc" stroke="rgba(27,43,94,.18)" strokeWidth="1.5"/>
                <ellipse cx="84" cy="317" rx="22" ry="5.5" fill="#1B2B5E" opacity=".7"/>
                <rect x="60" y="334" width="48" height="28" rx="2" fill="rgba(27,43,94,.08)" stroke="rgba(27,43,94,.15)" strokeWidth="1"/>
                <text x="84" y="345" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontWeight="700" fontSize="7" fill="rgba(27,43,94,.7)" letterSpacing="1">NAVY</text>
                <text x="84" y="355" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="6" fill="rgba(27,43,94,.5)">Interior Matt</text>
                <path d="M60,318 Q84,298 108,318" fill="none" stroke="rgba(27,43,94,.3)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M103,342 Q103,354 101,360 Q100,364 103,366 Q106,364 105,360 Q103,354 103,342Z" fill="#1B2B5E" opacity=".5"/>
              </g>

              {/* Static brush resting lower right */}
              <g transform="translate(362,295) rotate(-24)">
                <rect x="-4" y="-72" width="8" height="68" rx="4" fill="#8B6B45" stroke="rgba(0,0,0,.12)" strokeWidth="1"/>
                <rect x="-5" y="-6" width="10" height="12" rx="1" fill="#A8A8A8" stroke="rgba(0,0,0,.18)" strokeWidth="1"/>
                <path d="M-4,6 Q-6,18 -3,26 Q0,30 3,26 Q6,18 4,6Z" fill="#1B2B5E" stroke="rgba(27,43,94,.4)" strokeWidth="1"/>
              </g>

              {/* Colour swatches */}
              {[
                { col:"#1B2B5E", name:"Navy",  x:278, y:370, cls:"swatch-1" },
                { col:"#4a6b8a", name:"Steel", x:318, y:360, cls:"swatch-2" },
                { col:"#8aaf78", name:"Sage",  x:358, y:354, cls:"swatch-3" },
                { col:"#c9a84c", name:"Gold",  x:398, y:360, cls:"swatch-4" },
              ].map(sw => (
                <g key={sw.name} className={sw.cls}>
                  <rect x={sw.x-15} y={sw.y-22} width="30" height="42" rx="4" fill={sw.col} stroke="rgba(0,0,0,.12)" strokeWidth="1.5"/>
                  <rect x={sw.x-15} y={sw.y+12} width="30" height="8" rx="2" fill="#fff" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                  <text x={sw.x} y={sw.y+19} textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="5.5" fontWeight="600" fill="rgba(26,26,26,.6)">{sw.name}</text>
                </g>
              ))}
              <text x="338" y="415" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="8.5" fill="rgba(26,26,26,.35)">Popular Colours</text>

              {/* Badges */}
              <g className="tape-badge" style={{ transformOrigin:"85px 68px" }}>
                <rect x="34" y="52" width="102" height="38" rx="2" fill="rgba(248,240,220,.92)" stroke="rgba(201,168,76,.5)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 3px 10px rgba(27,43,94,.1))" }}/>
                {[0,5,10].map(i => <line key={i} x1="34" y1={56+i} x2="136" y2={56+i} stroke="rgba(201,168,76,.07)" strokeWidth="1"/>)}
                <text x="85" y="68" textAnchor="middle" fontFamily="DM Serif Display,serif" fontSize="14" fill="var(--navy)">15+ Yrs</text>
                <text x="85" y="80" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="8" fill="rgba(27,43,94,.55)" letterSpacing="1.5" fontWeight="500">EXPERIENCE</text>
              </g>
              <g className="badge-float">
                <rect x="316" y="50" width="122" height="50" rx="6" fill="#fff" stroke="rgba(27,43,94,.12)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 14px rgba(27,43,94,.1))" }}/>
                <rect x="316" y="50" width="122" height="5" rx="6" fill="#1B2B5E" opacity=".6"/>
                <text x="377" y="72" textAnchor="middle" fontFamily="DM Serif Display,serif" fontSize="14" fill="var(--navy)">Free Quote</text>
                <text x="377" y="86" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="8.5" fill="rgba(27,43,94,.5)" letterSpacing="1" fontWeight="500">NO OBLIGATION</text>
              </g>
              <g className="badge-float2">
                <rect x="148" y="378" width="182" height="32" rx="16" fill="var(--navy)" stroke="rgba(201,168,76,.4)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 4px 12px rgba(27,43,94,.18))" }}/>
                <text x="239" y="399" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,.85)" letterSpacing="2">&#128205; NT LOCAL &middot; ARALUEN</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.35,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'DM Sans',sans-serif",fontWeight:500 }}>SCROLL</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--navy)" }}>
        <div className="stat-grid">
          {[
            { n:"Local",  l:"Northern Territory Based" },
            { n:"15+",    l:"Years Experience"         },
            { n:"Res.",   l:"Residential Specialist"   },
            { n:"Free",   l:"Quote & Consultation"     },
          ].map(s => (
            <div key={s.l} className="stat-item" style={{ borderLeftColor:"rgba(255,255,255,.1)" }}>
              <div className="stat-num" style={{ fontFamily:"'DM Serif Display',serif",color:"#fff",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(255,255,255,.45)",marginTop:6,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--navy)",marginBottom:12,fontWeight:600,textTransform:"uppercase",opacity:.7 }}>What We Do</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",color:"var(--navy)",lineHeight:.95,letterSpacing:"-1.5px" }}>
              Painting Services<br/><em style={{ fontStyle:"italic",color:"var(--navy-l)" }}>Done Properly</em>
            </h2>
          </div>
          <div ref={servicesRef} className="svc-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div style={{ fontSize:"2rem",marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.2rem",color:"var(--navy)",marginBottom:10,letterSpacing:"-.5px" }}>{s.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:".88rem",lineHeight:1.75,fontFamily:"'DM Sans',sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="work" className="section-pad" style={{ background:"var(--cream2)",borderTop:"1px solid var(--border)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--navy)",marginBottom:12,fontWeight:600,textTransform:"uppercase",opacity:.7 }}>Our Work</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",color:"var(--navy)",lineHeight:.95,letterSpacing:"-1.5px" }}>
              Recent Projects<br/><em style={{ fontStyle:"italic",color:"var(--navy-l)" }}>Across the Territory</em>
            </h2>
          </div>
          <div ref={galleryRef} className="gallery-grid">

            {/* Card 1 — Feature wall */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="520" height="280" fill="#f0eee8"/>
                <rect x="0" y="0" width="240" height="280" fill="#1B2B5E"/>
                <rect x="20" y="200" width="180" height="18" rx="2" fill="#8B6340" stroke="rgba(0,0,0,.1)" strokeWidth="1"/>
                <rect x="30" y="218" width="160" height="50" rx="0" fill="#a0764e" stroke="rgba(0,0,0,.08)" strokeWidth="1"/>
                <rect x="112" y="190" width="6" height="12" rx="2" fill="#bbb"/>
                <rect x="106" y="186" width="18" height="5" rx="2" fill="#ccc"/>
                <rect x="240" y="0" width="280" height="280" fill="#f0eee8"/>
                <ellipse cx="380" cy="8" rx="30" ry="6" fill="rgba(255,240,200,.6)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"16px 20px",background:"linear-gradient(to top,rgba(27,43,94,.85),transparent)" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#fff" }}>Feature Wall</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",color:"rgba(255,255,255,.65)",marginTop:2 }}>Navy blue accent · Bathroom</div>
              </div>
            </div>

            {/* Card 2 — Bedroom repaint */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 240 280" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="240" height="280" fill="#e8e4dc"/>
                <rect x="0" y="0" width="8" height="260" fill="rgba(0,0,0,.04)"/>
                <rect x="160" y="80" width="60" height="140" rx="2" fill="#d4d0c8" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <rect x="162" y="82" width="56" height="136" rx="1" fill="#ccc9c0"/>
                <circle cx="165" cy="152" r="3" fill="#aaa"/>
                <rect x="0" y="248" width="240" height="12" fill="rgba(255,255,255,.6)" stroke="rgba(0,0,0,.05)" strokeWidth="1"/>
                <rect x="0" y="0" width="240" height="4" fill="rgba(255,255,255,.4)"/>
                <rect x="0" y="60" width="155" height="6" fill="rgba(27,43,94,.15)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.8),transparent)" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#fff" }}>Interior Repaint</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",color:"rgba(255,255,255,.65)",marginTop:2 }}>Full room · Neutral tones</div>
              </div>
            </div>

            {/* Card 3 — Crack repair */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#eeece5"/>
                <path d="M60,40 Q65,55 62,70 Q59,85 64,100 Q69,115 63,130" stroke="rgba(100,80,60,.35)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M64,70 Q72,75 78,80" stroke="rgba(100,80,60,.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M120,40 Q125,55 122,70 Q119,85 124,100 Q129,115 123,130" stroke="rgba(240,238,232,.8)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <rect x="86" y="90" width="28" height="55" rx="4" fill="#2a7a3a" stroke="rgba(0,0,0,.15)" strokeWidth="1"/>
                <rect x="90" y="85" width="20" height="10" rx="3" fill="#cc2222"/>
                <rect x="94" y="82" width="12" height="6" rx="2" fill="#cc3333"/>
                <rect x="88" y="102" width="24" height="28" rx="2" fill="rgba(255,255,255,.25)"/>
                <line x1="100" y1="30" x2="100" y2="190" stroke="rgba(27,43,94,.1)" strokeWidth="1.5" strokeDasharray="5 3"/>
                <text x="38" y="22" fontFamily="DM Sans,sans-serif" fontSize="8" fill="rgba(26,26,26,.4)" letterSpacing="1">BEFORE</text>
                <text x="120" y="22" fontFamily="DM Sans,sans-serif" fontSize="8" fill="rgba(26,26,26,.4)" letterSpacing="1">AFTER</text>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.8),transparent)" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#fff" }}>Crack Repair</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",color:"rgba(255,255,255,.65)",marginTop:2 }}>Filled, primed &amp; repainted</div>
              </div>
            </div>

            {/* Card 4 — Bathroom navy */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#1B2B5E"/>
                {Array.from({length:6},(_,r) => Array.from({length:4},(_,c) => (
                  <rect key={`${r}-${c}`} x={c*50+1} y={r*35+1} width="48" height="33"
                    fill={`rgba(255,255,255,${.03+r*.01})`} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
                )))}
                <rect x="55" y="30" width="90" height="70" rx="3" fill="rgba(200,220,240,.25)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
                <rect x="20" y="145" width="160" height="14" rx="2" fill="#8B6340"/>
                <rect x="25" y="159" width="150" height="40" rx="0" fill="#9B7050"/>
                <rect x="97" y="136" width="6" height="12" rx="2" fill="rgba(255,255,255,.5)"/>
                <rect x="91" y="133" width="18" height="5" rx="2" fill="rgba(255,255,255,.4)"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(0,0,0,.6),transparent)" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#fff" }}>Bathroom</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",color:"rgba(255,255,255,.65)",marginTop:2 }}>Navy feature · Full repaint</div>
              </div>
            </div>

            {/* Card 5 — Exterior */}
            <div className="gal-item">
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
                <rect width="200" height="210" fill="#c8dce8"/>
                <rect x="0" y="170" width="200" height="40" fill="#7a9c5a" opacity=".6"/>
                <rect x="30" y="80" width="140" height="95" fill="#f5f3ee" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <path d="M20,82 L100,40 L180,82Z" fill="#e0ddd5" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <rect x="55" y="100" width="35" height="35" rx="2" fill="rgba(100,150,200,.3)" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <rect x="110" y="100" width="35" height="35" rx="2" fill="rgba(100,150,200,.3)" stroke="rgba(0,0,0,.06)" strokeWidth="1"/>
                <rect x="82" y="130" width="36" height="45" rx="2" fill="#1B2B5E" opacity=".7"/>
                <circle cx="115" cy="152" r="2.5" fill="rgba(255,255,255,.4)"/>
                <rect x="30" y="80" width="140" height="5" fill="#1B2B5E" opacity=".4"/>
                <rect x="30" y="170" width="140" height="5" fill="#1B2B5E" opacity=".3"/>
              </svg>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"14px 18px",background:"linear-gradient(to top,rgba(27,43,94,.8),transparent)" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#fff" }}>Exterior</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",color:"rgba(255,255,255,.65)",marginTop:2 }}>Full house repaint · Trims</div>
              </div>
            </div>

          </div>
          <p style={{ textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:".8rem",fontFamily:"'DM Sans',sans-serif" }}>
            View more on our <a href="https://www.facebook.com/shaunspaintingservices" style={{ color:"var(--navy)",textDecoration:"none",fontWeight:500 }} target="_blank" rel="noopener noreferrer">Facebook page</a>
          </p>
        </div>
      </section>

      {/* ══ SERVICE AREAS ══ */}
      <section ref={areasRef} className="section-sm" style={{ background:"var(--navy)",textAlign:"center" }}>
        <div className="inner-1100">
          <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(255,255,255,.5)",marginBottom:12,fontWeight:600,textTransform:"uppercase" }}>Where We Work</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",color:"#fff",lineHeight:.95,marginBottom:36,letterSpacing:"-1px" }}>
            Service Areas
          </h2>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            {AREAS.map(area => (
              <span key={area} className="area-tag" style={{ padding:"10px 22px",background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.85)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",fontWeight:500,borderRadius:100 }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ marginTop:24,color:"rgba(255,255,255,.35)",fontSize:".85rem",fontFamily:"'DM Sans',sans-serif" }}>
            Not sure if we cover your area? Get in touch — we&apos;ll let you know.
          </p>
        </div>
      </section>

      {/* ══ WHY SHAUN'S ══ */}
      <section ref={whyRef} className="section-pad" style={{ background:"var(--cream2)",borderTop:"1px solid var(--border)" }}>
        <div className="why-grid">
          <div ref={whyLeftRef} style={{ background:"var(--navy)",padding:"48px 40px",position:"relative",overflow:"hidden",borderRadius:8 }}>
            {[{top:16,left:16},{top:16,right:16},{bottom:16,left:16},{bottom:16,right:16}].map((pos,i) => (
              <div key={i} style={{ position:"absolute",...pos,width:20,height:20,
                borderTop:i<2?"2px solid rgba(201,168,76,.5)":undefined,
                borderBottom:i>=2?"2px solid rgba(201,168,76,.5)":undefined,
                borderLeft:i%2===0?"2px solid rgba(201,168,76,.5)":undefined,
                borderRight:i%2===1?"2px solid rgba(201,168,76,.5)":undefined,
              }}/>
            ))}
            <div style={{ textAlign:"center",marginBottom:32 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <polygon points="60,4 108,30 108,90 60,116 12,90 12,30" fill="rgba(255,255,255,.06)" stroke="rgba(201,168,76,.4)" strokeWidth="2"/>
                <polygon points="60,4 108,30 60,60" fill="rgba(255,255,255,.06)"/>
                <text x="28" y="72" fontFamily="DM Serif Display,serif" fontSize="36" fill="#fff">S</text>
                <text x="52" y="72" fontFamily="DM Serif Display,serif" fontSize="36" fill="rgba(201,168,76,.9)">P</text>
                <text x="78" y="72" fontFamily="DM Serif Display,serif" fontSize="36" fill="#fff">S</text>
                <rect x="64" y="38" width="20" height="10" rx="5" fill="rgba(201,168,76,.5)"/>
              </svg>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.6rem",color:"#fff",lineHeight:1,marginBottom:4 }}>Shaun&apos;s</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".7rem",color:"rgba(255,255,255,.5)",letterSpacing:"3px",textTransform:"uppercase",marginBottom:32 }}>Painting Services</div>
            </div>
            {[
              ["Clean work",   "Every job left tidy. Drop sheets, tape and care from start to finish."],
              ["Fair pricing", "Honest quotes with no surprises. You know the price before we start."],
              ["On time",      "We show up when we say we will and finish when we say we will."],
            ].map(([t,d]) => (
              <div key={t as string} style={{ display:"flex",gap:12,marginBottom:16 }}>
                <div style={{ width:24,height:24,background:"rgba(201,168,76,.2)",border:"1px solid rgba(201,168,76,.4)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2,6 L5,9 L10,3" stroke="#c9a84c" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"#fff",fontSize:".88rem",marginBottom:2 }}>{t as string}</div>
                  <div style={{ color:"rgba(255,255,255,.45)",fontSize:".8rem",lineHeight:1.6,fontFamily:"'DM Sans',sans-serif" }}>{d as string}</div>
                </div>
              </div>
            ))}
            <div style={{ position:"absolute",bottom:-1,right:-1,background:"rgba(201,168,76,.9)",color:"#111",padding:"12px 20px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:".72rem",lineHeight:1.4,letterSpacing:"1px",borderRadius:"8px 0 8px 0" }}>
              FREE<br/>QUOTE
            </div>
          </div>

          <div ref={whyRightRef}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--navy)",marginBottom:12,fontWeight:600,textTransform:"uppercase",opacity:.7 }}>Why Choose Us</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",color:"var(--navy)",lineHeight:.95,marginBottom:40,letterSpacing:"-1px" }}>
              Your Northern Territory<br/><em style={{ fontStyle:"italic",color:"var(--navy-l)" }}>Painting Specialist</em>
            </h2>
            {[
              { icon:"🏠", title:"Residential Specialist",  desc:"Houses, units, townhouses and investment properties. Interior and exterior painting done with care." },
              { icon:"📍", title:"Locally Based",           desc:"Northern Territory local with 15+ years in the trade. Deep knowledge of the NT climate and conditions." },
              { icon:"✅", title:"Proper Preparation",      desc:"Sanding, priming, crack filling and surface prep before any paint goes on. The key to a lasting result." },
              { icon:"🎨", title:"Colour Advice",           desc:"Not sure on colour? We can help guide you to a palette that suits the space and your style." },
              { icon:"🔒", title:"Fully Insured",           desc:"Public liability insurance on all jobs. You're protected and the work is done professionally." },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div style={{ fontSize:"1.4rem",lineHeight:1,marginTop:2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:"var(--navy)",marginBottom:4,fontSize:".95rem" }}>{item.title}</div>
                  <div style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="section-sm" style={{ textAlign:"center",background:"var(--cream3)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(27,43,94,.06) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--navy)",marginBottom:14,fontWeight:600,textTransform:"uppercase",opacity:.7 }}>Ready to Refresh?</div>
        <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,5vw,3.5rem)",color:"var(--navy)",lineHeight:.9,marginBottom:16,letterSpacing:"-1.5px" }}>
          Get a Free Quote<br/><em style={{ color:"var(--navy-l)" }}>Today</em>
        </h2>
        <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:420,margin:"0 auto 36px",lineHeight:1.75,fontFamily:"'DM Sans',sans-serif" }}>
          Northern Territory and surrounds. Get in touch for a no-obligation quote on your painting project.
        </p>
        <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
          <a href="#contact" className="btn-primary">Get a Free Quote</a>
          <a href="tel:+61411225173" className="btn-outline">📞 Call Now</a>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" ref={contactRef} className="section-pad" style={{ background:"var(--cream)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--navy)",marginBottom:12,fontWeight:600,textTransform:"uppercase",opacity:.7 }}>Get In Touch</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,4.5vw,3rem)",color:"var(--navy)",lineHeight:.95,letterSpacing:"-1px" }}>
              Contact<br/><em style={{ fontStyle:"italic",color:"var(--navy-l)" }}>Shaun&apos;s Painting</em>
            </h2>
          </div>
          <div className="contact-grid">
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone / SMS",  val:"+61 411 225 173",                  href:"tel:+61411225173" },
                { icon:"✉️", label:"Email",        val:"shaunparkerpainting@hotmail.com",   href:"mailto:shaunparkerpainting@hotmail.com" },
                { icon:"📘", label:"Facebook",     val:"Shaun's Painting Services",         href:"https://www.facebook.com/shaunspaintingservices/" },
                { icon:"📍", label:"Based",        val:"Araluen, NT, Australia",            href:undefined },
                { icon:"🗺️", label:"Service Area", val:"NT Wide · Darwin · Alice Springs",  href:undefined },
                { icon:"⏰", label:"Response",     val:"Usually within the same day",       href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"16px 20px",background:"#fff",border:"1px solid var(--border)",borderRadius:6 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:2 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--navy)",marginBottom:3,fontFamily:"'DM Sans',sans-serif",fontWeight:700,textTransform:"uppercase",opacity:.6 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"var(--text)",fontSize:".88rem",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--navy)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="var(--text)")}>{c.val}</a>
                      : <span style={{ color:"var(--text)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff",border:"1px solid var(--border)",padding:"40px 36px",borderRadius:8,boxShadow:"0 4px 32px rgba(27,43,94,.06)" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:"1.4rem",color:"var(--navy)",marginBottom:24 }}>Request a Free Quote</div>
              {[
                { label:"Your Name",   type:"text",  ph:"John Smith" },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX" },
                { label:"Email",       type:"email", ph:"you@example.com" },
                { label:"Job Type",    type:"text",  ph:"e.g. Interior, feature wall, exterior…" },
                { label:"Suburb",      type:"text",  ph:"e.g. Darwin, Alice Springs, Katherine…" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:".65rem",letterSpacing:"1.5px",color:"rgba(26,26,26,.45)",marginBottom:6,fontFamily:"'DM Sans',sans-serif",fontWeight:600,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--text)",fontSize:".88rem",outline:"none",borderRadius:4,fontFamily:"'DM Sans',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(27,43,94,.4)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:22 }}>
                <label style={{ display:"block",fontSize:".65rem",letterSpacing:"1.5px",color:"rgba(26,26,26,.45)",marginBottom:6,fontFamily:"'DM Sans',sans-serif",fontWeight:600,textTransform:"uppercase" }}>Project Details</label>
                <textarea rows={3} placeholder="Tell us about your project — rooms, size, colours, timing…"
                  style={{ width:"100%",background:"var(--cream)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"var(--text)",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'DM Sans',sans-serif",borderRadius:4,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(27,43,94,.4)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%" }}>🎨 Request Free Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--navy)",padding:"32px 56px" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,background:"rgba(255,255,255,.1)",border:"1px solid rgba(201,168,76,.3)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:".9rem",color:"rgba(201,168,76,.9)" }}>SPS</span>
            </div>
            <div>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:".95rem",color:"rgba(255,255,255,.8)" }}>Shaun&apos;s Painting Services</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"rgba(255,255,255,.35)",letterSpacing:"2px",textTransform:"uppercase" }}>Araluen · NT · 15+ Years Experience</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61411225173" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'DM Sans',sans-serif" }}>+61 411 225 173</a>
            <a href="mailto:shaunparkerpainting@hotmail.com" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'DM Sans',sans-serif" }}>shaunparkerpainting@hotmail.com</a>
            <a href="https://www.facebook.com/shaunspaintingservices" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.35)",fontSize:".78rem",textDecoration:"none",fontFamily:"'DM Sans',sans-serif" }}>Facebook</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.18)",fontSize:".72rem",fontFamily:"'DM Sans',sans-serif" }}>© 2025 Shaun&apos;s Painting Services. NT, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
