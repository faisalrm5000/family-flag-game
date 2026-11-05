# Flag Game

A flag game project by High Intent Labs.

## Project status

M1 (playable prototype) is built. See memory.md for progress.

## Code layout

- `index.html`, `styles.css`: the page and its styles
- `js/data.js`: country data (the only source of question content)
- `js/game.js`: pure game logic with no DOM, so it can be tested
- `js/app.js`: the UI, which connects game logic to the page
- `tests/game.test.js`: logic tests. Open `tests/test.html` in a browser to run them (Node isn't installed on this Mac).

## How to run

Plain static files with no build step. Serve the folder, then open http://localhost:8765:

```bash
python3 -m http.server 8765 --directory "/Users/faisal/Desktop/High Intent Labs/Flag Game"
```

Port 8000 is used by something else on this Mac. Opening `index.html` by double-clicking also works.

## Hosting

- Repo: https://github.com/faisalrm5000/family-flag-game (**public**)
- Live site: https://faisalrm5000.github.io/family-flag-game/ (GitHub Pages, `main` branch, root folder)
- To publish changes: commit, then `git push`. Pages redeploys automatically.
- **Privacy:** the repo is public. The children's first names are fine, but never put their ages or other personal details in any file.

# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

I would like to create a website that incorporates a game for my children. Gabi is the older child and Oli is the younger. In this game I want them to learn about countries, continents, cities, and flags. I want them both to enjoy playing this game. I want them to be able to play simultaneously. It asks one a question then the other and they can accumulate points on a scoreboard. If one player is a few points behind, then a special question can be asked, which allows them to score any number of points to equal one less than the other player currently has. Whoever gets to 15 first wins.  

Create a product requirement document (PRD) for this project.

The PRD is in [PRD.md](PRD.md). It is the source of truth for game rules and scope.


## Instructions

In this folder there is a file called memory.md. 
Use memory.md to document everything we do in this project: 
- What we are learning 
- Key takeaway 
- Progress 
- And any important decisions.
Keep memory.md up to date at all times. 
Every time we start a new session, read Claude.md and memory.md first to get full project context. 