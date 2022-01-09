import type { IPracticeSettings, PracticeTextType } from 'keycap-foundation';
import { fetchRandQuote } from '../core/quotable';
import processContent from './practiceContentProcess';
import practiceMedleyGenerate from './practiceMedleyGenerate';

type ContentGeneratorFunc = (
  settings: IPracticeSettings,
) => string | Error | Promise<string | Error>;

const textTypeToContentGeneratorFuncMap = new Map<
  PracticeTextType,
  ContentGeneratorFunc
>([
  ['quote', generateQuote],
  ['medley', practiceMedleyGenerate],
  ['custom', generateCustom],
]);

/**
 * @param settings The config to use for content generation.
 * @returns Generated content string corresponding to the config provided in `settings`, or an error if content cannot be generated.
 */
export default async function practiceContentGenerate(
  settings: IPracticeSettings,
) {
  const textType = settings.currentConfig.basic.config.textType;
  const contentGeneratorFunc = textTypeToContentGeneratorFuncMap.get(textType);
  if (contentGeneratorFunc === undefined) {
    throw new Error(
      `failed to generate practice content: '${textType}' is not a valid textType`,
    );
  }

  const content = await contentGeneratorFunc(settings);

  return content instanceof Error
    ? content
    : processContent(content, settings.currentConfig.basic.config);
}

async function generateQuote(settings: IPracticeSettings) {
  const content = await fetchRandQuote(
    {
      minLength: settings.currentConfig.basic.config.quoteLength.min,
      maxLength: settings.currentConfig.basic.config.quoteLength.max,
    },
    settings.currentConfig.basic.config,
  );
  return content instanceof Error
    ? new Error(`Failed to generate quote: ${content.message}`)
    : content;
}

function generateCustom(settings: IPracticeSettings) {
  const activeText = settings.currentConfig.basic.config.customTextActive;
  if (activeText === null) {
    return new Error(
      `Failed to generate a custom text: active text hasn't been selected.`,
    );
  }

  const customTexts = settings.currentConfig.advanced.config.customTexts;
  const customTextIndex = customTexts.findIndex(
    (text) => text.name === activeText,
  );
  const customTextContent = customTexts[customTextIndex].content;

  return customTextContent.length === 0 || customTextContent.match(/^( |\n)+$/)
    ? new Error(
        `Failed to generate a custom text because the currently active text has no content.`,
      )
    : customTextContent;
}
