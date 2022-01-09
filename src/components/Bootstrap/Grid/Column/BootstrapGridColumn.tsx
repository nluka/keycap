import React, { ReactNode } from 'react';
import { SPACE } from '../../../../utility/constants';

interface IProps {
  breakpoints?: string[];
  children: ReactNode;
  classes?: string;
}

export default function BootstrapGridColumn(props: IProps) {
  function getClasses() {
    const classes = ['col'];
    props.breakpoints?.forEach((bp) => {
      classes.push(`col-${bp}`);
    });
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  return <div className={getClasses()}>{props.children}</div>;
}
