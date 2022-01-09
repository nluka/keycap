import { describe, expect, test } from '@jest/globals';
import { getTimeElapsedText } from '../getTimeElapsedText';

describe('getTimeElapsedText', () => {
  describe('should return', () => {
    function assert(timeElapsed: number | null | undefined, expected: string) {
      test(`${JSON.stringify(expected)} when timeElapsed=${JSON.stringify(
        timeElapsed,
      )}`, () => {
        expect(getTimeElapsedText(timeElapsed)).toBe(expected);
      });
    }

    assert(null, '···');
    assert(undefined, '···');
    assert(0, '0.0s');
    assert(49, '0.0s');
    assert(2_500, '2.5s');
    assert(9_100, '9.1s');
    assert(20_500, '20.5s');
    assert(60_000, '1m');
    assert(61_000, '1m 1.0s');
    assert(601_000, '10m 1.0s');
    assert(3_601_000, '1h 1.0s');
    assert(3_661_101, '1h 1m 1.1s');
    assert(36_000_000, '10h');
  });
});
