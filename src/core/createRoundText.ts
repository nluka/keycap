import { SPACE } from '../utility/constants';
import createRoundTextWord from './createRoundTextWord';
import type { IRoundText, IRoundTextWord } from './types';

/**
 * Creates an `IRoundText` object based on `content`.
 * @param content The content of the text.
 * @returns An object of type `IRoundText`
 */
export default function createRoundText(content: string): IRoundText {
  if (content.length < 1) {
    throw new Error(
      `content.length must be > 0 but was ${JSON.stringify(content)}`,
    );
  }

  const contentWords = content.trim().split(/ +/);
  const lastWordIdx = contentWords.length - 1;

  const words: IRoundTextWord[] = [];

  for (let i = 0; i < lastWordIdx; ++i) {
    words[i] = createRoundTextWord(contentWords[i] + SPACE);
  }
  words[lastWordIdx] = createRoundTextWord(contentWords[lastWordIdx]);

  return {
    words: words,
    numWordsCompleted: 0,
    caretPosition: 0,
  };
}
