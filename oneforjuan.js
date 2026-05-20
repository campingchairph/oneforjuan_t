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
    var anim='twinkle '+(1.4+(i%3)*0.6)+'s step-end infinite';
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
    (OB_SLIDE>0?'<button class="btn btn-ghost" style="width:auto;padding:12px 16px;" onclick="obPrev()">&#8592;</button>':'')+
    '<button class="btn '+(isLast?'btn-green':'btn-sun')+'" onclick="obNext()">'+(isLast?'START &rarr;':'NEXT &rarr;')+'</button>'+
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
    el.innerHTML='<div style="font-size:28px;margin-bottom:6px;">&#9989;</div><div style="font-weight:600;font-size:13px;">'+label+'</div><div style="font-size:11px;color:var(--green-dark);">Tap to replace</div>';
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
        '<div style="font-family:var(--px);font-size:9px;color:var(--sun-dark);flex-shrink:0;margin-left:10px;">&#8369;'+f.offer+'</div>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--ink-soft);margin-bottom:6px;">&#128205; '+f.barangay+' &middot; '+f.km+'km &middot; &#8987; '+f.mins+'m ago</div>' +
      '<div style="font-size:11px;color:var(--ink-faint);">'+f.badge+' &middot; @'+f.user+'</div>' +
    '</div>';
  }).join('');
}

function openFavorDetail(id){
  selectedFavor=null;
  for(var i=0;i<FAVORS.length;i++){if(FAVORS[i].id===id){selectedFavor=FAVORS[i];break;}}
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
      '<div style="font-size:13px;color:var(--ink-mid);font-weight:600;margin-bottom:16px;">'+f.badge+' &middot; @'+f.user+'</div>' +
      '<div style="font-size:13px;color:var(--ink);line-height:1.7;margin-bottom:16px;">Looking for someone to help out. Offer is final &mdash; first to accept gets it.</div>' +
      '<div style="background:var(--sun-light);border:2px solid var(--sun-dark);box-shadow:3px 3px 0 var(--sun-dark);border-radius:6px;padding:16px;text-align:center;margin-bottom:16px;">' +
        '<div style="font-family:var(--px);font-size:7px;color:var(--sun-dark);margin-bottom:6px;">OFFER</div>' +
        '<div style="font-family:var(--px);font-size:22px;color:var(--sun-dark);">&#8369;'+f.offer+'</div>' +
      '</div>' +
      '<div style="font-size:13px;color:var(--ink-mid);margin-bottom:6px;">&#128205; '+f.barangay+' &middot; '+f.km+'km away</div>' +
      '<div style="font-size:13px;color:var(--ink-mid);margin-bottom:20px;">&#8987; Posted '+f.mins+' minutes ago</div>' +
      '<button class="btn btn-green" onclick="acceptFavor('+f.id+')" style="margin-bottom:12px;">&#9989; ACCEPT FAVOR &rarr;</button>' +
      '<div style="text-align:center;"><button onclick="closeSheet(\'sheet-favor-detail\');openSheet(\'sheet-report\')" style="background:none;border:none;font-size:12px;color:var(--ink-faint);cursor:pointer;font-family:\'DM Sans\',sans-serif;">&#128681; Report this favor</button></div>';
  }
  openSheet('sheet-favor-detail');
}

function acceptFavor(id){
  closeSheet('sheet-favor-detail');
  var accepted=null;
  FAVORS=FAVORS.filter(function(f){if(f.id===id){accepted=f;return false;}return true;});
  renderFavorFeed();
  if(accepted) MY_FAVORS.unshift({title:accepted.title,offer:accepted.offer,status:'accepted'});
  showToast('Favor accepted! Coordinate with the poster.');
}

// ── TOAST ──
function showToast(msg){
  var t=document.getElementById('app-toast');
  if(!t){
    t=document.createElement('div');
    t.id='app-toast';
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
    failed:{cls:'status-ember',label:'FAILED'}
  };
  el.innerHTML=items.map(function(r){
    var s=statusMap[r.status]||{cls:'status-sun',label:r.status.toUpperCase()};
    return '<div class="card" style="margin-bottom:10px;display:flex;align-items:center;gap:12px;">' +
      '<span class="status-badge '+s.cls+'">'+s.label+'</span>' +
      '<div style="flex:1;font-size:13px;font-weight:600;color:var(--ink);">'+r.title+'</div>' +
      '<div style="font-family:var(--px);font-size:9px;color:var(--sun-dark);">&#8369;'+r.offer+'</div>' +
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
  {pts:1500,emoji:'🏅',name:'Bayani'}
];
var BADGE_HISTORY=[
  {plus:true, pts:10,label:'Completed "Buy Milo"',    ago:'2d ago'},
  {plus:true, pts:10,label:'Completed "Queue at LTO"',ago:'4d ago'},
  {plus:false,pts:20,label:'Failed "Dog walk"',        ago:'6d ago'},
  {plus:true, pts:10,label:'Good review received',     ago:'7d ago'}
];

function getBadge(pts){
  var b=BADGES[0];
  for(var i=0;i<BADGES.length;i++){if(pts>=BADGES[i].pts)b=BADGES[i];}
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
        '<span class="hist-icon">'+(h.plus?'&#9989;':'&#10060;')+'</span>' +
        '<div style="flex:1;">' +
          '<div class="hist-pts '+(h.plus?'plus':'minus')+'">'+(h.plus?'+':'-')+h.pts+' pts</div>' +
          '<div style="font-size:12px;color:var(--ink-mid);">'+h.label+'</div>' +
        '</div>' +
        '<div style="font-size:11px;color:var(--ink-faint);">'+h.ago+'</div>' +
      '</div>';
    }).join('')+
    '</div>';
}

// ── REPORT ──
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
  var rb=document.querySelector('.radius-btn');
  if(rb)selectRadius(rb);
});
