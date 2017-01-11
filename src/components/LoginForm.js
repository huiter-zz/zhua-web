'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
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
        message.error('请检查你填写的邮箱与密码');
        return false;
      }
      if (!values.email) {
        message.error('请填写你的帐号邮箱');
        return false;
      }
      if (!values.password) {
        message.error('请填写密码');
        return false;
      }
      _self.props.onSubmit(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{background: "#108ee9",height:"100%"}}>
        <Row type="flex" align="middle" justify="space-around" style={{height:"100%"}}>
          <Col xs={20} sm={12} md={8} lg={6}>
            <Block height={20}></Block>
            <div style={{maxWidth:"340px",border:"1px solid #e9e9e9",borderRadius:"4px",padding:"0px 22px 0px 22px",background:"white",margin:"0px auto 0px auto"}}>
              <div style={{ textAlign: 'center',margin:"20px 0px 20px 0px"}}>
                <h1>🐙</h1>
                <h3 style={{ textAlign: 'center',margin:"10px 0px 10px 0px"}}>爪 - 页面时光机</h3>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {
                    getFieldDecorator('email', {
                      initialValue: '',
                      rules: [
                        { type: 'email', message: '邮箱格式不正确' }, 
                        { required: true, message: '请填写你的帐号邮箱'}
                      ]
                    })(<Input addonBefore={<Icon type="mail" />}  type="text" placeholder="邮箱" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator('password', {
                      initialValue: '',
                      rules: [
                        { min: 6,  message: '密码最少 6 位' },
                        { max: 50, message: '密码最多 50 位' },
                      ]
                    })(<Input addonBefore={<Icon type="lock" />}  type="password" placeholder="密码" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item style={{ textAlign:'center'}}>
                  <Button type="primary" htmlType="submit" loading={this.props.loading}>登录</Button>
                </Form.Item>
              </Form>
            </div>
            <Block height={10}></Block>
            <div style={{maxWidth:"340px",border:"1px solid #e9e9e9",borderRadius:"4px",padding:"10px 22px 10px 22px",background:"white",margin:"0px auto 0px auto",textAlign:"center"}}>
              <Link to="register">注册新帐号</Link>
            </div>
            <p style={{ textAlign:'center',marginTop:"20px",color:"white"}}>
              版权所有 © 2016 爪小组
            </p>
          </Col>
        </Row>
      </div>
    );
  };
};

export default Form.create()(LoginForm);