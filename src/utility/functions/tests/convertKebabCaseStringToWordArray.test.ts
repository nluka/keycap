import { describe, expect, test } from '@jest/globals';
import convertKebabCaseStringToWordArray from '../convertKebabCaseStringToWordArray';

describe('convertKebabCaseStringToWordArray', () => {
  describe('should return', () => {
    function assert(str: string, expected: string[]) {
      test(`${JSON.stringify(expected)} when str=${JSON.stringify(
        str,
      )}`, () => {
        expect(convertKebabCaseStringToWordArray(str)).toEqual(expected);
      });
    }

    assert('', []);
    assert('ONE', ['ONE']);
    assert('one-tWo', ['one', 'tWo']);
    assert('ONE--two', ['ONE', 'two']);
    assert('ONE---two--3', ['ONE', 'two', '3']);
  });
});
