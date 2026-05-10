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
      --white:#f8fafc; --muted:#94a3b8; --dim:#64748b;
    }
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
    .hero { padding: 56px 24px 40px; text-align: center; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,.12), transparent 70%); }
    .hero-content { position: relative; z-index: 1; }
    .hero-label { display: inline-block; font-size: 13px; font-weight: 700; color: var(--cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(24px, 4vw, 40px); font-weight: 800; margin-bottom: 10px; }
    .hero-date { font-size: 14px; color: var(--dim); }
    .main { max-width: 760px; margin: 0 auto; padding: 40px 24px 80px; }
    .policy-section { margin-bottom: 40px; }
    .policy-section h2 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
    .policy-section p { font-size: 15px; color: var(--muted); line-height: 1.8; margin-bottom: 12px; }
    .policy-section p strong { color: var(--white); }
    .policy-section ul { margin: 8px 0 12px 20px; }
    .policy-section ul li { font-size: 15px; color: var(--muted); line-height: 1.8; margin-bottom: 6px; }
    .highlight-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--cyan); border-radius: 10px; padding: 16px 18px; margin: 16px 0; }
    .highlight-box p { margin: 0; font-size: 15px; color: var(--muted); line-height: 1.7; }
    .highlight-box strong { color: var(--cyan-lt); }
    .contact-link { color: var(--cyan-lt); text-decoration: none; }
    .contact-link:hover { text-decoration: underline; }
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
    @media(max-width:768px) { .nav-links { display: none; } .nav-menu-btn { display: block; } .footer-top { flex-direction: column; } }
  `}</style>
);

const TOOLS = [
  { id: "sleep",     icon: "🌙", name: "Sleep Cycle" },
  { id: "nutrients", icon: "💊", name: "Vitamin & Mineral" },
  { id: "fasting",   icon: "⏰", name: "Intermittent Fasting" },
  { id: "pregnancy", icon: "🤰", name: "Pregnancy Due Date" },
  { id: "burnout",   icon: "🧠", name: "Stress & Burnout" },
];

export default function Privacy() {
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
          <a href="/bmi" className="nav-link"><img src="/bmi-icon.png" style={{width:'16px',height:'16px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
          <a href="/about" className="nav-link">About</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="mobile-link" onClick={() => setMenuOpen(false)}>{t.icon} {t.name}</a>)}
        <a href="/bmi" className="mobile-link" onClick={() => setMenuOpen(false)}><img src="/bmi-icon.png" style={{width:'18px',height:'18px',objectFit:'contain',display:'inline-block',verticalAlign:'middle'}} /> BMI Calculator</a>
        <a href="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</a>
      </div>

      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">Legal</span>
          <h1>Privacy Policy</h1>
          <div className="hero-date">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="main">
        <div className="highlight-box">
          <p><strong>The short version:</strong> We do not collect, store or sell your personal health data. The information you enter into our calculators stays on your device. We use Google Analytics to understand site traffic and Google AdSense to display ads. That is it.</p>
        </div>

        {[
          { title: "1. Who We Are", content: [
            <p>The Body HQ (<strong>thebodyhq.com</strong>) is a free health and wellness calculator website. We provide educational tools to help people understand their daily nutritional needs, sleep cycles, fasting schedules, pregnancy timelines, and stress levels.</p>,
            <p>For questions about this policy, contact us at <a href="mailto:hello@thebodyhq.com" className="contact-link">hello@thebodyhq.com</a>.</p>
          ]},
          { title: "2. Information We Do NOT Collect", content: [
            <p>Our calculators are built to run entirely in your browser. This means:</p>,
            <ul><li>The health data you enter (age, weight, diet type, etc.) is <strong>never sent to our servers</strong></li><li>We do not store your calculator results</li><li>We do not create user accounts or profiles</li><li>We do not require you to provide your name or email address to use any tool</li><li>We do not sell your data to third parties — ever</li></ul>
          ]},
          { title: "3. Information We Do Collect", content: [
            <p><strong>Google Analytics</strong> — We use Google Analytics to understand how visitors use our site. This collects anonymous data including pages visited, time spent on site, general geographic location (country/region level), device type, and referring website. This data does not identify you personally.</p>,
            <p><strong>Google AdSense</strong> — We display advertisements through Google AdSense. Google uses cookies to show relevant ads based on your browsing history. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" className="contact-link" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a>.</p>,
            <p><strong>Contact Form</strong> — If you use our contact form, we collect your name, email address, and message solely to respond to your inquiry. This information is not used for marketing purposes.</p>
          ]},
          { title: "4. Cookies", content: [
            <p>We use the following types of cookies:</p>,
            <ul><li><strong>Analytics cookies</strong> — Google Analytics uses cookies to track site usage anonymously</li><li><strong>Advertising cookies</strong> — Google AdSense uses cookies to serve relevant advertisements</li><li><strong>Essential cookies</strong> — Small cookies required for the site to function correctly</li></ul>,
            <p>You can control cookie settings through your browser preferences. Disabling cookies may affect some site functionality.</p>
          ]},
          { title: "5. Third Party Services", content: [
            <p>The Body HQ uses the following third party services:</p>,
            <ul><li><strong>Google Analytics</strong> — Privacy policy at <a href="https://policies.google.com/privacy" className="contact-link" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li><li><strong>Google AdSense</strong> — Ad serving and monetization</li><li><strong>Vercel</strong> — Website hosting. Privacy policy at <a href="https://vercel.com/legal/privacy-policy" className="contact-link" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></li></ul>
          ]},
          { title: "6. Children's Privacy", content: [
            <p>The Body HQ is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at <a href="mailto:hello@thebodyhq.com" className="contact-link">hello@thebodyhq.com</a> and we will delete it promptly.</p>
          ]},
          { title: "7. Your Rights", content: [
            <p>Since we do not collect personal health data, there is very little personal information we hold about you. If you have submitted a contact form message and would like it deleted, please email us at <a href="mailto:hello@thebodyhq.com" className="contact-link">hello@thebodyhq.com</a> and we will remove it promptly.</p>,
            <p>For data collected by Google Analytics and AdSense, please refer to Google's privacy controls at <a href="https://myaccount.google.com" className="contact-link" target="_blank" rel="noopener noreferrer">myaccount.google.com</a>.</p>
          ]},
          { title: "8. Changes to This Policy", content: [
            <p>We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page. Continued use of The Body HQ after changes constitutes your acceptance of the updated policy.</p>
          ]},
          { title: "9. Contact Us", content: [
            <p>If you have any questions about this Privacy Policy, please contact us:</p>,
            <ul><li><strong>Email:</strong> <a href="mailto:hello@thebodyhq.com" className="contact-link">hello@thebodyhq.com</a></li><li><strong>Contact form:</strong> <a href="/contact" className="contact-link">thebodyhq.com/contact</a></li></ul>
          ]},
        ].map(section => (
          <div key={section.title} className="policy-section">
            <h2>{section.title}</h2>
            {section.content}
          </div>
        ))}
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
