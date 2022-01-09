/**
 * @param array The array to return an index in.
 * @returns A random index in `array`.
 */
export default function getRandArrayIndex(array: any[]) {
  if (array.length === 0) {
    return null;
  }
  return Math.floor(Math.random() * array.length);
}
