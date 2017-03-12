/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Message,Badge, Modal } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class Screen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible : false,
			imageUrl: 'https://omojllq5i.qnssl.com/default/snapshot.png'
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
	      imageUrl: this.props.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com"),
	    });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageUrl != this.props.imageUrl) {
			this.setState({
		      imageUrl: 'https://omojllq5i.qnssl.com/default/snapshot.png',
		    });
		    let url = nextProps.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com");
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
	    	<div>
		    	<div style={{boxSizing:"content-box",width:"50px",height:"50px",overflow:"hidden",display:"inline-block",marginRight:"8px",border:"2px solid #e1e1e1"}}>
		    		<a onClick={this.showModal}><img src={this.state.imageUrl + '?imageMogr2/thumbnail/100x/crop/x100'} style={{width:"50px",height:"auto",overflow:"hidden"}}/></a>
		      	</div>
			    <Modal onCancel={this.handleCancel} title={this.props.title} width={800} visible={this.state.visible} footer={
			            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>
			          }
		        >
		        	<img src={this.state.imageUrl} style={{width:"100%",height:"auto",overflow:"scroll"}}/>
		        </Modal>
		        <span style={{verticalAlign:"top",lineHeight:"50px",whiteSpace:"nowrap"}}>{this.props.title}</span>
	      	</div>
	    );		
	}

};

export default connect()(Screen);
