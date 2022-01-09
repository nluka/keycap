import React, { ReactNode, useEffect } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

export default function Page(props: IProps) {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <main className="container-md my-4 my-md-5 p-0">{props.children}</main>
  );
}
