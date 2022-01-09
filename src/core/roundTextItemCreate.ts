import { SPACE } from '../utility/constants';
import roundTextCharCreate from './roundTextCharCreate';
import type IRoundTextItem from './types/IRoundTextItem';
import type IRoundTextItemChar from './types/IRoundTextItemChar';

export const multiCharTextRequiredFormatRegex = /^[^ ][^ ]*.{1}$/;

export default function roundTextItemCreate(text: string): IRoundTextItem {
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

  const chars: IRoundTextItemChar[] = [];
  for (const char of text) {
    const pc = roundTextCharCreate(char);
    chars.push(pc);
  }

  return {
    chars,
    isCompleted: false,
  };
}
