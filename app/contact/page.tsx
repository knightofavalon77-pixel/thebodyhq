'use client';
// @ts-nocheck

import { useState } from "react";

const S = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:#13131f; --card:#1a1a2e; --card2:#1e1e3a; --border:#2a2a45;
      --purple:#7c3aed; --purp-lt:#a78bfa; --cyan:#38bdf8; --cyan-lt:#7dd3fc;
      --white:#f8fafc; --muted:#94a3b8; --dim:#64748b; --green:#10b981;
    }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--white); font-family: 'Space Grotesk', sans-serif; min-height: 100vh; }
    nav { position: sticky; top: 0; z-index: 100; background: rgba(19,19,31,.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .nav-brand { display: flex; align-items: center; gap: 10px; font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; background: linear-gradient(135deg, var(--purp-lt), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .nav-pulse { width: 32px; height: 20px; }
    .nav-links { display: flex; gap: 4px; align-items: center; overflow-x: auto; scrollbar-width: none; }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-link { padding: 6px 10px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; color: var(--muted); transition: all .2s; white-space: nowrap; font-family: 'Space Grotesk', sans-serif; }
    .nav-link:hover { color: var(--white); background: var(--card2); }
    .nav-menu-btn { display: none; background: none; border: none; color: var(--white); font-size: 22px; cursor: pointer; }
    .mobile-menu { display: none; position: fixed; inset: 64px 0 0; background: rgba(19,19,31,.98); z-index: 99; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
    .mobile-menu.open { display: flex; }
    .mobile-link { font-size: 18px; font-weight: 600; color: var(--white); text-decoration: none; padding: 12px 28px; border-radius: 12px; border: 1px solid var(--border); width: 260px; text-align: center; transition: all .2s; font-family: 'Space Grotesk', sans-serif; }
    .mobile-link:hover { background: var(--card2); border-color: var(--purple); }
    .hero { padding: 64px 24px 56px; text-align: center; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,.15), transparent 70%); }
    .hero-content { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
    .hero-label { display: inline-block; font-size: 13px; font-weight: 700; color: var(--cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 5vw, 46px); font-weight: 800; line-height: 1.1; margin-bottom: 16px; }
    .hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--purp-lt), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-sub { font-size: 17px; color: var(--muted); line-height: 1.7; }
    .main { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 40px; align-items: start; }
    .info-col {}
    .info-label { font-size: 12px; font-weight: 700; color: var(--cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .info-col h2 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 14px; }
    .info-col p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 28px; }
    .contact-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 20px; }
    .contact-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .contact-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 3px; }
    .contact-value { font-size: 15px; color: var(--white); font-weight: 500; }
    .contact-note { font-size: 13px; color: var(--dim); margin-top: 2px; }
    .form-col {}
    .form-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
    .form-card h3 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 7px; }
    .field input, .field select, .field textarea { width: 100%; padding: 12px 14px; background: var(--card2); border: 1.5px solid var(--border); border-radius: 9px; color: var(--white); font-family: 'Space Grotesk', sans-serif; font-size: 15px; transition: border-color .2s; resize: vertical; -webkit-text-fill-color: var(--white); }
    .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--purple); box-shadow: 0 0 0 3px rgba(124,58,237,.15); }
    .field textarea { min-height: 120px; }
    .field select { appearance: none; }
    .btn-submit { width: 100%; padding: 14px; border-radius: 10px; border: none; background: linear-gradient(135deg, var(--purple), #5b21b6); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all .2s; box-shadow: 0 4px 20px rgba(124,58,237,.35); margin-top: 4px; }
    .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(124,58,237,.5); }
    .success-box { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.3); border-radius: 10px; padding: 16px; text-align: center; font-size: 15px; color: var(--green); margin-top: 16px; line-height: 1.6; }
    footer { border-top: 1px solid var(--border); padding: 40px 24px; max-width: 1100px; margin: 0 auto; }
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
      .main { grid-template-columns: 1fr; }
      .footer-top { flex-direction: column; }
    }
  `}</style>
);

const TOOLS = [
  { id: "sleep",     icon: "🌙", name: "Sleep Cycle" },
  { id: "nutrients", icon: "💊", name: "Vitamin & Mineral" },
  { id: "fasting",   icon: "⏰", name: "Intermittent Fasting" },
  { id: "pregnancy", icon: "🤰", name: "Pregnancy Due Date" },
  { id: "burnout",   icon: "🧠", name: "Stress & Burnout" },
];

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <a href="/bmi" className="nav-link"><img src="/bmi-icon.png" style={{width:'16px',height:'16px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="mobile-link" onClick={() => setMenuOpen(false)}>{t.icon} {t.name}</a>)}
        <a href="/bmi" className="mobile-link" onClick={() => setMenuOpen(false)}><img src="/bmi-icon.png" style={{width:'18px',height:'18px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
      </div>

      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">Get In Touch</span>
          <h1>We'd Love to <em>Hear From You</em></h1>
          <p className="hero-sub">Questions, feedback, data corrections or just want to say hello — we read every message.</p>
        </div>
      </div>

      <div className="main">
        <div className="info-col">
          <div className="info-label">Contact Info</div>
          <h2>How to Reach Us</h2>
          <p>We are a small team passionate about making reliable health information accessible to everyone. We take every message seriously.</p>
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">hello@thebodyhq.com</div>
              <div className="contact-note">We respond within 48 hours</div>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🔬</span>
            <div>
              <div className="contact-label">Data & Accuracy</div>
              <div className="contact-value">Found an error?</div>
              <div className="contact-note">We take data accuracy seriously. If you spot something that doesn't look right please let us know and we will investigate promptly.</div>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💡</span>
            <div>
              <div className="contact-label">Tool Suggestions</div>
              <div className="contact-value">Have an idea?</div>
              <div className="contact-note">We are always looking to add new tools. If there is a health calculator you wish existed we would love to hear about it.</div>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">⚕️</span>
            <div>
              <div className="contact-label">Medical Questions</div>
              <div className="contact-value">Please see a doctor</div>
              <div className="contact-note">We cannot answer personal medical questions. Please consult a qualified healthcare provider for medical advice.</div>
            </div>
          </div>
        </div>

        <div className="form-col">
          <div className="form-card">
            <h3>Send Us a Message</h3>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Your Name</label>
                  <input type="text" required placeholder="First and last name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="field">
                  <label>Subject</label>
                  <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                    <option value="">Select a topic...</option>
                    <option value="general">General Question</option>
                    <option value="data">Data Accuracy Concern</option>
                    <option value="tool">Tool Suggestion</option>
                    <option value="bug">Bug Report</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea required placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>
                <button type="submit" className="btn-submit">Send Message →</button>
              </form>
            ) : (
              <div className="success-box">
                ✅ Thank you for reaching out!<br />
                We have received your message and will respond to <strong>{form.email}</strong> within 48 hours.
              </div>
            )}
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
            <a href="/bmi" className="footer-link"><img src="/bmi-icon.png" style={{width:'16px',height:'16px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
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
