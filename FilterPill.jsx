import React, { useState, useEffect } from "react";
import { storageGet, storageSave, LS_KEY_CO, LS_KEY_SEC, LS_KEY_SET } from "./utils/storage";

// Layout
import TopNav    from "./components/shared/TopNav";

// Pages
import HomePage          from "./components/home/HomePage";
import Companies         from "./components/companies/Companies";
import StartupsCarousel  from "./components/startups/StartupsCarousel";
import NetworkingHub     from "./components/networking/NetworkingHub";
import GlobalJobSearch   from "./components/tools/GlobalJobSearch";
import SalaryCalculator  from "./components/tools/SalaryCalculator";
import SkillGapAnalyzer  from "./components/tools/SkillGapAnalyzer";
import ATSChecker        from "./components/tools/ATSChecker";
import CertRoadmap       from "./components/tools/CertRoadmap";
import AdminControl      from "./components/admin/AdminControl";
import StarAdminGate     from "./components/admin/StarAdminGate";
import GenSection        from "./components/shared/GenSection";
import { SECCFG }        from "./config/seccfg";
import { NAV_ITEMS }     from "./config/navigation";

import globalStyles from "./styles/global.css?inline";

const DEFAULT_SEC = { aiTools:[], certifications:[], startups:[], resumeModels:[], careerPath:[] };

export default function App() {
  const [active, setActive]   = useState("home");
  const [isOwner, setIsOwner] = useState(false);
  const [coData, setCoData]   = useState([]);
  const [secData, setSecData] = useState(DEFAULT_SEC);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    Promise.all([
      storageGet(LS_KEY_CO,  []),
      storageGet(LS_KEY_SEC, DEFAULT_SEC),
      storageGet(LS_KEY_SET, {}),
    ]).then(([co, sec, set]) => {
      setCoData(co); setSecData(sec); setSettings(set);
    });
  }, []);

  const saveCoData  = d => { setCoData(d);  storageSave(LS_KEY_CO, d); };
  const saveSettings= s => { setSettings(s); storageSave(LS_KEY_SET, s); };

  const secProps = key => ({
    items: key === "companies" ? coData : (secData[key] || []),
    setItems: key === "companies"
      ? saveCoData
      : fn => {
          const next = typeof fn === "function" ? fn(secData[key]||[]) : fn;
          const ns = { ...secData, [key]: next };
          setSecData(ns); storageSave(LS_KEY_SEC, ns);
        },
  });

  const renderSection = () => {
    if (active === "home")           return <HomePage onGetStarted={() => setActive("aiTools")} />;
    if (active === "jobSearch")      return <GlobalJobSearch />;
    if (active === "salaryCalc")     return <SalaryCalculator />;
    if (active === "skillGap")       return <SkillGapAnalyzer />;
    if (active === "networking")     return <NetworkingHub />;
    if (active === "atsChecker")     return <ATSChecker />;
    if (active === "companies")      return <Companies isOwner={isOwner} {...secProps("companies")} />;
    if (active === "startups")       return <StartupsCarousel isOwner={isOwner} {...secProps("startups")} />;
    if (active === "certifications") return <CertRoadmap isOwner={isOwner} {...secProps("certifications")} />;
    if (active === "admin")          return <AdminControl isOwner={isOwner} coData={coData} secData={secData} settings={settings} saveCoData={saveCoData} setSecData={setSecData} saveSettings={saveSettings} />;
    const cfg = SECCFG[active];
    if (cfg) return <GenSection {...cfg} isOwner={isOwner} {...secProps(active)} />;
    return null;
  };

  const visibleNav = NAV_ITEMS.filter(n => settings[n.id] !== false);

  return (
    <div className="app-shell">
      <style>{globalStyles}</style>

      {/* SIDEBAR */}
      <nav className="sidebar">
        <div style={{ padding:"16px 16px 8px" }}>
          <div style={{ fontFamily:"Calibri,sans-serif", fontSize:11, fontWeight:600,
            color:"var(--text3)", letterSpacing:".15em", textTransform:"uppercase", marginBottom:12 }}>
            NAVIGATION
          </div>
          {visibleNav.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 12px", borderRadius:10, border:"none", cursor:"pointer",
                marginBottom:2, transition:"all .15s",
                background: active===n.id ? n.col+"18" : "transparent",
                borderLeft: active===n.id ? `3px solid ${n.col}` : "3px solid transparent" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                stroke={active===n.id ? n.col : "var(--text3)"}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={n.ico}/>
              </svg>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:13, fontWeight:600,
                  color: active===n.id ? n.col : "var(--text2)" }}>{n.lbl}</div>
                <div style={{ fontSize:10, color:"var(--text3)",
                  fontFamily:"var(--font-mono)" }}>{n.sub}</div>
              </div>
            </button>
          ))}
          {isOwner && (
            <button onClick={() => setActive("admin")}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"9px 12px", borderRadius:10, border:"none", cursor:"pointer",
                background: active==="admin" ? "#0097b218" : "transparent",
                borderLeft: active==="admin" ? "3px solid #0097b2" : "3px solid transparent" }}>
              <div style={{ fontSize:13, fontWeight:600, color:"#0097b2" }}>⚙ Admin Portal</div>
            </button>
          )}
        </div>
      </nav>

      {/* MAIN AREA */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <TopNav active={active} setActive={setActive} isOwner={isOwner} setIsOwner={setIsOwner} />
        <main style={{ flex:1, overflow:"hidden", position:"relative" }}>
          <div key={active} className="pg-enter"
            style={{ position:"absolute", inset:0, overflow:"hidden",
              padding: active==="home" ? 0 : "20px 28px 24px" }}>
            {renderSection()}
          </div>
        </main>
      </div>

      <StarAdminGate onUnlock={() => { setIsOwner(true); setActive("admin"); }} />
    </div>
  );
}
