import { describe, expect, test } from '@jest/globals';
import parseBool from '../parseBool';

describe('parseBool', () => {
  describe('should return', () => {
    function assert(
      value: boolean | string | number | null | undefined,
      expected: ReturnType<typeof parseBool>,
    ) {
      test(`${JSON.stringify(expected)} when value=${JSON.stringify(
        value,
      )}`, () => {
        expect(parseBool(value)).toBe(expected);
      });
    }

    assert(null, null);
    assert(undefined, null);
    assert(true, true);
    assert(false, false);
    assert(1, true);
    assert(-1, true);
    assert(0, false);
    assert('true', true);
    assert('false', false);
    assert('fake false', null);
    assert('fake true', null);
  });
});
