import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default SpotifyCompanyCard;
