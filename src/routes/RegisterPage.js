import React, { PropTypes } from 'react';
import { routerRedux} from 'dva/router';
import { connect } from 'dva';

// 加载其它组件

import RegisterForm from '../components/RegisterForm';


const Register = (props)=>{
  function handleSubmit(data) {
    props.dispatch({
      type: 'app/register',
      payload: data
    });
  }

  return (
    <RegisterForm onSubmit={ handleSubmit.bind(this) }  />
  );
}


export default connect()(Register);