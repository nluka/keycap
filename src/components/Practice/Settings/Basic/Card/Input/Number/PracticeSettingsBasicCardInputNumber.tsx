import type NumberRange from 'nluka-number-range';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/settings';
import type { PracticeSettingName } from '../../../../../../../utility/types/practice';

interface IProps {
  limits: NumberRange;
  name: PracticeSettingName;
  step: number;
  value: number;
}

export default function PracticeSettingsBasicCardInputNumber(props: IProps) {
  const [value, setValue] = useState<string>(props.value.toString());
  const dispatch = useAppDispatch();

  function handleBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
    if (event.target.value.length === 0) {
      setValue(props.value.toString());
      return;
    }

    const normalizedVal = normalizeValue(parseFloat(event.target.value));
    setValue(normalizedVal.toString());

    if (normalizedVal === props.value) {
      return;
    }

    dispatch(
      actionCreatorPracticeSettingsCurrentConfigUpdate({
        name: props.name,
        value: normalizedVal,
      }),
    );
  }

  function normalizeValue(value: number) {
    const limits = props.limits,
      min = limits.getMin(),
      max = limits.getMax();

    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }

  useEffect(() => setValue(props.value.toString()), [props.value]);

  return (
    <input
      className="px-2 rounded"
      id={props.name + 'Input'}
      max={props.limits.getMax()}
      min={props.limits.getMin()}
      onBlur={handleBlur}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      step={props.step}
      type="number"
      value={value}
    />
  );
}
