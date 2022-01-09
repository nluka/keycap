import React from 'react';
import BootstrapGridColumn from '../Bootstrap/Grid/Column/BootstrapGridColumn';
import BootstrapGridContainer from '../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../Bootstrap/Grid/Row/BootstrapGridRow';
import PracticePlayArea from '../Practice/PlayArea/PracticePlayArea';
import PracticeSettingsArea from '../Practice/Settings/PracticeSettings';
import Page from './Page';

const columnBreakpoints = ['xs-12', 'lg-10', 'xl-9', 'xxl-8'];

export default function PagePractice() {
  return (
    <Page title="keyCap | Practice">
      <BootstrapGridContainer classes="d-flex flex-column gap-4 gap-md-5 px-3">
        <BootstrapGridRow classes="justify-content-center">
          <BootstrapGridColumn
            breakpoints={columnBreakpoints}
            classes="d-flex flex-column gap-2"
          >
            <PracticePlayArea />
          </BootstrapGridColumn>
        </BootstrapGridRow>

        <BootstrapGridRow classes="justify-content-center">
          <BootstrapGridColumn
            breakpoints={columnBreakpoints}
            classes="d-flex flex-column gap-3"
          >
            <PracticeSettingsArea />
          </BootstrapGridColumn>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
