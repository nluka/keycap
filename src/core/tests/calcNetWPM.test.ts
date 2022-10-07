import { describe, expect, test } from '@jest/globals';
import { CHARS_PER_WORD } from '../constants';
import calcNetWPM from '../calcNetWPM';

describe('calcNetWPM', () => {
  describe('should throw error when', () => {
    function assertThrowsError(
      correctCharactersCount: number,
      minutesElapsed: number,
    ) {
      test(`correctCharactersCount=${correctCharactersCount}, minutesElapsed=${minutesElapsed}`, () => {
        expect(() =>
          calcNetWPM(correctCharactersCount, CHARS_PER_WORD, minutesElapsed),
        ).toThrowError();
      });
    }
    assertThrowsError(-1, 1);
    assertThrowsError(1, -1);
    assertThrowsError(Number.POSITIVE_INFINITY, 1);
    assertThrowsError(Number.NEGATIVE_INFINITY, 1);
    assertThrowsError(1, Number.POSITIVE_INFINITY);
    assertThrowsError(1, Number.NEGATIVE_INFINITY);
    assertThrowsError(Number.NaN, 1);
    assertThrowsError(1, Number.NaN);
  });
});
