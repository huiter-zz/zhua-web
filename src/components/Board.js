/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
const Board = React.createClass({
  render(){
    return(
      <div style={{background:"#ffffff",borderRadius:"4px",overflow:"hidden"}}>
      	{this.props.children}
      </div>
    );
  }

});

export default Board;
