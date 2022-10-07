import { SPACE } from '../utility/constants';
import capitalizeFirstChar from '../utility/functions/capitalizeFirstChar';
import getRandArrayElement from '../utility/functions/getRandArrayElement';
import probability from '../utility/functions/probability';
import type { IPracticeConfig } from '../utility/types/practice';
import extractPracticeMedleyCollectionWords from './extractPracticeMedleyCollectionWords';

export default function generatePracticeMedley(config: IPracticeConfig) {
  const [activeCollections, numWords] = [
    config.medleyCollectionsActive,
    config.medleyWordCount,
  ];

  if (activeCollections.length === 0) {
    return new Error(
      `Failed to generate medley: there are no active collections.`,
    );
  }

  const areAllCollectionsEmpty = activeCollections.every((collection) => {
    const words = extractPracticeMedleyCollectionWords(collection, config);
    return words?.length === 0;
  });
  if (areAllCollectionsEmpty) {
    return new Error(
      `Failed to generate medley: all active collections are empty.`,
    );
  }

  const rawWords: string[] = [];

  for (let i = 0; i < numWords; ++i) {
    const randCollection = getRandArrayElement(activeCollections);
    const randWord = getRandArrayElement<string>(
      extractPracticeMedleyCollectionWords(randCollection, config) || [],
    );
    rawWords.push(randWord);
  }

  const processedWords = processWords(rawWords, config);

  const rawMedleyStr = processedWords.join(SPACE);

  const processedMedleyStr = processMedleyStr(rawMedleyStr, config);

  return processedMedleyStr;
}

function processWords(words: string[], config: IPracticeConfig) {
  if (config.isPunctuationEnabled) {
    words = addPunctuation(words, config.medleyPunctuationFrequency);
  }
  return words;
}

function addPunctuation(words: string[], frequency: number) {
  return words.map((word) => {
    if (probability(frequency)) {
      const func = getRandArrayElement(punctuationFuncs);
      return func(word);
    }
    return word;
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
