import type {
  IActionPracticeRoundCountdownSetInterval,
  IActionPracticeRoundCountdownStart,
  IActionPracticeRoundCountdownTick,
} from './countdownActions';
import type {
  IActionPracticeRoundAbort,
  IActionPracticeRoundEnd,
  IActionPracticeRoundStart,
  IActionPracticeRoundTextGenerationFailure,
  IActionPracticeRoundTextGenerationStart,
  IActionPracticeRoundTextGenerationSuccess,
  IActionPracticeRoundUpdate,
} from './roundActions';
import type {
  IActionPracticeSettingsUnpin,
  IActionPracticeSettingsReplace,
  IActionPracticeSettingsPin,
} from './settingsActions';

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
