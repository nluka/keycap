import type { IPracticeSettingsConfigBasic } from 'keycap-foundation';

export default function practiceContentProcess(
  content: string,
  basicConfig: IPracticeSettingsConfigBasic,
) {
  switch (basicConfig.textCasing) {
    case 'force-lower':
      return content.toLowerCase();
    case 'force-upper':
      return content.toUpperCase();
    default:
      return content;
  }
}
