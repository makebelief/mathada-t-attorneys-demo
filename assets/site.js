(()=>{'use strict';const body=document.body,open=document.querySelector('[data-mobile-open]'),close=document.querySelector('[data-mobile-close]'),panel=document.querySelector('#mobile-panel'),backdrop=document.querySelector('#mobile-backdrop');let focusBefore;function setMenu(show){if(!panel)return;if(show)focusBefore=document.activeElement;panel.classList.toggle('open',show);backdrop?.classList.toggle('visible',show);body.classList.toggle('nav-open',show);open?.setAttribute('aria-expanded',String(show));panel.setAttribute('aria-hidden',String(!show));panel.toggleAttribute('inert',!show);if(show)close?.focus();else focusBefore?.focus()}open?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));backdrop?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel?.classList.contains('open'))setMenu(false);if(e.key!=='Tab'||!panel?.classList.contains('open'))return;const nodes=[...panel.querySelectorAll('a,button')].filter(n=>!n.disabled);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});const top=document.querySelector('.scroll-top');if(top){const adjust=()=>top.classList.toggle('show',window.scrollY>650);window.addEventListener('scroll',adjust,{passive:true});top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));adjust()}})();

// Performance: defer office videos until they are near the viewport.
(() => {
  const videos = [...document.querySelectorAll('video[data-src]')];
  if (!videos.length) return;
  const loadVideo = (v) => {
    if (!v.dataset.src) return;
    v.src = v.dataset.src;
    delete v.dataset.src;
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  };
  if (!('IntersectionObserver' in window)) { videos.forEach(loadVideo); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        loadVideo(v);
        if (v.src) { const p=v.play(); if(p&&p.catch)p.catch(()=>{}); }
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, {rootMargin:'350px 0px', threshold:0.01});
  videos.forEach(v => io.observe(v));
})();

