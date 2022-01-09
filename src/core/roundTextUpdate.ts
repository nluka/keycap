import roundTextCaretPositionUpdate from './roundTextCaretPositionUpdate';
import roundTextGetFirstUncompletedItemIndex from './roundTextGetFirstUncompletedItemIndex';
import roundTextItemUpdate from './roundTextItemUpdate';
import type IRoundText from './types/IRoundText';

/**
 * Updates (via mutation) the value of the text object to reflect the new input.
 * @param text The text object to update (will be mutated).
 * @param newInput The new user input value.
 * @param prevInput The user input value that corresponds to the current state of `text`.
 */
export default function roundTextUpdate(
  text: IRoundText,
  newInput: string,
  prevInput: string,
) {
  updateItems(text, newInput, prevInput);
  roundTextCaretPositionUpdate(text);
}

function updateItems(text: IRoundText, newInput: string, prevInput: string) {
  const firstUncompletedItemIndex = roundTextGetFirstUncompletedItemIndex(
    text.items,
  );
  let offset = 0;

  do {
    const item = text.items[firstUncompletedItemIndex + offset];
    const leadingItems = text.items.slice(
      0,
      firstUncompletedItemIndex + offset,
    );

    [newInput, prevInput] = roundTextItemUpdate(
      item,
      newInput,
      prevInput,
      leadingItems,
    );

    if (item !== undefined && item.isCompleted) {
      ++text.itemsCompletedCount;
    }

    ++offset;
  } while (newInput.length > 0 || prevInput.length > 0);
}
