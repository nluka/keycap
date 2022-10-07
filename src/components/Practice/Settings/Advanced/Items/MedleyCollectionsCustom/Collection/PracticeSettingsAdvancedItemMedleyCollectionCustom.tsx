import React, { useRef, useState } from 'react';
import type { Dispatch } from 'redux';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/settingsActions';
import store from '../../../../../../../redux/store';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../../../../../../resources/medley_collections/default-collections';
import { SPACE } from '../../../../../../../utility/constants';
import createDeepCopy from '../../../../../../../utility/functions/createDeepCopy';
import displayAlert from '../../../../../../../utility/functions/displayAlert';
import type { IPracticeMedleyCollection } from '../../../../../../../utility/types/practice';
import BootstrapButton from '../../../../../../Bootstrap/Button/BootstrapButton';
import './PracticeSettingsAdvancedItemMedleyCollectionCustom.css';

const MAX_LENGTH_NAME = 32;
const MAX_LENGTH_WORDS_BUFFER = 1000;

export default function PracticeSettingsAdvancedItemMedleyCollectionCustom(
  props: IPracticeMedleyCollection,
) {
  const [name, setName] = useState(props.name);
  const [words, setWords] = useState(props.words.join(SPACE));
  const medleyCollectionsActive = useAppSelector(
    (state) => state.practice.settings.current.medleyCollectionsActive,
  );
  const medleyCollectionsCustom = useAppSelector(
    (state) => state.practice.settings.current.medleyCollectionsCustom,
  );
  const prevWords = useRef(words);
  const nameLength = useRef(name.length);
  const wordsBufferLen = useRef(words.length);
  const dispatch = useAppDispatch();

  return (
    <div className="medley-collection-custom d-flex flex-column gap-2 ps-2 border-primary">
      <div className="d-flex gap-2">
        <input
          className="name px-2 rounded"
          type="text"
          value={name}
          placeholder={`Name (1-${MAX_LENGTH_NAME} letters/numbers/dashes)`}
          onChange={(event) =>
            handleChange(
              ChangeTarget.Name,
              event.target.value,
              MAX_LENGTH_NAME,
              nameLength,
              setName,
              { forceLowerCase: true },
            )
          }
          onBlur={(event) =>
            handleCollectionNameInputBlur(
              event.target.value,
              props,
              medleyCollectionsActive,
              medleyCollectionsCustom,
              setName,
              dispatch,
            )
          }
        />
        <BootstrapButton
          classes="delete px-2 py-1"
          isOutline={true}
          onClick={() => {
            handleCollectionDeleteButtonClick(
              props.name,
              medleyCollectionsCustom,
              store.getState().practice.settings.current
                .medleyCollectionsActive,
              dispatch,
            );
          }}
          theme="danger"
          title="Click to delete this custom medley collection"
        >
          <i className="bi bi-trash-fill"></i>
        </BootstrapButton>
      </div>
      <textarea
        className="items p-2 rounded w-100"
        onBlur={(event) =>
          handleCollectionWordsInputBlur(
            event.target.value,
            prevWords,
            props,
            medleyCollectionsCustom,
            dispatch,
          )
        }
        onChange={(event) => {
          handleChange(
            ChangeTarget.Words,
            event.target.value,
            MAX_LENGTH_WORDS_BUFFER,
            wordsBufferLen,
            setWords,
            { forceLowerCase: false },
          );
        }}
        placeholder="Items (letters/numbers/symbols separated by spaces)"
        spellCheck="false"
        value={words}
      />
      <div className="small text-low">{`${wordsBufferLen.current}/${MAX_LENGTH_WORDS_BUFFER} characters`}</div>
    </div>
  );
}

enum ChangeTarget {
  Name,
  Words,
}

function handleChange(
  target: ChangeTarget,
  eventTargetValue: string,
  maxLength: number,
  length: React.MutableRefObject<number>,
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

  length.current = trimmed.length;
}

function handleCollectionNameInputBlur(
  newNameCandidate: string,
  collectionToUpdate: IPracticeMedleyCollection,
  currentActiveCollections: string[],
  currentCustomCollections: IPracticeMedleyCollection[],
  setName: React.Dispatch<React.SetStateAction<string>>,
  dispatch: Dispatch,
) {
  const currentName = collectionToUpdate.name;
  if (currentName === newNameCandidate) {
    return;
  }
  if (newNameCandidate.length === 0) {
    setName(currentName);
    return;
  }
  if (
    BUILT_IN_MEDLEY_COLLECTIONS.find(
      (collection) => collection.name === newNameCandidate,
    )
  ) {
    setName(currentName);
    displayAlert(
      'Failed to update custom medley collection name.\nReason: name is reserved for a built-in collection.',
    );
    return {
      decidedName: currentName,
      reason: 'name is reserved for a built-in collection',
    };
  }
  if (
    currentCustomCollections.find(
      (collection) => collection.name === newNameCandidate,
    )
  ) {
    setName(currentName);
    displayAlert(
      'Failed to update custom medley collection name.\nReason: a custom collection with the same name already exists.',
    );
    return;
  }

  updateCustomCollectionsToReflectCollectionNameChange(
    collectionToUpdate.name,
    newNameCandidate,
    currentCustomCollections,
    dispatch,
  );

  updateActiveCollectionsToReflectCollectionNameChange(
    currentName,
    newNameCandidate,
    currentActiveCollections,
    dispatch,
  );
}

function updateCustomCollectionsToReflectCollectionNameChange(
  prevName: string,
  newName: string,
  currentCustomCollections: IPracticeMedleyCollection[],
  dispatch: Dispatch<any>,
) {
  const updatedCustomCollections = createDeepCopy(
    currentCustomCollections,
  ) as IPracticeMedleyCollection[];

  const collectionToUpdate = updatedCustomCollections.find(
    (collection) => collection.name === prevName,
  );
  if (collectionToUpdate === undefined) {
    console.warn('Unable to update custom medley collections: not found');
    return;
  }

  collectionToUpdate.name = newName;

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      name: 'medleyCollectionsCustom',
      value: updatedCustomCollections,
    }),
  );
}

function updateActiveCollectionsToReflectCollectionNameChange(
  currentName: string,
  newName: string,
  currentActiveCollections: string[],
  dispatch: Dispatch<any>,
) {
  // Filter outdated name
  const updatedActiveCollections = currentActiveCollections.filter(
    (collName) => collName !== currentName,
  );

  updatedActiveCollections.push(newName);

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      name: 'medleyCollectionsActive',
      value: updatedActiveCollections,
    }),
  );
}

function handleCollectionDeleteButtonClick(
  name: string,
  currentCustomCollections: IPracticeMedleyCollection[],
  currentActiveCollections: string[],
  dispatch: Dispatch<any>,
) {
  const updatedCustomCollections = currentCustomCollections.filter(
    (collection) => collection.name !== name,
  );
  const updatedActiveCollections = currentActiveCollections.filter(
    (activeCollName) => activeCollName !== name,
  );

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      name: 'medleyCollectionsCustom',
      value: updatedCustomCollections,
    }),
  );
  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      name: 'medleyCollectionsActive',
      value: updatedActiveCollections,
    }),
  );
}

function handleCollectionWordsInputBlur(
  eventTargetValue: string,
  prevWords: React.MutableRefObject<string>,
  collectionToUpdate: IPracticeMedleyCollection,
  currentCollections: IPracticeMedleyCollection[],
  dispatch: Dispatch<any>,
) {
  const isNewValueSameAsCurrent = eventTargetValue === prevWords.current;
  prevWords.current = eventTargetValue;

  if (isNewValueSameAsCurrent) {
    return;
  }

  const collectionToUpdateIndex = currentCollections.findIndex(
    (collection) => collection.name === collectionToUpdate.name,
  );
  if (collectionToUpdateIndex === null) {
    console.warn('Unable to delete custom medley collection: not found');
    return;
  }

  const valueTrimmed = eventTargetValue.trim();
  let newWords: string[];
  if (valueTrimmed.length === 0) {
    newWords = [];
  } else {
    newWords = valueTrimmed.split(/ +/);
  }

  const updatedCollections = createDeepCopy(
    currentCollections,
  ) as IPracticeMedleyCollection[];

  updatedCollections[collectionToUpdateIndex] = {
    name: collectionToUpdate.name,
    words: newWords,
  };

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      name: 'medleyCollectionsCustom',
      value: updatedCollections,
    }),
  );
}
