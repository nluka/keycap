import React from 'react';
import { Link } from 'react-router-dom';
import { localStorageGetUsername } from '../../../local-storage';
import {
  addAlert,
  doesAlertExist,
  removeAlert,
} from '../../../redux/actions/alertActions';
import { actionCreatorUserSignOut } from '../../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store from '../../../redux/store';
import { PAGES_ALL } from '../../../redux/types/Page';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import BootstrapGridContainer from '../../Bootstrap/Grid/Container/BootstrapGridContainer';
import FormSignIn from '../../Form/SignIn/FormSignIn';
import './NavBar.css';

export default function NavBar() {
  const isUserSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 py-3">
      <BootstrapGridContainer breakpoints={['md']}>
        <Link className="navbar-brand py-0" to="/">
          <span>{'>'}keyCap</span>
        </Link>
        <BootstrapButton
          ariaControls="navbarSupportedContent"
          ariaExpanded={false}
          ariaLabel="Toggle navigation"
          classes="navbar-toggler"
          dataBsTarget="#navbarSupportedContent"
          dataBsToggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </BootstrapButton>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/practice">
                Practice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                aria-disabled="true"
                className="nav-link disabled"
                tabIndex={-1}
                to="/arena"
              >
                Arena
              </Link>
            </li>
            {/* {isUserSignedIn && ( */}
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            {/* )} */}
            <li className="nav-item dropdown">
              <a
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                id="navbarDropdown"
                role="button"
              >
                More
              </a>
              <ul aria-labelledby="navbarDropdown" className="dropdown-menu">
                {!isUserSignedIn && (
                  <Link className="dropdown-item" to="/create-account">
                    Create Account
                  </Link>
                )}
                <li>
                  <a
                    className="dropdown-item"
                    href="https://github.com/nluka/keycap-client"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Client Code
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="https://github.com/nluka/keycap-api"
                    rel="noreferrer"
                    target="_blank"
                  >
                    API Code/Docs
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="mb-1 mb-lg-0">
            {isUserSignedIn ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-norm">
                  Signed in as <strong>{localStorageGetUsername()}</strong>
                </span>
                <BootstrapButton
                  classes="d-flex align-items-center gap-1"
                  isOutline={true}
                  onClick={() => {
                    dispatch(actionCreatorUserSignOut());
                    const alerts = store.getState().alerts;
                    if (!doesAlertExist('userSignedOut', alerts)) {
                      addAlert(dispatch, 'userSignedOut', PAGES_ALL);
                    }
                    if (doesAlertExist('validatingToken', alerts)) {
                      removeAlert(dispatch, 'validatingToken');
                    }
                  }}
                  size="sm"
                  theme="secondary"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </BootstrapButton>
              </div>
            ) : (
              <FormSignIn />
            )}
          </div>
        </div>
      </BootstrapGridContainer>
    </nav>
  );
}
