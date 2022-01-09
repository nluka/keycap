import { describe, expect, test } from '@jest/globals';
import type { IPracticeMedleyCollection } from 'keycap-foundation';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../resources/medley_collections/default-collections';
import randNumbers from '../../resources/medley_collections/randNumbers';
import practiceCreateMedleyCollectionNameToItemsMap from '../practiceCreateMedleyCollectionNameToItemsMap';

describe('practiceCreateMedleyCollectionNameToItemsMap', () => {
  describe('should return correct map when', () => {
    function assert(
      definedCollections: IPracticeMedleyCollection[],
      activeCollections: string[],
      expected: Map<string, string[]>,
    ) {
      test(`definedCollections=${JSON.stringify(
        definedCollections.map((c) => c.name),
      )}, activeCollections=${JSON.stringify(activeCollections)}`, () => {
        expect(
          practiceCreateMedleyCollectionNameToItemsMap(
            definedCollections,
            activeCollections,
          ),
        ).toEqual(expected);
      });
    }

    assert([], [], new Map());
    assert(BUILT_IN_MEDLEY_COLLECTIONS, [], new Map<string, string[]>());
    assert([], ['bi-symbols'], new Map<string, string[]>());

    assert(
      BUILT_IN_MEDLEY_COLLECTIONS,
      ['bi-rand-numbers'],
      new Map<string, string[]>([['bi-rand-numbers', randNumbers]]),
    );

    {
      const definedCollections: IPracticeMedleyCollection[] = [
        { name: 'custom-collection-1', items: ['item1', 'item2'] },
      ];
      const activeCollections = [definedCollections[0].name];
      const expected = new Map<string, string[]>([
        [definedCollections[0].name, definedCollections[0].items],
      ]);
      assert(definedCollections, activeCollections, expected);
    }
  });
});
