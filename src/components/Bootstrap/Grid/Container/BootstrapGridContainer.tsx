import React, { ReactNode } from 'react';
import { SPACE } from '../../../../utility/constants';

interface IProps {
  breakpoints?: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[];
  children: ReactNode;
  classes?: string;
  isFluid?: boolean;
}

export default function BootstrapGridContainer(props: IProps) {
  if (props.isFluid && props.breakpoints?.length !== undefined) {
    throw new Error('container cannot be fluid and have breakpoints');
  }

  function getClasses() {
    const classes = [props.isFluid ? 'container-fluid' : 'container'];
    props.breakpoints?.forEach((bp) => {
      classes.push(bp);
    });
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  return <div className={getClasses()}>{props.children}</div>;
}
