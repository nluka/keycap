import { describe, expect, test } from '@jest/globals';
import escapeStringForRegExp from '../escapeStringForRegExp';

describe('escapeStringForRegExp', () => {
  test('should correctly escape chars', () => {
    expect(escapeStringForRegExp('. * + ? { } ( ) | [ ] \\')).toBe(
      '\\. \\* \\+ \\? \\{ \\} \\( \\) \\| \\[ \\] \\\\',
    );
  });
});
