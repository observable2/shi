import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startingPoint: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: true,
  charIntervalMs: 60,
  fadeWords: -1, // scores do their own fading (no AUTOFADE items here: scores toggle spels on and off)
  cycleScores: true, // one cycle plays all ten scores in order
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 3000,
  slower: 1, // multiplier on all times
  // per-score settings (see scoringthespeltair README, "Per-score settings"); index = score number.
  // slower scales the score's own pauses and fades; interScoreMs is the gap after it;
  // glow scores pulse the already-visible poem, their items in a new random order each time
  scoreSettings: [
    { slower: 0.75 },                                                    // 0 the whole text, read in
    { slower: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    // 1-4 the poem's words glow on,
    { slower: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     off,
    { slower: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     on,
    { slower: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     off
    { slower: 1, interScoreMs: 5000 },                                   // 5 erase to show the poem
    { slower: 1, interScoreMs: 2000 },                                   // 6 the poem erasing
    { slower: 1, interScoreMs: 5000 },                                   // 7 the poem to show
    { slower: 0.5, interScoreMs: 2000 },                                 // 8 erase to fill
    { slower: 0, interScoreMs: 3000 },                                   // 9 all to clear
  ],
};
export { config };
