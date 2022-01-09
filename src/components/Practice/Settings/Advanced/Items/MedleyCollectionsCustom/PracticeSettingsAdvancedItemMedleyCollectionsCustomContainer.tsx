import type { IPracticeMedleyCollection } from 'keycap-foundation';
import React from 'react';
import { v4 } from 'uuid';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../../../../../resources/medley_collections/default-collections';
import BootstrapButton from '../../../../../Bootstrap/Button/BootstrapButton';
import PracticeSettingsAdvancedItem from '../PracticeSettingsAdvancedItem';
import PracticeSettingsAdvancedItemMedleyCollectionCustom from './Collection/PracticeSettingsAdvancedItemMedleyCollectionCustom';
import './PracticeSettingsAdvancedItemMedleyCollectionsCustomContainer.css';

export default function PracticeSettingsAdvancedItemMedleyCollectionsCustomContainer() {
  const medleyCollectionsCustom = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.advanced.config
        .medleyCollectionsCustom,
  );

  return (
    <PracticeSettingsAdvancedItem
      classes="d-flex flex-column gap-2 w-100"
      name="medleyCollectionsCustom"
      title="Medley Collections"
    >
      <h4 className="m-0">Built-in:</h4>
      <small className="text-norm d-flex flex-row flex-wrap gap-1">
        <span className="d-flex flex-wrap gap-1">
          {BUILT_IN_MEDLEY_COLLECTIONS.map((collection) => (
            <BuiltInCollection key={v4()} name={collection.name} />
          ))}
        </span>
      </small>

      <h4 className="m-0 mt-1">Custom:</h4>
      {medleyCollectionsCustom.length < 3 && <AddCollectionButton />}
      {medleyCollectionsCustom.length > 0 && (
        <div className="text-norm d-flex flex-column gap-3 mb-2">
          {medleyCollectionsCustom.map((collection) => (
            <PracticeSettingsAdvancedItemMedleyCollectionCustom
              items={collection.items}
              key={v4()}
              name={collection.name}
            />
          ))}
        </div>
      )}
    </PracticeSettingsAdvancedItem>
  );
}

interface IPropsBuiltInCollection {
  name: string;
}
function BuiltInCollection(props: IPropsBuiltInCollection) {
  return <span className="built-in-collection px-1 rounded">{props.name}</span>;
}

function AddCollectionButton() {
  const medleyCollectionsCustom = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.advanced.config
        .medleyCollectionsCustom,
  );
  const dispatch = useAppDispatch();

  return (
    <BootstrapButton
      classes="add-custom-collection d-flex align-items-center gap-2 mb-1"
      onClick={() => {
        if (medleyCollectionsCustom.length < 3) {
          dispatch(
            actionCreatorPracticeSettingsCurrentConfigUpdate({
              category: 'advanced',
              name: 'medleyCollectionsCustom',
              value: [
                ...medleyCollectionsCustom,
                {
                  name: getInitialCollectionName(medleyCollectionsCustom),
                  items: [],
                },
              ],
            }),
          );
        }
      }}
      theme="primary"
    >
      <i className="bi bi-plus-lg"></i>
      <span>Add Collection</span>
    </BootstrapButton>
  );
}

function getInitialCollectionName(
  currentCustomCollections: IPracticeMedleyCollection[],
) {
  let candidateNum = 1;
  while (
    doesCollectionExist(
      `custom-collection-${candidateNum}`,
      currentCustomCollections,
    )
  ) {
    ++candidateNum;
  }
  return `custom-collection-${candidateNum}`;
}

function doesCollectionExist(
  name: string,
  customCollections: IPracticeMedleyCollection[],
) {
  return customCollections.some((collection) => collection.name === name);
}
