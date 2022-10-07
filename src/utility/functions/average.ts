export default function average(values: number[]) {
  let sum = 0;
  for (const val of values) {
    sum += val;
  }
  return sum / values.length;
}
