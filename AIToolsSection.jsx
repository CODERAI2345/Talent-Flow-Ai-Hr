import React from "react";

// Section label
export const SL = ({ ch, col = "#0097b2" }) => (
  <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:col,
    letterSpacing:".22em", textTransform:"uppercase", marginBottom:8,
    display:"flex", alignItems:"center", gap:8 }}>
    <div style={{ width:6, height:6, borderRadius:"50%", background:col }}/>
    {ch}
  </div>
);

// SVG Icon
export const Ico = ({ d, s=20, c="currentColor", sw=1.8, style }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
    stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={d}/>
  </svg>
);

// Search bar
export const SearchBar = ({ value, onChange, placeholder }) => (
  <div style={{ position:"relative", flex:1, minWidth:220 }}>
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--text3)"
      strokeWidth="1.8" strokeLinecap="round" style={{
        position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <input value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width:"100%", padding:"9px 12px 9px 36px",
        background:"rgba(255,255,255,.05)", border:"1px solid var(--border2)",
        borderRadius:10, color:"var(--text)", fontSize:13,
        fontFamily:"var(--font-body)", outline:"none", boxSizing:"border-box" }}/>
  </div>
);
