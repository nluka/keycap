import React, { ReactNode } from 'react';
import BootstrapGridColumn from '../../Bootstrap/Grid/Column/BootstrapGridColumn';

interface IProps {
  classes?: string;
  children: ReactNode;
}

export default function PageHomeColumn(props: IProps) {
  return (
    <BootstrapGridColumn
      breakpoints={['12', 'md-10', 'lg-8']}
      classes={props.classes}
    >
      {props.children}
    </BootstrapGridColumn>
  );
}
