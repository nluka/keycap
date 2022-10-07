import type Time from './Time';

export interface IPracticeSettings {
  profiles: IPracticeSettingsProfile[];
  current: IPracticeConfig;
  pinned: PracticeSettingName[];
}

export interface IPracticeSettingsProfile {
  name: string;
  config: IPracticeConfig;
}

export interface IPracticeConfig {
  caretDelay: number;
  caretStyle: PracticeCaretStyle;
  countdownLength: number;
  customTextActive: string | null;
  isInstantDeathEnabled: boolean;
  isKeyboardVisualEnabled: boolean;
  isPunctuationEnabled: boolean;
  isResultRecordingEnabled: boolean;
  medleyCollectionsActive: string[];
  medleyCollectionsCustom: IPracticeMedleyCollection[];
  medleyWordCount: number;
  medleyPunctuationFrequency: number;
  mistakeHighlightStyle: PracticeMistakeHighlightStyle;
  quoteLength: IQuoteLength;
  soundVolume: number;
  textCasing: PracticeTextCasing;
  textType: PracticeTextType;
  customTexts: IPracticeCustomText[];
}

export type PracticeSettingName = keyof IPracticeConfig;

export type PracticeTextType = 'quote' | 'medley' | 'custom';
export type PracticeTextCasing = 'dynamic' | 'force-lower' | 'force-upper';
export type PracticeCaretStyle = 'bar' | 'block' | 'underline' | 'outline';
export type PracticeMistakeHighlightStyle = 'background' | 'text';
export interface IQuoteLength {
  min: number;
  max: number;
}
export interface IPracticeMedleyCollection {
  name: string;
  words: string[];
}
export interface IPracticeCustomText {
  name: string;
  content: string;
}

export interface IPracticeRoundResult {
  netWordsPerMinute: number;
  accuracyPercentage: number;
  timeElapsed: Time;
}

export default interface IStats {
  lastTenRoundResults: IPracticeRoundResult[];
  averageRoundResult: IPracticeRoundResult;
  roundsCompletedCount: number;
  roundsAbortedCount: number;
}
