// Pure game logic: no DOM. Works in the browser (window.FlagGame) and in Node (require).
(function (root) {
  const QUESTION_TYPES = ['flag-to-country', 'country-to-flag'];
  const DEFAULT_TARGET = 15;
  const DEFAULT_OPTIONS = 4;

  function shuffle(arr, rng = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function createGame({ players, starter = 0, target = DEFAULT_TARGET, numOptions = DEFAULT_OPTIONS }) {
    if (!players || players.length !== 2) throw new Error('Flag Game needs exactly 2 players');
    return {
      players: players.map((p) => ({ ...p, score: 0 })),
      starter,
      current: starter,
      target,
      numOptions,
      used: [], // "type:CODE" keys asked this game, so nothing repeats
      recentTypes: [],
      winner: null,
    };
  }

  function pickType(state, rng) {
    const last2 = state.recentTypes.slice(-2);
    // Never more than 2 of the same type in a row.
    if (last2.length === 2 && last2[0] === last2[1]) {
      return QUESTION_TYPES.find((t) => t !== last2[0]);
    }
    return QUESTION_TYPES[Math.floor(rng() * QUESTION_TYPES.length)];
  }

  function nextQuestion(state, countries, rng = Math.random) {
    const type = pickType(state, rng);
    let pool = countries.filter((c) => !state.used.includes(`${type}:${c.code}`));
    if (pool.length === 0) {
      // Every country used for this type: start that type's cycle again.
      state.used = state.used.filter((k) => !k.startsWith(`${type}:`));
      pool = countries.slice();
    }
    const answer = pool[Math.floor(rng() * pool.length)];
    const distractors = shuffle(
      countries.filter((c) => c.code !== answer.code),
      rng
    ).slice(0, state.numOptions - 1);
    const options = shuffle([answer, ...distractors], rng);

    state.used.push(`${type}:${answer.code}`);
    state.recentTypes.push(type);
    return { type, answer, options, correctIndex: options.indexOf(answer) };
  }

  function submitAnswer(state, question, choiceIndex) {
    if (state.winner !== null) throw new Error('Game is already over');
    const correct = choiceIndex === question.correctIndex;
    const player = state.players[state.current];
    if (correct) player.score += 1;
    if (player.score >= state.target) state.winner = state.current;
    return { correct, winner: state.winner };
  }

  function endTurn(state) {
    if (state.winner === null) state.current = 1 - state.current;
  }

  const api = { QUESTION_TYPES, DEFAULT_TARGET, shuffle, createGame, nextQuestion, submitAnswer, endTurn };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FlagGame = api;
})(typeof window !== 'undefined' ? window : globalThis);
