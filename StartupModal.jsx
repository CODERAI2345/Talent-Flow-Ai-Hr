import React, { useState, useEffect, useRef, useCallback } from "react";

function HowItWorksSection() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);

  const STEPS = [
    { icon:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12", label:"Upload Resume",      desc:"Drop your PDF or paste text — any format works",             col:"#0097b2" },
    { icon:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label:"AI Skill Analysis",  desc:"Neural model maps every skill, tool and technology found", col:"#006d82" },
    { icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10", label:"Gap Detection",       desc:"Compares your stack to 50,000+ job descriptions live",    col:"#10B981" },
    { icon:"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", label:"Career Roadmap",      desc:"Step-by-step learning path with time estimates",          col:"#7ed957" },
    { icon:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label:"Job Matching",        desc:"AI surfaces roles where you already qualify — apply now", col:"#F59E0B" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // Animated flowing data stream
    const particles = Array.from({length:60}, ()=>({
      x: Math.random()*800, y: Math.random()*200,
      vx: (Math.random()-.3)*0.6, vy: (Math.random()-.5)*0.3,
      r: Math.random()*2+0.5,
      col: Math.random()>.5 ? '#0097b2' : '#7ed957',
      alpha: Math.random()*.6+.2,
    }));

    const draw = () => {
      t += 0.012;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);

      // Background
      const bg = ctx.createLinearGradient(0,0,W,0);
      bg.addColorStop(0,'rgba(3,10,8,.0)');
      bg.addColorStop(.5,'rgba(0,30,25,.15)');
      bg.addColorStop(1,'rgba(3,10,8,.0)');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      // Draw flowing connection lines between step positions
      const n = STEPS.length;
      const stepW = W / n;
      const cy = H * .45;

      for (let i = 0; i < n-1; i++) {
        const x1 = stepW*(i+.5), x2 = stepW*(i+1.5);
        const progress = (t*0.4 - i*0.3) % 1;

        // Base line
        ctx.beginPath(); ctx.moveTo(x1, cy); ctx.lineTo(x2, cy);
        ctx.strokeStyle = i < active ? 'rgba(126,217,87,.35)' : 'rgba(0,151,178,.18)';
        ctx.lineWidth = 1.5; ctx.stroke();

        // Animated pulse dot
        if (progress > 0 && progress < 1) {
          const px = x1 + (x2-x1)*progress;
          ctx.beginPath(); ctx.arc(px, cy, 4, 0, Math.PI*2);
          ctx.fillStyle = i < active ? 'rgba(126,217,87,.9)' : 'rgba(0,151,178,.7)';
          ctx.fill();
          // glow
          ctx.beginPath(); ctx.arc(px, cy, 8, 0, Math.PI*2);
          ctx.fillStyle = i < active ? 'rgba(126,217,87,.15)' : 'rgba(0,151,178,.12)';
          ctx.fill();
        }
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.col + Math.floor(p.alpha*99).toString(16).padStart(2,'0');
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    // Auto-advance step
    const interval = setInterval(() => setActive(a => (a+1) % STEPS.length), 2200);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); clearInterval(interval); };
  }, [active]);

  return (
    <div style={{padding:"0 40px 80px", position:"relative"}}>
      {/* Section header */}
      <div style={{textAlign:"center", marginBottom:48}}>
        <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#0097b2", letterSpacing:".28em", textTransform:"uppercase", marginBottom:12}}>Platform Workflow</div>
        <h2 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:36, color:"#F0F4FF", letterSpacing:"-1px", marginBottom:12}}>
          How TalentFlow Works
        </h2>
        <p style={{fontSize:15, color:"#8896B3", maxWidth:480, margin:"0 auto", lineHeight:1.7}}>
          Five steps from resume to dream job — powered by AI at every stage.
        </p>
      </div>

      {/* Canvas animation layer */}
      <div style={{position:"relative", height:120, marginBottom:0, overflow:"hidden", borderRadius:16}}>
        <canvas ref={canvasRef} style={{position:"absolute", inset:0, width:"100%", height:"100%"}}/>
      </div>

      {/* Step cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginTop:0}}>
        {STEPS.map((step,i)=>(
          <div key={i} onClick={()=>setActive(i)}
            style={{
              padding:"22px 18px", borderRadius:16, cursor:"pointer",
              background: active===i ? `linear-gradient(135deg,${step.col}18,${step.col}08)` : "rgba(10,22,20,.5)",
              border: active===i ? `1px solid ${step.col}45` : "1px solid rgba(0,151,178,.09)",
              backdropFilter:"blur(12px)",
              transition:"all .3s cubic-bezier(.16,1,.3,1)",
              transform: active===i ? "translateY(-4px)" : "none",
              boxShadow: active===i ? `0 16px 40px rgba(0,0,0,.4), 0 0 30px ${step.col}15` : "none",
              position:"relative", overflow:"hidden",
            }}>
            {/* step number */}
            <div style={{position:"absolute", top:12, right:14, fontFamily:"var(--font-mono)", fontSize:10,
              color: active===i ? step.col : "rgba(255,255,255,.15)", fontWeight:700}}>
              0{i+1}
            </div>
            {active===i && <div style={{position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(to right,transparent,${step.col},transparent)`}}/>}
            {/* icon */}
            <div style={{width:40, height:40, borderRadius:11, marginBottom:14,
              background: active===i ? `${step.col}20` : "rgba(0,151,178,.08)",
              border:`1px solid ${active===i ? step.col+'35' : 'rgba(0,151,178,.15)'}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .3s"}}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke={active===i ? step.col : "#4A5578"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={step.icon}/>
              </svg>
            </div>
            <div style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:13,
              color: active===i ? "#F0F4FF" : "#8896B3",
              marginBottom:7, lineHeight:1.25, transition:"color .3s"}}>
              {step.label}
            </div>
            <p style={{fontSize:12, color: active===i ? "rgba(240,244,255,.55)" : "rgba(240,244,255,.3)",
              lineHeight:1.55, margin:0, transition:"color .3s"}}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CAREER DOMAINS — neural network node animation */

export default HowItWorksSection;
