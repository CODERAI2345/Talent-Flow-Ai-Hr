import React, { useState, useEffect, useRef, useCallback } from "react";

function StarAdminGate({ onUnlock }) {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef(null);

  // triple-click detection
  const handleStar = () => {
    const next = clicks + 1;
    setClicks(next);
    clearTimeout(timerRef.current);
    if (next >= 3) { setShow(true); setClicks(0); }
    else { timerRef.current = setTimeout(() => setClicks(0), 1200); }
  };

  const tryAuth = () => {
    if (pw === OWNER_PW) { setShow(false); setPw(""); setErr(""); onUnlock(); }
    else { setErr("Access denied."); }
  };

  return (
    <>
      {/* Invisible-ish star bottom-right */}
      <button className="star-btn" onClick={handleStar} title="">
        <svg viewBox="0 0 24 24" fill="rgba(0,212,255,0.6)" stroke="none" width="22" height="22">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {show && (
        <div className="pw-overlay" onClick={e => e.target === e.currentTarget && (setShow(false), setPw(""), setErr(""))}>
          <div className="pw-card">
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Ico d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" s={18} c="var(--cyan)" />
              </div>
              <div className="f-display" style={{ fontSize: 18, color: "var(--cream)", marginBottom: 4 }}>Admin Access</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input className="inp" type="password" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && tryAuth()} autoFocus />
              {err && <div className="f-mono" style={{ fontSize: 9, color: "var(--coral)" }}>{err}</div>}
              <button className="btn btn-cyan" style={{ width: "100%", justifyContent: "center" }} onClick={tryAuth}>Enter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* AI SMART FETCH — just enter a name, AI fills all */
const AI_PROMPTS = {
  company:`You are a company intelligence expert. Given ONLY the company name, research and return a complete profile.
IMPORTANT: For websiteUrl, return the REAL official website domain (e.g. "https://google.com", "https://razorpay.com"). This is used to auto-fetch the company logo.
Return ONLY valid JSON, no markdown, no explanation:
{"name":"","industry":"","headquarters":"","founded":"","headcount":"","stage":"","description":"2-3 sentence overview","coreStrength":"What they excel at","hiringTechnologies":["tech1","tech2","tech3","tech4","tech5"],"futureDirection":"Strategic direction 2 sentences","organizationStrength":"Team culture and structure","notableProducts":["p1","p2","p3"],"careerBenefits":["benefit1","benefit2","benefit3"],"linkedinUrl":"https://linkedin.com/company/name","websiteUrl":"https://website.com","jobsUrl":"https://website.com/careers","glassdoor":"4.1","matchScore":82,"tags":["tag1","tag2","tag3"],"size":"1000-5000 employees","founded":"2010","openRoles":5}`,

  startup:`You are a startup intelligence expert. Given ONLY the startup name, return a complete profile from your knowledge.
Return ONLY valid JSON, no markdown:
{"name":"","stage":"Seed","industry":"","founded":"","headcount":"","equity":"typical equity range","description":"2-3 sentence overview","whyJoin":"Why engineers love working here","technologies":"tech1, tech2, tech3, tech4","linkedinUrl":"https://linkedin.com/company/name","websiteUrl":"https://website.com","jobsUrl":"https://website.com/careers","tags":["tag1","tag2","tag3"]}`,

  aiTool:`You are an AI tools expert. Given ONLY the tool name, return a complete profile from your knowledge.
Return ONLY valid JSON, no markdown:
{"name":"","category":"CODE","pricing":"Free or Paid or Freemium","description":"What this tool does — 2-3 sentences","useCases":"usecase1, usecase2, usecase3, usecase4","link":"https://tool-website.com","tags":["tag1","tag2","tag3"]}`,

  certification:`You are a certifications expert. Given ONLY the certification name, return a complete profile.
Return ONLY valid JSON, no markdown:
{"name":"","provider":"issuing organization","level":"Beginner or Intermediate or Advanced or Expert or Professional","status":"Available","duration":"e.g. 3-6 months","demand":78,"description":"What this cert covers and who it's for","link":"https://enroll-url.com","tags":["tag1","tag2","tag3"]}`,

  resumeModel:`You are a career coach expert. Given ONLY the resume template name or style, return a complete profile.
Return ONLY valid JSON, no markdown:
{"name":"","type":"Engineering or Product or Design or ML/AI or Management or Startup or Sales or Research or Other","format":"Chronological or Functional or Hybrid or One-page or Two-page or Portfolio","atsScore":"estimated ATS score like 88%","description":"Who this template is best for and what makes it effective","tips":"3-4 practical tips for using this template well","link":"","tags":["tag1","tag2","tag3"]}`,

  careerPath:`You are a career growth expert. Given ONLY a career transition or role name, return a complete career path.
Return ONLY valid JSON, no markdown:
{"name":"full path title","currentRole":"starting role","targetRole":"destination role","timeline":"realistic timeline e.g. 12-18 months","salaryJump":"e.g. +35%","difficulty":"Beginner or Intermediate or Advanced or Expert","skills":"skill1, skill2, skill3, skill4, skill5","milestones":"Step 1: action\nStep 2: action\nStep 3: action\nStep 4: action\nStep 5: action","description":"Overview of this career path and what it takes","tags":["tag1","tag2","tag3"]}`,
};

const AI_LABELS = {
  company:      { label: "Company Name",      placeholder: "e.g. Google, Stripe, Anthropic",      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" },
  startup:      { label: "Startup Name",      placeholder: "e.g. Notion, Linear, Vercel",         icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  aiTool:       { label: "AI Tool Name",      placeholder: "e.g. GitHub Copilot, Cursor, Midjourney", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  certification:{ label: "Certification Name",placeholder: "e.g. AWS Solutions Architect, GCP Professional", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  resumeModel:  { label: "Template Name / Style", placeholder: "e.g. Harvard One-Page, Google Resume, ATS Clean", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  careerPath:   { label: "Career Transition",  placeholder: "e.g. Senior Engineer to Staff Engineer, PM to Director", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
};

export default StarAdminGate;
