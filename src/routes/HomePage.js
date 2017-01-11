import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination} from 'antd';
import Block from '../components/Block';
import Screen from '../components/Screen';
import { Link } from 'dva/router';

// 加载其它组件

import PageCreateForm from '../components/PageCreateForm';

const Search = Input.Search;
const InputGroup = Input.Group;

class HomePage extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showPageAddModal: false,
      }
    };

    deletePage(id){
      this.props.dispatch({
        type: 'home/deletePage',
        payload: id
      })
    }

    render(){
    	const columns = [{
            title: '页面名称',
            dataIndex: 'name',
            render: (text, record, index) => (
            	<div>
            		<Screen></Screen><span style={{verticalAlign:"top",lineHeight:"50px"}}>{text}</span>
            	</div>
            )
        },{
            title: '链接',
            dataIndex: 'page',
            render: ( text, record, index) => (
            	<a href={text} target="_blank">{text}</a>
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
            title: '添加时间',
            dataIndex: 'createDate',
        },{
            title: '操作',
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
            	页面库
            	<Block height={20}></Block>
    	        <Alert message="计费规则：1 个链接 1 月只要 1 块钱。" type="info" showIcon/>
    	       	<InputGroup>
    	       		<Col xs={24} sm={24} md={12} lg={6}>
    	       			<Input placeholder="搜索"/>
    	       		</Col>
    	       		<Col xs={4}>
                  <PageCreateForm></PageCreateForm>
    	       		</Col>
    	       	</InputGroup>

    	        <Block height={10}></Block>
              <Table columns = { columns } dataSource = { this.props.home.pages } pagination={false}/> 
              <Block height={20}></Block>
              <Row type="flex" justify="end">
                <Pagination total={this.props.home.total} showTotal={total => `共 ${this.props.home.total} 项`} current={this.props.home.current} pageSize={5}  defaultCurrent={1}/>
              </Row>
            </div>
      );
    }
};


function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(HomePage);
