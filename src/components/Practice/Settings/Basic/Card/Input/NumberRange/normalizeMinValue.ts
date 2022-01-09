import type NumberRange from 'nluka-number-range';

export default function normalizeMinValue(
  min: number,
  max: number,
  limits: NumberRange,
) {
  let normalizedMin: number;

  if (min > max) {
    normalizedMin = max;
  } else if (min < limits.getMin()) {
    normalizedMin = limits.getMin();
  } else if (min > limits.getMax()) {
    normalizedMin = limits.getMax();
  } else {
    normalizedMin = min;
  }

  return normalizedMin;
}
