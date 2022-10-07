import type { IRoundTextWord } from './types';

export default function countRoundTextChars(words: IRoundTextWord[]) {
  let charCount = 0;
  for (const word of words) {
    charCount += word.chars.length;
  }
  return charCount;
}
