import React, { useEffect, useRef, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../../redux/settings';
import BUILT_IN_MEDLEY_COLLECTIONS from '../../../../../../../../resources/medley_collections/default-collections';
import PracticeSettingsBasicCard from '../../../PracticeSettingsBasicCard';
import getValidCollections from './getValidCollections';

export default function PracticeSettingsBasicCardMedleyCollectionsActive() {
  return (
    <PracticeSettingsBasicCard
      name="medleyCollectionsActive"
      title="Medley Collections"
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const medleyCollectionsActive = useAppSelector(
    (state) => state.practice.settings.current.medleyCollectionsActive,
  );
  const medleyCollectionsCustom = useAppSelector(
    (state) => state.practice.settings.current.medleyCollectionsCustom,
  );
  const [value, setValue] = useState(medleyCollectionsActive.join(', '));
  const previousValue = useRef(value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newValue = medleyCollectionsActive.join(', ');
    setValue(newValue);
    previousValue.current = newValue;
  }, [medleyCollectionsActive, setValue]);

  return (
    <textarea
      autoComplete="false"
      autoCapitalize="false"
      autoCorrect="false"
      className="p-2 rounded"
      cols={20}
      id="medleyCollectionsActiveInput"
      onBlur={(event) => {
        const newValue = event.target.value;
        if (newValue === previousValue.current) {
          return;
        }

        const validCollections = getValidCollections(newValue, [
          ...BUILT_IN_MEDLEY_COLLECTIONS.map((collection) => collection.name),
          ...medleyCollectionsCustom.map((collection) => collection.name),
        ]);
        dispatch(
          actionCreatorPracticeSettingsCurrentConfigUpdate({
            name: 'medleyCollectionsActive',
            value: validCollections,
          }),
        );
        previousValue.current = newValue;
      }}
      onChange={(event) => setValue(event.target.value.toLowerCase())}
      spellCheck="false"
      value={value}
    />
  );
}
