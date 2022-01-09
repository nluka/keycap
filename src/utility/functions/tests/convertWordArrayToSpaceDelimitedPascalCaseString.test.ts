import { describe, expect, test } from '@jest/globals';
import convertWordArrayToSpaceDelimitedPascalCaseString from '../convertWordArrayToSpaceDelimitedPascalCaseString';

describe('convertWordArrayToSpaceDelimitedPascalCaseString', () => {
  describe('should return', () => {
    function assert(words: string[], expected: string) {
      test(`${JSON.stringify(expected)} when words=${JSON.stringify(
        words,
      )}`, () => {
        expect(convertWordArrayToSpaceDelimitedPascalCaseString(words)).toEqual(
          expected,
        );
      });
    }

    assert([], '');
    assert(['one'], 'One');
    assert(['one', 'two'], 'One Two');
    assert(['One', 'TWO'], 'One Two');
    assert(['one', 'two', '3'], 'One Two 3');
  });
});
