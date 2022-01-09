import React, { ReactNode } from 'react';
import { SPACE } from '../../../utility/constants';
import type BootstrapTheme from '../../../utility/types/BootstrapTheme';

interface IProps {
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  autoFocus?: boolean;
  children?: ReactNode;
  classes?: string;
  dataBsDismiss?: string;
  dataBsTarget?: string;
  dataBsToggle?: string;
  elementRef?: React.RefObject<HTMLButtonElement>;
  id?: string;
  isDisabled?: boolean;
  isOutline?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'sm' | 'lg';
  theme?: BootstrapTheme;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function BootstrapButton(props: IProps) {
  function getClasses() {
    const classes = ['btn'];
    if (props.theme !== undefined) {
      classes.push(`btn${props.isOutline ? '-outline' : ''}-${props.theme}`);
    }
    if (props.size !== undefined) {
      classes.push(`btn-${props.size}`);
    }
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  return (
    <button
      id={props.id}
      className={getClasses()}
      onClick={props.onClick}
      type={props.type}
      title={props.title}
      autoFocus={props.autoFocus}
      disabled={props.isDisabled}
      ref={props.elementRef}
      aria-label={props.ariaLabel}
      aria-controls={props.ariaControls}
      aria-expanded={props.ariaExpanded}
      data-bs-dismiss={props.dataBsDismiss}
      data-bs-toggle={props.dataBsToggle}
      data-bs-target={props.dataBsTarget}
      role="button"
    >
      {props.children}
    </button>
  );
}
