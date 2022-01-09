import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  classes?: string;
  containerClasses?: string;
  heading?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: IProps) {
  return (
    <div className={props.containerClasses}>
      {props.heading && (
        <>
          <h2 className="text-norm m-0">{props.heading}</h2>
          <hr className="text-low m-0" />
        </>
      )}
      <form
        className={props.classes}
        onSubmit={(event) => {
          props.onSubmit(event);
        }}
      >
        {props.children}
      </form>
    </div>
  );
}
