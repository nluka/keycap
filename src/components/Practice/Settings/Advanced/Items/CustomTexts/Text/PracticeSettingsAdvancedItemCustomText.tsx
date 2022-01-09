import { createDeepCopy, IPracticeCustomText } from 'keycap-foundation';
import React, { useRef, useState } from 'react';
import type { Dispatch } from 'redux';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/actions/practice/practiceActionsSettings';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/hooks';
import store from '../../../../../../../redux/store';
import displayAlert from '../../../../../../../utility/functions/displayAlert';
import BootstrapButton from '../../../../../../Bootstrap/Button/BootstrapButton';
import './PracticeSettingsAdvancedItemCustomText.css';

const MAX_NAME_LENGTH = 32;
const MAX_CONTENT_LENGTH = 1000;

export default function PracticeSettingsAdvancedItemMedleyCollectionCustom(
  props: IPracticeCustomText,
) {
  const [name, setName] = useState(props.name);
  const [content, setContent] = useState(props.content);
  const customTextActive = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config.customTextActive,
  );
  const customTexts = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.advanced.config.customTexts,
  );
  const prevContent = useRef(content);
  const nameLength = useRef(name.length);
  const contentLength = useRef(content.length);
  const dispatch = useAppDispatch();

  return (
    <div className="custom-text d-flex flex-column gap-2 ps-2 border-primary">
      <div className="d-flex gap-2">
        <input
          className="name px-2 py-1 rounded"
          type="text"
          value={name}
          placeholder={`Name (1-${MAX_NAME_LENGTH} letters/numbers/dashes)`}
          onChange={(event) =>
            handleChange(
              ChangeTarget.Name,
              event.target.value,
              MAX_NAME_LENGTH,
              nameLength,
              setName,
              { forceLowerCase: true },
            )
          }
          onBlur={(event) =>
            handleTextNameInputBlur(
              event.target.value,
              props,
              customTextActive,
              customTexts,
              setName,
              dispatch,
            )
          }
        />
        <BootstrapButton
          classes="delete px-2 py-1"
          isOutline={true}
          onClick={() => {
            handleTextDeleteButtonClick(
              props.name,
              customTexts,
              store.getState().practice.settings.currentConfig.basic.config
                .customTextActive,
              dispatch,
            );
          }}
          theme="danger"
          title="Click to delete this custom text"
        >
          <i className="bi bi-trash-fill"></i>
        </BootstrapButton>
      </div>
      <textarea
        className="content p-2 rounded w-100"
        onBlur={(event) =>
          handleTextContentInputBlur(
            event.target.value,
            prevContent,
            props.name,
            customTexts,
            dispatch,
          )
        }
        onChange={(event) => {
          handleChange(
            ChangeTarget.Content,
            event.target.value,
            MAX_CONTENT_LENGTH,
            contentLength,
            setContent,
            { forceLowerCase: false },
          );
        }}
        placeholder="Content (letters/spaces/numbers/symbols)"
        spellCheck="false"
        value={content}
      />
      <div className="small text-low">{`${contentLength.current}/${MAX_CONTENT_LENGTH} characters`}</div>
    </div>
  );
}

enum ChangeTarget {
  Name,
  Content,
}

function handleChange(
  target: ChangeTarget,
  eventTargetValue: string,
  maxLength: number,
  lengthRef: React.MutableRefObject<number>,
  stateSetter: React.Dispatch<React.SetStateAction<string>>,
  options: {
    forceLowerCase: boolean;
  },
) {
  if (target === ChangeTarget.Name) {
    eventTargetValue = eventTargetValue.replace(/[^a-zA-Z0-9-]/g, '');
  }
  const trimmed =
    eventTargetValue.length > maxLength
      ? eventTargetValue.slice(0, maxLength)
      : eventTargetValue;
  stateSetter(options.forceLowerCase ? trimmed.toLowerCase() : trimmed);
  lengthRef.current = trimmed.length;
}

function handleTextNameInputBlur(
  newNameCandidate: string,
  textToUpdate: IPracticeCustomText,
  currentActiveText: string | null,
  currentCustomTexts: IPracticeCustomText[],
  setName: React.Dispatch<React.SetStateAction<string>>,
  dispatch: Dispatch<any>,
) {
  const currentName = textToUpdate.name;
  if (currentName === newNameCandidate) {
    return;
  }
  if (newNameCandidate.length === 0) {
    setName(currentName);
    return;
  }
  if (
    currentCustomTexts.findIndex((text) => text.name === newNameCandidate) !==
    -1
  ) {
    setName(currentName);
    displayAlert(
      'Failed to update custom text name.\nReason: custom text with the same name already exists.',
    );
    return;
  }

  updateCustomTextsToReflectTextNameChange(
    textToUpdate.name,
    newNameCandidate,
    currentCustomTexts,
    dispatch,
  );

  if (currentActiveText === currentName) {
    dispatch(
      actionCreatorPracticeSettingsCurrentConfigUpdate({
        category: 'basic',
        name: 'customTextActive',
        value: newNameCandidate,
      }),
    );
  }
}

function updateCustomTextsToReflectTextNameChange(
  prevName: string,
  newName: string,
  currentCustomTexts: IPracticeCustomText[],
  dispatch: Dispatch<any>,
) {
  const updatedCustomTexts = createDeepCopy(
    currentCustomTexts,
  ) as IPracticeCustomText[];

  const textToUpdate = updatedCustomTexts.find(
    (text) => text.name === prevName,
  );
  if (textToUpdate === undefined) {
    console.warn('Unable to update custom texts: not found');
    return;
  }

  textToUpdate.name = newName;

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      category: 'advanced',
      name: 'customTexts',
      value: updatedCustomTexts,
    }),
  );
}

function handleTextDeleteButtonClick(
  textToDeleteName: string,
  currentCustomTexts: IPracticeCustomText[],
  currentActiveText: string | null,
  dispatch: Dispatch<any>,
) {
  const updatedCustomTexts = currentCustomTexts.filter(
    (text) => text.name !== textToDeleteName,
  );

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      category: 'advanced',
      name: 'customTexts',
      value: updatedCustomTexts,
    }),
  );

  if (currentActiveText === textToDeleteName) {
    dispatch(
      actionCreatorPracticeSettingsCurrentConfigUpdate({
        category: 'basic',
        name: 'customTextActive',
        value: null,
      }),
    );
  }
}

function handleTextContentInputBlur(
  newContent: string,
  prevContentRef: React.MutableRefObject<string>,
  textToUpdateName: string,
  currentTexts: IPracticeCustomText[],
  dispatch: Dispatch<any>,
) {
  const isNewContentSameAsCurrent = newContent === prevContentRef.current;
  prevContentRef.current = newContent;

  if (isNewContentSameAsCurrent) {
    return;
  }

  const updatedTexts = createDeepCopy(currentTexts) as IPracticeCustomText[];

  const textToUpdate = updatedTexts.find(
    (text) => text.name === textToUpdateName,
  );
  if (textToUpdate === undefined) {
    console.warn('Unable to delete custom text: not found');
    return;
  }

  const newContentTrimmed = newContent.trim();
  textToUpdate.content = newContentTrimmed;

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      category: 'advanced',
      name: 'customTexts',
      value: updatedTexts,
    }),
  );
}
