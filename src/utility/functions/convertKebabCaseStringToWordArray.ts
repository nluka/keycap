/**
 * @param kebabCaseString The string to convert. Multiple dashes are treated as a single delimeter.
 * @returns Array of lowercase strings containing the words from `kebabCaseString`. If string is empty, returns an empty array.
 */
export default function convertKebabCaseStringToStringArray(
  kebabCaseString: string,
) {
  if (kebabCaseString.length === 0) {
    return [];
  }
  return kebabCaseString.split(/-+/);
}
