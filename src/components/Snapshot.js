/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker,Modal} from 'antd';

class Snapshot extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible : false,
			imageUrl : 'http://oj54bwg6q.bkt.clouddn.com/default/snapshot.png'
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

	componentDidMount() {
		this.setState({
	      imageUrl: this.props.imageUrl,
	    });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageUrl != this.props.imageUrl) {
			this.setState({
		      imageUrl: 'http://oj54bwg6q.bkt.clouddn.com/default/snapshot.png',
		    });
		    let url = nextProps.imageUrl;
		    let that = this;
		    setTimeout(()=>{
			    that.setState({
			      imageUrl: url,
			    });	
		    },10)

		}

	}

	render(){
		return(
	    	<Col style={{marginBottom:"16px"}} span={8}>
	    		<p>{this.props.date}</p>
		    	<div style={{maxHeight:"400px",overflow:"scroll",display:"inline-block",marginRight:"8px",border:"2px solid #e1e1e1"}}>
		    		<a onClick={this.showModal}><img src={this.state.imageUrl + '?imageView2/2/w/360'} style={{width:"100%"}}/></a>
		      	</div>
		      	<Modal onCancel={this.handleCancel} title={this.props.date} width={800} visible={this.state.visible} footer={
			            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>
			          }
		        >
		        	<img src={this.state.imageUrl} style={{width:"100%",height:"auto",overflow:"scroll"}}/>
		        </Modal>
	      	</Col>
	    );	
	}

}

export default Snapshot;
