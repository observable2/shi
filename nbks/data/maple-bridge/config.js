import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startPara: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: true,
  charIntervalMs: 60,
  fadeWords: -1, // scores do their own fading (no AUTOFADE items here: scores toggle spels on and off)
  cycleScores: true, // one cycle plays all ten scores in order
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 3000,
  durationScale: 1, // multiplier on all durations
  // per-score settings (see scoringthespeltair README, "Per-score settings"); index = score number.
  // durationScale scales the score's own pauses and fades; interScoreMs is the gap after it;
  // glow scores pulse the already-visible poem, their items in a new random order each time
  scoreSettings: [
    { durationScale: 0.75 },                                                    // 0 the whole text, read in
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    // 1-4 the poem's words glow on,
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     off,
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     on,
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },    //     off
    { durationScale: 1, interScoreMs: 5000 },                                   // 5 erase to show the poem
    { durationScale: 1, interScoreMs: 2000 },                                   // 6 the poem erasing
    { durationScale: 1, interScoreMs: 5000 },                                   // 7 the poem to show
    { durationScale: 0.5, interScoreMs: 2000 },                                 // 8 erase to fill
    { durationScale: 0, interScoreMs: 3000 },                                   // 9 all to clear
  ],
};
export { config };
