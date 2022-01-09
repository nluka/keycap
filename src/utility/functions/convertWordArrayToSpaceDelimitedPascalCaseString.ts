import { SPACE } from '../constants';
import capitalizeFirstChar from './capitalizeFirstChar';

/**
 * @param strings The array of strings to convert.
 * @returns The elements of `strings` as a single PascalCase string, delimited by spaces.
 */
export default function convertWordArrayToSpaceDelimitedPascalCaseString(
  strings: string[],
) {
  const pascalCaseStrings = strings.map((str) => {
    if (str.length > 0) {
      return capitalizeFirstChar(str);
    }
  });
  return pascalCaseStrings.join(SPACE);
}
