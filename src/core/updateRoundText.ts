import updateRoundTextCaretPos from './updateRoundTextCaretPos';
import firstUncompletedRoundTextWordIdx from './firstUncompletedRoundTextWordIdx';
import updateRoundTextWord from './updateRoundTextWord';
import type { IRoundText } from './types';

/**
 * Mutates `text` to reflect the new input.
 */
export default function updateRoundText(
  text: IRoundText,
  currInputBuffer: string,
  prevInputBuffer: string,
) {
  updateWords(text, currInputBuffer, prevInputBuffer);
  updateRoundTextCaretPos(text);
}

function updateWords(
  text: IRoundText,
  currInputBuffer: string,
  prevInputBuffer: string,
) {
  const firstUncompletedWordIndex = firstUncompletedRoundTextWordIdx(
    text.words,
  );
  let offset = 0;

  do {
    const word = text.words[firstUncompletedWordIndex + offset];
    const leadingWords = text.words.slice(
      0,
      firstUncompletedWordIndex + offset,
    );

    [currInputBuffer, prevInputBuffer] = updateRoundTextWord(
      word,
      currInputBuffer,
      prevInputBuffer,
      leadingWords,
    );

    if (word !== undefined && word.isCompleted) {
      ++text.numWordsCompleted;
    }

    ++offset;
  } while (currInputBuffer.length > 0 || prevInputBuffer.length > 0);
}
