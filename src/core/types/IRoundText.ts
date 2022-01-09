import type IRoundTextItem from './IRoundTextItem';

export default interface IRoundText {
  items: IRoundTextItem[];
  itemsCompletedCount: number;
  caretPosition: number;
}
