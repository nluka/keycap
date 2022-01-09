import { describe, expect, test } from '@jest/globals';
import getObjectKeyFromValue from '../getObjectKeyFromValue';

describe('getObjectKeyFromValue', () => {
  describe('should return', () => {
    function assert(obj: object, value: any, expected: any) {
      test(`${JSON.stringify(expected)} when obj=${JSON.stringify(
        obj,
      )}, value=${JSON.stringify(value)}`, () => {
        expect(getObjectKeyFromValue(obj, value)).toBe(expected);
      });
    }

    assert({ one: 1 }, 2, null);
    assert({}, 'something', null);
    assert({ one: 1, two: 2 }, 2, 'two');
  });
});
