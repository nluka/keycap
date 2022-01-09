import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import BootstrapGridColumn from '../Bootstrap/Grid/Column/BootstrapGridColumn';
import BootstrapGridContainer from '../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../Bootstrap/Grid/Row/BootstrapGridRow';
import ProfileDangerZone from '../Profile/DangerZone/ProfileDangerZone';
import ProfilePracticeStats from '../Profile/PracticeStats/ProfilePracticeStats';
import Page from './Page';

export default function PageUserProfile() {
  const isUserSignedIn = useAppSelector((state) => state.user.isSignedIn);

  return (
    <Page title="keyCap | Profile">
      <BootstrapGridContainer breakpoints={['md']} classes="px-4">
        <BootstrapGridRow classes="justify-content-center">
          <BootstrapGridColumn
            breakpoints={['xs-12', 'md-10', 'lg-8']}
            classes="d-flex flex-column gap-3"
          >
            <h1 className="d-flex align-items-center gap-2 text-norm m-0">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </h1>
            {!isUserSignedIn ? (
              <p className="text-norm m-0">Sign in to use this page.</p>
            ) : (
              <>
                <ProfilePracticeStats />
                <ProfileDangerZone />
              </>
            )}
          </BootstrapGridColumn>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
