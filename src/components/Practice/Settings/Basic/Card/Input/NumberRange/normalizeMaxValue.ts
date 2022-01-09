import type NumberRange from 'nluka-number-range';

export default function normalizeMaxValue(
  max: number,
  min: number,
  limits: NumberRange,
) {
  let normalizedMax: number;

  if (max < min) {
    normalizedMax = min;
  } else if (max < limits.getMin()) {
    normalizedMax = limits.getMin();
  } else if (max > limits.getMax()) {
    normalizedMax = limits.getMax();
  } else {
    normalizedMax = max;
  }

  return normalizedMax;
}
