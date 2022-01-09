import type { PracticeSettingNameAdvanced } from 'keycap-foundation';
import React from 'react';
import { v4 } from 'uuid';
import PracticeSettingsAdvancedItemCustomTextsContainer from './CustomTexts/PracticeSettingsAdvancedItemCustomTextsContainer';
import PracticeSettingsAdvancedItemMedleyCollectionsCustomContainer from './MedleyCollectionsCustom/PracticeSettingsAdvancedItemMedleyCollectionsCustomContainer';

interface IPracticeSettingAdvancedItem {
  element: JSX.Element;
  tags: string[];
}

const practiceSettingNameAdvancedToItemMap = new Map<
  PracticeSettingNameAdvanced,
  IPracticeSettingAdvancedItem
>([
  [
    'medleyCollectionsCustom',
    {
      element: (
        <PracticeSettingsAdvancedItemMedleyCollectionsCustomContainer
          key={v4()}
        />
      ),
      tags: ['custom medley collections', 'custom collections'],
    },
  ],
  [
    'customTexts',
    {
      element: <PracticeSettingsAdvancedItemCustomTextsContainer key={v4()} />,
      tags: ['custom texts'],
    },
  ],
]);

export default practiceSettingNameAdvancedToItemMap;
