import NumberRange from 'nluka-number-range';
import type { IQuoteLength } from '../types/practice';

export default function convertQuoteLengthToNumberRange(ql: IQuoteLength) {
  return new NumberRange(ql.min, ql.max);
}
