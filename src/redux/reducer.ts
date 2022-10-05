import { roundResultCalc } from '../core/roundResultCalc';
import roundTextCalcPrevInputValue from '../core/roundTextCalcPrevInputValue';
import roundTextUpdate from '../core/roundTextUpdate';
import storage from '../local-storage';
import createDeepCopy from '../utility/functions/createDeepCopy';
import type PracticeActions from './actions';
import {
  ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_SET_INTERVAL,
  ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_START,
  ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_TICK,
} from './countdownActions';
import {
  ACTION_TYPE_PRACTICE_ROUND_ABORT,
  ACTION_TYPE_PRACTICE_ROUND_END,
  ACTION_TYPE_PRACTICE_ROUND_START,
  ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_FAILURE,
  ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_START,
  ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_SUCCESS,
  ACTION_TYPE_PRACTICE_ROUND_UPDATE,
} from './roundActions';
import {
  ACTION_TYPE_PRACTICE_SETTINGS_PIN,
  ACTION_TYPE_PRACTICE_SETTINGS_REPLACE,
  ACTION_TYPE_PRACTICE_SETTINGS_UNPIN,
} from './settingsActions';
import { IStatePractice, PracticeRoundStopCode, PracticeStatus } from './types';

const initialState: IStatePractice = {
  playArea: {
    roundStatus: PracticeStatus.idle,
    countdown: {
      secondsRemaining: null,
      interval: null,
    },
    roundStartTime: null,
    roundEndTime: null,
    roundStopCode: null,
    roundText: {
      items: [],
      itemsCompletedCount: 0,
      caretPosition: 0,
    },
    roundTextGenerationError: null,
    input: '',
  },
  roundResult: null,
  settings: storage.getPracticeSettings(),
};

export default function practiceReducer(
  state = initialState,
  action: PracticeActions,
): IStatePractice {
  const newState = createDeepCopy(state) as IStatePractice;

  switch (action.type) {
    case ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_START:
      newState.playArea.roundStatus = PracticeStatus.generatingText;
      newState.playArea.roundStartTime = null;
      newState.playArea.roundEndTime = null;
      newState.playArea.roundStopCode = null;
      newState.roundResult = null;
      break;
    case ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_FAILURE:
      newState.playArea.roundStatus = PracticeStatus.idle;
      newState.playArea.roundText = null;
      newState.playArea.roundTextGenerationError = action.payload.error.message;
      break;
    case ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_SUCCESS:
      newState.playArea.roundText = action.payload.text;
      newState.playArea.roundTextGenerationError = null;
      break;
    case ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_START:
      newState.playArea.roundStatus = PracticeStatus.countingDown;
      newState.playArea.countdown.secondsRemaining = action.payload.seconds;
      break;
    case ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_SET_INTERVAL:
      newState.playArea.countdown.interval = action.payload.interval;
      break;
    case ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_TICK:
      if (newState.playArea.countdown.secondsRemaining !== null) {
        newState.playArea.countdown.secondsRemaining -= 1;
      }
      break;
    case ACTION_TYPE_PRACTICE_ROUND_START:
      newState.playArea.roundStatus = PracticeStatus.running;
      newState.playArea.countdown.interval = null;
      newState.playArea.countdown.secondsRemaining = null;
      newState.playArea.roundStartTime = Date.now();
      break;
    case ACTION_TYPE_PRACTICE_ROUND_UPDATE: {
      const text = newState.playArea.roundText;
      if (text === null) {
        throw new TypeError('text === null');
      }
      roundTextUpdate(
        text,
        action.payload.input,
        roundTextCalcPrevInputValue(text.items),
      );
      break;
    }
    case ACTION_TYPE_PRACTICE_ROUND_END: {
      const endTime = Date.now();
      newState.playArea.roundStatus = PracticeStatus.idle;
      newState.playArea.roundEndTime = endTime;
      newState.playArea.roundStopCode = PracticeRoundStopCode.completed;
      newState.roundResult = roundResultCalc(
        state.playArea.roundText?.items || [],
        state.playArea.roundStartTime as number,
        endTime,
      );
      break;
    }
    case ACTION_TYPE_PRACTICE_ROUND_ABORT:
      newState.playArea.roundStatus = PracticeStatus.idle;
      newState.playArea.countdown = initialState.playArea.countdown;
      newState.playArea.roundStartTime = null;
      newState.playArea.roundEndTime = null;
      newState.playArea.roundStopCode = PracticeRoundStopCode.aborted;
      newState.playArea.roundText = initialState.playArea.roundText;
      newState.playArea.input = '';
      newState.roundResult = null;
      break;
    case ACTION_TYPE_PRACTICE_SETTINGS_REPLACE:
      newState.settings = action.payload.settings;
      break;
    case ACTION_TYPE_PRACTICE_SETTINGS_PIN:
      newState.settings.pinned.push(action.payload.name);
      break;
    case ACTION_TYPE_PRACTICE_SETTINGS_UNPIN: {
      const pinned = newState.settings.pinned;
      pinned.splice(pinned.indexOf(action.payload.name), 1);
      break;
    }
    default:
      break;
  }

  return newState;
}
