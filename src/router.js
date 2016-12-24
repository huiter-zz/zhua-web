import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import App from './routes/App';
import LoginPage from './routes/LoginPage';
import HomePage from './routes/HomePage';
import InvitePage from './routes/InvitePage';
import ProfilePage from './routes/ProfilePage';
import NotFoundPage from './routes/NotFoundPage';

export default function({ history }) {
  return (
  <Router history={history}>
    <Route path="/login" component={LoginPage}>
    </Route>
    <Route path="/" component={App}>
      <Route path="/home" component={HomePage} />
      <Route path="/invite" component={InvitePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
  );
};
