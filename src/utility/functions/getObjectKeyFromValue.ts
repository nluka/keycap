/**
 * @param object The object to search.
 * @param value The value to find the key of.
 * @returns The key of `value` if it exists, null if it doesn't.
 */
export default function getObjectKeyFromValue(object: Object, value: any) {
  const index = Object.values(object).indexOf(value);
  if (index === -1) {
    return null;
  }
  return Object.keys(object)[index];
}
