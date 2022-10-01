import React, { useState } from 'react';
import storage from '../../../../local-storage';
import Panel from '../../../Panel/Panel';
import PracticeSettingsAdvancedActionBar from './ActionBar/PracticeSettingsAdvancedActionBar';
import PracticeSettingsAdvancedItemsContainer from './Items/Container/PracticeSettingsAdvancedItemsContainer';

export default function PracticeSettingsAdvanced() {
  const [searchValue, setSearchValue] = useState('');
  const [onlyShowPinned, setOnlyShowPinned] = useState(
    storage.getBool(storage.items.onlyShowPinnedPracticeSettingsAdvanced) ||
      false,
  );

  return (
    <Panel
      classes="practice-settings"
      collapseLocalStorageKey={
        storage.items.isPanelCollapsedPracticeSettingsAdvanced
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
