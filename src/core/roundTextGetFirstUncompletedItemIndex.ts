import roundTextCalcItemsCompletedCount from './roundTextCalcItemsCompletedCount';
import type IRoundTextItem from './types/IRoundTextItem';

export default function roundTextGetFirstUncompletedItemIndex(
  items: IRoundTextItem[],
) {
  return roundTextCalcItemsCompletedCount(items);
}
