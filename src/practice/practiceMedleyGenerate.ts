import type {
  IPracticeSettings,
  IPracticeSettingsConfigBasic,
} from 'keycap-foundation';
import { SPACE } from '../utility/constants';
import capitalizeFirstChar from '../utility/functions/capitalizeFirstChar';
import getRandArrayElement from '../utility/functions/getRandArrayElement';
import probability from '../utility/functions/probability';
import practiceMedleyGetCollectionItems from './practiceMedleyGetCollectionItems';

export default function practiceMedleyGenerate(settings: IPracticeSettings) {
  const [activeCollections, itemCount] = [
    settings.currentConfig.basic.config.medleyCollectionsActive,
    settings.currentConfig.basic.config.medleyItemCount,
  ];

  if (activeCollections.length === 0) {
    return new Error(
      `Failed to generate medley: there are no active collections.`,
    );
  }

  const areAllCollectionsEmpty = activeCollections.every((collection) => {
    const items = practiceMedleyGetCollectionItems(collection, settings);
    return items?.length === 0;
  });
  if (areAllCollectionsEmpty) {
    return new Error(
      `Failed to generate medley: all active collections are empty.`,
    );
  }

  const rawItems: string[] = [];

  for (let i = 0; i < itemCount; ++i) {
    const randCollection = getRandArrayElement(activeCollections);
    const randItem = getRandArrayElement<string>(
      practiceMedleyGetCollectionItems(randCollection, settings) || [],
    );
    rawItems.push(randItem);
  }

  const processedItems = processItems(
    rawItems,
    settings.currentConfig.basic.config,
  );

  const rawMedleyStr = processedItems.join(SPACE);

  const processedMedleyStr = processMedleyStr(
    rawMedleyStr,
    settings.currentConfig.basic.config,
  );

  return processedMedleyStr;
}

function processItems(
  items: string[],
  basicConfig: IPracticeSettingsConfigBasic,
) {
  if (basicConfig.isPunctuationEnabled) {
    items = addPunctuation(items, basicConfig.medleyPunctuationFrequency);
  }
  return items;
}

function addPunctuation(items: string[], frequency: number) {
  return items.map((item) => {
    if (probability(frequency)) {
      const func = getRandArrayElement(punctuationFuncs);
      return func(item);
    }
    return item;
  });
}

const punctuationFuncs = [
  addSentenceSeparatorChar, // 10
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceSeparatorChar,
  addSentenceTerminatorChar, // 5
  addSentenceTerminatorChar,
  addSentenceTerminatorChar,
  addSentenceTerminatorChar,
  addSentenceTerminatorChar,
  addDoubleQuotations, // 2
  addDoubleQuotations,
  addSingleQuotations, // 2
  addSingleQuotations,
  addBrackets, // 1
  addParentheses, // 1
];

function addSentenceTerminatorChar(str: string) {
  const distribution = ['.', '.', '?', '!'];
  return str + getRandArrayElement(distribution);
}
function addSentenceSeparatorChar(str: string) {
  const distribution = [',', ',', ',', ':', ';'];
  return str + getRandArrayElement(distribution);
}
function addBrackets(str: string) {
  return `[${str}]`;
}
function addParentheses(str: string) {
  return `(${str})`;
}
function addSingleQuotations(str: string) {
  return `'${str}'`;
}
function addDoubleQuotations(str: string) {
  return `"${str}"`;
}

function processMedleyStr(
  str: string,
  basicConfig: IPracticeSettingsConfigBasic,
) {
  str = str.replace(/[.?!] [a-z]/g, (match) => {
    return match.slice(0, 2) + match.charAt(2).toUpperCase();
  });
  if (basicConfig.isPunctuationEnabled) {
    str = capitalizeFirstChar(str);
    str = addSentenceTerminatorChar(str);
  }
  return str;
}
