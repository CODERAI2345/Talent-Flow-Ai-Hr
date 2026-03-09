import React, { useState, useEffect, useRef, useCallback } from "react";

function TopNav({ active, setActive, settings }) {
  const visible = BNAV.filter(n => n.id === "home" || settings[n.id] !== false);
  const activeItem = visible.find(n => n.id === active);
  const activeCol  = activeItem?.col || "#16A34A";

  const btnRefs = useRef({});
  const inkRef  = useRef(null);

  // Animate the sliding ink underline
  useEffect(() => {
    const btn = btnRefs.current[active];
    const ink = inkRef.current;
    if (!btn || !ink) return;
    const rect = btn.getBoundingClientRect();
    const parent = btn.parentElement.getBoundingClientRect();
    ink.style.left  = (rect.left - parent.left) + "px";
    ink.style.width = rect.width + "px";
    ink.style.background = activeCol;
  }, [active, activeCol, visible.length]);

  return (
    <nav className="tnav-bar">
      {/* Sliding animated underline indicator */}
      <div ref={inkRef} className="tnav-ink" />

      {visible.map(n => {
        const on = active === n.id;
        return (
          <button
            key={n.id}
            ref={el => btnRefs.current[n.id] = el}
            className={`tnav-btn${on ? " tnav-active" : ""}`}
            style={{ "--tcol": n.col }}
            onClick={() => setActive(n.id)}
          >
            {/* Icon */}
            <span className="tnav-icon">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
                stroke={on ? n.col : "#9CA3AF"}
                strokeWidth={on ? "2.2" : "1.8"}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition:"all 0.25s ease" }}
              >
                {n.ico.split(" M").map((seg, i) => (
                  <path key={i} d={i === 0 ? seg : "M" + seg} />
                ))}
              </svg>
            </span>
            {/* Label */}
            <span className="tnav-lbl" style={{ color: on ? n.col : "#6B7280" }}>
              {n.lbl}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* NAV */
const NAV = [
  {id:"home",        label:"Home",          sub:"Overview",        color:"var(--cyan)",  icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
  {id:"aiTools",      label:"AI Tools",      sub:"Curated toolkit", color:"var(--cyan)",  icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
  {id:"certifications",label:"Certifications",sub:"Learn & grow",   color:"var(--violet)",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},
  {id:"companies",    label:"Companies",     sub:"Employers",       color:"var(--cyan)",  icon:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"},
  {id:"startups",     label:"Startups",      sub:"Early stage",     color:"var(--amber)", icon:"M13 10V3L4 14h7v7l9-11h-7z"},
  {id:"resumeModels", label:"Resume Models", sub:"Templates",       color:"var(--coral)", icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
  {id:"careerPath",   label:"Career Path",   sub:"Your journey",    color:"var(--lime)",  icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},
];

/* ROOT APP */

// ── Safe localStorage helpers ──
const LS_KEY_CO  = "tf_coData_v2";
const LS_KEY_SEC = "tf_secData_v2";
const LS_KEY_SET = "tf_settings_v2";

// ── Persistent shared storage (works across all browsers/users) ──
async function storageGet(key, fallback) {
  try {
    const r = await window.storage.get(key, true); // shared=true → visible to ALL users
    return r ? JSON.parse(r.value) : fallback;
  } catch { return fallback; }
}
async function storageSave(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), true); } catch {}
}
// Sync wrappers kept for legacy calls (no-ops now — real save is async)

export default TopNav;
