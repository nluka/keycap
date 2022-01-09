import NumberRange from 'nluka-number-range';

const limits = new NumberRange(0, 1);

/**
 * @param chanceToReturnTrue The probability to return true as a float between 0 and 1.
 */
export default function probability(chanceToReturnTrue: number) {
  if (!limits.containsFloat(chanceToReturnTrue, 2)) {
    throw new RangeError(`'chanceToReturnTrue' must be between 0 and 1`);
  }
  return Math.random() < chanceToReturnTrue;
}
