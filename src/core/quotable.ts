import axios from 'axios';
import type { IPracticeSettingsConfigBasic } from 'keycap-foundation';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import getUrlWithAppendedQueryParams from '../utility/functions/getUrlWithAppendedQueryParams';

interface IQuoteableApiQuote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

interface IRandQuoteParams {
  minLength?: number;
  maxLength?: number;
}

export async function fetchRandQuote(
  params: IRandQuoteParams = { minLength: undefined, maxLength: undefined },
  basicConfig: IPracticeSettingsConfigBasic,
) {
  // API docs: https://github.com/lukePeavey/quotable

  const url = getUrlWithAppendedQueryParams(
    'https://api.quotable.io/random',
    params,
  );

  try {
    const quote: IQuoteableApiQuote = (await axios.get(url)).data;
    const processedQuote = processQuote(quote.content, basicConfig);
    return processedQuote;
  } catch (err: any) {
    if (err.response === undefined) {
      return new Error('failed to connect to quotable api');
    }
    if (err.response.status === HTTP_STATUS.NOT_FOUND) {
      return new Error('no quotes exist in the specified length range');
    }
    return new Error('unknown error');
  }
}

export function processQuote(
  quote: string,
  basicConfig: IPracticeSettingsConfigBasic,
) {
  const punctuationRegex = /[.?!,:;\-–—[\]{}()'"]/g;

  quote = removeBadCharacters(quote);

  if (!basicConfig.isPunctuationEnabled) {
    quote = quote.replace(punctuationRegex, '');
  }

  return quote;
}

function removeBadCharacters(quote: string) {
  return quote.replace(/’/g, "'").replace(/…/g, '...').replace(/[–—]/g, '-');
}
