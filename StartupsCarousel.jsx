import React, { useState, useEffect, useRef, useCallback } from "react";

function CareerRoadmapSection() {
  const [activeGoal, setActiveGoal] = useState(0);
  const [animStep, setAnimStep] = useState(0);
  const canvasRef = useRef(null);

  const GOALS = [
    { title:"DevOps Engineer", col:"#0097b2",
      steps:["Linux & Bash","Networking","Docker","Kubernetes","Terraform","CI/CD Pipelines"] },
    { title:"ML Engineer",     col:"#7ed957",
      steps:["Python","Math & Stats","Pandas/NumPy","Scikit-learn","PyTorch","MLOps"] },
    { title:"Full Stack Dev",  col:"#F59E0B",
      steps:["HTML/CSS","JavaScript","React","Node.js","Databases","Cloud Deploy"] },
    { title:"Data Scientist",  col:"#F43F5E",
      steps:["Python","SQL","Statistics","Visualisation","ML Models","Big Data"] },
  ];

  const goal = GOALS[activeGoal];

  useEffect(() => {
    setAnimStep(0);
    const timers = goal.steps.map((_,i)=>setTimeout(()=>setAnimStep(i+1), i*280+100));
    return () => timers.forEach(clearTimeout);
  }, [activeGoal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, t=0, W, H;
    const resize = ()=>{ W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W; canvas.height=H; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const draw = () => {
      t += 0.015;
      ctx.clearRect(0,0,W,H);
      // Draw animated timeline line
      const n = goal.steps.length;
      const pad = 80, spacing = (W-pad*2)/(n-1);
      const cy = H*.55;

      // Background pulse line
      ctx.beginPath(); ctx.moveTo(pad,cy); ctx.lineTo(W-pad,cy);
      ctx.strokeStyle='rgba(0,151,178,.1)'; ctx.lineWidth=2; ctx.stroke();

      // Active progress line
      const progressW = Math.min(animStep, n-1)*(W-pad*2)/(n-1);
      if (progressW > 0) {
        const pg = ctx.createLinearGradient(pad,0,pad+progressW,0);
        pg.addColorStop(0, goal.col);
        pg.addColorStop(1, goal.col+'88');
        ctx.beginPath(); ctx.moveTo(pad,cy); ctx.lineTo(pad+progressW,cy);
        ctx.strokeStyle=pg; ctx.lineWidth=2.5; ctx.stroke();
      }

      // Nodes
      goal.steps.forEach((_,i) => {
        const x = pad + i*spacing;
        const done = i < animStep;
        const pulse = done ? (Math.sin(t*2+i*.8)+1)/2 : 0;

        if (done) {
          // glow
          ctx.beginPath(); ctx.arc(x,cy,14+pulse*4,0,Math.PI*2);
          ctx.fillStyle=goal.col+'20'; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(x,cy, done?9:6, 0,Math.PI*2);
        ctx.fillStyle = done ? goal.col : 'rgba(255,255,255,.12)';
        ctx.fill();
        if (done) { ctx.strokeStyle=goal.col+'66'; ctx.lineWidth=1.5; ctx.stroke(); }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [activeGoal, animStep, goal]);

  return (
    <div style={{padding:"0 40px 80px"}}>
      <div style={{textAlign:"center", marginBottom:40}}>
        <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#7ed957", letterSpacing:".28em", textTransform:"uppercase", marginBottom:12}}>Career Roadmap</div>
        <h2 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:36, color:"#F0F4FF", letterSpacing:"-1px", marginBottom:12}}>
          Your Step-by-Step Path
        </h2>
        <p style={{fontSize:15, color:"#8896B3", maxWidth:440, margin:"0 auto", lineHeight:1.7}}>
          Pick a goal. See every skill you need to get there.
        </p>
      </div>

      {/* Goal selector */}
      <div style={{display:"flex", gap:10, justifyContent:"center", marginBottom:32, flexWrap:"wrap"}}>
        {GOALS.map((g,i)=>(
          <button key={i} onClick={()=>setActiveGoal(i)}
            style={{padding:"10px 22px", borderRadius:50, fontFamily:"Plus Jakarta Sans,sans-serif",
              fontWeight:700, fontSize:14, cursor:"pointer", border:"none",
              background: activeGoal===i ? `linear-gradient(135deg,${g.col},${g.col}99)` : "rgba(10,22,20,.7)",
              color: activeGoal===i ? "#fff" : "#8896B3",
              boxShadow: activeGoal===i ? `0 8px 24px ${g.col}40` : "none",
              outline: activeGoal!==i ? "1px solid rgba(0,151,178,.12)" : "none",
              transition:"all .25s"}}>
            {g.title}
          </button>
        ))}
      </div>

      {/* Canvas timeline */}
      <div style={{borderRadius:20, overflow:"hidden", border:`1px solid ${goal.col}20`,
        background:"rgba(5,18,15,.7)", marginBottom:20}}>
        <canvas ref={canvasRef} style={{display:"block", width:"100%", height:130}}/>
      </div>

      {/* Step chips */}
      <div style={{display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap"}}>
        {goal.steps.map((step,i)=>(
          <div key={step} style={{
            padding:"9px 18px", borderRadius:50,
            background: i<animStep ? `${goal.col}18` : "rgba(255,255,255,.03)",
            border: i<animStep ? `1px solid ${goal.col}40` : "1px solid rgba(255,255,255,.06)",
            fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:600, fontSize:13,
            color: i<animStep ? goal.col : "#4A5578",
            transition:"all .4s cubic-bezier(.16,1,.3,1)",
            transform: i<animStep ? "scale(1)" : "scale(.95)",
          }}>
            {i<animStep && <span style={{marginRight:6}}>✓</span>}
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

/* HERO VIDEO CANVAS — Neural network animation (replaces video) */
/* NETWORKING BANNER — Animated canvas replacing external image */

export default CareerRoadmapSection;
