import React, { useState, useEffect, useRef, useCallback } from "react";

function AIToolsSection() {
  const canvasRef = useRef(null);

  const TOOLS = [
    {name:"ChatGPT",    col:"#10B981", cat:"AI Writing"},
    {name:"GitHub Copilot", col:"#0097b2", cat:"AI Coding"},
    {name:"Cursor AI",  col:"#7ed957", cat:"AI IDE"},
    {name:"Notion AI",  col:"#F59E0B", cat:"Productivity"},
    {name:"Midjourney", col:"#F43F5E", cat:"AI Image"},
    {name:"Claude AI",  col:"#0097b2", cat:"AI Assistant"},
    {name:"Perplexity", col:"#7ed957", cat:"AI Search"},
    {name:"Runway ML",  col:"#006d82", cat:"AI Video"},
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t = 0, W, H;
    const resize = () => { W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W; canvas.height=H; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // Data stream particles
    const streams = Array.from({length:120}, ()=>({
      x: Math.random()*1200, y: Math.random()*200,
      speed: Math.random()*1.5+.5,
      len: Math.random()*40+10,
      col: ['#0097b2','#7ed957','#10B981'][Math.floor(Math.random()*3)],
      alpha: Math.random()*.4+.1,
    }));

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0,0,W,H);
      // bg
      ctx.fillStyle='rgba(3,10,8,.92)'; ctx.fillRect(0,0,W,H);
      // grid
      ctx.strokeStyle='rgba(0,151,178,.06)'; ctx.lineWidth=.5;
      for(let x=0;x<W;x+=48){ ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke(); }
      for(let y=0;y<H;y+=48){ ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); }

      // streams
      streams.forEach(s => {
        s.x -= s.speed;
        if (s.x+s.len < 0) { s.x = W+s.len; s.y = Math.random()*H; }
        const g = ctx.createLinearGradient(s.x-s.len,s.y,s.x,s.y);
        g.addColorStop(0,'transparent');
        g.addColorStop(1, s.col + Math.floor(s.alpha*255).toString(16).padStart(2,'0'));
        ctx.beginPath(); ctx.moveTo(s.x-s.len,s.y); ctx.lineTo(s.x,s.y);
        ctx.strokeStyle=g; ctx.lineWidth=1.5; ctx.stroke();
        // head dot
        ctx.beginPath(); ctx.arc(s.x,s.y,1.5,0,Math.PI*2);
        ctx.fillStyle=s.col+'cc'; ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div style={{padding:"0 40px 80px"}}>
      <div style={{textAlign:"center", marginBottom:40}}>
        <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#0097b2", letterSpacing:".28em", textTransform:"uppercase", marginBottom:12}}>AI Ecosystem</div>
        <h2 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:36, color:"#F0F4FF", letterSpacing:"-1px", marginBottom:12}}>
          Master the AI Tool Stack
        </h2>
        <p style={{fontSize:15, color:"#8896B3", maxWidth:440, margin:"0 auto", lineHeight:1.7}}>
          The tools top engineers use daily. Know them. Get hired.
        </p>
      </div>
      {/* canvas bg + tool cards layered */}
      <div style={{position:"relative", borderRadius:24, overflow:"hidden",
        border:"1px solid rgba(0,151,178,.12)"}}>
        <canvas ref={canvasRef} style={{display:"block", width:"100%", height:220, position:"absolute", inset:0}}/>
        <div style={{position:"relative", zIndex:2, padding:"32px 32px 40px",
          background:"linear-gradient(to bottom, transparent 0%, rgba(3,10,8,.7) 60%, rgba(3,10,8,.95) 100%)"}}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:60}}>
            {TOOLS.map((tool,i)=>(
              <div key={i} style={{padding:"16px 18px", borderRadius:14,
                background:"rgba(5,18,15,.8)", backdropFilter:"blur(16px)",
                border:`1px solid ${tool.col}22`,
                transition:"all .25s",
                cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${tool.col}55`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,.4),0 0 24px ${tool.col}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${tool.col}22`;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8}}>
                  <div style={{width:8, height:8, borderRadius:"50%", background:tool.col,
                    boxShadow:`0 0 8px ${tool.col}`, marginTop:2}}/>
                  <span style={{fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(240,244,255,.3)", letterSpacing:".1em"}}>{i+1}</span>
                </div>
                <div style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:14, color:"#F0F4FF", marginBottom:3}}>{tool.name}</div>
                <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:tool.col, letterSpacing:".08em"}}>{tool.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* CAREER ROADMAP — timeline animation */

export default AIToolsSection;
