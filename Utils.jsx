  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #030A08;
    --surface:   #060F0C;
    --panel:     #081210;
    --card:      #0A1614;
    --hover:     #0F1E1B;
    --raised:    #122420;
    --border:    rgba(0,151,178,.1);
    --border2:   rgba(0,151,178,.18);
    --border3:   rgba(0,151,178,.3);
    --text:      #F0F4FF;
    --text2:     #8896B3;
    --text3:     #4A5578;
    --ink:       #02040A;
    --indigo:    #0097b2;
    --violet:    #006d82;
    --blue:      #00b4cc;
    --cyan:      #7ed957;
    --emerald:   #10B981;
    --amber:     #F59E0B;
    --rose:      #F43F5E;
    --coral:     #F43F5E;
    --lime:      #10B981;
    --purple:    #006d82;
    --green:     #10B981;
    --red:       #F43F5E;
    --pink:      #EC4899;
    --accent:    #0097b2;
    --muted:     #8896B3;
    --dim:       #4A5578;
    --slate:     #090D1A;
    --line:      rgba(0,151,178,.1);
    --cream:     #F0F4FF;
    --glow-indigo:  0 0 40px rgba(0,151,178,.28);
    --glow-violet:  0 0 40px rgba(0,109,130,.28);
    --glow-cyan:    0 0 40px rgba(126,217,87,.22);
    --glow-emerald: 0 0 40px rgba(16,185,129,.22);
    --glow-amber:   0 0 32px rgba(245,158,11,.2);
    --glow-rose:    0 0 32px rgba(244,63,94,.22);
    --cyan-glow:    0 0 28px rgba(126,217,87,.18);
    --violet-glow:  0 0 28px rgba(0,151,178,.2);
    --lime-glow:    0 0 28px rgba(16,185,129,.18);
    --amber-glow:   0 0 28px rgba(245,158,11,.18);
    --coral-glow:   0 0 28px rgba(244,63,94,.18);
    --font-body:    'Inter', sans-serif;
    --font-accent:  'Plus Jakarta Sans', sans-serif;
    --font-mono:    'JetBrains Mono', monospace;
    --syne:         'Plus Jakarta Sans', sans-serif;
    --mono:         'JetBrains Mono', monospace;
  }

  html, body, #root {
    height: 100%; overflow: hidden;
    background: var(--bg); color: var(--text);
    font-family: var(--font-body);
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track  { background: transparent; }
  ::-webkit-scrollbar-thumb  { background: rgba(0,151,178,.2); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(0,151,178,.4); }

  /* ── TYPOGRAPHY ── */
  .f-display { font-family: var(--font-accent); font-weight: 700; }
  .f-mono    { font-family: var(--font-mono); }
  .tag { font-size: 12px !important; }
  .btn { font-size: 13px !important; }
  .btn-sm { font-size: 12px !important; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes shimmer   { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(28px,-18px) scale(1.07)} 70%{transform:translate(-18px,22px) scale(.95)} }
  @keyframes glow-pulse { 0%,100%{opacity:.45} 50%{opacity:1} }
  @keyframes gradient-border { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .anim-up  { animation: fadeUp .48s cubic-bezier(.16,1,.3,1) both; }
  .anim-in  { animation: fadeIn .3s ease both; }

  /* ── APP SHELL ── */
  .app-shell {
    display: flex; height: 100vh; overflow: hidden;
    background: var(--bg); position: relative;
  }
  .app-shell::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 800px 600px at 10% 15%, rgba(0,151,178,.07) 0%, transparent 70%),
      radial-gradient(ellipse 600px 500px at 88% 80%, rgba(126,217,87,.05) 0%, transparent 70%),
      radial-gradient(ellipse 500px 700px at 55% 5%,  rgba(126,217,87,.04) 0%, transparent 70%);
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 228px; flex-shrink: 0;
    background: rgba(6,9,18,.88);
    backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
    border-right: 1px solid rgba(0,151,178,.1);
    display: flex; flex-direction: column; overflow: hidden;
    position: relative; z-index: 20;
  }
  .sidebar::after {
    content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom,transparent 0%,rgba(0,151,178,.55) 30%,rgba(126,217,87,.35) 60%,rgba(0,109,130,.45) 85%,transparent 100%);
    animation: glow-pulse 4.5s ease-in-out infinite;
    pointer-events: none;
  }
  .sidebar::before {
    content: ''; position: absolute; top: -80px; left: -50px;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,151,178,.1) 0%, transparent 70%);
    pointer-events: none;
    animation: orb-drift 14s ease-in-out infinite;
  }
  .sb-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid rgba(0,151,178,.08);
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; flex-shrink: 0;
  }
  .sb-logo-icon {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
    background: linear-gradient(135deg, #0097b2, #7ed957);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-accent); font-weight: 800; font-size: 18px; color: #fff;
    box-shadow: 0 0 0 1px rgba(0,151,178,.35), 0 8px 28px rgba(0,151,178,.45);
    position: relative; overflow: hidden;
  }
  .sb-logo-icon::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.28) 0%, transparent 55%);
  }
  .sb-logo-name { font-family: var(--font-accent); font-weight: 800; font-size: 16px; color: var(--text); letter-spacing: -.4px; line-height: 1.1; }
  .sb-logo-tag  { font-family: var(--font-mono); font-size: 9px; color: var(--text3); letter-spacing: .22em; text-transform: uppercase; margin-top: 2px; }
  .sb-section-hd { padding: 18px 18px 7px; font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: var(--text3); }
  .sb-nav-items { flex: 1; overflow-y: auto; padding-bottom: 8px; }
  .sb-nav-items::-webkit-scrollbar { display: none; }
  .nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 10px 14px 10px 18px; margin: 2px 10px;
    border-radius: 10px; cursor: pointer;
    font-family: var(--font-body); font-size: 14px; font-weight: 500; color: var(--text2);
    background: transparent; border: 1px solid transparent;
    text-align: left; width: calc(100% - 20px);
    transition: all .2s cubic-bezier(.16,1,.3,1);
    position: relative; white-space: nowrap; overflow: hidden;
  }
  .nav-item:hover { background: rgba(0,151,178,.06); border-color: rgba(0,151,178,.12); color: var(--text); transform: translateX(2px); }
  .nav-item.active {
    background: rgba(0,151,178,.1); border-color: rgba(0,151,178,.22);
    color: #5dd3e8; font-weight: 600;
    box-shadow: 0 0 24px rgba(0,151,178,.12), inset 0 1px 0 rgba(126,217,87,.04);
  }
  .nav-item.active::before {
    content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
    width: 3px; height: 18px; border-radius: 0 3px 3px 0;
    background: linear-gradient(to bottom, #0097b2, #006d82);
    box-shadow: 0 0 12px rgba(0,151,178,.7);
  }
  .nav-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; opacity: .7; }
  .nav-badge { margin-left: auto; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: var(--font-mono); background: rgba(0,151,178,.15); color: #5dd3e8; border: 1px solid rgba(0,151,178,.25); }
  .sb-footer { padding: 14px 18px; border-top: 1px solid rgba(0,151,178,.08); flex-shrink: 0; }
  .sb-time { font-family: var(--font-mono); font-size: 11px; color: var(--text3); padding: 8px 12px; background: rgba(0,151,178,.04); border: 1px solid rgba(0,151,178,.08); border-radius: 8px; text-align: center; letter-spacing: .06em; }
  .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; position: relative; z-index: 1; }
  .topbar {
    height: 56px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px;
    background: rgba(6,9,18,.72);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,151,178,.08);
    position: relative; z-index: 10;
  }
  .topbar::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(0,151,178,.45) 30%, rgba(126,217,87,.35) 70%, transparent 100%);
    background-size: 200% auto;
    animation: shimmer 8s linear infinite;
    pointer-events: none;
  }
  .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; }
  .topbar-brand  { font-family: var(--font-accent); font-weight: 600; font-size: 14px; color: var(--text3); }
  .topbar-sep    { color: var(--text3); font-size: 14px; opacity: .4; }
  .topbar-title  { font-family: var(--font-accent); font-weight: 700; font-size: 15px; color: var(--text); }
  .topbar-sub    { font-family: var(--font-mono); font-size: 10px; color: var(--text3); letter-spacing: .14em; text-transform: uppercase; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }

  /* ── CARDS — glass + animated borders ── */
  .card {
    background: rgba(12,17,32,.72);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(0,151,178,.1);
    border-radius: 14px; cursor: pointer; position: relative; overflow: hidden;
    transition: border-color .28s, transform .28s, box-shadow .28s;
  }
  .card::before {
    content: ''; position: absolute; inset: 0; border-radius: 14px; opacity: 0;
    background: linear-gradient(135deg, rgba(0,151,178,.06), rgba(126,217,87,.03));
    transition: opacity .28s; pointer-events: none;
  }
  .card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,.07), transparent);
    pointer-events: none;
  }
  .card:hover { border-color: rgba(0,151,178,.3); transform: translateY(-3px); box-shadow: 0 20px 56px rgba(0,0,0,.6), 0 0 0 1px rgba(0,151,178,.12), var(--glow-indigo); }
  .card:hover::before { opacity: 1; }
  .card-coral:hover   { border-color: rgba(244,63,94,.3);    box-shadow: 0 20px 56px rgba(0,0,0,.6), var(--glow-rose); }
  .card-violet:hover  { border-color: rgba(0,109,130,.3);   box-shadow: 0 20px 56px rgba(0,0,0,.6), var(--glow-violet); }
  .card-amber:hover   { border-color: rgba(245,158,11,.3);   box-shadow: 0 20px 56px rgba(0,0,0,.6), var(--glow-amber); }
  .card-lime:hover    { border-color: rgba(16,185,129,.3);   box-shadow: 0 20px 56px rgba(0,0,0,.6), var(--glow-emerald); }
  .card-cyan:hover    { border-color: rgba(126,217,87,.3);   box-shadow: 0 20px 56px rgba(0,0,0,.6), var(--glow-cyan); }
  .co-card { border-radius: 14px; padding: 20px; border: 1px solid rgba(0,151,178,.1); background: rgba(12,17,32,.72); backdrop-filter: blur(18px); transition: all .25s ease; cursor: pointer; position: relative; overflow: hidden; }
  .co-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transition: transform .35s ease; transform-origin: left; }
  .co-card:hover { border-color: rgba(0,151,178,.25); transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,0,0,.55); }
  .co-card:hover::before { transform: scaleX(1); }
  .co-card.cyan::before   { background: linear-gradient(90deg, #0097b2, #7ed957); }
  .co-card.violet::before { background: linear-gradient(90deg, #006d82, #EC4899); }
  .co-card.coral::before  { background: linear-gradient(90deg, #F43F5E, #F59E0B); }
  .co-card.amber::before  { background: linear-gradient(90deg, #F59E0B, #10B981); }
  .co-card.lime::before   { background: linear-gradient(90deg, #10B981, #7ed957); }
  .glass        { background: rgba(255,255,255,.03); backdrop-filter: blur(20px); border: 1px solid rgba(0,151,178,.1); border-radius: 14px; }
  .glass-cyan   { background: rgba(126,217,87,.04);  border: 1px solid rgba(126,217,87,.16);  border-radius: 14px; }
  .glass-lime   { background: rgba(16,185,129,.04);  border: 1px solid rgba(16,185,129,.16);  border-radius: 14px; }
  .glass-violet { background: rgba(0,109,130,.04);  border: 1px solid rgba(0,109,130,.16);  border-radius: 14px; }
  .glass-amber  { background: rgba(245,158,11,.04);  border: 1px solid rgba(245,158,11,.16);  border-radius: 14px; }
  .glass-coral  { background: rgba(244,63,94,.04);   border: 1px solid rgba(244,63,94,.16);   border-radius: 14px; }

  .tag {
    display:inline-block; padding:2px 9px; border-radius:20px;
    font-size:10px; font-weight:600; letter-spacing:.04em;
    font-family:var(--font-mono); text-transform:uppercase;
  }
  .sl {
    font-family:var(--font-mono); font-size:9px;
    letter-spacing:.2em; text-transform:uppercase; color:var(--text3);
    margin-bottom:6px; display:block;
  }

  /* ── PROGRESS ── */
  .track { height:4px; background:rgba(255,255,255,.07); border-radius:2px; overflow:hidden; }
  .fill  { height:100%; border-radius:2px; transition:width 1.2s ease; }

  /* ── BUTTONS ── */
  .btn {
    padding: 9px 18px; border-radius: 9px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all .2s ease; border: none;
    font-family: var(--font-body); display: inline-flex; align-items: center; gap: 7px;
    letter-spacing: -.01em;
  }
  .btn-cyan   { background: linear-gradient(135deg, #0097b2, #7ed957); color: #fff; box-shadow: 0 4px 16px rgba(0,151,178,.35); }
  .btn-cyan:hover   { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(0,151,178,.5); filter: brightness(1.1); }
  .btn-coral  { background: linear-gradient(135deg, #F43F5E, #EC4899); color: #fff; }
  .btn-coral:hover  { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(244,63,94,.45); }
  .btn-lime   { background: linear-gradient(135deg, #10B981, #7ed957); color: #02040A; font-weight: 700; }
  .btn-lime:hover   { transform: translateY(-1px); box-shadow: var(--glow-emerald); }
  .btn-amber  { background: linear-gradient(135deg, #F59E0B, #F43F5E); color: #fff; }
  .btn-amber:hover  { transform: translateY(-1px); box-shadow: var(--glow-amber); }
  .btn-violet { background: linear-gradient(135deg, #006d82, #EC4899); color: #fff; }
  .btn-violet:hover { transform: translateY(-1px); box-shadow: var(--glow-violet); }
  .btn-ghost  { background: rgba(0,151,178,.06); color: var(--text2); border: 1px solid rgba(0,151,178,.14); }
  .btn-ghost:hover  { background: rgba(0,151,178,.12); color: var(--text); border-color: rgba(0,151,178,.28); }
  .btn-sm { padding: 6px 13px; font-size: 12px; border-radius: 7px; }

  /* ── INPUTS ── */
  .inp {
    background: rgba(0,151,178,.04); border: 1px solid rgba(0,151,178,.12);
    border-radius: 9px; padding: 10px 14px; color: var(--text);
    font-size: 14px; outline: none; width: 100%;
    font-family: var(--font-body); transition: all .2s ease;
  }
  .inp:focus { border-color: rgba(0,151,178,.45); background: rgba(0,151,178,.06); box-shadow: 0 0 0 3px rgba(0,151,178,.1); }
  .inp::placeholder { color: var(--text3); }
  select.inp option  { background: var(--panel); color: var(--text); }
  textarea.inp { resize: vertical; }

  .search-wrap { position: relative; flex: 1; min-width: 0; }
  .search-wrap svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .sinp {
    background: rgba(0,151,178,.04); border: 1px solid rgba(0,151,178,.12);
    border-radius: 9px; padding: 10px 14px 10px 40px; color: var(--text);
    font-size: 14px; outline: none; width: 100%; font-family: var(--font-body);
    transition: all .2s ease;
  }
  .sinp:focus { border-color: rgba(0,151,178,.4); background: rgba(0,151,178,.05); box-shadow: 0 0 0 3px rgba(0,151,178,.08); }
  .sinp::placeholder { color: var(--text3); }

  /* ── FORM GRID ── */
  .fg  { display:grid; gap:12px; }
  .fg2 { grid-template-columns:1fr 1fr; }
  .fspan { grid-column:1/-1; }

  /* ── STAT BOX ── */
  .stat-box {
    background: rgba(0,151,178,.04); border: 1px solid rgba(0,151,178,.1);
    border-radius: 12px; padding: 16px 18px;
    display: flex; flex-direction: column; gap: 4px;
    backdrop-filter: blur(12px);
  }

  /* ── TOGGLE ── */
  .tog { width:38px; height:20px; border-radius:10px; position:relative; cursor:pointer; border:none; flex-shrink:0; transition:background .2s; }
  .tog::after { content:''; position:absolute; top:3px; left:3px; width:14px; height:14px; border-radius:50%; background:#fff; transition:transform .2s; }
  .tog.on  { background: linear-gradient(135deg, #0097b2, #7ed957); } .tog.on::after  { transform:translateX(18px); }
  .tog.off { background:rgba(255,255,255,.12); }

  /* ── MODAL ── */
  .modal-bg {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(2,4,10,.82); backdrop-filter: blur(22px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn .22s ease;
  }
  .modal {
    background: rgba(9,13,26,.96); border: 1px solid rgba(0,151,178,.16);
    border-radius: 18px; width: min(740px,95vw); max-height: 92vh;
    box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(0,151,178,.06), inset 0 1px 0 rgba(255,255,255,.04);
    animation: fadeUp .3s cubic-bezier(.16,1,.3,1);
    overflow-y: auto; padding:28px;
    box-shadow:0 40px 100px rgba(0,0,0,.8),0 0 0 1px rgba(0,151,178,.1);
    animation:scaleIn .22s cubic-bezier(.16,1,.3,1);
  }
  .modal::-webkit-scrollbar { width:3px; }
  .modal::-webkit-scrollbar-thumb { background:var(--border2); }

  /* ── DETAIL OVERLAY ── */
  .detail { position:absolute; inset:0; z-index:50; background:var(--surface); overflow-y:auto; animation:fadeIn .22s ease; }
  .detail::-webkit-scrollbar { width:4px; }
  .detail::-webkit-scrollbar-thumb { background:var(--border2); }

  /* ── AI PASTE BOX ── */
  .ai-paste-box {
    background:linear-gradient(135deg,rgba(0,151,178,.07),rgba(0,151,178,.07));
    border:1px solid rgba(0,151,178,.22); border-radius:12px;
    padding:18px 20px; margin-bottom:20px; position:relative; overflow:hidden;
  }
  .ai-paste-box::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,151,178,.6),rgba(0,151,178,.5),transparent);
  }
  .ai-paste-title { font-family:var(--font-body); font-size:14px; font-weight:700; color:var(--text); }
  .ai-paste-sub   { font-size:12px; color:var(--text2); margin-top:2px; line-height:1.5; }
  .ai-spin { width:14px; height:14px; border:2px solid rgba(0,151,178,.25); border-top-color:var(--indigo); border-radius:50%; animation:spin .7s linear infinite; display:inline-block; vertical-align:middle; }

  /* ── BADGE ── */
  .badge-owner {
    background:linear-gradient(135deg,rgba(0,151,178,.15),rgba(0,151,178,.15));
    border:1px solid rgba(0,151,178,.3); border-radius:6px;
    padding:3px 10px; font-family:var(--font-mono); font-size:9px;
    color:var(--indigo); letter-spacing:.15em; text-transform:uppercase;
  }

  /* ── EMPTY ── */
  .empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--text2); text-align:center; padding:60px 40px; flex:1; }

  /* ── HOME PAGE ── */
  .home-wrap { position:absolute; inset:0; overflow-y:auto; overflow-x:hidden; scroll-behavior:smooth; }
  .home-wrap::-webkit-scrollbar { width:4px; }
  .home-wrap::-webkit-scrollbar-thumb { background:rgba(0,151,178,.3); }

  .hn { position:sticky; top:0; z-index:80; height:62px;
    display:flex; align-items:center; justify-content:space-between;
    padding:0 44px; background:rgba(6,7,9,.85); backdrop-filter:blur(20px);
    border-bottom:1px solid transparent; transition:all .3s;
  }
  .hn.scrolled { border-bottom-color:var(--border); box-shadow:0 4px 32px rgba(0,0,0,.6); }
  .hn-logo { display:flex; align-items:center; gap:10px; cursor:pointer; }
  .hn-links { display:flex; align-items:center; gap:4px; }
  .hn-link { padding:7px 14px; border-radius:7px; font-size:13px; font-weight:500; color:var(--text2); background:transparent; border:none; cursor:pointer; font-family:var(--font-body); transition:all .18s; }
  .hn-link:hover { color:var(--text); background:rgba(255,255,255,.05); }
  .hn-cta { padding:9px 22px; border-radius:9px; font-size:13px; font-weight:700;
    background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; border:none;
    cursor:pointer; font-family:var(--font-body); transition:all .22s; letter-spacing:-.01em;
  }
  .hn-cta:hover { transform:translateY(-1px); box-shadow:0 0 32px rgba(0,151,178,.5); filter:brightness(1.1); }

  /* ── HERO ── */
  .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:80px 24px 60px; }
  .hero-bg { position:absolute; inset:0; pointer-events:none; }
  .hero-grid {
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,151,178,.06) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,151,178,.06) 1px,transparent 1px);
    background-size:52px 52px;
    mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,black 20%,transparent 100%);
  }
  .hero-orb { position:absolute; border-radius:50%; filter:blur(100px); animation:orbDrift 8s ease-in-out infinite; }
  .hero-badge {
    display:inline-flex; align-items:center; gap:8px; padding:5px 16px;
    border-radius:30px; background:rgba(0,151,178,.1); border:1px solid rgba(0,151,178,.25);
    font-family:var(--font-mono); font-size:10px; color:var(--indigo);
    letter-spacing:.15em; margin-bottom:28px; animation:fadeUp .6s ease;
  }
  .hero-pulse { width:7px; height:7px; border-radius:50%; background:var(--indigo); animation:glowPulse 2s ease-in-out infinite; }
  .hero-title {
    font-family:var(--font-accent); font-weight:800;
    font-size:clamp(44px,7.5vw,92px); line-height:1.02; letter-spacing:-3px;
    text-align:center; max-width:920px; margin-bottom:22px; color:var(--text);
    animation:fadeUp .7s .1s ease both;
  }
  .hero-title .grad {
    background:linear-gradient(135deg,var(--indigo) 0%,var(--violet) 40%,var(--cyan) 80%);
    background-size:200%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:gradShift 5s ease infinite;
  }
  .hero-sub { font-size:clamp(15px,1.8vw,18px); color:var(--text2); line-height:1.8; max-width:540px; text-align:center; margin-bottom:40px; animation:fadeUp .7s .2s ease both; font-weight:400; }
  .hero-btns { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; animation:fadeUp .7s .3s ease both; }
  .h-btn-primary { padding:13px 30px; border-radius:10px; font-size:14px; font-weight:700; background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; border:none; cursor:pointer; font-family:var(--font-body); transition:all .22s; letter-spacing:-.01em; }
  .h-btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(0,151,178,.5); filter:brightness(1.1); }
  .h-btn-ghost { padding:13px 30px; border-radius:10px; font-size:14px; font-weight:600; background:rgba(255,255,255,.05); color:var(--text); border:1px solid var(--border2); cursor:pointer; font-family:var(--font-body); transition:all .22s; }
  .h-btn-ghost:hover { background:rgba(255,255,255,.09); border-color:var(--border3); transform:translateY(-2px); }

  .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; animation:fadeIn 1s 1.2s ease both; opacity:0; }
  .scroll-line { width:1px; height:46px; background:linear-gradient(to bottom,var(--indigo),transparent); animation:float 2s ease-in-out infinite; }

  /* ── MARQUEE ── */
  .marquee-track { overflow:hidden; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--surface); padding:11px 0; }
  .marquee-inner { display:flex; width:max-content; animation:marqueeScroll 28s linear infinite; }
  @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-item { display:flex; align-items:center; gap:10px; padding:0 28px; font-family:var(--font-mono); font-size:9px; color:var(--text3); white-space:nowrap; letter-spacing:.12em; text-transform:uppercase; }
  .marquee-dot  { width:3px; height:3px; border-radius:50%; background:var(--indigo); flex-shrink:0; }

  /* ── STATS BAR ── */
  .stats-bar { display:grid; grid-template-columns:repeat(4,1fr); background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .stat-cell { padding:30px 24px; text-align:center; border-right:1px solid var(--border); transition:background .2s; position:relative; overflow:hidden; }
  .stat-cell:hover { background:rgba(0,151,178,.04); }
  .stat-num { font-family:var(--font-accent); font-weight:800; font-size:clamp(34px,4vw,50px); letter-spacing:-2px; line-height:1; }

  /* ── FEATURE CARDS ── */
  .feat-section { padding:100px 24px; max-width:1140px; margin:0 auto; }
  .feat-label { font-family:var(--font-mono); font-size:10px; letter-spacing:.28em; text-transform:uppercase; margin-bottom:14px; display:block; }
  .feat-h { font-family:var(--font-accent); font-weight:800; font-size:clamp(30px,4vw,54px); line-height:1.08; letter-spacing:-2px; margin-bottom:18px; }
  .feat-p { font-size:15px; color:var(--text2); line-height:1.8; max-width:480px; }
  .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:16px; overflow:hidden; margin-top:60px; }
  .feat-card { padding:28px; background:var(--panel); transition:background .25s; position:relative; overflow:hidden; cursor:default; }
  .feat-card:hover { background:var(--card); }
  .feat-card.c1:hover { box-shadow:inset 0 0 0 1px rgba(0,151,178,.3); }
  .feat-card.c2:hover { box-shadow:inset 0 0 0 1px rgba(0,151,178,.3); }
  .feat-card.c3:hover { box-shadow:inset 0 0 0 1px rgba(244,63,94,.3); }
  .feat-card.c4:hover { box-shadow:inset 0 0 0 1px rgba(245,158,11,.3); }
  .feat-card.c5:hover { box-shadow:inset 0 0 0 1px rgba(16,185,129,.3); }
  .feat-card.c6:hover { box-shadow:inset 0 0 0 1px rgba(6,182,212,.3); }
  .feat-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
  .feat-card-title { font-family:var(--font-body); font-size:15px; font-weight:700; margin-bottom:8px; color:var(--text); letter-spacing:-.2px; }
  .feat-card-desc  { font-size:13px; color:var(--text2); line-height:1.7; }

  /* ── CTA SECTION ── */
  .cta-section { padding:100px 24px; text-align:center; position:relative; overflow:hidden; }
  .cta-glow { position:absolute; inset:0; background:radial-gradient(ellipse at center,rgba(0,151,178,.08) 0%,transparent 70%); pointer-events:none; }
  .cta-section h2 { font-family:var(--font-accent); font-weight:800; font-size:clamp(34px,5vw,62px); letter-spacing:-2.5px; line-height:1.05; margin-bottom:20px; }
  .cta-section p { font-size:16px; color:var(--text2); max-width:420px; margin:0 auto 36px; line-height:1.75; }

  /* ── FLOAT CARDS ── */
  .float-a,.float-b,.float-c { animation:float 3.5s ease-in-out infinite; }
  .float-b { animation-delay:1.2s; }
  .float-c { animation-delay:2.4s; }

  /* ── STARTUP CAROUSEL ── */
  .su-wrap  { height:100%; display:flex; flex-direction:column; gap:14px; }
  .su-stage { position:relative; flex:1; display:flex; align-items:center; justify-content:center; min-height:0; }
  .su-card  { position:absolute; width:min(380px,90%); border-radius:20px; overflow:hidden; cursor:grab; transition:transform .4s cubic-bezier(.34,1.56,.64,1); user-select:none; will-change:transform; }
  .su-card:active { cursor:grabbing; }
  @keyframes suExitL  { to{transform:translateX(-130%) rotate(-15deg);opacity:0} }
  @keyframes suExitR  { to{transform:translateX(130%) rotate(15deg);opacity:0} }
  @keyframes suEnter  { from{transform:translateX(100%) rotate(10deg);opacity:0} to{transform:none;opacity:1} }
  @keyframes suEnterL { from{transform:translateX(-100%) rotate(-10deg);opacity:0} to{transform:none;opacity:1} }
  .su-exit-l  { animation:suExitL  .36s cubic-bezier(.4,0,1,1) forwards; }
  .su-exit-r  { animation:suExitR  .36s cubic-bezier(.4,0,1,1) forwards; }
  .su-enter   { animation:suEnter  .45s cubic-bezier(.16,1,.3,1) both; }
  .su-enter-l { animation:suEnterL .45s cubic-bezier(.16,1,.3,1) both; }
  .su-bg      { position:absolute; inset:0; }
  .su-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(6,7,9,.95) 0%,rgba(6,7,9,.4) 55%,transparent 100%); }
  .su-shine   { position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.07) 0%,transparent 50%); pointer-events:none; }
  .su-top     { position:relative; z-index:3; display:flex; justify-content:space-between; align-items:flex-start; padding:20px 20px 0; }
  .su-body    { position:relative; z-index:3; padding:0 20px 22px; }
  .su-counter { font-family:var(--font-mono); font-size:9px; color:rgba(255,255,255,.5); background:rgba(255,255,255,.1); padding:3px 9px; border-radius:20px; }
  .su-controls{ display:flex; align-items:center; justify-content:center; gap:14px; }
  .su-nav { width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,.07); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--text2); transition:all .18s; }
  .su-nav:hover { background:rgba(0,151,178,.15); border-color:rgba(0,151,178,.4); color:var(--indigo); }
  .su-dots  { display:flex; gap:5px; }
  .su-dot   { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.2); transition:all .2s; }
  .su-dot.on{ background:var(--indigo); width:16px; border-radius:3px; }

  /* ── CERT ROADMAP ── */
  .rm-wrap     { height:100%; display:flex; flex-direction:column; gap:12px; overflow:hidden; }
  .rm-progress { display:flex; gap:8px; align-items:center; padding:12px 16px; background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:10px; }
  .rm-nodes-container { position:relative; overflow-x:auto; overflow-y:visible; flex:1; }
  .rm-nodes    { display:flex; align-items:center; gap:0; position:relative; min-width:max-content; padding:40px 40px 20px; }
  .rm-connector { height:2px; width:50px; flex-shrink:0; position:relative; }
  .rm-connector-fill { height:100%; transition:width .5s ease; }
  .rm-arrow { position:absolute; top:50%; right:-4px; transform:translateY(-50%) rotate(45deg); width:8px; height:8px; border-right:2px solid; border-top:2px solid; }
  .rm-node-wrap { display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; }
  .rm-node { width:58px; height:58px; border-radius:14px; display:flex; align-items:center; justify-content:center; border:2px solid var(--border); background:var(--card); transition:all .22s ease; position:relative; font-size:20px; }
  .rm-node:hover,.rm-node.active { transform:scale(1.1); }
  .rm-node.locked { opacity:.35; filter:grayscale(.6); }
  .rm-demand-arc { position:absolute; inset:-4px; border-radius:18px; }
  .rm-label { font-family:var(--font-mono); font-size:9px; text-align:center; color:var(--text3); max-width:70px; line-height:1.4; letter-spacing:.05em; }
  .rm-label.lit { color:var(--text2); }
  .rm-popup { position:absolute; bottom:calc(100% + 12px); left:50%; transform:translateX(-50%); background:var(--panel); border:1px solid var(--border2); border-radius:12px; padding:12px 14px; width:200px; z-index:20; pointer-events:none; animation:fadeUp .2s ease; box-shadow:0 16px 40px rgba(0,0,0,.7); }
  .rm-info-card { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px 14px; width:180px; font-size:11px; color:var(--text2); line-height:1.5; }
  @keyframes badgeSpin  { 0%,100%{filter:drop-shadow(0 0 10px rgba(245,158,11,.6))} 50%{filter:drop-shadow(0 0 22px rgba(245,158,11,1))} }
  @keyframes badgeFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
  .rm-badge { cursor:pointer; animation:badgeSpin 2.8s ease-in-out infinite,badgeFloat 3.5s ease-in-out infinite; }
  .rm-badge:hover { animation:none; transform:scale(1.12) rotate(5deg); transition:transform .25s; }

  /* ── STAR GATE ── */
  .star-btn { position:fixed; bottom:14px; right:14px; z-index:200; width:20px; height:20px; background:transparent; border:none; cursor:pointer; opacity:.1; transition:opacity .3s; padding:0; }
  .star-btn:hover { opacity:.35; }
  .pw-overlay { position:fixed; inset:0; z-index:500; background:rgba(0,0,0,.88); backdrop-filter:blur(14px); display:flex; align-items:center; justify-content:center; animation:fadeIn .2s ease; }
  .pw-card { width:340px; background:var(--panel); border:1px solid var(--border2); border-radius:16px; padding:32px; box-shadow:0 40px 100px rgba(0,0,0,.9); animation:scaleIn .22s cubic-bezier(.16,1,.3,1); }

  /* ── ADMIN PORTAL ── */
  .admin-wrap { display:flex; height:100vh; overflow:hidden; background:var(--bg); }
  .admin-sidebar { width:240px; flex-shrink:0; background:var(--surface); border-right:1px solid var(--border); display:flex; flex-direction:column; overflow:hidden; }
  .admin-sidebar-head { padding:20px 18px 16px; border-bottom:1px solid var(--border); }
  .admin-nav-item { display:flex; align-items:center; gap:9px; padding:9px 14px 9px 18px; margin:1px 8px; border-radius:8px; cursor:pointer; font-family:var(--font-body); font-size:13px; font-weight:500; color:var(--text2); border:none; background:transparent; width:calc(100% - 16px); text-align:left; transition:all .14s; }
  .admin-nav-item:hover { background:var(--hover); color:var(--text); }
  .admin-nav-item.active { background:rgba(0,151,178,.1); color:var(--indigo); }
  .admin-main { flex:1; overflow-y:auto; background:var(--bg); }
  .admin-main::-webkit-scrollbar { width:3px; }
  .admin-main::-webkit-scrollbar-thumb { background:var(--border2); }
  .admin-section { padding:28px 32px; max-width:960px; }
  .admin-row { padding:14px 16px; background:var(--card); border:1px solid var(--border); border-radius:10px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }

  /* ── SECTION TABS ── */
  .sec-tab { padding:7px 14px; border-radius:7px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid var(--border2); background:transparent; color:var(--text2); transition:all .15s; font-family:var(--font-body); }
  .sec-tab:hover { border-color:var(--border3); color:var(--text); background:rgba(255,255,255,.05); }
  .sec-tab.act-company      { background:rgba(0,151,178,.15); color:var(--indigo);  border-color:rgba(0,151,178,.35); }
  .sec-tab.act-startup      { background:rgba(245,158,11,.12); color:var(--amber);   border-color:rgba(245,158,11,.3); }
  .sec-tab.act-aiTool       { background:rgba(6,182,212,.1);   color:var(--cyan);    border-color:rgba(6,182,212,.3); }
  .sec-tab.act-certification{ background:rgba(0,151,178,.12); color:var(--violet);  border-color:rgba(0,151,178,.3); }
  .sec-tab.act-resumeModel  { background:rgba(244,63,94,.1);   color:var(--rose);    border-color:rgba(244,63,94,.3); }
  .sec-tab.act-careerPath   { background:rgba(16,185,129,.1);  color:var(--emerald); border-color:rgba(16,185,129,.3); }

  /* ── TOP NAV (hidden — sidebar handles nav) ── */
  .tnav-bar,.tnav-ink,.tnav-btn,.tnav-lbl,.tnav-icon,.tnav-active { display:none!important; }

  /* ── SCROLLBAR ── */
  .scrollbar::-webkit-scrollbar { width:4px; }
  .scrollbar::-webkit-scrollbar-thumb { background:rgba(255,255,255,.08); border-radius:4px; }

  /* ── REVEAL ANIMATION ── */
  .reveal { opacity:0; transform:translateY(16px); transition:opacity .6s ease,transform .6s ease; }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-delay-1 { transition-delay:.1s; }
  .reveal-delay-2 { transition-delay:.2s; }
  .reveal-delay-3 { transition-delay:.3s; }

  input[type="range"] { accent-color:var(--indigo); }

  @keyframes pulse {
    0%,100% { opacity:1; }
    50%      { opacity:.4; }
  }

  @media(max-width:768px){ .feat-grid{grid-template-columns:1fr;} .stats-bar{grid-template-columns:repeat(2,1fr);} .hero-title{font-size:40px;} .sidebar{display:none;} }
`

/* ── helpers ── */
const Ico = ({ d, s = 16, c = "currentColor", sw = 1.7 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const SL = ({ ch, col }) => <span className="sl" style={col ? { color: col } : {}}>{ch}</span>;
const Tag = ({ ch, col = "#7ed957" }) => <span className="tag" style={{ background: col + "18", color: col, border: `1px solid ${col}30` }}>{ch}</span>;
const StatBox = ({ label, value, color = "#7ed957" }) => (
  <div className="stat-box">
    <div className="f-mono" style={{ fontSize: 8, color: "var(--muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</div>
    <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color, letterSpacing: -0.5 }}>{value || "—"}</div>
  </div>
);
const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="search-wrap">
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input className="sinp" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || "Search..."} />
  </div>
);

/* HOME PAGE — parallax, scroll reveals, sticky nav */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* HOW IT WORKS — animated step-by-step workflow with canvas */
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

function HeroVideoCanvas({ counts, visible }) {
  const [slide,    setSlide]    = useState(0);
  const [phase,    setPhase]    = useState("idle");
  const [nextSlide,setNextSlide]= useState(null);
  const [dotHov,   setDotHov]   = useState(null);
  const timerRef = useRef(null);

  const IMGS = [
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
  ];

  const LABELS = [
    { label:"Team Collaboration",  sub:"Work with the best teams",    accent:"#0097b2" },
    { label:"Modern Workspace",    sub:"Where great work happens",     accent:"#7ed957" },
    { label:"Tech Office",         sub:"Your next workplace awaits",   accent:"#10B981" },
    { label:"Meeting Room",        sub:"Ideas become reality here",    accent:"#F59E0B" },
  ];

  const triggerFlip = (next) => {
    if (phase !== "idle") return;
    setNextSlide(next); setPhase("out");
    setTimeout(() => { setSlide(next); setPhase("in"); }, 370);
    setTimeout(() => { setNextSlide(null); setPhase("idle"); }, 740);
  };

  const goTo = (n) => {
    if (phase !== "idle" || n === slide) return;
    triggerFlip(n);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => triggerFlip((slide + 1) % 4), 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide(prev => { const n=(prev+1)%4; triggerFlip(n); return prev; });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const cur = LABELS[slide];

  return (
    <div style={{ position:"relative", width:"100%", height:"100%", minHeight:380,
      overflow:"hidden", perspective:"1400px", perspectiveOrigin:"50% 50%" }}>

      {/* ── ALL 4 IMAGE SLIDES ── */}
      {IMGS.map((img, si) => {
        const isActive  = si === slide;
        const isIncoming= si === nextSlide;
        let transform = "rotateY(0deg)";
        let transition = "none";
        let zIndex = 1;
        let opacity = 0;

        if (isActive) {
          zIndex = 2; opacity = 1;
          if (phase === "out") {
            transform  = "rotateY(-90deg)";
            transition = "transform .37s cubic-bezier(.55,0,.45,1)";
          }
        }
        if (isIncoming) {
          zIndex = 3; opacity = 1;
          if (phase === "out") {
            transform  = "rotateY(90deg)";
            transition = "none";
          }
          if (phase === "in") {
            transform  = "rotateY(0deg)";
            transition = "transform .37s cubic-bezier(.55,0,.45,1)";
          }
        }

        return (
          <div key={si} style={{
            position:"absolute", inset:0, zIndex,
            opacity, transformStyle:"preserve-3d",
            transform, transition,
            backfaceVisibility:"hidden",
          }}>
            <img src={img} alt={LABELS[si].label}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            {/* Dark cinematic overlay */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none",
              background:"linear-gradient(180deg,rgba(2,8,12,.35) 0%,rgba(2,8,12,.15) 40%,rgba(2,8,12,.7) 100%)" }}/>
            {/* Colour tint */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none",
              background:`linear-gradient(135deg,${LABELS[si].accent}22 0%,transparent 60%)` }}/>
          </div>
        );
      })}

      {/* ── DOT NAVIGATION ── */}
      <div style={{ position:"absolute", bottom:20, left:"50%",
        transform:"translateX(-50%)", zIndex:10, display:"flex", gap:8, alignItems:"center" }}>
        {LABELS.map((s,i) => (
          <button key={i} onClick={()=>goTo(i)}
            onMouseEnter={()=>setDotHov(i)} onMouseLeave={()=>setDotHov(null)}
            style={{
              width: slide===i ? 28 : dotHov===i ? 10 : 7, height:7,
              borderRadius:4, border:"none", cursor:"pointer", padding:0,
              background: slide===i ? s.accent : dotHov===i ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.3)",
              boxShadow: slide===i ? `0 0 14px ${s.accent}aa` : "none",
              transition:"all .3s cubic-bezier(.16,1,.3,1)",
            }}/>
        ))}
      </div>

      {/* ── ARROWS ── */}
      {[-1,1].map(dir => (
        <button key={dir} onClick={()=>goTo((slide+dir+4)%4)}
          style={{
            position:"absolute", top:"50%",
            [dir===-1?"left":"right"]:12,
            transform:"translateY(-50%)", zIndex:10,
            width:36, height:36, borderRadius:"50%",
            border:"1px solid rgba(255,255,255,.2)", cursor:"pointer",
            background:"rgba(0,0,0,.35)", backdropFilter:"blur(12px)",
            display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.22)";e.currentTarget.style.transform="translateY(-50%) scale(1.1)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,.35)";e.currentTarget.style.transform="translateY(-50%) scale(1)";}}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d={dir===-1?"M15 18l-6-6 6-6":"M9 18l6-6-6-6"}/>
          </svg>
        </button>
      ))}

      {/* ── BRAND LINE ── */}
      <div style={{ position:"absolute", bottom:22, left:16, zIndex:10 }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:8,
          color:"rgba(255,255,255,.3)", letterSpacing:".22em" }}>
          AI · POWERED · CAREERS
        </span>
      </div>
      <div style={{ position:"absolute", bottom:22, right:16, zIndex:10, display:"flex", gap:5 }}>
        {["#0097b2","#7ed957","#10B981"].map((c,i)=>(
          <div key={i} style={{ width:5,height:5,borderRadius:"50%",background:c,
            boxShadow:`0 0 7px ${c}`, animation:`pulse ${1.4+i*.3}s ease-in-out infinite` }}/>
        ))}
      </div>

    </div>
  );
}

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

function StarAdminGate({ onUnlock }) {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef(null);

  // triple-click detection
  const handleStar = () => {
    const next = clicks + 1;
    setClicks(next);
    clearTimeout(timerRef.current);
    if (next >= 3) { setShow(true); setClicks(0); }
    else { timerRef.current = setTimeout(() => setClicks(0), 1200); }
  };

  const tryAuth = () => {
    if (pw === OWNER_PW) { setShow(false); setPw(""); setErr(""); onUnlock(); }
    else { setErr("Access denied."); }
  };

  return (
    <>
      {/* Invisible-ish star bottom-right */}
      <button className="star-btn" onClick={handleStar} title="">
        <svg viewBox="0 0 24 24" fill="rgba(0,212,255,0.6)" stroke="none" width="22" height="22">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {show && (
        <div className="pw-overlay" onClick={e => e.target === e.currentTarget && (setShow(false), setPw(""), setErr(""))}>
          <div className="pw-card">
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Ico d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" s={18} c="var(--cyan)" />
              </div>
              <div className="f-display" style={{ fontSize: 18, color: "var(--cream)", marginBottom: 4 }}>Admin Access</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input className="inp" type="password" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && tryAuth()} autoFocus />
              {err && <div className="f-mono" style={{ fontSize: 9, color: "var(--coral)" }}>{err}</div>}
              <button className="btn btn-cyan" style={{ width: "100%", justifyContent: "center" }} onClick={tryAuth}>Enter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* AI SMART FETCH — just enter a name, AI fills all */
const AI_PROMPTS = {
  company:`You are a company intelligence expert. Given ONLY the company name, research and return a complete profile.
IMPORTANT: For websiteUrl, return the REAL official website domain (e.g. "https://google.com", "https://razorpay.com"). This is used to auto-fetch the company logo.
Return ONLY valid JSON, no markdown, no explanation:
{"name":"","industry":"","headquarters":"","founded":"","headcount":"","stage":"","description":"2-3 sentence overview","coreStrength":"What they excel at","hiringTechnologies":["tech1","tech2","tech3","tech4","tech5"],"futureDirection":"Strategic direction 2 sentences","organizationStrength":"Team culture and structure","notableProducts":["p1","p2","p3"],"careerBenefits":["benefit1","benefit2","benefit3"],"linkedinUrl":"https://linkedin.com/company/name","websiteUrl":"https://website.com","jobsUrl":"https://website.com/careers","glassdoor":"4.1","matchScore":82,"tags":["tag1","tag2","tag3"],"size":"1000-5000 employees","founded":"2010","openRoles":5}`,

  startup:`You are a startup intelligence expert. Given ONLY the startup name, return a complete profile from your knowledge.
Return ONLY valid JSON, no markdown:
{"name":"","stage":"Seed","industry":"","founded":"","headcount":"","equity":"typical equity range","description":"2-3 sentence overview","whyJoin":"Why engineers love working here","technologies":"tech1, tech2, tech3, tech4","linkedinUrl":"https://linkedin.com/company/name","websiteUrl":"https://website.com","jobsUrl":"https://website.com/careers","tags":["tag1","tag2","tag3"]}`,

  aiTool:`You are an AI tools expert. Given ONLY the tool name, return a complete profile from your knowledge.
Return ONLY valid JSON, no markdown:
{"name":"","category":"CODE","pricing":"Free or Paid or Freemium","description":"What this tool does — 2-3 sentences","useCases":"usecase1, usecase2, usecase3, usecase4","link":"https://tool-website.com","tags":["tag1","tag2","tag3"]}`,

  certification:`You are a certifications expert. Given ONLY the certification name, return a complete profile.
Return ONLY valid JSON, no markdown:
{"name":"","provider":"issuing organization","level":"Beginner or Intermediate or Advanced or Expert or Professional","status":"Available","duration":"e.g. 3-6 months","demand":78,"description":"What this cert covers and who it's for","link":"https://enroll-url.com","tags":["tag1","tag2","tag3"]}`,

  resumeModel:`You are a career coach expert. Given ONLY the resume template name or style, return a complete profile.
Return ONLY valid JSON, no markdown:
{"name":"","type":"Engineering or Product or Design or ML/AI or Management or Startup or Sales or Research or Other","format":"Chronological or Functional or Hybrid or One-page or Two-page or Portfolio","atsScore":"estimated ATS score like 88%","description":"Who this template is best for and what makes it effective","tips":"3-4 practical tips for using this template well","link":"","tags":["tag1","tag2","tag3"]}`,

  careerPath:`You are a career growth expert. Given ONLY a career transition or role name, return a complete career path.
Return ONLY valid JSON, no markdown:
{"name":"full path title","currentRole":"starting role","targetRole":"destination role","timeline":"realistic timeline e.g. 12-18 months","salaryJump":"e.g. +35%","difficulty":"Beginner or Intermediate or Advanced or Expert","skills":"skill1, skill2, skill3, skill4, skill5","milestones":"Step 1: action\nStep 2: action\nStep 3: action\nStep 4: action\nStep 5: action","description":"Overview of this career path and what it takes","tags":["tag1","tag2","tag3"]}`,
};

const AI_LABELS = {
  company:      { label: "Company Name",      placeholder: "e.g. Google, Stripe, Anthropic",      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" },
  startup:      { label: "Startup Name",      placeholder: "e.g. Notion, Linear, Vercel",         icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  aiTool:       { label: "AI Tool Name",      placeholder: "e.g. GitHub Copilot, Cursor, Midjourney", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  certification:{ label: "Certification Name",placeholder: "e.g. AWS Solutions Architect, GCP Professional", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  resumeModel:  { label: "Template Name / Style", placeholder: "e.g. Harvard One-Page, Google Resume, ATS Clean", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  careerPath:   { label: "Career Transition",  placeholder: "e.g. Senior Engineer to Staff Engineer, PM to Director", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
};

function AISmartFetch({ sectionType, onData }) {
  const [bulkText, setBulkText] = useState("");
  const [name, setName]         = useState("");
  const [mode, setMode]         = useState("name");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [err, setErr]           = useState("");
  const [fetchedData, setFetchedData] = useState(null);  // holds last AI result
  const [logoPreview, setLogoPreview] = useState("");
  const [logoStatus, setLogoStatus]   = useState("idle"); // idle|loading|ok|err
  const [logoTab, setLogoTab]         = useState("auto");
  const fileInputRef = useRef(null);
  const meta = AI_LABELS[sectionType] || AI_LABELS.company;
  const isCompany = sectionType === "company";

  const KNOWN_DOMAINS = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
    "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
    "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
    "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
    "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
    "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
    "billdesk":"billdesk.com","phonepe":"phonepe.com","zerodha":"zerodha.com",
    "pine labs":"pinelabs.com","cimpress":"cimpress.com","insight":"insight.com",
    "hdfc":"hdfcbank.com","icici":"icicibank.com","bajaj":"bajajfinserv.in",
    "naukri":"naukri.com","infedge":"infoedge.in",
  };

  const autoFetchLogo = (companyName, websiteUrl) => {
    const key = (companyName||"").toLowerCase().replace(/[^a-z ]/g,"");
    const known = Object.entries(KNOWN_DOMAINS).find(([k])=>key.includes(k))?.[1];
    const wDomain = (websiteUrl||"").replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0];
    const fallback = (companyName||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
    const domain = known || wDomain || fallback;
    const url = `https://logo.clearbit.com/${domain}`;
    setLogoPreview(url); setLogoStatus("loading");
    return url;
  };

  const handleFileUpload = e => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setLogoPreview(ev.target.result); setLogoStatus("ok"); };
    reader.readAsDataURL(file);
  };

  const BULK_PROMPTS = {
    company:`You are a data extraction expert. The user has pasted raw text about a company (could be from LinkedIn, Glassdoor, website, notes, or mixed format). Extract and map ALL available information to this exact JSON structure. Fill every field as best as you can from the text. For missing info, use reasonable defaults or leave as empty string.
Return ONLY valid JSON:
{"name":"","industry":"","headquarters":"","founded":"","headcount":"","stage":"Public","description":"","coreStrength":"","hiringTechnologies":["tech1"],"futureDirection":"","organizationStrength":"","notableProducts":["p1"],"careerBenefits":["benefit1"],"linkedinUrl":"","websiteUrl":"","jobsUrl":"","glassdoor":"","matchScore":80,"tags":["tag1"]}`,
    startup:`Extract startup info from the pasted text and return ONLY valid JSON:
{"name":"","stage":"Seed","industry":"","founded":"","headcount":"","equity":"","description":"","whyJoin":"","technologies":"tech1, tech2","linkedinUrl":"","websiteUrl":"","jobsUrl":"","tags":["tag1"]}`,
    aiTool:`Extract AI tool info from the pasted text and return ONLY valid JSON:
{"name":"","category":"CODE","pricing":"Freemium","description":"","useCases":"case1, case2, case3","link":"","tags":["tag1"]}`,
    certification:`Extract certification info from the pasted text and return ONLY valid JSON:
{"name":"","provider":"","level":"Intermediate","status":"Available","duration":"","demand":75,"description":"","link":"","tags":["tag1"]}`,
    resumeModel:`Extract resume template info from the pasted text and return ONLY valid JSON:
{"name":"","type":"Engine","atsScore":90,"description":"","tags":["tag1"]}`,
  };

  const doFetch = async () => {
    const input = mode === "bulk" ? bulkText.trim() : name.trim();
    if (!input) return;
    setLoading(true); setDone(false); setErr(""); setFetchedData(null);
    setLogoPreview(""); setLogoStatus("idle");
    try {
      const prompt = mode === "bulk"
        ? `${BULK_PROMPTS[sectionType] || BULK_PROMPTS.company}\n\nRAW TEXT TO EXTRACT FROM:\n"""\n${input}\n"""`
        : `${AI_PROMPTS[sectionType]}\n\nName: "${input}"`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1500,
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!res.ok) { setErr(`API error ${res.status}`); setLoading(false); return; }
      const data = await res.json();
      const raw = (data.content?.[0]?.text || "").trim();
      const first = raw.indexOf("{"), last = raw.lastIndexOf("}");
      if (first === -1 || last === -1) throw new Error("No JSON");
      const json = JSON.parse(raw.slice(first, last + 1));

      // Auto-fetch logo for companies
      if (isCompany) {
        const logoUrl = autoFetchLogo(json.name || input, json.websiteUrl || "");
        json.logoUrl = logoUrl;
        setFetchedData(json);
      }

      onData(json); setDone(true);
      if (mode === "bulk") setBulkText(""); else setName("");
    } catch(e) {
      setErr("Could not parse — try again or paste more complete info.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-paste-box">
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,
            background:"linear-gradient(135deg,#0097b2,#7ed957)",
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <Ico d="M13 10V3L4 14h7v7l9-11h-7z" s={16} c="#fff" sw={2}/>
          </div>
          <div>
            <div className="ai-paste-title">AI Quick Add</div>
            <div className="ai-paste-sub">
              {mode==="bulk" ? "Paste any raw text — AI maps it to all fields" : "Type a name — AI fetches the full profile"}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4, background:"#E5E7EB", padding:3, borderRadius:8 }}>
          {[["name","By Name"],["bulk","Paste Text"]].map(([m,label])=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");setDone(false);setFetchedData(null);}}
              style={{ padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,fontFamily:"Space Grotesk,sans-serif",
                background:mode===m?"#FFFFFF":"transparent",
                color:mode===m?"#111827":"#6B7280",
                boxShadow:mode===m?"0 1px 4px rgba(0,0,0,.1)":"none",
                transition:"all .15s" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      {mode==="name" ? (
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ position:"relative", flex:1 }}>
            <div style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={meta.icon}/></svg>
            </div>
            <input className="inp" style={{ paddingLeft:34 }} placeholder={meta.placeholder}
              value={name} onChange={e=>setName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&doFetch()}/>
          </div>
          <button className="btn btn-cyan" onClick={doFetch} disabled={loading||!name.trim()}
            style={{ flexShrink:0, opacity:loading||!name.trim()?0.5:1 }}>
            {loading ? <><span className="ai-spin"/> Fetching…</> : "Fetch All →"}
          </button>
        </div>
      ) : (
        <div>
          <textarea className="inp" rows={5} style={{ marginBottom:8,fontSize:12,lineHeight:1.6 }}
            placeholder={`Paste any raw text about this ${sectionType==="aiTool"?"AI tool":sectionType} — from LinkedIn, website, Glassdoor, notes, job posts, Wikipedia, or anything.\n\nAI will automatically identify and fill all the right fields.`}
            value={bulkText} onChange={e=>setBulkText(e.target.value)}/>
          <button className="btn btn-cyan" onClick={doFetch} disabled={loading||!bulkText.trim()}
            style={{ opacity:loading||!bulkText.trim()?0.5:1 }}>
            {loading ? <><span className="ai-spin"/> Extracting & Mapping…</> : "Extract & Fill All Fields →"}
          </button>
        </div>
      )}

      {/* ── COMPANY LOGO PANEL — shown after fetch OR always for company ── */}
      {isCompany && (done || fetchedData) && (
        <div style={{
          marginTop:14, padding:"14px 16px", borderRadius:14,
          background:"rgba(0,151,178,.07)", border:"1px solid rgba(0,151,178,.2)",
        }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>

            {/* Live logo preview */}
            <div style={{
              width:72, height:72, borderRadius:16, flexShrink:0,
              background: logoStatus==="ok" ? "rgba(255,255,255,.97)"
                : `hsl(${[...(fetchedData?.name||name||"?")].reduce((a,c)=>a+c.charCodeAt(0),0)%360},60%,42%)`,
              border:"2px solid rgba(0,151,178,.35)",
              display:"flex", alignItems:"center", justifyContent:"center",
              overflow:"hidden", position:"relative",
              boxShadow:"0 6px 20px rgba(0,0,0,.45)",
            }}>
              {logoPreview ? (
                <img src={logoPreview} alt="logo"
                  style={{ width:"82%", height:"82%", objectFit:"contain",
                    opacity: logoStatus==="ok" ? 1 : 0, transition:"opacity .3s" }}
                  onLoad={()=>setLogoStatus("ok")}
                  onError={()=>setLogoStatus("err")}/>
              ) : null}
              {(logoStatus==="idle"||logoStatus==="err"||!logoPreview) && (
                <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
                  fontSize:22, color:"rgba(255,255,255,.92)", position:"absolute" }}>
                  {(fetchedData?.name||name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase()}
                </div>
              )}
              {logoStatus==="loading" && (
                <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.4)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:18,height:18, border:"2px solid #0097b2",
                    borderTopColor:"transparent", borderRadius:"50%",
                    animation:"spin .7s linear infinite" }}/>
                </div>
              )}
              {logoStatus==="ok" && (
                <div style={{ position:"absolute",bottom:2,right:2, width:14,height:14,
                  borderRadius:"50%", background:"#10B981",
                  display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
            </div>

            {/* Logo controls */}
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2",
                  letterSpacing:".2em", textTransform:"uppercase" }}>
                  Company Logo
                </div>
                {/* Tab switcher */}
                <div style={{ display:"flex", gap:4 }}>
                  {[["auto","Auto"],["url","URL"],["upload","Upload"]].map(([id,label])=>(
                    <button key={id} onClick={()=>setLogoTab(id)}
                      style={{ padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:700,
                        cursor:"pointer", border:"1px solid", fontFamily:"var(--font-mono)",
                        background: logoTab===id ? "rgba(0,151,178,.2)" : "rgba(255,255,255,.04)",
                        borderColor: logoTab===id ? "rgba(0,151,178,.6)" : "rgba(255,255,255,.1)",
                        color: logoTab===id ? "#0097b2" : "#6B7280",
                        transition:"all .15s" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AUTO tab */}
              {logoTab==="auto" && (
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <input className="inp" style={{ flex:1, fontSize:12, padding:"7px 10px" }}
                    placeholder="Domain e.g. google.com"
                    defaultValue={(fetchedData?.websiteUrl||"").replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0]}
                    onBlur={e=>{
                      const d = e.target.value.trim();
                      if(d){ const u=`https://logo.clearbit.com/${d}`; setLogoPreview(u); setLogoStatus("loading"); }
                    }}/>
                  <button onClick={()=>autoFetchLogo(fetchedData?.name||name, fetchedData?.websiteUrl||"")}
                    style={{ padding:"7px 13px", borderRadius:9, border:"none",
                      background:"linear-gradient(135deg,#0097b2,#7ed957)",
                      color:"#fff", fontWeight:700, fontSize:11, cursor:"pointer", whiteSpace:"nowrap" }}>
                    Re-fetch
                  </button>
                </div>
              )}

              {/* URL tab */}
              {logoTab==="url" && (
                <input className="inp" style={{ width:"100%", fontSize:12, padding:"7px 10px" }}
                  placeholder="https://example.com/logo.png"
                  onBlur={e=>{ if(e.target.value){ setLogoPreview(e.target.value); setLogoStatus("loading"); }}}/>
              )}

              {/* UPLOAD tab */}
              {logoTab==="upload" && (
                <div>
                  <input ref={fileInputRef} type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    style={{ display:"none" }} onChange={handleFileUpload}/>
                  <button onClick={()=>fileInputRef.current?.click()}
                    style={{ padding:"7px 16px", borderRadius:9, cursor:"pointer",
                      background:"rgba(126,217,87,.1)", border:"1px dashed rgba(126,217,87,.4)",
                      color:"#7ed957", fontWeight:700, fontSize:11,
                      display:"flex", alignItems:"center", gap:6 }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    Choose File
                  </button>
                </div>
              )}

              {/* Status messages */}
              {logoStatus==="ok"  && <div style={{fontSize:11,color:"#10B981",marginTop:5}}>✓ Logo loaded — will be saved with the company</div>}
              {logoStatus==="err" && <div style={{fontSize:11,color:"#F59E0B",marginTop:5}}>⚠ Logo not found — paste a URL or upload a file</div>}
            </div>
          </div>
        </div>
      )}

      {done && <div style={{ marginTop:10,padding:"8px 12px",
        background:"rgba(22,163,74,.08)",border:"1px solid rgba(22,163,74,.2)",
        borderRadius:6,fontSize:12,color:"#15803D",fontWeight:600 }}>
        ✓ All fields filled — review and save below
      </div>}
      {err && <div style={{ marginTop:10,padding:"8px 12px",
        background:"rgba(220,38,38,.06)",border:"1px solid rgba(220,38,38,.2)",
        borderRadius:6,fontSize:12,color:"#DC2626" }}>⚠ {err}</div>}
    </div>
  );
}

/* COMPANY DETAIL VIEW */

const STAGE_COL   = { "Public":"#0097b2","Private":"#0097b2","Startup":"#F43F5E","Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981" };
const STAGE_CLASS = { "Public":"cyan","Private":"violet","Startup":"coral","Series A":"cyan","Series B":"violet","Series C+":"cyan","Growth":"lime" };

/* ── premium gradient palettes for company avatars ── */
const CO_GRAD = [
  "linear-gradient(135deg,#0097b2,#7ed957)",
  "linear-gradient(135deg,#F43F5E,#EC4899)",
  "linear-gradient(135deg,#7ed957,#0097b2)",
  "linear-gradient(135deg,#10B981,#7ed957)",
  "linear-gradient(135deg,#F59E0B,#F43F5E)",
  "linear-gradient(135deg,#006d82,#EC4899)",
];
const coGrad = name => CO_GRAD[(name?.charCodeAt(0)||0) % CO_GRAD.length];

/* COMPANY DETAIL — premium dark */
function CompanyDetail({ c, onBack, isOwner, onDelete, onEdit }) {
  const grad  = coGrad(c.name);
  const stCol = STAGE_COL[c.stage] || "#0097b2";
  const mcCol = (c.matchScore>=85)?"#10B981":(c.matchScore>=70)?"#0097b2":"#F59E0B";

  return (
    <div style={{height:"100%",overflowY:"auto",paddingBottom:32}} className="scrollbar">
      {/* back bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button className="btn btn-ghost" onClick={onBack} style={{gap:6,fontSize:13}}>
          <Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/> Back to Companies
        </button>
        {isOwner&&<div style={{display:"flex",gap:8}}>
          <button className="btn btn-ghost" style={{fontSize:13}} onClick={onEdit}>Edit</button>
          <button style={{padding:"7px 16px",borderRadius:9,background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.25)",fontSize:13,cursor:"pointer",fontFamily:"var(--font-body)"}} onClick={()=>{onDelete(c.id);onBack();}}>Delete</button>
        </div>}
      </div>

      {/* ── HERO ── */}
      <div style={{borderRadius:16,overflow:"hidden",marginBottom:20,border:"1px solid var(--border)"}}>
        <div style={{height:5,background:grad}}/>
        <div style={{padding:"24px 28px",background:"var(--card)"}}>
          <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
            {/* Avatar */}
            <div style={{width:72,height:72,borderRadius:18,background:grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:32,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 8px 28px ${stCol}45`}}>
              {(c.name||"?")[0].toUpperCase()}
            </div>
            {/* Name + meta */}
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"#EDF0F7",letterSpacing:"-0.5px",marginBottom:5}}>{c.name}</div>
              <div style={{fontSize:14,color:"#A0A8BB",marginBottom:10}}>
                {[c.industry, c.headquarters, c.founded&&`Est. ${c.founded}`].filter(Boolean).join("  ·  ")}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {c.stage&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:`${stCol}20`,color:stCol,border:`1px solid ${stCol}40`}}>{c.stage}</span>}
                {c.matchScore&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:`${mcCol}15`,color:mcCol,border:`1px solid ${mcCol}30`}}>Match {c.matchScore}%</span>}
                {c.openRoles>0&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>🔥 {c.openRoles} open roles</span>}
              </div>
            </div>
            {/* Links */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
              {c.linkedinUrl&&<a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:"rgba(10,102,194,.15)",border:"1px solid rgba(10,102,194,.3)",color:"#5B9BD5",textDecoration:"none",fontSize:14,fontWeight:700}}>LinkedIn</a>}
              {c.websiteUrl&&<a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:"rgba(255,255,255,.07)",border:"1px solid var(--border2)",color:"#EDF0F7",textDecoration:"none",fontSize:14,fontWeight:700}}>Website</a>}
              {c.jobsUrl&&<a href={c.jobsUrl} target="_blank" rel="noopener noreferrer" style={{padding:"9px 18px",borderRadius:10,background:`${stCol}18`,border:`1px solid ${stCol}35`,color:stCol,textDecoration:"none",fontSize:14,fontWeight:700}}>View Jobs ↗</a>}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12,marginBottom:20}}>
        {[
          {l:"Stage",        v:c.stage,               col:stCol},
          {l:"Founded",      v:c.founded?`Est. ${c.founded}`:null, col:"#0097b2"},
          {l:"Size",         v:c.size,                col:"#7ed957"},
          {l:"HQ",           v:c.headquarters,        col:"#F59E0B"},
          {l:"Open Roles",   v:c.openRoles>0?`${c.openRoles} roles`:null, col:"#10B981"},
          {l:"Match Score",  v:c.matchScore?`${c.matchScore}%`:null,       col:mcCol},
        ].filter(s=>s.v).map((s,i)=>(
          <div key={i} style={{padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`3px solid ${s.col}`}}>
            <div style={{fontSize:11,color:"var(--text3)",letterSpacing:".12em",marginBottom:5,fontFamily:"var(--font-mono)",textTransform:"uppercase"}}>{s.l}</div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.col}}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* ── 2-COL BODY ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
        {/* LEFT */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {c.description&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderLeft:`3px solid ${stCol}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:stCol,letterSpacing:".15em",marginBottom:10}}>ABOUT</div>
              <p style={{fontSize:14,lineHeight:1.8,color:"#C4C9D6"}}>{c.description}</p>
            </div>
          )}
          {c.whyJoin&&(
            <div style={{padding:22,background:"rgba(16,185,129,.04)",border:"1px solid rgba(16,185,129,.18)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".15em",marginBottom:10}}>WHY WORK HERE</div>
              <p style={{fontSize:14,lineHeight:1.8,color:"#C4C9D6"}}>{c.whyJoin}</p>
            </div>
          )}
          {c.hiringTechnologies?.length>0&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#7ed957",letterSpacing:".15em",marginBottom:12}}>TECH STACK</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {c.hiringTechnologies.map((t,i)=>(
                  <span key={i} style={{padding:"6px 14px",borderRadius:8,fontSize:13,background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)"}}>{t}</span>
                ))}
              </div>
            </div>
          )}
          {c.matchScore&&(
            <div style={{padding:22,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:mcCol,letterSpacing:".15em",marginBottom:12}}>MATCH SCORE</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:14,color:"#C4C9D6"}}>Profile compatibility</span>
                <span style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:mcCol}}>{c.matchScore}%</span>
              </div>
              <div style={{height:8,background:"rgba(255,255,255,.07)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${c.matchScore}%`,borderRadius:4,background:mcCol,transition:"width 1.2s ease"}}/>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* Glassdoor */}
          {(c.glassdoorRating||c.cultureScore||c.workLifeBalance)&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".15em",marginBottom:12}}>RATINGS</div>
              {[
                {l:"Overall",    v:c.glassdoorRating, max:5},
                {l:"Culture",    v:c.cultureScore,    max:5},
                {l:"Work-Life",  v:c.workLifeBalance, max:5},
              ].filter(r=>r.v).map((r,i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:13,color:"#A0A8BB"}}>{r.l}</span>
                    <span style={{fontSize:14,fontWeight:700,color:"#10B981"}}>{r.v}/{r.max}</span>
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,.07)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(r.v/r.max)*100}%`,background:"linear-gradient(90deg,#10B981,#7ed957)",borderRadius:3}}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Tags */}
          {c.tags?.length>0&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",letterSpacing:".15em",marginBottom:10}}>TAGS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {c.tags.map((t,i)=><span key={i} style={{padding:"5px 12px",borderRadius:20,fontSize:13,background:"rgba(255,255,255,.05)",color:"#8B93A6",border:"1px solid var(--border2)"}}>{t}</span>)}
              </div>
            </div>
          )}
          {/* Perks */}
          {c.perks?.length>0&&(
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#006d82",letterSpacing:".15em",marginBottom:10}}>PERKS</div>
              {c.perks.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
                  <span style={{color:"#006d82",fontSize:12,marginTop:1}}>✦</span>
                  <span style={{fontSize:13,color:"#C4C9D6",lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyModal({ existing, onSave, onClose }) {
  const blank = {
    name:"", industry:"", headquarters:"", founded:"", headcount:"",
    stage:"Private", description:"", coreStrength:"", hiringTechnologies:"",
    futureDirection:"", organizationStrength:"", notableProducts:"",
    careerBenefits:"", linkedinUrl:"", websiteUrl:"", jobsUrl:"",
    glassdoor:"", matchScore:80, tags:"", logoUrl:"",
  };
  const toF = c => ({
    ...c,
    hiringTechnologies:(c.hiringTechnologies||[]).join(", "),
    notableProducts:(c.notableProducts||[]).join(", "),
    careerBenefits:(c.careerBenefits||[]).join(", "),
    tags:(c.tags||[]).join(", "),
    logoUrl: c.logoUrl||"",
  });
  const [form, setForm]           = useState(existing ? toF(existing) : blank);
  const [logoPreview, setLogoPreview] = useState(existing?.logoUrl||"");
  const [logoFetching, setLogoFetching] = useState(false);
  const [logoStatus, setLogoStatus]    = useState("idle"); // idle|ok|err
  const [logoTab, setLogoTab]          = useState("auto"); // auto|url|upload
  const fileInputRef = useRef(null);

  const F = k => e => setForm(p => ({ ...p, [k]: e.target?.value ?? e }));
  const arr = s => s ? s.split(",").map(x=>x.trim()).filter(Boolean) : [];

  const handleAI = d => {
    setForm(p => ({
      ...p, ...d,
      hiringTechnologies:(d.hiringTechnologies||[]).join(", "),
      notableProducts:(d.notableProducts||[]).join(", "),
      careerBenefits:(d.careerBenefits||[]).join(", "),
      tags:Array.isArray(d.tags)?d.tags.join(", "):(p.tags||""),
      logoUrl: d.logoUrl || p.logoUrl || "",
    }));
    // Auto-fetch logo when AI fills the name
    if (d.name) autoFetchLogo(d.name, d.websiteUrl||"");
  };

  // ── AUTO LOGO FETCH using Clearbit ──────────────────────────────
  const KNOWN_DOMAINS = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
    "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
    "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
    "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
    "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
    "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
    "cimpress":"cimpress.com","insight":"insight.com",
    "billdesk":"billdesk.com","phonepe":"phonepe.com","zerodha":"zerodha.com",
    "cimpress":"cimpress.com","pine labs":"pinelabs.com",
  };

  const autoFetchLogo = (name, website) => {
    const key = (name||"").toLowerCase().replace(/[^a-z ]/g,"");
    const knownDomain = Object.entries(KNOWN_DOMAINS).find(([k])=>key.includes(k))?.[1];
    const websiteDomain = website.replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0];
    const fallback = (name||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
    const domain = knownDomain || websiteDomain || fallback;
    const url = `https://logo.clearbit.com/${domain}`;
    setLogoFetching(true); setLogoStatus("idle");
    setLogoPreview(url);
    setForm(p=>({...p, logoUrl:url}));
    // status will be set by img onLoad/onError
    setTimeout(()=>setLogoFetching(false), 2000);
  };

  // Handle manual URL entry
  const handleLogoUrlInput = url => {
    setForm(p=>({...p, logoUrl:url}));
    setLogoPreview(url);
    setLogoStatus("idle");
  };

  // Handle file upload → base64
  const handleFileUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target.result;
      setLogoPreview(b64);
      setForm(p=>({...p, logoUrl:b64}));
      setLogoStatus("ok");
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form, id:existing?.id||Date.now(),
      hiringTechnologies:arr(form.hiringTechnologies),
      notableProducts:arr(form.notableProducts),
      careerBenefits:arr(form.careerBenefits),
      tags:arr(form.tags),
      matchScore:Number(form.matchScore)||80,
      logoUrl: form.logoUrl||"",
    });
    onClose();
  };

  const grad = form.name
    ? `hsl(${[...form.name].reduce((a,c)=>a+c.charCodeAt(0),0)%360},65%,45%)`
    : "#0097b2";

  return (
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:680, maxHeight:"90vh", overflowY:"auto"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,
            fontSize:20,color:"var(--text)"}}>
            {existing?"Edit Company":"Add Company"}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* AI Quick Add */}
        <AISmartFetch sectionType="company" onData={handleAI}/>
        <div style={{height:1,background:"var(--border)",margin:"18px 0"}}/>

        {/* ── LOGO SECTION ─────────────────────────────────── */}
        <div style={{
          padding:"18px", borderRadius:16, marginBottom:18,
          background:"rgba(0,151,178,.06)",
          border:"1px solid rgba(0,151,178,.18)",
        }}>
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:10, color:"#0097b2",
            letterSpacing:".22em", textTransform:"uppercase", marginBottom:14,
          }}>
            🖼 Company Logo
          </div>

          <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>

            {/* Live logo preview */}
            <div style={{
              width:88, height:88, borderRadius:18, flexShrink:0,
              background: logoStatus==="ok" ? "rgba(255,255,255,.97)" : grad,
              border:"2px solid rgba(0,151,178,.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
              overflow:"hidden", position:"relative",
              boxShadow:"0 8px 24px rgba(0,0,0,.4)",
            }}>
              {logoPreview && (
                <img src={logoPreview} alt="logo"
                  style={{width:"80%",height:"80%",objectFit:"contain"}}
                  onLoad={()=>setLogoStatus("ok")}
                  onError={()=>setLogoStatus("err")}/>
              )}
              {(!logoPreview || logoStatus==="err") && (
                <div style={{
                  fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,
                  fontSize:28,color:"rgba(255,255,255,.9)",
                }}>
                  {(form.name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase()||"?"}
                </div>
              )}
              {logoFetching && (
                <div style={{
                  position:"absolute",inset:0,background:"rgba(0,0,0,.5)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <div style={{width:20,height:20,border:"2px solid #0097b2",
                    borderTopColor:"transparent",borderRadius:"50%",
                    animation:"spin 0.8s linear infinite"}}/>
                </div>
              )}
              {logoStatus==="ok" && (
                <div style={{
                  position:"absolute",bottom:3,right:3,
                  width:16,height:16,borderRadius:"50%",
                  background:"#10B981",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
              )}
              {logoStatus==="err" && (
                <div style={{
                  position:"absolute",bottom:3,right:3,
                  width:16,height:16,borderRadius:"50%",
                  background:"#F43F5E",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:10,color:"white",fontWeight:700,
                }}>!</div>
              )}
            </div>

            {/* Logo source tabs + inputs */}
            <div style={{flex:1}}>
              {/* Tab switcher */}
              <div style={{display:"flex",gap:6,marginBottom:12}}>
                {[
                  {id:"auto",   label:"Auto Fetch"},
                  {id:"url",    label:"Paste URL"},
                  {id:"upload", label:"Upload File"},
                ].map(tab=>(
                  <button key={tab.id} onClick={()=>setLogoTab(tab.id)}
                    style={{
                      padding:"5px 13px", borderRadius:20, fontSize:11,
                      fontWeight:700, cursor:"pointer", border:"1px solid",
                      fontFamily:"var(--font-mono)", letterSpacing:".05em",
                      background: logoTab===tab.id ? "rgba(0,151,178,.2)" : "rgba(255,255,255,.04)",
                      borderColor: logoTab===tab.id ? "rgba(0,151,178,.6)" : "rgba(255,255,255,.1)",
                      color: logoTab===tab.id ? "#0097b2" : "#6B7280",
                      transition:"all .15s",
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* AUTO FETCH tab */}
              {logoTab==="auto" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8,lineHeight:1.6}}>
                    Enter company name or website — logo fetched automatically from Clearbit.
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <input className="inp" style={{flex:1}}
                      placeholder="Company name or domain (e.g. google.com)"
                      value={form.name}
                      onChange={e=>{F("name")(e); }}
                      onBlur={e=>{ if(e.target.value) autoFetchLogo(e.target.value, form.websiteUrl||""); }}
                    />
                    <button
                      onClick={()=>autoFetchLogo(form.name, form.websiteUrl||"")}
                      disabled={!form.name.trim()||logoFetching}
                      style={{
                        padding:"8px 16px", borderRadius:10, border:"none",
                        background:"linear-gradient(135deg,#0097b2,#7ed957)",
                        color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer",
                        opacity:!form.name.trim()||logoFetching?0.5:1,
                        whiteSpace:"nowrap",
                      }}>
                      {logoFetching ? "Fetching…" : "Fetch Logo"}
                    </button>
                  </div>
                  {logoStatus==="ok" && <div style={{fontSize:11,color:"#10B981",marginTop:6}}>✓ Logo loaded successfully</div>}
                  {logoStatus==="err" && <div style={{fontSize:11,color:"#F59E0B",marginTop:6}}>⚠ Logo not found — you can paste a URL or upload manually</div>}
                </div>
              )}

              {/* PASTE URL tab */}
              {logoTab==="url" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8}}>
                    Paste a direct image URL (PNG, JPG, SVG, WebP)
                  </div>
                  <input className="inp" style={{width:"100%"}}
                    placeholder="https://example.com/logo.png"
                    value={form.logoUrl.startsWith("data:") ? "" : form.logoUrl}
                    onChange={e=>handleLogoUrlInput(e.target.value)}
                  />
                  {form.logoUrl && !form.logoUrl.startsWith("data:") && (
                    <div style={{fontSize:11,color:"#6B7280",marginTop:6,wordBreak:"break-all",opacity:.7}}>
                      {form.logoUrl}
                    </div>
                  )}
                </div>
              )}

              {/* UPLOAD FILE tab */}
              {logoTab==="upload" && (
                <div>
                  <div style={{fontSize:12,color:"#6B7280",marginBottom:8}}>
                    Upload PNG, JPG, SVG or WebP logo file
                  </div>
                  <input ref={fileInputRef} type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    style={{display:"none"}}
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={()=>fileInputRef.current?.click()}
                    style={{
                      padding:"10px 20px", borderRadius:10, cursor:"pointer",
                      background:"rgba(126,217,87,.12)", border:"1px dashed rgba(126,217,87,.4)",
                      color:"#7ed957", fontWeight:700, fontSize:12,
                      display:"flex", alignItems:"center", gap:8, width:"100%",
                      justifyContent:"center",
                    }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    Choose Logo File
                  </button>
                  {form.logoUrl.startsWith("data:") && (
                    <div style={{fontSize:11,color:"#10B981",marginTop:6}}>✓ File uploaded and ready</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── FIELDS ─────────────────────────────────────────── */}
        <SL ch="FIELDS — auto-filled above, edit as needed" col="var(--indigo)"/>
        <div className="fg fg2" style={{marginTop:12}}>
          <input className="inp" placeholder="Company name *" value={form.name} onChange={F("name")}/>
          <input className="inp" placeholder="Industry" value={form.industry} onChange={F("industry")}/>
          <input className="inp" placeholder="Headquarters" value={form.headquarters} onChange={F("headquarters")}/>
          <input className="inp" placeholder="Founded year" value={form.founded} onChange={F("founded")}/>
          <input className="inp" placeholder="Headcount (e.g. 10,000+)" value={form.headcount} onChange={F("headcount")}/>
          <select className="inp" value={form.stage} onChange={F("stage")}>
            {["Public","Private","Startup","Series A","Series B","Series C+","Growth"].map(o=><option key={o}>{o}</option>)}
          </select>
          <textarea className="inp fspan" placeholder="Description" rows={2} value={form.description} onChange={F("description")}/>
          <textarea className="inp fspan" placeholder="Core Strength" rows={2} value={form.coreStrength} onChange={F("coreStrength")}/>
          <textarea className="inp fspan" placeholder="Future Direction" rows={2} value={form.futureDirection} onChange={F("futureDirection")}/>
          <textarea className="inp fspan" placeholder="Organization Strength" rows={2} value={form.organizationStrength} onChange={F("organizationStrength")}/>
          <input className="inp fspan" placeholder="Hiring Technologies (comma-separated)" value={form.hiringTechnologies} onChange={F("hiringTechnologies")}/>
          <input className="inp fspan" placeholder="Notable Products (comma-separated)" value={form.notableProducts} onChange={F("notableProducts")}/>
          <input className="inp fspan" placeholder="Career Benefits (comma-separated)" value={form.careerBenefits} onChange={F("careerBenefits")}/>
          <input className="inp" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={F("linkedinUrl")}/>
          <input className="inp" placeholder="Website URL" value={form.websiteUrl} onChange={F("websiteUrl")}
            onBlur={e=>{ if(e.target.value && !form.logoUrl) autoFetchLogo(form.name, e.target.value); }}/>
          <input className="inp" placeholder="Jobs URL" value={form.jobsUrl} onChange={F("jobsUrl")}/>
          <input className="inp" placeholder="Glassdoor rating (e.g. 4.2)" value={form.glassdoor} onChange={F("glassdoor")}/>
          <div>
            <label style={{fontSize:11,color:"var(--text2)",display:"block",marginBottom:4}}>
              Match Score: {form.matchScore}%
            </label>
            <input type="range" min={0} max={100} value={form.matchScore} onChange={F("matchScore")} style={{width:"100%"}}/>
          </div>
          <input className="inp fspan" placeholder="Tags (comma-separated)" value={form.tags} onChange={F("tags")}/>
        </div>

        {/* Footer buttons */}
        <div style={{display:"flex",gap:10,marginTop:22,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-cyan" onClick={save}>{existing?"Save Changes":"Add Company"}</button>
        </div>
      </div>
    </div>
  );
}

/* COMPANIES — premium card grid */
/* COMPANY LOGO — Smart logo with Clearbit API + styled fallback */
/* SPOTIFY COMPANY CARD — Logo fills the card like Image 2 */
function SpotifyCompanyCard({ c, i, grad, stCol, logoUrl, initials, tags, stKey, isOwner, onSelect, onEdit, onDelete }) {
  const [logoOk,  setLogoOk]  = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const [hov,     setHov]     = useState(false);

  const cardH = 300;

  return (
    <div
      className="anim-up"
      onClick={onSelect}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        animationDelay:`${i*30}ms`,
        borderRadius:22, cursor:"pointer",
        overflow:"hidden", position:"relative",
        height:cardH,
        transition:"all .32s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hov
          ? `0 28px 60px rgba(0,0,0,.7), 0 0 0 1.5px ${stCol}50`
          : "0 6px 24px rgba(0,0,0,.5)",
        background: "#080E0C",
      }}>

      {/* ── FULL CARD BACKGROUND: logo image fills entire card ── */}

      {/* 1. Gradient bg always shown (also shows when logo loads) */}
      <div style={{
        position:"absolute", inset:0,
        background: grad,
        zIndex:0,
      }}/>

      {/* 2. Logo image — full cover, large and centered */}
      {!logoErr && (
        <img
          src={logoUrl}
          alt={c.name}
          onLoad={()=>setLogoOk(true)}
          onError={()=>setLogoErr(true)}
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"contain",
            objectPosition:"center 35%",
            zIndex:1,
            opacity: logoOk ? (hov ? 0.45 : 0.35) : 0,
            transition:"opacity .4s ease",
            padding:"24px 20px 80px",
            filter:"brightness(1.1) saturate(0.9)",
          }}
        />
      )}

      {/* 3. Big styled initial letter — shown when no logo */}
      {(logoErr || !logoOk) && (
        <div style={{
          position:"absolute", inset:0, zIndex:1,
          display:"flex", alignItems:"center", justifyContent:"center",
          paddingBottom:90,
        }}>
          <div style={{
            fontFamily:"Plus Jakarta Sans,sans-serif",
            fontWeight:900,
            fontSize:110,
            color:"rgba(255,255,255,.12)",
            lineHeight:1,
            letterSpacing:"-8px",
            userSelect:"none",
          }}>
            {initials}
          </div>
        </div>
      )}

      {/* 4. Bottom gradient — dark scrim so text is readable */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        background:"linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(4,10,8,.6) 55%, rgba(2,6,5,.95) 100%)",
      }}/>

      {/* 5. Top-right: hiring badge + owner controls */}
      <div style={{
        position:"absolute", top:14, right:14, zIndex:10,
        display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end",
      }}>
        {c.openRoles>0 && (
          <div style={{
            display:"flex", alignItems:"center", gap:5,
            padding:"5px 11px", borderRadius:20,
            background:"rgba(16,185,129,.22)",
            border:"1px solid rgba(16,185,129,.45)",
            backdropFilter:"blur(8px)",
          }}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#10B981",
              boxShadow:"0 0 7px #10B981",animation:"pulse 1.5s infinite"}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,
              color:"#10B981",letterSpacing:".12em"}}>HIRING · {c.openRoles}</span>
          </div>
        )}
        {isOwner && hov && (
          <div style={{display:"flex",gap:5}}>
            <button style={{
              padding:"4px 10px",borderRadius:8,fontSize:11,fontWeight:600,
              background:"rgba(0,151,178,.25)",color:"#5dd3e8",
              border:"1px solid rgba(0,151,178,.4)",cursor:"pointer",
            }} onClick={e=>{e.stopPropagation();onEdit();}}>Edit</button>
            <button style={{
              padding:"4px 10px",borderRadius:8,fontSize:11,fontWeight:600,
              background:"rgba(244,63,94,.2)",color:"#F43F5E",
              border:"1px solid rgba(244,63,94,.35)",cursor:"pointer",
            }} onClick={e=>{e.stopPropagation();onDelete();}}>Del</button>
          </div>
        )}
      </div>

      {/* 6. Stage badge top-left */}
      <div style={{
        position:"absolute", top:14, left:14, zIndex:10,
      }}>
        <span style={{
          padding:"4px 11px", borderRadius:20, fontSize:10, fontWeight:700,
          background:`${stCol}28`, color:stCol,
          border:`1px solid ${stCol}50`,
          backdropFilter:"blur(8px)",
          fontFamily:"var(--font-mono)", letterSpacing:".08em",
        }}>
          {(()=>{const s=c.stage||"";return s.toLowerCase().includes("public")?"PUBLIC":s.toLowerCase().includes("growth")?"GROWTH":(s.length>10?s.slice(0,10)+"…":s||"—").toUpperCase();})()}
        </span>
      </div>

      {/* 7. BOTTOM CONTENT — company name, description, tags, button */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, zIndex:5,
        padding:"0 18px 0",
      }}>
        {/* Company name — big, bold, white */}
        <div style={{
          fontFamily:"Plus Jakarta Sans,sans-serif",
          fontWeight:800, fontSize:22,
          color:"#FFFFFF",
          letterSpacing:"-.5px", lineHeight:1.2,
          marginBottom:6,
          textShadow:"0 2px 12px rgba(0,0,0,.8)",
        }}>
          {c.name}
        </div>

        {/* Description */}
        <p style={{
          fontSize:13, color:"rgba(255,255,255,.68)",
          lineHeight:1.55, margin:"0 0 12px",
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden",
          textShadow:"0 1px 6px rgba(0,0,0,.6)",
        }}>
          {c.description||`${c.name} is a ${c.industry||"technology"} company${c.headquarters?` based in ${c.headquarters}`:""}.`}
        </p>

        {/* Tags row — industry + keywords */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {tags.map((t,j)=>(
            <span key={j} style={{
              padding:"4px 10px", borderRadius:20,
              background:"rgba(255,255,255,.13)",
              backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.18)",
              fontSize:11, color:"rgba(255,255,255,.85)",
              fontWeight:600, whiteSpace:"nowrap",
            }}>{t}</span>
          ))}
          {c.size && (
            <span style={{
              display:"flex",alignItems:"center",gap:4,
              padding:"4px 10px",borderRadius:20,
              background:"rgba(255,255,255,.1)",
              backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.14)",
              fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:500,
            }}>
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              {c.size}
            </span>
          )}
        </div>

        {/* VIEW COMPANY button — full width white pill like Image 2 */}
        <div style={{
          width:"100%", padding:"12px 0",
          borderRadius:"0 0 22px 22px",
          background:"rgba(255,255,255,.12)",
          backdropFilter:"blur(16px)",
          border:"1px solid rgba(255,255,255,.18)",
          borderBottom:"none",
          textAlign:"center",
          fontFamily:"Plus Jakarta Sans,sans-serif",
          fontWeight:700, fontSize:13,
          color: hov ? "#fff" : "rgba(255,255,255,.75)",
          letterSpacing:".02em",
          transition:"all .2s",
          background: hov ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.12)",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          margin:"0 -18px",
          cursor:"pointer",
        }}>
          View Company
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </div>
      </div>

    </div>
  );
}

function CompanyLogo({ name, logoUrl, grad, stCol, initials }) {
  const [status, setStatus] = useState("loading"); // loading | ok | err

  // Known domains for popular companies
  const KNOWN = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","byju":"byjus.com",
    "cred":"getcred.app","meesho":"meesho.com","groww":"groww.in",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","twitter":"twitter.com","slack":"slack.com",
    "salesforce":"salesforce.com","adobe":"adobe.com","oracle":"oracle.com",
    "ibm":"ibm.com","intel":"intel.com","qualcomm":"qualcomm.com",
    "zensar":"zensar.com","bristlecone":"bristlecone.com",
    "digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
  };

  const key = (name||"").toLowerCase().replace(/[^a-z]/g,"");
  const knownDomain = Object.entries(KNOWN).find(([k])=>key.includes(k))?.[1];
  const finalUrl = knownDomain
    ? `https://logo.clearbit.com/${knownDomain}`
    : logoUrl;

  if (status === "ok") {
    return (
      <div style={{
        width:80, height:80, borderRadius:18,
        background:"rgba(255,255,255,.97)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden", flexShrink:0,
        boxShadow:`0 8px 28px rgba(0,0,0,.45), 0 0 0 2px ${stCol}30`,
        zIndex:2, position:"relative",
      }}>
        <img src={finalUrl} alt={name}
          style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }}/>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <>
        <img src={finalUrl} alt={name} style={{display:"none"}}
          onLoad={()=>setStatus("ok")}
          onError={()=>setStatus("err")}/>
        {/* show styled initials while loading */}
        <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>
      </>
    );
  }

  // fallback: styled gradient initials tile
  return <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>;
}

function StyledInitials({ grad, stCol, initials, name }) {
  // Pick icon based on industry keywords
  const n = (name||"").toLowerCase();
  const iconPath = n.includes("bank")||n.includes("pay")||n.includes("fin")
    ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    : n.includes("health")||n.includes("med")||n.includes("pharma")
    ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    : n.includes("cloud")||n.includes("aws")||n.includes("azure")
    ? "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    : n.includes("ai")||n.includes("ml")||n.includes("data")
    ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    : "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";

  return (
    <div style={{
      width:82, height:82, borderRadius:20, flexShrink:0,
      background:grad, position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      boxShadow:`0 8px 28px rgba(0,0,0,.5), 0 0 0 2px ${stCol}35`,
      zIndex:2,
    }}>
      {/* shine */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(135deg,rgba(255,255,255,.25) 0%,transparent 55%)",
        pointerEvents:"none" }}/>
      {/* icon */}
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,.9)" strokeWidth="1.5" strokeLinecap="round"
        style={{ marginBottom:4 }}>
        <path d={iconPath}/>
      </svg>
      {/* initials */}
      <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800,
        fontSize:13, color:"rgba(255,255,255,.95)", letterSpacing:"-.3px",
        lineHeight:1, textAlign:"center", maxWidth:70,
        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        padding:"0 4px" }}>
        {initials}
      </div>
    </div>
  );
}

function Companies({ isOwner, items, setItems }) {
  const [search, setSearch]   = useState("");
  const [stageF, setStageF]   = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);

  // ── sync: when items changes externally, keep selected in sync ──
  useEffect(() => {
    if (selected) {
      const updated = items.find(x => x.id === selected.id);
      if (updated) setSelected(updated); else setSelected(null);
    }
  }, [items]);

  const filtered = items.filter(c => {
    const ok = stageF === "ALL" || c.stage === stageF;
    if (!ok) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return [c.name,c.industry,c.headquarters,c.stage,...(c.tags||[]),...(c.hiringTechnologies||[])].some(v=>typeof v==="string"&&v.toLowerCase().includes(s));
  });

  const handleSave = co => {
    setItems(prev => editing ? prev.map(x=>x.id===co.id?co:x) : [...prev, co]);
    setModal(false); setEditing(null);
  };

  if (selected) return (
    <CompanyDetail c={selected} onBack={()=>setSelected(null)} isOwner={isOwner}
      onDelete={id=>{setItems(p=>p.filter(x=>x.id!==id));setSelected(null);}}
      onEdit={()=>{setEditing(selected);setSelected(null);setModal(true);}}/>
  );

  return (
    <div style={{ height:"100%",display:"flex",flexDirection:"column",gap:14 }}>
      {modal && <CompanyModal existing={editing} onSave={handleSave} onClose={()=>{setModal(false);setEditing(null);}}/>}

      {/* search + controls */}
      <div style={{ display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search companies, tech, industry…"/>
        {isOwner && <button className="btn btn-cyan" onClick={()=>{setEditing(null);setModal(true);}}>
          <Ico d="M12 5v14M5 12h14" s={13}/>Add Company
        </button>}
      </div>

      {/* stage filter pills */}
      <div style={{ display:"flex",gap:6,flexWrap:"wrap",alignItems:"center" }}>
        {["ALL","Public","Private","Startup","Series A","Series B","Series C+","Growth"].map(s=>(
          <button key={s} onClick={()=>setStageF(s)} style={{
            padding:"5px 12px",borderRadius:20,fontFamily:"var(--font-mono)",fontSize:10,fontWeight:600,
            cursor:"pointer",border:"1px solid",transition:"all .15s",letterSpacing:".04em",textTransform:"uppercase",
            background: stageF===s ? (STAGE_COL[s]||"#0097b2")+"22" : "rgba(255,255,255,.04)",
            borderColor: stageF===s ? (STAGE_COL[s]||"#0097b2")+"55" : "var(--border2)",
            color: stageF===s ? (STAGE_COL[s]||"#0097b2") : "var(--text3)",
          }}>{s}</button>
        ))}
        <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",marginLeft:6 }}>{filtered.length} results</span>
      </div>

      {items.length===0 ? (
        <div className="empty">
          <div style={{ width:60,height:60,borderRadius:16,background:"rgba(0,151,178,.1)",border:"1px solid rgba(0,151,178,.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Ico d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" s={26} c="#0097b2"/>
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:18,color:"var(--text)" }}>{isOwner?"No companies yet":"No companies available"}</div>
          <div style={{ fontSize:13,maxWidth:320,lineHeight:1.65,color:"var(--text2)" }}>{isOwner?"Type a company name — AI fetches the full intelligence profile instantly.":"The owner hasn't added companies yet."}</div>
          {isOwner && <button className="btn btn-cyan" onClick={()=>setModal(true)}>Add First Company</button>}
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
          gap:18, overflowY:"auto", flex:1, paddingRight:4
        }} className="scrollbar">
          {filtered.map((c,i)=>{
            const grad  = coGrad(c.name);
            const stKey = c.stage?.includes("Public")?"Public":c.stage?.includes("Growth")?"Growth":c.stage||"";
            const stCol = STAGE_COL[stKey]||STAGE_COL[c.stage]||"#0097b2";
            const KNOWN_DOMAINS = {
              "google":"google.com","meta":"meta.com","facebook":"facebook.com",
              "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
              "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
              "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
              "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
              "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
              "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
              "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
              "digitalocean":"digitalocean.com","stripe":"stripe.com",
              "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
              "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
              "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
              "zensar":"zensar.com","digicert":"digicert.com","sikich":"sikich.com",
              "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
              "bristlecone":"bristlecone.com","motherson":"mothersongroup.com",
              "cimpress":"cimpress.com","insight":"insight.com",
              "billdesk":"billdesk.com","pine labs":"pinelabs.com",
              "phonepe":"phonepe.com","zerodha":"zerodha.com",
            };
            const nameKey = (c.name||"").toLowerCase().replace(/[^a-z ]/g,"");
            const knownDomain = Object.entries(KNOWN_DOMAINS)
              .find(([k])=>nameKey.includes(k))?.[1];
            const fallbackDomain = (c.website||"")
              .replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0]
              || (c.name||"").toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
            const logoUrl = c.logoUrl || `https://logo.clearbit.com/${knownDomain||fallbackDomain}`;
            const initials = (c.name||"?").split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();
            const tags = [c.industry, ...(c.tags||[])].filter(Boolean).slice(0,3);

            return (
              <SpotifyCompanyCard
                key={c.id}
                c={c} i={i}
                grad={grad} stCol={stCol}
                logoUrl={logoUrl} initials={initials}
                tags={tags} stKey={stKey}
                isOwner={isOwner}
                onSelect={()=>setSelected(c)}
                onEdit={()=>{setEditing(c);setModal(true);}}
                onDelete={()=>setItems(p=>p.filter(x=>x.id!==c.id))}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* GENERIC SECTION */
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
function CardShell({ accentColor, gradFrom, gradTo, children, footer }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        background: "var(--card)", position: "relative",
        border: `1px solid ${hovered ? accentColor + "44" : "var(--border)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,.5), 0 0 0 1px ${accentColor}22, 0 0 32px ${accentColor}18`
          : "0 2px 8px rgba(0,0,0,.2)",
        transition: "all .25s cubic-bezier(.16,1,.3,1)",
      }}>
      {/* top gradient bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${gradFrom || accentColor}, ${gradTo || accentColor + "88"})` }} />
      {/* subtle bg glow */}
      <div style={{ position:"absolute", top:0, right:0, width:160, height:160,
        background:`radial-gradient(circle, ${accentColor}0a 0%, transparent 70%)`,
        pointerEvents:"none", transition:"opacity .3s", opacity: hovered ? 1 : 0 }}/>
      {/* body */}
      <div style={{ padding: "18px 18px 14px", position:"relative" }}>{children}</div>
      {/* footer */}
      {footer && (
        <div style={{ padding:"10px 18px 14px", borderTop:"1px solid var(--border)",
          background: hovered ? `${accentColor}06` : "transparent", transition:"background .25s" }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* SECTION CONFIGS */
const SECCFG = {
  aiTools:{
    title:"AI Tools", accentColor:"#7ed957", accentClass:"cyan", btnClass:"btn-cyan",
    icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    emptyMsg:"Type the tool name — AI fetches category, pricing, use cases and description automatically.",
    searchPlaceholder:"Search by name, category, use case, pricing…",
    aiType:"aiTool",
    fields:[
      {key:"name",label:"Tool name *"},{key:"category",label:"Category",type:"select",options:["CODE","UI","RESEARCH","CLI","DOCS","MEDIA","LLM","DATA","DESIGN","GENERAL"]},
      {key:"pricing",label:"Pricing (Free / Paid / Freemium)"},{key:"link",label:"Tool URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},
      {key:"useCases",label:"Use cases (comma sep.)",span:true},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const CAT_COL = {CODE:"#7ed957",UI:"#006d82",RESEARCH:"#F59E0B",LLM:"#0097b2",DATA:"#10B981",DESIGN:"#EC4899",MEDIA:"#F43F5E",CLI:"#10B981",DOCS:"#7ed957",GENERAL:"#8B93A6"};
      const CAT_GR  = {CODE:"linear-gradient(135deg,#7ed957,#0097b2)",UI:"linear-gradient(135deg,#006d82,#EC4899)",RESEARCH:"linear-gradient(135deg,#F59E0B,#F43F5E)",LLM:"linear-gradient(135deg,#0097b2,#7ed957)",DATA:"linear-gradient(135deg,#10B981,#7ed957)",DESIGN:"linear-gradient(135deg,#EC4899,#006d82)",MEDIA:"linear-gradient(135deg,#F43F5E,#F59E0B)",CLI:"linear-gradient(135deg,#10B981,#7ed957)",DOCS:"linear-gradient(135deg,#7ed957,#006d82)",GENERAL:"linear-gradient(135deg,#8B93A6,#0097b2)"};
      const col = CAT_COL[item.category]||accentColor;
      const gr  = CAT_GR[item.category]||`linear-gradient(135deg,${col},${col}88)`;
      const pricingBg = item.pricing==="Free"?"rgba(16,185,129,.12)":item.pricing==="Freemium"?"rgba(245,158,11,.1)":"rgba(244,63,94,.1)";
      const pricingCol = item.pricing==="Free"?"#10B981":item.pricing==="Freemium"?"#F59E0B":"#F43F5E";
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"44"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700,letterSpacing:".08em" }}>EXPLORE →</span>
            </div>
          }>
          {/* icon + name row */}
          <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:14 }}>
            <div style={{ width:46,height:46,borderRadius:13,background:gr,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 6px 20px ${col}44` }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:800,fontSize:17,color:"#EDF0F7",letterSpacing:"-.3px",marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</div>
              <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}28`,textTransform:"uppercase" }}>{item.category}</span>
                {item.pricing && <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:pricingBg,color:pricingCol,border:`1px solid ${pricingCol}30` }}>{item.pricing}</span>}
              </div>
            </div>
          </div>
          {/* description */}
          <p style={{ fontSize:14,color:"#C4C9D6",lineHeight:1.7,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:38 }}>
            {item.description||"No description yet."}
          </p>
          {/* use-case pills */}
          {item.useCases && (
            <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
              {item.useCases.split(",").slice(0,3).map((u,i)=>(
                <span key={i} style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.05)",color:"var(--text3)",border:"1px solid var(--border2)" }}>{u.trim()}</span>
              ))}
            </div>
          )}
          {/* tag row */}
          {item.tags?.length>0 && (
            <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
              {item.tags.slice(0,3).map((t,i)=><span key={i} style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:600,background:`${col}10`,color:col,border:`1px solid ${col}20`,fontFamily:"var(--font-mono)",textTransform:"uppercase" }}>{t}</span>)}
            </div>
          )}
        </CardShell>
      );
    },
    detailRender:item=>{
      const CAT_COL = {CODE:"#7ed957",UI:"#006d82",RESEARCH:"#F59E0B",LLM:"#0097b2",DATA:"#10B981",DESIGN:"#EC4899",MEDIA:"#F43F5E",CLI:"#10B981",DOCS:"#7ed957",GENERAL:"#8B93A6"};
      const col = CAT_COL[item.category]||"#7ed957";
      return (
        <div style={{ maxWidth:700 }}>
          <div style={{ display:"flex",gap:10,marginBottom:16 }}>
            <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}30`,textTransform:"uppercase" }}>{item.category}</span>
            {item.pricing && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.1)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>{item.pricing}</span>}
          </div>
          <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:16 }}>{item.name}</div>
          {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18,borderLeft:`3px solid ${col}` }}>
            <p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p>
          </div>}
          {item.useCases && <div style={{ padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18 }}>
            <SL ch="USE CASES" col={col}/>
            <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:10 }}>
              {item.useCases.split(",").map((u,i)=><span key={i} style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:600,background:"rgba(0,109,130,.1)",color:"#006d82",border:"1px solid rgba(0,109,130,.2)",fontFamily:"var(--font-mono)" }}>{u.trim()}</span>)}
            </div>
          </div>}
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-cyan" style={{ textDecoration:"none" }}>Visit Tool →</a>}
        </div>
      );
    },
  },

  certifications:{
    title:"Certifications", accentColor:"#006d82", accentClass:"violet", btnClass:"btn-violet",
    icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    emptyMsg:"Type a certification name — AI fetches provider, level, duration and market demand automatically.",
    searchPlaceholder:"Search by name, provider, level, status…",
    aiType:"certification",
    fields:[
      {key:"name",label:"Certification name *"},{key:"provider",label:"Provider (e.g. Google, AWS)"},
      {key:"level",label:"Level",type:"select",options:["Beginner","Intermediate","Advanced","Expert","Professional"]},
      {key:"status",label:"Status",type:"select",options:["Available","Popular","Hot","Coming Soon"]},
      {key:"duration",label:"Duration"},{key:"demand",label:"Market Demand %",type:"range"},{key:"link",label:"Enroll URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const lvlCol = {Beginner:"#10B981",Intermediate:"#7ed957",Advanced:"#F59E0B",Expert:"#F43F5E",Professional:"#006d82"};
      const lvlGr  = {Beginner:"linear-gradient(135deg,#10B981,#7ed957)",Intermediate:"linear-gradient(135deg,#7ed957,#0097b2)",Advanced:"linear-gradient(135deg,#F59E0B,#F43F5E)",Expert:"linear-gradient(135deg,#F43F5E,#006d82)",Professional:"linear-gradient(135deg,#006d82,#EC4899)"};
      const col    = lvlCol[item.level]||accentColor;
      const gr     = lvlGr[item.level]||`linear-gradient(135deg,${accentColor},${accentColor}88)`;
      const demand = Number(item.demand)||0;
      const demandCol = demand>=80?"#10B981":demand>=60?"#F59E0B":"#F43F5E";
      const statusBg  = {Hot:"rgba(244,63,94,.12)",Popular:"rgba(245,158,11,.1)",Available:"rgba(16,185,129,.1)","Coming Soon":"rgba(0,151,178,.1)"};
      const statusCol = {Hot:"#F43F5E",Popular:"#F59E0B",Available:"#10B981","Coming Soon":"#0097b2"};
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"55"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"var(--font-mono)",fontSize:9,color:accentColor,textDecoration:"none",fontWeight:700 }}>ENROLL ↗</a> : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700,letterSpacing:".08em" }}>EXPLORE →</span>
            </div>
          }>
          {/* header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:5,marginBottom:9,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}30`,textTransform:"uppercase" }}>{item.level||"N/A"}</span>
                {item.status && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:statusBg[item.status]||"rgba(255,255,255,.05)",color:statusCol[item.status]||"var(--text3)",border:`1px solid ${statusCol[item.status]||"var(--border2)"}30`,textTransform:"uppercase" }}>{item.status}</span>}
              </div>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,color:"var(--text)",letterSpacing:"-.2px",marginBottom:4 }}>{item.name}</div>
              {item.provider && <div style={{ fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".06em" }}>{item.provider}{item.duration&&` · ${item.duration}`}</div>}
            </div>
            {/* demand ring */}
            <div style={{ width:48,height:48,borderRadius:"50%",background:`conic-gradient(${demandCol} ${demand*3.6}deg,rgba(255,255,255,.07) 0deg)`,
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:10 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"var(--card)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:demandCol }}>{demand}%</span>
              </div>
            </div>
          </div>
          {/* demand bar */}
          <div style={{ marginTop:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".12em" }}>MARKET DEMAND</span>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:demandCol }}>{demand}%</span>
            </div>
            <div style={{ height:5,background:"rgba(255,255,255,.07)",borderRadius:3,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${demand}%`,borderRadius:3,background:gr,
                transition:"width 1.2s ease",boxShadow:`0 0 8px ${col}55` }}/>
            </div>
          </div>
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:680 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.15)",color:"#006d82",border:"1px solid rgba(0,109,130,.3)",textTransform:"uppercase" }}>{item.level}</span>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)",textTransform:"uppercase" }}>{item.status}</span>
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:26,color:"#F0F4FF",letterSpacing:"-0.5px",marginBottom:6 }}>{item.name}</div>
        <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text2)",marginBottom:22 }}>{item.provider} · {item.duration}</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20 }}>
          {[{l:"Level",v:item.level,c:"#006d82"},{l:"Demand",v:`${item.demand}%`,c:"#10B981"},{l:"Duration",v:item.duration,c:"#7ed957"}].map((s,i)=>(
            <div key={i} style={{ padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`2px solid ${s.c}` }}>
              <div style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6 }}>{s.l}</div>
              <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.c }}>{s.v||"\u2014"}</div>
            </div>
          ))}
        </div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #006d82",marginBottom:18 }}>
          <p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p>
        </div>}
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-violet" style={{ textDecoration:"none" }}>Enroll Now →</a>}
      </div>
    ),
  },

  startups:{
    title:"Startups", accentColor:"#F59E0B", accentClass:"amber", btnClass:"btn-amber",
    icon:"M13 10V3L4 14h7v7l9-11h-7z",
    emptyMsg:"Type a startup name — AI fetches stage, equity range, tech stack, and why engineers love working there.",
    searchPlaceholder:"Search by name, stage, industry, tech…",
    aiType:"startup",
    fields:[
      {key:"name",label:"Startup name *"},{key:"stage",label:"Stage",type:"select",options:["Pre-Seed","Seed","Series A","Series B","Series C+","Growth","Public"]},
      {key:"industry",label:"Industry"},{key:"founded",label:"Founded year"},{key:"headcount",label:"Headcount"},
      {key:"equity",label:"Equity range (e.g. 0.1–1.5%)"},{key:"description",label:"Description",type:"textarea",span:true,rows:2},
      {key:"whyJoin",label:"Why Join",type:"textarea",span:true,rows:2},{key:"technologies",label:"Technologies (comma sep.)",span:true},
      {key:"linkedinUrl",label:"LinkedIn URL"},{key:"websiteUrl",label:"Website URL"},{key:"jobsUrl",label:"Jobs URL"},
      {key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const STAGE_C={"Pre-Seed":"#F43F5E","Seed":"#F59E0B","Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981","Public":"#0097b2"};
      const STAGE_G={"Pre-Seed":"linear-gradient(135deg,#F43F5E,#EC4899)","Seed":"linear-gradient(135deg,#F59E0B,#F43F5E)","Series A":"linear-gradient(135deg,#0097b2,#7ed957)","Series B":"linear-gradient(135deg,#006d82,#EC4899)","Series C+":"linear-gradient(135deg,#7ed957,#0097b2)","Growth":"linear-gradient(135deg,#10B981,#7ed957)","Public":"linear-gradient(135deg,#0097b2,#7ed957)"};
      const stageCol=STAGE_C[item.stage]||accentColor;
      const grad=STAGE_G[item.stage]||"linear-gradient(135deg,#F59E0B,#F43F5E)";
      return(
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .22s"}}
          onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${stageCol}50`;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,.4),0 0 0 1px ${stageCol}18`;}}
          onMouseLeave={e=>{e.currentTarget.style.border="1px solid var(--border)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
          {/* color top bar */}
          <div style={{height:4,background:grad}}/>
          <div style={{padding:20}}>
            {/* header row */}
            <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:14}}>
              <div style={{width:52,height:52,borderRadius:14,background:grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:24,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 6px 20px ${stageCol}44`}}>
                {(item.name||"?")[0].toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:17,color:"#EDF0F7",letterSpacing:"-.3px",marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name||"Unnamed"}</div>
                <div style={{fontSize:13,color:"#8B93A6"}}>{item.industry||"Technology"}{item.founded?` · Est. ${item.founded}`:""}</div>
              </div>
              <span style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,background:`${stageCol}20`,color:stageCol,border:`1px solid ${stageCol}40`,flexShrink:0,whiteSpace:"nowrap"}}>{item.stage||"Startup"}</span>
            </div>
            {/* description */}
            <p style={{fontSize:14,color:"#C4C9D6",lineHeight:1.7,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
              {item.description||"No description available."}
            </p>
            {/* info badges */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {item.equity&&<span style={{padding:"5px 12px",borderRadius:8,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>💰 Equity {item.equity}</span>}
              {item.headcount&&<span style={{padding:"5px 12px",borderRadius:8,fontSize:13,background:"rgba(255,255,255,.06)",color:"#8B93A6",border:"1px solid rgba(255,255,255,.1)"}}>👥 {item.headcount} employees</span>}
            </div>
            {/* tech tags */}
            {item.technologies&&(
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                {item.technologies.split(",").slice(0,3).map((t,i)=>(
                  <span key={i} style={{padding:"4px 10px",borderRadius:6,fontSize:12,background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)"}}>{t.trim()}</span>
                ))}
              </div>
            )}
          </div>
          {/* footer */}
          <div style={{padding:"12px 20px 14px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,.15)"}}>
            <div style={{display:"flex",gap:8}}>
              {item.linkedinUrl&&<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:"rgba(10,102,194,.15)",border:"1px solid rgba(10,102,194,.3)",borderRadius:7,fontSize:12,color:"#5B9BD5",textDecoration:"none",fontWeight:600}}>LinkedIn</a>}
              {item.jobsUrl&&<a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:`${stageCol}15`,border:`1px solid ${stageCol}30`,borderRadius:7,fontSize:12,color:stageCol,textDecoration:"none",fontWeight:700}}>View Jobs ↗</a>}
              {isOwner&&<><button className="btn btn-ghost btn-sm" onClick={e=>{e.stopPropagation();onEdit();}} style={{fontSize:12}}>Edit</button><button className="btn btn-sm" style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)",fontSize:12}} onClick={e=>{e.stopPropagation();onDel();}}>Del</button></>}
            </div>
            <span style={{fontSize:13,color:stageCol,fontWeight:700}}>View Details →</span>
          </div>
        </div>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:700 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.15)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.3)",textTransform:"uppercase" }}>{item.stage}</span>
          {item.equity && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>Equity {item.equity}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:26,color:"#F0F4FF",letterSpacing:"-0.5px",marginBottom:6 }}>{item.name}</div>
        <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text2)",marginBottom:20 }}>{[item.industry,item.founded&&`Est. ${item.founded}`,item.headcount&&`${item.headcount} employees`].filter(Boolean).join(" · ")}</div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #F59E0B",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.whyJoin && <div style={{ padding:18,background:"rgba(16,185,129,.05)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,marginBottom:18 }}><SL ch="WHY JOIN?" col="#10B981"/><p style={{ fontSize:12,lineHeight:1.7,marginTop:6 }}>{item.whyJoin}</p></div>}
        {item.technologies && <div style={{ marginBottom:18 }}><SL ch="TECHNOLOGIES" col="#7ed957"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:8 }}>{item.technologies.split(",").map((t,i)=><span key={i} className="tag" style={{ background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)" }}>{t.trim()}</span>)}</div></div>}
        <div style={{ display:"flex",gap:10 }}>
          {item.linkedinUrl&&<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration:"none" }}>LinkedIn</a>}
          {item.websiteUrl&&<a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration:"none" }}>Website</a>}
          {item.jobsUrl&&<a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-amber" style={{ textDecoration:"none" }}>View Jobs →</a>}
        </div>
      </div>
    ),
  },

  resumeModels:{
    title:"Resume Models", accentColor:"#F43F5E", accentClass:"coral", btnClass:"btn-coral",
    icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    emptyMsg:"Type a template name or role — AI fetches format, ATS score, tips and description automatically.",
    searchPlaceholder:"Search by role type, format, ATS score…",
    aiType:"resumeModel",
    fields:[
      {key:"name",label:"Template name *"},
      {key:"type",label:"Role type",type:"select",options:["Engineering","Product","Design","ML/AI","Management","Startup","Sales","Research","DevRel","Other"]},
      {key:"format",label:"Format",type:"select",options:["Chronological","Functional","Hybrid","One-page","Two-page","Portfolio"]},
      {key:"atsScore",label:"ATS Score (e.g. 92%)"},{key:"link",label:"Download / preview URL"},
      {key:"description",label:"Description",type:"textarea",span:true,rows:2},{key:"tips",label:"Tips for using this template",type:"textarea",span:true,rows:2},
      {key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const ats = parseInt(item.atsScore)||0;
      const atsCol = ats>=90?"#10B981":ats>=75?"#F59E0B":"#F43F5E";
      const TYPE_COL = {Engineering:"#7ed957",Product:"#0097b2",Design:"#EC4899","ML/AI":"#006d82",Management:"#F59E0B",Startup:"#F43F5E",Sales:"#10B981",Research:"#006d82",DevRel:"#7ed957",Other:"#8B93A6"};
      const typeCol = TYPE_COL[item.type]||accentColor;
      return (
        <CardShell accentColor={typeCol} gradFrom={typeCol} gradTo={accentColor}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:accentColor,fontWeight:700 }}>VIEW →</span>
            </div>
          }>
          {/* doc icon + title */}
          <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:14 }}>
            <div style={{ width:46,height:56,borderRadius:10,background:`linear-gradient(135deg,${typeCol}22,${accentColor}18)`,border:`1px solid ${typeCol}30`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0 }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={typeCol} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span style={{ fontFamily:"var(--font-mono)",fontSize:7,color:typeCol,fontWeight:700,letterSpacing:".05em" }}>CV</span>
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,color:"var(--text)",letterSpacing:"-.2px",marginBottom:6 }}>{item.name}</div>
              <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${typeCol}18`,color:typeCol,border:`1px solid ${typeCol}28`,textTransform:"uppercase" }}>{item.type}</span>
                <span style={{ padding:"2px 8px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.1)",color:"#006d82",border:"1px solid rgba(0,109,130,.2)" }}>{item.format}</span>
              </div>
            </div>
            {item.atsScore && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",background:`${atsCol}12`,border:`1px solid ${atsCol}25`,borderRadius:10,padding:"8px 10px",flexShrink:0 }}>
                <span style={{ fontFamily:"var(--font-mono)",fontSize:7,color:"var(--text3)",letterSpacing:".1em" }}>ATS</span>
                <span style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:18,color:atsCol,lineHeight:1.1,letterSpacing:"-0.5px" }}>{item.atsScore}</span>
              </div>
            )}
          </div>
          <p style={{ fontSize:12,color:"var(--text2)",lineHeight:1.65,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:38 }}>
            {item.description||"No description yet."}
          </p>
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:660 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(244,63,94,.12)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.3)",textTransform:"uppercase" }}>{item.type}</span>
          <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(0,109,130,.12)",color:"#006d82",border:"1px solid rgba(0,109,130,.25)" }}>{item.format}</span>
          {item.atsScore && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)" }}>ATS {item.atsScore}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"var(--text)",letterSpacing:"-0.5px",marginBottom:16 }}>{item.name}</div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #F43F5E",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.tips && <div style={{ padding:18,background:"rgba(244,63,94,.05)",border:"1px solid rgba(244,63,94,.2)",borderRadius:12,marginBottom:18 }}><SL ch="TEMPLATE TIPS" col="#F43F5E"/><p style={{ fontSize:12,lineHeight:1.7,marginTop:6 }}>{item.tips}</p></div>}
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-coral" style={{ textDecoration:"none" }}>Download →</a>}
      </div>
    ),
  },

  careerPath:{
    title:"Career Path", accentColor:"#10B981", accentClass:"lime", btnClass:"btn-lime",
    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    emptyMsg:"Type a career transition (e.g. 'Senior Engineer to Staff') — AI generates the full roadmap, milestones and skills.",
    searchPlaceholder:"Search by role, skill, difficulty, timeline…",
    aiType:"careerPath",
    fields:[
      {key:"name",label:"Path title *",span:true},{key:"currentRole",label:"Current role"},{key:"targetRole",label:"Target role"},
      {key:"timeline",label:"Timeline (e.g. 12–18 months)"},{key:"salaryJump",label:"Expected salary jump (e.g. +30%)"},
      {key:"difficulty",label:"Difficulty",type:"select",options:["Beginner","Intermediate","Advanced","Expert"]},
      {key:"skills",label:"Key skills (comma sep.)",span:true},
      {key:"milestones",label:"Milestones (one per line)",type:"textarea",span:true,rows:4},
      {key:"description",label:"Overview",type:"textarea",span:true,rows:2},{key:"tags",label:"Tags (comma sep.)",span:true},
    ],
    cardRender:(item,{isOwner,accentColor,onEdit,onDel})=>{
      const diffCol = {Beginner:"#10B981",Intermediate:"#F59E0B",Advanced:"#F43F5E",Expert:"#006d82"};
      const diffGr  = {Beginner:"linear-gradient(135deg,#10B981,#7ed957)",Intermediate:"linear-gradient(135deg,#F59E0B,#F43F5E)",Advanced:"linear-gradient(135deg,#F43F5E,#006d82)",Expert:"linear-gradient(135deg,#006d82,#EC4899)"};
      const col = diffCol[item.difficulty]||accentColor;
      const gr  = diffGr[item.difficulty]||`linear-gradient(135deg,${accentColor},${accentColor}88)`;
      const milestoneCount = item.milestones ? item.milestones.split("\n").filter(Boolean).length : 0;
      return (
        <CardShell accentColor={col} gradFrom={col} gradTo={col+"55"}
          footer={
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {isOwner ? <div style={{ display:"flex",gap:4 }}><button className="btn btn-ghost btn-sm" onClick={onEdit}>Edit</button><button className="btn btn-sm" style={{ background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)" }} onClick={onDel}>Del</button></div>
                : <div/>}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:9,color:col,fontWeight:700 }}>VIEW PATH →</span>
            </div>
          }>
          {/* tags row */}
          <div style={{ display:"flex",gap:5,marginBottom:10,flexWrap:"wrap" }}>
            {item.difficulty && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${col}18`,color:col,border:`1px solid ${col}28`,textTransform:"uppercase" }}>{item.difficulty}</span>}
            {item.timeline && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.1)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.25)" }}>{item.timeline}</span>}
            {milestoneCount>0 && <span style={{ padding:"2px 9px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.05)",color:"var(--text3)",border:"1px solid var(--border2)" }}>{milestoneCount} steps</span>}
          </div>
          {/* title */}
          <div style={{ fontFamily:"var(--font-body)",fontWeight:700,fontSize:15,color:"var(--text)",letterSpacing:"-.2px",marginBottom:12,lineHeight:1.35 }}>{item.name}</div>
          {/* route row */}
          {(item.currentRole||item.targetRole) && (
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 12px",
              background:`${col}08`,border:`1px solid ${col}20`,borderRadius:10,marginBottom:12 }}>
              {item.currentRole && <span style={{ fontSize:11,color:"var(--text2)",fontWeight:500,flex:1 }}>{item.currentRole}</span>}
              <div style={{ flexShrink:0,width:28,height:2,background:gr,borderRadius:1 }}/>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              {item.targetRole && <span style={{ fontSize:11,color:col,fontWeight:700,flex:1,textAlign:"right" }}>{item.targetRole}</span>}
            </div>
          )}
          {/* salary highlight */}
          {item.salaryJump && (
            <div style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",background:"rgba(16,185,129,.09)",border:"1px solid rgba(16,185,129,.2)",borderRadius:8 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:13,color:"#10B981",letterSpacing:"-.2px" }}>{item.salaryJump} expected</span>
            </div>
          )}
        </CardShell>
      );
    },
    detailRender:item=>(
      <div style={{ maxWidth:720 }}>
        <div style={{ display:"flex",gap:8,marginBottom:16 }}>
          {item.difficulty && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,fontFamily:"var(--font-mono)",background:"rgba(16,185,129,.15)",color:"#10B981",border:"1px solid rgba(16,185,129,.3)",textTransform:"uppercase" }}>{item.difficulty}</span>}
          {item.timeline && <span style={{ padding:"4px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",background:"rgba(245,158,11,.12)",color:"#F59E0B",border:"1px solid rgba(245,158,11,.28)" }}>{item.timeline}</span>}
        </div>
        <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"var(--text)",letterSpacing:"-0.5px",marginBottom:16 }}>{item.name}</div>
        {(item.currentRole||item.targetRole) && (
          <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:"rgba(16,185,129,.07)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,marginBottom:20 }}>
            {item.currentRole && <span style={{ fontSize:14,color:"var(--text2)",fontWeight:600 }}>{item.currentRole}</span>}
            <div style={{ flex:1,height:2,background:"linear-gradient(to right,rgba(16,185,129,.3),#10B981)",borderRadius:1 }}/>
            {item.targetRole && <span style={{ fontSize:14,color:"#10B981",fontWeight:700 }}>{item.targetRole}</span>}
          </div>
        )}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20 }}>
          {[{l:"Timeline",v:item.timeline,c:"#F59E0B"},{l:"Salary Jump",v:item.salaryJump,c:"#10B981"},{l:"Difficulty",v:item.difficulty,c:"#F43F5E"}].map((s,i)=>(
            <div key={i} style={{ padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderTop:`2px solid ${s.c}` }}>
              <div style={{ fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6 }}>{s.l}</div>
              <div style={{ fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:s.c }}>{s.v||"\u2014"}</div>
            </div>
          ))}
        </div>
        {item.description && <div style={{ padding:16,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:"3px solid #10B981",marginBottom:18 }}><p style={{ fontSize:13,lineHeight:1.75,color:"var(--text2)" }}>{item.description}</p></div>}
        {item.skills && <div style={{ marginBottom:18 }}><SL ch="KEY SKILLS" col="#7ed957"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:8 }}>{item.skills.split(",").map((s,i)=><span key={i} className="tag" style={{ background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)" }}>{s.trim()}</span>)}</div></div>}
        {item.milestones && <div style={{ padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,marginBottom:18 }}>
          <SL ch="MILESTONES" col="#10B981"/>
          <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:12 }}>
            {item.milestones.split("\n").filter(Boolean).map((m,i)=>(
              <div key={i} style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                <div style={{ width:24,height:24,borderRadius:8,background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"#10B981" }}>{i+1}</span>
                </div>
                <span style={{ fontSize:13,lineHeight:1.6,color:"var(--text2)",paddingTop:3 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>}
        {item.tags?.length>0 && <div><SL ch="TAGS"/><div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:6 }}>{item.tags.map((t,i)=><span key={i} className="tag" style={{ background:"rgba(16,185,129,.1)",color:"#10B981",border:"1px solid rgba(16,185,129,.2)" }}>{t}</span>)}</div></div>}
      </div>
    ),
  },
};

/* ADMIN CONTROL */
function AdminControl({ settings, setSettings, coData, setCoData, secData, setSecData }) {
  const [nav, setNav] = useState("overview");

  const ADMIN_SECS = [
    {key:"overview",    label:"Overview",       icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {key:"quickAdd",    label:"Quick Add ⚡",   icon:"M13 10V3L4 14h7v7l9-11h-7z"},
    {key:"companies",   label:"Companies",      icon:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"},
    {key:"startups",    label:"Startups",       icon:"M13 10V3L4 14h7v7l9-11h-7z"},
    {key:"aiTools",     label:"AI Tools",       icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
    {key:"certifications",label:"Certifications",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},
    {key:"resumeModels",label:"Resume Models",  icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
    {key:"careerPath",  label:"Career Path",    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},
    {key:"settings",    label:"Settings",       icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"},
  ];

  const makeSecProps = key => ({
    items: key==="companies" ? coData : (secData[key]||[]),
    setItems: key==="companies"
      ? setCoData
      : (fn => setSecData(p => ({ ...p, [key]: typeof fn==="function" ? fn(p[key]||[]) : fn }))),
  });

  const renderMain = () => {
    if (nav==="overview") return (
      <div className="admin-section">
        <div style={{marginBottom:24,borderBottom:"1px solid var(--border)",paddingBottom:20}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Admin Control Centre</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Owner-only portal. All changes sync to user view in real-time.</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[["Companies",coData.length,"#0097b2"],["Startups",(secData.startups||[]).length,"#F59E0B"],["AI Tools",(secData.aiTools||[]).length,"#7ed957"],["Certifications",(secData.certifications||[]).length,"#006d82"],["Resume Models",(secData.resumeModels||[]).length,"#F43F5E"],["Career Paths",(secData.careerPath||[]).length,"#10B981"]].map(([l,v,c])=>(
            <div key={l} style={{padding:"16px 18px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,borderLeft:`3px solid ${c}`,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c+"40";e.currentTarget.style.background="var(--hover)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--card)";}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontSize:32,fontWeight:800,color:c,lineHeight:1,letterSpacing:"-0.5px"}}>{v}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginTop:4,letterSpacing:".12em",textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{padding:18,background:"rgba(0,151,178,.05)",border:"1px solid rgba(0,151,178,.2)",borderLeft:"3px solid var(--indigo)",borderRadius:12}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"var(--indigo)",letterSpacing:".15em",marginBottom:8}}>HOW IT WORKS</div>
          <ul style={{fontSize:12,color:"var(--text2)",lineHeight:2.1,paddingLeft:16}}>
            <li>Only you (owner) can add, edit or delete data in any section</li>
            <li>Use <strong style={{color:"var(--text)"}}>Quick Add ⚡</strong> to add items to any section with one AI call</li>
            <li>All changes sync instantly to the user-facing portal</li>
            <li>Toggle section visibility in Settings</li>
          </ul>
        </div>
      </div>
    );

    if (nav==="quickAdd") return (
      <div className="admin-section">
        <div style={{marginBottom:22,borderBottom:"1px solid var(--border)",paddingBottom:18}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Quick Add with AI ⚡</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Select a section · type a name · AI fills every field · review and save to the platform.</div>
        </div>
        <AdminQuickAddPanel coData={coData} setCoData={setCoData} secData={secData} setSecData={setSecData}/>
      </div>
    );

    if (nav==="settings") return (
      <div className="admin-section">
        <div style={{marginBottom:22,borderBottom:"1px solid var(--border)",paddingBottom:18}}>
          <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:"var(--text)",marginBottom:4}}>Settings</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Control which sections are visible to users.</div>
        </div>

        {/* Data persistence notice */}
        <div style={{marginBottom:18,padding:16,background:"rgba(16,185,129,.06)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,borderLeft:"3px solid #10B981"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px rgba(16,185,129,.7)"}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,color:"#10B981",letterSpacing:".12em"}}>AUTO-SAVE ACTIVE</span>
          </div>
          <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,margin:0}}>
            All your data is automatically saved to this browser's localStorage. Your entries persist across reloads and code updates. Use <strong style={{color:"var(--text)"}}>Export Backup</strong> in the sidebar to save a .json file as a permanent backup.
          </p>
        </div>

        {/* Section visibility toggles */}
        <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--text3)",letterSpacing:".14em",marginBottom:10,textTransform:"uppercase"}}>Section Visibility</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {[{key:"aiTools",label:"AI Tools",col:"#7ed957"},{key:"certifications",label:"Certifications",col:"#006d82"},{key:"companies",label:"Companies",col:"#0097b2"},{key:"startups",label:"Startups",col:"#F59E0B"},{key:"resumeModels",label:"Resume Models",col:"#F43F5E"},{key:"careerPath",label:"Career Path",col:"#10B981"}].map(({key,label,col})=>(
            <div key={key} className="admin-row" style={{borderRadius:10,background:"var(--card)",border:`1px solid var(--border)`,borderLeft:`3px solid ${settings[key]!==false?col:"var(--border2)"}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:2}}>{label}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:".12em",color:settings[key]!==false?col:"var(--text3)"}}>{settings[key]!==false?"VISIBLE TO USERS":"HIDDEN FROM USERS"}</div>
              </div>
              <button className={`tog ${settings[key]!==false?"on":"off"}`} onClick={()=>setSettings(s=>({...s,[key]:s[key]===false?true:false}))}/>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div style={{padding:18,background:"rgba(244,63,94,.05)",border:"1px solid rgba(244,63,94,.2)",borderRadius:12}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F43F5E",letterSpacing:".14em",marginBottom:10,textTransform:"uppercase"}}>⚠ Danger Zone</div>
          <div style={{fontSize:12,color:"var(--text2)",marginBottom:14,lineHeight:1.6}}>
            Permanently erase all data from all sections. This cannot be undone. Export a backup first.
          </div>
          <button
            className="btn btn-sm"
            style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.3)",fontSize:12,padding:"8px 16px"}}
            onClick={()=>{
              if(window.confirm("Are you sure? This will delete ALL data from all sections. Make sure you have a backup.")) {
                setCoData([]);
                setSecData({aiTools:[],certifications:[],startups:[],resumeModels:[],careerPath:[]});
                alert("All data cleared.");
              }
            }}>
            Clear All Data
          </button>
        </div>
      </div>
    );

    // Data sections — show items list with edit/delete
    const dataSections = {
      companies: {label:"Companies",items:coData,setItems:setCoData,aiType:"company",color:"#C8FF00"},
      startups:  {label:"Startups",items:secData.startups||[],setItems:fn=>setSecData(p=>({...p,startups:typeof fn==="function"?fn(p.startups||[]):fn})),aiType:"startup",color:"#FF8C00"},
      aiTools:   {label:"AI Tools",items:secData.aiTools||[],setItems:fn=>setSecData(p=>({...p,aiTools:typeof fn==="function"?fn(p.aiTools||[]):fn})),aiType:"aiTool",color:"#3B82F6"},
      certifications:{label:"Certifications",items:secData.certifications||[],setItems:fn=>setSecData(p=>({...p,certifications:typeof fn==="function"?fn(p.certifications||[]):fn})),aiType:"certification",color:"#A855F7"},
      resumeModels:{label:"Resume Models",items:secData.resumeModels||[],setItems:fn=>setSecData(p=>({...p,resumeModels:typeof fn==="function"?fn(p.resumeModels||[]):fn})),aiType:"resumeModel",color:"#FF3B3B"},
      careerPath:{label:"Career Path",items:secData.careerPath||[],setItems:fn=>setSecData(p=>({...p,careerPath:typeof fn==="function"?fn(p.careerPath||[]):fn})),aiType:"careerPath",color:"#C8FF00"},
    };

    const ds = dataSections[nav];
    if (!ds) return null;

    return (
      <div className="admin-section">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,borderBottom:"1px solid var(--border)",paddingBottom:16}}>
          <div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:20,color:"var(--text)"}}>{ds.label}</div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".1em",marginTop:3}}>{ds.items.length} ENTRIES · SYNCED TO USER VIEW IN REAL-TIME</div>
          </div>
          <button className="btn btn-cyan btn-sm" onClick={()=>setNav("quickAdd")}>Quick Add ⚡</button>
        </div>
        {ds.items.length===0 ? (
          <div style={{padding:"40px 0",textAlign:"center",color:"var(--text3)",fontFamily:"var(--font-mono)",fontSize:11}}>
            NO {ds.label.toUpperCase()} YET — use Quick Add ⚡ above
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {ds.items.map((item,i)=>(
              <div key={item.id||i} style={{padding:"12px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.background="var(--hover)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--card)";}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:2}}>{item.name}</div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".08em"}}>
                    {[item.stage,item.level,item.category,item.type,item.currentRole].filter(Boolean).slice(0,2).join(" · ")}
                    {[item.industry,item.provider,item.pricing,item.format].filter(Boolean).slice(0,1).map(v=>" · "+v)}
                  </div>
                </div>
                <button className="btn btn-sm" style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.25)",borderRadius:7}} onClick={()=>ds.setItems(p=>Array.isArray(p)?p.filter(x=>x.id!==item.id):p)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-head">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:8,height:8,borderRadius:2,background:"var(--indigo)",boxShadow:"0 0 8px rgba(0,151,178,.6)"}}/>
            <div style={{fontFamily:"var(--font-mono)",fontSize:8,fontWeight:700,letterSpacing:".18em",color:"var(--indigo)"}}>ADMIN PORTAL</div>
          </div>
          <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:15,lineHeight:1,color:"var(--text)"}}>TalentFlow AI</div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginTop:2,letterSpacing:".12em"}}>OWNER ACCESS</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
          {ADMIN_SECS.map(s=>(
            <button key={s.key} className={`admin-nav-item${nav===s.key?" active":""}`} onClick={()=>setNav(s.key)}>
              <Ico d={s.icon} s={12} c={nav===s.key?"var(--indigo)":"var(--text3)"}/>
              {s.label}
            </button>
          ))}
        </div>

        {/* Data persistence footer */}
        <div style={{padding:"12px 14px",borderTop:"1px solid var(--border)",flexShrink:0}}>
          {/* Storage indicator */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px rgba(16,185,129,.7)",flexShrink:0}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:8,color:"#10B981",letterSpacing:".12em",fontWeight:700}}>DATA AUTO-SAVED</span>
          </div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginBottom:10,lineHeight:1.6}}>
            {coData.length} companies · {(secData.startups||[]).length} startups · {(secData.aiTools||[]).length} AI tools · {(secData.certifications||[]).length} certs · {(secData.resumeModels||[]).length} resumes · {(secData.careerPath||[]).length} paths
          </div>
          {/* Backup / Restore */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <button
              className="btn btn-ghost btn-sm"
              style={{justifyContent:"flex-start",fontSize:10,gap:6,width:"100%"}}
              onClick={()=>{
                const backup = JSON.stringify({coData,secData,settings,exportedAt:new Date().toISOString()},null,2);
                const a = document.createElement("a");
                a.href = "data:application/json;charset=utf-8," + encodeURIComponent(backup);
                a.download = "talentflow_backup_"+Date.now()+".json";
                a.click();
              }}>
              <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" s={11} c="var(--indigo)"/>
              Export Backup
            </button>
            <label style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",
              borderRadius:7,border:"1px solid var(--border2)",cursor:"pointer",fontSize:10,
              fontFamily:"var(--font-body)",color:"var(--text3)",transition:"all .15s",
              background:"transparent"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.color="var(--text2)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--text3)";}}>
              <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" s={11} c="var(--text3)"/>
              Import Backup
              <input type="file" accept=".json" style={{display:"none"}}
                onChange={e=>{
                  const f = e.target.files[0]; if(!f) return;
                  const r = new FileReader();
                  r.onload = ev => {
                    try {
                      const d = JSON.parse(ev.target.result);
                      if(d.coData)   { setCoData(d.coData); }
                      if(d.secData)  { setSecData(d.secData); }
                      if(d.settings) { setSettings(d.settings); }
                      alert("✓ Backup restored successfully!");
                    } catch { alert("Invalid backup file."); }
                  };
                  r.readAsText(f);
                  e.target.value="";
                }}/>
            </label>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="admin-main">
        {renderMain()}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   ADMIN QUICK ADD PANEL — unified AI add for all sections
──────────────────────────────────────────────────── */
function AdminQuickAddPanel({ coData, setCoData, secData, setSecData }) {
  const SEC_KEYS = [
    {key:"company",      label:"Company",       color:"#0097b2"},
    {key:"startup",      label:"Startup",       color:"#F59E0B"},
    {key:"aiTool",       label:"AI Tool",       color:"#7ed957"},
    {key:"certification",label:"Certification", color:"#006d82"},
    {key:"resumeModel",  label:"Resume Model",  color:"#F43F5E"},
    {key:"careerPath",   label:"Career Path",   color:"#10B981"},
  ];
  const [secKey, setSecKey] = useState("company");
  const [form, setForm]     = useState({});
  const [saved, setSaved]   = useState(false);

  const handleAI = d => {
    const m = {};
    Object.keys(d).forEach(k => {
      if (d[k] !== undefined && d[k] !== null && d[k] !== "")
        m[k] = Array.isArray(d[k]) ? d[k].join(", ") : String(d[k]);
    });
    setForm(m); setSaved(false);
  };

  const saveItem = () => {
    if (!form.name?.trim()) { alert("Name is required"); return; }
    const arr = s => s ? s.split(",").map(x=>x.trim()).filter(Boolean) : [];
    const id = Date.now();
    if (secKey==="company") {
      const item = {...form, id,
        hiringTechnologies: arr(form.hiringTechnologies),
        notableProducts:    arr(form.notableProducts),
        careerBenefits:     arr(form.careerBenefits),
        tags:               arr(form.tags),
        matchScore:         Number(form.matchScore)||80
      };
      setCoData(p => [...p, item]);
    } else if (secKey==="startup") {
      setSecData(p => ({...p, startups: [...(p.startups||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="aiTool") {
      setSecData(p => ({...p, aiTools: [...(p.aiTools||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="certification") {
      setSecData(p => ({...p, certifications: [...(p.certifications||[]), {...form, id, demand: Number(form.demand)||70, tags: arr(form.tags)}]}));
    } else if (secKey==="resumeModel") {
      setSecData(p => ({...p, resumeModels: [...(p.resumeModels||[]), {...form, id, tags: arr(form.tags)}]}));
    } else if (secKey==="careerPath") {
      setSecData(p => ({...p, careerPath: [...(p.careerPath||[]), {...form, id, tags: arr(form.tags)}]}));
    }
    setSaved(true); setForm({});
    setTimeout(() => setSaved(false), 3000);
  };

  const activeColor = SEC_KEYS.find(s=>s.key===secKey)?.color || "#16A34A";

  const TEXTAREA_FIELDS = new Set(["description","milestones","tips","whyJoin","organizationStrength","futureDirection","coreStrength","skills"]);

  return (
    <div>
      {/* Section tabs */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {SEC_KEYS.map(s => (
          <button key={s.key}
            className={`sec-tab act-${s.key === secKey ? s.key : ""}`}
            style={{ borderColor: s.key === secKey ? s.color+"60" : "var(--border2)",
                     background: s.key === secKey ? s.color+"18" : "transparent",
                     color: s.key === secKey ? s.color : "var(--text3)" }}
            onClick={() => { setSecKey(s.key); setForm({}); setSaved(false); }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* AI Fetch — now with bulk text support */}
      <AISmartFetch sectionType={secKey} onData={handleAI} />

      {/* Auto-filled fields preview */}
      {Object.keys(form).length > 0 && (
        <div style={{ marginTop:16, padding:20, background:"var(--card)", border:"1px solid var(--border2)", borderRadius:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:activeColor, boxShadow:`0 0 8px ${activeColor}` }}/>
            <span style={{ fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,letterSpacing:".18em",color:activeColor,textTransform:"uppercase" }}>
              REVIEW & EDIT BEFORE SAVING
            </span>
            <span style={{ fontSize:11,color:"var(--text2)",marginLeft:4 }}>({Object.keys(form).filter(k=>form[k]).length} fields filled)</span>
          </div>
          <div className="fg fg2">
            {Object.keys(form).filter(k => form[k] !== "" && form[k] !== undefined).map(k => (
              <div key={k} className={TEXTAREA_FIELDS.has(k) ? "fspan" : ""}>
                <label style={{ display:"block", fontSize:11, fontWeight:600, color:"var(--text2)", marginBottom:5, fontFamily:"var(--font-body)", textTransform:"capitalize" }}>{k.replace(/([A-Z])/g," $1")}</label>
                {TEXTAREA_FIELDS.has(k)
                  ? <textarea className="inp fspan" rows={3} value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
                  : <input className="inp" value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
                }
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:16, alignItems:"center", borderTop:"1px solid var(--border)", paddingTop:16 }}>
            <button className="btn btn-cyan" onClick={saveItem} style={{ flex:1, justifyContent:"center", padding:"10px 0" }}>
              ✓ Save & Sync to Platform
            </button>
            <button className="btn btn-ghost" onClick={()=>{setForm({});setSaved(false);}}>Clear</button>
            {saved && (
              <div style={{ padding:"8px 14px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.25)", borderRadius:8, fontSize:12, fontWeight:700, color:"#10B981" }}>
                ✓ Saved! Now live in user portal.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* STARTUP CAROUSEL — swipeable stacked cards + depth */
/* Rich 8-palette cinematic gradients — each card unique */
const STARTUP_PALETTES = [
  { a:"rgba(0,212,255,0.38)",   b:"rgba(167,139,250,0.28)", c:"rgba(0,100,120,0.5)"  },
  { a:"rgba(245,158,11,0.42)",  b:"rgba(255,107,107,0.28)", c:"rgba(80,30,0,0.55)"   },
  { a:"rgba(184,255,94,0.32)",  b:"rgba(0,212,255,0.22)",   c:"rgba(20,60,10,0.5)"   },
  { a:"rgba(167,139,250,0.42)", b:"rgba(255,107,107,0.28)", c:"rgba(40,10,80,0.55)"  },
  { a:"rgba(255,107,107,0.38)", b:"rgba(245,158,11,0.28)",  c:"rgba(80,0,0,0.5)"     },
  { a:"rgba(0,212,255,0.32)",   b:"rgba(184,255,94,0.22)",  c:"rgba(0,40,80,0.5)"    },
  { a:"rgba(245,158,11,0.38)",  b:"rgba(167,139,250,0.28)", c:"rgba(50,20,0,0.5)"    },
  { a:"rgba(184,255,94,0.36)",  b:"rgba(255,107,107,0.22)", c:"rgba(10,50,0,0.55)"   },
];
const STAGECOL = {"Pre-seed":"#5dd3e8","Seed":"#F59E0B","Series A":"#7ed957","Series B":"#5dd3e8","Series C+":"#B8FF5E","Growth":"#B8FF5E"};

function StartupCard({ item, idx, offset, total, isLeaving, enterDir, onSwipe }) {
  const pal  = STARTUP_PALETTES[idx % STARTUP_PALETTES.length];
  const sc   = STAGECOL[item.stage] || "#F59E0B";
  const drag = useRef({ x:0, touchX:0, active:false });

  /* Depth stack transform — cards behind shrink + shift up */
  const scl = 1 - offset * 0.052;
  const ty  = -offset * 16;
  const rot = offset === 0 ? 0 : offset === 1 ? -1.5 : -2.8;  // subtle tilt for depth
  const op  = offset === 0 ? 1 : offset === 1 ? 0.68 : 0.42;

  let animCls = "";
  if (isLeaving === "left")              animCls = "su-exit-l";
  if (isLeaving === "right")             animCls = "su-exit-r";
  if (offset === 0 && enterDir === "right") animCls = "su-enter";
  if (offset === 0 && enterDir === "left")  animCls = "su-enter-l";

  /* Mouse + touch drag handling */
  const startDrag = (clientX) => {
    if (offset !== 0) return;
    drag.current = { x: clientX, active: true };
    const onEnd = (ev) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      const dx = (ev.clientX ?? ev.changedTouches?.[0]?.clientX ?? drag.current.x) - drag.current.x;
      if (Math.abs(dx) > 44) onSwipe(dx < 0 ? "left" : "right");
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  };

  return (
    <div
      className={`su-card ${animCls}`}
      onMouseDown={e => startDrag(e.clientX)}
      onTouchStart={e => startDrag(e.touches[0].clientX)}
      style={{
        transform: animCls ? undefined : `translateY(${ty}px) scale(${scl}) rotate(${rot}deg)`,
        opacity: op,
        zIndex: total - offset,
        pointerEvents: offset === 0 ? "auto" : "none",
        boxShadow: offset === 0
          ? `0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07), 0 0 60px ${pal.a}`
          : "0 8px 28px rgba(0,0,0,0.45)",
      }}
    >
      {/* ── Layer 1: Rich background gradient (simulated photo backdrop) ── */}
      <div className="su-bg" style={{
        background:`
          radial-gradient(ellipse at 18% 20%, ${pal.a} 0%, transparent 52%),
          radial-gradient(ellipse at 82% 78%, ${pal.b} 0%, transparent 52%),
          radial-gradient(ellipse at 50% 0%,  ${pal.c} 0%, transparent 70%),
          linear-gradient(158deg, #0C0E1A 0%, #111525 50%, #090B12 100%)
        `
      }} />

      {/* ── Layer 2: Diagonal grid (subtle depth texture) ── */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, opacity:0.055, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
        backgroundSize:"40px 40px"
      }} />

      {/* ── Layer 3: Multi-stop cinematic image overlay ── */}
      <div className="su-overlay" />

      {/* ── Layer 4: Diagonal specular shine (glassmorphism) ── */}
      {offset === 0 && <div className="su-shine" />}

      {/* ── Layer 5: Coloured glow strip at bottom edge ── */}
      {offset === 0 && (
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"60%", zIndex:2, pointerEvents:"none",
          background:`linear-gradient(to top, ${sc}28 0%, transparent 100%)`,
          borderRadius:"0 0 26px 26px"
        }} />
      )}

      {/* ── Top row: Stage badge + equity ── */}
      <div className="su-top">
        <span className="tag" style={{
          background:`${sc}22`, color:sc, border:`1px solid ${sc}55`,
          backdropFilter:"blur(10px)", fontSize:9, letterSpacing:"0.12em"
        }}>{item.stage || "Startup"}</span>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
          {item.equity && (
            <span style={{
              fontSize:10, color:"#B8FF5E", fontWeight:700, fontFamily:"DM Mono",
              background:"rgba(184,255,94,0.1)", border:"1px solid rgba(184,255,94,0.35)",
              padding:"3px 9px", borderRadius:6, backdropFilter:"blur(8px)"
            }}>{item.equity}</span>
          )}
          {item.headcount && (
            <span className="su-counter">{item.headcount}</span>
          )}
        </div>
      </div>

      {/* ── Body: bottom content block ── */}
      <div className="su-body">
        {/* Company avatar */}
        <div style={{
          width:46, height:46, borderRadius:13,
          background:`linear-gradient(135deg, ${sc}45, ${sc}14)`,
          border:`1.5px solid ${sc}60`,
          display:"flex", alignItems:"center", justifyContent:"center",
          marginBottom:10, backdropFilter:"blur(12px)",
          boxShadow:`0 0 24px ${sc}30`
        }}>
          <span className="f-display" style={{ fontSize:20, color:sc, fontWeight:700 }}>
            {(item.name || "S")[0]}
          </span>
        </div>

        {/* Name */}
        <div className="f-display" style={{
          fontSize:22, color:"#fff", fontWeight:700, letterSpacing:-0.6,
          marginBottom:2, lineHeight:1.1,
          textShadow:`0 2px 20px rgba(0,0,0,0.7), 0 0 40px ${sc}25`
        }}>{item.name}</div>

        {/* Meta row */}
        <div className="f-mono" style={{
          fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:"0.14em", marginBottom:10
        }}>
          {[item.industry, item.founded && `EST. ${item.founded}`].filter(Boolean).join(" · ")}
        </div>

        {/* Description */}
        {item.description && (
          <p style={{
            fontSize:11, color:"rgba(255,255,255,0.52)", lineHeight:1.65, marginBottom:10,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
          }}>{item.description}</p>
        )}

        {/* Tech pills */}
        {item.technologies && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:13 }}>
            {item.technologies.split(",").slice(0,4).map((t,i) => (
              <span key={i} style={{
                padding:"2px 8px",
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:4, fontSize:9, color:"rgba(255,255,255,0.6)",
                fontFamily:"DM Mono", backdropFilter:"blur(6px)"
              }}>{t.trim()}</span>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {item.jobsUrl && (
            <a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" style={{
              padding:"8px 15px", background:sc, color:"#0D0F14",
              borderRadius:8, fontSize:10, fontWeight:700, fontFamily:"Outfit",
              textDecoration:"none", boxShadow:`0 0 20px ${sc}50`
            }}>View Jobs →</a>
          )}
          {item.linkedinUrl && (
            <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{
              padding:"8px 12px",
              background:"rgba(255,255,255,0.06)",
              color:"rgba(255,255,255,0.72)",
              border:"1px solid rgba(255,255,255,0.12)",
              borderRadius:8, fontSize:10, fontFamily:"Outfit", textDecoration:"none",
              backdropFilter:"blur(8px)"
            }}>LinkedIn</a>
          )}
          {offset === 0 && (
            <span style={{ marginLeft:"auto", fontSize:8, color:"rgba(255,255,255,0.2)", fontFamily:"DM Mono", letterSpacing:"0.08em" }}>
              ← swipe →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function StartupsCarousel({ isOwner, items, setItems }) {
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected,setSelected]= useState(null);

  const STAGE_C={"Pre-Seed":"#F43F5E","Seed":"#F59E0B","Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981","Public":"#0097b2"};
  const STAGE_G={"Pre-Seed":"linear-gradient(135deg,#F43F5E,#EC4899)","Seed":"linear-gradient(135deg,#F59E0B,#F43F5E)","Series A":"linear-gradient(135deg,#0097b2,#7ed957)","Series B":"linear-gradient(135deg,#006d82,#EC4899)","Series C+":"linear-gradient(135deg,#7ed957,#0097b2)","Growth":"linear-gradient(135deg,#10B981,#7ed957)","Public":"linear-gradient(135deg,#0097b2,#7ed957)"};

  const filtered = items.filter(it=>!search||[it.name,it.industry,it.stage,it.description].some(v=>(v||"").toLowerCase().includes(search.toLowerCase())));

  const handleSave = s => {
    setItems(prev=>editing?prev.map(x=>x.id===s.id?s:x):[...prev,s]);
    setModal(false); setEditing(null);
  };

  // ── Detail view ──
  if(selected) return(
    <div style={{height:"100%",overflowY:"auto",padding:"0 4px 32px"}} className="scrollbar">
      <button className="btn btn-ghost" onClick={()=>setSelected(null)} style={{marginBottom:20,gap:6,fontSize:13}}>
        <Ico d="M19 12H5M12 5l-7 7 7 7" s={13}/> Back to Startups
      </button>
      {/* Hero */}
      {(()=>{
        const sc=STAGE_C[selected.stage]||"#F59E0B";
        const gr=STAGE_G[selected.stage]||"linear-gradient(135deg,#F59E0B,#F43F5E)";
        return(
          <div>
            <div style={{height:4,background:gr,borderRadius:"4px 4px 0 0"}}/>
            <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"0 0 16px 16px",padding:28,marginBottom:16}}>
              <div style={{display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{width:68,height:68,borderRadius:16,background:gr,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:30,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 8px 28px ${sc}50`}}>
                  {(selected.name||"?")[0].toUpperCase()}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"#EDF0F7",letterSpacing:"-0.5px",marginBottom:5}}>{selected.name}</div>
                  <div style={{fontSize:14,color:"#A0A8BB",marginBottom:12}}>{selected.industry}{selected.founded?` · Est. ${selected.founded}`:""}{selected.headcount?` · ${selected.headcount} employees`:""}</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:`${sc}20`,color:sc,border:`1px solid ${sc}40`}}>{selected.stage}</span>
                    {selected.equity&&<span style={{padding:"5px 14px",borderRadius:20,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.12)",color:"#10B981",border:"1px solid rgba(16,185,129,.25)"}}>💰 Equity {selected.equity}</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap"}}>
                  {selected.linkedinUrl&&<a href={selected.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:10,background:"rgba(10,102,194,.15)",border:"1px solid rgba(10,102,194,.3)",color:"#5B9BD5",textDecoration:"none",fontSize:13,fontWeight:700}}>LinkedIn</a>}
                  {selected.websiteUrl&&<a href={selected.websiteUrl} target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,.07)",border:"1px solid var(--border2)",color:"var(--text)",textDecoration:"none",fontSize:13,fontWeight:700}}>Website</a>}
                  {selected.jobsUrl&&<a href={selected.jobsUrl} target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:10,background:`${sc}18`,border:`1px solid ${sc}35`,color:sc,textDecoration:"none",fontSize:13,fontWeight:700}}>View Jobs ↗</a>}
                </div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:14}}>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {selected.description&&<div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderLeft:`3px solid ${sc}`}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:sc,letterSpacing:".15em",marginBottom:10}}>ABOUT</div>
                  <p style={{fontSize:14,lineHeight:1.75,color:"#C4C9D6"}}>{selected.description}</p>
                </div>}
                {selected.whyJoin&&<div style={{padding:20,background:"rgba(16,185,129,.05)",border:"1px solid rgba(16,185,129,.2)",borderRadius:14}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".15em",marginBottom:10}}>WHY JOIN?</div>
                  <p style={{fontSize:14,lineHeight:1.75,color:"#C4C9D6"}}>{selected.whyJoin}</p>
                </div>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {selected.technologies&&<div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#7ed957",letterSpacing:".15em",marginBottom:10}}>TECH STACK</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {selected.technologies.split(",").map((t,i)=><span key={i} style={{padding:"5px 12px",borderRadius:8,fontSize:13,background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)"}}>{t.trim()}</span>)}
                  </div>
                </div>}
                {selected.tags?.length>0&&<div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",letterSpacing:".15em",marginBottom:10}}>TAGS</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {selected.tags.map((t,i)=><span key={i} style={{padding:"4px 10px",borderRadius:20,fontSize:12,background:"rgba(255,255,255,.05)",color:"#8B93A6",border:"1px solid var(--border2)"}}>{t}</span>)}
                  </div>
                </div>}
                {isOwner&&<div style={{display:"flex",gap:8}}>
                  <button className="btn btn-ghost" onClick={()=>{setEditing(selected);setModal(true);setSelected(null);}}>Edit</button>
                  <button className="btn btn-sm" style={{background:"rgba(244,63,94,.1)",color:"#F43F5E",border:"1px solid rgba(244,63,94,.2)"}} onClick={()=>{setItems(p=>p.filter(x=>x.id!==selected.id));setSelected(null);}}>Delete</button>
                </div>}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );

  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {modal&&<StartupModal existing={editing} onSave={handleSave} onClose={()=>{setModal(false);setEditing(null);}}/>}

      {/* ── WORLD CONNECTIVITY BANNER ── */}
      <div style={{
        width:"100%", height:180, borderRadius:14, overflow:"hidden",
        position:"relative", flexShrink:0, marginBottom:16,
      }}>
        <img src="data:image/jpeg;base64,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"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%" }}
          alt="Global Startup Network"/>
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to bottom, rgba(2,8,14,.25) 0%, rgba(2,8,14,.6) 100%)",
        }}/>
        <div style={{ position:"absolute", bottom:16, left:20 }}>
          <div style={{ fontFamily:"Calibri,Candara,Segoe UI,sans-serif", fontWeight:700,
            fontSize:22, color:"#fff", letterSpacing:"-.3px",
            textShadow:"0 2px 12px rgba(0,0,0,.8)", marginBottom:3 }}>
            Global Startup Ecosystem
          </div>
          <div style={{ fontFamily:"Calibri,Candara,Segoe UI,sans-serif", fontSize:11,
            color:"#0097b2", letterSpacing:".18em", textTransform:"uppercase" }}>
            Discover · Connect · Join
          </div>
        </div>
      </div>
      {/* Header */}
      <div style={{flexShrink:0,marginBottom:16}}>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search startups by name, stage, industry…"/>
          <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:"auto"}}>
            <span style={{fontSize:13,color:"var(--text3)"}}>{filtered.length} startups</span>
            {isOwner&&<button className="btn btn-amber" onClick={()=>{setEditing(null);setModal(true);}}>+ Add Startup</button>}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length===0?(
        <div className="empty">
          <div style={{width:52,height:52,borderRadius:14,background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico d="M13 10V3L4 14h7v7l9-11h-7z" s={22} c="#F59E0B"/></div>
          <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontSize:18,color:"var(--cream)",fontWeight:700}}>{isOwner?"No startups yet":"No startups available"}</div>
          <p style={{fontSize:13,maxWidth:280,lineHeight:1.6,color:"var(--muted)"}}>{isOwner?"Type a startup name — AI fills the full profile.":"Check back soon."}</p>
          {isOwner&&<button className="btn btn-amber" onClick={()=>{setEditing(null);setModal(true);}}>+ Add First Startup</button>}
        </div>
      ):(
        <div style={{overflowY:"auto",flex:1,paddingRight:4}} className="scrollbar">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14,paddingBottom:24}}>
            {filtered.map((item,i)=>{
              const sc=STAGE_C[item.stage]||"#F59E0B";
              const gr=STAGE_G[item.stage]||"linear-gradient(135deg,#F59E0B,#F43F5E)";
              return(
                <div key={item.id||i} onClick={()=>setSelected(item)}
                  style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all .22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${sc}45`;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 12px 36px rgba(0,0,0,.45),0 0 0 1px ${sc}15`;}}
                  onMouseLeave={e=>{e.currentTarget.style.border="1px solid var(--border)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  {/* top bar */}
                  <div style={{height:4,background:gr}}/>
                  <div style={{padding:20}}>
                    {/* header */}
                    <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:14}}>
                      <div style={{width:52,height:52,borderRadius:14,background:gr,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:22,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,boxShadow:`0 4px 16px ${sc}40`}}>
                        {(item.name||"?")[0].toUpperCase()}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:17,color:"#EDF0F7",letterSpacing:"-.3px",marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                        <div style={{fontSize:13,color:"#A0A8BB",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.industry||"Technology"}{item.founded?` · Est. ${item.founded}`:""}</div>
                      </div>
                      <span style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,background:`${sc}20`,color:sc,border:`1px solid ${sc}40`,flexShrink:0,whiteSpace:"nowrap"}}>{item.stage||"Startup"}</span>
                    </div>
                    {/* description */}
                    <p style={{fontSize:14,color:"#C4C9D6",lineHeight:1.7,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                      {item.description||"No description available."}
                    </p>
                    {/* badges */}
                    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
                      {item.equity&&<span style={{padding:"4px 11px",borderRadius:8,fontSize:13,fontWeight:700,background:"rgba(16,185,129,.1)",color:"#10B981",border:"1px solid rgba(16,185,129,.22)"}}>💰 {item.equity}</span>}
                      {item.headcount&&<span style={{padding:"4px 11px",borderRadius:8,fontSize:13,background:"rgba(255,255,255,.06)",color:"#8B93A6",border:"1px solid rgba(255,255,255,.1)"}}>👥 {item.headcount}</span>}
                    </div>
                    {/* tech */}
                    {item.technologies&&(
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {item.technologies.split(",").slice(0,3).map((t,j)=><span key={j} style={{padding:"3px 10px",borderRadius:6,fontSize:12,background:"rgba(6,182,212,.08)",color:"#7ed957",border:"1px solid rgba(6,182,212,.18)"}}>{t.trim()}</span>)}
                      </div>
                    )}
                  </div>
                  {/* footer */}
                  <div style={{padding:"10px 20px 14px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,.12)"}}>
                    <div style={{display:"flex",gap:8}}>
                      {item.linkedinUrl&&<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:"rgba(10,102,194,.12)",border:"1px solid rgba(10,102,194,.25)",borderRadius:7,fontSize:12,color:"#5B9BD5",textDecoration:"none",fontWeight:600}}>LinkedIn</a>}
                      {item.jobsUrl&&<a href={item.jobsUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{padding:"5px 12px",background:`${sc}12`,border:`1px solid ${sc}28`,borderRadius:7,fontSize:12,color:sc,textDecoration:"none",fontWeight:700}}>View Jobs ↗</a>}
                    </div>
                    <span style={{fontSize:13,color:sc,fontWeight:700}}>Details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StartupModal({ existing, onSave, onClose }) {
  const blank={name:"",stage:"Seed",industry:"",founded:"",headcount:"",equity:"",description:"",whyJoin:"",technologies:"",linkedinUrl:"",websiteUrl:"",jobsUrl:"",tags:""};
  const toF=c=>({...c,technologies:Array.isArray(c.technologies)?c.technologies.join(", "):(c.technologies||""),tags:(c.tags||[]).join?.(", ")||(c.tags||"")});
  const [form,setForm]=useState(existing?toF(existing):blank);
  const F=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const handleAI=d=>setForm(p=>({...p,...d,technologies:Array.isArray(d.technologies)?d.technologies.join(", "):(d.technologies||p.technologies||""),tags:Array.isArray(d.tags)?d.tags.join(", "):(p.tags||"")}));
  const save=()=>{if(!form.name.trim())return;onSave({...form,id:existing?.id||Date.now(),tags:(form.tags||"").split(",").map(t=>t.trim()).filter(Boolean)});onClose();};
  return(
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div className="f-display" style={{fontSize:20,color:"var(--cream)"}}>{existing?"Edit Startup":"Add Startup"}</div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <AISmartFetch sectionType="startup" onData={handleAI}/>
        <div style={{height:1,background:"var(--line)",margin:"14px 0"}}/>
        <div className="fg fg2" style={{marginTop:12}}>
          <input className="inp" placeholder="Startup name *" value={form.name} onChange={F("name")}/>
          <select className="inp" value={form.stage} onChange={F("stage")}>{["Pre-seed","Seed","Series A","Series B","Series C+","Growth"].map(s=><option key={s}>{s}</option>)}</select>
          <input className="inp" placeholder="Industry" value={form.industry} onChange={F("industry")}/>
          <input className="inp" placeholder="Founded" value={form.founded} onChange={F("founded")}/>
          <input className="inp" placeholder="Headcount" value={form.headcount} onChange={F("headcount")}/>
          <input className="inp" placeholder="Equity (e.g. 0.2–0.5%)" value={form.equity} onChange={F("equity")}/>
          <input className="inp" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={F("linkedinUrl")}/>
          <input className="inp" placeholder="Jobs page URL" value={form.jobsUrl} onChange={F("jobsUrl")}/>
          <input className="inp fspan" placeholder="Technologies (comma sep.)" value={form.technologies} onChange={F("technologies")}/>
          <textarea className="inp fspan" placeholder="Description" rows={2} value={form.description} onChange={F("description")}/>
          <textarea className="inp fspan" placeholder="Why join?" rows={2} value={form.whyJoin} onChange={F("whyJoin")}/>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-amber" onClick={save}>{existing?"Save":"Add Startup"}</button>
        </div>
      </div>
    </div>
  );
}

/* CERT ROADMAP — horizontal progress nodes + badge */
const LVL_ORDER=["Beginner","Intermediate","Advanced","Expert","Professional"];
const LVL_COL={"Beginner":"#B8FF5E","Intermediate":"#7ed957","Advanced":"#5dd3e8","Expert":"#FF6B6B","Professional":"#F59E0B"};
const LVL_ICO={"Beginner":"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253","Intermediate":"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z","Advanced":"M13 10V3L4 14h7v7l9-11h-7z","Expert":"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z","Professional":"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"};

function CertRoadmap({ isOwner, items, setItems }) {
  const [hov,setHov]=useState(null);
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(false);
  const [editing,setEditing]=useState(null);

  const filtered=items.filter(it=>!search||[it.name,it.provider,it.level].some(v=>(v||"").toLowerCase().includes(search.toLowerCase())));
  const sorted=[...filtered].sort((a,b)=>(LVL_ORDER.indexOf(a.level)<0?99:LVL_ORDER.indexOf(a.level))-(LVL_ORDER.indexOf(b.level)<0?99:LVL_ORDER.indexOf(b.level)));

  const getState=(item,i)=>{
    if(item.status==="Hot"||item.status==="Popular") return "done";
    const firstAvail=sorted.findIndex(x=>x.status==="Available"||!x.status);
    if(i<firstAvail) return "done";
    if(i===firstAvail) return "active";
    return "locked";
  };

  const saveItem=c=>{setItems(i=>editing?i.map(x=>x.id===c.id?c:x):[...i,c]);setModal(false);setEditing(null);};

  if(sorted.length===0) return(
    <div className="rm-wrap">
      {modal&&<CertModal existing={editing} onSave={saveItem} onClose={()=>{setModal(false);setEditing(null);}}/>}
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}><SearchBar value={search} onChange={setSearch} placeholder="Search certifications..."/>{isOwner&&<button className="btn btn-violet" onClick={()=>{setEditing(null);setModal(true);}}>+ Add</button>}</div>
      <div className="empty">
        <div style={{width:52,height:52,borderRadius:14,background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" s={22} c="#5dd3e8"/></div>
        <div className="f-display" style={{fontSize:18,color:"var(--cream)"}}>{isOwner?"No certifications yet":"No certifications available"}</div>
        <p style={{fontSize:12,maxWidth:280,lineHeight:1.6,color:"var(--muted)"}}>{isOwner?"Type a cert name — AI fills everything.":"Check back soon."}</p>
        {isOwner&&<button className="btn btn-violet" onClick={()=>setModal(true)}>Add First Cert</button>}
      </div>
    </div>
  );

  const allDone=sorted.every((x,i)=>getState(x,i)==="done");

  return(
    <div className="rm-wrap">
      {modal&&<CertModal existing={editing} onSave={saveItem} onClose={()=>{setModal(false);setEditing(null);}}/>}

      {/* Header row */}
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10,flexShrink:0}}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search certifications..."/>
        {isOwner&&<button className="btn btn-violet btn-sm" onClick={()=>{setEditing(null);setModal(true);}}>+ Add</button>}
        <span className="f-mono" style={{fontSize:9,color:"var(--muted)",whiteSpace:"nowrap"}}>{sorted.length} milestones · hover to preview · scroll →</span>
      </div>

      {/* Legend */}
      <div style={{display:"flex",gap:18,marginBottom:14,flexShrink:0,flexWrap:"wrap",alignItems:"center"}}>
        {[["done","Completed","var(--cyan)"],["active","In Progress","var(--violet)"],["locked","Upcoming","rgba(255,255,255,0.2)"]].map(([s,l,c])=>(
          <div key={s} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{
              width:s==="active"?10:8, height:s==="active"?10:8, borderRadius:"50%",
              background:c, boxShadow:s==="active"?`0 0 8px ${c}`:s==="done"?`0 0 6px ${c}`:undefined
            }}/>
            <span className="f-mono" style={{fontSize:8,color:"var(--muted)",letterSpacing:"0.1em"}}>{l.toUpperCase()}</span>
          </div>
        ))}
        {/* Progress bar summary */}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:100,height:4,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden"}}>
            <div style={{
              height:"100%", borderRadius:2,
              background:"linear-gradient(90deg,var(--violet),var(--cyan))",
              width:`${Math.round((sorted.filter((_,i)=>getState(_,i)==="done").length/sorted.length)*100)}%`,
              transition:"width 1s ease"
            }}/>
          </div>
          <span className="f-mono" style={{fontSize:8,color:"var(--muted)",whiteSpace:"nowrap"}}>
            {sorted.filter((_,i)=>getState(_,i)==="done").length}/{sorted.length} done
          </span>
        </div>
      </div>

      <div className="rm-scroll">
        <div className="rm-track">
          {sorted.map((item,i)=>{
            const state  = getState(item,i);
            const col    = LVL_COL[item.level] || "#5dd3e8";
            const ico    = LVL_ICO[item.level] || LVL_ICO.Intermediate;
            const isHov  = hov === item.id;
            const connFill = state==="done" ? "100%" : state==="active" ? "55%" : "0%";
            const isLast = i === sorted.length-1;

            return (
              <React.Fragment key={item.id||i}>
                <div className="rm-node-col">
                  {/* Step number label above connector — shown on connector, not here */}

                  {/* The node circle */}
                  <div
                    className={`rm-node ${state}`}
                    style={{position:"relative"}}
                    onMouseEnter={()=>setHov(item.id)}
                    onMouseLeave={()=>setHov(null)}
                  >
                    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
                      stroke={state==="locked" ? "rgba(255,255,255,0.2)" : "#fff"}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ico}/>
                    </svg>

                    {/* Demand progress arc ring */}
                    {item.demand>0 && (
                      <svg style={{position:"absolute",inset:-6,width:"calc(100% + 12px)",height:"calc(100% + 12px)",pointerEvents:"none"}} viewBox="0 0 74 74">
                        <circle cx="37" cy="37" r="32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
                        <circle cx="37" cy="37" r="32" fill="none" stroke={col} strokeWidth="3" strokeLinecap="round"
                          strokeDasharray={`${(item.demand/100)*201} 201`}
                          strokeDashoffset="50" opacity="0.6"
                          style={{transition:"stroke-dasharray 1.4s cubic-bezier(0.4,0,0.2,1)"}}/>
                      </svg>
                    )}

                    {/* Step index badge */}
                    <div style={{
                      position:"absolute", top:-10, right:-10,
                      width:18, height:18, borderRadius:"50%",
                      background:state==="locked"?"rgba(255,255,255,0.06)":col,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:7, fontFamily:"DM Mono", fontWeight:700,
                      color:state==="locked"?"rgba(255,255,255,0.25)":state==="done"?"#000":"#fff",
                      boxShadow:state!=="locked"?`0 0 8px ${col}60`:undefined,
                      border:`1px solid ${state==="locked"?"rgba(255,255,255,0.08)":col+"60"}`,
                    }}>{i+1}</div>

                    {/* Hover popup — appears above node */}
                    {isHov && (
                      <div className="rm-popup">
                        <div className="f-mono" style={{fontSize:8,color:col,letterSpacing:"0.1em",marginBottom:4}}>
                          STEP {i+1} · {item.level||"CERT"}{item.provider&&` · ${item.provider}`}
                        </div>
                        <div className="f-display" style={{fontSize:13,color:"var(--cream)",marginBottom:6,lineHeight:1.25}}>{item.name}</div>
                        {item.duration&&<div className="f-mono" style={{fontSize:8,color:"var(--muted)",marginBottom:5}}>⏱ {item.duration}</div>}
                        {item.demand>0&&(
                          <div style={{marginBottom:8}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                              <span className="f-mono" style={{fontSize:7,color:"var(--muted)"}}>MARKET DEMAND</span>
                              <span className="f-mono" style={{fontSize:8,color:col,fontWeight:700}}>{item.demand}%</span>
                            </div>
                            <div className="track"><div className="fill" style={{width:`${item.demand}%`,background:`linear-gradient(90deg,${col},${col}88)`}}/></div>
                          </div>
                        )}
                        {item.description&&<p style={{fontSize:10,color:"var(--muted)",lineHeight:1.55,marginBottom:8}}>{item.description.slice(0,90)}{item.description.length>90?"…":""}</p>}
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          {item.link&&<a href={item.link} target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:col,fontFamily:"DM Mono",textDecoration:"none",padding:"3px 9px",background:`${col}15`,border:`1px solid ${col}35`,borderRadius:5}}>Enroll →</a>}
                          {isOwner&&<button className="btn btn-ghost btn-sm" style={{fontSize:9,padding:"3px 8px"}} onClick={e=>{e.stopPropagation();setEditing(item);setModal(true);}}>Edit</button>}
                          {isOwner&&<button className="btn btn-sm" style={{fontSize:9,padding:"3px 8px",background:"rgba(255,107,107,0.1)",color:"var(--coral)",border:"1px solid rgba(255,107,107,0.2)"}} onClick={e=>{e.stopPropagation();setItems(x=>x.filter(y=>y.id!==item.id));}}>Del</button>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Node label */}
                  <div className={`rm-label${state!=="locked"?" lit":""}`} style={{marginTop:10}}>
                    <div style={{marginBottom:3,fontSize:8}}>{item.name?.length>16?item.name.slice(0,15)+"…":item.name}</div>
                    <span style={{fontSize:7,padding:"1px 6px",borderRadius:8,background:`${col}18`,color:col,border:`1px solid ${col}30`,display:"inline-block",letterSpacing:"0.06em"}}>{item.level}</span>
                  </div>

                  {/* Milestone info card below label */}
                  <div className={`rm-info-card ${state}-card`} style={{marginTop:8}}>
                    <div className="f-mono" style={{fontSize:7,color:state==="locked"?"rgba(255,255,255,0.2)":col,marginBottom:4,letterSpacing:"0.1em"}}>
                      {state==="done"?"✓ COMPLETED":state==="active"?"▶ IN PROGRESS":"○ UPCOMING"}
                    </div>
                    {item.provider&&<div style={{fontSize:9,color:"var(--muted)",marginBottom:2,lineHeight:1.4}}>{item.provider}</div>}
                    {item.duration&&<div className="f-mono" style={{fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:3}}>⏱ {item.duration}</div>}
                    {item.demand>0&&(
                      <div>
                        <div className="track" style={{marginTop:4}}>
                          <div className="fill" style={{
                            width:state==="locked"?"0%":`${item.demand}%`,
                            background:state==="done"
                              ?"linear-gradient(90deg,var(--violet),var(--cyan))"
                              :state==="active"
                              ?col
                              :"rgba(255,255,255,0.15)",
                            transition:"width 1.5s ease"
                          }}/>
                        </div>
                        <div className="f-mono" style={{fontSize:7,color:state==="locked"?"rgba(255,255,255,0.15)":col,marginTop:3}}>{item.demand}% demand</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector between nodes */}
                {!isLast && (
                  <div className="rm-connector" style={{marginTop:29}}>
                    <div className="rm-conn-base"/>
                    <div className="rm-conn-fill" style={{width:connFill}}/>
                    {/* Step arrow */}
                    <div style={{
                      position:"absolute", top:"50%", left:"50%",
                      transform:"translate(-50%,-50%)",
                      width:14, height:14, borderRadius:"50%",
                      background:connFill==="0%"?"rgba(255,255,255,0.04)":"rgba(0,212,255,0.15)",
                      border:`1px solid ${connFill==="0%"?"rgba(255,255,255,0.06)":"rgba(0,212,255,0.3)"}`,
                      display:"flex", alignItems:"center", justifyContent:"center"
                    }}>
                      <svg width={6} height={6} viewBox="0 0 24 24" fill="none"
                        stroke={connFill==="0%"?"rgba(255,255,255,0.15)":"var(--cyan)"}
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                    {/* Step number on connector */}
                    <div className="rm-step-num">{i+1}→{i+2}</div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Final connector to badge */}
          <div className="rm-connector" style={{marginTop:29}}>
            <div className="rm-conn-base"/>
            <div className="rm-conn-fill" style={{width:allDone?"100%":"0%"}}/>
          </div>

          {/* Achievement badge */}
          <div className="rm-badge-col">
            <div className="rm-badge" title="Master Certification Badge">
              <svg width={76} height={76} viewBox="0 0 76 76" fill="none">
                <defs>
                  <radialGradient id="bg1" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FDE68A"/>
                    <stop offset="55%" stopColor="#F59E0B"/>
                    <stop offset="100%" stopColor="#B45309"/>
                  </radialGradient>
                  <radialGradient id="bg2" cx="45%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.4"/>
                  </radialGradient>
                </defs>
                {/* 16-ray burst */}
                {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((d,i)=>(
                  <ellipse key={i} cx="38" cy="38" rx="2.2" ry="6.5" fill="#F59E0B" opacity={0.32} transform={`rotate(${d} 38 38)`}/>
                ))}
                {/* Badge body */}
                <circle cx="38" cy="38" r="24" fill="url(#bg1)"/>
                <circle cx="38" cy="38" r="20" fill="none" stroke="#FEF3C7" strokeWidth="1" opacity="0.4"/>
                <circle cx="38" cy="38" r="17" fill="url(#bg2)"/>
                {/* Star */}
                <path d="M38 25.5l3 6.1 6.7.97-4.85 4.73 1.14 6.67L38 40.64l-6 2.95 1.14-6.67-4.85-4.73 6.7-.97z" fill="white" opacity="0.95"/>
                {/* MASTER text */}
                <text x="38" y="60" textAnchor="middle" fontFamily="DM Mono" fontSize="5" fill="#92400E" letterSpacing="2.2" fontWeight="700">MASTER</text>
              </svg>
            </div>
            <div className="rm-label lit" style={{marginTop:6,color:"var(--amber)",fontSize:8}}>Achievement</div>
            {allDone && (
              <div style={{marginTop:5,fontSize:8,color:"var(--lime)",fontFamily:"DM Mono",letterSpacing:"0.12em",textAlign:"center"}}>
                ✓ ALL DONE
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertModal({ existing, onSave, onClose }) {
  const blank={name:"",provider:"",level:"Intermediate",status:"Available",duration:"",demand:70,description:"",link:"",tags:""};
  const toF=c=>({...c,tags:(c.tags||[]).join?.(", ")||(c.tags||"")});
  const [form,setForm]=useState(existing?toF(existing):blank);
  const F=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const handleAI=d=>setForm(p=>({...p,...d,tags:Array.isArray(d.tags)?d.tags.join(", "):(p.tags||"")}));
  const save=()=>{if(!form.name.trim())return;onSave({...form,id:existing?.id||Date.now(),demand:Number(form.demand)||70,tags:(form.tags||"").split(",").map(t=>t.trim()).filter(Boolean)});onClose();};
  return(
    <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div className="f-display" style={{fontSize:20,color:"var(--cream)"}}>{existing?"Edit Certification":"Add Certification"}</div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <AISmartFetch sectionType="certification" onData={handleAI}/>
        <div style={{height:1,background:"var(--line)",margin:"14px 0"}}/>
        <div className="fg fg2" style={{marginTop:12}}>
          <input className="inp fspan" placeholder="Certification name *" value={form.name} onChange={F("name")}/>
          <input className="inp" placeholder="Provider (AWS, Google...)" value={form.provider} onChange={F("provider")}/>
          <select className="inp" value={form.level} onChange={F("level")}>{["Beginner","Intermediate","Advanced","Expert","Professional"].map(s=><option key={s}>{s}</option>)}</select>
          <select className="inp" value={form.status} onChange={F("status")}>{["Available","Popular","Hot","Coming Soon"].map(s=><option key={s}>{s}</option>)}</select>
          <input className="inp" placeholder="Duration" value={form.duration} onChange={F("duration")}/>
          <input className="inp" placeholder="Enroll URL" value={form.link} onChange={F("link")}/>
          <div className="fspan"><label style={{fontSize:11,color:"var(--muted)",display:"block",marginBottom:4}}>Market Demand: {form.demand}%</label><input type="range" min={0} max={100} value={form.demand} onChange={F("demand")} style={{width:"100%",accentColor:"var(--violet)"}}/></div>
          <textarea className="inp fspan" placeholder="Description" rows={2} value={form.description} onChange={F("description")}/>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-violet" onClick={save}>{existing?"Save":"Add Cert"}</button>
        </div>
      </div>
    </div>
  );
}

/* GLOBAL JOB SEARCH — AI-powered live job discovery */

const JOB_TYPES   = ["All","Full-Time","Part-Time","Contract","Remote","Hybrid","Internship"];
const JOB_LEVELS  = ["All","Entry","Mid","Senior","Lead","Director","VP","C-Level"];
const JOB_DOMAINS = ["All","Engineering","Product","Design","Data","Marketing","Sales","Finance","Operations","Legal","HR","Other"];

const SALARY_RANGES = [
  {label:"Any",    min:0,   max:999},
  {label:"$40k+",  min:40,  max:999},
  {label:"$80k+",  min:80,  max:999},
  {label:"$120k+", min:120, max:999},
  {label:"$160k+", min:160, max:999},
  {label:"$200k+", min:200, max:999},
];

// Pill component for filter chips
function FilterPill({ label, active, col, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 13px", borderRadius:20, fontSize:11, fontWeight:600,
      fontFamily:"var(--font-mono)", cursor:"pointer", border:"1px solid",
      transition:"all .15s", letterSpacing:".03em", textTransform:"uppercase",
      background: active ? col+"20" : "rgba(255,255,255,.04)",
      borderColor: active ? col+"50" : "var(--border2)",
      color: active ? col : "var(--text3)",
    }}>{label}</button>
  );
}

// Single job card
function JobCard({ job, onClick }) {
  const [hov, setHov] = useState(false);
  const TYPE_COL  = {"Full-Time":"#0097b2","Remote":"#10B981","Hybrid":"#7ed957","Contract":"#F59E0B","Part-Time":"#006d82","Internship":"#EC4899"};
  const LEVEL_COL = {"Entry":"#10B981","Mid":"#7ed957","Senior":"#0097b2","Lead":"#006d82","Director":"#F59E0B","VP":"#F43F5E","C-Level":"#EC4899"};
  const tc = TYPE_COL[job.type]  || "#0097b2";
  const lc = LEVEL_COL[job.level]|| "#7ed957";
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
            fontSize:20,fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,color:tc,
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
              <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:14,color:"#10B981",letterSpacing:"-.3px"}}>{job.salaryRange}</div>
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

// Job detail drawer
function JobDetail({ job, onClose }) {
  const TYPE_COL  = {"Full-Time":"#0097b2","Remote":"#10B981","Hybrid":"#7ed957","Contract":"#F59E0B","Part-Time":"#006d82","Internship":"#EC4899"};
  const LEVEL_COL = {"Entry":"#10B981","Mid":"#7ed957","Senior":"#0097b2","Lead":"#006d82","Director":"#F59E0B","VP":"#F43F5E","C-Level":"#EC4899"};
  const tc = TYPE_COL[job.type]  || "#0097b2";
  const lc = LEVEL_COL[job.level]|| "#7ed957";
  return (
    <div style={{position:"absolute",inset:0,zIndex:60,background:"var(--bg)",overflowY:"auto",animation:"fadeIn .22s ease"}}
      className="scrollbar">
      {/* Top accent line */}
      <div style={{height:4,background:`linear-gradient(90deg,${tc},${lc},#006d82)`}}/>

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
              fontSize:34,fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,color:tc,
              boxShadow:`0 8px 28px ${tc}35`,flexShrink:0}}>
              {(job.company||"?")[0]}
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:28,color:"var(--text)",
                letterSpacing:"-0.5px",lineHeight:1.1,marginBottom:6}}>{job.title}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--text2)",letterSpacing:".06em"}}>
                {job.company} · {job.location}
              </div>
              <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
                {[{v:job.type,c:tc},{v:job.level,c:lc},{v:job.domain,c:"#006d82"}].filter(x=>x.v).map((x,i)=>(
                  <span key={i} style={{padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,
                    fontFamily:"var(--font-mono)",background:`${x.c}18`,color:x.c,border:`1px solid ${x.c}30`,textTransform:"uppercase"}}>{x.v}</span>
                ))}
              </div>
            </div>
            <div style={{flexShrink:0,textAlign:"right"}}>
              {job.salaryRange && <>
                <div style={{fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:800,fontSize:26,color:"#10B981",letterSpacing:"-0.5px"}}>{job.salaryRange}</div>
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
            {l:"Team Size",  v:job.teamSize||"N/A",     c:"#006d82"},
            {l:"Visa Sponsor",v:job.visaSponsorship?"Yes":"Not mentioned", c:"#F59E0B"},
          ].map((s,i)=>(
            <div key={i} style={{padding:"14px 16px",background:"var(--card)",border:"1px solid var(--border)",
              borderRadius:12,borderTop:`2px solid ${s.c}`}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:6}}>{s.l}</div>
              <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:15,color:s.c}}>{s.v}</div>
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
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#0097b2",letterSpacing:".18em",marginBottom:12}}>RESPONSIBILITIES</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {job.responsibilities.map((r,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:20,height:20,borderRadius:6,background:"rgba(0,151,178,.15)",border:"1px solid rgba(0,151,178,.25)",
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                        <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#0097b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
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
              <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:"var(--text)",marginBottom:4}}>Ready to apply?</div>
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
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#7ed957",letterSpacing:".18em",marginBottom:10}}>REQUIRED SKILLS</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {job.skills.map((s,i)=>(
                    <span key={i} style={{padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:600,
                      background:"rgba(6,182,212,.1)",color:"#7ed957",border:"1px solid rgba(6,182,212,.2)",
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

/* ── GLOBAL JOB SEARCH ── */
function GlobalJobSearch() {
  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [selected,setSelected]= useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Filters
  const [filterType,   setFilterType]   = useState("All");
  const [filterLevel,  setFilterLevel]  = useState("All");
  const [filterDomain, setFilterDomain] = useState("All");
  const [filterSalary, setFilterSalary] = useState(0); // index into SALARY_RANGES
  const [sortBy,       setSortBy]       = useState("relevance"); // relevance | date | salary

  const searchJobs = async () => {
    if (!query.trim()) return;
    setLoading(true); setError(""); setResults([]); setHasSearched(true);

    const INDIA_JOB_KW=["bangalore","bengaluru","mumbai","delhi","hyderabad","chennai","pune","india","indian","inr","₹","tcs","infosys","wipro","flipkart","zomato","swiggy","razorpay","paytm","cred","freshworks","zoho","byju","ola","meesho","zepto","groww","phonepe","zerodha","naukri"];
    const isIndiaJob=INDIA_JOB_KW.some(k=>query.toLowerCase().includes(k));
    const prompt = `You are a ${isIndiaJob ? "India-focused job board" : "global job board"}. For the search: "${query}"
Output ONLY a raw JSON array of 8 job objects. No markdown, no extra text.
${isIndiaJob ? `IMPORTANT: ALL jobs must be India-based. Use:
- Indian companies: TCS, Infosys, Wipro, HCL, Tech Mahindra, Flipkart, Zomato, Swiggy, Ola, Paytm, Razorpay, CRED, Meesho, Freshworks, Zoho, PhonePe, Zerodha, Dream11, Nykaa, BigBasket, Byju's, Unacademy, Postman, Browserstack, Delhivery, Dunzo, ShareChat, InMobi, MakeMyTrip, Policybazaar
- Indian locations: Bangalore, Mumbai, Hyderabad, Delhi NCR, Pune, Chennai, Kolkata, Noida, Gurgaon, Ahmedabad, Jaipur, Kochi
- Salaries in INR LPA format like "12 LPA - 20 LPA" or "₹15L - ₹25L"
- India-relevant perks: health insurance, PF, gratuity, ESOPs, WFH policy, flexible hours` : "Use global companies and locations. Salaries in USD."}
[{"id":1,"title":"","company":"","location":"${isIndiaJob?"Bangalore, India":"San Francisco, USA"}","type":"Full-Time","level":"Mid","domain":"Engineering","salaryRange":"${isIndiaJob?"12 LPA - 20 LPA":"$120k-$150k"}","description":"","skills":["","","",""],"responsibilities":["","",""],"requirements":["",""],"perks":["","",""],"companyDescription":"","postedDaysAgo":2,"applicants":34,"experienceYears":3,"teamSize":"10 engineers","visaSponsorship":${isIndiaJob?false:true},"applyUrl":"https://careers.example.com"}]
Rules: type ∈ [Full-Time,Part-Time,Contract,Remote,Hybrid,Internship], level ∈ [Entry,Mid,Senior,Lead,Director], domain ∈ [Engineering,Product,Design,Data,Marketing,Sales,Finance,Operations,Legal,HR,Other], vary postedDaysAgo 0-21`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:6000,
          messages:[{role:"user",content:prompt}]
        })
      });
      if (!res.ok) {
        const errText = await res.text().catch(()=>"");
        throw new Error("API " + res.status + ": " + errText.slice(0,200));
      }
      const data = await res.json();
      const raw = (data.content?.[0]?.text || "").trim();
      const cleaned = raw.replace(/```json/gi,"").replace(/```/gi,"").trim();
      const fi = cleaned.indexOf("[");
      const li = cleaned.lastIndexOf("]");
      if (fi === -1 || li === -1) throw new Error("No JSON array in response: " + cleaned.slice(0,120));
      const jobs = JSON.parse(cleaned.slice(fi, li+1));
      if (!Array.isArray(jobs) || !jobs.length) throw new Error("Empty job list returned");
      setResults(jobs);
    } catch(e) {
      setError(String(e.message || e));
    }
    setLoading(false);
  };

  // Filtered + sorted results
  const salaryMin = SALARY_RANGES[filterSalary].min;
  const visible = results.filter(j=>{
    if (filterType!=="All"   && j.type  !==filterType)   return false;
    if (filterLevel!=="All"  && j.level !==filterLevel)  return false;
    if (filterDomain!=="All" && j.domain!==filterDomain) return false;
    if (filterSalary>0) {
      const sal = parseInt((j.salaryRange||"0").replace(/[^0-9]/g,""));
      if (sal < salaryMin*1000) return false;
    }
    return true;
  }).sort((a,b)=>{
    if (sortBy==="date")   return a.postedDaysAgo - b.postedDaysAgo;
    if (sortBy==="salary") {
      const sa = parseInt((a.salaryRange||"0").replace(/[^0-9]/g,"")||"0");
      const sb = parseInt((b.salaryRange||"0").replace(/[^0-9]/g,"")||"0");
      return sb - sa;
    }
    return 0; // relevance = AI order
  });

  const resetFilters = () => { setFilterType("All"); setFilterLevel("All"); setFilterDomain("All"); setFilterSalary(0); setSortBy("relevance"); };

  if (selected) return (
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
      <JobDetail job={selected} onClose={()=>setSelected(null)} />
    </div>
  );

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",gap:0,overflow:"hidden"}}>

      {/* ── SEARCH HEADER ── */}
      <div style={{flexShrink:0,padding:"0 0 16px",borderBottom:"1px solid var(--border)"}}>
        {/* Hero prompt */}
        {!hasSearched && (
          <div style={{textAlign:"center",padding:"20px 0 24px"}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--indigo)",letterSpacing:".2em",marginBottom:10,textTransform:"uppercase"}}>
              ⚡ AI-POWERED · GLOBAL JOB DISCOVERY
            </div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:8}}>
              Find Your Next Role
            </div>
            <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,maxWidth:440,margin:"0 auto 0"}}>
              Search millions of jobs worldwide. AI fetches real-time listings with full details — salary, skills, perks, and apply links.
            </p>
          </div>
        )}

        {/* Search box */}
        <div style={{display:"flex",gap:10,alignItems:"center",maxWidth:hasSearched?9999:600,margin:hasSearched?"0":"0 auto"}}>
          <div style={{position:"relative",flex:1}}>
            <svg style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}
              width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              value={query} onChange={e=>setQuery(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&searchJobs()}
              placeholder='e.g. "Senior React Engineer remote", "Product Manager fintech", "Data Scientist London"...'
              style={{
                width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",
                borderRadius:10,padding:"12px 14px 12px 44px",color:"var(--text)",fontSize:14,
                outline:"none",fontFamily:"var(--font-body)",transition:"all .18s",
              }}
              onFocus={e=>{e.target.style.borderColor="rgba(0,151,178,.5)";e.target.style.boxShadow="0 0 0 3px rgba(0,151,178,.1)";e.target.style.background="rgba(0,151,178,.04)";}}
              onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";e.target.style.background="rgba(255,255,255,.04)";}}
            />
          </div>
          <button onClick={searchJobs} disabled={loading||!query.trim()}
            style={{
              padding:"12px 24px",borderRadius:10,fontFamily:"var(--font-body)",fontWeight:700,
              fontSize:14,background:"linear-gradient(135deg,var(--indigo),var(--violet))",
              color:"#fff",border:"none",cursor:loading||!query.trim()?"not-allowed":"pointer",
              opacity:loading||!query.trim()?0.5:1,transition:"all .18s",flexShrink:0,
              boxShadow:loading||!query.trim()?"none":"0 4px 16px rgba(0,151,178,.4)",
              letterSpacing:"-.01em",
            }}
            onMouseEnter={e=>{if(!loading&&query.trim())e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>e.currentTarget.style.transform="none"}>
            {loading ? <><span className="ai-spin" style={{marginRight:6}}/>Searching…</> : "Search Jobs →"}
          </button>
        </div>

        {/* Quick search pills */}
        {!hasSearched && (
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginTop:16}}>
            {["Senior Frontend Engineer","Product Manager remote","Data Scientist","DevOps Engineer","UX Designer","ML Engineer","Full Stack Python","iOS Developer"].map(q=>(
              <button key={q} onClick={()=>{setQuery(q);}} style={{
                padding:"5px 14px",borderRadius:20,fontSize:11,fontFamily:"var(--font-mono)",
                background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",
                color:"var(--text2)",cursor:"pointer",transition:"all .15s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,151,178,.4)";e.currentTarget.style.color="var(--indigo)";e.currentTarget.style.background="rgba(0,151,178,.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border2)";e.currentTarget.style.color="var(--text2)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── FILTERS (shown only after search) ── */}
      {hasSearched && results.length>0 && (
        <div style={{flexShrink:0,padding:"12px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {/* Type */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {JOB_TYPES.map(t=><FilterPill key={t} label={t} active={filterType===t} col="#0097b2" onClick={()=>setFilterType(t)}/>)}
          </div>
          <div style={{width:1,height:20,background:"var(--border)",flexShrink:0}}/>
          {/* Level */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {JOB_LEVELS.slice(0,5).map(l=><FilterPill key={l} label={l} active={filterLevel===l} col="#7ed957" onClick={()=>setFilterLevel(l)}/>)}
          </div>
          <div style={{width:1,height:20,background:"var(--border)",flexShrink:0}}/>
          {/* Salary */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {SALARY_RANGES.map((s,i)=><FilterPill key={s.label} label={s.label} active={filterSalary===i} col="#10B981" onClick={()=>setFilterSalary(i)}/>)}
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
            {/* sort */}
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",borderRadius:8,
                padding:"5px 10px",color:"var(--text2)",fontSize:11,fontFamily:"var(--font-mono)",outline:"none",cursor:"pointer"}}>
              <option value="relevance">Relevance</option>
              <option value="date">Newest</option>
              <option value="salary">Salary ↓</option>
            </select>
            {/* count */}
            <span style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",whiteSpace:"nowrap"}}>
              {visible.length} / {results.length} jobs
            </span>
            {(filterType!=="All"||filterLevel!=="All"||filterDomain!=="All"||filterSalary>0) && (
              <button onClick={resetFilters} className="btn btn-ghost btn-sm" style={{fontSize:10}}>Clear filters</button>
            )}
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      <div style={{flex:1,overflowY:"auto",paddingTop:16}} className="scrollbar">

        {/* loading skeleton */}
        {loading && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
            {Array(6).fill(0).map((_,i)=>(
              <div key={i} style={{borderRadius:14,background:"var(--card)",border:"1px solid var(--border)",padding:20,
                animation:"pulse 1.4s ease-in-out infinite",animationDelay:`${i*0.1}s`}}>
                <div style={{display:"flex",gap:12,marginBottom:14}}>
                  <div style={{width:46,height:46,borderRadius:12,background:"rgba(255,255,255,.07)"}}/>
                  <div style={{flex:1}}>
                    <div style={{height:14,borderRadius:4,background:"rgba(255,255,255,.07)",marginBottom:8,width:"70%"}}/>
                    <div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",width:"50%"}}/>
                  </div>
                </div>
                <div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",marginBottom:8,width:"100%"}}/>
                <div style={{height:10,borderRadius:4,background:"rgba(255,255,255,.05)",width:"80%"}}/>
              </div>
            ))}
          </div>
        )}

        {/* error */}
        {error && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"60px 40px",textAlign:"center"}}>
            <div style={{width:54,height:54,borderRadius:14,background:"rgba(244,63,94,.1)",border:"1px solid rgba(244,63,94,.2)",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            </div>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:"var(--text)"}}>Search Failed</div>
            <div style={{fontSize:12,color:"var(--text2)",maxWidth:460,fontFamily:"var(--font-mono)",lineHeight:1.6,wordBreak:"break-all"}}>{error}</div>
            <button className="btn btn-cyan" onClick={searchJobs}>Try Again</button>
          </div>
        )}

        {/* empty after search */}
        {!loading && !error && hasSearched && visible.length===0 && results.length===0 && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"60px 40px",textAlign:"center"}}>
            <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:16,color:"var(--text)"}}>No results found</div>
            <div style={{fontSize:13,color:"var(--text2)"}}>Try a different search term</div>
          </div>
        )}

        {/* filtered empty */}
        {!loading && !error && hasSearched && visible.length===0 && results.length>0 && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,padding:"40px",textAlign:"center"}}>
            <div style={{fontSize:14,color:"var(--text2)"}}>No jobs match your current filters</div>
            <button className="btn btn-ghost" onClick={resetFilters}>Clear Filters</button>
          </div>
        )}

        {/* job grid */}
        {!loading && visible.length>0 && (
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14,paddingBottom:24}}>
              {visible.map((job,i)=>(
                <div key={job.id||i} className="anim-up" style={{animationDelay:`${i*30}ms`}}>
                  <JobCard job={job} onClick={()=>setSelected(job)} />
                </div>
              ))}
            </div>
            <div style={{padding:"16px 0 8px",textAlign:"center",fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text3)",borderTop:"1px solid var(--border)"}}>
              Showing {visible.length} AI-generated job listings for <strong style={{color:"var(--text2)"}}>{query}</strong> · Search again for fresh results
            </div>
          </>
        )}

        {/* pre-search empty state */}
        {!hasSearched && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,paddingTop:20}}>
            {/* feature highlights */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:700,width:"100%"}}>
              {[
                {icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",col:"#0097b2",title:"Global Reach",desc:"Jobs from 150+ countries, remote & on-site"},
                {icon:"M13 10V3L4 14h7v7l9-11h-7z",             col:"#10B981",title:"AI-Powered",desc:"Real salary data, skills match & perks"},
                {icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",col:"#F59E0B",title:"Full Detail",desc:"Responsibilities, requirements, company info"},
              ].map((f,i)=>(
                <div key={i} style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,textAlign:"center"}}>
                  <div style={{width:42,height:42,borderRadius:12,background:`${f.col}15`,border:`1px solid ${f.col}25`,
                    display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={f.col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon}/></svg>
                  </div>
                  <div style={{fontFamily:"var(--font-body)",fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:5}}>{f.title}</div>
                  <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.5}}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* SALARY CALCULATOR */
function SalaryCalculator() {
  const [role,setRole]=useState("");const [location,setLocation]=useState("India");
  // ── India detection ──
  const INDIA_CITIES = ["bangalore","bengaluru","mumbai","delhi","hyderabad","chennai","pune","kolkata","ahmedabad","jaipur","surat","lucknow","noida","gurgaon","gurugram","indore","chandigarh","coimbatore","kochi","nagpur","bhopal","vizag","visakhapatnam","thiruvananthapuram","mysuru","mysore","vadodara","patna","agra","nashik"];
  const INDIA_KEYWORDS = ["india","indian","rupee","inr","₹","iit","nit","infosys","wipro","tcs","hcl","tech mahindra","flipkart","zomato","swiggy","ola","paytm","razorpay","byju","freshdesk","zoho","mindtree","mphasis","l&t","reliance","hdfc","icici","axis bank","airtel","jio","naukri","linkedin india"];
  const isIndia = (q) => {
    const lower = (q||"").toLowerCase();
    return INDIA_CITIES.some(c => lower.includes(c)) || INDIA_KEYWORDS.some(k => lower.includes(k));
  };
const [experience,setExperience]=useState("Mid");const [industry,setIndustry]=useState("Technology");const [result,setResult]=useState(null);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
  const EXP_LEVELS=["Entry","Mid","Senior","Lead","Director","VP","C-Level"];
  const INDUSTRIES=["Technology","Finance","Healthcare","E-Commerce","Education","Media","Government","Consulting","Retail","Manufacturing"];
  const LOCATIONS=["India","United States","United Kingdom","Germany","Canada","Australia","Singapore","UAE","France","Netherlands","Remote (Global)"];
  const fmtSal=(n,lpa,sym)=>{
    if(lpa){
      const l=n/100000;
      return (sym||"₹")+(l>=1?l.toFixed(l%1===0?0:1)+" LPA":Math.round(n/1000)+"K");
    }
    return (sym||"$")+(n>=1000?(n/1000).toFixed(0)+"k":n);
  };
  const fmt=(n)=>fmtSal(n, result?.lpaMode, result?.currencySymbol);
  const calculate=async()=>{
    if(!role.trim())return;
    setLoading(true);setError("");setResult(null);
    const indiaMode = isIndia(location) || isIndia(role);
    const prompt=`You are a compensation expert specializing in ${indiaMode ? "Indian job market with INR salaries" : "global job market"}. Return ONLY raw JSON for: role "${role}", location "${location}", level "${experience}", industry "${industry}".
${indiaMode ? `IMPORTANT: This is for INDIA. Use INR (Indian Rupees). Salary values must be in INR (e.g. 800000 = 8 LPA, 2000000 = 20 LPA). Include Indian companies like TCS, Infosys, Wipro, Flipkart, Zomato, Razorpay, CRED, Swiggy, Freshworks, Zoho, Byju's etc. Top locations must be Indian cities like Bangalore, Mumbai, Hyderabad, Delhi NCR, Pune, Chennai. All context must be India-specific 2024-2025 market data.` : "Use USD. Include global top tech companies. Top locations must be global cities."}
Return ONLY this JSON: {"role":"","location":"","currency":"${indiaMode ? "INR" : "USD"}","currencySymbol":"${indiaMode ? "₹" : "$"}","lpaMode":${indiaMode},"baseSalary":{"min":${indiaMode ? 800000 : 80000},"median":${indiaMode ? 1500000 : 100000},"max":${indiaMode ? 2500000 : 130000}},"totalComp":{"min":${indiaMode ? 900000 : 90000},"median":${indiaMode ? 1800000 : 120000},"max":${indiaMode ? 3000000 : 160000}},"bonus":{"min":${indiaMode ? 50000 : 5000},"median":${indiaMode ? 150000 : 15000},"max":${indiaMode ? 400000 : 30000}},"equity":"${indiaMode ? "0.1%-0.5% ESOPs or ₹50k-₹5L" : "0.1%-0.5% RSU"}","topCompanies":[{"name":"Company","salary":"${indiaMode ? "₹X LPA - ₹Y LPA" : "$Xk-$Yk"}"}],"topLocations":[{"city":"City","premium":"+X%"}],"yoyGrowth":"8.5","demandLevel":"Very High","remoteImpact":"-5% to +10%","skills":["skill1","skill2","skill3","skill4"],"insight":"2024-2025 India market insight","negotiationTip":"India-specific negotiation tip"}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:prompt}]})});
      if(!res.ok)throw new Error("API "+res.status);
      const data=await res.json();
      const raw=(data.content?.[0]?.text||"").replace(/```json/gi,"").replace(/```/gi,"").trim();
      const fi=raw.indexOf("{"),li=raw.lastIndexOf("}");
      setResult(JSON.parse(raw.slice(fi,li+1)));
    }catch(e){setError(String(e.message));}
    setLoading(false);
  };
  return(
    <div style={{height:"100%",overflowY:"auto",paddingBottom:32}} className="scrollbar">
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981",letterSpacing:".2em",marginBottom:8}}>SALARY CALCULATOR · AI-POWERED</div>
        <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:6}}>Salary Calculator</div>
        <p style={{fontSize:13,color:"var(--text2)"}}>Get accurate salary ranges, total compensation, and market insights for any role worldwide.</p>
      </div>
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:24}}>
        <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:14}}>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>JOB TITLE *</div>
            <input value={role} onChange={e=>setRole(e.target.value)} onKeyDown={e=>e.key==="Enter"&&calculate()} placeholder="e.g. Senior Software Engineer, Product Manager..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",borderRadius:10,padding:"11px 14px",color:"var(--text)",fontSize:13,outline:"none",fontFamily:"var(--font-body)",boxSizing:"border-box"}} onFocus={e=>{e.target.style.borderColor="rgba(16,185,129,.5)";e.target.style.boxShadow="0 0 0 3px rgba(16,185,129,.1)";}} onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";}}/>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>LOCATION</div>
            <select value={location} onChange={e=>setLocation(e.target.value)} style={{width:"100%",background:"var(--panel)",border:"1px solid var(--border2)",borderRadius:10,padding:"11px 14px",color:"var(--text)",fontSize:13,outline:"none",cursor:"pointer"}}>
              {LOCATIONS.map(l=><option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>EXPERIENCE LEVEL</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {EXP_LEVELS.map(l=><button key={l} onClick={()=>setExperience(l)} style={{padding:"6px 12px",borderRadius:20,fontSize:10,fontWeight:600,fontFamily:"var(--font-mono)",cursor:"pointer",border:"1px solid",transition:"all .15s",background:experience===l?"rgba(16,185,129,.2)":"rgba(255,255,255,.04)",borderColor:experience===l?"rgba(16,185,129,.5)":"var(--border2)",color:experience===l?"#10B981":"var(--text3)"}}>{l}</button>)}
            </div>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>INDUSTRY</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {INDUSTRIES.map(i=><button key={i} onClick={()=>setIndustry(i)} style={{padding:"5px 12px",borderRadius:20,fontSize:10,fontFamily:"var(--font-mono)",cursor:"pointer",border:"1px solid",transition:"all .15s",background:industry===i?"rgba(0,151,178,.2)":"rgba(255,255,255,.04)",borderColor:industry===i?"rgba(0,151,178,.5)":"var(--border2)",color:industry===i?"#0097b2":"var(--text3)"}}>{i}</button>)}
            </div>
          </div>
        </div>
        <button onClick={calculate} disabled={loading||!role.trim()} style={{width:"100%",padding:"13px",borderRadius:10,fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#10B981,#7ed957)",color:"#fff",border:"none",cursor:loading||!role.trim()?"not-allowed":"pointer",opacity:loading||!role.trim()?0.5:1,boxShadow:"0 4px 20px rgba(16,185,129,.4)",transition:"all .2s"}}>{loading?"Calculating…":"Calculate Salary →"}</button>
        {error&&<div style={{marginTop:10,fontSize:11,color:"#F43F5E",fontFamily:"var(--font-mono)"}}>{error}</div>}
      </div>
      {result&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"linear-gradient(135deg,rgba(16,185,129,.08),rgba(6,182,212,.05))",border:"1px solid rgba(16,185,129,.25)",borderRadius:16,padding:24}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#10B981",letterSpacing:".18em",marginBottom:16}}>BASE SALARY · {(result.location||"").toUpperCase()}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
              {[{l:"Minimum",v:result.baseSalary?.min,c:"#F59E0B"},{l:"Median",v:result.baseSalary?.median,c:"#10B981"},{l:"Maximum",v:result.baseSalary?.max,c:"#7ed957"}].map((s,i)=>(
                <div key={i} style={{textAlign:"center",padding:"16px 12px",background:"rgba(0,0,0,.2)",borderRadius:12,border:`1px solid ${s.c}25`}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:"var(--text3)",marginBottom:6}}>{s.l}</div>
                  <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:24,color:s.c,letterSpacing:"-0.5px"}}>{fmt(s.v||0)}</div>
                </div>
              ))}
            </div>
            <div style={{height:8,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:4,background:"linear-gradient(90deg,#F59E0B,#10B981,#7ed957)",marginLeft:"10%",marginRight:"10%",transition:"all 1s"}}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[{l:"TOTAL COMPENSATION",v:`${fmt(result.totalComp?.min||0)} – ${fmt(result.totalComp?.max||0)}`,sub:"Includes base + bonus + equity",c:"#0097b2"},{l:"ANNUAL BONUS",v:`${fmt(result.bonus?.min||0)} – ${fmt(result.bonus?.max||0)}`,sub:"Performance based",c:"#F59E0B"},{l:"EQUITY / RSU",v:result.equity||"N/A",sub:"4-year vesting typical",c:"#006d82"},{l:"YOY GROWTH",v:`+${result.yoyGrowth||0}%`,sub:`Demand: ${result.demandLevel||"High"}`,c:"#10B981"}].map((s,i)=>(
              <div key={i} style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderTop:`2px solid ${s.c}`}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:8,color:s.c,letterSpacing:".15em",marginBottom:8}}>{s.l}</div>
                <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:700,fontSize:18,color:"var(--text)",marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:11,color:"var(--text2)"}}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#7ed957",letterSpacing:".15em",marginBottom:12}}>TOP PAYING COMPANIES</div>
              {(result.topCompanies||[]).map((c,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<(result.topCompanies.length-1)?"1px solid var(--border)":"none"}}>
                  <span style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{c.name}</span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:11,color:"#10B981"}}>{c.salary}</span>
                </div>
              ))}
            </div>
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F59E0B",letterSpacing:".15em",marginBottom:12}}>TOP LOCATIONS</div>
              {(result.topLocations||[]).map((l,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<(result.topLocations.length-1)?"1px solid var(--border)":"none"}}>
                  <span style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{l.city}</span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:11,color:"#F59E0B"}}>{l.premium}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderLeft:"3px solid #0097b2"}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#0097b2",letterSpacing:".15em",marginBottom:10}}>HIGH-VALUE SKILLS</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{(result.skills||[]).map((s,i)=><span key={i} style={{padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:600,background:"rgba(0,151,178,.12)",color:"#0097b2",border:"1px solid rgba(0,151,178,.25)",fontFamily:"var(--font-mono)"}}>{s}</span>)}</div>
            </div>
            <div style={{padding:18,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,borderLeft:"3px solid #10B981"}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#10B981",letterSpacing:".15em",marginBottom:10}}>NEGOTIATION TIP</div>
              <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.65,margin:0}}>{result.negotiationTip}</p>
            </div>
          </div>
          <div style={{padding:20,background:"rgba(0,151,178,.06)",border:"1px solid rgba(0,151,178,.2)",borderRadius:14}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#0097b2",letterSpacing:".15em",marginBottom:8}}>MARKET INSIGHT</div>
            <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,margin:0}}>{result.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* SKILL GAP ANALYZER */
function SkillGapAnalyzer() {
  const [targetRole,setTargetRole]=useState("");const [currentSkills,setCurrentSkills]=useState("");const [experience,setExperience]=useState("Mid");const [result,setResult]=useState(null);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
  const PRIORITY_COL={Critical:"#F43F5E",High:"#F59E0B",Medium:"#7ed957",Low:"#10B981"};
  const analyze=async()=>{
    if(!targetRole.trim()||!currentSkills.trim())return;
    setLoading(true);setError("");setResult(null);
    const INDIA_KW=["bangalore","bengaluru","mumbai","delhi","hyderabad","chennai","pune","india","iit","nit","tcs","infosys","wipro","flipkart","zomato","razorpay","cred","freshworks","zoho"];
    const isIndiaSkill=INDIA_KW.some(k=>(targetRole+currentSkills).toLowerCase().includes(k));
    const prompt=`Career skills expert${isIndiaSkill?" specializing in India job market (2024-2025)":""}. Return ONLY raw JSON for skill gap. Target: "${targetRole}", Skills: "${currentSkills}", Level: "${experience}".${isIndiaSkill?" Salary impact in INR LPA. Resources include Indian platforms like GeeksforGeeks, InterviewBit, Scaler, Coding Ninjas, NPTEL, Internshala. Companies should be Indian tech companies.":""} Format: {"matchScore":72,"readyIn":"3-6 months","insight":"assessment","salaryImpact":"${isIndiaSkill?"closing gaps increases salary by 5-10 LPA":"closing gaps increases salary by 20-35%"}","strengths":[{"skill":"React","level":90,"note":"Strong"}],"gaps":[{"skill":"TypeScript","priority":"Critical","timeToLearn":"2 weeks","resources":["Official docs","Udemy"]}],"learningPath":[{"week":"Week 1-2","focus":"Topic","action":"Action to take"}],"niceToHave":[{"skill":"GraphQL","reason":"Growing demand in India"}]}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3000,messages:[{role:"user",content:prompt}]})});
      if(!res.ok)throw new Error("API "+res.status);
      const data=await res.json();
      const raw=(data.content?.[0]?.text||"").replace(/```json/gi,"").replace(/```/gi,"").trim();
      const fi=raw.indexOf("{"),li=raw.lastIndexOf("}");
      setResult(JSON.parse(raw.slice(fi,li+1)));
    }catch(e){setError(String(e.message));}
    setLoading(false);
  };
  return(
    <div style={{height:"100%",overflowY:"auto",paddingBottom:32}} className="scrollbar">
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#006d82",letterSpacing:".2em",marginBottom:8}}>SKILL GAP ANALYZER · AI-POWERED</div>
        <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:28,color:"#F0F4FF",letterSpacing:"-0.8px",marginBottom:6}}>Skill Gap Analyzer</div>
        <p style={{fontSize:13,color:"var(--text2)"}}>Enter your target role and current skills — AI maps exactly what you need to learn and how long it will take.</p>
      </div>
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:24}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>TARGET ROLE *</div>
            <input value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="e.g. Senior React Engineer, ML Engineer at Google..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",borderRadius:10,padding:"11px 14px",color:"var(--text)",fontSize:13,outline:"none",fontFamily:"var(--font-body)",boxSizing:"border-box"}} onFocus={e=>{e.target.style.borderColor="rgba(0,109,130,.5)";e.target.style.boxShadow="0 0 0 3px rgba(0,109,130,.1)";}} onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";}}/>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>YOUR CURRENT SKILLS *</div>
            <textarea value={currentSkills} onChange={e=>setCurrentSkills(e.target.value)} rows={3} placeholder="e.g. React, JavaScript, CSS, Node.js, 2 years experience, built 3 web apps..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid var(--border2)",borderRadius:10,padding:"11px 14px",color:"var(--text)",fontSize:13,resize:"vertical",outline:"none",fontFamily:"var(--font-body)",boxSizing:"border-box"}} onFocus={e=>{e.target.style.borderColor="rgba(0,109,130,.5)";e.target.style.boxShadow="0 0 0 3px rgba(0,109,130,.1)";}} onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";}}/>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#6B7280",letterSpacing:".12em",marginBottom:6}}>EXPERIENCE LEVEL</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {["Entry","Mid","Senior","Lead"].map(l=><button key={l} onClick={()=>setExperience(l)} style={{padding:"6px 14px",borderRadius:20,fontSize:10,fontWeight:600,fontFamily:"var(--font-mono)",cursor:"pointer",border:"1px solid",transition:"all .15s",background:experience===l?"rgba(0,109,130,.2)":"rgba(255,255,255,.04)",borderColor:experience===l?"rgba(0,109,130,.5)":"var(--border2)",color:experience===l?"#006d82":"var(--text3)"}}>{l}</button>)}
            </div>
          </div>
        </div>
        <button onClick={analyze} disabled={loading||!targetRole.trim()||!currentSkills.trim()} style={{width:"100%",marginTop:16,padding:"13px",borderRadius:10,fontFamily:"var(--font-body)",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#006d82,#0097b2)",color:"#fff",border:"none",cursor:"pointer",opacity:loading||!targetRole.trim()||!currentSkills.trim()?0.5:1,boxShadow:"0 4px 20px rgba(0,109,130,.35)",transition:"all .2s"}}>{loading?"Analyzing your skills…":"Analyze Skill Gap →"}</button>
        {error&&<div style={{marginTop:10,fontSize:11,color:"#F43F5E",fontFamily:"var(--font-mono)"}}>{error}</div>}
      </div>
      {result&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"linear-gradient(135deg,rgba(0,109,130,.1),rgba(0,151,178,.06))",border:"1px solid rgba(0,109,130,.25)",borderRadius:16,padding:24,display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{position:"relative",width:100,height:100,flexShrink:0}}>
              <svg width={100} height={100} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke={result.matchScore>=75?"#10B981":result.matchScore>=50?"#F59E0B":"#F43F5E"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(result.matchScore/100)*264} 264`} strokeDashoffset="66" style={{transition:"stroke-dasharray 1.5s ease"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:22,color:result.matchScore>=75?"#10B981":result.matchScore>=50?"#F59E0B":"#F43F5E",letterSpacing:"-0.5px"}}>{result.matchScore}%</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:7,color:"var(--text3)"}}>MATCH</div>
              </div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Plus Jakarta Sans,var(--font-accent)",fontWeight:800,fontSize:20,color:"var(--text)",marginBottom:4}}>{result.matchScore>=75?"You are almost ready!":result.matchScore>=50?"Good foundation!":"Clear path ahead!"}</div>
              <div style={{fontSize:13,color:"var(--text2)",marginBottom:10}}>{result.insight}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <span style={{padding:"6px 14px",borderRadius:20,background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.25)",fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981"}}>Ready in: {result.readyIn}</span>
                <span style={{padding:"6px 14px",borderRadius:20,background:"rgba(0,151,178,.12)",border:"1px solid rgba(0,151,178,.25)",fontFamily:"var(--font-mono)",fontSize:10,color:"#0097b2"}}>{result.salaryImpact}</span>
              </div>
            </div>
          </div>
          {result.strengths?.length>0&&(
            <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#10B981",letterSpacing:".15em",marginBottom:14}}>YOUR STRENGTHS</div>
              {result.strengths.map((s,i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{s.skill}</span><span style={{fontFamily:"var(--font-mono)",fontSize:10,color:"#10B981"}}>{s.level}% · {s.note}</span></div>
                  <div style={{height:5,background:"rgba(255,255,255,.06)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,#10B981,#7ed957)",width:`${s.level}%`,transition:"width 1.2s ease"}}/></div>
                </div>
              ))}
            </div>
          )}
          {result.gaps?.length>0&&(
            <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#F43F5E",letterSpacing:".15em",marginBottom:14}}>SKILLS TO LEARN</div>
              {result.gaps.map((g,i)=>{const pc=PRIORITY_COL[g.priority]||"#0097b2";return(
                <div key={i} style={{padding:14,background:"rgba(255,255,255,.03)",borderRadius:12,border:`1px solid ${pc}20`,borderLeft:`3px solid ${pc}`,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:6}}>
                    <span style={{fontSize:14,color:"var(--text)",fontWeight:700}}>{g.skill}</span>
                    <div style={{display:"flex",gap:6}}>
                      <span style={{padding:"2px 10px",borderRadius:20,fontSize:9,fontWeight:700,fontFamily:"var(--font-mono)",background:`${pc}18`,color:pc,border:`1px solid ${pc}30`}}>{g.priority}</span>
                      <span style={{padding:"2px 10px",borderRadius:20,fontSize:9,fontFamily:"var(--font-mono)",background:"rgba(255,255,255,.05)",color:"var(--text3)",border:"1px solid var(--border2)"}}>⏱ {g.timeToLearn}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{(g.resources||[]).map((r,j)=><span key={j} style={{fontSize:10,color:"var(--text2)",padding:"3px 8px",background:"rgba(255,255,255,.05)",borderRadius:6,border:"1px solid var(--border2)"}}>📚 {r}</span>)}</div>
                </div>
              );})}
            </div>
          )}
          {result.learningPath?.length>0&&(
            <div style={{padding:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:14}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#7ed957",letterSpacing:".15em",marginBottom:14}}>YOUR LEARNING ROADMAP</div>
              {result.learningPath.map((step,i)=>(
                <div key={i} style={{display:"flex",gap:14,paddingBottom:i<result.learningPath.length-1?16:0}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#7ed957,#0097b2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,color:"#fff"}}>{i+1}</div>
                    {i<result.learningPath.length-1&&<div style={{width:2,flex:1,background:"rgba(6,182,212,.2)",margin:"4px 0"}}/>}
                  </div>
                  <div style={{paddingBottom:4}}>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"#7ed957",marginBottom:4}}>{step.week}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:4}}>{step.focus}</div>
                    <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.6}}>{step.action}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* NETWORKING HUB — LinkedIn-style profile discovery */
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
function ATSChecker() {
  const [file,       setFile]       = useState(null);
  const [fileText,   setFileText]   = useState("");
  const [jobDesc,    setJobDesc]    = useState("");
  const [result,     setResult]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [dragOver,   setDragOver]   = useState(false);
  const [activeTab,  setActiveTab]  = useState("overview");
  const fileInputRef = useRef(null);

  // ── Read file content ──
  const readFile = (f) => {
    if (!f) return;
    setFile(f); setResult(null); setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFileText(typeof text === "string" ? text : "");
    };
    if (f.type === "application/pdf") {
      reader.readAsDataURL(f);
      setFileText("[PDF uploaded — AI will analyze content]");
    } else {
      reader.readAsText(f);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) readFile(f);
  };

  // ── Analyze resume ──
  const analyze = async () => {
    if (!file) return;
    setLoading(true); setError(""); setResult(null);

    const resumeContent = fileText.length > 50
      ? fileText.slice(0, 4000)
      : `Resume file: ${file.name} (${(file.size/1024).toFixed(1)} KB)`;

    const prompt = `ATS resume analyzer. Analyze this resume and return ONLY compact JSON.

RESUME:
"""
${resumeContent.slice(0,2000)}
"""
${jobDesc ? `JOB DESC: """${jobDesc.slice(0,500)}"""` : ""}

Return this exact JSON (no markdown, no extra text):
{"overallScore":78,"atsCompatibility":85,"keywordScore":72,"formatScore":90,"contentScore":75,"impactScore":68,"readabilityScore":82,"verdict":"Good resume with improvements needed","summary":"2-sentence summary of resume quality","candidateName":"Name or Unknown","targetRole":"Detected role","experienceLevel":"Mid","totalExperience":"3 years","keyStrengths":["strength1","strength2","strength3"],"criticalIssues":[{"issue":"Missing quantified achievements","severity":"Critical","section":"Experience","fix":"Add numbers: led team of X, improved performance by Y%"}],"improvements":[{"section":"Summary","priority":"High","current":"Generic statement","suggested":"Specific improvement","impact":"12 points"}],"missingKeywords":["keyword1","keyword2","keyword3"],"presentKeywords":["keyword1","keyword2"],"formatIssues":["issue1"],"sectionAnalysis":{"contact":{"score":90,"status":"Good","notes":"All info present"},"summary":{"score":60,"status":"Needs Work","notes":"Too generic"},"experience":{"score":75,"status":"Average","notes":"Missing metrics"},"education":{"score":85,"status":"Good","notes":"Well formatted"},"skills":{"score":70,"status":"Average","notes":"Missing keywords"},"projects":{"score":65,"status":"Needs Work","notes":"No impact metrics"}},"atsWarnings":["warning1"],"improvedSummary":"Rewrite the professional summary in 3 strong sentences","quickWins":["Quick fix 1 (5 min)","Quick fix 2","Quick fix 3"],"industryBenchmark":"Top 30% in category","estimatedInterviewRate":"35%","afterImprovementScore":91,"downloadableResume":"Write complete improved resume as plain text with sections: CONTACT | PROFESSIONAL SUMMARY | EXPERIENCE | EDUCATION | SKILLS | PROJECTS. Use bullet points with quantified achievements."}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 3000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!res.ok) throw new Error("API " + res.status);
      const data = await res.json();
      const raw = (data.content?.[0]?.text || "").replace(/```json/gi,"").replace(/```/gi,"").trim();
      const fi = raw.indexOf("{"), li = raw.lastIndexOf("}");
      if (fi === -1) throw new Error("No JSON in response");
      setResult(JSON.parse(raw.slice(fi, li + 1)));
      setActiveTab("overview");
    } catch(e) { setError(String(e.message)); }
    setLoading(false);
  };

  // ── Download improved resume ──
  const downloadResume = () => {
    if (!result?.downloadableResume) return;
    const blob = new Blob([result.downloadableResume], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "improved_resume_" + Date.now() + ".txt";
    a.click();
  };

  // ── Score color ──
  const scoreCol = (s) => s >= 80 ? "#10B981" : s >= 60 ? "#F59E0B" : "#F43F5E";
  const scoreLabel = (s) => s >= 80 ? "Excellent" : s >= 65 ? "Good" : s >= 50 ? "Average" : "Needs Work";

  // ── Score Ring ──
  const ScoreRing = ({ score, size=80, stroke=7, label }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const col = scoreCol(score);
    return (
      <div style={{ position:"relative", width:size, height:size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${(score/100)*circ} ${circ}`}
            strokeDashoffset={circ/4}
            style={{ transition:"stroke-dasharray 1.4s ease" }}/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:size>60?Math.round(size*0.22):12, color:col, letterSpacing:"-0.5px", lineHeight:1 }}>{score}</div>
          {label && <div style={{ fontFamily:"var(--font-mono)", fontSize:7, color:"var(--text3)", marginTop:2, textAlign:"center", lineHeight:1.2 }}>{label}</div>}
        </div>
      </div>
    );
  };

  const SEVERITY_COL = { Critical:"#F43F5E", High:"#F59E0B", Medium:"#7ed957", Low:"#10B981" };
  const TABS = ["overview","issues","keywords","sections","improve","download"];
  const TAB_ICONS = {
    overview:  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    issues:    "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    keywords:  "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    sections:  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    improve:   "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    download:  "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── TOP HEADER ── */}
      <div style={{ flexShrink:0, paddingBottom:16, borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#F43F5E", letterSpacing:".2em", marginBottom:6 }}>ATS RESUME CHECKER · AI-POWERED</div>
            <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:26, color:"var(--text)", letterSpacing:"-0.5px" }}>Resume ATS Checker</div>
            <p style={{ fontSize:12, color:"var(--text2)", marginTop:4 }}>Upload your resume · Get ATS score · Download improved version</p>
          </div>
          {result && (
            <div style={{ display:"flex", gap:8 }}>
              <ScoreRing score={result.overallScore} size={70} label="OVERALL" />
              <ScoreRing score={result.afterImprovementScore||90} size={70} label="POTENTIAL" />
            </div>
          )}
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ flex:1, overflowY:"auto", paddingTop:16 }} className="scrollbar">

        {/* Upload + Job Desc */}
        {!result && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            {/* Drop zone */}
            <div
              onDragOver={e=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              onClick={()=>fileInputRef.current?.click()}
              style={{
                border:`2px dashed ${dragOver?"#F43F5E":file?"#10B981":"rgba(255,255,255,.12)"}`,
                borderRadius:16, padding:"32px 20px", textAlign:"center", cursor:"pointer",
                background:dragOver?"rgba(244,63,94,.04)":file?"rgba(16,185,129,.04)":"rgba(255,255,255,.02)",
                transition:"all .2s",
              }}>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{display:"none"}}
                onChange={e=>readFile(e.target.files[0])}/>
              <div style={{ width:52, height:52, borderRadius:14,
                background:file?"rgba(16,185,129,.12)":"rgba(244,63,94,.08)",
                border:`1px solid ${file?"rgba(16,185,129,.3)":"rgba(244,63,94,.2)"}`,
                display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none"
                  stroke={file?"#10B981":"#F43F5E"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={file
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"}/>
                </svg>
              </div>
              {file ? (
                <>
                  <div style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:14, color:"#10B981", marginBottom:4 }}>✓ {file.name}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text3)" }}>{(file.size/1024).toFixed(1)} KB · Click to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:14, color:"var(--text)", marginBottom:6 }}>Drop your resume here</div>
                  <div style={{ fontSize:12, color:"var(--text2)", marginBottom:10 }}>or click to browse files</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)" }}>Supports PDF, DOC, DOCX, TXT</div>
                </>
              )}
            </div>

            {/* Job description input */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", letterSpacing:".15em", marginBottom:6 }}>
                  JOB DESCRIPTION <span style={{ color:"#0097b2" }}>(Optional — boosts accuracy)</span>
                </div>
                <textarea value={jobDesc} onChange={e=>setJobDesc(e.target.value)} rows={6}
                  placeholder="Paste the job description here for keyword-matched ATS scoring and targeted suggestions..."
                  style={{ width:"100%", background:"rgba(255,255,255,.04)", border:"1px solid var(--border2)",
                    borderRadius:10, padding:"11px 14px", color:"var(--text)", fontSize:12, resize:"none",
                    outline:"none", fontFamily:"var(--font-body)", boxSizing:"border-box", lineHeight:1.6 }}
                  onFocus={e=>{e.target.style.borderColor="rgba(244,63,94,.5)";e.target.style.boxShadow="0 0 0 3px rgba(244,63,94,.08)";}}
                  onBlur={e=>{e.target.style.borderColor="var(--border2)";e.target.style.boxShadow="none";}}/>
              </div>
              <button onClick={analyze} disabled={loading||!file}
                style={{ padding:"13px", borderRadius:10, fontFamily:"var(--font-body)", fontWeight:700,
                  fontSize:14, background:"linear-gradient(135deg,#F43F5E,#006d82)", color:"#fff", border:"none",
                  cursor:loading||!file?"not-allowed":"pointer", opacity:loading||!file?0.5:1,
                  boxShadow:loading||!file?"none":"0 4px 20px rgba(244,63,94,.4)", transition:"all .2s" }}>
                {loading ? <span>🔍 Analyzing Resume…</span> : <span>Analyze Resume →</span>}
              </button>
              {error && <div style={{ fontSize:11, color:"#F43F5E", fontFamily:"var(--font-mono)", lineHeight:1.6 }}>{error}</div>}
              {/* Feature list */}
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {["ATS compatibility score (0-100)","Section-by-section analysis","Missing keyword detection","Critical issue alerts","AI-written improved resume","One-click download"].map((f,i)=>(
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ width:16, height:16, borderRadius:5, background:"rgba(244,63,94,.12)", border:"1px solid rgba(244,63,94,.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span style={{ fontSize:11, color:"var(--text2)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"60px 20px", textAlign:"center" }}>
            <div style={{ width:60, height:60, borderRadius:"50%", border:"3px solid rgba(244,63,94,.15)", borderTop:"3px solid #F43F5E", animation:"spin 1s linear infinite" }}/>
            <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:18, color:"var(--text)" }}>Analyzing your resume…</div>
            <div style={{ fontSize:13, color:"var(--text2)", maxWidth:360, lineHeight:1.7 }}>
              AI is scanning for ATS compatibility, keyword density, formatting issues, and generating your improved version.
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, width:280 }}>
              {["Parsing resume content","Checking ATS compatibility","Analyzing keywords","Scoring each section","Writing improved version"].map((s,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#F43F5E", boxShadow:"0 0 6px rgba(244,63,94,.6)", flexShrink:0, animation:`pulse 1.4s ease-in-out infinite`, animationDelay:`${i*0.25}s` }}/>
                  <span style={{ fontSize:11, color:"var(--text2)", fontFamily:"var(--font-mono)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {result && !loading && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Re-analyze bar */}
            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              <button onClick={()=>setResult(null)} className="btn btn-ghost btn-sm" style={{ gap:6 }}>
                <Ico d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" s={12}/> Upload New Resume
              </button>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text3)" }}>
                {result.candidateName} · {result.targetRole} · {result.totalExperience}
              </div>
              <div style={{ marginLeft:"auto", padding:"4px 12px", borderRadius:20, fontSize:10, fontWeight:700,
                fontFamily:"var(--font-mono)", background:`${scoreCol(result.overallScore)}15`,
                color:scoreCol(result.overallScore), border:`1px solid ${scoreCol(result.overallScore)}30` }}>
                {scoreLabel(result.overallScore)} · {result.industryBenchmark}
              </div>
            </div>

            {/* Score overview hero */}
            <div style={{ background:`linear-gradient(135deg,rgba(244,63,94,.08),rgba(0,109,130,.05))`,
              border:"1px solid rgba(244,63,94,.2)", borderRadius:16, padding:24 }}>
              <div style={{ display:"flex", gap:20, alignItems:"center", flexWrap:"wrap", marginBottom:20 }}>
                <ScoreRing score={result.overallScore} size={100} stroke={9} label="OVERALL SCORE"/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:22, color:"var(--text)", marginBottom:4 }}>{result.verdict}</div>
                  <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.7, marginBottom:10 }}>{result.summary}</p>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <span style={{ padding:"5px 14px", borderRadius:20, fontSize:10, fontFamily:"var(--font-mono)",
                      background:"rgba(16,185,129,.12)", color:"#10B981", border:"1px solid rgba(16,185,129,.25)" }}>
                      Interview Rate: {result.estimatedInterviewRate}
                    </span>
                    <span style={{ padding:"5px 14px", borderRadius:20, fontSize:10, fontFamily:"var(--font-mono)",
                      background:"rgba(0,151,178,.12)", color:"#0097b2", border:"1px solid rgba(0,151,178,.25)" }}>
                      After fix: {result.afterImprovementScore}/100
                    </span>
                  </div>
                </div>
              </div>
              {/* Score breakdown */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:10 }}>
                {[
                  {l:"ATS Compatible",  v:result.atsCompatibility,  c:"#7ed957"},
                  {l:"Keywords",        v:result.keywordScore,       c:"#006d82"},
                  {l:"Format",          v:result.formatScore,        c:"#10B981"},
                  {l:"Content",         v:result.contentScore,       c:"#F59E0B"},
                  {l:"Impact",          v:result.impactScore,        c:"#F43F5E"},
                  {l:"Readability",     v:result.readabilityScore,   c:"#0097b2"},
                ].map((s,i)=>(
                  <div key={i} style={{ padding:"12px 14px", background:"rgba(0,0,0,.2)", borderRadius:12, borderTop:`2px solid ${s.c}` }}>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text3)", marginBottom:6, letterSpacing:".1em" }}>{s.l}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:20, color:s.c }}>{s.v}</div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", alignSelf:"flex-end" }}>/100</div>
                    </div>
                    <div style={{ height:4, background:"rgba(255,255,255,.06)", borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:2, background:s.c, width:`${s.v}%`, transition:"width 1.2s ease" }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick wins */}
            {result.quickWins?.length > 0 && (
              <div style={{ padding:18, background:"rgba(16,185,129,.06)", border:"1px solid rgba(16,185,129,.2)", borderRadius:14 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#10B981", letterSpacing:".15em", marginBottom:12 }}>⚡ QUICK WINS — Fix these in 30 minutes</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {result.quickWins.map((w,i)=>(
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <div style={{ width:22, height:22, borderRadius:7, background:"rgba(16,185,129,.15)", border:"1px solid rgba(16,185,129,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:9, fontWeight:700, color:"#10B981" }}>{i+1}</span>
                      </div>
                      <span style={{ fontSize:13, color:"var(--text2)", lineHeight:1.5 }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display:"flex", gap:4, borderBottom:"1px solid var(--border)", paddingBottom:0, flexWrap:"wrap" }}>
              {TABS.map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)}
                  style={{ padding:"8px 16px", borderRadius:"8px 8px 0 0", fontSize:11, fontWeight:700,
                    fontFamily:"var(--font-mono)", cursor:"pointer", border:"1px solid",
                    borderBottom: activeTab===t ? "1px solid var(--bg)" : "1px solid var(--border)",
                    background: activeTab===t ? "var(--card)" : "transparent",
                    borderColor: activeTab===t ? "var(--border)" : "transparent",
                    color: activeTab===t ? "#F43F5E" : "var(--text3)",
                    textTransform:"uppercase", letterSpacing:".08em", display:"flex", alignItems:"center", gap:5,
                    marginBottom:activeTab===t?"-1px":"0" }}>
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
                    stroke={activeTab===t?"#F43F5E":"var(--text3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={TAB_ICONS[t]}/>
                  </svg>
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ minHeight:300 }}>

              {/* OVERVIEW TAB */}
              {activeTab==="overview" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {/* Key strengths */}
                  {result.keyStrengths?.length>0 && (
                    <div style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14, borderLeft:"3px solid #10B981" }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#10B981", letterSpacing:".15em", marginBottom:10 }}>✅ KEY STRENGTHS</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {result.keyStrengths.map((s,i)=>(
                          <span key={i} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontWeight:600,
                            background:"rgba(16,185,129,.1)", color:"#10B981", border:"1px solid rgba(16,185,129,.25)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* ATS Warnings */}
                  {result.atsWarnings?.length>0 && (
                    <div style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14, borderLeft:"3px solid #F59E0B" }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#F59E0B", letterSpacing:".15em", marginBottom:10 }}>⚠ ATS WARNINGS</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {result.atsWarnings.map((w,i)=>(
                          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                            <span style={{ color:"#F59E0B", flexShrink:0, marginTop:1 }}>⚠</span>
                            <span style={{ fontSize:12, color:"var(--text2)", lineHeight:1.5 }}>{w}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Format issues */}
                  {result.formatIssues?.length>0 && (
                    <div style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14, borderLeft:"3px solid #F43F5E" }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#F43F5E", letterSpacing:".15em", marginBottom:10 }}>📋 FORMAT ISSUES</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {result.formatIssues.map((f,i)=>(
                          <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:"var(--text2)" }}>
                            <span style={{ color:"#F43F5E" }}>✗</span> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ISSUES TAB */}
              {activeTab==="issues" && (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {result.criticalIssues?.length>0 && result.criticalIssues.map((issue,i)=>{
                    const sc = SEVERITY_COL[issue.severity]||"#0097b2";
                    return(
                      <div key={i} style={{ padding:18, background:"var(--card)", border:`1px solid ${sc}20`,
                        borderRadius:14, borderLeft:`4px solid ${sc}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                            <span style={{ padding:"3px 10px", borderRadius:20, fontSize:9, fontWeight:700, fontFamily:"var(--font-mono)",
                              background:`${sc}18`, color:sc, border:`1px solid ${sc}30` }}>{issue.severity}</span>
                            <span style={{ padding:"3px 10px", borderRadius:20, fontSize:9, fontFamily:"var(--font-mono)",
                              background:"rgba(255,255,255,.05)", color:"var(--text3)", border:"1px solid var(--border2)" }}>
                              {issue.section}
                            </span>
                          </div>
                        </div>
                        <div style={{ fontWeight:700, fontSize:14, color:"var(--text)", marginBottom:8 }}>{issue.issue}</div>
                        <div style={{ padding:12, background:"rgba(16,185,129,.06)", border:"1px solid rgba(16,185,129,.15)", borderRadius:10 }}>
                          <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"#10B981", letterSpacing:".12em", marginBottom:6 }}>💡 HOW TO FIX</div>
                          <div style={{ fontSize:12, color:"var(--text2)", lineHeight:1.65 }}>{issue.fix}</div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Improvements */}
                  {result.improvements?.length>0 && (
                    <>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", letterSpacing:".15em", marginTop:8, marginBottom:4 }}>IMPROVEMENT SUGGESTIONS</div>
                      {result.improvements.map((imp,i)=>(
                        <div key={i} style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                            <div style={{ display:"flex", gap:6 }}>
                              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:9, fontWeight:700, fontFamily:"var(--font-mono)",
                                background:imp.priority==="High"?"rgba(245,158,11,.15)":"rgba(0,151,178,.12)",
                                color:imp.priority==="High"?"#F59E0B":"#0097b2",
                                border:`1px solid ${imp.priority==="High"?"rgba(245,158,11,.3)":"rgba(0,151,178,.25)"}` }}>{imp.priority}</span>
                              <span style={{ padding:"3px 10px", borderRadius:20, fontSize:9, fontFamily:"var(--font-mono)",
                                background:"rgba(255,255,255,.05)", color:"var(--text3)", border:"1px solid var(--border2)" }}>{imp.section}</span>
                            </div>
                            {imp.impact && <span style={{ fontSize:10, color:"#10B981", fontFamily:"var(--font-mono)" }}>+{imp.impact}</span>}
                          </div>
                          <div style={{ marginBottom:8 }}>
                            <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text3)", marginBottom:4 }}>CURRENT</div>
                            <div style={{ fontSize:12, color:"var(--text2)", padding:"8px 12px", background:"rgba(244,63,94,.06)", borderRadius:8, border:"1px solid rgba(244,63,94,.15)" }}>{imp.current}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"#10B981", marginBottom:4 }}>SUGGESTED</div>
                            <div style={{ fontSize:12, color:"var(--text2)", padding:"8px 12px", background:"rgba(16,185,129,.06)", borderRadius:8, border:"1px solid rgba(16,185,129,.15)", lineHeight:1.6 }}>{imp.suggested}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* KEYWORDS TAB */}
              {activeTab==="keywords" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14 }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#10B981", letterSpacing:".15em", marginBottom:12 }}>✅ KEYWORDS FOUND ({result.presentKeywords?.length||0})</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {(result.presentKeywords||[]).map((k,i)=>(
                          <span key={i} style={{ padding:"4px 10px", borderRadius:20, fontSize:10, fontWeight:600,
                            background:"rgba(16,185,129,.1)", color:"#10B981", border:"1px solid rgba(16,185,129,.25)",
                            fontFamily:"var(--font-mono)" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding:18, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14 }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#F43F5E", letterSpacing:".15em", marginBottom:12 }}>❌ MISSING KEYWORDS ({result.missingKeywords?.length||0})</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {(result.missingKeywords||[]).map((k,i)=>(
                          <span key={i} style={{ padding:"4px 10px", borderRadius:20, fontSize:10, fontWeight:600,
                            background:"rgba(244,63,94,.1)", color:"#F43F5E", border:"1px solid rgba(244,63,94,.25)",
                            fontFamily:"var(--font-mono)" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:16, background:"rgba(0,151,178,.06)", border:"1px solid rgba(0,151,178,.2)", borderRadius:12 }}>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2", letterSpacing:".15em", marginBottom:6 }}>💡 TIP</div>
                    <p style={{ fontSize:12, color:"var(--text2)", lineHeight:1.65, margin:0 }}>
                      Add missing keywords naturally in your Skills section, Summary, and Experience bullet points. ATS systems scan for exact keyword matches. Aim to include at least 70% of keywords from the job description.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTIONS TAB */}
              {activeTab==="sections" && result.sectionAnalysis && (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {Object.entries(result.sectionAnalysis).map(([key,sec],i)=>{
                    const sc = scoreCol(sec.score);
                    return(
                      <div key={i} style={{ padding:16, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14, display:"flex", gap:16, alignItems:"center" }}>
                        <ScoreRing score={sec.score} size={54} stroke={5}/>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                            <div style={{ fontWeight:700, fontSize:14, color:"var(--text)", textTransform:"capitalize" }}>{key}</div>
                            <span style={{ padding:"2px 10px", borderRadius:20, fontSize:9, fontWeight:700, fontFamily:"var(--font-mono)",
                              background:`${sc}15`, color:sc, border:`1px solid ${sc}25` }}>{sec.status}</span>
                          </div>
                          <div style={{ fontSize:12, color:"var(--text2)", lineHeight:1.5 }}>{sec.notes}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* IMPROVE TAB */}
              {activeTab==="improve" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {result.improvedSummary && (
                    <div style={{ padding:20, background:"var(--card)", border:"1px solid rgba(0,151,178,.25)", borderRadius:14, borderLeft:"3px solid #0097b2" }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#0097b2", letterSpacing:".15em", marginBottom:10 }}>✨ AI-IMPROVED PROFESSIONAL SUMMARY</div>
                      <div style={{ fontSize:13, color:"var(--text2)", lineHeight:1.75, padding:"12px 14px",
                        background:"rgba(0,151,178,.05)", borderRadius:10, border:"1px solid rgba(0,151,178,.15)" }}>
                        {result.improvedSummary}
                      </div>
                      <button
                        onClick={()=>navigator.clipboard?.writeText(result.improvedSummary)}
                        className="btn btn-ghost btn-sm" style={{ marginTop:10, fontSize:10 }}>
                        Copy Summary
                      </button>
                    </div>
                  )}
                  <div style={{ padding:18, background:"rgba(16,185,129,.06)", border:"1px solid rgba(16,185,129,.2)", borderRadius:14 }}>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#10B981", letterSpacing:".15em", marginBottom:10 }}>📈 IMPROVEMENT ROADMAP</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      {[
                        {t:"Current Score",    v:result.overallScore+"/100",        c:"#F43F5E"},
                        {t:"Potential Score",  v:(result.afterImprovementScore||90)+"/100", c:"#10B981"},
                        {t:"Interview Rate",   v:result.estimatedInterviewRate,     c:"#F59E0B"},
                        {t:"Experience",       v:result.experienceLevel+" · "+result.totalExperience, c:"#0097b2"},
                      ].map((s,i)=>(
                        <div key={i} style={{ padding:"12px 14px", background:"rgba(0,0,0,.15)", borderRadius:10, borderTop:`2px solid ${s.c}` }}>
                          <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text3)", marginBottom:5 }}>{s.t}</div>
                          <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:16, color:s.c }}>{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DOWNLOAD TAB */}
              {activeTab==="download" && (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div style={{ padding:28, background:"linear-gradient(135deg,rgba(244,63,94,.08),rgba(0,109,130,.05))",
                    border:"1px solid rgba(244,63,94,.2)", borderRadius:16, textAlign:"center" }}>
                    <div style={{ width:64, height:64, borderRadius:16, background:"rgba(244,63,94,.12)", border:"1px solid rgba(244,63,94,.25)",
                      display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                    </div>
                    <div style={{ fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:800, fontSize:22, color:"var(--text)", marginBottom:8 }}>Download Improved Resume</div>
                    <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.7, maxWidth:400, margin:"0 auto 20px" }}>
                      AI has rewritten your resume with all improvements applied — optimized keywords, quantified achievements, ATS-friendly formatting, and a stronger professional summary.
                    </p>
                    <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                      <button onClick={downloadResume}
                        style={{ padding:"13px 28px", borderRadius:12, fontFamily:"var(--font-body)", fontWeight:700, fontSize:15,
                          background:"linear-gradient(135deg,#F43F5E,#006d82)", color:"#fff", border:"none", cursor:"pointer",
                          boxShadow:"0 6px 24px rgba(244,63,94,.4)", transition:"all .2s" }}
                        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                        onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                        ⬇ Download Improved Resume (.txt)
                      </button>
                    </div>
                  </div>
                  <div style={{ padding:16, background:"var(--card)", border:"1px solid var(--border)", borderRadius:12 }}>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text3)", letterSpacing:".15em", marginBottom:10 }}>PREVIEW — IMPROVED RESUME</div>
                    <pre style={{ fontSize:11, color:"var(--text2)", lineHeight:1.7, whiteSpace:"pre-wrap", wordBreak:"break-word",
                      fontFamily:"var(--font-mono)", maxHeight:400, overflowY:"auto", margin:0 }} className="scrollbar">
                      {result.downloadableResume}
                    </pre>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* TOP NAV BAR — animated sliding indicator */
const BNAV=[
  {id:"home",           lbl:"Home",      col:"#16A34A", ico:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
  {id:"aiTools",        lbl:"AI Tools",  col:"#2563EB", ico:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
  {id:"certifications", lbl:"Certs",     col:"#0097b2", ico:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},
  {id:"companies",      lbl:"Companies", col:"#0891B2", ico:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"},
  {id:"startups",       lbl:"Startups",  col:"#D97706", ico:"M13 10V3L4 14h7v7l9-11h-7z"},
  {id:"resumeModels",   lbl:"Resume",    col:"#DC2626", ico:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
  {id:"careerPath",     lbl:"Career",    col:"#16A34A", ico:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},
];

function TopNav({ active, setActive, settings }) {
  const visible = BNAV.filter(n => n.id === "home" || settings[n.id] !== false);
  const activeItem = visible.find(n => n.id === active);
  const activeCol  = activeItem?.col || "#16A34A";

  const btnRefs = useRef({});
  const inkRef  = useRef(null);

  // Animate the sliding ink underline
  useEffect(() => {
    const btn = btnRefs.current[active];
    const ink = inkRef.current;
    if (!btn || !ink) return;
    const rect = btn.getBoundingClientRect();
    const parent = btn.parentElement.getBoundingClientRect();
    ink.style.left  = (rect.left - parent.left) + "px";
    ink.style.width = rect.width + "px";
    ink.style.background = activeCol;
  }, [active, activeCol, visible.length]);

  return (
    <nav className="tnav-bar">
      {/* Sliding animated underline indicator */}
      <div ref={inkRef} className="tnav-ink" />

      {visible.map(n => {
        const on = active === n.id;
        return (
          <button
            key={n.id}
            ref={el => btnRefs.current[n.id] = el}
            className={`tnav-btn${on ? " tnav-active" : ""}`}
            style={{ "--tcol": n.col }}
            onClick={() => setActive(n.id)}
          >
            {/* Icon */}
            <span className="tnav-icon">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
                stroke={on ? n.col : "#9CA3AF"}
                strokeWidth={on ? "2.2" : "1.8"}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transition:"all 0.25s ease" }}
              >
                {n.ico.split(" M").map((seg, i) => (
                  <path key={i} d={i === 0 ? seg : "M" + seg} />
                ))}
              </svg>
            </span>
            {/* Label */}
            <span className="tnav-lbl" style={{ color: on ? n.col : "#6B7280" }}>
              {n.lbl}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* NAV */
const NAV = [
  {id:"home",        label:"Home",          sub:"Overview",        color:"var(--cyan)",  icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
  {id:"aiTools",      label:"AI Tools",      sub:"Curated toolkit", color:"var(--cyan)",  icon:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"},
  {id:"certifications",label:"Certifications",sub:"Learn & grow",   color:"var(--violet)",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"},
  {id:"companies",    label:"Companies",     sub:"Employers",       color:"var(--cyan)",  icon:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"},
  {id:"startups",     label:"Startups",      sub:"Early stage",     color:"var(--amber)", icon:"M13 10V3L4 14h7v7l9-11h-7z"},
  {id:"resumeModels", label:"Resume Models", sub:"Templates",       color:"var(--coral)", icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
  {id:"careerPath",   label:"Career Path",   sub:"Your journey",    color:"var(--lime)",  icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},
];

/* ROOT APP */

// ── Safe localStorage helpers ──
const LS_KEY_CO  = "tf_coData_v2";
const LS_KEY_SEC = "tf_secData_v2";
const LS_KEY_SET = "tf_settings_v2";

// ── Persistent shared storage (works across all browsers/users) ──
async function storageGet(key, fallback) {
  try {
    const r = await window.storage.get(key, true); // shared=true → visible to ALL users
    return r ? JSON.parse(r.value) : fallback;
  } catch { return fallback; }
}
async function storageSave(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), true); } catch {}
}
// Sync wrappers kept for legacy calls (no-ops now — real save is async)
function lsLoad(key, fallback) { return fallback; }
function lsSave(key, value) {}

export default function App() {
  const [isOwner, setIsOwner] = useState(false);
  const [active, setActive]   = useState("home");
  const [time, setTime] = useState(new Date());

  // ── SHARED PERSISTENT STATE — synced via window.storage (all browsers/users) ──
  const DEF_SETTINGS = {aiTools:true,certifications:true,companies:true,startups:true,resumeModels:true,careerPath:true};
  const DEF_SEC = { aiTools:[], certifications:[], startups:[], resumeModels:[], careerPath:[] };

  const [storageReady, setStorageReady] = useState(true); // render immediately, data loads async
  const [settings, setSettingsRaw]      = useState(DEF_SETTINGS);
  const [coData,   setCoDataRaw]        = useState([]);
  const [secData,  setSecDataRaw]       = useState(DEF_SEC);

  // ── Load all data from shared storage on mount ──
  useEffect(() => {
    (async () => {
      try {
        const [co, sec, set] = await Promise.all([
          storageGet(LS_KEY_CO,  []),
          storageGet(LS_KEY_SEC, DEF_SEC),
          storageGet(LS_KEY_SET, DEF_SETTINGS),
        ]);
        if (Array.isArray(co))   setCoDataRaw(co);
        if (sec && typeof sec === "object") setSecDataRaw(sec);
        if (set && typeof set === "object") setSettingsRaw(set);
      } catch(e) { console.warn("Storage load failed:", e); }
      setStorageReady(true);
    })();
  }, []);

  const setSettings = fn => {
    setSettingsRaw(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      storageSave(LS_KEY_SET, next);
      return next;
    });
  };
  const setCoData = fn => {
    setCoDataRaw(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      storageSave(LS_KEY_CO, next);
      return next;
    });
  };
  const setSecData = fn => {
    setSecDataRaw(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      storageSave(LS_KEY_SEC, next);
      return next;
    });
  };

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, "0");

  // Helper: make {items, setItems} props for any section — guaranteed same reference
  const secProps = key => ({
    items: key === "companies" ? coData : (secData[key] || []),
    setItems: key === "companies"
      ? setCoData
      : (fn => setSecData(prev => ({
          ...prev,
          [key]: typeof fn === "function" ? fn(prev[key] || []) : fn
        })))
  });

  const renderSection = () => {
    if (active === "home")           return <HomePage onGetStarted={() => setActive("aiTools")} />;
    if (active === "jobSearch")      return <GlobalJobSearch />;
    if (active === "salaryCalc")     return <SalaryCalculator />;
    if (active === "skillGap")       return <SkillGapAnalyzer />;
    if (active === "networking")     return <NetworkingHub />;
    if (active === "atsChecker")     return <ATSChecker />;
    if (active === "companies")      return <Companies isOwner={isOwner} {...secProps("companies")} />;
    if (active === "startups")       return <StartupsCarousel isOwner={isOwner} {...secProps("startups")} />;
    if (active === "certifications") return <CertRoadmap isOwner={isOwner} {...secProps("certifications")} />;
    const cfg = SECCFG[active];
    if (cfg) return <GenSection {...cfg} isOwner={isOwner} {...secProps(active)} />;
    return null;
  };

  // ── ADMIN PORTAL — full-screen, separate from user UI ──
  if (isOwner && active === "admin") {
    return (
      <>
        <style>{STYLES}</style>
        <AdminControl
          settings={settings} setSettings={setSettings}
          coData={coData}    setCoData={setCoData}
          secData={secData}  setSecData={setSecData}
        />
        <StarAdminGate onUnlock={() => setIsOwner(true)} />
        <button
          style={{ position:"fixed",bottom:16,left:16,zIndex:999,display:"flex",alignItems:"center",gap:8,padding:"9px 16px",background:"var(--card)",border:"1px solid var(--border2)",borderRadius:8,color:"var(--text2)",fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,.4)" }}
          onClick={() => { setIsOwner(false); setActive("home"); }}
        >
          ← Exit Admin
        </button>
      </>
    );
  }

  // ── NAV CONFIG ──
  const NAV_ITEMS = [
    { id:"home",          lbl:"Home",          sub:"Overview",          col:"#0097b2", ico:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id:"jobSearch",     lbl:"Job Search",    sub:"Global opportunities", col:"#EC4899", ico:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { id:"salaryCalc",    lbl:"Salary Calc",   sub:"Market rates",          col:"#10B981", ico:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id:"skillGap",      lbl:"Skill Gap",     sub:"Gap analysis",          col:"#006d82", ico:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id:"networking",    lbl:"Networking",    sub:"Find professionals",     col:"#0A66C2", ico:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" },
    { id:"atsChecker",    lbl:"ATS Checker",   sub:"Resume score",          col:"#F43F5E", ico:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id:"companies",     lbl:"Companies",     sub:"Employers",          col:"#0097b2", ico:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" },
    { id:"startups",      lbl:"Startups",      sub:"Early stage",        col:"#F59E0B", ico:"M13 10V3L4 14h7v7l9-11h-7z" },
    { id:"aiTools",       lbl:"AI Tools",      sub:"Curated toolkit",    col:"#7ed957", ico:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id:"certifications",lbl:"Certifications",sub:"Learn & grow",       col:"#0097b2", ico:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { id:"resumeModels",  lbl:"Resume Models", sub:"Templates",          col:"#F43F5E", ico:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id:"careerPath",    lbl:"Career Path",   sub:"Your journey",       col:"#10B981", ico:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  ];
  const visibleNav = NAV_ITEMS.filter(n => n.id === "home" || n.id === "jobSearch" || n.id === "salaryCalc" || n.id === "skillGap" || n.id === "networking" || n.id === "atsChecker" || settings[n.id] !== false);
  const activeNav  = visibleNav.find(n => n.id === active) || NAV_ITEMS[0];

  // ── USER PORTAL ──
  return (
    <>
      <style>{STYLES}</style>
      <div className="app-shell">

        {/* ══════════ SIDEBAR ══════════ */}
        <aside className="sidebar">
          {/* Logo */}
          <div className="sb-logo" onClick={() => setActive("home")}>
            <div className="sb-logo-icon">T</div>
            <div>
              <div className="sb-logo-name">TalentFlow AI</div>
              <div className="sb-logo-tag">Career Intelligence</div>
            </div>
          </div>

          {/* Nav */}
          <div className="sb-nav-items">
            <div className="sb-section-hd">Navigation</div>
            {visibleNav.map(n => {
              const on = active === n.id;
              return (
                <button key={n.id} className={`nav-item${on ? " active" : ""}`} onClick={() => setActive(n.id)}
                  style={on ? { color:n.col, "--active-col":n.col } : {}}>
                  <div className="nav-dot" style={{ background: on ? n.col : "rgba(255,255,255,.15)" }} />
                  {n.lbl}
                </button>
              );
            })}

            {isOwner && <>
              <div className="sb-section-hd" style={{ marginTop:8 }}>Admin</div>
              <button className={`nav-item${active==="admin"?" active":""}`} onClick={() => setActive("admin")}
                style={{ color: active==="admin" ? "#0097b2" : undefined }}>
                <div className="nav-dot" style={{ background:"rgba(0,151,178,.5)" }} />
                Admin Panel
                <span className="nav-badge">✦</span>
              </button>
            </>}
          </div>

          {/* Footer clock */}
          <div className="sb-footer">
            {isOwner && <span className="badge-owner" style={{ display:"block",textAlign:"center",marginBottom:8 }}>Owner Mode</span>}
            <div className="sb-time">{pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}</div>
          </div>
        </aside>

        {/* ══════════ MAIN ══════════ */}
        <div className="main-area">
          {/* Topbar */}
          <header className="topbar">
            <div className="topbar-breadcrumb">
              <span className="topbar-brand">TalentFlow</span>
              <span className="topbar-sep">/</span>
              <span className="topbar-title">{activeNav.lbl}</span>
              <span className="topbar-sub" style={{ marginLeft:12 }}>{activeNav.sub}</span>
            </div>
            <div className="topbar-actions">
              {isOwner && (
                <button className="btn btn-cyan btn-sm" onClick={() => setActive("admin")}>
                  Admin Panel →
                </button>
              )}
              <div style={{ width:8,height:8,borderRadius:"50%",background:storageReady?"#10B981":"#F59E0B",title:storageReady?"Live — data synced across all users":"Loading shared data…", boxShadow:"0 0 8px rgba(16,185,129,.6)" }} title="Live" />
            </div>
          </header>

          {/* Content */}
          <main style={{ flex:1, overflow:"hidden", position:"relative" }}>
            <div key={active} className="pg-enter"
                style={{ position:"absolute", inset:0,
                         padding: active==="home" ? 0 : "20px 28px 24px",
                         overflow:"hidden" }}>
                {renderSection()}
              </div>
          </main>
        </div>
      </div>

      {/* HIDDEN STAR GATE */}
      <StarAdminGate onUnlock={() => { setIsOwner(true); setActive("admin"); }} />
    </>
  );
}