import type IRoundTextItemChar from './IRoundTextItemChar';

export default interface IRoundTextItem {
  chars: IRoundTextItemChar[];
  isCompleted: boolean;
}
