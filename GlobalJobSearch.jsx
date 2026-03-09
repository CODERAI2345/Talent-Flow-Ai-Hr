import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default CompanyDetail;
