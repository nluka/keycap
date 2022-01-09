import { describe, expect, test } from '@jest/globals';
import { getTimeString } from './getTimeString';

describe('getTimeString', () => {
  describe('should return', () => {
    function assert(secondsElapsed: number, expected: string) {
      test(`${JSON.stringify(
        expected,
      )} when secondsElapsed=${secondsElapsed}`, () => {
        expect(getTimeString(secondsElapsed)).toBe(expected);
      });
    }

    assert(0, '0:00');
    assert(1, '0:01');
    assert(11, '0:11');
    assert(90, '1:30');
    assert(601, '10:01');
    assert(671, '11:11');
    assert(3_600, '1:00:00');
    assert(4_210, '1:10:10');
    assert(36_010, '10:00:10');
    assert(40_271, '11:11:11');
  });
});
