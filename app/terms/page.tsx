'use client';
// @ts-nocheck

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
    body { background: var(--bg); color: var(--white); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
    nav { position: sticky; top: 0; z-index: 100; background: rgba(19,19,31,.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .nav-brand { display: flex; align-items: center; gap: 10px; font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; background: linear-gradient(135deg, var(--purp-lt), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .nav-pulse { width: 32px; height: 20px; }
    .nav-links { display: flex; gap: 6px; align-items: center; }
    .nav-link { padding: 7px 14px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; color: var(--muted); transition: all .2s; border: 1px solid transparent; }
    .nav-link:hover { color: var(--white); background: var(--card2); border-color: var(--border); }
    .nav-menu-btn { display: none; background: none; border: none; color: var(--white); font-size: 22px; cursor: pointer; }
    .mobile-menu { display: none; position: fixed; inset: 64px 0 0; background: rgba(19,19,31,.98); z-index: 99; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
    .mobile-menu.open { display: flex; }
    .mobile-link { font-size: 20px; font-weight: 600; color: var(--white); text-decoration: none; padding: 12px 32px; border-radius: 12px; border: 1px solid var(--border); width: 260px; text-align: center; transition: all .2s; }
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
    .highlight-box { background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--purple); border-radius: 10px; padding: 16px 18px; margin: 16px 0; }
    .highlight-box p { margin: 0; font-size: 15px; color: var(--muted); line-height: 1.7; }
    .highlight-box strong { color: var(--purp-lt); }
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
  { id: "sleep", icon: "🌙", name: "Sleep" },
  { id: "nutrients", icon: "💊", name: "Nutrients" },
  { id: "fasting", icon: "⏰", name: "Fasting" },
  { id: "pregnancy", icon: "🤰", name: "Pregnancy" },
  { id: "burnout", icon: "🧠", name: "Burnout" },
];

export default function Terms() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <S />
      <nav>
        <a href="/" className="nav-brand">
          <div className="nav-pulse">
            <svg viewBox="0 0 32 20" fill="none">
              <defs><linearGradient id="pg" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#38bdf8"/></linearGradient></defs>
              <polyline points="0,10 8,10 10,4 12,16 14,8 16,12 18,10 32,10" stroke="url(#pg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          The Body HQ
        </a>
        <div className="nav-links">
          {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="nav-link">{t.icon} {t.name}</a>)}
          <a href="/about" className="nav-link">About</a>
        </div>
        <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {TOOLS.map(t => <a key={t.id} href={`/${t.id}`} className="mobile-link" onClick={() => setMenuOpen(false)}>{t.icon} {t.name}</a>)}
      </div>

      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">Legal</span>
          <h1>Terms of Service</h1>
          <div className="hero-date">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="main">
        <div className="highlight-box">
          <p><strong>Plain English summary:</strong> Our tools are free to use for personal, educational purposes. They are not medical advice. We are not liable for decisions made based on our calculators. Be responsible and consult a doctor when it matters.</p>
        </div>

        {[
          { title: "1. Acceptance of Terms", content: [
            <p>By accessing or using The Body HQ (<strong>thebodyhq.com</strong>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.</p>,
            <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          ]},
          { title: "2. What The Body HQ Provides", content: [
            <p>The Body HQ provides free online health and wellness calculator tools for general educational and informational purposes. Our tools include but are not limited to sleep cycle calculators, vitamin and mineral intake calculators, intermittent fasting calculators, pregnancy due date calculators, and stress and burnout assessments.</p>,
            <p>All tools are provided free of charge with no registration required.</p>
          ]},
          { title: "3. Medical Disclaimer — Please Read Carefully", content: [
            <p><strong>The Body HQ is not a medical service.</strong> Our tools and all content on this site are for general educational purposes only and are not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>,
            <ul>
              <li>Never disregard professional medical advice or delay seeking it because of something you read or calculated on this site</li>
              <li>Always consult a qualified healthcare provider before making changes to your diet, supplements, medication, exercise routine, or other health practices</li>
              <li>Our calculators use general population guidelines and cannot account for your individual medical history, medications, genetics, or specific health conditions</li>
              <li>Results from our tools are estimates only and may not reflect your actual individual needs</li>
            </ul>,
            <p>If you are experiencing a medical emergency, call 911 or your local emergency number immediately.</p>
          ]},
          { title: "4. Acceptable Use", content: [
            <p>You agree to use The Body HQ only for lawful purposes and in a manner consistent with these terms. You agree not to:</p>,
            <ul>
              <li>Use the site in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the site</li>
              <li>Use automated tools to scrape or harvest data from the site without permission</li>
              <li>Reproduce or redistribute our content without written permission</li>
              <li>Use the site to provide medical advice to others</li>
            </ul>
          ]},
          { title: "5. Intellectual Property", content: [
            <p>All content on The Body HQ — including but not limited to text, tool designs, graphics, and code — is the property of The Body HQ and is protected by applicable intellectual property laws.</p>,
            <p>You may use our tools for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from our content without our written permission.</p>
          ]},
          { title: "6. Disclaimer of Warranties", content: [
            <p>The Body HQ is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that:</p>,
            <ul>
              <li>The site will be uninterrupted or error-free</li>
              <li>The results obtained from our tools will be accurate or reliable for your specific situation</li>
              <li>Any errors will be corrected</li>
            </ul>,
            <p>We make every effort to ensure our data is accurate and up to date, but we cannot guarantee that all information reflects the most current research or guidelines at all times.</p>
          ]},
          { title: "7. Limitation of Liability", content: [
            <p>To the fullest extent permitted by law, The Body HQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the site or its tools.</p>,
            <p>This includes but is not limited to damages arising from reliance on information provided by our calculators, decisions made based on our tools, or any health outcomes resulting from use of our site.</p>
          ]},
          { title: "8. Third Party Links and Services", content: [
            <p>Our site may display advertisements through Google AdSense and may contain links to third party websites. We are not responsible for the content, accuracy, or practices of any third party sites or services.</p>,
            <p>The display of advertisements does not constitute endorsement of any advertised products or services.</p>
          ]},
          { title: "9. Governing Law", content: [
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms or your use of The Body HQ shall be resolved in the appropriate courts of the United States.</p>
          ]},
          { title: "10. Contact Us", content: [
            <p>If you have any questions about these Terms of Service, please contact us:</p>,
            <ul>
              <li><strong>Email:</strong> <a href="mailto:hello@thebodyhq.com" className="contact-link">hello@thebodyhq.com</a></li>
              <li><strong>Contact form:</strong> <a href="/contact" className="contact-link">thebodyhq.com/contact</a></li>
            </ul>
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
