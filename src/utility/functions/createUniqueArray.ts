/**
 * @param array The array to create a duplicate-free copy of.
 * @returns A new array with no duplicates.
 */
export default function createUniqueArray<T>(array: T[]) {
  const elementToIndexMap = new Map<T, number>();
  const uniqueArray: T[] = [];
  for (let i = 0; i < array.length; ++i) {
    const element = array[i];
    if (!elementToIndexMap.has(element)) {
      uniqueArray.push(element);
      elementToIndexMap.set(element, i);
    }
  }
  return uniqueArray;
}
