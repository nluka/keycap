import { fetchRandEnglishQuote } from '../core/quotable';
import type {
  IPracticeConfig,
  PracticeTextType,
} from '../utility/types/practice';
import processContent from './processPracticeContent';
import generatePracticeMedley from './generatePracticeMedley';
import storage from '../local-storage';
import generateRandPositiveIntInRange from '../utility/functions/generateRandPositiveIntInRange';
import { INFO_MESSAGE_STYLES } from '../utility/constants';

let allSentences: string[] = [];
if (storage.hasRussianBibleSentenceData()) {
  const text = storage.getRussianBibleSentenceData();
  if (text === null) {
    throw new Error(
      'storage.hasRussianBibleSentenceData was true but storage.getRussianBibleSentenceData returned null',
    );
  }
  allSentences = text.split('\n');
}

type ContentGeneratorFunc = (
  config: IPracticeConfig,
) => string | Error | Promise<string | Error>;

const textTypeToContentGeneratorFuncMap = new Map<
  PracticeTextType,
  ContentGeneratorFunc
>([
  ['English quote', generateEnglishQuote],
  ['Russian bible', generateRussianBibleSentences],
  ['medley', generatePracticeMedley],
  ['custom', generateCustom],
]);

/**
 * @param config The config to use for content generation.
 * @returns Generated content string corresponding to the config provided in `settings`, or an error if content cannot be generated.
 */
export default async function generatePracticeContent(config: IPracticeConfig) {
  const textType = config.textType;
  const contentGeneratorFunc = textTypeToContentGeneratorFuncMap.get(textType);
  if (contentGeneratorFunc === undefined) {
    throw new Error(
      `failed to generate practice content: '${textType}' is not a valid textType`,
    );
  }

  const content = await contentGeneratorFunc(config);
  console.log(content);

  return content instanceof Error ? content : processContent(content, config);
}

async function generateEnglishQuote(config: IPracticeConfig) {
  const content = fetchRandEnglishQuote(config);
  return content instanceof Error
    ? new Error(`Failed to generate text: ${content.message}`)
    : content;
}

async function generateRussianBibleSentences(config: IPracticeConfig) {
  if (!storage.hasRussianBibleSentenceData()) {
    try {
      const text = await storage.downloadRussianBibleSentenceData();
      allSentences = text.split('\n');
      console.log(`%cFetched Russian bible sentence data`, INFO_MESSAGE_STYLES);
    } catch (err: any) {
      alert(`Unable to download Russian bible data => ${err}`);
    }
  }

  if (allSentences.length === 0) {
    return new Error(
      'Failed to generate text: unable to download Russian bible data, refresh the page to try again',
    );
  }

  const lowerBound = 0;
  const upperBoundIdx = allSentences.length - 1 - config.russianQuoteSentences;

  const chosenFirstLineIdx = generateRandPositiveIntInRange(
    lowerBound,
    upperBoundIdx,
  );
  const lastLineIdx = chosenFirstLineIdx + config.russianQuoteSentences;
  const sentences = allSentences.slice(chosenFirstLineIdx, lastLineIdx);
  const content = sentences.join(' ');

  return content;
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
