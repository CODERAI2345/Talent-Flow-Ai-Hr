import React from "react";
import { CardShell } from "../components/shared/CardShell";
import { SL } from "../components/shared/Utils";

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

function AISmartFetch({ sectionType, onData }) {
  const [bulkText, setBulkText] = useState("");
  const [name, setName]         = useState("");
  const [mode, setMode]         = useState("name");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [err, setErr]           = useState("");
  const [fetchedData, setFetchedData] = useState(null);  // holds last AI result
  const [logoPreview, setLogoPreview] = useState("");
  const [logoStatus, setLogoStatus]   = useState("idle"); // idle|loading|ok|err
  const [logoTab, setLogoTab]         = useState("auto");
  const fileInputRef = useRef(null);
  const meta = AI_LABELS[sectionType] || AI_LABELS.company;
  const isCompany = sectionType === "company";

  const KNOWN_DOMAINS = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
    "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
    "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
    "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
    "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
    "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
    "billdesk":"billdesk.com","phonepe":"phonepe.com","zerodha":"zerodha.com",
    "pine labs":"pinelabs.com","cimpress":"cimpress.com","insight":"insight.com",
    "hdfc":"hdfcbank.com","icici":"icicibank.com","bajaj":"bajajfinserv.in",
    "naukri":"naukri.com","infedge":"infoedge.in",
  };

  const autoFetchLogo = (companyName, websiteUrl) => {
    const key = (companyName||"").toLowerCase().replace(/[^a-z ]/g,"");
    const known = Object.entries(KNOWN_DOMAINS).find(([k])=>key.includes(k))?.[1];
    const wDomain = (websiteUrl||"").replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0];
    const fallback = (companyName||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
    const domain = known || wDomain || fallback;
    const url = `https://logo.clearbit.com/${domain}`;
    setLogoPreview(url); setLogoStatus("loading");
    return url;
  };

  const handleFileUpload = e => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setLogoPreview(ev.target.result); setLogoStatus("ok"); };
    reader.readAsDataURL(file);
  };

  const BULK_PROMPTS = {
    company:`You are a data extraction expert. The user has pasted raw text about a company (could be from LinkedIn, Glassdoor, website, notes, or mixed format). Extract and map ALL available information to this exact JSON structure. Fill every field as best as you can from the text. For missing info, use reasonable defaults or leave as empty string.
Return ONLY valid JSON:
{"name":"","industry":"","headquarters":"","founded":"","headcount":"","stage":"Public","description":"","coreStrength":"","hiringTechnologies":["tech1"],"futureDirection":"","organizationStrength":"","notableProducts":["p1"],"careerBenefits":["benefit1"],"linkedinUrl":"","websiteUrl":"","jobsUrl":"","glassdoor":"","matchScore":80,"tags":["tag1"]}`,
    startup:`Extract startup info from the pasted text and return ONLY valid JSON:
{"name":"","stage":"Seed","industry":"","founded":"","headcount":"","equity":"","description":"","whyJoin":"","technologies":"tech1, tech2","linkedinUrl":"","websiteUrl":"","jobsUrl":"","tags":["tag1"]}`,
    aiTool:`Extract AI tool info from the pasted text and return ONLY valid JSON:
{"name":"","category":"CODE","pricing":"Freemium","description":"","useCases":"case1, case2, case3","link":"","tags":["tag1"]}`,
    certification:`Extract certification info from the pasted text and return ONLY valid JSON:
{"name":"","provider":"","level":"Intermediate","status":"Available","duration":"","demand":75,"description":"","link":"","tags":["tag1"]}`,
    resumeModel:`Extract resume template info from the pasted text and return ONLY valid JSON:
{"name":"","type":"Engine","atsScore":90,"description":"","tags":["tag1"]}`,
  };

  const doFetch = async () => {
    const input = mode === "bulk" ? bulkText.trim() : name.trim();
    if (!input) return;
    setLoading(true); setDone(false); setErr(""); setFetchedData(null);
    setLogoPreview(""); setLogoStatus("idle");
    try {
      const prompt = mode === "bulk"
        ? `${BULK_PROMPTS[sectionType] || BULK_PROMPTS.company}\n\nRAW TEXT TO EXTRACT FROM:\n"""\n${input}\n"""`
        : `${AI_PROMPTS[sectionType]}\n\nName: "${input}"`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1500,
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!res.ok) { setErr(`API error ${res.status}`); setLoading(false); return; }
      const data = await res.json();
      const raw = (data.content?.[0]?.text || "").trim();
      const first = raw.indexOf("{"), last = raw.lastIndexOf("}");
      if (first === -1 || last === -1) throw new Error("No JSON");
      const json = JSON.parse(raw.slice(first, last + 1));

      // Auto-fetch logo for companies
      if (isCompany) {
        const logoUrl = autoFetchLogo(json.name || input, json.websiteUrl || "");
        json.logoUrl = logoUrl;
        setFetchedData(json);
      }

      onData(json); setDone(true);
      if (mode === "bulk") setBulkText(""); else setName("");
    } catch(e) {
      setErr("Could not parse — try again or paste more complete info.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-paste-box">
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,
            background:"linear-gradient(135deg,#0097b2,#7ed957)",
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <Ico d="M13 10V3L4 14h7v7l9-11h-7z" s={16} c="#fff" sw={2}/>
          </div>
          <div>
            <div className="ai-paste-title">AI Quick Add</div>
            <div className="ai-paste-sub">
              {mode==="bulk" ? "Paste any raw text — AI maps it to all fields" : "Type a name — AI fetches the full profile"}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4, background:"#E5E7EB", padding:3, borderRadius:8 }}>
          {[["name","By Name"],["bulk","Paste Text"]].map(([m,label])=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");setDone(false);setFetchedData(null);}}
              style={{ padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,fontFamily:"Space Grotesk,sans-serif",
                background:mode===m?"#FFFFFF":"transparent",
                color:mode===m?"#111827":"#6B7280",
                boxShadow:mode===m?"0 1px 4px rgba(0,0,0,.1)":"none",
                transition:"all .15s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      {mode==="name" ? (
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ position:"relative", flex:1 }}>
            <div style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={meta.icon}/></svg>
            </div>
            <input className="inp" style={{ paddingLeft:34 }} placeholder={meta.placeholder}
              value={name} onChange={e=>setName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&doFetch()}/>
          </div>
          <button className="btn btn-cyan" onClick={doFetch} disabled={loading||!name.trim()}
            style={{ flexShrink:0, opacity:loading||!name.trim()?0.5:1 }}>
            {loading ? <><span className="ai-spin"/> Fetching…</> : "Fetch All →"}
          </button>
        </div>
      ) : (
        <div>
          <textarea className="inp" rows={5} style={{ marginBottom:8,fontSize:12,lineHeight:1.6 }}
            placeholder={`Paste any raw text about this ${sectionType==="aiTool"?"AI tool":sectionType} — from LinkedIn, website, Glassdoor, notes, job posts, Wikipedia, or anything.\n\nAI will automatically identify and fill all the right fields.`}
            value={bulkText} onChange={e=>setBulkText(e.target.value)}/>
          <button className="btn btn-cyan" onClick={doFetch} disabled={loading||!bulkText.trim()}
            style={{ opacity:loading||!bulkText.trim()?0.5:1 }}>
            {loading ? <><span className="ai-spin"/> Extracting & Mapping…</> : "Extract & Fill All Fields →"}
          </button>
        </div>
      )}

      {/* ── COMPANY LOGO PANEL — shown after fetch OR always for company ── */}
      {isCompany && (done || fetchedData) && (
        <div style={{
          marginTop:14, padding:"14px 16px", borderRadius:14,
          background:"rgba(0,151,178,.07)", border:"1px solid rgba(0,151,178,.2)",
        }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>

            {/* Live logo preview */}
            <div style={{
              width:72, height:72, borderRadius:16, flexShrink:0,
              background: logoStatus==="ok" ? "rgba(255,255,255,.97)"
                : `hsl(${[...(fetchedData?.name||name||"?")].reduce((a,c)=>a+c.charCodeAt(0),0)%360},60%,42%)`,
              border:"2px solid rgba(0,151,178,.35)",
              display:"flex", alignItems:"center", justifyContent:"center",
              overflow:"hidden", position:"relative",
              boxShadow:"0 6px 20px rgba(0,0,0,.45)",
            }}>
              {logoPreview ? (
                <img src={logoPreview} alt="logo"
                  style={{ width:"82%", height:"82%", objectFit:"contain",
                    opacity: logoStatus==="ok" ? 1 : 0, transition:"opacity .3s" }}
                  onLoad={()=>setLogoStatus("ok")}
                  onError={()=>setLogoStatus("err")}/>
              ) : null}
              {(logoStatus==="idle"||logoStatus==="err"||!logoPreview) && (
                <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                  fontSize:22, color:"rgba(255,255,255,.92)", position:"absolute" }}>
                  {(fetchedData?.name||name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase()}
                </div>
              )}
              {logoStatus==="loading" && (
                <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.4)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:18,height:18, border:"2px solid #0097b2",
                    borderTopColor:"transparent", borderRadius:"50%",
                    animation:"spin .7s linear infinite" }}/>
                </div>
              )}
              {logoStatus==="ok" && (
                <div style={{ position:"absolute",bottom:2,right:2, width:14,height:14,
                  borderRadius:"50%", background:"#10B981",
                  display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
            </div>

            {/* Logo controls */}
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2",
                  letterSpacing:".2em", textTransform:"uppercase" }}>
                  Company Logo
                </div>
                {/* Tab switcher */}
                <div style={{ display:"flex", gap:4 }}>
                  {[["auto","Auto"],["url","URL"],["upload","Upload"]].map(([id,label])=>(
                    <button key={id} onClick={()=>setLogoTab(id)}
                      style={{ padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:700,
                        cursor:"pointer", border:"1px solid", fontFamily:"var(--font-mono)",
                        background: logoTab===id ? "rgba(0,151,178,.2)" : "rgba(255,255,255,.04)",
                        borderColor: logoTab===id ? "rgba(0,151,178,.6)" : "rgba(255,255,255,.1)",
                        color: logoTab===id ? "#0097b2" : "#6B7280",
                        transition:"all .15s" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AUTO tab */}
              {logoTab==="auto" && (
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <input className="inp" style={{ flex:1, fontSize:12, padding:"7px 10px" }}
                    placeholder="Domain e.g. google.com"
                    defaultValue={(fetchedData?.websiteUrl||"").replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0]}
                    onBlur={e=>{
                      const d = e.target.value.trim();
                      if(d){ const u=`https://logo.clearbit.com/${d}`; setLogoPreview(u); setLogoStatus("loading"); }
                    }}/>
                  <button onClick={()=>autoFetchLogo(fetchedData?.name||name, fetchedData?.websiteUrl||"")}
                    style={{ padding:"7px 13px", borderRadius:9, border:"none",
                      background:"linear-gradient(135deg,#0097b2,#7ed957)",
                      color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer", whiteSpace:"nowrap" }}>
                    Re-fetch
                  </button>
                </div>
              )}

              {/* URL tab */}
              {logoTab==="url" && (
                <input className="inp" style={{ width:"100%", fontSize:12, padding:"7px 10px" }}
                  placeholder="https://example.com/logo.png"
                  onBlur={e=>{ if(e.target.value){ setLogoPreview(e.target.value); setLogoStatus("loading"); }}}/>
              )}

              {/* UPLOAD tab */}
              {logoTab==="upload" && (
                <div>
                  <input ref={fileInputRef} type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    style={{ display:"none" }} onChange={handleFileUpload}/>
                  <button onClick={()=>fileInputRef.current?.click()}
                    style={{ padding:"7px 16px", borderRadius:9, cursor:"pointer",
                      background:"rgba(126,217,87,.1)", border:"1px dashed rgba(126,217,87,.4)",
                      color:"#7ed957", fontWeight:700, fontSize:11,
                      display:"flex", alignItems:"center", gap:6 }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    Choose File
                  </button>
                </div>
              )}

              {/* Status messages */}
              {logoStatus==="ok"  && <div style={{fontSize:11,color:"#10B981",marginTop:5}}>✓ Logo loaded — will be saved with the company</div>}
              {logoStatus==="err" && <div style={{fontSize:11,color:"#F59E0B",marginTop:5}}>⚠ Logo not found — paste a URL or upload a file</div>}
            </div>
          </div>
        </div>
      )}

      {done && <div style={{ marginTop:10,padding:"8px 12px",
        background:"rgba(22,163,74,.08)",border:"1px solid rgba(22,163,74,.2)",
        borderRadius:6,fontSize:12,color:"#15803D",fontWeight:600 }}>
        ✓ All fields filled — review and save below
      </div>}
      {err && <div style={{ marginTop:10,padding:"8px 12px",
        background:"rgba(220,38,38,.06)",border:"1px solid rgba(220,38,38,.2)",
        borderRadius:6,fontSize:12,color:"#DC2626" }}>⚠ {err}</div>}
    </div>
  );
}

/* COMPANY DETAIL VIEW */

const STAGE_COL   = { "Public":"#0097b2","Private":"#0097b2","Startup":"#F43F5E","Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981" };
const STAGE_CLASS = { "Public":"cyan","Private":"violet","Startup":"coral","Series A":"cyan","Series B":"violet","Series C+":"cyan","Growth":"lime" };

/* ── premium gradient palettes for company avatars ── */
const CO_GRAD = [
  "linear-gradient(135deg,#0097b2,#7ed957)",
  "linear-gradient(135deg,#F43F5E,#EC4899)",
  "linear-gradient(135deg,#7ed957,#0097b2)",
  "linear-gradient(135deg,#10B981,#7ed957)",
  "linear-gradient(135deg,#F59E0B,#F43F5E)",
  "linear-gradient(135deg,#006d82,#EC4899)",
];
const coGrad = name => CO_GRAD[(name?.charCodeAt(0)||0) % CO_GRAD.length];

/* COMPANY DETAIL — premium dark */
function CompanyDetail({ c, onBack, isOwner, onDelete, onEdit }) {
  const grad  = coGrad(c.name);
  const stCol = STAGE_COL[c.stage] || "#0097b2";
  const mcCol = (c.matchScore>=85)?"#10B981":(c.matchScore>=70)?"#0097b2":"#F59E0B";

  return (
    <div style={{height:"100%",overflowY:"auto",paddingBottom:32}} className="scrollbar">
      {/* back bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button className="btn btn-ghost" onClick={onBack} style={{gap:6,fontSize:13}}>
          <Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/> Back to Companies
        </button>
        {isOwner&&<div style={{display:"flex",gap:8}}>
          <button className="btn btn-ghost" style={{fontSize:13}} onClick={onEdit}>Edit</button>
          <button style={{padding:"7px 16px",borderRadius:9,background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.25)",fontSize:13,cursor:"pointer",fontFamily:"var(--font-body)"}} onClick={()=>{onDelete(c.id);onBack();}}>Delete</button>
        </div>}
      </div>

      {/* ── HERO ── */}
      <div style={{borderRadius:16,overflow:"hidden",marginBottom:20,border:"1px solid var(--border)"}}>
        <div style={{height:5,background:grad}}/>
        <div style={{padding:"24px 28px",background:"var(--card)"}}>
          <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
            {/* Avatar */}
            <div style={{width:72,height:72,borderRadius:18,background:grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:32,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 8px 28px ${stCol}45`}}>
              {(c.name||"?")[0].toUpperCase()}
            </div>
            {/* Name + meta */}
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"#EDF0F7",letterSpacing:"-0.5px",marginBottom:5}}>{c.name}</div>
              <div style={{fontSize:14,color:"#A0A8BB",marginBottom:10}}>
                {[c.industry, c.headquarters, c.founded&&`Est. ${c.founded}`].filter(Boolean).join("  ·  ")}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {c.stage&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:`${stCol}20`,color:stCol,border:`1px solid ${stCol}40`}}>{c.stage}</span>}
                {c.matchScore&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:`${mcCol}15`,color:mcCol,border:`1px solid ${mcCol}30`}}>Match {c.matchScore}%</span>}
                {c.openRoles>0&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>🔥 {c.openRoles} open roles</span>}
              </div>
            </div>
            {/* Links */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
              {c.linkedinUrl&&<a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:"rgba(10,102,194,.15)",border:"1px solid rgba(10,102,194,.3)",color:"#5B9BD5",textDecoration:"none",fontSize:14,fontWeight:700}}>LinkedIn</a>}
              {c.websiteUrl&&<a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:"rgba(255,255,255,.07)",border:"1px solid var(--border2)",color:"#EDF0F7",textDecoration:"none",fontSize:14,fontWeight:700}}>Website</a>}
              {c.jobsUrl&&<a href={c.jobsUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:`${stCol}18`,border:`1px solid ${stCol}35`,color:stCol,textDecoration:"none",fontSize:14,fontWeight:700}}>View Jobs ↗</a>}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12,marginBottom:20}}>
        {[
          {l:"Stage",        v:c.stage,               col:stCol},
          {l:"Founded",      v:c.founded?`Est. ${c.founded}`:null, col:"#0097b2"},
          {l:"Size",         v:c.size,                col:"#7ed957"},
          {l:"HQ",           v:c.headquarters,        col:"#F59E0B"},
          {l:"Open Roles",   v:c.openRoles>0?`${c.openRoles} roles`:null, col:"#10B981"},
          {l:"Match Score",  v:c.matchScore?`${c.matchScore}%`:null,       col:mcCol},
        ].filter(s=>s.v).map((s,i)=>(
          <div key={i} style={{padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`3px solid ${s.col}`}}>
            <div style={{fontSize:11,color:"var(--text3)",letterSpacing:".12em",marginBottom:5,fontFamily:"var(--font-mono)",textTransform:"uppercase"}}>{s.l}</div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.col}}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* ── 2-COL BODY ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
        {/* LEFT */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {c.description&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderLeft:`3px solid ${stCol}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:stCol,letterSpacing:".15em",marginBottom:10}}>ABOUT</div>
              <p style={{fontSize:14,lineHeight:1.8,color:"#C4C9D6"}}>{c.description}</p>
            </div>
          )}
          {c.whyJoin&&(
            <div style={{padding:22,background:"rgba(16,185,129,.04)",border:"1px solid rgba(16,185,129,.18)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".15em",marginBottom:10}}>WHY WORK HERE</div>
              <p style={{fontSize:14,lineHeight:1.8,color:"#C4C9D6"}}>{c.whyJoin}</p>
            </div>
          )}
          {c.hiringTechnologies?.length>0&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#7ed957",letterSpacing:".15em",marginBottom:12}}>TECH STACK</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {c.hiringTechnologies.map((t,i)=>(
                  <span key={i} style={{padding:"6px 14px",borderRadius:8,fontSize:13,background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)"}}>{t}</span>
                ))}
              </div>
            </div>
          )}
          {c.matchScore&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:mcCol,letterSpacing:".15em",marginBottom:12}}>MATCH SCORE</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:14,color:"#C4C9D6"}}>Profile compatibility</span>
                <span style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:mcCol}}>{c.matchScore}%</span>
              </div>
              <div style={{height:8,background:"rgba(255,255,255,.07)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${c.matchScore}%`,borderRadius:4,background:mcCol,transition:"width 1.2s ease"}}/>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* Glassdoor */}
          {(c.glassdoorRating||c.cultureScore||c.workLifeBalance)&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".15em",marginBottom:12}}>RATINGS</div>
              {[
                {l:"Overall",    v:c.glassdoorRating, max:5},
                {l:"Culture",    v:c.cultureScore,    max:5},
                {l:"Work-Life",  v:c.workLifeBalance, max:5},
              ].filter(r=>r.v).map((r,i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:13,color:"#A0A8BB"}}>{r.l}</span>
                    <span style={{fontSize:14,fontWeight:700,color:"#10B981"}}>{r.v}/{r.max}</span>
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,.07)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(r.v/r.max)*100}%`,background:"linear-gradient(90deg,#10B981,#7ed957)",borderRadius:3}}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Tags */}
          {c.tags?.length>0&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",letterSpacing:".15em",marginBottom:10}}>TAGS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {c.tags.map((t,i)=><span key={i} style={{padding:"5px 12px",borderRadius:20,fontSize:13,background:"rgba(255,255,255,.05)",color:"#8B93A6",border:"1px solid var(--border2)"}}>{t}</span>)}
              </div>
            </div>
          )}
          {/* Perks */}
          {c.perks?.length>0&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#006d82",letterSpacing:".15em",marginBottom:10}}>PERKS</div>
              {c.perks.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
                  <span style={{color:"#006d82",fontSize:12,marginTop:1}}>✦</span>
                  <span style={{fontSize:13,color:"#C4C9D6",lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyModal({ existing, onSave, onClose }) {
  const blank = {
    name:"", industry:"", headquarters:"", founded:"", headcount:"",
    stage:"Private", description:"", coreStrength:"", hiringTechnologies:"",
    futureDirection:"", organizationStrength:"", notableProducts:"",
    careerBenefits:"", linkedinUrl:"", websiteUrl:"", jobsUrl:"",
    glassdoor:"", matchScore:80, tags:"", logoUrl:"",
  };
  const toF = c => ({
    ...c,
    hiringTechnologies:(c.hiringTechnologies||[]).join(", "),
    notableProducts:(c.notableProducts||[]).join(", "),
    careerBenefits:(c.careerBenefits||[]).join(", "),
    tags:(c.tags||[]).join(", "),
    logoUrl: c.logoUrl||"",
  });
  const [form, setForm]           = useState(existing ? toF(existing) : blank);
  const [logoPreview, setLogoPreview] = useState(existing?.logoUrl||"");
  const [logoFetching, setLogoFetching] = useState(false);
  const [logoStatus, setLogoStatus]    = useState("idle"); // idle|ok|err
  const [logoTab, setLogoTab]          = useState("auto"); // auto|url|upload
  const fileInputRef = useRef(null);

  const F = k => e => setForm(p => ({ ...p, [k]: e.target?.value ?? e }));
  const arr = s => s ? s.split(",").map(x=>x.trim()).filter(Boolean) : [];

  const handleAI = d => {
    setForm(p => ({
      ...p, ...d,
      hiringTechnologies:(d.hiringTechnologies||[]).join(", "),
      notableProducts:(d.notableProducts||[]).join(", "),
      careerBenefits:(d.careerBenefits||[]).join(", "),
      tags:Array.isArray(d.tags)?d.tags.join(", "):(p.tags||""),
      logoUrl: d.logoUrl || p.logoUrl || "",
    }));
    // Auto-fetch logo when AI fills the name
    if (d.name) autoFetchLogo(d.name, d.websiteUrl||"");
  };

  // ── AUTO LOGO FETCH using Clearbit ──────────────────────────────
  const KNOWN_DOMAINS = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
    "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
    "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
    "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
    "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
    "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
    "cimpress":"cimpress.com","insight":"insight.com",
    "billdesk":"billdesk.com","phonepe":"phonepe.com","zerodha":"zerodha.com",
    "cimpress":"cimpress.com","pine labs":"pinelabs.com",
  };

  const autoFetchLogo = (name, website) => {
    const key = (name||"").toLowerCase().replace(/[^a-z ]/g,"");
    const knownDomain = Object.entries(KNOWN_DOMAINS).find(([k])=>key.includes(k))?.[1];
    const websiteDomain = website.replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0];
    const fallback = (name||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
    const domain = knownDomain || websiteDomain || fallback;
    const url = `https://logo.clearbit.com/${domain}`;
    setLogoFetching(true); setLogoStatus("idle");
    setLogoPreview(url);
    setForm(p=>({...p, logoUrl:url}));
    // status will be set by img onLoad/onError
    setTimeout(()=>setLogoFetching(false), 2000);
  };

  // Handle manual URL entry
  const handleLogoUrlInput = url => {
    setForm(p=>({...p, logoUrl:url}));
    setLogoPreview(url);
    setLogoStatus("idle");
  };

  // Handle file upload → base64
  const handleFileUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target.result;
      setLogoPreview(b64);
      setForm(p=>({...p, logoUrl:b64}));
      setLogoStatus("ok");
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form, id:existing?.id||Date.now(),
      hiringTechnologies:arr(form.hiringTechnologies),
      notableProducts:arr(form.notableProducts),
      careerBenefits:arr(form.careerBenefits),
      tags:arr(form.tags),
      matchScore:Number(form.matchScore)||80,
      logoUrl: form.logoUrl||"",
    });
    onClose();
  };

  const grad = form.name
    ? `hsl(${[...form.name].reduce((a,c)=>a+c.charCodeAt(0),0)%360},65%,45%)`
    : "#0097b2";

  return (
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:680, maxHeight:"90vh", overflowY:"auto"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,
            fontSize:20,color:"var(--text)"}}>
            {existing?"Edit Company":"Add Company"}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* AI Quick Add */}
        <AISmartFetch sectionType="company" onData={handleAI}/>
        <div style={{height:1,background:"var(--border)",margin:"18px 0"}}/>

        {/* ── LOGO SECTION ─────────────────────────────────── */}
        <div style={{
          padding:"18px", borderRadius:16, marginBottom:18,
          background:"rgba(0,151,178,.06)",
          border:"1px solid rgba(0,151,178,.18)",
        }}>
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:10, color:"#0097b2",
            letterSpacing:".22em", textTransform:"uppercase", marginBottom:14,
          }}>
            🖼 Company Logo
          </div>

          <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>

            {/* Live logo preview */}
            <div style={{
              width:88, height:88, borderRadius:18, flexShrink:0,
              background: logoStatus==="ok" ? "rgba(255,255,255,.97)" : grad,
              border:"2px solid rgba(0,151,178,.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
              overflow:"hidden", position:"relative",
              boxShadow:"0 8px 24px rgba(0,0,0,.4)",
            }}>
              {logoPreview && (
                <img src={logoPreview} alt="logo"
                  style={{width:"80%",height:"80%",objectFit:"contain"}}
                  onLoad={()=>setLogoStatus("ok")}
                  onError={()=>setLogoStatus("err")}/>
              )}
              {(!logoPreview || logoStatus==="err") && (
                <div style={{
                  fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,
                  fontSize:28,color:"rgba(255,255,255,.9)",
                }}>
                  {(form.name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase()||"?"}
                </div>
              )}
              {logoFetching && (
                <div style={{
                  position:"absolute",inset:0,background:"rgba(0,0,0,.5)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <div style={{width:20,height:20,border:"2px solid #0097b2",
                    borderTopColor:"transparent",borderRadius:"50%",
                    animation:"spin 0.8s linear infinite"}}/>
                </div>
              )}
              {logoStatus==="ok" && (
                <div style={{
                  position:"absolute",bottom:3,right:3,
                  width:16,height:16,borderRadius:"50%",
                  background:"#10B981",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
              {logoStatus==="err" && (
                <div style={{
                  position:"absolute",bottom:3,right:3,
                  width:16,height:16,borderRadius:"50%",
                  background:"#F43F5E",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:10,color:"white",fontWeight:700,
                }}>!</div>
              )}
            </div>

            {/* Logo source tabs + inputs */}
            <div style={{flex:1}}>
              {/* Tab switcher */}
              <div style={{display:"flex",gap:6,marginBottom:12}}>
                {[
                  {id:"auto",   label:"Auto Fetch"},
                  {id:"url",    label:"Paste URL"},
                  {id:"upload", label:"Upload File"},
                ].map(tab=>(
                  <button key={tab.id} onClick={()=>setLogoTab(tab.id)}
                    style={{
                      padding:"5px 13px", borderRadius:20, fontSize:11,
                      fontWeight:700, cursor:"pointer", border:"1px solid",
                      fontFamily:"var(--font-mono)", letterSpacing:".05em",
                      background: logoTab===tab.id ? "rgba(0,151,178,.2)" : "rgba(255,255,255,.04)",
                      borderColor: logoTab===tab.id ? "rgba(0,151,178,.6)" : "rgba(255,255,255,.1)",
                      color: logoTab===tab.id ? "#0097b2" : "#6B7280",
                      transition:"all .15s",
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* AUTO FETCH tab */}
              {logoTab==="auto" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8,lineHeight:1.6}}>
                    Enter company name or website — logo fetched automatically from Clearbit.
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <input className="inp" style={{flex:1}}
                      placeholder="Company name or domain (e.g. google.com)"
                      value={form.name}
                      onChange={e=>{F("name")(e); }}
                      onBlur={e=>{ if(e.target.value) autoFetchLogo(e.target.value, form.websiteUrl||""); }}
                    />
                    <button
                      onClick={()=>autoFetchLogo(form.name, form.websiteUrl||"")}
                      disabled={!form.name.trim()||logoFetching}
                      style={{
                        padding:"8px 16px", borderRadius:10, border:"none",
                        background:"linear-gradient(135deg,#0097b2,#7ed957)",
                        color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer",
                        opacity:!form.name.trim()||logoFetching?0.5:1,
                        whiteSpace:"nowrap",
                      }}>
                      {logoFetching ? "Fetching…" : "Fetch Logo"}
                    </button>
                  </div>
                  {logoStatus==="ok" && <div style={{fontSize:11,color:"#10B981",marginTop:6}}>✓ Logo loaded successfully</div>}
                  {logoStatus==="err" && <div style={{fontSize:11,color:"#F59E0B",marginTop:6}}>⚠ Logo not found — you can paste a URL or upload manually</div>}
                </div>
              )}

              {/* PASTE URL tab */}
              {logoTab==="url" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8}}>
                    Paste a direct image URL (PNG, JPG, SVG, WebP)
                  </div>
                  <input className="inp" style={{width:"100%"}}
                    placeholder="https://example.com/logo.png"
                    value={form.logoUrl.startsWith("data:") ? "" : form.logoUrl}
                    onChange={e=>handleLogoUrlInput(e.target.value)}
                  />
                  {form.logoUrl && !form.logoUrl.startsWith("data:") && (
                    <div style={{fontSize:11,color:"#6B7280",marginTop:6,wordBreak:"break-all",opacity:.7}}>
                      {form.logoUrl}
                    </div>
                  )}
                </div>
              )}

              {/* UPLOAD FILE tab */}
              {logoTab==="upload" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8}}>
                    Upload PNG, JPG, SVG or WebP logo file
                  </div>
                  <input ref={fileInputRef} type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    style={{display:"none"}}
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={()=>fileInputRef.current?.click()}
                    style={{
                      padding:"10px 20px", borderRadius:10, cursor:"pointer",
                      background:"rgba(126,217,87,.12)", border:"1px dashed rgba(126,217,87,.4)",
                      color:"#7ed957", fontWeight:700, fontSize:12,
                      display:"flex", alignItems:"center", gap:8, width:"100%",
                      justifyContent:"center",
                    }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    Choose Logo File
                  </button>
                  {form.logoUrl.startsWith("data:") && (
                    <div style={{fontSize:11,color:"#10B981",marginTop:6}}>✓ File uploaded and ready</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── FIELDS ─────────────────────────────────────────── */}
        <SL ch="FIELDS — auto-filled above, edit as needed" col="var(--indigo)"/>
        <div className="fg fg2" style={{marginTop:12}}>
          <input className="inp" placeholder="Company name *" value={form.name} onChange={F("name")}/>
          <input className="inp" placeholder="Industry" value={form.industry} onChange={F("industry")}/>
          <input className="inp" placeholder="Headquarters" value={form.headquarters} onChange={F("headquarters")}/>
          <input className="inp" placeholder="Founded year" value={form.founded} onChange={F("founded")}/>
          <input className="inp" placeholder="Headcount (e.g. 10,000+)" value={form.headcount} onChange={F("headcount")}/>
          <select className="inp" value={form.stage} onChange={F("stage")}>
            {["Public","Private","Startup","Series A","Series B","Series C+","Growth"].map(o=><option key={o}>{o}</option>)}
          </select>
          <textarea className="inp fspan" placeholder="Description" rows={2} value={form.description} onChange={F("description")}/>
          <textarea className="inp fspan" placeholder="Core Strength" rows={2} value={form.coreStrength} onChange={F("coreStrength")}/>
          <textarea className="inp fspan" placeholder="Future Direction" rows={2} value={form.futureDirection} onChange={F("futureDirection")}/>
          <textarea className="inp fspan" placeholder="Organization Strength" rows={2} value={form.organizationStrength} onChange={F("organizationStrength")}/>
          <input className="inp fspan" placeholder="Hiring Technologies (comma-separated)" value={form.hiringTechnologies} onChange={F("hiringTechnologies")}/>
          <input className="inp fspan" placeholder="Notable Products (comma-separated)" value={form.notableProducts} onChange={F("notableProducts")}/>
          <input className="inp fspan" placeholder="Career Benefits (comma-separated)" value={form.careerBenefits} onChange={F("careerBenefits")}/>
          <input className="inp" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={F("linkedinUrl")}/>
          <input className="inp" placeholder="Website URL" value={form.websiteUrl} onChange={F("websiteUrl")}
            onBlur={e=>{ if(e.target.value && !form.logoUrl) autoFetchLogo(form.name, e.target.value); }}/>
          <input className="inp" placeholder="Jobs URL" value={form.jobsUrl} onChange={F("jobsUrl")}/>
          <input className="inp" placeholder="Glassdoor rating (e.g. 4.2)" value={form.glassdoor} onChange={F("glassdoor")}/>
          <div>
            <label style={{fontSize:11,color:"var(--text2)",display:"block",marginBottom:4}}>
              Match Score: {form.matchScore}%
            </label>
            <input type="range" min={0} max={100} value={form.matchScore} onChange={F("matchScore")} style={{width:"100%"}}/>
          </div>
          <input className="inp fspan" placeholder="Tags (comma-separated)" value={form.tags} onChange={F("tags")}/>
        </div>

        {/* Footer buttons */}
        <div style={{display:"flex",gap:10,marginTop:22,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-cyan" onClick={save}>{existing?"Save Changes":"Add Company"}</button>
        </div>
      </div>
    </div>
  );
}

/* COMPANIES — premium card grid */
/* COMPANY LOGO — Smart logo with Clearbit API + styled fallback */
/* SPOTIFY COMPANY CARD — Logo fills the card like Image 2 */
function SpotifyCompanyCard({ c, i, grad, stCol, logoUrl, initials, tags, stKey, isOwner, onSelect, onEdit, onDelete }) {
  const [logoOk,  setLogoOk]  = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const [hov,     setHov]     = useState(false);

  const cardH = 300;

  return (
    <div
      className="anim-up"
      onClick={onSelect}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        animationDelay:`${i*30}ms`,
        borderRadius:22, cursor:"pointer",
        overflow:"hidden", position:"relative",
        height:cardH,
        transition:"all .32s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hov
          ? `0 28px 60px rgba(0,0,0,.7), 0 0 0 1.5px ${stCol}50`
          : "0 6px 24px rgba(0,0,0,.5)",
        background: "#080E0C",
      }}>

      {/* ── FULL CARD BACKGROUND: logo image fills entire card ── */}

      {/* 1. Gradient bg always shown (also shows when logo loads) */}
      <div style={{
        position:"absolute", inset:0,
        background: grad,
        zIndex:0,
      }}/>

      {/* 2. Logo image — full cover, large and centered */}
      {!logoErr && (
        <img
          src={logoUrl}
          alt={c.name}
          onLoad={()=>setLogoOk(true)}
          onError={()=>setLogoErr(true)}
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"contain",
            objectPosition:"center 35%",
            zIndex:1,
            opacity: logoOk ? (hov ? 0.45 : 0.35) : 0,
            transition:"opacity .4s ease",
            padding:"24px 20px 80px",
            filter:"brightness(1.1) saturate(0.9)",
          }}
        />
      )}

      {/* 3. Big styled initial letter — shown when no logo */}
      {(logoErr || !logoOk) && (
        <div style={{
          position:"absolute", inset:0, zIndex:1,
          display:"flex", alignItems:"center", justifyContent:"center",
          paddingBottom:90,
        }}>
          <div style={{
            fontFamily:"Plus Jakarta Sans,sans-serif",
            fontWeight:900,
            fontSize:110,
            color:"rgba(255,255,255,.12)",
            lineHeight:1,
            letterSpacing:"-8px",
            userSelect:"none",
          }}>
            {initials}
          </div>
        </div>
      )}

      {/* 4. Bottom gradient — dark scrim so text is readable */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        background:"linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(4,10,8,.6) 55%, rgba(2,6,5,.95) 100%)",
      }}/>

      {/* 5. Top-right: hiring badge + owner controls */}
      <div style={{
        position:"absolute", top:14, right:14, zIndex:10,
        display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end",
      }}>
        {c.openRoles>0 && (
          <div style={{
            display:"flex", alignItems:"center", gap:5,
            padding:"5px 11px", borderRadius:20,
            background:"rgba(16,185,129,.22)",
            border:"1px solid rgba(16,185,129,.45)",
            backdropFilter:"blur(8px)",
          }}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#10B981",
              boxShadow:"0 0 7px #10B981",animation:"pulse 1.5s infinite"}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,
              color:"#10B981",letterSpacing:".12em"}}>HIRING · {c.openRoles}</span>
          </div>
        )}
        {isOwner && hov && (
          <div style={{display:"flex",gap:5}}>
            <button style={{
              padding:"4px 10px",borderRadius:8,fontSize:11,fontWeight:600,
              background:"rgba(0,151,178,.25)",color:"#5dd3e8",
              border:"1px solid rgba(0,151,178,.4)",cursor:"pointer",
            }} onClick={e=>{e.stopPropagation();onEdit();}}>Edit</button>
            <button style={{
              padding:"4px 10px",borderRadius:8,fontSize:11,fontWeight:600,
              background:"rgba(244,63,94,.2)",color:"#F43F5E",
              border:"1px solid rgba(244,63,94,.35)",cursor:"pointer",
            }} onClick={e=>{e.stopPropagation();onDelete();}}>Del</button>
          </div>
        )}
      </div>

      {/* 6. Stage badge top-left */}
      <div style={{
        position:"absolute", top:14, left:14, zIndex:10,
      }}>
        <span style={{
          padding:"4px 11px", borderRadius:20, fontSize:10, fontWeight:700,
          background:`${stCol}28`, color:stCol,
          border:`1px solid ${stCol}50`,
          backdropFilter:"blur(8px)",
          fontFamily:"var(--font-mono)", letterSpacing:".08em",
        }}>
          {(()=>{const s=c.stage||"";return s.toLowerCase().includes("public")?"PUBLIC":s.toLowerCase().includes("growth")?"GROWTH":(s.length>10?s.slice(0,10)+"…":s||"—").toUpperCase();})()}
        </span>
      </div>

      {/* 7. BOTTOM CONTENT — company name, description, tags, button */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, zIndex:5,
        padding:"0 18px 0",
      }}>
        {/* Company name — big, bold, white */}
        <div style={{
          fontFamily:"Plus Jakarta Sans,sans-serif",
          fontWeight:800, fontSize:22,
          color:"#FFFFFF",
          letterSpacing:"-.5px", lineHeight:1.2,
          marginBottom:6,
          textShadow:"0 2px 12px rgba(0,0,0,.8)",
        }}>
          {c.name}
        </div>

        {/* Description */}
        <p style={{
          fontSize:13, color:"rgba(255,255,255,.68)",
          lineHeight:1.55, margin:"0 0 12px",
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden",
          textShadow:"0 1px 6px rgba(0,0,0,.6)",
        }}>
          {c.description||`${c.name} is a ${c.industry||"technology"} company${c.headquarters?` based in ${c.headquarters}`:""}.`}
        </p>

        {/* Tags row — industry + keywords */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {tags.map((t,j)=>(
            <span key={j} style={{
              padding:"4px 10px", borderRadius:20,
              background:"rgba(255,255,255,.13)",
              backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.18)",
              fontSize:11, color:"rgba(255,255,255,.85)",
              fontWeight:600, whiteSpace:"nowrap",
            }}>{t}</span>
          ))}
          {c.size && (
            <span style={{
              display:"flex",alignItems:"center",gap:4,
              padding:"4px 10px",borderRadius:20,
              background:"rgba(255,255,255,.1)",
              backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.14)",
              fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:500,
            }}>
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              {c.size}
            </span>
          )}
        </div>

        {/* VIEW COMPANY button — full width white pill like Image 2 */}
        <div style={{
          width:"100%", padding:"12px 0",
          borderRadius:"0 0 22px 22px",
          background:"rgba(255,255,255,.12)",
          backdropFilter:"blur(16px)",
          border:"1px solid rgba(255,255,255,.18)",
          borderBottom:"none",
          textAlign:"center",
          fontFamily:"Plus Jakarta Sans,sans-serif",
          fontWeight:700, fontSize:13,
          color: hov ? "#fff" : "rgba(255,255,255,.75)",
          letterSpacing:".02em",
          transition:"all .2s",
          background: hov ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.12)",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          margin:"0 -18px",
          cursor:"pointer",
        }}>
          View Company
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </div>
      </div>

    </div>
  );
}

function CompanyLogo({ name, logoUrl, grad, stCol, initials }) {
  const [status, setStatus] = useState("loading"); // loading | ok | err

  // Known domains for popular companies
  const KNOWN = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","byju":"byjus.com",
    "cred":"getcred.app","meesho":"meesho.com","groww":"groww.in",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","twitter":"twitter.com","slack":"slack.com",
    "salesforce":"salesforce.com","adobe":"adobe.com","oracle":"oracle.com",
    "ibm":"ibm.com","intel":"intel.com","qualcomm":"qualcomm.com",
    "zensar":"zensar.com","bristlecone":"bristlecone.com",
    "digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
  };

  const key = (name||"").toLowerCase().replace(/[^a-z]/g,"");
  const knownDomain = Object.entries(KNOWN).find(([k])=>key.includes(k))?.[1];
  const finalUrl = knownDomain
    ? `https://logo.clearbit.com/${knownDomain}`
    : logoUrl;

  if (status === "ok") {
    return (
      <div style={{
        width:80, height:80, borderRadius:18,
        background:"rgba(255,255,255,.97)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden", flexShrink:0,
        boxShadow:`0 8px 28px rgba(0,0,0,.45), 0 0 0 2px ${stCol}30`,
        zIndex:2, position:"relative",
      }}>
        <img src={finalUrl} alt={name}
          style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }}/>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <>
        <img src={finalUrl} alt={name} style={{display:"none"}}
          onLoad={()=>setStatus("ok")}
          onError={()=>setStatus("err")}/>
        {/* show styled initials while loading */}
        <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>
      </>
    );
  }

  // fallback: styled gradient initials tile
  return <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>;
}

function StyledInitials({ grad, stCol, initials, name }) {
  // Pick icon based on industry keywords
  const n = (name||"").toLowerCase();
  const iconPath = n.includes("bank")||n.includes("pay")||n.includes("fin")
    ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    : n.includes("health")||n.includes("med")||n.includes("pharma")
    ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    : n.includes("cloud")||n.includes("aws")||n.includes("azure")
    ? "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    : n.includes("ai")||n.includes("ml")||n.includes("data")
    ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    : "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";

  return (
    <div style={{
      width:82, height:82, borderRadius:20, flexShrink:0,
      background:grad, position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      boxShadow:`0 8px 28px rgba(0,0,0,.5), 0 0 0 2px ${stCol}35`,
      zIndex:2,
    }}>
      {/* shine */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(135deg,rgba(255,255,255,.25) 0%,transparent 55%)",
        pointerEvents:"none" }}/>
      {/* icon */}
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,.9)" strokeWidth="1.5" strokeLinecap="round"
        style={{ marginBottom:4 }}>
        <path d={iconPath}/>
      </svg>
      {/* initials */}
      <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
        fontSize:13, color:"rgba(255,255,255,.95)", letterSpacing:"-.3px",
        lineHeight:1, textAlign:"center", maxWidth:70,
        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        padding:"0 4px" }}>
        {initials}
      </div>
    </div>
  );
}

function Companies({ isOwner, items, setItems }) {
  const [search, setSearch]   = useState("");
  const [stageF, setStageF]   = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);

  // ── sync: when items changes externally, keep selected in sync ──
  useEffect(() => {
    if (selected) {
      const updated = items.find(x => x.id === selected.id);
      if (updated) setSelected(updated); else setSelected(null);
    }
  }, [items]);

  const filtered = items.filter(c => {
    const ok = stageF === "ALL" || c.stage === stageF;
    if (!ok) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return [c.name,c.industry,c.headquarters,c.stage,...(c.tags||[]),...(c.hiringTechnologies||[])].some(v=>typeof v==="string"&&v.toLowerCase().includes(s));
  });

  const handleSave = co => {
    setItems(prev => editing ? prev.map(x=>x.id===co.id?co:x) : [...prev, co]);
    setModal(false); setEditing(null);
  };

  if (selected) return (
    <CompanyDetail c={selected} onBack={()=>setSelected(null)} isOwner={isOwner}
      onDelete={id=>{setItems(p=>p.filter(x=>x.id!==id));setSelected(null);}}
      onEdit={()=>{setEditing(selected);setSelected(null);setModal(true);}}/>
  );

  return (
    <div style={{ height:"100%",display:"flex",flexDirection:"column",gap:14 }}>
      {modal && <CompanyModal existing={editing} onSave={handleSave} onClose={()=>{setModal(false);setEditing(null);}}/>}

      {/* search + controls */}
      <div style={{ display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search companies, tech, industry…"/>
        {isOwner && <button className="btn btn-cyan" onClick={()=>{setEditing(null);setModal(true);}}>
          <Ico d="M12 5v14M5 12h14" s={13}/>Add Company
        </button>}
      </div>

      {/* stage filter pills */}
      <div style={{ display:"flex",gap:6,flexWrap:"wrap",alignItems:"center" }}>
        {["ALL","Public","Private","Startup","Series A","Series B","Series C+","Growth"].map(s=>(
          <button key={s} onClick={()=>setStageF(s)} style={{
            padding:"5px 12px",borderRadius:20,fontFamily:"var(--font-mono)",fontSize:10,fontWeight:600,
            cursor:"pointer",border:"1px solid",transition:"all .15s",letterSpacing:".04em",textTransform:"uppercase",
            background: stageF===s ? (STAGE_COL[s]||"#0097b2")+"22" : "rgba(255,255,255,.04)",
            borderColor: stageF===s ? (STAGE_COL[s]||"#0097b2")+"55" : "var(--border2)",
            color: stageF===s ? (STAGE_COL[s]||"#0097b2") : "var(--text3)",
          }}>{s}</button>
        ))}
        <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",marginLeft:6 }}>{filtered.length} results</span>
      </div>

      {items.length===0 ? (
        <div className="empty">
          <div style={{ width:60,height:60,borderRadius:16,background:"rgba(0,151,178,.1)",border:"1px solid rgba(0,151,178,.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Ico d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" s={26} c="#0097b2"/>
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:18,color:"var(--text)" }}>{isOwner?"No companies yet":"No companies available"}</div>
          <div style={{ fontSize:13,maxWidth:320,lineHeight:1.65,color:"var(--text2)" }}>{isOwner?"Type a company name — AI fetches the full intelligence profile instantly.":"The owner hasn't added companies yet."}</div>
          {isOwner && <button className="btn btn-cyan" onClick={()=>setModal(true)}>Add First Company</button>}
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
          gap:18, overflowY:"auto", flex:1, paddingRight:4
        }} className="scrollbar">
          {filtered.map((c,i)=>{
            const grad  = coGrad(c.name);
            const stKey = c.stage?.includes("Public")?"Public":c.stage?.includes("Growth")?"Growth":c.stage||"";
            const stCol = STAGE_COL[stKey]||STAGE_COL[c.stage]||"#0097b2";
            const KNOWN_DOMAINS = {
              "google":"google.com","meta":"meta.com","facebook":"facebook.com",
              "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
              "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
              "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
              "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
              "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
              "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
              "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
              "digitalocean":"digitalocean.com","stripe":"stripe.com",
              "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
              "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
              "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
              "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
              "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
              "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
              "cimpress":"cimpress.com","insight":"insight.com",
              "billdesk":"billdesk.com","pine labs":"pinelabs.com",
              "phonepe":"phonepe.com","zerodha":"zerodha.com",
            };
            const nameKey = (c.name||"").toLowerCase().replace(/[^a-z ]/g,"");
            const knownDomain = Object.entries(KNOWN_DOMAINS)
              .find(([k])=>nameKey.includes(k))?.[1];
            const fallbackDomain = (c.website||"")
              .replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0]
              || (c.name||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
            const logoUrl = c.logoUrl || `https://logo.clearbit.com/${knownDomain||fallbackDomain}`;
            const initials = (c.name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();
            const tags = [c.industry, ...(c.tags||[])].filter(Boolean).slice(0,3);

            return (
              <SpotifyCompanyCard
                key={c.id}
                c={c} i={i}
                grad={grad} stCol={stCol}
                logoUrl={logoUrl} initials={initials}
                tags={tags} stKey={stKey}
                isOwner={isOwner}
                onSelect={()=>setSelected(c)}
                onEdit={()=>{setEditing(c);setModal(true);}}
                onDelete={()=>setItems(p=>p.filter(x=>x.id!==c.id))}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* GENERIC SECTION */
function GenSection({ title, accentColor, accentClass, icon, isOwner, fields, cardRender, detailRender, emptyMsg, searchPlaceholder, btnClass, aiType, items, setItems }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const def = fields.reduce((a,f)=>({...a,[f.key]:f.default||""}),{});

  const filtered = items.filter(item=>{
    if(!search)return true;
    const s=search.toLowerCase();
    return Object.values(item).some(v=>typeof v==="string"&&v.toLowerCase().includes(s))||(Array.isArray(item.tags)&&item.tags.some(t=>t.toLowerCase().includes(s)));
  });

  // ── sync: when items changes (admin write), keep selected view in sync ──
  useEffect(() => {
    if (selected) {
      const updated = items.find(x => x.id === selected.id);
      if (updated) setSelected(updated); else setSelected(null);
    }
  }, [items]);

  const openAdd=()=>{setForm(def);setEditing(null);setModal(true);};
  const openEdit=item=>{setForm({...item,tags:(item.tags||[]).join(", ")});setEditing(item);setModal(true);};
  const save=()=>{
    if(!form[fields[0].key]?.trim())return;
    const d={...form,id:editing?.id||Date.now(),tags:form.tags?form.tags.split(",").map(t=>t.trim()).filter(Boolean):[]};
    setItems(i=>editing?i.map(x=>x.id===d.id?d:x):[...i,d]);
    setModal(false);setEditing(null);
  };
  const del=id=>{setItems(i=>i.filter(x=>x.id!==id));setSelected(null);};

  const handleAIPaste = d => {
    setForm(p => {
      const merged = { ...p };
      Object.keys(d).forEach(k => {
        if (d[k] !== undefined && d[k] !== null && d[k] !== "") {
          if (Array.isArray(d[k])) merged[k] = d[k].join(", ");
          else merged[k] = String(d[k]);
        }
      });
      return merged;
    });
  };

  if(selected) return (
    <div className="detail" style={{ padding:"28px 34px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:26 }}>
        <button className="btn btn-ghost" onClick={()=>setSelected(null)}><Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/>Back</button>
        {isOwner&&<div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-ghost" onClick={()=>{openEdit(selected);setSelected(null);}}>Edit</button>
          <button className="btn btn-sm" style={{ background:"rgba(255,107,107,0.12)", color:"var(--coral)", border:"1px solid rgba(255,107,107,0.25)" }} onClick={()=>del(selected.id)}>Delete</button>
        </div>}
      </div>
      {detailRender(selected)}
    </div>
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", gap:14 }}>
      {modal&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              <div className="f-display" style={{ fontSize:20, color:"var(--cream)" }}>{editing?`Edit ${title}`:`Add ${title}`}</div>
              <button className="btn btn-ghost btn-sm" onClick={()=>setModal(false)}>✕</button>
            </div>

            {/* AI Smart Fetch — name only, works for every section */}
            {aiType && <AISmartFetch sectionType={aiType} onData={handleAIPaste} />}

            <div style={{ height:1, background:"var(--line)", margin:"4px 0 18px" }} />
            <SL ch="FIELDS — auto-filled above, edit as needed" col={accentColor} />

            <div className="fg fg2" style={{ marginTop:12 }}>
              {fields.map(f=>{
                if(f.type==="textarea") return <textarea key={f.key} className={`inp ${f.span?"fspan":""}`} placeholder={f.label} rows={f.rows||3} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}/>;
                if(f.type==="select") return <select key={f.key} className={`inp ${f.span?"fspan":""}`} value={form[f.key]||f.options[0]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}>{f.options.map(o=><option key={o}>{o}</option>)}</select>;
                if(f.type==="range") return <div key={f.key}><label style={{ fontSize:11,color:"var(--muted)",display:"block",marginBottom:4 }}>{f.label}: {form[f.key]||0}%</label><input type="range" min={0} max={100} value={form[f.key]||0} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={{ width:"100%",accentColor }}/></div>;
                return <input key={f.key} className={`inp ${f.span?"fspan":""}`} placeholder={f.label} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}/>;
              })}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
              <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
              <button className={`btn ${btnClass}`} onClick={save}>{editing?"Save Changes":`Add ${title}`}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <SearchBar value={search} onChange={setSearch} placeholder={searchPlaceholder||`Search ${title.toLowerCase()}...`} />
        {isOwner&&<button className={`btn ${btnClass}`} onClick={openAdd}><Ico d="M12 5v14M5 12h14" s={13}/>Add {title}</button>}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", letterSpacing:".12em" }}>
        {filtered.length} {title.toLowerCase()} · click any card to explore
      </div>

      {items.length===0?(
        <div className="empty">
          <div style={{ width:64, height:64, borderRadius:18, background:accentColor+"14", border:`1px solid ${accentColor}28`,
            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 32px ${accentColor}20` }}>
            <Ico d={icon} s={28} c={accentColor}/>
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:18, color:"var(--text)" }}>
            {isOwner?`No ${title} yet`:`No ${title} available`}
          </div>
          <div style={{ fontSize:13, maxWidth:320, lineHeight:1.65, color:"var(--text2)" }}>
            {isOwner ? emptyMsg : `The owner hasn't added any ${title.toLowerCase()} yet.`}
          </div>
          {isOwner && <button className={`btn ${btnClass}`} onClick={openAdd}>Add First {title}</button>}
        </div>
      ):(
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16,
          overflowY:"auto", flex:1, paddingRight:4 }} className="scrollbar">
          {filtered.map((item,i)=>(
            <div key={item.id} className="anim-up" style={{ animationDelay:`${i*35}ms` }}
              onClick={()=>setSelected(item)}>
              {cardRender(item,{isOwner,accentColor,onEdit:e=>{e?.stopPropagation();openEdit(item);},onDel:e=>{e?.stopPropagation();del(item.id);}})}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CARD SHELL — shared wrapper ───────────────────────────────────────── */
function CardShell({ accentColor, gradFrom, gradTo, children, footer }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        background: "var(--card)", position: "relative",
        border: `1px solid ${hovered ? accentColor + "44" : "var(--border)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,.5), 0 0 0 1px ${accentColor}22, 0 0 32px ${accentColor}18`
          : "0 2px 8px rgba(0,0,0,.2)",
        transition: "all .25s cubic-bezier(.16,1,.3,1)",
      }}>
      {/* top gradient bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${gradFrom || accentColor}, ${gradTo || accentColor + "88"})` }} />
      {/* subtle bg glow */}
      <div style={{ position:"absolute", top:0, right:0, width:160, height:160,
        background:`radial-gradient(circle, ${accentColor}0a 0%, transparent 70%)`,
        pointerEvents:"none", transition:"opacity .3s", opacity: hovered ? 1 : 0 }}/>
      {/* body */}
      <div style={{ padding: "18px 18px 14px", position:"relative" }}>{children}</div>
      {/* footer */}
      {footer && (
        <div style={{ padding:"10px 18px 14px", borderTop:"1px solid var(--border)",
          background: hovered ? `${accentColor}06` : "transparent", transition:"background .25s" }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* SECTION CONFIGS */
const SECCFG = {
  aiTools:{
    title:"AI Tools", accentColor:"#7ed957", accentClass:"cyan", btnClass:"btn-cyan",
    icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    emptyMsg:"Type the tool name — AI fetches category, pricing, use cases and description automatically.",
    searchPlaceholder:"Search by name, category, use case, pricing…",
    aiType:"aiTool",
    fields:[
      {key:"name",label:"Tool name *"},{key:"category",label:"Category",type:"select",options:["CODE","UI","RESEARCH","CLI","DOCS","MEDIA","LLM","DATA","DESIGN","GENERAL"]},
      {key:"pricing",label:"Pricing (Free / Paid / Freemium)"},{key:"link",label:"Tool URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},
      {key:"useCases",label:"Use cases (comma sep.)",span:true},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const CAT_COL = {CODE:"#7ed957",UI:"#006d82",RESEARCH:"#F59E0B",LLM:"#0097b2",DATA:"#10B981",DESIGN:"#EC4899",MEDIA:"#F43F5E",CLI:"#10B981",DOCS:"#7ed957",GENERAL:"#8B93A6"};
      const CAT_GR  = {CODE:"linear-gradient(135deg,#7ed957,#0097b2)",UI:"linear-gradient(135deg,#006d82,#EC4899)",RESEARCH:"linear-gradient(135deg,#F59E0B,#F43F5E)",LLM:"linear-gradient(135deg,#0097b2,#7ed957)",DATA:"linear-gradient(135deg,#10B981,#7ed957)",DESIGN:"linear-gradient(135deg,#EC4899,#006d82)",MEDIA:"linear-gradient(135deg,#F43F5E,#F59E0B)",CLI:"linear-gradient(135deg,#10B981,#7ed957)",DOCS:"linear-gradient(135deg,#7ed957,#006d82)",GENERAL:"linear-gradient(135deg,#8B93A6,#0097b2)"};
      const col = CAT_COL[item.category]||accentColor;
      const gr  = CAT_GR[item.category]||`linear-gradient(135deg,${col},${col}88)`;
      const pricingBg = item.pricing==="Free"?"rgba(16,185,129,.12)":item.pricing==="Freemium"?"rgba(245,158,11,.1)":"rgba(244,63,94,.1)";
      const pricingCol = item.pricing==="Free"?"#10B981":item.pricing==="Freemium"?"#F59E0B":"#F43F5E";
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"44"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700,letterSpacing:".08em" }}>EXPLORE →</span>
            </div>
          }>
          {/* icon + name row */}
          <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:14 }}>
            <div style={{ width:46,height:46,borderRadius:13,background:gr,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 6px 20px ${col}44` }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:800,fontSize:17,color:"#EDF0F7",letterSpacing:"-.3px",marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</div>
              <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}28`,textTransform:"uppercase" }}>{item.category}</span>
                {item.pricing && <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:pricingBg,color:pricingCol,border:`1px solid ${pricingCol}30` }}>{item.pricing}</span>}
              </div>
            </div>
          </div>
          {/* description */}
          <p style={{ fontSize:14,color:"#C4C9D6",lineHeight:1.7,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:38 }}>
            {item.description||"No description yet."}
          </p>
          {/* use-case pills */}
          {item.useCases && (
            <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
              {item.useCases.split(",").slice(0,3).map((u,i)=>(
                <span key={i} style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.05)",color:"var(--text3)",border:"1px solid var(--border2)" }}>{u.trim()}</span>
              ))}
            </div>
          )}
          {/* tag row */}
          {item.tags?.length>0 && (
            <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
              {item.tags.slice(0,3).map((t,i)=><span key={i} style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:600,background:`${col}10`,color:col,border:`1px solid ${col}20`,fontFamily:"var(--font-mono)",textTransform:"uppercase" }}>{t}</span>)}
            </div>
          )}
        </CardShell>
      );
    },
    detailRender:item=>{
      const CAT_COL = {CODE:"#7ed957",UI:"#006d82",RESEARCH:"#F59E0B",LLM:"#0097b2",DATA:"#10B981",DESIGN:"#EC4899",MEDIA:"#F43F5E",CLI:"#10B981",DOCS:"#7ed957",GENERAL:"#8B93A6"};
      const col = CAT_COL[item.category]||"#7ed957";
      return (
        <div style={{ maxWidth:700 }}>
          <div style={{ display:"flex",gap:10,marginBottom:16 }}>
            <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}30`,textTransform:"uppercase" }}>{item.category}</span>
            {item.pricing && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.1)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>{item.pricing}</span>}
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:16 }}>{item.name}</div>
          {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18,borderLeft:`3px solid ${col}` }}>
            <p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p>
          </div>}
          {item.useCases && <div style={{ padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18 }}>
            <SL ch="USE CASES" col={col}/>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:10 }}>
              {item.useCases.split(",").map((u,i)=><span key={i} style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:600,background:"rgba(0,109,130,.1)",color:"#006d82",border:"1px solid rgba(0,109,130,.2)",fontFamily:"var(--font-mono)" }}>{u.trim()}</span>)}
            </div>
          </div>}
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-cyan" style={{ textDecoration:"none" }}>Visit Tool →</a>}
        </div>
      );
    },
  },

  certifications:{
    title:"Certifications", accentColor:"#006d82", accentClass:"violet", btnClass:"btn-violet",
    icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    emptyMsg:"Type a certification name — AI fetches provider, level, duration and market demand automatically.",
    searchPlaceholder:"Search by name, provider, level, status…",
    aiType:"certification",
    fields:[
      {key:"name",label:"Certification name *"},{key:"provider",label:"Provider (e.g. Google, AWS)"},
      {key:"level",label:"Level",type:"select",options:["Beginner","Intermediate","Advanced","Expert","Professional"]},
      {key:"status",label:"Status",type:"select",options:["Available","Popular","Hot","Coming Soon"]},
      {key:"duration",label:"Duration"},{key:"demand",label:"Market Demand %",type:"range"},{key:"link",label:"Enroll URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const lvlCol = {Beginner:"#10B981",Intermediate:"#7ed957",Advanced:"#F59E0B",Expert:"#F43F5E",Professional:"#006d82"};
      const lvlGr  = {Beginner:"linear-gradient(135deg,#10B981,#7ed957)",Intermediate:"linear-gradient(135deg,#7ed957,#0097b2)",Advanced:"linear-gradient(135deg,#F59E0B,#F43F5E)",Expert:"linear-gradient(135deg,#F43F5E,#006d82)",Professional:"linear-gradient(135deg,#006d82,#EC4899)"};
      const col    = lvlCol[item.level]||accentColor;
      const gr     = lvlGr[item.level]||`linear-gradient(135deg,${accentColor},${accentColor}88)`;
      const demand = Number(item.demand)||0;
      const demandCol = demand>=80?"#10B981":demand>=60?"#F59E0B":"#F43F5E";
      const statusBg  = {Hot:"rgba(244,63,94,.12)",Popular:"rgba(245,158,11,.1)",Available:"rgba(16,185,129,.1)","Coming Soon":"rgba(0,151,178,.1)"};
      const statusCol = {Hot:"#F43F5E",Popular:"#F59E0B",Available:"#10B981","Coming Soon":"#0097b2"};
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"55"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"var(--font-mono)",fontSize:9,color:accentColor,textDecoration:"none",fontWeight:700 }}>ENROLL ↗</a> : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700,letterSpacing:".08em" }}>EXPLORE →</span>
            </div>
          }>
          {/* header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:5,marginBottom:9,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}30`,textTransform:"uppercase" }}>{item.level||"N/A"}</span>
                {item.status && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:statusBg[item.status]||"rgba(255,255,255,.05)",color:statusCol[item.status]||"var(--text3)",border:`1px solid ${statusCol[item.status]||"var(--border2)"}30`,textTransform:"uppercase" }}>{item.status}</span>}
              </div>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,color:"var(--text)",letterSpacing:"-.2px",marginBottom:4 }}>{item.name}</div>
              {item.provider && <div style={{ fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".06em" }}>{item.provider}{item.duration&&` · ${item.duration}`}</div>}
            </div>
            {/* demand ring */}
            <div style={{ width:48,height:48,borderRadius:"50%",background:`conic-gradient(${demandCol} ${demand*3.6}deg,rgba(255,255,255,.07) 0deg)`,
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:10 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"var(--card)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:demandCol }}>{demand}%</span>
              </div>
            </div>
          </div>
          {/* demand bar */}
          <div style={{ marginTop:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".12em" }}>MARKET DEMAND</span>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:demandCol }}>{demand}%</span>
            </div>
            <div style={{ height:5,background:"rgba(255,255,255,.07)",borderRadius:3,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${demand}%`,borderRadius:3,background:gr,
                transition:"width 1.2s ease",boxShadow:`0 0 8px ${col}55` }}/>
            </div>
          </div>
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:680 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.15)",color:"#006d82",border:"1px solid rgba(0,109,130,.3)",textTransform:"uppercase" }}>{item.level}</span>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)",textTransform:"uppercase" }}>{item.status}</span>
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:26,color:"#F0F4FF",letterSpacing:"-0.5px",marginBottom:6 }}>{item.name}</div>
        <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text2)",marginBottom:22 }}>{item.provider} · {item.duration}</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20 }}>
          {[{l:"Level",v:item.level,c:"#006d82"},{l:"Demand",v:`${item.demand}%`,c:"#10B981"},{l:"Duration",v:item.duration,c:"#7ed957"}].map((s,i)=>(
            <div key={i} style={{ padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`2px solid ${s.c}` }}>
              <div style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6 }}>{s.l}</div>
              <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.c }}>{s.v||"\u2014"}</div>
            </div>
          ))}
        </div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #006d82",marginBottom:18 }}>
          <p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p>
        </div>}
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-violet" style={{ textDecoration:"none" }}>Enroll Now →</a>}
      </div>
    ),
  },

  startups:{
    title:"Startups", accentColor:"#F59E0B", accentClass:"amber", btnClass:"btn-amber",
    icon:"M13 10V3L4 14h7v7l9-11h-7z",
    emptyMsg:"Type a startup name — AI fetches stage, equity range, tech stack, and why engineers love working there.",
    searchPlaceholder:"Search by name, stage, industry, tech…",
    aiType:"startup",
    fields:[
      {key:"name",label:"Startup name *"},{key:"stage",label:"Stage",type:"select",options:["Pre-Seed","Seed","Series A","Series B","Series C+","Growth","Public"]},
      {key:"industry",label:"Industry"},{key:"founded",label:"Founded year"},{key:"headcount",label:"Headcount"},
      {key:"equity",label:"Equity range (e.g. 0.1–1.5%)"},{key:"description",label:"Description",type:"textarea",span:true,rows:2},
      {key:"whyJoin",label:"Why Join",type:"textarea",span:true,rows:2},{key:"technologies",label:"Technologies (comma sep.)",span:true},
      {key:"linkedinUrl",label:"LinkedIn URL"},{key:"websiteUrl",label:"Website URL"},{key:"jobsUrl",label:"Jobs URL"},
      {key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const STAGE_C={"Pre-Seed":"#F43F5E","Seed":"#F59E0B","Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981","Public":"#0097b2"};
      const STAGE_G={"Pre-Seed":"linear-gradient(135deg,#F43F5E,#EC4899)","Seed":"linear-gradient(135deg,#F59E0B,#F43F5E)","Series A":"linear-gradient(135deg,#0097b2,#7ed957)","Series B":"linear-gradient(135deg,#006d82,#EC4899)","Series C+":"linear-gradient(135deg,#7ed957,#0097b2)","Growth":"linear-gradient(135deg,#10B981,#7ed957)","Public":"linear-gradient(135deg,#0097b2,#7ed957)"};
      const stageCol=STAGE_C[item.stage]||accentColor;
      const grad=STAGE_G[item.stage]||"linear-gradient(135deg,#F59E0B,#F43F5E)";
      return(
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .22s"}}
          onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${stageCol}50`;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,.4),0 0 0 1px ${stageCol}18`;}}
          onMouseLeave={e=>{e.currentTarget.style.border="1px solid var(--border)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
          {/* color top bar */}
          <div style={{height:4,background:grad}}/>
          <div style={{padding:20}}>
            {/* header row */}
            <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}>
              <div style={{width:52,height:52,borderRadius:14,background:grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:24,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 6px 20px ${stageCol}44`}}>
                {(item.name||"?")[0].toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:17,color:"#EDF0F7",letterSpacing:"-.3px",marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name||"Unnamed"}</div>
                <div style={{fontSize:13,color:"#8B93A6"}}>{item.industry||"Technology"}{item.founded?` · Est. ${item.founded}`:""}</div>
              </div>
              <span style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,background:`${stageCol}20`,color:stageCol,border:`1px solid ${stageCol}40`,flexShrink:0,whiteSpace:"nowrap"}}>{item.stage||"Startup"}</span>
            </div>
            {/* description */}
            <p style={{fontSize:14,color:"#C4C9D6",lineHeight:1.7,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
              {item.description||"No description available."}
            </p>
            {/* info badges */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {item.equity&&<span style={{padding:"5px 12px",borderRadius:8,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>💰 Equity {item.equity}</span>}
              {item.headcount&&<span style={{padding:"5px 12px",borderRadius:8,fontSize:13,background:"rgba(255,255,255,.06)",color:"#8B93A6",border:"1px solid rgba(255,255,255,.1)"}}>👥 {item.headcount} employees</span>}
            </div>
            {/* tech tags */}
            {item.technologies&&(
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                {item.technologies.split(",").slice(0,3).map((t,i)=>(
                  <span key={i} style={{padding:"4px 10px",borderRadius:6,fontSize:12,background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)"}}>{t.trim()}</span>
                ))}
              </div>
            )}
          </div>
          {/* footer */}
          <div style={{padding:"12px 20px 14px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,.15)"}}>
            <div style={{display:"flex",gap:8}}>
              {item.linkedinUrl&&<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:"rgba(10,102,194,.15)",border:"1px solid rgba(10,102,194,.3)",borderRadius:7,fontSize:12,color:"#5B9BD5",textDecoration:"none",fontWeight:600}}>LinkedIn</a>}
              {item.jobsUrl&&<a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:`${stageCol}15`,border:`1px solid ${stageCol}30`,borderRadius:7,fontSize:12,color:stageCol,textDecoration:"none",fontWeight:700}}>View Jobs ↗</a>}
              {isOwner&&<><button className="btn btn-ghost btn-sm" onClick={e=>{e.stopPropagation();onEdit();}} style={{fontSize:12}}>Edit</button><button className="btn btn-sm" style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)",fontSize:12}} onClick={e=>{e.stopPropagation();onDel();}}>Del</button></>}
            </div>
            <span style={{fontSize:13,color:stageCol,fontWeight:700}}>View Details →</span>
          </div>
        </div>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:700 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.15)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.3)",textTransform:"uppercase" }}>{item.stage}</span>
          {item.equity && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>Equity {item.equity}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:26,color:"#F0F4FF",letterSpacing:"-0.5px",marginBottom:6 }}>{item.name}</div>
        <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text2)",marginBottom:20 }}>{[item.industry,item.founded&&`Est. ${item.founded}`,item.headcount&&`${item.headcount} employees`].filter(Boolean).join(" · ")}</div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #F59E0B",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.whyJoin && <div style={{ padding:18,background:"rgba(16,185,129,.05)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,marginBottom:18 }}><SL ch="WHY JOIN?" col="#10B981"/><p style={{ fontSize:12,lineHeight:1.7,marginTop:6 }}>{item.whyJoin}</p></div>}
        {item.technologies && <div style={{ marginBottom:18 }}><SL ch="TECHNOLOGIES" col="#7ed957"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:8 }}>{item.technologies.split(",").map((t,i)=><span key={i} className="tag" style={{ background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)" }}>{t.trim()}</span>)}</div></div>}
        <div style={{ display:"flex",gap:10 }}>
          {item.linkedinUrl&&<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration:"none" }}>LinkedIn</a>}
          {item.websiteUrl&&<a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration:"none" }}>Website</a>}
          {item.jobsUrl&&<a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-amber" style={{ textDecoration:"none" }}>View Jobs →</a>}
        </div>
      </div>
    ),
  },

  resumeModels:{
    title:"Resume Models", accentColor:"#F43F5E", accentClass:"coral", btnClass:"btn-coral",
    icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    emptyMsg:"Type a template name or role — AI fetches format, ATS score, tips and description automatically.",
    searchPlaceholder:"Search by role type, format, ATS score…",
    aiType:"resumeModel",
    fields:[
      {key:"name",label:"Template name *"},
      {key:"type",label:"Role type",type:"select",options:["Engineering","Product","Design","ML/AI","Management","Startup","Sales","Research","DevRel","Other"]},
      {key:"format",label:"Format",type:"select",options:["Chronological","Functional","Hybrid","One-page","Two-page","Portfolio"]},
      {key:"atsScore",label:"ATS Score (e.g. 92%)"},{key:"link",label:"Download / preview URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},{key:"tips",label:"Tips for using this template",type:"textarea",span:true,rows:2},
      {key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const ats = parseInt(item.atsScore)||0;
      const atsCol = ats>=90?"#10B981":ats>=75?"#F59E0B":"#F43F5E";
      const TYPE_COL = {Engineering:"#7ed957",Product:"#0097b2",Design:"#EC4899","ML/AI":"#006d82",Management:"#F59E0B",Startup:"#F43F5E",Sales:"#10B981",Research:"#006d82",DevRel:"#7ed957",Other:"#8B93A6"};
      const typeCol = TYPE_COL[item.type]||accentColor;
      return (
        <CardShell accentColor={typeCol} gradFrom={typeCol} gradTo={accentColor}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:accentColor,fontWeight:700 }}>VIEW →</span>
            </div>
          }>
          {/* doc icon + title */}
          <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:14 }}>
            <div style={{ width:46,height:56,borderRadius:10,background:`linear-gradient(135deg,${typeCol}22,${accentColor}18)`,border:`1px solid ${typeCol}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0 }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={typeCol} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:7,color:typeCol,fontWeight:700,letterSpacing:".05em" }}>CV</span>
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,color:"var(--text)",letterSpacing:"-.2px",marginBottom:6 }}>{item.name}</div>
              <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${typeCol}18`,color:typeCol,border:`1px solid ${typeCol}28`,textTransform:"uppercase" }}>{item.type}</span>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.1)",color:"#006d82",border:"1px solid rgba(0,109,130,.2)" }}>{item.format}</span>
              </div>
            </div>
            {item.atsScore && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",background:`${atsCol}12`,border:`1px solid ${atsCol}25`,borderRadius:10,padding:"8px 10px",flexShrink:0 }}>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:7,color:"var(--text3)",letterSpacing:".1em" }}>ATS</span>
                <span style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:18,color:atsCol,lineHeight:1.1,letterSpacing:"-0.5px" }}>{item.atsScore}</span>
              </div>
            )}
          </div>
          <p style={{ fontSize:12,color:"var(--text2)",lineHeight:1.65,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:38 }}>
            {item.description||"No description yet."}
          </p>
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:660 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(244,63,94,.12)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.3)",textTransform:"uppercase" }}>{item.type}</span>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.12)",color:"#006d82",border:"1px solid rgba(0,109,130,.25)" }}>{item.format}</span>
          {item.atsScore && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>ATS {item.atsScore}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"var(--text)",letterSpacing:"-0.5px",marginBottom:16 }}>{item.name}</div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #F43F5E",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.tips && <div style={{ padding:18,background:"rgba(244,63,94,.05)",border:"1px solid rgba(244,63,94,.2)",borderRadius:12,marginBottom:18 }}><SL ch="TEMPLATE TIPS" col="#F43F5E"/><p style={{ fontSize:12,lineHeight:1.7,marginTop:6 }}>{item.tips}</p></div>}
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-coral" style={{ textDecoration:"none" }}>Download →</a>}
      </div>
    ),
  },

  careerPath:{
    title:"Career Path", accentColor:"#10B981", accentClass:"lime", btnClass:"btn-lime",
    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    emptyMsg:"Type a career transition (e.g. 'Senior Engineer to Staff') — AI generates the full roadmap, milestones and skills.",
    searchPlaceholder:"Search by role, skill, difficulty, timeline…",
    aiType:"careerPath",
    fields:[
      {key:"name",label:"Path title *",span:true},{key:"currentRole",label:"Current role"},{key:"targetRole",label:"Target role"},
      {key:"timeline",label:"Timeline (e.g. 12–18 months)"},{key:"salaryJump",label:"Expected salary jump (e.g. +30%)"},
      {key:"difficulty",label:"Difficulty",type:"select",options:["Beginner","Intermediate","Advanced","Expert"]},
      {key:"skills",label:"Key skills (comma sep.)",span:true},
      {key:"milestones",label:"Milestones (one per line)",type:"textarea",span:true,rows:4},
      {key:"description",label:"Overview",type:"textarea",span:true,rows:2},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const diffCol = {Beginner:"#10B981",Intermediate:"#F59E0B",Advanced:"#F43F5E",Expert:"#006d82"};
      const diffGr  = {Beginner:"linear-gradient(135deg,#10B981,#7ed957)",Intermediate:"linear-gradient(135deg,#F59E0B,#F43F5E)",Advanced:"linear-gradient(135deg,#F43F5E,#006d82)",Expert:"linear-gradient(135deg,#006d82,#EC4899)"};
      const col = diffCol[item.difficulty]||accentColor;
      const gr  = diffGr[item.difficulty]||`linear-gradient(135deg,${accentColor},${accentColor}88)`;
      const milestoneCount = item.milestones ? item.milestones.split("\n").filter(Boolean).length : 0;
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"55"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700 }}>VIEW PATH →</span>
            </div>
          }>
          {/* tags row */}
          <div style={{ display:"flex",gap:5,marginBottom:10,flexWrap:"wrap" }}>
            {item.difficulty && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}28`,textTransform:"uppercase" }}>{item.difficulty}</span>}
            {item.timeline && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.1)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.25)" }}>{item.timeline}</span>}
            {milestoneCount>0 && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.05)",color:"var(--text3)",border:"1px solid var(--border2)" }}>{milestoneCount} steps</span>}
          </div>
          {/* title */}
          <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:15,color:"var(--text)",letterSpacing:"-.2px",marginBottom:12,lineHeight:1.35 }}>{item.name}</div>
          {/* route row */}
          {(item.currentRole||item.targetRole) && (
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 12px",
              background:`${col}08`,border:`1px solid ${col}20`,borderRadius:10,marginBottom:12 }}>
              {item.currentRole && <span style={{ fontSize:11,color:"var(--text2)",fontWeight:500,flex:1 }}>{item.currentRole}</span>}
              <div style={{ flexShrink:0,width:28,height:2,background:gr,borderRadius:1 }}/>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              {item.targetRole && <span style={{ fontSize:11,color:col,fontWeight:700,flex:1,textAlign:"right" }}>{item.targetRole}</span>}
            </div>
          )}
          {/* salary highlight */}
          {item.salaryJump && (
            <div style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",background:"rgba(16,185,129,.09)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:13,color:"#10B981",letterSpacing:"-.2px" }}>{item.salaryJump} expected</span>
            </div>
          )}
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:720 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          {item.difficulty && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.15)",color:"#10B981",border:"1px solid rgba(16,185,129,.3)",textTransform:"uppercase" }}>{item.difficulty}</span>}
          {item.timeline && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.12)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.28)" }}>{item.timeline}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"var(--text)",letterSpacing:"-0.5px",marginBottom:16 }}>{item.name}</div>
        {(item.currentRole||item.targetRole) && (
          <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,marginBottom:20 }}>
            {item.currentRole && <span style={{ fontSize:14,color:"var(--text2)",fontWeight:600 }}>{item.currentRole}</span>}
            <div style={{ flex:1,height:2,background:"linear-gradient(to right,rgba(16,185,129,.3),#10B981)",borderRadius:1 }}/>
            {item.targetRole && <span style={{ fontSize:14,color:"#10B981",fontWeight:700 }}>{item.targetRole}</span>}
          </div>
        )}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20 }}>
          {[{l:"Timeline",v:item.timeline,c:"#F59E0B"},{l:"Salary Jump",v:item.salaryJump,c:"#10B981"},{l:"Difficulty",v:item.difficulty,c:"#F43F5E"}].map((s,i)=>(
            <div key={i} style={{ padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`2px solid ${s.c}` }}>
              <div style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6 }}>{s.l}</div>
              <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.c }}>{s.v||"\u2014"}</div>
            </div>
          ))}
        </div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #10B981",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.skills && <div style={{ marginBottom:18 }}><SL ch="KEY SKILLS" col="#7ed957"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:8 }}>{item.skills.split(",").map((s,i)=><span key={i} className="tag" style={{ background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)" }}>{s.trim()}</span>)}</div></div>}
        {item.milestones && <div style={{ padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18 }}>
          <SL ch="MILESTONES" col="#10B981"/>
          <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:12 }}>
            {item.milestones.split("\n").filter(Boolean).map((m,i)=>(
              <div key={i} style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                <div style={{ width:24,height:24,borderRadius:8,background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"#10B981" }}>{i+1}</span>
                </div>
                <span style={{ fontSize:13,lineHeight:1.6,color:"var(--text2)",paddingTop:3 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>}
        {item.tags?.length>0 && <div><SL ch="TAGS"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:6 }}>{item.tags.map((t,i)=><span key={i} className="tag" style={{ background:"rgba(16,185,129,.1)",color:"#10B981",border:"1px solid rgba(16,185,129,.2)" }}>{t}</span>)}</div></div>}
      </div>
    ),
  },
};


export { AI_PROMPTS, AI_LABELS, SECCFG };
