import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startPara: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: true,
  charIntervalMs: 80,
  fadeWords: -1, // scores do their own fading
  cycleScores: true, // one cycle plays all eighteen scores (one para): without it a "cycle" was a single score
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 0,
  durationScale: 1, // multiplier on all durations
};
export { config };
