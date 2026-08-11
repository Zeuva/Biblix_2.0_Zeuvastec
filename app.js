/* ============================================================
   BIBLIX — motor do jogo (vanilla JS, sem dependências de build).
   As perguntas em questions.js são usadas exatamente como estão
   — nenhum texto, opção ou resposta é alterado neste arquivo.
   ============================================================ */

// ---------- Decks (mesma composição do jogo original) ----------
const DECKS = [
  { id: 'C001', count: 8 }, { id: 'C002', count: 7 }, { id: 'C003', count: 7 },
  { id: 'C004', count: 8 }, { id: 'C005', count: 7 }, { id: 'C006', count: 8 },
  { id: 'C007', count: 9 }, { id: 'C008', count: 9 }, { id: 'C010', count: 6 },
  { id: 'C012', count: 9 }, { id: 'C013', count: 6 }, { id: 'C014', count: 19 },
  { id: 'C015', count: 20 }, { id: 'C016', count: 20 }
];

function questionsForDeck(deckId) {
  return deckId === 'ALL' ? QUESTIONS.slice() : QUESTIONS.filter((q) => q.group === deckId);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function letterFor(i) { return String.fromCharCode(65 + i); }

// ---------- Som (Web Audio API, sintetizado — sem arquivos externos) ----------
const Sound = (() => {
  let ctx = null;
  let enabled = localStorage.getItem('biblix2-sound') !== 'off';
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, start, dur, type = 'sine', gainPeak = 0.16) {
    if (!enabled) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(gainPeak, c.currentTime + start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.02);
  }
  return {
    correct() { tone(523.25, 0, 0.16); tone(659.25, 0.08, 0.16); tone(783.99, 0.16, 0.28); },
    wrong() { tone(220, 0, 0.22, 'sawtooth', 0.09); tone(164.81, 0.1, 0.28, 'sawtooth', 0.09); },
    tick() { tone(880, 0, 0.05, 'square', 0.04); },
    click() { tone(660, 0, 0.05, 'triangle', 0.06); },
    win() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.3, 'sine', 0.14)); },
    isOn() { return enabled; },
    toggle() { enabled = !enabled; localStorage.setItem('biblix2-sound', enabled ? 'on' : 'off'); return enabled; }
  };
})();

// ---------- Confete (efeito visual de conclusão) ----------
function confettiBurst() {
  const colors = ['#c9a227', '#e8c65a', '#7a9a68', '#a53c2c', '#ece0c4'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[i % colors.length];
    el.style.animationDuration = 2 + Math.random() * 1.5 + 's';
    el.style.animationDelay = Math.random() * 0.3 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}
