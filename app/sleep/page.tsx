'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#09090f;--card:#13131f;--card2:#1a1a2e;--purple:#7c3aed;--purp-lt:#a78bfa;--blue:#3b82f6;--cyan:#06b6d4;--green:#10b981;--yellow:#f59e0b;--red:#ef4444;--text:#f1f5f9;--muted:#94a3b8;--border:#1e293b}
    body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;min-height:100vh}
    .app{min-height:100vh;display:flex;flex-direction:column}

    /* NAV BAR */
    .navbar{background:var(--card);border-bottom:1px solid var(--border);padding:0 20px;height:52px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
    .nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none}
    .nav-logo-icon{font-size:20px}
    .nav-logo-text{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;background:linear-gradient(135deg,var(--purp-lt),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none}
    .nav-links::-webkit-scrollbar{display:none}
    .nav-link{display:flex;align-items:center;gap:5px;padding:6px 10px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;color:var(--muted);white-space:nowrap;transition:all .2s;font-family:'Space Grotesk',sans-serif}
    .nav-link:hover{background:rgba(124,58,237,.15);color:var(--purp-lt)}

    /* stars bg */
    .hero{background:var(--card);padding:40px 20px 32px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
    .stars{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(124,58,237,.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(59,130,246,.1) 0%,transparent 50%)}
    .moon{font-size:48px;display:block;margin-bottom:12px;filter:drop-shadow(0 0 20px rgba(167,139,250,.5));position:relative}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(24px,5vw,40px);font-weight:800;background:linear-gradient(135deg,var(--purp-lt),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:8px;position:relative}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);color:var(--purp-lt);font-size:16px;padding:3px 10px;border-radius:20px;font-weight:500}
    .main{flex:1;max-width:640px;margin:0 auto;width:100%;padding:24px 16px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:16px}
    .card-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px}
    .tabs{display:flex;gap:4px;background:var(--bg);border-radius:10px;padding:4px;margin-bottom:20px}
    .tab{flex:1;padding:9px;border:none;border-radius:7px;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--muted)}
    .tab.active{background:var(--purple);color:#fff;box-shadow:0 2px 10px rgba(124,58,237,.4)}
    .field{margin-bottom:16px}
    label{display:block;font-size:14px;font-weight:600;color:var(--muted);letter-spacing:0.6px;text-transform:uppercase;margin-bottom:7px}
    input[type=time]{width:100%;padding:12px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;transition:border-color .2s;cursor:pointer}
    input[type=time]:focus{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px rgba(124,58,237,.2)}
    .age-pills{display:flex;gap:6px;flex-wrap:wrap}
    .ap{padding:7px 14px;border-radius:20px;border:1.5px solid var(--border);font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;background:transparent;color:var(--muted);font-family:'Space Grotesk',sans-serif}
    .ap:hover{border-color:var(--purple);color:var(--purp-lt)}
    .ap.sel{background:var(--purple);border-color:var(--purple);color:#fff}
    .btn{width:100%;padding:14px;border-radius:10px;border:none;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;margin-top:8px;letter-spacing:0.3px}
    .btn-calc{background:linear-gradient(135deg,var(--purple),var(--blue));color:#fff;box-shadow:0 4px 20px rgba(124,58,237,.4)}
    .btn-calc:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(124,58,237,.5)}
    .btn-reset{background:var(--card2);color:var(--muted);margin-top:12px}
    /* Results */
    .results-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;background:linear-gradient(135deg,var(--purp-lt),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
    .results-sub{font-size:15px;color:var(--muted);margin-bottom:20px}
    .cycle-grid{display:flex;flex-direction:column;gap:10px}
    .cycle-item{display:flex;align-items:center;gap:14px;background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px 16px;cursor:default;transition:all .2s;position:relative;overflow:hidden}
    .cycle-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:2px 0 0 2px}
    .cycle-item.best::before{background:linear-gradient(var(--green),var(--cyan))}
    .cycle-item.good::before{background:linear-gradient(var(--blue),var(--purple))}
    .cycle-item.ok::before{background:linear-gradient(var(--yellow),var(--red))}
    .cycle-item:hover{border-color:rgba(124,58,237,.4);transform:translateX(3px)}
    .cycle-icon{font-size:24px;flex-shrink:0}
    .cycle-time{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text)}
    .cycle-detail{flex:1}
    .cycle-label{font-size:14px;color:var(--muted);font-weight:500}
    .cycle-quality{font-size:14px;font-weight:700;padding:3px 8px;border-radius:8px;margin-top:3px;display:inline-block}
    .q-best{background:rgba(16,185,129,.15);color:var(--green)}
    .q-good{background:rgba(59,130,246,.15);color:var(--blue)}
    .q-ok{background:rgba(245,158,11,.15);color:var(--yellow)}
    .rec-box{background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.25);border-radius:12px;padding:14px 16px;margin-bottom:16px}
    .rec-title{font-size:15px;font-weight:700;color:var(--purp-lt);margin-bottom:6px}
    .rec-text{font-size:15px;color:var(--muted);line-height:1.6}
    .stages-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px}
    .stage-card{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px}
    .stage-icon{font-size:18px;margin-bottom:4px}
    .stage-name{font-size:14px;font-weight:700;color:var(--text);margin-bottom:3px}
    .stage-desc{font-size:16px;color:var(--muted);line-height:1.4}
    .tip-row{display:flex;align-items:flex-start;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)}
    .tip-row:last-child{border-bottom:none}
    .tip-icon{font-size:16px;flex-shrink:0;margin-top:1px}
    .tip-text{font-size:15px;color:var(--muted);line-height:1.5}
    .tip-text strong{color:var(--text)}
    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;font-size:14px;color:var(--muted);line-height:1.6;margin-top:16px}
    @media(max-width:400px){.stages-grid{grid-template-columns:1fr}}

    /* SEO CONTENT STYLES */
    .seo-section{max-width:640px;margin:0 auto;padding:0 16px 48px}
    .seo-intro{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-intro h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-intro p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-intro p:last-child{margin-bottom:0}
    .seo-intro strong{color:var(--text)}
    .how-it-works{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .how-it-works h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:16px}
    .step-item{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .step-num{background:var(--purple);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .step-text{font-size:16px;color:var(--muted);line-height:1.7}
    .step-text strong{color:var(--text)}
    .faq-section{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .faq-section h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:16px}
    .faq-item{border-bottom:1px solid var(--border);padding:16px 0}
    .faq-item:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
    .faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .faq-a strong{color:var(--text)}
    .internal-links{background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .internal-links h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--purp-lt);margin-bottom:14px}
    .tool-links{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .tool-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .tool-link:hover{border-color:var(--purple);background:var(--card2)}
    .tool-link-name{font-size:15px;font-weight:600;color:var(--text)}
    .tool-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disclaimer{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.tool-links{grid-template-columns:1fr}}
  `}</style>
);

const SLEEP_RECS = {
  infant:   { min: 12, max: 16, label: "Infant (0–1 yr)" },
  toddler:  { min: 11, max: 14, label: "Toddler (1–2 yrs)" },
  preschool:{ min: 10, max: 13, label: "Preschool (3–5 yrs)" },
  school:   { min:  9, max: 12, label: "School Age (6–12)" },
  teen:     { min:  8, max: 10, label: "Teen (13–18)" },
  adult:    { min:  7, max:  9, label: "Adult (18–64)" },
  senior:   { min:  7, max:  8, label: "Senior (65+)" },
};

const SLEEP_ONSET = 14; // avg minutes to fall asleep

function addMinutes(timeStr, mins) {
  const [h, m] = timeStr.split(":").map(Number);
  const total = ((h * 60 + m + mins) % 1440 + 1440) % 1440;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2,"0")}:${String(nm).padStart(2,"0")}`;
}

function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,"0")} ${ampm}`;
}

function getDuration(from, to) {
  const [fh,fm] = from.split(":").map(Number);
  const [th,tm] = to.split(":").map(Number);
  let mins = (th*60+tm) - (fh*60+fm);
  if (mins < 0) mins += 24*60;
  const h = Math.floor(mins/60), m = mins%60;
  return `${h}h ${m>0?m+"m":""}`;
}

function cycleQuality(cycles, ageGroup) {
  const rec = SLEEP_RECS[ageGroup];
  const hrs = (cycles * 90) / 60;
  if (hrs >= rec.min && hrs <= rec.max) return "best";
  if (hrs >= rec.min - 0.5 && hrs <= rec.max + 1) return "good";
  return "ok";
}

const STAGES = [
  { icon:"😴", name:"Stage 1 — Light Sleep", desc:"Transition phase (5 min). Heart rate slows, muscles relax. Easy to wake." },
  { icon:"💤", name:"Stage 2 — Core Sleep", desc:"Body temp drops, heart slows (20–30 min). Memory consolidation begins." },
  { icon:"🧠", name:"Stage 3 — Deep Sleep", desc:"Slow-wave sleep (20–40 min). Physical repair, immune boost, growth hormone." },
  { icon:"⚡", name:"REM Sleep", desc:"Brain is active, vivid dreams (10–60 min). Emotional processing, creativity, learning." },
];

export default function SleepCalc() {
  const [mode, setMode] = useState("wake"); // wake or bed
  const [time, setTime] = useState("07:00");
  const [age, setAge] = useState("adult");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const cycles = [3, 4, 5, 6];
    let times;
    if (mode === "wake") {
      times = cycles.map(c => {
        const sleepMins = c * 90 + SLEEP_ONSET;
        const bedtime = addMinutes(time, -sleepMins);
        return { cycles: c, bedtime, waketime: time, hrs: (c * 90 / 60).toFixed(1) };
      });
    } else {
      times = cycles.map(c => {
        const sleepMins = c * 90 + SLEEP_ONSET;
        const wake = addMinutes(time, sleepMins);
        return { cycles: c, bedtime: time, waketime: wake, hrs: (c * 90 / 60).toFixed(1) };
      });
    }
    setResults(times.reverse());
  };

  const rec = SLEEP_RECS[age];
  const ICONS = { 6:"🌙", 5:"😊", 4:"😐", 3:"😴" };

  return (
    <div className="app">
      <S />

      {/* NAV BAR — Sleep Cycle excluded (current page) */}
      <nav className="navbar">
        <a href="/" className="nav-logo">
          <span className="nav-logo-icon">⚡</span>
          <span className="nav-logo-text">The Body HQ</span>
        </a>
        <div className="nav-links">
          <a href="/nutrients" className="nav-link">💊 Vitamin & Mineral</a>
          <a href="/fasting" className="nav-link">⏰ Intermittent Fasting</a>
          <a href="/pregnancy" className="nav-link">🤰 Pregnancy Due Date</a>
          <a href="/burnout" className="nav-link">🧠 Stress &amp; Burnout</a>
          <a href="/bmi" className="nav-link"><img src="/bmi-icon.png" style={{width:'18px',height:'18px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
        </div>
      </nav>

      <div className="hero">
        <div className="stars" />
        <span className="moon">🌙</span>
        <h1>Sleep Cycle Calculator</h1>
        <p className="hero-sub">Wake up refreshed by timing sleep in 90-minute cycles</p>
        <div className="badges">
          <span className="badge">🧬 Sleep Science</span>
          <span className="badge">⏰ 90-Min Cycles</span>
          <span className="badge">📊 All Ages</span>
        </div>
      </div>

      <div className="main">
        {!results ? (
          <div className="card">
            <div className="card-title">Calculate your ideal sleep times</div>
            <div className="card-sub">Based on 90-minute sleep cycles used by sleep researchers worldwide</div>

            <div className="tabs">
              <button className={`tab${mode==="wake"?" active":""}`} onClick={()=>setMode("wake")}>🌅 I want to wake at…</button>
              <button className={`tab${mode==="bed"?" active":""}`} onClick={()=>setMode("bed")}>🌙 I'm going to bed at…</button>
            </div>

            <div className="field">
              <label>{mode==="wake" ? "Target wake-up time" : "Planned bedtime"}</label>
              <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
            </div>

            <div className="field">
              <label>Age Group — for personalized recommendations</label>
              <div className="age-pills">
                {Object.entries(SLEEP_RECS).map(([k,v])=>(
                  <button key={k} className={`ap${age===k?" sel":""}`} onClick={()=>setAge(k)}>{v.label}</button>
                ))}
              </div>
            </div>

            <button className="btn btn-calc" onClick={calculate}>🌙 Calculate Sleep Times</button>
          </div>
        ) : (
          <>
            <div className="card">
              <div className="results-title">{mode==="wake" ? `Go to bed at…` : `Wake up at…`}</div>
              <div className="results-sub">
                Recommended sleep for your age: <strong style={{color:"var(--purp-lt)"}}>{rec.min}–{rec.max} hours</strong> · Includes ~14 min to fall asleep
              </div>

              <div className="rec-box">
                <div className="rec-title">✨ Best options for you highlighted below</div>
                <div className="rec-text">
                  Sleep happens in 90-minute cycles. Waking at the end of a complete cycle — rather than mid-cycle — means you wake during light sleep, feeling refreshed instead of groggy. Even a short sleep of complete cycles beats a longer interrupted one.
                </div>
              </div>

              <div className="cycle-grid">
                {results.map(r => {
                  const q = cycleQuality(r.cycles, age);
                  const displayTime = mode==="wake" ? r.bedtime : r.waketime;
                  const label = mode==="wake" ? "Go to bed" : "Wake up";
                  return (
                    <div key={r.cycles} className={`cycle-item ${q}`}>
                      <div style={{fontSize:28}}>{ICONS[r.cycles]}</div>
                      <div className="cycle-detail">
                        <div className="cycle-label">{label} → {r.hrs} hrs · {r.cycles} cycles</div>
                        <div className="cycle-time">{fmt12(displayTime)}</div>
                        <span className={`cycle-quality q-${q}`}>
                          {q==="best"?"✓ Ideal for your age":q==="good"?"Good option":"Short — use only if needed"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <div className="card-title">The 4 Stages of Sleep</div>
              <div className="stages-grid">
                {STAGES.map(s=>(
                  <div key={s.name} className="stage-card">
                    <div className="stage-icon">{s.icon}</div>
                    <div className="stage-name">{s.name}</div>
                    <div className="stage-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">🔬 Sleep Hygiene Tips</div>
              {[
                ["📱","Avoid screens 60–90 min before bed","Blue light suppresses melatonin production by up to 50%"],
                ["🌡️","Keep your room 65–68°F (18–20°C)","Core body temperature must drop to initiate sleep"],
                ["☕","No caffeine after 2 PM","Caffeine has a 5–7 hour half-life in your body"],
                ["⏰","Same wake time every day — even weekends","Consistency is the single most powerful sleep improvement"],
                ["🌅","Get bright light within 30 min of waking","Sets your circadian clock for the next 24 hours"],
                ["🍷","Avoid alcohol within 3 hrs of bedtime","Disrupts REM sleep even if it helps you fall asleep"],
              ].map(([icon,title,desc])=>(
                <div key={title} className="tip-row">
                  <span className="tip-icon">{icon}</span>
                  <div className="tip-text"><strong>{title}</strong><br/>{desc}</div>
                </div>
              ))}
            </div>

            <div className="disclaimer">⚕️ This calculator is for educational purposes. Sleep needs vary by individual. If you experience chronic sleep problems, consult a healthcare provider or sleep specialist.</div>

            <button className="btn btn-reset" onClick={()=>setResults(null)}>← Calculate Again</button>
          </>
        )}
      </div>

      {/* SEO CONTENT SECTION */}
      <div className="seo-section">

        <div className="seo-intro">
          <h2>What Is a Sleep Cycle Calculator?</h2>
          <p>A sleep cycle calculator helps you figure out the <strong>best time to go to sleep or wake up</strong> so you feel rested and refreshed — not groggy. Instead of just counting how many hours you sleep, it accounts for the natural 90-minute cycles your brain moves through each night.</p>
          <p>Most people make the mistake of setting an alarm for 8 hours and wondering why they still feel terrible. The reason is simple — if your alarm wakes you up in the <strong>middle of a deep sleep stage</strong>, your brain needs time to recover from that interruption. Waking up at the end of a complete sleep cycle is the difference between jumping out of bed feeling great and hitting snooze five times.</p>
          <p>The Body HQ Sleep Cycle Calculator takes your target wake-up time or bedtime and calculates the <strong>ideal times to fall asleep or wake up</strong> so you complete full 90-minute cycles. It also accounts for the average 14 minutes it takes most people to actually fall asleep after getting into bed.</p>
          <p>Whether you are a night owl trying to optimize late nights, an early riser maximizing morning energy, or simply someone who wants to stop waking up exhausted — this free sleep calculator gives you the science-backed times that work best for your body.</p>
        </div>

        <div className="how-it-works">
          <h2>How the Sleep Cycle Calculator Works</h2>
          <div className="step-item"><div className="step-num">1</div><div className="step-text"><strong>Choose your mode</strong> — select "I want to wake up at..." if you have a fixed wake time, or "I want to go to sleep at..." if you have a fixed bedtime.</div></div>
          <div className="step-item"><div className="step-num">2</div><div className="step-text"><strong>Enter your time</strong> — type in your target wake-up time or the time you plan to get into bed.</div></div>
          <div className="step-item"><div className="step-num">3</div><div className="step-text"><strong>Get your results</strong> — the calculator shows you multiple ideal sleep or wake times based on completing 4, 5, or 6 full 90-minute sleep cycles. Each option shows how many hours of sleep you will get.</div></div>
          <div className="step-item"><div className="step-num">4</div><div className="step-text"><strong>Pick the best option for you</strong> — most adults feel best after 5 or 6 complete cycles (7.5 to 9 hours). Choose the time that fits your schedule while maximizing complete cycles.</div></div>
          <div className="step-item"><div className="step-num">5</div><div className="step-text"><strong>Follow the sleep tips</strong> — scroll down for evidence-based tips on improving your sleep quality, not just your sleep duration.</div></div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-q">How long is a sleep cycle?</div>
            <div className="faq-a">A complete sleep cycle lasts approximately <strong>90 minutes</strong>. Each cycle moves through four stages — three stages of non-REM sleep (light sleep and deep sleep) followed by one stage of REM sleep (where dreaming occurs). Most adults complete 4 to 6 full cycles per night, with each cycle becoming progressively more REM-heavy toward morning.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">How many hours of sleep do I actually need?</div>
            <div className="faq-a">The American Academy of Sleep Medicine recommends <strong>7 to 9 hours per night for adults</strong>. For teenagers the recommendation is 8 to 10 hours, and school-age children need 9 to 12 hours. However individual needs vary — some people genuinely function well on 7 hours while others need 9. The key is waking up at the end of a complete sleep cycle, which is why 7.5 hours (5 cycles) often feels better than 8 hours if 8 hours puts you mid-cycle.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">Why do I wake up tired even after 8 hours of sleep?</div>
            <div className="faq-a">Waking up groggy after 8 hours is usually caused by one of three things: <strong>waking up mid-cycle</strong> (your alarm interrupted a deep sleep stage), poor sleep quality (you were in bed 8 hours but not actually sleeping well), or an underlying condition like sleep apnea. Try adjusting your alarm to a sleep-cycle-friendly time using this calculator. If the grogginess persists despite optimizing your sleep timing, speak with a doctor.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is sleep inertia?</div>
            <div className="faq-a">Sleep inertia is the groggy, disoriented feeling you get when you are woken up abruptly during deep sleep. It can last anywhere from a few minutes to over an hour and significantly impairs cognitive performance. <strong>Waking up at the end of a sleep cycle</strong> — when you are naturally in lighter sleep — dramatically reduces sleep inertia. This is exactly what this calculator helps you do.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is REM sleep and why does it matter?</div>
            <div className="faq-a">REM (Rapid Eye Movement) sleep is the stage associated with vivid dreaming and is critical for <strong>memory consolidation, emotional regulation, and creative thinking</strong>. REM sleep becomes longer and more frequent in the later cycles of the night — which is why cutting sleep short, even by an hour or two, disproportionately reduces your total REM sleep and leaves you feeling mentally foggy.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q">Is this sleep calculator suitable for children?</div>
            <div className="faq-a">This calculator uses 90-minute sleep cycles which apply to adults and teenagers. <strong>Young children have shorter sleep cycles</strong> (around 50-60 minutes) so the timings will not be as accurate for children under 12. For general sleep duration recommendations for children, consult your pediatrician.</div>
          </div>

        </div>

        <div className="internal-links">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="tool-links">
            <a href="/burnout" className="tool-link">
              <div className="tool-link-name">🧠 Stress & Burnout Score</div>
              <div className="tool-link-desc">Take a 12-question assessment to understand your stress levels</div>
            </a>
            <a href="/fasting" className="tool-link">
              <div className="tool-link-name">⏰ Intermittent Fasting Calculator</div>
              <div className="tool-link-desc">Find your ideal fasting and eating windows across 6 protocols</div>
            </a>
            <a href="/nutrients" className="tool-link">
              <div className="tool-link-name">💊 Vitamin & Mineral Calculator</div>
              <div className="tool-link-desc">Get personalized daily nutrient targets for 40+ vitamins and minerals</div>
            </a>
            <a href="/bmi" className="tool-link">
              <div className="tool-link-name"><img src="/bmi-icon.png" style={{width:'18px',height:'18px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</div>
              <div className="tool-link-desc">Calculate your BMI, Ponderal Index, and get ethnicity-adjusted results</div>
            </a>
          </div>
        </div>

        <div className="seo-disclaimer">⚕️ <strong>Medical Disclaimer:</strong> The information provided by this sleep cycle calculator is for general educational purposes only and is not a substitute for professional medical advice. If you experience chronic sleep problems, insomnia, excessive daytime sleepiness, or suspect a sleep disorder such as sleep apnea, please consult a qualified healthcare provider or sleep specialist.</div>

      </div>
    </div>
  );
}
