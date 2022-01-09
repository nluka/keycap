import React, { ReactNode } from 'react';
import './BootstrapTable.css';

interface IProps {
  children: ReactNode;
}

export default function BootstrapTable(props: IProps) {
  return <table className="table text-norm m-0">{props.children}</table>;
}
