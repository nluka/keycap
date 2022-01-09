import { describe, expect, test } from '@jest/globals';
import replaceControlCharsWithVisibleChars from '../replaceControlCharsWithVisibleChars';

describe('replaceControlCharsWithVisibleChars', () => {
  describe('should return', () => {
    function assert(str: string, expected: string) {
      test(`${JSON.stringify(expected)} when str=${JSON.stringify(
        str,
      )}`, () => {
        expect(replaceControlCharsWithVisibleChars(str)).toBe(expected);
      });
    }

    assert('', '');
    assert('\n', '↵');
    assert('\n\n', '↵↵');
    assert('\n\n\n', '↵↵↵');
  });
});
