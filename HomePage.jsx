import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default AISmartFetch;
