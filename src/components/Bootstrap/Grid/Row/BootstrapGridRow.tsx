import React, { ReactNode } from 'react';
import { SPACE } from '../../../../utility/constants';

interface IProps {
  children: ReactNode;
  classes?: string;
}

export default function BootstrapGridRow(props: IProps) {
  function getClasses() {
    const classes = ['row'];
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  return <div className={getClasses()}>{props.children}</div>;
}
