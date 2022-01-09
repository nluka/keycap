import type IRoundTextItem from './types/IRoundTextItem';

export function roundTextItemGetMistakeCount(item: IRoundTextItem) {
  let itemMistakeCount = 0;
  for (const char of item.chars) {
    itemMistakeCount += char.mistakes.length;
  }
  return itemMistakeCount;
}
