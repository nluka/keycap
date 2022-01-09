import React from 'react';
import capitalizeFirstChar from '../../../utility/functions/capitalizeFirstChar';
import './FormField.css';

interface IProps {
  autoCapitalize?: boolean;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  feedback?: string;
  inputElementId: string;
  isRequired?: boolean;
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  showLabel?: boolean;
  spellCheck?: boolean;
  type: string;
  value: string | number | readonly string[];
}

export default function FormField(props: IProps) {
  const isFeedbackVisible =
    props.feedback !== undefined && props.feedback.length > 0;

  return (
    <div className="form-field d-flex flex-column gap-1">
      {props.showLabel && (
        <label
          aria-required={props.isRequired}
          className="form-label text-norm m-0"
          htmlFor={props.inputElementId}
        >
          {props.name}
        </label>
      )}
      <input
        autoCapitalize={
          props.autoCapitalize !== undefined
            ? `${props.autoCapitalize}`
            : 'true'
        }
        autoComplete={
          props.autoComplete !== undefined ? `${props.autoComplete}` : 'true'
        }
        autoCorrect={
          props.autoCorrect !== undefined ? `${props.autoCorrect}` : 'true'
        }
        autoFocus={props.autoFocus}
        className="p-2 py-1 rounded"
        id={props.inputElementId}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.isRequired}
        spellCheck={
          props.spellCheck !== undefined ? `${props.spellCheck}` : 'true'
        }
        type={props.type}
        value={props.value}
      />
      {isFeedbackVisible && (
        <div className="invalid-feedback m-0">
          {capitalizeFirstChar(props.feedback as string)}
        </div>
      )}
    </div>
  );
}
