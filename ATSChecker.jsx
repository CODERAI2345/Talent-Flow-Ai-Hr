import React, { useState, useEffect, useRef, useCallback } from "react";

function NetworkingHub() {
  const [query,setQuery]=useState("");const [results,setResults]=useState([]);const [loading,setLoading]=useState(false);const [error,setError]=useState("");const [hasSearched,setHasSearched]=useState(false);const [selected,setSelected]=useState(null);
  const DOMAINS=["Software Engineering","Product Management","Data Science","UX Design","DevOps","ML/AI","Cybersecurity","Marketing","Finance","Blockchain"];
  const INDIA_DOMAINS=["Bangalore Tech","Mumbai Finance","Hyderabad IT","Delhi Startups","Pune Engineering","Chennai Developer","IIT Alumni","IIM Alumni","Zomato / Swiggy","Razorpay / Fintech"];
  const AVATAR_COLORS=["#0097b2","#10B981","#F59E0B","#EC4899","#7ed957","#006d82","#F43F5E","#0A66C2"];
  const INDIA_CITIES=["bangalore","bengaluru","mumbai","delhi","hyderabad","chennai","pune","kolkata","noida","gurgaon","gurugram","india","indian","iit","iim","nit","infosys","wipro","tcs","hcl","flipkart","zomato","swiggy","razorpay","paytm","byju","ola","freshworks","zoho","naukri","cred","meesho","zepto","groww","upstox","phonepe","zerodha"];
  const isIndia=(q)=>INDIA_CITIES.some(k=>(q||"").toLowerCase().includes(k));

  const search=async(q)=>{
    const sq=q||query;if(!sq.trim())return;
    setLoading(true);setError("");setResults([]);setHasSearched(true);
    const indiaMode=isIndia(sq);
    const prompt=`You are a LinkedIn profile discovery engine. Generate 12 realistic professional profiles for: "${sq}".
${indiaMode ? `CRITICAL: ALL profiles must be INDIAN professionals. Use:
- Indian names (mix of Hindu, Muslim, Sikh, Christian names — diverse regions)  
- Indian locations ONLY: Bangalore, Mumbai, Hyderabad, Delhi NCR, Pune, Chennai, Kolkata, Noida, Gurgaon, Ahmedabad, Jaipur, Kochi
- Indian companies: TCS, Infosys, Wipro, HCL, Tech Mahindra, Flipkart, Zomato, Swiggy, Ola, Paytm, Razorpay, CRED, Meesho, Zepto, Groww, Freshworks, Zoho, BYJU's, PhonePe, Zerodha, Nykaa, Dream11, InMobi, Postman, Chargebee, CleverTap, Browserstack, Instamojo, Lenskart, Urban Company, BigBasket, Dunzo, Delhivery, ShareChat
- Indian education: IIT Bombay, IIT Delhi, IIT Madras, IIT Kharagpur, IIM Ahmedabad, IIM Bangalore, BITS Pilani, NIT Trichy, VIT, Manipal, Delhi University, Anna University, Mumbai University, Pune University
- LinkedIn URLs like https://linkedin.com/in/indian-name-123
- Indian professional achievements, certifications, and career milestones` : `Use globally diverse professionals. Mix locations: USA, UK, Germany, Singapore, Canada, Netherlands. Real global tech companies.`}
Return ONLY raw JSON array: [{"id":1,"name":"Indian Full Name","title":"Job Title","company":"Indian Company","location":"Bangalore, India","domain":"domain","experience":"5 years","avatar":"AB","avatarColor":"#0097b2","connections":1240,"followers":3200,"about":"2 sentence professional bio in English","skills":["s1","s2","s3","s4","s5"],"experience_list":[{"role":"Senior Engineer","company":"Flipkart","duration":"2021-Present"},{"role":"Engineer","company":"Infosys","duration":"2018-2021"}],"education":{"degree":"B.Tech Computer Science","school":"IIT Bombay","year":"2016"},"achievements":["Led team of 8 engineers","Built feature used by 10M+ users"],"linkedinUrl":"https://linkedin.com/in/firstname-lastname-123","openToConnect":true,"mutualConnections":3,"recentActivity":"Shared article about React performance optimization"}]`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:5000,messages:[{role:"user",content:prompt}]})});
      if(!res.ok)throw new Error("API "+res.status);
      const data=await res.json();
      const raw=(data.content?.[0]?.text||"").replace(/```json/gi,"").replace(/```/gi,"").trim();
      const fi=raw.indexOf("["),li=raw.lastIndexOf("]");
      setResults(JSON.parse(raw.slice(fi,li+1)));
    }catch(e){setError(String(e.message));}
    setLoading(false);
  };

  const ProfileCard=({profile,onClick})=>{
    const [hov,setHov]=useState(false);
    return(
      <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{background:"var(--card)",border:`1px solid ${hov?profile.avatarColor+"40":"var(--border)"}`,borderRadius:14,padding:20,cursor:"pointer",transition:"all .22s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?`0 12px 40px rgba(0,0,0,.4)`:"0 2px 8px rgba(0,0,0,.2)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:150,height:150,background:`radial-gradient(${profile.avatarColor}08,transparent 70%)`,pointerEvents:"none",opacity:hov?1:0,transition:"opacity .3s"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",gap:12,marginBottom:12,alignItems:"flex-start"}}>
            <div style={{width:52,height:52,borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${profile.avatarColor},${profile.avatarColor}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:18,color:"#fff",boxShadow:`0 4px 14px ${profile.avatarColor}40`}}>{profile.avatar}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:15,color:"var(--text)",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{profile.name}</div>
              <div style={{fontSize:12,color:"var(--text2)",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{profile.title}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)"}}>{profile.company} · {profile.location}</div>
            </div>
            {profile.openToConnect&&<div style={{flexShrink:0,padding:"3px 8px",borderRadius:20,fontSize:8,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>OPEN</div>}
          </div>
          <p style={{fontSize:11,color:"var(--text2)",lineHeight:1.6,marginBottom:10,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{profile.about}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
            {(profile.skills||[]).slice(0,3).map((s,i)=><span key={i} style={{padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:600,background:`${profile.avatarColor}12`,color:profile.avatarColor,border:`1px solid ${profile.avatarColor}25`,fontFamily:"var(--font-mono)"}}>{s}</span>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:12}}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)"}}>🔗 {(profile.connections||0).toLocaleString()}</span>
              {profile.mutualConnections>0&&<span style={{fontFamily:"var(--font-mono)",fontSize:9,color:profile.avatarColor}}>{profile.mutualConnections} mutual</span>}
            </div>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)"}}>{profile.experience}</span>
          </div>
        </div>
      </div>
    );
  };

  if(selected)return(
    <div style={{position:"absolute",inset:0,overflowY:"auto",background:"var(--bg)",zIndex:60,animation:"fadeIn .2s ease"}} className="scrollbar">
      <div style={{height:4,background:`linear-gradient(90deg,${selected.avatarColor},#006d82,#7ed957)`}}/>
      <div style={{padding:"28px 32px",maxWidth:860,margin:"0 auto"}}>
        <button className="btn btn-ghost" onClick={()=>setSelected(null)} style={{marginBottom:24,gap:6}}><Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/> Back to Results</button>
        <div style={{background:`linear-gradient(135deg,${selected.avatarColor}0e,rgba(0,109,130,.05))`,border:`1px solid ${selected.avatarColor}25`,borderRadius:16,padding:28,marginBottom:20}}>
          <div style={{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{width:80,height:80,borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${selected.avatarColor},${selected.avatarColor}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:28,color:"#fff",boxShadow:`0 8px 28px ${selected.avatarColor}50`}}>{selected.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"var(--text)",letterSpacing:"-0.5px",marginBottom:4}}>{selected.name}</div>
              <div style={{fontSize:14,color:"var(--text2)",marginBottom:4}}>{selected.title} at <strong style={{color:"var(--text)"}}>{selected.company}</strong></div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",marginBottom:12}}>{selected.location} · {selected.experience}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <a href={selected.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,background:"#0A66C2",color:"#fff",textDecoration:"none",fontSize:13,fontWeight:700,fontFamily:"var(--font-body)"}}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  View on LinkedIn
                </a>
                <button style={{padding:"8px 16px",borderRadius:10,background:`${selected.avatarColor}18`,color:selected.avatarColor,border:`1px solid ${selected.avatarColor}35`,fontSize:13,fontWeight:700,fontFamily:"var(--font-body)",cursor:"pointer"}}>+ Connect</button>
              </div>
            </div>
            <div style={{flexShrink:0,textAlign:"center"}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:28,color:selected.avatarColor}}>{(selected.connections||0).toLocaleString()}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)"}}>CONNECTIONS</div>
              <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:18,color:"var(--text2)",marginTop:8}}>{(selected.followers||0).toLocaleString()}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)"}}>FOLLOWERS</div>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:`3px solid ${selected.avatarColor}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:selected.avatarColor,letterSpacing:".15em",marginBottom:10}}>ABOUT</div>
              <p style={{fontSize:13,lineHeight:1.8,color:"var(--text2)"}}>{selected.about}</p>
            </div>
            {selected.experience_list?.length>0&&(
              <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#0097b2",letterSpacing:".15em",marginBottom:14}}>EXPERIENCE</div>
                {selected.experience_list.map((e,i)=>(
                  <div key={i} style={{display:"flex",gap:12,paddingBottom:i<selected.experience_list.length-1?14:0,marginBottom:i<selected.experience_list.length-1?14:0,borderBottom:i<selected.experience_list.length-1?"1px solid var(--border)":"none"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(0,151,178,.12)",border:"1px solid rgba(0,151,178,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="1.8" strokeLinecap="round"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div><div style={{fontWeight:700,fontSize:14,color:"var(--text)"}}>{e.role}</div><div style={{fontSize:12,color:"var(--text2)"}}>{e.company}</div><div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)"}}>{e.duration}</div></div>
                  </div>
                ))}
              </div>
            )}
            {selected.achievements?.length>0&&(
              <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F59E0B",letterSpacing:".15em",marginBottom:12}}>ACHIEVEMENTS</div>
                {selected.achievements.map((a,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:i<selected.achievements.length-1?8:0}}><span style={{color:"#F59E0B"}}>🏆</span><span style={{fontSize:13,color:"var(--text2)"}}>{a}</span></div>)}
              </div>
            )}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {selected.education&&(
              <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#7ed957",letterSpacing:".15em",marginBottom:10}}>EDUCATION</div>
                <div style={{fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:2}}>{selected.education.school}</div>
                <div style={{fontSize:12,color:"var(--text2)",marginBottom:2}}>{selected.education.degree}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)"}}>{selected.education.year}</div>
              </div>
            )}
            <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:selected.avatarColor,letterSpacing:".15em",marginBottom:10}}>SKILLS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(selected.skills||[]).map((s,i)=><span key={i} style={{padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:600,background:`${selected.avatarColor}12`,color:selected.avatarColor,border:`1px solid ${selected.avatarColor}25`,fontFamily:"var(--font-mono)"}}>{s}</span>)}</div>
            </div>
            {selected.recentActivity&&(
              <div style={{padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".15em",marginBottom:8}}>RECENT ACTIVITY</div>
                <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,margin:0}}>💬 {selected.recentActivity}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{flexShrink:0,paddingBottom:16,borderBottom:"1px solid var(--border)"}}>
        {!hasSearched&&(
          <>
          <div style={{textAlign:"center",padding:"16px 0 20px"}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#0A66C2",letterSpacing:".2em",marginBottom:8}}>LINKEDIN-POWERED · PROFESSIONAL NETWORK</div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:6}}>Networking Hub</div>
            <p style={{fontSize:13,color:"var(--text2)",maxWidth:440,margin:"0 auto"}}>Discover professionals in any domain. Search by role, skill, or industry to find people worth connecting with on LinkedIn.</p>
          </div>

          {/* ── NETWORKING HERO BANNER — Canvas Animation ── */}
          <NetworkingBanner/>
          </>
        )}
        <div style={{display:"flex",gap:10,maxWidth:hasSearched?9999:600,margin:hasSearched?"0":"0 auto"}}>
          <div style={{position:"relative",flex:1}}>
            <svg style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder='Search by role, skill, domain — e.g. "ML Engineer", "React developer", "Product Manager fintech"...' style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",borderRadius:10,padding:"12px 14px 12px 44px",color:"var(--text)",fontSize:14,outline:"none",fontFamily:"var(--font-body)"}} onFocus={e=>{e.target.style.borderColor="rgba(10,102,194,.5)";e.target.style.boxShadow="0 0 0 3px rgba(10,102,194,.1)";}} onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";}}/>
          </div>
          <button onClick={()=>search()} disabled={loading||!query.trim()} style={{padding:"12px 24px",borderRadius:10,fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#0A66C2,#0077B5)",color:"#fff",border:"none",cursor:loading||!query.trim()?"not-allowed":"pointer",opacity:loading||!query.trim()?0.5:1,flexShrink:0,boxShadow:"0 4px 16px rgba(10,102,194,.4)",transition:"all .18s"}}>{loading?"Searching…":"Find People →"}</button>
        </div>
        {!hasSearched&&(
          <div style={{marginTop:14}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"#0A66C2",letterSpacing:".15em",marginBottom:8,textAlign:"center"}}>🇮🇳 INDIA SPECIFIC</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
              {INDIA_DOMAINS.map(d=><button key={d} onClick={()=>{setQuery(d);search(d);}} style={{padding:"5px 14px",borderRadius:20,fontSize:11,fontFamily:"var(--font-mono)",background:"rgba(255,153,0,.06)",border:"1px solid rgba(255,153,0,.25)",color:"#F59E0B",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,153,0,.15)";e.currentTarget.style.borderColor="rgba(255,153,0,.5)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,153,0,.06)";e.currentTarget.style.borderColor="rgba(255,153,0,.25)";}}>{d}</button>)}
            </div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",marginBottom:8,textAlign:"center"}}>🌍 GLOBAL</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
              {DOMAINS.map(d=><button key={d} onClick={()=>{setQuery(d);search(d);}} style={{padding:"5px 14px",borderRadius:20,fontSize:11,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",color:"var(--text2)",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(10,102,194,.4)";e.currentTarget.style.color="#0A66C2";e.currentTarget.style.background="rgba(10,102,194,.08)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.color="var(--text2)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>{d}</button>)}
            </div>
          </div>
        )}
      </div>
      <div style={{flex:1,overflowY:"auto",paddingTop:16,position:"relative"}} className="scrollbar">
        {loading&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {Array(6).fill(0).map((_,i)=><div key={i} style={{borderRadius:14,background:"var(--card)",border:"1px solid var(--border)",padding:20,animation:"pulse 1.4s ease-in-out infinite",animationDelay:`${i*0.1}s`}}><div style={{display:"flex",gap:12,marginBottom:14}}><div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,.07)"}}/><div style={{flex:1}}><div style={{height:14,borderRadius:4,background:"rgba(255,255,255,.07)",marginBottom:8,width:"70%"}}/><div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",width:"50%"}}/></div></div><div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",marginBottom:8}}/><div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",width:"80%"}}/></div>)}
          </div>
        )}
        {error&&<div style={{textAlign:"center",padding:"60px 40px"}}><div style={{fontSize:14,color:"#F43F5E",marginBottom:12}}>{error}</div><button className="btn btn-cyan" onClick={()=>search()}>Try Again</button></div>}
        {!loading&&results.length>0&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)"}}>{results.length} professionals found for <strong style={{color:"var(--text2)"}}>{query}</strong></div>
              <button className="btn btn-ghost btn-sm" onClick={()=>{setResults([]);setHasSearched(false);setQuery("");}}>New Search</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,paddingBottom:24}}>
              {results.map((profile,i)=><div key={profile.id||i} className="anim-up" style={{animationDelay:`${i*30}ms`}}><ProfileCard profile={profile} onClick={()=>setSelected(profile)}/></div>)}
            </div>
          </>
        )}
        {!hasSearched&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:700,margin:"0 auto"}}>
            {[{icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",col:"#0A66C2",title:"Find Mentors",desc:"Connect with seniors in your field"},{icon:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",col:"#10B981",title:"Find Peers",desc:"Network with professionals at your level"},{icon:"M13 10V3L4 14h7v7l9-11h-7z",col:"#F59E0B",title:"Find Opportunities",desc:"Discover people at your dream companies"}].map((f,i)=>(
              <div key={i} style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,textAlign:"center"}}>
                <div style={{width:42,height:42,borderRadius:12,background:`${f.col}15`,border:`1px solid ${f.col}25`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={f.col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon}/></svg></div>
                <div style={{fontFamily:"var(--font-body)",fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:5}}>{f.title}</div>
                <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.5}}>{f.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ATS RESUME CHECKER — Upload, Score, Analyze, Download */

export default NetworkingHub;
