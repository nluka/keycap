import type {
  IActionPracticeRoundCountdownSetInterval,
  IActionPracticeRoundCountdownStart,
  IActionPracticeRoundCountdownTick,
} from './practiceActionsCountdown';
import type {
  IActionPracticeRoundAbort,
  IActionPracticeRoundEnd,
  IActionPracticeRoundStart,
  IActionPracticeRoundTextGenerationFailure,
  IActionPracticeRoundTextGenerationStart,
  IActionPracticeRoundTextGenerationSuccess,
  IActionPracticeRoundUpdate,
} from './practiceActionsRound';
import type {
  IActionPracticeSettingsAdvancedPin,
  IActionPracticeSettingsAdvancedUnpin,
  IActionPracticeSettingsBasicPin,
  IActionPracticeSettingsBasicUnpin,
  IActionPracticeSettingsReplace,
} from './practiceActionsSettings';

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
  | IActionPracticeSettingsBasicPin
  | IActionPracticeSettingsBasicUnpin
  | IActionPracticeSettingsAdvancedPin
  | IActionPracticeSettingsAdvancedUnpin;

export default PracticeActions;
