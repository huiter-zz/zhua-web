import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

// 加载其它组件

import LoginForm from '../components/LoginForm';


const Login = (props)=>{
  function handleSubmit(data) {
    props.dispatch({
      type: 'users/login',
      payload: data
    });
  }

  return (
    <LoginForm onSubmit={ handleSubmit.bind(this) }  />
  );
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Login);