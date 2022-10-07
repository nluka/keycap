import countCompletedRoundTextWords from './countCompletedRoundTextWords';
import type { IRoundTextWord } from './types';

export default function firstUncompletedRoundTextWordIdx(
  words: IRoundTextWord[],
) {
  return countCompletedRoundTextWords(words);
}
