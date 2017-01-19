/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker,Modal} from 'antd';

class Snapshot extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible : false
		}

		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	};

	showModal() {
	    this.setState({
	      visible: true,
	    });
	}

	handleCancel(){
	    this.setState({
	      visible: false,
	    });
	}

	render(){
		return(
	    	<Col style={{marginBottom:"16px"}} span={8}>
	    		<p>{this.props.date}</p>
		    	<div style={{maxHeight:"400px",overflow:"scroll",display:"inline-block",marginRight:"8px",border:"2px solid #e1e1e1"}}>
		    		<a onClick={this.showModal}><img src={this.props.imageUrl + '?imageView2/2/w/360'} style={{width:"100%"}}/></a>
		      	</div>
		      	<Modal onCancel={this.handleCancel} title={this.props.date} width={800} visible={this.state.visible} footer={
			            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>
			          }
		        >
		        	<img src={this.props.imageUrl} style={{width:"100%",height:"auto",overflow:"scroll"}}/>
		        </Modal>
	      	</Col>
	    );	
	}

}

export default Snapshot;
