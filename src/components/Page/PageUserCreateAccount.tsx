import React from 'react';
import BootstrapGridColumn from '../Bootstrap/Grid/Column/BootstrapGridColumn';
import BootstrapGridContainer from '../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../Bootstrap/Grid/Row/BootstrapGridRow';
import FormCreateAccount from '../Form/CreateAccount/FormCreateAccount';
import Page from './Page';

export default function PageUserCreateAccount() {
  return (
    <Page title="keyCap | Create Account">
      <BootstrapGridContainer classes="px-4">
        <BootstrapGridRow classes="justify-content-center">
          <BootstrapGridColumn
            breakpoints={['xs-12', 'sm-10', 'md-8', 'lg-6', 'xxl-4']}
          >
            <FormCreateAccount />
          </BootstrapGridColumn>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
