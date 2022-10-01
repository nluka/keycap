import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import BootstrapGridContainer from '../../Bootstrap/Grid/Container/BootstrapGridContainer';
import './NavBar.css';

export default function NavBar() {
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
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
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
                <li>
                  <a
                    className="dropdown-item"
                    href="https://github.com/nluka/keycap-client"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Source Code
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </BootstrapGridContainer>
    </nav>
  );
}
