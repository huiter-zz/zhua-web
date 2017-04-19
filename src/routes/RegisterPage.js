import React, { PropTypes } from 'react';
import { routerRedux} from 'dva/router';
import { connect } from 'dva';
import { Popover, Button } from 'antd';
import { withRouter } from 'react-router';

// 加载其它组件

import RegisterForm from '../components/RegisterForm';


const Register = (props)=>{
  function handleSubmit(data) {
    props.dispatch({
      type: 'app/register',
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

	          <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
	            <img style={{zIndex:1001,position:"fixed",right:"0",margin:"20px 20px 20px 20px",borderRadius:"50%",border:"1px solid #fff"}} width="30px" src={"/assets/img/huiter.jpg"} />
	          </Popover>
          <Button style={{zIndex:1001,position:"fixed",right:"0",margin:"20px 70px 0px 0px",border:"2px solid #fff"}} type="primary" onClick={()=>{props.router.push('/')}}>返回主页</Button>  

	    	<RegisterForm onSubmit={ handleSubmit.bind(this) }  code={props.location.query.code}/>
	    </div>
  );
}


export default connect()(withRouter(Register));