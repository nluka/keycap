import type { IRoundText } from './types';

// TODO: write tests
export default function updateRoundTextCaretPos(text: IRoundText) {
  let position = 0;

  for (const word of text.words) {
    if (word.isCompleted) {
      position += word.chars.length;
      continue;
    }

    for (const char of word.chars) {
      if (char.input === null) {
        text.caretPosition = position;
        return;
      }
      ++position;
    }
  }

  text.caretPosition = position;
}
