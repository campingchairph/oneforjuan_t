// ── sprites ──
const SKINS=['#E8A060','#C87848','#A05028','#D4A878','#F0C898'];
let activeSkin=0, activeRole=null;

function bayaniSVG(skin,sz){
  const s=skin||'#E8A060';
  return`<svg width="${sz}" height="${Math.round(sz*1.1)}" viewBox="0 0 40 44" style="image-rendering:pixelated;display:block;">
    <rect x="10" y="1" width="20" height="5" fill="#0F0D0A"/>
    <rect x="8"  y="3" width="4"  height="8" fill="#0F0D0A"/>
    <rect x="28" y="3" width="4"  height="8" fill="#0F0D0A"/>
    <rect x="10" y="4" width="20" height="16" fill="${s}"/>
    <rect x="14" y="9" width="5"  height="5" fill="#0F0D0A"/>
    <rect x="21" y="9" width="5"  height="5" fill="#0F0D0A"/>
    <rect x="15" y="10" width="3" height="3" fill="#4080F0"/>
    <rect x="22" y="10" width="3" height="3" fill="#4080F0"/>
    <rect x="16" y="11" width="1" height="1" fill="#fff"/>
    <rect x="23" y="11" width="1" height="1" fill="#fff"/>
    <rect x="15" y="17" width="10" height="2" fill="#B06848"/>
    <rect x="10" y="20" width="20" height="14" fill="#1F8A4C"/>
    <rect x="4"  y="21" width="7"  height="11" fill="#1F8A4C"/>
    <rect x="29" y="21" width="7"  height="11" fill="#1F8A4C"/>
    <rect x="16" y="21" width="8"  height="13" fill="#F5E07040"/>
    <rect x="17" y="23" width="6"  height="2"  fill="#F5E070"/>
    <rect x="17" y="27" width="6"  height="2"  fill="#F5E070"/>
    <rect x="4"  y="32" width="7"  height="4"  fill="${s}"/>
    <rect x="29" y="32" width="7"  height="4"  fill="${s}"/>
    <rect x="12" y="34" width="7"  height="8"  fill="#3D3828"/>
    <rect x="21" y="34" width="7"  height="8"  fill="#3D3828"/>
    <rect x="10" y="41" width="10" height="3"  fill="#0F0D0A"/>
    <rect x="20" y="41" width="10" height="3"  fill="#0F0D0A"/>
    <rect x="30" y="1"  width="8"  height="8"  fill="#E8991A"/>
    <rect x="32" y="3"  width="4"  height="4"  fill="#B06E08"/>
  </svg>`;
}

function lakanSVG(skin,sz){
  const s=skin||'#C87848';
  return`<svg width="${sz}" height="${Math.round(sz*1.1)}" viewBox="0 0 40 44" style="image-rendering:pixelated;display:block;">
    <rect x="10" y="0" width="20" height="4"  fill="#E8991A"/>
    <rect x="12" y="-2" width="4" height="4"  fill="#E8991A"/>
    <rect x="18" y="-3" width="4" height="5"  fill="#E8991A"/>
    <rect x="24" y="-2" width="4" height="4"  fill="#E8991A"/>
    <rect x="13" y="1"  width="2" height="2"  fill="#D63E1E"/>
    <rect x="19" y="0"  width="2" height="2"  fill="#D63E1E"/>
    <rect x="25" y="1"  width="2" height="2"  fill="#D63E1E"/>
    <rect x="10" y="4"  width="20" height="16" fill="${s}"/>
    <rect x="8"  y="2"  width="24" height="5"  fill="#0F0D0A"/>
    <rect x="14" y="9"  width="5"  height="5"  fill="#0F0D0A"/>
    <rect x="21" y="9"  width="5"  height="5"  fill="#0F0D0A"/>
    <rect x="15" y="10" width="3"  height="3"  fill="#60A0E0"/>
    <rect x="22" y="10" width="3"  height="3"  fill="#60A0E0"/>
    <rect x="15" y="17" width="10" height="2"  fill="#B06848"/>
    <rect x="10" y="20" width="20" height="14" fill="#F0E8D0"/>
    <rect x="4"  y="21" width="7"  height="11" fill="#F0E8D0"/>
    <rect x="29" y="21" width="7"  height="11" fill="#F0E8D0"/>
    <rect x="17" y="21" width="6"  height="13" fill="#E0D4B8"/>
    <rect x="18" y="24" width="4"  height="2"  fill="#C8B890"/>
    <rect x="18" y="28" width="4"  height="2"  fill="#C8B890"/>
    <rect x="18" y="32" width="4"  height="2"  fill="#C8B890"/>
    <rect x="4"  y="32" width="7"  height="4"  fill="${s}"/>
    <rect x="29" y="32" width="7"  height="4"  fill="${s}"/>
    <rect x="12" y="34" width="7"  height="8"  fill="#383870"/>
    <rect x="21" y="34" width="7"  height="8"  fill="#383870"/>
    <rect x="10" y="41" width="10" height="3"  fill="#0F0D0A"/>
    <rect x="20" y="41" width="10" height="3"  fill="#0F0D0A"/>
  </svg>`;
}

// ── navigation ──
function go(id){
  document.querySelectorAll('.screen').forEach(function(s){
    s.classList.remove('active');
    s.style.display='none';
  });
  var target = document.getElementById(id);
  target.classList.add('active');
  target.style.display='flex';
  target.style.height = window.innerHeight+'px';
  target.style.maxHeight = window.innerHeight+'px';
  window.scrollTo(0,0);
}

// ── sheets ──
function openSheet(id){document.getElementById(id).classList.add('open');}
function closeSheet(id){document.getElementById(id).classList.remove('open');}

// ── upload toggle ──
function toggleUpload(el,icon,doneLabel){
  if(el.classList.contains('done')){
    el.classList.remove('done');
    el.innerHTML=el.dataset.original||el.innerHTML;
  } else {
    el.dataset.original=el.innerHTML;
    el.classList.add('done');
    el.innerHTML=`<div style="font-size:28px;margin-bottom:6px;">✅</div><div style="font-weight:600;font-size:13px;">${doneLabel}</div><div style="font-size:11px;color:var(--green);">Tap to replace</div>`;
  }
}

// ── step bars ──
function buildStepBar(containerId,current){
  const steps=['Identity','ID Check','Face Match'];
  const el=document.getElementById(containerId);
  let html='<div class="step-bar-inner">';
  steps.forEach((s,i)=>{
    const n=i+1;
    const cls=n<current?'step-dot-done':n===current?'step-dot-active':'step-dot-idle';
    const lbl=n<current?'step-dot-done':n===current?'step-dot-active':'step-dot-idle';
    html+=`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div class="step-dot ${cls}">${n<current?'✓':n}</div>
      <div class="step-label" style="color:${n===current?'var(--ember)':n<current?'var(--green)':'var(--ink-faint)'}">${s}</div>
    </div>`;
    if(i<steps.length-1){
      html+=`<div class="step-line ${n<current?'step-line-done':'step-line-idle'}" style="margin-bottom:16px;"></div>`;
    }
  });
  html+='</div>';
  el.innerHTML=html;
}

// ── onboarding ──
let obSlide=0;
const obSlides=[
  {sprite:()=>bayaniSVG('#E8A060',90),title:'Be a Bayani',body:"Head to a nearby mall, LTO, or market — and earn by helping people with tasks you're already doing.",bg:'var(--green-bg)',border:'#1F8A4C30',accent:'var(--green)'},
  {sprite:()=>lakanSVG('#C87848',90),title:'Or be a Lakan',body:'Find a verified Bayani near your target location. Post a detailed quest, set your offer, and wait for confirmation.',bg:'var(--sun-light)',border:'#E8991A30',accent:'var(--sun)'},
  {sprite:()=>`<div style="display:flex;gap:-10px;">${bayaniSVG('#E8A060',60)}${lakanSVG('#C87848',60)}</div>`,title:'Safe. Verified. Always.',body:'Every user — Bayani and Lakan — is ID-verified before any quest. No strangers. No surprises.',bg:'var(--ember-light)',border:'#D63E1E30',accent:'var(--ember)'},
];

function renderOB(){
  const sl=obSlides[obSlide];
  const dots=document.getElementById('ob-dots');
  dots.innerHTML='';
  obSlides.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='dot';
    d.style.cssText=`width:${i===obSlide?24:8}px;background:${i===obSlide?sl.accent:'var(--border)'};`;
    dots.appendChild(d);
  });
  document.getElementById('ob-body').innerHTML=`
    <div style="background:${sl.bg};border:2px solid ${sl.border};border-radius:20px;padding:32px 24px;margin-bottom:24px;text-align:center;">
      <div style="display:flex;justify-content:center;margin-bottom:20px;">${sl.sprite()}</div>
      <div style="font-family:var(--px);font-size:12px;color:var(--ink);margin-bottom:14px;line-height:1.8;">${sl.title}</div>
      <div style="font-size:14px;color:var(--ink-mid);line-height:1.7;font-weight:500;">${sl.body}</div>
    </div>
    <div style="display:flex;gap:10px;">
      ${obSlide>0?`<button class="btn btn-ghost" style="width:auto;padding:14px 18px;" onclick="obPrev()">←</button>`:''}
      <button class="btn btn-primary" onclick="obNext()">${obSlide<obSlides.length-1?'NEXT →':'GET STARTED →'}</button>
    </div>
    ${obSlide<obSlides.length-1?`<div style="text-align:center;margin-top:10px;"><button onclick="go('s-v1')" style="background:none;border:none;font-size:12px;color:var(--ink-faint);cursor:pointer;font-family:'DM Sans',sans-serif;">Skip intro</button></div>`:''}
  `;
}
function obNext(){obSlide<obSlides.length-1?obSlide++:go('s-v1');renderOB();}
function obPrev(){if(obSlide>0){obSlide--;renderOB();}}

// ── id type grid ──
function buildIdGrid(){
  const types=[{i:'🪪',l:'PhilSys'},{i:'🚗',l:"Driver's License"},{i:'📘',l:'Passport'},{i:'🏢',l:'UMID / SSS'},{i:'📮',l:'Postal ID'},{i:'🗳️',l:"Voter's ID"}];
  const g=document.getElementById('id-type-grid');
  if(!g)return;
  types.forEach((t,idx)=>{
    const d=document.createElement('div');
    d.className='svc-chip'+(idx===0?' selected':'');
    d.innerHTML=`<span style="font-size:16px;">${t.i}</span>${t.l}`;
    d.onclick=function(){document.querySelectorAll('#id-type-grid .svc-chip').forEach(x=>x.classList.remove('selected'));this.classList.add('selected');};
    g.appendChild(d);
  });
}

// ── scan ──
let scanDone=false;
function startScan(){
  const frame=document.getElementById('face-frame');
  const overlay=document.getElementById('scan-overlay');
  const check=document.getElementById('scan-check');
  const title=document.getElementById('scan-title');
  const sub=document.getElementById('scan-sub');
  const btn=document.getElementById('scan-btn');
  const submitBtn=document.getElementById('submit-btn');
  if(scanDone)return;
  btn.style.display='none';
  title.textContent='SCANNING...';
  overlay.style.display='block';
  frame.style.borderColor='var(--sun)';
  setTimeout(()=>{
    overlay.style.display='none';
    check.style.display='flex';
    frame.style.borderColor='var(--green)';
    title.textContent='MATCH CONFIRMED!';
    sub.textContent='Your face matches your ID. Verification complete.';
    submitBtn.style.display='flex';
    scanDone=true;
  },2500);
}

// ── approved / sprite ──
function revealSprite(){
  document.getElementById('reveal-box').style.display='none';
  document.getElementById('pre-reveal').style.display='none';
  document.getElementById('post-reveal').style.display='block';
  buildSkinRow();
}
function buildSkinRow(){
  const row=document.getElementById('skin-row');
  if(!row)return;
  row.innerHTML='';
  SKINS.forEach((s,i)=>{
    const d=document.createElement('div');
    d.style.cssText=`width:32px;height:32px;border-radius:6px;background:${s};cursor:pointer;border:3px solid ${i===activeSkin?'var(--sun)':'transparent'};image-rendering:pixelated;transition:border-color .15s;`;
    d.onclick=()=>{activeSkin=i;buildSkinRow();};
    row.appendChild(d);
  });
}

// ── role select ──
function buildRoleSprites(){
  const b=document.getElementById('bayani-sprite-role');
  const l=document.getElementById('lakan-sprite-role');
  if(b)b.innerHTML=bayaniSVG(SKINS[activeSkin],72);
  if(l)l.innerHTML=lakanSVG(SKINS[activeSkin],72);
}
function selectRole(r){
  activeRole=r;
  document.getElementById('rc-bayani').className='role-card'+(r==='bayani'?' selected-bayani':'');
  document.getElementById('rc-lakan').className='role-card'+(r==='lakan'?' selected-lakan':'');
  const btn=document.getElementById('role-confirm-btn');
  btn.style.display='flex';
  btn.className='btn '+(r==='bayani'?'btn-green':'btn-sun');
  document.getElementById('role-label').textContent=r.toUpperCase();
}
function confirmRole(){
  if(activeRole==='bayani') go('s-bmap');
  else go('s-bmap'); // lakan flow in batch 3
}

// ── chip toggles ──
function toggleChip(el){el.classList.toggle('selected');}
function selectTime(el){document.querySelectorAll('#time-chips .time-chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');}

// ── go live ──
var liveTimer=null, liveSeconds=0, liveDuration=0;
function goLive(){
  closeSheet('sheet-declare');
  renderQuestCategories();
  // get selected time
  var sel=document.querySelector('#time-chips .time-chip.selected');
  var hrs=sel?parseInt(sel.textContent):1;
  liveDuration=hrs*3600;
  liveSeconds=liveDuration;
  // update map pin
  var pin=document.getElementById('my-pin-label');
  if(pin){pin.textContent='YOU · LIVE';pin.style.background='var(--green)';pin.style.color='#fff';}
  // update status panel
  var dot=document.getElementById('status-dot');
  var ttl=document.getElementById('status-title');
  var sub=document.getElementById('status-sub');
  var goBtn=document.getElementById('go-live-btn');
  var endBtn=document.getElementById('end-live-btn');
  if(dot) dot.style.background='var(--green)';
  if(ttl) ttl.textContent='LIVE · SM San Mateo';
  var lb=document.getElementById('live-status-badge');if(lb){lb.textContent='● LIVE';lb.style.background='#1F8A4C44';lb.style.color='var(--green)';}
  var td=document.getElementById('timer-display');if(td)td.style.display='block';
  if(goBtn) goBtn.style.display='none';
  if(endBtn) endBtn.style.display='flex';
  var qs=document.getElementById('quest-section');if(qs)qs.style.display='block';
  var lb=document.getElementById('live-badge');if(lb){lb.textContent='● LIVE';lb.style.background='#1F8A4C44';lb.style.color='var(--green)';lb.style.borderColor='#1F8A4C66';}
  // inject bmap avatar
  var ba=document.getElementById('bmap-avatar');if(ba)ba.innerHTML=bayaniSVG(SKINS[activeSkin],68);
  // update landmark in subtitle
  var ss=document.getElementById('status-sub');if(ss)ss.textContent='LIVE · '+selectedLandmark;
  // start countdown
  if(liveTimer) clearInterval(liveTimer);
  liveTimer=setInterval(function(){
    liveSeconds--;
    var m=Math.floor(liveSeconds/60);
    var s=liveSeconds%60;
    var ts=m+'m '+String(s).padStart(2,'0')+'s left';
    if(sub) sub.textContent='Visible to Lakans · '+ts;
    var tb=document.getElementById('timer-text');if(tb)tb.textContent=ts;
    var td=document.getElementById('timer-display');if(td)td.style.display='block';
    var lb=document.getElementById('live-status-badge');if(lb){lb.textContent='● LIVE';lb.style.background='#1F8A4C44';lb.style.color='var(--green)';}
    if(liveSeconds<=0){ endLive(); }
  },1000);
}
function endLive(){
  if(liveTimer){clearInterval(liveTimer);liveTimer=null;}
  var pin=document.getElementById('my-pin-label');
  if(pin){pin.textContent='YOU · offline';pin.style.background='var(--sun)';pin.style.color='var(--ink)';}
  var dot=document.getElementById('status-dot');
  var ttl=document.getElementById('status-title');
  var sub=document.getElementById('status-sub');
  var goBtn=document.getElementById('go-live-btn');
  var endBtn=document.getElementById('end-live-btn');
  if(dot) dot.style.background='var(--ink-faint)';
  if(ttl) ttl.textContent='Not active';
  var ss2=document.getElementById('status-sub');if(ss2)ss2.textContent='Tap SET MY SPOT to go live';
  var qs2=document.getElementById('quest-section');if(qs2)qs2.style.display='none';
  var lb2=document.getElementById('live-badge');if(lb2){lb2.textContent='● OFFLINE';lb2.style.background='#7A706018';lb2.style.color='#A09080';lb2.style.borderColor='#7A706040';}
  if(goBtn) goBtn.style.display='flex';
  if(endBtn) endBtn.style.display='none';
}

// ── accept quest ──
function acceptQuest(){setActiveJob('bayani');closeSheet('sheet-quest');go('s-btask');}

// ── checklist ──
function toggleCheck(el){
  el.classList.toggle('checked');
  el.textContent=el.classList.contains('checked')?'✓':'';
}

// ── star ratings ──
function buildStars(containerId,cb){
  const el=document.getElementById(containerId);
  if(!el)return;
  let sel=5;
  function render(){
    el.innerHTML='';
    for(let i=1;i<=5;i++){
      const s=document.createElement('span');
      s.style.cssText=`font-size:28px;cursor:pointer;transition:transform .1s;`;
      s.textContent=i<=sel?'⭐':'☆';
      s.onmouseenter=()=>{ sel=i; render(); };
      s.onclick=()=>{ sel=i; if(cb)cb(i); };
      el.appendChild(s);
    }
  }
  render();
}

// ── bottom navs ──
function buildNav(id,active,mode){
  const el=document.getElementById(id);
  if(!el)return;
  const dests={
    bayani:{map:'s-bmap',quests:'s-btask',wallet:'s-wallet',profile:'s-profile'},
    lakan: {map:'s-lmap',quests:'s-lwaiting',wallet:'s-wallet',profile:'s-profile'}
  };
  const d=dests[mode]||dests.bayani;
  const items=[
    {id:'map',   label:'MAP',    icon:'⊞', dest:d.map},
    {id:'quests',label:'QUESTS', icon:'⚔', dest:d.quests},
    {id:'wallet',label:'WALLET', icon:'◈', dest:d.wallet},
    {id:'profile',label:'PROFILE',icon:'◉',dest:d.profile}
  ];
  const ac=mode==='bayani'?'var(--green)':'var(--sun)';
  el.innerHTML=items.map(function(it){
    var lock=(it.id==='profile'&&activeJob)?'🔒':'';
    var activeBg=it.id===active?ac+'22':'transparent';
    var activeColor=it.id===active?ac:'#504838';
    var btn='<button class="nav-btn" onclick="go(&quot;'+it.dest+'&quot;)">';
    btn+='<div class="nav-icon-wrap" style="background:'+activeBg+';">';
    btn+='<span style="font-size:18px;color:'+activeColor+';">'+it.icon+'</span>';
    btn+='</div>';
    btn+='<div class="nav-label" style="color:'+activeColor+';">'+it.label+lock+'</div>';
    btn+='</button>';
    return btn;
  }).join('');
}

// ── stars bg ──
function initStarfield(){
  const c=document.getElementById('stars-container');
  if(!c)return;
  for(let i=0;i<50;i++){
    const d=document.createElement('div');
    const sz=i%5===0?3:i%3===0?2:1;
    d.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${(i*37+11)%100}%;top:${(i*53+7)%65}%;background:${i%5===0?'#FFFFAA':'#FFFFFF'};opacity:${0.3+(i%3)*0.2};image-rendering:pixelated;animation:twinkle ${1.5+(i%3)*0.7}s step-end infinite;animation-delay:${(i*0.13)%2}s;`;
    c.appendChild(d);
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded',()=>{
  initStarfield();
  renderOB();
  buildStepBar('vbar-1',1);
  buildStepBar('vbar-2',2);
  buildStepBar('vbar-3',3);
  buildIdGrid();
  // role sprites - use actual IDs from HTML
  var rb=document.getElementById('bayani-sprite-role');
  var rl=document.getElementById('lakan-sprite-role');
  if(rb) rb.innerHTML=bayaniSVG(SKINS[activeSkin],72);
  if(rl) rl.innerHTML=lakanSVG(SKINS[activeSkin],72);
  // bayani bottom navs
  buildNav('bnav-bayani','map','bayani');
  buildNav('bnav-btask','quests','bayani');
  buildNav('bnav-receipt','quests','bayani');
  buildNav('bnav-earn','wallet','bayani');
  buildStars('star-row-bayani');
  // lakan bottom navs
  buildLakanNavs();
  // quest builder
  buildQTypeGrid();
  // browse sprites
  injectBrowseSprites();
  // star ratings
  buildStars('star-row-l');
  // totals
  calcTotal();
  // declare sheet avatar
  var da=document.getElementById('declare-avatar');
  if(da) da.innerHTML=bayaniSVG(SKINS[activeSkin],72);
  // bmap avatar
  var ba=document.getElementById('bmap-avatar');
  if(ba) ba.innerHTML=bayaniSVG(SKINS[activeSkin],68);
});



// ── LANDMARK SELECTION ──
var selectedLandmark = 'SM City San Mateo';
var selectedLandmarkIcon = '🏬';
function selectLandmark(el, name, icon){
  document.querySelectorAll('#landmark-list .svc-chip').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  selectedLandmark = name;
  selectedLandmarkIcon = icon;
  // update avatar card in declare sheet
  var lname = document.getElementById('declare-landmark-name');
  var licon = document.getElementById('declare-landmark-icon');
  if(lname) lname.textContent = name;
  if(licon) licon.textContent = icon;
}

// ── LAKAN FLOW ──
function selectBayani(id){
  document.querySelectorAll('.bayani-mini').forEach(el=>el.classList.remove('sel'));
  var el=document.getElementById(id);
  if(el) el.classList.add('sel');
}

function addItem(){
  var list=document.getElementById('item-list');
  if(!list)return;
  var row=document.createElement('div');
  row.style.cssText='display:grid;grid-template-columns:1fr 52px 76px 24px;gap:6px;align-items:center;margin-bottom:8px;';
  row.innerHTML='<input class="form-input" placeholder="Item name" oninput="calcTotal()" style="padding:8px 10px;font-size:13px;"/><input class="form-input" placeholder="1" oninput="calcTotal()" style="padding:8px;font-size:13px;text-align:center;"/><input class="form-input" placeholder="0" oninput="calcTotal()" style="padding:8px 10px;font-size:13px;"/><button onclick="removeItem(this)" style="background:none;border:none;cursor:pointer;color:var(--ink-faint);font-size:16px;padding:0;">&#x2715;</button>';
  list.appendChild(row);
}

function removeItem(btn){
  btn.parentElement.remove();
  calcTotal();
}

function calcTotal(){
  var sub=0;
  var rows=document.querySelectorAll('#item-list > div');
  rows.forEach(function(r){
    var ins=r.querySelectorAll('input');
    if(ins.length>=3){
      sub+=(parseFloat(ins[1].value)||0)*(parseFloat(ins[2].value)||0);
    }
  });
  var fee=sub*0.10, items=sub+fee;
  var offerEl=document.getElementById('offer-input');
  var offer=offerEl?parseFloat(offerEl.value)||0:0;
  var grand=items+offer;
  setText('t-sub','₱'+sub.toFixed(2));
  setText('t-fee','₱'+fee.toFixed(2));
  setText('t-items','₱'+items.toFixed(2));
  setText('g-items','₱'+items.toFixed(2));
  setText('g-svc','₱'+offer.toFixed(2));
  setText('g-total','₱'+grand.toFixed(2));
}

function setText(id,v){
  var el=document.getElementById(id);
  if(el) el.textContent=v;
}

function checkOffer(){
  var offerEl=document.getElementById('offer-input');
  if(!offerEl)return;
  var v=parseFloat(offerEl.value)||0;
  var el=document.getElementById('offer-hint');
  if(!el)return;
  calcTotal();
  if(v<60){
    el.className='info-box info-ember';
    el.innerHTML='<span style="font-size:14px;">⚠️</span><div>Below minimum (₱60). Bayanis are unlikely to accept.</div>';
  } else if(v<90){
    el.className='info-box info-amber';
    el.innerHTML='<span style="font-size:14px;">⚠️</span><div>Low offer. Suggested ₱100–₱150 for better acceptance.</div>';
  } else {
    el.className='info-box info-green';
    el.innerHTML='<span style="font-size:14px;">✓</span><div>Good offer — Bayanis typically earn ₱100–₱150 for this task.</div>';
  }
}

function buildQTypeGrid(){
  var g=document.getElementById('qtype-grid');
  if(!g)return;
  [{ic:'🛍️',l:'Buy Item'},{ic:'🎟️',l:'Buy Ticket'},{ic:'🪑',l:'Queue Fill'},{ic:'📄',l:"Gov't Queue"}].forEach(function(t,i){
    var d=document.createElement('div');
    d.className='svc-chip'+(i===0?' sel':'');
    d.innerHTML='<span style="font-size:18px;">'+t.ic+'</span>'+t.l;
    d.onclick=function(){
      document.querySelectorAll('#qtype-grid .svc-chip').forEach(function(x){x.classList.remove('sel');});
      d.classList.add('sel');
    };
    g.appendChild(d);
  });
}

// ── BROWSE SPRITES ──
function injectBrowseSprites(){
  var configs=[
    {id:'bm-1-spr',skin:0,hair:2,outfit:'bayani'},
    {id:'bm-2-spr',skin:2,hair:1,outfit:'bayani'},
    {id:'bm-3-spr',skin:3,hair:3,outfit:'bayani'},
  ];
  configs.forEach(function(c){
    var el=document.getElementById(c.id);
    if(el) el.innerHTML=bayaniSVG(SKINS[c.skin],48);
  });
  var ab=document.getElementById('active-bspr');
  if(ab) ab.innerHTML=bayaniSVG(SKINS[0],48);
  var ps=document.getElementById('profile-spr');
  if(ps) ps.innerHTML=bayaniSVG(SKINS[0],56);
}

// ── BOTTOM NAVS LAKAN ──
function buildLakanNavs(){
  var lakNavs=[
    {id:'bnav-lm', active:'map',    mode:'lakan'},
    {id:'bnav-lb', active:'map',    mode:'lakan'},
    {id:'bnav-lq', active:'quests', mode:'lakan'},
    {id:'bnav-lw', active:'quests', mode:'lakan'},
    {id:'bnav-la', active:'quests', mode:'lakan'},
    {id:'bnav-lc', active:'quests', mode:'lakan'},
    {id:'bnav-ld', active:'wallet', mode:'lakan'},
    {id:'bnav-pf', active:'profile',mode:'lakan'},
    {id:'bnav-wl', active:'wallet', mode:'lakan'},
  ];
  lakNavs.forEach(function(n){
    buildNav(n.id, n.active, n.mode);
  });
}

// ── STAR RATINGS ──
function buildStarsL(){
  buildStars('star-row-l');
}

// ── UPDATE confirmRole to go to lakan ──
// Override the existing confirmRole
confirmRole = function(){
  refreshRoleLockUI();
  if(activeRole==='bayani') go('s-bmap');
  else go('s-lmap');
};

// ── FULL AVATAR BUILDER ────────────────────────────────────────────────────
var AV_STATE={skin:0,hair:0,eyes:0,mouth:0,acc:0};
var AV_TAB='skin';
var AV_SKINS=['#E8A060','#C87848','#A05028','#D4A878','#F0C898'];
var AV_HAIR_C=['#0F0D0A','#3D2810','#8B5E3C','#D4A860','#C8203A','#1060A0'];
var AV_EYE_C=['#4080F0','#1F8A4C','#8A4020','#606060','#0F0D0A'];
var AV_HAIR_L=['Short','Long','Buzz','Curly','Short','Long'];
var AV_MOUTH_L=['Smile','Grin','Chill','Cool'];
var AV_ACC_I=['○','👓','🧢','🎀','💛'];
var AV_ACC_L=['None','Glasses','Cap','Headband','Earring'];

function showAvatarBuilder(){
  document.getElementById('pre-reveal').style.display='none';
  document.getElementById('av-builder').style.display='block';
  refreshAvPreview();
  renderAvOpts();
}

function avTabSwitch(btn, tab){
  AV_TAB=tab;
  document.querySelectorAll('.av-tab').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  renderAvOpts();
}

function setAvProp(key,val){
  AV_STATE[key]=val;
  // sync to existing activeSkin for sprite compatibility
  if(key==='skin') activeSkin=val;
  refreshAvPreview();
  renderAvOpts();
  // update role sprites if visible
  var rb=document.getElementById('r-spr-b');
  var rl=document.getElementById('r-spr-l');
  if(rb) rb.innerHTML=bayaniSVG(SKINS[AV_STATE.skin]||SKINS[0],72);
  if(rl) rl.innerHTML=lakanSVG(SKINS[Math.min(2,AV_STATE.skin)]||SKINS[0],72);
}

function refreshAvPreview(){
  var el=document.getElementById('av-preview');
  if(!el)return;
  el.innerHTML=buildFullSprite(AV_STATE,80,'bayani');
}

function renderAvOpts(){
  var el=document.getElementById('av-opts');
  if(!el)return;
  el.innerHTML='';
  var items=[];
  if(AV_TAB==='skin'){
    AV_SKINS.forEach(function(c,i){
      items.push({
        sel:AV_STATE.skin===i,
        html:'<div style="width:28px;height:28px;background:'+c+';border-radius:4px;"></div>',
        fn:function(){setAvProp('skin',i);}
      });
    });
  } else if(AV_TAB==='hair'){
    AV_HAIR_C.forEach(function(c,i){
      items.push({
        sel:AV_STATE.hair===i,
        html:'<div style="width:28px;height:12px;background:'+c+';border-radius:3px;"></div><div style="font-size:6px;font-family:var(--px);color:#A09080;margin-top:2px;">'+AV_HAIR_L[i]+'</div>',
        fn:function(){setAvProp('hair',i);}
      });
    });
  } else if(AV_TAB==='eyes'){
    AV_EYE_C.forEach(function(c,i){
      items.push({
        sel:AV_STATE.eyes===i,
        html:'<div style="width:20px;height:14px;background:#0F0D0A;border-radius:2px;position:relative;"><div style="position:absolute;inset:2px;background:'+c+';"></div></div>',
        fn:function(){setAvProp('eyes',i);}
      });
    });
  } else if(AV_TAB==='mouth'){
    AV_MOUTH_L.forEach(function(lbl,i){
      var br=i===0?'0 0 4px 4px':i===3?'4px':'2px';
      items.push({
        sel:AV_STATE.mouth===i,
        html:'<div style="font-size:7px;font-family:var(--px);color:#A09080;margin-bottom:3px;">'+lbl+'</div><div style="width:20px;height:4px;background:#B06848;border-radius:'+br+';"></div>',
        fn:function(){setAvProp('mouth',i);}
      });
    });
  } else {
    AV_ACC_L.forEach(function(lbl,i){
      items.push({
        sel:AV_STATE.acc===i,
        html:'<span style="font-size:18px;">'+AV_ACC_I[i]+'</span><span style="font-size:6px;font-family:var(--px);color:#A09080;margin-top:2px;">'+lbl+'</span>',
        fn:function(){setAvProp('acc',i);}
      });
    });
  }
  items.forEach(function(item){
    var d=document.createElement('div');
    d.className='av-opt'+(item.sel?' sel':'');
    d.innerHTML=item.html;
    d.onclick=item.fn;
    el.appendChild(d);
  });
}

function buildFullSprite(av,sz,outfit){
  var sk=AV_SKINS[av.skin]||AV_SKINS[0];
  var hc=AV_HAIR_C[av.hair]||AV_HAIR_C[0];
  var ec=AV_EYE_C[av.eyes]||AV_EYE_C[0];
  var hs=av.hair%4;
  var bc=outfit==='bayani'?'#1F8A4C':outfit==='lakan'?'#F0E8D0':'#2060D0';
  var w=sz, h=Math.round(sz*1.1);

  var hair='';
  if(hs===0) hair='<rect x="8" y="2" width="24" height="5" fill="'+hc+'"/><rect x="6" y="4" width="4" height="10" fill="'+hc+'"/><rect x="30" y="4" width="4" height="10" fill="'+hc+'"/>';
  else if(hs===1) hair='<rect x="8" y="0" width="24" height="6" fill="'+hc+'"/><rect x="4" y="2" width="6" height="20" fill="'+hc+'"/><rect x="30" y="2" width="6" height="20" fill="'+hc+'"/>';
  else if(hs===2) hair='<rect x="8" y="2" width="24" height="3" fill="'+hc+'"/>';
  else hair='<rect x="8" y="1" width="24" height="7" fill="'+hc+'"/><rect x="6" y="3" width="5" height="12" fill="'+hc+'"/><rect x="29" y="3" width="5" height="12" fill="'+hc+'"/>';

  var eyes='<rect x="14" y="9" width="5" height="5" fill="#0F0D0A"/><rect x="21" y="9" width="5" height="5" fill="#0F0D0A"/><rect x="15" y="10" width="3" height="3" fill="'+ec+'"/><rect x="22" y="10" width="3" height="3" fill="'+ec+'"/><rect x="16" y="11" width="1" height="1" fill="#fff"/><rect x="23" y="11" width="1" height="1" fill="#fff"/>';

  var mn=av.mouth||0;
  var mouth='';
  if(mn===0) mouth='<rect x="15" y="17" width="10" height="2" fill="#B06848"/><rect x="16" y="16" width="8" height="1" fill="#D08868"/>';
  else if(mn===1) mouth='<rect x="14" y="16" width="12" height="3" fill="#B06848"/>';
  else if(mn===2) mouth='<rect x="15" y="17" width="10" height="1" fill="#B06848"/>';
  else mouth='<rect x="15" y="17" width="4" height="2" fill="#B06848"/><rect x="21" y="17" width="4" height="2" fill="#B06848"/>';

  var ai=AV_ACC_L[av.acc||0];
  var acc='';
  if(ai==='Glasses') acc='<rect x="13" y="8" width="6" height="7" fill="none" stroke="#0F0D0A" stroke-width="1.2"/><rect x="21" y="8" width="6" height="7" fill="none" stroke="#0F0D0A" stroke-width="1.2"/><rect x="19" y="11" width="2" height="1" fill="#0F0D0A"/>';
  else if(ai==='Cap') acc='<rect x="8" y="0" width="24" height="7" fill="'+hc+'" rx="1"/><rect x="6" y="5" width="28" height="4" fill="'+hc+'"/><rect x="4" y="7" width="10" height="3" fill="'+hc+'"/>';
  else if(ai==='Headband') acc='<rect x="8" y="4" width="24" height="4" fill="#D63E1E"/>';
  else if(ai==='Earring') acc='<rect x="6" y="13" width="3" height="3" fill="#E8991A"/><rect x="31" y="13" width="3" height="3" fill="#E8991A"/>';

  var bd=outfit==='lakan'?'<rect x="17" y="21" width="6" height="13" fill="#E0D4B8"/><rect x="18" y="24" width="4" height="2" fill="#C8B890"/><rect x="18" y="28" width="4" height="2" fill="#C8B890"/>':'<rect x="17" y="24" width="6" height="2" fill="#F5E07060"/><rect x="17" y="28" width="6" height="2" fill="#F5E07060"/>';
  var star=outfit==='bayani'?'<rect x="30" y="1" width="8" height="8" fill="#E8991A"/><rect x="32" y="3" width="4" height="4" fill="#B06E08"/>':'';

  return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 40 44" style="image-rendering:pixelated;display:block;">'+
    hair+
    '<rect x="10" y="4" width="20" height="16" fill="'+sk+'"/>'+
    eyes+mouth+
    '<rect x="10" y="20" width="20" height="14" fill="'+bc+'"/>'+
    '<rect x="4" y="21" width="7" height="11" fill="'+bc+'"/>'+
    '<rect x="29" y="21" width="7" height="11" fill="'+bc+'"/>'+
    bd+
    '<rect x="4" y="32" width="7" height="4" fill="'+sk+'"/>'+
    '<rect x="29" y="32" width="7" height="4" fill="'+sk+'"/>'+
    '<rect x="12" y="34" width="7" height="8" fill="#3D3828"/>'+
    '<rect x="21" y="34" width="7" height="8" fill="#3D3828"/>'+
    '<rect x="10" y="41" width="10" height="3" fill="#0F0D0A"/>'+
    '<rect x="20" y="41" width="10" height="3" fill="#0F0D0A"/>'+
    acc+star+
    '</svg>';
}


// ── ACTIVE JOB STATE ──
var activeJob = null; // { type: 'bayani'|'lakan', status: 'active' }

function setActiveJob(type) {
  activeJob = { type: type, status: 'active' };
}

function clearActiveJob() {
  activeJob = null;
}

function getRoleLockMsg() {
  if (!activeJob) return null;
  if (activeJob.type === 'bayani') return 'You have an active quest. Complete it before switching roles.';
  if (activeJob.type === 'lakan') return 'You have an active quest posted. Complete or cancel it before switching.';
  return null;
}

function tryGoRole() {
  var msg = getRoleLockMsg();
  if (msg) {
    showRoleLockToast(msg);
    return;
  }
  go('s-role');
}

function showRoleLockToast(msg) {
  var t = document.getElementById('role-lock-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'role-lock-toast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#0F0D0A;color:#fff;font-family:var(--px);font-size:7px;padding:10px 16px;border-radius:8px;z-index:200;text-align:center;line-height:1.8;max-width:320px;border:1px solid var(--ember);letter-spacing:.5px;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.style.display='none'; },300); }, 3000);
}

// ── QUEST CATEGORY CARDS ──
var QUEST_CATEGORIES = [
  { icon: '🛍️', label: 'Buy Item',    count: 3, sheet: 'sheet-quest' },
  { icon: '🪑', label: 'Queue Fill',  count: 1, sheet: 'sheet-quest' },
  { icon: '🎟️', label: 'Buy Ticket', count: 2, sheet: 'sheet-quest' },
  { icon: '📄', label: "Gov't Queue", count: 1, sheet: 'sheet-quest' },
];

function renderQuestCategories() {
  var el = document.getElementById('quest-categories');
  var lbl = document.getElementById('quest-section-label');
  if (!el) return;
  if (!document.getElementById('status-dot') || document.getElementById('status-dot').style.background !== 'var(--green)') {
    el.style.display = 'none';
    if (lbl) lbl.style.display = 'none';
    return;
  }
  el.style.display = 'block';
  if (lbl) lbl.style.display = 'block';
  el.innerHTML = QUEST_CATEGORIES.map(function(c) {
    var plural = c.count !== 1 ? 's' : '';
    var d = '<div onclick="openSheet(&quot;'+c.sheet+'&quot;)" style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:14px;">';
    d += '<div style="width:44px;height:44px;background:var(--sun-light);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">'+c.icon+'</div>';
    d += '<div style="flex:1;">';
    d += '<div style="font-family:var(--px);font-size:8px;color:var(--ink);margin-bottom:4px;">'+c.label+'</div>';
    d += '<div style="font-size:12px;color:var(--ink-soft);">'+c.count+' quest'+plural+' nearby</div>';
    d += '</div>';
    d += '<div style="font-family:var(--px);font-size:8px;color:var(--ember);">→</div>';
    d += '</div>';
    return d;
  }).join('');
}

// ── ROLE LOCK UI on s-role ──
function refreshRoleLockUI() {
  var banner = document.getElementById('role-lock-banner');
  var msg = getRoleLockMsg();
  var bayaniCard = document.getElementById('rc-bayani');
  var lakanCard = document.getElementById('rc-lakan');
  var confirmBtn = document.getElementById('role-confirm-btn');

  if (msg) {
    if (banner) { banner.style.display = 'block'; }
    var msgEl = document.getElementById('role-lock-msg');
    if (msgEl) msgEl.textContent = msg;
    // Disable the card that is NOT the active role
    if (activeJob) {
      var lockedRole = activeJob.type === 'bayani' ? 'lakan' : 'bayani';
      var lockedCard = document.getElementById('rc-' + lockedRole);
      if (lockedCard) {
        lockedCard.style.opacity = '0.35';
        lockedCard.style.pointerEvents = 'none';
      }
      var allowedCard = document.getElementById('rc-' + activeJob.type);
      if (allowedCard) {
        allowedCard.style.opacity = '1';
        allowedCard.style.pointerEvents = 'none'; // also locked — must complete first
      }
      // Auto-select active role and show confirm locked
      activeRole = activeJob.type;
      if (confirmBtn) {
        confirmBtn.style.display = 'flex';
        confirmBtn.textContent = 'CONTINUE AS ' + activeJob.type.toUpperCase() + ' →';
        confirmBtn.className = 'btn ' + (activeJob.type === 'bayani' ? 'btn-green' : 'btn-sun');
      }
    }
  } else {
    if (banner) { banner.style.display = 'none'; }
    if (bayaniCard) { bayaniCard.style.opacity = '1'; bayaniCard.style.pointerEvents = ''; }
    if (lakanCard) { lakanCard.style.opacity = '1'; lakanCard.style.pointerEvents = ''; }
  }
}

// ── LAYOUT FIX: works in any environment including iframes ──
function fixLayout(){
  var h = window.innerHeight;
  var app = document.getElementById('app');
  if(app){
    app.style.height = h + 'px';
    app.style.maxHeight = h + 'px';
  }
  // ensure only active screen is visible
  document.querySelectorAll('.screen').forEach(function(s){
    if(s.classList.contains('active')){
      s.style.display = 'flex';
      s.style.height = h + 'px';
      s.style.maxHeight = h + 'px';
    } else {
      s.style.display = 'none';
    }
  });
}
fixLayout();
window.addEventListener('resize', fixLayout);
