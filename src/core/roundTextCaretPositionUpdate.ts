import type IRoundText from './types/IRoundText';

// TODO: write tests
export default function roundTextCaretPositionUpdate(text: IRoundText) {
  let position = 0;

  for (const item of text.items) {
    if (item.isCompleted) {
      position += item.chars.length;
      continue;
    }

    for (const char of item.chars) {
      if (char.input === null) {
        text.caretPosition = position;
        return;
      }
      ++position;
    }
  }

  text.caretPosition = position;
}
