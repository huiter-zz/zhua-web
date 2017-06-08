import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Popover, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';
import { routerRedux } from 'dva/router';
import { withRouter } from 'react-router'

const Search = Input.Search;
const InputGroup = Input.Group;
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
                {record.createdTime ? moment(record.createdTime).format('YYYY-MM-DD'):'无效时间'}
            </div>
        )
    },{
        title: '链接',
        dataIndex: 'page',
        render: ( text, record, index) => (
            <a href={text} style={{display: "inline-block",maxWidth: "200px"}} target="_blank">{record.data.page}</a>
        )
    },{
        title: '类型',
        render: (text, record, index) => {
            return '消费';
        }
    },{
        title: '金额',
        render: (text, record, index) => {
            let amount = record.data.cash ? record.data.cash : record.data.gift;
            return (<span style={{color: "rgb(233, 37, 158)"}}>- {amount * -1/100} 元</span>)
        }
    }];


class CostPage extends Component {

    constructor(props) {
      super(props);
      this.paginationOnChange = this.paginationOnChange.bind(this);
    };

    paginationOnChange(page){
      this.props.router.replace('/cost?page='+page);
    }

    render(){
          return (
            <div>
                <div>
                  账单
                </div>
                <Block height={20}></Block>
                <Alert message={"目前不支持按天查看账单，扣费记录将按页面项进行显示。"} type="warning" showIcon/>
                <Block height={10}></Block>
                <Table rowKey={record => record.id} columns = { columns } dataSource = { this.props.cost.pages } pagination={false}/> 
                <Block height={20}></Block>
                <Row type="flex" justify="end">
                  <Pagination onChange={this.paginationOnChange} total={this.props.cost.total} showTotal={total => `共 ${this.props.cost.total} 项`} current={this.props.cost.current} pageSize={5}  defaultCurrent={1}/>
                </Row>
            </div>
          );
    }

}

function mapStateToProps({ cost, app }) {
  return { cost, app};
}

export default connect(mapStateToProps)(withRouter(CostPage));
