(function(){
const body = document.querySelector('.page');
const toggle = document.getElementById('toggleHang');
const peek = document.getElementById('peek');
const racketBtn = document.getElementById('racket');
const shopNow = document.getElementById('shopNow');
const giftThis = document.getElementById('giftThis');


function setHung(hung){
if(hung){
document.documentElement.classList.add('hung');
body.classList.add('hung');
racketBtn.setAttribute('aria-pressed','true');
} else {
document.documentElement.classList.remove('hung');
body.classList.remove('hung');
racketBtn.setAttribute('aria-pressed','false');
}
}


// Toggle hang state
toggle.addEventListener('click',()=>{
const isHung = body.classList.contains('hung');
setHung(!isHung);


// small playful sound simulation via visual bounce
if(!isHung){
racketBtn.animate([{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:260});
}
});


// clicking racket toggles too
racketBtn.addEventListener('click',(e)=>{
e.preventDefault();
const isHung = body.classList.contains('hung');
setHung(!isHung);
});


// peek — quick reveal without toggling permanently
peek.addEventListener('click',()=>{
setHung(true);
setTimeout(()=>setHung(false),1200);
});


// CTAs — simple smooth scroll stubs for demo
function smoothTo(hash){
const target = document.querySelector(hash);
if(target) target.scrollIntoView({behavior:'smooth'});
}
shopNow.addEventListener('click',(e)=>{e.preventDefault();smoothTo('#features');});
giftThis.addEventListener('click',(e)=>{e.preventDefault();smoothTo('#gift');});


// Small accessibility: allow keyboard Enter on racket
racketBtn.addEventListener('keydown',(e)=>{
if(e.key==='Enter' || e.key===' '){
e.preventDefault(); racketBtn.click();
}
});


// initial state
setHung(false);
})();
