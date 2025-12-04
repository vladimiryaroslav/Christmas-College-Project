const demoRacket = document.getElementById('demo-racket');
const demoHolder = document.getElementById('demo-holder');
const resetBtn = document.getElementById('resetBtn');
const spinBtn = document.getElementById('spinBtn');
const soundToggle = document.getElementById('soundToggle');
const announce = document.getElementById('announce');
const preorder = document.getElementById('preorder');

let isHung = false;

// Play chime
function playChime(){
  if(!soundToggle.checked) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 880;
  gain.gain.value = 0.001;
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start();
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.4);
  setTimeout(()=>ctx.close(), 1000);
}

// Drag support
demoRacket.addEventListener('dragstart', e=>{
  e.dataTransfer.setData('text/plain', 'demo-racket');
});
demoHolder.addEventListener('dragover', e=>{
  e.preventDefault();
});
demoHolder.addEventListener('drop', ()=>{
  hang();
});

demoHolder.addEventListener('keydown', e=>{
  if(e.key === "Enter"){
    hang();
  }
});

function hang(){
  if(isHung) return;
  isHung = true;
  demoRacket.classList.add("hung");
  demoHolder.classList.add("holder-complete");
  announce.textContent = "Santa is complete! Ho-Ho-Ho!";
  playChime();
}

resetBtn.addEventListener('click', ()=>{
  isHung = false;
  demoHolder.classList.remove("holder-complete");
  demoRacket.classList.remove("hung");
  announce.textContent = "Reset — drag or press Enter again.";
});

spinBtn.addEventListener('click', ()=>{
  demoRacket.animate([
    { transform: "rotate(0deg)" },
    { transform: "rotate(720deg)" }
  ], { duration: 900 });
  playChime();
});

// Preorder simulation
preorder.addEventListener("submit", e=>{
  e.preventDefault();
  announce.textContent = "Preorder simulated! Check your email for updates.";
});

// Purchase confirmation
document.getElementById("demoPurchase").addEventListener("click", ()=>{
  announce.textContent = "Thanks! Purchase simulation complete.";
});
