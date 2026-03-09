import React, { useState, useEffect, useRef, useCallback } from "react";

function AdminControl({ settings, setSettings, coData, setCoData, secData, setSecData }) {
  const [nav, setNav] = useState("overview");

  const ADMIN_SECS = [
    {key:"overview",    label:"Overview",       icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {key:"quickAdd",    label:"Quick Add ⚡",   icon:"M13 10V3L4 14h7v7l9-11h-7z"},
    {key:"companies",   label:"Companies",      icon:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"},
    {key:"startups",    label:"Startups",       icon:"M13 10V3L4 14h7v7l9-11h-7z"},
    {key:"aiTools",     label:"AI Tools",       icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
    {key:"certifications",label:"Certifications",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},
    {key:"resumeModels",label:"Resume Models",  icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
    {key:"careerPath",  label:"Career Path",    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},
    {key:"settings",    label:"Settings",       icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"},
  ];

  const makeSecProps = key => ({
    items: key==="companies" ? coData : (secData[key]||[]),
    setItems: key==="companies"
      ? setCoData
      : (fn => setSecData(p => ({ ...p, [key]: typeof fn==="function" ? fn(p[key]||[]) : fn }))),
  });

  const renderMain = () => {
    if (nav==="overview") return (
      <div className="admin-section">
        <div style={{marginBottom:24,borderBottom:"1px solid var(--border)",paddingBottom:20}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Admin Control Centre</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Owner-only portal. All changes sync to user view in real-time.</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[["Companies",coData.length,"#0097b2"],["Startups",(secData.startups||[]).length,"#F59E0B"],["AI Tools",(secData.aiTools||[]).length,"#7ed957"],["Certifications",(secData.certifications||[]).length,"#006d82"],["Resume Models",(secData.resumeModels||[]).length,"#F43F5E"],["Career Paths",(secData.careerPath||[]).length,"#10B981"]].map(([l,v,c])=>(
            <div key={l} style={{padding:"16px 18px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:`3px solid ${c}`,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c+"40";e.currentTarget.style.background="var(--hover)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--card)";}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontSize:32,fontWeight:800,color:c,lineHeight:1,letterSpacing:"-0.5px"}}>{v}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginTop:4,letterSpacing:".12em",textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{padding:18,background:"rgba(0,151,178,.05)",border:"1px solid rgba(0,151,178,.2)",borderLeft:"3px solid var(--indigo)",borderRadius:12}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"var(--indigo)",letterSpacing:".15em",marginBottom:8}}>HOW IT WORKS</div>
          <ul style={{fontSize:12,color:"var(--text2)",lineHeight:2.1,paddingLeft:16}}>
            <li>Only you (owner) can add, edit or delete data in any section</li>
            <li>Use <strong style={{color:"var(--text)"}}>Quick Add ⚡</strong> to add items to any section with one AI call</li>
            <li>All changes sync instantly to the user-facing portal</li>
            <li>Toggle section visibility in Settings</li>
          </ul>
        </div>
      </div>
    );

    if (nav==="quickAdd") return (
      <div className="admin-section">
        <div style={{marginBottom:22,borderBottom:"1px solid var(--border)",paddingBottom:18}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Quick Add with AI ⚡</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Select a section · type a name · AI fills every field · review and save to the platform.</div>
        </div>
        <AdminQuickAddPanel coData={coData} setCoData={setCoData} secData={secData} setSecData={setSecData}/>
      </div>
    );

    if (nav==="settings") return (
      <div className="admin-section">
        <div style={{marginBottom:22,borderBottom:"1px solid var(--border)",paddingBottom:18}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Settings</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Control which sections are visible to users.</div>
        </div>

        {/* Data persistence notice */}
        <div style={{marginBottom:18,padding:16,background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,borderLeft:"3px solid #10B981"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px rgba(16,185,129,.7)"}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"#10B981",letterSpacing:".12em"}}>AUTO-SAVE ACTIVE</span>
          </div>
          <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,margin:0}}>
            All your data is automatically saved to this browser's localStorage. Your entries persist across reloads and code updates. Use <strong style={{color:"var(--text)"}}>Export Backup</strong> in the sidebar to save a .json file as a permanent backup.
          </p>
        </div>

        {/* Section visibility toggles */}
        <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".14em",marginBottom:10,textTransform:"uppercase"}}>Section Visibility</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {[{key:"aiTools",label:"AI Tools",col:"#7ed957"},{key:"certifications",label:"Certifications",col:"#006d82"},{key:"companies",label:"Companies",col:"#0097b2"},{key:"startups",label:"Startups",col:"#F59E0B"},{key:"resumeModels",label:"Resume Models",col:"#F43F5E"},{key:"careerPath",label:"Career Path",col:"#10B981"}].map(({key,label,col})=>(
            <div key={key} className="admin-row" style={{borderRadius:10,background:"var(--card)",border:`1px solid var(--border)`,borderLeft:`3px solid ${settings[key]!==false?col:"var(--border2)"}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:2}}>{label}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:".12em",color:settings[key]!==false?col:"var(--text3)"}}>{settings[key]!==false?"VISIBLE TO USERS":"HIDDEN FROM USERS"}</div>
              </div>
              <button className={`tog ${settings[key]!==false?"on":"off"}`} onClick={()=>setSettings(s=>({...s,[key]:s[key]===false?true:false}))}/>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div style={{padding:18,background:"rgba(244,63,94,.05)",border:"1px solid rgba(244,63,94,.2)",borderRadius:12}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F43F5E",letterSpacing:".14em",marginBottom:10,textTransform:"uppercase"}}>⚠ Danger Zone</div>
          <div style={{fontSize:12,color:"var(--text2)",marginBottom:14,lineHeight:1.6}}>
            Permanently erase all data from all sections. This cannot be undone. Export a backup first.
          </div>
          <button
            className="btn btn-sm"
            style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.3)",fontSize:12,padding:"8px 16px"}}
            onClick={()=>{
              if(window.confirm("Are you sure? This will delete ALL data from all sections. Make sure you have a backup.")) {
                setCoData([]);
                setSecData({aiTools:[],certifications:[],startups:[],resumeModels:[],careerPath:[]});
                alert("All data cleared.");
              }
            }}>
            Clear All Data
          </button>
        </div>
      </div>
    );

    // Data sections — show items list with edit/delete
    const dataSections = {
      companies: {label:"Companies",items:coData,setItems:setCoData,aiType:"company",color:"#C8FF00"},
      startups:  {label:"Startups",items:secData.startups||[],setItems:fn=>setSecData(p=>({...p,startups:typeof fn==="function"?fn(p.startups||[]):fn})),aiType:"startup",color:"#FF8C00"},
      aiTools:   {label:"AI Tools",items:secData.aiTools||[],setItems:fn=>setSecData(p=>({...p,aiTools:typeof fn==="function"?fn(p.aiTools||[]):fn})),aiType:"aiTool",color:"#3B82F6"},
      certifications:{label:"Certifications",items:secData.certifications||[],setItems:fn=>setSecData(p=>({...p,certifications:typeof fn==="function"?fn(p.certifications||[]):fn})),aiType:"certification",color:"#A855F7"},
      resumeModels:{label:"Resume Models",items:secData.resumeModels||[],setItems:fn=>setSecData(p=>({...p,resumeModels:typeof fn==="function"?fn(p.resumeModels||[]):fn})),aiType:"resumeModel",color:"#FF3B3B"},
      careerPath:{label:"Career Path",items:secData.careerPath||[],setItems:fn=>setSecData(p=>({...p,careerPath:typeof fn==="function"?fn(p.careerPath||[]):fn})),aiType:"careerPath",color:"#C8FF00"},
    };

    const ds = dataSections[nav];
    if (!ds) return null;

    return (
      <div className="admin-section">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,borderBottom:"1px solid var(--border)",paddingBottom:16}}>
          <div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:20,color:"var(--text)"}}>{ds.label}</div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".1em",marginTop:3}}>{ds.items.length} ENTRIES · SYNCED TO USER VIEW IN REAL-TIME</div>
          </div>
          <button className="btn btn-cyan btn-sm" onClick={()=>setNav("quickAdd")}>Quick Add ⚡</button>
        </div>
        {ds.items.length===0 ? (
          <div style={{padding:"40px 0",textAlign:"center",color:"var(--text3)",fontFamily:"var(--font-mono)",fontSize:11}}>
            NO {ds.label.toUpperCase()} YET — use Quick Add ⚡ above
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {ds.items.map((item,i)=>(
              <div key={item.id||i} style={{padding:"12px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.background="var(--hover)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--card)";}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:2}}>{item.name}</div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".08em"}}>
                    {[item.stage,item.level,item.category,item.type,item.currentRole].filter(Boolean).slice(0,2).join(" · ")}
                    {[item.industry,item.provider,item.pricing,item.format].filter(Boolean).slice(0,1).map(v=>" · "+v)}
                  </div>
                </div>
                <button className="btn btn-sm" style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.25)",borderRadius:7}} onClick={()=>ds.setItems(p=>Array.isArray(p)?p.filter(x=>x.id!==item.id):p)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-head">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:8,height:8,borderRadius:2,background:"var(--indigo)",boxShadow:"0 0 8px rgba(0,151,178,.6)"}}/>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,letterSpacing:".18em",color:"var(--indigo)"}}>ADMIN PORTAL</div>
          </div>
          <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:15,lineHeight:1,color:"var(--text)"}}>TalentFlow AI</div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginTop:2,letterSpacing:".12em"}}>OWNER ACCESS</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
          {ADMIN_SECS.map(s=>(
            <button key={s.key} className={`admin-nav-item${nav===s.key?" active":""}`} onClick={()=>setNav(s.key)}>
              <Ico d={s.icon} s={12} c={nav===s.key?"var(--indigo)":"var(--text3)"}/>
              {s.label}
            </button>
          ))}
        </div>

        {/* Data persistence footer */}
        <div style={{padding:"12px 14px",borderTop:"1px solid var(--border)",flexShrink:0}}>
          {/* Storage indicator */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px rgba(16,185,129,.7)",flexShrink:0}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"#10B981",letterSpacing:".12em",fontWeight:700}}>DATA AUTO-SAVED</span>
          </div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginBottom:10,lineHeight:1.6}}>
            {coData.length} companies · {(secData.startups||[]).length} startups · {(secData.aiTools||[]).length} AI tools · {(secData.certifications||[]).length} certs · {(secData.resumeModels||[]).length} resumes · {(secData.careerPath||[]).length} paths
          </div>
          {/* Backup / Restore */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <button
              className="btn btn-ghost btn-sm"
              style={{justifyContent:"flex-start",fontSize:10,gap:6,width:"100%"}}
              onClick={()=>{
                const backup = JSON.stringify({coData,secData,settings,exportedAt:new Date().toISOString()},null,2);
                const a = document.createElement("a");
                a.href = "data:application/json;charset=utf-8," + encodeURIComponent(backup);
                a.download = "talentflow_backup_"+Date.now()+".json";
                a.click();
              }}>
              <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" s={11} c="var(--indigo)"/>
              Export Backup
            </button>
            <label style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",
              borderRadius:7,border:"1px solid var(--border2)",cursor:"pointer",fontSize:10,
              fontFamily:"var(--font-body)",color:"var(--text3)",transition:"all .15s",
              background:"transparent"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.color="var(--text2)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--text3)";}}>
              <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" s={11} c="var(--text3)"/>
              Import Backup
              <input type="file" accept=".json" style={{display:"none"}}
                onChange={e=>{
                  const f = e.target.files[0]; if(!f) return;
                  const r = new FileReader();
                  r.onload = ev => {
                    try {
                      const d = JSON.parse(ev.target.result);
                      if(d.coData)   { setCoData(d.coData); }
                      if(d.secData)  { setSecData(d.secData); }
                      if(d.settings) { setSettings(d.settings); }
                      alert("✓ Backup restored successfully!");
                    } catch { alert("Invalid backup file."); }
                  };
                  r.readAsText(f);
                  e.target.value="";
                }}/>
            </label>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="admin-main">
        {renderMain()}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   ADMIN QUICK ADD PANEL — unified AI add for all sections
──────────────────────────────────────────────────── */

export default AdminControl;
