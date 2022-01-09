import getRandArrayIndex from './getRandArrayIndex';

/**
 * @param array The array to get a random element from.
 * @returns A random element from `array`, or undefined if array is empty.
 */
export default function getRandArrayElement<T>(array: T[]): T {
  const randIndex = getRandArrayIndex(array);
  if (randIndex === null) {
    throw new Error('cannot get a random element: array is empty');
  }
  const randItem = array[randIndex];
  return randItem;
}
