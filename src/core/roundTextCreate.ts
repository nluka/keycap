import { SPACE } from '../utility/constants';
import roundTextItemCreate from './roundTextItemCreate';
import type IRoundText from './types/IRoundText';
import type IRoundTextItem from './types/IRoundTextItem';

/**
 * Creates an `IRoundText` object based on `content`.
 * @param content The content of the text.
 * @returns An object of type `IRoundText`
 */
export default function roundTextCreate(content: string): IRoundText {
  if (content.length < 1) {
    throw new Error(
      `content.length must be > 0 but was ${JSON.stringify(content)}`,
    );
  }

  const chunks = content.trim().split(/ +/);
  const lastChunkIndex = chunks.length - 1;

  const items: IRoundTextItem[] = [];

  for (let i = 0; i < lastChunkIndex; ++i) {
    items[i] = roundTextItemCreate(chunks[i] + SPACE);
  }
  items[lastChunkIndex] = roundTextItemCreate(chunks[lastChunkIndex]);

  return {
    items,
    itemsCompletedCount: 0,
    caretPosition: 0,
  };
}
