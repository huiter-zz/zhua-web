'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Tag, Message } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
import EditableTagGroup from './EditableTagGroup';
import { connect } from 'dva';

const FormItem = Form.Item;


class PageEditForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      title: this.props.item.title?this.props.item.title:[],
      page: this.props.item.page?this.props.item.page:[],
      tags: this.props.item.tags?this.props.item.tags:[]
    };

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.item.id !== this.props.item.id) {
      this.setState({
          tags: nextProps.item.tags?nextProps.item.tags:[],
          title: nextProps.item.title?nextProps.item.title:[],
          page: nextProps.item.page?nextProps.item.page:[]
      }) 
    }
  }

  addTag = (inputValue) => {
      let tags = this.state.tags;
      tags.push(inputValue);
      this.setState({tags:this.state.tags?tags:[inputValue]});
  }

  removeTag = (removeValue) => {
      let hh = this.state.tags.filter(
          e => e!=removeValue
      );
    this.setState({tags:this.state.tags.filter(
      e => e!=removeValue
    )});
  }

  handleCancel = () =>{
    this.setState({visible:false});
  }


  handleOk = () => {
    
    this.props.form.validateFields((err, values) => {
      if (err) {
        Message.error('请检查表单');
        return false;
      }
      if (!values.title) {
        Message.error('页面名称不能为空');
        return false;
      }
      if (!values.page) {
        Message.error('链接不能为空');
        return false;
      }
      this.setState({visible:false});

      values.id = this.props.item.id;
      values.tags = this.state.tags;
 
      this.props.dispatch({
        type: 'home/editPage',
        payload:  values
      });
  
    });
    
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
          <div style={{display:"inline"}}>
            <Button type="ghost" icon="edit" style={{marginRight:"8px"}} onClick={()=>{this.props.form.resetFields();this.setState({visible:true})}}></Button>
            <Modal title="添加页面"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.handleCancel}
                maskClosable={true}
              >
              <Form>
                <Form.Item>
                  {
                    getFieldDecorator('title', {
                      initialValue: this.state.title,
                      rules: [
                        { required: true, message: '请填写页面名称'}
                      ]
                    })(<Input type="text" placeholder="页面名称" disabled={this.props.loading}/>)
                  }
                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator('page', {
                      initialValue: this.state.page,
                      rules: [
                        { type: 'url', message: '链接格式不正确' }, 
                      ]
                    })(<Input type="url" placeholder="链接" disabled />)
                  }
                </Form.Item>
                <Form.Item>
                  <EditableTagGroup tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}/>
                </Form.Item>
              </Form>
            </Modal>
          </div>
    );
  };
};




export default connect()(Form.create()(PageEditForm));