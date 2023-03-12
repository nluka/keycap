import React from 'react';
import { v4 } from 'uuid';
import type { PracticeSettingName } from '../../../../../utility/types/practice';
import PracticeSettingsBasicCardCaretDelay from './Caret/PracticeSettingsBasicCardCaretDelay';
import PracticeSettingsBasicCardCaretStyle from './Caret/PracticeSettingsBasicCardCaretStyle';
import PracticeSettingsBasicCardCountdownLength from './CountdownLength/PracticeSettingsBasicCardCountdownLength';
import PracticeSettingsBasicCardCustomTextActive from './CustomTextActive/PracticeSettingsBasicCardCustomTextActive';
import PracticeSettingsBasicCardIsPunctuationEnabled from './IsPunctuationEnabled/PracticeSettingsBasicCardIsPunctuationEnabled';
import PracticeSettingsBasicCardIsResultRecordingEnabled from './IsResultRecordingEnabled/PracticeSettingsBasicCardIsResultRecordingEnabled';
import PracticeSettingsBasicCardMedleyCollectionsActive from './Medley/Collections/Active/PracticeSettingsBasicCardMedleyCollectionsActive';
import PracticeSettingsBasicCardMedleyWordCount from './Medley/WordCount/PracticeSettingsBasicCardMedleyWordCount';
import PracticeSettingsBasicCardMedleyPunctuationFrequency from './Medley/PunctuationFrequency/PracticeSettingsBasicCardMedleyPunctuationFrequency';
import PracticeSettingsBasicCardMistakeHighlightStyle from './MistakeHighlightStyle/PracticeSettingsBasicCardMistakeHighlightStyle';
import PracticeSettingsBasicCardEnglishQuoteLengthRange from './EnglishQuoteLength/PracticeSettingsBasicCardEnglishQuoteLengthRange';
import PracticeSettingsBasicCardTextCasing from './Text/Casing/PracticeSettingsBasicCardTextCasing';
import PracticeSettingsBasicCardTextType from './Text/Type/PracticeSettingsBasicCardTextType';
import PracticeSettingsBasicCardSoundVolume from './SoundVolume/PracticeSettingsBasicCardSoundVolume';
import PracticeSettingsBasicCardRussianQuoteSentences from './RussianSentences/PracticeSettingsBasicCardRussianQuoteSentences';

interface IPracticeSettingBasicCard {
  element: JSX.Element;
  tags: string[];
}

const practiceSettingNameBasicToCardMap = new Map<
  PracticeSettingName,
  IPracticeSettingBasicCard
>([
  [
    'textType',
    {
      element: <PracticeSettingsBasicCardTextType key={v4()} />,
      tags: ['text type', 'gameplay'],
    },
  ],

  [
    'textCasing',
    {
      element: <PracticeSettingsBasicCardTextCasing key={v4()} />,
      tags: ['text casing', 'text case', 'text capitalization', 'gameplay'],
    },
  ],

  [
    'isPunctuationEnabled',
    {
      element: <PracticeSettingsBasicCardIsPunctuationEnabled key={v4()} />,
      tags: [
        'punctuation',
        'punctuation enable',
        'punctuation disable',
        'gameplay',
      ],
    },
  ],

  [
    'englishQuoteLengthRange',
    {
      element: <PracticeSettingsBasicCardEnglishQuoteLengthRange key={v4()} />,
      tags: ['english quote length range', 'quote characters', 'gameplay'],
    },
  ],

  [
    'russianQuoteSentences',
    {
      element: <PracticeSettingsBasicCardRussianQuoteSentences key={v4()} />,
      tags: ['russian quote length range', 'quote characters', 'gameplay'],
    },
  ],

  [
    'medleyCollectionsActive',
    {
      element: <PracticeSettingsBasicCardMedleyCollectionsActive key={v4()} />,
      tags: ['active medley collections', 'active collections', 'gameplay'],
    },
  ],

  [
    'medleyWordCount',
    {
      element: <PracticeSettingsBasicCardMedleyWordCount key={v4()} />,
      tags: [
        'medley item count',
        'medley items',
        'medley word count',
        'medley words',
        'gameplay',
      ],
    },
  ],

  [
    'medleyPunctuationFrequency',
    {
      element: (
        <PracticeSettingsBasicCardMedleyPunctuationFrequency key={v4()} />
      ),
      tags: ['medley punctuation frequency', 'gameplay'],
    },
  ],

  [
    'customTextActive',
    {
      element: <PracticeSettingsBasicCardCustomTextActive key={v4()} />,
      tags: ['active custom text', 'gameplay'],
    },
  ],

  // TODO: isInstantDeathEnabled

  [
    'isResultRecordingEnabled',
    {
      element: <PracticeSettingsBasicCardIsResultRecordingEnabled key={v4()} />,
      tags: ['countdown length', 'countdown time', 'gameplay'],
    },
  ],

  // TODO: isKeyboardVisualEnabled

  [
    'countdownLength',
    {
      element: <PracticeSettingsBasicCardCountdownLength key={v4()} />,
      tags: ['countdown length', 'countdown time', 'gameplay'],
    },
  ],

  [
    'caretStyle',
    {
      element: <PracticeSettingsBasicCardCaretStyle key={v4()} />,
      tags: [
        'caret style',
        'cursor style',
        'caret appearance',
        'cursor appearance',
        'visual',
      ],
    },
  ],

  [
    'caretDelay',
    {
      element: <PracticeSettingsBasicCardCaretDelay key={v4()} />,
      tags: [
        'caret delay',
        'cursor delay',
        'caret time offset',
        'cursor time offset',
        'visual',
      ],
    },
  ],

  [
    'mistakeHighlightStyle',
    {
      element: <PracticeSettingsBasicCardMistakeHighlightStyle key={v4()} />,
      tags: [
        'mistake highlight style',
        'mistake highlight appearance',
        'mistake style',
        'mistake appearance',
        'visual',
      ],
    },
  ],

  [
    'soundVolume',
    {
      element: <PracticeSettingsBasicCardSoundVolume key={v4()} />,
      tags: [
        'sound volume',
        'sound loudness',
        'audio volume',
        'audio loudness',
      ],
    },
  ],
]);

export default practiceSettingNameBasicToCardMap;
