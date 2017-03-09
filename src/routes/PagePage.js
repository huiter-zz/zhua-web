import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import Snapshot from '../components/Snapshot';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

const { MonthPicker, RangePicker } = DatePicker;

class PagePage extends Component {

    constructor(props) {
      super(props);
      this.paginationOnChange = this.paginationOnChange.bind(this);
    }

    componentDidMount(){
      this.props.dispatch({
        type: 'page/snapshots',
        payload:{
            id:this.props.location.query.id
        }
      })
    }


    paginationOnChange(page){
        this.props.history.push('/page?id='+this.props.location.query.id + '&page=' +page);
        this.props.dispatch({
          type: 'page/snapshots',
          payload:{
              id:this.props.location.query.id,
              page:page
          }
        })
    }


    render(){
      var items = [];
      for (var i = this.props.page.snapshots.length - 1; i >= 0; i--) {
        var key = this.props.page.snapshots[i].url;
        var url = this.props.page.snapshots[i].url;
        var createdTime = this.props.page.snapshots[i].createdTime;
        createdTime = createdTime ? moment(createdTime).format('YYYY-MM-DD'):'无效时间'
        items.unshift(<Snapshot key={i} imageUrl={url} date={createdTime}/>);
      }

      return(
          <div>
              <div>
                页面
              </div>
              <Block height={20}></Block>
              <Row> 
                {items}
              </Row>
              <Block height={20}></Block>
              <Row type="flex" justify="end">
                <Pagination 
                onChange={this.paginationOnChange} 
                total={this.props.page.total} 
                showTotal={total => `共 ${this.props.page.total} 项`} 
                current={this.props.page.current} 
                defaultPageSize={this.props.page.pageSize} 
                defaultCurrent={this.props.page.current} />
              </Row>
          </div>
      );
    }
};

function mapStateToProps({ page, app }) {
  return { page, app};
}

export default connect(mapStateToProps)(PagePage);
