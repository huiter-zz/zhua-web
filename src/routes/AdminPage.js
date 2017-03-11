import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

import AdjustForm from '../components/AdjustForm';

class AdminPage extends Component {

    constructor(props) {
      super(props);
      this.paginationOnChange = this.paginationOnChange.bind(this);
      this.paginationOnShowSizeChange = this.paginationOnShowSizeChange.bind(this);

    };

    paginationOnChange(page){
      this.props.history.replace('/admin?page='+page);
    }

    paginationOnShowSizeChange(current, pageSize) {
      this.props.dispatch({
        type: 'admin/updateLocalPagination',
        payload: {pageSize:pageSize}
      })
      this.props.history.replace('/admin?page=1');
    }

    render(){      
            console.log(this.props.admin.pages);
             const columns = [{
                    title: '昵称',
                    dataIndex: 'nickname',
                    render: (text, record, index) => (
                        <div>
                           <span>{text}</span>
                        </div>
                    )
                },{
                    title: '邮箱',
                    dataIndex: 'email',
                    render: (text, record, index) => (
                        <div>
                           <span>{text}</span>
                        </div>
                    )
                },{
                    title: '总余额',
                    render: ( record, index) => {
                      console.log(record.property.cash + record.property.gift);
                      return (<div><span style={{color:"rgb(233, 37, 158)"}}>¥ {record.property.cash + record.property.gift}</span></div>)
                    }
                },
                {
                    title: '现金',
                    render: ( record, index) => {
                      console.log(record.property.cash + record.property.gift);
                      return (<div><span>{record.property.cash}</span></div>)
                    }
                },
                {
                    title: '赠送',
                    render: ( record, index) => {
                      console.log(record.property.cash + record.property.gift);
                      return (<div><span>{record.property.gift}</span></div>)
                    }
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    render: ( text, record, index) => (
                        <div>
                           <AdjustForm item={record}></AdjustForm>
                        </div>
                    )
                }];
          return (
            <div>
                <div>
                  管理员
                </div>
                  <Block height={20}></Block>
                  <Table rowKey={record => record.uid} columns = { columns } dataSource = { this.props.admin.pages } pagination={false}/> 
                  <Block height={20}></Block>
                      <Row type="flex" justify="end">
                        <Pagination 
                          onChange={this.paginationOnChange} 
                          total={this.props.admin.total} 
                          showTotal={total => `共 ${this.props.admin.total} 项`} 
                          current={this.props.admin.current} 
                          defaultCurrent={1} 
                          pageSizeOptions={['5','10','20']} 
                          showSizeChanger={true} 
                          onShowSizeChange={this.paginationOnShowSizeChange}
                          defaultPageSize={+this.props.admin.pageSize}/>
                      </Row>
            </div>
          );     
    }


}

function mapStateToProps({ admin, app }) {
  return { admin, app};
}

export default connect(mapStateToProps)(AdminPage);
