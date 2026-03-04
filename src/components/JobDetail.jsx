function JobDetail({ job, onClose }) {
  const TYPE_COL  = {"Full-Time":"#6366F1","Remote":"#10B981","Hybrid":"#06B6D4","Contract":"#F59E0B","Part-Time":"#8B5CF6","Internship":"#EC4899"};
  const LEVEL_COL = {"Entry":"#10B981","Mid":"#06B6D4","Senior":"#6366F1","Lead":"#8B5CF6","Director":"#F59E0B","VP":"#F43F5E","C-Level":"#EC4899"};
  const tc = TYPE_COL[job.type]  || "#6366F1";
  const lc = LEVEL_COL[job.level]|| "#06B6D4";
  return (
    <div style={{position:"absolute",inset:0,zIndex:60,background:"var(--bg)",overflowY:"auto",animation:"fadeIn .22s ease"}}
      className="scrollbar">
      {/* Top accent line */}
      <div style={{height:4,background:`linear-gradient(90deg,${tc},${lc},#8B5CF6)`}}/>

      <div style={{padding:"28px 32px",maxWidth:860,margin:"0 auto"}}>
        {/* back */}
        <button className="btn btn-ghost" onClick={onClose} style={{marginBottom:24,gap:6}}>
          <Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/> Back to Results
        </button>

        {/* hero */}
        <div style={{background:`linear-gradient(135deg,${tc}0e,${lc}08)`,
          border:`1px solid ${tc}25`,borderRadius:16,padding:"28px 28px 24px",marginBottom:24,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",
            background:`radial-gradient(${tc}15,transparent 70%)`,filter:"blur(30px)",pointerEvents:"none"}}/>
          <div style={{display:"flex",gap:18,alignItems:"flex-start",position:"relative",zIndex:1,flexWrap:"wrap"}}>
            <div style={{width:72,height:72,borderRadius:16,background:`linear-gradient(135deg,${tc}30,${lc}20)`,
              border:`1px solid ${tc}35`,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:34,fontFamily:"Outfit,sans-serif",fontWeight:800,color:tc,
              boxShadow:`0 8px 28px ${tc}35`,flexShrink:0}}>
              {(job.company||"?")[0]}
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:800,fontSize:28,color:"var(--text)",
                letterSpacing:"-1px",lineHeight:1.1,marginBottom:6}}>{job.title}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--text2)",letterSpacing:".06em"}}>
                {job.company} · {job.location}
              </div>
              <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
                {[{v:job.type,c:tc},{v:job.level,c:lc},{v:job.domain,c:"#8B5CF6"}].filter(x=>x.v).map((x,i)=>(
                  <span key={i} style={{padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,
                    fontFamily:"var(--font-mono)",background:`${x.c}18`,color:x.c,border:`1px solid ${x.c}30`,textTransform:"uppercase"}}>{x.v}</span>
                ))}
              </div>
            </div>
            <div style={{flexShrink:0,textAlign:"right"}}>
              {job.salaryRange && <>
                <div style={{fontFamily:"Outfit,sans-serif",fontWeight:800,fontSize:26,color:"#10B981",letterSpacing:"-1px"}}>{job.salaryRange}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",marginTop:2}}>PER YEAR</div>
              </>}
            </div>
          </div>
        </div>

        {/* stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
          {[
            {l:"Posted",     v:job.postedDaysAgo<=1?"Today":`${job.postedDaysAgo}d ago`, c:tc},
            {l:"Experience", v:job.experienceYears?`${job.experienceYears} yrs`:"Flexible", c:lc},
            {l:"Team Size",  v:job.teamSize||"N/A",     c:"#8B5CF6"},
            {l:"Visa Sponsor",v:job.visaSponsorship?"Yes":"Not mentioned", c:"#F59E0B"},
          ].map((s,i)=>(
            <div key={i} style={{padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",
              borderRadius:12,borderTop:`2px solid ${s.c}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6}}>{s.l}</div>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:700,fontSize:15,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:16}}>
          {/* left col */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {/* about */}
            <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:`3px solid ${tc}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:tc,letterSpacing:".18em",marginBottom:10}}>ABOUT THE ROLE</div>
              <p style={{fontSize:13,lineHeight:1.8,color:"var(--text2)"}}>{job.description}</p>
            </div>

            {/* responsibilities */}
            {job.responsibilities?.length>0 && (
              <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6366F1",letterSpacing:".18em",marginBottom:12}}>RESPONSIBILITIES</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {job.responsibilities.map((r,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:20,height:20,borderRadius:6,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.25)",
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                        <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{fontSize:13,lineHeight:1.6,color:"var(--text2)"}}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* requirements */}
            {job.requirements?.length>0 && (
              <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F59E0B",letterSpacing:".18em",marginBottom:12}}>REQUIREMENTS</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {job.requirements.map((r,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:20,height:20,borderRadius:6,background:"rgba(245,158,11,.12)",border:"1px solid rgba(245,158,11,.25)",
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                        <span style={{fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,color:"#F59E0B"}}>{i+1}</span>
                      </div>
                      <span style={{fontSize:13,lineHeight:1.6,color:"var(--text2)"}}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* right col */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {/* apply CTA */}
            <div style={{padding:20,background:`linear-gradient(135deg,${tc}10,${lc}08)`,
              border:`1px solid ${tc}25`,borderRadius:14,textAlign:"center"}}>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:700,fontSize:16,color:"var(--text)",marginBottom:4}}>Ready to apply?</div>
              <div style={{fontSize:12,color:"var(--text2)",marginBottom:16,lineHeight:1.5}}>
                {job.applicants ? `${job.applicants} applicants already` : "Be among the first to apply"}
              </div>
              <button
                onClick={()=>job.applyUrl&&window.open(job.applyUrl,"_blank")}
                style={{width:"100%",padding:"12px 0",borderRadius:10,fontFamily:"var(--font-body)",fontWeight:700,
                  fontSize:14,background:`linear-gradient(135deg,${tc},${lc})`,color:"#fff",border:"none",
                  cursor:"pointer",boxShadow:`0 8px 24px ${tc}40`,transition:"all .2s",letterSpacing:"-.01em"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                Apply Now →
              </button>
              {job.applyUrl && (
                <div style={{marginTop:8,fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",
                  wordBreak:"break-all",lineHeight:1.4}}>{job.applyUrl}</div>
              )}
            </div>

            {/* skills */}
            {job.skills?.length>0 && (
              <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#06B6D4",letterSpacing:".18em",marginBottom:10}}>REQUIRED SKILLS</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {job.skills.map((s,i)=>(
                    <span key={i} style={{padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:600,
                      background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.2)",
                      fontFamily:"var(--font-mono)"}}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* perks */}
            {job.perks?.length>0 && (
              <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#10B981",letterSpacing:".18em",marginBottom:10}}>PERKS & BENEFITS</div>
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {job.perks.map((p,i)=>(
                    <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                      <div style={{width:16,height:16,borderRadius:5,background:"rgba(16,185,129,.15)",
                        border:"1px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span style={{fontSize:12,color:"var(--text2)"}}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* company info */}
            <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".18em",marginBottom:10}}>ABOUT {job.company?.toUpperCase()}</div>
              <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.65}}>{job.companyDescription||"A leading company in the industry, focused on innovation and growth."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
