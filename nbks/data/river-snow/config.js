import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startingPoint: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: true,
  charIntervalMs: 80,
  fadeWords: -1, // scores do their own fading
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 0,
  slower: 1, // multiplier on all times
};
export { config };
