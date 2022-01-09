import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { INFO_MESSAGE_STYLES } from '../../utility/constants';
import isEnvironmentProduction from '../../utility/functions/isEnvironmentProduction';
import Alerts from '../Alerts/Alerts';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageHomeGuest from '../Page/Home/PageHomeGuest';
import PageHomeUser from '../Page/Home/PageHomeUser';
import PageNotFound from '../Page/PageNotFound';
import PagePractice from '../Page/PagePractice';
import PageUnderConstruction from '../Page/PageUnderConstruction';
import PageUserCreateAccount from '../Page/PageUserCreateAccount';
import PageUserProfile from '../Page/PageUserProfile';

axios.defaults.baseURL = isEnvironmentProduction()
  ? 'https://keycap-api.herokuapp.com/'
  : 'http://localhost:5000';

console.log(
  `%caxios.defaults.baseURL = ${axios.defaults.baseURL}`,
  INFO_MESSAGE_STYLES,
);

export default function App() {
  const isUserSignedIn = useAppSelector((state) => state.user.isSignedIn);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Alerts />
        <Switch>
          <Route exact path="/">
            {isUserSignedIn ? <PageHomeUser /> : <PageHomeGuest />}
          </Route>

          <Route path="/practice">
            <PagePractice />
          </Route>

          <Route path="/arena">
            <PageUnderConstruction title="Arena" />
          </Route>

          <Route path="/practice">
            <PagePractice />
          </Route>

          <Route path="/create-account">
            <PageUserCreateAccount />
          </Route>

          <Route path="/profile">
            <PageUserProfile />
          </Route>

          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}
