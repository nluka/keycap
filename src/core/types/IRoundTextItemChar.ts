import type IRoundTextItemCharMistake from './IRoundTextItemCharMistake';

export default interface IRoundTextItemChar {
  actual: string;
  input: string | null;
  mistakes: IRoundTextItemCharMistake[];
}
