import type NumberRange from 'nluka-number-range';
import type { IQuoteLength } from '../types/practice';

export default function convertNumberRangeToQuoteLength(
  range: NumberRange,
): IQuoteLength {
  return {
    min: range.getMin(),
    max: range.getMax(),
  };
}
