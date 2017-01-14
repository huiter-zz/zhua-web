import React, { Component, PropTypes } from 'react';
import { Menu, Card,Breadcrumb, Icon, Row, Col, notification } from 'antd';
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
    let url= window.location.pathname.replace('/','');
    url = url ? url : 'home';
    this.setState({current:url});
    console.log(this.props.app.user)
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
            <Col xs={24} sm={24} md={6} lg={5}>
              <Board>
                <div style={{padding:"10px 20px 5px 10px"}}>
                  <div style={{display:"table-cell",verticalAlign: "top"}}>
                    <img width="50px" src={this.props.app.user.avatar?this.props.app.user.avatar:'/src/assets/img/avatar.png'} />
                  </div>
                  <div style={{display:"table-cell",verticalAlign: "top",padding:"0px 10px"}}>
                    <Block height={5}></Block>
                    <h3 style={{height:"20px",lineHeight:"20px"}}>{this.props.app.user.nickname}</h3>
                    <span style={{height:"10px",lineHeight:"10px"}}>余额：¥ {this.props.app.user.balance?this.props.app.user.balance:0}</span>
                  </div>
                </div>
              </Board>
              <Block height={20}></Block>
              <Board>
                <Menu mode="inline" theme="light" key="base" defaultOpenKeys={[this.state.openKey]} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                  <Menu.Item key="home" theme="light"><Link to="home"><Icon type="home"/>页面库</Link></Menu.Item>
                  <Menu.Item key="profile" theme="light"><Link to="profile"><Icon type="user"/>账号</Link></Menu.Item>
                  <Menu.Item key="bill" theme="light"><Link to="bill"><Icon type="pay-circle"/>充值</Link></Menu.Item>
                  <Menu.Item key="invite" theme="light"><Link to="invite"><Icon type="qrcode"/>邀请码</Link></Menu.Item>
                </Menu>
              </Board>
              <Block height={20}></Block>
              <Board>
                <Menu mode="inline" theme="light" key="other">
                  <Menu.Item key="invite" theme="light"><Link onClick={this.logout}>退出</Link></Menu.Item>
                </Menu>
              </Board>
              <Block height={20}></Block>
            </Col>
            <Col xs={24} sm={24} md={18} lg={19}>
              <Board>
                <div style={{minHeight:"200px",padding:"24px"}}>
                  {this.props.children}
                </div>
              </Board>
            </Col>
          </Row>
        </div>
        <div className={styles.main_footer}>
           版权所有 © 2016 爪小组
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

