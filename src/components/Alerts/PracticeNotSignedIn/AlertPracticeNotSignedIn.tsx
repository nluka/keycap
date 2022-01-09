import React, { useRef } from 'react';
import localStorageItems, { localStorageSetBool } from '../../../local-storage';
import BootstrapAlert from '../../Bootstrap/Alert/BoostrapAlert';

export default function AlertPracticeNotSignedIn() {
  const doNotShowAgainCheckbox = useRef<HTMLInputElement>(null);

  return (
    <BootstrapAlert
      autoDismissAfter={10_000}
      hasMaxWidth={true}
      id="practiceNotSignedIn"
      onDismiss={() => {
        if (doNotShowAgainCheckbox.current?.checked) {
          localStorageSetBool(
            localStorageItems.isAlertDisabledPracticeNotSignedIn,
            true,
          );
        }
      }}
      theme="warning"
    >
      <div className="d-flex flex-column gap-2">
        <strong className="m-0">You&apos;re not signed in</strong>
        <span>Setting changes will be local only.</span>
        <hr className="m-0" />
        <div className="d-flex align-items-center gap-1">
          <input type="checkbox" ref={doNotShowAgainCheckbox} />
          <span>Don&apos;t show again</span>
        </div>
      </div>
    </BootstrapAlert>
  );
}
