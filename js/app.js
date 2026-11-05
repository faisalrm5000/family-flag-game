// UI layer: wires the pure game logic (FlagGame) and data (FlagData) to the page.
(function () {
  const { COUNTRIES, flagEmoji } = window.FlagData;
  const Game = window.FlagGame;

  const AVATARS = ['🦊', '🐼'];
  const DEFAULT_NAMES = ['Gabi', 'Oli'];
  const STORAGE_KEY = 'flag-game:names';

  const $ = (sel) => document.querySelector(sel);

  let state = null; // current game state
  let question = null; // current question
  let answered = false;
  let lastStarter = null;
  let names = loadNames();

  // ---------- storage (best-effort; the game works without it) ----------
  function loadNames() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length === 2 && saved.every((n) => typeof n === 'string' && n.trim())) {
        return saved;
      }
    } catch (e) { /* ignore */ }
    return DEFAULT_NAMES.slice();
  }
  function saveNames(n) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); } catch (e) { /* ignore */ }
  }

  // ---------- screens ----------
  function show(id) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.id === `screen-${id}`));
  }

  // ---------- home ----------
  $('#name-0').value = names[0];
  $('#name-1').value = names[1];

  $('#setup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    names = [0, 1].map((i) => $(`#name-${i}`).value.trim() || DEFAULT_NAMES[i]);
    saveNames(names);
    startGame(true);
  });

  // ---------- game ----------
  function startGame(fresh) {
    // Fair start: random for the first game, then whoever went second starts next.
    const starter = fresh || lastStarter === null ? (Math.random() < 0.5 ? 0 : 1) : 1 - lastStarter;
    lastStarter = starter;
    state = Game.createGame({
      players: names.map((name, i) => ({ name, avatar: AVATARS[i] })),
      starter,
    });
    show('game');
    renderScoreboard();
    nextTurn(`🪙 ${names[starter]} goes first!`);
  }

  function setTurnColors() {
    const p = state.current;
    document.documentElement.style.setProperty('--turn', `var(--p${p})`);
    document.documentElement.style.setProperty('--turn-soft', `var(--p${p}-soft)`);
  }

  function renderScoreboard(bumpIndex) {
    const board = $('#scoreboard');
    board.innerHTML = '';
    state.players.forEach((p, i) => {
      const pct = Math.min(100, (p.score / state.target) * 100);
      const card = document.createElement('div');
      card.className = `score-card p${i}${i === state.current && state.winner === null ? ' active' : ''}`;
      card.innerHTML = `
        <span class="avatar" aria-hidden="true">${p.avatar}</span>
        <span class="name-row"><span class="name"></span><span class="goal">Race to ${state.target}</span></span>
        <span class="score${i === bumpIndex ? ' bump' : ''}" aria-label="${p.score} points">${p.score}</span>
        <div class="track" aria-hidden="true">
          <div class="fill" style="width:${pct}%"></div>
          <span class="runner" style="left:${pct}%">${p.avatar}</span>
          <span class="finish">🏁</span>
        </div>`;
      card.querySelector('.name').textContent = p.name;
      board.appendChild(card);
    });
  }

  function nextTurn(bannerText) {
    answered = false;
    question = Game.nextQuestion(state, COUNTRIES);
    setTurnColors();
    renderScoreboard();

    const player = state.players[state.current];
    const banner = $('#turn-banner');
    banner.textContent = bannerText || `${player.avatar} ${player.name}'s turn!`;
    banner.classList.remove('pop');
    void banner.offsetWidth; // restart animation
    banner.classList.add('pop');
    if (bannerText) {
      setTimeout(() => {
        if (!answered) banner.textContent = `${player.avatar} ${player.name}'s turn!`;
      }, 1800);
    }

    renderQuestion();
  }

  function renderQuestion() {
    const prompt = $('#prompt');
    const bigFlag = $('#big-flag');
    const options = $('#options');
    $('#feedback').textContent = '';
    $('#feedback').className = 'feedback';
    $('#next-btn').hidden = true;
    options.innerHTML = '';

    if (question.type === 'flag-to-country') {
      prompt.textContent = 'Which country has this flag?';
      bigFlag.textContent = flagEmoji(question.answer.code);
      bigFlag.setAttribute('aria-label', 'Flag');
    } else {
      prompt.innerHTML = 'Which is the flag of <span class="country"></span>?';
      prompt.querySelector('.country').textContent = question.answer.name;
      bigFlag.textContent = '';
    }

    question.options.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option' + (question.type === 'country-to-flag' ? ' flag-option' : '');
      const num = `<span class="num">${i + 1}</span>`;
      if (question.type === 'country-to-flag') {
        btn.innerHTML = `${num}${flagEmoji(c.code)}`;
        btn.setAttribute('aria-label', `Option ${i + 1}`);
      } else {
        btn.innerHTML = num;
        btn.append(c.name);
      }
      btn.addEventListener('click', () => choose(i));
      options.appendChild(btn);
    });
  }

  function choose(i) {
    if (answered || !question) return;
    answered = true;
    const playerIndex = state.current;
    const player = state.players[playerIndex];
    const result = Game.submitAnswer(state, question, i);

    const buttons = [...document.querySelectorAll('#options .option')];
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === question.correctIndex) b.classList.add('correct');
      else if (idx === i) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    const answerText = `${question.answer.name} ${flagEmoji(question.answer.code)}`;
    const feedback = $('#feedback');
    if (result.correct) {
      feedback.className = 'feedback good';
      feedback.textContent = `🎉 Yes, ${player.name}! That's ${answerText}`;
    } else {
      feedback.className = 'feedback bad';
      feedback.textContent = `Nice try! It was ${answerText}`;
    }
    $('#turn-banner').textContent = `${player.avatar} ${player.name}'s turn!`;
    renderScoreboard(result.correct ? playerIndex : undefined);

    if (result.winner !== null) {
      setTimeout(showWinner, 1400);
    } else {
      const next = $('#next-btn');
      next.hidden = false;
      next.focus();
    }
  }

  function goNext() {
    if (!answered || state.winner !== null) return;
    Game.endTurn(state);
    nextTurn();
  }

  $('#next-btn').addEventListener('click', goNext);

  // ---------- winner ----------
  function showWinner() {
    const w = state.players[state.winner];
    const other = state.players[1 - state.winner];
    $('#win-title').textContent = `${w.avatar} ${w.name} wins!`;
    $('#win-sub').textContent =
      other.score === 0
        ? `Great try, ${other.name}! You'll get them next time!`
        : `Great game, ${other.name}! You scored ${other.score} ${other.score === 1 ? 'point' : 'points'}!`;
    show('win');
    launchConfetti();
    $('#again-btn').focus();
  }

  function launchConfetti() {
    const box = $('#confetti');
    box.innerHTML = '';
    const colors = ['#7c4dff', '#ff7a00', '#1fa85a', '#ffcc00', '#2b7cff', '#e5484d'];
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('span');
      s.style.left = `${Math.random() * 100}%`;
      s.style.background = colors[i % colors.length];
      s.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
      s.style.animationDelay = `${Math.random() * 1.5}s`;
      box.appendChild(s);
    }
  }

  $('#again-btn').addEventListener('click', () => startGame(false));
  $('#home-btn').addEventListener('click', () => show('home'));

  // ---------- keyboard ----------
  document.addEventListener('keydown', (e) => {
    if (!$('#screen-game').classList.contains('active')) return;
    if (!answered && /^[1-9]$/.test(e.key)) {
      const idx = Number(e.key) - 1;
      if (question && idx < question.options.length) choose(idx);
    } else if (answered && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      goNext();
    }
  });
})();
