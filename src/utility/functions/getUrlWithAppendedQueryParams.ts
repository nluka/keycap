/**
 * @param baseUrl The base URL.
 * @param queryParams Object containing the query parameters to append.
 * @returns String with all parameters from `queryParams` appended to `baseUrl`.
 */
export default function getUrlWithAppendedQueryParams(
  baseUrl: string,
  queryParams: object,
) {
  const entries = Object.entries(queryParams);

  if (entries.length === 0) {
    return baseUrl;
  }

  const paramStrings = entries.map((entry) => {
    const [key, value] = entry;
    if (value != null) {
      return `${key}=${value}`;
    }
  });

  return paramStrings.length === 0
    ? baseUrl
    : `${baseUrl}?${paramStrings.join('&')}`;
}
