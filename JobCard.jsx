import React, { useState, useEffect, useRef, useCallback } from "react";

function NetworkingBanner() {
  const canvasRef = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t = 0;
    let W = canvas.offsetWidth || 800;
    let H = canvas.offsetHeight || 220;
    canvas.width = W; canvas.height = H;

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    });
    ro.observe(canvas);

    // People nodes
    const ROLES = ['PM','SWE','ML','UX','DevOps','CTO','Data','iOS','Cloud','Fin'];
    const COLS  = ['#0097b2','#7ed957','#10B981','#F59E0B','#EC4899','#8B5CF6','#0097b2','#7ed957','#10B981','#F59E0B'];
    const nodes = Array.from({length:10},(_,i)=>({
      x: (0.08+i*0.09)*800, y: 60+Math.sin(i*1.4)*60,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:18, role:ROLES[i], col:COLS[i],
      pulse:Math.random()*Math.PI*2,
    }));

    // Particles
    const PTS = Array.from({length:70},()=>({
      x:Math.random()*800, y:Math.random()*220,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.5+.4,
      a:Math.random()*.12+.03,
      teal:Math.random()>.5,
    }));

    const draw = () => {
      t += 0.018;

      // Background
      const bg = ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,'#020d0f'); bg.addColorStop(.5,'#041520'); bg.addColorStop(1,'#020d0f');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // Grid
      ctx.strokeStyle='rgba(0,151,178,.06)'; ctx.lineWidth=1;
      for(let x=0;x<W;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

      // Particles
      PTS.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.fillStyle=p.teal ? `rgba(0,151,178,${p.a})` : `rgba(126,217,87,${p.a})`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      });

      // Move nodes
      nodes.forEach(n=>{
        n.x+=n.vx; n.y+=n.vy; n.pulse+=0.04;
        if(n.x<30||n.x>W-30) n.vx*=-1;
        if(n.y<30||n.y>H-30) n.vy*=-1;
      });

      // Connection lines between nearby nodes
      nodes.forEach((a,i)=>nodes.forEach((b,j)=>{
        if(j<=i) return;
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<200){
          const alpha=(1-dist/200)*0.35;
          ctx.strokeStyle=`rgba(0,151,178,${alpha})`; ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();

          // Traveling dot along connection
          const prog=(t*0.4+(i*0.3+j*0.2))%1;
          const tx2=a.x+(b.x-a.x)*prog, ty2=a.y+(b.y-a.y)*prog;
          ctx.fillStyle=`rgba(126,217,87,${alpha*2})`;
          ctx.beginPath(); ctx.arc(tx2,ty2,2,0,Math.PI*2); ctx.fill();
        }
      }));

      // Draw nodes
      nodes.forEach(n=>{
        const pulse=0.4+0.25*Math.sin(n.pulse);
        // Outer glow ring
        const glow=ctx.createRadialGradient(n.x,n.y,n.r,n.x,n.y,n.r+18);
        glow.addColorStop(0,n.col+'55'); glow.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(n.x,n.y,n.r+18,0,Math.PI*2); ctx.fill();

        // Node circle
        ctx.fillStyle=n.col+'22';
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=n.col; ctx.lineWidth=1.8;
        ctx.stroke();

        // Role label
        ctx.fillStyle='rgba(255,255,255,.85)';
        ctx.font=`bold 9px "Plus Jakarta Sans",sans-serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(n.role,n.x,n.y);

        // Pulse ring
        ctx.strokeStyle=n.col+Math.round(pulse*99).toString(16).padStart(2,'0');
        ctx.lineWidth=1; ctx.beginPath();
        ctx.arc(n.x,n.y,n.r+8+6*Math.sin(n.pulse),0,Math.PI*2); ctx.stroke();
      });

      // Teal left glow + lime right glow
      const lg=ctx.createRadialGradient(0,H/2,10,0,H/2,W*.45);
      lg.addColorStop(0,'rgba(0,151,178,.12)'); lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
      const rg=ctx.createRadialGradient(W,H/2,10,W,H/2,W*.45);
      rg.addColorStop(0,'rgba(126,217,87,.08)'); rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg; ctx.fillRect(0,0,W,H);

      // Bottom fade
      const bf=ctx.createLinearGradient(0,H*.6,0,H);
      bf.addColorStop(0,'rgba(2,13,15,0)'); bf.addColorStop(1,'rgba(2,13,15,.85)');
      ctx.fillStyle=bf; ctx.fillRect(0,0,W,H);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const STATS = [
    { val:"94K+",  label:"Professionals", col:"#0097b2" },
    { val:"3.8K+", label:"Companies",     col:"#7ed957" },
    { val:"12K+",  label:"Connections",   col:"#10B981" },
    { val:"4.9★",  label:"Avg Rating",    col:"#F59E0B" },
  ];

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ position:"relative", width:"100%", height:220,
        borderRadius:18, overflow:"hidden", flexShrink:0, marginBottom:16,
        boxShadow:"0 8px 32px rgba(0,0,0,.55)",
        border:"1px solid rgba(0,151,178,.2)" }}>

      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }}/>

      {/* Live badge */}
      <div style={{ position:"absolute", top:14, left:16, zIndex:5,
        display:"flex", alignItems:"center", gap:7,
        padding:"5px 13px", borderRadius:20,
        background:"rgba(0,0,0,.5)", backdropFilter:"blur(10px)",
        border:"1px solid rgba(0,151,178,.3)" }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:"#0097b2",
          boxShadow:"0 0 8px #0097b2", animation:"pulse 1.5s infinite" }}/>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2",
          letterSpacing:".18em", textTransform:"uppercase" }}>Live Network</span>
      </div>

      {/* Bottom: title + stats */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:5,
        padding:"10px 16px 14px",
        display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:12 }}>
        <div>
          <div style={{ fontFamily:"Calibri,Candara,Segoe UI,sans-serif", fontWeight:700,
            fontSize:20, color:"#fff", textShadow:"0 2px 12px rgba(0,0,0,.9)", marginBottom:2 }}>
            Connect with Professionals
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2",
            letterSpacing:".2em", textTransform:"uppercase" }}>
            Network · Grow · Succeed
          </div>
        </div>
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          {STATS.map((s,i)=>(
            <div key={i} style={{ padding:"6px 11px", borderRadius:10, textAlign:"center",
              background:"rgba(2,8,14,.75)", backdropFilter:"blur(12px)",
              border:`1px solid ${s.col}30` }}>
              <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                fontSize:13, color:s.col, lineHeight:1 }}>{s.val}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:7,
                color:"rgba(240,244,255,.4)", letterSpacing:".1em", marginTop:2 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NetworkingBanner;
