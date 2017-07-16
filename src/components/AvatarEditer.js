'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Upload , Message } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
import { connect } from 'dva';


class AvatarEditer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        imageUrl: this.props.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com"),
        showButton: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange = (info) => {
      let fileList = info.fileList;

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      if (fileList.length > 0) {
        this.setState({imageUrl:fileList[0].url})
        this.setState({showButton:true});
      } else {
        Message.warning('保存失败', 3);
      }



  
  };

  handleSubmit = () => {
    const _self = this;
    this.props.dispatch({
      type: 'app/updateProfile',
      payload: {avatar:this.state.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com")}
    });
  };


  render() {
    const imageUrl = this.state.imageUrl.replace("http://oj54bwg6q.bkt.clouddn.com", "https://omojllq5i.qnssl.com");
    console.log(imageUrl);
    return (
      <div>
        <Upload
          name="file"
          showUploadList={false}
          action="https://zhua.pm/api/files/upload"
          withCredentials={true}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          style = {{ display: "block",border: "1px dashed #d9d9d9",borderRadius: "6px",cursor: "pointer",lineHeight: "0px"}}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt=""  style={{width: "80px",height: "80px"}}/> :
              <Icon type="plus" style={{display: "table-cell",verticalAlign: "middle",fontSize: "28px",color: "#999"}}/>
          }
        </Upload>
        {
          this.state.showButton ? <div><Button type="primary" size="large" onClick={this.handleSubmit}>保存</Button></div>:''
        } 

      </div>
    );
  };
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    Message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}


export default connect()(Form.create()(AvatarEditer));;