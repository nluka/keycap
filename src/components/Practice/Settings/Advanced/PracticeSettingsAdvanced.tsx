import React, { useState } from 'react';
import localStorageItems, {
  localStorageGetBool,
} from '../../../../local-storage';
import Panel from '../../../Panel/Panel';
import PracticeSettingsAdvancedActionBar from './ActionBar/PracticeSettingsAdvancedActionBar';
import PracticeSettingsAdvancedItemsContainer from './Items/Container/PracticeSettingsAdvancedItemsContainer';

export default function PracticeSettingsAdvanced() {
  const [searchValue, setSearchValue] = useState('');
  const [onlyShowPinned, setOnlyShowPinned] = useState(
    localStorageGetBool(
      localStorageItems.onlyShowPinnedPracticeSettingsAdvanced,
    ) || false,
  );

  return (
    <Panel
      classes="practice-settings"
      collapseLocalStorageKey={
        localStorageItems.isPanelCollapsedPracticeSettingsAdvanced
      }
      heading="Advanced"
      id="practiceSettingsAdvanced"
    >
      <PracticeSettingsAdvancedActionBar
        onlyShowPinned={onlyShowPinned}
        setOnlyShowPinned={setOnlyShowPinned}
        setSearchValue={setSearchValue}
      />
      <PracticeSettingsAdvancedItemsContainer
        onlyShowPinned={onlyShowPinned}
        searchValue={searchValue}
      />
    </Panel>
  );
}
