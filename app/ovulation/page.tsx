'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0f0a06;--card:#1a1008;--card2:#241508;--border:#3d2210;
      --coral:#D85A30;--coral-lt:#F0997B;--coral-dim:#7a2e12;
      --gold:#EF9F27;--gold-lt:#FAC775;--gold-dim:#854F0B;
      --text:#fff8f0;--muted:#a06040;--soft:#fde8d0;
      --glow:rgba(239,159,39,.12);
    }
    body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;min-height:100vh}
    .app{min-height:100vh}

    /* NAV BAR */
    .navbar{position:sticky;top:0;z-index:100;background:rgba(15,10,6,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px}
    .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;background:linear-gradient(135deg,#a78bfa,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links{display:flex;gap:4px;align-items:center;overflow-x:auto;scrollbar-width:none}
    .nav-links::-webkit-scrollbar{display:none}
    .nav-link{padding:6px 10px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;color:#94a3b8;white-space:nowrap;transition:all .2s;font-family:'Space Grotesk',sans-serif}
    .nav-link:hover{background:rgba(239,159,39,.1);color:var(--gold)}

    /* HERO */
    .hero{background:linear-gradient(160deg,#0f0a06 0%,#1a1003 50%,#0f0a06 100%);padding:44px 20px 36px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(239,159,39,.12) 0%,transparent 65%)}
    .hero-icon{font-size:52px;display:block;margin-bottom:14px;position:relative;filter:drop-shadow(0 0 24px rgba(239,159,39,.6));animation:pulse 3s ease-in-out infinite}
    @keyframes pulse{0%,100%{filter:drop-shadow(0 0 24px rgba(239,159,39,.6))}50%{filter:drop-shadow(0 0 40px rgba(239,159,39,.9))}}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,38px);font-weight:800;background:linear-gradient(135deg,var(--gold-lt),var(--coral-lt));-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative;line-height:1.2}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:9px;position:relative;line-height:1.6}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(239,159,39,.1);border:1px solid rgba(239,159,39,.25);color:var(--gold);font-size:16px;padding:3px 11px;border-radius:20px;font-weight:600}

    /* MAIN */
    .main{max-width:620px;margin:0 auto;padding:22px 16px 40px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:14px}
    .card-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px;line-height:1.5}

    /* INPUTS */
    .field{margin-bottom:16px}
    label{display:block;font-size:14px;font-weight:700;color:var(--muted);letter-spacing:.6px;text-transform:uppercase;margin-bottom:7px}
    input[type=date]{width:100%;padding:12px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;transition:border-color .2s;-webkit-text-fill-color:var(--text)}
    input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.6) sepia(1) saturate(3) hue-rotate(10deg);cursor:pointer}
    input[type=date]:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px var(--glow)}
    input[type=range]{width:100%;margin-top:10px;accent-color:var(--gold);cursor:pointer}
    .range-labels{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:4px}
    .cycle-hint{font-size:13px;color:var(--muted);margin-top:5px;line-height:1.5}

    /* BTN */
    .btn{width:100%;padding:14px;border-radius:11px;border:none;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;letter-spacing:.3px;margin-top:6px}
    .btn-calc{background:linear-gradient(135deg,var(--coral-dim),var(--coral));color:#fff;box-shadow:0 4px 20px rgba(216,90,48,.35)}
    .btn-calc:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(216,90,48,.5)}
    .btn-reset{background:var(--card2);color:var(--muted);margin-top:12px;border:1px solid var(--border)}

    /* RESULTS HERO */
    .result-hero{background:linear-gradient(135deg,#1a0e04,#2a1508);border:1px solid var(--border);border-radius:14px;padding:22px;text-align:center;margin-bottom:14px}
    .result-label{font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.7px;margin-bottom:6px;font-weight:600}
    .result-date{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:var(--gold-lt);margin-bottom:4px;line-height:1.1}
    .result-sub{font-size:15px;color:var(--muted)}
    .result-chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px}
    .chip{background:rgba(239,159,39,.1);border:1px solid rgba(239,159,39,.25);color:var(--gold);font-size:13px;padding:5px 12px;border-radius:20px;font-weight:500}
    .chip-coral{background:rgba(216,90,48,.1);border:1px solid rgba(216,90,48,.25);color:var(--coral-lt)}

    /* CALENDAR */
    .cal-wrap{margin-bottom:14px}
    .cal-month{margin-bottom:16px}
    .cal-month-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--soft);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
    .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
    .cal-day-header{font-size:11px;font-weight:700;color:var(--muted);text-align:center;padding:4px 0;text-transform:uppercase;letter-spacing:.5px}
    .cal-day{width:100%;aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;cursor:default;transition:all .2s;border:1px solid transparent;position:relative}
    .cal-day.empty{background:transparent}
    .cal-day.regular{background:var(--card2);color:var(--muted);border-color:var(--border)}
    .cal-day.fertile-low{background:rgba(216,90,48,.15);border-color:rgba(216,90,48,.3);color:var(--coral-lt)}
    .cal-day.fertile-mid{background:rgba(216,90,48,.25);border-color:rgba(216,90,48,.45);color:var(--coral-lt)}
    .cal-day.fertile-high{background:rgba(216,90,48,.35);border-color:rgba(216,90,48,.6);color:#fff}
    .cal-day.peak{background:rgba(239,159,39,.35);border:2px solid var(--gold);color:var(--gold-lt);font-weight:700}
    .cal-day.period{background:rgba(120,50,80,.25);border-color:rgba(180,80,100,.3);color:#f9a8c0}
    .peak-star{position:absolute;top:-4px;right:-2px;font-size:10px}

    /* LEGEND */
    .legend{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px}
    .legend-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
    .legend-dot{width:14px;height:14px;border-radius:4px;flex-shrink:0}

    /* STATS */
    .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
    .stat{background:var(--card2);border:1px solid var(--border);border-radius:11px;padding:14px;text-align:center}
    .stat-v{font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:var(--gold);margin-bottom:3px}
    .stat-l{font-size:13px;color:var(--muted);font-weight:600}

    /* TIPS */
    .tip-row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start}
    .tip-row:last-child{border-bottom:none}
    .tip-icon{font-size:16px;flex-shrink:0;margin-top:1px}
    .tip-text{font-size:14px;color:var(--muted);line-height:1.5}
    .tip-text strong{color:var(--soft)}

    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--muted);line-height:1.6;margin-top:4px}

    /* SEO */
    .seo-wrap{max-width:640px;margin:0 auto;padding:0 16px 48px}
    .seo-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-card h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-card p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-card p:last-child{margin-bottom:0}
    .seo-card strong{color:var(--soft)}
    .seo-step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .seo-num{background:var(--coral);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .seo-txt{font-size:16px;color:var(--muted);line-height:1.7}
    .seo-txt strong{color:var(--text)}
    .seo-faq{border-bottom:1px solid var(--border);padding:16px 0}
    .seo-faq:last-child{border-bottom:none;padding-bottom:0}
    .seo-faq-q{font-size:16px;font-weight:700;color:var(--soft);margin-bottom:8px}
    .seo-faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .seo-faq-a strong{color:var(--text)}
    .seo-links{background:rgba(239,159,39,.08);border:1px solid rgba(239,159,39,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .seo-links h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--gold);margin-bottom:14px}
    .seo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .seo-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .seo-link:hover{border-color:var(--gold)}
    .seo-link-name{font-size:15px;font-weight:600;color:var(--text)}
    .seo-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disc{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.seo-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr 1fr}}
  `}</style>
);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

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

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDayType(date, cycles) {
  for (const c of cycles) {
    if (isSameDay(date, c.peak)) return 'peak';
    for (let i = 0; i < c.fertile.length; i++) {
      if (isSameDay(date, c.fertile[i])) {
        const pos = i / (c.fertile.length - 1);
        if (pos < 0.4) return 'fertile-low';
        if (pos < 0.75) return 'fertile-mid';
        return 'fertile-high';
      }
    }
    if (isSameDay(date, c.periodStart)) return 'period';
  }
  return 'regular';
}

function buildCalendarMonth(year, month, cycles) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

export default function OvulationCalc() {
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLen, setCycleLen] = useState(28);
  const [results, setResults] = useState(null);

  const calculate = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const cycles = [];

    for (let c = 0; c < 3; c++) {
      const cycleStart = addDays(lmp, c * cycleLen);
      const ovulationDay = addDays(cycleStart, cycleLen - 14);
      const fertileStart = addDays(ovulationDay, -5);
      const fertile = [];
      for (let i = 0; i < 5; i++) fertile.push(addDays(fertileStart, i));
      const nextPeriod = addDays(cycleStart, cycleLen);
      cycles.push({ periodStart: cycleStart, peak: ovulationDay, fertile, nextPeriod });
    }

    const now = new Date();
    const currentCycle = cycles[0];
    const daysUntilPeak = Math.round((currentCycle.peak - now) / (1000 * 60 * 60 * 24));
    const daysUntilFertile = Math.round((currentCycle.fertile[0] - now) / (1000 * 60 * 60 * 24));

    setResults({ cycles, lmp, cycleLen, daysUntilPeak, daysUntilFertile });
  };

  const getMonthsToShow = () => {
    if (!results) return [];
    const months = new Set();
    results.cycles.forEach(c => {
      months.add(`${c.periodStart.getFullYear()}-${c.periodStart.getMonth()}`);
      months.add(`${c.nextPeriod.getFullYear()}-${c.nextPeriod.getMonth()}`);
    });
    return Array.from(months).slice(0, 3).map(m => {
      const [y, mo] = m.split('-').map(Number);
      return { year: y, month: mo };
    });
  };

  return (
    <div className="app">
      <S />

      {/* NAV BAR — Ovulation excluded (current page) */}
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
          <a href="/pregnancy" className="nav-link">🤰 Pregnancy Due Date</a>
          <a href="/burnout" className="nav-link">🧠 Stress &amp; Burnout</a>
          <a href="/bmi" className="nav-link"><img src="/bmi-icon.png" style={{width:'16px',height:'16px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
        </div>
      </nav>

      <div className="hero">
        <span className="hero-icon">🌸</span>
        <h1>Ovulation Calculator</h1>
        <p className="hero-sub">Find your fertile window and peak ovulation day — plan with confidence</p>
        <div className="badges">
          <span className="badge">📅 3 Month Forecast</span>
          <span className="badge">🌟 Peak Day Highlighted</span>
          <span className="badge">💛 100% Free</span>
        </div>
      </div>

      <div className="main">

        {!results ? (
          <div className="card">
            <div className="card-title">Calculate Your Fertile Window</div>
            <div className="card-sub">Enter the first day of your last period and your average cycle length</div>

            <div className="field">
              <label>First day of your last period</label>
              <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
            </div>

            <div className="field">
              <label>Average cycle length — {cycleLen} days</label>
              <input type="range" min={21} max={45} value={cycleLen} onChange={e => setCycleLen(+e.target.value)} />
              <div className="range-labels"><span>21 days</span><span>{cycleLen} days</span><span>45 days</span></div>
              <div className="cycle-hint">Most cycles are 28–32 days. Count from the first day of one period to the first day of the next.</div>
            </div>

            <div style={{background:'rgba(239,159,39,.08)',border:'1px solid rgba(239,159,39,.2)',borderRadius:'10px',padding:'12px 14px',marginBottom:'16px',fontSize:'13px',color:'var(--muted)',lineHeight:1.6}}>
              ⚠️ <strong style={{color:'var(--soft)'}}>Not for contraception.</strong> This calculator provides estimates only. Cycles vary month to month. Do not use this as a method of birth control.
            </div>

            <button className="btn btn-calc" onClick={calculate}>🌸 Calculate My Fertile Window</button>
          </div>
        ) : (
          <>
            {/* PEAK DAY HERO */}
            <div className="result-hero">
              <div className="result-label">⭐ Peak Ovulation Day — Cycle 1</div>
              <div className="result-date">{fmtDate(results.cycles[0].peak)}</div>
              <div className="result-sub">Your estimated day of highest fertility</div>
              <div className="result-chips">
                <span className="chip">🌸 Fertile window: {fmtShort(results.cycles[0].fertile[0])} – {fmtShort(results.cycles[0].fertile[4])}</span>
                <span className="chip-coral chip">📅 Next period ~{fmtShort(results.cycles[0].nextPeriod)}</span>
              </div>
            </div>

            {/* STATS */}
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-v">{results.daysUntilPeak > 0 ? results.daysUntilPeak : "–"}</div>
                <div className="stat-l">{results.daysUntilPeak > 0 ? "Days to Peak" : "Peak passed"}</div>
              </div>
              <div className="stat">
                <div className="stat-v">{results.daysUntilFertile > 0 ? results.daysUntilFertile : "–"}</div>
                <div className="stat-l">{results.daysUntilFertile > 0 ? "Days to Fertile Window" : "In fertile window"}</div>
              </div>
            </div>

            {/* LEGEND */}
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot" style={{background:'rgba(216,90,48,.2)',border:'1px solid rgba(216,90,48,.4)'}}></div>
                Fertile window
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{background:'rgba(239,159,39,.35)',border:'2px solid #EF9F27'}}></div>
                Peak ovulation day
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{background:'rgba(120,50,80,.25)',border:'1px solid rgba(180,80,100,.3)'}}></div>
                Period start
              </div>
            </div>

            {/* CALENDARS */}
            <div className="card">
              <div className="card-title">Your 3-Month Forecast</div>
              <div className="card-sub">Fertile days shown in coral — peak day in gold</div>
              <div className="cal-wrap">
                {getMonthsToShow().map(({year, month}) => {
                  const cells = buildCalendarMonth(year, month, results.cycles);
                  return (
                    <div key={`${year}-${month}`} className="cal-month">
                      <div className="cal-month-title">{MONTHS[month]} {year}</div>
                      <div className="cal-grid">
                        {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
                        {cells.map((date, i) => {
                          if (!date) return <div key={`e${i}`} className="cal-day empty"></div>;
                          const type = getDayType(date, results.cycles);
                          return (
                            <div key={i} className={`cal-day ${type}`}>
                              {date.getDate()}
                              {type === 'peak' && <span className="peak-star">⭐</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* UPCOMING CYCLES */}
            <div className="card">
              <div className="card-title">Upcoming Cycle Summary</div>
              <div className="card-sub">Your next 3 predicted cycles</div>
              {results.cycles.map((c, i) => (
                <div key={i} style={{padding:'12px',background:'var(--card2)',border:'1px solid var(--border)',borderRadius:'10px',marginBottom:'8px'}}>
                  <div style={{fontSize:'14px',fontWeight:700,color:'var(--soft)',marginBottom:'6px'}}>Cycle {i+1} — Starting {fmtShort(c.periodStart)}</div>
                  <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
                    <div>
                      <div style={{fontSize:'12px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Fertile Window</div>
                      <div style={{fontSize:'14px',color:'var(--coral-lt)',fontWeight:600}}>{fmtShort(c.fertile[0])} – {fmtShort(c.fertile[4])}</div>
                    </div>
                    <div>
                      <div style={{fontSize:'12px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>⭐ Peak Day</div>
                      <div style={{fontSize:'14px',color:'var(--gold-lt)',fontWeight:700}}>{fmtShort(c.peak)}</div>
                    </div>
                    <div>
                      <div style={{fontSize:'12px',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:'2px'}}>Next Period</div>
                      <div style={{fontSize:'14px',color:'var(--muted)',fontWeight:600}}>{fmtShort(c.nextPeriod)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TIPS */}
            <div className="card">
              <div className="card-title">💡 Tips for Trying to Conceive</div>
              {[
                ["🌟","Focus on the fertile window","You can only conceive during the 6-day fertile window — the 5 days before ovulation and the day of ovulation itself."],
                ["❤️","Have sex every 1–2 days during the fertile window","This maintains healthy sperm levels and maximizes your chances without over-timing."],
                ["🌡️","Track basal body temperature","Your BBT rises slightly after ovulation. Tracking over several months reveals your personal pattern."],
                ["💧","Watch for cervical mucus changes","Around ovulation it becomes clear, stretchy and slippery — like raw egg white. This is your body's signal."],
                ["📅","Track multiple cycles","One month of data is a starting point. Patterns become clearer after 3+ months of tracking."],
                ["🩺","See a doctor if needed","If you have been trying for 12 months (or 6 months if over 35) without success, speak to your doctor."],
              ].map(([icon, title, desc]) => (
                <div key={title} className="tip-row">
                  <span className="tip-icon">{icon}</span>
                  <div className="tip-text"><strong>{title}</strong><br/>{desc}</div>
                </div>
              ))}
            </div>

            <div className="disclaimer">⚕️ <strong>Important:</strong> This calculator provides estimates based on average cycle patterns and is for informational purposes only. Ovulation timing varies from person to person and from cycle to cycle. This tool is not suitable for use as a method of contraception. If you have irregular cycles, PCOS, or other reproductive health conditions, please consult your doctor or a reproductive specialist.</div>
            <button className="btn btn-reset" onClick={() => setResults(null)}>← Recalculate</button>
          </>
        )}
      </div>

      {/* SEO CONTENT — always visible */}
      <div className="seo-wrap">
        <div className="seo-card">
          <h2>What Is an Ovulation Calculator?</h2>
          <p>An ovulation calculator estimates the days in your menstrual cycle when you are most likely to be fertile — giving you a <strong>fertile window</strong> and a predicted <strong>peak ovulation day</strong>. This information is used by people who are trying to conceive to time intercourse during the days when pregnancy is most likely to occur.</p>
          <p>Ovulation typically occurs approximately <strong>14 days before your next expected period</strong>, regardless of your total cycle length. For a 28-day cycle this means ovulation on day 14. For a 32-day cycle it would be around day 18. Because sperm can survive inside the body for up to 5 days, the fertile window extends from 5 days before ovulation through the day of ovulation itself — a total of 6 days.</p>
          <p>The Body HQ Ovulation Calculator uses your last menstrual period date and average cycle length to generate <strong>three months of predictions</strong> — showing your fertile window in coral and your peak ovulation day highlighted in gold on a visual calendar.</p>
        </div>
        <div className="seo-card">
          <h2>How the Ovulation Calculator Works</h2>
          <div className="seo-step"><div className="seo-num">1</div><div className="seo-txt"><strong>Enter the first day of your last period</strong> — this is day 1 of your menstrual cycle and the starting point for all calculations.</div></div>
          <div className="seo-step"><div className="seo-num">2</div><div className="seo-txt"><strong>Set your average cycle length</strong> — use the slider to adjust from 21 to 45 days. Count from the first day of one period to the first day of the next to find your cycle length.</div></div>
          <div className="seo-step"><div className="seo-num">3</div><div className="seo-txt"><strong>View your fertile window</strong> — the calculator shows your 6-day fertile window highlighted in coral on a 3-month calendar view.</div></div>
          <div className="seo-step"><div className="seo-num">4</div><div className="seo-txt"><strong>Find your peak ovulation day</strong> — your estimated day of highest fertility is highlighted in gold with a star marker. This is your best day for conception.</div></div>
          <div className="seo-step"><div className="seo-num">5</div><div className="seo-txt"><strong>Plan ahead with 3 months of predictions</strong> — see upcoming fertile windows and peak days across your next three cycles so you can plan in advance.</div></div>
        </div>
        <div className="seo-card">
          <h2>Frequently Asked Questions</h2>
          <div className="seo-faq">
            <div className="seo-faq-q">When do I ovulate?</div>
            <div className="seo-faq-a">Ovulation typically occurs <strong>14 days before your next period begins</strong> — not 14 days after your last period started. This matters because the second half of the cycle (the luteal phase) is consistently 12–16 days, while the first half varies. So if you have a 35-day cycle, you likely ovulate around day 21, not day 14.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">How long is the fertile window?</div>
            <div className="seo-faq-a">The fertile window is <strong>6 days long</strong> — the 5 days before ovulation and the day of ovulation itself. This is because sperm can survive in the female reproductive tract for up to 5 days, while an egg is only viable for 12–24 hours after release. Your chances of conception are highest in the 2–3 days leading up to and including ovulation day.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">Can I use this calculator to avoid pregnancy?</div>
            <div className="seo-faq-a"><strong>No — this calculator is not suitable for contraception.</strong> Ovulation timing can vary significantly from cycle to cycle due to stress, illness, travel, and other factors. Relying on calendar-based predictions to avoid pregnancy is unreliable and not recommended. Please use medically approved contraception methods.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">What are the signs of ovulation?</div>
            <div className="seo-faq-a">Common signs of ovulation include <strong>changes in cervical mucus</strong> (becoming clear, stretchy and slippery like raw egg white), a slight rise in basal body temperature after ovulation, mild one-sided pelvic pain (mittelschmerz), increased sex drive, and a positive result on an over-the-counter LH surge test. Combining these physical signs with calendar tracking gives a more complete picture.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">What if my cycles are irregular?</div>
            <div className="seo-faq-a">If your cycles are irregular — varying by more than 7 days from month to month — <strong>calendar-based ovulation prediction is less accurate</strong> for you. Irregular cycles can be caused by stress, PCOS, thyroid conditions, or other hormonal factors. LH surge tests, basal body temperature tracking, and consultation with a reproductive specialist will give you more reliable information.</div>
          </div>
          <div className="seo-faq">
            <div className="seo-faq-q">How soon after my period can I get pregnant?</div>
            <div className="seo-faq-a">While pregnancy is most likely during the fertile window around ovulation, <strong>it is technically possible to conceive at any point in the cycle</strong> — especially if you have a short cycle or irregular ovulation. Sperm can survive for up to 5 days, so unprotected sex during a period could theoretically lead to pregnancy if ovulation occurs soon after.</div>
          </div>
        </div>

        <div className="seo-links">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="seo-grid">
            <a href="/pregnancy" className="seo-link">
              <div className="seo-link-name">🤰 Pregnancy Due Date Calculator</div>
              <div className="seo-link-desc">Calculate your due date and track trimester milestones</div>
            </a>
            <a href="/nutrients" className="seo-link">
              <div className="seo-link-name">💊 Vitamin &amp; Mineral Calculator</div>
              <div className="seo-link-desc">See your personalized nutrient targets including folate for conception</div>
            </a>
            <a href="/sleep" className="seo-link">
              <div className="seo-link-name">🌙 Sleep Cycle Calculator</div>
              <div className="seo-link-desc">Quality sleep supports hormonal balance and fertility</div>
            </a>
            <a href="/burnout" className="seo-link">
              <div className="seo-link-name">🧠 Stress &amp; Burnout Score</div>
              <div className="seo-link-desc">Stress can disrupt ovulation — assess your stress levels now</div>
            </a>
          </div>
        </div>

        <div className="seo-disc">⚕️ <strong>Medical Disclaimer:</strong> This ovulation calculator provides estimates based on average menstrual cycle patterns and is for general educational purposes only. It is not a substitute for professional medical advice and must not be used as a method of contraception. Ovulation timing varies between individuals and from cycle to cycle. If you have concerns about your fertility or menstrual cycle, please consult a qualified healthcare provider or reproductive specialist.</div>
      </div>
    </div>
  );
}
