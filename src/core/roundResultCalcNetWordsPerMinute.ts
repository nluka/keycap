import {
  throwIfParamIsLessThanZero,
  throwIfParamIsNotFinite,
} from './utilities/throwers';

export default function roundResultCalcNetWordsPerMinute(
  correctCharactersCount: number,
  charactersPerWord: number,
  minutesElapsed: number,
) {
  throwIfParamIsNotFinite('correctCharactersCount', correctCharactersCount);
  throwIfParamIsNotFinite('minutesElapsed', minutesElapsed);

  throwIfParamIsLessThanZero('correctCharactersCount', correctCharactersCount);
  throwIfParamIsLessThanZero('minutesElapsed', minutesElapsed);

  return correctCharactersCount / charactersPerWord / minutesElapsed;
}
