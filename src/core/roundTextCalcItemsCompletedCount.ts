import type IRoundTextItem from './types/IRoundTextItem';

export default function roundTextCalcItemsCompletedCount(
  items: IRoundTextItem[],
) {
  let itemsCompletedCount = 0;
  for (const item of items) {
    if (!item.isCompleted) {
      break;
    }
    ++itemsCompletedCount;
  }
  return itemsCompletedCount;
}
