import type IRoundTextItem from './types/IRoundTextItem';

// TODO: write tests
export default function roundTextCalcCorrectCharsCount(
  items: IRoundTextItem[],
) {
  let correctInputCount = 0;
  for (const item of items) {
    for (const char of item.chars) {
      if (char.input === char.actual) {
        ++correctInputCount;
      }
    }
  }
  return correctInputCount;
}
