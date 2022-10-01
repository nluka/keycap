import BUILT_IN_MEDLEY_COLLECTIONS from '../resources/medley_collections/default-collections';
import type { IPracticeConfig } from '../utility/types/practice';
import practiceCreateMedleyCollectionNameToItemsMap from './practiceCreateMedleyCollectionNameToItemsMap';

export default function practiceMedleyGetCollectionItems(
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

  const collectionNameToItemsMap = practiceCreateMedleyCollectionNameToItemsMap(
    definedCollections,
    activeCollections,
  );

  const items = collectionNameToItemsMap.get(collectionName);

  return items;
}
