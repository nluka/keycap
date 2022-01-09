import { describe, expect, test } from '@jest/globals';
import getUrlWithAppendedQueryParams from '../getUrlWithAppendedQueryParams';

describe('getUrlWithAppendedQueryParams', () => {
  const baseUrl = 'https://test.com';

  describe('should return', () => {
    function assert(baseUrl: string, params: object, expected: string) {
      test(`${JSON.stringify(expected)} when baseUrl=${JSON.stringify(
        baseUrl,
      )}, params=${JSON.stringify(params)}`, () => {
        expect(getUrlWithAppendedQueryParams(baseUrl, params)).toBe(expected);
      });
    }

    assert(baseUrl, {}, baseUrl);
    assert(baseUrl, { param1: 'ONE' }, `${baseUrl}?param1=ONE`);
    assert(
      baseUrl,
      { param1: 'ONE', param2: 2 },
      `${baseUrl}?param1=ONE&param2=2`,
    );
  });
});
