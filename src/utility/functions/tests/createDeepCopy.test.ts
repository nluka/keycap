import { describe, expect, test } from '@jest/globals';
import createDeepCopy from '../createDeepCopy';

describe('createDeepCopy', () => {
  describe('should return deep copy of', () => {
    test('number', () => {
      expect(createDeepCopy(1)).toBe(1);
    });

    test('string', () => {
      expect(createDeepCopy('hello')).toBe('hello');
    });

    test('boolean', () => {
      expect(createDeepCopy(true)).toBe(true);
    });

    test('object', () => {
      const obj = { one: 1, two: 2 };
      expect(createDeepCopy(obj)).toEqual(obj);
      expect(createDeepCopy(obj)).not.toBe(obj);
    });

    test('array', () => {
      const obj = { three: 3 };
      const arr = [1, '2', obj];
      expect(createDeepCopy(arr)).toEqual(arr);
      expect(createDeepCopy(arr)).not.toBe(arr);
      expect(createDeepCopy(arr[2])).not.toBe(arr[2]);
    });
  });
});
