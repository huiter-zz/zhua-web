/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Badge} from 'antd';
const Screen = React.createClass({
  render(){
    return(
    	<div style={{width:"50px",height:"50px",overflow:"hidden",display:"inline-block",marginRight:"8px",border:"2px solid #e1e1e1"}}>
      		<img src="/src/assets/img/screen.jpg" style={{width:"50px",height:"auto",overflow:"hidden"}}/>
      	</div>	
    );	
  }

});

export default Screen;
