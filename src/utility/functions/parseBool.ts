/**
 * @param value The value to be parsed.
 * @returns The equivalent boolean if the value can be parsed, undefined if it cannot be parsed.
 */
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
    case 'true': {
      return true;
    }
    case 'false': {
      return false;
    }
    default: {
      return null;
    }
  }
}
