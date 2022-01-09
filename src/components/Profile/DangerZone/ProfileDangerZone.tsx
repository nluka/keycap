import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import localStorageItems from '../../../local-storage';
import { actionCreatorUserSignOut } from '../../../redux/actions/userActions';
import { useAppDispatch } from '../../../redux/hooks';
import store from '../../../redux/store';
import displayAlert from '../../../utility/functions/displayAlert';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import Panel from '../../Panel/Panel';

export default function ProfileDangerZone() {
  const [hasUserBeenDeleted, setHasUserBeenDeleted] = useState(false);
  const dispatch = useAppDispatch();

  async function handleDeleteAccount() {
    const choice = confirm(
      'Are you sure you want to delete this account?\nThis action is irreversible.',
    );
    if (!choice) {
      return;
    }

    try {
      await axios.delete('/user/delete', {
        headers: { token: store.getState().user.token },
      });
      setHasUserBeenDeleted(true);
      dispatch(actionCreatorUserSignOut());
    } catch (err) {
      displayAlert(`Failed to delete user.\nReason: ${err}`);
    }
  }

  if (hasUserBeenDeleted) {
    return <Redirect to="/" />;
  }
  return (
    <Panel
      collapseLocalStorageKey={
        localStorageItems.isPanelCollapsedProfileDangerZone
      }
      heading="Danger Zone"
      id="profileDangerZone"
    >
      <div className="d-flex flex-wrap gap-2">
        <BootstrapButton
          classes="d-flex align-items-center gap-2"
          isOutline={true}
          onClick={handleDeleteAccount}
          theme="danger"
        >
          <i className="bi bi-person-x"></i>
          <span>Delete Account</span>
        </BootstrapButton>
      </div>
    </Panel>
  );
}
