/**
 * Checks if `obj` has a property with a key of value `key`.
 * @param obj The object to check.
 * @param key The key to search for.
 */
export default function doesObjectHaveKey<O>(
  obj: O,
  key: PropertyKey,
): key is keyof O {
  return key in obj;
}
