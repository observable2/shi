import { defaultConfig } from "scoringthespeltair";

// all times are in milliseconds
const config = {
  ...defaultConfig,
  startingPoint: 0,
  fontWeight: 300, // the weight spels.json was measured at
  charFades: false, // whole spels fade in and out
  fadeWords: -1, // scores do their own fading
  creditsPauseMs: 0, // zero for no credits
  interCycleMs: 3000,
  interScoreMs: 6000, // between quatrains' paragraphs (the original paused 3 s after and 3 s before each)
  slower: 1, // multiplier on all times
};
export { config };
