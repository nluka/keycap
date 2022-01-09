import roundTextGetFirstUncompletedItemIndex from './roundTextGetFirstUncompletedItemIndex';
import type IRoundTextItem from './types/IRoundTextItem';

/**
 * Calculates what the previous input was from the previous state of `items`.
 * @param items The current state of the items of an `IRoundText`.
 * @returns The value of the input from the previous `items` state.
 */
export default function roundTextCalcPrevInputValue(items: IRoundTextItem[]) {
  let input = '';
  for (
    let i = roundTextGetFirstUncompletedItemIndex(items);
    i < items.length;
    ++i
  ) {
    for (const char of items[i].chars) {
      if (char.input !== null) {
        input += char.input;
      }
    }
  }
  return input;
}
