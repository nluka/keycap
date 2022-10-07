import type { IRoundTextWord } from './types';

export default function updateRoundTextWord(
  word: IRoundTextWord,
  newInput: string,
  prevInput: string,
  leadingWords: IRoundTextWord[],
): [string, string] {
  if (word === undefined) {
    return ['', ''];
  }

  const chars = word.chars;

  if (chars.length < 1) {
    throw new RangeError(`chars.length must be > 0 but got ${chars.length}`);
  }

  let areThereMistakes = false;

  for (let i = 0; i < chars.length; ++i) {
    const char = chars[i];

    if (newInput[i] === undefined) {
      char.input = null;
      continue;
    }

    char.input = newInput[i];

    if (newInput[i] !== char.actual) {
      areThereMistakes = true;
      if (char.mistakes.length < 1 || newInput[i] !== prevInput[i]) {
        char.mistakes.push({
          input: newInput[i],
          timeMade: Date.now(),
        });
      }
    }
  }

  const areAllLeadingWordsCompleted =
    leadingWords.length > 0
      ? leadingWords.every((word) => word.isCompleted)
      : true;

  word.isCompleted =
    !areThereMistakes &&
    newInput.length >= chars.length &&
    areAllLeadingWordsCompleted;

  const currentInputRemainder =
    newInput.length > chars.length ? newInput.slice(word.chars.length) : '';

  const prevInputRemainder =
    prevInput.length > chars.length ? prevInput.slice(word.chars.length) : '';

  return [currentInputRemainder, prevInputRemainder];
}
