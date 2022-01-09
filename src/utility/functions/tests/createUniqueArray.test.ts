import { describe, expect, test } from '@jest/globals';
import createUniqueArray from '../createUniqueArray';

describe('createUniqueArray', () => {
  describe('should return', () => {
    function assert<T>(array: T[], expected: T[]) {
      test(`${JSON.stringify(expected)} when array=${JSON.stringify(
        array,
      )}`, () => {
        expect(createUniqueArray(array)).toEqual(expected);
      });
    }

    assert([], []);
    assert([1, 2, 3], [1, 2, 3]);
    assert([1, 1, 2, 3, 3, 3, 4], [1, 2, 3, 4]);
    assert(['1', '1', '2', '3', '3', '3', '4'], ['1', '2', '3', '4']);
  });
});
