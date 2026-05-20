<<<<<<< HEAD
// ── NAVIGATION ──
function go(id){
  document.querySelectorAll('.screen').forEach(function(s){
    s.classList.remove('active');
    s.style.display='none';
  });
  var t=document.getElementById(id);
  if(!t)return;
  t.classList.add('active');
  t.style.display='flex';
  t.style.height=window.innerHeight+'px';
  window.scrollTo(0,0);
  updateNav(id);
}

// ── SHEETS ──
function openSheet(id){document.getElementById(id).classList.add('open');}
function closeSheet(id){document.getElementById(id).classList.remove('open');}

// ── BOTTOM NAV ──
var NAV_SCREENS={home:'s-home',activity:'s-activity',badges:'s-badges',settings:'s-settings'};
function updateNav(screenId){
  var map={'s-home':'home','s-activity':'activity','s-badges':'badges','s-settings':'settings'};
  var active=map[screenId]||'';
  ['home','activity','badges','settings'].forEach(function(tab){
    var btn=document.getElementById('nav-'+tab);
    if(!btn)return;
    btn.className='nav-btn '+(tab===active?'nav-active':'nav-inactive');
  });
}

// ── LAYOUT FIX ──
function fixLayout(){
  var h=window.innerHeight;
  var app=document.getElementById('app');
  if(app){app.style.height=h+'px';app.style.maxHeight=h+'px';}
  document.querySelectorAll('.screen').forEach(function(s){
    if(s.classList.contains('active')){s.style.display='flex';s.style.height=h+'px';}
    else{s.style.display='none';}
  });
}
fixLayout();
window.addEventListener('resize',fixLayout);

// ── STARS ──
function initStarfield(containerId){
  var c=document.getElementById(containerId);
  if(!c)return;
  c.innerHTML='';
  for(var i=0;i<55;i++){
    var d=document.createElement('div');
    var sz=i%5===0?3:i%3===0?2:1;
    var anim=containerId==='splash-stars'?'twinkle '+( 1.4+(i%3)*0.6)+'s step-end infinite':'twinkle '+(1.5+(i%3)*0.7)+'s step-end infinite';
    d.style.cssText='position:absolute;width:'+sz+'px;height:'+sz+'px;left:'+((i*37+11)%100)+'%;top:'+((i*53+7)%65)+'%;background:'+(i%4===0?'#FFFFAA':'#FFFFFF')+';opacity:'+(0.3+(i%3)*0.2)+';image-rendering:pixelated;animation:'+anim+';animation-delay:'+((i*0.13)%2)+'s;';
    c.appendChild(d);
  }
}

// ── SPLASH AUTO-ADVANCE ──
function initSplash(){
  initStarfield('splash-stars');
  setTimeout(function(){go('s-onboard');},2500);
}

// ── ONBOARDING ──
var OB_SLIDE=0;
var OB_SLIDES=[
  {
    emoji:'🌻',
    title:'Ask for a favor',
    body:'Post what you need — groceries, a queue buddy, a dog walker. Set your offer. First to accept gets the job.',
    accent:'var(--sun)',
    bg:'var(--sun-light)',
    border:'var(--sun-dark)'
  },
  {
    emoji:'🏅',
    title:'Do a favor, earn trust',
    body:'Browse favors near you, accept one, complete it. Earn badge points and build your reputation in the community.',
    accent:'var(--green)',
    bg:'var(--green-bg)',
    border:'var(--green-dark)'
  }
];

function renderOB(){
  var sl=OB_SLIDES[OB_SLIDE];
  var dots=document.getElementById('ob-dots');
  if(dots){
    dots.innerHTML='';
    OB_SLIDES.forEach(function(_,i){
      var d=document.createElement('div');
      d.className='dot';
      d.style.cssText='width:'+(i===OB_SLIDE?24:8)+'px;background:'+(i===OB_SLIDE?sl.accent:'var(--border)')+';';
      dots.appendChild(d);
    });
  }
  var body=document.getElementById('ob-body');
  if(!body)return;
  var isLast=OB_SLIDE===OB_SLIDES.length-1;
  body.innerHTML=
    '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 20px 20px;">'+
    '<div style="background:'+sl.bg+';border:2px solid '+sl.border+';box-shadow:3px 3px 0 '+sl.border+';border-radius:8px;padding:32px 24px;margin-bottom:28px;text-align:center;">'+
    '<div style="font-size:56px;margin-bottom:16px;">'+sl.emoji+'</div>'+
    '<div style="font-family:var(--px);font-size:10px;color:var(--ink);margin-bottom:14px;line-height:1.8;">'+sl.title+'</div>'+
    '<div style="font-size:14px;color:var(--ink-mid);line-height:1.7;font-weight:500;">'+sl.body+'</div>'+
    '</div>'+
    '<div style="display:flex;gap:10px;">'+
    (OB_SLIDE>0?'<button class="btn btn-ghost" style="width:auto;padding:12px 16px;" onclick="obPrev()">←</button>':'')+
    '<button class="btn '+(isLast?'btn-green':'btn-sun')+'" onclick="obNext()">'+(isLast?'START →':'NEXT →')+'</button>'+
    '</div>'+
    '</div>';
}
function obNext(){
  if(OB_SLIDE<OB_SLIDES.length-1){OB_SLIDE++;renderOB();}
  else{go('s-verify');}
}
function obPrev(){if(OB_SLIDE>0){OB_SLIDE--;renderOB();}}

// ── UPLOAD TOGGLE ──
function toggleUpload(el,label){
  if(el.classList.contains('done')){
    el.classList.remove('done');
    el.innerHTML=el._orig;
  }else{
    el._orig=el.innerHTML;
    el.classList.add('done');
    el.innerHTML='<div style="font-size:28px;margin-bottom:6px;">✅</div><div style="font-weight:600;font-size:13px;">'+label+'</div><div style="font-size:11px;color:var(--green-dark);">Tap to replace</div>';
  }
}

// ── SAMPLE FAVOR DATA ──
var FAVORS=[
  {id:1,emoji:'🛍️',title:'Buy me a Milo 1kg from MiniStop',offer:150,barangay:'Brgy. Sto. Nino',km:0.8,mins:5,user:'jay_reyes',badge:'🌻 Tapat',status:'open'},
  {id:2,emoji:'🐕',title:'Walk my dog around the block (30 mins)',offer:200,barangay:'Brgy. Malanday',km:1.2,mins:12,user:'donna_m',badge:'⭐ Pinagkakatiwalaan',status:'open'},
  {id:3,emoji:'🧑‍🤝‍🧑',title:'Ride with me to SM, I hate going alone',offer:300,barangay:'Brgy. Guitnang Bayan',km:1.8,mins:22,user:'carlos_t',badge:'🌼 Kapit-bahay',status:'open'},
  {id:4,emoji:'📄',title:'Queue for me at NBI Clearance releasing',offer:500,barangay:'Brgy. Sta. Ana',km:2.4,mins:35,user:'ana_santos',badge:'🏅 Bayani',status:'open'},
  {id:5,emoji:'🎂',title:'Order a small custom cake from Goldilocks',offer:120,barangay:'Brgy. Banaba',km:3.1,mins:50,user:'mike_b',badge:'🌱 Baguhan',status:'open'},
];
var selectedFavor=null;

function renderFavorFeed(){
  var el=document.getElementById('favor-feed');
  if(!el)return;
  el.innerHTML=FAVORS.map(function(f){
    return '<div class="favor-card" onclick="openFavorDetail('+f.id+')">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
        '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">' +
          '<span style="font-size:20px;flex-shrink:0;">'+f.emoji+'</span>' +
          '<span style="font-family:var(--px);font-size:8px;color:var(--ink);line-height:1.5;flex:1;">'+f.title+'</span>' +
        '</div>' +
        '<div style="font-family:var(--px);font-size:9px;color:var(--sun-dark);flex-shrink:0;margin-left:10px;">₱'+f.offer+'</div>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--ink-soft);margin-bottom:6px;">📍 '+f.barangay+' · '+f.km+'km · ⏱ '+f.mins+'m ago</div>' +
      '<div style="font-size:11px;color:var(--ink-faint);">'+f.badge+' · @'+f.user+'</div>' +
    '</div>';
  }).join('');
}

function openFavorDetail(id){
  selectedFavor=FAVORS.find(function(f){return f.id===id;});
  if(!selectedFavor)return;
  var f=selectedFavor;
  var body=document.getElementById('favor-detail-body');
  if(body){
    body.innerHTML=
      '<div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:28px;">'+f.emoji+'</span>' +
        '<div style="font-family:var(--px);font-size:9px;color:var(--ink);line-height:1.6;">'+f.title+'</div>' +
      '</div>' +
      '<div style="font-size:12px;color:var(--ink-faint);margin-bottom:6px;">POSTED BY</div>' +
      '<div style="font-size:13px;color:var(--ink-mid);font-weight:600;margin-bottom:16px;">'+f.badge+' · @'+f.user+'</div>' +
      '<div style="font-size:13px;color:var(--ink);line-height:1.7;margin-bottom:16px;">Looking for someone to help out. Offer is final — first to accept gets it.</div>' +
      '<div style="background:var(--sun-light);border:2px solid var(--sun-dark);box-shadow:3px 3px 0 var(--sun-dark);border-radius:6px;padding:16px;text-align:center;margin-bottom:16px;">' +
        '<div style="font-family:var(--px);font-size:7px;color:var(--sun-dark);margin-bottom:6px;">OFFER</div>' +
        '<div style="font-family:var(--px);font-size:22px;color:var(--sun-dark);">₱'+f.offer+'</div>' +
      '</div>' +
      '<div style="font-size:13px;color:var(--ink-mid);margin-bottom:6px;">📍 '+f.barangay+' · '+f.km+'km away</div>' +
      '<div style="font-size:13px;color:var(--ink-mid);margin-bottom:20px;">⏱ Posted '+f.mins+' minutes ago</div>' +
      '<button class="btn btn-green" onclick="acceptFavor('+f.id+')" style="margin-bottom:12px;">✅ ACCEPT FAVOR →</button>' +
      '<div style="text-align:center;"><button onclick="closeSheet(\'sheet-favor-detail\');openSheet(\'sheet-report\')" style="background:none;border:none;font-size:12px;color:var(--ink-faint);cursor:pointer;font-family:\'DM Sans\',sans-serif;">🚩 Report this favor</button></div>';
  }
  openSheet('sheet-favor-detail');
}

function acceptFavor(id){
  closeSheet('sheet-favor-detail');
  FAVORS=FAVORS.filter(function(f){return f.id!==id;});
  renderFavorFeed();
  MY_FAVORS.unshift({title:selectedFavor?selectedFavor.title:'Favor',offer:selectedFavor?selectedFavor.offer:0,status:'accepted'});
  showToast('Favor accepted! Contact the poster to coordinate.');
}

// ── TOAST ──
function showToast(msg){
  var t=document.getElementById('toast');
  if(!t){
    t=document.createElement('div');
    t.id='toast';
    t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--night);color:#fff;font-family:var(--px);font-size:7px;padding:10px 16px;border-radius:6px;z-index:300;border:2px solid var(--sun);letter-spacing:.5px;text-align:center;max-width:300px;line-height:1.8;';
    document.body.appendChild(t);
  }
  t.textContent=msg;
  t.style.display='block';t.style.opacity='1';
  clearTimeout(t._t);
  t._t=setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.style.display='none';},300);},3000);
}

// ── CATEGORY CHIPS ──
function selectCat(el){
  document.querySelectorAll('.cat-chip').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
}

// ── ACTIVITY TABS ──
var MY_REQUESTS=[
  {title:'Walk my dog (30 mins)',offer:200,status:'waiting'},
  {title:'Buy Milo 1kg from store',offer:150,status:'completed'},
];
var MY_FAVORS=[
  {title:'Queue at LTO for license renewal',offer:500,status:'done'},
  {title:'Accompany to Star City',offer:300,status:'accepted'},
];

function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
  document.getElementById('tab-'+tab).classList.add('active');
  renderActivityTab(tab);
}

function renderActivityTab(tab){
  var el=document.getElementById('activity-list');
  if(!el)return;
  var items=tab==='requests'?MY_REQUESTS:MY_FAVORS;
  if(!items.length){
    el.innerHTML='<div style="text-align:center;padding:40px 20px;font-size:13px;color:var(--ink-faint);">Nothing here yet.</div>';
    return;
  }
  var statusMap={
    waiting:{cls:'status-sun',label:'WAITING'},
    active:{cls:'status-green',label:'ACTIVE'},
    completed:{cls:'status-sky',label:'DONE'},
    cancelled:{cls:'status-ember',label:'CANCELLED'},
    accepted:{cls:'status-green',label:'ACCEPTED'},
    done:{cls:'status-sky',label:'DONE'},
    failed:{cls:'status-ember',label:'FAILED'},
  };
  el.innerHTML=items.map(function(r){
    var s=statusMap[r.status]||{cls:'status-sun',label:r.status.toUpperCase()};
    return '<div class="card" style="margin-bottom:10px;display:flex;align-items:center;gap:12px;">' +
      '<span class="status-badge '+s.cls+'">'+s.label+'</span>' +
      '<div style="flex:1;"><div style="font-size:13px;font-weight:600;color:var(--ink);">'+r.title+'</div></div>' +
      '<div style="font-family:var(--px);font-size:9px;color:var(--sun-dark);">₱'+r.offer+'</div>' +
    '</div>';
  }).join('');
}

// ── BADGE DATA ──
var USER={name:'Seph Reyes',pts:340,done:8,posted:5};
var BADGES=[
  {pts:0,   emoji:'🌱',name:'Baguhan'},
  {pts:100, emoji:'🌼',name:'Kapit-bahay'},
  {pts:300, emoji:'🌻',name:'Tapat'},
  {pts:700, emoji:'⭐',name:'Pinagkakatiwalaan'},
  {pts:1500,emoji:'🏅',name:'Bayani'},
];
var BADGE_HISTORY=[
  {plus:true, pts:10, label:'Completed "Buy Milo"',     ago:'2d ago'},
  {plus:true, pts:10, label:'Completed "Queue at LTO"', ago:'4d ago'},
  {plus:false,pts:20, label:'Failed "Dog walk"',         ago:'6d ago'},
  {plus:true, pts:10, label:'Good review received',      ago:'7d ago'},
];

function getBadge(pts){
  var b=BADGES[0];
  BADGES.forEach(function(x){if(pts>=x.pts)b=x;});
  return b;
}
function getNextBadge(pts){
  for(var i=0;i<BADGES.length;i++){if(BADGES[i].pts>pts)return BADGES[i];}
  return null;
}

function renderBadges(){
  var el=document.getElementById('badges-content');
  if(!el)return;
  var b=getBadge(USER.pts);
  var next=getNextBadge(USER.pts);
  var pct=next?Math.min(100,Math.round(((USER.pts-b.pts)/(next.pts-b.pts))*100)):100;
  el.innerHTML=
    '<div class="badge-rank-big">' +
      '<span class="badge-emoji-big">'+b.emoji+'</span>' +
      '<div class="badge-name-big">'+b.name+'</div>' +
      '<div style="font-size:12px;color:var(--ink-soft);margin-bottom:12px;">@'+USER.name+'</div>' +
      '<div class="badge-pts">'+USER.pts+' pts</div>' +
    '</div>' +
    (next?
      '<div class="card" style="margin-bottom:16px;">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
          '<div style="font-family:var(--px);font-size:7px;color:var(--ink-faint);">PROGRESS TO '+next.name.toUpperCase()+'</div>' +
          '<div style="font-family:var(--px);font-size:7px;color:var(--sun-dark);">'+next.emoji+' '+next.pts+'pts</div>' +
        '</div>' +
        '<div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;"></div></div>' +
        '<div style="font-size:11px;color:var(--ink-soft);margin-top:6px;text-align:right;">'+(next.pts-USER.pts)+' pts to go</div>' +
      '</div>'
    :'') +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
      '<div class="card" style="text-align:center;">' +
        '<div style="font-family:var(--px);font-size:14px;color:var(--sun);margin-bottom:4px;">'+USER.done+'</div>' +
        '<div style="font-size:11px;color:var(--ink-soft);">Favors done</div>' +
      '</div>' +
      '<div class="card" style="text-align:center;">' +
        '<div style="font-family:var(--px);font-size:14px;color:var(--sun);margin-bottom:4px;">'+USER.posted+'</div>' +
        '<div style="font-size:11px;color:var(--ink-soft);">Favors posted</div>' +
      '</div>' +
    '</div>' +
    '<div style="font-family:var(--px);font-size:7px;color:var(--ink-faint);letter-spacing:2px;margin-bottom:12px;">RECENT HISTORY</div>' +
    '<div class="card">' +
    BADGE_HISTORY.map(function(h){
      return '<div class="hist-row">' +
        '<span class="hist-icon">'+(h.plus?'✅':'❌')+'</span>' +
        '<div style="flex:1;">' +
          '<div class="hist-pts '+(h.plus?'plus':'minus')+'">'+(h.plus?'+':'-')+h.pts+' pts</div>' +
          '<div style="font-size:12px;color:var(--ink-mid);">'+h.label+'</div>' +
        '</div>' +
        '<div style="font-size:11px;color:var(--ink-faint);">'+h.ago+'</div>' +
      '</div>';
    }).join('') +
    '</div>';
}

// ── REPORT SHEET ──
function selectReport(el){
  document.querySelectorAll('.radio-opt .radio-dot').forEach(function(d){d.classList.remove('sel');});
  el.querySelector('.radio-dot').classList.add('sel');
}

// ── RADIUS ──
function selectRadius(el){
  document.querySelectorAll('.radius-btn').forEach(function(b){
    b.style.background='var(--card)';b.style.color='var(--ink-soft)';b.style.borderColor='var(--border)';b.style.boxShadow='none';
  });
  el.style.background='var(--sun-light)';el.style.color='var(--sun-dark)';el.style.borderColor='var(--sun)';el.style.boxShadow='2px 2px 0 var(--sun-dark)';
}

// ── NOTIFICATION TOGGLE ──
function toggleNotif(el){el.classList.toggle('on');}

// ── INIT ──
document.addEventListener('DOMContentLoaded',function(){
  initSplash();
  renderOB();
  renderFavorFeed();
  renderActivityTab('requests');
  renderBadges();
  // set first radius btn active
  var rb=document.querySelector('.radius-btn');
  if(rb)selectRadius(rb);
});
=======
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
>>>>>>> 5f68cbcbbf5acfe021595e7cbe5bc76345c75002
