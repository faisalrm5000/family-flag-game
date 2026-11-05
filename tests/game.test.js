// Run in a browser by opening tests/test.html, or with Node: node tests/game.test.js
const isNode = typeof module !== 'undefined' && typeof require === 'function';
const Game = isNode ? require('../js/game.js') : window.FlagGame;
const { COUNTRIES, flagEmoji } = isNode ? require('../js/data.js') : window.FlagData;

// Tiny assert so the same file runs in Node and the browser.
const assert = {
  ok(v, msg) { if (!v) throw new Error(msg || 'expected truthy'); },
  equal(a, b, msg) { if (a !== b) throw new Error(msg || `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); },
  deepEqual(a, b, msg) { assert.equal(JSON.stringify(a), JSON.stringify(b), msg); },
  match(s, re) { if (!re.test(s)) throw new Error(`${s} does not match ${re}`); },
  throws(fn) { try { fn(); } catch (e) { return; } throw new Error('expected an error'); },
};

let passed = 0;
let failed = 0;
const results = [];
function test(name, fn) {
  try {
    fn();
    passed++;
    results.push({ name, ok: true });
  } catch (e) {
    failed++;
    results.push({ name, ok: false, error: e.message });
  }
}

// Seeded RNG so failures are reproducible.
function rng(seed = 42) {
  return () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

const players = [{ name: 'Gabi' }, { name: 'Oli' }];

test('data: about 30 countries with unique ISO codes', () => {
  assert.ok(COUNTRIES.length >= 30);
  const codes = new Set(COUNTRIES.map((c) => c.code));
  assert.equal(codes.size, COUNTRIES.length);
  COUNTRIES.forEach((c) => assert.match(c.code, /^[A-Z]{2}$/));
});

test('flagEmoji builds regional-indicator flags', () => {
  assert.equal(flagEmoji('FR'), '🇫🇷');
  assert.equal(flagEmoji('gb'), '🇬🇧');
});

test('new game: both scores 0, starter goes first', () => {
  const s = Game.createGame({ players, starter: 1 });
  assert.deepEqual(s.players.map((p) => p.score), [0, 0]);
  assert.equal(s.current, 1);
  assert.equal(s.target, 15);
});

test('question has 4 distinct options including the answer', () => {
  const s = Game.createGame({ players });
  const r = rng();
  for (let i = 0; i < 200; i++) {
    const q = Game.nextQuestion(s, COUNTRIES, r);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((c) => c.code)).size, 4);
    assert.equal(q.options[q.correctIndex].code, q.answer.code);
    assert.ok(Game.QUESTION_TYPES.includes(q.type));
  }
});

test('no question repeats until that type runs out of countries', () => {
  const s = Game.createGame({ players });
  const r = rng(7);
  const seen = new Set();
  for (let i = 0; i < 40; i++) {
    const q = Game.nextQuestion(s, COUNTRIES, r);
    const key = `${q.type}:${q.answer.code}`;
    assert.ok(!seen.has(key), `repeated ${key} at question ${i}`);
    seen.add(key);
  }
});

test('never more than 2 of the same question type in a row', () => {
  const s = Game.createGame({ players });
  const r = rng(3);
  const types = [];
  for (let i = 0; i < 300; i++) types.push(Game.nextQuestion(s, COUNTRIES, r).type);
  for (let i = 2; i < types.length; i++) {
    assert.ok(!(types[i] === types[i - 1] && types[i] === types[i - 2]), `3 in a row at ${i}`);
  }
});

test('correct answer +1, wrong answer +0 (no penalty)', () => {
  const s = Game.createGame({ players, starter: 0 });
  const q = Game.nextQuestion(s, COUNTRIES, rng());
  assert.equal(Game.submitAnswer(s, q, q.correctIndex).correct, true);
  assert.equal(s.players[0].score, 1);
  Game.endTurn(s);
  const q2 = Game.nextQuestion(s, COUNTRIES, rng(9));
  const wrong = (q2.correctIndex + 1) % q2.options.length;
  assert.equal(Game.submitAnswer(s, q2, wrong).correct, false);
  assert.equal(s.players[1].score, 0);
});

test('turns alternate between players', () => {
  const s = Game.createGame({ players, starter: 0 });
  Game.endTurn(s);
  assert.equal(s.current, 1);
  Game.endTurn(s);
  assert.equal(s.current, 0);
});

test('first to 15 wins and the game stops', () => {
  const s = Game.createGame({ players, starter: 0 });
  const r = rng(5);
  let result;
  while (s.winner === null) {
    const q = Game.nextQuestion(s, COUNTRIES, r);
    // Player 0 always right, player 1 always wrong.
    const choice = s.current === 0 ? q.correctIndex : (q.correctIndex + 1) % 4;
    result = Game.submitAnswer(s, q, choice);
    Game.endTurn(s);
  }
  assert.equal(result.winner, 0);
  assert.equal(s.players[0].score, 15);
  assert.equal(s.current, 0, 'endTurn does nothing after a win');
  const q = Game.nextQuestion(s, COUNTRIES, r);
  assert.throws(() => Game.submitAnswer(s, q, 0));
});

test('a long game never runs out of questions', () => {
  const s = Game.createGame({ players, target: 1000 });
  const r = rng(11);
  for (let i = 0; i < 500; i++) Game.nextQuestion(s, COUNTRIES, r);
});

const summary = `${passed} passed, ${failed} failed`;
if (isNode) {
  results.forEach((r) => console.log(`  ${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : ` (${r.error})`}`));
  console.log(`\n${summary}`);
  if (failed) process.exit(1);
} else {
  window.TEST_RESULTS = { passed, failed, results };
  document.getElementById('results').innerHTML =
    `<h1>${failed ? '❌' : '✅'} ${summary}</h1><ul>` +
    results.map((r) => `<li>${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : ` — ${r.error}`}</li>`).join('') +
    '</ul>';
}
