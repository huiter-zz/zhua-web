import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

class InvitePage extends Component {

    constructor(props) {
      super(props);
      this.paginationOnChange = this.paginationOnChange.bind(this);
      this.paginationOnShowSizeChange = this.paginationOnShowSizeChange.bind(this);

    };

    paginationOnChange(page){
      this.props.history.replace('/invite?page='+page);
    }

    paginationOnShowSizeChange(current, pageSize) {
      this.props.dispatch({
        type: 'invite/updateLocalPagination',
        payload: {pageSize:pageSize}
      })
      this.props.history.replace('/invite?page=1');
    }

    render(){      
            console.log(this.props.invite.pages);
             const columns = [{
                    title: '用户',
                    dataIndex: 'nickname',
                    render: (text, record, index) => (
                        <div>
                           <span>{text}</span>
                        </div>
                    )
                },{
                    title: '收益',
                    dataIndex: 'operation',
                    render: ( text, record, index) => (
                        <div>
                          -
                        </div>
                    )
                }];
          return (
            <div>
                <div>
                  邀请码
                </div>
                  <Block height={20}></Block>
                  <Alert message={"你的邀请码为 「" + this.props.app.user.invitationCode + "」"} type="info" showIcon/>
                  <Block height={10}></Block>
                  <Table columns = { columns } dataSource = { this.props.invite.pages } pagination={false}/> 
                  <Block height={20}></Block>
                      <Row type="flex" justify="end">
                        <Pagination 
                          onChange={this.paginationOnChange} 
                          total={this.props.invite.total} 
                          showTotal={total => `共 ${this.props.invite.total} 项`} 
                          current={this.props.invite.current} 
                          defaultCurrent={1} 
                          pageSizeOptions={['5','10','20']} 
                          showSizeChanger={true} 
                          onShowSizeChange={this.paginationOnShowSizeChange}
                          defaultPageSize={+this.props.invite.pageSize}/>
                      </Row>
            </div>
          );     
    }


}

function mapStateToProps({ invite, app }) {
  return { invite, app};
}

export default connect(mapStateToProps)(InvitePage);
