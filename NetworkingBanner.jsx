import React, { useState, useEffect, useRef, useCallback } from "react";

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

/* ADMIN CONTROL */

export default CardShell;
