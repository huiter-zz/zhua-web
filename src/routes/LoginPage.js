import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Affix, Popover, Button } from 'antd';
import { withRouter } from 'react-router';


// 加载其它组件

import LoginForm from '../components/LoginForm';


const Login = (props)=>{
  function handleSubmit(data) {
    props.dispatch({
      type: 'app/login',
      payload: data
    });
  }

  const text = <div><span style={{fontSize:16}}><b>客服</b></span></div>;
  const content = (
      <div>
        <p><img width="200px" src="https://omojllq5i.qnssl.com/wechat.jpeg"/></p>
      </div>
  );

  return (
    <div style={{height:"100%"}}>
        <Button style={{position:"fixed",right:"0",margin:"10px 20px 0px",border:"2px solid #fff"}} type="primary" onClick={()=>{props.router.push('/')}}>返回主页</Button>  
        <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
          <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
            <img style={{position:"fixed",right:"0",margin:"10px 120px 20px 0px",borderRadius:"50%",border:"1px solid #fff"}} width="30px" src={"/assets/img/huiter.jpg"} />
          </Popover>
        </Affix>
      <LoginForm onSubmit={ handleSubmit.bind(this) }  />
    </div>
  );
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(withRouter(Login));