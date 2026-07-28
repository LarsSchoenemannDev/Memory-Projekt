# Memory Game

A two-player memory card game for the browser, built with vanilla TypeScript, Vite and SCSS no framework, no runtime dependencies.

Diese README auf [Deutsch](README.de.md)

## Features

- **Two visual themes** — *Code vibes* and *Gaming*, each with its own card set, colour scheme and board styling
- **Two players** — Blue vs. Orange, with automatic turn switching
- **Three board sizes** — 16, 24 or 36 cards (8, 12 or 18 pairs)
- **Live scoring** per player, plus a game-over screen showing the winner or a draw
- **Keyboard playable** — every card is a real `<button>`; matched pairs are disabled and skipped when tabbing
- **Self-hosted fonts** — no external requests at runtime

## Tech stack

- **Language:** TypeScript 6, strict mode
- **Build tool:** Vite 8
- **Styling:** SCSS, 7-1 pattern
- **Runtime dependencies:** none

## Getting started

### Prerequisites

Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8) and npm.

Check your version:

```bash
node -v
```

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Vite prints a local URL, usually http://localhost:5173

## Scripts

- `npm run dev` starts the Vite dev server with hot reload
- `npm run build` type-checks with `tsc --noEmit`, then bundles into `dist/`
- `npm run preview` serves the production build from `dist/` locally

## How to play

1. Press **Play** on the start screen.
2. Pick a theme, a starting player and a board size. The **Start** button stays disabled until all three are chosen.
3. Flip two cards. A match scores a point for the current player and the cards stay face up; a mismatch flips them back and passes the turn.
4. Once every pair is found, the game-over screen shows the final score and the winner.

**Keyboard:** `Tab` moves between cards, `Enter` or `Space` flips one.

**Debug:** `Ctrl` + `P` auto-plays the entire board, useful for reaching the game-over screen quickly.

## Project structure

```
index.html              All four screens as static markup
src/
  main.ts               Game state, logic and DOM updates
  innerHTML.ts          HTML template functions for dynamic parts
  interfaces.ts         TypeScript types
  main.scss             SCSS entry point, @use only
  abstracts/            Variables and mixins
  base/                 Reset and @font-face
  layout/               Page layout
  components/           Cards, buttons, popup, settings menu
  pages/                Home and game-over screens
  themes/               Theme-specific overrides
  assets/fonts/         Self-hosted woff2
public/assets/img/      Card artwork and icons
```

There is no router. All four screens live in `index.html` and are toggled by adding or removing a `.hidden` class.

## Known issues

- The *Gaming* theme lists three card images that are missing from `public/assets/img/themes/gaming/` — `Asset1@2x1.png`, `Asset2@2x1.png` and `Asset7@2x1.png`. Cards using them render broken. `Asset7` is hit at every board size.
- Radio buttons in the settings screen have no visible focus indicator, so keyboard navigation there is hard to follow.
- The layout uses fixed pixel dimensions and is not responsive.
- Not deployed yet.

## Credits

- Fonts: [Almarai](https://fonts.google.com/specimen/Almarai) and [Red Rose](https://fonts.google.com/specimen/Red+Rose), both under the SIL Open Font License, self-hosted as woff2
- Card artwork and interface icons: design assets specific to this project

## License

Private learning project. No licence is granted for reuse — parts of the artwork come from third-party sources.
