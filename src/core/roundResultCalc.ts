import type { IPracticeRoundResult, Time } from 'keycap-foundation';
import getMinutesElapsed from '../utility/functions/getMinutesElapsed';
import { CHARACTERS_PER_WORD } from './constants';
import roundResultCalcAccuracyPercentage from './roundResultCalcAccuracyPercentage';
import roundResultCalcNetWordsPerMinute from './roundResultCalcNetWordsPerMinute';
import roundTextCalcCharCount from './roundTextCalcCharCount';
import { roundTextCalcTotalMistakeCount } from './roundTextCalcTotalMistakeCount';
import type IRoundTextItem from './types/IRoundTextItem';

/**
 * @param items The items of an `IRoundText` object.
 * @param startTime The start time of the round.
 * @param endTime The end time of the round.
 * @returns An `IRoundResult` object with all properties calculated.
 */
export function roundResultCalc(
  items: IRoundTextItem[],
  startTime: Time,
  endTime: Time,
): IPracticeRoundResult {
  const charCount = roundTextCalcCharCount(items);
  return {
    netWordsPerMinute: roundResultCalcNetWordsPerMinute(
      charCount,
      CHARACTERS_PER_WORD,
      getMinutesElapsed(startTime, endTime),
    ),
    accuracyPercentage: roundResultCalcAccuracyPercentage(
      charCount,
      roundTextCalcTotalMistakeCount(items),
    ),
    timeElapsed: endTime - startTime,
  };
}
