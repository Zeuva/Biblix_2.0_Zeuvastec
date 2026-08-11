/* ============================================================
   BIBLIX — modo Solo.
   ============================================================ */

const SoloState = {
  deck: [],
  index: 0,
  score: 0,
  chosen: null, // índice da opção escolhida na pergunta atual (null = ainda não respondeu)
  finished: false
};

function startSolo() {
  SoloState.deck = shuffle(questionsForDeck(App.deckId));
  SoloState.index = 0;
  SoloState.score = 0;
  SoloState.chosen = null;
  SoloState.finished = false;
  setScreen('solo');
}

function currentSoloQuestion() { return SoloState.deck[SoloState.index]; }

function answerSolo(optionIndex) {
  if (SoloState.chosen !== null) return;
  const q = currentSoloQuestion();
  const correct = optionIndex === q.answer;
  SoloState.chosen = optionIndex;
  if (correct) { SoloState.score += 1; Sound.correct(); } else { Sound.wrong(); }
  render();
  window.setTimeout(() => {
    if (SoloState.index + 1 >= SoloState.deck.length) {
      SoloState.finished = true;
      confettiBurst();
      Sound.win();
      render();
    } else {
      SoloState.index += 1;
      SoloState.chosen = null;
      render();
    }
  }, 1000);
}

function renderSolo() {
  if (SoloState.finished) return renderSoloResult();
  const q = currentSoloQuestion();
  const total = SoloState.deck.length;
  root.innerHTML = `
    <div class="app">
      ${renderHeader('solo')}
      <div class="game-status">
        <span>Pergunta <b>${SoloState.index + 1}</b> / ${total} · ${deckLabel(App.deckId)}</span>
        <span>Pontos: <b>${SoloState.score}</b></span>
      </div>
      <div class="progress"><i style="width:${((SoloState.index) / total) * 100}%"></i></div>

      <div class="card unfurl" id="solo-card">
        <div class="q-meta"><span>${q.group} · #${String(q.id).padStart(3, '0')}</span><span>${deckLabel(App.deckId)} · ${total}Q</span></div>
        <div class="q-text">${q.q}</div>
        <div class="options">
          ${q.options.map((opt, i) => optionHTML(q, i, SoloState.chosen)).join('')}
        </div>
        ${SoloState.chosen !== null ? feedbackHTML(SoloState.chosen === q.answer, q) : ''}
      </div>
    </div>
  `;
  wireHeader();
  if (SoloState.chosen === null) {
    root.querySelectorAll('.option').forEach((btn) => {
      btn.addEventListener('click', () => answerSolo(Number(btn.dataset.i)));
    });
  }
}

function optionHTML(q, i, chosen) {
  let cls = 'option';
  let mark = '';
  if (chosen !== null) {
    if (i === q.answer) { cls += ' correct'; mark = '<span class="option-check">✓</span>'; }
    else if (i === chosen) { cls += ' wrong'; mark = '<span class="option-check">✗</span>'; }
  }
  return `<button class="${cls}" data-i="${i}" ${chosen !== null ? 'disabled' : ''}>
    <span class="option-letter">${letterFor(i)}</span><span>${q.options[i]}</span>${mark}
  </button>`;
}

function feedbackHTML(correct, q) {
  return `<div class="feedback ${correct ? 'correct' : 'wrong'}">
    ${correct ? '✓ Correto! +1 ponto' : `✗ Errado. A resposta certa é: ${q.options[q.answer]}`}
  </div>`;
}

function renderSoloResult() {
  const total = SoloState.deck.length;
  const pct = Math.round((SoloState.score / total) * 100);
  const grade = pct >= 90 ? 'Excelente!' : pct >= 70 ? 'Muito bom!' : pct >= 50 ? 'Bom começo!' : 'Continue estudando!';
  root.innerHTML = `
    <div class="app">
      ${renderHeader('solo')}
      <div class="modal-backdrop">
        <div class="modal">
          <div class="crown">🏆</div>
          <h2>${grade}</h2>
          <div class="score-big">${SoloState.score} / ${total}</div>
          <div class="score-sub">${pct}% de acerto · ${deckLabel(App.deckId)}</div>
          <div class="modal-actions">
            <button class="btn btn-primary btn-block" id="play-again">↻ Jogar de novo</button>
            <div class="row">
              <button class="btn btn-secondary" id="back-home">🏠 Menu</button>
              <button class="btn btn-ghost" id="share-result">📤 Compartilhar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('play-again').addEventListener('click', () => startSolo());
  document.getElementById('back-home').addEventListener('click', () => setScreen('home'));
  document.getElementById('share-result').addEventListener('click', () => {
    const text = `🏆 BIBLIX Zeuvastec — Fiz ${SoloState.score}/${total} pontos (${pct}%) no cartão ${deckLabel(App.deckId)}!`;
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else { navigator.clipboard?.writeText(text); toast('Resultado copiado!'); }
  });
}
