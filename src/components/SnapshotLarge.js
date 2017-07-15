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

	componentDidMount() {
		this.setState({
	      imageUrl: this.props.imageUrl,
	    });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageUrl != this.props.imageUrl) {
			this.setState({
		      imageUrl: 'https://omojllq5i.qnssl.com/default.png',
		    });
		    let that = this;
		    setTimeout(()=>{
			    that.setState({
			      imageUrl: nextProps.imageUrl,
			    });	
		    },500)
		}
	}

	render(){
		return(
	    	<div style={{marginBottom:"30px",textAlign:"center"}}>
		    	<div style={{backgroundColor:"white",maxWidth:"600px",maxHeight:"490px",display:"inline-block",margin:"0 auto",boxSizing:"content-box"}}>
		    		<a onClick={this.showModal}>
		    		{
		    			this.state.imageUrl.indexOf('58804c2fadba660c53f6e120') > -1 ? <img src={this.state.imageUrl + '?imageMogr2/thumbnail/640x/crop/!600x270a18a495'} style={{width:"100%"}}/>:<img src={this.state.imageUrl + '?imageMogr2/thumbnail/600x/crop/x490/'} style={{width:"100%"}}/>
		    		}
		    		</a>
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
