import { describe, expect, test } from '@jest/globals';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../resources/medley_collections/default-collections';
import randNumbers from '../../resources/medley_collections/randNumbers';
import type { IPracticeMedleyCollection } from '../../utility/types/practice';
import createPracticeMedleyCollectionNameToWordsMap from '../createPracticeMedleyCollectionNameToWordsMap';

describe('practiceCreateMedleyCollectionNameToWordsMap', () => {
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
          createPracticeMedleyCollectionNameToWordsMap(
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
        { name: 'custom-collection-1', words: ['word1', 'word2'] },
      ];
      const activeCollections = [definedCollections[0].name];
      const expected = new Map<string, string[]>([
        [definedCollections[0].name, definedCollections[0].words],
      ]);
      assert(definedCollections, activeCollections, expected);
    }
  });
});
