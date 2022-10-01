import { fetchRandQuote } from '../core/quotable';
import type {
  IPracticeConfig,
  PracticeTextType,
} from '../utility/types/practice';
import processContent from './practiceContentProcess';
import practiceMedleyGenerate from './practiceMedleyGenerate';

type ContentGeneratorFunc = (
  config: IPracticeConfig,
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
 * @param config The config to use for content generation.
 * @returns Generated content string corresponding to the config provided in `settings`, or an error if content cannot be generated.
 */
export default async function practiceContentGenerate(config: IPracticeConfig) {
  const textType = config.textType;
  const contentGeneratorFunc = textTypeToContentGeneratorFuncMap.get(textType);
  if (contentGeneratorFunc === undefined) {
    throw new Error(
      `failed to generate practice content: '${textType}' is not a valid textType`,
    );
  }

  const content = await contentGeneratorFunc(config);

  return content instanceof Error ? content : processContent(content, config);
}

async function generateQuote(config: IPracticeConfig) {
  const content = await fetchRandQuote(
    // {
    //   minLength: config.quoteLength.min,
    //   maxLength: config.quoteLength.max,
    // },
    config,
  );
  return content instanceof Error
    ? new Error(`Failed to generate quote: ${content.message}`)
    : content;
}

function generateCustom(config: IPracticeConfig) {
  const activeText = config.customTextActive;
  if (activeText === null) {
    return new Error(
      `Failed to generate a custom text: active text hasn't been selected.`,
    );
  }

  const customTexts = config.customTexts;
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
