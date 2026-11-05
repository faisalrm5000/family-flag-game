# Flag Game: Project Memory

A running log of what we're doing, learning and deciding. Newest entries go at the top of each section.

## Project in one line

A two-player geography quiz website for Gabi (older) and Oli (younger) covering flags, countries, continents and cities. Players take turns on one device, there's a catch-up question for whoever is behind, and the first to 15 points wins. Full spec: [PRD.md](PRD.md).

## Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-11-05 | Two difficulty levels: Level 1 (Oli) has 3 picture-led options and read-aloud. Level 2 (Gabi) has 4 options and harder question types. | Lets a younger and an older child compete fairly |
| 2026-11-05 | Code hosted on GitHub at **FaisalRM3000/family-flag-game**, as a **public** repo published with GitHub Pages | Faisal wants the website live. Free GitHub Pages needs a public repo. |
| 2026-11-05 | Public repo keeps the children's **names** but **not their ages**. Docs say "older child" and "younger child" instead. | Faisal's choice, for privacy. **Never add their ages to any file in this repo.** |
| 2026-11-05 | M1 uses **emoji flags** (🇫🇷), not SVG files | They look great on macOS and need no downloads. Switch to local SVGs (flag-icons, MIT) in M3, since emoji flags don't show on Windows. |
| 2026-11-05 | Plain HTML/CSS/JS with classic `<script>` tags (no framework, no build, no ES modules) | Simplest option, and it also works when opening index.html straight from the folder |
| 2026-11-05 | Game logic (`js/game.js`) kept separate from the UI (`js/app.js`) | Rules can be tested without a browser UI. Catch-up and difficulty slot into game.js in M2. |
| 2026-11-05 | **Laptop first**: mouse/trackpad plus keyboard shortcuts (1–4 to answer). Extra-large buttons at Level 1. | Faisal: main device is a laptop |
| 2026-11-05 | City questions include capitals **and** famous non-capital cities (Sydney, New York, Rio...) | Faisal's choice |
| 2026-11-05 | Catch-up question is offered **automatically** when a player is **2+ points behind**, at the player's **normal level**. If right, their score becomes the leader's score minus 1. 2-turn cooldown. | Faisal's choice (changed from the draft's 3+). The cooldown keeps it special. |
| 2026-11-05 | No penalty for wrong answers. +1 for each correct answer. Win at 15 (adjustable). | Keeps it encouraging for young kids |
| 2026-11-05 | Static website with no backend. Stores settings in localStorage. Flags stored locally as SVGs. | Simple, private, works offline, child-safe |
| 2026-11-05 | Countries identified by ISO 3166-1 alpha-2 code, with all content in one data file | Single source of truth |
| 2026-11-05 | Wrote the PRD (PRD.md) as the first deliverable | Requested in CLAUDE.md |
| 2026-11-05 | Created project folder with CLAUDE.md and memory.md | Project kickoff |

## Progress log

- **2026-11-05:** Set up git and created the GitHub repo. Removed the children's ages from all files before publishing.
- **2026-11-05:** ✅ **M1 playable prototype built and tested.**
  - Two players with editable names (saved in the browser) and fixed avatars (🦊 Gabi, 🐼 Oli).
  - Two question types: Flag → Country and Country → Flag. Each has 4 options and draws from 30 countries.
  - +1 for each correct answer, no penalty, first to 15 wins. A random player starts the first game, then the starter swaps each game.
  - Scoreboard with a race-to-15 track, turn banner in the player's colour, green/red answer feedback, and a winner screen with confetti.
  - Keyboard: 1–4 to answer, Enter/Space for next.
  - 10 logic tests pass (tests/test.html). Full games were also played in the browser.
  - **Not in M1 yet** (planned for M2): catch-up question, difficulty levels (Oli still gets 4 text options), read-aloud, fun facts.
- **2026-11-05:** Revised PRD.md to draft v2 with Faisal's answers on the catch-up trigger, catch-up difficulty, cities and device.
- **2026-11-05:** Wrote PRD.md (draft v1). It covers goals, users, game loop, question types, difficulty levels, the catch-up rule, scoring, screens, data, tech requirements, milestones (M1–M4) and open questions.
- **2026-11-05:** Project folder initialized.

## What we're learning / key takeaways

- A big age gap matters in a quiz game. Fairness has to come from **separate difficulty levels** as well as the catch-up rule, or the older child wins every time.
- A young child may not read yet, so **read-aloud and picture-led answers** are core requirements, not extras.
- With a 2-point trigger, a catch-up answer when exactly 2 behind is only worth 1 point, the same as a normal question. The rule pays off most when the gap is big.
- Node.js isn't installed on this Mac, so tests run in the browser (tests/test.html). The test file also runs with Node if it's installed later.
- macOS blocks some tools from starting in a Desktop folder. Starting the local server from another folder with `--directory` gets around this.
- GitHub doesn't accept your account password for pushing code from the terminal. It needs a **personal access token**, which macOS Keychain saves after the first use.
- Turning a loose idea ("a few points behind") into a specific number early makes the game buildable and testable. The number can still be changed in settings.

## Open questions (waiting on Faisal)

1. English only, or another language too?
2. Name and theme for the game?

## Next steps

- Faisal plays M1 with Gabi and Oli and notes what they liked and what was hard.
- Build **M2: Fair play**: difficulty levels (Oli: 3 picture options, easy countries), catch-up question (2+ behind, 2-turn cooldown), read-aloud, fun facts.
- Language and theme are still open.

## Ideas / backlog

- World map highlight after each answer
- "Flags you learned today" recap
- Timed mode for Gabi
- More than two players
