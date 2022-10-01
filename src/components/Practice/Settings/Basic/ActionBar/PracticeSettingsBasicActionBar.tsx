import React from 'react';
import storage from '../../../../../local-storage';
import BootstrapButton from '../../../../Bootstrap/Button/BootstrapButton';

interface IProps {
  onlyShowPinned: boolean;
  setOnlyShowPinned: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function PracticeSettingsBasicActionBar(props: IProps) {
  const { onlyShowPinned, setOnlyShowPinned, setSearchValue } = props;

  return (
    <div className="action-bar d-flex justify-content-between align-items-center gap-3 py-1">
      <div className="d-flex gap-2">
        <input
          className="px-2 py-1"
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search basic"
          spellCheck="false"
          type="search"
        />

        <BootstrapButton
          isOutline={true}
          onClick={() => {
            const newBool = !onlyShowPinned;
            setOnlyShowPinned(newBool);
            localStorage.setItem(
              storage.items.onlyShowPinnedPracticeSettingsBasic,
              `${newBool}`,
            );
          }}
          size="sm"
          theme={onlyShowPinned ? 'warning' : 'secondary'}
          title={`Click to ${
            onlyShowPinned ? 'see all settings' : 'hide unpinned settings'
          }`}
        >
          <i
            className={`bi bi-${
              onlyShowPinned ? 'bookmark-star' : 'view-list'
            }`}
          ></i>
        </BootstrapButton>
      </div>
    </div>
  );
}
