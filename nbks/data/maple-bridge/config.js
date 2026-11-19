import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startPara: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: true,
  charIntervalMs: 60,
  // scores do their own fading: they toggle spels on and off
  fadeWords: -1,
  // one cycle plays all ten scores in order
  cycleScores: true,
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 3000,
  durationScale: 1, // multiplier on all durations
  // per-score settings (see the engine README, "Per-score settings"),
  // indexed by score number. durationScale scales the score's own
  // durations; interScoreMs is the gap after it. Glow scores pulse
  // the already-visible poem, their items in a new random order
  // each time.
  scoreSettings: [
    // 0: the whole text, read in
    { durationScale: 0.75 },
    // 1-4: the poem's words glow on, off, on, off
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },
    { durationScale: 0.25, effect: "glow", shuffle: true, interScoreMs: 0 },
    // 5: erase to show the poem
    { durationScale: 1, interScoreMs: 5000 },
    // 6: the poem erasing
    { durationScale: 1, interScoreMs: 2000 },
    // 7: the poem to show
    { durationScale: 1, interScoreMs: 5000 },
    // 8: erase to fill
    { durationScale: 0.5, interScoreMs: 2000 },
    // 9: all to clear
    { durationScale: 0, interScoreMs: 3000 },
  ],
};
export { config };
