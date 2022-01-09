import React, { ReactNode, useState } from 'react';
import { SPACE } from '../../utility/constants';
import parseBool from '../../utility/functions/parseBool';
import './Panel.css';

interface IProps {
  children: ReactNode;
  classes?: string;
  contentGap?: 0 | 1 | 2 | 3 | 4 | 5;
  collapseLocalStorageKey: string;
  heading: string;
  id: string;
}

export default function Panel(props: IProps) {
  const [isContentCollapsed, setIsContentCollapsed] = useState(
    parseBool(localStorage.getItem(props.collapseLocalStorageKey)) || false,
  );

  localStorage.setItem(props.collapseLocalStorageKey, `${isContentCollapsed}`);

  function getClasses() {
    const classes = ['panel rounded text-norm'];
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  function getIconClass() {
    return `bi-chevron-${isContentCollapsed ? 'right' : 'down'}`;
  }

  function handleHeadingClick() {
    setIsContentCollapsed((prev) => !prev);
  }

  return (
    <div className={getClasses()} data-dim={isContentCollapsed} id={props.id}>
      <div className="heading d-flex align-items-center gap-2 p-3">
        <h3 className="m-0" onClick={handleHeadingClick}>
          {props.heading}
        </h3>
        <i
          className={`collapse-toggler bi ${getIconClass()}`}
          onClick={handleHeadingClick}
          title={`Click to ${isContentCollapsed ? 'expand' : 'collapse'}`}
        />
      </div>
      <div
        className={`content d-flex flex-column gap-${
          props.contentGap || 2
        } p-3 pt-0`}
        data-visible={!isContentCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
}
