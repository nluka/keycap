import { SPACE } from '../utility/constants';
import createRoundTextChar from './createRoundTextChar';
import type { IRoundTextChar, IRoundTextWord } from './types';

export const multiCharTextRequiredFormatRegex = /^[^ ][^ ]*.{1}$/;

export default function createRoundTextWord(text: string): IRoundTextWord {
  if (text.length < 1) {
    throw new Error('text cannot be an empty string');
  }
  if (text === SPACE) {
    throw new Error('text cannot be single space');
  }
  if (text.length > 1 && !text.match(multiCharTextRequiredFormatRegex)) {
    throw new Error(
      `multi-character texts must match ${multiCharTextRequiredFormatRegex}`,
    );
  }

  const chars: IRoundTextChar[] = [];
  for (const char of text) {
    const pc = createRoundTextChar(char);
    chars.push(pc);
  }

  return {
    chars,
    isCompleted: false,
  };
}
