/**
 * Created by huiter on 16/12/27.
 */
import React,{Component,PropTypes} from 'react';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker,Modal} from 'antd';

class SnapshotLarge extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible : false,
			imageUrl : 'https://omojllq5i.qnssl.com/default/snapshot.png'
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
		      imageUrl: 'http://oj54bwg6q.bkt.clouddn.com/default/snapshot.png',
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
	    	<div style={{marginBottom:"30px",textAlign:"center"}}>
		    	<div style={{backgroundColor:"white",maxWidth:"650px",maxHeight:"490px",display:"inline-block",margin:"0 auto"}}>
		    		<a onClick={this.showModal}><img src={this.state.imageUrl + '?imageMogr2/thumbnail/650x/crop/x490'} style={{width:"100%"}}/></a>
		      	</div>
		      	<h4 style={{textAlign:"center",color:"white"}}>{this.props.date}</h4>
		      	<Modal onCancel={this.handleCancel} title={this.props.date} width={800} visible={this.state.visible} footer={
			            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>
			          }
		        >
		        	<img src={this.state.imageUrl} style={{width:"100%",height:"auto",overflow:"scroll"}}/>
		        </Modal>
	      	</div>
	    );	
	}

}

export default SnapshotLarge;
