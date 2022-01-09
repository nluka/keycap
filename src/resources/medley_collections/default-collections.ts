import type { IPracticeMedleyCollection } from 'keycap-foundation';
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
  { name: 'bi-common-words', items: commonWords },
  { name: 'bi-rand-numbers', items: randNumbers },
  { name: 'bi-rand-whole-numbers', items: randWholeNumbers },
  { name: 'bi-rand-integers', items: randIntegers },
  { name: 'bi-rand-decimal-numbers', items: randDecimalNumbers },
  { name: 'bi-digits', items: digits },
  { name: 'bi-symbols', items: symbols },
  { name: 'bi-punctuation', items: punctuation },
  { name: 'bi-alphabet', items: alphabet },
];

export default BUILT_IN_MEDLEY_COLLECTIONS;
