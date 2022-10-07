import {
  throwIfParamIsLessThanZero,
  throwIfParamIsNotFinite,
} from './throwers';

export default function calcNetWPM(
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
