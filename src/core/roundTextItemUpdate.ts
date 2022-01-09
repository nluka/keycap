import type IRoundTextItem from './types/IRoundTextItem';

export default function roundTextItemUpdate(
  item: IRoundTextItem,
  newInput: string,
  prevInput: string,
  leadingItems: IRoundTextItem[],
): [string, string] {
  if (item === undefined) {
    return ['', ''];
  }

  const chars = item.chars;

  if (chars.length < 1) {
    throw new RangeError(`chars.length must be > 0 but got ${chars.length}`);
  }

  let areThereMistakes = false;

  for (let i = 0; i < chars.length; ++i) {
    const char = chars[i];

    if (newInput[i] === undefined) {
      char.input = null;
      continue;
    }

    char.input = newInput[i];

    if (newInput[i] !== char.actual) {
      areThereMistakes = true;
      if (char.mistakes.length < 1 || newInput[i] !== prevInput[i]) {
        char.mistakes.push({
          input: newInput[i],
          timeMade: Date.now(),
        });
      }
    }
  }

  const areAllLeadingItemsCompleted =
    leadingItems.length > 0
      ? leadingItems.every((item) => item.isCompleted)
      : true;

  item.isCompleted =
    !areThereMistakes &&
    newInput.length >= chars.length &&
    areAllLeadingItemsCompleted;

  const currentInputRemainder =
    newInput.length > chars.length ? newInput.slice(item.chars.length) : '';

  const prevInputRemainder =
    prevInput.length > chars.length ? prevInput.slice(item.chars.length) : '';

  return [currentInputRemainder, prevInputRemainder];
}
