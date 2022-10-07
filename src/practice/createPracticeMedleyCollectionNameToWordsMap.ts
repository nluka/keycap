import type { IPracticeMedleyCollection } from '../utility/types/practice';

export default function createPracticeMedleyCollectionNameToWordsMap(
  definedCollections: IPracticeMedleyCollection[],
  activeCollections: string[],
) {
  const collectionNameToWordsMap = new Map<string, string[]>();
  for (const collectionName of activeCollections) {
    for (const collection of definedCollections) {
      if (collectionName === collection.name) {
        collectionNameToWordsMap.set(collectionName, collection.words);
      }
    }
  }
  return collectionNameToWordsMap;
}
