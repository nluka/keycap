import firstUncompletedRoundTextWordIdx from './firstUncompletedRoundTextWordIdx';
import type { IRoundTextWord } from './types';

/**
 * @param words The current state of words of an `IRoundText`.
 * @returns The input buffer value from the previous state.
 */
export default function deducePrevRoundTextInputBufferState(
  words: IRoundTextWord[],
) {
  let input = '';
  for (let i = firstUncompletedRoundTextWordIdx(words); i < words.length; ++i) {
    for (const char of words[i].chars) {
      if (char.input !== null) {
        input += char.input;
      }
    }
  }
  return input;
}
