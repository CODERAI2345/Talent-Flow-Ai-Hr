import React, { useState, useEffect, useRef, useCallback } from "react";

function HomePage({ onGetStarted }) {
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);
  const meshRef    = useRef(null);
  const [loaded, setLoaded]   = useState(false);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts]   = useState({jobs:0,companies:0,tools:0,users:0});
  const mouseRef = useRef({x:0,y:0});

  /* ─── WebGL 3D mesh background ─────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {antialias:true, alpha:true});
    if (!gl) return;

    let W, H, raf, prog, posLoc, timeLoc, resLoc, mouseLoc;

    const vert = `
      attribute vec2 a_pos;
      void main(){ gl_Position = vec4(a_pos,0.,1.); }
    `;
    const frag = `
      precision highp float;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;

      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        f = f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                   mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.,a=.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.1; a*=.5; }
        return v;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy/u_res;
        vec2 mu = u_mouse/u_res;
        float t = u_time*.28;

        /* flowing mesh lines */
        vec2 q = uv*3.5 + vec2(t*.18, t*.12);
        float f = fbm(q + fbm(q + fbm(q)));

        /* mouse attract */
        float mdist = length(uv - mu);
        float mwave = exp(-mdist*3.5)*sin(mdist*12.-t*3.)*0.18;

        float v = f + mwave;

        /* colour map: dark navy → indigo → violet → cyan */
        vec3 c0 = vec3(0.008, 0.016, 0.055);  /* deep navy */
        vec3 c1 = vec3(0.0,   0.38,  0.44 );  /* teal */
        vec3 c2 = vec3(0.0,   0.59,  0.70 );  /* deep teal */
        vec3 c3 = vec3(0.49,  0.85,  0.34 );  /* lime */

        vec3 col = mix(c0, c1, smoothstep(.30,.55, v));
        col = mix(col, c2, smoothstep(.52,.70, v)*0.7);
        col = mix(col, c3, smoothstep(.68,.85, v)*0.35);

        /* vignette */
        float vig = 1.-smoothstep(.3,1.2, length(uv*2.-1.)*0.85);
        col *= vig;

        /* subtle scanline grain */
        float grain = hash(uv*u_res*.5+t)*0.025;
        col += grain;

        gl_FragColor = vec4(col, 0.96);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);

    posLoc   = gl.getAttribLocation(prog,  'a_pos');
    timeLoc  = gl.getUniformLocation(prog, 'u_time');
    resLoc   = gl.getUniformLocation(prog, 'u_res');
    mouseLoc = gl.getUniformLocation(prog, 'u_mouse');

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      gl.viewport(0,0,W,H);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t0 = performance.now();
    const draw = () => {
      const t = (performance.now()-t0)/1000;
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(resLoc, W, H);
      gl.uniform2f(mouseLoc, mouseRef.current.x, H - mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();
    meshRef.current = {stop:()=>{ cancelAnimationFrame(raf); ro.disconnect(); }};
    return () => meshRef.current?.stop();
  }, []);

  /* ─── mouse tracking ─────────────────────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = e => {
      const r = wrap.getBoundingClientRect();
      mouseRef.current = {x: e.clientX - r.left, y: e.clientY - r.top};
    };
    wrap.addEventListener('mousemove', onMove);
    return () => wrap.removeEventListener('mousemove', onMove);
  }, []);

  /* ─── entrance animation ─────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const t2 = setTimeout(() => setVisible(true), 200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  /* ─── animated counters ─────────────────────── */
  useEffect(() => {
    const targets = {jobs:12400, companies:3800, tools:680, users:94000};
    const dur = 2400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now()-start)/dur, 1);
      const ease = 1 - Math.pow(1-p, 3);
      setCounts({
        jobs:      Math.round(targets.jobs      * ease),
        companies: Math.round(targets.companies * ease),
        tools:     Math.round(targets.tools     * ease),
        users:     Math.round(targets.users     * ease),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 700);
    return () => clearTimeout(t);
  }, []);

  const CARDS = [
    {
      id:"jobSearch",
      label:"01", eyebrow:"SEARCH & DISCOVER",
      title:"Find Your\nDream Role",
      desc:"AI-curated jobs from 50+ sources. India-aware salary intel in ₹ INR.",
      icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      action:"Explore Jobs", actionIcon:"↗",
      col1:"#0097b2", col2:"#006d82",
      bg:"linear-gradient(135deg,rgba(0,151,178,.18) 0%,rgba(0,109,130,.12) 100%)",
      imgGradient:"linear-gradient(160deg,#030F14 0%,#021820 25%,#033040 50%,#005070 70%,#0097b2 88%,#7ed957 130%)",
      rating:"4.9", reviews:"12.4K",
    },
    {
      id:"atsChecker",
      label:"02", eyebrow:"RESUME INTELLIGENCE",
      title:"Beat the\nATS Bots",
      desc:"Upload, score, fix. AI-rewritten resume that passes every filter.",
      icon:"M9 12l2 2 4-4m6 2a9 9 0 11-14 0 7 7 0 0118 0z",
      action:"Check Resume", actionIcon:"+",
      col1:"#F43F5E", col2:"#F59E0B",
      bg:"linear-gradient(135deg,rgba(244,63,94,.15) 0%,rgba(245,158,11,.08) 100%)",
      imgGradient:"linear-gradient(150deg,#1A0A0A 0%,#3D1020 30%,#6B1535 55%,#C02050 75%,#F43F5E 95%,#F59E0B 130%)",
      rating:"4.8", reviews:"8.2K",
      accent:"#39FF14",
    },
    {
      id:"salaryCalc",
      label:"03", eyebrow:"MARKET INTELLIGENCE",
      title:"Know Your\nWorth",
      desc:"Real market rates in ₹. Role × city × experience. Negotiate with data.",
      icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      action:"Calculate Salary", actionIcon:"↗",
      col1:"#10B981", col2:"#7ed957",
      bg:"linear-gradient(135deg,rgba(16,185,129,.14) 0%,rgba(126,217,87,.08) 100%)",
      imgGradient:"linear-gradient(155deg,#001A12 0%,#003D28 25%,#006644 50%,#10B981 80%,#7ed957 115%)",
      rating:"4.9", reviews:"6.8K",
    },
  ];

  const tr = (ms, extra={}) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity .7s ease ${ms}ms, transform .7s cubic-bezier(.16,1,.3,1) ${ms}ms`,
    ...extra,
  });

  return (
    <div ref={wrapRef} style={{height:"100%", overflowY:"auto", overflowX:"hidden", position:"relative", background:"#02040A"}} className="scrollbar">

      {/* HERO — full-bleed with WebGL mesh + bold card */}
      <div style={{position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", overflow:"hidden"}}>

        {/* WebGL canvas — fills entire hero */}
        <canvas ref={canvasRef} style={{position:"absolute", inset:0, width:"100%", height:"100%", zIndex:0}}/>

        {/* Overlay gradient — darkens edges, focuses center */}
        <div style={{position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          background:"linear-gradient(to bottom, rgba(2,4,10,.55) 0%, transparent 30%, transparent 60%, rgba(2,4,10,.9) 100%)"}}/>

        {/* ── TOP NAV BAR ── */}
        <div style={{...tr(0), position:"relative", zIndex:10, display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"20px 40px", borderBottom:"1px solid rgba(0,151,178,.12)"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:36, height:36, borderRadius:10,
              background:"linear-gradient(135deg,#0097b2,#7ed957)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:17, color:"#fff",
              boxShadow:"0 0 24px rgba(0,151,178,.55)"}}>T</div>
            <span style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:17, color:"#F0F4FF", letterSpacing:"-.4px"}}>TalentFlow AI</span>
          </div>
          
          <div style={{display:"flex", gap:10}}>
            <button style={{padding:"9px 22px", borderRadius:9, background:"transparent",
              border:"1px solid rgba(0,151,178,.35)", color:"rgba(240,244,255,.8)",
              fontFamily:"var(--font-body)", fontSize:14, fontWeight:600, cursor:"pointer",
              transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,151,178,.7)";e.currentTarget.style.color="#F0F4FF";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,151,178,.35)";e.currentTarget.style.color="rgba(240,244,255,.8)";}}>
              Sign In
            </button>
            <button onClick={onGetStarted} style={{padding:"9px 22px", borderRadius:9,
              background:"linear-gradient(135deg,#0097b2,#7ed957)", color:"#fff",
              fontFamily:"Plus Jakarta Sans,sans-serif", fontSize:14, fontWeight:700, border:"none", cursor:"pointer",
              boxShadow:"0 4px 20px rgba(0,151,178,.5)", transition:"all .22s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,151,178,.65)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,151,178,.5)";}}>
              Get Started
            </button>
          </div>
        </div>

        {/* ── BIG HERO CARD (like the reference image) ── */}
        <div style={{...tr(100), position:"relative", zIndex:5, flex:1, padding:"30px 40px 20px", display:"flex", flexDirection:"column", justifyContent:"center"}}>

          {/* The main outer card */}
          <div style={{
            borderRadius:28, overflow:"hidden", position:"relative",
            background:"rgba(12,14,38,.55)",
            backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
            border:"1px solid rgba(0,151,178,.18)",
            boxShadow:"0 40px 120px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06)",
            display:"grid", gridTemplateColumns:"1fr 1.1fr", minHeight:380,
          }}>
            {/* inset top glint */}
            <div style={{position:"absolute", top:0, left:0, right:0, height:1,
              background:"linear-gradient(to right,transparent,rgba(0,151,178,.5),rgba(0,109,130,.4),transparent)",
              zIndex:10, pointerEvents:"none"}}/>

            {/* LEFT — massive typography */}
            <div style={{padding:"52px 48px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between",
              position:"relative", zIndex:2}}>
              {/* eyebrow */}
              <div style={{display:"inline-flex", alignItems:"center", gap:8,
                padding:"5px 14px", borderRadius:20, marginBottom:24, alignSelf:"flex-start",
                background:"rgba(0,151,178,.1)", border:"1px solid rgba(0,151,178,.22)"}}>
                <div style={{width:5, height:5, borderRadius:"50%", background:"#0097b2",
                  boxShadow:"0 0 8px rgba(0,151,178,.9)", animation:"pulse 2s infinite"}}/>
                <span style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#5dd3e8", letterSpacing:".22em", textTransform:"uppercase"}}>
                  AI Career Platform · India First
                </span>
              </div>

              {/* MASSIVE headline — like "CLOUD REALM CORNER" */}
              <div>
                <h1 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                  fontSize:"clamp(48px,5vw,76px)",
                  lineHeight:1.0, letterSpacing:"-1.5px",
                  color:"#F0F4FF", marginBottom:0}}>
                  Talent
                </h1>
                <h1 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                  fontSize:"clamp(48px,5vw,76px)",
                  lineHeight:1.0, letterSpacing:"-1.5px", marginBottom:0,
                  background:"linear-gradient(135deg,#0097b2 0%,#7ed957 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>
                  Flow
                </h1>
                <h1 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                  fontSize:"clamp(48px,5vw,76px)",
                  lineHeight:1.0, letterSpacing:"-1.5px", color:"#F0F4FF"}}>
                  AI
                </h1>
              </div>

              {/* sub */}
              <p style={{fontSize:15, color:"rgba(240,244,255,.55)", lineHeight:1.65,
                maxWidth:300, marginTop:20, fontFamily:"var(--font-body)"}}>
                One platform. Six AI tools. Built to get you hired faster in India's tech market.
              </p>

              {/* CTA row */}
              <div style={{display:"flex", alignItems:"center", gap:14, marginTop:32}}>
                <button onClick={onGetStarted} style={{display:"flex", alignItems:"center", gap:10,
                  padding:"13px 26px", borderRadius:50, border:"none", cursor:"pointer",
                  background:"linear-gradient(135deg,#0097b2,#7ed957)",
                  fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:13,
                  color:"#fff", letterSpacing:".08em", textTransform:"uppercase",
                  boxShadow:"0 0 32px rgba(0,151,178,.55)", transition:"all .22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 0 48px rgba(0,151,178,.75)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 0 32px rgba(0,151,178,.55)";}}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 3l14 9-14 9V3z"/></svg>
                  Launch Platform
                </button>
                <button style={{display:"flex", alignItems:"center", gap:8,
                  padding:"13px 22px", borderRadius:50,
                  background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)",
                  fontFamily:"var(--font-body)", fontWeight:600, fontSize:13,
                  color:"rgba(240,244,255,.7)", cursor:"pointer", transition:"all .2s",
                  letterSpacing:".05em", textTransform:"uppercase"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.color="#F0F4FF";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="rgba(240,244,255,.7)";}}>
                  Watch Demo
                </button>
              </div>
            </div>

            {/* ── RIGHT — Canvas Video Simulation ── */}
            <div style={{position:"relative", overflow:"hidden", minHeight:380}}>
              <HeroVideoCanvas counts={counts} visible={visible}/>
            </div>
          </div>
        </div>

        {/* ── SCROLL HINT ── */}
        <div style={{...tr(400), position:"relative", zIndex:5, textAlign:"center", paddingBottom:24}}>
          <div style={{display:"inline-flex", flexDirection:"column", alignItems:"center", gap:5, opacity:.4}}>
            <span style={{fontFamily:"var(--font-mono)", fontSize:9, color:"#5dd3e8", letterSpacing:".25em", textTransform:"uppercase"}}>Scroll</span>
            <div style={{width:1, height:28, background:"linear-gradient(to bottom,#0097b2,transparent)", animation:"pulse 2s infinite"}}/>
          </div>
        </div>
      </div>

      {/* 3 FEATURE CARDS (like the 3 cards in reference) */}
      <div style={{padding:"0 40px 60px"}}>
        {/* Section label */}
        <div style={{display:"flex", alignItems:"center", gap:14, marginBottom:32}}>
          <div style={{flex:1, height:1, background:"linear-gradient(to right,rgba(0,151,178,.3),transparent)"}}/>
          <span style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#4A5578", letterSpacing:".28em", textTransform:"uppercase"}}>Featured Tools</span>
          <div style={{flex:1, height:1, background:"linear-gradient(to left,rgba(0,151,178,.3),transparent)"}}/>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18}}>
          {CARDS.map((card,i)=>(
            <div key={card.id} onClick={()=>onGetStarted && onGetStarted(card.id)}
              style={{
                borderRadius:24, overflow:"hidden", cursor:"pointer",
                position:"relative", height:380,
                opacity: visible?1:0,
                transform: visible?"translateY(0)":"translateY(32px)",
                transition:`opacity .7s ease ${300+i*130}ms, transform .7s cubic-bezier(.16,1,.3,1) ${300+i*130}ms`,
                boxShadow:"0 12px 40px rgba(0,0,0,.5)",
              }}
              onMouseEnter={e=>{
                e.currentTarget.querySelector('.card-img-bg').style.transform="scale(1.08)";
                e.currentTarget.querySelector('.card-see-more').style.background=card.col1;
                e.currentTarget.querySelector('.card-see-more').style.borderColor=card.col1;
                e.currentTarget.querySelector('.card-see-more svg').style.transform="translateX(3px)";
                e.currentTarget.style.boxShadow=`0 24px 60px rgba(0,0,0,.65), 0 0 40px ${card.col1}25`;
                e.currentTarget.style.transform="translateY(-6px)";
              }}
              onMouseLeave={e=>{
                e.currentTarget.querySelector('.card-img-bg').style.transform="scale(1)";
                e.currentTarget.querySelector('.card-see-more').style.background="rgba(15,18,38,.85)";
                e.currentTarget.querySelector('.card-see-more').style.borderColor="rgba(255,255,255,.15)";
                e.currentTarget.querySelector('.card-see-more svg').style.transform="translateX(0)";
                e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.5)";
                e.currentTarget.style.transform="translateY(0)";
              }}>

              {/* ── FULL-BLEED IMAGE BACKGROUND (gradient simulation) ── */}
              <div className="card-img-bg" style={{
                position:"absolute", inset:0,
                background:card.imgGradient,
                transition:"transform .5s cubic-bezier(.16,1,.3,1)",
                transformOrigin:"center",
              }}/>

              {/* ── mesh grid overlay (subtle texture like the mountains image) ── */}
              <svg style={{position:"absolute", inset:0, width:"100%", height:"100%", opacity:.07, pointerEvents:"none"}} viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice">
                {Array.from({length:10}).map((_,j)=>(
                  <line key={`h${j}`} x1="0" y1={j*42} x2="300" y2={j*42+20} stroke="white" strokeWidth=".5"/>
                ))}
                {Array.from({length:8}).map((_,j)=>(
                  <line key={`v${j}`} x1={j*42} y1="0" x2={j*42+20} y2="380" stroke="white" strokeWidth=".5"/>
                ))}
              </svg>

              {/* ── cinematic gradient overlay (dark at bottom like travel card) ── */}
              <div style={{position:"absolute", inset:0,
                background:"linear-gradient(to bottom, rgba(0,0,0,.08) 0%, transparent 35%, rgba(0,0,0,.15) 55%, rgba(2,4,12,.82) 100%)",
                pointerEvents:"none"}}/>

              {/* ── TOP ROW: category tag + heart icon ── */}
              <div style={{position:"absolute", top:18, left:18, right:18,
                display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:5}}>
                <div style={{display:"flex", alignItems:"center", gap:7,
                  padding:"5px 13px", borderRadius:20,
                  background:"rgba(2,4,12,.55)", backdropFilter:"blur(12px)",
                  border:"1px solid rgba(255,255,255,.12)"}}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                    stroke={card.col1} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.icon}/>
                  </svg>
                  <span style={{fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,.8)",
                    letterSpacing:".16em", textTransform:"uppercase"}}>{card.eyebrow}</span>
                </div>
                {/* heart / save icon */}
                <div style={{width:34, height:34, borderRadius:"50%",
                  background:"rgba(2,4,12,.5)", backdropFilter:"blur(12px)",
                  border:"1px solid rgba(255,255,255,.15)",
                  display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </div>
              </div>

              {/* ── CENTER DECORATION: floating accent orb ── */}
              <div style={{position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)",
                width:80, height:80, borderRadius:"50%",
                background:`radial-gradient(circle, ${card.col1}55 0%, transparent 70%)`,
                filter:"blur(20px)", pointerEvents:"none", zIndex:2}}/>

              {/* ── BOTTOM CONTENT (like "Brazil / Rio de Janeiro / 5.0 / 143 reviews") ── */}
              <div style={{position:"absolute", bottom:0, left:0, right:0, padding:"0 20px 0", zIndex:5}}>
                {/* Info panel */}
                <div style={{padding:"16px 18px 0"}}>
                  {/* label / country equivalent */}
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:`${card.col1}`,
                    letterSpacing:".2em", textTransform:"uppercase", marginBottom:5, opacity:.9}}>
                    {card.label} &nbsp;·&nbsp; Career Intelligence
                  </div>
                  {/* Big title — like "Rio de Janeiro" */}
                  <div style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:24,
                    color:"#F0F4FF", letterSpacing:"-.6px", lineHeight:1.15, marginBottom:10}}>
                    {card.title.replace(/\n/g,' ')}
                  </div>
                  {/* Rating row — like "★ 5.0  143 reviews" */}
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:16}}>
                    <div style={{display:"flex", alignItems:"center", gap:5,
                      padding:"3px 10px", borderRadius:20,
                      background:"rgba(255,255,255,.09)", border:"1px solid rgba(255,255,255,.12)"}}>
                      <svg width={11} height={11} viewBox="0 0 24 24" fill={card.col1} stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span style={{fontFamily:"var(--font-mono)", fontSize:11, color:"#F0F4FF", fontWeight:700}}>
                        {card.rating}
                      </span>
                    </div>
                    <span style={{fontSize:12, color:"rgba(240,244,255,.5)"}}>
                      {card.reviews} users
                    </span>
                    <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:4,
                      padding:"2px 10px", borderRadius:20,
                      background:`${card.col1}18`, border:`1px solid ${card.col1}30`}}>
                      <div style={{width:5, height:5, borderRadius:"50%", background:card.col1,
                        boxShadow:`0 0 6px ${card.col1}`}}/>
                      <span style={{fontFamily:"var(--font-mono)", fontSize:9, color:card.col1,
                        letterSpacing:".12em", textTransform:"uppercase"}}>Active</span>
                    </div>
                  </div>
                </div>

                {/* "See more" bar — exactly like reference image */}
                <div style={{
                  margin:"0 0 0", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 18px",
                  background:"rgba(3,10,10,.88)", backdropFilter:"blur(16px)",
                  borderTop:"1px solid rgba(255,255,255,.07)",
                }}>
                  <span style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:14,
                    color:"rgba(240,244,255,.85)", letterSpacing:"-.1px"}}>
                    {card.action}
                  </span>
                  <div className="card-see-more" style={{
                    width:36, height:36, borderRadius:"50%",
                    background:"rgba(15,18,38,.85)",
                    border:"1px solid rgba(255,255,255,.15)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"all .25s",
                    flexShrink:0,
                  }}>
                    <svg style={{transition:"transform .25s"}} width={15} height={15} viewBox="0 0 24 24" fill="none"
                      stroke="rgba(240,244,255,.8)" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{padding:"0 40px 60px"}}>
        <div style={{padding:"32px 40px", borderRadius:20,
          background:"rgba(10,22,20,.6)", backdropFilter:"blur(16px)",
          border:"1px solid rgba(0,151,178,.12)",
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", top:0, left:0, right:0, height:2,
            background:"linear-gradient(to right,transparent,#0097b2,#7ed957,transparent)"}}/>
          {[
            {n:counts.jobs,      suf:"",  label:"Live Job Listings",   col:"#0097b2"},
            {n:counts.companies, suf:"",  label:"Companies Tracked",   col:"#7ed957"},
            {n:counts.tools,     suf:"+", label:"AI Tools Catalogued", col:"#10B981"},
            {n:counts.users,     suf:"+", label:"Careers Accelerated", col:"#F59E0B"},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:"center", padding:"8px 0",
              borderRight: i<3?"1px solid rgba(0,151,178,.08)":"none"}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:40,
                color:s.col, letterSpacing:"-1.5px", lineHeight:1, marginBottom:6}}>
                {s.n.toLocaleString('en-IN')}{s.suf}
              </div>
              <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#4A5578", letterSpacing:".16em", textTransform:"uppercase"}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 — HOW IT WORKS (animated workflow) */}
      <HowItWorksSection/>

      {/* SECTION 3 — CAREER DOMAINS (floating nodes) */}
      <CareerDomainsSection/>

      {/* MORE TOOLS */}
      <div style={{padding:"0 40px 60px"}}>
        <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:36}}>
          <div style={{flex:1, height:1, background:"linear-gradient(to right,rgba(0,151,178,.3),transparent)"}}/>
          <span style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#4A5578", letterSpacing:".25em", textTransform:"uppercase"}}>More Tools</span>
          <div style={{flex:1, height:1, background:"linear-gradient(to left,rgba(0,151,178,.3),transparent)"}}/>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}>
          {[
            {id:"skillGap",   title:"Skill Gap\nAnalyser",   desc:"Know exactly what to learn next. Roadmap + resources.",      icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", col:"#0097b2"},
            {id:"networking", title:"Networking\nHub",        desc:"Discover Indian & global professionals. Connect and grow.",  icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", col:"#7ed957"},
            {id:"startups",   title:"Startup\nDiscovery",     desc:"Find the next unicorn. Equity, tech stack, hiring status.",  icon:"M13 10V3L4 14h7v7l9-11h-7z", col:"#F59E0B"},
          ].map((t,i)=>(
            <div key={t.id} onClick={()=>onGetStarted && onGetStarted(t.id)}
              style={{padding:"24px 22px", borderRadius:16, cursor:"pointer",
                background:"rgba(10,22,20,.5)", backdropFilter:"blur(12px)",
                border:"1px solid rgba(0,151,178,.09)",
                display:"flex", gap:16, alignItems:"flex-start",
                transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${t.col}30`;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.background="rgba(10,22,20,.85)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,151,178,.09)";e.currentTarget.style.transform="none";e.currentTarget.style.background="rgba(10,22,20,.5)";}}>
              <div style={{width:40, height:40, borderRadius:11, flexShrink:0,
                background:`${t.col}14`, border:`1px solid ${t.col}22`,
                display:"flex", alignItems:"center", justifyContent:"center"}}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
                  stroke={t.col} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.icon}/>
                </svg>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:15,
                  color:"#F0F4FF", letterSpacing:"-.2px", marginBottom:6, whiteSpace:"pre-line", lineHeight:1.15}}>
                  {t.title}
                </div>
                <p style={{fontSize:13, color:"rgba(240,244,255,.45)", lineHeight:1.6, margin:0}}>{t.desc}</p>
              </div>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={t.col} strokeWidth="2" strokeLinecap="round" style={{flexShrink:0, marginTop:2, opacity:.6}}><path d="M7 17L17 7M7 7h10v10"/></svg>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — AI TOOLS ECOSYSTEM */}
      <AIToolsSection/>

      {/* SECTION 5 — CAREER ROADMAP ANIMATION */}
      <CareerRoadmapSection/>

      {/* INDIA BANNER */}
      <div style={{padding:"0 40px 80px"}}>
        <div style={{padding:"44px 52px", borderRadius:24,
          background:"linear-gradient(135deg,rgba(0,151,178,.1) 0%,rgba(126,217,87,.06) 50%,rgba(0,109,130,.08) 100%)",
          border:"1px solid rgba(0,151,178,.18)", position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", top:0, left:0, right:0, height:2,
            background:"linear-gradient(to right,#0097b2,#7ed957,#006d82)"}}/>
          <div style={{position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(126,217,87,.08) 0%,transparent 70%)"}}/>
          <div style={{display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center"}}>
            <div>
              <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#0097b2",
                letterSpacing:".25em", textTransform:"uppercase", marginBottom:14}}>
                🇮🇳 &nbsp;India-First Intelligence
              </div>
              <h2 style={{fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:34,
                color:"#F0F4FF", letterSpacing:"-1px", marginBottom:14, lineHeight:1.1}}>
                Built for{" "}
                <span style={{background:"linear-gradient(to right,#0097b2,#7ed957)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"}}>Bangalore.</span>
              </h2>
              <p style={{fontSize:15, color:"#8896B3", lineHeight:1.75, maxWidth:500}}>
                Salary data in ₹ INR, Indian company profiles, IIT/IIM alumni networks — calibrated for India's tech ecosystem.
              </p>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:10, minWidth:220}}>
              {["Bangalore · Mumbai · Hyderabad","INR salary benchmarks","TCS · Razorpay · CRED · Zomato","IIT / IIM alumni network"].map((t,i)=>(
                <div key={i} style={{display:"flex", alignItems:"center", gap:10}}>
                  <div style={{width:8, height:8, borderRadius:"50%", flexShrink:0,
                    background:"linear-gradient(135deg,#0097b2,#7ed957)",
                    boxShadow:"0 0 10px rgba(0,151,178,.7)"}}/>
                  <span style={{fontSize:14, color:"#5dd3e8", fontWeight:500}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
