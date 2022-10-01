import type { IPracticeMedleyCollection } from '../utility/types/practice';

export default function practiceCreateMedleyCollectionNameToItemsMap(
  definedCollections: IPracticeMedleyCollection[],
  activeCollections: string[],
) {
  const collectionNameToItemsMap = new Map<string, string[]>();
  for (const collectionName of activeCollections) {
    for (const collection of definedCollections) {
      if (collectionName === collection.name) {
        collectionNameToItemsMap.set(collectionName, collection.items);
      }
    }
  }
  return collectionNameToItemsMap;
}
