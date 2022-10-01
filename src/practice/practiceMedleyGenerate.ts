import { SPACE } from '../utility/constants';
import capitalizeFirstChar from '../utility/functions/capitalizeFirstChar';
import getRandArrayElement from '../utility/functions/getRandArrayElement';
import probability from '../utility/functions/probability';
import type { IPracticeConfig } from '../utility/types/practice';
import practiceMedleyGetCollectionItems from './practiceMedleyGetCollectionItems';

export default function practiceMedleyGenerate(config: IPracticeConfig) {
  const [activeCollections, itemCount] = [
    config.medleyCollectionsActive,
    config.medleyItemCount,
  ];

  if (activeCollections.length === 0) {
    return new Error(
      `Failed to generate medley: there are no active collections.`,
    );
  }

  const areAllCollectionsEmpty = activeCollections.every((collection) => {
    const items = practiceMedleyGetCollectionItems(collection, config);
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
      practiceMedleyGetCollectionItems(randCollection, config) || [],
    );
    rawItems.push(randItem);
  }

  const processedItems = processItems(rawItems, config);

  const rawMedleyStr = processedItems.join(SPACE);

  const processedMedleyStr = processMedleyStr(rawMedleyStr, config);

  return processedMedleyStr;
}

function processItems(items: string[], config: IPracticeConfig) {
  if (config.isPunctuationEnabled) {
    items = addPunctuation(items, config.medleyPunctuationFrequency);
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

function processMedleyStr(str: string, config: IPracticeConfig) {
  str = str.replace(/[.?!] [a-z]/g, (match) => {
    return match.slice(0, 2) + match.charAt(2).toUpperCase();
  });
  if (config.isPunctuationEnabled) {
    str = capitalizeFirstChar(str);
    str = addSentenceTerminatorChar(str);
  }
  return str;
}
