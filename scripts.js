const demoRacket = document.getElementById('demo-racket');
const demoHolder = document.getElementById('demo-holder');
const resetBtn = document.getElementById('resetBtn');
const spinBtn = document.getElementById('spinBtn');
const soundToggle = document.getElementById('soundToggle');
const announce = document.getElementById('announce');
const preorder = document.getElementById('preorder');

let isHung = false;

// Simple sound using Web Audio API for gentle chime
function playChime(){
  if(!soundToggle.checked) return;
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 880; // A5
    g.gain.value = 0.0001;
    o.connect(g); g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
    o.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3);
    setTimeout(()=>{o.stop(); ctx.close()},1400);
  }catch(e){console.warn('audio not available', e)}
}

// Drag & drop handlers
demoRacket.addEventListener('dragstart', e=>{
  e.dataTransfer.setData('text/plain','demo-racket');
  demoRacket.classList.add('dragging');
});

demoRacket.addEventListener('dragend', e=>{
  demoRacket.classList.remove('dragging');
});

demoHolder.addEventListener('dragover', e=>{e.preventDefault(); demoHolder.classList.add('hover'); });
demoHolder.addEventListener('dragleave', e=>{ demoHolder.classList.remove('hover'); });

demoHolder.addEventListener('drop', e=>{
  e.preventDefault(); demoHolder.classList.remove('hover');
  hangRacket();
});

// keyboard support: press Enter on holder to hang
demoHolder.addEventListener('keydown', e=>{
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); hangRacket(); }
});

function hangRacket(){
  if(isHung) return;
  isHung = true;
  demoRacket.classList.add('hung');
  demoHolder.classList.add('holder-complete');
  announce.textContent = 'Santa is complete — Ho‑Ho‑Ho!';
  playChime();
}

resetBtn.addEventListener('click', e=>{
  isHung = false;
  demoRacket.classList.remove('hung');
  demoHolder.classList.remove('holder-complete');
  announce.textContent = 'Reset — drag the racket or press Enter while the holder is focused.';
});

spinBtn.addEventListener('click', e=>{
  // spin animation on racket
  demoRacket.animate([
    { transform: 'rotate(0deg) translateY(0)' },
    { transform: 'rotate(720deg) translateY(-20px)' },
    { transform: 'rotate(360deg) translateY(0)' }
  ], { duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)' });
  // playful sound
  if(soundToggle.checked) playChime();
});

// Preorder form handler (demo only)
preorder.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const qty = document.getElementById('quantity').value;
  announce.textContent = `Thanks ${name || ''}! Preorder simulated for ${qty} item(s). We'll email ${email} with updates.`;
});

// Simulate quick purchase
const demoPurchase = document.getElementById('demoPurchase');
demoPurchase.addEventListener('click', ()=>{
  announce.textContent = 'Purchase simulated — thank you! (Demo only)';
  // small confetti text effect
  const conf = document.createElement('div');
  conf.textContent = '🎉';
  conf.style.position = 'fixed'; conf.style.right = '18px'; conf.style.top = '18px'; conf.style.fontSize='28px';
  document.body.appendChild(conf);
  setTimeout(()=>conf.remove(),1400);
});

// small progressive enhancement: make initial racket draggable on the main hero (non-demo)
const mainRacket = document.getElementById('racket');
const mainHolder = document.getElementById('holder');
if(mainRacket && mainHolder){
  mainRacket.addEventListener('dragstart', e=>{ e.dataTransfer.setData('text/plain','main-racket'); });
  mainHolder.addEventListener('dragover', e=>{ e.preventDefault(); mainHolder.classList.add('hover'); });
  mainHolder.addEventListener('drop', e=>{ e.preventDefault(); mainHolder.classList.remove('hover'); mainRacket.classList.add('hung'); mainHolder.classList.add('holder-complete'); });
}

// Accessibility: announce theme-ready
window.addEventListener('load', ()=>{announce.textContent = 'Page ready. Use the interactive demo to hang the racket.'});
