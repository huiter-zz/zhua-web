import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Tag, Message, Alert } from 'antd';
import { Link } from 'dva/router';
import Block from '../components/Block';
import AvatarEditer from '../components/AvatarEditer';


const FormItem = Form.Item;
class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing : false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const _self = this;
    this.props.form.validateFields((err, values) => {
      if (!values.nickname) {
        Message.error('请填写昵称');
        return false;
      }
      if (!values.phone) {
        Message.error('请填写手机号');
        return false;
      }

      this.props.dispatch({
        type: 'app/updateProfile',
        payload: values
      });

    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <div>账号</div>
        <Block height={30}></Block>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="头像">
            <AvatarEditer imageUrl='http://huiter.me/avatar.jpg'></AvatarEditer>
          </Form.Item>
          <Form.Item {...formItemLayout} label="邮箱" extra="目前邮箱不支持修改">
            <Input type="text" placeholder="" disabled value={this.props.app.user.email}/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="昵称">
            {
              getFieldDecorator('nickname', {
                initialValue: this.props.app.user.nickname,
                rules: [
                  { required: true, message: '请填写你的昵称'},
                  { max: 12, message: '昵称需不超过 12 个字' }
                ]
              })(<Input type="text" placeholder="" disabled={!this.state.editing} />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机号">
            {
              getFieldDecorator('phone', {
                initialValue: this.props.app.user.phone,
                rules: [
                  { required: true, message: '请填写你的昵称'},
                  { len: 11, message: '请输入手机号' }
                ]
              })(<Input type="text" placeholder="" disabled={!this.state.editing} />)
            }
          </Form.Item>
          <FormItem wrapperCol={{span:14,offset:6}}>
            {
              this.state.editing ? 
              <div>
                <Button type="primary" size="large" htmlType="submit">保存</Button>
                <Button type="ghost" size="large" onClick={ ()=>{this.setState({editing:false})}} style={{marginLeft:"16px"}}>取消</Button>
              </div>:
              <Button type="default" size="large" onClick={ ()=>{this.setState({editing:true})}}>修改</Button>

            }
          </FormItem>
          <Block height={30}></Block>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Form.create()(ProfilePage));
