import { createDeepCopy, IPracticeSettings } from 'keycap-foundation';
import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import localStorageItems from '../../../../local-storage';
import {
  actionCreatorPracticeSettingsProfileLoad,
  actionCreatorPracticeSettingsProfileSave,
  actionCreatorPracticeSettingsReplace,
} from '../../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import store from '../../../../redux/store';
import displayAlert from '../../../../utility/functions/displayAlert';
import BootstrapButton from '../../../Bootstrap/Button/BootstrapButton';
import BootstrapCard from '../../../Bootstrap/Card/BootstrapCard';
import Panel from '../../../Panel/Panel';
import './PracticeSettingsProfiles.css';

const MAX_NAME_LENGTH = 16;

export default function PracticeSettingsProfiles() {
  const profiles = useAppSelector((state) => state.practice.settings.profiles);

  return (
    <Panel
      collapseLocalStorageKey={
        localStorageItems.isPanelCollapsedPracticeSettingsProfiles
      }
      heading="Profiles"
      id="practiceSettingsProfiles"
    >
      {profiles.length < 5 && <AddProfileButton />}
      {profiles.length > 0 && (
        <div className="profiles-container d-flex gap-2 pb-2">
          {profiles.map((profile) => (
            <Profile key={v4()} name={profile.name} />
          ))}
        </div>
      )}
    </Panel>
  );
}

interface IProfileProps {
  name: string;
}
function Profile(props: IProfileProps) {
  const [name, setName] = useState(props.name);
  const profiles = useAppSelector((state) => state.practice.settings.profiles);
  const prevName = useRef(name);
  const nameLength = useRef(name.length);
  const dispatch = useAppDispatch();

  function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9-]/g, '');
    const trimmed =
      newValue.length > MAX_NAME_LENGTH
        ? newValue.slice(0, MAX_NAME_LENGTH)
        : newValue;
    setName(trimmed.toLowerCase());
    nameLength.current = trimmed.length;
  }

  function handleTextNameInputBlur(event: React.ChangeEvent<HTMLInputElement>) {
    const newNameCandidate = event.target.value;
    if (newNameCandidate === prevName.current) {
      return;
    }
    if (newNameCandidate.length === 0) {
      setName(prevName.current);
      return;
    }
    if (
      profiles.findIndex((profile) => profile.name === newNameCandidate) !== -1
    ) {
      setName(prevName.current);
      displayAlert(
        'Failed to update profile name.\nReason: profile with the same name already exists.',
      );
      return;
    }

    const updatedSettings = createDeepCopy(
      store.getState().practice.settings,
    ) as IPracticeSettings;

    const profileToUpdate = updatedSettings.profiles.find(
      (collection) => collection.name === prevName.current,
    );

    if (profileToUpdate === undefined) {
      console.warn('Unable to update profiles: not found');
      return;
    }

    profileToUpdate.name = newNameCandidate;
    dispatch(
      actionCreatorPracticeSettingsReplace({ settings: updatedSettings }),
    );
    prevName.current = newNameCandidate;
  }

  function handleDelete() {
    const choice = confirm(
      `Are you sure you want to delete '${name}'?\nThis action is irreversible.`,
    );
    if (!choice) {
      return;
    }

    const updatedSettings = createDeepCopy(
      store.getState().practice.settings,
    ) as IPracticeSettings;
    updatedSettings.profiles = updatedSettings.profiles.filter(
      (profile) => profile.name !== name,
    );
    dispatch(
      actionCreatorPracticeSettingsReplace({ settings: updatedSettings }),
    );
  }

  return (
    <BootstrapCard bodyClasses="profile" elevation={2}>
      <input
        className="name px-2 py-1 rounded"
        type="text"
        value={name}
        placeholder={`Name (1-${MAX_NAME_LENGTH} letters/numbers/dashes)`}
        onChange={handleNameInputChange}
        onBlur={handleTextNameInputBlur}
      />
      <div className="d-flex gap-2">
        <BootstrapButton
          classes="px-2 py-1"
          isOutline={true}
          onClick={() => {
            const choice = confirm(
              `Are you sure you want to override your current settings with '${name}'?`,
            );
            if (!choice) {
              return;
            }
            dispatch(
              actionCreatorPracticeSettingsProfileLoad({ profileName: name }),
            );
          }}
          theme="secondary"
          title={`Click to load settings from '${name}'`}
        >
          Load
        </BootstrapButton>
        <BootstrapButton
          classes="px-2 py-1"
          isOutline={true}
          onClick={() => {
            const choice = confirm(
              `Are you sure you want to override '${name}' with your current settings?`,
            );
            if (!choice) {
              return;
            }
            dispatch(
              actionCreatorPracticeSettingsProfileSave({ profileName: name }),
            );
          }}
          theme="secondary"
          title={`Click to save your current settings into '${name}'`}
        >
          Save
        </BootstrapButton>
        <BootstrapButton
          classes="delete px-2 py-1"
          isOutline={true}
          onClick={handleDelete}
          theme="danger"
          title="Click to delete this profile"
        >
          <i className="bi bi-trash-fill"></i>
        </BootstrapButton>
      </div>
    </BootstrapCard>
  );
}

function AddProfileButton() {
  const profiles = useAppSelector((state) => state.practice.settings.profiles);
  const dispatch = useAppDispatch();

  function getStartingName() {
    let candidateNum = 1;
    while (doesProfileExist(`profile-${candidateNum}`)) {
      ++candidateNum;
    }
    return `profile-${candidateNum}`;
  }

  function doesProfileExist(name: string) {
    return profiles.some((profile) => profile.name === name);
  }

  return (
    <BootstrapButton
      classes="add-profile d-flex align-items-center gap-2 mb-1"
      onClick={() => {
        if (profiles.length >= 5) {
          return;
        }

        const currentSettings = store.getState().practice.settings;

        const updatedSettings = createDeepCopy(
          currentSettings,
        ) as IPracticeSettings;

        updatedSettings.profiles.push({
          name: getStartingName(),
          config: currentSettings.currentConfig,
        });
        dispatch(
          actionCreatorPracticeSettingsReplace({ settings: updatedSettings }),
        );
      }}
      theme="primary"
    >
      <i className="bi bi-plus-lg"></i>
      <span>Add Profile</span>
    </BootstrapButton>
  );
}
