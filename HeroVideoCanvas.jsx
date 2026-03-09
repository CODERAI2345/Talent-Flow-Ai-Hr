import React, { useState, useEffect, useRef, useCallback } from "react";

function FilterPill({ label, active, col, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 13px", borderRadius:20, fontSize:11, fontWeight:600,
      fontFamily:"var(--font-mono)", cursor:"pointer", border:"1px solid",
      transition:"all .15s", letterSpacing:".03em", textTransform:"uppercase",
      background: active ? col+"20" : "rgba(255,255,255,.04)",
      borderColor: active ? col+"50" : "var(--border2)",
      color: active ? col : "var(--text3)",
    }}>{label}</button>
  );
}

// Single job card

export default FilterPill;
