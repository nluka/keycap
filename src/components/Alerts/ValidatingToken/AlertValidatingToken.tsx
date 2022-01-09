import React from 'react';
import BootstrapAlert from '../../Bootstrap/Alert/BoostrapAlert';

export default function AlertValidatingToken() {
  return (
    <BootstrapAlert id="validatingToken" isDismissable={false} theme="info">
      <div className="d-flex align-items-center gap-2">
        <span>Validating token</span>
        <div className="spinner-grow spinner-grow-sm text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </BootstrapAlert>
  );
}
