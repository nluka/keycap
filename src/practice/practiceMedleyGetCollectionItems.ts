import type { IPracticeSettings } from 'keycap-foundation';
import BUILT_IN_MEDLEY_COLLECTIONS from '../resources/medley_collections/default-collections';
import practiceCreateMedleyCollectionNameToItemsMap from './practiceCreateMedleyCollectionNameToItemsMap';

export default function practiceMedleyGetCollectionItems(
  collectionName: string,
  settings: IPracticeSettings,
) {
  const [activeCollections, customCollections] = [
    settings.currentConfig.basic.config.medleyCollectionsActive,
    settings.currentConfig.advanced.config.medleyCollectionsCustom,
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
