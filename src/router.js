import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';
import App from './routes/App';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import HomePage from './routes/HomePage';
import InvitePage from './routes/InvitePage';
import ProfilePage from './routes/ProfilePage';
import BillPage from './routes/BillPage';
import CostPage from './routes/CostPage';
import NotFoundPage from './routes/NotFoundPage';
import PagePage from './routes/PagePage';
import AdminPage from './routes/AdminPage';
import IntroPage from './routes/IntroPage';

export default function({ history }) {
  return (
  <Router history={history}>
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="/" component={IntroPage} />
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="home" component={HomePage} />
      <Route path="invite" component={InvitePage} />
      <Route path="bill" component={BillPage} />
      <Route path="cost" component={CostPage} />
      <Route path="profile" component={ProfilePage} />
      <Route path="page" component={PagePage} />
      <Route path="admin" component={AdminPage} />
      <Route path="/*" component={NotFoundPage} />
    </Route>
  </Router>
  );
};
