import BUILT_IN_MEDLEY_COLLECTIONS from '../resources/medley_collections/default-collections';
import type { IPracticeConfig } from '../utility/types/practice';
import createPracticeMedleyCollectionNameToWordsMap from './createPracticeMedleyCollectionNameToWordsMap';

export default function extractPracticeMedleyCollectionWords(
  collectionName: string,
  config: IPracticeConfig,
) {
  const [activeCollections, customCollections] = [
    config.medleyCollectionsActive,
    config.medleyCollectionsCustom,
  ];

  const definedCollections = [
    ...BUILT_IN_MEDLEY_COLLECTIONS,
    ...customCollections,
  ];

  const collectionNameToWordsMap = createPracticeMedleyCollectionNameToWordsMap(
    definedCollections,
    activeCollections,
  );

  const words = collectionNameToWordsMap.get(collectionName);

  return words;
}
