import { describe, expect, test } from '@jest/globals';
import getValidCollections from './getValidCollections';

describe('getValidCollections', () => {
  describe('should return', () => {
    function assert(
      value: string,
      definedCollections: string[],
      expected: string[],
    ) {
      test(`${JSON.stringify(expected)} when value=${JSON.stringify(
        value,
      )}, definedCollections=${JSON.stringify(definedCollections)}`, () => {
        expect(getValidCollections(value, definedCollections)).toEqual(
          expected,
        );
      });
    }

    assert('a', [], []);
    assert('a', ['b'], []);
    assert('a', ['a'], ['a']);
    assert('a', ['a', 'b'], ['a']);
    assert('a', ['b', 'a'], ['a']);
    assert('', ['a', 'b', 'c'], []);
    assert(' ,-@%*/', ['a', 'b', 'c'], []);
    assert(
      'a\nb\n\nc d  e,f, g,,h i',
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    );
  });
});
