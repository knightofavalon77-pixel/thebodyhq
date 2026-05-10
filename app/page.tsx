'use client';

import { useState, useEffect } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #13131f;
      --card:     #1a1a2e;
      --card2:    #1e1e3a;
      --border:   #2a2a45;
      --purple:   #7c3aed;
      --purp-lt:  #a78bfa;
      --cyan:     #38bdf8;
      --cyan-lt:  #7dd3fc;
      --white:    #f8fafc;
      --muted:    #94a3b8;
      --dim:      #64748b;
    }

    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

    /* ── NAV ── */
    nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(19,19,31,.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 0 24px;
      display: flex; align-items: center; justify-content: space-between;
      height: 64px;
    }
    .nav-brand {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-decoration: none;
    }
    .nav-pulse {
      width: 32px; height: 20px; position: relative;
    }
    .nav-pulse svg { width: 100%; height: 100%; }
    .nav-links { display: flex; gap: 4px; align-items: center; }
    .nav-link {
      padding: 6px 10px; border-radius: 8px; text-decoration: none;
      font-size: 13px; font-weight: 500; color: var(--muted);
      transition: all .2s; border: 1px solid transparent;
    }
    .nav-link:hover { color: var(--white); background: var(--card2); border-color: var(--border); }
    .nav-menu-btn {
      display: none; background: none; border: none; color: var(--white);
      font-size: 22px; cursor: pointer; padding: 4px;
    }
    .mobile-menu {
      display: none; position: fixed; inset: 64px 0 0;
      background: rgba(19,19,31,.98); z-index: 99;
      flex-direction: column; align-items: center; justify-content: center; gap: 16px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-link {
      font-size: 20px; font-weight: 600; color: var(--white);
      text-decoration: none; padding: 12px 32px; border-radius: 12px;
      border: 1px solid var(--border); width: 260px; text-align: center;
      transition: all .2s;
    }
    .mobile-link:hover { background: var(--card2); border-color: var(--purple); }

    /* ── HERO ── */
    .hero {
      position: relative; overflow: hidden;
      padding: 80px 24px 72px; text-align: center;
      min-height: 520px; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,.18) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 80% 30%, rgba(56,189,248,.12) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 50% 100%, rgba(124,58,237,.08) 0%, transparent 60%);
    }
    .hero-grid {
      position: absolute; inset: 0; z-index: 0; opacity: .06;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .hero-content { position: relative; z-index: 1; max-width: 720px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(124,58,237,.15); border: 1px solid rgba(124,58,237,.4);
      color: var(--purp-lt); font-size: 13px; font-weight: 600;
      padding: 6px 16px; border-radius: 20px; margin-bottom: 28px;
      letter-spacing: .3px;
    }
    .hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: var(--purp-lt); animation: blink 2s ease-in-out infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
    .hero h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(28px, 5vw, 52px);
      font-weight: 800; line-height: 1.1;
      color: var(--white); margin-bottom: 16px;
    }
    .hero h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-tagline {
      font-size: clamp(16px, 2vw, 20px); color: var(--muted);
      margin-bottom: 36px; line-height: 1.6; font-weight: 300;
    }
    .hero-tagline strong { color: var(--white); font-weight: 500; }
    .hero-cta {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, var(--purple), #5b21b6);
      color: #fff; font-family: 'DM Sans', sans-serif;
      font-size: 16px; font-weight: 700;
      padding: 14px 32px; border-radius: 12px; border: none;
      cursor: pointer; text-decoration: none;
      box-shadow: 0 4px 24px rgba(124,58,237,.45);
      transition: all .2s;
    }
    .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,58,237,.55); }
    .hero-stats {
      display: flex; gap: 32px; justify-content: center; flex-wrap: wrap;
      margin-top: 52px; position: relative; z-index: 1;
    }
    .hero-stat { text-align: center; }
    .hero-stat-num {
      font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-stat-label { font-size: 13px; color: var(--muted); margin-top: 2px; }
    .hero-divider {
      width: 1px; height: 40px; background: var(--border);
      align-self: center;
    }

    /* ── PULSE DIVIDER ── */
    .pulse-divider {
      display: flex; align-items: center; justify-content: center;
      padding: 8px 24px 0; overflow: hidden; opacity: .35;
    }
    .pulse-divider svg { width: 100%; max-width: 800px; height: 40px; }

    /* ── TOOLS SECTION ── */
    .tools-section { padding: 64px 24px 80px; max-width: 1100px; margin: 0 auto; }
    .section-label {
      text-align: center; font-size: 13px; font-weight: 700;
      color: var(--cyan); text-transform: uppercase; letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .section-title {
      font-family: 'Syne', sans-serif; font-size: clamp(22px, 3vw, 36px);
      font-weight: 800; text-align: center; color: var(--white);
      margin-bottom: 8px;
    }
    .section-sub {
      text-align: center; font-size: 16px; color: var(--muted);
      margin-bottom: 52px; max-width: 540px; margin-left: auto; margin-right: auto;
      line-height: 1.6;
    }
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .tool-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px 24px;
      display: flex; flex-direction: column;
      transition: all .25s;
      position: relative; overflow: hidden;
      text-decoration: none; color: inherit;
    }
    .tool-card::before {
      content: ''; position: absolute; inset: 0; opacity: 0;
      transition: opacity .25s;
      background: linear-gradient(135deg, rgba(124,58,237,.06), rgba(56,189,248,.04));
    }
    .tool-card:hover { border-color: var(--purple); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(124,58,237,.2); }
    .tool-card:hover::before { opacity: 1; }
    .tool-card.featured {
      grid-column: span 1;
      border-color: rgba(124,58,237,.4);
      background: linear-gradient(160deg, #1e1a38, #1a1a2e);
    }
    .tool-card-icon {
      font-size: 36px; margin-bottom: 16px; display: block;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,.3));
    }
    .tool-card-name {
      font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
      color: var(--white); margin-bottom: 8px;
    }
    .tool-card-desc {
      font-size: 14px; color: var(--muted); line-height: 1.6;
      flex: 1; margin-bottom: 20px;
    }
    .tool-card-tags {
      display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px;
    }
    .tool-tag {
      font-size: 11px; font-weight: 600; padding: 3px 9px;
      border-radius: 10px; border: 1px solid;
    }
    .tool-card-btn {
      display: flex; align-items: center; justify-content: space-between;
      padding: 11px 16px; border-radius: 10px;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
      border: 1px solid var(--border); background: var(--card2);
      color: var(--white); cursor: pointer; transition: all .2s;
      text-decoration: none;
    }
    .tool-card-btn:hover { background: var(--purple); border-color: var(--purple); }
    .tool-card-btn span { font-size: 16px; }
    .tool-card-new {
      position: absolute; top: 16px; right: 16px;
      background: linear-gradient(135deg, var(--purple), var(--cyan));
      color: #fff; font-size: 11px; font-weight: 700;
      padding: 3px 10px; border-radius: 10px; letter-spacing: .3px;
    }

    /* ── WHY SECTION ── */
    .why-section {
      padding: 64px 24px; max-width: 1100px; margin: 0 auto;
      border-top: 1px solid var(--border);
    }
    .why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
    .why-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 14px; padding: 24px;
    }
    .why-icon { font-size: 28px; margin-bottom: 14px; display: block; }
    .why-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
    .why-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

    /* ── DISCLAIMER BANNER ── */
    .disclaimer-banner {
      margin: 0 24px 48px; max-width: 1052px; margin-left: auto; margin-right: auto;
      background: rgba(56,189,248,.06); border: 1px solid rgba(56,189,248,.2);
      border-radius: 12px; padding: 16px 20px;
      font-size: 13px; color: var(--muted); line-height: 1.6; text-align: center;
    }
    .disclaimer-banner strong { color: var(--cyan-lt); }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid var(--border);
      padding: 40px 24px; max-width: 1100px; margin: 0 auto;
    }
    .footer-top {
      display: flex; justify-content: space-between; align-items: flex-start;
      flex-wrap: wrap; gap: 32px; margin-bottom: 32px;
    }
    .footer-brand {
      font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .footer-tagline { font-size: 13px; color: var(--dim); max-width: 280px; line-height: 1.6; }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-links-title { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 4px; }
    .footer-link { font-size: 14px; color: var(--dim); text-decoration: none; transition: color .2s; }
    .footer-link:hover { color: var(--white); }
    .footer-bottom {
      border-top: 1px solid var(--border); padding-top: 24px;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 12px;
      font-size: 13px; color: var(--dim);
    }
    .footer-legal { display: flex; gap: 20px; }
    .footer-legal a { color: var(--dim); text-decoration: none; }
    .footer-legal a:hover { color: var(--white); }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-menu-btn { display: block; }
      .tools-grid { grid-template-columns: 1fr; }
      .why-grid { grid-template-columns: 1fr; }
      .hero-stats { gap: 20px; }
      .hero-divider { display: none; }
      .footer-top { flex-direction: column; }
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      .tools-grid { grid-template-columns: repeat(2,1fr); }
      .why-grid { grid-template-columns: repeat(2,1fr); }
    }
  `}</style>
);

const TOOLS = [
  {
    id: "sleep",
    icon: "🌙",
    navLabel: "Sleep Cycle",
    name: "Sleep Cycle Calculator",
    desc: "Find your perfect bedtime or wake-up time based on 90-minute sleep cycles. Wake up refreshed every morning.",
    tags: [{ label: "All Ages", color: "#7c3aed", bg: "rgba(124,58,237,.12)" }, { label: "Science-Based", color: "#38bdf8", bg: "rgba(56,189,248,.12)" }],
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "nutrients",
    icon: "💊",
    navLabel: "Optimal Nutrients",
    name: "Optimal Nutrients Calculator",
    desc: "Get personalized daily targets for 40+ essential nutrients based on your age, sex, diet and lifestyle.",
    tags: [{ label: "40+ Nutrients", color: "#10b981", bg: "rgba(16,185,129,.12)" }, { label: "NIH Data", color: "#38bdf8", bg: "rgba(56,189,248,.12)" }],
    featured: false,
    badge: "Most Comprehensive",
  },
  {
    id: "fasting",
    icon: "⏰",
    navLabel: "Intermittent Fasting",
    name: "Intermittent Fasting Calculator",
    desc: "Discover your ideal fasting and eating windows across 6 popular protocols. Includes a personalized recommendation quiz.",
    tags: [{ label: "6 Protocols", color: "#f59e0b", bg: "rgba(245,158,11,.12)" }, { label: "Goal Based", color: "#f97316", bg: "rgba(249,115,22,.12)" }],
    featured: false,
    badge: null,
  },
  {
    id: "pregnancy",
    icon: "🤰",
    navLabel: "Pregnancy Due Date",
    name: "Pregnancy Due Date Calculator",
    desc: "Calculate your due date using 3 different methods. Track trimesters, key milestones and important scan dates.",
    tags: [{ label: "3 Methods", color: "#fb7185", bg: "rgba(251,113,133,.12)" }, { label: "Milestone Guide", color: "#f59e0b", bg: "rgba(245,158,11,.12)" }],
    featured: false,
    badge: null,
  },
  {
    id: "burnout",
    icon: "🧠",
    navLabel: "Stress & Burnout",
    name: "Stress & Burnout Score",
    desc: "A 12-question evidence-informed assessment across 4 categories. Understand your stress level and get personalized advice.",
    tags: [{ label: "12 Questions", color: "#14b8a6", bg: "rgba(20,184,166,.12)" }, { label: "4 Categories", color: "#7c3aed", bg: "rgba(124,58,237,.12)" }],
    featured: false,
    badge: "Most Unique",
  },
  {
    id: "bmi",
    icon: "📏",
    navLabel: "BMI Calculator",
    name: "BMI Calculator",
    desc: "Calculate your Body Mass Index, understand what it means, see your healthy weight range, and get honest personalized guidance.",
    tags: [{ label: "Ethnicity Adjusted", color: "#3b82f6", bg: "rgba(59,130,246,.12)" }, { label: "Ponderal Index", color: "#6366f1", bg: "rgba(99,102,241,.12)" }],
    featured: false,
    badge: "New",
  },
];

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <S />

      {/* NAV */}
      <nav style={{ boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.4)" : "none" }}>
        <a href="/" className="nav-brand">
          <div className="nav-pulse">
            <svg viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
              <polyline points="0,10 8,10 10,4 12,16 14,8 16,12 18,10 32,10" stroke="url(#pg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          The Body HQ
        </a>
        <div className="nav-links">
          {TOOLS.map(t => (
            <a key={t.id} href={`/${t.id}`} className="nav-link">{t.icon} {t.navLabel}</a>
          ))}
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {TOOLS.map(t => (
          <a key={t.id} href={`/${t.id}`} className="mobile-link" onClick={() => setMenuOpen(false)}>
            {t.icon} {t.name}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span />
            Free · Science-Based · No Sign-Up Required
          </div>
          <h1>
            Free Health & Wellness<br />
            Calculators — <em>Personalized for You</em>
          </h1>
          <p className="hero-tagline">
            <strong>Empowering better health decisions</strong> — one calculation at a time.
          </p>
          <a href="#tools" className="hero-cta">
            Explore Our Tools ↓
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">6</div>
            <div className="hero-stat-label">Free Tools</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">40+</div>
            <div className="hero-stat-label">Nutrients Tracked</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">100%</div>
            <div className="hero-stat-label">Free Forever</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">NIH</div>
            <div className="hero-stat-label">Data Sources</div>
          </div>
        </div>
      </section>

      {/* PULSE DIVIDER */}
      <div className="pulse-divider">
        <svg viewBox="0 0 800 40" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="pdg" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7c3aed"/>
              <stop offset="50%" stopColor="#38bdf8"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
          </defs>
          <polyline
            points="0,20 100,20 140,4 180,36 220,10 260,30 300,20 400,20 440,4 480,36 520,10 560,30 600,20 700,20 740,4 780,36 800,20"
            stroke="url(#pdg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
        </svg>
      </div>

      {/* TOOLS */}
      <section className="tools-section" id="tools">
        <div className="section-label">Our Tools</div>
        <h2 className="section-title">Everything Your Body Needs to Know</h2>
        <p className="section-sub">Six free science-backed calculators covering sleep, nutrition, BMI, fasting, pregnancy and mental wellness.</p>

        <div className="tools-grid">
          {TOOLS.map(tool => (
            <a key={tool.id} href={`/${tool.id}`} className={`tool-card${tool.featured ? " featured" : ""}`}>
              {tool.badge && <div className="tool-card-new">{tool.badge}</div>}
              <span className="tool-card-icon">{tool.icon}</span>
              <div className="tool-card-name">{tool.name}</div>
              <div className="tool-card-desc">{tool.desc}</div>
              <div className="tool-card-tags">
                {tool.tags.map(tag => (
                  <span key={tag.label} className="tool-tag" style={{ color: tag.color, background: tag.bg, borderColor: tag.color + "40" }}>
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="tool-card-btn">
                Use This Tool <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="why-section">
        <div className="section-label">Why The Body HQ</div>
        <h2 className="section-title">Built to Be Trusted</h2>
        <div className="why-grid">
          {[
            { icon: "🔬", title: "Evidence-Based Data", desc: "Every recommendation is sourced from the National Academies of Sciences, the NIH Office of Dietary Supplements, and peer-reviewed research. No guesswork." },
            { icon: "🎯", title: "Personalized to You", desc: "Our tools adjust results based on your age, sex, weight, diet, activity level, and life stage. Not generic numbers — your numbers." },
            { icon: "🔒", title: "Free & Private", desc: "No account required. No data stored. No ads following you around. Just accurate health tools available to everyone, completely free." },
            { icon: "📱", title: "Works Everywhere", desc: "Every tool is fully optimized for mobile, tablet and desktop. Use TheBodyHQ wherever you are, whenever you need it." },
            { icon: "⚕️", title: "Medically Responsible", desc: "Every tool includes clear medical disclaimers and safety warnings. We tell you when to consult a doctor — not just what the numbers say." },
            { icon: "♻️", title: "Always Up to Date", desc: "Our data is based on the most current Dietary Reference Intakes. When guidelines update, we update too." },
          ].map(w => (
            <div key={w.title} className="why-card">
              <span className="why-icon">{w.icon}</span>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="disclaimer-banner">
        <strong>⚕️ Medical Disclaimer:</strong> All tools on TheBodyHQ are for general educational purposes only and are not a substitute for professional medical advice. Always consult a qualified healthcare provider before making changes to your diet, supplements, or health routine.
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand">The Body HQ</div>
            <div className="footer-tagline">Empowering better health decisions — one calculation at a time.</div>
          </div>
          <div className="footer-links">
            <div className="footer-links-title">Tools</div>
            {TOOLS.map(t => (
              <a key={t.id} href={`/${t.id}`} className="footer-link">{t.icon} {t.name}</a>
            ))}
          </div>
          <div className="footer-links">
            <div className="footer-links-title">Site</div>
            <a href="/about" className="footer-link">About</a>
            <a href="/contact" className="footer-link">Contact</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Body HQ. All rights reserved.</span>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/about">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
