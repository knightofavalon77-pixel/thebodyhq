'use client';

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:#13131f; --card:#1a1a2e; --card2:#1e1e3a; --border:#2a2a45;
      --purple:#7c3aed; --purp-lt:#a78bfa; --cyan:#38bdf8; --cyan-lt:#7dd3fc;
      --white:#f8fafc; --muted:#94a3b8; --dim:#64748b;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
    nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(19,19,31,.92); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px;
    }
    .nav-brand {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none;
    }
    .nav-pulse { width: 32px; height: 20px; }
    .nav-links { display: flex; gap: 6px; align-items: center; }
    .nav-link {
      padding: 7px 14px; border-radius: 8px; text-decoration: none;
      font-size: 14px; font-weight: 500; color: var(--muted);
      transition: all .2s; border: 1px solid transparent;
    }
    .nav-link:hover { color: var(--white); background: var(--card2); border-color: var(--border); }
    .nav-link.active { color: var(--white); background: var(--card2); border-color: var(--border); }
    .nav-menu-btn { display: none; background: none; border: none; color: var(--white); font-size: 22px; cursor: pointer; }
    .mobile-menu {
      display: none; position: fixed; inset: 64px 0 0;
      background: rgba(19,19,31,.98); z-index: 99;
      flex-direction: column; align-items: center; justify-content: center; gap: 16px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-link {
      font-size: 20px; font-weight: 600; color: var(--white); text-decoration: none;
      padding: 12px 32px; border-radius: 12px; border: 1px solid var(--border);
      width: 260px; text-align: center; transition: all .2s;
    }
    .mobile-link:hover { background: var(--card2); border-color: var(--purple); }
    .hero {
      padding: 64px 24px 56px; text-align: center; position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,.15), transparent 70%);
    }
    .hero-content { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
    .hero-label {
      display: inline-block; font-size: 13px; font-weight: 700; color: var(--cyan);
      text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
    }
    .hero h1 {
      font-family: 'Syne', sans-serif; font-size: clamp(28px, 5vw, 48px);
      font-weight: 800; line-height: 1.1; margin-bottom: 16px;
    }
    .hero h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--purp-lt), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-sub { font-size: 18px; color: var(--muted); line-height: 1.7; }
    .main { max-width: 820px; margin: 0 auto; padding: 56px 24px 80px; }
    .section { margin-bottom: 56px; }
    .section-label {
      font-size: 12px; font-weight: 700; color: var(--cyan);
      text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;
    }
    .section h2 {
      font-family: 'Syne', sans-serif; font-size: clamp(20px, 3vw, 28px);
      font-weight: 800; margin-bottom: 16px; color: var(--white);
    }
    .section p {
      font-size: 16px; color: var(--muted); line-height: 1.8; margin-bottom: 16px;
    }
    .section p strong { color: var(--white); }
    .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 24px; }
    .value-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 14px; padding: 22px;
    }
    .value-icon { font-size: 28px; margin-bottom: 12px; display: block; }
    .value-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 8px; }
    .value-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
    .sources-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 20px; }
    .source-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 12px; padding: 16px 18px;
      display: flex; align-items: flex-start; gap: 12px;
    }
    .source-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .source-name { font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
    .source-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }
    .disclaimer-box {
      background: rgba(124,58,237,.08); border: 1px solid rgba(124,58,237,.25);
      border-left: 4px solid var(--purple); border-radius: 12px;
      padding: 20px 22px; margin-top: 24px;
    }
    .disclaimer-box p { font-size: 15px; color: var(--muted); line-height: 1.7; margin: 0; }
    .disclaimer-box strong { color: var(--purp-lt); }
    .divider { border: none; border-top: 1px solid var(--border); margin: 48px 0; }
    footer {
      border-top: 1px solid var(--border); padding: 40px 24px;
      max-width: 1100px; margin: 0 auto;
    }
    .footer-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; margin-bottom: 32px; }
    .footer-brand { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; background: linear-gradient(135deg, var(--purp-lt), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
    .footer-tagline { font-size: 13px; color: var(--dim); max-width: 280px; line-height: 1.6; }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-links-title { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 4px; }
    .footer-link { font-size: 14px; color: var(--dim); text-decoration: none; transition: color .2s; }
    .footer-link:hover { color: var(--white); }
    .footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--dim); }
    .footer-legal { display: flex; gap: 20px; }
    .footer-legal a { color: var(--dim); text-decoration: none; }
    .footer-legal a:hover { color: var(--white); }
    @media(max-width:768px) {
      .nav-links { display: none; } .nav-menu-btn { display: block; }
      .values-grid { grid-template-columns: 1fr; }
      .sources-grid { grid-template-columns: 1fr; }
      .footer-top { flex-direction: column; }
    }
  `}</style>
);

const TOOLS = [
  { id: "sleep", icon: "🌙", name: "Sleep" },
  { id: "nutrients", icon: "💊", name: "Nutrients" },
  { id: "fasting", icon: "⏰", name: "Fasting" },
  { id: "pregnancy", icon: "🤰", name: "Pregnancy" },
  { id: "burnout", icon: "🧠", name: "Burnout" },
];

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <S />
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
          {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="nav-link">{t.icon} {t.name}</a>)}
          <a href="/about" className="nav-link active">About</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="mobile-link" onClick={() => setMenuOpen(false)}>{t.icon} {t.name}</a>)}
        <a href="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</a>
      </div>

      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">About Us</span>
          <h1>Welcome to <em>The Body HQ</em></h1>
          <p className="hero-sub">Your free, science-backed resource for understanding what your body needs — personalized to you.</p>
        </div>
      </div>

      <div className="main">
        <div className="section">
          <div className="section-label">Our Story</div>
          <h2>Why We Built This</h2>
          <p>Health information is everywhere — but <strong>personalized, reliable health tools</strong> that actually account for who you are? Those are surprisingly hard to find. Most calculators online give you a generic number with no context. Most health sites bury the answer you need under ads, paywalls, or confusing medical jargon.</p>
          <p>The Body HQ was built to fix that. We wanted a place where anyone — regardless of age, background or budget — could get <strong>accurate, science-based health guidance</strong> in seconds. No sign-up. No subscription. No confusion. Just the information your body needs, personalized to you.</p>
          <p>Every tool on this site is built around one simple idea: <strong>when people understand their bodies better, they make better decisions.</strong> Better sleep. Better nutrition. Better awareness of stress before it becomes a crisis. That is what The Body HQ is for.</p>
        </div>

        <hr className="divider" />

        <div className="section">
          <div className="section-label">What We Stand For</div>
          <h2>Our Values</h2>
          <div className="values-grid">
            {[
              { icon: "🔬", title: "Evidence-Based", desc: "Every recommendation comes from peer-reviewed research and official dietary guidelines. We do not guess, and we do not exaggerate." },
              { icon: "🎯", title: "Truly Personalized", desc: "Generic health advice is often useless. Our tools adjust for your age, sex, weight, diet, and life stage because your body is not average." },
              { icon: "🔒", title: "Private & Free", desc: "No accounts. No data collection. No fees. Your health information stays on your device. We make money from ads, not from your data." },
              { icon: "⚕️", title: "Medically Responsible", desc: "We are not doctors and we never pretend to be. Every tool includes clear disclaimers and tells you when to seek professional advice." },
              { icon: "📱", title: "Always Accessible", desc: "Every tool works on any device, any screen size, anywhere. Good health information should not require a fast connection or a big screen." },
              { icon: "♻️", title: "Always Current", desc: "Our data is based on the most up-to-date Dietary Reference Intakes from the National Academies of Sciences. We update when guidelines change." },
            ].map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div className="section">
          <div className="section-label">Our Sources</div>
          <h2>Where Our Data Comes From</h2>
          <p>We take data accuracy seriously. Every nutrient recommendation, sleep guideline and health reference on this site is sourced from the most authoritative health organizations in the world:</p>
          <div className="sources-grid">
            {[
              { icon: "🏛", name: "National Academies of Sciences, Engineering & Medicine", desc: "Primary source for all Dietary Reference Intakes (DRIs) including RDAs and Adequate Intakes" },
              { icon: "🔬", name: "NIH Office of Dietary Supplements", desc: "Detailed nutrient fact sheets and upper tolerable intake levels" },
              { icon: "🏥", name: "American Academy of Sleep Medicine", desc: "Sleep duration recommendations by age group" },
              { icon: "🌿", name: "USDA Dietary Guidelines for Americans", desc: "Macronutrient ranges and general dietary guidance" },
              { icon: "🧪", name: "Peer-Reviewed Research", desc: "Supporting evidence for beneficial compounds like CoQ10, lutein and omega-3s" },
              { icon: "🏫", name: "Harvard T.H. Chan School of Public Health", desc: "Nutritional epidemiology research and dietary guidance from one of the world's leading research institutions" },
            ].map(s => (
              <div key={s.name} className="source-card">
                <span className="source-icon">{s.icon}</span>
                <div>
                  <div className="source-name">{s.name}</div>
                  <div className="source-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div className="section">
          <div className="section-label">Important</div>
          <h2>Medical Disclaimer</h2>
          <div className="disclaimer-box">
            <p><strong>The Body HQ provides general educational information only.</strong> Our tools and content are not a substitute for professional medical advice, diagnosis, or treatment. Individual health needs vary based on medical history, medications, genetics and other factors that our tools cannot account for.</p>
            <p style={{marginTop: 12}}>Always consult a qualified healthcare provider — including a registered dietitian, physician, or licensed specialist — before making changes to your diet, supplement routine, sleep habits, or health practices. If you are pregnant, have a chronic condition such as diabetes, or take regular medication, professional guidance is especially important.</p>
            <p style={{marginTop: 12}}>If you have questions about our data sources or methodology, please <a href="/contact" style={{color: "var(--cyan-lt)", textDecoration: "none"}}>contact us</a>.</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand">The Body HQ</div>
            <div className="footer-tagline">Empowering better health decisions — one calculation at a time.</div>
          </div>
          <div className="footer-links">
            <div className="footer-links-title">Tools</div>
            {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="footer-link">{t.icon} {t.name} Calculator</a>)}
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
          </div>
        </div>
      </footer>
    </div>
  );
}
