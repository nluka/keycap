import {
  throwIfParamIsLessThanZero,
  throwIfParamIsNotFinite,
} from './throwers';

export default function calcAccuracy(
  textLength: number,
  totalMistakeCount: number,
) {
  throwIfParamIsNotFinite('textLength', textLength);
  throwIfParamIsNotFinite('totalMistakeCount', totalMistakeCount);

  throwIfParamIsLessThanZero('textLength', textLength);
  throwIfParamIsLessThanZero('totalMistakeCount', totalMistakeCount);

  return (textLength / (textLength + totalMistakeCount)) * 100;
}
