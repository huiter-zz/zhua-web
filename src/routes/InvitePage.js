import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

function InvitePage(props) {
    console.log(props);
    const columns = [{
            title: '用户',
            dataIndex: 'name',
            render: (text, record, index) => (
                <div>
                    <Screen></Screen><span style={{verticalAlign:"top",lineHeight:"50px"}}>{text}</span>
                </div>
            )
        },{
            title: '注册时间',
            dataIndex: 'createDate',
        },{
            title: '收益',
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
          邀请码
        </div>
          <Block height={20}></Block>
          <Alert message={"你的邀请码为 " + props.app.user.uid} type="info" showIcon/>
          <Block height={10}></Block>
          <Table columns = { columns } dataSource = { props.invite.pages } pagination={false}/> 
          <Block height={20}></Block>
          <Row type="flex" justify="end">
            <Pagination total={props.invite.total} showTotal={total => `共 ${props.invite.total} 项`} current={props.invite.current} pageSize={5}  defaultCurrent={1}/>
          </Row>
    </div>
  );
}

function mapStateToProps({ invite, app }) {
  return { invite, app};
}

export default connect(mapStateToProps)(InvitePage);
