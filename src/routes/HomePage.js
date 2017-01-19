import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';
import Block from '../components/Block';
import Screen from '../components/Screen';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';

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
      this.editPage = this.editPage(this);
    };

    deletePage(id){
      this.props.dispatch({
        type: 'home/deletePage',
        payload: id
      })
    }

    goPage(id){
      this.props.history.push('/page?id='+id);
    }

    editPage(item){

    }

    onSearch(value){
      this.props.dispatch({
        type: 'home/updateLocalKeyword',
        payload: {keyword:value}
      })
      this.props.history.replace('/home?page=1');
    }

    paginationOnChange(page){
      this.props.history.replace('/home?page='+page);
    }

    paginationOnShowSizeChange(current, pageSize) {
      this.props.dispatch({
        type: 'home/updateLocalPagination',
        payload: {pageSize:pageSize}
      })
      this.props.history.replace('/home?page=1');
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
            	<a href={text} style={{display: "inline-block",width: "200px"}} target="_blank">{text}</a>
            )
        },{
            title: '添加时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            render: (createdTime) => {
              return(<div>{createdTime ? moment(createdTime).format('YYYY-MM-DD H:mm:ss'):'无效时间'}</div>);
            }

        },{
            title: '状态',
            dataIndex: 'lastFetchTime',
            key: 'lastFetchTime',
            render: (text, record, index) => {
              let a = moment(record.lastFetchTime).valueOf();
              let b = new Date().valueOf();
              return(<div>{ a>b ? <Badge status="success" text="已完成"/>: <Badge status="processing" text="等待"/>}</div>);
            }

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
            title: '操作',
            dataIndex: 'operation',
            render: ( text, record, index) => (
            	<div>
                  <PageEditForm item={record}></PageEditForm>
    	            <Button type="ghost" icon="inbox" style={{marginRight:"8px"}} onClick={()=>{this.goPage(record.id)}}></Button>
    	            <Popconfirm title="确定要删除吗？" onConfirm={()=>{ this.deletePage(record.id)}}>
    	            	<Button type="ghost" icon="delete"></Button>
    	            </Popconfirm>
                </div>
            )
        }];

      return (
            <div>
            	页面库
            	<Block height={20}></Block>
    	        <Alert message="计费规则：1 个链接 1 月只要 1 块钱。" type="info" showIcon/>
    	       	<InputGroup>
    	       		<Col xs={24} sm={24} md={12} lg={6}>
    	       			 <Search
                      placeholder="搜索"
                      style={{ width: 200 }}
                      onSearch={value=>{this.onSearch(value)}}
                    />
    	       		</Col>
    	       		<Col xs={4}>
                  <PageCreateForm></PageCreateForm>
    	       		</Col>
    	       	</InputGroup>

    	        <Block height={10}></Block>
              <Table columns = { columns } dataSource = { this.props.home.pages } pagination={false}/> 
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

export default connect(mapStateToProps)(HomePage);
