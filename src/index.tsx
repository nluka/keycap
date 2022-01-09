import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import './index.css';
import { localStorageCleanAndFix } from './local-storage';
import store from './redux/store';
import { INFO_MESSAGE_STYLES } from './utility/constants';

console.log(`%cEnvironment = ${import.meta.env.MODE}`, INFO_MESSAGE_STYLES);

localStorageCleanAndFix();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
