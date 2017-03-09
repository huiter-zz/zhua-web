'use strict';

import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Tag, Message,Radio,InputNumber} from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class AdjustForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      type: 'cash'
    };

    this.handleOk = this.handleOk.bind(this);
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
      if (values.amount < 0) {
        Message.error('金额需大于 0');
        return false;
      }

      if (values.amount > 100) {
        Message.error('金额需不超过 100');
        return false;
      }
      this.setState({visible:false});


      values.uid = this.props.item.uid; 
      values.type = this.state.type;

      this.props.dispatch({
        type: 'admin/adjust',
        payload:  values
      });

    });
    
  };

  onChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
          <div style={{display:"inline"}}>
            <Button type="default" size="small" onClick={()=>{this.props.form.resetFields();this.setState({visible:true})}}>充值</Button>
            <Modal title="余额操作"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.handleCancel}
                maskClosable={true}
              >
              <Form>
                <Form.Item>
                  <RadioGroup value={this.state.type} onChange={this.onChange} >
                    <Radio value={'cash'}>充值</Radio>
                    <Radio value={'gift'}>赠送</Radio>
                  </RadioGroup>
                </Form.Item>
              </Form>
              <Form>
                <Form.Item>
                  {
                    getFieldDecorator('amount', {
                      initialValue: 0,
                      rules: [
                        { required: true, message: '请填写金额'}
                      ]
                    })(<InputNumber formatter={value => `¥ ${value}`}/>)
                  }
                </Form.Item>
              </Form>
            </Modal>
          </div>
    );
  };
};




export default connect()(Form.create()(AdjustForm));