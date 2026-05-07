'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0c0a06;--card:#161208;--card2:#1e1810;--border:#2a2218;
      --amber:#f59e0b;--amber-lt:#fbbf24;--amber-dim:#92400e;
      --orange:#ea580c;--red:#dc2626;--green:#16a34a;
      --text:#fef3c7;--muted:#a16207;--soft:#fde68a;
      --glow:rgba(245,158,11,.15);
    }
    body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
    .app{min-height:100vh}

    /* HERO */
    .hero{
      background:linear-gradient(160deg,#0c0a06 0%,#1c1003 50%,#0f0800 100%);
      padding:44px 20px 36px;text-align:center;position:relative;overflow:hidden;
      border-bottom:1px solid var(--border);
    }
    .hero::before{
      content:'';position:absolute;inset:0;
      background:radial-gradient(ellipse at 50% 0%,rgba(245,158,11,.12) 0%,transparent 70%);
    }
    .hero-icon{font-size:52px;display:block;margin-bottom:14px;position:relative;
      filter:drop-shadow(0 0 24px rgba(245,158,11,.6));animation:pulse 3s ease-in-out infinite;}
    @keyframes pulse{0%,100%{filter:drop-shadow(0 0 24px rgba(245,158,11,.6))}
      50%{filter:drop-shadow(0 0 40px rgba(245,158,11,.9))}}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,38px);font-weight:800;
      background:linear-gradient(135deg,var(--amber-lt),var(--orange));
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative;line-height:1.2}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:9px;position:relative;line-height:1.6}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);
      color:var(--amber);font-size:16px;padding:3px 11px;border-radius:20px;font-weight:600}

    /* MAIN */
    .main{max-width:620px;margin:0 auto;padding:22px 16px 40px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:14px}
    .card-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px;line-height:1.5}

    /* PROTOCOL GRID */
    .protocol-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px}
    .proto-btn{background:var(--card2);border:1.5px solid var(--border);border-radius:12px;
      padding:14px 12px;cursor:pointer;transition:all .2s;text-align:center;font-family:'DM Sans',sans-serif}
    .proto-btn:hover{border-color:var(--amber-dim)}
    .proto-btn.sel{background:rgba(245,158,11,.1);border-color:var(--amber);
      box-shadow:0 0 0 3px rgba(245,158,11,.1)}
    .proto-ratio{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--amber);margin-bottom:3px}
    .proto-name{font-size:14px;font-weight:600;color:var(--soft);margin-bottom:2px}
    .proto-desc{font-size:16px;color:var(--muted);line-height:1.4}
    .proto-pop{font-size:15px;font-weight:700;color:var(--amber);background:rgba(245,158,11,.15);
      padding:2px 7px;border-radius:10px;display:inline-block;margin-top:4px}

    /* TIME INPUT */
    .field{margin-bottom:16px}
    label{display:block;font-size:16px;font-weight:700;color:var(--muted);
      letter-spacing:.6px;text-transform:uppercase;margin-bottom:7px}
    input[type=time]{width:100%;padding:13px 16px;background:var(--card2);
      border:1.5px solid var(--border);border-radius:10px;color:var(--text);
      font-family:'DM Sans',sans-serif;font-size:22px;font-weight:700;
      transition:border-color .2s;-webkit-text-fill-color:var(--text)}
    input[type=time]:focus{outline:none;border-color:var(--amber);box-shadow:0 0 0 3px var(--glow)}

    /* GOAL PILLS */
    .pill-group{display:flex;gap:7px;flex-wrap:wrap}
    .pill{padding:7px 14px;border-radius:22px;border:1.5px solid var(--border);
      font-size:15px;font-weight:500;cursor:pointer;transition:all .2s;
      background:transparent;color:var(--muted);font-family:'DM Sans',sans-serif}
    .pill:hover{border-color:var(--amber-dim);color:var(--soft)}
    .pill.sel{background:rgba(245,158,11,.12);border-color:var(--amber);color:var(--amber)}

    /* BTN */
    .btn{width:100%;padding:14px;border-radius:11px;border:none;
      font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;
      cursor:pointer;transition:all .25s;letter-spacing:.3px;margin-top:6px}
    .btn-calc{background:linear-gradient(135deg,var(--amber-dim),var(--amber));color:#0c0a06;
      box-shadow:0 4px 20px rgba(245,158,11,.35)}
    .btn-calc:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(245,158,11,.5)}
    .btn-reset{background:var(--card2);color:var(--muted);margin-top:12px}

    /* CLOCK DISPLAY */
    .clock-wrap{display:flex;gap:12px;margin-bottom:16px}
    .clock-block{flex:1;background:var(--card2);border-radius:12px;padding:16px;text-align:center;position:relative;overflow:hidden}
    .clock-block::before{content:'';position:absolute;inset:0;opacity:.05}
    .clock-block.eat::before{background:var(--green)}
    .clock-block.fast::before{background:var(--amber)}
    .clock-emoji{font-size:22px;margin-bottom:6px;display:block}
    .clock-label{font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px}
    .clock-block.eat .clock-label{color:#4ade80}
    .clock-block.fast .clock-label{color:var(--amber)}
    .clock-time{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--text)}
    .clock-sub{font-size:16px;color:var(--muted);margin-top:3px}

    /* TIMELINE */
    .timeline{margin-bottom:16px}
    .tl-title{font-size:14px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px}
    .tl-bar{height:36px;border-radius:10px;overflow:hidden;display:flex;margin-bottom:8px;position:relative}
    .tl-eat{background:linear-gradient(90deg,rgba(22,163,74,.6),rgba(22,163,74,.3));
      display:flex;align-items:center;justify-content:center;
      font-size:14px;font-weight:700;color:#4ade80;transition:width .5s}
    .tl-fast{background:linear-gradient(90deg,rgba(245,158,11,.3),rgba(245,158,11,.6));
      display:flex;align-items:center;justify-content:center;
      font-size:14px;font-weight:700;color:var(--amber);transition:width .5s}
    .tl-labels{display:flex;justify-content:space-between;font-size:16px;color:var(--muted)}

    /* BENEFITS */
    .benefits{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}
    .benefit{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px}
    .benefit-icon{font-size:18px;margin-bottom:5px}
    .benefit-title{font-size:14px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .benefit-desc{font-size:16px;color:var(--muted);line-height:1.4}

    /* TIPS */
    .tip-row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start}
    .tip-row:last-child{border-bottom:none}
    .tip-icon{font-size:16px;flex-shrink:0;margin-top:1px}
    .tip-text{font-size:15px;color:var(--muted);line-height:1.5}
    .tip-text strong{color:var(--soft)}

    /* STAT ROW */
    .stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
    .stat{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center}
    .stat-v{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--amber);margin-bottom:3px}
    .stat-l{font-size:16px;color:var(--muted);font-weight:600}

    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;
      font-size:14px;color:var(--muted);line-height:1.6;margin-top:4px}
    .warn-banner{background:#1a0a0a;border:2px solid #ef4444;border-radius:12px;
      padding:16px;margin-bottom:16px}
    .warn-banner-title{font-size:16px;font-weight:700;color:#ef4444;margin-bottom:8px;display:flex;align-items:center;gap:6px}
    .warn-banner-text{font-size:15px;color:#fca5a5;line-height:1.7}
    .warn-banner-list{font-size:15px;color:#fca5a5;line-height:1.9;padding-left:16px;margin-top:6px}
    .warn-banner-list li{margin-bottom:2px}
    .diabetes-box{background:#0a1628;border:1.5px solid #3b82f6;border-radius:10px;
      padding:14px;margin-top:10px}
    .diabetes-box-title{font-size:15px;font-weight:700;color:#93c5fd;margin-bottom:5px}
    .diabetes-box-text{font-size:14px;color:#bfdbfe;line-height:1.6}
    .quiz-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:12px}
    .quiz-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .quiz-sub{font-size:14px;color:var(--muted);margin-bottom:14px}
    .quiz-q{font-size:16px;font-weight:600;color:var(--text);margin-bottom:10px;line-height:1.5}
    .quiz-opts{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
    .quiz-opt{background:var(--card2);border:1.5px solid var(--border);border-radius:9px;
      padding:10px 13px;cursor:pointer;transition:all .2s;font-size:15px;color:var(--muted);
      font-family:'DM Sans',sans-serif;text-align:left}
    .quiz-opt:hover{border-color:var(--amber-dim);color:var(--soft)}
    .quiz-opt.sel{background:rgba(245,158,11,.1);border-color:var(--amber);color:var(--amber)}
    .quiz-result{background:rgba(245,158,11,.1);border:1.5px solid var(--amber);border-radius:10px;
      padding:14px;margin-bottom:12px}
    .quiz-result-label{font-size:14px;color:var(--amber);text-transform:uppercase;letter-spacing:.6px;font-weight:700;margin-bottom:4px}
    .quiz-result-name{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--amber-lt);margin-bottom:4px}
    .quiz-result-desc{font-size:15px;color:var(--muted);line-height:1.5}
    .skip-link{font-size:14px;color:var(--muted);text-decoration:underline;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;margin-top:6px;display:block}
    @media(max-width:480px){.protocol-grid{grid-template-columns:1fr}.clock-wrap{flex-direction:column}.benefits{grid-template-columns:1fr}.stat-row{grid-template-columns:1fr 1fr}}

    .seo-wrap{max-width:640px;margin:0 auto;padding:0 16px 48px}
    .seo-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-card h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-card p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-card p:last-child{margin-bottom:0}
    .seo-card strong{color:var(--soft)}
    .seo-step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .seo-step-num{background:var(--amber);color:#000;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .seo-step-txt{font-size:16px;color:var(--muted);line-height:1.7}
    .seo-step-txt strong{color:var(--text)}
    .seo-faq{border-bottom:1px solid var(--border);padding:16px 0}
    .seo-faq:last-child{border-bottom:none;padding-bottom:0}
    .seo-faq-q{font-size:16px;font-weight:700;color:var(--soft);margin-bottom:8px}
    .seo-faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .seo-faq-a strong{color:var(--text)}
    .seo-links{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .seo-links h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--amber);margin-bottom:14px}
    .seo-links-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .seo-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .seo-link:hover{border-color:var(--amber)}
    .seo-link-name{font-size:15px;font-weight:600;color:var(--text)}
    .seo-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disc2{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.seo-links-grid{grid-template-columns:1fr}}
  `}</style>
);

const PROTOCOLS = [
  { ratio:"16:8", name:"Leangains", fast:16, eat:8, desc:"Most popular & beginner friendly", pop:"Most Popular" },
  { ratio:"18:6", name:"Warrior Light", fast:18, eat:6, desc:"Faster results, more discipline", pop:"" },
  { ratio:"20:4", name:"Warrior", fast:20, eat:4, desc:"Advanced — one main meal", pop:"Advanced" },
  { ratio:"14:10", name:"Gentle Fast", fast:14, eat:10, desc:"Great for beginners & women", pop:"Beginner Friendly" },
  { ratio:"5:2", name:"5:2 Diet", fast:0, eat:0, desc:"Normal eating 5 days, 500 cal x 2", pop:"", special:"52" },
  { ratio:"OMAD", name:"One Meal", fast:23, eat:1, desc:"One meal per day — extreme", pop:"Extreme", special:"omad" },
];

const GOALS = [
  { value:"weightloss", label:"⚖️ Weight Loss" },
  { value:"autophagy", label:"🔄 Autophagy" },
  { value:"energy", label:"⚡ Energy" },
  { value:"muscle", label:"💪 Muscle" },
];

const BENEFITS = {
  weightloss:[
    { icon:"🔥", title:"Fat Burning", desc:"After 12–16 hrs fasting, your body shifts to burning stored fat for fuel" },
    { icon:"📉", title:"Insulin Drop", desc:"Lower insulin levels allow fat cells to release stored energy more easily" },
    { icon:"🧠", title:"Reduced Cravings", desc:"Stable blood sugar during fasting reduces hunger hormone spikes" },
    { icon:"⚖️", title:"Calorie Control", desc:"Smaller eating window naturally reduces total daily calorie intake" },
  ],
  autophagy:[
    { icon:"🔄", title:"Cell Recycling", desc:"Autophagy peaks around 24 hrs — your cells clean and repair themselves" },
    { icon:"🛡️", title:"Anti-Aging", desc:"Cellular cleanup removes damaged proteins linked to aging and disease" },
    { icon:"🧬", title:"DNA Repair", desc:"Fasting activates repair pathways that fix damaged DNA strands" },
    { icon:"🫀", title:"Heart Health", desc:"Reduced inflammation markers after extended fasting periods" },
  ],
  energy:[
    { icon:"⚡", title:"Mental Clarity", desc:"Ketones produced during fasting are a clean fuel source for the brain" },
    { icon:"😴", title:"Better Sleep", desc:"Not eating late improves sleep quality and morning energy levels" },
    { icon:"🎯", title:"Focus", desc:"Many report heightened concentration and productivity while fasting" },
    { icon:"🔋", title:"Stable Energy", desc:"No post-meal energy crashes when blood sugar stays steady" },
  ],
  muscle:[
    { icon:"💪", title:"Growth Hormone", desc:"Fasting boosts HGH by up to 5x — critical for muscle preservation" },
    { icon:"🥩", title:"Protein Timing", desc:"Concentrate protein intake in your eating window for maximum synthesis" },
    { icon:"🏋️", title:"Train Fasted", desc:"Light to moderate training while fasted can enhance fat adaptation" },
    { icon:"⏰", title:"Break Fast Well", desc:"Break your fast with protein-rich food after training for best results" },
  ],
};

function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,"0")} ${ap}`;
}

function addHours(t, hrs) {
  const [h, m] = t.split(":").map(Number);
  const total = ((h * 60 + m + hrs * 60) % 1440 + 1440) % 1440;
  return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
}

export default function IFCalc() {
  const [proto, setProto] = useState(PROTOCOLS[0]);
  const [startTime, setStartTime] = useState("12:00");
  const [goal, setGoal] = useState("weightloss");
  const [results, setResults] = useState(null);
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizQ1, setQuizQ1] = useState(null);
  const [quizQ2, setQuizQ2] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const getRecommendation = () => {
    if (quizQ1 === "never") return PROTOCOLS[3]; // 14:10 gentle
    if (quizQ1 === "tried" && quizQ2 === "lose") return PROTOCOLS[0]; // 16:8
    if (quizQ1 === "tried" && quizQ2 === "health") return PROTOCOLS[0]; // 16:8
    if (quizQ1 === "tried" && quizQ2 === "max") return PROTOCOLS[1]; // 18:6
    if (quizQ1 === "doing" && quizQ2 === "lose") return PROTOCOLS[1]; // 18:6
    if (quizQ1 === "doing" && quizQ2 === "max") return PROTOCOLS[2]; // 20:4
    return PROTOCOLS[0]; // default 16:8
  };

  const calculate = () => {
    if (proto.special === "52") {
      setResults({ special: "52" });
      return;
    }
    const eatStart = startTime;
    const eatEnd = addHours(startTime, proto.eat);
    const fastEnd = addHours(eatEnd, proto.fast);
    setResults({ eatStart, eatEnd, fastEnd, proto, goal });
  };

  return (
    <div className="app">
      <S />
      <div className="hero">
        <span className="hero-icon">☀️</span>
        <h1>Intermittent Fasting Calculator</h1>
        <p className="hero-sub">Find your fasting & eating windows based on your schedule and goal</p>
        <div className="badges">
          <span className="badge">⏰ 6 Protocols</span>
          <span className="badge">🎯 Goal Based</span>
          <span className="badge">📊 All Experience Levels</span>
        </div>
      </div>

      <div className="main">

        {/* Medical Warning Banner */}
        <div className="warn-banner">
          <div className="warn-banner-title">⚠️ Important Safety Warning — Please Read First</div>
          <div className="warn-banner-text">
            Intermittent fasting is <strong style={{color:"#fca5a5"}}>not suitable for everyone</strong>. Do not start any fasting protocol if you:
          </div>
          <ul className="warn-banner-list">
            <li>Have <strong>diabetes (Type 1 or Type 2)</strong> or blood sugar issues</li>
            <li>Are <strong>pregnant or breastfeeding</strong></li>
            <li>Have a history of <strong>eating disorders</strong></li>
            <li>Take <strong>regular medication</strong> that must be taken with food</li>
            <li>Have <strong>low blood pressure</strong>, kidney disease, or liver disease</li>
            <li>Are <strong>under 18</strong> or are underweight</li>
          </ul>
          <div className="diabetes-box">
            <div className="diabetes-box-title">🩺 Special Note for Diabetics</div>
            <div className="diabetes-box-text">
              If you have diabetes, fasting can cause dangerous drops in blood sugar (hypoglycemia), especially if you take insulin or certain oral medications. The timing of your meals is directly tied to your medication schedule. <strong style={{color:"#93c5fd"}}>Always consult your doctor before changing your eating schedule.</strong> If your doctor approves fasting, the 14:10 Gentle Fast is generally the safest starting point — it only extends your overnight fast by a small amount.
            </div>
          </div>
        </div>

        {/* Recommendation Quiz */}
        {showQuiz && !quizDone && (
          <div className="quiz-card">
            <div className="quiz-title">🎯 Which Protocol Is Right For Me?</div>
            <div className="quiz-sub">Answer 2 quick questions and we'll recommend the best starting point</div>

            <div className="quiz-q">Have you tried intermittent fasting before?</div>
            <div className="quiz-opts">
              {[
                {v:"never", l:"No — I'm completely new to fasting"},
                {v:"tried", l:"I've tried it a few times"},
                {v:"doing", l:"Yes — I already fast regularly"},
              ].map(o => (
                <button key={o.v} className={`quiz-opt${quizQ1===o.v?" sel":""}`} onClick={() => setQuizQ1(o.v)}>{o.l}</button>
              ))}
            </div>

            {quizQ1 && (
              <>
                <div className="quiz-q">What is your main goal?</div>
                <div className="quiz-opts">
                  {[
                    {v:"lose", l:"⚖️ Lose weight"},
                    {v:"health", l:"🌿 Improve general health"},
                    {v:"max", l:"🔬 Maximum results / autophagy"},
                  ].map(o => (
                    <button key={o.v} className={`quiz-opt${quizQ2===o.v?" sel":""}`} onClick={() => setQuizQ2(o.v)}>{o.l}</button>
                  ))}
                </div>
              </>
            )}

            {quizQ1 && quizQ2 && (
              <>
                <div className="quiz-result">
                  <div className="quiz-result-label">✨ Our Recommendation for You</div>
                  <div className="quiz-result-name">{getRecommendation().ratio} — {getRecommendation().name}</div>
                  <div className="quiz-result-desc">{getRecommendation().desc}</div>
                </div>
                <button className="btn btn-calc" onClick={() => { setProto(getRecommendation()); setQuizDone(true); setShowQuiz(false); }}>
                  ☀️ Use This Protocol
                </button>
              </>
            )}

            <button className="skip-link" onClick={() => setShowQuiz(false)}>
              Skip — I know which protocol I want
            </button>
          </div>
        )}

        {!results ? (
          <>
            <div className="card">
              <div className="card-title">Choose Your Protocol</div>
              <div className="card-sub">Select the fasting method that fits your lifestyle</div>
              <div className="protocol-grid">
                {PROTOCOLS.map(p => (
                  <div key={p.ratio} className={`proto-btn${proto.ratio===p.ratio?" sel":""}`} onClick={() => setProto(p)}>
                    <div className="proto-ratio">{p.ratio}</div>
                    <div className="proto-name">{p.name}</div>
                    <div className="proto-desc">{p.desc}</div>
                    {p.pop && <div className="proto-pop">{p.pop}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Your Eating Window Start</div>
              <div className="card-sub">What time do you want to start eating each day?</div>
              <div className="field">
                <label>First meal time</label>
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
            </div>

            <div className="card">
              <div className="card-title">Your Primary Goal</div>
              <div className="card-sub">We'll show you the benefits most relevant to you</div>
              <div className="pill-group">
                {GOALS.map(g => (
                  <button key={g.value} className={`pill${goal===g.value?" sel":""}`} onClick={() => setGoal(g.value)}>{g.label}</button>
                ))}
              </div>
            </div>

            <button className="btn btn-calc" onClick={calculate}>☀️ Calculate My Fasting Schedule</button>
          </>
        ) : results.special === "52" ? (
          <>
            <div className="card">
              <div className="card-title">5:2 Protocol</div>
              <div className="card-sub">This protocol works differently — here's your plan</div>
              <div className="stat-row">
                <div className="stat"><div className="stat-v">5</div><div className="stat-l">Normal Days</div></div>
                <div className="stat"><div className="stat-v">2</div><div className="stat-l">Fast Days</div></div>
                <div className="stat"><div className="stat-v">~500</div><div className="stat-l">Calories on Fast Days</div></div>
              </div>
              <div className="tip-row"><span className="tip-icon">📅</span><div className="tip-text"><strong>Choose non-consecutive fast days</strong><br/>Monday and Thursday work well — never two days in a row</div></div>
              <div className="tip-row"><span className="tip-icon">🥗</span><div className="tip-text"><strong>On fast days eat 500 calories</strong><br/>Women aim for 500 cal, men 600 cal. Spread across 2 small meals</div></div>
              <div className="tip-row"><span className="tip-icon">💧</span><div className="tip-text"><strong>Stay hydrated on fast days</strong><br/>Water, black coffee, and herbal tea are all fine</div></div>
              <div className="tip-row"><span className="tip-icon">🍽️</span><div className="tip-text"><strong>Eat normally on the other 5 days</strong><br/>Don't compensate — eat your usual meals without restriction</div></div>
            </div>
            <button className="btn btn-reset" onClick={() => setResults(null)}>← Try Another Protocol</button>
          </>
        ) : (
          <>
            <div className="card">
              <div className="card-title">{results.proto.ratio} — Your Daily Schedule</div>
              <div className="card-sub">Stick to this window every day for best results</div>

              <div className="clock-wrap">
                <div className="clock-block eat">
                  <span className="clock-emoji">🍽️</span>
                  <div className="clock-label">Eating Window</div>
                  <div className="clock-time">{fmt12(results.eatStart)} – {fmt12(results.eatEnd)}</div>
                  <div className="clock-sub">{results.proto.eat} hours — eat all meals here</div>
                </div>
                <div className="clock-block fast">
                  <span className="clock-emoji">⏳</span>
                  <div className="clock-label">Fasting Window</div>
                  <div className="clock-time">{fmt12(results.eatEnd)} – {fmt12(results.eatStart)}</div>
                  <div className="clock-sub">{results.proto.fast} hours — water & black coffee only</div>
                </div>
              </div>

              <div className="timeline">
                <div className="tl-title">Daily Timeline</div>
                <div className="tl-bar">
                  <div className="tl-eat" style={{width:`${(results.proto.eat/24)*100}%`}}>🍽️ {results.proto.eat}h eat</div>
                  <div className="tl-fast" style={{width:`${(results.proto.fast/24)*100}%`}}>⏳ {results.proto.fast}h fast</div>
                </div>
                <div className="tl-labels"><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span></div>
              </div>

              <div className="stat-row">
                <div className="stat"><div className="stat-v">{results.proto.fast}h</div><div className="stat-l">Daily Fast</div></div>
                <div className="stat"><div className="stat-v">{results.proto.eat}h</div><div className="stat-l">Eating Window</div></div>
                <div className="stat"><div className="stat-v">~{Math.round(results.proto.fast*0.6)}h</div><div className="stat-l">Fat Burning Est.</div></div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Benefits for Your Goal</div>
              <div className="benefits">
                {(BENEFITS[results.goal] || BENEFITS.weightloss).map(b => (
                  <div key={b.title} className="benefit">
                    <div className="benefit-icon">{b.icon}</div>
                    <div className="benefit-title">{b.title}</div>
                    <div className="benefit-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">🔑 Tips for Success</div>
              {[
                ["💧","Stay hydrated during your fast","Water, black coffee, and plain herbal tea won't break your fast and help manage hunger"],
                ["🌅","Break your fast gently","Start with something protein-rich and avoid high-sugar foods as your first meal"],
                ["📅","Consistency is everything","Your body adapts to a schedule — same window every day gives the best results"],
                ["😴","Your sleep counts as fasting","A midnight to 8am fast means you're already fasting 8 hours while you sleep"],
                ["🏋️","Exercise timing matters","Light cardio fasted is fine — save heavy lifting for your eating window"],
                ["⚠️","Listen to your body","Dizziness, extreme fatigue, or fainting means stop and eat — fasting isn't for everyone"],
              ].map(([icon, title, desc]) => (
                <div key={title} className="tip-row">
                  <span className="tip-icon">{icon}</span>
                  <div className="tip-text"><strong>{title}</strong><br />{desc}</div>
                </div>
              ))}
            </div>

            <div className="disclaimer">⚕️ Intermittent fasting is not suitable for everyone. Pregnant or breastfeeding women, people with eating disorders, type 1 diabetics, and those on certain medications should consult a doctor before fasting. This calculator is for educational purposes only.</div>
            <button className="btn btn-reset" onClick={() => setResults(null)}>← Change Protocol</button>
          </>
        )}
      </div>
    </div>
      {/* SEO CONTENT */}
      <div className="seo-wrap">
        <div className="seo-card">
          <h2>What Is Intermittent Fasting?</h2>
          <p>Intermittent fasting (IF) is an eating pattern that <strong>cycles between periods of fasting and eating</strong>. Unlike traditional diets that focus on what you eat, intermittent fasting focuses on when you eat. During fasting windows your body shifts from burning glucose for energy to burning stored fat — a metabolic state that has been linked to weight loss, improved insulin sensitivity, reduced inflammation, and even cellular repair through a process called autophagy.</p>
          <p>The most popular intermittent fasting protocol is the <strong>16:8 method</strong> — fasting for 16 hours and eating within an 8-hour window. Other popular approaches include 18:6, 20:4, and the more challenging one meal a day (OMAD) protocol. The right protocol depends entirely on your goals, your schedule, and your experience with fasting.</p>
          <p>The Body HQ Intermittent Fasting Calculator takes your eating window preferences and calculates your <strong>exact fasting start and end times</strong> across 6 different protocols. It also includes a personalized recommendation quiz to help beginners find the right starting point, and important safety guidance for people who should consult a doctor before fasting.</p>
        </div>

        <div className="seo-card">
          <h2>How the Fasting Calculator Works</h2>
          <div className="seo-step"><div className="seo-step-num">1</div><div className="seo-step-txt"><strong>Take the recommendation quiz</strong> — if you are new to fasting, answer 2 quick questions and the calculator will recommend the best protocol for your experience level and goals.</div></div>
          <div className="seo-step"><div className="seo-step-num">2</div><div className="seo-step-txt"><strong>Choose your protocol</strong> — select from 6 protocols ranging from the gentle 14:10 fast all the way to OMAD (one meal a day). Each protocol shows your fasting and eating hours.</div></div>
          <div className="seo-step"><div className="seo-step-num">3</div><div className="seo-step-txt"><strong>Set your eating window start time</strong> — enter the time you want to break your fast (your first meal of the day) and the calculator works out everything else.</div></div>
          <div className="seo-step"><div className="seo-step-num">4</div><div className="seo-step-txt"><strong>Get your schedule</strong> — see your exact fasting window, eating window, and recommended meal times displayed clearly on a visual timeline.</div></div>
          <div className="seo-step"><div className="seo-step-num">5</div><div className="seo-step-txt"><strong>Read the protocol guide</strong> — each protocol includes a description, difficulty level, and who it is best suited for to help you make the right choice.</div></div>
        </div>

        <div className="seo-card">
          <h2>Frequently Asked Questions</h2>

          <div className="seo-faq">
            <div className="seo-faq-q">Which intermittent fasting protocol is best for weight loss?</div>
            <div className="seo-faq-a">The <strong>16:8 protocol is the most studied and most effective for sustainable weight loss</strong> for most people. It creates a calorie deficit by limiting eating to an 8-hour window while remaining practical enough to maintain long term. More restrictive protocols like 18:6 or 20:4 may produce faster results but are harder to sustain. The best protocol is always the one you can stick to consistently.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">Can I drink coffee or tea while fasting?</div>
            <div className="seo-faq-a"><strong>Black coffee and plain tea do not break a fast</strong> and are generally considered acceptable during fasting windows. They contain minimal to no calories and may even enhance the fat-burning effects of fasting. However adding milk, cream, sugar, or sweeteners does break a fast. Plain water, sparkling water, and black coffee or tea are your best options during fasting hours.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">Is intermittent fasting safe for diabetics?</div>
            <div className="seo-faq-a">Intermittent fasting can be <strong>dangerous for people with diabetes without medical supervision</strong>. Fasting can cause blood sugar levels to drop dangerously low (hypoglycemia), especially for people taking insulin or certain oral diabetes medications. If you have Type 1 or Type 2 diabetes, you must consult your doctor before attempting any fasting protocol. Your medication timing may need to be adjusted alongside any changes to your eating schedule.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">What is autophagy and when does it start during fasting?</div>
            <div className="seo-faq-a">Autophagy is a cellular cleaning process where your body breaks down and recycles damaged cell components. Research suggests autophagy begins to increase <strong>after approximately 16 to 18 hours of fasting</strong>, which is one reason many people choose the 16:8 or 18:6 protocols. However the exact timing varies between individuals based on factors like metabolic health, activity level, and what was eaten before the fast began.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">Will intermittent fasting cause muscle loss?</div>
            <div className="seo-faq-a">When done correctly, intermittent fasting should <strong>not cause significant muscle loss</strong>. The key is consuming adequate protein during your eating window — aim for 0.7 to 1 gram of protein per pound of body weight — and continuing resistance training. In fact some studies suggest that fasting combined with resistance training can improve body composition by reducing fat while preserving or even building muscle.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">What should I eat when breaking my fast?</div>
            <div className="seo-faq-a">Breaking your fast with <strong>easily digestible whole foods</strong> is ideal. Good options include eggs, Greek yogurt, fruits, vegetables, lean proteins, and whole grains. Avoid breaking your fast with large amounts of processed food, refined sugars, or very high-fat meals — your digestive system is more sensitive after a fasting period and blood sugar spikes are more pronounced. Start with something moderate and give your body 30 minutes before eating a larger meal.</div>
          </div>

        </div>

        <div className="seo-links">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="seo-links-grid">
            <a href="/nutrients" className="seo-link">
              <div className="seo-link-name">💊 Vitamin & Mineral Calculator</div>
              <div className="seo-link-desc">Get personalized daily nutrient targets for 40+ vitamins and minerals</div>
            </a>
            <a href="/sleep" className="seo-link">
              <div className="seo-link-name">🌙 Sleep Cycle Calculator</div>
              <div className="seo-link-desc">Find your perfect bedtime based on 90-minute sleep cycles</div>
            </a>
            <a href="/burnout" className="seo-link">
              <div className="seo-link-name">🧠 Stress & Burnout Score</div>
              <div className="seo-link-desc">12-question assessment to understand your stress levels</div>
            </a>
            <a href="/pregnancy" className="seo-link">
              <div className="seo-link-name">🤰 Pregnancy Due Date Calculator</div>
              <div className="seo-link-desc">Calculate your due date using 3 different methods</div>
            </a>
          </div>
        </div>

        <div className="seo-disc2">⚕️ <strong>Medical Disclaimer:</strong> Intermittent fasting is not suitable for everyone. Do not attempt any fasting protocol if you are pregnant, breastfeeding, have a history of eating disorders, take regular medication, have diabetes, or have any chronic health condition without first consulting your doctor. This calculator is for general educational purposes only and is not a substitute for professional medical advice.</div>
      </div>

  );
}
