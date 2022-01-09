/**
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random positive integer inclusively between `min` and `max`.
 */
export default function generateRandPositiveIntInRange(
  min: number,
  max: number,
) {
  if (min > max) {
    throw new Error(`min (${min}) cannot be greater than max (${max})`);
  }
  if (min < 0) {
    throw new RangeError(`min (${min}) must be >= 0`);
  }
  if (max < 0) {
    throw new RangeError(`max (${max}) must be >= 0`);
  }
  return Math.floor(Math.random() * max) + min;
}
