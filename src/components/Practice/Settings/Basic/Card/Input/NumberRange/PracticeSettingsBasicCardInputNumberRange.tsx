import NumberRange from 'nluka-number-range';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigUpdate } from '../../../../../../../redux/settingsActions';
import type { PracticeSettingName } from '../../../../../../../utility/types/practice';
import normalizeMaxValue from './normalizeMaxValue';
import normalizeMinValue from './normalizeMinValue';
import './PracticeSettingsBasicCardInputNumberRange.css';

interface IProps {
  converter?: (nr: NumberRange) => any;
  limits: NumberRange;
  name: PracticeSettingName;
  step: number;
  value: NumberRange;
}

export default function PracticeSettingsBasicCardInputNumberRange(
  props: IProps,
) {
  const [minValue, setMinValue] = useState(props.value.getMin().toString());
  const [maxValue, setMaxValue] = useState(props.value.getMax().toString());
  const minInputId = useRef(props.name + 'Min');
  const maxInputId = useRef(props.name + 'Max');
  const dispatch = useAppDispatch();

  function updateValue(min: number, max: number) {
    if (min === props.value.getMin() && max === props.value.getMax()) {
      return;
    }

    const value =
      props.converter !== undefined
        ? props.converter(new NumberRange(min, max))
        : new NumberRange(min, max);

    dispatch(
      actionCreatorPracticeSettingsCurrentConfigUpdate({
        name: props.name,
        value,
      }),
    );
  }

  useEffect(() => {
    setMinValue(props.value.getMin().toString());
    setMaxValue(props.value.getMax().toString());
  }, [props.value]);

  return (
    <>
      <label
        className="number-range d-flex align-items-center text-norm"
        htmlFor={minInputId.current}
      >
        Min
      </label>
      <input
        className="px-2 rounded"
        id={minInputId.current}
        max={props.limits.getMax()}
        min={props.limits.getMin()}
        onBlur={(event) => {
          const rawMin =
            event.target.value.length > 0
              ? parseFloat(event.target.value)
              : props.value.getMin();
          const max = parseFloat(maxValue);

          const normalizedMin = normalizeMinValue(rawMin, max, props.limits);

          updateValue(normalizedMin, max);
          setMinValue(normalizedMin.toString());
        }}
        onChange={(event) => {
          setMinValue(event.target.value);
        }}
        step={props.step}
        type="number"
        value={minValue}
      />
      <label
        className="number-range d-flex align-items-center text-norm"
        htmlFor={maxInputId.current}
      >
        Max
      </label>
      <input
        className="px-2 rounded"
        id={maxInputId.current}
        max={props.limits.getMax()}
        min={props.limits.getMin()}
        onBlur={(event) => {
          const rawMax =
            event.target.value.length > 0
              ? parseFloat(event.target.value)
              : props.value.getMax();

          const min = parseFloat(minValue);

          const normalizedMax = normalizeMaxValue(rawMax, min, props.limits);

          updateValue(min, normalizedMax);
          setMaxValue(normalizedMax.toString());
        }}
        onChange={(event) => {
          setMaxValue(event.target.value);
        }}
        step={props.step}
        type="number"
        value={maxValue}
      />
    </>
  );
}
