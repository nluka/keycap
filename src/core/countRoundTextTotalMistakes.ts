import { countRountTextWordMistakes } from './countRoundTextWordMistakes';
import type { IRoundTextWord } from './types';

export function countRoundTextTotalMistakes(words: IRoundTextWord[]) {
  let totalMistakeCount = 0;
  for (const word of words) {
    totalMistakeCount += countRountTextWordMistakes(word);
  }
  return totalMistakeCount;
}
