import type { IRoundTextWord } from './types';

export function countRountTextWordMistakes(word: IRoundTextWord) {
  let numMistakesForWord = 0;
  for (const char of word.chars) {
    numMistakesForWord += char.mistakes.length;
  }
  return numMistakesForWord;
}
