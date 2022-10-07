import type Time from '../utility/types/Time';

export interface IQuote {
  content: string;
  author: string | null;
}

export interface IRoundTextCharMistake {
  input: string;
  timeMade: Time;
}

export interface IRoundTextChar {
  actual: string;
  input: string | null;
  mistakes: IRoundTextCharMistake[];
}

export interface IRoundTextWord {
  chars: IRoundTextChar[];
  isCompleted: boolean;
}

export interface IRoundText {
  words: IRoundTextWord[];
  numWordsCompleted: number;
  caretPosition: number;
}
