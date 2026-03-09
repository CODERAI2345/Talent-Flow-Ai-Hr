import React, { useState, useEffect, useRef, useCallback } from "react";

function CareerDomainsSection() {
  const canvasRef = useRef(null);

  const DOMAINS = [
    {label:"AI / ML",          col:"#0097b2", x:.15, y:.3},
    {label:"Cloud",            col:"#7ed957", x:.35, y:.15},
    {label:"DevOps",           col:"#10B981", x:.55, y:.25},
    {label:"Data Science",     col:"#F59E0B", x:.75, y:.15},
    {label:"Cybersecurity",    col:"#F43F5E", x:.85, y:.45},
    {label:"Full Stack",       col:"#0097b2", x:.65, y:.55},
    {label:"Mobile Dev",       col:"#7ed957", x:.42, y:.6},
    {label:"Blockchain",       col:"#006d82", x:.22, y:.55},
    {label:"UX Design",        col:"#F59E0B", x:.08, y:.55},
    {label:"Product",          col:"#10B981", x:.5, y:.42},
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t = 0;
    let W, H;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // Moving particles along edges
    const particles = Array.from({length:80}, ()=>({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-.5)*.003, vy: (Math.random()-.5)*.003,
      r: Math.random()*1.5+.5,
      col: Math.random()>.5 ? '#0097b2' : '#7ed957',
    }));

    // Connections between close domains
    const connections = [];
    for (let i=0;i<DOMAINS.length;i++)
      for (let j=i+1;j<DOMAINS.length;j++) {
        const dx=DOMAINS[i].x-DOMAINS[j].x, dy=DOMAINS[i].y-DOMAINS[j].y;
        if (Math.sqrt(dx*dx+dy*dy) < .35) connections.push([i,j]);
      }

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0,0,W,H);

      // Dark bg gradient
      const bg = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.6);
      bg.addColorStop(0,'rgba(5,18,15,.95)');
      bg.addColorStop(1,'rgba(3,10,8,.98)');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      // Draw connections
      connections.forEach(([a,b]) => {
        const ax=DOMAINS[a].x*W, ay=DOMAINS[a].y*H;
        const bx=DOMAINS[b].x*W, by=DOMAINS[b].y*H;
        // animated pulse
        const pulse = (Math.sin(t*1.5 + a*0.7 + b*0.5)+1)/2;
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by);
        const grad = ctx.createLinearGradient(ax,ay,bx,by);
        grad.addColorStop(0, DOMAINS[a].col+'40');
        grad.addColorStop(pulse, DOMAINS[a].col+'99');
        grad.addColorStop(1, DOMAINS[b].col+'40');
        ctx.strokeStyle = grad; ctx.lineWidth = 1+pulse*.5; ctx.stroke();

        // traveling dot
        const tp = (t*0.35 + a*0.3 + b*0.2) % 1;
        const px = ax+(bx-ax)*tp, py = ay+(by-ay)*tp;
        ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2);
        ctx.fillStyle = DOMAINS[a].col+'cc'; ctx.fill();
      });

      // Draw particles
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1;
        if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);
        ctx.fillStyle=p.col+'55'; ctx.fill();
      });

      // Draw domain nodes
      DOMAINS.forEach((d,i) => {
        const x=d.x*W, y=d.y*H;
        const pulse = (Math.sin(t*1.2+i*.8)+1)/2;
        const r = 32 + pulse*6;

        // glow
        const grd = ctx.createRadialGradient(x,y,0,x,y,r*2.5);
        grd.addColorStop(0, d.col+'55');
        grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(x,y,r*2.5,0,Math.PI*2);
        ctx.fillStyle=grd; ctx.fill();

        // node circle
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
        const nGrd = ctx.createRadialGradient(x-r*.3,y-r*.3,0,x,y,r);
        nGrd.addColorStop(0, d.col+'cc');
        nGrd.addColorStop(1, d.col+'44');
        ctx.fillStyle=nGrd; ctx.fill();
        ctx.strokeStyle=d.col+'88'; ctx.lineWidth=1.5; ctx.stroke();

        // label
        ctx.font = `700 12px "Plus Jakarta Sans",sans-serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillStyle='rgba(240,244,255,.92)';
        ctx.fillText(d.label,x,y);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div style={{padding:"0 40px 80px"}}>
      <div style={{textAlign:"center", marginBottom:36}}>
        <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#7ed957", letterSpacing:".28em", textTransform:"uppercase", marginBottom:12}}>Career Universe</div>
        <h2 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:36, color:"#F0F4FF", letterSpacing:"-1px", marginBottom:12}}>
          Explore Career Domains
        </h2>
        <p style={{fontSize:15, color:"#8896B3", maxWidth:440, margin:"0 auto", lineHeight:1.7}}>
          Every node is a career path. Every connection is a skill overlap. Find yours.
        </p>
      </div>
      <div style={{borderRadius:24, overflow:"hidden", border:"1px solid rgba(0,151,178,.14)",
        boxShadow:"0 20px 60px rgba(0,0,0,.5)", position:"relative"}}>
        <canvas ref={canvasRef} style={{display:"block", width:"100%", height:380}}/>
        {/* overlay label */}
        <div style={{position:"absolute", bottom:16, right:20,
          fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(240,244,255,.3)", letterSpacing:".2em"}}>
          INTERACTIVE · LIVE CONNECTIONS
        </div>
      </div>
    </div>
  );
}

/* AI TOOLS ECOSYSTEM — particle flow */

export default CareerDomainsSection;
