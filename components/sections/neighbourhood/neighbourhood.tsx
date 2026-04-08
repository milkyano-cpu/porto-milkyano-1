"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    title: "Licensed Plumber",
    type: "Full-Time",
    badge: "🔧",
    desc: "Residential and commercial plumbing across Melbourne. Maintenance, installations, emergency response. You're licensed, reliable and take pride in clean work.",
    reqs: [
      "Victorian Plumbing Licence (essential)",
      "Experience across residential & commercial",
      "Own tools preferred",
      "Current driver's licence",
      "Available for on-call / after-hours rotation",
    ],
  },
  {
    title: "Drain Specialist",
    type: "Full-Time",
    badge: "🌊",
    desc: "Blocked drains, CCTV inspections, high-pressure jetting and pipe relining. You know drainage inside out and can read a camera feed like second nature.",
    reqs: [
      "Victorian Plumbing Licence",
      "CCTV drain inspection experience",
      "High-pressure water jetting skills",
      "Pipe relining experience (advantageous)",
      "Strong problem-solving mindset",
    ],
  },
  {
    title: "Gas Fitter",
    type: "Full-Time",
    badge: "⚡",
    desc: "Gas appliance installation, repair and compliance work. Fully licensed, detail-oriented and safety-first. Melbourne residential and commercial clients.",
    reqs: [
      "Type A Gasfitter Licence (essential)",
      "Experience with residential gas systems",
      "Appliance installation & commissioning",
      "Compliance documentation experience",
      "Current driver's licence",
    ],
  },
  {
    title: "Apprentice Plumber",
    type: "Apprenticeship",
    badge: "📐",
    desc: "Learn from experienced Melbourne plumbers across a full range of work — drains, hot water, maintenance and more. We invest in people who want to grow.",
    reqs: [
      "Currently enrolled in plumbing apprenticeship (or keen to start)",
      "Good attitude and willingness to learn",
      "Driver's licence or working towards one",
      "Physical fitness for site work",
      "Melbourne-based",
    ],
  },
];

const PERKS = [
  { icon: "📍", title: "All of Melbourne",         desc: "We service the entire metro area — you won't be stuck in the same suburb every day. Variety of jobs, variety of locations." },
  { icon: "🚨", title: "24/7 — We Mean It",        desc: "We run a real 24/7 operation. Emergency callouts are part of the gig — we organise the roster fairly and compensate accordingly." },
  { icon: "🛠️", title: "Modern Tech & Tools",      desc: "CCTV cameras, high-pressure jetters, pipe relining equipment. We invest in the gear that makes jobs easier and faster." },
  { icon: "📈", title: "Growing Fast",              desc: "We're expanding across Melbourne. More work, more vans, more people. Get in now and grow with the business." },
  { icon: "🤝", title: "Good Team Culture",        desc: "December 2025 Christmas party. Real people, real culture. No corporate nonsense — just a team that does good work together." },
  { icon: "💰", title: "Competitive Rates",        desc: "Honest pay for honest work. We're not going to waste your time with low-ball rates. Come in and let's talk numbers." },
];

// Water drop path
const DROPS = [
  { cx: 80,  cy: 60,  r: 28, delay: 0 },
  { cx: 200, cy: 35,  r: 18, delay: 0.4 },
  { cx: 300, cy: 55,  r: 22, delay: 0.8 },
  { cx: 430, cy: 40,  r: 15, delay: 1.2 },
  { cx: 500, cy: 58,  r: 20, delay: 0.6 },
];

// Pre-computed pipe joint spoke angles
const PIPE_ANGLES = [0, 90, 180, 270];

export default function NeighbourhoodHiring() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openRole, setOpenRole]       = useState<number | null>(null);

  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubRef   = useRef<HTMLDivElement>(null);
  const heroCtaRef   = useRef<HTMLDivElement>(null);
  const heroVisRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const rolesRef     = useRef<HTMLDivElement>(null);
  const perksRef     = useRef<HTMLDivElement>(null);
  const aboutRef     = useRef<HTMLDivElement>(null);
  const applyRef     = useRef<HTMLDivElement>(null);

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

      rolesRef.current?.querySelectorAll(".role-card")?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: TA },
          y: 50, opacity: 0, duration: 0.65, delay: i * 0.08, ease: "power3.out",
        });
      });

      gsap.from(perksRef.current?.querySelectorAll(".perk-card") ?? [], {
        scrollTrigger: { trigger: perksRef.current, start: "top 85%", toggleActions: TA },
        y: 40, opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.07, ease: "power3.out",
      });

      gsap.from(aboutRef.current, {
        scrollTrigger: { trigger: aboutRef.current, start: "top 82%", toggleActions: TA },
        y: 60, opacity: 0, duration: 0.85, ease: "power3.out",
      });

      gsap.from(applyRef.current, {
        scrollTrigger: { trigger: applyRef.current, start: "top 85%", toggleActions: TA },
        y: 70, opacity: 0, duration: 0.85, ease: "power3.out",
      });
    });

    return () => { ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background: "#0B1117", color: "#E8F0F7", fontFamily: "system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --black:   #0B1117;
          --dark:    #0F1520;
          --dark2:   #141D28;
          --dark3:   #1A2535;
          --dark4:   #212F40;
          --teal:    #00BFA6;
          --teal-l:  #00DCC0;
          --teal-d:  #009985;
          --blue:    #1A7FD4;
          --blue-l:  #2B9AEF;
          --white:   #FFFFFF;
          --cream:   #E8F0F7;
          --border:  rgba(0,191,166,0.12);
          --border2: rgba(0,191,166,0.06);
          --muted:   rgba(232,240,247,0.45);
          --glow:    rgba(0,191,166,0.2);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes shimmer     { 0%{left:-100%} 100%{left:200%} }
        @keyframes water-flow  { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-80} }
        @keyframes drop-fall {
          0%   { transform:translateY(-8px); opacity:0; }
          20%  { opacity:.8; }
          80%  { opacity:.6; }
          100% { transform:translateY(8px); opacity:0; }
        }
        @keyframes pipe-pulse  { 0%,100%{opacity:.3} 50%{opacity:.65} }
        @keyframes ripple {
          0%   { transform:scale(0.6); opacity:.5; }
          100% { transform:scale(2.2); opacity:0; }
        }

        /* ── Van drive-in (same proven pattern) ── */
        @keyframes van-full {
          0%        { transform:translateX(160%); opacity:0; }
          40%       { transform:translateX(0px);  opacity:1; }
          68%,100%  { transform:translateX(0px) translateY(0px); opacity:1; }
          84%       { transform:translateX(0px) translateY(-3px); }
        }
        @keyframes van2-full {
          0%,20%   { transform:translateX(200%); opacity:0; }
          62%      { transform:translateX(74px); opacity:1; }
          80%,100% { transform:translateX(74px) translateY(0px); opacity:1; }
          90%      { transform:translateX(74px) translateY(-2px); }
        }
        @keyframes wheel-turn  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes road-dash   { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-60} }
        @keyframes water-squirt {
          0%,60%   { opacity:0; transform:translateX(0) scaleX(0); }
          70%      { opacity:.7; transform:translateX(0) scaleX(1); }
          85%      { opacity:.5; transform:translateX(-10px) scaleX(1.5); }
          100%     { opacity:0; transform:translateX(-20px) scaleX(2); }
        }

        .van-scene  { animation: van-full  5.5s cubic-bezier(0.22,0.61,0.36,1) forwards,
                                 van-full  3.6s ease-in-out 5.5s infinite; }
        .van2-scene { animation: van2-full 6s cubic-bezier(0.22,0.61,0.36,1) 0.25s forwards,
                                 van2-full 4s ease-in-out 6.25s infinite; }
        .wh-spin    { animation: wheel-turn 0.42s linear 0s 5, wheel-turn 3.6s linear 2.4s infinite; }
        .wh-spin2   { animation: wheel-turn 0.42s linear 0.25s 5, wheel-turn 4s linear 2.8s infinite; }
        .road-anim  { stroke-dasharray:40 20; animation: road-dash .5s linear 0s 4, road-dash 3.5s linear 2.2s infinite; }
        .water-jet  { animation: water-squirt 3.5s ease-in-out 3s infinite; }
        .pipe-flow  { stroke-dasharray:60 20; animation: water-flow 1.2s linear infinite; }
        .drop       { animation: drop-fall 1.6s ease-in infinite; }
        .ripple-r   { animation: ripple 2s ease-out infinite; }

        .nav-link { color:rgba(232,240,247,.4); text-decoration:none; font-size:.85rem; letter-spacing:.5px; font-weight:500; font-family:'Barlow',sans-serif; transition:color .2s; }
        .nav-link:hover { color:#fff; }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-teal {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:15px 34px; background:var(--teal); color:#0B1117;
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:1rem;
          letter-spacing:2px; border:none; cursor:pointer; text-decoration:none;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-teal:hover { background:var(--teal-l); transform:translateY(-2px); box-shadow:0 12px 40px var(--glow); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 30px; background:transparent; color:#fff;
          border:1.5px solid rgba(0,191,166,.4); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer; text-decoration:none;
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { border-color:var(--teal); color:var(--teal); background:rgba(0,191,166,.06); transform:translateY(-2px); }

        .role-card {
          background:var(--dark2); border:1px solid var(--border);
          padding:28px 28px 24px; position:relative; overflow:hidden; cursor:pointer;
          transition:border-color .3s, transform .25s, box-shadow .3s;
        }
        .role-card:hover { border-color:rgba(0,191,166,.45); transform:translateY(-3px); box-shadow:0 12px 48px rgba(0,191,166,.07); }
        .role-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--teal),var(--teal-l));
          transform:scaleX(0); transform-origin:left; transition:transform .35s;
        }
        .role-card:hover::before, .role-card.open::before { transform:scaleX(1); }
        .role-card.open { border-color:rgba(0,191,166,.35); }

        .perk-card {
          background:var(--dark2); border:1px solid var(--border);
          padding:26px 22px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .25s;
        }
        .perk-card:hover { border-color:rgba(0,191,166,.4); transform:translateY(-3px); }
        .perk-card::after {
          content:''; position:absolute; top:0; height:100%; width:35%;
          background:linear-gradient(90deg,transparent,rgba(0,191,166,.03),transparent);
          left:-100%; pointer-events:none;
        }
        .perk-card:hover::after { animation:shimmer .55s ease; }

        .stat-item { text-align:center; padding:28px 14px; border-left:1px solid rgba(0,191,166,.1); }
        .stat-item:first-child { border-left:none; }
        .info-card { transition:border-color .25s; }
        .info-card:hover { border-color:rgba(0,191,166,.45) !important; }

        /* Layouts */
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
        .roles-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(480px,1fr)); gap:16px; }
        .perks-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
        .apply-grid   { display:grid; grid-template-columns:1fr 1.3fr; gap:48px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
        .hero-title   { font-size:clamp(3rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.8rem; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }

        @media (max-width:900px) {
          .roles-grid { grid-template-columns:1fr; }
        }
        @media (max-width:767px) {
          .hamburger   { display:flex !important; }
          .desk-nav    { display:none !important; }
          .desk-cta    { display:none !important; }
          .nav-inner   { padding:14px 20px; }
          .hero-section{ padding:84px 20px 52px; }
          .hero-inner  { flex-direction:column; gap:32px; align-items:flex-start; }
          .hero-text   { max-width:100%; }
          .hero-vis    { width:100%; max-width:100%; flex:none; }
          .hero-title  { font-size:clamp(2.6rem,11vw,3.8rem); }
          .section-pad { padding:60px 20px; }
          .section-sm  { padding:52px 20px; }
          .stat-grid   { grid-template-columns:repeat(2,1fr); }
          .stat-item   { border-left:none !important; border-bottom:1px solid rgba(0,191,166,.08); }
          .stat-item:nth-child(2n) { border-left:1px solid rgba(0,191,166,.1) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num    { font-size:2.2rem; }
          .apply-grid  { grid-template-columns:1fr; }
          .footer-row  { flex-direction:column; align-items:flex-start; }
          .cta-btns    { flex-direction:column; }
          .btn-teal,.btn-outline { width:100%; }
        }

        input::placeholder,textarea::placeholder { color:rgba(232,240,247,.18); }
        input,textarea,select { -webkit-appearance:none; }
        ::selection { background:rgba(0,191,166,.2); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(11,17,23,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:44,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Roles","Perks","Apply"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.4rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="#apply" className="btn-teal" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>APPLY NOW</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(11,17,23,.96)" : "linear-gradient(180deg,rgba(11,17,23,.88) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          {/* Logo — water drop pipe mark */}
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:44,height:44,flexShrink:0 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" style={{ filter:"drop-shadow(0 2px 10px rgba(0,191,166,.35))" }}>
                {/* Drop shape */}
                <path d="M22,4 Q30,12 33,20 Q36,30 22,38 Q8,30 11,20 Q14,12 22,4Z"
                  fill="rgba(0,191,166,.15)" stroke="rgba(0,191,166,.7)" strokeWidth="1.5"/>
                {/* Inner drop */}
                <path d="M22,10 Q27,16 29,22 Q31,28 22,34 Q13,28 15,22 Q17,16 22,10Z"
                  fill="rgba(0,191,166,.25)" stroke="none"/>
                {/* N letter */}
                <text x="22" y="27" textAnchor="middle"
                  fontFamily="Barlow Condensed,sans-serif" fontWeight="900"
                  fontSize="16" fill="var(--teal-l)" letterSpacing="-0.5">N</text>
                {/* Ripple rings */}
                <circle cx="22" cy="38" r="4" fill="none" stroke="rgba(0,191,166,.3)" strokeWidth="1"/>
                <circle cx="22" cy="38" r="7" fill="none" stroke="rgba(0,191,166,.15)" strokeWidth="1"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".92rem",color:"#fff",letterSpacing:"1.5px",lineHeight:1 }}>NEIGHBOURHOOD PLUMBING</div>
              <div style={{ fontSize:".58rem",color:"var(--teal)",letterSpacing:"2.5px",lineHeight:1.6,fontFamily:"'Barlow',sans-serif",fontWeight:600,textTransform:"uppercase" }}>We&apos;re Hiring · Melbourne VIC</div>
            </div>
          </div>

          <div className="desk-nav" style={{ display:"flex",gap:36 }}>
            {["Roles","Perks","Apply"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="#apply" className="btn-teal desk-cta" style={{ fontSize:".78rem",padding:"9px 22px" }}>APPLY NOW</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(145deg,#0B1117 0%,#0F1520 55%,#091219 100%)" }}>
        {/* Pipe grid texture */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(0,191,166,.05) 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none" }}/>
        {/* Teal glow */}
        <div style={{ position:"absolute",top:"15%",right:"-5%",width:500,height:500,background:"radial-gradient(ellipse,rgba(0,191,166,.07) 0%,transparent 65%)",pointerEvents:"none" }}/>
        {/* Blue-teal gradient bottom */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),var(--blue-l),var(--teal),transparent)",opacity:.7 }}/>
        {/* Diagonal accent */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 300px 300px 0",borderColor:"transparent rgba(0,191,166,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="hero-inner">
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,191,166,.08)",border:"1px solid rgba(0,191,166,.3)",padding:"6px 16px",borderRadius:2,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--teal-l)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--teal-l)",fontWeight:700,textTransform:"uppercase" }}>Now Hiring · Melbourne VIC</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                MELBOURNE<br/>
                PLUMBERS<br/>
                <span style={{ color:"var(--teal)" }}>WANTED</span>
              </h1>
            </div>

            <div style={{ width:80,height:3,background:"linear-gradient(90deg,var(--teal),var(--teal-l))",marginTop:16,marginBottom:20,borderRadius:2 }}/>

            <p ref={heroSubRef} style={{ fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:480,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              Neighbourhood Plumbing is growing across Melbourne and we need skilled, licensed people to grow with us. 24/7 operation, modern tools, good culture. If you&apos;re a qualified plumber who does honest work — let&apos;s talk.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="#roles" className="btn-teal">SEE OPEN ROLES</a>
              <a href="#perks" className="btn-outline">WHY JOIN US</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:24,flexWrap:"wrap" }}>
              {[
                { icon:"📞", val:"0488 885 122", href:"tel:+61488885122" },
                { icon:"✉️", val:"Info@neighbourhoodplumbing.com.au", href:"mailto:Info@neighbourhoodplumbing.com.au" },
              ].map(c => (
                <a key={c.val} href={c.href}
                  style={{ display:"flex",alignItems:"center",gap:7,textDecoration:"none",color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",transition:"color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                ><span>{c.icon}</span><span>{c.val}</span></a>
              ))}
            </div>
          </div>

          {/* Right: Two NP vans + water effect */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 6px 32px rgba(0,0,0,0.5))" }}>

              {/* ── ROAD ── */}
              <rect x="0" y="272" width="540" height="68" fill="#111820"/>
              <line x1="0" y1="274" x2="540" y2="274" stroke="rgba(0,191,166,.18)" strokeWidth="1.5"/>
              <line x1="0" y1="305" x2="540" y2="305"
                stroke="rgba(255,255,255,.05)" strokeWidth="2" className="road-anim"/>
              <rect x="0" y="285" width="540" height="6" fill="rgba(0,0,0,.2)"/>

              {/* Water puddle on road */}
              <ellipse cx="130" cy="310" rx="45" ry="8" fill="rgba(0,191,166,.08)" stroke="rgba(0,191,166,.12)" strokeWidth="1"/>
              <ellipse cx="130" cy="310" rx="20" ry="3" fill="rgba(0,191,166,.1)"/>

              {/* Ripples on puddle */}
              <ellipse cx="130" cy="310" rx="30" ry="5" fill="none" stroke="rgba(0,191,166,.2)" strokeWidth="1" className="ripple-r"/>
              <ellipse cx="130" cy="310" rx="30" ry="5" fill="none" stroke="rgba(0,191,166,.15)" strokeWidth="1"
                style={{ animation:"ripple 2s ease-out 1s infinite" }}/>

              {/* Dust/mist puffs */}
              {[0,1,2].map(i => (
                <ellipse key={i} cx={55} cy={274} rx={5+i*3} ry={2.5+i*1.5}
                  fill="rgba(0,191,166,.08)"
                  style={{ animation:`dust-out 0.9s ease-out ${i*0.28}s 6 forwards` }}
                />
              ))}

              {/* ── PIPE INFRASTRUCTURE in background ── */}
              {/* Main horizontal pipe */}
              <rect x="0" y="60" width="540" height="14" rx="4" fill="#0F1A24" stroke="rgba(0,191,166,.15)" strokeWidth="1"/>
              {/* Water flow inside pipe */}
              <rect x="0" y="63" width="540" height="8" rx="3" fill="none" stroke="rgba(0,191,166,.25)" strokeWidth="2"
                strokeDasharray="60 20" className="pipe-flow"/>
              {/* Pipe connectors */}
              {[100,200,300,400].map(x => (
                <g key={x}>
                  <circle cx={x} cy="67" r="10" fill="#141E2B" stroke="rgba(0,191,166,.25)" strokeWidth="1.5"/>
                  <circle cx={x} cy="67" r="5" fill="#0F1520"/>
                  <circle cx={x} cy="67" r="2" fill="rgba(0,191,166,.4)"/>
                </g>
              ))}
              {/* Vertical drops from pipe */}
              {[150, 350].map((x, gi) => (
                <g key={x}>
                  <rect x={x} y="74" width="6" height="35" rx="3" fill="#0F1A24" stroke="rgba(0,191,166,.12)" strokeWidth="1"/>
                  <ellipse cx={x+3} cy={112}
                    rx="3" ry="5"
                    fill="rgba(0,191,166,.55)"
                    className="drop"
                    style={{ animationDelay:`${gi*0.8}s` }}
                  />
                </g>
              ))}

              {/* ── VAN 2 (behind) ── */}
              <g className="van2-scene" style={{ opacity: 0.82 }}>
                {/* Body */}
                <rect x="20" y="214" width="300" height="60" rx="3" fill="#0F1A24" stroke="rgba(0,191,166,.2)" strokeWidth="1.2"/>
                <rect x="20" y="200" width="300" height="16" rx="3" fill="#0D1820" stroke="rgba(0,191,166,.12)" strokeWidth="1"/>
                {/* Cab */}
                <path d="M278,200 L278,182 Q278,174 285,174 L326,174 Q334,174 342,182 L358,200Z"
                  fill="#0D1820" stroke="rgba(0,191,166,.15)" strokeWidth="1.2"/>
                {/* Windscreen */}
                <path d="M288,178 L288,200 L358,200 L342,182 Z" fill="rgba(0,191,166,.05)" stroke="rgba(0,191,166,.15)" strokeWidth="1"/>
                {/* Teal stripe */}
                <rect x="20" y="255" width="338" height="12" fill="rgba(0,191,166,.5)"/>
                {/* Pipe rack */}
                <rect x="40" y="196" width="230" height="5" rx="1" fill="#1A2535"/>
                {[65,95,125,155,185,215,245].map(rx => <rect key={rx} x={rx} y="192" width="3" height="8" rx="1" fill="#1E2F42"/>)}
                {/* Brand on van */}
                <text x="148" y="264" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="7" fill="rgba(11,17,23,.85)" letterSpacing="1.2">NEIGHBOURHOOD PLUMBING</text>
                {/* Headlight */}
                <rect x="351" y="188" width="9" height="7" rx="2" fill="rgba(255,245,180,.7)"/>
                {/* Wheels */}
                {[75, 270].map(wx => (
                  <g key={wx} transform={`translate(${wx},274)`}>
                    <circle cx="0" cy="0" r="18" fill="#0a0e14" stroke="rgba(0,191,166,.25)" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="11" fill="#111820"/>
                    <circle cx="0" cy="0" r="3.5" fill="#333"/>
                    <g className="wh-spin2">
                      {[0,45,90,135,180,225,270,315].map(a => {
                        const rad=(a*Math.PI)/180;
                        return <line key={a} x1={+(Math.cos(rad)*5).toFixed(2)} y1={+(Math.sin(rad)*5).toFixed(2)} x2={+(Math.cos(rad)*11).toFixed(2)} y2={+(Math.sin(rad)*11).toFixed(2)} stroke="rgba(0,191,166,.4)" strokeWidth="1.8" strokeLinecap="round"/>;
                      })}
                    </g>
                  </g>
                ))}
              </g>

              {/* ── VAN 1 (foreground) ── */}
              <g className="van-scene">
                {/* Main body */}
                <rect x="16" y="198" width="388" height="76" rx="4" fill="#111E2B" stroke="rgba(0,191,166,.28)" strokeWidth="1.5"/>
                {/* Roof */}
                <rect x="16" y="180" width="388" height="20" rx="4" fill="#0D1820" stroke="rgba(0,191,166,.18)" strokeWidth="1"/>
                {/* Cab section */}
                <path d="M350,180 L350,155 Q350,145 358,145 L403,145 Q414,145 422,155 L444,180 L444,274 L350,274 Z"
                  fill="#111E2B" stroke="rgba(0,191,166,.28)" strokeWidth="1.5"/>
                {/* Windscreen */}
                <path d="M360,150 L360,180 L444,180 L422,155 Q414,145 403,145 L360,145 Z"
                  fill="rgba(0,191,166,.07)" stroke="rgba(0,191,166,.2)" strokeWidth="1"/>
                {/* Windscreen glare */}
                <line x1="368" y1="150" x2="432" y2="174" stroke="rgba(255,255,255,.08)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Side windows */}
                <rect x="240" y="188" width="95" height="34" rx="3" fill="rgba(0,191,166,.06)" stroke="rgba(0,191,166,.15)" strokeWidth="1"/>
                <line x1="350" y1="180" x2="350" y2="274" stroke="rgba(0,191,166,.12)" strokeWidth="2"/>
                {/* Door handle */}
                <rect x="330" y="234" width="16" height="4" rx="2" fill="rgba(0,191,166,.3)"/>
                {/* Pipe rack on roof */}
                <rect x="55" y="178" width="288" height="5" rx="1" fill="#1A2535" stroke="rgba(0,191,166,.1)" strokeWidth="1"/>
                {[80,115,150,185,220,255,290,320].map(x => <rect key={x} x={x} y="172" width="4" height="10" rx="1" fill="#1E2F42"/>)}
                {/* Pipes on rack */}
                <rect x="58" y="167" width="280" height="6" rx="3" fill="#1E3A4A" opacity=".8"/>
                <rect x="58" y="162" width="190" height="5" rx="2.5" fill="#1A3244" opacity=".55"/>
                {/* Headlight */}
                <rect x="436" y="168" width="14" height="10" rx="3" fill="rgba(255,245,180,.85)"/>
                <rect x="438" y="170" width="10" height="4" rx="1" fill="rgba(255,225,80,.65)"/>
                {/* Headlight beam */}
                <path d="M450,172 Q496,166 514,174 Q496,182 450,178Z" fill="rgba(255,245,180,.06)"/>
                {/* Tail light */}
                <rect x="16" y="208" width="10" height="24" rx="2" fill="rgba(0,191,166,.35)" stroke="rgba(0,191,166,.2)" strokeWidth="1"/>
                {/* Front & rear bumper */}
                <rect x="438" y="248" width="18" height="24" rx="3" fill="#1A2535" stroke="rgba(0,191,166,.12)" strokeWidth="1"/>
                <rect x="8" y="248" width="12" height="24" rx="3" fill="#1A2535" stroke="rgba(0,191,166,.1)" strokeWidth="1"/>

                {/* ── TEAL STRIPE & BRANDING ── */}
                <rect x="16" y="260" width="430" height="14" fill="var(--teal)" opacity=".75"/>
                {/* Gold accent stripe above */}
                <rect x="16" y="257" width="430" height="4" fill="rgba(0,191,166,.4)"/>

                {/* Drop logo on van */}
                <g transform="translate(62, 218)">
                  <path d="M12,1 Q18,7 20,13 Q22,20 12,25 Q2,20 4,13 Q6,7 12,1Z"
                    fill="rgba(0,191,166,.2)" stroke="rgba(0,191,166,.8)" strokeWidth="1.2"/>
                  <text x="12" y="17" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="10" fill="var(--teal-l)">N</text>
                </g>

                {/* Business name + phone */}
                <text x="105" y="222" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="12.5" fill="#fff" letterSpacing=".8">NEIGHBOURHOOD PLUMBING</text>
                <text x="105" y="234" fontFamily="Barlow Condensed,sans-serif" fontWeight="600" fontSize="9" fill="var(--teal)" letterSpacing="1.2">MELBOURNE VIC</text>
                <text x="216" y="266" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="9" fill="rgba(11,17,23,.85)" letterSpacing="1.2">0488 885 122</text>

                {/* ── WATER JET from front of van ── */}
                <g className="water-jet" style={{ transformOrigin:"444px 220px" }}>
                  <path d="M444,220 Q470,215 500,218 Q520,220 530,224"
                    fill="none" stroke="rgba(0,191,166,.55)" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M444,226 Q468,222 495,225 Q512,227 522,230"
                    fill="none" stroke="rgba(0,191,166,.35)" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Droplets at end */}
                  <circle cx="528" cy="222" r="3" fill="rgba(0,191,166,.5)"/>
                  <circle cx="520" cy="230" r="2" fill="rgba(0,191,166,.4)"/>
                  <circle cx="534" cy="228" r="2.5" fill="rgba(0,191,166,.35)"/>
                </g>

                {/* ── WHEELS ── */}
                {[96, 352].map(wx => (
                  <g key={wx} transform={`translate(${wx},274)`}>
                    <circle cx="0" cy="0" r="26" fill="#080d12" stroke="rgba(0,191,166,.35)" strokeWidth="2"/>
                    <circle cx="0" cy="0" r="17" fill="#0d1520" stroke="rgba(0,191,166,.2)" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3.5"/>
                    <circle cx="0" cy="0" r="5" fill="#555"/>
                    <g className="wh-spin">
                      {[0,45,90,135,180,225,270,315].map(a => {
                        const rad=(a*Math.PI)/180;
                        return <line key={a} x1={+(Math.cos(rad)*6).toFixed(2)} y1={+(Math.sin(rad)*6).toFixed(2)} x2={+(Math.cos(rad)*16).toFixed(2)} y2={+(Math.sin(rad)*16).toFixed(2)} stroke="rgba(0,191,166,.55)" strokeWidth="2.5" strokeLinecap="round"/>;
                      })}
                    </g>
                  </g>
                ))}

              </g>

              {/* Ground shadow */}
              <ellipse cx="270" cy="336" rx="260" ry="6" fill="rgba(0,0,0,.25)"/>

              {/* Floating badge — Now Hiring */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.5s infinite" }}>
                <rect x="10" y="18" width="148" height="78" rx="3" fill="#0F1A24"
                  style={{ filter:"drop-shadow(0 4px 18px rgba(0,0,0,.55))" }}/>
                <rect x="10" y="18" width="148" height="5" rx="3" fill="var(--teal)"/>
                <rect x="10" y="20" width="148" height="3" fill="var(--teal)"/>
                <text x="84" y="46" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="#fff" letterSpacing="1">NOW HIRING</text>
                <text x="84" y="62" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--teal-l)" letterSpacing="1">ALL MELBOURNE</text>
                <text x="84" y="88" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.3)">Licensed plumbers wanted</text>
              </g>

              {/* Floating badge — 24/7 */}
              <g style={{ animation:"float-badge 3.6s ease-in-out 1.8s infinite" }}>
                <rect x="384" y="16" width="144" height="74" rx="3" fill="#0F1A24" stroke="rgba(0,191,166,.22)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,.4))" }}/>
                <rect x="384" y="16" width="144" height="4" rx="3" fill="rgba(0,191,166,.65)"/>
                <text x="456" y="42" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="22" fill="var(--teal-l)">24 / 7</text>
                <text x="456" y="58" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="#fff" letterSpacing="1">EMERGENCY</text>
                <text x="456" y="80" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.3)">Always operating</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.3,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(0,191,166,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),var(--teal),transparent)" }}/>
        <div className="stat-grid">
          {[
            { n:"24/7",   l:"Always Operating"    },
            { n:"All",    l:"Melbourne Suburbs"   },
            { n:"CCTV",   l:"& Modern Tech"       },
            { n:"Growing",l:"Fast in 2025"        },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--teal-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(232,240,247,.3)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height:2,background:"linear-gradient(90deg,transparent,var(--teal),transparent)",opacity:.4 }}/>
      </div>

      {/* ══ OPEN ROLES ══ */}
      <section id="roles" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Open Positions</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              ROLES WE&apos;RE<br/><span style={{ color:"var(--teal)" }}>FILLING NOW</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--teal),var(--teal-l))",marginTop:16,borderRadius:2 }}/>
            <p style={{ color:"var(--muted)",fontSize:".95rem",maxWidth:540,marginTop:16,lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>
              All roles are Melbourne-based. Click any role to see exactly what we&apos;re looking for.
            </p>
          </div>

          <div ref={rolesRef} className="roles-grid">
            {ROLES.map((role, i) => (
              <div key={role.title}
                className={`role-card ${openRole === i ? "open" : ""}`}
                onClick={() => setOpenRole(openRole === i ? null : i)}>

                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16 }}>
                  <div>
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                      <span style={{ fontSize:"1.5rem" }}>{role.badge}</span>
                      <div style={{ display:"inline-block",background:"rgba(0,191,166,.1)",border:"1px solid rgba(0,191,166,.28)",padding:"3px 12px",borderRadius:2 }}>
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",letterSpacing:"2px",color:"var(--teal-l)",fontWeight:700,textTransform:"uppercase" }}>{role.type}</span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.5rem",color:"#fff",letterSpacing:".5px",textTransform:"uppercase",lineHeight:1 }}>{role.title}</h3>
                  </div>
                  <div style={{ width:32,height:32,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.1)",borderRadius:2,marginTop:4,transition:"transform .3s, border-color .3s",transform:openRole===i?"rotate(45deg)":"rotate(0deg)",borderColor:openRole===i?"rgba(0,191,166,.5)":"rgba(255,255,255,.1)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2 L7 12 M2 7 L12 7" stroke={openRole===i?"var(--teal-l)":"rgba(255,255,255,.4)"} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <p style={{ color:"var(--muted)",fontSize:".9rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif",marginTop:12 }}>{role.desc}</p>

                <div style={{ maxHeight:openRole===i?"320px":"0",overflow:"hidden",transition:"max-height .4s ease" }}>
                  <div style={{ paddingTop:20,borderTop:"1px solid var(--border)",marginTop:18 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".72rem",letterSpacing:"2.5px",color:"var(--teal-l)",textTransform:"uppercase",marginBottom:12 }}>What we&apos;re looking for</div>
                    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                      {role.reqs.map(r => (
                        <div key={r} style={{ display:"flex",gap:10,alignItems:"center" }}>
                          <div style={{ width:18,height:18,background:"rgba(0,191,166,.1)",border:"1px solid rgba(0,191,166,.28)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                            <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2,5 L4,7.5 L8,2.5" stroke="var(--teal-l)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          <span style={{ color:"rgba(232,240,247,.75)",fontSize:".87rem",fontFamily:"'Barlow',sans-serif" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#apply" className="btn-teal" style={{ marginTop:20,display:"inline-flex",fontSize:".82rem",padding:"11px 24px" }}>APPLY FOR THIS ROLE →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:24,padding:"20px 24px",background:"var(--dark3)",border:"1px solid var(--border)",borderRadius:3 }}>
            <p style={{ color:"var(--muted)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif",lineHeight:1.7 }}>
              <strong style={{ color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:".5px" }}>Not seeing your exact role?</strong>{" "}
              We&apos;re growing fast and not all positions are listed here. If you&apos;re a licensed plumber, gas fitter or drainer in Melbourne — reach out anyway. We&apos;d rather talk than miss good people.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PERKS ══ */}
      <section id="perks" className="section-pad" style={{ background:"var(--black)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Why Join Us</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              WHAT MAKES<br/><span style={{ color:"var(--teal)" }}>NP DIFFERENT</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--teal),var(--teal-l))",marginTop:16,borderRadius:2 }}/>
          </div>
          <div ref={perksRef} className="perks-grid">
            {PERKS.map(p => (
              <div key={p.title} className="perk-card">
                <div style={{ fontSize:"1.8rem",marginBottom:12 }}>{p.icon}</div>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#fff",marginBottom:8,textTransform:"uppercase",letterSpacing:".5px" }}>{p.title}</h3>
                <p style={{ color:"var(--muted)",fontSize:".87rem",lineHeight:1.75,fontFamily:"'Barlow',sans-serif" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section ref={aboutRef} className="section-sm" style={{ background:"var(--dark2)",position:"relative",textAlign:"center" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),var(--blue-l),transparent)" }}/>
        <div className="inner-1100">
          {/* Water drop emblem */}
          <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}>
            <svg width="72" height="90" viewBox="0 0 72 90">
              <path d="M36,4 Q55,22 62,42 Q70,65 36,82 Q2,65 10,42 Q17,22 36,4Z"
                fill="rgba(0,191,166,.08)" stroke="rgba(0,191,166,.4)" strokeWidth="1.5"/>
              <path d="M36,14 Q50,28 55,44 Q60,60 36,72 Q12,60 17,44 Q22,28 36,14Z"
                fill="rgba(0,191,166,.12)" stroke="rgba(0,191,166,.2)" strokeWidth="1"/>
              <text x="36" y="52" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="28" fill="var(--teal-l)">NP</text>
              {/* Ripple at base */}
              <ellipse cx="36" cy="82" rx="12" ry="4" fill="none" stroke="rgba(0,191,166,.3)" strokeWidth="1.5"/>
              <ellipse cx="36" cy="82" rx="20" ry="6" fill="none" stroke="rgba(0,191,166,.15)" strokeWidth="1"/>
            </svg>
          </div>

          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(0,191,166,.55)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>About Neighbourhood Plumbing</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:20,letterSpacing:"-1px" }}>
            MELBOURNE&apos;S<br/><span style={{ color:"var(--teal-l)" }}>LOCAL PLUMBERS.</span>
          </h2>
          <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:620,margin:"0 auto 24px",lineHeight:1.8,fontFamily:"'Barlow',sans-serif" }}>
            We&apos;re a Melbourne-based plumbing business operating 24/7 across all suburbs. Blocked drains, 
            CCTV inspections, pipe relining, hot water, gas fitting — we do it all with modern tools 
            and a no-nonsense approach. We held our Christmas party in December 2025 with a team that&apos;s 
            proud of the culture we&apos;ve built. Now we need more good people to grow with us.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:28 }}>
            {["Melbourne VIC","24/7 Emergency","CCTV Inspections","Pipe Relining","Gas Fitting","All Suburbs"].map(tag => (
              <span key={tag} style={{ padding:"9px 20px",background:"rgba(0,191,166,.06)",border:"1px solid rgba(0,191,166,.18)",color:"rgba(232,240,247,.75)",fontSize:".88rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:2 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--teal),transparent)",opacity:.3 }}/>
      </section>

      {/* ══ APPLY FORM ══ */}
      <section id="apply" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--teal-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get in Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              APPLY OR<br/><span style={{ color:"var(--teal)" }}>MAKE CONTACT</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--teal),var(--teal-l))",marginTop:14,borderRadius:2 }}/>
          </div>

          <div ref={applyRef} className="apply-grid">
            {/* Left */}
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone",    val:"0488 885 122",                       href:"tel:+61488885122" },
                { icon:"✉️", label:"Email",    val:"Info@neighbourhoodplumbing.com.au",  href:"mailto:Info@neighbourhoodplumbing.com.au" },
                { icon:"📍", label:"Location", val:"Melbourne, VIC — all suburbs",       href:undefined },
                { icon:"🕐", label:"Hours",    val:"24/7 — always operating",            href:undefined },
                { icon:"🌐", label:"Website",  val:"neighbourhoodplumbing.com.au",       href:"https://neighbourhoodplumbing.com.au" },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"16px 18px",background:"var(--dark2)",border:"1px solid var(--border)",borderRadius:3 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--teal-l)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"#fff",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--teal-l)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{c.val}</a>
                      : <span style={{ color:"rgba(232,240,247,.7)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}

              <div style={{ padding:"20px 22px",background:"rgba(0,191,166,.06)",border:"1px solid rgba(0,191,166,.18)",borderRadius:3,marginTop:4 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--teal-l)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:8 }}>Quick & easy process</div>
                <p style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>
                  Fill in the form, send your resume, or just give us a call. We don&apos;t make it complicated — if your experience fits, we&apos;ll be in touch fast.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background:"var(--dark2)",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:3,boxShadow:"0 4px 40px rgba(0,0,0,.3)" }}>
              <div style={{ height:3,background:"linear-gradient(90deg,var(--teal),var(--teal-l))",margin:"-36px -32px 26px",borderRadius:"3px 3px 0 0" }}/>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.25rem",color:"#fff",letterSpacing:"1px",marginBottom:6,textTransform:"uppercase" }}>Send Your Application</div>
              <p style={{ color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",marginBottom:24,lineHeight:1.6 }}>Fill this in and we&apos;ll be in touch. Or email your resume directly.</p>

              {[
                { label:"Your Name",   type:"text",  ph:"Jane Smith" },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX" },
                { label:"Email",       type:"email", ph:"you@example.com" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(232,240,247,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(0,191,166,.5)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}

              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(232,240,247,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Role Applying For</label>
                <select style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"rgba(232,240,247,.7)",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",cursor:"pointer" }}>
                  <option value="">Select a role…</option>
                  {ROLES.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                  <option value="other">General enquiry / other</option>
                </select>
              </div>

              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(232,240,247,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Melbourne Suburb / Area</label>
                <input type="text" placeholder="e.g. Fitzroy, Dandenong, Richmond…"
                  style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(0,191,166,.5)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(232,240,247,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>About You</label>
                <textarea rows={4} placeholder="Your licences, experience, what you're looking for and why Neighbourhood Plumbing…"
                  style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:2,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(0,191,166,.5)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-teal" style={{ width:"100%",fontSize:".9rem" }}>SUBMIT APPLICATION</button>
              <p style={{ textAlign:"center",marginTop:12,color:"rgba(232,240,247,.2)",fontSize:".75rem",fontFamily:"'Barlow',sans-serif" }}>
                Or email: <a href="mailto:Info@neighbourhoodplumbing.com.au" style={{ color:"rgba(0,191,166,.55)",textDecoration:"none" }}>Info@neighbourhoodplumbing.com.au</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--dark2)",padding:"0 52px 28px",borderTop:"1px solid var(--border)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--teal),var(--teal-l),var(--blue-l),var(--teal),transparent)",marginBottom:28 }}/>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <svg width="36" height="44" viewBox="0 0 72 90">
              <path d="M36,4 Q55,22 62,42 Q70,65 36,82 Q2,65 10,42 Q17,22 36,4Z" fill="rgba(0,191,166,.12)" stroke="rgba(0,191,166,.4)" strokeWidth="1.5"/>
              <text x="36" y="52" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="26" fill="var(--teal)" opacity=".8">NP</text>
            </svg>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".9rem",color:"rgba(255,255,255,.7)",letterSpacing:"1.5px" }}>NEIGHBOURHOOD PLUMBING</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(0,191,166,.4)",letterSpacing:"2px",textTransform:"uppercase" }}>Melbourne, VIC · All Suburbs · Always Open</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61488885122" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>0488 885 122</a>
            <a href="mailto:Info@neighbourhoodplumbing.com.au" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>Info@neighbourhoodplumbing.com.au</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.15)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Neighbourhood Plumbing. Melbourne, Australia.</div>
        </div>
      </footer>
    </div>
  );
}
