import NumberRange from 'nluka-number-range';
import type IStats from './types/practice';
import type { IPracticeSettings } from './types/practice';

export const SPACE = ' ';
export const INFO_MESSAGE_STYLES =
  'background-color: rgba(100, 255, 0, 0.5); padding: 2.5px; font-size: 0.8rem; font-weight: bold;';

export const DEFAULT_PRACTICE_SETTINGS: IPracticeSettings = {
  profiles: [],
  current: {
    caretDelay: 0,
    caretStyle: 'bar',
    countdownLength: 3,
    customTextActive: null,
    isInstantDeathEnabled: false,
    isKeyboardVisualEnabled: false,
    isPunctuationEnabled: true,
    isResultRecordingEnabled: true,
    medleyCollectionsActive: [
      'bi-common-words',
      'bi-rand-numbers',
      'bi-symbols',
    ],
    medleyWordCount: 15,
    medleyPunctuationFrequency: 0,
    mistakeHighlightStyle: 'background',
    englishQuoteLengthRange: {
      min: 1,
      max: 250,
    },
    russianQuoteSentences: 3,
    soundVolume: 0.5,
    textCasing: 'dynamic',
    textType: 'English quote',
    medleyCollectionsCustom: [],
    customTexts: [],
  },
  pinned: [],
};

export const PRACTICE_SETTINGS_ENGLISH_QUOTE_LENGTH_RANGE_LIMITS =
  new NumberRange(1, 250);
export const PRACTICE_SETTINGS_RUSSIAN_QUOTE_SENTENCES_LIMITS = new NumberRange(
  1,
  5,
);
export const PRACTICE_SETTINGS_COUNTDOWN_LENGTH_LIMITS = new NumberRange(0, 5);
export const PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS = new NumberRange(0, 1);
export const PRACTICE_SETTINGS_CARET_DELAY_LIMITS = new NumberRange(0, 1);
export const PRACTICE_SETTINGS_MEDLEY_WORD_COUNT_LIMITS = new NumberRange(
  1,
  100,
);
export const PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS =
  new NumberRange(0, 1);

export const DEFAULT_PRACTICE_STATS: IStats = {
  lastTenRoundResults: [],
  averageRoundResult: {
    netWordsPerMinute: 0,
    accuracyPercentage: 0,
    timeElapsed: 0,
  },
  roundsCompletedCount: 0,
  roundsAbortedCount: 0,
};
