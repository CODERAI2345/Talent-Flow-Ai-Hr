// Single job card
function JobCard({ job, onClick }) {
  const [hov, setHov] = useState(false);
  const TYPE_COL  = {"Full-Time":"#6366F1","Remote":"#10B981","Hybrid":"#06B6D4","Contract":"#F59E0B","Part-Time":"#8B5CF6","Internship":"#EC4899"};
  const LEVEL_COL = {"Entry":"#10B981","Mid":"#06B6D4","Senior":"#6366F1","Lead":"#8B5CF6","Director":"#F59E0B","VP":"#F43F5E","C-Level":"#EC4899"};
  const tc = TYPE_COL[job.type]  || "#6366F1";
  const lc = LEVEL_COL[job.level]|| "#06B6D4";
  const posted = job.postedDaysAgo <= 1 ? "Today" : job.postedDaysAgo <= 7 ? `${job.postedDaysAgo}d ago` : `${Math.floor(job.postedDaysAgo/7)}w ago`;
  const isNew  = job.postedDaysAgo <= 3;
  return (
    <div onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:"var(--card)", border:`1px solid ${hov?tc+"40":"var(--border)"}`,
        borderRadius:14, padding:"20px", cursor:"pointer", position:"relative",
        overflow:"hidden", transition:"all .22s cubic-bezier(.16,1,.3,1)",
        transform:hov?"translateY(-2px)":"none",
        boxShadow:hov?`0 16px 48px rgba(0,0,0,.5),0 0 0 1px ${tc}18`:"0 2px 8px rgba(0,0,0,.2)",
      }}>
      {/* accent bar */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,${tc},${lc})`,
        transform:hov?"scaleX(1)":"scaleX(0)",transformOrigin:"left",
        transition:"transform .3s ease"}}/>
      {/* bg glow */}
      <div style={{position:"absolute",top:0,right:0,width:180,height:180,
        background:`radial-gradient(circle,${tc}08,transparent 70%)`,
        pointerEvents:"none",opacity:hov?1:0,transition:"opacity .3s"}}/>

      <div style={{position:"relative",zIndex:1}}>
        {/* header */}
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
          {/* company logo */}
          <div style={{
            width:46,height:46,borderRadius:12,flexShrink:0,
            background:`linear-gradient(135deg,${tc}30,${lc}20)`,
            border:`1px solid ${tc}30`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:20,fontFamily:"Outfit,sans-serif",fontWeight:800,color:tc,
            boxShadow:`0 4px 14px ${tc}22`,
          }}>{(job.company||"?")[0]}</div>

          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
              <span style={{fontFamily:"var(--font-body)",fontWeight:700,fontSize:15,color:"var(--text)",letterSpacing:"-.2px",
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:200}}>{job.title}</span>
              {isNew && <span style={{padding:"1px 7px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",
                background:"rgba(16,185,129,.15)",color:"#10B981",border:"1px solid rgba(16,185,129,.3)"}}>NEW</span>}
            </div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",letterSpacing:".04em"}}>
              {job.company} · {job.location}
            </div>
          </div>

          {/* salary */}
          {job.salaryRange && (
            <div style={{flexShrink:0,textAlign:"right"}}>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:700,fontSize:14,color:"#10B981",letterSpacing:"-.3px"}}>{job.salaryRange}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginTop:1}}>/ YEAR</div>
            </div>
          )}
        </div>

        {/* description */}
        <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.65,marginBottom:14,
          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {job.description}
        </p>

        {/* skills */}
        {job.skills?.length>0 && (
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
            {job.skills.slice(0,4).map((s,i)=>(
              <span key={i} style={{padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:600,
                background:"rgba(255,255,255,.05)",color:"var(--text2)",border:"1px solid var(--border2)",
                fontFamily:"var(--font-mono)"}}>
                {s}
              </span>
            ))}
            {job.skills.length>4 && <span style={{fontSize:9,color:"var(--text3)",alignSelf:"center"}}>+{job.skills.length-4}</span>}
          </div>
        )}

        {/* footer badges */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",
              background:`${tc}18`,color:tc,border:`1px solid ${tc}30`,textTransform:"uppercase"}}>{job.type}</span>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",
              background:`${lc}15`,color:lc,border:`1px solid ${lc}28`,textTransform:"uppercase"}}>{job.level}</span>
            {job.domain && <span style={{padding:"3px 10px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",
              background:"rgba(255,255,255,.04)",color:"var(--text3)",border:"1px solid var(--border2)",textTransform:"uppercase"}}>{job.domain}</span>}
          </div>
          <span style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)"}}>{posted}</span>
        </div>
      </div>
    </div>
  );
}
