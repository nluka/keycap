import React, { ReactNode, useEffect, useRef } from 'react';
import { removeAlert } from '../../../redux/actions/alertActions';
import { useAppDispatch } from '../../../redux/hooks';
import type AlertId from '../../../redux/types/AlertId';
import { SPACE } from '../../../utility/constants';
import type BootstrapTheme from '../../../utility/types/BootstrapTheme';
import BootstrapButton from '../Button/BootstrapButton';
import './BootstrapAlert.css';

interface IProps {
  autoDismissAfter?: number;
  children: ReactNode;
  hasMaxWidth?: boolean;
  id: AlertId;
  isDismissable?: boolean;
  onDismiss?: () => void;
  theme: BootstrapTheme;
}

export default function BootstrapAlert(props: IProps) {
  const dismissTimeout = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.autoDismissAfter !== undefined) {
      dismissTimeout.current = setTimeout(() => {
        dismiss();
      }, props.autoDismissAfter);
    }
  });

  // Cleanup
  useEffect(
    () => () => clearTimeout(dismissTimeout.current as NodeJS.Timeout),
    [],
  );

  function dismiss() {
    removeAlert(dispatch, props.id);
  }

  function getClasses() {
    const classes = [
      `alert alert-${props.theme} d-flex align-items-center gap-3 p-3 m-0 show fade`,
    ];
    if (props.isDismissable !== false) {
      classes.push('alert-dismissible');
    }
    if (props.hasMaxWidth) {
      classes.push('w-100');
    }
    return classes.join(SPACE);
  }

  return (
    <div className={getClasses()} role="alert">
      {props.children}
      {props.isDismissable !== false && (
        <BootstrapButton
          type="button"
          classes="btn-close position-static p-0"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => {
            dismiss();
            props.onDismiss && props.onDismiss();
          }}
        />
      )}
    </div>
  );
}
