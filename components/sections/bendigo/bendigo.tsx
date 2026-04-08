"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    title: "Qualified Tyre Technician",
    type: "Full-Time",
    desc: "Tyre fitting, balancing, alignment and puncture repairs. You know your way around a tyre machine and take pride in clean, efficient work.",
    reqs: ["Tyre fitting & balancing experience", "Wheel alignment preferred", "Current driver's licence", "Able to work Mon–Sat"],
  },
  {
    title: "Automotive Mechanic",
    type: "Full-Time",
    desc: "Log book servicing, mechanical repairs, diagnostics. VACC-accredited workshop. You're trade-qualified and ready to do honest work for Bendigo people.",
    reqs: ["Certificate III in Light Vehicle Mechanical Technology", "Experience with log book servicing", "Diagnostic software experience a plus", "Strong work ethic"],
  },
  {
    title: "Service Advisor / Counter Staff",
    type: "Full-Time",
    desc: "Customer-facing role. Booking jobs, advising customers, running the front counter. You're organised, people-focused and know your automotive basics.",
    reqs: ["Automotive knowledge (tyre/mechanical)", "Strong communication skills", "Experience with workshop bookings", "Driver's licence essential"],
  },
];

const PERKS = [
  { icon: "🏆", title: "Local & Independent",   desc: "We're not a franchise. We're Bendigo-owned and Bendigo-run — you're part of the community, not a number in a system." },
  { icon: "👥", title: "Same Tight-Knit Team",  desc: "Five staff. Everyone knows everyone. No corporate politics — just a team that shows up, works hard and looks after each other." },
  { icon: "🔧", title: "Proper Workshop",       desc: "178 Lyttleton Terrace. Full equipment, quality products, Dunlop Super Dealer status. The setup to do the job properly." },
  { icon: "📈", title: "Growing Business",      desc: "16 months in as Bendigo Tyre & Auto. New identity, same trusted team. We're growing and building something worth being part of." },
  { icon: "🚗", title: "Full Range of Work",    desc: "Tyres, log book servicing, alignments, lift kits, rims, truck tyres. Varied work — you won't be bored." },
  { icon: "🤝", title: "Honest Culture",        desc: "We give customers honest advice. Same goes internally. Straight talking, fair dealing, no nonsense." },
];

// Tyre spoke coords — SSR safe
const SPOKE_ANGLES_8 = [0,45,90,135,180,225,270,315];
const TYRE_SPOKES = SPOKE_ANGLES_8.map(a => {
  const r = (a * Math.PI) / 180;
  return { x1: +(Math.cos(r)*8).toFixed(3), y1: +(Math.sin(r)*8).toFixed(3), x2: +(Math.cos(r)*18).toFixed(3), y2: +(Math.sin(r)*18).toFixed(3) };
});
const TYRE_SPOKES_LG = SPOKE_ANGLES_8.map(a => {
  const r = (a * Math.PI) / 180;
  return { x1: +(Math.cos(r)*12).toFixed(3), y1: +(Math.sin(r)*12).toFixed(3), x2: +(Math.cos(r)*28).toFixed(3), y2: +(Math.sin(r)*28).toFixed(3) };
});

export default function BendigoHiring() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openRole, setOpenRole]       = useState<number|null>(null);

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
      tl.from(heroBadgeRef.current,  { y:-20, opacity:0, duration:0.5, ease:"power2.out" })
        .from(heroTitleRef.current,  { y:80, opacity:0, skewY:2, duration:0.9, ease:"power3.out" }, "-=0.2")
        .from(heroSubRef.current,    { y:30, opacity:0, duration:0.6, ease:"power2.out" }, "-=0.4")
        .from(heroCtaRef.current,    { y:20, opacity:0, duration:0.5, ease:"power2.out" }, "-=0.35")
        .from(heroVisRef.current,    { x:60, opacity:0, duration:1.0, ease:"power3.out" }, "-=0.8");

      gsap.from(statsRef.current?.querySelectorAll(".stat-item") ?? [], {
        scrollTrigger:{ trigger:statsRef.current, start:"top 85%", toggleActions:TA },
        y:40, opacity:0, duration:0.6, stagger:0.1, ease:"power3.out",
      });

      rolesRef.current?.querySelectorAll(".role-card")?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger:{ trigger:card, start:"top 90%", toggleActions:TA },
          y:50, opacity:0, duration:0.65, delay:i*0.08, ease:"power3.out",
        });
      });

      gsap.from(perksRef.current?.querySelectorAll(".perk-card") ?? [], {
        scrollTrigger:{ trigger:perksRef.current, start:"top 85%", toggleActions:TA },
        y:40, opacity:0, scale:0.94, duration:0.6, stagger:0.07, ease:"power3.out",
      });

      gsap.from(aboutRef.current, {
        scrollTrigger:{ trigger:aboutRef.current, start:"top 82%", toggleActions:TA },
        y:60, opacity:0, duration:0.85, ease:"power3.out",
      });

      gsap.from(applyRef.current, {
        scrollTrigger:{ trigger:applyRef.current, start:"top 85%", toggleActions:TA },
        y:70, opacity:0, duration:0.85, ease:"power3.out",
      });
    });

    return () => { ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background:"#111214", color:"#EEECЕ8", fontFamily:"system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }

        :root {
          --black:   #0C0D0F;
          --dark:    #111214;
          --dark2:   #181A1D;
          --dark3:   #202326;
          --dark4:   #2A2D32;
          --red:     #D62B2B;
          --red-l:   #F03535;
          --red-d:   #B02020;
          --white:   #FFFFFF;
          --cream:   #EEE8DC;
          --border:  rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.04);
          --muted:   rgba(238,236,232,0.45);
          --glow:    rgba(214,43,43,0.2);
        }

        @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce      { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
        @keyframes dot-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes shimmer     { 0%{left:-100%} 100%{left:200%} }
        @keyframes tyre-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes tyre-spin-r { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        /* ── Service bay drive-in ── */
        @keyframes car-enter {
          0%   { transform:translateX(160%); opacity:0; }
          42%  { transform:translateX(0px);  opacity:1; }
          100% { transform:translateX(0px);  opacity:1; }
        }
        @keyframes car-settle {
          0%,100% { transform:translateX(0px) translateY(0px); }
          50%     { transform:translateX(0px) translateY(-3px); }
        }
        @keyframes lift-up {
          0%,45% { transform:translateY(0px); }
          65%    { transform:translateY(-18px); }
          80%    { transform:translateY(-18px); }
          100%   { transform:translateY(-18px); }
        }
        @keyframes tyre-off {
          0%,55% { transform:translateX(0px) rotate(0deg); opacity:1; }
          75%    { transform:translateX(-32px) rotate(-90deg); opacity:1; }
          100%   { transform:translateX(-32px) rotate(-90deg); opacity:1; }
        }
        @keyframes road-dash {
          0%   { stroke-dashoffset:0; }
          100% { stroke-dashoffset:-60; }
        }

        .car-scene    { animation: car-enter   2.2s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .car-body     { animation: car-settle  3.4s ease-in-out 2.4s infinite; }
        .car-lift     { animation: lift-up     4s ease-in-out 2.6s infinite; }
        .tyre-remove  { transform-origin: center center; animation: tyre-off  4s ease-in-out 2.6s infinite; }
        .tyre-spin-fl { animation: tyre-spin   0.4s linear 0s 5, tyre-spin   3.4s linear 2.4s infinite; }
        .tyre-spin-fr { animation: tyre-spin-r 0.4s linear 0s 5, tyre-spin-r 3.4s linear 2.4s infinite; }
        .road-anim    { stroke-dasharray:40 20; animation: road-dash .5s linear 0s 4, road-dash 3.5s linear 2.2s infinite; }

        .nav-link { color:rgba(238,236,232,.4); text-decoration:none; font-size:.85rem; letter-spacing:.5px; font-weight:500; font-family:'Barlow',sans-serif; transition:color .2s; }
        .nav-link:hover { color:#fff; }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .btn-red {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:15px 34px; background:var(--red); color:#fff;
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:1rem;
          letter-spacing:2px; border:none; cursor:pointer; text-decoration:none;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-red:hover { background:var(--red-l); transform:translateY(-2px); box-shadow:0 12px 40px var(--glow); }

        .btn-white {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:15px 34px; background:#fff; color:#0C0D0F;
          font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:1rem;
          letter-spacing:2px; border:none; cursor:pointer; text-decoration:none;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-white:hover { background:var(--cream); transform:translateY(-2px); box-shadow:0 10px 32px rgba(255,255,255,.12); }

        .btn-outline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 30px; background:transparent; color:#fff;
          border:1.5px solid rgba(255,255,255,.3); font-family:'Barlow Condensed',sans-serif; font-weight:700;
          font-size:1rem; letter-spacing:2px; cursor:pointer; text-decoration:none;
          transition:all .3s; white-space:nowrap; text-transform:uppercase;
        }
        .btn-outline:hover { border-color:rgba(255,255,255,.7); background:rgba(255,255,255,.06); transform:translateY(-2px); }

        .role-card {
          background:var(--dark2); border:1px solid var(--border);
          padding:28px 28px 24px; position:relative; overflow:hidden; cursor:pointer;
          transition:border-color .3s, transform .25s, box-shadow .3s;
        }
        .role-card:hover { border-color:rgba(214,43,43,.5); transform:translateY(-3px); box-shadow:0 12px 48px rgba(214,43,43,.07); }
        .role-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--red),var(--red-l));
          transform:scaleX(0); transform-origin:left; transition:transform .35s;
        }
        .role-card:hover::before,.role-card.open::before { transform:scaleX(1); }
        .role-card.open { border-color:rgba(214,43,43,.4); }

        .perk-card {
          background:var(--dark2); border:1px solid var(--border);
          padding:26px 22px; position:relative; overflow:hidden;
          transition:border-color .3s, transform .25s;
        }
        .perk-card:hover { border-color:rgba(214,43,43,.35); transform:translateY(-3px); }
        .perk-card::after {
          content:''; position:absolute; top:0; height:100%; width:35%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent);
          left:-100%; pointer-events:none;
        }
        .perk-card:hover::after { animation:shimmer .55s ease; }

        .stat-item { text-align:center; padding:28px 14px; border-left:1px solid rgba(255,255,255,.07); }
        .stat-item:first-child { border-left:none; }
        .info-card { transition:border-color .25s; }
        .info-card:hover { border-color:rgba(214,43,43,.4) !important; }

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
        .roles-grid   { display:grid; grid-template-columns:1fr; gap:16px; }
        .perks-grid   { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
        .apply-grid   { display:grid; grid-template-columns:1fr 1.3fr; gap:48px; align-items:start; }
        .footer-row   { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
        .hero-title   { font-size:clamp(3rem,6.5vw,5.5rem); }
        .stat-num     { font-size:2.8rem; }
        .cta-btns     { display:flex; gap:14px; flex-wrap:wrap; }

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
          .stat-item   { border-left:none !important; border-bottom:1px solid rgba(255,255,255,.06); }
          .stat-item:nth-child(2n) { border-left:1px solid rgba(255,255,255,.07) !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom:none; }
          .stat-num    { font-size:2.2rem; }
          .apply-grid  { grid-template-columns:1fr; }
          .footer-row  { flex-direction:column; align-items:flex-start; }
          .cta-btns    { flex-direction:column; }
          .btn-red,.btn-white,.btn-outline { width:100%; }
        }

        input::placeholder,textarea::placeholder { color:rgba(238,236,232,.2); }
        input,textarea { -webkit-appearance:none; }
        ::selection { background:rgba(214,43,43,.2); }
      `}</style>

      {/* ══ MOBILE MENU ══ */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(12,13,15,.98)",zIndex:99,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:44,animation:"slideDown .2s ease" }}
          onClick={() => setMenuOpen(false)}>
          {["Roles","Perks","Apply"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.4rem",color:"#fff",textDecoration:"none",letterSpacing:"3px",textTransform:"uppercase" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="mailto:info@bendigotyreandauto.com.au" className="btn-red" style={{ marginTop:8 }} onClick={() => setMenuOpen(false)}>APPLY NOW</a>
        </div>
      )}

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background: navScrolled ? "rgba(12,13,15,.96)" : "linear-gradient(180deg,rgba(12,13,15,.85) 0%,transparent 100%)",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        <div className="nav-inner">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:44,height:44,flexShrink:0 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" style={{ filter:"drop-shadow(0 2px 8px rgba(214,43,43,.3))" }}>
                {/* Tyre outer */}
                <circle cx="22" cy="22" r="20" fill="#1A1A1A" stroke="rgba(214,43,43,.6)" strokeWidth="1.5"/>
                {/* Tread blocks around edge */}
                {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
                  const r1 = (a*Math.PI)/180, r2 = ((a+20)*Math.PI)/180;
                  const x1=22+Math.cos(r1)*17, y1=22+Math.sin(r1)*17;
                  const x2=22+Math.cos(r2)*17, y2=22+Math.sin(r2)*17;
                  const x3=22+Math.cos(r2)*20, y3=22+Math.sin(r2)*20;
                  const x4=22+Math.cos(r1)*20, y4=22+Math.sin(r1)*20;
                  return <path key={a} d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} L${x4.toFixed(1)},${y4.toFixed(1)}Z`} fill="rgba(214,43,43,.5)"/>;
                })}
                {/* Rim */}
                <circle cx="22" cy="22" r="14" fill="#111" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
                {/* Spokes */}
                {TYRE_SPOKES.map((s,i) => <line key={i} x1={22+s.x1} y1={22+s.y1} x2={22+s.x2} y2={22+s.y2} stroke="rgba(214,43,43,.55)" strokeWidth="2.5" strokeLinecap="round"/>)}
                {/* Centre */}
                <circle cx="22" cy="22" r="4" fill="#222"/>
                <circle cx="22" cy="22" r="2" fill="rgba(214,43,43,.8)"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:".95rem",color:"#fff",letterSpacing:"1.5px",lineHeight:1 }}>BENDIGO TYRE & AUTO</div>
              <div style={{ fontSize:".58rem",color:"var(--red-l)",letterSpacing:"2.5px",lineHeight:1.6,fontFamily:"'Barlow',sans-serif",fontWeight:600,textTransform:"uppercase" }}>We&apos;re Hiring · Join the Team</div>
            </div>
          </div>

          <div className="desk-nav" style={{ display:"flex",gap:36 }}>
            {["Roles","Perks","Apply"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="#apply" className="btn-red desk-cta" style={{ fontSize:".78rem",padding:"9px 22px" }}>APPLY NOW</a>
          <button className={`hamburger ${menuOpen?"open":""}`} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" className="hero-section" style={{ background:"linear-gradient(145deg,#0C0D0F 0%,#111214 55%,#0F1012 100%)" }}>
        {/* Tread pattern texture */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(90deg,rgba(255,255,255,.018) 0px,rgba(255,255,255,.018) 2px,transparent 2px,transparent 32px)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,rgba(255,255,255,.012) 0px,rgba(255,255,255,.012) 2px,transparent 2px,transparent 48px)",pointerEvents:"none" }}/>
        {/* Red accent line bottom */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--red),var(--red-l),var(--red),transparent)",opacity:.8 }}/>
        {/* Red glow */}
        <div style={{ position:"absolute",top:"20%",right:"-5%",width:460,height:460,background:"radial-gradient(ellipse,rgba(214,43,43,.06) 0%,transparent 65%)",pointerEvents:"none" }}/>
        {/* Diagonal cut top right */}
        <div style={{ position:"absolute",top:0,right:0,width:0,height:0,borderStyle:"solid",borderWidth:"0 280px 280px 0",borderColor:"transparent rgba(214,43,43,.04) transparent transparent",pointerEvents:"none" }}/>

        <div className="hero-inner">
          <div className="hero-text">
            <div ref={heroBadgeRef} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(214,43,43,.1)",border:"1px solid rgba(214,43,43,.35)",padding:"6px 16px",borderRadius:2,marginBottom:22 }}>
              <div style={{ width:6,height:6,background:"var(--red-l)",borderRadius:"50%",animation:"dot-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",letterSpacing:"2.5px",color:"var(--red-l)",fontWeight:700,textTransform:"uppercase" }}>Now Hiring · Bendigo VIC</span>
            </div>

            <div ref={heroTitleRef}>
              <h1 className="hero-title" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,lineHeight:.88,letterSpacing:"-1px",color:"#fff",marginBottom:4 }}>
                JOIN<br/>
                <span style={{ color:"var(--red)" }}>BENDIGO&apos;S</span><br/>
                TYRE TEAM
              </h1>
            </div>

            <div style={{ width:80,height:3,background:"linear-gradient(90deg,var(--red),var(--red-l))",marginTop:16,marginBottom:20,borderRadius:2 }}/>

            <p ref={heroSubRef} style={{ fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.75,maxWidth:480,marginBottom:32,fontFamily:"'Barlow',sans-serif" }}>
              We&apos;re Bendigo&apos;s go-to for tyres, servicing and mechanical. Local, independent and growing — we need skilled people to grow with us. Same team that&apos;s been here for years. New name, bigger future.
            </p>

            <div ref={heroCtaRef} className="cta-btns">
              <a href="#apply" className="btn-red">SEE OPEN ROLES</a>
              <a href="#perks" className="btn-outline">WHY WORK HERE</a>
            </div>

            <div style={{ marginTop:28,display:"flex",gap:28,flexWrap:"wrap" }}>
              {[
                { label:"📍 178 Lyttleton Terrace, Bendigo VIC 3550" },
                { label:"📞 (03) 4433 2400" },
              ].map(c => (
                <span key={c.label} style={{ color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif" }}>{c.label}</span>
              ))}
            </div>
          </div>

          {/* Right: Service bay animation */}
          <div ref={heroVisRef} className="hero-vis">
            <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%"
              style={{ overflow:"visible", filter:"drop-shadow(0 8px 40px rgba(0,0,0,0.55))" }}>

              {/* ── SERVICE BAY FLOOR / WORKSHOP ── */}
              {/* Bay floor */}
              <rect x="0" y="260" width="540" height="80" fill="#181A1D"/>
              {/* Floor tiles */}
              {Array.from({length:9},(_,i) => (
                <rect key={i} x={i*60} y="260" width="59" height="80" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
              ))}
              {/* Bay line / road approach */}
              <line x1="0" y1="262" x2="540" y2="262" stroke="rgba(214,43,43,.25)" strokeWidth="1.5"/>
              <line x1="0" y1="290" x2="540" y2="290"
                stroke="rgba(255,255,255,.06)" strokeWidth="2" className="road-anim"/>

              {/* ── WORKSHOP BACKGROUND ELEMENTS ── */}
              {/* Tyre rack on wall */}
              <rect x="8" y="40" width="16" height="200" rx="2" fill="#1C1E22" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              {/* Tyres on rack */}
              {[60,100,140,180,220].map(ty => (
                <g key={ty}>
                  <circle cx="22" cy={ty} r="20" fill="#111" stroke="rgba(214,43,43,.25)" strokeWidth="2"/>
                  <circle cx="22" cy={ty} r="12" fill="#181A1D" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                  <circle cx="22" cy={ty} r="4" fill="#222"/>
                </g>
              ))}
              {/* Tool panel / shadow board */}
              <rect x="468" y="30" width="64" height="180" rx="2" fill="#1C1E22" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
              {/* Tool silhouettes */}
              {/* Spanner */}
              <rect x="480" y="50" width="40" height="6" rx="3" fill="#2a2a2a"/>
              <circle cx="481" cy="53" r="5" fill="none" stroke="#333" strokeWidth="2"/>
              <circle cx="517" cy="53" r="4" fill="none" stroke="#333" strokeWidth="2"/>
              {/* Socket set row */}
              {[480,492,504,516].map(sx => (
                <circle key={sx} cx={sx} cy="80" r="5" fill="#252525" stroke="rgba(214,43,43,.2)" strokeWidth="1"/>
              ))}
              {/* Air hose reel */}
              <circle cx="500" cy="130" r="16" fill="none" stroke="#252525" strokeWidth="4"/>
              <circle cx="500" cy="130" r="8" fill="#1C1E22" stroke="#2a2a2a" strokeWidth="1"/>
              {/* Red accent on board */}
              <rect x="468" y="30" width="64" height="4" rx="2" fill="rgba(214,43,43,.5)"/>

              {/* ── HOIST / LIFT ── */}
              {/* Lift arms */}
              <rect x="145" y="258" width="12" height="40" rx="2" fill="#2a2d32" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              <rect x="355" y="258" width="12" height="40" rx="2" fill="#2a2d32" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
              {/* Lift pads */}
              <rect x="132" y="255" width="38" height="8" rx="2" fill="#333640"/>
              <rect x="342" y="255" width="38" height="8" rx="2" fill="#333640"/>
              {/* Lift base */}
              <rect x="0" y="295" width="540" height="6" fill="#1C1E22" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>

              {/* ── CAR ON LIFT ── */}
              <g className="car-scene">
                <g className="car-lift">

                  {/* ── CAR BODY (Side profile — sedan/hatch) ── */}
                  <g className="car-body">

                    {/* Car shadow on floor */}
                    <ellipse cx="270" cy="285" rx="195" ry="8" fill="rgba(0,0,0,.35)"/>

                    {/* Main body lower */}
                    <rect x="70" y="205" width="400" height="55" rx="6" fill="#2A2D32" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>
                    {/* Sill / rocker panel */}
                    <rect x="75" y="248" width="390" height="10" rx="3" fill="#222528"/>
                    {/* Bumper rear */}
                    <path d="M70,215 Q58,215 55,225 L55,248 Q60,258 75,258 L75,248 Z" fill="#222528" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                    {/* Bumper front */}
                    <path d="M470,215 Q482,215 485,225 L485,248 Q480,258 465,258 L465,248 Z" fill="#222528" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                    {/* Headlight front */}
                    <path d="M465,215 Q480,215 485,228 L485,235 L465,232Z" fill="rgba(255,245,180,.12)" stroke="rgba(255,245,180,.2)" strokeWidth="1"/>
                    {/* Tail light rear */}
                    <rect x="55" y="220" width="14" height="18" rx="2" fill="rgba(214,43,43,.4)" stroke="rgba(214,43,43,.25)" strokeWidth="1"/>

                    {/* Upper body / greenhouse */}
                    <path d="M160,206 L160,168 Q160,158 170,152 L240,138 Q260,134 310,134 L390,134 Q415,134 430,148 L465,182 L465,206Z"
                      fill="#242629" stroke="rgba(255,255,255,.08)" strokeWidth="1.5"/>
                    {/* A-pillar */}
                    <path d="M160,206 L180,158 Q190,148 200,144 L240,138" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2"/>
                    {/* C-pillar */}
                    <path d="M390,134 Q415,134 430,148 L455,182" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2"/>
                    {/* Windscreen */}
                    <path d="M188,160 L210,148 Q240,138 290,136 L380,136 Q400,136 418,148 L448,178 L170,178Z"
                      fill="rgba(150,200,240,.06)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                    {/* Windscreen glare */}
                    <path d="M200,160 L240,140 L300,138 L290,160Z" fill="rgba(255,255,255,.04)"/>
                    {/* Side window */}
                    <path d="M165,206 L168,175 L380,175 L380,206Z" fill="rgba(150,200,240,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
                    {/* B-pillar */}
                    <rect x="292" y="175" width="8" height="32" fill="#242629"/>
                    {/* Door handle */}
                    <rect x="280" y="225" width="20" height="4" rx="2" fill="rgba(255,255,255,.15)"/>
                    <rect x="340" y="225" width="20" height="4" rx="2" fill="rgba(255,255,255,.15)"/>
                    {/* Bonnet line */}
                    <path d="M380,134 Q420,134 448,160 L465,178 L465,206 L380,206Z"
                      fill="#282B30" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
                    {/* Bonnet ridge */}
                    <path d="M390,134 L440,160 L450,178" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1.5"/>

                    {/* Branding strip */}
                    <rect x="75" y="238" width="390" height="8" fill="rgba(214,43,43,.4)"/>
                    {/* Name on car */}
                    <text x="270" y="245" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="6.5" fill="rgba(255,255,255,.6)" letterSpacing="2">BENDIGO TYRE & AUTO</text>

                    {/* Wheels */}
                    {/* Front wheel (right of car = front) */}
                    <g transform="translate(390,262)">
                      <circle cx="0" cy="0" r="30" fill="#111" stroke="rgba(255,255,255,.08)" strokeWidth="2"/>
                      {/* Tyre tread */}
                      {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map(a => {
                        const r1=(a*Math.PI)/180, r2=((a+14)*Math.PI)/180;
                        return <path key={a} d={`M${(Math.cos(r1)*26).toFixed(1)},${(Math.sin(r1)*26).toFixed(1)} L${(Math.cos(r2)*26).toFixed(1)},${(Math.sin(r2)*26).toFixed(1)} L${(Math.cos(r2)*30).toFixed(1)},${(Math.sin(r2)*30).toFixed(1)} L${(Math.cos(r1)*30).toFixed(1)},${(Math.sin(r1)*30).toFixed(1)}Z`} fill="rgba(255,255,255,.04)"/>;
                      })}
                      {/* Rim */}
                      <circle cx="0" cy="0" r="20" fill="#1C1E22" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                      <circle cx="0" cy="0" r="6" fill="#2a2d32"/>
                      <g className="tyre-spin-fl">
                        {TYRE_SPOKES_LG.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(214,43,43,.55)" strokeWidth="2.5" strokeLinecap="round"/>)}
                      </g>
                      <circle cx="0" cy="0" r="3" fill="#444"/>
                    </g>

                    {/* Rear wheel — with tyre-remove animation */}
                    <g className="tyre-remove" style={{ transformBox:"fill-box" }}>
                      <g transform="translate(148,262)">
                        <circle cx="0" cy="0" r="30" fill="#111" stroke="rgba(255,255,255,.08)" strokeWidth="2"/>
                        {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map(a => {
                          const r1=(a*Math.PI)/180, r2=((a+14)*Math.PI)/180;
                          return <path key={a} d={`M${(Math.cos(r1)*26).toFixed(1)},${(Math.sin(r1)*26).toFixed(1)} L${(Math.cos(r2)*26).toFixed(1)},${(Math.sin(r2)*26).toFixed(1)} L${(Math.cos(r2)*30).toFixed(1)},${(Math.sin(r2)*30).toFixed(1)} L${(Math.cos(r1)*30).toFixed(1)},${(Math.sin(r1)*30).toFixed(1)}Z`} fill="rgba(255,255,255,.04)"/>;
                        })}
                        <circle cx="0" cy="0" r="20" fill="#1C1E22" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="6" fill="#2a2d32"/>
                        <g className="tyre-spin-fr">
                          {TYRE_SPOKES_LG.map((s,i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(214,43,43,.55)" strokeWidth="2.5" strokeLinecap="round"/>)}
                        </g>
                        <circle cx="0" cy="0" r="3" fill="#444"/>
                      </g>
                    </g>

                  </g>{/* end car-body */}
                </g>{/* end car-lift */}
              </g>{/* end car-scene */}

              {/* Technician silhouette (standing to the right) */}
              <g style={{ opacity:0.8 }}>
                {/* Body */}
                <rect x="452" y="185" width="20" height="36" rx="3" fill="#D62B2B" opacity=".85"/>
                {/* Head */}
                <circle cx="462" cy="179" r="11" fill="#C8A07A"/>
                {/* Hair/cap */}
                <path d="M451,176 Q462,168 473,176 L473,182 Q462,178 451,182Z" fill="#1C1E22"/>
                {/* Arms */}
                <rect x="436" y="188" width="16" height="8" rx="3" fill="#D62B2B" opacity=".8"/>
                <rect x="472" y="188" width="16" height="8" rx="3" fill="#D62B2B" opacity=".8"/>
                {/* Torque wrench in hand */}
                <rect x="428" y="188" width="20" height="4" rx="2" fill="#555"/>
                <circle cx="427" cy="190" r="6" fill="none" stroke="#666" strokeWidth="2.5"/>
                {/* Legs */}
                <rect x="453" y="221" width="7" height="22" rx="2" fill="#2a2d32"/>
                <rect x="462" y="221" width="7" height="22" rx="2" fill="#2a2d32"/>
                {/* Boots */}
                <rect x="451" y="241" width="10" height="6" rx="1" fill="#1a1a1a"/>
                <rect x="460" y="241" width="10" height="6" rx="1" fill="#1a1a1a"/>
                {/* Name badge hint */}
                <rect x="456" y="198" width="10" height="6" rx="1" fill="rgba(255,255,255,.2)"/>
              </g>

              {/* Ground shadow */}
              <ellipse cx="270" cy="336" rx="260" ry="5" fill="rgba(0,0,0,.25)"/>

              {/* Floating badge — Now Hiring */}
              <g style={{ animation:"float-badge 3s ease-in-out 0.5s infinite" }}>
                <rect x="8" y="18" width="148" height="76" rx="3" fill="#1A1D20"
                  style={{ filter:"drop-shadow(0 4px 18px rgba(0,0,0,.5))" }}/>
                <rect x="8" y="18" width="148" height="5" rx="3" fill="var(--red)"/>
                <rect x="8" y="20" width="148" height="3" fill="var(--red)"/>
                <text x="82" y="46" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="13" fill="#fff" letterSpacing="1">NOW HIRING</text>
                <text x="82" y="62" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--red-l)" letterSpacing="1">BENDIGO VIC</text>
                <text x="82" y="86" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.35)">178 Lyttleton Terrace</text>
              </g>

              {/* Floating badge — VACC Accredited */}
              <g style={{ animation:"float-badge 3.8s ease-in-out 2s infinite" }}>
                <rect x="382" y="16" width="148" height="72" rx="3" fill="#1A1D20" stroke="rgba(214,43,43,.25)" strokeWidth="1.5"
                  style={{ filter:"drop-shadow(0 4px 16px rgba(0,0,0,.4))" }}/>
                <rect x="382" y="16" width="148" height="4" rx="3" fill="rgba(214,43,43,.7)"/>
                <text x="456" y="40" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="900" fontSize="11.5" fill="#fff" letterSpacing="1">VACC ACCREDITED</text>
                <text x="456" y="56" textAnchor="middle" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" fontSize="10" fill="var(--red)" letterSpacing="1">DUNLOP DEALER</text>
                <text x="456" y="78" textAnchor="middle" fontFamily="Barlow,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.3)">5-star local workshop</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute",bottom:22,left:"50%",animation:"bounce 2s ease-in-out infinite",opacity:.3,zIndex:4 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <span style={{ fontSize:".52rem",letterSpacing:"3px",color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase" }}>Scroll</span>
            <svg width="14" height="20" viewBox="0 0 16 24" fill="none">
              <path d="M8 0 L8 18 M2 12 L8 20 L14 12" stroke="rgba(214,43,43,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background:"var(--dark2)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--red),var(--red-l),var(--red),transparent)" }}/>
        <div className="stat-grid">
          {[
            { n:"5",      l:"Staff on the Team"    },
            { n:"16+",    l:"Months & Growing"     },
            { n:"VACC",   l:"Accredited Workshop"  },
            { n:"Dunlop", l:"Super Dealer"         },
          ].map(s => (
            <div key={s.l} className="stat-item">
              <div className="stat-num" style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,color:"var(--red-l)",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:".68rem",letterSpacing:"2px",color:"rgba(238,236,232,.3)",marginTop:6,textTransform:"uppercase",fontFamily:"'Barlow',sans-serif" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ height:2,background:"linear-gradient(90deg,transparent,var(--red),transparent)",opacity:.45 }}/>
      </div>

      {/* ══ OPEN ROLES ══ */}
      <section id="roles" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--red-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Open Positions</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              ROLES WE&apos;RE<br/><span style={{ color:"var(--red)" }}>FILLING NOW</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--red),var(--red-l))",marginTop:16,borderRadius:2 }}/>
            <p style={{ color:"var(--muted)",fontSize:".95rem",maxWidth:520,marginTop:16,lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>
              Click any role to see what we&apos;re looking for. All positions are based at 178 Lyttleton Terrace, Bendigo.
            </p>
          </div>

          <div ref={rolesRef} className="roles-grid">
            {ROLES.map((role, i) => (
              <div key={role.title} className={`role-card ${openRole===i?"open":""}`}
                onClick={() => setOpenRole(openRole===i ? null : i)}>
                {/* Header row */}
                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16 }}>
                  <div>
                    <div style={{ display:"inline-block",background:"rgba(214,43,43,.12)",border:"1px solid rgba(214,43,43,.3)",padding:"3px 12px",borderRadius:2,marginBottom:10 }}>
                      <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",letterSpacing:"2px",color:"var(--red-l)",fontWeight:700,textTransform:"uppercase" }}>{role.type}</span>
                    </div>
                    <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.5rem",color:"#fff",letterSpacing:".5px",textTransform:"uppercase",lineHeight:1 }}>{role.title}</h3>
                  </div>
                  <div style={{ width:32,height:32,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.12)",borderRadius:2,marginTop:4,transition:"transform .3s, border-color .3s",transform:openRole===i?"rotate(45deg)":"rotate(0deg)",borderColor:openRole===i?"rgba(214,43,43,.5)":"rgba(255,255,255,.12)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2 L7 12 M2 7 L12 7" stroke={openRole===i?"var(--red-l)":"rgba(255,255,255,.5)"} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <p style={{ color:"var(--muted)",fontSize:".9rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif",marginTop:12 }}>{role.desc}</p>

                {/* Expandable requirements */}
                <div style={{ maxHeight:openRole===i?"300px":"0", overflow:"hidden", transition:"max-height .4s ease" }}>
                  <div style={{ paddingTop:20,borderTop:"1px solid var(--border)",marginTop:18 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".75rem",letterSpacing:"2.5px",color:"var(--red-l)",textTransform:"uppercase",marginBottom:12 }}>What we&apos;re looking for</div>
                    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                      {role.reqs.map(r => (
                        <div key={r} style={{ display:"flex",gap:10,alignItems:"center" }}>
                          <div style={{ width:18,height:18,background:"rgba(214,43,43,.12)",border:"1px solid rgba(214,43,43,.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                            <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2,5 L4,7.5 L8,2.5" stroke="var(--red-l)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          <span style={{ color:"rgba(238,236,232,.75)",fontSize:".87rem",fontFamily:"'Barlow',sans-serif" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#apply" className="btn-red" style={{ marginTop:20,display:"inline-flex",fontSize:".82rem",padding:"11px 24px" }}>APPLY FOR THIS ROLE →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:24,padding:"20px 24px",background:"var(--dark3)",border:"1px solid var(--border)",borderRadius:3 }}>
            <p style={{ color:"var(--muted)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif",lineHeight:1.7 }}>
              <strong style={{ color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:".5px" }}>Don&apos;t see your role listed?</strong> We&apos;re always open to speaking with experienced tyre and auto people. Send us your resume and tell us what you do — we&apos;d rather hear from the right person than miss out.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PERKS / WHY WORK HERE ══ */}
      <section id="perks" className="section-pad" style={{ background:"var(--black)",borderTop:"1px solid var(--border2)" }}>
        <div className="inner-max">
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--red-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Why Join Us</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              WHAT MAKES<br/><span style={{ color:"var(--red)" }}>THIS DIFFERENT</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--red),var(--red-l))",marginTop:16,borderRadius:2 }}/>
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

      {/* ══ ABOUT THE BUSINESS ══ */}
      <section ref={aboutRef} className="section-sm" style={{ background:"var(--dark2)",position:"relative",textAlign:"center" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,var(--red),var(--red-l),var(--red),transparent)" }}/>
        <div className="inner-1100">
          {/* Large tyre emblem */}
          <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="38" fill="rgba(214,43,43,.06)" stroke="rgba(214,43,43,.3)" strokeWidth="1.5"/>
              {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map(a => {
                const r1=(a*Math.PI)/180, r2=((a+14)*Math.PI)/180;
                return <path key={a} d={`M${(40+Math.cos(r1)*33).toFixed(1)},${(40+Math.sin(r1)*33).toFixed(1)} L${(40+Math.cos(r2)*33).toFixed(1)},${(40+Math.sin(r2)*33).toFixed(1)} L${(40+Math.cos(r2)*38).toFixed(1)},${(40+Math.sin(r2)*38).toFixed(1)} L${(40+Math.cos(r1)*38).toFixed(1)},${(40+Math.sin(r1)*38).toFixed(1)}Z`} fill="rgba(214,43,43,.2)"/>;
              })}
              <circle cx="40" cy="40" r="26" fill="var(--dark)" stroke="rgba(214,43,43,.2)" strokeWidth="1"/>
              {TYRE_SPOKES_LG.map((s,i) => <line key={i} x1={40+s.x1} y1={40+s.y1} x2={40+s.x2} y2={40+s.y2} stroke="rgba(214,43,43,.4)" strokeWidth="3" strokeLinecap="round"/>)}
              <circle cx="40" cy="40" r="7" fill="#1C1E22"/>
              <circle cx="40" cy="40" r="3.5" fill="rgba(214,43,43,.7)"/>
            </svg>
          </div>

          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"rgba(214,43,43,.6)",marginBottom:12,fontWeight:700,textTransform:"uppercase" }}>About Bendigo Tyre & Auto</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:20,letterSpacing:"-1px" }}>
            SAME TEAM.<br/><span style={{ color:"var(--red-l)" }}>FRESH START.</span>
          </h2>
          <p style={{ color:"var(--muted)",fontSize:"1rem",maxWidth:640,margin:"0 auto 24px",lineHeight:1.8,fontFamily:"'Barlow',sans-serif" }}>
            In September 2024, Beaurepaires Bendigo became Bendigo Tyre &amp; Auto. Independent. Local. 
            The same five staff who&apos;ve looked after this community for years are still here — same faces, same quality.
            We&apos;re building our own identity now, and we want the right people alongside us.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:28 }}>
            {["178 Lyttleton Terrace","Bendigo VIC 3550","(03) 4433 2400","VACC Accredited","Dunlop Super Dealer"].map(tag => (
              <span key={tag} style={{ padding:"9px 20px",background:"rgba(214,43,43,.07)",border:"1px solid rgba(214,43,43,.2)",color:"rgba(238,236,232,.75)",fontSize:".88rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"1px",borderRadius:2 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--red),transparent)",opacity:.35 }}/>
      </section>

      {/* ══ APPLY FORM ══ */}
      <section id="apply" className="section-pad" style={{ background:"var(--dark)" }}>
        <div className="inner-1100">
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",letterSpacing:"4px",color:"var(--red-l)",marginBottom:10,fontWeight:700,textTransform:"uppercase" }}>Get in Touch</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-1px" }}>
              APPLY OR<br/><span style={{ color:"var(--red)" }}>MAKE CONTACT</span>
            </h2>
            <div style={{ width:60,height:3,background:"linear-gradient(90deg,var(--red),var(--red-l))",marginTop:14,borderRadius:2 }}/>
          </div>

          <div ref={applyRef} className="apply-grid">
            {/* Left — contact cards */}
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[
                { icon:"📞", label:"Phone",        val:"(03) 4433 2400",                       href:"tel:+61344332400" },
                { icon:"✉️", label:"Email",        val:"info@bendigotyreandauto.com.au",        href:"mailto:info@bendigotyreandauto.com.au" },
                { icon:"📍", label:"Workshop",     val:"178 Lyttleton Terrace, Bendigo VIC 3550", href:"https://maps.google.com/?q=178+Lyttleton+Terrace+Bendigo+VIC" },
                { icon:"🕐", label:"Workshop Hours", val:"Mon–Fri: 8am–5pm · Sat: 8am–12pm",   href:undefined },
              ].map(c => (
                <div key={c.label} className="info-card" style={{ display:"flex",gap:14,alignItems:"flex-start",padding:"16px 18px",background:"var(--dark2)",border:"1px solid var(--border)",borderRadius:3 }}>
                  <span style={{ fontSize:"1.1rem",lineHeight:1,marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:".6rem",letterSpacing:"2.5px",color:"var(--red-l)",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          style={{ color:"#fff",fontSize:".88rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif",transition:"color .2s",wordBreak:"break-all" }}
                          onMouseEnter={e=>(e.currentTarget.style.color="var(--red-l)")}
                          onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{c.val}</a>
                      : <span style={{ color:"rgba(238,236,232,.7)",fontSize:".88rem",fontFamily:"'Barlow',sans-serif" }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}

              {/* Encouragement block */}
              <div style={{ padding:"20px 22px",background:"rgba(214,43,43,.07)",border:"1px solid rgba(214,43,43,.2)",borderRadius:3,marginTop:4 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--red-l)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:8 }}>Drop in & say g&apos;day</div>
                <p style={{ color:"var(--muted)",fontSize:".85rem",lineHeight:1.7,fontFamily:"'Barlow',sans-serif" }}>
                  Prefer to meet in person? Come into the workshop during business hours. Ask for the manager — we&apos;re a small team, no gatekeeping.
                </p>
              </div>
            </div>

            {/* Right — application form */}
            <div style={{ background:"var(--dark2)",border:"1px solid var(--border)",padding:"36px 32px",borderRadius:3,boxShadow:"0 4px 40px rgba(0,0,0,.3)" }}>
              <div style={{ height:3,background:"linear-gradient(90deg,var(--red),var(--red-l))",margin:"-36px -32px 26px",borderRadius:"3px 3px 0 0" }}/>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.25rem",color:"#fff",letterSpacing:"1px",marginBottom:6,textTransform:"uppercase" }}>Send Your Application</div>
              <p style={{ color:"var(--muted)",fontSize:".82rem",fontFamily:"'Barlow',sans-serif",marginBottom:24,lineHeight:1.6 }}>Fill this in and we&apos;ll be in touch. Or email your resume directly.</p>

              {[
                { label:"Your Name",   type:"text",  ph:"Jane Smith" },
                { label:"Phone",       type:"tel",   ph:"04XX XXX XXX" },
                { label:"Email",       type:"email", ph:"you@example.com" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(238,236,232,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",transition:"border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(214,43,43,.5)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
              ))}

              {/* Role selector */}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(238,236,232,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Role Applying For</label>
                <select style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"rgba(238,236,232,.7)",fontSize:".88rem",outline:"none",borderRadius:2,fontFamily:"'Barlow',sans-serif",cursor:"pointer" }}>
                  <option value="">Select a role…</option>
                  {ROLES.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                  <option value="other">General enquiry / other</option>
                </select>
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block",fontSize:".6rem",letterSpacing:"2px",color:"rgba(238,236,232,.3)",marginBottom:5,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase" }}>Tell Us About Yourself</label>
                <textarea rows={4} placeholder="Your experience, trade quals, what you're looking for, why Bendigo Tyre & Auto…"
                  style={{ width:"100%",background:"var(--dark3)",border:"1.5px solid var(--border)",padding:"11px 14px",color:"#fff",fontSize:".88rem",outline:"none",resize:"vertical",fontFamily:"'Barlow',sans-serif",borderRadius:2,transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(214,43,43,.5)"}
                  onBlur={e=>e.target.style.borderColor="var(--border)"}
                />
              </div>
              <button className="btn-red" style={{ width:"100%",fontSize:".9rem" }}>SUBMIT APPLICATION</button>
              <p style={{ textAlign:"center",marginTop:12,color:"rgba(238,236,232,.2)",fontSize:".75rem",fontFamily:"'Barlow',sans-serif" }}>
                Or email directly: <a href="mailto:info@bendigotyreandauto.com.au" style={{ color:"rgba(214,43,43,.6)",textDecoration:"none" }}>info@bendigotyreandauto.com.au</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"var(--dark2)",padding:"0 52px 28px",borderTop:"1px solid var(--border)" }}>
        <div style={{ height:3,background:"linear-gradient(90deg,transparent,var(--red),var(--red-l),var(--red),transparent)",marginBottom:28 }}/>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <svg width="32" height="32" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill="#1A1A1A" stroke="rgba(214,43,43,.4)" strokeWidth="1.5"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
                const r1=(a*Math.PI)/180, r2=((a+20)*Math.PI)/180;
                const x1=22+Math.cos(r1)*17, y1=22+Math.sin(r1)*17;
                const x3=22+Math.cos(r2)*20, y3=22+Math.sin(r2)*20;
                const x4=22+Math.cos(r1)*20, y4=22+Math.sin(r1)*20;
                return <path key={a} d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${(22+Math.cos(r2)*17).toFixed(1)},${(22+Math.sin(r2)*17).toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} L${x4.toFixed(1)},${y4.toFixed(1)}Z`} fill="rgba(214,43,43,.4)"/>;
              })}
              <circle cx="22" cy="22" r="12" fill="#111" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              {TYRE_SPOKES.map((s,i) => <line key={i} x1={22+s.x1} y1={22+s.y1} x2={22+s.x2} y2={22+s.y2} stroke="rgba(214,43,43,.45)" strokeWidth="2" strokeLinecap="round"/>)}
              <circle cx="22" cy="22" r="3" fill="rgba(214,43,43,.6)"/>
            </svg>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".9rem",color:"rgba(255,255,255,.7)",letterSpacing:"1.5px" }}>BENDIGO TYRE & AUTO</div>
              <div style={{ fontFamily:"'Barlow',sans-serif",fontSize:".6rem",color:"rgba(214,43,43,.45)",letterSpacing:"2px",textTransform:"uppercase" }}>178 Lyttleton Terrace · Bendigo VIC 3550</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            <a href="tel:+61344332400" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>(03) 4433 2400</a>
            <a href="mailto:info@bendigotyreandauto.com.au" style={{ color:"rgba(255,255,255,.3)",fontSize:".78rem",textDecoration:"none",fontFamily:"'Barlow',sans-serif" }}>info@bendigotyreandauto.com.au</a>
          </div>
          <div style={{ color:"rgba(255,255,255,.15)",fontSize:".72rem",fontFamily:"'Barlow',sans-serif" }}>© 2025 Bendigo Tyre & Auto. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
