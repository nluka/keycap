import type IRoundTextItem from './types/IRoundTextItem';

export default function roundTextCalcCharCount(items: IRoundTextItem[]) {
  let charCount = 0;
  for (const item of items) {
    charCount += item.chars.length;
  }
  return charCount;
}
