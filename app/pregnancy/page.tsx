'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0f0809;--card:#180d0f;--card2:#201318;--border:#2d1a1e;
      --rose:#fb7185;--rose-lt:#fda4af;--rose-dim:#9f1239;
      --gold:#f59e0b;--gold-lt:#fcd34d;--mauve:#c084fc;
      --text:#fff1f2;--muted:#9f6773;--soft:#fecdd3;
      --glow:rgba(251,113,133,.12);
    }
    body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;min-height:100vh}
    .app{min-height:100vh}

    /* NAV BAR */
    .navbar{position:sticky;top:0;z-index:100;background:rgba(15,8,9,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px}
    .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;background:linear-gradient(135deg,#a78bfa,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links{display:flex;gap:4px;align-items:center;overflow-x:auto;scrollbar-width:none}
    .nav-links::-webkit-scrollbar{display:none}
    .nav-link{padding:6px 10px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;color:#94a3b8;white-space:nowrap;transition:all .2s;font-family:'Space Grotesk',sans-serif}
    .nav-link:hover{background:rgba(251,113,133,.1);color:var(--rose)}

    /* HERO */
    .hero{background:linear-gradient(160deg,#0f0809 0%,#1a0d10 50%,#0f0809 100%);padding:44px 20px 36px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(251,113,133,.1) 0%,transparent 65%)}
    .floating{position:absolute;font-size:16px;opacity:.15;animation:float 6s ease-in-out infinite}
    .f1{top:15%;left:10%;animation-delay:0s}
    .f2{top:25%;right:12%;animation-delay:1s}
    .f3{top:60%;left:5%;animation-delay:2s}
    .f4{top:50%;right:8%;animation-delay:1.5s}
    @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(10deg)}}
    .hero-icon{font-size:56px;display:block;margin-bottom:14px;position:relative;filter:drop-shadow(0 0 28px rgba(251,113,133,.5))}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(24px,4vw,40px);font-weight:800;color:var(--text);position:relative;line-height:1.2}
    .hero h1 span{background:linear-gradient(135deg,var(--rose-lt),var(--gold-lt));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:9px;position:relative}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(251,113,133,.1);border:1px solid rgba(251,113,133,.2);color:var(--rose);font-size:16px;padding:3px 11px;border-radius:20px;font-weight:600}

    /* MAIN */
    .main{max-width:620px;margin:0 auto;padding:22px 16px 40px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:14px}
    .card-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px;line-height:1.5}

    /* METHOD TABS */
    .tabs{display:flex;gap:4px;background:var(--bg);border-radius:10px;padding:3px;margin-bottom:18px}
    .tab{flex:1;padding:9px 6px;border:none;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--soft)}
    .tab.active{background:var(--rose-dim);color:#fff;box-shadow:0 2px 10px rgba(251,113,133,.3)}

    /* INPUTS */
    .field{margin-bottom:16px}
    label{display:block;font-size:16px;font-weight:700;color:var(--muted);letter-spacing:.6px;text-transform:uppercase;margin-bottom:7px}
    input[type=date],input[type=number]{width:100%;padding:12px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;transition:border-color .2s;-webkit-text-fill-color:var(--text)}
    input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.6) sepia(1) saturate(5) hue-rotate(290deg);cursor:pointer}
    input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
    input[type=number]{-moz-appearance:textfield}
    input[type=range]{width:100%;margin-top:10px;accent-color:var(--rose);cursor:pointer}
    input:focus{outline:none;border-color:var(--rose);box-shadow:0 0 0 3px var(--glow)}
    .cycle-hint{font-size:14px;color:var(--muted);margin-top:5px}
    .range-labels{display:flex;justify-content:space-between;font-size:16px;color:var(--muted);margin-top:4px}

    /* BTN */
    .btn{width:100%;padding:14px;border-radius:11px;border:none;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;letter-spacing:.3px;margin-top:6px}
    .btn-calc{background:linear-gradient(135deg,var(--rose-dim),var(--rose));color:#fff;box-shadow:0 4px 20px rgba(251,113,133,.3)}
    .btn-calc:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(251,113,133,.45)}
    .btn-reset{background:var(--card2);color:var(--muted);margin-top:12px}

    /* DUE DATE HERO */
    .due-hero{background:linear-gradient(135deg,var(--rose-dim),#6d1528);border-radius:14px;padding:26px;text-align:center;margin-bottom:14px;position:relative;overflow:hidden}
    .due-hero::before{content:'💕';position:absolute;font-size:80px;opacity:.08;top:-10px;right:-10px}
    .due-label{font-size:14px;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.7px;margin-bottom:6px}
    .due-date{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;color:#fff;margin-bottom:4px;line-height:1.1}
    .due-sub{font-size:16px;color:rgba(255,255,255,.7)}
    .due-chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px}
    .due-chip{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:14px;padding:5px 12px;border-radius:20px;font-weight:500}

    /* STATS */
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
    .stat{background:var(--card2);border:1px solid var(--border);border-radius:11px;padding:14px;text-align:center}
    .stat-v{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:var(--rose);margin-bottom:3px}
    .stat-l{font-size:16px;color:var(--muted);font-weight:600}

    /* TRIMESTER TIMELINE */
    .trim-list{display:flex;flex-direction:column;gap:10px}
    .trim-item{display:flex;gap:14px;align-items:flex-start;padding:14px;background:var(--card2);border:1px solid var(--border);border-radius:11px;position:relative;overflow:hidden}
    .trim-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px}
    .trim-item.t1::before{background:var(--rose)}
    .trim-item.t2::before{background:var(--gold)}
    .trim-item.t3::before{background:var(--mauve)}
    .trim-item.current{border-color:rgba(251,113,133,.4);box-shadow:0 0 0 1px rgba(251,113,133,.15)}
    .trim-num{font-family:'Syne',sans-serif;font-size:28px;font-weight:700;flex-shrink:0;line-height:1}
    .trim-item.t1 .trim-num{color:var(--rose)}
    .trim-item.t2 .trim-num{color:var(--gold)}
    .trim-item.t3 .trim-num{color:var(--mauve)}
    .trim-info{flex:1}
    .trim-name{font-size:16px;font-weight:700;color:var(--soft);margin-bottom:2px}
    .trim-weeks{font-size:14px;color:var(--muted);margin-bottom:4px}
    .trim-desc{font-size:14px;color:var(--muted);line-height:1.5}
    .trim-badge{font-size:15px;font-weight:700;padding:2px 8px;border-radius:10px;background:rgba(251,113,133,.15);color:var(--rose);display:inline-block;margin-top:4px}

    /* MILESTONES */
    .milestone-list{display:flex;flex-direction:column;gap:6px}
    .milestone{display:flex;justify-content:space-between;align-items:center;padding:10px 13px;background:var(--card2);border:1px solid var(--border);border-radius:9px}
    .milestone-label{font-size:15px;font-weight:600;color:var(--soft)}
    .milestone-sub{font-size:16px;color:var(--muted);margin-top:1px}
    .milestone-date{font-size:15px;font-weight:700;color:var(--rose-lt);text-align:right}
    .milestone-week{font-size:16px;color:var(--muted);text-align:right;margin-top:1px}
    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;font-size:14px;color:var(--muted);line-height:1.6;margin-top:4px}
    @media(max-width:480px){.stats-grid{grid-template-columns:1fr 1fr}}

    .seo-wrap{max-width:640px;margin:0 auto;padding:0 16px 48px}
    .seo-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-card h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-card p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-card p:last-child{margin-bottom:0}
    .seo-card strong{color:var(--text)}
    .seo-step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .seo-num{background:#e8628a;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .seo-txt{font-size:16px;color:var(--muted);line-height:1.7}
    .seo-txt strong{color:var(--text)}
    .seo-faq{border-bottom:1px solid var(--border);padding:16px 0}
    .seo-faq:last-child{border-bottom:none;padding-bottom:0}
    .seo-faq-q{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
    .seo-faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .seo-faq-a strong{color:var(--text)}
    .seo-links{background:rgba(232,98,138,.08);border:1px solid rgba(232,98,138,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .seo-links h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#e8628a;margin-bottom:14px}
    .seo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .seo-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .seo-link:hover{border-color:#e8628a}
    .seo-link-name{font-size:15px;font-weight:600;color:var(--text)}
    .seo-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disc{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.seo-grid{grid-template-columns:1fr}}
  `}</style>
);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmtDate(d) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function fmtShort(d) {
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}`;
}

export default function PregnancyCalc() {
  const [method, setMethod] = useState("lmp");
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLen, setCycleLen] = useState(28);
  const [conceptionDate, setConceptionDate] = useState("");
  const [ultrasoundDate, setUltrasoundDate] = useState("");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState(8);
  const [results, setResults] = useState(null);

  const calculate = () => {
    let conception, dueDate, lmp;
    if (method === "lmp" && lmpDate) {
      lmp = new Date(lmpDate);
      const offset = cycleLen - 28;
      conception = addDays(lmp, 14 + offset);
      dueDate = addDays(lmp, 280 + offset);
    } else if (method === "conception" && conceptionDate) {
      conception = new Date(conceptionDate);
      lmp = addDays(conception, -14);
      dueDate = addDays(conception, 266);
    } else if (method === "ultrasound" && ultrasoundDate) {
      const scanDate = new Date(ultrasoundDate);
      lmp = addDays(scanDate, -(ultrasoundWeeks * 7));
      conception = addDays(lmp, 14);
      dueDate = addDays(lmp, 280);
    } else return;

    const now = new Date();
    const daysPregnant = Math.floor((now - lmp) / (24 * 60 * 60 * 1000));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const daysExtra = daysPregnant % 7;
    const daysUntilDue = Math.floor((dueDate - now) / (24 * 60 * 60 * 1000));
    const pctComplete = Math.min(100, Math.round((daysPregnant / 280) * 100));
    const trimester = weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3;

    const milestones = [
      { label: "💓 Heartbeat detectable", sub: "Exciting first milestone", week: 6, days: 42 },
      { label: "🧬 NIPT / genetic screening", sub: "Optional blood test", week: 10, days: 70 },
      { label: "🔬 First trimester screen", sub: "Nuchal translucency scan", week: 12, days: 84 },
      { label: "👁️ Baby's features visible", sub: "Anatomy scan window", week: 20, days: 140 },
      { label: "🩺 Glucose screening", sub: "Gestational diabetes test", week: 24, days: 168 },
      { label: "🤱 Baby considered viable", sub: "Major milestone", week: 28, days: 196 },
      { label: "👶 Full term begins", sub: "Baby ready any time", week: 37, days: 259 },
      { label: "🎉 Due date!", sub: "Your estimated arrival", week: 40, days: 280 },
    ].map(m => ({ ...m, date: addDays(lmp, m.days) }));

    setResults({ dueDate, conception, lmp, weeksPregnant, daysExtra, daysUntilDue, pctComplete, trimester, milestones, daysPregnant });
  };

  return (
    <div className="app">
      <S />

      {/* NAV BAR — Pregnancy Due Date excluded (current page) */}
      <nav className="navbar">
        <a href="/" className="nav-logo">
          <div style={{width:'32px',height:'20px'}}>
            <svg viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#38bdf8"/></linearGradient></defs>
              <polyline points="0,10 8,10 10,4 12,16 14,8 16,12 18,10 32,10" stroke="url(#pg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          The Body HQ
        </a>
        <div className="nav-links">
          <a href="/sleep" className="nav-link">🌙 Sleep Cycle</a>
          <a href="/nutrients" className="nav-link">💊 Vitamin &amp; Mineral</a>
          <a href="/fasting" className="nav-link">⏰ Intermittent Fasting</a>
          <a href="/burnout" className="nav-link">🧠 Stress &amp; Burnout</a>
          <a href="/bmi" className="nav-link"><img src="/bmi-icon.png" style={{width:'16px',height:'16px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
        </div>
      </nav>

      <div className="hero">
        <div className="floating f1">🌸</div>
        <div className="floating f2">✨</div>
        <div className="floating f3">💕</div>
        <div className="floating f4">🌟</div>
        <span className="hero-icon">🤰</span>
        <h1>Pregnancy <span>Due Date</span> Calculator</h1>
        <p className="hero-sub">Find your due date and track your pregnancy milestones week by week</p>
        <div className="badges">
          <span className="badge">📅 3 Methods</span>
          <span className="badge">🗓️ Trimester Guide</span>
          <span className="badge">💕 Key Milestones</span>
        </div>
      </div>

      <div className="main">
        {!results ? (
          <div className="card">
            <div className="card-title">How would you like to calculate?</div>
            <div className="card-sub">Choose the method that matches the information you have</div>
            <div className="tabs">
              <button className={`tab${method==="lmp"?" active":""}`} onClick={() => setMethod("lmp")}>📅 Last Period</button>
              <button className={`tab${method==="conception"?" active":""}`} onClick={() => setMethod("conception")}>💕 Conception Date</button>
              <button className={`tab${method==="ultrasound"?" active":""}`} onClick={() => setMethod("ultrasound")}>🔬 Ultrasound</button>
            </div>
            {method === "lmp" && (<>
              <div className="field">
                <label>First day of your last period</label>
                <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
              </div>
              <div className="field">
                <label>Average cycle length — {cycleLen} days</label>
                <input type="range" min={21} max={45} value={cycleLen} onChange={e => setCycleLen(+e.target.value)} />
                <div className="range-labels"><span>21 days</span><span>{cycleLen} days</span><span>45 days</span></div>
                <div className="cycle-hint">Average is 28 days — drag to adjust if your cycle is longer or shorter</div>
              </div>
            </>)}
            {method === "conception" && (
              <div className="field">
                <label>Estimated conception date</label>
                <input type="date" value={conceptionDate} onChange={e => setConceptionDate(e.target.value)} />
              </div>
            )}
            {method === "ultrasound" && (<>
              <div className="field">
                <label>Date of ultrasound</label>
                <input type="date" value={ultrasoundDate} onChange={e => setUltrasoundDate(e.target.value)} />
              </div>
              <div className="field">
                <label>Weeks pregnant at that scan</label>
                <input type="number" value={ultrasoundWeeks} min={4} max={40} onChange={e => setUltrasoundWeeks(+e.target.value)} />
              </div>
            </>)}
            <button className="btn btn-calc" onClick={calculate}>💕 Calculate My Due Date</button>
          </div>
        ) : (
          <>
            <div className="due-hero">
              <div className="due-label">Your Estimated Due Date</div>
              <div className="due-date">{fmtDate(results.dueDate)}</div>
              <div className="due-sub">Based on a 40-week pregnancy</div>
              <div className="due-chips">
                <span className="due-chip">📅 {results.daysUntilDue > 0 ? `${results.daysUntilDue} days to go` : "Past due date"}</span>
                <span className="due-chip">🤰 Trimester {results.trimester}</span>
                <span className="due-chip">✨ {results.pctComplete}% complete</span>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat"><div className="stat-v">{results.weeksPregnant}</div><div className="stat-l">Weeks Pregnant</div></div>
              <div className="stat"><div className="stat-v">{results.daysExtra}</div><div className="stat-l">Extra Days</div></div>
              <div className="stat"><div className="stat-v">{results.daysUntilDue > 0 ? results.daysUntilDue : 0}</div><div className="stat-l">Days Until Due</div></div>
            </div>
            <div className="card">
              <div className="card-title">Trimester Guide</div>
              <div className="trim-list">
                {[
                  { t:"t1", n:"1st", weeks:"Weeks 1–12", desc:"Your baby grows from a cluster of cells to a fully formed fetus. Morning sickness and fatigue are common. The heart begins beating at week 6.", key:"t1" },
                  { t:"t2", n:"2nd", weeks:"Weeks 13–26", desc:"Often called the golden trimester — energy returns and baby's movements begin. The anatomy scan at week 20 reveals more detail and sometimes the sex.", key:"t2" },
                  { t:"t3", n:"3rd", weeks:"Weeks 27–40", desc:"Baby gains weight rapidly and prepares for birth. You may feel Braxton Hicks contractions. Baby is considered full term at 37 weeks.", key:"t3" },
                ].map(tr => (
                  <div key={tr.key} className={`trim-item ${tr.t}${results.trimester===parseInt(tr.n[0])?" current":""}`}>
                    <div className="trim-num">{tr.n}</div>
                    <div className="trim-info">
                      <div className="trim-name">Trimester {tr.n[0]}</div>
                      <div className="trim-weeks">{tr.weeks}</div>
                      <div className="trim-desc">{tr.desc}</div>
                      {results.trimester===parseInt(tr.n[0]) && <div className="trim-badge">You are here ✨</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-title">Key Milestones</div>
              <div className="card-sub">Important dates to look forward to</div>
              <div className="milestone-list">
                {results.milestones.map(m => (
                  <div key={m.label} className="milestone">
                    <div>
                      <div className="milestone-label">{m.label}</div>
                      <div className="milestone-sub">{m.sub}</div>
                    </div>
                    <div>
                      <div className="milestone-date">{fmtShort(m.date)}</div>
                      <div className="milestone-week">Week {m.week}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="disclaimer">⚕️ This calculator provides an estimate only. Only 5% of babies arrive exactly on their due date — most are born within 2 weeks either side. Always confirm your due date with your healthcare provider via ultrasound. This tool is for informational purposes only and is not a substitute for medical advice.</div>
            <button className="btn btn-reset" onClick={() => setResults(null)}>← Recalculate</button>
          </>
        )}
      </div>

      {/* SEO CONTENT — always visible */}
      <div className="seo-wrap">
        <div className="seo-card">
          <h2>What Is a Pregnancy Due Date Calculator?</h2>
          <p>A pregnancy due date calculator estimates the date your baby is expected to arrive — known as your <strong>estimated due date (EDD)</strong>. It also maps out your pregnancy journey by trimester, shows key milestone dates, and identifies important scan and appointment windows throughout your pregnancy.</p>
          <p>Most pregnancies last approximately <strong>40 weeks (280 days)</strong> from the first day of the last menstrual period, or 38 weeks from the date of conception. However only about 5 percent of babies actually arrive on their exact due date. The majority of full-term births occur anywhere from 37 to 42 weeks — so your due date is best understood as the center of a 5-week window rather than a precise deadline.</p>
          <p>The Body HQ Pregnancy Due Date Calculator offers <strong>three calculation methods</strong> — Last Menstrual Period (LMP), conception date, and ultrasound date — to give you the most accurate estimate possible based on what you know. It also shows your complete trimester timeline and flags important pregnancy milestones week by week.</p>
        </div>
        <div className="seo-card">
          <h2>How the Pregnancy Due Date Calculator Works</h2>
          <div className="seo-step"><div className="seo-num">1</div><div className="seo-txt"><strong>Choose your calculation method</strong> — select Last Menstrual Period (LMP), Conception Date, or Ultrasound Date depending on what information you have available.</div></div>
          <div className="seo-step"><div className="seo-num">2</div><div className="seo-txt"><strong>Enter your date</strong> — input the relevant date for your chosen method. For LMP, enter the first day of your last period. For conception date, enter when you believe conception occurred. For ultrasound, enter the scan date and how many weeks pregnant you were.</div></div>
          <div className="seo-step"><div className="seo-num">3</div><div className="seo-txt"><strong>Adjust your cycle length</strong> — if your menstrual cycle is not the standard 28 days, use the cycle length slider to get a more accurate due date calculation.</div></div>
          <div className="seo-step"><div className="seo-num">4</div><div className="seo-txt"><strong>View your results</strong> — see your estimated due date, current gestational age, trimester timeline, and key milestone dates all displayed together.</div></div>
          <div className="seo-step"><div className="seo-num">5</div><div className="seo-txt"><strong>Note important appointments</strong> — the calculator highlights key windows for your dating scan, anomaly scan, glucose tolerance test, and other prenatal appointments.</div></div>
        </div>
        <div className="seo-card">
          <h2>Frequently Asked Questions</h2>
          <div className="seo-faq">
            <div className="seo-faq-q">How is a due date calculated?</div>
            <div className="seo-faq-a">The most common method is <strong>Naegele's Rule</strong> — add 280 days (40 weeks) to the first day of your last menstrual period. This assumes a standard 28-day cycle with ovulation on day 14. If your cycle is longer or shorter than 28 days, adjustments are made accordingly. Your doctor or midwife may also use ultrasound measurements in early pregnancy to confirm or adjust your estimated due date.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">When does each trimester start and end?</div>
            <div className="seo-faq-a">Pregnancy is divided into three trimesters: <strong>First trimester: Weeks 1 to 12</strong> — the period of most rapid development when major organs form. <strong>Second trimester: Weeks 13 to 26</strong> — often the most comfortable period when energy returns and the baby bump becomes visible. <strong>Third trimester: Weeks 27 to 40+</strong> — the final stage of growth leading up to birth.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">What is the difference between gestational age and fetal age?</div>
            <div className="seo-faq-a"><strong>Gestational age</strong> is counted from the first day of your last menstrual period and is the standard used by doctors and midwives. <strong>Fetal age</strong> (or embryonic age) is counted from the date of conception and is typically about 2 weeks less than gestational age. When your doctor says you are 10 weeks pregnant, they mean 10 weeks gestational age — your baby has actually been developing for approximately 8 weeks.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">How accurate is a due date calculator?</div>
            <div className="seo-faq-a">Due date calculators provide a <strong>reliable estimate but not a guaranteed date</strong>. Only about 5 percent of babies are born on their exact due date. Most full-term babies arrive within 2 weeks before or after the estimated due date. Early ultrasound scans (before 12 weeks) are the most accurate way to confirm gestational age and adjust the due date estimate if needed.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">What nutrients are most important during pregnancy?</div>
            <div className="seo-faq-a">The most critical nutrients during pregnancy include <strong>folate (400–600 mcg daily, ideally started before conception)</strong> to prevent neural tube defects, iron (27 mg daily) to support increased blood volume, iodine for fetal brain development, calcium and Vitamin D for bone development, and Omega-3 DHA for brain and eye development. Use our Vitamin &amp; Mineral Calculator to see your complete personalized pregnancy nutrient targets.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">When should I take a pregnancy test?</div>
            <div className="seo-faq-a">Most home pregnancy tests are accurate from <strong>the first day of a missed period</strong> — typically around 4 weeks gestational age. Some early detection tests can give accurate results a few days before a missed period. Testing too early may give a false negative as hCG levels may not yet be high enough to detect. For the most reliable result, test on the first day of your missed period using first morning urine.</div>
          </div>
        </div>

        <div className="seo-links">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="seo-grid">
            <a href="/sleep" className="seo-link">
              <div className="seo-link-name">🌙 Sleep Cycle Calculator</div>
              <div className="seo-link-desc">Optimize your sleep schedule during pregnancy</div>
            </a>
            <a href="/burnout" className="seo-link">
              <div className="seo-link-name">🧠 Stress &amp; Burnout Score</div>
              <div className="seo-link-desc">Assess your stress levels with a 12-question assessment</div>
            </a>
            <a href="/nutrients" className="seo-link">
              <div className="seo-link-name">💊 Vitamin &amp; Mineral Calculator</div>
              <div className="seo-link-desc">See your personalized pregnancy nutrient targets including folate and iron</div>
            </a>
            <a href="/bmi" className="seo-link">
              <div className="seo-link-name"><img src="/bmi-icon.png" style={{width:'18px',height:'18px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</div>
              <div className="seo-link-desc">Calculate your BMI, Ponderal Index, and ethnicity-adjusted results</div>
            </a>
          </div>
        </div>

        <div className="seo-disc">⚕️ <strong>Medical Disclaimer:</strong> This pregnancy due date calculator provides an estimate based on standard obstetric calculations and is for general educational purposes only. It is not a substitute for professional prenatal care. Due dates are estimates — only about 5% of babies arrive on their exact due date. Always consult your obstetrician, midwife, or healthcare provider for personalized pregnancy guidance and to confirm your due date via ultrasound.</div>
      </div>
    </div>
  );
}
