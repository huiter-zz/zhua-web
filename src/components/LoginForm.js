'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import Block from './Block';
const FormItem = Form.Item;


class LoginForm extends Component {

  constructor(props) {
    super(props);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const _self = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('您的登录信息填写有误！');
        return false;
      }
      if (!values.phone) {
        message.error('您的登录帐号不能为空！');
        return false;
      }
      if (!values.password) {
        message.error('您的登录密码不能为空！');
        return false;
      }
      _self.props.onSubmit(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" align="middle" justify="space-around">
        <Col xs={20} sm={12} md={8} lg={6}>
          <Block height={20}></Block>
          <div style={{border:"1px solid #e9e9e9",borderRadius:"4px",padding:"10px 10px 10px 10px",background:"white"}}>
            <div style={{ textAlign: 'center',margin:"20px 0px 20px 0px"}}>
              <h1>🐙</h1>
              <h3 style={{ textAlign: 'center',margin:"10px 0px 10px 0px"}}>爪 - 页面时光机</h3>
            </div>
            <Form horizontal onSubmit={this.handleSubmit}>
              <Form.Item>
                {
                  getFieldDecorator('phone', {
                    initialValue: '',
                    rules: [
                      { min: 11, max: 11, message: '请输入合法的手机号码' }
                    ]
                  })(<Input type="text" placeholder="账号" disabled={this.props.loading} />)
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                      { min: 5, message: '密码最少为5个字符长度' },
                    ]
                  })(<Input type="password" placeholder="密码" disabled={this.props.loading} />)
                }
              </Form.Item>
              <Form.Item style={{ textAlign:'center'}}>
                <Button type="primary" htmlType="submit" loading={this.props.loading}>登录</Button>
              </Form.Item>
            </Form>
          </div>
          <p style={{ textAlign:'center',marginTop:"20px",color:"white"}}>
            版权所有 © 2016 爪小组
          </p>
        </Col>
      </Row>
    );
  };
};

export default Form.create()(LoginForm);