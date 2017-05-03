import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Popover, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

function BillPage(props) {
    const text = <div><span style={{fontSize:16}}><b>客服</b></span></div>;
    const content = (
        <div>
          <p><img width="200px" src="https://omojllq5i.qnssl.com/wechat.jpeg"/></p>
        </div>
    );
    const columns = [{
            title: '时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            render: (text, record, index) => (
                <div>
                    {record.createdTime ? moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss'):'无效时间'}
                </div>
            )
        },{
            title: '类型',
            render: (text, record, index) => {
                if (record.data.by == 'register')
                {
                    return (<span>注册</span>)
                }
                else if (record.data.by == 'invitation')
                {
                    return (<span>邀请奖励</span>) 
                }
                else if (record.data.by == 'adjustment')
                {
                    if (record.data.type == 'cash')
                    {
                       return (<span>充值</span>) 
                    }
                    else{
                        return (<span>赠送</span>)
                    }
                }
            }
        },{
            title: '金额',
            render: (text, record, index) => {
                return (<span style={{color: "rgb(233, 37, 158)"}}>+ {record.data.amount /100}</span>)
            }
        }];
  return (
    <div>
        <div>
          充值
        </div>
        <Block height={20}></Block>
        <div style={{border:"1px solid #e9e9e9",padding:"20px",borderRadius:"4px"}}>
          <p>您的余额为 <span style={{color:"rgb(233, 37, 158)"}}>¥ {props.app.user.property? (props.app.user.property.cash + props.app.user.property.gift)/100:0}</span>，预计还可以使用 <span style={{color:"rgb(233, 37, 158)"}}>{Math.floor((props.app.user.property.cash + props.app.user.property.gift)/(100*props.app.user.pageCount))}</span> 天。</p>
          <Block height={10}></Block>
          <p style={{height:"20px"}}>
            <Button type="primary" size="small" style={{float:"left",margin:"0px 10px 0px 0px",display:"inline-block"}} data={{borderColor:"rgb(233, 37, 158)",backgroundColor:"rgb(233, 37, 158)"}} disabled>充值</Button> 
            <span style={{float:"left",lineHeight:"20px"}}> 内测期间在线充值不可用，可联系客服手工充值。</span>
            <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
              <img style={{float:"left",display:"inline-block",borderRadius:"50%",border:"1px solid #fff"}} width="20px" src={"/assets/img/huiter.jpg"} />
            </Popover>
          </p>
        </div>
        <Block height={20}></Block>
        <Block height={10}></Block>
        <Table rowKey={record => record.id} columns = { columns } dataSource = { props.bill.pages } pagination={false}/> 
        <Block height={20}></Block>
        <Row type="flex" justify="end">
          <Pagination total={props.bill.total} showTotal={total => `共 ${props.bill.total} 项`} current={props.bill.current} pageSize={5}  defaultCurrent={1}/>
        </Row>
    </div>
  );
}

function mapStateToProps({ bill, app }) {
  return { bill, app};
}

export default connect(mapStateToProps)(BillPage);
