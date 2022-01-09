import { describe, expect, test } from '@jest/globals';
import doesSearchValueMatchAnyTags from '../doesSearchValueMatchAnyTags';

describe('doesSearchValueMatchAnyTags', () => {
  const tags = ['text type'];

  describe('should return', () => {
    function assert(expected: boolean, searchValue: string, tags: string[]) {
      test(`${JSON.stringify(expected)} when searchValue=${JSON.stringify(
        searchValue,
      )}, tags=${JSON.stringify(tags)}`, () => {
        expect(doesSearchValueMatchAnyTags(searchValue, tags)).toBe(expected);
      });
    }

    function assertTrue(searchValue: string, tags: string[]) {
      assert(true, searchValue, tags);
    }

    assertTrue('t', tags);
    assertTrue('te', tags);
    assertTrue('tex', tags);
    assertTrue('text', tags);
    assertTrue('ex', tags);
    assertTrue('xt', tags);

    function assertFalse(searchValue: string, tags: string[]) {
      assert(false, searchValue, tags);
    }

    assertFalse('text1', tags);
    assertFalse('txt', tags);
    assertFalse('a', tags);
    assertFalse('123', tags);
  });
});
