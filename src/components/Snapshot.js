/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker,Modal} from 'antd';
import Block from './Block';

class Snapshot extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible : false,
			imageUrl : 'https://omojllq5i.qnssl.com/default.png'
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

	componentWillMount() {
	    let that = this;
	    setTimeout(()=>{
		    that.setState({
		      imageUrl: this.props.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com"),
		    });	
	    },300)
	}
	
	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageUrl != this.props.imageUrl) {
			this.setState({
		      imageUrl: 'https://omojllq5i.qnssl.com/default.png',
		    });
		    let that = this;
		    setTimeout(()=>{
			    that.setState({
			      imageUrl: nextProps.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com"),
			    });	
		    },300)
		}
	}

	render(){
		return(
	    	<Col style={{marginBottom:"16px"}} span={8}>
	    		<h4>{this.props.date}</h4>
	    		<Block height={5}></Block>

		    	<div style={{overflow:"scroll",maxHeight:"400px",display:"inline-block",marginRight:"8px",border:"2px solid #f1efef"}}>
		    		<a onClick={this.showModal}><img src={this.state.imageUrl + '?imageView2/2/w/330'} style={{width:"100%"}}/></a>
		      	</div>
		      	<Modal onCancel={this.handleCancel} title={this.props.date} width={800} visible={this.state.visible} footer={<Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>}>
		        	<img src={this.state.imageUrl} style={{width:"100%",height:"auto",overflow:"scroll"}}/>
		        </Modal>
	      	</Col>
	    );	
	}

}

export default Snapshot;
