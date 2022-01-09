import { describe, expect, test } from '@jest/globals';
import roundTextItemCreate from '../roundTextItemCreate';
import roundTextItemUpdate from '../roundTextItemUpdate';
import type IRoundTextItem from '../types/IRoundTextItem';

describe('roundTextItemUpdate', () => {
  describe('should return correct remainder and correctly mutate object when', () => {
    testCase(
      'input is empty',
      {
        item: roundTextItemCreate('Hello'),
        currentInput: '',
        prevInput: '',
        leadingItems: [],
      },
      {
        remainders: ['', ''],
        isCompleted: false,
      },
    );

    describe('input shorter than chars', () => {
      describe('without mistakes', () => {
        testCase(
          'length 1',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'H',
            prevInput: '',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 2',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'He',
            prevInput: 'H',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 3',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'Hel',
            prevInput: 'He',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );
      });

      describe('with mistakes', () => {
        testCase(
          'length 1',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: '@',
            prevInput: '',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 2',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'H@',
            prevInput: 'H',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 3',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: '@e@',
            prevInput: '@e',
            leadingItems: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );
      });
    });

    describe('input equal in length to chars', () => {
      testCase(
        '0 mistakes',
        {
          item: roundTextItemCreate('Hello'),
          currentInput: 'Hello',
          prevInput: 'Hell',
          leadingItems: [],
        },
        {
          remainders: ['', ''],
          isCompleted: true,
        },
      );

      testCase(
        '1 mistake',
        {
          item: roundTextItemCreate('Hello'),
          currentInput: 'Hell@',
          prevInput: 'Hell',
          leadingItems: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );

      testCase(
        '2 mistakes',
        {
          item: roundTextItemCreate('Hello'),
          currentInput: '@ell@',
          prevInput: '@ell',
          leadingItems: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );

      testCase(
        '3 mistakes',
        {
          item: roundTextItemCreate('Hello'),
          currentInput: '@e@l@',
          prevInput: '@e@l',
          leadingItems: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );
    });

    describe('input longer than chars', () => {
      describe('without mistakes', () => {
        testCase(
          'by 1',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'Hello1',
            prevInput: 'Hello',
            leadingItems: [],
          },
          {
            remainders: ['1', ''],
            isCompleted: true,
          },
        );

        testCase(
          'by 2',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'Hello12',
            prevInput: 'Hello1',
            leadingItems: [],
          },
          {
            remainders: ['12', '1'],
            isCompleted: true,
          },
        );

        testCase(
          'by 3',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'Hello123',
            prevInput: 'Hello12',
            leadingItems: [],
          },
          {
            remainders: ['123', '12'],
            isCompleted: true,
          },
        );
      });

      describe('with mistakes', () => {
        testCase(
          'by 1',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'He@lo1',
            prevInput: 'He@lo',
            leadingItems: [],
          },
          {
            remainders: ['1', ''],
            isCompleted: false,
          },
        );

        testCase(
          'by 2',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: 'He@l@12',
            prevInput: 'He@l@1',
            leadingItems: [],
          },
          {
            remainders: ['12', '1'],
            isCompleted: false,
          },
        );

        testCase(
          'by 3',
          {
            item: roundTextItemCreate('Hello'),
            currentInput: '@@@@@123',
            prevInput: '@@@@@12',
            leadingItems: [],
          },
          {
            remainders: ['123', '12'],
            isCompleted: false,
          },
        );
      });
    });
  });
});

interface IParams {
  item: IRoundTextItem;
  currentInput: string;
  prevInput: string;
  leadingItems: IRoundTextItem[];
}

interface IExpected {
  remainders: Remainders;
  isCompleted: boolean;
}

type Remainders = [string, string];

function testCase(name: string, params: IParams, expected: IExpected) {
  const { item, currentInput, prevInput, leadingItems } = params;
  const { remainders, isCompleted } = expected;

  test(name, () => {
    const result = roundTextItemUpdate(
      item,
      currentInput,
      prevInput,
      leadingItems,
    );
    assertRemainders(result, remainders);
    assertMutation(item, currentInput, isCompleted);
  });
}

function assertRemainders(result: Remainders, expectedRemainders: Remainders) {
  expect(result).toEqual(expectedRemainders);
}

function assertMutation(
  item: IRoundTextItem,
  currentInput: string,
  expectedIsCompleted: boolean,
) {
  item.chars.forEach((char, index) => {
    const input = currentInput.charAt(index);
    expect(char.input).toBe(input === '' ? null : input);
  });
  expect(item.isCompleted).toBe(expectedIsCompleted);
}
