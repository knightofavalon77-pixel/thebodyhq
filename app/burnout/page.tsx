'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#060d0f;--card:#0a1518;--card2:#0f1e22;--border:#142830;
      --teal:#14b8a6;--teal-lt:#5eead4;--teal-dim:#0d6b61;
      --blue:#3b82f6;--purple:#8b5cf6;--green:#10b981;
      --yellow:#f59e0b;--orange:#f97316;--red:#ef4444;
      --text:#f0fdfa;--muted:#4d7c78;--soft:#99f6e4;
      --glow:rgba(20,184,166,.12);
    }
    body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
    .app{min-height:100vh}

    /* HERO */
    .hero{background:linear-gradient(160deg,#060d0f 0%,#091518 60%,#060d0f 100%);
      padding:44px 20px 36px;text-align:center;position:relative;overflow:hidden;
      border-bottom:1px solid var(--border)}
    .hero::before{content:'';position:absolute;inset:0;
      background:radial-gradient(ellipse at 50% 0%,rgba(20,184,166,.1) 0%,transparent 65%)}
    .hero-icon{font-size:52px;display:block;margin-bottom:14px;position:relative;
      filter:drop-shadow(0 0 24px rgba(20,184,166,.5))}
    .hero h1{font-family:'Syne',sans-serif;font-size:clamp(22px,4vw,36px);font-weight:800;
      color:var(--text);position:relative;line-height:1.2}
    .hero h1 span{background:linear-gradient(135deg,var(--teal-lt),var(--blue));
      -webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .hero-sub{font-size:16px;color:var(--muted);margin-top:9px;position:relative;line-height:1.6}
    .badges{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:14px;position:relative}
    .badge{background:rgba(20,184,166,.1);border:1px solid rgba(20,184,166,.2);
      color:var(--teal);font-size:16px;padding:3px 11px;border-radius:20px;font-weight:600}

    /* PROGRESS */
    .progress-bar-wrap{background:var(--card);border-bottom:1px solid var(--border);padding:12px 20px}
    .progress-info{display:flex;justify-content:space-between;font-size:14px;color:var(--muted);margin-bottom:7px;font-weight:600}
    .progress-track{height:4px;background:var(--border);border-radius:2px;overflow:hidden}
    .progress-fill{height:100%;background:linear-gradient(90deg,var(--teal-dim),var(--teal));border-radius:2px;transition:width .4s ease}

    /* MAIN */
    .main{max-width:620px;margin:0 auto;padding:22px 16px 40px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:14px}
    .card-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .card-sub{font-size:15px;color:var(--muted);margin-bottom:18px;line-height:1.5}

    /* QUESTION */
    .q-number{font-size:16px;font-weight:700;color:var(--teal);text-transform:uppercase;
      letter-spacing:.7px;margin-bottom:8px}
    .q-text{font-size:15px;font-weight:600;color:var(--text);line-height:1.5;margin-bottom:20px}
    .q-category{font-size:16px;color:var(--muted);font-weight:500;margin-bottom:16px}
    .options{display:flex;flex-direction:column;gap:8px}
    .option{display:flex;align-items:center;gap:12px;padding:12px 14px;
      background:var(--card2);border:1.5px solid var(--border);border-radius:10px;
      cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
    .option:hover{border-color:var(--teal-dim)}
    .option.sel{background:rgba(20,184,166,.1);border-color:var(--teal);
      box-shadow:0 0 0 2px rgba(20,184,166,.1)}
    .option-dot{width:18px;height:18px;border-radius:50%;border:2px solid var(--border);
      flex-shrink:0;transition:all .2s;display:flex;align-items:center;justify-content:center}
    .option.sel .option-dot{background:var(--teal);border-color:var(--teal)}
    .option-dot::after{content:'✓';font-size:16px;color:#fff;opacity:0;transition:opacity .2s}
    .option.sel .option-dot::after{opacity:1}
    .option-label{font-size:16px;font-weight:500;color:var(--muted);flex:1}
    .option.sel .option-label{color:var(--teal-lt)}
    .option-score{font-size:14px;color:var(--border);font-weight:600;min-width:20px;text-align:right}
    .option.sel .option-score{color:var(--teal-dim)}

    /* NAV */
    .nav-row{display:flex;gap:10px;margin-top:20px}
    .btn{flex:1;padding:12px;border-radius:10px;border:none;
      font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;
      cursor:pointer;transition:all .2s;letter-spacing:.3px}
    .btn-back{background:var(--card2);color:var(--soft);border:1px solid var(--border);flex:0.4}
    .btn-next{background:linear-gradient(135deg,var(--teal-dim),var(--teal));color:#fff;
      box-shadow:0 4px 16px rgba(20,184,166,.3)}
    .btn-next:hover{transform:translateY(-1px)}
    .btn-next:disabled{opacity:.3;cursor:not-allowed;transform:none}
    .btn-submit{background:linear-gradient(135deg,var(--teal-dim),var(--teal));color:#fff;
      box-shadow:0 4px 20px rgba(20,184,166,.35);width:100%;padding:14px;font-size:14px;margin-top:6px}
    .btn-reset{background:var(--card2);color:var(--soft);border:1px solid var(--border);width:100%;margin-top:12px}

    /* RESULTS */
    .score-ring{display:flex;flex-direction:column;align-items:center;
      padding:28px 20px;border-radius:14px;margin-bottom:14px;position:relative;overflow:hidden}
    .score-number{font-family:'Syne',sans-serif;font-size:72px;font-weight:800;line-height:1;margin-bottom:4px}
    .score-label-main{font-size:16px;color:rgba(255,255,255,.7);margin-bottom:10px}
    .score-status{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:6px}
    .score-desc{font-size:16px;opacity:.8;line-height:1.5;text-align:center;max-width:320px}

    /* CATEGORY BARS */
    .cat-bars{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
    .cat-bar-item{background:var(--card);border:1px solid var(--border);border-radius:11px;padding:14px}
    .cat-bar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .cat-bar-name{font-size:15px;font-weight:700;color:var(--soft)}
    .cat-bar-score{font-size:15px;font-weight:700}
    .cat-bar-track{height:8px;background:var(--border);border-radius:4px;overflow:hidden}
    .cat-bar-fill{height:100%;border-radius:4px;transition:width .6s ease}
    .cat-bar-desc{font-size:14px;color:var(--muted);margin-top:6px;line-height:1.4}

    /* RECOMMENDATIONS */
    .rec-list{display:flex;flex-direction:column;gap:8px}
    .rec-item{display:flex;gap:12px;padding:13px;
      background:var(--card2);border:1px solid var(--border);border-radius:10px;align-items:flex-start}
    .rec-icon{font-size:20px;flex-shrink:0;margin-top:1px}
    .rec-title{font-size:15px;font-weight:700;color:var(--soft);margin-bottom:3px}
    .rec-desc{font-size:14px;color:var(--muted);line-height:1.5}

    .disclaimer{background:var(--card2);border-radius:10px;padding:12px 14px;
      font-size:14px;color:var(--muted);line-height:1.6;margin-top:4px}
    @media(max-width:480px){.nav-row{flex-direction:column}.btn-back{flex:1}}

    .seo-wrap{max-width:640px;margin:0 auto;padding:0 16px 48px}
    .seo-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;margin-bottom:20px}
    .seo-card h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text);margin-bottom:14px}
    .seo-card p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:14px}
    .seo-card p:last-child{margin-bottom:0}
    .seo-card strong{color:var(--text)}
    .seo-step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .seo-num{background:#14b8a6;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0;margin-top:2px}
    .seo-txt{font-size:16px;color:var(--muted);line-height:1.7}
    .seo-txt strong{color:var(--text)}
    .seo-faq{border-bottom:1px solid var(--border);padding:16px 0}
    .seo-faq:last-child{border-bottom:none;padding-bottom:0}
    .seo-faq-q{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
    .seo-faq-a{font-size:15px;color:var(--muted);line-height:1.7}
    .seo-faq-a strong{color:var(--text)}
    .seo-links{background:rgba(20,184,166,.08);border:1px solid rgba(20,184,166,.25);border-radius:16px;padding:24px;margin-bottom:20px}
    .seo-links h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#14b8a6;margin-bottom:14px}
    .seo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .seo-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-decoration:none;transition:all .2s;display:block}
    .seo-link:hover{border-color:#14b8a6}
    .seo-link-name{font-size:15px;font-weight:600;color:var(--text)}
    .seo-link-desc{font-size:13px;color:var(--muted);margin-top:3px}
    .seo-disc{font-size:13px;color:var(--muted);line-height:1.6;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:20px}
    @media(max-width:480px){.seo-grid{grid-template-columns:1fr}}
  `}</style>
);

const QUESTIONS = [
  // Physical
  { id:1, cat:"Physical", text:"How often do you feel physically exhausted even after a full night of sleep?", options:[["Never — I wake up feeling rested",0],["Occasionally — once or twice a week",1],["Often — most mornings",2],["Almost always — I'm always tired",3]] },
  { id:2, cat:"Physical", text:"How frequently do you experience headaches, muscle tension, or physical pain that you'd attribute to stress?", options:[["Rarely or never",0],["A couple of times a month",1],["Weekly",2],["Several times a week",3]] },
  { id:3, cat:"Physical", text:"How has your sleep been recently?", options:[["Good — I fall asleep easily and sleep well",0],["Slightly disrupted — occasional bad nights",1],["Poor — frequent waking or trouble falling asleep",2],["Very poor — I dread bedtime or sleep most of the day",3]] },
  // Emotional
  { id:4, cat:"Emotional", text:"How often do you feel emotionally drained or empty at the end of the day?", options:[["Rarely — I generally feel okay",0],["Sometimes — after particularly hard days",1],["Often — most evenings",2],["Almost always — I feel nothing left",3]] },
  { id:5, cat:"Emotional", text:"How would you describe your mood over the past two weeks?", options:[["Generally positive and stable",0],["Up and down — some good days, some bad",1],["Mostly flat, irritable or anxious",2],["Consistently low, hopeless or numb",3]] },
  { id:6, cat:"Emotional", text:"How often do you feel detached from the people or things you usually care about?", options:[["Rarely — I stay connected to what matters",0],["Sometimes — I feel distant occasionally",1],["Often — I've withdrawn from people",2],["Most of the time — nothing feels meaningful",3]] },
  // Work & Productivity
  { id:7, cat:"Work & Productivity", text:"How would you rate your ability to concentrate and get things done compared to 6 months ago?", options:[["About the same or better",0],["Slightly reduced — small things take longer",1],["Noticeably reduced — I struggle to focus",2],["Severely reduced — I can barely start tasks",3]] },
  { id:8, cat:"Work & Productivity", text:"How do you feel about your workload?", options:[["Manageable — I can handle what's on my plate",0],["Stretched — it's a lot but I'm coping",1],["Overwhelming — I rarely feel on top of it",2],["Crushing — I feel completely underwater",3]] },
  { id:9, cat:"Work & Productivity", text:"How often do you feel a sense of dread or anxiety before starting the work day?", options:[["Rarely — I generally look forward to work",0],["Occasionally — maybe once a week",1],["Often — most mornings",2],["Almost every day",3]] },
  // Lifestyle
  { id:10, cat:"Lifestyle & Recovery", text:"How often do you make time for activities that restore you (hobbies, exercise, social connection)?", options:[["Regularly — several times a week",0],["Sometimes — a few times a month",1],["Rarely — I keep meaning to but don't",2],["Almost never — I have no energy for it",3]] },
  { id:11, cat:"Lifestyle & Recovery", text:"How often do you feel you need alcohol, caffeine or other substances to get through the day?", options:[["Never or rarely",0],["Occasionally",1],["Often",2],["Daily or almost daily",3]] },
  { id:12, cat:"Lifestyle & Recovery", text:"When did you last take time off and genuinely switch off from work and responsibilities?", options:[["Within the past month",0],["A few months ago",1],["Six months to a year ago",2],["I can't remember — or I can't switch off even on holiday",3]] },
];

const CATEGORIES = ["Physical","Emotional","Work & Productivity","Lifestyle & Recovery"];

function getResult(score: number) {
  if (score <= 8)  return { level:"Thriving", color:"#10b981", bg:"linear-gradient(135deg,#052e16,#14532d)", desc:"Your stress levels appear well managed. You have good resilience and recovery habits. Keep doing what you're doing — and stay aware of what's working.", recs:[
    { icon:"🌿", title:"Maintain your habits", desc:"Whatever you're doing is working. Protect your recovery routines — they're your armour against future stress." },
    { icon:"🔍", title:"Stay self-aware", desc:"Check in with yourself monthly. Burnout is easier to prevent than recover from." },
    { icon:"💪", title:"Build resilience", desc:"Consider adding meditation or breathwork to further strengthen your stress resilience." },
  ]};
  if (score <= 16) return { level:"Stressed", color:"#f59e0b", bg:"linear-gradient(135deg,#451a03,#78350f)", desc:"You're carrying a noticeable load. You're managing but your body and mind are showing signs of strain. Without some recovery, this level of stress can escalate.", recs:[
    { icon:"😴", title:"Prioritise sleep above everything", desc:"Sleep is your most powerful recovery tool. Protect 7–9 hours as non-negotiable." },
    { icon:"🚶", title:"Add daily movement", desc:"Even a 20-minute walk significantly reduces cortisol levels. It doesn't need to be intense." },
    { icon:"📵", title:"Create boundaries", desc:"Define one part of your day that is off-limits to work and notifications. Guard it fiercely." },
    { icon:"🗣️", title:"Talk to someone", desc:"A trusted friend, partner, or therapist can provide perspective and relief." },
  ]};
  if (score <= 24) return { level:"Burning Out", color:"#f97316", bg:"linear-gradient(135deg,#431407,#7c2d12)", desc:"You are in the warning zone. Multiple burnout indicators are present. This is your body and mind asking for help — please listen before it becomes a crisis.", recs:[
    { icon:"🛑", title:"Stop — this is serious", desc:"Burnout at this level doesn't resolve itself. You need to actively reduce your load, not just cope better." },
    { icon:"🏥", title:"Speak to your doctor", desc:"Physical symptoms of burnout can mimic or trigger other conditions. A medical check-up is worthwhile." },
    { icon:"📋", title:"Audit your commitments", desc:"Write down everything you're responsible for and identify what can be dropped, delegated, or delayed." },
    { icon:"🧘", title:"Start very small", desc:"You don't have energy for big changes. Start with one 10-minute restorative practice daily." },
  ]};
  return { level:"Full Burnout", color:"#ef4444", bg:"linear-gradient(135deg,#3b0000,#7f1d1d)", desc:"Your score indicates severe burnout. This is a health emergency, not a productivity problem. You cannot think or work your way out of this — you need support, rest, and professional help.", recs:[
    { icon:"🆘", title:"Please reach out for help today", desc:"Talk to your doctor, a therapist, or a trusted person in your life. Burnout at this level needs professional support." },
    { icon:"🛏️", title:"Rest is medicine right now", desc:"Your body is in a stress response. Rest is not laziness — it is the treatment." },
    { icon:"📞", title:"Consider speaking to HR or your manager", desc:"Many workplaces have support. You don't have to disclose everything — but reducing your load is critical." },
    { icon:"💙", title:"Be kind to yourself", desc:"Burnout is not weakness. It happens to capable, dedicated people. You deserve support." },
  ]};
}

function getCatColor(pct) {
  if (pct < 33) return { bar:"#10b981", text:"#10b981" };
  if (pct < 60) return { bar:"#f59e0b", text:"#f59e0b" };
  if (pct < 80) return { bar:"#f97316", text:"#f97316" };
  return { bar:"#ef4444", text:"#ef4444" };
}

export default function BurnoutCalc() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);

  const q = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;
  const pctDone = Math.round((currentQ / totalQ) * 100);

  const handleSelect = (score) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [q.id]: { score: selected, cat: q.cat } };
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate results
      const total = Object.values(newAnswers).reduce((s, a) => s + a.score, 0);
      const catScores = {};
      CATEGORIES.forEach(cat => {
        const catAnswers = Object.values(newAnswers).filter(a => a.cat === cat);
        const catTotal = catAnswers.reduce((s, a) => s + a.score, 0);
        const catMax = catAnswers.length * 3;
        catScores[cat] = { score: catTotal, max: catMax, pct: Math.round((catTotal / catMax) * 100) };
      });
      setResults({ total, max: totalQ * 3, catScores, result: getResult(total) });
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[QUESTIONS[currentQ - 1].id]?.score ?? null);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResults(null);
    setSelected(null);
  };

  return (
    <div className="app">
      <S />
      <div className="hero">
        <span className="hero-icon">🧠</span>
        <h1>Stress & <span>Burnout</span> Score</h1>
        <p className="hero-sub">A clinically informed 12-question assessment of your stress and burnout risk</p>
        <div className="badges">
          <span className="badge">🔬 12 Questions</span>
          <span className="badge">📊 4 Categories</span>
          <span className="badge">💙 Evidence Informed</span>
        </div>
      </div>

      {!results && (
        <div className="progress-bar-wrap">
          <div className="progress-info">
            <span>Question {currentQ + 1} of {totalQ}</span>
            <span>{pctDone}% complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pctDone}%` }} />
          </div>
        </div>
      )}

      <div className="main">
        {!results ? (
          <div className="card">
            <div className="q-number">Question {currentQ + 1} of {totalQ}</div>
            <div className="q-category">{q.cat}</div>
            <div className="q-text">{q.text}</div>
            <div className="options">
              {q.options.map(([label, score]) => (
                <div key={label} className={`option${selected===score?" sel":""}`} onClick={() => handleSelect(score)}>
                  <div className="option-dot" />
                  <div className="option-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="nav-row">
              {currentQ > 0 && <button className="btn btn-back" onClick={handleBack}>← Back</button>}
              <button className="btn btn-next" onClick={handleNext} disabled={selected===null}>
                {currentQ === totalQ - 1 ? "See My Score →" : "Next →"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="score-ring" style={{ background: results.result.bg }}>
              <div className="score-number" style={{ color: results.result.color }}>{results.total}</div>
              <div className="score-label-main">out of {results.max}</div>
              <div className="score-status" style={{ color: results.result.color }}>{results.result.level}</div>
              <div className="score-desc">{results.result.desc}</div>
            </div>

            <div className="card">
              <div className="card-title">Score by Category</div>
              <div className="card-sub">Where your stress is concentrated</div>
              <div className="cat-bars">
                {CATEGORIES.map(cat => {
                  const cs = results.catScores[cat];
                  const colors = getCatColor(cs.pct);
                  const label = cs.pct < 33 ? "Low stress" : cs.pct < 60 ? "Moderate" : cs.pct < 80 ? "High" : "Severe";
                  return (
                    <div key={cat} className="cat-bar-item">
                      <div className="cat-bar-header">
                        <span className="cat-bar-name">{cat}</span>
                        <span className="cat-bar-score" style={{ color: colors.text }}>{label} ({cs.score}/{cs.max})</span>
                      </div>
                      <div className="cat-bar-track">
                        <div className="cat-bar-fill" style={{ width: `${cs.pct}%`, background: colors.bar }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <div className="card-title">💙 Recommendations</div>
              <div className="card-sub">Based on your results</div>
              <div className="rec-list">
                {results.result.recs.map(r => (
                  <div key={r.title} className="rec-item">
                    <span className="rec-icon">{r.icon}</span>
                    <div>
                      <div className="rec-title">{r.title}</div>
                      <div className="rec-desc">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="disclaimer">⚕️ This assessment is based on validated burnout research but is not a clinical diagnosis. It is intended for self-reflection and educational purposes only. If you are experiencing a mental health crisis, please contact a healthcare professional or crisis line immediately. In the US, you can call or text 988 (Suicide & Crisis Lifeline) at any time.</div>
            <button className="btn btn-reset" onClick={reset}>← Retake Assessment</button>
          </>
        )}
      {/* SEO CONTENT */}
      <div className="seo-wrap">
        <div className="seo-card">
          <h2>What Is a Burnout Assessment?</h2>
          <p>A burnout assessment is a structured self-evaluation tool that helps you <strong>measure your current level of stress, exhaustion, and burnout</strong> across key areas of your life. Unlike a simple stress quiz, a well-designed burnout assessment examines multiple dimensions — physical symptoms, emotional depletion, cognitive performance, and lifestyle factors — to give you a complete picture of where you stand.</p>
          <p>Burnout is more than just feeling tired or stressed. According to the World Health Organization, burnout is an occupational phenomenon characterized by <strong>three core dimensions: emotional exhaustion, depersonalization, and reduced sense of personal accomplishment</strong>. It develops gradually through prolonged exposure to chronic stress without adequate recovery and can have serious consequences for both physical and mental health if left unaddressed.</p>
          <p>The Body HQ Stress and Burnout Score is a <strong>12-question evidence-informed assessment</strong> across four categories — Physical, Emotional, Work and Productivity, and Lifestyle and Recovery. Your results include a detailed breakdown by category, a personalized interpretation of your score, and practical recommendations tailored to your specific situation.</p>
        </div>

        <div className="seo-card">
          <h2>How the Stress and Burnout Assessment Works</h2>
          <div className="seo-step"><div className="seo-num">1</div><div className="seo-txt"><strong>Answer 12 questions honestly</strong> — each question asks about your experiences across the past 2 to 4 weeks. There are no right or wrong answers — the more honest you are the more useful your results will be.</div></div>
          <div className="seo-step"><div className="seo-num">2</div><div className="seo-txt"><strong>Rate each statement</strong> — choose from five response options ranging from Never to Always. Each response is weighted to give a nuanced picture of your situation.</div></div>
          <div className="seo-step"><div className="seo-num">3</div><div className="seo-txt"><strong>Complete all four categories</strong> — the assessment covers Physical symptoms, Emotional wellbeing, Work and Productivity, and Lifestyle and Recovery factors.</div></div>
          <div className="seo-step"><div className="seo-num">4</div><div className="seo-txt"><strong>Review your results</strong> — see your overall burnout score, a breakdown by category showing where you are most affected, and a detailed interpretation of what your score means.</div></div>
          <div className="seo-step"><div className="seo-num">5</div><div className="seo-txt"><strong>Read your personalized recommendations</strong> — based on your score level you receive specific, actionable steps you can take to reduce stress and begin recovering from burnout.</div></div>
        </div>

        <div className="seo-card">
          <h2>Frequently Asked Questions</h2>

          <div className="seo-faq">
            <div className="seo-faq-q">What are the signs of burnout?</div>
            <div className="seo-faq-a">The most common signs of burnout include <strong>chronic exhaustion that does not improve with rest</strong>, increased cynicism or detachment from work or relationships, reduced productivity despite working harder, physical symptoms like frequent headaches or illness, difficulty concentrating or making decisions, feeling emotionally numb or disconnected, and a loss of satisfaction from activities you previously enjoyed. Burnout develops gradually — most people do not recognize it until they are already significantly affected.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">What is the difference between stress and burnout?</div>
            <div className="seo-faq-a"><strong>Stress is characterized by urgency and over-engagement</strong> — too much pressure, too many demands, but still with the feeling that things could improve. <strong>Burnout is characterized by disengagement and emptiness</strong> — a sense that nothing matters, that you have nothing left to give. Stress feels like drowning in responsibilities. Burnout feels like running completely dry. Both are serious and both deserve attention, but burnout typically requires more significant lifestyle changes to recover from.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">How long does it take to recover from burnout?</div>
            <div className="seo-faq-a">Recovery from burnout is highly individual and depends on the severity of burnout and the changes made to address it. <strong>Mild to moderate burnout may improve within a few weeks</strong> with rest, boundary-setting, and lifestyle changes. Severe burnout can take months or even longer and may require professional support such as therapy or medical intervention. The most important factor is addressing the root causes rather than simply resting temporarily and returning to the same conditions.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">Can burnout cause physical health problems?</div>
            <div className="seo-faq-a">Yes — burnout has significant physical health consequences. Research has linked chronic burnout to <strong>increased risk of cardiovascular disease, impaired immune function, sleep disorders, gastrointestinal problems, and Type 2 diabetes</strong>. The chronic stress hormones released during prolonged burnout — particularly cortisol — cause measurable damage to the body when elevated for extended periods. Treating burnout is not just about mental health — it is a physical health necessity.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">When should I seek professional help for burnout?</div>
            <div className="seo-faq-a">You should seek professional help if your burnout symptoms are <strong>significantly affecting your ability to function</strong> at work or in relationships, if you experience persistent feelings of hopelessness or worthlessness, if you have thoughts of self-harm, or if lifestyle changes alone are not producing improvement after several weeks. A doctor can rule out underlying medical conditions and refer you to appropriate mental health support. Burnout is a legitimate health condition — seeking help is a sign of strength, not weakness.</div>
          </div>

          <div className="seo-faq">
            <div className="seo-faq-q">What are the most effective ways to prevent burnout?</div>
            <div className="seo-faq-a">The most effective burnout prevention strategies include <strong>setting clear boundaries between work and rest time</strong>, prioritizing quality sleep (use our Sleep Calculator to optimize your sleep schedule), regular physical movement, maintaining social connections, practicing regular stress management techniques, taking real breaks and vacations, and addressing workload issues proactively rather than waiting until they become overwhelming. Prevention is significantly easier than recovery.</div>
          </div>

        </div>

        <div className="seo-links">
          <h3>🌿 Explore More Free Health Tools</h3>
          <div className="seo-grid">
            <a href="/sleep" className="seo-link">
              <div className="seo-link-name">🌙 Sleep Cycle Calculator</div>
              <div className="seo-link-desc">Optimize your sleep schedule — critical for stress recovery</div>
            </a>
            <a href="/nutrients" className="seo-link">
              <div className="seo-link-name">💊 Vitamin & Mineral Calculator</div>
              <div className="seo-link-desc">Nutrition plays a key role in stress resilience and recovery</div>
            </a>
            <a href="/fasting" className="seo-link">
              <div className="seo-link-name">⏰ Intermittent Fasting Calculator</div>
              <div className="seo-link-desc">Structured eating patterns can support energy and mental clarity</div>
            </a>
            <a href="/pregnancy" className="seo-link">
              <div className="seo-link-name">🤰 Pregnancy Due Date Calculator</div>
              <div className="seo-link-desc">Calculate your due date and track pregnancy milestones</div>
            </a>
          </div>
        </div>

        <div className="seo-disc">⚕️ <strong>Medical Disclaimer:</strong> This assessment is an educational screening tool only and is not a clinical diagnostic instrument. It is not a substitute for professional mental health assessment or treatment. If you are experiencing symptoms of severe burnout, depression, anxiety, or have any thoughts of self-harm, please contact a qualified mental health professional or call a crisis helpline immediately. In the US, call or text 988 to reach the Suicide and Crisis Lifeline.</div>

      </div>
    </div>
  );
}
