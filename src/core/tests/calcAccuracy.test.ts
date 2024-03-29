import { describe, expect, test } from '@jest/globals';
import calcAccuracy from '../calcAccuracy';

describe('calcAccuracy', () => {
  describe('should throw error when', () => {
    function assertThrowsError(textLength: number, totalMistakeCount: number) {
      test(`textLength=${textLength}, totalMistakeCount=${totalMistakeCount}`, () => {
        expect(() =>
          calcAccuracy(textLength, totalMistakeCount),
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
