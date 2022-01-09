const controlCharToVisualSymbol = new Map<string, string>([['\n', '↵']]);

export default function replaceControlCharsWithVisibleChars(str: string) {
  if (str.length === 0) {
    return '';
  }

  const processedChars: string[] = [];
  for (const char of str) {
    const symbol = controlCharToVisualSymbol.get(char);
    processedChars.push(symbol === undefined ? char : symbol);
  }
  return processedChars.join('');
}
