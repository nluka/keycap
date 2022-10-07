import type { IRoundTextWord } from './types';

// TODO: write tests
export default function countCorrectRoundTextChars(words: IRoundTextWord[]) {
  let correctInputCount = 0;
  for (const word of words) {
    for (const char of word.chars) {
      if (char.input === char.actual) {
        ++correctInputCount;
      }
    }
  }
  return correctInputCount;
}
