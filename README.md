# shi

Animated translations of classical Chinese quatrains, by John Cayley:
*Maple Bridge*, *River Snow*, *Treading the Void* and *Luzhai*. An
Observable Notebook Kit project, converted from an Observable Framework
site (`framework/shi`). Each poem's playback uses the shared engine
[observable2/scoringthespeltair](https://github.com/observable2/scoringthespeltair):
the first three through the legacy `defaultConfig` (the poem-local
`play()` loops of the Framework site are gone), *Luzhai* through a
config exported by its scoring notebook (see Luzhai).

Co-implemented with Claude (Sonnet 5.5), 2026-10-31.

## Commands

- `npm run preview`: local preview at http://localhost:5173
- `npm run build`: build to `./dist`

## Layout

```
nbks/index.html         landing page: links to the poems
nbks/custom.tmpl        page template for all: black stage, type,
                        .spel/.char/.glow styles, byline
nbks/maple-bridge.html  a poem = one notebook: markup, the page's own
nbks/river-snow.html    CSS, loading, play()
nbks/treading-void.html
nbks/data/<poem>/       config.js, spels.json, paras.json,
                        scores.json, the calligraphy image
nbks/luzhai.html        Luzhai's player (no calligraphy)
nbks/scoring-luzhai.html  Luzhai's scoring notebook
nbks/data/luzhai/       what the notebook exports (see Luzhai)
raw/maple-bridge/       (untracked) recordings and score sources,
                        not built
```

A poem notebook is short and the same for all three: it loads the
poem's `config.js`, `spels.json`, `paras.json` and `scores.json`, puts
the spels in `#field`, splits them into characters if `charFades`, and
calls `play()`. Only the `<style>` in each notebook differs (the
field's position, the image). To add a poem, copy a notebook and a
`data/<poem>/` folder, and add a link in `index.html`.

## Luzhai

Unlike the other three, *Luzhai* is scored in a notebook, made from the
engine's scoring template (`scoring-luzhai.html`, the same cells as
`noreaster`'s). Enter the translation (with its markup) in the `galley`
cell, set the `config` cell, optionally align a recording (the
performance cells), then save the files from the Export cell into
`nbks/data/luzhai/`: `spels.json`, `paras.json`, `scores.json`,
`scores-timeToRead.json`, `config.json`, `measured.json` (and
`onsets.json` if a recording was aligned). `luzhai.html` reads them with
`createConfig`, so the player cannot disagree with the notebook.

`nbks/data/luzhai/` starts with **placeholder** data (a four-line
dummy text, roughly placed) so that the page builds; the first export
replaces it. The page has no image; its only styles are the two fade
rules per unit and the field's position. The scoring notebook loads the
engine from jsDelivr (`@v0.15.0`, the one place to change when moving to a
new release), the page from npm like the others.

**Chinese and the cursive font.** In the notebook each Han character
is a spel of its own (with the punctuation after it), so a line of
characters is animated character by character. Spels can use the
Google font Liu Jian Mao Cao: wrap them in
`<!--@ font:cursive --> ... <!--@ /font -->` in the galley (the names
are in the `fonts` table in the `config` cell). The notebook measures
them in that font, and the exported spels carry it in their `html`.
`custom.tmpl` links the font from Google Fonts for every page in this
project; the browser fetches only the slices of characters used.

## What came from where

- `mapleBridge.md`, `riverSnow.md`, `treadingVoid.md` (Framework
  `src`): the three notebooks in `nbks/`.
- `globalstyle.css`: `nbks/custom.tmpl` (the poem section).
- `data/<poem>/config.js`: `nbks/data/<poem>/config.js`, which spreads
  the engine's `defaultConfig`.
- `data/<poem>/{spels,paras,scores}.json` and the image:
  `nbks/data/<poem>/`; `scores.json` converted to milliseconds.
- `components/play.js`, `utils.js` (and the `play()` pasted into each
  page): the engine.
- `data/mapleBridge/` audio, timestamps, `score*.json`:
  `raw/maple-bridge/`.

Not brought over: `you.md` (an unfinished experiment) and the unused
`getNotebook.js`.

## Differences from the Framework site

- **Milliseconds.** The engine's times are all milliseconds;
  `scores.json` was converted once with the engine's
  `scripts/migrate-scores-to-ms.js`, and the configs use the `...Ms`
  keys.
- **Font weight.** The pages set `font-weight` from
  `config.fontWeight` (300, the weight the spels were measured at);
  fonts are bundled (Source Serif 4), not loaded from Google.
- **Maple Bridge's ten scores** were hard-coded in its page (per-score
  speed, `glow` effect, shuffling, gaps). They are now data in its
  `config.js` (`cycleScores`, `scoreSettings`), described in the
  engine's README under "Per-score settings".
- **Timing.** The old pages also paused 3 s at the start of *every*
  pass through the poem (Maple Bridge, Treading the Void). Treading the
  Void keeps that with `interScoreMs: 6000`; Maple Bridge's cycle gap
  is 3 s instead of 6 s.
- No hover colour on the field (the `.fade:hover` rule) and no
  `#frame`-wide `.fade` class.
- Each poem is its own page at `/<poem>.html` rather than a Framework
  route.

## Working with the engine

`package.json` depends on `github:observable2/scoringthespeltair#vX.Y.Z`,
a tagged release; `package-lock.json` pins the commit, so nothing
updates until you bump the tag. To bump, push the engine tag, then run
`node node_modules/scoringthespeltair/scripts/bump.js vX.Y.Z` in this
folder (`--dry` previews). Do not use plain `npm install` or
`npm update` for this: inside the `scored-air` workspace they update
the shared root lockfile, not this project's own, which is the one the
deploy builds from. Commit `package.json` and `package-lock.json`.

## Checks

Played in headless Chrome (with a fake clock to run Maple Bridge's
whole 5-minute cycle): all three pages load their data and image,
animate with no console errors, and Maple Bridge reads in, pulses with
`glow`, erases, clears and restarts. Not checked: a side-by-side
comparison of timing and looks with the Framework originals, or other
browsers.
