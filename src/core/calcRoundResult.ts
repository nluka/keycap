import minutesElapsed from '../utility/functions/minutesElapsed';
import type { IPracticeRoundResult } from '../utility/types/practice';
import type Time from '../utility/types/Time';
import { CHARS_PER_WORD } from './constants';
import calcAccuracy from './calcAccuracy';
import calcNetWPM from './calcNetWPM';
import countRoundTextChars from './countRoundTextChars';
import { countRoundTextTotalMistakes } from './countRoundTextTotalMistakes';
import type { IRoundTextWord } from './types';

export function calcRoundResult(
  words: IRoundTextWord[],
  roundStartTime: Time,
  roundEndTime: Time,
): IPracticeRoundResult {
  const charCount = countRoundTextChars(words);
  return {
    netWordsPerMinute: calcNetWPM(
      charCount,
      CHARS_PER_WORD,
      minutesElapsed(roundStartTime, roundEndTime),
    ),
    accuracyPercentage: calcAccuracy(
      charCount,
      countRoundTextTotalMistakes(words),
    ),
    timeElapsed: roundEndTime - roundStartTime,
  };
}
