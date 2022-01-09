import React from 'react';
import { Link } from 'react-router-dom';
import { localStorageGetUsername } from '../../../local-storage';
import BootstrapGridContainer from '../../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../../Bootstrap/Grid/Row/BootstrapGridRow';
import Page from '../Page';
import Column from './PageHomeColumn';

export default function PageHomeUser() {
  return (
    <Page title="keyCap | Home">
      <BootstrapGridContainer
        breakpoints={['md']}
        classes="d-flex flex-column gap-3 px-4"
      >
        <BootstrapGridRow classes="justify-content-center gap-4">
          <Column classes="d-flex flex-column gap-3">
            <h1 className="text-norm m-0">
              Welcome <strong>{localStorageGetUsername()}</strong>
            </h1>
            <p className="text-norm m-0">It&apos;s a pleasure to see you.</p>
          </Column>
          <Column classes="d-flex flex-column gap-3 mb-1">
            <h2 className="text-norm m-0">Not sure what to do?</h2>
            <ul className="list-group text-norm">
              <li className="list-group-item list-group-item-dark">
                Visit the <Link to="/practice">practice sandbox</Link> and spend
                some time sharpening your skills
              </li>
              <li className="list-group-item list-group-item-dark">
                Check out your <Link to="/profile">personal profile</Link> to
                see your progress{' '}
              </li>
              <li className="list-group-item list-group-item-dark">
                Rally some friends, head over to the{' '}
                <Link to="/arena">multplayer arena</Link>, and battle against
                them in a typing race{' '}
                <span className="text-warning">(in the works)</span>
              </li>
            </ul>
          </Column>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
