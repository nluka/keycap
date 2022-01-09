import {
  throwIfParamIsLessThanZero,
  throwIfParamIsNotFinite,
} from './utilities/throwers';

export default function roundResultCalcAccuracyPercentage(
  textLength: number,
  totalMistakeCount: number,
) {
  throwIfParamIsNotFinite('textLength', textLength);
  throwIfParamIsNotFinite('totalMistakeCount', totalMistakeCount);

  throwIfParamIsLessThanZero('textLength', textLength);
  throwIfParamIsLessThanZero('totalMistakeCount', totalMistakeCount);

  return (textLength / (textLength + totalMistakeCount)) * 100;
}
