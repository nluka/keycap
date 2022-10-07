import type { IRoundTextWord } from './types';

export default function countCompletedRoundTextWords(words: IRoundTextWord[]) {
  let wordsCompletedCount = 0;
  for (const word of words) {
    if (!word.isCompleted) {
      break;
    }
    ++wordsCompletedCount;
  }
  return wordsCompletedCount;
}
