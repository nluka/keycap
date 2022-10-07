import type { IPracticeMedleyCollection } from '../../utility/types/practice';
import alphabet from './alphabet';
import commonWords from './commonWords';
import digits from './digits';
import punctuation from './punctuation';
import randDecimalNumbers from './randDecimalNumbers';
import randIntegers from './randIntegers';
import randNumbers from './randNumbers';
import randWholeNumbers from './randWholeNumbers';
import symbols from './symbols';

const BUILT_IN_MEDLEY_COLLECTIONS: IPracticeMedleyCollection[] = [
  { name: 'bi-common-words', words: commonWords },
  { name: 'bi-rand-numbers', words: randNumbers },
  { name: 'bi-rand-whole-numbers', words: randWholeNumbers },
  { name: 'bi-rand-integers', words: randIntegers },
  { name: 'bi-rand-decimal-numbers', words: randDecimalNumbers },
  { name: 'bi-digits', words: digits },
  { name: 'bi-symbols', words: symbols },
  { name: 'bi-punctuation', words: punctuation },
  { name: 'bi-alphabet', words: alphabet },
];

export default BUILT_IN_MEDLEY_COLLECTIONS;
