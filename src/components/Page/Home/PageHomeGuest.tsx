import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapGridContainer from '../../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../../Bootstrap/Grid/Row/BootstrapGridRow';
import Page from '../Page';
import Column from './PageHomeColumn';

export default function PageHomeGuest() {
  return (
    <Page title="keyCap | Home">
      <BootstrapGridContainer
        breakpoints={['md']}
        classes="d-flex flex-column gap-3 px-4"
      >
        <BootstrapGridRow classes="justify-content-center gap-4">
          <Column classes="d-flex flex-column gap-3">
            <h1 className="text-norm m-0">Faster Typing Awaits...</h1>
            <p className="text-norm m-0">
              keyCap is a platform for practicing typing skills. It builds on
              the features offered by popular platforms such as{' '}
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
            <h3 className="text-norm m-0">The 3 Core Features</h3>
            <ul className="list-group text-norm">
              <li className="list-group-item list-group-item-dark">
                An extremely customizable{' '}
                <Link to="/practice">practice sandbox</Link> with analysis
                tools, allowing you to sharpen your typing skills in the most
                efficient way
              </li>
              <li className="list-group-item list-group-item-dark">
                A <Link to="/profile">personal profile</Link> for tracking your
                progress
              </li>
              <li className="list-group-item list-group-item-dark">
                A <Link to="/arena">multiplayer arena</Link> where you can play
                against your friends{' '}
                <span className="text-warning">(in the works)</span>
              </li>
            </ul>
          </Column>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
