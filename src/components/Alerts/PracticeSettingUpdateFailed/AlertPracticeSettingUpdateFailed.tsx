import React from 'react';
import BootstrapAlert from '../../Bootstrap/Alert/BoostrapAlert';

export default function AlertPracticeSettingUpdateFailed() {
  return (
    <BootstrapAlert
      autoDismissAfter={10_000}
      hasMaxWidth={true}
      id="practiceSettingUpdateFailed"
      theme="danger"
    >
      <strong>Failed to update setting on account</strong>
    </BootstrapAlert>
  );
}
