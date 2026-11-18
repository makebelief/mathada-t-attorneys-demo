
const btn=document.querySelector('.menu-btn');const mob=document.querySelector('.mobile-nav');if(btn&&mob){btn.addEventListener('click',()=>{mob.classList.toggle('open');btn.setAttribute('aria-expanded',mob.classList.contains('open'))})}
const topBtn=document.querySelector('.backtop');if(topBtn){topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}))}
