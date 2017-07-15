import React, { Component, PropTypes } from 'react';
import { Menu, Card,Breadcrumb, Icon, Row, Col, notification, Popconfirm, Alert} from 'antd';
import { Router, Route, IndexRoute, Link, History} from 'dva/router';
import Block from '../components/Block';
import Board from '../components/Board';
import { connect } from 'dva';
import * as _ from 'underscore';
import styles from './App.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const App = React.createClass({

  componentDidMount() {
    let key= window.location.pathname.replace('/','');
    if (key == '' || key == 'page') {
      key = 'home';
    }

    this.setState({current:key});
  },
  getInitialState(){
    return {
      current:"home",
    };
  },
  handleClick(e) {
    this.setState({ current: e.key });
  },
  logout() {
    this.props.dispatch({
      type: 'app/logout',
      payload: {}
    });
  },
  render() {
    return (
      <div>
        <div className={styles.main_header}>
        </div>
        <div className={styles.main_wrapper}>
          <Row gutter={24}>
            <Col xs={24} sm={6} md={6} lg={5}>
              <Board>
                <div style={{padding:"10px 20px 5px 10px"}}>
                  <div style={{display:"table-cell",verticalAlign: "top"}}>
                    <img width="50px" src={this.props.app.user.avatar} />
                  </div>
                  <div style={{display:"table-cell",verticalAlign: "top",padding:"0px 10px"}}>
                    <Block height={5}></Block>
                    <h3 style={{height:"20px",lineHeight:"20px"}}>{this.props.app.user.nickname}</h3>
                    <span style={{height:"10px",lineHeight:"10px"}}>余额：<span style={{color:"rgb(233, 37, 158)"}}>¥ {this.props.app.user.property? (this.props.app.user.property.cash + this.props.app.user.property.gift)/100:0}</span></span>
                  </div>
                </div>
              </Board>
              <Block height={20}></Block>
              <Board>
                <Menu mode="inline" theme="light" key="base" defaultOpenKeys={[this.state.openKey]} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                  <Menu.Item key="home" theme="light"><Link to="home"><Icon type="home"/>页面库</Link></Menu.Item>
                  <Menu.Item key="profile" theme="light"><Link to="profile"><Icon type="user"/>帐号</Link></Menu.Item>
                  <Menu.Item key="bill" theme="light"><Link to="bill"><Icon type="pay-circle"/>充值</Link></Menu.Item>
                  <Menu.Item key="invite" theme="light"><Link to="invite"><Icon type="qrcode"/>邀请码</Link></Menu.Item>
                  <Menu.Item key="cost" theme="light"><Link to="cost"><Icon type="file-text" />账单</Link></Menu.Item>
                  {this.props.app.user.isAdmin?<Menu.Item key="admin" theme="light" ><Link to="admin"><Icon type="team"/>管理员</Link></Menu.Item>:''}
                </Menu>
              </Board>
              <Block height={20}></Block>
              <Board>
                <Menu mode="inline" theme="light" key="other" selectedKeys={["A"]}>
                  <Menu.Item theme="light">
                    <Popconfirm placement="topLeft" title="确定退出" okText="退出"  onConfirm={this.logout}>
                      <a>退出</a>
                    </Popconfirm>
                  </Menu.Item>
                </Menu>
              </Board>
              <Block height={20}></Block>
            </Col>
            <Col xs={24} sm={18} md={18} lg={19}>
              <Board>
                <div style={{minHeight:"200px",padding:"24px"}}>
                  {this.props.children}
                </div>
              </Board>
            </Col>
          </Row>
        </div>
        <div className={styles.main_footer}>
           版权所有 © 2017 爪小组
        </div>
      </div>
    );
  }
});

//这个不加router为undefined
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(App);

