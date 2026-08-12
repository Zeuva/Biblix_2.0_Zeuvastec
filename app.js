
const QUESTIONS = [];
const DECKS = [
  {id:'C001', count:7},{id:'C002', count:7},{id:'C003', count:7},{id:'C004', count:7},{id:'C005', count:7},{id:'C006', count:7},{id:'C007', count:7},{id:'C008', count:7},{id:'C009', count:7},{id:'C010', count:7},{id:'C011', count:7},{id:'C012', count:7},{id:'C013', count:7},{id:'C014', count:10}
];
function questionsForDeck(deckId){
  if(deckId==='ALL') return QUESTIONS;
  const m=deckId.match(/C(\d+)/);
  if(!m) return QUESTIONS;
  const n=parseInt(m[1],10);
  const map=[0,0,7,14,21,28,35,42,49,56,63,70,77,84,91];
  let s=map[n]||0;
  let c=n===14?10:7;
  return QUESTIONS.slice(s, s+c);
}
function shuffle(a){ const arr=[...a]; for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
function letterFor(i){ return String.fromCharCode(65+i); }
const Sound={ _on: (localStorage.getItem('biblix-sound')!=='off'), isOn(){return this._on;}, toggle(){this._on=!this._on; localStorage.setItem('biblix-sound', this._on?'on':'off');}, click(){ try{ if(!this._on) return; const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); o.frequency.value=600; o.connect(ctx.destination); o.start(); setTimeout(()=>o.stop(),80); }catch(e){} }, correct(){ try{ if(!this._on) return; const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=800; o.connect(ctx.destination); o.start(); setTimeout(()=>o.frequency.value=1200,90); setTimeout(()=>o.stop(),260); }catch(e){} }, wrong(){ try{ if(!this._on) return; const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); o.frequency.value=180; o.connect(ctx.destination); o.start(); setTimeout(()=>o.stop(),280); }catch(e){} }, win(){ try{ if(!this._on) return; const ctx=new (window.AudioContext||window.webkitAudioContext)(); [500,700,900].forEach((f,i)=>setTimeout(()=>{ const o=ctx.createOscillator(); o.frequency.value=f; o.connect(ctx.destination); o.start(); setTimeout(()=>o.stop(),180); }, i*140)); }catch(e){} } };
function confettiBurst(){ for(let i=0;i<28;i++){ const el=document.createElement('div'); el.className='confetti-piece'; el.style.left=Math.random()*100+'vw'; el.style.background=['#e8c65a','#7a9a68','#d1543d','#ece0c4'][Math.floor(Math.random()*4)]; el.style.animationDuration=(1.2+Math.random()*1.8)+'s'; el.style.animationDelay=(Math.random()*0.3)+'s'; document.body.appendChild(el); setTimeout(()=>el.remove(),3200); } }
function toast(m){ const t=document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }
