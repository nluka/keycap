import { createDeepCopy, IPracticeMedleyCollection } from 'keycap-foundation';
import React, { useRef, useState } from 'react';
import type { Dispatch } from 'redux';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/actions/practice/practiceActionsSettings';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/hooks';
import store from '../../../../../../../redux/store';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../../../../../../resources/medley_collections/default-collections';
import { SPACE } from '../../../../../../../utility/constants';
import displayAlert from '../../../../../../../utility/functions/displayAlert';
import BootstrapButton from '../../../../../../Bootstrap/Button/BootstrapButton';
import './PracticeSettingsAdvancedItemMedleyCollectionCustom.css';

const MAX_LENGTH_NAME = 32;
const MAX_LENGTH_ITEMS = 1000;

export default function PracticeSettingsAdvancedItemMedleyCollectionCustom(
  props: IPracticeMedleyCollection,
) {
  const [name, setName] = useState(props.name);
  const [items, setItems] = useState(props.items.join(SPACE));
  const medleyCollectionsActive = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config
        .medleyCollectionsActive,
  );
  const medleyCollectionsCustom = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.advanced.config
        .medleyCollectionsCustom,
  );
  const prevItems = useRef(items);
  const nameLength = useRef(name.length);
  const itemCount = useRef(items.length);
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
              store.getState().practice.settings.currentConfig.basic.config
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
          handleCollectionItemsInputBlur(
            event.target.value,
            prevItems,
            props,
            medleyCollectionsCustom,
            dispatch,
          )
        }
        onChange={(event) => {
          handleChange(
            ChangeTarget.Items,
            event.target.value,
            MAX_LENGTH_ITEMS,
            itemCount,
            setItems,
            { forceLowerCase: false },
          );
        }}
        placeholder="Items (letters/numbers/symbols separated by spaces)"
        spellCheck="false"
        value={items}
      />
      <div className="small text-low">{`${itemCount.current}/${MAX_LENGTH_ITEMS} characters`}</div>
    </div>
  );
}

enum ChangeTarget {
  Name,
  Items,
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
      category: 'advanced',
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
      category: 'basic',
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
      category: 'advanced',
      name: 'medleyCollectionsCustom',
      value: updatedCustomCollections,
    }),
  );
  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      category: 'basic',
      name: 'medleyCollectionsActive',
      value: updatedActiveCollections,
    }),
  );
}

function handleCollectionItemsInputBlur(
  eventTargetValue: string,
  prevItems: React.MutableRefObject<string>,
  collectionToUpdate: IPracticeMedleyCollection,
  currentCollections: IPracticeMedleyCollection[],
  dispatch: Dispatch<any>,
) {
  const isNewValueSameAsCurrent = eventTargetValue === prevItems.current;
  prevItems.current = eventTargetValue;

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
  let newItems: string[];
  if (valueTrimmed.length === 0) {
    newItems = [];
  } else {
    newItems = valueTrimmed.split(/ +/);
  }

  const updatedCollections = createDeepCopy(
    currentCollections,
  ) as IPracticeMedleyCollection[];

  updatedCollections[collectionToUpdateIndex] = {
    name: collectionToUpdate.name,
    items: newItems,
  };

  dispatch(
    actionCreatorPracticeSettingsCurrentConfigUpdate({
      category: 'advanced',
      name: 'medleyCollectionsCustom',
      value: updatedCollections,
    }),
  );
}
