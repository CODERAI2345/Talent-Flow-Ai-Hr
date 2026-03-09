import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default CompanyModal;
