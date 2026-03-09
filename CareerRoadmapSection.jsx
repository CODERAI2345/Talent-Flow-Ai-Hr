import React, { useState, useEffect, useRef, useCallback } from "react";

function GenSection({ title, accentColor, accentClass, icon, isOwner, fields, cardRender, detailRender, emptyMsg, searchPlaceholder, btnClass, aiType, items, setItems }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const def = fields.reduce((a,f)=>({...a,[f.key]:f.default||""}),{});

  const filtered = items.filter(item=>{
    if(!search)return true;
    const s=search.toLowerCase();
    return Object.values(item).some(v=>typeof v==="string"&&v.toLowerCase().includes(s))||(Array.isArray(item.tags)&&item.tags.some(t=>t.toLowerCase().includes(s)));
  });

  // ── sync: when items changes (admin write), keep selected view in sync ──
  useEffect(() => {
    if (selected) {
      const updated = items.find(x => x.id === selected.id);
      if (updated) setSelected(updated); else setSelected(null);
    }
  }, [items]);

  const openAdd=()=>{setForm(def);setEditing(null);setModal(true);};
  const openEdit=item=>{setForm({...item,tags:(item.tags||[]).join(", ")});setEditing(item);setModal(true);};
  const save=()=>{
    if(!form[fields[0].key]?.trim())return;
    const d={...form,id:editing?.id||Date.now(),tags:form.tags?form.tags.split(",").map(t=>t.trim()).filter(Boolean):[]};
    setItems(i=>editing?i.map(x=>x.id===d.id?d:x):[...i,d]);
    setModal(false);setEditing(null);
  };
  const del=id=>{setItems(i=>i.filter(x=>x.id!==id));setSelected(null);};

  const handleAIPaste = d => {
    setForm(p => {
      const merged = { ...p };
      Object.keys(d).forEach(k => {
        if (d[k] !== undefined && d[k] !== null && d[k] !== "") {
          if (Array.isArray(d[k])) merged[k] = d[k].join(", ");
          else merged[k] = String(d[k]);
        }
      });
      return merged;
    });
  };

  if(selected) return (
    <div className="detail" style={{ padding:"28px 34px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:26 }}>
        <button className="btn btn-ghost" onClick={()=>setSelected(null)}><Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/>Back</button>
        {isOwner&&<div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-ghost" onClick={()=>{openEdit(selected);setSelected(null);}}>Edit</button>
          <button className="btn btn-sm" style={{ background:"rgba(255,107,107,0.12)", color:"var(--coral)", border:"1px solid rgba(255,107,107,0.25)" }} onClick={()=>del(selected.id)}>Delete</button>
        </div>}
      </div>
      {detailRender(selected)}
    </div>
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", gap:14 }}>
      {modal&&(
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              <div className="f-display" style={{ fontSize:20, color:"var(--cream)" }}>{editing?`Edit ${title}`:`Add ${title}`}</div>
              <button className="btn btn-ghost btn-sm" onClick={()=>setModal(false)}>✕</button>
            </div>

            {/* AI Smart Fetch — name only, works for every section */}
            {aiType && <AISmartFetch sectionType={aiType} onData={handleAIPaste} />}

            <div style={{ height:1, background:"var(--line)", margin:"4px 0 18px" }} />
            <SL ch="FIELDS — auto-filled above, edit as needed" col={accentColor} />

            <div className="fg fg2" style={{ marginTop:12 }}>
              {fields.map(f=>{
                if(f.type==="textarea") return <textarea key={f.key} className={`inp ${f.span?"fspan":""}`} placeholder={f.label} rows={f.rows||3} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}/>;
                if(f.type==="select") return <select key={f.key} className={`inp ${f.span?"fspan":""}`} value={form[f.key]||f.options[0]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}>{f.options.map(o=><option key={o}>{o}</option>)}</select>;
                if(f.type==="range") return <div key={f.key}><label style={{ fontSize:11,color:"var(--muted)",display:"block",marginBottom:4 }}>{f.label}: {form[f.key]||0}%</label><input type="range" min={0} max={100} value={form[f.key]||0} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={{ width:"100%",accentColor }}/></div>;
                return <input key={f.key} className={`inp ${f.span?"fspan":""}`} placeholder={f.label} value={form[f.key]||""} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}/>;
              })}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
              <button className="btn btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
              <button className={`btn ${btnClass}`} onClick={save}>{editing?"Save Changes":`Add ${title}`}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <SearchBar value={search} onChange={setSearch} placeholder={searchPlaceholder||`Search ${title.toLowerCase()}...`} />
        {isOwner&&<button className={`btn ${btnClass}`} onClick={openAdd}><Ico d="M12 5v14M5 12h14" s={13}/>Add {title}</button>}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", letterSpacing:".12em" }}>
        {filtered.length} {title.toLowerCase()} · click any card to explore
      </div>

      {items.length===0?(
        <div className="empty">
          <div style={{ width:64, height:64, borderRadius:18, background:accentColor+"14", border:`1px solid ${accentColor}28`,
            display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 32px ${accentColor}20` }}>
            <Ico d={icon} s={28} c={accentColor}/>
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:18, color:"var(--text)" }}>
            {isOwner?`No ${title} yet`:`No ${title} available`}
          </div>
          <div style={{ fontSize:13, maxWidth:320, lineHeight:1.65, color:"var(--text2)" }}>
            {isOwner ? emptyMsg : `The owner hasn't added any ${title.toLowerCase()} yet.`}
          </div>
          {isOwner && <button className={`btn ${btnClass}`} onClick={openAdd}>Add First {title}</button>}
        </div>
      ):(
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16,
          overflowY:"auto", flex:1, paddingRight:4 }} className="scrollbar">
          {filtered.map((item,i)=>(
            <div key={item.id} className="anim-up" style={{ animationDelay:`${i*35}ms` }}
              onClick={()=>setSelected(item)}>
              {cardRender(item,{isOwner,accentColor,onEdit:e=>{e?.stopPropagation();openEdit(item);},onDel:e=>{e?.stopPropagation();del(item.id);}})}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CARD SHELL — shared wrapper ───────────────────────────────────────── */

export default GenSection;
