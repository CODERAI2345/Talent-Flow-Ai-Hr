import React, { useState, useEffect, useRef, useCallback } from "react";

function AdminQuickAddPanel({ coData, setCoData, secData, setSecData }) {
  const SEC_KEYS = [
    {key:"company",      label:"Company",       color:"#0097b2"},
    {key:"startup",      label:"Startup",       color:"#F59E0B"},
    {key:"aiTool",       label:"AI Tool",       color:"#7ed957"},
    {key:"certification",label:"Certification", color:"#006d82"},
    {key:"resumeModel",  label:"Resume Model",  color:"#F43F5E"},
    {key:"careerPath",   label:"Career Path",   color:"#10B981"},
  ];
  const [secKey, setSecKey] = useState("company");
  const [form, setForm]     = useState({});
  const [saved, setSaved]   = useState(false);

  const handleAI = d => {
    const m = {};
    Object.keys(d).forEach(k => {
      if (d[k] !== undefined && d[k] !== null && d[k] !== "")
        m[k] = Array.isArray(d[k]) ? d[k].join(", ") : String(d[k]);
    });
    setForm(m); setSaved(false);
  };

  const saveItem = () => {
    if (!form.name?.trim()) { alert("Name is required"); return; }
    const arr = s => s ? s.split(",").map(x=>x.trim()).filter(Boolean) : [];
    const id = Date.now();
    if (secKey==="company") {
      const item = {...form, id,
        hiringTechnologies: arr(form.hiringTechnologies),
        notableProducts:    arr(form.notableProducts),
        careerBenefits:     arr(form.careerBenefits),
        tags:               arr(form.tags),
        matchScore:         Number(form.matchScore)||80
      };
      setCoData(p => [...p, item]);
    } else if (secKey==="startup") {
      setSecData(p => ({...p, startups: [...(p.startups||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="aiTool") {
      setSecData(p => ({...p, aiTools: [...(p.aiTools||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="certification") {
      setSecData(p => ({...p, certifications: [...(p.certifications||[]), {...form, id, demand: Number(form.demand)||70, tags: arr(form.tags)}]}));
    } else if (secKey==="resumeModel") {
      setSecData(p => ({...p, resumeModels: [...(p.resumeModels||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="careerPath") {
      setSecData(p => ({...p, careerPath: [...(p.careerPath||[]), {...form, id, tags: arr(form.tags)}]}));
    }
    setSaved(true); setForm({});
    setTimeout(() => setSaved(false), 3000);
  };

  const activeColor = SEC_KEYS.find(s=>s.key===secKey)?.color || "#16A34A";

  const TEXTAREA_FIELDS = new Set(["description","milestones","tips","whyJoin","organizationStrength","futureDirection","coreStrength","skills"]);

  return (
    <div>
      {/* Section tabs */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {SEC_KEYS.map(s => (
          <button key={s.key}
            className={`sec-tab act-${s.key === secKey ? s.key : ""}`}
            style={{ borderColor: s.key === secKey ? s.color+"60" : "var(--border2)",
                     background: s.key === secKey ? s.color+"18" : "transparent",
                     color: s.key === secKey ? s.color : "var(--text3)" }}
            onClick={() => { setSecKey(s.key); setForm({}); setSaved(false); }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* AI Fetch — now with bulk text support */}
      <AISmartFetch sectionType={secKey} onData={handleAI} />

      {/* Auto-filled fields preview */}
      {Object.keys(form).length > 0 && (
        <div style={{ marginTop:16, padding:20, background:"var(--card)", border:"1px solid var(--border2)", borderRadius:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:activeColor, boxShadow:`0 0 8px ${activeColor}` }}/>
            <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,letterSpacing:".18em",color:activeColor,textTransform:"uppercase" }}>
              REVIEW & EDIT BEFORE SAVING
            </span>
            <span style={{ fontSize:11,color:"var(--text2)",marginLeft:4 }}>({Object.keys(form).filter(k=>form[k]).length} fields filled)</span>
          </div>
          <div className="fg fg2">
            {Object.keys(form).filter(k => form[k] !== "" && form[k] !== undefined).map(k => (
              <div key={k} className={TEXTAREA_FIELDS.has(k) ? "fspan" : ""}>
                <label style={{ display:"block", fontSize:11, fontWeight:600, color:"var(--text2)", marginBottom:5, fontFamily:"var(--font-body)", textTransform:"capitalize" }}>{k.replace(/([A-Z])/g," $1")}</label>
                {TEXTAREA_FIELDS.has(k)
                  ? <textarea className="inp fspan" rows={3} value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
                  : <input className="inp" value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
                }
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:16, alignItems:"center", borderTop:"1px solid var(--border)", paddingTop:16 }}>
            <button className="btn btn-cyan" onClick={saveItem} style={{ flex:1, justifyContent:"center", padding:"10px 0" }}>
              ✓ Save & Sync to Platform
            </button>
            <button className="btn btn-ghost" onClick={()=>{setForm({});setSaved(false);}}>Clear</button>
            {saved && (
              <div style={{ padding:"8px 14px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.25)", borderRadius:8, fontSize:12, fontWeight:700, color:"#10B981" }}>
                ✓ Saved! Now live in user portal.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* STARTUP CAROUSEL — swipeable stacked cards + depth */
/* Rich 8-palette cinematic gradients — each card unique */
const STARTUP_PALETTES = [
  { a:"rgba(0,212,255,0.38)",   b:"rgba(167,139,250,0.28)", c:"rgba(0,100,120,0.5)"  },
  { a:"rgba(245,158,11,0.42)",  b:"rgba(255,107,107,0.28)", c:"rgba(80,30,0,0.55)"   },
  { a:"rgba(184,255,94,0.32)",  b:"rgba(0,212,255,0.22)",   c:"rgba(20,60,10,0.5)"   },
  { a:"rgba(167,139,250,0.42)", b:"rgba(255,107,107,0.28)", c:"rgba(40,10,80,0.55)"  },
  { a:"rgba(255,107,107,0.38)", b:"rgba(245,158,11,0.28)",  c:"rgba(80,0,0,0.5)"     },
  { a:"rgba(0,212,255,0.32)",   b:"rgba(184,255,94,0.22)",  c:"rgba(0,40,80,0.5)"    },
  { a:"rgba(245,158,11,0.38)",  b:"rgba(167,139,250,0.28)", c:"rgba(50,20,0,0.5)"    },
  { a:"rgba(184,255,94,0.36)",  b:"rgba(255,107,107,0.22)", c:"rgba(10,50,0,0.55)"   },
];
const STAGECOL = {"Pre-seed":"#5dd3e8","Seed":"#F59E0B","Series A":"#7ed957","Series B":"#5dd3e8","Series C+":"#B8FF5E","Growth":"#B8FF5E"};

export default AdminQuickAddPanel;
