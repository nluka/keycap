import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageHome from '../Page/PageHome';
import PageNotFound from '../Page/PageNotFound';
import PagePractice from '../Page/PagePractice';
import PageUserProfile from '../Page/PageUserProfile';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <PageHome />
          </Route>

          <Route path="/practice">
            <PagePractice />
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
