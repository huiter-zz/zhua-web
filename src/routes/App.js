import React, { Component, PropTypes } from 'react';
import { Menu, Breadcrumb, Icon, Row, Col, notification} from 'antd';
import { Router, Route, IndexRoute, Link, History} from 'dva/router';
import { connect } from 'dva';
import * as _ from 'underscore';
import styles from './App.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const App = React.createClass({
  componentDidMount() {
    let url= window.location.pathname.replace('/','');
    this.setState({current:url});
  },
  getInitialState(){
    return {
      current:"humiture",
      openKey:"case"
    };
  },
  handleClick(e) {
    this.setState({ current: e.key });
  },
  openMenu(){
    this.setState({openKey:"case"});
  },
  closeMenu(){
    this.setState({openKey:"device"});
  },
  render() {
    return (
        <div className={styles.ant_layout_aside}>
          <aside className={styles.ant_layout_sider}>
            <div className={styles.ant_layout_logo}>页面时光机</div>
            <Menu mode="inline" theme="dark" key={this.state.openKey} defaultOpenKeys={[this.state.openKey]} selectedKeys={[this.state.current]} onClick={this.handleClick}>
              <Menu.Item key="home" theme="light"><Link onClick={this.closeMenu} to="pages"><Icon type="home"/>页面库</Link></Menu.Item>
              <Menu.Item key="profile" theme="light"><Link onClick={this.closeMenu} to="pages"><Icon type="user"/>账号</Link></Menu.Item>
              <Menu.Item key="invite" theme="light"><Link onClick={this.closeMenu} to="invite"><Icon type="qrcode"/>邀请码</Link></Menu.Item>
            </Menu>
          </aside>
          <div className={styles.ant_layout_main}>
            <div className={styles.ant_layout_header}></div>
            <div className={styles.ant_layout_container}>
              <div className={styles.ant_layout_content}>
                  {React.cloneElement(this.props.children, {router: this.context.router})}
              </div>
            </div>
            <div className={styles.ant_layout_footer}>
              版权所有 © 2017 爪小组 
            </div>
          </div>
        </div>
    );
  }
});

//这个不加router为undefined
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect()(App);

