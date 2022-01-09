import type { PracticeSettingName } from 'keycap-foundation';
import React, { useRef } from 'react';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import './PracticeSettingsBasicCardInputBoolean.css';

interface IProps {
  name: PracticeSettingName;
  value: boolean;
}

export default function PracticeSettingsBasicCardInputBoolean(props: IProps) {
  const id = useRef(props.name + 'Checkbox');
  const dispatch = useAppDispatch();

  return (
    <div className="boolean-input d-flex justify-content-center align-items-center gap-2 p-2 rounded position-relative">
      <label className="text-norm" htmlFor={id.current}>
        {props.value === true ? 'on' : 'off'}
      </label>
      <input
        checked={props.value}
        className="position-absolute w-100 h-100 rounded"
        id={id.current}
        onChange={() =>
          dispatch(
            actionCreatorPracticeSettingsCurrentConfigUpdate({
              category: 'basic',
              name: props.name,
              value: !props.value,
            }),
          )
        }
        type="checkbox"
      />
    </div>
  );
}
