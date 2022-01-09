import React, { ReactNode, useEffect, useState } from 'react';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import './FormSubmitButton.css';

interface IProps {
  children: ReactNode;
  classes?: string;
  isAwaitingResponse: boolean;
  isDisabled?: boolean;
}

export default function FormSubmitButton(props: IProps) {
  const [content, setContent] = useState<ReactNode>(props.children);

  useEffect(() => {
    if (props.isAwaitingResponse) {
      setContent(
        <div className="d-flex align-items-center gap-2">
          <span>Working</span>
          <span
            aria-hidden="true"
            className="spinner-border spinner-border-sm"
            role="status"
          ></span>
        </div>,
      );
    } else {
      setContent(props.children);
    }
  }, [props.isAwaitingResponse, setContent]);

  return (
    <BootstrapButton
      classes={`d-flex justify-content-center align-items-center ${props.classes}`}
      isDisabled={props.isDisabled || props.isAwaitingResponse}
      theme="primary"
      type="submit"
    >
      {content}
    </BootstrapButton>
  );
}
