import React from 'react';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../redux/settingsActions';
import BootstrapButton from '../../../../../Bootstrap/Button/BootstrapButton';
import PracticeSettingsAdvancedItem from '../PracticeSettingsAdvancedItem';
import './PracticeSettingsAdvancedItemCustomTextsContainer.css';
import PracticeSettingsAdvancedItemCustomText from './Text/PracticeSettingsAdvancedItemCustomText';

export default function PracticeSettingsAdvancedItemCustomTextsContainer() {
  const customTexts = useAppSelector(
    (state) => state.practice.settings.current.customTexts,
  );

  return (
    <PracticeSettingsAdvancedItem
      classes="d-flex flex-column gap-2 w-100"
      name="customTexts"
      title="Custom Texts"
    >
      {customTexts.length < 3 && <AddTextButton />}
      {customTexts.length > 0 && (
        <div className="d-flex flex-column gap-3 mb-1">
          {customTexts.map((text) => (
            <PracticeSettingsAdvancedItemCustomText
              content={text.content}
              key={v4()}
              name={text.name}
            />
          ))}
        </div>
      )}
    </PracticeSettingsAdvancedItem>
  );
}

function AddTextButton() {
  const customTexts = useAppSelector(
    (state) => state.practice.settings.current.customTexts,
  );
  const dispatch = useAppDispatch();

  function getStartingName() {
    let candidateNum = 1;
    while (doesTextExist(`custom-text-${candidateNum}`)) {
      ++candidateNum;
    }
    return `custom-text-${candidateNum}`;
  }

  function doesTextExist(name: string) {
    return customTexts.some((text) => text.name === name);
  }

  return (
    <BootstrapButton
      classes="add-custom-text d-flex align-items-center gap-2 mb-1"
      onClick={() => {
        if (customTexts.length >= 3) {
          return;
        }
        dispatch(
          actionCreatorPracticeSettingsCurrentConfigUpdate({
            name: 'customTexts',
            value: [
              ...customTexts,
              {
                name: getStartingName(),
                content: '',
              },
            ],
          }),
        );
      }}
      theme="primary"
    >
      <i className="bi bi-plus-lg"></i>
      <span>Add Text</span>
    </BootstrapButton>
  );
}
