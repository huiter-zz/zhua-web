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
                    render: ( text, record, index) => {
                      if (record.referrals.isPay) {
                        return(<div><span style={{color:"rgb(233, 37, 158)"}}>+ {record.referrals.amount /100}</span></div>);
                      } else {
                        return(<div><span>-</span></div>);
                      }
                    }
                }];
          return (
            <div>
                <div>
                  邀请码
                </div>
                  <Block height={20}></Block>
                  <Alert message={"你的邀请码为 「" + this.props.app.user.invitationCode + "」。当你邀请的用户充值时，你将获得相同金额的赠送。"} type="info" showIcon/>
                  <Block height={10}></Block>
                  <Table rowKey={record => record.uid} columns = { columns } dataSource = { this.props.invite.pages } pagination={false}/> 
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
