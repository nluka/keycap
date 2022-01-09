import type IRoundTextItem from './types/IRoundTextItem';

export default function roundTextCalcItemsCompletedCount(
  items: IRoundTextItem[],
) {
  let itemsCompletedCount: number;
  for (
    itemsCompletedCount = 0;
    itemsCompletedCount < items.length;
    ++itemsCompletedCount
  ) {
    const item = items[itemsCompletedCount];
    if (!item.isCompleted) {
      return itemsCompletedCount;
    }
  }
  return itemsCompletedCount;
}
