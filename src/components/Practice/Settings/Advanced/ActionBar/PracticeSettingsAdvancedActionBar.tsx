import React from 'react';
import localStorageItems from '../../../../../local-storage';
import BootstrapButton from '../../../../Bootstrap/Button/BootstrapButton';

interface IProps {
  onlyShowPinned: boolean;
  setOnlyShowPinned: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function PracticeSettingsAdvancedActionBar(props: IProps) {
  const { onlyShowPinned, setOnlyShowPinned, setSearchValue } = props;

  return (
    <div className="action-bar d-flex justify-content-between align-items-center gap-3 py-1">
      <div className="d-flex gap-2">
        <input
          className="px-2 py-1"
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search advanced"
          spellCheck="false"
          type="search"
        />

        <BootstrapButton
          isOutline={true}
          onClick={() => {
            const newBool = !onlyShowPinned;
            setOnlyShowPinned(newBool);
            localStorage.setItem(
              localStorageItems.onlyShowPinnedPracticeSettingsAdvanced,
              `${newBool}`,
            );
          }}
          size="sm"
          theme={onlyShowPinned ? 'warning' : 'secondary'}
          title={`Click to ${
            onlyShowPinned ? 'see all settings' : 'hide unpinned settings'
          }`}
        >
          {onlyShowPinned ? (
            <i className="bi bi-bookmark-star"></i>
          ) : (
            <i className="bi bi-view-list"></i>
          )}
        </BootstrapButton>
      </div>
    </div>
  );
}
