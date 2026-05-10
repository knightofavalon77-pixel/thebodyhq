'use client';
// @ts-nocheck
import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#080c14;--card:#0f1521;--card2:#151d2e;--border:#1e2a3e;
      --blue:#3b82f6;--blue-lt:#93c5fd;--indigo:#6366f1;--cyan:#06b6d4;
      --green:#10b981;--yellow:#f59e0b;--orange:#f97316;--red:#ef4444;
      --purple:#7c3aed;--purp-lt:#a78bfa;
      --text:#f1f5f9;--muted:#94a3b8;--dim:#64748b;
    }
    body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;min-height:100vh}
    .app{min-height:100vh;display:flex;flex-direction:column}
    nav{position:sticky;top:0;z-index:100;background:rgba(19,19,31,.92);backdrop-filter:blur(16px);border-bottom:1px solid #2a2a45;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:64px}
    .nav-brand{display:flex;align-items:center;gap:10px;font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--purp-lt),#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-decoration:none}
    .nav-pulse{width:32px;height:20px;position:relative}
    .nav-pulse svg{width:100%;height:100%}
    .nav-links{display:flex;gap:4px;align-items:center}
    .nav-link{padding:6px 11px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:500;color:var(--muted);transition:all .2s;border:1px solid transparent;white-space:nowrap}
    .nav-link:hover{color:var(--text);background:#1e1e3a;border-color:#2a2a45}
    .nav-menu-btn{display:none;background:none;border:none;color:var(--text);font-size:22px;cursor:pointer;padding:4px}
    .mobile-menu{display:none;position:fixed;inset:64px 0 0;background:rgba(19,19,31,.98);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:14px}
    .mobile-menu.open{display:flex}
    .mobile-link{font-size:18px;font-weight:600;color:var(--text);text-decoration:none;padding:12px 28px;border-radius:12px;border:1px solid #2a2a45;width:240px;text-align:center;transition:all .2s}
    .mobile-link:hover{background:#1e1e3a;border-color:var(--purple)}
    .hero{background:var(--card);padding:40px 20px 32px;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
    .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(59,130,246,.18) 0%,transparent 60%),radial-gradient(ellipse at 70% 20%,rgba(99,102,241,.12) 0%,transparent 50%)}
    .hero-icon{width:100px;height:100px;object-fit:contain;display:block;margin:0 auto 16px;position:relative;filter:drop-shadow(0 0 20px rgba(59,130,246,.4))}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(24px,5vw,40px);font-weight:800;background:linear-gradient(135deg,var(--blue-lt),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:8px;position:relative;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.6}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);color:var(--blue-lt);font-size:13px;padding:3px 10px;border-radius:20px;font-weight:500}
    .main{flex:1;max-width:660px;margin:0 auto;width:100%;padding:24px 16px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:16px}
    .card-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px}
    .unit-toggle{display:flex;gap:4px;background:var(--bg);border-radius:10px;padding:4px;margin-bottom:20px}
    .ut-btn{flex:1;padding:9px;border:none;border-radius:7px;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--muted)}
    .ut-btn.active{background:#d4edda;border:1px solid #52b788;color:#1a5c38}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .fg{display:flex;flex-direction:column;gap:6px}
    .fg.full{grid-column:span 2}
    .fg label{font-size:13px;font-weight:600;color:var(--muted);letter-spacing:.5px;text-transform:uppercase}
    .fg input,.fg select{width:100%;padding:12px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Grotesk',sans-serif;font-size:16px;transition:border-color .2s}
    .fg input:focus,.fg select:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px rgba(59,130,246,.15)}
    .fg input::placeholder{color:var(--dim)}
    .fg select{cursor:pointer}
    .fg.error input,.fg.error select{border-color:var(--red)}
    .err-msg{font-size:12px;color:var(--red);margin-top:2px}
    .ht-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .eth-note{background:rgba(6,182,212,.08);border:1px solid rgba(6,182,212,.2);border-radius:10px;padding:12px;font-size:13px;color:#67e8f9;line-height:1.6;margin-top:8px}
    .btn-calc{width:100%;padding:14px;border-radius:10px;border:none;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;cursor:pointer;transition:all .2s;margin-top:8px;letter-spacing:.3px;background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;box-shadow:0 4px 20px rgba(59,130,246,.4)}
    .btn-calc:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(59,130,246,.5)}
    .btn-reset{background:var(--card2);border:1px solid var(--border);color:var(--muted);padding:10px 20px;border-radius:10px;cursor:pointer;font-size:14px;font-family:'Space Grotesk',sans-serif;transition:all .2s;margin-top:12px}
    .btn-reset:hover{color:var(--text);border-color:var(--text)}
    .bmi-hero{text-align:center;padding:28px 16px 20px}
    .bmi-num{font-family:'Syne',sans-serif;font-size:72px;font-weight:800;line-height:1;margin-bottom:8px}
    .bmi-cat{font-size:22px;font-weight:700;margin-bottom:4px}
    .bmi-class{font-size:15px;color:var(--muted)}
    .scale-wrap{margin:20px 0 8px}
    .scale-bar{height:12px;border-radius:6px;background:linear-gradient(to right,#38bdf8 0%,#10b981 18.5%,#10b981 25%,#f59e0b 30%,#f97316 35%,#ef4444 100%);position:relative;margin-bottom:8px}
    .scale-pin{position:absolute;top:-4px;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid var(--card);box-shadow:0 2px 8px rgba(0,0,0,.5);transform:translateX(-50%);transition:left .5s ease}
    .scale-lbls{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
    .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
    .stat{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px}
    .stat-lbl{font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}
    .stat-val{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--text)}
    .stat-sub{font-size:12px;color:var(--muted);margin-top:2px}
    .ob-box{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);border-radius:12px;padding:16px;margin-bottom:12px}
    .ob-title{font-size:14px;font-weight:700;color:#fca5a5;margin-bottom:8px}
    .ob-desc{font-size:14px;color:var(--muted);line-height:1.7}
    .waist-box{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;gap:12px}
    .waist-lbl{font-size:13px;color:var(--muted)}
    .waist-hint{font-size:12px;color:var(--dim);margin-top:3px}
    .waist-status{font-size:14px;font-weight:700;flex-shrink:0}
    .risk-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px}
    .risk-dot{width:8px;height:8px;border-radius:50%;margin-top:6px;flex-shrink:0}
    .risk-txt{font-size:14px;color:var(--muted);line-height:1.6}
    .risk-txt strong{color:var(--text)}
    .limit-box{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:12px;padding:16px;margin-top:12px}
    .limit-title{font-size:14px;font-weight:700;color:#fcd34d;margin-bottom:10px}
    .limit-list{list-style:none}
    .limit-list li{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:6px;padding-left:16px;position:relative}
    .limit-list li::before{content:'•';position:absolute;left:0;color:#fcd34d}
    .pi-box{background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25);border-radius:12px;padding:18px;margin-bottom:4px}
    .pi-title{font-size:13px;font-weight:700;color:#a5b4fc;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
    .pi-num{font-family:'Syne',sans-serif;font-size:36px;font-weight:800;margin-bottom:4px}
    .pi-cat{font-size:15px;font-weight:600;margin-bottom:14px}
    .pi-ranges{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:12px 0}
    .pi-range{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:13px}
    .pi-range-val{font-weight:700;margin-bottom:2px}
    .pi-range-lbl{color:var(--muted)}
    .pi-explain{font-size:14px;color:var(--muted);line-height:1.7}
    .pi-explain strong{color:var(--text)}
    .step-item{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px}
    .step-n{background:linear-gradient(135deg,var(--blue),var(--indigo));color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;margin-top:1px}
    .step-txt{font-size:14px;color:var(--muted);line-height:1.6}
    .step-txt strong{color:var(--text)}
    .tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px;margin-bottom:12px}
    .tl{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .tl:hover{border-color:var(--blue)}
    .tl-name{font-size:14px;font-weight:600;color:var(--text)}
    .tl-desc{font-size:12px;color:var(--muted);margin-top:3px}
    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--muted);line-height:1.6;margin-top:12px}
    .seo-section{padding-bottom:48px}
    .seo-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:16px}
    .seo-card h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-card p{font-size:15px;color:var(--muted);line-height:1.8;margin-bottom:12px}
    .seo-card p:last-child{margin-bottom:0}
    .seo-card strong{color:var(--text)}
    .how-step{display:flex;gap:12px;align-items:flex-start;margin-bottom:14px}
    .how-num{background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);color:var(--blue-lt);width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;margin-top:2px}
    .how-txt{font-size:15px;color:var(--muted);line-height:1.6}
    .how-txt strong{color:var(--text)}
    .faq-item{border-bottom:1px solid var(--border);padding:14px 0}
    .faq-item:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:15px;font-weight:700;color:var(--text);margin-bottom:7px}
    .faq-a{font-size:14px;color:var(--muted);line-height:1.7}
    .faq-a strong{color:var(--text)}
    .int-box{background:rgba(59,130,246,.07);border:1px solid rgba(59,130,246,.2);border-radius:16px;padding:20px;margin-bottom:16px}
    .int-box h3{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:var(--blue-lt);margin-bottom:12px}
    @media(max-width:768px){.nav-links{display:none}.nav-menu-btn{display:block}}
    @media(max-width:520px){.form-grid{grid-template-columns:1fr}.fg.full{grid-column:span 1}.stats-grid{grid-template-columns:1fr}.tools-grid{grid-template-columns:1fr}.pi-ranges{grid-template-columns:1fr 1fr}}
  `}</style>
);

export default function App() {
  const [unit, setUnit] = useState("imperial");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [sex, setSex] = useState("");
  const [ethnicity, setEthnicity] = useState("standard");
  const [waist, setWaist] = useState("");
  const [waistUnit, setWaistUnit] = useState("inches");
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const getThresholds = (eth) => eth === "asian" ? { uw: 18.5, normal: 23, ow: 27.5 } : { uw: 18.5, normal: 25, ow: 30 };
  const getBMIColor = (bmi, eth) => { const t = getThresholds(eth); if (bmi < t.uw) return "#38bdf8"; if (bmi < t.normal) return "#10b981"; if (bmi < t.ow) return "#f59e0b"; if (bmi < 35) return "#f97316"; return "#ef4444"; };
  const getBMICategory = (bmi, eth) => { const t = getThresholds(eth); if (bmi < t.uw) return { label: "Underweight", cls: null }; if (bmi < t.normal) return { label: "Healthy Weight", cls: null }; if (bmi < t.ow) return { label: "Overweight", cls: null }; if (bmi < 35) return { label: "Obese", cls: "Class 1 — Moderate" }; if (bmi < 40) return { label: "Obese", cls: "Class 2 — Severe" }; return { label: "Obese", cls: "Class 3 — Very Severe" }; };
  const getScalePos = (bmi) => Math.min(Math.max(((bmi - 15) / 30) * 100, 2), 98);
  const getHealthyRange = (hM) => ({ lbs: `${(18.5 * hM * hM * 2.205).toFixed(0)} – ${(24.9 * hM * hM * 2.205).toFixed(0)} lbs`, kg: `${(18.5 * hM * hM).toFixed(1)} – ${(24.9 * hM * hM).toFixed(1)} kg` });
  const getRisks = (bmi, eth) => { const t = getThresholds(eth); if (bmi < t.uw) return [{t:"Malnutrition and vitamin or mineral deficiencies",c:"#38bdf8"},{t:"Weakened immune system and increased infection risk",c:"#38bdf8"},{t:"Osteoporosis and reduced bone density over time",c:"#38bdf8"},{t:"Hormonal imbalances that may affect fertility",c:"#38bdf8"}]; if (bmi < t.normal) return [{t:"You are in the healthy weight range — keep up your balanced habits",c:"#10b981"},{t:"Regular health check-ups are recommended at any weight",c:"#10b981"},{t:"BMI is just one indicator — waist size and fitness level also matter",c:"#10b981"}]; if (bmi < t.ow) return [{t:"Increased risk of Type 2 diabetes",c:"#f59e0b"},{t:"Higher blood pressure and cardiovascular risk",c:"#f59e0b"},{t:"Greater likelihood of sleep apnea",c:"#f59e0b"},{t:"Increased joint stress especially in knees and hips",c:"#f59e0b"}]; return [{t:"Significantly elevated risk of Type 2 diabetes",c:"#ef4444"},{t:"High blood pressure and heart disease",c:"#ef4444"},{t:"Increased risk of certain cancers",c:"#ef4444"},{t:"Sleep apnea and breathing problems",c:"#ef4444"},{t:"Joint disease and reduced mobility",c:"#ef4444"}]; };
  const getSteps = (bmi, eth) => { const t = getThresholds(eth); if (bmi < t.uw) return [{h:"Speak with your doctor",d:"Unexplained low weight can indicate underlying conditions. A doctor can identify causes and create a safe weight gain plan."},{h:"Increase calorie-dense whole foods",d:"Focus on nuts, avocados, whole grains, lean proteins and healthy oils — not just high-calorie processed foods."},{h:"Check your nutrient intake",d:"Use our Vitamin & Mineral Calculator to identify deficiencies common in underweight individuals."},{h:"Consider resistance training",d:"Building muscle mass is a healthy and sustainable way to increase body weight over time."}]; if (bmi < t.normal) return [{h:"Maintain your healthy habits",d:"Whatever you're doing is working. Focus on sustainable nutrition and regular physical activity."},{h:"Track your nutrient intake",d:"A healthy weight doesn't guarantee optimal nutrition. Use our Vitamin & Mineral Calculator."},{h:"Monitor waist circumference",d:"Even at a healthy BMI, carrying excess abdominal fat increases health risk significantly."},{h:"Prioritize sleep quality",d:"Poor sleep disrupts metabolism and weight regulation over time. Use our Sleep Cycle Calculator."}]; if (bmi < t.ow) return [{h:"Focus on small sustainable changes",d:"A 5–10% reduction in body weight can significantly reduce health risks without drastic measures."},{h:"Reduce ultra-processed foods",d:"Increase vegetables, lean proteins and whole grains. Cut back on processed and fast food."},{h:"Add regular movement",d:"Aim for 150 minutes of moderate activity per week. Walking absolutely counts."},{h:"Consider intermittent fasting",d:"Many people find structured eating windows helpful. Use our Intermittent Fasting Calculator to find the right protocol."}]; return [{h:"Consult your doctor",d:"At this BMI level medical guidance is important. Your doctor can rule out underlying conditions and discuss safe options."},{h:"Set realistic small goals",d:"Losing just 5–10% of body weight produces measurable improvements in blood pressure, blood sugar and energy."},{h:"Address sleep and stress",d:"Poor sleep and chronic stress drive weight gain through hormones. Use our Sleep Cycle and Stress & Burnout tools."},{h:"Consider professional support",d:"A registered dietitian can create a safe personalized plan. Medical interventions may also be appropriate to discuss."}]; };
  const getWaistRisk = (waistCm, s) => { if (!waistCm || !s) return null; if (s === "male") { if (waistCm < 94) return {status:"Low Risk",color:"#10b981"}; if (waistCm < 102) return {status:"Increased Risk",color:"#f59e0b"}; return {status:"High Risk",color:"#ef4444"}; } if (waistCm < 80) return {status:"Low Risk",color:"#10b981"}; if (waistCm < 88) return {status:"Increased Risk",color:"#f59e0b"}; return {status:"High Risk",color:"#ef4444"}; };
  const getPICategory = (pi) => { if (pi < 11) return {label:"Underweight",color:"#38bdf8"}; if (pi < 14) return {label:"Healthy",color:"#10b981"}; if (pi < 17) return {label:"Overweight",color:"#f59e0b"}; return {label:"Obese",color:"#ef4444"}; };

  const calculate = () => {
    const errs = {};
    let hM, wKg;
    if (unit === "imperial") {
      const ft = parseFloat(heightFt), ins = parseFloat(heightIn) || 0, lbs = parseFloat(weightLbs);
      if (!heightFt || isNaN(ft) || ft < 1 || ft > 8) errs.height = "Enter a valid height";
      if (!weightLbs || isNaN(lbs) || lbs < 50 || lbs > 700) errs.weight = "Enter a valid weight (50–700 lbs)";
      if (!Object.keys(errs).length) { hM = ((ft * 12) + ins) * 0.0254; wKg = lbs * 0.453592; }
    } else {
      const cm = parseFloat(heightCm), kg = parseFloat(weightKg);
      if (!heightCm || isNaN(cm) || cm < 50 || cm > 250) errs.height = "Enter a valid height (50–250 cm)";
      if (!weightKg || isNaN(kg) || kg < 20 || kg > 300) errs.weight = "Enter a valid weight (20–300 kg)";
      if (!Object.keys(errs).length) { hM = cm / 100; wKg = kg; }
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const bmi = wKg / (hM * hM);
    const pi = wKg / (hM * hM * hM);
    const waistCm = waist ? (waistUnit === "inches" ? parseFloat(waist) * 2.54 : parseFloat(waist)) : null;
    const midH = hM * hM * 21.7;
    const diff = wKg - midH;
    setResults({ bmi, pi, hM, wKg, category: getBMICategory(bmi, ethnicity), color: getBMIColor(bmi, ethnicity), hwRange: getHealthyRange(hM), risks: getRisks(bmi, ethnicity), steps: getSteps(bmi, ethnicity), waistRisk: getWaistRisk(waistCm, sex), piCat: getPICategory(pi), diffLbs: diff * 2.205 });
  };

  return (
    <div className="app">
      <S />
      {/* NAV — BMI excluded (current page) */}
      <nav>
        <a href="/" className="nav-brand">
          <div className="nav-pulse">
            <svg viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="pg" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#38bdf8"/></linearGradient></defs>
              <polyline points="0,10 8,10 10,4 12,16 14,8 16,12 18,10 32,10" stroke="url(#pg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          The Body HQ
        </a>
        <div className="nav-links">
          <a href="/sleep" className="nav-link">🌙 Sleep Cycle</a>
          <a href="/nutrients" className="nav-link">💊 Vitamin & Mineral</a>
          <a href="/fasting" className="nav-link">⏰ Intermittent Fasting</a>
          <a href="/pregnancy" className="nav-link">🤰 Pregnancy Due Date</a>
          <a href="/burnout" className="nav-link">🧠 Stress & Burnout</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a href="/sleep" className="mobile-link" onClick={() => setMenuOpen(false)}>🌙 Sleep Cycle</a>
        <a href="/nutrients" className="mobile-link" onClick={() => setMenuOpen(false)}>💊 Vitamin & Mineral</a>
        <a href="/fasting" className="mobile-link" onClick={() => setMenuOpen(false)}>⏰ Intermittent Fasting</a>
        <a href="/pregnancy" className="mobile-link" onClick={() => setMenuOpen(false)}>🤰 Pregnancy Due Date</a>
        <a href="/burnout" className="mobile-link" onClick={() => setMenuOpen(false)}>🧠 Stress & Burnout</a>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg"/>
        <img src="/bmi-icon.png" alt="BMI Calculator" className="hero-icon"/>
        <h1>BMI Calculator</h1>
        <p className="hero-sub">Calculate your Body Mass Index, understand what it really means, and get honest personalized guidance on your next steps.</p>
        <div className="badges">
          <span className="badge">Science-Based</span>
          <span className="badge">Ethnicity Adjusted</span>
          <span className="badge">Includes Ponderal Index</span>
          <span className="badge">100% Free</span>
        </div>
      </div>

      <div className="main">
        {!results ? (
          <div className="card">
            <div className="card-title">Enter Your Details</div>
            <div className="card-sub">Height and weight are required. All other fields are optional but improve accuracy.</div>
            <div className="unit-toggle">
              <button className={`ut-btn${unit === "imperial" ? " active" : ""}`} onClick={() => setUnit("imperial")}>Imperial (lbs / ft)</button>
              <button className={`ut-btn${unit === "metric" ? " active" : ""}`} onClick={() => setUnit("metric")}>Metric (kg / cm)</button>
            </div>
            <div className="form-grid">
              <div className={`fg${errors.height ? " error" : ""}`}>
                <label>Height</label>
                {unit === "imperial" ? (
                  <div className="ht-row">
                    <input type="number" placeholder="ft" value={heightFt} onChange={e => setHeightFt(e.target.value)} min="1" max="8"/>
                    <input type="number" placeholder="in" value={heightIn} onChange={e => setHeightIn(e.target.value)} min="0" max="11"/>
                  </div>
                ) : (
                  <input type="number" placeholder="cm" value={heightCm} onChange={e => setHeightCm(e.target.value)}/>
                )}
                {errors.height && <div className="err-msg">{errors.height}</div>}
              </div>
              <div className={`fg${errors.weight ? " error" : ""}`}>
                <label>Weight</label>
                <input type="number" placeholder={unit === "imperial" ? "lbs" : "kg"} value={unit === "imperial" ? weightLbs : weightKg} onChange={e => unit === "imperial" ? setWeightLbs(e.target.value) : setWeightKg(e.target.value)}/>
                {errors.weight && <div className="err-msg">{errors.weight}</div>}
              </div>
              <div className="fg">
                <label>Sex (optional)</label>
                <select value={sex} onChange={e => setSex(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="fg">
                <label>Ethnic Background (optional)</label>
                <select value={ethnicity} onChange={e => setEthnicity(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="asian">Asian (adjusted thresholds)</option>
                  <option value="black">Black African / Caribbean</option>
                </select>
              </div>
              {(ethnicity === "asian" || ethnicity === "black") && (
                <div className="fg full">
                  <div className="eth-note">
                    {ethnicity === "asian" ? "ℹ️ People of Asian descent develop obesity-related health risks at lower BMI levels. This calculator uses adjusted thresholds supported by international health research: Overweight at 23+, Obese at 27.5+." : "ℹ️ Research suggests standard BMI thresholds may overestimate obesity-related risk for people of Black African or African-Caribbean descent. Results are shown with standard thresholds — discuss with your doctor for personalized guidance."}
                  </div>
                </div>
              )}
              <div className="fg">
                <label>Waist Size (optional)</label>
                <input type="number" placeholder={waistUnit === "inches" ? "inches" : "cm"} value={waist} onChange={e => setWaist(e.target.value)}/>
              </div>
              <div className="fg">
                <label>Waist Unit</label>
                <select value={waistUnit} onChange={e => setWaistUnit(e.target.value)}>
                  <option value="inches">Inches</option>
                  <option value="cm">Centimeters</option>
                </select>
              </div>
            </div>
            <button className="btn-calc" onClick={calculate}>Calculate My BMI →</button>
          </div>
        ) : (
          <>
            <div className="card" style={{ borderColor: results.color + "40", background: results.color + "10" }}>
              <div className="bmi-hero">
                <div className="bmi-num" style={{ color: results.color }}>{results.bmi.toFixed(1)}</div>
                <div className="bmi-cat" style={{ color: results.color }}>{results.category.label}</div>
                {results.category.cls && <div className="bmi-class">{results.category.cls}</div>}
              </div>
              <div className="scale-wrap">
                <div className="scale-bar"><div className="scale-pin" style={{ left: `${getScalePos(results.bmi)}%` }}/></div>
                <div className="scale-lbls"><span>Underweight</span><span>Healthy</span><span>Overweight</span><span>Obese</span></div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Your Numbers</div>
              <div className="stats-grid">
                <div className="stat"><div className="stat-lbl">Your BMI</div><div className="stat-val" style={{ color: results.color }}>{results.bmi.toFixed(1)}</div><div className="stat-sub">kg/m²</div></div>
                <div className="stat"><div className="stat-lbl">Healthy Weight Range</div><div className="stat-val" style={{ fontSize: "14px", marginTop: "4px" }}>{results.hwRange.lbs}</div><div className="stat-sub">{results.hwRange.kg}</div></div>
                <div className="stat"><div className="stat-lbl">To Reach Healthy BMI</div><div className="stat-val" style={{ fontSize: "14px", marginTop: "4px" }}>{Math.abs(results.diffLbs) < 4 ? "✓ At target weight" : results.diffLbs > 0 ? `Lose ${results.diffLbs.toFixed(0)} lbs` : `Gain ${Math.abs(results.diffLbs).toFixed(0)} lbs`}</div><div className="stat-sub">to reach mid-healthy BMI</div></div>
                <div className="stat"><div className="stat-lbl">Category</div><div className="stat-val" style={{ fontSize: "14px", marginTop: "4px", color: results.color }}>{results.category.label}</div><div className="stat-sub">{results.category.cls || "Standard classification"}</div></div>
              </div>
              {results.bmi >= 30 && (
                <div className="ob-box">
                  <div className="ob-title">📌 Obesity Classifications Explained</div>
                  <div className="ob-desc">Obesity is divided into three classes based on health risk:<br/><strong style={{ color: "#fca5a5" }}>Class 1 (BMI 30–34.9) — Moderate:</strong> Lifestyle changes and medical support recommended.<br/><strong style={{ color: "#fca5a5" }}>Class 2 (BMI 35–39.9) — Severe:</strong> Medical intervention is often recommended.<br/><strong style={{ color: "#fca5a5" }}>Class 3 (BMI 40+) — Very Severe:</strong> Also called morbid obesity. Medical treatment is strongly advised.</div>
                </div>
              )}
              {results.waistRisk && (
                <div className="waist-box">
                  <div><div className="stat-lbl">Waist Circumference Risk</div><div className="waist-hint">{sex === "male" ? "Men: Low <94cm | Increased 94–102cm | High >102cm" : "Women: Low <80cm | Increased 80–88cm | High >88cm"}</div></div>
                  <div className="waist-status" style={{ color: results.waistRisk.color }}>{results.waistRisk.status}</div>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-title">🔬 Ponderal Index</div>
              <div className="pi-box">
                <div className="pi-title">Your Ponderal Index (PI)</div>
                <div className="pi-num" style={{ color: results.piCat.color }}>{results.pi.toFixed(2)}</div>
                <div className="pi-cat" style={{ color: results.piCat.color }}>{results.piCat.label}</div>
                <div className="pi-ranges">
                  <div className="pi-range"><div className="pi-range-val" style={{ color: "#38bdf8" }}>Below 11</div><div className="pi-range-lbl">Underweight</div></div>
                  <div className="pi-range"><div className="pi-range-val" style={{ color: "#10b981" }}>11 – 14</div><div className="pi-range-lbl">Healthy</div></div>
                  <div className="pi-range"><div className="pi-range-val" style={{ color: "#f59e0b" }}>14 – 17</div><div className="pi-range-lbl">Overweight</div></div>
                  <div className="pi-range"><div className="pi-range-val" style={{ color: "#ef4444" }}>17+</div><div className="pi-range-lbl">Obese</div></div>
                </div>
                <div className="pi-explain"><strong>What is the Ponderal Index?</strong><br/><br/>The Ponderal Index is an alternative to BMI that divides your weight by height <em>cubed</em> (kg/m³) instead of squared (kg/m²). This makes it more accurate for people who are very tall or very short — where BMI can give misleading results.<br/><br/><strong>Why does the cube matter?</strong><br/>BMI treats height as a flat two-dimensional measure. But human bodies are three-dimensional. The Ponderal Index corrects for this — a very tall person with normal body fat won't be incorrectly labeled as overweight the way BMI sometimes does.<br/><br/><strong>Is it better than BMI?</strong><br/>For people at height extremes, yes — it can be more accurate. But BMI remains the global medical standard used by doctors and researchers worldwide. Use both numbers together for the most complete picture.</div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">⚕️ Health Considerations</div>
              <div style={{ marginBottom: "16px" }}>{results.risks.map((r, i) => (<div key={i} className="risk-item"><div className="risk-dot" style={{ background: r.c }}/><div className="risk-txt">{r.t}</div></div>))}</div>
              <div className="limit-box">
                <div className="limit-title">⚠️ Important Limitations of BMI</div>
                <ul className="limit-list">
                  <li><strong>Muscle mass:</strong> Athletes often have a high BMI despite very low body fat. BMI cannot distinguish muscle from fat.</li>
                  <li><strong>Age:</strong> Older adults lose muscle over time — a normal BMI may still mean excess body fat.</li>
                  <li><strong>Sex:</strong> At the same BMI, women typically have about 10% more body fat than men.</li>
                  <li><strong>Ethnicity:</strong> Different ethnic groups have different body composition at the same BMI — which is why we offer adjusted thresholds above.</li>
                  <li><strong>Fat distribution:</strong> Where you carry fat matters more than how much you have. Abdominal fat is far more dangerous than fat stored elsewhere — which is why waist measurement is so important.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-title">🎯 Your Personalized Next Steps</div>
              {results.steps.map((s, i) => (<div key={i} className="step-item"><div className="step-n">{i + 1}</div><div className="step-txt"><strong>{s.h}</strong> — {s.d}</div></div>))}
              <div className="tools-grid">
                <a href="/nutrients" className="tl"><div className="tl-name">💊 Vitamin & Mineral Calculator</div><div className="tl-desc">Get personalized daily nutrient targets</div></a>
                <a href="/sleep" className="tl"><div className="tl-name">🌙 Sleep Cycle Calculator</div><div className="tl-desc">Sleep quality directly affects weight</div></a>
                <a href="/fasting" className="tl"><div className="tl-name">⏰ Intermittent Fasting Calculator</div><div className="tl-desc">Find your ideal eating window</div></a>
                <a href="/burnout" className="tl"><div className="tl-name">🧠 Stress & Burnout Score</div><div className="tl-desc">Stress hormones directly drive weight gain</div></a>
              </div>
              <div className="disclaimer">⚕️ <strong>Medical Disclaimer:</strong> This BMI calculator is for general educational purposes only and is not a substitute for professional medical advice. BMI is a screening tool — not a diagnosis. Always consult a qualified healthcare provider before making changes based on your BMI result.</div>
              <button className="btn-reset" onClick={() => setResults(null)}>← Calculate Again</button>
            </div>

          </>
        )}
      </div>

      {/* SEO SECTION — always visible */}
      <div className="seo-section" style={{maxWidth:'660px',margin:'0 auto',padding:'0 16px 48px'}}>
        <div className="seo-card">
          <h2>What Is a BMI Calculator?</h2>
          <p>A BMI calculator measures your <strong>Body Mass Index</strong> — a number calculated from your height and weight that gives a general indication of whether you are underweight, at a healthy weight, overweight, or obese. It is one of the most widely used health screening tools in the world because it is free, instant, and requires no specialist equipment.</p>
          <p>The Body HQ BMI Calculator goes beyond a simple number. It includes <strong>ethnicity-adjusted thresholds</strong>, waist circumference risk assessment, the Ponderal Index as an alternative measure, obesity class breakdown, personalized health risk information, and practical next steps based on your result — all completely free.</p>
          <p>BMI was developed in the 1830s by Belgian mathematician Adolphe Quetelet and has been used as a population health tool for decades. Despite its age and known limitations, it remains the starting point for most weight-related health conversations between patients and their doctors.</p>
        </div>
        <div className="seo-card">
          <h2>How the BMI Calculator Works</h2>
          <div className="how-step"><div className="how-num">1</div><div className="how-txt"><strong>Choose your measurement unit</strong> — select Imperial (feet, inches, pounds) or Metric (centimeters, kilograms) depending on what you're comfortable with.</div></div>
          <div className="how-step"><div className="how-num">2</div><div className="how-txt"><strong>Enter your height and weight</strong> — these are the only two required fields. Everything else is optional but improves the accuracy and personalization of your results.</div></div>
          <div className="how-step"><div className="how-num">3</div><div className="how-txt"><strong>Add optional details</strong> — your sex, ethnic background, and waist circumference allow the calculator to give you adjusted thresholds and a waist risk assessment alongside your BMI.</div></div>
          <div className="how-step"><div className="how-num">4</div><div className="how-txt"><strong>Review your results</strong> — see your BMI number, category, healthy weight range, obesity class if applicable, Ponderal Index, and waist circumference risk all in one place.</div></div>
          <div className="how-step"><div className="how-num">5</div><div className="how-txt"><strong>Read your personalized next steps</strong> — based on your result you receive specific, actionable guidance tailored to your BMI category along with links to other tools that support your health goals.</div></div>
        </div>
        <div className="seo-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item"><div className="faq-q">What is a healthy BMI for adults?</div><div className="faq-a">For most adults a BMI between <strong>18.5 and 24.9</strong> is considered a healthy weight. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is obese. However these thresholds are adjusted for people of Asian descent — overweight begins at 23 and obese at 27.5 due to evidence that health risks appear at lower BMI levels in this population.</div></div>
          <div className="faq-item"><div className="faq-q">Is BMI accurate for athletes and muscular people?</div><div className="faq-a">No — BMI is one of its least accurate for athletes and highly muscular individuals. Because muscle weighs more than fat, a very muscular person can have a <strong>high BMI while having very low body fat</strong>. This is a well-known limitation of BMI and why it should always be used alongside other measures like waist circumference and body fat percentage.</div></div>
          <div className="faq-item"><div className="faq-q">How is BMI calculated?</div><div className="faq-a">BMI is calculated by dividing your weight in kilograms by your height in meters squared: <strong>BMI = kg ÷ m²</strong>. For imperial measurements the formula is: weight in pounds multiplied by 703, then divided by height in inches squared. This calculator handles all the math — just enter your details and click Calculate.</div></div>
          <div className="faq-item"><div className="faq-q">What is the Ponderal Index and how is it different from BMI?</div><div className="faq-a">BMI divides weight by height squared (kg/m²). The Ponderal Index divides weight by height <strong>cubed</strong> (kg/m³). This makes it more accurate for people who are very tall or very short — where BMI tends to overestimate fatness in taller people and underestimate it in shorter people. A healthy Ponderal Index falls between 11 and 14. Both numbers are shown in your results so you can compare them.</div></div>
          <div className="faq-item"><div className="faq-q">Why does ethnicity affect BMI interpretation?</div><div className="faq-a">Research shows that people of Asian descent develop obesity-related health risks — including Type 2 diabetes and cardiovascular disease — at <strong>lower BMI levels than people of European descent</strong>. International health guidance recommends lower thresholds for Asian populations — overweight at 23 and obese at 27.5 rather than the standard 25 and 30. This is why our calculator offers ethnicity-adjusted results.</div></div>
          <div className="faq-item"><div className="faq-q">What does waist circumference tell me that BMI doesn't?</div><div className="faq-a">Waist circumference measures <strong>abdominal visceral fat</strong> — the fat stored around your organs that is far more dangerous than fat stored under the skin elsewhere. Two people can have the same BMI but very different waist sizes and health risks. For men a waist over 102cm (40 inches) indicates high risk. For women the threshold is 88cm (35 inches). Adding your waist measurement gives you a much more complete picture of your health.</div></div>
          <div className="faq-item"><div className="faq-q">Can I use this BMI calculator if I have diabetes?</div><div className="faq-a">Yes — this calculator is safe to use with any health condition. However if you have Type 2 diabetes, your weight management goals and safe ranges may differ from standard BMI recommendations. <strong>Always consult your doctor or a registered dietitian</strong> before making changes to your diet or exercise routine based on your BMI result. BMI is a screening tool, not a medical diagnosis.</div></div>
        </div>
        <div className="int-box">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="tools-grid">
            <a href="/nutrients" className="tl"><div className="tl-name">💊 Vitamin & Mineral Calculator</div><div className="tl-desc">40+ personalized daily nutrient targets</div></a>
            <a href="/fasting" className="tl"><div className="tl-name">⏰ Intermittent Fasting Calculator</div><div className="tl-desc">Find your ideal fasting protocol</div></a>
            <a href="/sleep" className="tl"><div className="tl-name">🌙 Sleep Cycle Calculator</div><div className="tl-desc">Perfect bedtime based on 90-minute cycles</div></a>
            <a href="/burnout" className="tl"><div className="tl-name">🧠 Stress & Burnout Score</div><div className="tl-desc">12-question stress and burnout assessment</div></a>
          </div>
        </div>
        <div className="disclaimer">⚕️ <strong>Medical Disclaimer:</strong> The information provided by this BMI calculator is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. BMI is a screening tool and should be interpreted alongside other health indicators. Always consult a qualified healthcare provider with questions about your weight or overall health.</div>
      </div>
    </div>
  );
}
