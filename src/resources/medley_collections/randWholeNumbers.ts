import generateRandPositiveIntInRange from '../../utility/functions/generateRandPositiveIntInRange';

const randWholeNumbers: string[] = [];

for (let i = 0; i < 1000; ++i) {
  randWholeNumbers.push(
    generateRandPositiveIntInRange(0, 1_000_000).toString(),
  );
}

export default randWholeNumbers;
