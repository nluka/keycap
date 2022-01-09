import replaceControlCharsWithVisibleChars from '../utility/functions/replaceControlCharsWithVisibleChars';
import type IRoundTextItemChar from './types/IRoundTextItemChar';

export default function roundTextCharCreate(char: string): IRoundTextItemChar {
  if (char.length > 1) {
    throw new Error(`expected char to have length of 1 but was ${char.length}`);
  }
  return {
    actual: replaceControlCharsWithVisibleChars(char),
    input: null,
    mistakes: [],
  };
}
