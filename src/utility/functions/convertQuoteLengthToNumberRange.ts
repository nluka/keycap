import NumberRange from 'nluka-number-range';
import type { IQuoteLengthRange } from '../types/practice';

export default function convertQuoteLengthToNumberRange(ql: IQuoteLengthRange) {
  return new NumberRange(ql.min, ql.max);
}
