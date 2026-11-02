# shi

Animated translations of classical Chinese quatrains, by John Cayley: *Maple Bridge*, *River Snow* and
*Treading the Void*. An Observable Notebook Kit project, converted from an Observable Framework site
`framework/shi` Each poem's playback uses the shared engine
[observable2/scoringthespeltair](https://github.com/observable2/scoringthespeltair); the poem-local
`play()` loops of the Framework site are gone.

Co-implemented with Claude (Sonnet 5.5), 2026-10-31.

## Commands

- `npm run preview`: local preview at http://localhost:5173
- `npm run build`: build to `./dist`

## Layout

```
nbks/index.html            landing page: links to the poems
nbks/custom.tmpl           one page template for all: black stage, type, .spel/.char/.glow styles, byline
nbks/maple-bridge.html     a poem = one notebook: markup, the page's own CSS, loading, play()
nbks/river-snow.html
nbks/treading-void.html
nbks/data/<poem>/          config.js, spels.json, paras.json, scores.json, the calligraphy image
raw/maple-bridge/          (untracked) recordings and score sources, not built
```

A poem notebook is short and the same for all three: it loads the poem's `config.js`, `spels.json`,
`paras.json` and `scores.json`, puts the spels in `#field`, splits them into characters if
`charFades`, and calls `play()`. Only the `<style>` in each notebook differs (the field's position, the
image). Adding a poem: copy a notebook and a `data/<poem>/` folder, add a link in `index.html`.

## What came from where

| Framework (`framework/shi/src`) | Here |
|---|---|
| `mapleBridge.md`, `riverSnow.md`, `treadingVoid.md` | `nbks/maple-bridge.html`, `river-snow.html`, `treading-void.html` |
| `globalstyle.css` | `nbks/custom.tmpl` (the poem section) |
| `data/<poem>/config.js` | `nbks/data/<poem>/config.js`: spreads the engine's `defaultConfig` |
| `data/<poem>/{spels,paras,scores}.json` + image | `nbks/data/<poem>/`; `scores.json` converted to milliseconds |
| `components/play.js`, `utils.js` (and the `play()` pasted into each page) | the engine |
| `data/mapleBridge/` audio, timestamps, `score*.json` | `raw/maple-bridge/` |

Not brought over: `you.md` (an unfinished experiment, not in `nbks/`) and the unused `getNotebook.js`.

## Differences from the Framework site

- **Milliseconds.** The engine's times are all milliseconds; `scores.json` was converted once with the
  engine's `scripts/migrate-scores-to-ms.js`, and the configs use the `...Ms` keys.
- **Font weight.** The pages set `font-weight` from `config.fontWeight` (300, the weight the spels were
  measured at), as the engine's README describes; fonts are bundled (Source Serif 4), not loaded from Google.
- **Maple Bridge's ten scores** were hard-coded in its page (per-score speed, `glow` effect, shuffling, gaps).
  They are now data in its `config.js` (`cycleScores`, `scoreSettings`), which required new engine features,
  documented in the engine's README under "Per-score settings". `splitIntoChars` also moved into the engine.
- **Small timing differences.** The old pages also paused 3 s at the start of *every* pass through the
  poem (Maple Bridge, Treading the Void). Treading the Void keeps that with `interScoreMs: 6000`;
  Maple Bridge's cycle gap is 3 s instead of 6 s.
- No hover colour on the field (the `.fade:hover` rule) and no `#frame`-wide `.fade` class.
- Each poem is its own page at `/<poem>.html` rather than a Framework route.

## Working with the engine

`package.json` depends on `github:observable2/scoringthespeltair` (no tag); `package-lock.json` pins the
commit, so nothing updates until you ask: commit and push the engine, then `npm update scoringthespeltair`
here and commit the lockfile.

**This project needs the engine changes of 2026-10-31** (engine v0.4.0: `cycleScores`, `scoreSettings`,
`splitIntoChars`), which are not on GitHub yet. Until they are pushed and the lock updated, the deployed
build would fail, because the pinned commit predates them. In the shared workspace
(`scored-air/package.json`), `npm install` puts a copy of the pushed engine in `shi/node_modules`; delete
`shi/node_modules` and the local engine folder is used instead.

## Checks

Played in headless Chrome (with a fake clock to run Maple Bridge's whole 5-minute cycle): all three pages
load their data and image, animate with no console errors, and Maple Bridge reads in, pulses with `glow`,
erases, clears and restarts. Not checked: a side-by-side comparison of timing and looks with the
Framework originals, or other browsers.
