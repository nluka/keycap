import capitalizeFirstChar from './capitalizeFirstChar';

/**
 * @param strings The array of strings to convert.
 * @returns The elements of `strings` converted to a camelCase string.
 */
export default function convertWordArrayToCamelCaseString(strings: string[]) {
  if (strings.length === 0) {
    return '';
  }

  const camelCaseStrings: string[] = [strings[0].toLowerCase()];
  for (let i = 1; i < strings.length; ++i) {
    const str = strings[i];
    if (str.length > 0) {
      camelCaseStrings.push(capitalizeFirstChar(str));
    }
  }
  return camelCaseStrings.join('');
}
