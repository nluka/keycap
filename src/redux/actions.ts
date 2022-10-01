import type {
  IActionPracticeRoundCountdownSetInterval,
  IActionPracticeRoundCountdownStart,
  IActionPracticeRoundCountdownTick,
} from './countdown';
import type {
  IActionPracticeRoundAbort,
  IActionPracticeRoundEnd,
  IActionPracticeRoundStart,
  IActionPracticeRoundTextGenerationFailure,
  IActionPracticeRoundTextGenerationStart,
  IActionPracticeRoundTextGenerationSuccess,
  IActionPracticeRoundUpdate,
} from './round';
import type {
  IActionPracticeSettingsUnpin,
  IActionPracticeSettingsReplace,
  IActionPracticeSettingsPin,
} from './settings';

type PracticeActions =
  | IActionPracticeRoundTextGenerationStart
  | IActionPracticeRoundTextGenerationSuccess
  | IActionPracticeRoundTextGenerationFailure
  | IActionPracticeRoundCountdownStart
  | IActionPracticeRoundCountdownSetInterval
  | IActionPracticeRoundCountdownTick
  | IActionPracticeRoundStart
  | IActionPracticeRoundEnd
  | IActionPracticeRoundAbort
  | IActionPracticeRoundUpdate
  | IActionPracticeSettingsReplace
  | IActionPracticeSettingsPin
  | IActionPracticeSettingsUnpin;

export default PracticeActions;
