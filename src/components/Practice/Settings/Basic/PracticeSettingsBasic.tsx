import React, { useState } from 'react';
import localStorageItems, {
  localStorageGetBool,
} from '../../../../local-storage';
import Panel from '../../../Panel/Panel';
import PracticeSettingsBasicActionBar from './ActionBar/PracticeSettingsBasicActionBar';
import PracticeSettingsBasicCardsContainer from './Card/PracticeSettingsBasicCardsContainer';

export default function PracticeSettingsBasic() {
  const [searchValue, setSearchValue] = useState('');
  const [onlyShowPinned, setOnlyShowPinned] = useState(
    localStorageGetBool(
      localStorageItems.onlyShowPinnedPracticeSettingsBasic,
    ) || false,
  );

  return (
    <Panel
      classes="practice-settings"
      collapseLocalStorageKey={
        localStorageItems.isPanelCollapsedPracticeSettingsBasic
      }
      heading="Basic"
      id="practiceSettingsBasic"
    >
      <PracticeSettingsBasicActionBar
        onlyShowPinned={onlyShowPinned}
        setOnlyShowPinned={setOnlyShowPinned}
        setSearchValue={setSearchValue}
      />
      <PracticeSettingsBasicCardsContainer
        onlyShowPinned={onlyShowPinned}
        searchValue={searchValue}
      />
    </Panel>
  );
}
