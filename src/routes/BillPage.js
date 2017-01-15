import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

function BillPage(props) {

    const columns = [{
            title: '时间',
            dataIndex: 'createDate',
        },{
            title: '金额',
            dataIndex: 'count',
            render: (text, record, index) => (
                <div>
                    <Screen></Screen><span style={{verticalAlign:"top",lineHeight:"50px"}}>{text}</span>
                </div>
            )
        },{
            title: '类型',
            dataIndex: 'type',
        },{
            title: '变动',
            dataIndex: 'operation',
            render: ( text, record, index) => (
                <div>
                    <Button type="ghost" icon="inbox" style={{marginRight:"8px"}}></Button>
                    <Popconfirm title="确定要删除吗？" onConfirm={()=>{ this.deletePage(record.id)}}>
                        <Button type="ghost" icon="delete"></Button>
                    </Popconfirm>
                </div>
            )
        }];
  return (
    <div>
        <div>
          充值
        </div>
        <Block height={20}></Block>
        <div style={{border:"1px solid #e9e9e9",padding:"20px",borderRadius:"4px"}}>
          <p>您的账号余额为 <span style={{color:"rgb(233, 37, 158)"}}>¥15</span>，预计还可以使用 <span style={{color:"rgb(233, 37, 158)"}}>3</span> 天。</p>
          <Block height={10}></Block>
          <Button type="primary" size="small" style={{borderColor:"rgb(233, 37, 158)",backgroundColor:"rgb(233, 37, 158)"}}>充值</Button>
        </div>
        <Block height={20}></Block>
        <Block height={10}></Block>
        <Table columns = { columns } dataSource = { props.bill.pages } pagination={false}/> 
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
