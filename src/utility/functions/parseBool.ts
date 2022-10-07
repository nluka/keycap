export default function parseBool(
  value: boolean | string | number | null | undefined,
) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value == null) {
    return null;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  switch (value.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}
