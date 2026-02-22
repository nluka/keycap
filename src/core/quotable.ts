// import axios from 'axios';
// import HTTP_STATUS from 'nluka-http-response-status-codes';
// import getUrlWithAppendedQueryParams from '../utility/functions/getUrlWithAppendedQueryParams';
import type { IPracticeConfig } from '../utility/types/practice';
import { quotes } from "../resources/quotes";


// interface IQuoteableApiQuote {
//   _id: string;
//   content: string;
//   author: string;
//   authorSlug: string;
//   length: number;
//   tags: string[];
// }

type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
};

function sortQuotesByLengthAsc(quotes: Quote[]): Quote[] {
  return [...quotes].sort((a, b) => a.content.length - b.content.length);
}

function lowerBound(quotes: Quote[], min: number): number {
  let left = 0;
  let right = quotes.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (quotes[mid].content.length < min) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function upperBound(quotes: Quote[], max: number): number {
  let left = 0;
  let right = quotes.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (quotes[mid].content.length <= max) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

const sortedQuotesAsc = sortQuotesByLengthAsc(quotes);

export async function fetchRandEnglishQuote(config: IPracticeConfig) {
  // API docs: https://github.com/lukePeavey/quotable

  // const url = getUrlWithAppendedQueryParams('https://api.quotable.io/random', {
  //   minLength: config.englishQuoteLengthRange.min,
  //   maxLength: config.englishQuoteLengthRange.max,
  // });

  // try {
  //   const quote: IQuoteableApiQuote = (await axios.get(url)).data;
  //   const processedQuote = processQuote(quote.content, config);
  //   return processedQuote;
  // } catch (err: any) {
  //   if (err.response === undefined) {
  //     return new Error('failed to connect to quotable api');
  //   }
  //   if (err.response.status === HTTP_STATUS.NOT_FOUND) {
  //     return new Error('no quotes exist in the specified length range');
  //   }
  //   throw err;
  // }

  // const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // console.log(quote);
  // const processedQuote = processQuote(quote.content, config);
  // return processedQuote;

  console.log(sortedQuotesAsc[0].content.length);
  console.log(sortedQuotesAsc[sortedQuotesAsc.length-1].content.length);
  if (config.englishQuoteLengthRange.min > config.englishQuoteLengthRange.max) {
    throw new Error("min cannot be greater than max");
  }

  const start = lowerBound(sortedQuotesAsc, config.englishQuoteLengthRange.min);
  const end = upperBound(sortedQuotesAsc, config.englishQuoteLengthRange.max);

  if (start >= end) {
    return new Error("No quotes found in the specified length range [min: " + config.englishQuoteLengthRange.min + ", max: " + config.englishQuoteLengthRange.max + "]");
  }

  const randomIndex = start + Math.floor(Math.random() * (end - start));
  return sortedQuotesAsc[randomIndex].content;
}

export function processQuote(quote: string, config: IPracticeConfig) {
  const punctuationRegex = /[.?!,:;\-–—[\]{}()'"]/g;

  quote = removeBadCharacters(quote);

  if (!config.isPunctuationEnabled) {
    quote = quote.replace(punctuationRegex, '');
  }

  return quote;
}

function removeBadCharacters(quote: string) {
  return quote.replace(/’/g, "'").replace(/…/g, '...').replace(/[–—]/g, '-');
}
