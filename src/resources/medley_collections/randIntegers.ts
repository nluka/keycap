import generateRandPositiveIntInRange from '../../utility/functions/generateRandPositiveIntInRange';
import randWholeNumbers from './randWholeNumbers';

const randIntegers = [...randWholeNumbers];

for (let i = 0; i < 1000; ++i) {
  randIntegers.push(
    (-1 * generateRandPositiveIntInRange(0, 10_000_000)).toString(),
  );
}

export default randIntegers;
