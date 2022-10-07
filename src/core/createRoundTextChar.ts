import replaceControlCharsWithVisibleChars from '../utility/functions/replaceControlCharsWithVisibleChars';
import type { IRoundTextChar } from './types';

export default function createRoundTextChar(char: string): IRoundTextChar {
  if (char.length > 1) {
    throw new Error(`expected char to have length of 1 but was ${char.length}`);
  }
  return {
    actual: replaceControlCharsWithVisibleChars(char),
    input: null,
    mistakes: [],
  };
}
