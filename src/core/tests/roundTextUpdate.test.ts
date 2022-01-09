import { describe, expect, test } from '@jest/globals';
import { createDeepCopy } from 'keycap-foundation';
import roundTextCreate from '../roundTextCreate';
import roundTextUpdate from '../roundTextUpdate';
import type IRoundText from '../types/IRoundText';

const text = roundTextCreate('One 2 three 4.');
const expected = createDeepCopy(text) as IRoundText;

describe('roundTextUpdate', () => {
  describe('should return correctly mutated object', () => {
    testCase(0, { currentInput: 'o', prevInput: '' }, expected, () => {
      expected.items[0].chars[0].input = 'o';
      expected.items[0].chars[0].mistakes.push({
        input: 'o',
        timeMade: -1,
      });
      ++expected.caretPosition;
    });

    testCase(0, { currentInput: 'on', prevInput: 'o' }, expected, () => {
      expected.items[0].chars[1].input = 'n';
      ++expected.caretPosition;
    });

    testCase(0, { currentInput: 'one ', prevInput: 'on' }, expected, () => {
      expected.items[0].chars[2].input = 'e';
      expected.items[0].chars[3].input = ' ';
      expected.caretPosition += 2;
    });

    testCase(
      [0, 1],
      { currentInput: 'one 2', prevInput: 'one ' },
      expected,
      () => {
        expected.items[1].chars[0].input = '2';
        ++expected.caretPosition;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one 2 ', prevInput: 'one 2' },
      expected,
      () => {
        expected.items[1].chars[1].input = ' ';
        ++expected.caretPosition;
      },
    );

    testCase(
      [0, 1, 2],
      { currentInput: 'one 2 three ', prevInput: 'one 2 ' },
      expected,
      () => {
        expected.items[2].chars[0].input = 't';
        expected.items[2].chars[1].input = 'h';
        expected.items[2].chars[2].input = 'r';
        expected.items[2].chars[3].input = 'e';
        expected.items[2].chars[4].input = 'e';
        expected.items[2].chars[5].input = ' ';
        expected.caretPosition += 6;
      },
    );

    testCase(
      [0, 1, 2],
      { currentInput: 'one 2 ', prevInput: 'one 2 three ' },
      expected,
      () => {
        expected.items[2].chars[0].input = null;
        expected.items[2].chars[1].input = null;
        expected.items[2].chars[2].input = null;
        expected.items[2].chars[3].input = null;
        expected.items[2].chars[4].input = null;
        expected.items[2].chars[5].input = null;
        expected.caretPosition -= 6;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one 2', prevInput: 'one 2 ' },
      expected,
      () => {
        expected.items[1].chars[1].input = null;
        expected.caretPosition--;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one ', prevInput: 'one 2' },
      expected,
      () => {
        expected.items[1].chars[0].input = null;
        expected.caretPosition--;
      },
    );

    testCase(0, { currentInput: 'on', prevInput: 'one ' }, expected, () => {
      expected.items[0].chars[2].input = null;
      expected.items[0].chars[3].input = null;
      expected.caretPosition -= 2;
    });

    testCase(0, { currentInput: '', prevInput: 'on' }, expected, () => {
      expected.items[0].chars[0].input = null;
      expected.items[0].chars[1].input = null;
      expected.caretPosition -= 2;
    });

    testCase(0, { currentInput: 'Onee', prevInput: '' }, expected, () => {
      expected.items[0].chars[0].input = 'O';
      expected.items[0].chars[1].input = 'n';
      expected.items[0].chars[2].input = 'e';
      expected.items[0].chars[3].input = 'e';
      expected.items[0].chars[3].mistakes.push({ input: 'e', timeMade: -1 });
      expected.caretPosition += 4;
    });

    testCase(0, { currentInput: 'One ', prevInput: 'Onee' }, expected, () => {
      expected.items[0].chars[0].input = 'O';
      expected.items[0].chars[1].input = 'n';
      expected.items[0].chars[2].input = 'e';
      expected.items[0].chars[3].input = ' ';
      expected.items[0].isCompleted = true;
      expected.itemsCompletedCount = 1;
    });

    testCase(1, { currentInput: '2', prevInput: 'One ' }, expected, () => {
      expected.items[1].chars[0].input = '2';
      ++expected.caretPosition;
    });

    testCase(1, { currentInput: '2 ', prevInput: '2' }, expected, () => {
      expected.items[1].chars[1].input = ' ';
      expected.items[1].isCompleted = true;
      expected.itemsCompletedCount = 2;
      ++expected.caretPosition;
    });

    testCase(
      [2, 3],
      { currentInput: 'three 4', prevInput: '2 ' },
      expected,
      () => {
        expected.items[2].chars[0].input = 't';
        expected.items[2].chars[1].input = 'h';
        expected.items[2].chars[2].input = 'r';
        expected.items[2].chars[3].input = 'e';
        expected.items[2].chars[4].input = 'e';
        expected.items[2].chars[5].input = ' ';
        expected.items[3].chars[0].input = '4';
        expected.items[2].isCompleted = true;
        expected.itemsCompletedCount = 3;
        expected.caretPosition += 7;
      },
    );

    testCase(3, { currentInput: '4,.', prevInput: 'three 4' }, expected, () => {
      expected.items[3].chars[0].input = '4';
      expected.items[3].chars[1].input = ',';
      expected.items[3].chars[1].mistakes.push({ input: ',', timeMade: -1 });
      ++expected.caretPosition;
    });

    testCase(3, { currentInput: '4,. ', prevInput: '4,.' }, expected);

    testCase(3, { currentInput: '4,.  ', prevInput: '4,. ' }, expected);

    testCase(3, { currentInput: '', prevInput: '4,. ' }, expected, () => {
      expected.items[3].chars[0].input = null;
      expected.items[3].chars[1].input = null;
      expected.caretPosition -= 2;
    });

    testCase(3, { currentInput: '4.', prevInput: '' }, expected, () => {
      expected.items[3].chars[0].input = '4';
      expected.items[3].chars[1].input = '.';
      expected.items[3].isCompleted = true;
      expected.itemsCompletedCount = 4;
      expected.caretPosition += 2;
    });
  });
});

interface IParams {
  currentInput: string;
  prevInput: string;
}

function testCase(
  itemNums: number | number[],
  params: IParams,
  expected: IRoundText,
  updateExpected?: () => void,
) {
  const { currentInput, prevInput } = params;
  test(`item ${
    Array.isArray(itemNums) ? itemNums.join('+') : itemNums
  }, currentInput=${JSON.stringify(currentInput)}, prevInput=${JSON.stringify(
    prevInput,
  )}`, () => {
    roundTextUpdate(text, currentInput, prevInput);
    if (updateExpected !== undefined) {
      updateExpected();
    }

    expect(text.caretPosition).toBe(expected.caretPosition);
    expect(text.itemsCompletedCount).toBe(text.itemsCompletedCount);

    // Check each item
    for (let i = 0; i < text.items.length; ++i) {
      const actualItem = text.items[i];
      const expectedItem = expected.items[i];

      expect(actualItem.isCompleted).toBe(expectedItem.isCompleted);

      // Check each char
      for (let c = 0; c < actualItem.chars.length; ++c) {
        const actualChar = actualItem.chars[c];
        const expectedChar = expectedItem.chars[c];

        expect(actualChar.actual).toBe(expectedChar.actual);
        expect(actualChar.input).toBe(expectedChar.input);

        // Check each mistake
        for (let m = 0; m < actualChar.mistakes.length; ++m) {
          const actualMistake = actualChar.mistakes[m];
          const expectedMistake = expectedChar.mistakes[m];

          expect(actualMistake.input).toBe(expectedMistake.input);
        }
      }
    }
    expect(text.items);
  });
}
