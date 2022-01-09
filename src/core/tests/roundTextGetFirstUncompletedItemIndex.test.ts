import { afterEach, describe, expect, test } from '@jest/globals';
import createPracticeText from '../roundTextCreate';
import roundTextGetFirstUncompletedItemIndex from '../roundTextGetFirstUncompletedItemIndex';
import type IRoundTextItem from '../types/IRoundTextItem';

const text = createPracticeText('one two three');
const items = text.items;

afterEach(() => {
  for (const item of items) {
    item.isCompleted = false;
  }
});

describe('roundTextGetFirstUncompletedItemIndex', () => {
  describe('should', () => {
    function assert(items: IRoundTextItem[], expected: number) {
      test(`return ${JSON.stringify(
        expected,
      )} when ${expected} items are completed`, () => {
        for (let i = 0; i < expected; ++i) {
          const item = items[i];
          item.isCompleted = true;
        }
        expect(roundTextGetFirstUncompletedItemIndex(items)).toBe(expected);
      });
    }
    assert([], 0);
    assert(items, 0);
    assert(items, 1);
    assert(items, 2);
    assert(items, 3);
  });
});
