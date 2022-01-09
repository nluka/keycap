import { roundTextItemGetMistakeCount } from './roundTextItemGetMistakeCount';
import type IRoundTextItem from './types/IRoundTextItem';

export function roundTextCalcTotalMistakeCount(items: IRoundTextItem[]) {
  let totalMistakeCount = 0;
  for (const item of items) {
    totalMistakeCount += roundTextItemGetMistakeCount(item);
  }
  return totalMistakeCount;
}
