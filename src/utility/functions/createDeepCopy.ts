/**
 * Creates a complete-depth copy of `entity`. Objects with function or symbol properties won't be copied correctly.
 * @param entity The entity to copy.
 * @returns A complete-depth copy of `entity`.
 */
export default function createDeepCopy(entity: any) {
  return JSON.parse(JSON.stringify(entity));
}
