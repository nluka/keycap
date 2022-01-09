import React, { CSSProperties, ReactNode } from 'react';
import { SPACE } from '../../../utility/constants';
import './BootstrapCard.css';

interface IProps {
  bodyClasses?: string;
  children: ReactNode;
  containerClasses?: string;
  elevation: 1 | 2 | 3 | 4 | 5 | null;
  subTitle?: ReactNode;
  title?: ReactNode;
}

export default function BootstrapCard(props: IProps) {
  function getContainerClasses() {
    const containerClasses = ['card'];
    if (props.containerClasses !== undefined) {
      containerClasses.push(props.containerClasses);
    }
    return containerClasses.join(SPACE);
  }

  function getBodyClasses() {
    const bodyClasses = ['card-body d-flex flex-column gap-2 rounded'];
    if (props.bodyClasses !== undefined) {
      bodyClasses.push(props.bodyClasses);
    }
    return bodyClasses.join(SPACE);
  }

  function getBodyStyle(): BootstrapCardCSS {
    const elevation = props.elevation;
    if (elevation === null) {
      return {};
    }
    return { '--bg-color': `var(--rgb-h${elevation}` };
  }

  return (
    <div className={getContainerClasses()}>
      <div
        className={getBodyClasses()}
        data-elevation={props.elevation}
        style={getBodyStyle()}
      >
        {props.title && <div className="card-title mb-1">{props.title}</div>}
        {props.subTitle && (
          <div className="card-subtitle">{props.subTitle}</div>
        )}
        {props.children}
      </div>
    </div>
  );
}

interface BootstrapCardCSS extends CSSProperties {
  '--bg-color'?: string;
}
