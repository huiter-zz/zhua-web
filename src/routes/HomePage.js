import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';
import Block from '../components/Block';
import Screen from '../components/Screen';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { withRouter } from 'react-router'

// 加载其它组件

import PageCreateForm from '../components/PageCreateForm';
import PageEditForm from '../components/PageEditForm';

const Search = Input.Search;
const InputGroup = Input.Group;

class HomePage extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showPageEditModal: false,
        currentItem:''
      }
      this.goPage = this.goPage.bind(this);
      this.paginationOnChange = this.paginationOnChange.bind(this);
      this.paginationOnShowSizeChange = this.paginationOnShowSizeChange.bind(this);
    };

    deletePage(id){
      this.props.dispatch({
        type: 'home/deletePage',
        payload: id
      })
    }

    goPage(id){
      this.props.router.push('/page?id='+id);
    }

    refreshPage(id){
      this.props.dispatch({
        type: 'home/refreshPage',
        payload: id
      })
    }


    onSearch(value){
      this.props.dispatch({
        type: 'home/updateLocalKeyword',
        payload: {keyword:value}
      })
      this.props.router.replace('/home?page=1');
    }

    paginationOnChange(page){
      this.props.router.replace('/home?page='+page);
    }

    paginationOnShowSizeChange(current, pageSize) {
      this.props.dispatch({
        type: 'home/updateLocalPagination',
        payload: {pageSize:pageSize}
      })
      this.props.router.replace('/home?page=1');
    }

    render(){
    	const columns = [{
            title: '页面名称',
            dataIndex: 'title',
            render: (text, record, index) => (
            	<div>
            		<Screen imageUrl={record.image} title={text} id={record.id}></Screen>
            	</div>
            )
        },{
            title: '链接',
            dataIndex: 'page',
            render: ( text, record, index) => (
            	<a href={text} style={{display: "inline-block",maxWidth: "200px"}} target="_blank">{text}</a>
            )
        },{
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
          render: (tags) => {
            return (tags && tags.map((tag) => {
                  let tagElem = (
                      <Tag key={tag} style={{cursor:'text'}}>
                        {tag}
                      </Tag>
                  );
                  return tagElem;
                }))
          }
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => {

              let a = moment(record.lastFetchTime).valueOf();
              let b = new Date().valueOf() - 86400000;
              switch(record.status) {
                case "normal": return <Badge status="success" text="已完成"/>
                case "exception": return <Badge status="warning" text="异常"/>
                case "fetching":return <Badge status="processing" text="抓取中"/>
                default : return '-';
              }
            }
        },{
            title: '最近抓取时间',
            dataIndex: 'lastFetchTime',
            key: 'lastFetchTime',
            render: (text, record, index) => {
              return(<div>{record.lastFetchTime ? moment(record.lastFetchTime).format('YYYY-MM-DD HH:mm:ss'):'-'}</div>);
            }

        },{
            title: '操作',
            dataIndex: 'operation',
            render: ( text, record, index) => (
            	<div>
                  <PageEditForm item={record}></PageEditForm>
    	            <Button type="ghost" icon="inbox" style={{marginRight:"8px",marginBottom:"6px"}} onClick={()=>{this.goPage(record.id)}}></Button>
    	            <Popconfirm title="确定要删除吗？" onConfirm={()=>{ this.deletePage(record.id)}}>
    	            	<Button type="ghost" icon="delete" style={{marginRight:"8px",marginBottom:"6px"}}></Button>
    	            </Popconfirm>
                  {
                    record.status!="fetching"?<Button type="ghost" icon="reload" style={{marginRight:"8px",marginBottom:"6px"}} onClick={()=>{this.refreshPage(record.id)}}></Button>:<Button type="ghost" icon="loading" disabled style={{marginRight:"8px",marginBottom:"6px"}} onClick={()=>{this.refreshPage(record.id)}}></Button>
                  }

                </div>
            )
        }];


      return (
            <div>
            	页面库
            	<Block height={20}></Block>
    	        <Alert message="计费规则：0.03 元／天，按页面数量计算。内测期间，余额不足不影响功能使用。" type="info" showIcon/>
    	       	<InputGroup>
    	       			 <Search
                      placeholder="搜索"
                      style={{ width: 200,marginRight:"10px"}}
                      onSearch={value=>{this.onSearch(value)}}
                    />
                  <PageCreateForm></PageCreateForm>
    	       	</InputGroup>

    	        <Block height={10}></Block>
              <Table rowKey={record => record.id}  scroll={{x:600}} columns = { columns } dataSource = { this.props.home.pages } pagination={false}/> 
              <Block height={20}></Block>
              <Row type="flex" justify="end">
                <Pagination 
                  onChange={this.paginationOnChange} 
                  total={this.props.home.total} 
                  showTotal={total => `共 ${this.props.home.total} 项`} 
                  current={this.props.home.current} 
                  defaultCurrent={1} 
                  pageSizeOptions={['5','10','20']} 
                  showSizeChanger={true} 
                  onShowSizeChange={this.paginationOnShowSizeChange}
                  defaultPageSize={+this.props.home.pageSize}/>
              </Row>
            </div>
      );
    }
};


function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(withRouter(HomePage));
