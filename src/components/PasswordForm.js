'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24 ,sm:6,md:6,lg:6},
  wrapperCol: { xs:24,sm: 14 ,md: 14,lg:14 },
};

class PassswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing:false,
      loading: false,
      visible: false,
    }
  };

  handleSubmit = () => {
    const _self = this;
    this.props.form.validateFields((err, values) => {
      if (!values.oldPassword) {
        message.error('请填写原始密码');
        return false;
      }
      else if (!values.newPassword) {
        message.error('请填写新密码');
        return false;
      }
      else if (!values.newPasswordAgain) {
        message.error('请填写新密码的二次确认');
        return false;
      }
      else if (values.oldPassword == values.newPassword) {
        message.error('新密码不能与旧密码相同');
        return false;
      }
      else if (values.newPasswordAgain != values.newPassword) {
        message.error('二次确认不正确');
        return false;
      }
      else if (!err) {
        _self.props.onSubmit(values);
        this.setState({visible:false});
      }
      
    });
  };

  handleCancel = () =>{
    this.setState({visible:false});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <span>

            <Button type="danger" size="small" onClick={ ()=>{this.props.form.resetFields();this.setState({visible:true})}}>设置新密码</Button>
            <Modal title="修改密码"
                      visible={this.state.visible}
                      onOk={this.handleSubmit}
                      confirmLoading={this.props.confirmLoading}
                      onCancel={this.handleCancel}
                      maskClosable={true}
                    >
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Item {...formItemLayout}  label="原始密码">
                        {
                          getFieldDecorator('oldPassword', {
                            initialValue: '',
                            rules: [
                              { min: 6,  message: '密码最少 6 位' },
                              { max: 50, message: '密码最多 50 位' },
                            ]
                          })(<Input type="password" placeholder="原始密码" disabled={this.props.loading} />)
                        }
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="新密码">
                        {
                          getFieldDecorator('newPassword', {
                            initialValue: '',
                            rules: [
                              { min: 6,  message: '密码最少 6 位' },
                              { max: 50, message: '密码最多 50 位' },
                            ]
                          })(<Input type="password" placeholder="新密码" disabled={this.props.loading} />)
                        }
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="确认新密码">
                        {
                          getFieldDecorator('newPasswordAgain', {
                            initialValue: '',
                            rules: [
                              { min: 6,  message: '密码最少 6 位' },
                              { max: 50, message: '密码最多 50 位' },
                            ]
                          })(<Input type="password" placeholder="确认新密码" disabled={this.props.loading} />)
                        }
                      </Form.Item>
                  </Form>
            </Modal>
      </span>
    );
  };
};

export default Form.create()(PassswordForm);