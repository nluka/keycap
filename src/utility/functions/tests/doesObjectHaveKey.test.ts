import { describe, expect, test } from '@jest/globals';
import doesObjectHaveKey from '../doesObjectHaveKey';

describe('doesObjectHaveKey', () => {
  describe('should return', () => {
    const o1 = {
      one: 1,
    };
    const o2 = {
      1: 'one',
    };

    assert(o1, 'one', true);
    assert(o1, 'two', false);

    assert(o2, 1, true);
    assert(o1, 2, false);
  });

  function assert(object: any, key: any, expected: boolean) {
    test(`${expected} when object=${JSON.stringify(
      object,
    )}, key=${JSON.stringify(key)}`, () => {
      expect(doesObjectHaveKey(object, key)).toBe(expected);
    });
  }
});
