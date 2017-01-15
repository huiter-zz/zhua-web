import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Block from '../components/Block';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, DatePicker} from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;

const { MonthPicker, RangePicker } = DatePicker;

class PagePage extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount(){
      this.props.dispatch({
        type: 'page/snapshots',
        payload:{
            id:this.props.location.query.id
        }
      })
    }

    onChange(date, dateString) {
      console.log(date.dateString);
    }

    render(){
      var items = [];
      for (var i = this.props.page.snapshots.length - 1; i >= 0; i--) {
        var url = this.props.page.snapshots[i].url;
        var createdTime = this.props.page.snapshots[i].createdTime;
        createdTime = createdTime ? moment(createdTime).format('YYYY-MM-DD H:mm:ss'):'无效时间'
        items.push(<Col style={{maxHeight:"400px",overflow:"scroll"}} span={8}><img style={{maxWidth:"100%",height:"auto"}} src={url}/><p>{createdTime}</p></Col>);
      }

      return(
          <div>
              <div>
                页面
              </div>
              <Block height={20}></Block>
              <RangePicker onChange={this.onChange} /> 
              <Block height={60}></Block>
              <Row gutter={16}> 
                {items}
              </Row>
              <Block height={20}></Block>
              <Row type="flex" justify="end">
                <Pagination total={this.props.page.total} showTotal={total => `共 ${this.props.page.total} 项`} current={this.props.page.current} pageSize={5}  defaultCurrent={1}/>
              </Row>
          </div>
      );
    }
};

function mapStateToProps({ page, app }) {
  return { page, app};
}

export default connect(mapStateToProps)(PagePage);
