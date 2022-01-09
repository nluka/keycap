import { describe, expect, test } from '@jest/globals';
import convertWordArrayToCamelCaseString from '../convertWordArrayToCamelCaseString';

describe('convertWordArrayToCamelCaseString', () => {
  describe('should return', () => {
    function assert(words: string[], expected: string) {
      test(`${JSON.stringify(expected)} when words=${JSON.stringify(
        words,
      )}`, () => {
        expect(convertWordArrayToCamelCaseString(words)).toBe(expected);
      });
    }

    assert([], '');
    assert(['one'], 'one');
    assert(['one', 'two'], 'oneTwo');
    assert(['One', 'TWO'], 'oneTwo');
    assert(['one', 'two', '3'], 'oneTwo3');
    assert(['one', 'two', '3', 'four'], 'oneTwo3Four');
  });
});
