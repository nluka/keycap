import type NumberRange from 'nluka-number-range';
import type { IQuoteLengthRange } from '../types/practice';

export default function convertNumberRangeToQuoteLength(
  range: NumberRange,
): IQuoteLengthRange {
  return {
    min: range.getMin(),
    max: range.getMax(),
  };
}
