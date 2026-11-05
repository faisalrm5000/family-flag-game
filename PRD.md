# Flag Game: Product Requirements Document

| | |
|---|---|
| **Status** | Draft v2 (catch-up trigger, cities and device decided) |
| **Date** | 2026-11-05 |
| **Owner** | Faisal |
| **Players** | Gabi (older child), Oli (younger child) |

---

## 1. Summary

A two-player geography quiz website for Gabi and Oli. They take turns answering questions about **flags, countries, continents and cities** on one shared device. Each correct answer earns points on a shared scoreboard. A **catch-up question** gives the player who is behind a chance to jump back into the game. **The first player to reach 15 points wins.**

Each player gets questions pitched at their own age, so a younger and an older child can play together and both have a real chance to win.

## 2. Goals

1. **Learning.** Both children learn to recognise flags and connect countries to continents and cities.
2. **Fun.** Both children enjoy it and want to play again. It should be bright, rewarding and fast.
3. **Fairness.** The younger child can compete with the older one, through separate difficulty levels and the catch-up rule.
4. **Playing together.** Two players on one screen, taking turns.

### Non-goals (for v1)

- Online play between separate devices
- User accounts, logins, or storing personal data
- Ads, purchases, or third-party tracking
- More than two players (it could come later)

## 3. Users

| | **Oli (younger)** | **Gabi (older)** |
|---|---|---|
| Reading | Early or pre-reader. Needs pictures and questions read aloud. | Reads well. |
| Knowledge | Knows a few flags and maybe their own country | Knows some countries and capitals. Ready for continents and cities. |
| Attention | Short. Needs fast feedback and lots of praise. | Longer. Enjoys a challenge and beating a sibling. |
| Input | Clicks big buttons with a mouse or trackpad. May need extra-large targets. | Clicks, or uses number keys 1–4 |

**Parent (Faisal):** sets up a game, may help Oli read, and wants to trust that the content is accurate and safe.

## 4. Core game loop

```
Start screen → pick/confirm players → [Turn loop] → Winner screen → Play again
```

**Turn loop:**
1. The screen clearly shows whose turn it is (name, colour, avatar).
2. If the catch-up rule applies (§6), offer that player a **catch-up question**. Otherwise ask a normal question at their level.
3. The player answers by clicking one of the options (or pressing its number key).
4. Instant feedback: a happy animation and sound if right. If wrong, the correct answer is shown gently and there's no penalty.
5. Update the scoreboard. Check for a winner (§7).
6. Pass to the other player.

## 5. Questions

### 5.1 Question types

| Type | Example | Oli | Gabi |
|---|---|---|---|
| **Flag → Country** | Shows 🇫🇷 flag: "Which country is this?" | ✅ (with country pictures/names read aloud) | ✅ |
| **Country → Flag** | "Which is the flag of Japan?" (pick from flag images) | ✅ (main type for Oli) | ✅ |
| **Country → Continent** | "Which continent is Brazil in?" | ✅ (easy, well-known countries only) | ✅ |
| **Flag → Continent** | Shows a flag: "Which continent is this country in?" | ❌ | ✅ |
| **Capital city** | "What is the capital of Italy?" | ❌ | ✅ |
| **City → Country** | "Which country is Sydney in?" (capitals and famous cities) | ❌ | ✅ |
| **Odd one out** (stretch) | "Which flag is NOT from Europe?" | ❌ | ✅ |

### 5.2 Difficulty by player

| | **Level 1 (Oli)** | **Level 2 (Gabi)** |
|---|---|---|
| Answer choices | **3** big options, picture-led | **4** options |
| Country pool | About 30–40 well-known countries with distinctive flags (e.g. UK, USA, Japan, Canada, Brazil, France, Italy, India, China, Australia, South Africa, Mexico) | About 100+ countries, growing as Gabi improves |
| Read-aloud | **On by default.** Question and answers spoken aloud, with a 🔊 replay button. | Off by default, can be turned on |
| Timer | None | None in v1 (an optional timer could come later) |
| Wrong options | Clearly different (e.g. Japan vs Brazil vs Canada) | Can be similar (e.g. Ireland vs Italy vs Côte d'Ivoire) |

Each player profile has a **difficulty setting**, so the levels aren't tied to a name and a parent can move a child up when they're ready.

### 5.3 Question selection rules

- Don't repeat the same question in one game.
- Mix up question types. Avoid more than 2 of the same type in a row.
- Shuffle the order of answer options every time.
- Wrong options come from the same difficulty pool. At Level 2, prefer flags that look similar, so the question is a real test.

## 6. Catch-up question (the comeback rule)

This is the signature mechanic. It keeps the trailing player in the game.

### Rule

- **When it triggers:** automatically at the start of a player's turn, if they are **2 or more points behind** the other player. The player doesn't choose. The catch-up question replaces their normal question for that turn.
- **What's offered:** a **catch-up question**, shown with special styling (e.g. golden ⭐ "Catch-Up Question!" banner and music).
- **If right:** the player's score becomes **one less than the leader's score**.
  - Example: Gabi 10, Oli 4. Oli answers the catch-up question correctly → Oli now has **9**.
- **If wrong:** no change to the score. The turn passes as normal.
- **Difficulty:** the same as that player's normal questions, because the goal is to help the trailing player catch up.
- **Worth noting:** with a 2-point trigger, a player who is exactly 2 behind gains only 1 point from a correct catch-up answer, the same as a normal question. The catch-up question matters most when the gap is bigger.

### Limits (so it stays special)

- **Cooldown:** after a catch-up question (right or wrong), that player can't get another one for their next **2 turns**.
- A catch-up question can never make a player *win*. They always end exactly one point behind the leader.

### Default values (adjustable in settings)

| Setting | Default |
|---|---|
| Points behind to trigger | 2 |
| Cooldown (player's own turns) | 2 |

## 7. Scoring and winning

- **Correct normal answer:** +1 point.
- **Wrong answer:** 0 points. No points are ever taken away.
- **Win:** the first player to reach **15 points** wins straight away.
- **Fair start:** whoever went second last game goes first next game. The first game's starter is chosen with a coin-flip animation.
- **Winning target** can be changed in settings (e.g. 10 for a quick game, 15 by default).

## 8. Screens

1. **Home**: Game title, big **Play** button, a small ⚙️ settings button for the parent.
2. **Player setup**: Two player cards (Gabi and Oli are pre-filled), each with a name, colour, avatar (animal emoji or icon) and difficulty level. Saved between visits.
3. **Game screen**:
   - A **scoreboard** that's always visible at the top: both names, avatars and scores, plus a progress bar toward 15 (e.g. a rocket or racing car moving along a track).
   - A **turn banner** in the current player's colour: "Oli's turn!"
   - **Question area** with a large flag image where relevant.
   - **Answer buttons**: large, high contrast, at least 80px tall at Level 1, so they're easy for a young child to hit with a mouse or trackpad. Each button shows its number (1–4) for keyboard play.
   - A **🔊 button** to hear the question again.
4. **Feedback overlay**: ✅ celebration or ❌ "Nice try! It was **Kenya** 🇰🇪", with a short fun fact (e.g. "Kenya is in Africa").
5. **Winner screen**: confetti, the winner's name and a trophy. There's a kind word for the other player too ("Great game, Oli! You scored 12!"), plus **Play Again**.
6. **Settings (parent)**: target score, catch-up threshold and cooldown, sound on/off, read-aloud defaults, and difficulty for each player.

## 9. Learning features

- **Fun fact** after every answer, short and age-appropriate. It's read aloud for Level 1.
- **Continent colours:** each continent has a consistent colour across the game, so the colours themselves help the children remember.
- **End-of-game recap** (stretch): "Flags you learned today" showing 3–5 flags from the game.
- **World map highlight** (stretch): after an answer, a simple map shows where that country is.

## 10. Content and data

- A single data file (e.g. `data/countries.json`) holds every country:
  `code` (ISO 3166-1 alpha-2), `name`, `continent`, `capital`, `famousCities[]` (well-known non-capital cities such as Sydney, New York, Rio de Janeiro, Barcelona), `difficulty` (1 or 2), `funFact`.
- **Flags:** stored locally as SVG files, so the game works offline and makes no outside requests. Source: an openly licensed set such as [flag-icons](https://github.com/lipis/flag-icons) (MIT). The licence must be recorded in the repo.
- **Continents:** use the 7-continent model (Africa, Antarctica, Asia, Europe, North America, Oceania, South America). Antarctica isn't used as an answer for countries.
- **Accuracy:** a parent reviews all content once. Avoid disputed territories and politically sensitive questions.

## 11. Technical requirements

| Area | Requirement |
|---|---|
| Platform | Website that runs in a modern browser. **Laptop first** (mouse, trackpad and keyboard, landscape screen around 1280×800 and up). It should still be usable on a tablet. |
| Input | Mouse/trackpad clicks plus keyboard shortcuts: 1–4 to answer, Space/Enter to continue, R to replay read-aloud. |
| Stack | Static site: HTML, CSS and JavaScript (a light framework is fine). **No backend** needed for v1. |
| Hosting | Any static host (e.g. GitHub Pages, Netlify, Vercel), or opened locally. |
| Offline | Works offline after the first load (stretch: install as a PWA). |
| Storage | `localStorage` only, for player names, avatars, difficulty and settings. No personal data leaves the device. |
| Read-aloud | Browser Web Speech API (`speechSynthesis`), using a voice in the same language as the game (English). |
| Sound | Short sound effects for correct, wrong, catch-up and win. Can be muted. |
| Performance | Next question appears in under 1 second. Flags are optimised SVGs. |
| Accessibility | Large click targets, clear hover and focus states, high contrast, never relies on colour alone, respects reduced-motion settings. |
| Child safety | No ads, no external links during play, no chat, no tracking or analytics. |

## 12. Success criteria

- Both children can play a full game to 15 without adult help (Oli may need help only with setup).
- Oli wins at least some games against Gabi, so the catch-up rule and levels are balanced.
- The children ask to play again.
- Over a few weeks, each child gets better at recognising flags (seen as a rising share of correct answers).

## 13. Milestones

| Phase | Scope |
|---|---|
| **M1: Playable prototype** | Two players, Flag → Country and Country → Flag, scoring, win at 15, basic UI. ~30 countries. |
| **M2: Fair play** | Difficulty levels, catch-up question with cooldown, read-aloud for Level 1, feedback and fun facts. |
| **M3: Full content** | Continent and city questions, 100+ countries, settings screen, saved profiles. |
| **M4: Polish** | Animations, sounds, winner screen, offline/PWA, end-of-game recap. |
| **Later** | World map, more players, timed mode, extra question types, progress tracking over time. |

## 14. Open questions

1. **Language:** English only, or also another language spoken at home?
2. **Branding:** does the game need a name and a look (e.g. space, jungle, explorer theme)?

### Resolved

| Question | Answer |
|---|---|
| Catch-up trigger | 2+ points behind, offered automatically |
| Catch-up difficulty | Same as the player's normal level |
| Cities | Capitals plus famous non-capital cities |
| Main device | Laptop / computer |
