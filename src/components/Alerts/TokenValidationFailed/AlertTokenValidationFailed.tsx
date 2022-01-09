import React from 'react';
import BootstrapAlert from '../../Bootstrap/Alert/BoostrapAlert';

export default function AlertUserSignedOut() {
  return (
    <BootstrapAlert
      autoDismissAfter={10_000}
      hasMaxWidth={true}
      id="userSignedOut"
      theme="info"
    >
      <div className="d-flex flex-column w-100 m-0">
        <strong>You&apos;ve been signed out</strong>
      </div>
    </BootstrapAlert>
  );
}
