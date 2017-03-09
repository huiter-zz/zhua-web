import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import App from './routes/App';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import HomePage from './routes/HomePage';
import InvitePage from './routes/InvitePage';
import ProfilePage from './routes/ProfilePage';
import BillPage from './routes/BillPage';
import NotFoundPage from './routes/NotFoundPage';
import PagePage from './routes/PagePage';
import AdminPage from './routes/AdminPage';

export default function({ history }) {
  return (
  <Router history={history}>
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="home" component={HomePage} />
      <Route path="invite" component={InvitePage} />
      <Route path="bill" component={BillPage} />
      <Route path="profile" component={ProfilePage} />
      <Route path="page" component={PagePage} />
      <Route path="admin" component={AdminPage} />
      <Route path="/*" component={NotFoundPage} />
    </Route>
  </Router>
  );
};
