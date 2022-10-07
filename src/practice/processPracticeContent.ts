import type { IPracticeConfig } from '../utility/types/practice';

export default function processPracticeContent(
  content: string,
  config: IPracticeConfig,
) {
  switch (config.textCasing) {
    case 'force-lower':
      return content.toLowerCase();
    case 'force-upper':
      return content.toUpperCase();
    default:
      return content;
  }
}
