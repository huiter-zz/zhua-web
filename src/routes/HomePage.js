import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm, Alert, Badge, Tag,Col} from 'antd';
import Block from '../components/Block';
import Screen from '../components/Screen';
import { Link } from 'dva/router';

const Search = Input.Search;
const InputGroup = Input.Group;

const HomePage = (props) => {

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
        dataIndex: 'url',
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
	            <Popconfirm title="确定要删除吗？">
	            	<Button type="ghost" icon="delete"></Button>
	            </Popconfirm>
            </div>
        )
    }];

	const data = [
	  { key: 1, name: 'Estimote', url: 'http://estimote.com',image:'a',tags:['iBeacon'], createDate: '2016-06-12 19:50:37'},
	  { key: 2, name: '八月科技', url: 'http://augtek.com',image:'a',tags:['低功耗广域网'],  createDate: '2016-07-07 21:18:24'},
	  { key: 3, name: 'Sigfox', url: 'http://sigfox.com',image:'a',tags:['低功耗广域网'], createDate: '2016-07-09 22:49:51'}
	];


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
	       			<Button type="ghost" icon="plus">添加</Button>
	       		</Col>
	       	</InputGroup>
	        <Block height={10}></Block>
            <Table columns = { columns } dataSource = { data } /> 
        </div>
  );
}

HomePage.propTypes = {

};


function mapStateToProps({ pages }) {
  return { pages };
}

export default connect(mapStateToProps)(HomePage);
