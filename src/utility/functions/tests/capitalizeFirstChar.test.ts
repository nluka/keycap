import { describe, expect, test } from '@jest/globals';
import capitalizeFirstChar from '../capitalizeFirstChar';

describe('capitalizeFirstChar', () => {
  describe('should return', () => {
    function assert(str: string, expected: string) {
      test(`${JSON.stringify(expected)} when str=${JSON.stringify(
        str,
      )}`, () => {
        expect(capitalizeFirstChar(str)).toEqual(expected);
      });
    }

    assert('', '');
    assert('a', 'A');
    assert('hello', 'Hello');
    assert('Hello', 'Hello');
    assert('123', '123');
    assert('_', '_');
    assert('\\', '\\');
  });
});
