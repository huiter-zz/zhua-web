'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
const FormItem = Form.Item;


class RegisterForm extends Component {

  constructor(props) {
    super(props);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const _self = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('请检查你填写的邮箱及密码');
        return false;
      }
      if (!values.email) {
        message.error('请填写你的昵称');
        return false;
      }
      if (!values.email) {
        message.error('请填写你的邮箱');
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
                <h1><Link to="/">🐙</Link></h1>
                <h3 style={{ textAlign: 'center',margin:"10px 0px 10px 0px"}}>爪 - 页面时光机</h3>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {
                    getFieldDecorator('nickname', {
                      initialValue: '',
                      rules: [
                        { required: true, message: '请填写你的昵称'},
                        { max: 50, message: '昵称需不超过 12 个字' }
                      ]
                    })(<Input addonBefore={<Icon type="user" />}  type="text" placeholder="昵称" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator('email', {
                      initialValue: '',
                      rules: [
                        { type: 'email', message: '邮箱格式不正确' }, 
                        { required: true, message: '请填写你的邮箱'}
                      ]
                    })(<Input addonBefore={<Icon type="mail" />}  type="text" placeholder="邮箱" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator('password', {
                      initialValue: '',
                      rules: [
                        { required: true, message: '请填写密码'},
                        { min: 6,  message: '密码最少 6 位' },
                        { max: 50, message: '密码最多 50 位' }
                      ]
                    })(<Input addonBefore={<Icon type="lock" />}  type="password" placeholder="密码" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item>
                  {
                    getFieldDecorator('referralsCode', {
                      initialValue: this.props.code
                    })(<Input addonBefore={<Icon type="share-alt" />}  type="text" placeholder="邀请码" disabled={this.props.loading} />)
                  }
                </Form.Item>
                <Form.Item style={{ textAlign:'center'}}>
                  <Button type="primary" htmlType="submit" loading={this.props.loading}>注册</Button>
                </Form.Item>
              </Form>
            </div>
            <Block height={10}></Block>
            <div style={{maxWidth:"340px",border:"1px solid #e9e9e9",borderRadius:"4px",padding:"10px 22px 10px 22px",background:"white",margin:"0px auto 0px auto",textAlign:"center"}}>
              <Link to="login">已有帐号</Link>
            </div>
            <p style={{ textAlign:'center',marginTop:"20px",color:"white"}}>
              版权所有 © 2017 爪小组
            </p>
          </Col>
        </Row>
      </div>
    );
  };
};

export default Form.create()(RegisterForm);