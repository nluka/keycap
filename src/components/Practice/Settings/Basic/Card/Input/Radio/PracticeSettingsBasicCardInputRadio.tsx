import React from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/settingsActions';
import convertWordArrayToCamelCaseString from '../../../../../../../utility/functions/convertWordArrayToCamelCaseString';
import type { PracticeSettingName } from '../../../../../../../utility/types/practice';
import './PracticeSettingsBasicCardInputRadio.css';

interface IProps {
  name: PracticeSettingName;
  noOptionsMessage?: string;
  options: (string | boolean | number)[];
  value: string | boolean | number | null;
}

export default function PracticeSettingsBasicCardInputRadio(props: IProps) {
  return (
    <>
      {props.options.length === 0
        ? 'none defined'
        : props.options.map((option) => {
            return (
              <Option
                id={convertWordArrayToCamelCaseString([
                  props.name,
                  option.toString(),
                  'input',
                ])}
                isChecked={props.value === option}
                key={v4()}
                name={props.name}
                value={option}
              />
            );
          })}
    </>
  );
}

function Option({
  id,
  isChecked,
  name,
  value,
}: {
  id: string;
  isChecked: boolean;
  name: PracticeSettingName;
  value: string | boolean | number | null;
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="
        radio-option
        d-flex
        justify-content-center
        align-items-center
        px-3 py-2 rounded
        position-relative
      "
    >
      <input
        checked={isChecked}
        className="rounded w-100 h-100 position-absolute"
        id={id}
        name={name}
        onClick={() => {
          dispatch(
            actionCreatorPracticeSettingsCurrentConfigUpdate({
              name,
              value,
            }),
          );
        }}
        readOnly
        type="radio"
      />
      <label className="text-norm" htmlFor={id}>
        {value}
      </label>
    </div>
  );
}
