import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BootstrapGridColumn from '../Bootstrap/Grid/Column/BootstrapGridColumn';
import BootstrapGridContainer from '../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../Bootstrap/Grid/Row/BootstrapGridRow';
import Page from './Page';

export default function PageHome() {
  return (
    <Page title="keyCap | Home">
      <BootstrapGridContainer
        breakpoints={['md']}
        classes="d-flex flex-column gap-3 px-4"
      >
        <BootstrapGridRow classes="justify-content-center gap-4">
          <Column classes="d-flex flex-column gap-3">
            <h1 className="text-norm m-0">Faster typing awaits...</h1>
            <p className="text-norm m-0">
              keyCap is a website for practicing typing skills. It takes
              inspiration from popular platforms like{' '}
              <a
                href="https://play.typeracer.com/"
                rel="noreferrer"
                target="_blank"
              >
                TypeRacer
              </a>
              ,{' '}
              <a href="https://www.keybr.com/" rel="noreferrer" target="_blank">
                keybr
              </a>
              , and{' '}
              <a
                href="https://10fastfingers.com/"
                rel="noreferrer"
                target="_blank"
              >
                10fastfingers
              </a>{' '}
              whilst addressing their shortcomings.
            </p>
          </Column>
          <Column classes="d-flex flex-column gap-3 mb-1">
            <h3 className="text-norm m-0">keyCap offers:</h3>
            <ul className="list-group text-norm">
              <li className="list-group-item list-group-item-dark">
                A highly customizable{' '}
                <Link to="/practice">practice sandbox</Link> with mistake
                analysis, enabling efficient and focused practice
              </li>
              <li className="list-group-item list-group-item-dark">
                A <Link to="/profile">personal profile</Link> for tracking your
                progress
              </li>
            </ul>
          </Column>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}

function Column(props: { classes?: string; children: ReactNode }) {
  return (
    <BootstrapGridColumn
      breakpoints={['12', 'md-10', 'lg-8']}
      classes={props.classes}
    >
      {props.children}
    </BootstrapGridColumn>
  );
}
