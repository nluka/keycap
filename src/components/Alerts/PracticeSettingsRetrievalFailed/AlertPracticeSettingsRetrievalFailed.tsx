import React from 'react';
import BootstrapAlert from '../../Bootstrap/Alert/BoostrapAlert';

export default function AlertPracticeSettingsRetrievalFailed() {
  return (
    <BootstrapAlert
      autoDismissAfter={10_000}
      hasMaxWidth={true}
      id="practiceSettingsRetrievalFailure"
      theme="danger"
    >
      <strong>Failed to fetch settings</strong>
    </BootstrapAlert>
  );
}
