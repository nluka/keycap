import React from 'react';
import BootstrapGridColumn from '../Bootstrap/Grid/Column/BootstrapGridColumn';
import BootstrapGridContainer from '../Bootstrap/Grid/Container/BootstrapGridContainer';
import BootstrapGridRow from '../Bootstrap/Grid/Row/BootstrapGridRow';
import Page from './Page';

export default function PageNotFound() {
  return (
    <Page title="keyCap | Page Not Found">
      <BootstrapGridContainer breakpoints={['md']} classes="px-4">
        <BootstrapGridRow classes="justify-content-center">
          <BootstrapGridColumn
            breakpoints={['xs-12', 'md-10', 'lg-8']}
            classes="d-flex flex-column align-items-center gap-2"
          >
            <h1 className="d-flex align-items-center gap-3 text-norm m-0">
              <span>Page Not Found</span>
              <i className="bi bi-search text-secondary"></i>
            </h1>
            <p className="text-norm text-center m-0">
              The page you are looking for doesn&apos;t exist.
            </p>
          </BootstrapGridColumn>
        </BootstrapGridRow>
      </BootstrapGridContainer>
    </Page>
  );
}
